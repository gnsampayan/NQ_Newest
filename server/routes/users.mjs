import express from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = 'your_very_secret_key'; // Replace with a real secret key later

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
      req.user = user; // Ensure the decoded token contains the userId
      next();
    });
  };
  
  // Temp User Signup
  router.post('/', (req, res) => {
      const { name, password, email, type } = req.body;

      // Insert the signup data into your MySQL database
      const sql = `INSERT INTO users (user_name, user_password, user_email, user_type) VALUES (?, ?, ?, ?)`;
      pool.query(sql, [name, password, email, type], (err) => {
        if (err) {
          if (err.code === 'ER_DUP_ENTRY') {
            // Email already exists in the database
            return res.status(409).json({ status: 'error', message: 'User already exists' });
          } else {
            console.error('Error inserting signup data:', err);
            return res.status(500).json({ status: 'error', message: 'An error occurred while signing up' });
          }
        }

        // Successful signup
        return res.status(200).json({ status: 'ok', message: 'Sign up successful' });
      });
  });

  // Check if User Exists
  router.get('/check', (req, res) => {
    const { email } = req.query;

    if (!email) {
      res.status(400).json({ error: 'Invalid request: Missing email' });
      return;
    }

    pool.query('SELECT * FROM users WHERE user_email = ?', [email], (err, results) => {
      if (err) {
        console.error('Error checking user existence:', err);
        res.status(500).json({ error: 'Error checking user existence' });
        return;
      }

      if (results.length > 0) {
        res.status(200).json({ exists: true });
      } else {
        res.status(200).json({ exists: false });
      }
    });
  });

  // User Login
  router.get('/', (req, res) => {
    const { username, password } = req.query;

    if (!username) {
      res.status(400).json({ error: 'Invalid request: Missing user name' });
      return;
    }
    if (!password) {
      res.status(400).json({ error: 'Invalid request: Missing user password' });
      return;
    }

    pool.query(
      'SELECT * FROM users WHERE user_name = ? AND user_password = ?',
      [username, password],
      (err, results) => {
        if (err) {
          console.error('Error retrieving data:', err);
          res.status(500).json({ error: 'Error retrieving data' });
          return;
        }

        if (results.length > 0) {
          // User exists in the database with matching credentials
           // Create a token
           const token = jwt.sign(
            { userId: results[0].user_id, username: results[0].user_name }, // Ensure userId is included in the payload
            JWT_SECRET,
            //{ expiresIn: '1h' } // uncomment to add expiration
        );

          res.status(200).json({ status: 'ok', token });

        } else {
          // Invalid credentials
          res.status(401).json({ error: 'Invalid credentials' });
        }
      }
    );
  });

  // Getting Username and User Type after Login
  router.get('/me', authenticateToken, (req, res) => {
    const userId = req.user.userId;

    pool.query('SELECT user_name, user_type FROM users WHERE user_id = ?', [userId], (err, results) => {
      if (err) {
        console.error('Error retrieving user:', err);
        return res.status(500).json({ error: 'Error retrieving user' });
      }

      if (results.length > 0) {
        return res.status(200).json({ username: results[0].user_name, user_type: results[0].user_type });
      } else {
        return res.status(404).json({ error: 'User not found' });
      }
    });
  });



  return router;
}
