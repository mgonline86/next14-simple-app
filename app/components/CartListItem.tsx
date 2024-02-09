import { Fragment } from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Add from '@mui/icons-material/Add';
import DeleteForever from '@mui/icons-material/DeleteForever';
import Remove from '@mui/icons-material/Remove';
import { useCartStore } from '../stores/cartStore';


type Props = {
    item: lineItem
}


const CartListItem: React.FC<Props> = ({ item }) => {

    const { removeLineItem, updateLineItem } = useCartStore();

    return (
        <Fragment>
            <ListItem alignItems="flex-start" sx={{ pb: 0 }} data-testid="cart-list-item">
                <ListItemAvatar>
                    <Avatar alt={item.title} src={item.thumbnail} />
                </ListItemAvatar>
                <ListItemText
                    primary={<Typography variant='body1'>{item.title}</Typography>}
                    secondary={
                        <Fragment>
                            <Typography
                                sx={{ display: 'inline' }}
                                component="span"
                                variant="body2"
                                color="text.primary"
                            >
                                ${item.price}
                            </Typography>
                        </Fragment>
                    }
                />
                <IconButton edge="end" onClick={() => removeLineItem(item.id)}>
                    <DeleteForever />
                </IconButton>
            </ListItem>
            <Box
                component='li'
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    px: 2,
                }}
            >
                <Typography
                    sx={{ display: 'inline' }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                >
                    Qty:
                </Typography>
                <IconButton
                    onClick={
                        () => updateLineItem(item.id, item.qty - 1)
                    }
                >
                    <Remove />
                </IconButton>
                <Typography>{item.qty}</Typography>
                <IconButton
                    onClick={
                        () => updateLineItem(item.id, item.qty + 1)
                    }
                >
                    <Add />
                </IconButton>
            </Box>
        </Fragment>
    )
}


export default CartListItem;