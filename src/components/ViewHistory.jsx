import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Box, Typography } from "@mui/material";
import { useAppContext } from '../context/AppContext';

const ViewHistory = () => {
  const { viewHistory } = useAppContext();

  if (!Array.isArray(viewHistory) || viewHistory.length === 0) return null;

  return (
    <Box
      sx={{
        maxWidth: '1200px',
        mx: 'auto',
        px: 2,
        py: 4,
        border: '1px solid #e0e0e0',
        borderRadius: '16px',
        mt: 5,
        bgcolor: '#fff',
        boxShadow: 2,
      }}
    >
      <Typography
        variant="h6"
        fontWeight="bold"
        gutterBottom
        sx={{
          mb: 3,
          fontSize: '1.75rem',
          lineHeight: 1.4,
          letterSpacing: '0.5px',
          textTransform: 'uppercase',
          color: '#ee4d2d',
        }}
      >
        Sản phẩm đã xem
      </Typography>

      <Swiper
        modules={[Navigation]}
        spaceBetween={16}
        slidesPerView={4}
        navigation
        breakpoints={{
          0: { slidesPerView: 1 },
          600: { slidesPerView: 2 },
          900: { slidesPerView: 3 },
          1200: { slidesPerView: 4 },
        }}
      >
        {viewHistory.map((product, index) => (
          <SwiperSlide key={index}>
            <Box
              sx={{
                backgroundColor: '#f9f9f9',
                p: 2,
                borderRadius: 3,
                border: '1px solid #e0e0e0',
                cursor: 'pointer',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: 3,
                },
              }}
            >
              <img
                src={product.image || 'https://via.placeholder.com/150'}
                alt={product.name}
                loading="lazy"
                style={{
                  width: '100%',
                  height: '160px',
                  objectFit: 'contain',
                  borderRadius: 8,
                  backgroundColor: '#fff',
                }}
              />

              <Box mt={2}>
                <Typography
                  variant="subtitle2"
                  fontWeight="600"
                  sx={{
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}
                  title={product.name}
                >
                  {product.name}
                </Typography>

                <Typography
                  variant="body1"
                  sx={{
                    color: '#ee4d2d',
                    fontWeight: 'bold',
                    mt: 0.5,
                  }}
                >
                  {Number(product.price).toLocaleString("vi-VN")} đ
                </Typography>
              </Box>
            </Box>
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>

  );
};

export default ViewHistory;
