import express, { json } from 'express';
import { createPool } from 'mysql2';
import cors from 'cors';
import https from 'https';
import http from 'http';
import fs from 'fs';
import config from 'config';
import userRoutes from './routes/users.mjs';
import itemsRoutes from './routes/items.mjs';
import tagRoutes from './routes/allTags.mjs';
import salesRoutes from './routes/sales.mjs';
import cartsRoutes from './routes/carts.mjs';
import wishlistsRoutes from './routes/wishlists.mjs';
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

// Configure CORS
const corsOptions = {
  origin: (origin, callback) => {
    const whitelist = ['https://therealglenn.com', 'http://localhost:3000', 'http://localhost:5173'];
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  optionsSuccessStatus: 200,
  credentials: true, // If you need to send cookies or authentication headers
};
app.use(cors(corsOptions));

app.use(json()); // Middleware for parsing JSON

app.use('/api/users', userRoutes(pool));
app.use('/api/items', itemsRoutes(pool));
app.use('/api/all_tags', tagRoutes(pool));
app.use('/api/sales', salesRoutes(pool));
app.use('/api/carts', cartsRoutes(pool));
app.use('/api/wishlists', wishlistsRoutes(pool));

// Configuration
console.log('Application Name: ' + config.get('name'));
console.log('Mail Server: ' + config.get('mail.host'));
// console.log('Mail Password: ' + config.get('mail.password')); // Avoid logging sensitive information

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
// handle environment changes
if (process.env.NODE_ENV === 'production') {
  // HTTPS options
  const httpsOptions = {
    key: fs.readFileSync('/etc/letsencrypt/live/api.therealglenn.com/privkey.pem'),
    cert: fs.readFileSync('/etc/letsencrypt/live/api.therealglenn.com/fullchain.pem'),
    ca: fs.readFileSync('/etc/letsencrypt/live/api.therealglenn.com/chain.pem'), // Optional: Path to your CA bundle (if you have one)
  };

  https.createServer(httpsOptions, app).listen(port, () => {
    console.log('HTTPS Server started on port ' + port);
  });
} else {
  http.createServer(app).listen(port, () => {
    console.log('HTTP Server started on port ' + port);
  });
}