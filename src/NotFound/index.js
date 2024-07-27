import { Button, Container, Typography } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'

/**
 * NotFound component.
 * Represents the 404 Not Found page of the application.
 * @returns {JSX.Element} NotFound component JSX.
 */
const NotFound = () => {
  return (
    <Container maxWidth="sm" sx={{ textAlign: 'center', mt: 8 }}>
      <Typography variant="h1" component="h1" gutterBottom>
        404 - Page Not Found
      </Typography>
      <Typography variant="body1" gutterBottom>
        The page you are looking for does not exist.
      </Typography>
      <Button component={RouterLink} to="/" variant="contained" color="primary">
        Go Back to Home
      </Button>
    </Container>
  )
}

export default NotFound
