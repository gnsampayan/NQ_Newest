const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json()); // Add this line to parse the request body as JSON


const db = mysql.createConnection({
  host: "localhost",
  user: "glennsam_NQ_admin",
  password: "NunezQuinal0",
  database: "glennsam_NQ"
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the database!');
});

app.get('/', (req, res) => {
  return res.json('From the backend side');
});

app.get('/users', (req, res) => {
  const sql = 'SELECT * FROM users';
  db.query(sql, (err, data) => {
    if (err) {
      console.error('Error executing query:', err);
      return res.status(500).json({ error: 'An error occurred while fetching users' });
    }
    return res.json(data);
  });
});

app.post('/signup', (req, res) => {
  const { email, username, password } = req.body;

  // Insert the signup data into your Bluehost MySQL database
  const sql = `INSERT INTO users (email, username, password) VALUES ('${email}', '${username}', '${password}')`;
  db.query(sql, (err, result) => {
    if (err) {
      console.error('Error inserting signup data:', err);
      return res.status(500).json({ error: 'An error occurred while signing up' });
    }

    // Successful signup
    return res.status(200).json({ message: 'Sign up successful' });
  });
});

app.listen(8081, () => {
  console.log('Listening on port 8081');
});