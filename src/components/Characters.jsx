import React from 'react'
import axios from 'axios'
import { useEffect, useState } from 'react'
import Typography from '@mui/material/Typography'
import { Box, Button, Card, CardMedia, Grid, Pagination, PaginationItem } from '@mui/material'
import { animated } from 'react-spring'
import DetailCard from '../common/DetailCard'

const ITEMS_PER_PAGE = 20
const Characters = () => {
    const [characters, setCharacters] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const [selectedCharacter, setSelectedCharacter] = useState(null)
    const [showModal, setShowModal] = useState(false)

    useEffect(() => {
        const fetchCharacters = () => {
            axios
                .get(
                    `https://gateway.marvel.com:443/v1/public/characters?ts=1&apikey=c20560f4d16fdd15e1d5bc655d65fdc8&hash=bf9532152981aaf1fbb3a4dbfa9f3cbd&limit=${ITEMS_PER_PAGE}&offset=${
                        (currentPage - 1) * ITEMS_PER_PAGE
                    }`
                )
                .then((res) => {
                    setCharacters(res.data.data.results)
                    setTotalPages(Math.ceil(res.data.data.total / ITEMS_PER_PAGE))
                })
                .catch((error) => console.log(error))
        }

        fetchCharacters()

        return () => {
            setCharacters([])
            setCurrentPage(1)
            setTotalPages(1)
        }
    }, [currentPage])

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    const [hoveredCard, setHoveredCard] = useState(null)

    const handleMouseEnter = (index) => {
        setHoveredCard(index)
    }

    const handleMouseLeave = () => {
        setHoveredCard(null)
    }

    const handleCharacterClick = (character) => {
        setSelectedCharacter(character)
        setShowModal(true)
    }

    const closeModal = () => {
        setSelectedCharacter(null)
        setShowModal(false)
    }

    return (
        <>
            <div>
                <Grid container spacing={3} sx={{ mt: 10, px: 2 }}>
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
                                    onClick={() => handleCharacterClick(character)}
                                    sx={{
                                        maxWidth: 200,
                                        margin: 'auto',
                                        bgcolor: 'black',
                                        height: '300px',
                                        boxShadow: 'none',
                                    }}
                                >
                                    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                                        <CardMedia
                                            component="img"
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
                                                    transform: 'rotate(-45deg)',
                                                    mr: -5,
                                                }}
                                            />
                                            <Box
                                                sx={{
                                                    width: '20px',
                                                    height: '3px',
                                                    backgroundColor: 'black',
                                                    transform: 'rotate(-45deg)',
                                                    mr: 3,
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
                                            <Typography variant="body2" fontWeight={'bold'} fontSize={'large'}>
                                                {character.comics.items[0]?.name}
                                            </Typography>
                                        </Box>
                                    </Box>
                                </Card>
                            </animated.div>
                        </Grid>
                    ))}
                </Grid>
                {/* Modal para mostrar el detalle del personaje */}
                {showModal && selectedCharacter && (
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
                            name={selectedCharacter.name}
                            image={`${selectedCharacter.thumbnail?.path}.${selectedCharacter.thumbnail?.extension}`}
                            description={selectedCharacter.description}
                        />
                    </Box>
                )}
                {/* Renderizar el paginador */}
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 2 }}>
                    <Pagination
                        count={totalPages}
                        page={currentPage}
                        onChange={handlePageChange}
                        sx={{ fontWeight: 'bold' }}
                        renderItem={(item) => (
                            <PaginationItem
                                component={Button}
                                {...item}
                                sx={{
                                    bgcolor: item.page === currentPage ? 'red' : 'transparent',
                                    color: 'black',
                                    fontWeight: 'bold',
                                }}
                            />
                        )}
                    />
                </Box>
            </div>
        </>
    )
}

export default Characters
