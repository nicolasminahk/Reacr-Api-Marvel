import React from 'react'
import CardCharacter from '../components/CardCharacter'
import Navbar from '../components/NavBar'
import CardComics from '../components/CardComics'
import { Box, Divider, Grid } from '@mui/material'
import NavList from '../components/NavList'
import SearchComponent from '../components/SearchComponent'

const Home = () => {
    return (
        <>
            <Navbar />
            <NavList />
            <Grid container justifyContent="center" alignItems={'center'} style={{ padding: '2rem' }}>
                <Grid item xs={12} sm={6} style={{ margin: '8px' }}>
                    <CardComics />
                </Grid>
                <Grid item xs={12} sm={6} style={{ margin: '8px' }}>
                    <CardCharacter />
                </Grid>
            </Grid>
        </>
    )
}

export default Home
