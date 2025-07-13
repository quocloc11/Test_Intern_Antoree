import { useState, useEffect } from "react";
import {
  Grid, Box, Typography, Button, CircularProgress
} from "@mui/material";
import { toast } from "react-toastify";
import ProductCard from "./ProductCard";
import ProductModal from "./ProductModal";
import { getSuggestions } from "../apis/suggestions";
import productsData from "../apis/mock-data";
import { useAppContext } from "../context/AppContext";
import 'swiper/css';
import 'swiper/css/navigation';
const ProductList = ({ searchTerm }) => {
  const [products, setProducts] = useState(productsData);
  const [favorites, setFavorites] = useState([]);
  const [modalProduct, setModalProduct] = useState(null);
  const [suggested, setSuggested] = useState([]);
  const [loadingSuggest, setLoadingSuggest] = useState(false);
  const [errorSuggest, setErrorSuggest] = useState(null);
  const [viewed, setViewed] = useState([]);
  const [visibleCount, setVisibleCount] = useState(10);

  const [selectedPrices, setSelectedPrices] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 50000000]);
  const { cartFavorite, setCartFavorite } = useAppContext();
  const { viewHistory, setViewHistory } = useAppContext();

  const handleShowMore = () => {
    setVisibleCount((prev) => prev + 4);
  };
  useEffect(() => {
    let filtered = productsData;
    if (searchTerm && searchTerm.trim() !== "") {
      filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(searchTerm.trim().toLowerCase())
      );
    }
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
  }, [selectedPrices, priceRange, searchTerm]);


  const handleToggleFavorite = (id) => {
    if (cartFavorite.includes(id)) {
      setCartFavorite(cartFavorite.filter((f) => f !== id));
      toast.error("Đã xóa khỏi danh sách yêu thích");
    } else {
      setCartFavorite([...cartFavorite, id]);
      toast.success("Đã thêm vào danh sách yêu thích");
    }
  };

  const handleViewDetail = (product) => {
    setModalProduct(product);

    setViewHistory((prev) => {
      const exists = prev.find((p) => p.id === product.id);
      if (exists) return prev;
      return [product, ...prev.slice(0, 9)];
    });
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
    <Box sx={{ width: "100%" }}>
      <Box sx={{ flexGrow: 1 }}>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          mb={2}
          mt={2}
        >
          <Button
            onClick={handleGetSuggestions}
            sx={{
              backgroundColor: '#ee4d2d',
              color: '#fff',
              '&:hover': {
                backgroundColor: '#d94427',
              },
              textTransform: 'none',
              fontWeight: 'bold',
              px: 3,
              py: 1.2,
              borderRadius: 2,
            }}
          >
            Gợi ý sản phẩm phù hợp
          </Button>
        </Box>


        {loadingSuggest && (
          <Box textAlign="center" my={2}>
            <CircularProgress />
          </Box>
        )}

        {errorSuggest && (
          <Typography color="error" textAlign="center" mb={2}>
            {errorSuggest}
          </Typography>
        )}

        {suggested.length > 0 && (
          <Box
            sx={{
              borderRadius: 2,
              p: 2,
              mb: 3,
              backgroundColor: "#f9f9f9",
              boxShadow: 2,
            }}
          >
            <Typography variant="h6" gutterBottom sx={{ color: '#ee4d2d', fontWeight: "bold" }}>
              Sản phẩm gợi ý
            </Typography>

            <Box
              sx={{
                display: "grid",
                gap: 2,
                gridTemplateColumns: {
                  xs: "repeat(2, 1fr)",
                  sm: "repeat(3, 1fr)",
                  md: "repeat(5, 1fr)",
                },
              }}
            >
              {suggested.map((product) => (
                <Box
                  key={product.id}
                  sx={{
                    borderRadius: 2,
                    overflow: "hidden",
                    backgroundColor: "#fff",
                    boxShadow: 1,
                    transition: "transform 0.3s ease, box-shadow 0.3s ease",
                    ":hover": {
                      transform: "translateY(-4px)",
                      boxShadow: 4,
                    },
                    display: "flex",
                    flexDirection: "column",
                    height: "100%",
                  }}
                >
                  <ProductCard
                    product={product}
                    onViewDetail={handleViewDetail}
                    onToggleFavorite={handleToggleFavorite}
                    isFavorite={cartFavorite.includes(product.id)}
                  />
                </Box>
              ))}
            </Box>
          </Box>
        )}

        <Typography
          variant="h6"
          gutterBottom
          sx={{ fontWeight: "bold", color: "#ee4d2d", mt: 4 }}
        >
          Tất Cả Sản Phẩm
        </Typography>

        <Box sx={{ width: "100%", mx: "auto" }}>
          <Box
            sx={{
              cursor: 'pointer',
              display: "grid",
              gap: 2,
              gridTemplateColumns: {
                xs: "repeat(2, 1fr)",
                sm: "repeat(3, 1fr)",
                md: "repeat(5, 1fr)",
              },
            }}
          >
            {products.slice(0, visibleCount).map((product) => (
              <Box
                key={product.id}
                sx={{
                  width: "100%",
                  height: "100%",
                  borderRadius: 2,
                  overflow: "hidden",
                  boxShadow: 2,
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  ":hover": {
                    transform: "translateY(-4px)",
                    boxShadow: 4,
                  },
                  backgroundColor: "#fff",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <ProductCard
                  product={product}
                  onViewDetail={handleViewDetail}
                  onToggleFavorite={handleToggleFavorite}
                  isFavorite={cartFavorite.includes(product.id)}
                />
              </Box>
            ))}
          </Box>

          {visibleCount < products.length && (
            <Box textAlign="center" mt={3}>
              <Button
                onClick={handleShowMore}
                sx={{
                  backgroundColor: '#ee4d2d',
                  color: '#fff',
                  '&:hover': {
                    backgroundColor: '#d94427',
                  },
                  textTransform: 'none',
                  fontWeight: 'bold',
                  px: 3,
                  py: 1.2,
                  borderRadius: 2,
                }}
              >
                Xem thêm
              </Button>
            </Box>

          )}
        </Box>


      </Box>

      <ProductModal
        product={modalProduct}
        open={!!modalProduct}
        onClose={() => setModalProduct(null)}
      />
    </Box>
  );
};

export default ProductList;
