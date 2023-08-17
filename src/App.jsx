import { useEffect, useState } from 'react'
import './App.css'
// import Menu from './components/Menu'
// import SongList from './components/SongList'
import { optimiseSongs, compareSongs } from './optimiseSongs'
import Song from './components/Song'
// import { ISong } from './types'

function App() {
  const [songs, setSongs] = useState(
    JSON.parse(localStorage.getItem('songs')) || []
  )

  useEffect(() => {
    localStorage.setItem('songs', JSON.stringify(songs))
  }, [songs])

  // const songs = ['Bbm', 'Fm', 'Abm', 'Abm', 'Dbm', 'Am', 'Fm', 'Eb', 'Em', 'F#m', 'F', 'Cm'];
  // const songs: ISong[] = [
  //   {
  //     id: crypto.randomUUID(),
  //     name: 'Timewarp',
  //     key: 'Bbm',
  //   },
  //   {
  //     id: crypto.randomUUID(),
  //     name: 'Desire',
  //     key: 'Fm',
  //   },
  //   {
  //     id: crypto.randomUUID(),
  //     name: 'FEEL',
  //     key: 'Abm',
  //   },
  //   {
  //     id: crypto.randomUUID(),
  //     name: 'I Need to Feel',
  //     key: 'Abm',
  //   },
  //   {
  //     id: crypto.randomUUID(),
  //     name: 'Safe in Sound',
  //     key: 'Am',
  //   },
  //   {
  //     id: crypto.randomUUID(),
  //     name: 'Infinite Freedom',
  //     key: 'F#m',
  //   },
  //   {
  //     id: crypto.randomUUID(),
  //     name: 'UK',
  //     key: 'Cm',
  //   },
  //   {
  //     id: crypto.randomUUID(),
  //     name: 'Vino Bandit',
  //     key: 'Abm',
  //   },
  // ];
  // console.log('og', songs)
  // console.log(optimiseSongs(songs));
  const onSubmit = (e) => {
    e.preventDefault()
    let { name, keyNumber, keyChar, bpm } = e.target

    const key = `${keyNumber.value}${keyChar.value}`
    name = name.value
    bpm = bpm.value

    let newSong = {
      id: crypto.randomUUID(),
      name,
      key,
      bpm,
    }
    e.target.reset()
    let newSongs = [...songs]
    newSongs.push(newSong)

    setSongs(optimiseSongs(newSongs))
  }

  const updateName = (id, name) => {
    let newSongs = structuredClone(songs)
    let song = newSongs.find((song) => song.id === id)
    song.name = name
    setSongs(optimiseSongs(newSongs))
  }

  const removeSong = (id) => {
    let newSongs = structuredClone(songs)
    let index = newSongs.findIndex((song) => song.id === id)
    newSongs.splice(index, 1)
    setSongs(optimiseSongs(newSongs))
  }

  return (
    <div className='App'>
      <h1 className='mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white'>
        Mix Optimiser
      </h1>
      <p className='text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400'>
        Sorting songs based on similarity
      </p>
      <div className='flex items-center justify-center mt-10 flex-col'>
        <button
          className='btn btn-primary m-5'
          onClick={() => {
            setSongs([])
          }}
        >
          Reset
        </button>
        <form
          onSubmit={onSubmit}
          style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
        >
          <div>
            <label>Name</label>
            <input
              className='input input-bordered w-full max-w-xs'
              name='name'
            />
          </div>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <label>Key</label>
            <select style={{ width: '100px' }} name='keyNumber'>
              {Array.from({ length: 12 }, (_, i) => i + 1).map((i) => (
                <option key={i} value={i}>
                  {i}
                </option>
              ))}
            </select>
            <select style={{ width: '100px' }} name='keyChar'>
              <option value={'A'}>A</option>
              <option value={'B'}>B</option>
            </select>
          </div>
          <input
            name={'bpm'}
            className='input input-bordered w-full max-w-xs'
            placeholder={'bpm'}
          />
          <button className={'btn'} type='submit'>
            Add
          </button>
        </form>
        <div className='mt-5 w-1/2 flex gap-5 flex-col'>
          {songs.map((song, index) => (
            <div>
              <Song
                id={song.id}
                name={song.name}
                songKey={song.key}
                bpm={song.bpm}
                index={index}
                updateName={updateName}
                removeSong={removeSong}
              />
              {index < songs.length - 1 && (
                <div>{compareSongs(song.key, songs[index + 1].key)}</div>
              )}
            </div>
          ))}
        </div>
        {/* <Menu /> */}
        {/* <SongList /> */}
      </div>
    </div>
  )
}

export default App
