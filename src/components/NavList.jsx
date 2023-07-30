import React from 'react'
import { AppBar, Toolbar, IconButton, Typography, Button, Drawer, Box, MenuItem, Menu, Card } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import { useNavigate } from 'react-router-dom'

const NavList = () => {
    const navigate = useNavigate()
    return (
        <div style={{ marginTop: '50px', position: 'sticky', backgroundColor: 'black' }}>
            <Box display={'flex'} justifyContent={'space-between'}>
                <Button onClick={() => navigate('/')}>
                    <Typography sx={{ color: 'white', paddingTop: 1, fontWeight: 'bold' }}>HOME</Typography>
                </Button>
                <Button onClick={() => navigate('/characters')}>
                    <Typography sx={{ color: 'white', paddingTop: 1, fontWeight: 'bold' }}>CHARACTERS</Typography>
                </Button>
                <Button onClick={() => navigate('/comics')}>
                    <Typography sx={{ color: 'white', paddingTop: 1, fontWeight: 'bold' }}>COMICS</Typography>
                </Button>
            </Box>
        </div>
    )
}

export default NavList
