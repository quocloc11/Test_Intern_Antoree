import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext"
import {
  Box,
  Container,
  Typography,
  IconButton,
  Badge
} from '@mui/material';
import { TextField, InputAdornment } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SearchIcon from '@mui/icons-material/Search';

const Header = ({ searchTerm, setSearchTerm }) => {
  const { cartFavorite } = useAppContext();
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState(searchTerm || "");
  const handleSearch = (e) => {
    e.preventDefault();
    const trimmed = inputValue.trim();
    if (trimmed) {
      navigate(`/search?keyword=${encodeURIComponent(trimmed)}`);
    }
  };
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  return (
    <>
      <Box component="header" sx={{ bgcolor: '#ee4d2d', py: 1, color: 'white' }}>
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
          <Link to="/" style={{ textDecoration: 'none', color: 'white' }}>
            <Typography variant="h6" fontWeight="bold">
              Antoree
            </Typography>
          </Link>

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
                autoComplete="off"
                placeholder="Tìm kiếm sản phẩm..."
                value={inputValue}
                onChange={handleInputChange}
                InputProps={{
                  endAdornment: (
                    <>
                      {searchTerm && (
                        <InputAdornment position="end">
                          <IconButton onClick={() => {
                            setInputValue('');
                            setSearchTerm('');
                          }}>
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
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexShrink: 0 }}>
              <IconButton onClick={() => navigate('/favorites')}>
                <Badge badgeContent={cartFavorite.length} color="primary" showZero>
                  <FavoriteBorderIcon sx={{ cursor: 'pointer', color: 'text.secondary' }} />
                </Badge>
              </IconButton>
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