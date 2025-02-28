import React, { useState, useEffect, useRef } from 'react';
import { 
  Box, 
  Button, 
  Typography, 
  IconButton,
  TextField,
  Paper,
  Container,
  FormGroup,
  FormControlLabel,
  Switch,
  Popper,
  Grow,
  ClickAwayListener,
  MenuList,
  MenuItem,
} from '@mui/material';
import { Link } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Menu from './menu2';
import { useNavigate } from 'react-router-dom';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';

export default function Add() {
  const [darkMode, setDarkMode] = useState(true);
  const [sideMenuActive, setSideMenuActive] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const fileInputRef = useRef(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [open, setOpen] = useState(false);
  const [userName, setUserName] = useState('');
  const anchorRef = useRef(null);
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [size, setSize] = useState('');

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const base64Image = reader.result;
        setSelectedImage(base64Image);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const base64Image = reader.result;
        setSelectedImage(base64Image);
      };
      reader.readAsDataURL(file);
    }
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

  const toggleSideMenu = () => {
    setSideMenuActive((prev) => !prev);
  };

  useEffect(() => {
    const checkLoginStatus = () => {
      const userData = localStorage.getItem('user');
      if (userData) {
        const user = JSON.parse(userData);
        setIsLoggedIn(true);
        setUserName(user.username || user.felhasznalonev || 'Felhasználó');
      }
    };
    checkLoginStatus();
  }, []);

  useEffect(() => {
    fetch('http://localhost:5000/categories')
      .then(response => response.json())
      .then(data => setCategories(data))
      .catch(error => console.log('Error:', error));
  }, []);

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
        boxShadow: '4px 0px 10px rgba(0, 0, 0, 0.2)',
        zIndex: 1200,
        transition: 'left 0.1s ease-in-out',
      }}>
        <Menu sideMenuActive={sideMenuActive} toggleSideMenu={toggleSideMenu} />
      </Box>

      <FormGroup sx={{ position: 'absolute', top: 60, right: 20 }}>
        <FormControlLabel
          control={
            <Switch
              color="default"
              checked={darkMode}
              onChange={() => setDarkMode((prev) => !prev)}
            />
          }
          label="Dark Mode"
        />
      </FormGroup>

      <Container maxWidth="md" sx={{ mt: 8, mb: 4 }}>
        <Paper
          sx={{
            p: 4,
            backgroundColor: darkMode ? '#333' : '#fff',
            color: darkMode ? 'white' : 'black',
          }}
        >
          <Typography variant="h4" gutterBottom align="center">
            Ruha feltöltése
          </Typography>

          <Box
            sx={{
              border: '2px dashed',
              borderColor: darkMode ? 'grey.500' : 'grey.300',
              borderRadius: 2,
              p: 3,
              mb: 3,
              textAlign: 'center',
              cursor: 'pointer',
              '&:hover': {
                borderColor: 'primary.main',
              },
            }}
            onClick={() => fileInputRef.current.click()}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          >
            {selectedImage ? (
              <img
                src={selectedImage}
                alt="Feltöltött kép"
                style={{
                  maxWidth: '100%',
                  maxHeight: '300px',
                  objectFit: 'contain',
                }}
              />
            ) : (
              <Box>
                <CloudUploadIcon sx={{ fontSize: 60, mb: 2 }} />
                <Typography>
                  Húzd ide a képet vagy kattints a feltöltéshez
                </Typography>
              </Box>
            )}
            <input
              type="file"
              hidden
              ref={fileInputRef}
              onChange={handleImageUpload}
              accept="image/*"
            />
          </Box>

          <FormControl fullWidth margin="normal">
            <InputLabel sx={{ color: darkMode ? 'white' : 'black' }}>Kategória</InputLabel>
            <Select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              sx={{
                color: darkMode ? 'white' : 'black',
                backgroundColor: darkMode ? '#333' : '#fff',
              }}
            >
              {categories.map((category) => (
                <MenuItem key={category.cs_azonosito} value={category.cs_azonosito}>
                  {category.cs_nev}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            fullWidth
            label="Ruha neve"
            variant="outlined"
            margin="normal"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            sx={{
              '& .MuiOutlinedInput-root': {
                color: darkMode ? 'white' : 'black',
                '& fieldset': {
                  borderColor: darkMode ? 'grey.500' : 'grey.300',
                },
              },
              '& .MuiInputLabel-root': {
                color: darkMode ? 'grey.300' : 'grey.700',
              },
            }}
          />

          <TextField
            fullWidth
            label="Ár"
            variant="outlined"
            margin="normal"
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            sx={{
              '& .MuiOutlinedInput-root': {
                color: darkMode ? 'white' : 'black',
                '& fieldset': {
                  borderColor: darkMode ? 'grey.500' : 'grey.300',
                },
              },
              '& .MuiInputLabel-root': {
                color: darkMode ? 'grey.300' : 'grey.700',
              },
            }}
          />

          <TextField
            fullWidth
            label="Leírás"
            variant="outlined"
            margin="normal"
            multiline
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            sx={{
              '& .MuiOutlinedInput-root': {
                color: darkMode ? 'white' : 'black',
                '& fieldset': {
                  borderColor: darkMode ? 'grey.500' : 'grey.300',
                },
              },
              '& .MuiInputLabel-root': {
                color: darkMode ? 'grey.300' : 'grey.700',
              },
            }}
          />

          <TextField
            fullWidth
            label="Méret"
            variant="outlined"
            margin="normal"
            value={size}
            onChange={(e) => setSize(e.target.value)}
            sx={{
              '& .MuiOutlinedInput-root': {
                color: darkMode ? 'white' : 'black',
                '& fieldset': {
                  borderColor: darkMode ? 'grey.500' : 'grey.300',
                },
              },
              '& .MuiInputLabel-root': {
                color: darkMode ? 'grey.300' : 'grey.700',
              },
            }}
          />

          <Button
            onClick={async () => {
              const productData = {
                kategoriaId: selectedCategory,
                ar: parseInt(price),
                nev: title,
                leiras: description,
                meret: size
              };

              try {
                const response = await fetch('http://localhost:5000/usertermekek', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify(productData)
                });

                if (response.ok) {
                  alert('Termék sikeresen feltöltve!');
                  navigate('/vinted');
                }
              } catch (error) {
                console.log('Error:', error);
                alert('Hiba történt a feltöltés során!');
              }
            }}
            variant="contained"
            fullWidth
            sx={{
              mt: 3,
              backgroundColor: darkMode ? '#555' : '#primary',
              color: 'white',
              '&:hover': {
                backgroundColor: darkMode ? '#666' : '#primary.dark',
              },
            }}
          >
            Feltöltés
          </Button>
        </Paper>
      </Container>
    </div>
  );
}