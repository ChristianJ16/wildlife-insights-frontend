import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import AnimalInfo from './components/AnimalInfo'
import FavoriteLists from './components/FavoriteLists'

function App() {
    return (
        <div className="bg-cover bg-center min-h-screen" style={{
            backgroundImage: `url("https://cdn.pixabay.com/photo/2018/06/30/18/37/panda-3508116_1280.jpg")`
        }}>
        <Router>
            <Routes>
                <Route path="/" element={<AnimalInfo />} />
                <Route path="/favorites" element={<FavoriteLists />} />
            </Routes>
        </Router>
        </div>
    )
}

export default App
