import React from 'react'
import { Button, Box } from '@mui/material'
import { useLocation } from 'react-router-dom'
import { NavLink } from 'react-router-dom'

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
