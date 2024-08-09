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


  // Fetch cart items for the authenticated user
router.get('/', authenticateToken, (req, res) => {
  const userId = req.user.userId;

  pool.query('SELECT items FROM carts WHERE user_id = ?', [userId], (err, results) => {
      if (err) {
          console.error('Error retrieving cart from database:', err);
          return res.status(500).json({ error: 'Error retrieving cart from database' });
      }

      if (results.length === 0) {
          return res.status(200).json({ cart: [] });
      }

      let itemIdsArray = results[0].items;

      try {
          // Log the array to confirm its structure
          console.log('Raw itemIdsArray:', itemIdsArray);

          // Ensure that itemIdsArray is indeed an array
          if (!Array.isArray(itemIdsArray) || itemIdsArray.length === 0) {
              return res.status(200).json({ cart: [] });
          }

          // Query the items table for details of the unique items in the cart
          pool.query('SELECT * FROM items WHERE id IN (?)', [itemIdsArray], (err, itemResults) => {
              if (err) {
                  console.error('Error retrieving items from database:', err);
                  return res.status(500).json({ error: 'Error retrieving items from database' });
              }

              // Return both the raw itemIdsArray and the item details
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
    const itemIdToRemove = parseInt(req.params.id);

    pool.query('SELECT items FROM carts WHERE user_id = ?', [userId], (err, results) => {
        if (err) {
            console.error('Error retrieving cart:', err);
            return res.status(500).json({ error: 'Error retrieving cart' });
        }

        if (results.length > 0) {
            let itemIdsArray;
            let itemIdsString = results[0].items;

            // Check if itemIdsString is a string
            if (typeof itemIdsString === 'string') {
                itemIdsString = itemIdsString.trim();
            }

            try {
                // If itemIdsString is already an array, no need to parse
                if (Array.isArray(itemIdsString)) {
                    itemIdsArray = itemIdsString;
                } else if (typeof itemIdsString === 'string') {
                    // If it's a string, parse it as JSON
                    itemIdsArray = JSON.parse(itemIdsString);
                } else {
                    throw new Error('Unexpected data type for items column');
                }
            } catch (parseError) {
                console.error('Error parsing cart items:', parseError);
                return res.status(500).json({ error: 'Error parsing cart items' });
            }

            // Remove the itemIdToRemove from the array
            const filteredItemIdsArray = itemIdsArray.filter(id => id !== itemIdToRemove);

            console.log('Filtered itemIdsArray:', filteredItemIdsArray);

            const jsonItems = JSON.stringify(filteredItemIdsArray);

            pool.query(
                'UPDATE carts SET items = ? WHERE user_id = ?',
                [jsonItems, userId],
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
