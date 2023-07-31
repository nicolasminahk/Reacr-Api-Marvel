import React, { useEffect, useState } from 'react'
import { AppBar, Toolbar, IconButton, Box, MenuItem, styled, Paper, InputBase, Stack } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'

import { NavLink, useLocation, useNavigate } from 'react-router-dom'
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
    const [showNavList, setShowNavList] = useState(false)

    const handleSearchIconClick = () => {
        setShowSearch(!showSearch)
    }

    const handleSearchInputChange = (e) => {
        setSearchText(e.target.value)
    }
    // Función para manejar el clic en los círculos y mostrar/ocultar el NavList
    const handleCircleClick = () => {
        setShowNavList(!showNavList)
    }

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="fixed" sx={{ background: 'transparent', boxShadow: 'none' }}>
                <Toolbar style={{ backgroundColor: 'red' }}>
                    <Stack direction="column" alignItems="center">
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
                            onClick={handleCircleClick}
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
                            onClick={handleCircleClick}
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
                            onClick={handleCircleClick}
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
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
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
                        </Box>
                    </Box>
                </Toolbar>
            </AppBar>
            {showNavList && <NavList />}
        </Box>
    )
}

export default Navbar
