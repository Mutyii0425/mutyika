import express from 'express';
import mysql from 'mysql';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb', extended: true}));

const db = mysql.createConnection({
  host: 'localhost',
  user: 'webshoppp',
  password: 'Premo900',
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
app.post('/usertermekek', (req, res) => {
  const { kategoriaId, ar, nev, leiras, meret, imageUrl, images } = req.body;
  
  const query = `
    INSERT INTO usertermekek 
    (kategoriaId, ar, nev, leiras, meret, imageUrl, images) 
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;
  
  db.query(query, [
    kategoriaId, 
    ar, 
    nev, 
    leiras, 
    meret,
    imageUrl,
    JSON.stringify(images)
  ], (err, result) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ success: true, id: result.insertId });
  });
});
  // Módosított GET endpoint a termék lekéréséhez
  app.get('/products/:id', (req, res) => {
    const query = 'SELECT * FROM usertermekek WHERE id = ?';
    db.query(query, [req.params.id], (err, results) => {
      if (err) {
        console.log('Database error:', err);
        res.status(500).json({ error: 'Database error' });
        return;
      }
    
      const product = results[0];
      if (product && product.additionalImages) {
        try {
          product.additionalImages = JSON.parse(product.additionalImages);
        } catch (e) {
          product.additionalImages = [];
        }
      }
    
      res.json(product);
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

app.get('/products/:id', (req, res) => {
  const query = 'SELECT * FROM usertermekek WHERE id = ?';
  db.query(query, [req.params.id], (err, results) => {
    if (err) {
      res.status(500).json({ error: 'Database error' });
      return;
    }
    
    const product = results[0];
    if (product && product.images) {
      product.images = JSON.parse(product.images);
    }
    
    res.json(product);
  });
});


app.post('/orders/create', (req, res) => {
  const { termek, statusz, mennyiseg, vevo_id } = req.body;
  
  const query = `
    INSERT INTO rendeles 
    (termek, statusz, mennyiseg, vevo_id, rendeles_id) 
    VALUES (?, ?, ?, ?, ?)
  `;
  
  db.query(query, [termek, statusz, mennyiseg, vevo_id, vevo_id], (err, result) => {
    if (err) {
      console.log('Database error:', err);
      res.status(500).json({ error: 'Database error', details: err.message });
      return;
    }
    
    res.status(200).json({ 
      success: true, 
      orderId: result.insertId,
      message: 'Order created successfully' 
    });
  });
});
const port = 5000;
app.listen(port, () => {
  console.log(`Server fut a ${port} porton`);
});


