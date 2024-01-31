import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';

function Copyright() {
    return (
        <Typography variant="body2" color="InactiveCaptionText">
            {'Copyright © '}
            <Link color="inherit" href="mailto:mgonline86@yahoo.com">
                Mohamed Gamal Elasyed
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

export default function AppFooter() {
    return (
        <Box
            component="footer"
            sx={{
                pt: 6,
                pb: 3,
                px: 2,
                mt: 'auto',
                textAlign: 'center',
            }}
        >
            <Container maxWidth="sm">
                <Copyright />
            </Container>
        </Box>
    );
}