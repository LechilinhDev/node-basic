import mysql from 'mysql2/promise';



// create the connection to database
// const connection = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     database: 'nodejs_basic'
// });
const pool = mysql.createPool({ host: 'localhost', user: 'root', database: 'nodejs_basic' });





module.exports = pool;