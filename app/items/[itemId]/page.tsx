import type { Metadata, ResolvingMetadata } from 'next'
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import data from '../../data.json';
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import { notFound } from 'next/navigation'
import ArrowBack from '@mui/icons-material/ArrowBack';
import Link from 'next/link';
import Image from 'next/image';
import ItemPageActionGroup from "@/app/components/ItemPageActionGroup";

const { items } = data;

type Props = {
    params: { itemId: string }
    searchParams: { [key: string]: string | string[] | undefined }
}
export async function generateMetadata(
    { params, searchParams }: Props,
    parent: ResolvingMetadata
): Promise<Metadata> {
    // read route params
    const id = params.itemId

    // fetch data
    const item: IItem = items.find(i => i.id === Number(params.itemId))!;

    return {
        title: item.title,
    }
}

export default function ItemPage({ params, searchParams }: Props) {
    const item: IItem = items.find(i => i.id === Number(params.itemId))!;

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
                            placeholder='empty'
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
                        <ItemPageActionGroup item={item} />
                        <Typography variant='h6'>Description:</Typography>
                        <Typography>{item?.description}</Typography>
                    </Stack>
                </Grid>
            </Grid>
        </Container>
    )
}
