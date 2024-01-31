import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CardActionArea from '@mui/material/CardActionArea';
import CardActions from '@mui/material/CardActions';
import AddToCartBtn from './AddToCartBtn';

type Props = {
  item: IItem
}

const ItemCard: React.FC<Props> = ({ item }) => {

  return (
    <Card
      sx={{
        maxWidth: 345,
        mx: 'auto',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        textAlign: 'center',
      }}
    >
      <CardActionArea href={`/items/${item.id}`}>
        <CardMedia
          component="img"
          height="150"
          image={item.thumbnail}
          alt={item.title}
        />
        <CardContent>
          <Typography
            gutterBottom
            noWrap
            variant="subtitle1"
            sx={{
              textTransform: 'uppercase',
              fontWeight: 600,
            }}
          >
            {item.title}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {item.description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <Box sx={{ width: "100%" }}>
        <Typography variant="h5">
          ${item.price}
        </Typography>
        <CardActions sx={{ width: '100%' }}>
          <AddToCartBtn item={item} />
        </CardActions>
      </Box>
    </Card>
  );
}

export default ItemCard;