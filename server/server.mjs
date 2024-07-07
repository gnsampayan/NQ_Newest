import express, { json } from 'express';
import { createPool } from 'mysql2';
import cors from 'cors';

import config from 'config';
import userRoutes from './routes/users.mjs';
import itemsRoutes from './routes/items.mjs';
import tagRoutes from './routes/allTags.mjs';
import log from './middleware/logger.mjs';


// Create a MySQL connection pool
const pool = createPool({
  host: config.get('server.host'),
  user: config.get('server.user'),
  password: config.get('server.password'),
  database: config.get('server.database'),
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

const app = express();

app.use(log);
app.use(cors());
app.use(json());
app.use('/api/users', userRoutes(pool));
app.use('/api/items', itemsRoutes(pool));
app.use('/api/all_tags', tagRoutes(pool));
//Configuration
console.log('Application Name: ' + config.get('name'));
console.log('Mail Server: ' + config.get('mail.host'));
// console.log('Mail Password: ' + config.get('mail.password'));

// Test the MySQL connection
pool.getConnection((err, connection) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the database!');
  connection.release();
});

const port = 8081;
app.listen(port, () => {
  console.log('Server started on port' + port);
});

