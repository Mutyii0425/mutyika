const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'webshoppp'
});

db.connect((err) => {
  if (err) {
    console.log('Hiba az adatbázis kapcsolódásnál:', err);
    return;
  }
  console.log('MySQL adatbázis kapcsolódva');
});

// Kategóriák lekérése
app.get('/categories', (req, res) => {
  const query = 'SELECT * FROM kategoriak';
  db.query(query, (err, results) => {
    if (err) {
      console.log('Hiba a kategóriák lekérésénél:', err);
      res.status(500).json({ error: 'Adatbázis hiba' });
      return;
    }
    res.json(results);
  });
});

// Termékek lekérése
app.get('/products', (req, res) => {
  const query = `
    SELECT ut.*, k.cs_nev as kategoria_nev 
    FROM usertermekek ut 
    LEFT JOIN kategoriak k ON ut.kategoriaId = k.cs_azonosito
  `;
  
  db.query(query, (err, results) => {
    if (err) {
      console.log('Hiba a termékek lekérésénél:', err);
      res.status(500).json({ error: 'Adatbázis hiba' });
      return;
    }
    res.json(results);
  });
});

// Új termék mentése
app.post('/usertermekek', (req, res) => {
  const { kategoriaId, ar, nev, leiras, meret } = req.body;
  
  const query = `
    INSERT INTO usertermekek 
    (kategoriaId, ar, nev, leiras, meret) 
    VALUES (?, ?, ?, ?, ?)
  `;
  
  db.query(query, [kategoriaId, ar, nev, leiras, meret], (err, result) => {
    if (err) {
      console.log('Hiba a termék mentésénél:', err);
      res.status(500).json({ error: 'Hiba a mentés során' });
      return;
    }
    res.json({ 
      message: 'Termék sikeresen mentve',
      id: result.insertId 
    });
  });
});

// Termék törlése
app.delete('/products/:id', (req, res) => {
  const productId = req.params.id;
  
  const query = 'DELETE FROM usertermekek WHERE id = ?';
  
  db.query(query, [productId], (err, result) => {
    if (err) {
      console.log('Hiba a termék törlésénél:', err);
      res.status(500).json({ error: 'Hiba a törlés során' });
      return;
    }
    res.json({ message: 'Termék sikeresen törölve' });
  });
});

const port = 5000;
app.listen(port, () => {
  console.log(`Server fut a ${port} porton`);
});
