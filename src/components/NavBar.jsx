import React, { useEffect, useRef, useState } from 'react'
import {
    AppBar,
    Toolbar,
    IconButton,
    Box,
    styled,
    Paper,
    InputBase,
    Stack,
    List,
    ListItem,
    ListItemText,
} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import axios from 'axios'

import { useNavigate } from 'react-router-dom'
import logo from '/logo.png'
import NavList from './NavList'

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}))

const Navbar = () => {
    const navigate = useNavigate()
    const [showSearch, setShowSearch] = useState(false)
    const [searchText, setSearchText] = useState('')
    const [searchResults, setSearchResults] = useState([])
    const searchWrapperRef = useRef(null)
    const [showNavList, setShowNavList] = useState(false)

    useEffect(() => {
        axios
            .get(
                `https://gateway.marvel.com:443/v1/public/characters?ts=1&apikey=c20560f4d16fdd15e1d5bc655d65fdc8&hash=bf9532152981aaf1fbb3a4dbfa9f3cbd`
            )
            .then((res) => {
                const characters = res.data.data.results
                axios
                    .get(
                        `https://gateway.marvel.com:443/v1/public/comics?ts=1&apikey=c20560f4d16fdd15e1d5bc655d65fdc8&hash=bf9532152981aaf1fbb3a4dbfa9f3cbd`
                    )
                    .then((res) => {
                        const comics = res.data.data.results
                        setSearchResults([...characters, ...comics])
                    })
                    .catch((error) => console.log(error))
            })
            .catch((error) => console.log(error))
    }, [])

    const handleSearchIconClick = () => {
        setShowSearch(!showSearch)
    }

    const handleCircleClick = () => {
        setShowNavList((prevShowNavList) => !prevShowNavList)
    }

    const handleSearchInputChange = (e) => {
        setSearchText(e.target.value)
        const filteredResults = searchResults.filter((result) =>
            (result.name || result.title).toLowerCase().includes(e.target.value.toLowerCase())
        )
        setSearchResults(filteredResults)
    }

    const handleClickOutsideSearch = (e) => {
        if (searchWrapperRef.current && !searchWrapperRef.current.contains(e.target)) {
            setShowSearch(false)
        }
    }

    useEffect(() => {
        document.addEventListener('click', handleClickOutsideSearch)
        return () => {
            document.removeEventListener('click', handleClickOutsideSearch)
        }
    }, [])

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="fixed" sx={{ background: 'transparent', boxShadow: 'none' }}>
                <Toolbar style={{ backgroundColor: 'red' }}>
                    <Stack direction="column" alignItems="center" onClick={handleCircleClick}>
                        {/* Tres círculos negros */}
                        <Box
                            sx={{
                                width: '8px',
                                height: '8px',
                                borderRadius: '50%',
                                bgcolor: 'black',
                                mb: '4px',
                                cursor: 'pointer',
                            }}
                        />
                        <Box
                            sx={{
                                width: '8px',
                                height: '8px',
                                borderRadius: '50%',
                                bgcolor: 'black',
                                mb: '4px',
                                cursor: 'pointer',
                            }}
                        />
                        <Box
                            sx={{
                                width: '8px',
                                height: '8px',
                                borderRadius: '50%',
                                bgcolor: 'black',
                                mb: '4px',
                                cursor: 'pointer',
                            }}
                        />
                    </Stack>

                    <img
                        src={logo}
                        alt="Company Logo"
                        style={{ height: 50, marginRight: 'auto', marginLeft: 16 }}
                        onClick={() => {
                            navigate('/')
                        }}
                    />
                    <Box sx={{ flexGrow: 1 }}>
                        <Box
                            ref={searchWrapperRef}
                            sx={{ display: 'flex', alignItems: 'center', position: 'relative' }}
                        >
                            <IconButton onClick={handleSearchIconClick} sx={{ mr: 1 }}>
                                <SearchIcon fontSize="large" sx={{ color: 'white' }} />
                            </IconButton>
                            {showSearch && (
                                <Paper
                                    component="form"
                                    sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 600 }}
                                >
                                    <InputBase
                                        value={searchText}
                                        onChange={handleSearchInputChange}
                                        placeholder="Nombre"
                                        sx={{ ml: 1, flex: 1 }}
                                    />
                                </Paper>
                            )}
                            {searchResults.length > 0 && showSearch && (
                                <Paper
                                    sx={{
                                        position: 'absolute',
                                        top: '100%',
                                        left: 0,
                                        width: 600,
                                        maxHeight: 400,
                                        overflowY: 'auto',
                                        zIndex: 1,
                                        backgroundColor: 'white',
                                    }}
                                >
                                    <List>
                                        {searchResults.map((result) => (
                                            <ListItem key={result.id} button>
                                                <ListItemText primary={result.name || result.title} />
                                            </ListItem>
                                        ))}
                                    </List>
                                </Paper>
                            )}
                        </Box>
                    </Box>
                </Toolbar>
            </AppBar>
            {showNavList && <NavList />}
        </Box>
    )
}

export default Navbar
