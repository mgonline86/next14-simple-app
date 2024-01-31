'use client';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import data from '../../data.json';
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import { notFound } from 'next/navigation'
import Add from '@mui/icons-material/Add';
import ArrowBack from '@mui/icons-material/ArrowBack';
import Remove from '@mui/icons-material/Remove';
import Link from 'next/link';
import { useState } from 'react';
import AddToCartBtn from '@/app/components/AddToCartBtn';
import Image from 'next/image';

export default function ItemPage({ params }: { params: { itemId: string } }) {
    const { items } = data;
    const item: IItem = items.find(i => i.id === Number(params.itemId))!;

    const [itemQty, setItemQty] = useState(1);



    const updateItemQty = (qty: number) => {
        const newQty = itemQty + qty;
        if (newQty > 99 || newQty < 1) {
            return;
        }
        setItemQty(newQty)
    }


    if (!item) {
        return notFound()
    }
    return (
        <Container component="main">
            <Box my={3}>
                <Link href='/'>
                    <IconButton>
                        <ArrowBack />
                    </IconButton>
                </Link>
            </Box>
            <Grid container spacing={3} columns={{ xs: 4, md: 12 }}>
                <Grid xs={4} md={6}>
                    <Box sx={{ height: "300px", width: '100%', position: 'relative' }}>
                        <Image
                            src={item?.thumbnail}
                            alt={item?.title}
                            fill={true}
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            priority={true}
                            placeholder = 'empty'
                            style={{
                                objectFit: "cover",
                                objectPosition: "top",
                                borderRadius: 10,
                            }}
                        />
                    </Box>
                </Grid>
                <Grid xs={4} md={6}>
                    <Stack spacing={2}>
                        <Typography gutterBottom variant='h4'>{item?.title}</Typography>
                        <Rating name="read-only" value={item?.rating} precision={0.1} readOnly />
                        <Typography variant='h6'>Price: ${item.price}</Typography>
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
                        <Typography variant='h6'>Description:</Typography>
                        <Typography>{item?.description}</Typography>
                    </Stack>
                </Grid>
            </Grid>
        </Container>
    )
}
