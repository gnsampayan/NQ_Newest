import express from "express"
const router = express.Router();

import multer from 'multer';

const upload = multer({ storage: multer.memoryStorage() }); // Store files in memory


export default function(pool) {
    const router = express.Router();

    router.post('/', upload.single('image'), (req, res) => {
  
        // Check if the file exists and has data
        if (!req.file || !req.file.buffer) {
          res.status(400).json({ error: 'No image file provided or file buffer is empty.' });
          return;
      }
      
      const { title, description, price } = req.body;
      const image = req.file.buffer; // Access the image's binary data

      pool.query(
        'INSERT INTO items (title, description, price, image) VALUES (?, ?, ?, ?)',
        [title, description, price, image],
        (err, results) => {
          if (err) {
            console.error('Error inserting data:', err);
            res.status(500).json({ error: 'Error inserting data' });
            return;
          }
    
          console.log('Item created successfully!');
          res.json({ message: 'Item created successfully!', id: results.insertId });
        }
      );
    });

    router.get('/', (req, res) => {
      const query = 'SELECT id, title, description, price, image, quantity FROM items';
      pool.query(query, (err, results) => {
        if (err) {
          console.error('Error fetching items:', err);
          res.status(500).send('Error fetching items');
        } else {
          const itemsWithBase64Images = results.map(item => ({
            ...item,
            image: item.image ? Buffer.from(item.image).toString('base64') : null,
          }));
          res.json(itemsWithBase64Images);
        }
      });
    });

    return router;
}