import { useState, useEffect } from 'react'
import axios from 'axios'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import { useNavigate } from 'react-router-dom'
import { Box } from '@mui/material'
import { useMediaQuery } from '@mui/material'

import characters from '/characters.jpg'

function CardCharacter() {
    const [featuredCharacter, setFeaturedCharacter] = useState(null)
    const navigate = useNavigate()

    const isMobile = useMediaQuery('(max-width: 600px)')
    useEffect(() => {
        axios
            .get(
                'https://gateway.marvel.com:443/v1/public/characters?ts=1&apikey=c20560f4d16fdd15e1d5bc655d65fdc8&hash=bf9532152981aaf1fbb3a4dbfa9f3cbd'
            )
            .then((res) => {
                const randomIndex = Math.floor(Math.random() * res.data.data.results.length)
                setFeaturedCharacter(res.data.data.results[randomIndex])
            })
            .catch((error) => console.log(error))
    }, [])

    return (
        <div>
            {featuredCharacter && (
                <Card
                    sx={{
                        maxWidth: 300,
                        margin: 'auto',
                        width: isMobile ? '100%' : 'auto',
                        marginBottom: isMobile ? '1rem' : '0',
                    }}
                    onClick={() => {
                        navigate('/characters')
                    }}
                >
                    <CardMedia component="img" height="40" image={characters} alt={''} />
                    <CardMedia
                        component="img"
                        height="300"
                        image={`${featuredCharacter.thumbnail.path}.${featuredCharacter.thumbnail.extension}`}
                        alt={featuredCharacter.name}
                    />
                </Card>
            )}
        </div>
    )
}

export default CardCharacter
