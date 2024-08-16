import express from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = 'your_very_secret_key'; // Replace with your real secret key
const router = express.Router();

export default function(pool) {
  // Middleware to verify JWT and extract user ID
  const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      return res.status(403).json({ error: 'Forbidden: No token provided' });
    }

    jwt.verify(token, JWT_SECRET, (err, user) => {
      if (err) {
        return res.status(403).json({ error: 'Forbidden: Invalid token' });
      }
      req.user = user; // Ensure the decoded token contains the userId
      next();
    });
  };

  // Fetch wishlist items for the authenticated user
  router.get('/', authenticateToken, (req, res) => {
    const userId = req.user.userId;

    pool.query('SELECT wishlist FROM wishlists WHERE user_id = ?', [userId], (err, results) => {
      if (err) {
        console.error('Error retrieving wishlist from database:', err);
        return res.status(500).json({ error: 'Error retrieving wishlist from database' });
      }

      if (results.length === 0 || !results[0].wishlist) {
        return res.status(200).json({ wishlist: [], itemIdsArray: [] });
      }

      let itemIdsArray = results[0].wishlist;

      try {
        if (typeof itemIdsArray === 'string') {
          itemIdsArray = JSON.parse(itemIdsArray);
        }

        if (!Array.isArray(itemIdsArray) || itemIdsArray.length === 0) {
          return res.status(200).json({ wishlist: [], itemIdsArray: [] });
        }

        pool.query('SELECT * FROM items WHERE id IN (?)', [itemIdsArray], (err, itemResults) => {
          if (err) {
            console.error('Error retrieving items from database:', err);
            return res.status(500).json({ error: 'Error retrieving items from database' });
          }

          res.status(200).json({ wishlist: itemResults, itemIdsArray });
        });
      } catch (parseError) {
        console.error('Error handling wishlist items:', parseError);
        return res.status(500).json({ error: 'Error handling wishlist items' });
      }
    });
  });

  // Add or Update Wishlist Item for the Authenticated User
  router.post('/', authenticateToken, (req, res) => {
    const userId = req.user.userId;
    const { items } = req.body; // items should be an array of item objects

    pool.query('SELECT wishlist FROM wishlists WHERE user_id = ?', [userId], (err, results) => {
      if (err) {
        console.error('Error retrieving wishlist:', err);
        return res.status(500).json({ error: 'Error retrieving wishlist' });
      }

      let wishlistItems = [];

      if (results.length > 0 && results[0].wishlist) {
        wishlistItems = typeof results[0].wishlist === 'string' ? JSON.parse(results[0].wishlist) : results[0].wishlist;
      }

      const newWishlistItems = items.map(item => item.id);
      const updatedWishlistItems = [...new Set([...wishlistItems, ...newWishlistItems])]; // Ensure unique items

      const jsonItems = JSON.stringify(updatedWishlistItems);

      if (results.length > 0) {
        pool.query('UPDATE wishlists SET wishlist = ? WHERE user_id = ?', [jsonItems, userId], (err) => {
          if (err) {
            console.error('Error updating wishlist:', err);
            return res.status(500).json({ error: 'Error updating wishlist', details: err.message });
          }
          res.status(200).json({ status: 'ok', message: 'Wishlist updated successfully' });
        });
      } else {
        const sql = `INSERT INTO wishlists (user_id, wishlist) VALUES (?, ?)`;
        pool.query(sql, [userId, jsonItems], (err) => {
          if (err) {
            console.error('Error creating wishlist:', err);
            return res.status(500).json({ error: 'Error creating wishlist', details: err.message });
          }
          res.status(200).json({ status: 'ok', message: 'Wishlist created successfully' });
        });
      }
    });
  });

  // Delete an Item from the Wishlist for the Authenticated User
  router.delete('/:id', authenticateToken, (req, res) => {
    const userId = req.user.userId;
    const itemIdToRemove = parseInt(req.params.id);

    pool.query('SELECT wishlist FROM wishlists WHERE user_id = ?', [userId], (err, results) => {
      if (err) {
        console.error('Error retrieving wishlist:', err);
        return res.status(500).json({ error: 'Error retrieving wishlist' });
      }

      if (results.length === 0 || !results[0].wishlist) {
        return res.status(404).json({ error: 'Wishlist not found' });
      }

      let itemIdsArray = results[0].wishlist;

      try {
        itemIdsArray = typeof itemIdsArray === 'string' ? JSON.parse(itemIdsArray) : itemIdsArray;

        const filteredItemIdsArray = itemIdsArray.filter(id => id !== itemIdToRemove);
        const jsonItems = JSON.stringify(filteredItemIdsArray);

        pool.query('UPDATE wishlists SET wishlist = ? WHERE user_id = ?', [jsonItems, userId], (err) => {
          if (err) {
            console.error('Error updating wishlist:', err);
            return res.status(500).json({ error: 'Error updating wishlist' });
          }
          res.status(200).json({ status: 'ok', message: 'Item removed from wishlist' });
        });
      } catch (parseError) {
        console.error('Error parsing wishlist items:', parseError);
        return res.status(500).json({ error: 'Error parsing wishlist items' });
      }
    });
  });

  return router;
}
