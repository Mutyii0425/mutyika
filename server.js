const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb', extended: true}));

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

app.get('/products', (req, res) => {
  const query = 'SELECT * FROM usertermekek';
  db.query(query, (err, results) => {
    console.log('Lekért adatok:', results); // Ellenőrzéshez
    res.json(results);
  });
});

// Új termék mentése
app.post('/usertermekek', (req, res) => {
  const { kategoriaId, ar, nev, leiras, meret, imageUrl } = req.body;
  
  console.log('Beérkezett adatok:', {
    kategoriaId,
    ar,
    nev,
    leiras,
    meret,
    imageUrl: imageUrl ? 'Kép megérkezett' : 'Nincs kép'
  });

  const query = `
    INSERT INTO usertermekek 
    (kategoriaId, ar, nev, leiras, meret, imageUrl) 
    VALUES (?, ?, ?, ?, ?, ?)
  `;
  
  db.query(query, [kategoriaId, ar, nev, leiras, meret, imageUrl], (err, result) => {
    if (err) {
      console.log('SQL hiba:', err);
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ 
      success: true, 
      id: result.insertId,
      message: 'Termék sikeresen mentve' 
    });
  });
});

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
