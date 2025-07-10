
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext"
import {
  Box,
  Container,
  Grid,
  Typography,
  Button,
  InputBase,
  IconButton,
  Paper,
  Divider, MenuItem, Menu,
  Badge
} from '@mui/material';
import { TextField, InputAdornment } from '@mui/material';

import CloseIcon from '@mui/icons-material/Close';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import YouTubeIcon from '@mui/icons-material/YouTube';
import InstagramIcon from '@mui/icons-material/Instagram';
import SearchIcon from '@mui/icons-material/Search';

const menuItems = ['Home', 'Shop', 'Shop Detail', 'Pages', 'Contact'];

const Header = () => {
  const { cartFavorite } = useAppContext();
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate('/detail', { state: { keyword: searchTerm } });
    }
  };

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  //const [favoriteCount, setFavoriteCount] = React.useState(0);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <Box component="header" sx={{ bgcolor: '#6f42c1', py: 1, color: 'white' }}>
        <Container
          maxWidth="lg"
          sx={{
            px: 2,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
          }}
        >
          {/* Logo */}
          <Link to="/" style={{ textDecoration: 'none', color: 'white' }}>
            <Typography variant="h6" fontWeight="bold">
              Antoree
            </Typography>
          </Link>

          {/* Social icons */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, ml: 'auto' }}>
            <Box sx={{ display: 'flex', gap: 1 }}>

              <Typography
                component="span"
                sx={{
                  fontWeight: 500,
                  fontSize: { xs: '1rem', sm: '1.1rem', md: '1.25rem' },
                  cursor: 'pointer',
                  transition: 'opacity 0.3s ease',
                  '&:hover': {
                    opacity: 0.6,
                  },
                }}
              >
                Login
              </Typography>
              <Typography color="text.secondary">|</Typography>
              <Typography
                component="span"
                sx={{
                  fontWeight: 500,
                  fontSize: { xs: '1rem', sm: '1.1rem', md: '1.25rem' },
                  cursor: 'pointer',
                  transition: 'opacity 0.3s ease',
                  '&:hover': {
                    opacity: 0.6,
                  },
                }}
              >
                Register
              </Typography>
            </Box>
          </Box>
        </Container>
      </Box>


      <Container
        maxWidth="lg"
        sx={{ py: 1.5, px: 2, display: 'flex', flexDirection: 'column', gap: 2 }}
      >

        {/* Hàng trên: Search nằm chính giữa */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            py: 2,
            //px: 2,
          }}
        >
          <Box sx={{ flex: 1 }}>
            <Box
              component="img"
              src="https://commercial.static.antoree.com/assets/images/logo_withtagline.svg"
              alt="Antoree"
              sx={{
                height: { xs: 32, sm: 40, md: 48 },
                maxWidth: '100%',
                objectFit: 'contain',
                cursor: 'pointer',
              }}
            />
          </Box>


          {/* 75% */}
          <Box
            sx={{
              flex: 3,

              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '100%',
              gap: 2,
            }}
          >
            {/* Thanh tìm kiếm nằm bên trái */}
            <Box
              component="form"
              onSubmit={handleSearch}
              sx={{
                display: 'flex',
                alignItems: 'center',
                width: '100%',
                maxWidth: 600,
              }}
            >
              <TextField
                variant="outlined"
                size="small"
                fullWidth
                placeholder="Tìm kiếm sản phẩm..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  endAdornment: (
                    <>
                      {searchTerm && (
                        <InputAdornment position="end">
                          <IconButton onClick={() => setSearchTerm('')}>
                            <CloseIcon />
                          </IconButton>
                        </InputAdornment>
                      )}
                      <InputAdornment position="end">
                        <IconButton type="submit" edge="end" color="primary">
                          <SearchIcon />
                        </IconButton>
                      </InputAdornment>
                    </>
                  ),
                }}
                sx={{
                  bgcolor: 'white',
                  borderRadius: 2,
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                  },
                }}
              />
            </Box>


            {/* 2 icon nằm bên phải */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexShrink: 0 }}>
              <Badge badgeContent={cartFavorite.length} color="primary" showZero>
                <FavoriteBorderIcon sx={{ cursor: 'pointer', color: 'text.secondary' }} />
              </Badge>
              <Badge color="primary" showZero>
                <ShoppingCartIcon sx={{ cursor: 'pointer', color: 'text.secondary' }} />
              </Badge>
            </Box>
          </Box>
        </Box>
      </Container>
    </>
  );
}

export default Header