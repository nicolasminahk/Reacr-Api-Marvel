import { useMediaQuery, Box, Typography, CardMedia } from '@mui/material'

const DetailCard = ({ name, image, illustrator, releaseDate, numPages, edition, description }) => {
    const isMobile = useMediaQuery('(max-width: 600px)')
    console.log(name, description)

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <img src={image} alt={name} style={{ width: isMobile ? '100%' : '80%' }} />
            <Box sx={{ textAlign: 'center', mt: 2 }}>
                {/* <CardMedia component="img" height="200" image={image} alt={name} sx={{ boxShadow: 'none' }} /> */}
                <Typography variant="h4">{name}</Typography>
                <Typography variant="h4">{description}</Typography>

                {illustrator && <Typography variant="subtitle1">Illustrator: {illustrator}</Typography>}
                {releaseDate && <Typography variant="subtitle1">Release Date: {releaseDate}</Typography>}
                {numPages && <Typography variant="subtitle1">Number of Pages: {numPages}</Typography>}
                {edition && <Typography variant="subtitle1">Edition: {edition}</Typography>}
            </Box>
        </Box>
    )
}

export default DetailCard
