'use strict';
const mysql = require('mysql');
//local mysql db connection


 const dbConn = mysql.createConnection({
  
    host     : '0.0.0.0',
    user     : 'root',
    password : 'root',
    port     :  3306,
    database : 'cbo_app'
});   
//docker compose up
//docker exec -it finalproject-mysqldb-1 bash
//mysql -uroot -proot





//Apache server dbconnection
 /* const dbConn = mysql.createConnection({
    host     : '127.0.0.1',
    user     : 'root',
    password : 'root',
    port     :  8889,
    database : 'cbo_app'
});  */
 


module.exports = dbConn;
