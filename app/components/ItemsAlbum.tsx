import Box from "@mui/material/Box";
import Grid from '@mui/material/Unstable_Grid2';
import Typography from "@mui/material/Typography";
import ItemCard from "./ItemCard";

type Props = {
    items: Array<IItem>
}

const ItemsAlbum: React.FC<Props> = ({ items }) => {

    if (!items.length) {
        return (
            <Box mt={6}>
                <Typography variant="h4" textAlign='center'>No Items Found!</Typography>
            </Box>
        )
    }

    return (
        <Box>
            <Grid
                container
                rowSpacing={6}
                columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                columns={{ xs: 2, sm: 8, md: 10, lg: 12 }}
                justifyContent='center'
                sx={{
                    maxWidth: '100%',
                    m: 'auto',
                }}
            >
                {items.map(i =>
                    <Grid key={i.id} xs={2} sm={4} md={3}>
                        <ItemCard item={i} />
                    </Grid>
                )}
            </Grid>
        </Box>
    )
}

export default ItemsAlbum;