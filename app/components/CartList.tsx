import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import CartListItem from './CartListItem';
import { Fragment } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useCartStore } from '../stores/cartStore';
import Link from 'next/link';


const CartList: React.FC = () => {
    const { closeDrawer, lineItems } = useCartStore();

    const cartTotalPrice: number = lineItems.reduce(
        (a, b) => a + (b.qty * b.price),
        0,
    )

    if (!lineItems.length) {
        return (<Typography variant="h5" sx={{ textAlign: 'center', p: 4 }}>Your Cart is Empty!</Typography>);
    }

    return (
        <Fragment>
            <List
                sx={{
                    width: '100%',
                    bgcolor: 'background.paper',
                    flex: 1,
                    overflowY: 'auto',
                    borderRadius: 5,
                }}
            >
                {
                    lineItems.map((item, i) =>
                        <Fragment key={item.id}>
                            <CartListItem item={item} />
                            {
                                i < lineItems.length-1 &&
                                <Divider variant="inset" component="li" />
                            }
                        </Fragment>
                    )
                }
            </List>
            <Typography variant='h6' sx={{ textAlign: 'center', mt: 2, mb: 3 }}>Total: ${cartTotalPrice}</Typography>
            <Divider />
            <Box sx={{ textAlign: 'center', py: 2 }}>
                <Link href='/checkout' onClick={closeDrawer}>
                    <Button variant="contained" >Checkout</Button>
                </Link>
            </Box>
        </Fragment>
    );
}

export default CartList;