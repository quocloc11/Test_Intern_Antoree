import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  CardActions,
  IconButton,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

const ProductCard = ({ product, onViewDetail, onToggleFavorite, isFavorite }) => {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        height="180"
        image={product.image}
        alt={product.name}
      />
      <CardContent>
        <Typography variant="h6" component="div">{product.name}</Typography>
        <Typography color="text.secondary">{product.shortDesc}</Typography>
        <Typography sx={{ mt: 1 }} color="primary">
          {product.price.toLocaleString()} VND
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={() => onViewDetail(product)}>Xem chi tiết</Button>
        <IconButton onClick={() => onToggleFavorite(product.id)} color="error">
          {isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
        </IconButton>

        {/* FavoriteIcon
        FavoriteBorderIcon */}
      </CardActions>
    </Card>
  );
};

export default ProductCard;
