import './App.css'
import Menu from './components/Menu'
import SongList from './components/SongList'

function App() {
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
