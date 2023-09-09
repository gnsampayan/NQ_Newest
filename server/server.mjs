import express, { json } from 'express';
import { createPool } from 'mysql2';
import cors from 'cors';

import config from 'config';
import users from './routes/users.mjs';

const app = express();
app.use(cors());
app.use(json());
app.use('/api/users', users);

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

app.listen(8081, () => {
  console.log('Server started on port 8081');
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

