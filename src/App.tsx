import './App.css'
import Menu from './components/Menu'
import SongList from './components/SongList'
import optimiseSongs from './optimiseSongs'
import { ISong } from "./types";

function App() {
  // const songs = ['Bbm', 'Fm', 'Abm', 'Abm', 'Dbm', 'Am', 'Fm', 'Eb', 'Em', 'F#m', 'F', 'Cm'];
  const songs: ISong[] = [
    {
      id: crypto.randomUUID(),
      name: 'Timewarp',
      key: 'Bbm',
    },
    {
      id: crypto.randomUUID(),
      name: 'Desire',
      key: 'Fm',
    },
    {
      id: crypto.randomUUID(),
      name: 'FEEL',
      key: 'Abm',
    },
    {
      id: crypto.randomUUID(),
      name: 'I Need to Feel',
      key: 'Abm',
    },
    {
      id: crypto.randomUUID(),
      name: 'Safe in Sound',
      key: 'Am',
    },
    {
      id: crypto.randomUUID(),
      name: 'Infinite Freedom',
      key: 'F#m',
    },
    {
      id: crypto.randomUUID(),
      name: 'UK',
      key: 'Cm',
    },
    {
      id: crypto.randomUUID(),
      name: 'Vino Bandit',
      key: 'Abm',
    },
  ];
  // console.log('og', songs)
  // console.log(optimiseSongs(songs));

  return (
    <div className="App">
      <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">Mix Optimiser</h1>
      <p className="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">Sorting songs based on similarity</p>
      <div className="container flex items-center justify-center mt-10 flex-col">
        <Menu />
        <SongList />
      </div>
    </div>
  )
}

export default App
