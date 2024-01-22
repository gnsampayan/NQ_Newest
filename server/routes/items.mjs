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
      
      const { title, description, price, quantity } = req.body;
      const image = req.file.buffer; // Access the image's binary data

      // Parse tags from JSON string to array/object
      let parsedTags;
      try {
          parsedTags = JSON.parse(req.body.tags);
      } catch (err) {
          res.status(400).json({ error: 'Invalid tags format' });
          return;
      }

      pool.query(
        'INSERT INTO items (title, description, price, image, tags, quantity) VALUES (?, ?, ?, ?, ?, ?)',
        [title, description, price, image, JSON.stringify(parsedTags), quantity],
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

    router.delete('/:itemId', async (req, res) => {
      try {
        const itemId = req.params.itemId;
        // Perform the delete operation with itemId
        const deleteQuery = 'DELETE FROM items WHERE id = ?';
        
        pool.query(deleteQuery, [itemId], (err, results) => {
          if (err) {
            console.error('Error deleting item:', err);
            res.status(500).json({ error: 'Error deleting item' });
            return;
          }
    
          // Check if the item was actually found and deleted
          if (results.affectedRows === 0) {
            res.status(404).json({ message: 'Item not found' });
            return;
          }
    
          res.status(200).json({ message: 'Item deleted successfully' });
        });
      } catch (error) {
        console.error('Server error:', error);
        res.status(500).json({ error: 'Server error' });
      }
    });
    
    

    return router;
}