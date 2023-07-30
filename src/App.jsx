import axios from 'axios'
// import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './views/Home'
import CharacterView from './views/CharacterView'
import ComicsView from './views/ComicsView'

//Request Caracter urñ
// https://gateway.marvel.com:443/v1/public/characters?apikey=

//  PUBLIC KEY = c20560f4d16fdd15e1d5bc655d65fdc8

//  PRIVATE KEY = 47edf73a22333c91df19c934de1bc821ab030e52

// 147edf73a22333c91df19c934de1bc821ab030e52c20560f4d16fdd15e1d5bc655d65fdc8

// HASH =  bf9532152981aaf1fbb3a4dbfa9f3cbd

function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/characters" element={<CharacterView />} />
                <Route path="/comics" element={<ComicsView />} />
            </Routes>
        </>
    )
}

export default App
