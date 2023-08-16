// The init file is used as VITE doesn't define a global field but old dependencies need this variable
import './init'
import React from 'react'
import ReactDOM from 'react-dom/client'

import App from './App'

import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
