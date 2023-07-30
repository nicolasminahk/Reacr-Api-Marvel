import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { createTheme, ThemeProvider } from '@mui/material/styles'

const customTheme = createTheme({
    typography: {
        // fontFamily: 'Marvel, sans-serif',
        // fontFamily: 'Oswald sans-serif',
        fontFamily: 'Bebas Neue ',
        //font-family: 'BIZ UDPMincho', serif;
        //font-family: 'Oswald', sans-serif;
    },
})

ReactDOM.createRoot(document.getElementById('root')).render(
    <ThemeProvider theme={customTheme}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </ThemeProvider>
)
