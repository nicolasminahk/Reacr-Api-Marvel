import React from 'react'
import CardCharacter from '../components/CardCharacter'
import Navbar from '../components/NavBar'
import CardComics from '../components/CardComics'
import { Grid } from '@mui/material'

const Home = () => {
    return (
        <>
            <Navbar />
            <Grid
                container
                justifyContent="center"
                alignItems={'center'}
                style={{ padding: '2rem', marginTop: '80px' }}
            >
                <Grid item xs={12} sm={6} style={{ margin: '8px', mt: '80px' }}>
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
