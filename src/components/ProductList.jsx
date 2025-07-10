import { useState, useEffect } from "react";
import {
  Grid, Box, Typography, Divider, FormControlLabel, Checkbox,
  TextField, Slider, Button, CircularProgress
} from "@mui/material";
import ProductCard from "./ProductCard";
import ProductModal from "./ProductModal";
import { getSuggestions } from "../apis/suggestions";
import productsData from "../apis/mock-data";
import { useAppContext } from "../context/AppContext";
const ProductList = () => {
  const [products, setProducts] = useState(productsData);
  const [favorites, setFavorites] = useState([]);
  const [modalProduct, setModalProduct] = useState(null);
  const [suggested, setSuggested] = useState([]);
  const [loadingSuggest, setLoadingSuggest] = useState(false);
  const [errorSuggest, setErrorSuggest] = useState(null);
  const [viewed, setViewed] = useState([]);

  // Bộ lọc giá
  const priceOptions = [
    { label: "Dưới 500K", value: "lt500" },
    { label: "500K - 1 triệu", value: "500to1m" },
    { label: "Trên 1 triệu", value: "gt1m" },
  ];
  const [selectedPrices, setSelectedPrices] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 50000000]);
  const { cartFavorite, setCartFavorite } = useAppContext();
  const handlePriceChange = (e) => {
    const { value, checked } = e.target;
    setSelectedPrices((prev) =>
      checked ? [...prev, value] : prev.filter((v) => v !== value)
    );
  };

  const handleSliderPriceChange = (event, newValue) => {
    setPriceRange(newValue);
  };

  useEffect(() => {
    let filtered = productsData;

    if (selectedPrices.length > 0) {
      filtered = filtered.filter((p) =>
        selectedPrices.some((key) =>
          key === "lt500" ? p.price < 500000 :
            key === "500to1m" ? p.price >= 500000 && p.price <= 1000000 :
              key === "gt1m" ? p.price > 1000000 : true
        )
      );
    }

    filtered = filtered.filter(p =>
      p.price >= priceRange[0] && p.price <= priceRange[1]
    );

    setProducts(filtered);
  }, [selectedPrices, priceRange]);


  const handleToggleFavorite = (id) => {
    if (cartFavorite.includes(id)) {
      setCartFavorite(cartFavorite.filter((f) => f !== id));
    } else {
      setCartFavorite([...cartFavorite, id]);
    }
  };

  const handleViewDetail = (product) => {
    setModalProduct(product);
    if (!viewed.includes(product.id)) {
      setViewed((prev) => [...prev, product.id]);
    }
  };

  const handleGetSuggestions = async () => {
    try {
      setLoadingSuggest(true);
      setErrorSuggest(null);
      const result = await getSuggestions("user123", favorites, viewed);
      setSuggested(result);
    } catch (err) {
      setErrorSuggest("Không thể lấy gợi ý lúc này");
    } finally {
      setLoadingSuggest(false);
    }
  };

  return (
    <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, gap: 2 }}>
      {/* Bộ lọc */}
      <Box sx={{ width: { xs: "100%", md: 280 }, p: 2, border: "1px solid #ccc", borderRadius: 2 }}>
        <Typography variant="h6">Bộ lọc tìm kiếm</Typography>
        <Typography variant="subtitle1" fontWeight="bold">Mức giá</Typography>
        <Divider sx={{ mb: 1 }} />
        {priceOptions.map((opt) => (
          <FormControlLabel
            key={opt.value}
            control={<Checkbox checked={selectedPrices.includes(opt.value)} onChange={handlePriceChange} value={opt.value} />}
            label={opt.label}
          />
        ))}
        <Typography mt={2}>Hoặc nhập khoảng giá:</Typography>
        <Box display="flex" gap={1} mb={2}>
          <TextField size="small" value={priceRange[0].toLocaleString("vi-VN") + "đ"} inputProps={{ readOnly: true }} fullWidth />
          <TextField size="small" value={priceRange[1].toLocaleString("vi-VN") + "đ"} inputProps={{ readOnly: true }} fullWidth />
        </Box>
        <Slider value={priceRange} onChange={handleSliderPriceChange} valueLabelDisplay="auto" min={0} max={50000000} step={100000} />
      </Box>

      {/* Danh sách sản phẩm */}
      <Box sx={{ flexGrow: 1 }}>
        {/* Nút gợi ý */}
        <Box display="flex" justifyContent="flex-end" mb={2}>
          <Button variant="contained" onClick={handleGetSuggestions}>Gợi ý sản phẩm phù hợp</Button>
        </Box>

        {/* Gợi ý */}
        {loadingSuggest && <CircularProgress />}
        {errorSuggest && <Typography color="error">{errorSuggest}</Typography>}

        {suggested.length > 0 && (
          <>
            <Typography variant="h6" gutterBottom>Sản phẩm gợi ý</Typography>
            <Grid container spacing={3} mb={2}>
              {suggested.map((product) => (
                <Grid item xs={12} sm={6} md={3} key={product.id}>
                  <ProductCard
                    product={product}
                    onViewDetail={handleViewDetail}
                    onToggleFavorite={handleToggleFavorite}
                    isFavorite={cartFavorite.includes(product.id)}

                  />
                </Grid>
              ))}
            </Grid>
          </>
        )}

        {/* Danh sách chính */}
        <Grid container spacing={3}>
          {products.map((product) => (
            <Grid item xs={12} sm={6} md={3} key={product.id}>
              <ProductCard
                product={product}
                onViewDetail={handleViewDetail}
                onToggleFavorite={handleToggleFavorite}
                isFavorite={favorites.includes(product.id)}
              />
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Modal chi tiết */}
      <ProductModal
        product={modalProduct}
        open={!!modalProduct}
        onClose={() => setModalProduct(null)}
      />
    </Box>
  );
};

export default ProductList;
