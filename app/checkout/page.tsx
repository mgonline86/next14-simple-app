'use client'

import { Fragment, useState } from 'react';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import CartTable from '../components/CartTable';
import { useCartStore } from '../stores/cartStore';
import Link from 'next/link';
import ArrowBack from '@mui/icons-material/ArrowBack';
import { useRouter } from 'next/navigation'
import { createId } from '../utils';


export default function Checkout() {
    const router = useRouter()
    const { resetCart, lineItems } = useCartStore();
    const handleCheckout = () => {
        setOrderPlaced(true);
        setTimeout(() => {
            resetCart();
            router.push('/');
        }, 5000)
    }

    const [orderPlaced, setOrderPlaced] = useState(false)

    if (!lineItems.length) {
        return (
            <Fragment>
                <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
                    <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
                        <Typography component="h1" variant="h4" align="center" gutterBottom>
                            Your Cart is Empty !
                        </Typography>
                        <Box textAlign="center" my={3}>
                            <Link href="/">
                                <Button variant='contained' onClick={handleCheckout}>
                                    Back to HomePage
                                </Button>
                            </Link>
                        </Box>
                    </Paper>
                </Container>
            </Fragment>
        )
    }
    return (
        <Fragment>
            <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
                <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
                    <Box>
                        <Link href="/">
                            <IconButton>
                                <ArrowBack />
                            </IconButton>
                        </Link>
                    </Box>
                    <Typography component="h1" variant="h4" align="center">
                        Checkout
                    </Typography>
                    {orderPlaced ? (
                        <Fragment>
                            <Typography variant="h5" gutterBottom>
                                Thank you for your order.
                            </Typography>
                            <Typography variant="subtitle1">
                                Your order number is #{createId()}. We have emailed your order
                                confirmation, and will send you an update when your order has
                                shipped.
                            </Typography>
                            <Box textAlign="center" my={3}>
                                <Link href="/">
                                    <Button variant='contained' onClick={handleCheckout}>
                                        Back to HomePage
                                    </Button>
                                </Link>
                            </Box>
                            <Typography variant='subtitle2' sx={{ color:'chartreuse', my: 2 }}>Redirecting to Hompage in 5 seconds...</Typography>
                        </Fragment>
                    ) : (
                        <Fragment>
                            <Typography variant="h6" gutterBottom>
                                Order summary
                            </Typography>
                            <CartTable />
                            <Button variant='contained' fullWidth onClick={handleCheckout}>
                                Confirm Order
                            </Button>
                        </Fragment>
                    )}
                </Paper>
            </Container>
        </Fragment>
    );
}