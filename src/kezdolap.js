import React, { useState, useEffect } from 'react'; 
import { Link } from 'react-router-dom';
import { Typography, Button, IconButton, FormGroup, FormControlLabel, Switch, Box } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';  // Added for closing the menu
import logo2 from './logo2.png';
import Menu from './menu2';  // Importing the Menu component

const Home = () => {
  const [sideMenuActive, setSideMenuActive] = useState(false);
  const [darkMode, setDarkMode] = useState(true);

  const toggleSideMenu = () => {
    console.log('Menu toggled:', !sideMenuActive);
    setSideMenuActive((prev) => !prev);  // Toggle the side menu state
  };

  useEffect(() => {
    if (sideMenuActive) {
      document.body.style.overflow = 'hidden';  // Prevent body scroll while menu is open
    } else {
      document.body.style.overflow = 'auto';  // Re-enable body scroll
    }
  }, [sideMenuActive]);

  return (
    <div
      style={{
        backgroundColor: darkMode ? '#555' : '#f5f5f5',
        color: darkMode ? 'white' : 'black',
        height: '100vh',
        overflow: 'hidden',
      }}
    >
      {/* Conditionally render the Menu component */}
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          left: sideMenuActive ? 0 : '-250px',  // Use left to control the position
          width: '250px',
          height: '100%',
          backgroundColor: '#fff',
          boxShadow: '4px 0px 10px rgba(0, 0, 0, 0.2)',
          zIndex: 1200,
          transition: 'left 0.1s ease-in-out',  // Apply slower sliding transition
        }}
      >
        <IconButton
          onClick={toggleSideMenu}
          sx={{
            position: 'absolute',
            top: '10px',
            right: '10px',
          }}
        >
          <CloseIcon />
        </IconButton>
        <Menu sideMenuActive={sideMenuActive} toggleSideMenu={toggleSideMenu} />
      </Box>

      {/* Header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: darkMode ? '#333' : '#333',
          padding: '10px 20px',
          position: 'relative',
          width: '100%',
          boxSizing: 'border-box',
        }}
      >
        {/* Left: Menu Icon */}
        <IconButton
          onClick={toggleSideMenu}
          style={{ color: darkMode ? 'white' : 'white' }}
        >
          <MenuIcon />
        </IconButton>

        {/* Center: Title */}
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

        {/* Right: Buttons */}
        <div style={{ display: 'flex', gap: '10px' }}>
          <Button
            component={Link}
            to="/sign"
            sx={{
              color: '#fff',
              border: '1px solid #fff',
              borderRadius: '5px',
              padding: '5px 15px',
              whiteSpace: 'nowrap',
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
              padding: '5px 15px',
              whiteSpace: 'nowrap',
              '&:hover': {
                backgroundColor: '#fff',
                color: '#333',
              },
            }}
          >
            Sign Up
          </Button>
        </div>
      </div>

      {/* Dark Mode Switch */}
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

      {/* Hero Section */}
      <div
        style={{
          textAlign: 'center',
          padding: '40px',
        }}
      >
        <Typography
          variant="h1"
          style={{
            fontSize: '36px',
          }}
        >
          Üdvözlünk az Adali Clothing Webáruházban
        </Typography>
      </div>

      {/* Cards Section */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '20px',
          padding: '20px',
          backgroundColor: darkMode ? '#444' : '#fafafa',
        }}
      >
        {/* Left Card - Collection Page */}
        <div
          style={{
            flex: '1 1 300px',
            maxWidth: '600px',
            textAlign: 'center',
            borderRadius: '10px',
            overflow: 'hidden',
            boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
            backgroundColor: darkMode ? '#555' : '#fff',
          }}
        >
          <Link to="/collection">
            <div
              style={{
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <img
                src={logo2}
                alt="Collection"
                style={{
                  width: '100%',
                  height: '500px',
                  objectFit: 'cover',
                  transition: 'transform 0.3s ease', // Smooth transition
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'scale(1.1)'; // Enlarge image on hover
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'scale(1)'; // Reset size when mouse leaves
                }}
              />
            </div>
          </Link>
          <Typography
            variant="body1"
            style={{
              fontSize: '18px',
              padding: '10px',
              textAlign: 'center',
              transition: 'transform 0.3s ease',
              marginTop: '10px', // Added space between the image and text
            }}
          >
            Nézd meg az új kollekciónkat
          </Typography>
        </div>

        {/* Center Card - All Products Page */}
        <div
          style={{
            flex: '1 1 300px',
            maxWidth: '600px',
            textAlign: 'center',
            borderRadius: '10px',
            overflow: 'hidden',
            boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
            backgroundColor: darkMode ? '#555' : '#fff',
          }}
        >
          <Link to="/oterm">
            <div
              style={{
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <img
                src={logo2}
                alt="All Products"
                style={{
                  width: '100%',
                  height: '500px',
                  objectFit: 'cover',
                  transition: 'transform 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'scale(1.1)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'scale(1)';
                }}
              />
            </div>
          </Link>
          <Typography
            variant="body1"
            style={{
              fontSize: '18px',
              padding: '10px',
              textAlign: 'center',
              transition: 'transform 0.3s ease',
              marginTop: '10px', // Added space between the image and text
            }}
          >
            Nézd meg az összes termékünket
          </Typography>
        </div>

        {/* Right Card - Empty */}
        <div
          style={{
            flex: '1 1 300px',
            maxWidth: '600px',
            textAlign: 'center',
            borderRadius: '10px',
            overflow: 'hidden',
            boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
            backgroundColor: darkMode ? '#555' : '#fff',
          }}
        >
          <div
            style={{
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <img
              src={logo2}
              alt="Empty"
              style={{
                width: '100%',
                height: '500px',
                objectFit: 'cover',
                transition: 'transform 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'scale(1.1)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'scale(1)';
              }}
            />
          </div>
          <Typography
            variant="body1"
            style={{
              fontSize: '18px',
              padding: '10px',
              textAlign: 'center',
              transition: 'transform 0.3s ease',
              marginTop: '10px',
            }}
          >
            Empty Card
          </Typography>
        </div>
      </div>
    </div>
  );
};

export default Home;
