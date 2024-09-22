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
    const whitelist = [
         'https://api.nqhardware.com',
         'http://localhost:8081',
         'http://localhost:5173', // dev
         'https://162.240.97.162',
         'http://162.240.97.162',
         'https://nqhardware.com',
         'http://nqhardware.com',
         'https://162.241.218.79',
         'http://162.241.218.79',
         'https://www.nqhardware.com',

    ];
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      console.error(`Blocked by CORS: ${origin}`); // Add this line
      callback(new Error('Not allowed by CORS'));
    }
  },
  optionsSuccessStatus: 200,
  credentials: true,
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
    key: fs.readFileSync('/etc/letsencrypt/live/api.nqhardware.com/privkey.pem'),
      cert: fs.readFileSync('/etc/letsencrypt/live/api.nqhardware.com/cert.pem'),
      ca: fs.readFileSync('/etc/letsencrypt/live/api.nqhardware.com/chain.pem'),
  };

  https.createServer(httpsOptions, app).listen(port, () => {
    console.log('HTTPS Server started on port ' + port);
  });
} else {
  http.createServer(app).listen(port, () => {
    console.log('HTTP Server started on port ' + port);
  });
}