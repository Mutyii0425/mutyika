import React, { useState, useEffect, useRef } from 'react';
import { 
  Box, 
  Container,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  IconButton,
  Button,
  Paper,
  Popper,
  MenuItem,
  MenuList,
  Grow,
  ClickAwayListener,
  Stack,
  FormControl,
  FormGroup,
  FormControlLabel,
  Switch
} from '@mui/material';
import { Link } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import logo2 from './logo2.png';
import MenuIcon from '@mui/icons-material/Menu';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Menu from './menu2';
import Footer from './footer';
import { useNavigate } from 'react-router-dom';

function Vinted() {
  const [darkMode, setDarkMode] = useState(true);
  const [sideMenuActive, setSideMenuActive] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const [products, setProducts] = useState([]);
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:5000/products');
        const data = await response.json();
        console.log('Betöltött termékek:', data); // Ellenőrzéshez
        setProducts(data);
      } catch (error) {
        console.log('Hiba:', error);
      }
    };
    fetchProducts();
  }, []);
  

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      const user = JSON.parse(userData);
      setIsLoggedIn(true);
      setUserName(user.username || user.felhasznalonev || 'Felhasználó');
    }
  }, []);

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.ctrlKey && event.shiftKey && event.key === 'Q') {
        navigate('/user');
      }
    };
  
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [navigate]);
  

  const toggleSideMenu = () => {
    setSideMenuActive(!sideMenuActive);
  };

  const handleCartClick = () => {
    navigate('/kosar');
  };

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };
  
  const handleClose = (event = {}) => {
    if (event.target && anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };
  
  const handleListKeyDown = (event) => {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === 'Escape') {
      setOpen(false);
    }
  };
  
  const handleLogout = () => {
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    setOpen(false);
    navigate('/sign');
  };

  return (
    <div style={{
      backgroundColor: darkMode ? '#555' : '#f5f5f5',
      color: darkMode ? 'white' : 'black',
      minHeight: '100vh',
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: darkMode ? '#333' : '#333',
        padding: '10px 20px',
        position: 'relative',
        width: '100%',
        boxSizing: 'border-box',
      }}>
        <IconButton
          onClick={toggleSideMenu}
          style={{ color: darkMode ? 'white' : 'white' }}
        >
          <MenuIcon />
        </IconButton>

        <Typography
          variant="h1"
          style={{
            position: 'absolute',
            left: '50%',
            transform: 'translateX(-50%)',
            fontWeight: 'bold',
            fontSize: '2rem',
            color: darkMode ? 'white' : 'white',
            margin: 0,
          }}
        >
          Adali Clothing
        </Typography>
          <Box sx={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            {isLoggedIn ? (
              <Box sx={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <IconButton
                  onClick={handleCartClick}
                  sx={{
                    color: '#fff',
                    '&:hover': {
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    }
                  }}
                >
                  <ShoppingCartIcon />
                </IconButton>
                <Button
                  ref={anchorRef}
                  onClick={handleToggle}
                  sx={{
                    color: '#fff',
                    zIndex: 1300,
                    border: '1px solid #fff',
                    borderRadius: '5px',
                    padding: '5px 10px',
                  }}
                >
                  Profil
                </Button>
                <Popper
                  open={open}
                  anchorEl={anchorRef.current}
                  placement="bottom-start"
                  transition
                  disablePortal
                  sx={{ zIndex: 1300 }}
                >
                  {({ TransitionProps, placement }) => (
                    <Grow
                      {...TransitionProps}
                      style={{
                        transformOrigin:
                          placement === 'bottom-start' ? 'left top' : 'left bottom',
                      }}
                    >
                      <Paper>
                        <ClickAwayListener onClickAway={handleClose}>
                          <MenuList autoFocusItem={open} onKeyDown={handleListKeyDown}>
                            <MenuItem onClick={handleClose}>{userName} profilja</MenuItem>
                            <MenuItem onClick={handleClose}>Fiókom</MenuItem>
                            <MenuItem onClick={handleLogout}>Kijelentkezés</MenuItem>
                          </MenuList>
                        </ClickAwayListener>
                      </Paper>
                    </Grow>
                  )}
                </Popper>
              </Box>
            ) : (
              <>
                <Button
                  component={Link}
                  to="/sign"
                  sx={{
                    color: '#fff',
                    border: '1px solid #fff',
                    borderRadius: '5px',
                    padding: '5px 10px',
                    '&:hover': {
                      backgroundColor: '#fff',
                      color: '#333',
                    },
                  }}
                >
                  Sign In
                </Button>
                <Button
                  component={Link}
                  to="/signup"
                  sx={{
                    color: '#fff',
                    border: '1px solid #fff',
                    borderRadius: '5px',
                    padding: '5px 10px',
                    '&:hover': {
                      backgroundColor: '#fff',
                      color: '#333',
                    },
                  }}
                >
                  Sign Up
                </Button>
              </>
            )}
          </Box>
        </div>

      <Box sx={{
        position: 'fixed',
        top: 0,
        left: sideMenuActive ? 0 : '-250px',
        width: '250px',
        height: '100%',
        backgroundColor: '#fff',
        transition: 'left 0.3s',
        zIndex: 1200,
      }}>
        <Menu sideMenuActive={sideMenuActive} toggleSideMenu={toggleSideMenu} />
      </Box>

      <FormGroup
  sx={{
    position: 'absolute',
    top: 60,
    right: 20,
  }}
>
  <FormControlLabel
    control={
      <Switch
        defaultChecked
        color="default"
        sx={{
          color: 'black',
        }}
        checked={darkMode}
        onChange={() => setDarkMode((prev) => !prev)}
      />
    }
    label="Dark Mode"
  />
</FormGroup>


      <Container maxWidth="xl" sx={{ mt: 8, mb: 4 }}>
        <Typography variant="h4" sx={{ mb: 4, textAlign: 'center' }}>
          Feltöltött Termékek
        </Typography>
        
        <Grid container spacing={3}>
          {products.map((product) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
              <Card sx={{ 
                height: '500px',
                backgroundColor: darkMode ? '#333' : 'white',
                color: darkMode ? 'white' : 'black',
                display: 'flex',
                flexDirection: 'column'
              }}>
                <Box sx={{
                  height: 350,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: 'transparent'
                }}>
                  <CardMedia
                    component="img"
                    sx={{ 
                      height: '100%',
                      width: 'auto',
                      objectFit: 'contain',
                      maxWidth: '100%'
                    }}
                    image={product.imageUrl}
                    alt={product.nev}
                  />
                </Box>
                <CardContent>
                  <Typography variant="h6">{product.nev}</Typography>
                  <Typography variant="h6" color="primary">{product.ar} Ft</Typography>
                  <Typography variant="body2">{product.leiras}</Typography>
                  <Typography variant="body2">Méret: {product.meret}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
      <Footer />
    </div>
  );
}

export default Vinted;
