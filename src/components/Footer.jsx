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
    <Box component="footer" sx={{ bgcolor: '#ee4d2d', color: '#fff', pt: 6, pb: 3, mt: 5 }}>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid sx={{ gridColumn: { xs: 'span 12', md: 'span 4' } }}>

            <Typography variant="h6" gutterBottom fontWeight="bold">
              Antoree Việt Nam
            </Typography>
            <Typography variant="body2" paragraph sx={{ lineHeight: 1.8 }}>
              Hệ thống Antoree trên toàn quốc bao gồm Cửa hàng Antoree, Trung tâm Laptop,
              F.Studio, S.Studio.
            </Typography>

            <Stack spacing={1}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <LocationOnIcon fontSize="small" sx={{ color: '#fff' }} />
                <Typography variant="body2">Tp. Hồ Chí Minh</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <InfoIcon fontSize="small" sx={{ color: '#fff' }} />
                <Typography variant="body2">abc@gmail.com</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <PhoneIcon fontSize="small" sx={{ color: '#fff' }} />
                <Typography variant="body2">+012 345 67890</Typography>
              </Box>
            </Stack>
          </Grid>

          {[...Array(2)].map((_, index) => (
            <Grid key={index} sx={{ gridColumn: { xs: 'span 6', md: 'span 4' } }}>

              <Typography variant="h6" gutterBottom fontWeight="bold">
                Quick Links
              </Typography>
              <Stack spacing={1}>
                {quickLinks.map((text) => (
                  <Link
                    key={text}
                    href="#"
                    underline="none"
                    sx={{
                      color: '#fff',
                      fontSize: '0.9rem',
                      transition: 'color 0.3s',
                      '&:hover': {
                        color: alpha('#fff', 0.7),
                      },
                    }}
                  >
                    {text}
                  </Link>
                ))}
              </Stack>
            </Grid>
          ))}
        </Grid>

        <Divider sx={{ my: 4, bgcolor: alpha('#fff', 0.2) }} />

        <Box
          display="flex"
          flexDirection={{ xs: 'column', sm: 'row' }}
          justifyContent="space-between"
          alignItems="center"
          textAlign={{ xs: 'center', sm: 'left' }}
          gap={2}
        >
          <Typography variant="body2" color={alpha('#fff', 0.7)}>
            © 2025 Antoree. Đại lý và trung tâm bảo hành ủy quyền toàn quốc.
          </Typography>

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
                  transition: 'transform 0.3s',
                  '&:hover': {
                    transform: 'scale(1.1)',
                  }
                }}
              />
            ))}
          </Stack>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
