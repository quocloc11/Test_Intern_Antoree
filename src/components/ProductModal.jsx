import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  Rating,
} from "@mui/material";

const ProductModal = ({ product, open, onClose }) => {
  if (!product) return null;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{product.name}</DialogTitle>
      <DialogContent>
        <img
          src={product.image}
          alt={product.name}
          style={{ width: "100%", borderRadius: 8 }}
        />
        <Typography sx={{ mt: 2 }}>{product.fullDesc}</Typography>
        <Typography sx={{ mt: 2 }} color="primary">
          {product.price.toLocaleString()} VND
        </Typography>
        <Rating value={product.rating} precision={0.1} readOnly />
      </DialogContent>
    </Dialog>
  );
};

export default ProductModal;
