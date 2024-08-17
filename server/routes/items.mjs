import express from "express"

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
      
      const { title, description, price, quantity, saleBool, saleRate, saleTimed, saleEnd } = req.body;
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
        'INSERT INTO items (title, description, price, image, tags, quantity, sale_bool, sale_rate, sale_timed, sale_end) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [
          title,
          description,
          price,
          image,
          JSON.stringify(parsedTags),
          quantity,
          saleBool,
          saleRate !== '' ? saleRate : null,  // Set saleRate to NULL if it's an empty string
          saleTimed,
          saleEnd !== '' ? saleEnd : null     // Set saleEnd to NULL if it's an empty string
        ],
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

    router.post('/images', async (req, res) => {
      const { itemIds } = req.body;
  
      if (!Array.isArray(itemIds) || itemIds.length === 0) {
          return res.status(400).json({ error: 'Invalid item IDs provided' });
      }
  
      try {
          const query = 'SELECT id, image FROM items WHERE id IN (?)';
          const [results] = await pool.promise().query(query, [itemIds]);
  
          const images = {};
          results.forEach(item => {
              images[item.id] = item.image ? Buffer.from(item.image).toString('base64') : null;
          });
  
          res.status(200).json(images);
      } catch (err) {
          console.error('Error retrieving images:', err);
          res.status(500).json({ error: 'Error retrieving images' });
      }
  });
  

  router.get('/', (req, res) => {
    const { tag } = req.query;
    let query = 'SELECT id, title, description, price, image, tags, quantity, rating, sale_bool, sale_rate, sale_timed, sale_end FROM items';
    let queryParams = [];
  
    if (tag) {
      query += ' WHERE JSON_CONTAINS(tags, ?)';
      queryParams.push(`"${tag}"`);
    }
  
    pool.query(query, queryParams, (err, results) => {
      if (err) {
        console.error('Error fetching items:', err);
        res.status(500).send('Error fetching items');
      } else {
        const itemsWithBase64Images = results.map(item => ({
          ...item,
          image: item.image ? Buffer.from(item.image).toString('base64') : null,
          saleBool: item.sale_bool,
          saleRate: item.sale_rate,
          saleTimed: item.sale_timed,
          saleEnd: item.sale_end,
        }));
        res.json(itemsWithBase64Images);
      }
    });
  });
  
    router.get('/check-exists', (req, res) => {
      const { title } = req.query;
  
      if (!title) {
          res.status(400).json({ error: 'Title is required' });
          return;
      }
  
      const query = 'SELECT COUNT(*) AS count FROM items WHERE title = ?';
      pool.query(query, [title], (err, results) => {
          if (err) {
              console.error('Error checking item existence:', err);
              res.status(500).json({ error: 'Error checking item existence' });
              return;
          }
  
          const exists = results[0].count > 0;
          res.json({ exists });
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

    router.put('/:itemId', upload.single('image'), async (req, res) => {
      const itemId = req.params.itemId;
  
      // Handle the incoming data similar to the POST route
      const { title, description, price, quantity, saleBool, saleRate, saleTimed, saleEnd } = req.body;
      let image, parsedTags;
  
      // Check and process the image if it's provided
      if (req.file && req.file.buffer) {
          image = req.file.buffer;
      }
  
      // Parse tags from JSON string to array/object
      try {
          parsedTags = JSON.parse(req.body.tags);
      } catch (err) {
          res.status(400).json({ error: 'Invalid tags format' });
          return;
      }
  
      // Update query
      let updateQuery = 'UPDATE items SET title = ?, description = ?, price = ?, quantity = ?, tags = ?, sale_bool = ?, sale_rate = ?, sale_timed = ?, sale_end = ?';
      let queryParams = [
        title,
        description,
        price,
        quantity,
        JSON.stringify(parsedTags),
        saleBool,
        saleRate !== '' ? saleRate : null,  // Set saleRate to NULL if it's an empty string
        saleTimed,
        saleEnd !== '' ? saleEnd : null     // Set saleEnd to NULL if it's an empty string
      ];
  
      // Add image to query if it exists
      if (image) {
          updateQuery += ', image = ?';
          queryParams.push(image);
      }
  
      updateQuery += ' WHERE id = ?';
      queryParams.push(itemId);
  
      try {
          const [results] = await pool.promise().query(updateQuery, queryParams);
  
          // Check if the item was actually found and updated
          if (results.affectedRows === 0) {
              res.status(404).json({ message: 'Item not found' });
              return;
          }
  
          res.status(200).json({ message: 'Item updated successfully' });
      } catch (err) {
          console.error('Error updating item:', err);
          res.status(500).json({ error: 'Error updating item' });
      }
  });
  
  
  
    return router;
}