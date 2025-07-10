import React from "react";
import { Container, Grid, Card, CardMedia, Typography, Button, Box } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { useNavigate } from "react-router-dom";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
const banners = [
  { image: "https://cf.shopee.vn/file/vn-11134258-7ras8-mbw0uftpimped8_xxhdpi", alt: "Laptop Gaming" },
  { image: "https://cf.shopee.vn/file/sg-11134258-7rdvp-mbw0whuh729l7c_xxhdpi", alt: "Laptop Gaming" },

];
const avatar = [
  { image: "https://cf.shopee.vn/file/sg-11134258-7rdvg-mbxkqw5q5lcece_xhdpi", alt: "Laptop Gaming" },
  { image: "https://cf.shopee.vn/file/sg-11134258-7rdxn-mbxkx8fe3zg983_xhdpi", alt: "Laptop Gaming" }
];

const Banner = () => {

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          gap: 2,
          flexWrap: 'wrap',
          width: '100%',
          maxWidth: 1200,
          margin: 'auto',
        }}
      >
        {/* Swiper bên trái */}
        <Box
          sx={{
            flex: '2 1 65%', // chiếm khoảng 65% chiều ngang, có thể điều chỉnh
            minWidth: 300,   // tránh quá nhỏ
          }}
        >
          <Swiper
            modules={[Autoplay]}
            spaceBetween={10}
            slidesPerView={1}
            autoplay={{ delay: 3000 }}
            loop
            style={{ width: '100%' }}
          >
            {banners.map((banner, i) => (
              <SwiperSlide key={i}>
                <Card sx={{ width: '100%', boxShadow: 'none' }}>
                  <CardMedia
                    component="img"
                    image={banner.image}
                    alt={banner.alt}
                    sx={{
                      width: '100%',
                      height: 'auto',
                      objectFit: 'cover',
                      borderRadius: 2,
                      display: 'block',
                    }}
                  />
                </Card>
              </SwiperSlide>
            ))}
          </Swiper>
        </Box>

        {/* Avatar bên phải */}
        <Box
          sx={{
            flex: '1 1 30%', // chiếm khoảng 30% chiều ngang
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            minWidth: 200,  // tránh quá nhỏ
            justifyContent: 'center',
          }}
        >
          {avatar.map((item, index) => (
            <Card key={index}>
              <CardMedia
                component="img"
                image={item.image}
                alt={`Ảnh ${index + 1}`}
                sx={{
                  width: '100%',
                  height: 'auto',
                  objectFit: 'cover',
                  borderRadius: 2,
                  display: 'block',
                }}
              />
            </Card>
          ))}
        </Box>
      </Box>
    </>

  );
};


export default Banner;