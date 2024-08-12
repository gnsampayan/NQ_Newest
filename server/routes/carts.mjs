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

  // Fetch cart items for the authenticated user
  router.get('/', authenticateToken, (req, res) => {
    const userId = req.user.userId;

    pool.query('SELECT items FROM carts WHERE user_id = ?', [userId], (err, results) => {
      if (err) {
        console.error('Error retrieving cart from database:', err);
        return res.status(500).json({ error: 'Error retrieving cart from database' });
      }

      if (results.length === 0 || !results[0].items) {
        return res.status(200).json({ cart: [], itemIdsArray: [] });
      }

      let itemIdsArray = results[0].items;

      try {
        if (typeof itemIdsArray === 'string') {
          itemIdsArray = JSON.parse(itemIdsArray);
        }

        if (!Array.isArray(itemIdsArray) || itemIdsArray.length === 0) {
          return res.status(200).json({ cart: [], itemIdsArray: [] });
        }

        pool.query('SELECT * FROM items WHERE id IN (?)', [itemIdsArray], (err, itemResults) => {
          if (err) {
            console.error('Error retrieving items from database:', err);
            return res.status(500).json({ error: 'Error retrieving items from database' });
          }

          res.status(200).json({ cart: itemResults, itemIdsArray });
        });
      } catch (parseError) {
        console.error('Error handling cart items:', parseError);
        return res.status(500).json({ error: 'Error handling cart items' });
      }
    });
  });

  // Add or Update Cart Item for the Authenticated User
  router.post('/', authenticateToken, (req, res) => {
    const userId = req.user.userId;
    const { items } = req.body; // items should be an array of item objects

    pool.query('SELECT items FROM carts WHERE user_id = ?', [userId], (err, results) => {
      if (err) {
        console.error('Error retrieving cart:', err);
        return res.status(500).json({ error: 'Error retrieving cart' });
      }

      let cartItems = [];

      if (results.length > 0 && results[0].items) {
        cartItems = typeof results[0].items === 'string' ? JSON.parse(results[0].items) : results[0].items;
      }

      const newCartItems = items.map(item => item.id);
      const updatedCartItems = [...cartItems, ...newCartItems];

      const jsonItems = JSON.stringify(updatedCartItems);

      if (results.length > 0) {
        pool.query('UPDATE carts SET items = ? WHERE user_id = ?', [jsonItems, userId], (err) => {
          if (err) {
            console.error('Error updating cart:', err);
            return res.status(500).json({ error: 'Error updating cart', details: err.message });
          }
          res.status(200).json({ status: 'ok', message: 'Cart updated successfully' });
        });
      } else {
        const sql = `INSERT INTO carts (user_id, items) VALUES (?, ?)`;
        pool.query(sql, [userId, jsonItems], (err) => {
          if (err) {
            console.error('Error creating cart:', err);
            return res.status(500).json({ error: 'Error creating cart', details: err.message });
          }
          res.status(200).json({ status: 'ok', message: 'Cart created successfully' });
        });
      }
    });
  });

  // Delete an Item from the Cart for the Authenticated User
  router.delete('/:id', authenticateToken, (req, res) => {
    const userId = req.user.userId;
    const itemIdToRemove = parseInt(req.params.id);

    pool.query('SELECT items FROM carts WHERE user_id = ?', [userId], (err, results) => {
      if (err) {
        console.error('Error retrieving cart:', err);
        return res.status(500).json({ error: 'Error retrieving cart' });
      }

      if (results.length === 0 || !results[0].items) {
        return res.status(404).json({ error: 'Cart not found' });
      }

      let itemIdsArray = results[0].items;

      try {
        itemIdsArray = typeof itemIdsArray === 'string' ? JSON.parse(itemIdsArray) : itemIdsArray;

        const filteredItemIdsArray = itemIdsArray.filter(id => id !== itemIdToRemove);
        const jsonItems = JSON.stringify(filteredItemIdsArray);

        pool.query('UPDATE carts SET items = ? WHERE user_id = ?', [jsonItems, userId], (err) => {
          if (err) {
            console.error('Error updating cart:', err);
            return res.status(500).json({ error: 'Error updating cart' });
          }
          res.status(200).json({ status: 'ok', message: 'Item removed from cart' });
        });
      } catch (parseError) {
        console.error('Error parsing cart items:', parseError);
        return res.status(500).json({ error: 'Error parsing cart items' });
      }
    });
  });

// Update Cart Item Quantity for the Authenticated User
router.put('/', authenticateToken, (req, res) => {
    const userId = req.user.userId;
    const { id, newQuantity } = req.body; // id is the item id, newQuantity is the desired quantity

    if (newQuantity < 1) {
        return res.status(400).json({ error: 'Quantity must be at least 1.' });
    }

    pool.query('SELECT items FROM carts WHERE user_id = ?', [userId], (err, results) => {
        if (err) {
            console.error('Error retrieving cart:', err);
            return res.status(500).json({ error: 'Error retrieving cart' });
        }

        if (results.length === 0 || !results[0].items) {
            return res.status(404).json({ error: 'Cart not found.' });
        }

        let cartItems = typeof results[0].items === 'string' ? JSON.parse(results[0].items) : results[0].items;
        const currentQuantity = cartItems.filter(itemId => itemId === id).length;

        if (newQuantity > currentQuantity) {
            // Add items to match the new quantity
            cartItems = [...cartItems, ...Array(newQuantity - currentQuantity).fill(id)];
        } else if (newQuantity < currentQuantity) {
            // Remove items to match the new quantity
            let itemsToRemove = currentQuantity - newQuantity;
            cartItems = cartItems.filter(itemId => {
                if (itemId === id && itemsToRemove > 0) {
                    itemsToRemove--;
                    return false;
                }
                return true;
            });
        }

        const jsonItems = JSON.stringify(cartItems);

        pool.query('UPDATE carts SET items = ? WHERE user_id = ?', [jsonItems, userId], (err) => {
            if (err) {
                console.error('Error updating cart:', err);
                return res.status(500).json({ error: 'Error updating cart' });
            }

            res.status(200).json({ status: 'ok', message: 'Cart updated successfully' });
        });
    });
});

return router;
}