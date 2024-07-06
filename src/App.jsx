import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import { StaticRouter } from 'react-router-dom/server'
import Login from './pages/login'
import Home from './pages/home'

import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <StaticRouter location='/'>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/' element={<Home />} />
        </Routes>
    </StaticRouter>
  )
}

export default App
