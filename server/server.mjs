import express, { json } from 'express';
import { createPool } from 'mysql2';
import cors from 'cors';

import config from 'config';


const app = express();
app.use(cors());
app.use(json());


//Configuration
console.log('Application Name: ' + config.get('name'));
console.log('Mail Server: ' + config.get('mail.host'));
console.log('Mail Password: ' + config.get('mail.password'));

// Create a MySQL connection pool
const pool = createPool({
  host: 'localhost',
  user: 'root',
  password: 'mrbonkers123',
  database: 'dev_featured',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Test the MySQL connection
pool.getConnection((err, connection) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the database!');
  connection.release();
});

// Retrieve data from a table and log it in the console

app.get('/data', (req, res) => {
  pool.query('SELECT * FROM featured', (err, results) => {
    if (err) {
      console.error('Error retrieving data:', err);
      res.status(500).json({ error: 'Error retrieving data' });
      return;
    }

    console.log('Data retrieved from the table:');
    console.log(results);
    res.json(results);
  });
});


// app.get('/', (req, res) => {
//   return res.json('From the backend side');
// });

// app.get('/signin', (req, res) => {
//   const sql = 'SELECT * FROM users';
//   db.query(sql, (err, data) => {
//     if (err) {
//       console.error('Error executing query:', err);
//       return res.status(500).json({ error: 'An error occurred while fetching users' });
//     }
//     return res.json(data);
//   });
// });

app.get('/users', (req, res) => {
  const { user_name, user_password } = req.query;

  if (!user_name || !user_password) {
    res.status(400).json({ error: 'Invalid request: Missing username or password' });
    return;
  }

  pool.query(
    'SELECT * FROM users WHERE user_name = ? AND user_password = ?',
    [user_name, user_password],
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
        res.status(401).json({ error: 'Invalid credentials' });
      }
    }
  );
});



app.post('/users', (req, res) => {
  const { user_name, user_password, user_email, user_type } = req.body;

  // Insert the signup data into your MySQL database
  const sql = `INSERT INTO users (user_name, user_password, user_email, user_type) VALUES (?, ?, ?, ?)`;
  pool.query(sql, [user_name, user_password, user_email, user_type], (err) => {
    if (err) {
      console.error('Error inserting signup data:', err);
      return res.status(500).json({ status: 'error', message: 'An error occurred while signing up' });
    }

    // Successful signup
    return res.status(200).json({ status: 'ok', message: 'Sign up successful' });
  });
});


app.listen(8081, () => {
  console.log('Server started on port 8081');
});