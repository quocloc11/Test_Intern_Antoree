import React from 'react';
import {
  Box,
  Container,
  Grid,
  Typography,
  Link,
  Divider,
  Stack,
} from '@mui/material';
import { alpha } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import InfoIcon from '@mui/icons-material/Info';
import PhoneIcon from '@mui/icons-material/Phone';

const Footer = () => {
  const quickLinks = ['Home', 'Our Shop', 'Shop Detail', 'Shopping Cart', 'Checkout', 'Contact Us'];

  return (
    <Box component="footer" sx={{ bgcolor: '#60005c', color: '#fff', pt: 6, pb: 3, mt: 5 }}>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Cột 1: Thông tin liên hệ */}
          <Grid item xs={12} md={4}>
            <Typography variant="body1" paragraph>
              Hệ thống XTech789 trên toàn quốc
              <br />
              Bao gồm Cửa hàng XTech789, Trung tâm Laptop, F.Studio, S.Studio
            </Typography>

            <Typography sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <LocationOnIcon sx={{ color: '#fff' }} />
              Tp HCM
            </Typography>
            <Typography sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <InfoIcon sx={{ color: '#fff' }} />
              abc@gmail.com
            </Typography>
            <Typography sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <PhoneIcon sx={{ color: '#fff' }} />
              +012 345 67890
            </Typography>
          </Grid>

          {[...Array(2)].map((_, index) => (
            <Grid item xs={6} md={4} key={index}>
              <Typography variant="h6" gutterBottom>
                Quick Links
              </Typography>
              {quickLinks.map((text) => (
                <Typography
                  key={text}
                  component={Link}
                  href="#"
                  underline="hover"
                  sx={{ color: '#fff', display: 'block', mb: 0.5 }}
                >
                  {text}
                </Typography>
              ))}
            </Grid>
          ))}
        </Grid>

        <Divider sx={{ my: 3, bgcolor: alpha('#fff', 0.9) }} />

        <Box
          display="flex"
          flexDirection={{ xs: 'column', sm: 'row' }}
          justifyContent="space-between"
          alignItems="center"
          textAlign={{ xs: 'center', sm: 'left' }}
        >
          <Typography variant="body2" color={alpha('#fff', 0.7)}>
            Đại lý uỷ quyền và TTBH uỷ quyền của XTech789
          </Typography>

          {/* Icon thanh toán */}
          <Box mt={{ xs: 2, sm: 0 }}>
            <Stack direction="row" spacing={1} flexWrap="wrap">
              {[
                {
                  src: "https://cdn2.fptshop.com.vn/svg/visa_icon_44fe6e15ed.svg",
                  alt: "visa"
                },
                {
                  src: "https://cdn2.fptshop.com.vn/svg/mastercard_icon_c75f94f6a5.svg",
                  alt: "mastercard"
                },
                {
                  src: "https://cdn2.fptshop.com.vn/svg/zalopay_icon_26d64ea93f.svg",
                  alt: "zalopay"
                },
                {
                  src: "https://cdn2.fptshop.com.vn/svg/vnpay_icon_f42045057d.svg",
                  alt: "vnpay"
                }
              ].map((img, i) => (
                <Box
                  key={i}
                  component="img"
                  src={img.src}
                  alt={img.alt}
                  sx={{
                    width: 40,
                    height: 25,
                    objectFit: "contain",
                    borderRadius: 1,
                  }}
                />
              ))}
            </Stack>
          </Box>
        </Box>
      </Container>
    </Box>


  );
}
export default Footer 