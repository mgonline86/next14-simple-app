import { Fragment } from 'react';
import Toolbar from '@mui/material/Toolbar';
import CartDrawer from './CartDrawer';
import AppBar from '@mui/material/AppBar';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Link from 'next/link';

const AppNavBar: React.FC = () => {

    return (
        <Fragment>
            <AppBar position="sticky" sx={{ borderBottom: 1 }} >
                <Container>
                    <Toolbar>
                        <Box sx={{ flex: 1 }}>
                            <Box width='fit-content'>
                                <Link href='/'>
                                    <Avatar alt="E2E County" src="/e2e_county_logo.jpg" />
                                </Link>
                            </Box>
                        </Box>
                        <CartDrawer />
                    </Toolbar>
                </Container>
            </AppBar>
        </Fragment>
    );
}

export default AppNavBar;
