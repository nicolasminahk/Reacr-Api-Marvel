import React from 'react'
import axios from 'axios'
import { useEffect, useState } from 'react'
// import { Grid, Typography } from '@mui/material'
import Typography from '@mui/material/Typography'
import { Box, Card, CardContent, CardHeader, CardMedia, Grid } from '@mui/material'
import { useSpring, animated } from 'react-spring'

const Characters = () => {
    const [characters, setCharacters] = useState([])

    useEffect(() => {
        axios
            .get(
                'https://gateway.marvel.com:443/v1/public/characters?ts=1&apikey=c20560f4d16fdd15e1d5bc655d65fdc8&hash=bf9532152981aaf1fbb3a4dbfa9f3cbd'
            )
            .then((res) => {
                setCharacters(res.data.data.results)
                console.log(res.data.data.results)
            })
            .catch((error) => console.log(error))
    }, [])

    const [hoveredCard, setHoveredCard] = useState(null)

    const handleMouseEnter = (index) => {
        setHoveredCard(index)
    }

    const handleMouseLeave = () => {
        setHoveredCard(null)
    }

    return (
        <>
            <div>
                <Grid container spacing={3} sx={{ mt: 1, px: 2 }}>
                    {characters.map((character, index) => (
                        <Grid item key={character.id} xs={6} sm={6} md={2}>
                            <animated.div
                                onMouseEnter={() => handleMouseEnter(index)}
                                onMouseLeave={handleMouseLeave}
                                style={{
                                    transform: hoveredCard === index ? 'scale(1.05)' : 'scale(1)',
                                    boxShadow:
                                        hoveredCard === index
                                            ? '0 10px 20px rgba(0, 0, 0, 0.2)'
                                            : '0 0px 0px rgba(0, 0, 0, 0.0)',
                                    marginBottom: '20px',
                                    cursor: 'pointer',
                                }}
                            >
                                <Card
                                    sx={{
                                        // maxWidth: 300,
                                        maxWidth: 200,
                                        margin: 'auto',
                                        bgcolor: 'black',
                                        // height: '350px',
                                        height: '300px',
                                        boxShadow: 'none',
                                    }}
                                >
                                    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                                        <CardMedia
                                            component="img"
                                            // height="200"
                                            height="150"
                                            width="100%"
                                            image={`${character.thumbnail.path}.${character.thumbnail.extension}`}
                                            alt={character.name}
                                            sx={{ boxShadow: 'none' }}
                                        />

                                        {/* Franja roja */}
                                        <Box
                                            sx={{
                                                height: '8px',
                                                backgroundColor: 'red',
                                                display: 'flex',
                                                alignItems: 'flex-end',
                                                justifyContent: 'flex-end',
                                            }}
                                        >
                                            <Box
                                                sx={{
                                                    width: '20px',
                                                    height: '3px',
                                                    backgroundColor: 'black',
                                                    transform: 'rotate(45deg)',
                                                    mx: '5px',
                                                }}
                                            />
                                            <Box
                                                sx={{
                                                    width: '20px',
                                                    height: '3px',
                                                    backgroundColor: 'black',
                                                    transform: 'rotate(-45deg)',
                                                }}
                                            />
                                        </Box>
                                        <Box
                                            sx={{
                                                flexGrow: 1,
                                                backgroundColor: 'black',
                                                color: 'white',
                                                padding: '16px',
                                            }}
                                        >
                                            <Typography variant="h5" fontWeight={'bold'} fontSize={'xx-large'}>
                                                {character.name}
                                            </Typography>
                                            <Typography
                                                variant="body2"
                                                // sx={{ mt: 4 }}
                                                fontWeight={'bold'}
                                                fontSize={'large'}
                                            >
                                                {character.comics.items[0]?.name}
                                            </Typography>
                                        </Box>
                                    </Box>
                                </Card>
                            </animated.div>
                        </Grid>
                    ))}
                </Grid>
            </div>
        </>
    )
}

export default Characters
