import { useAppContext } from "../context/AppContext";
import productsData from "../apis/mock-data";
import ProductCard from "../components/ProductCard";
import { Grid, Typography, Box, Container } from "@mui/material";
import Header from "../components/Header";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Footer from "../components/Footer";
import { useState } from "react";
import ProductModal from "../components/ProductModal";

const FavoritesPage = () => {
  const { cartFavorite } = useAppContext();
  const favoriteProducts = productsData.filter((p) => cartFavorite.includes(p.id));
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleViewDetail = (product) => {
    setSelectedProduct(product);
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
  };
  return (
    <>
      <Header />
      <Container>
        <Box sx={{ p: 2 }}>
          <Typography variant="h5" gutterBottom sx={{ color: "#ee4d2d", fontWeight: "bold" }}>
            Danh sách sản phẩm yêu thích
          </Typography>


          {favoriteProducts.length === 0 ? (
            <Typography>Chưa có sản phẩm yêu thích.</Typography>
          ) : (
            <Swiper
              modules={[Autoplay, Navigation, Pagination]}
              spaceBetween={16}
              slidesPerView={1}
              autoplay={{ delay: 3000 }}
              loop={favoriteProducts.length > 1}
              navigation
              pagination={{ clickable: true }}
              breakpoints={{
                0: { slidesPerView: 1 },
                640: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
                1280: { slidesPerView: 4 },
              }}
              style={{ paddingBottom: 40 }}
            >
              {favoriteProducts.map((product) => (
                <SwiperSlide key={product.id}>
                  <Box sx={{ px: 1 }}>
                    <ProductCard
                      product={product}
                      onViewDetail={() => handleViewDetail(product)}
                    />
                  </Box>
                </SwiperSlide>
              ))}
            </Swiper>
          )}
        </Box>
      </Container>
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          open={Boolean(selectedProduct)}
          onClose={handleCloseModal}
        />
      )}
      <Footer />
    </>
  );
};

export default FavoritesPage;
