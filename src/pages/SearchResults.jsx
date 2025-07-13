import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import productsData from "../apis/mock-data";
import ProductCard from "../components/ProductCard";
import { Grid, Typography, Box, FormControlLabel, Checkbox, Slider, TextField, Divider, Container } from "@mui/material";
import Header from "../components/Header";
import Footer from "../components/Footer";

const useQuery = () => new URLSearchParams(useLocation().search);

const SearchResults = () => {
  const query = useQuery();
  const keyword = query.get("keyword") || "";
  const [results, setResults] = useState([]);
  const [selectedPrices, setSelectedPrices] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 50000000]);

  const priceOptions = [
    { label: "Dưới 500K", value: "lt500" },
    { label: "Từ 500K - 1 triệu", value: "500to1m" },
    { label: "Trên 1 triệu", value: "gt1m" },
  ];

  useEffect(() => {
    let filtered = productsData.filter(p =>
      p.name.toLowerCase().includes(keyword.toLowerCase())
    );

    if (selectedPrices.length > 0) {
      filtered = filtered.filter((p) =>
        selectedPrices.some((key) =>
          key === "lt500"
            ? p.price < 500000
            : key === "500to1m"
              ? p.price >= 500000 && p.price <= 1000000
              : key === "gt1m"
                ? p.price > 1000000
                : true
        )
      );
    }

    filtered = filtered.filter(
      (p) => p.price >= priceRange[0] && p.price <= priceRange[1]
    );

    setResults(filtered);
  }, [keyword, selectedPrices, priceRange]);

  const handlePriceChange = (e) => {
    const value = e.target.value;
    setSelectedPrices(prev =>
      prev.includes(value) ? prev.filter(v => v !== value) : [...prev, value]
    );
  };

  const handleSliderPriceChange = (e, newValue) => {
    setPriceRange(newValue);
  };

  return (
    <>
      <Header />
      <Container>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: 2,
            mt: 2,
            maxWidth: 1200,
            mx: "auto",
          }}
        >
          {/* Bộ lọc bên trái */}
          <Box
            sx={{
              flexShrink: 0,
              width: { xs: "100%", md: 200 },
              p: 2,
              border: "1px solid #ddd",
              borderRadius: 2,
              backgroundColor: "#fff",
              boxShadow: 1,
            }}
          >
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Bộ lọc tìm kiếm
            </Typography>

            <Typography variant="subtitle1" fontWeight="bold">
              Mức giá
            </Typography>
            <Divider sx={{ mb: 1 }} />

            {priceOptions.map((opt) => (
              <FormControlLabel
                key={opt.value}
                control={
                  <Checkbox
                    checked={selectedPrices.includes(opt.value)}
                    onChange={handlePriceChange}
                    value={opt.value}
                  />
                }
                label={opt.label}
              />
            ))}

            <Typography mt={2}>Hoặc nhập khoảng giá:</Typography>
            <Box display="flex" gap={1} mb={2}>
              <TextField
                size="small"
                value={priceRange[0].toLocaleString("vi-VN") + "đ"}
                inputProps={{ readOnly: true }}
                fullWidth
              />
              <TextField
                size="small"
                value={priceRange[1].toLocaleString("vi-VN") + "đ"}
                inputProps={{ readOnly: true }}
                fullWidth
              />
            </Box>

            <Slider
              value={priceRange}
              onChange={handleSliderPriceChange}
              valueLabelDisplay="auto"
              min={0}
              max={50000000}
              step={100000}
              sx={{ color: "primary.main" }}
            />
          </Box>
          \
          <Box
            sx={{
              flexGrow: 1,
              minWidth: 0,
              minHeight: 300,
              borderRadius: 2,
              p: 2,
              mb: 3,
              backgroundColor: "#f9f9f9",
              boxShadow: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: results.length === 0 ? "center" : "stretch",
              justifyContent: results.length === 0 ? "center" : "flex-start",
            }}
          >
            <Typography variant="h6" gutterBottom fontWeight="bold">
              Kết quả tìm kiếm: "{keyword}"
            </Typography>

            {results.length === 0 ? (
              <Box
                sx={{
                  flexGrow: 1,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  color: "text.secondary",
                  fontStyle: "italic",
                  fontSize: 16,
                  textAlign: "center",
                }}
              >
                Không tìm thấy sản phẩm nào phù hợp
              </Box>
            ) : (
              <Box
                sx={{
                  display: "grid",
                  gap: 2,
                  flexGrow: 1,
                  gridTemplateColumns: {
                    xs: "repeat(2, 1fr)",
                    sm: "repeat(3, 1fr)",
                    md: "repeat(4, 1fr)",
                  },
                  width: "100%",
                }}
              >
                {results.map((product) => (
                  <Box
                    key={product.id}
                    sx={{
                      backgroundColor: "#fff",
                      borderRadius: 2,
                      overflow: "hidden",
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
                      onViewDetail={() => { }}
                      onToggleFavorite={() => { }}
                      isFavorite={false}
                    />
                  </Box>
                ))}
              </Box>
            )}
          </Box>
        </Box>
      </Container>
      <Footer />
    </>
  );
};

export default SearchResults;
