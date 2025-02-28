import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
  FormGroup,
  FormControlLabel,
  Switch
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

export default function User() {
  const [products, setProducts] = useState([]);
  const [darkMode, setDarkMode] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'Q') {
        navigate('/vinted');
      }
    };

    window.addEventListener('keydown', handleKeyPress);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [navigate]);

  useEffect(() => {
    const products = JSON.parse(localStorage.getItem('products') || '[]');
    setProducts(products);
  }, []);

  const handleDelete = (productId) => {
    const megerosites = window.confirm("Biztosan törölni szeretnéd ezt a terméket?");
    
    if (megerosites) {
      const termekek = JSON.parse(localStorage.getItem('products') || '[]');
      const frissitettTermekek = termekek.filter(termek => termek.id !== productId);
      localStorage.setItem('products', JSON.stringify(frissitettTermekek));
      setProducts(frissitettTermekek);
    }
  };

  return (
    <Box sx={{ 
      backgroundColor: darkMode ? '#333' : '#f5f5f5',
      minHeight: '100vh',
      padding: 3
    }}>
      <Container>
        <Typography variant="h4" sx={{ mb: 4, color: darkMode ? 'white' : 'black' }}>
          Admin Felület
        </Typography>

        <FormGroup sx={{ mb: 3 }}>
          <FormControlLabel
            control={
              <Switch
                checked={darkMode}
                onChange={() => setDarkMode(!darkMode)}
                color="primary"
              />
            }
            label="Dark Mode"
          />
        </FormGroup>

        <Grid container spacing={3}>
          {products.map((product) => (
            <Grid item xs={12} sm={6} md={4} key={product.id}>
              <Card sx={{ 
                height: '500px',
                backgroundColor: darkMode ? '#444' : 'white',
                color: darkMode ? 'white' : 'black'
              }}>
                <Box sx={{ position: 'relative', height: '350px' }}>
                  <CardMedia
                    component="img"
                    sx={{ 
                      height: '100%',
                      width: '100%',
                      objectFit: 'contain'
                    }}
                    image={product.imageUrl}
                    alt={product.title}
                  />
                  <Box sx={{ 
                    position: 'absolute',
                    top: 8,
                    right: 8,
                    display: 'flex',
                    gap: 1
                  }}>
                    <IconButton
                      onClick={() => handleDelete(product.id)}
                      sx={{
                        backgroundColor: 'rgba(255, 255, 255, 0.9)',
                        '&:hover': { backgroundColor: 'red', color: 'white' }
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                    <IconButton
                      sx={{
                        backgroundColor: 'rgba(255, 255, 255, 0.9)',
                        '&:hover': { backgroundColor: 'blue', color: 'white' }
                      }}
                    >
                      <EditIcon />
                    </IconButton>
                  </Box>
                </Box>
                <CardContent>
                  <Typography variant="h6">
                    {product.title}
                  </Typography>
                  <Typography variant="h6" color="primary">
                    {product.price} Ft
                  </Typography>
                  <Typography variant="body2">
                    {product.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}