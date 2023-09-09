import express from "express"
const router = express.Router();

// Temp User Signup

router.post('/', (req, res) => {
    const { name, password, email, type } = req.body;
  
    // Insert the signup data into your MySQL database
    const sql = `INSERT INTO users (user_name, user_password, user_email, user_type) VALUES (?, ?, ?, ?)`;
    pool.query(sql, [name, password, email, type], (err) => {
      if (err) {
        console.error('Error inserting signup data:', err);
        return res.status(500).json({ status: 'error', message: 'An error occurred while signing up' });
      }
  
      // Successful signup
      return res.status(200).json({ status: 'ok', message: 'Sign up successful' });
    });
  });
  
  
// Temp User credentials DB check

router.get('/', (req, res) => {
  const { email } = req.query;

  if (!email) {
    res.status(400).json({ error: 'Invalid request: Missing user email' });
    return;
  }

  pool.query(
    'SELECT * FROM users WHERE user_email = ?',
    [email],
    (err, results) => {
      if (err) {
        console.error('Error retrieving data:', err);
        res.status(500).json({ error: 'Error retrieving data' });
        return;
      }

      if (results.length > 0) {
        // User exists in the database with matching credentials
        res.status(200).json({ status: 'ok', message: 'Valid credentials' });
      } else {
        // Invalid credentials
        res.status(401).json({ error: 'Email does not exist' });
      }
    }
  );
});
  
export default router;