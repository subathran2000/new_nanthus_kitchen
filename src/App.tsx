import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Landpage from './components/landpage3'
import Menu from './components/menu'
import MenuPage from './pages/MenuPage'
import FeaturesPage from './pages/FeaturesPage'
import ContactPage from './pages/ContactPage'
import AwardsPage from './pages/EventsPage'
import Event from './components/event'
import EventsPage from './pages/EventsPage'
import Gallery from './components/Coverflow3D'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landpage />} />
        <Route path="/menu" element={<MenuPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/awards" element={<AwardsPage />} />
        <Route path="/event" element={<Event/>} />
        <Route path="/features" element={<FeaturesPage />} />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/gallery" element={<Gallery />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
