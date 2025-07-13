import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  Rating,
  Box,
  IconButton,
  DialogActions,
  Button,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const ProductModal = ({ product, open, onClose }) => {
  if (!product) return null;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          fontWeight: "bold",
          fontSize: "1.25rem",
          color: "#ee4d2d",
        }}
      >
        {product.name}
        <IconButton onClick={onClose} size="small">
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent>
        <Box
          component="img"
          src={product.image}
          alt={product.name}
          sx={{
            width: "100%",
            borderRadius: 2,
            objectFit: "contain",
            maxHeight: 300,
            mb: 2,
            boxShadow: 1,
          }}
        />

        <Typography variant="body1" sx={{ mb: 2 }}>
          {product.fullDesc}
        </Typography>

        <Typography
          variant="h6"
          sx={{
            fontWeight: "bold",
            mb: 1,
            color: "#ee4d2d",
          }}
        >
          {product.price.toLocaleString("vi-VN")} VND
        </Typography>

        <Rating value={product.rating} precision={0.1} readOnly />
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#ee4d2d",
            color: "#fff",
            textTransform: "none",
            "&:hover": {
              backgroundColor: "#d8431b",
            },
          }}
          onClick={onClose}
        >
          Đóng
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ProductModal;
