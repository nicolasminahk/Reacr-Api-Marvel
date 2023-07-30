import { Box, Button, Card, CardContent, CardMedia, Grid, Pagination, PaginationItem, Typography } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { animated } from 'react-spring'
import DetailCard from '../common/DetailCard'

const ITEMS_PER_PAGE = 20
const Comics = () => {
    const [comics, setComics] = useState([])
    const [selectedComic, setSelectedComic] = useState(null)
    const [selectedComicId, setSelectedComicId] = useState(null)
    const [showModal, setShowModal] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(0)

    useEffect(() => {
        axios
            .get(
                `https://gateway.marvel.com:443/v1/public/comics?ts=1&apikey=c20560f4d16fdd15e1d5bc655d65fdc8&hash=bf9532152981aaf1fbb3a4dbfa9f3cbd&limit=${ITEMS_PER_PAGE}&offset=${
                    (currentPage - 1) * ITEMS_PER_PAGE
                }`
            )
            .then((res) => {
                setComics(res.data.data.results)
                setTotalPages(Math.ceil(res.data.data.total / ITEMS_PER_PAGE))
            })
            .catch((error) => console.log(error))
    }, [currentPage])

    const handleChangePage = (event, newPage) => {
        setCurrentPage(newPage)
    }

    const [hoveredCard, setHoveredCard] = useState(null)

    const handleMouseEnter = (index) => {
        setHoveredCard(index)
    }

    const handleMouseLeave = () => {
        setHoveredCard(null)
    }

    const handleCardClick = (comic) => {
        setSelectedComic(comic)
        console.log(selectedComic)
        setShowModal(true)
    }

    const closeModal = () => {
        setSelectedComicId(null)
        setShowModal(false)
    }
    return (
        <div>
            <Grid container spacing={3} sx={{ mt: 1, px: 2 }}>
                {/* <Grid container spacing={2} justifyContent="center"> */}
                {comics.map((comic, index) => (
                    <Grid item key={comic.id} xs={6} sm={6} md={4}>
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
                            onClick={() => {
                                setSelectedComicId(comic.id)
                                handleCardClick(comic)
                            }}
                        >
                            <Card
                                sx={{
                                    maxWidth: 300,
                                    margin: 'auto',
                                    height: '100%',
                                    boxShadow: 'none',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    bgcolor: 'black',
                                    color: 'white',
                                }}
                            >
                                <CardMedia
                                    component="img"
                                    height="200"
                                    image={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
                                    alt={comic.title}
                                    sx={{ boxShadow: 'none' }}
                                />

                                {/* Franja roja */}
                                <Box
                                    sx={{
                                        height: '8px',
                                        backgroundColor: 'black',
                                        display: 'flex',
                                        alignItems: 'flex-end',
                                        justifyContent: 'flex-end',
                                    }}
                                >
                                    <Box
                                        sx={{
                                            width: '20px',
                                            height: '3px',
                                            backgroundColor: 'red',
                                            transform: 'rotate(45deg)',
                                            mx: '5px',
                                        }}
                                    />
                                    <Box
                                        sx={{
                                            width: '20px',
                                            height: '3px',
                                            backgroundColor: 'red',
                                            transform: 'rotate(-45deg)',
                                        }}
                                    />
                                </Box>

                                <CardContent
                                    sx={{
                                        height: '120px',
                                        flexGrow: 1,
                                        backgroundColor: 'red',
                                        color: 'white',
                                        p: 2,
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'space-between',
                                        whiteSpace: 'pre-wrap',
                                    }}
                                >
                                    <Box>
                                        <Grid container justifyContent="space-between">
                                            <Grid item>
                                                <Typography
                                                    variant="subtitle2"
                                                    fontSize={'x-large'}
                                                    sx={{ fontWeight: 'bold' }}
                                                >
                                                    {comic.title}
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </Box>
                                    <Box>
                                        <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                                            Published:
                                        </Typography>
                                        <Typography variant="body2">{comic.dates?.published}</Typography>
                                    </Box>
                                    <Typography variant="body2" sx={{ fontWeight: 'light', mt: 1 }}>
                                        {comic.description
                                            ? comic.description.slice(0, 100) + '...'
                                            : 'No description available'}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </animated.div>
                    </Grid>
                ))}
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                    {/* Paginador con números y puntos */}
                    <Pagination
                        count={totalPages}
                        page={currentPage}
                        onChange={handleChangePage}
                        color="primary"
                        renderItem={(item) => (
                            <PaginationItem
                                component={Button}
                                {...item}
                                sx={{ bgcolor: item.page === currentPage ? 'red' : 'transparent' }}
                            />
                        )}
                    />
                </Box>
            </Grid>

            {showModal && selectedComicId && (
                <Box
                    sx={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    }}
                    onClick={closeModal}
                >
                    <DetailCard
                        title={selectedComic.title}
                        name={selectedComic.title}
                        // imageUrl={`${selectedComic.thumbnail?.path}.${selectedComic.thumbnail?.extension}`}
                        description={selectedComic.description}
                        releaseDate={selectedComic.dates?.published}
                    />
                </Box>
            )}
        </div>
    )
}

export default Comics
