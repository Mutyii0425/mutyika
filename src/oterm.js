import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './oterm.css';

const Oterm = () => {
  const [sideMenuActive, setSideMenuActive] = useState(false);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // A termékek adatainak lekérése a fetch API-val
  useEffect(() => {
    fetch(`http://localhost/work/react2/src/get_products.php?cs`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP hiba! Státusz: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Hiba a termékek lekérésekor:", error.message);
        setLoading(false);
      });
  }, []);

  const toggleSideMenu = () => {
    setSideMenuActive(!sideMenuActive);
  };

  return (
    <div>
      {/* Header */}
      <header className="oterm-header">
        <div className="oterm-nav-toggle" onClick={toggleSideMenu}>
          &#9776; {/* Hamburger icon */}
        </div>
        <div className="oterm-logo">Adali Clothing</div>
      </header>

      {/* Side Menu */}
      <div className={`oterm-side-menu ${sideMenuActive ? 'active' : ''}`}>
        <div className="oterm-close-btn" onClick={toggleSideMenu}>&times;</div>
        <div className="oterm-menu-item"><Link to="/">Kezdőlap</Link></div>
        <div className="oterm-menu-item"><Link to="/oterm">Termékek</Link></div>
      </div>

      {/* Hero Section */}
      <section className="oterm-hero">
        <h1>Összes Termékünk</h1>
      </section>

      {/* Product List */}
      <main>
        <div className="oterm-product-list">
          {loading ? (
            <p>Termékek betöltése folyamatban...</p>
          ) : products.length > 0 ? (
            products.map((product) => (
              <div className="oterm-product-item" key={product.azonosito}>
                <h3>{product.nev}</h3>
                <p>{product.termekleiras}</p>
                <div className="oterm-price">{product.ar} Ft</div>
              </div>
            ))
          ) : (
            <p>Nincsenek elérhető termékek.</p>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="oterm-footer">
        <p>&copy; 2024 Adali Clothing - Minden jog fenntartva.</p>
      </footer>
    </div>
  );
};

export default Oterm;
