import React from 'react'
import { AppBar, Toolbar, IconButton, Typography, Button, Drawer, Box, MenuItem, Menu, Card } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import { useLocation, useNavigate } from 'react-router-dom'
import { NavLink } from 'react-router-dom'

// const NavList = () => {
//     const navigate = useNavigate()
//     return (
//         <div style={{ marginTop: '50px', position: 'sticky', backgroundColor: 'black' }}>
//             <Box display={'flex'} justifyContent={'space-between'}>
//                 <Button onClick={() => navigate('/')}>
//                     <Typography sx={{ color: 'white', paddingTop: 1, fontWeight: 'bold' }}>HOME</Typography>
//                 </Button>
//                 <Button onClick={() => navigate('/characters')}>
//                     <Typography sx={{ color: 'white', paddingTop: 1, fontWeight: 'bold' }}>CHARACTERS</Typography>
//                 </Button>
//                 <Button onClick={() => navigate('/comics')}>
//                     <Typography sx={{ color: 'white', paddingTop: 1, fontWeight: 'bold' }}>COMICS</Typography>
//                 </Button>
//             </Box>
//         </div>
//     )
// }

// export default NavList
const NavList = () => {
    const location = useLocation()

    return (
        <div style={{ marginTop: '50px', position: 'sticky', backgroundColor: 'black' }}>
            <Box display={'flex'} justifyContent={'space-between'}>
                <Button>
                    <NavLink
                        to="/"
                        className={location.pathname === '/' ? 'active' : ''}
                        style={{
                            textDecoration: 'none',
                            color: 'white',
                            padding: '0.5rem',
                            fontWeight: 'bold',
                            fontSize: 'larger',
                        }}
                    >
                        HOME
                    </NavLink>
                </Button>
                <Button>
                    <NavLink
                        to="/characters"
                        className={location.pathname === '/characters' ? 'active' : ''}
                        style={{
                            textDecoration: 'none',
                            color: 'white',
                            padding: '0.5rem',
                            fontWeight: 'bold',
                            fontSize: 'larger',
                        }}
                    >
                        CHARACTERS
                    </NavLink>
                </Button>
                <Button>
                    <NavLink
                        to="/comics"
                        className={location.pathname === '/comics' ? 'active' : ''}
                        style={{
                            textDecoration: 'none',
                            color: 'white',
                            padding: '0.5rem',
                            fontWeight: 'bold',
                            fontSize: 'larger',
                        }}
                    >
                        COMICS
                    </NavLink>
                </Button>
            </Box>
        </div>
    )
}

export default NavList
