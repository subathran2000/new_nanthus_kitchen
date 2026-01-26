import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LandingPage from './components/home/LandingPage'
import Special from './components/special/Special'
import Menu from './components/menu/menu'
import About from './components/aboutUs/about'


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/special" element={<Special />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
