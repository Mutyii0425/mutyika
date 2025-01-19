import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Box, Typography, Button, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Menu from './menu2'; // Importálás

const Home = () => {
  const [sideMenuActive, setSideMenuActive] = useState(false);

  const toggleSideMenu = () => {
    setSideMenuActive(!sideMenuActive);
  };

  return (
    <Box>
      {/* Header */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: '#333',
          color: '#fff',
          padding: '10px 20px',
        }}
      >
        <IconButton  onClick={toggleSideMenu} sx={{ color: 'white', width:'20px', height:'20px' }}>
          <MenuIcon />
        </IconButton>
        <Typography variant="h4" sx={{ flex: 1, textAlign: 'center' }}>
          Adali Clothing
        </Typography>
        <Box sx={{ display: 'flex', gap: '10px' }}>
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
        </Box>
      </Box>

      {/* Side Menu */}
      <Menu sideMenuActive={sideMenuActive} toggleSideMenu={toggleSideMenu} />

      {/* Hero Section */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: 'calc(100vh - 60px)',
          textAlign: 'center',
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('logo2.png')`,
          backgroundSize: 'cover',
          color: 'white',
          padding: '20px',
        }}
      >
        <Typography variant="h1" sx={{ fontSize: { xs: '36px', md: '48px' } }}>
          Üdvözlünk az Adali Clothing Webáruházban
        </Typography>
        <Typography variant="body1" sx={{ marginTop: '10px', fontSize: '18px' }}>
          Fedezd fel legújabb kollekciónkat!
        </Typography>
        <Button
          component={Link}
          to="/oterm"
          sx={{
            fontSize: '20px',
            padding: '10px 20px',
            marginTop: '20px',
            backgroundColor: '#333',
            color: 'white',
            borderRadius: '5px',
            '&:hover': {
              backgroundColor: '#555',
            },
          }}
        >
          Nézd meg az összes terméket
        </Button>
      </Box>
    </Box>
  );
};

export default Home;
