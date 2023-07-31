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
    const truncateTitle = (title, maxWords) => {
        const words = title.split(' ')
        if (words.length > maxWords) {
            return words.slice(0, maxWords).join(' ') + '...'
        }
        return title
    }
    return (
        <div>
            <Grid container spacing={3} sx={{ mt: 10, px: 2 }}>
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
                                            transform: 'rotate(-45deg)',
                                            mx: '5px',
                                            ml: -5,
                                        }}
                                    />
                                    <Box
                                        sx={{
                                            width: '20px',
                                            height: '3px',
                                            backgroundColor: 'red',
                                            transform: 'rotate(-45deg)',
                                            mr: -5,
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
                                        display: 'grid',
                                        gridTemplateColumns: '1fr',
                                        gridTemplateRows: '1fr auto',
                                        gridGap: '8px',
                                    }}
                                >
                                    <Typography
                                        variant="subtitle2"
                                        fontSize={'x-large'}
                                        sx={{ fontWeight: 'bold', gridColumn: '1 / span 2' }}
                                    >
                                        {truncateTitle(comic.title, 5)}
                                    </Typography>

                                    <Grid container justifyContent="space-between">
                                        <Grid item>
                                            <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                                                Published:
                                            </Typography>
                                        </Grid>
                                        <Grid item>
                                            <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                                                {comic.dates &&
                                                    comic.dates.find((date) => date.type === 'onsaleDate')?.date &&
                                                    new Date(
                                                        comic.dates.find((date) => date.type === 'onsaleDate').date
                                                    ).toLocaleDateString('en-US', {
                                                        year: 'numeric',
                                                        month: 'short',
                                                        day: 'numeric',
                                                    })}
                                            </Typography>
                                        </Grid>

                                        <Typography variant="body2" sx={{ fontWeight: 'light', mt: 1, mb: 10 }}>
                                            {comic.description
                                                ? comic.description.slice(0, 50) + '...'
                                                : 'No description available'}
                                        </Typography>
                                    </Grid>
                                </CardContent>
                            </Card>
                        </animated.div>
                    </Grid>
                ))}
            </Grid>
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2, mb: 2 }}>
                {/* Paginador con números y puntos */}
                <Pagination
                    count={totalPages}
                    page={currentPage}
                    onChange={handleChangePage}
                    renderItem={(item) => (
                        <PaginationItem
                            component={Button}
                            {...item}
                            sx={{ bgcolor: item.page === currentPage ? 'red' : 'transparent', fontWeight: 'bold' }}
                        />
                    )}
                />
            </Box>

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
                        image={`${selectedComic.thumbnail?.path}.${selectedComic.thumbnail?.extension}`}
                        description={
                            selectedComic.description
                                ? selectedComic.description.slice(0, 100) + '...'
                                : 'No description available'
                        }
                        published={
                            selectedComic.dates.find((date) => date.type === 'onsaleDate')?.date &&
                            new Date(
                                selectedComic.dates.find((date) => date.type === 'onsaleDate').date
                            ).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric',
                            })
                        }
                        numPages={selectedComic.pageCount}
                        writer={selectedComic.creators.items[1]?.name}
                        penciller={selectedComic.creators.items[0]?.name}
                    />
                </Box>
            )}
        </div>
    )
}

export default Comics
