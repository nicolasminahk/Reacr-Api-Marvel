import React, { useState } from 'react'
import {
    AppBar,
    Toolbar,
    IconButton,
    Typography,
    Button,
    Drawer,
    Box,
    MenuItem,
    Menu,
    styled,
    Paper,
    InputBase,
} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import MenuIcon from '@mui/icons-material/Menu'
import MenuOpenIcon from '@mui/icons-material/MenuOpen'
import { useNavigate } from 'react-router-dom'
import NavList from './NavList'
import logo from '/logo.png'
import CircleIcon from '@mui/icons-material/Circle'
import { Search } from '@mui/icons-material'
import SearchComponent from './SearchComponent'

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

    const handleSearchIconClick = () => {
        setShowSearch(!showSearch)
    }

    const handleSearchInputChange = (e) => {
        setSearchText(e.target.value)
    }

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="fixed" sx={{ background: 'transparent', boxShadow: 'none' }}>
                <Toolbar style={{ backgroundColor: 'red' }}>
                    <img
                        src={logo}
                        alt="Company Logo"
                        style={{ height: 50, marginRight: 'auto', marginLeft: 16 }}
                        onClick={() => {
                            navigate('/')
                        }}
                    />
                    <Button
                        onClick={() => {
                            navigate('/')
                        }}
                    />
                    <SearchIconWrapper>
                        <IconButton onClick={handleSearchIconClick} sx={{ mr: -4 }}>
                            <SearchIcon fontSize="large" sx={{ color: 'white' }} />
                        </IconButton>
                    </SearchIconWrapper>
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
                </Toolbar>
            </AppBar>
        </Box>
    )
}

export default Navbar
