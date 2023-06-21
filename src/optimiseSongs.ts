import { Song } from "./types";
import { camelotKeys } from "./utils/harmonicGraph";

// ['Bbm', 'Fm', 'Abm', 'Abm', 'Dbm', 'Am', 'Fm', 'Eb', 'Em', 'F#m', 'F', 'Cm']

const greedySongSearch = (songMap: { [id: string]: [[id: string, distance :number]?] }) => {  
  const n = Object.keys(songMap).length
  let optimised: Array<string> = [Object.keys(songMap)[0]];
  let current: string = optimised[0];

  for (let i = 0; i < n-1; i++) {
    let best: string = ''
    let bestDist: number = Infinity;
    for (let j = 0; j < songMap[current].length; j++) {
      if (songMap[current][j]![1] < bestDist) {
        best = songMap[current][j]![0]
        bestDist = songMap[current][j]![1]
      }
    }
    current = best
    optimised.push(current)
  };

  return optimised
}

const optimiseSongs = (songs: Song[]) => {
  const n = songs.length;

  if (n <= 1) {
    return songs
  }

  let songMap: { [id: string]: [[id: string, distance :number]?] } = {};
  
  for (let i = 0; i < n; i++) {
    songMap[songs[i].id] = [];
  }

  for (let i = n-1; i > 0; i--) {
    for (let j = 0; j < i; j++) {
      const keyDistance: number = compareSongs(songs[i].key, songs[j].key);
      songMap[songs[i].id].push([songs[j].id, keyDistance]);
      songMap[songs[j].id].push([songs[i].id, keyDistance])
    }
  }
  
  // Nearest neighbour search
  let optimised = greedySongSearch(songMap)

  // Local search (2-opt)
  

  // Replace list with actual songs
  return optimised.map(id => songs.filter(song => song.id === id)[0])
};

const compareSongs = (k1: string, k2: string) => {
  // k: key
  // c: camelot (key has been converted to camelot)

  let ck1: string = camelotKeys.get(k1) || "";
  let ck2: string = camelotKeys.get(k2) || "";
  if (ck1 === ck2) return 0;

  const letterMap: Map<string, number> = new Map([
    ["A", 0],
    ["B", 1],
  ]);

  const ck1x: number = parseInt(ck1.slice(0, -1));
  const ck1y: number = letterMap.get(ck1.slice(-1))!;
  const ck2x: number = parseInt(ck2.slice(0, -1));
  const ck2y: number = letterMap.get(ck2.slice(-1))!;

  const x: number = ck1x - ck2x;
  const y: number = ck1y - ck2y;

  return Math.sqrt(x*x + y*y);
}



export default optimiseSongs;