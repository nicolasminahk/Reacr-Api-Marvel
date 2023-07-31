import { useMediaQuery, Box, Typography, CardMedia, IconButton } from '@mui/material'

const DetailCard = ({ name, image, illustrator, releaseDate, numPages, description, published, writer, penciller }) => {
    const isMobile = useMediaQuery('(max-width: 600px)')
    console.log(name, description, image)

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mx: isMobile ? '1rem' : 0 }}>
            {/* Imagen ocupando casi toda la pantalla */}
            <img src={image} alt={name} style={{ width: '100%', height: '80vh', objectFit: 'cover' }} />

            {/* Contenedor blanco con letras rojas */}
            <Box
                sx={{
                    textAlign: 'left',
                    mt: 2,
                    p: 2,
                    mb: 10,
                    backgroundColor: 'white',
                    color: 'red',
                    position: 'relative',
                    width: isMobile ? '100%' : '80%',
                    maxWidth: isMobile ? 'none' : '600px',
                    mx: 'auto',
                    alignItems: 'flex-start',
                }}
            >
                <Typography variant="h4" sx={{ mb: 2, fontWeight: 'bold' }}>
                    {name}
                </Typography>

                {/* Otras características */}
                {published && (
                    <Typography variant="subtitle1" fontWeight={'bold'} fontSize={'larger'}>
                        Published: {published}
                    </Typography>
                )}
                {writer && (
                    <Typography variant="subtitle1" fontWeight={'bold'} fontSize={'larger'}>
                        Writer: {writer}
                    </Typography>
                )}
                {penciller && (
                    <Typography variant="subtitle1" fontWeight={'bold'} fontSize={'larger'}>
                        Penciller: {penciller}
                    </Typography>
                )}
                {numPages && (
                    <Typography variant="subtitle1" fontWeight={'bold'} fontSize={'larger'}>
                        N° Pages: {numPages}
                    </Typography>
                )}
                {/* Descripción con máximo de 2 renglones */}
                {description && (
                    <Typography
                        variant="body1"
                        sx={{
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical',
                            mt: 2,
                        }}
                    >
                        {description}
                    </Typography>
                )}
            </Box>
        </Box>
    )
}

export default DetailCard
