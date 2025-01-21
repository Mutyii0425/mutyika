import React, { useState, useEffect, useRef } from 'react';
import Menu from './menu';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import logo from './logo02.png';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import MenuIcon from '@mui/icons-material/Menu';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';

const randomColor = () => {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgb(${r}, ${g}, ${b})`; 
};

export default function SignInForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState('');
  const [darkMode, setDarkMode] = useState(true);

  const dvdLogoRef = useRef({
    x: 90,
    y: 90,
    width: 150,
    height: 150,
    dx: 2,
    dy: 2,
    color: randomColor(),
  });

  useEffect(() => {
    const canvas = document.getElementById('dvdCanvas');
    const ctx = canvas.getContext('2d');
    const img = new Image(); 
    img.src = logo; 
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  
    const update = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
  
      ctx.save();
      const radius = dvdLogoRef.current.width / 2;
      const centerX = dvdLogoRef.current.x + radius;
      const centerY = dvdLogoRef.current.y + radius;
      ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
      ctx.clip();
  
      ctx.drawImage(
        img,
        dvdLogoRef.current.x,
        dvdLogoRef.current.y,
        dvdLogoRef.current.width,
        dvdLogoRef.current.height
      );
  
      ctx.restore();
  
      dvdLogoRef.current.x += dvdLogoRef.current.dx;
      dvdLogoRef.current.y += dvdLogoRef.current.dy;
  
      if (dvdLogoRef.current.x <= 0 || dvdLogoRef.current.x + dvdLogoRef.current.width >= canvas.width) {
        dvdLogoRef.current.dx = dvdLogoRef.current.dx * -1;
        dvdLogoRef.current.color = 'white';
      }
  
      if (dvdLogoRef.current.y <= 0 || dvdLogoRef.current.y + dvdLogoRef.current.height >= canvas.height) {
        dvdLogoRef.current.dy = dvdLogoRef.current.dy * -1;
        dvdLogoRef.current.color = 'white';
      }
  
      requestAnimationFrame(update);
    };
  
    img.onload = () => {
      update();
    };
  }, []);

  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

  return (
    <div
      style={{
        backgroundColor: darkMode ? '#555' : '#f5f5f5',
        color: darkMode ? 'white' : 'black',
        height: '100vh',
        zIndex: 0,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
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
        <IconButton sx={{ color: 'white' }}>
          <MenuIcon />
        </IconButton>
        <Typography variant="h1"
        sx={{
          position: 'absolute',
          top: '3.5%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          fontWeight: 'bold',
          fontSize: '2rem',
          textAlign: 'center',
          color: darkMode ? 'white' : 'white',}}>
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

      {/* Central Adali Text */}
      <Typography
        variant="h1"
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          fontWeight: 'bold',
          fontSize: '6rem',
          textAlign: 'center',
          color: darkMode ? 'white' : '#333',
        }}
      >
        Adali
      </Typography>

      <Menu />
      <Container
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%',
          width: '35%',
        }}
      >
        {/* Form Box */}
        <Box
          id="form-box"
          sx={{
            padding: 3,
            borderRadius: 3,
            boxShadow: 2,
            backgroundColor: darkMode ? '#333' : '#fff',
            color: darkMode ? 'white' : 'black',
            width: '100%',
            position: 'relative',
            border: darkMode ? 'black' : 'black',
          }}
        >
          <TextField
            label="E-mail"
            type="email"
            variant="outlined"
            name="email"
            required
            fullWidth
            margin="normal"
            InputProps={{
              style: { color: darkMode ? 'white' : 'black' },
            }}
            InputLabelProps={{
              style: { color: darkMode ? 'white' : 'black' },
            }}
            sx={{
              '& input': {
                backgroundColor: darkMode ? '#333' : '#fff',
              },
            }}
          />

          <TextField
            label="Jelszó"
            type={showPassword ? 'text' : 'password'}
            variant="outlined"
            name="password"
            required
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            InputProps={{
              style: { color: darkMode ? 'white' : 'black' },
              endAdornment: password && (
                <InputAdornment position="end">
                  <IconButton
                    onClick={togglePasswordVisibility}
                    edge="end"
                    style={{ color: 'gray' }}
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            InputLabelProps={{
              style: { color: darkMode ? 'white' : 'black' },
            }}
            sx={{
             

              '& input': {
                backgroundColor: darkMode ? '#333' : '#fff',
              },
            }}
          />

          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              marginTop: 2,
            }}
          >
            <Button
              type="submit"
              variant="contained"
              style={{ color: darkMode ? 'white' : 'black' }}
              sx={{
                backgroundColor: darkMode ? '#555' : '#ddd',
                border: '2px solid',
                borderColor: 'black',
              }}
            >
              Regisztráció
            </Button>
          </Box>
        </Box>

        <Button
          variant="contained"
          color="secondary"
          onClick={() => window.history.back()}
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            backgroundColor: '#444',
            alignItems: 'center',
            position: 'absolute',
            top: 12,
            left: 16,
            zIndex: 1,
            transition: 'background-color 0.3s ease',
            '&:hover': {
              backgroundColor: '#666',
              transform: 'scale(1.05)',
            },
          }}
        >
          <ArrowBackIcon sx={{ marginRight: 1 }} />
        </Button>

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

        <canvas
          id="dvdCanvas"
          style={{
            position: 'absolute',
            zIndex: -1,
            width: '104%',
            height: '100%',
            top: '4%',
          }}
        />
      </Container>
    </div>
  );
}
