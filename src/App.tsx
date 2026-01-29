import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Special from './components/special/Special'
import About from './components/aboutUs/AboutUs'
import Landing2 from '../src/components/home/landingPage-n'
import MenuNew from './components/menu/menuNew'
import Sdmfnd from './components/menu/spiral'
import Landing3D from './components/home/LandingPage3D'


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing2 />} />
        <Route path="/special" element={<Special />} />
        <Route path="/about" element={<About />} />
        <Route path="/menu-new" element={<MenuNew />} />
        <Route path="/sdmfnd" element={<Sdmfnd />} />
        <Route path="/cyber" element={<Landing3D />} />

      </Routes>
    </BrowserRouter>
  )
}

export default App
