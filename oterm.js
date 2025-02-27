import React, { useState, useEffect } from "react";
import { Box, AppBar, Toolbar, Typography, IconButton, CircularProgress, Grid, Card, CardContent } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import Menu from './menu3';  // Changed to menu3 component

const Oterm = () => {
  const [sideMenuOpen, setSideMenuOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const dummyProducts = [
      { azonosito: 1, nev: "Termék 1", termekleiras: "Ez egy minta termék.", ar: 5000 },
      { azonosito: 2, nev: "Termék 2", termekleiras: "Ez egy másik minta termék.", ar: 7500 },
    ];
    setTimeout(() => {
      setProducts(dummyProducts);
      setLoading(false);
    }, 1000);
  }, []);

  const toggleSideMenu = () => {
    setSideMenuOpen(!sideMenuOpen);
  };

  return (
    <Box sx={{ backgroundColor: "#f5f5f5", minHeight: "100vh" }}>
      <AppBar position="fixed" sx={{ backgroundColor: "grey" }}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={toggleSideMenu}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1, textAlign: "center" }}>
            Adali Clothing
          </Typography>
        </Toolbar>
      </AppBar>

      <Box
        sx={{
          position: "fixed",
          top: 0,
          left: sideMenuOpen ? 0 : "-250px",
          width: "250px",
          height: "100vh",
          backgroundColor: "#fff",
          transition: "left 0.1s ease-in-out",
          zIndex: 1200,
        }}
      >
        <Box sx={{ width: 250, padding: 2 }}>
          <IconButton onClick={toggleSideMenu} sx={{ mb: 2 }}>
            <CloseIcon />
          </IconButton>
          <Menu sideMenuOpen={sideMenuOpen} toggleSideMenu={toggleSideMenu} />
        </Box>
      </Box>

      <Box
        sx={{
          backgroundColor: "#f5f5f5",
          textAlign: "center",
          padding: "100px 20px 20px",
        }}
      >
        <Typography variant="h3" gutterBottom>
          Összes Termékünk
        </Typography>
      </Box>

      <Box sx={{ padding: 2 }}>
        {loading ? (
          <Box sx={{ textAlign: "center", marginTop: 4 }}>
            <CircularProgress />
            <Typography variant="body1">Termékek betöltése...</Typography>
          </Box>
        ) : products.length > 0 ? (
          <Grid container spacing={3} justifyContent="center">
            {products.map((product) => (
              <Grid item key={product.azonosito} xs={12} sm={6} md={4} lg={3}>
                <Card
                  sx={{
                    padding: 2,
                    borderRadius: 2,
                    boxShadow: 3,
                    transition: "transform 0.3s ease, box-shadow 0.3s ease",
                    "&:hover": {
                      transform: "scale(1.05)",
                      boxShadow: 6,
                    },
                  }}
                >
                  <CardContent>
                    <Typography variant="h6">{product.nev}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {product.termekleiras}
                    </Typography>
                    <Typography
                      variant="h6"
                      sx={{ marginTop: 2, fontWeight: "bold" }}
                    >
                      {product.ar} Ft
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        ) : (
          <Typography variant="body1" align="center">
            Nincsenek elérhető termékek.
          </Typography>
        )}
      </Box>

      <Box
        sx={{
          backgroundColor: "#333",
          color: "white",
          textAlign: "center",
          padding: "10px 0",
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0
        }}
      >
        <Typography variant="body2">
          &copy; 2024 Adali Clothing - Minden jog fenntartva.
        </Typography>
      </Box>
    </Box>
  );
};

export default Oterm;
