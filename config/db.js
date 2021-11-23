const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'te010302',
    database: 'disguard'
});

  
module.exports = connection;
