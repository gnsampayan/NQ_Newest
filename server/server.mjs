import express, { json } from 'express';
import { createPool } from 'mysql2';
import cors from 'cors';

import config from 'config';
import { User, validateUser } from './models/user.mjs';

const app = express();
app.use(cors());
app.use(json());


//Configuration
console.log('Application Name: ' + config.get('name'));
console.log('Mail Server: ' + config.get('mail.host'));
// console.log('Mail Password: ' + config.get('mail.password'));

// Create a MySQL connection pool
const pool = createPool({
  host: config.get('server.host'),
  user: config.get('server.user'),
  password: config.get('server.password'),
  database: config.get('server.database'),
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


// Temp User Signup

app.post('/users', (req, res) => {
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

app.get('/users', (req, res) => {
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


// POST request to create a new user
// app.post('/users', async (req, res) => {
//   // Validate the user data
//   const { error } = validateUser(req.body);
//   if (error) return res.status(400).send(error.details[0].message);

//   // Check if the user already exists
//   let user = await User.findOne({ email: req.body.email });
//   if (user) return res.status(400).send('User already registered.');

//   // Create a new user
//   user = new User({
//     name: req.body.name,
//     email: req.body.email,
//     password: req.body.password // Note: You should hash the password before saving
//   });

//   // Save the user to the database
//   await user.save();

//   // Send the user object as the response
//   res.send(user);
// });



app.listen(8081, () => {
  console.log('Server started on port 8081');
});