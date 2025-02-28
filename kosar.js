import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Menu from './menu2';
import CloseIcon from '@mui/icons-material/Close';

import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Button,
  IconButton,
  Grid,
  Divider,
  FormGroup,
  FormControlLabel,
  Switch,
  Popper,
  Grow,
  Paper,
  ClickAwayListener,
  MenuList,
  MenuItem,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';

export default function Kosar() {
  const [darkMode, setDarkMode] = useState(true);
  const [sideMenuActive, setSideMenuActive] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [open, setOpen] = useState(false);
  const anchorRef = React.useRef(null);
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');
  const [termekek, setTermekek] = useState([
    { id: 1, nev: "Póló", ar: 5990, mennyiseg: 1 },
    { id: 2, nev: "Nadrág", ar: 12990, mennyiseg: 1 },
  ]);

  const [osszesAr, setOsszesAr] = useState(0);

  useEffect(() => {
    const ujOsszeg = termekek.reduce((acc, termek) => {
      return acc + (termek.ar * termek.mennyiseg);
    }, 0);
    setOsszesAr(ujOsszeg);
  }, [termekek]);

  const mennyisegModositas = (id, noveles) => {
    setTermekek(termekek.map(termek => {
      if (termek.id === id) {
        return {
          ...termek,
          mennyiseg: noveles 
            ? termek.mennyiseg + 1 
            : Math.max(0, termek.mennyiseg - 1)
        };
      }
      return termek;
    }));
  };

  const termekTorles = (id) => {
    setTermekek(termekek.filter(termek => termek.id !== id));
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
    if (sideMenuActive) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [sideMenuActive]);
  

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
          onClick={() => setSideMenuActive(!sideMenuActive)}
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
        <Box
  sx={{
    position: 'fixed',
    top: 0,
    left: sideMenuActive ? 0 : '-250px',
    width: '250px',
    height: '100%',
    backgroundColor: '#fff',
    boxShadow: '4px 0px 10px rgba(0, 0, 0, 0.2)',
    zIndex: 1200,
    transition: 'left 0.1s ease-in-out',
  }}
>
  <IconButton
    onClick={toggleSideMenu}
    sx={{
      position: 'absolute',
      zIndex: 1300,
      top: '10px',
      right: '10px',
    }}
  >
    <CloseIcon />
  </IconButton>
  <Menu sideMenuActive={sideMenuActive} toggleSideMenu={toggleSideMenu} />
</Box>
        <Box sx={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          {isLoggedIn ? (
            <Box sx={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
             

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

      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography variant="h4" gutterBottom>
          Kosár tartalma
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            {termekek.map((termek) => (
              <Card key={termek.id} sx={{ 
                mb: 2,
                backgroundColor: darkMode ? '#333' : '#fff',
                color: darkMode ? 'white' : 'black'
              }}>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="h6">{termek.nev}</Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <IconButton 
                        onClick={() => mennyisegModositas(termek.id, false)}
                        size="small"
                      >
                        <RemoveIcon />
                      </IconButton>
                      <Typography>{termek.mennyiseg}</Typography>
                      <IconButton 
                        onClick={() => mennyisegModositas(termek.id, true)}
                        size="small"
                      >
                        <AddIcon />
                      </IconButton>
                      <Typography sx={{ minWidth: 100 }}>
                        {(termek.ar * termek.mennyiseg).toLocaleString()} Ft
                      </Typography>
                      <IconButton 
                        onClick={() => termekTorles(termek.id)}
                        color="error"
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            ))}
          </Grid>

          <Grid item xs={12} md={4}>
            <Card sx={{
              backgroundColor: darkMode ? '#333' : '#fff',
              color: darkMode ? 'white' : 'black'
            }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Összegzés
                </Typography>
                <Divider sx={{ my: 2 }} />
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                  <Typography>Részösszeg:</Typography>
                  <Typography>{osszesAr.toLocaleString()} Ft</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                  <Typography>Szállítási költség:</Typography>
                  <Typography>1590 Ft</Typography>
                </Box>
                <Divider sx={{ my: 2 }} />
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                  <Typography variant="h6">Végösszeg:</Typography>
                  <Typography variant="h6">
                    {(osszesAr + 1590).toLocaleString()} Ft
                  </Typography>
                </Box>
                <Button 
                  variant="contained" 
                  fullWidth 
                  size="large"
                  sx={{ mt: 2 }}
                >
                  Megrendelés
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}