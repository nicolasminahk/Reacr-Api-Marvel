import { useState, useEffect } from 'react'
import axios from 'axios'
import Card from '@mui/material/Card'
import CardMedia from '@mui/material/CardMedia'
import { useNavigate } from 'react-router-dom'
import { useMediaQuery } from '@mui/material'

import comic from '/comic.jpg'

function CardComics() {
    const [featuredComics, setFeaturedComics] = useState(null)
    const navigate = useNavigate()
    useEffect(() => {
        axios
            .get(
                'https://gateway.marvel.com:443/v1/public/comics?ts=1&apikey=c20560f4d16fdd15e1d5bc655d65fdc8&hash=bf9532152981aaf1fbb3a4dbfa9f3cbd'
            )
            .then((res) => {
                const randomIndex = Math.floor(Math.random() * res.data.data.results.length)
                setFeaturedComics(res.data.data.results[randomIndex])
            })
            .catch((error) => console.log(error))
    }, [])

    return (
        <div>
            {featuredComics && (
                <Card
                    sx={{ maxWidth: 300, margin: 'auto' }}
                    onClick={() => {
                        navigate('/comics')
                    }}
                >
                    <CardMedia component="img" height="40" image={comic} alt={''} />
                    <CardMedia
                        component="img"
                        height="300"
                        image={`${featuredComics.thumbnail.path}.${featuredComics.thumbnail.extension}`}
                        alt={featuredComics.name}
                    />
                </Card>
            )}
        </div>
    )
}

export default CardComics
