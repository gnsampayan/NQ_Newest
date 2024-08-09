import express from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = 'your_very_secret_key'; // Replace with your real secret key

const router = express.Router();

export default function(pool) {  // Export as a function that takes pool

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
        req.user = user;  // Ensure the decoded token contains the userId
        next();
    });
};


  // Get Cart Items for the Authenticated User
  router.get('/', authenticateToken, (req, res) => {
    const userId = req.user.userId;

    pool.query('SELECT * FROM carts WHERE user_id = ? AND status = 0', [userId], (err, results) => {
      if (err) {
        console.error('Error retrieving cart:', err);
        return res.status(500).json({ error: 'Error retrieving cart' });
      }

      if (results.length > 0) {
        const cart = results[0];
        res.status(200).json({ cart: JSON.parse(cart.content) });
      } else {
        // Cart is empty
        res.status(200).json({ cart: [] });
      }
    });
  });

  // Add or Update Cart Item for the Authenticated User
  router.post('/', authenticateToken, (req, res) => {
    const userId = req.user.userId;
    const { items } = req.body; // items should be an array of item objects

    pool.query('SELECT * FROM carts WHERE user_id = ?', [userId], (err, results) => {
        if (err) {
            console.error('Error retrieving cart:', err);
            return res.status(500).json({ error: 'Error retrieving cart' });
        }

        let cartItems = [];

        if (results.length > 0) {
            const itemsColumn = results[0].items;
            cartItems = typeof itemsColumn === 'string' ? JSON.parse(itemsColumn) : itemsColumn;
        }

        // Extract just the item IDs from the incoming items array
        const newCartItems = items.map(item => item.id); // Store the item IDs

        const updatedCartItems = [...cartItems, ...newCartItems]; // Combine existing and new items

        const jsonItems = JSON.stringify(updatedCartItems); // Convert to JSON

        if (results.length > 0) {
            // Update existing cart
            pool.query(
                'UPDATE carts SET items = ? WHERE user_id = ?',
                [jsonItems, userId],
                (err) => {
                    if (err) {
                        console.error('Error updating cart:', err);
                        return res.status(500).json({ error: 'Error updating cart', details: err.message });
                    }
                    res.status(200).json({ status: 'ok', message: 'Cart updated successfully' });
                }
            );
        } else {
            // Create new cart
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
    const itemId = parseInt(req.params.id);

    pool.query('SELECT * FROM carts WHERE user_id = ? AND status = 0', [userId], (err, results) => {
      if (err) {
        console.error('Error retrieving cart:', err);
        return res.status(500).json({ error: 'Error retrieving cart' });
      }

      if (results.length > 0) {
        let cartContent = JSON.parse(results[0].content);

        cartContent = cartContent.filter(item => item.id !== itemId);

        const jsonContent = JSON.stringify(cartContent);

        pool.query(
          'UPDATE carts SET content = ? WHERE user_id = ? AND status = 0',
          [jsonContent, userId],
          (err) => {
            if (err) {
              console.error('Error updating cart:', err);
              return res.status(500).json({ error: 'Error updating cart' });
            }

            res.status(200).json({ status: 'ok', message: 'Item removed from cart' });
          }
        );
      } else {
        res.status(404).json({ error: 'Cart not found' });
      }
    });
  });

  return router;
}
