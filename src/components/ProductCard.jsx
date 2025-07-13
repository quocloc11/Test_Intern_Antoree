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
    <Card sx={{ width: "100%", display: 'flex', flexDirection: 'column' }}>
      <CardMedia
        component="img"
        image={product.image}
        alt={product.name}
        sx={{
          width: "100%",
          height: "auto",
          objectFit: "contain",
          borderRadius: 1,
        }}
      />

      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="h6">{product.name}</Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            WebkitLineClamp: 1,
            WebkitBoxOrient: "vertical"
          }}
        >
          {product.shortDesc}
        </Typography>

        <Typography sx={{ mt: 1, color: "#ee4d2d", fontWeight: "bold" }}>
          {product.price.toLocaleString()} VND
        </Typography>
      </CardContent>

      <CardActions sx={{ justifyContent: "space-between", px: 1 }}>
        <Button
          size="small"
          onClick={() => onViewDetail(product)}
          sx={{
            color: "#fff",
            backgroundColor: "#ee4d2d",
            textTransform: "none",
            fontWeight: "bold",
            borderRadius: 1,
            px: 2,
            '&:hover': {
              backgroundColor: "#d94427",
            },
          }}
        >
          Xem chi tiết
        </Button>

        <IconButton onClick={() => onToggleFavorite(product.id)} color="error">
          {isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
        </IconButton>
      </CardActions>

    </Card>

  );
};

export default ProductCard;
