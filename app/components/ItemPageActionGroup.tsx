'use client';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Add from '@mui/icons-material/Add';
import Remove from '@mui/icons-material/Remove';
import AddToCartBtn from '@/app/components/AddToCartBtn';
import { useState } from 'react';

type Props = {
    item: IItem,
}

const ItemPageActionGroup: React.FC<Props> = ({ item }) => {
    const [itemQty, setItemQty] = useState(1);


    const updateItemQty = (qty: number) => {
        const newQty = itemQty + qty;
        if (newQty > 99 || newQty < 1) {
            return;
        }
        setItemQty(newQty)
    }

    return (
        <Grid container>
            <Grid>
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        pr: 4,
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
                        onClick={() => updateItemQty(-1)}
                    >
                        <Remove />
                    </IconButton>
                    <Typography>{itemQty}</Typography>
                    <IconButton
                        onClick={() => updateItemQty(1)}
                    >
                        <Add />
                    </IconButton>
                </Box>
            </Grid>
            <Grid>
                <AddToCartBtn item={item} qty={itemQty} />
            </Grid>
        </Grid>
    )
}

export default ItemPageActionGroup;
