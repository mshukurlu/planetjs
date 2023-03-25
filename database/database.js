const mysql = require('mysql2/promise');

const connection = mysql.createPool({
  host: configFile('database')['host'],
  user: configFile('database')['username'],
  password: configFile('database')['password'],
  database: configFile('database')['database'],
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

module.exports = connection;