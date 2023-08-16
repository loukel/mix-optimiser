// import { camelotKeys } from './utils/harmonicGraph'

// ['Bbm', 'Fm', 'Abm', 'Abm', 'Dbm', 'Am', 'Fm', 'Eb', 'Em', 'F#m', 'F', 'Cm']

const calcDist = (songsTour, songMap) => {
  let dist = 0

  for (let i = 0; i < songsTour.length - 1; i++) {
    dist += songMap[songsTour[i]][songsTour[i + 1]]
  }

  // Optional addition
  // This complete the loop - this means the user can select where the optimised list starts
  dist += songMap[songsTour[0]][songsTour[songsTour.length - 1]]
  return dist
}

const greedySearch = (songMap) => {
  const n = Object.keys(songMap).length
  let songs = Object.keys(songMap)
  let current = songs.shift()
  let optimised = [current]

  for (let i = 0; i < n - 1; i++) {
    let best = ''
    let bestDist = Infinity
    songs.forEach((songId) => {
      if (songMap[current][songId] < bestDist) {
        best = songId
        bestDist = songMap[current][songId]
      }
    })
    const index = songs.indexOf(best)
    delete songs[index]
    current = best
    optimised.push(current)
  }

  return optimised
}

const opt2Swap = (songIds, cut1, cut2) => {
  let optimised = []

  // Keep the first c1 of the list
  optimised = songIds.slice(0, cut1)

  // Reverse the list from c1 to c2
  optimised.push(...songIds.slice(cut1, cut2).reverse())
  // console.log(cut1, cut2)

  // Keep the list the same from c2
  optimised.push(...songIds.slice(cut2))

  return optimised
}

const localSearch = (songIds, bestDist, songMap) => {
  let newTour = songIds

  for (let i = 0; i < songIds.length; i++) {
    for (let j = i + 1; j < songIds.length; j++) {
      newTour = opt2Swap(songIds, i, j)
      let newDist = calcDist(songIds, songMap)

      if (newDist < bestDist) {
        return localSearch(newTour, newDist, songMap)
      }
    }
  }

  return [newTour, bestDist]
}

const optimiseSongs = (songs) => {
  const n = songs.length

  if (n <= 1) {
    return songs
  }

  let songMap = {}

  for (let i = 0; i < n; i++) {
    songMap[songs[i].id] = {}
  }

  for (let i = n - 1; i > 0; i--) {
    for (let j = 0; j < i; j++) {
      const keyDistance = compareSongs(songs[i].key, songs[j].key)
      songMap[songs[i].id] = {
        ...songMap[songs[i].id],
        [songs[j].id]: keyDistance,
      }
      songMap[songs[j].id] = {
        ...songMap[songs[j].id],
        [songs[i].id]: keyDistance,
      }
    }
  }

  // Nearest neighbour search
  console.log(
    'og, distance:',
    calcDist(
      songs.map((song) => song.id),
      songMap
    )
  )
  let optimised = greedySearch(songMap)
  console.log('greedy, distance:', calcDist(optimised, songMap))
  let dist

    // Local search (with 2-opt)
  ;[optimised, dist] = localSearch(
    optimised,
    calcDist(optimised, songMap),
    songMap
  )

  console.log('with local search, Distance: ', calcDist(optimised, songMap))
  // Replace list with actual songs
  return optimised.map((id) => songs.filter((song) => song.id === id)[0])
}

const compareSongs = (ck1, ck2) => {
  // k: key
  // c: camelot (key has been converted to camelot)

  // let ck1 = camelotKeys.get(k1) || ''
  // let ck2 = camelotKeys.get(k2) || ''
  if (ck1 === ck2) return 0

  const letterMap = new Map([
    ['A', 0],
    ['B', 1],
  ])

  const ck1x = parseInt(ck1.slice(0, -1))
  const ck1y = letterMap.get(ck1.slice(-1))
  const ck2x = parseInt(ck2.slice(0, -1))
  const ck2y = letterMap.get(ck2.slice(-1))

  const x = ck1x - ck2x
  const y = ck1y - ck2y

  return Math.abs(x) + Math.abs(y)
}

export { optimiseSongs, compareSongs }
