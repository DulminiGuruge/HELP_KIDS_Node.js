var express = require('express');
var router = express.Router();

var dbconnection = require('../config/db_connection');

router.get('/testconnection',function(request,response,next){
  if(dbconnection != null){
    dbconnection.query('SELECT * FROM customer',function(err,rows)     {
 
      if(err) {
       // request.flash('error', err);
        response.send('connection not successful!',err);
          // render to views/books/index.ejs
         // response.render('customer-all',{customer:' '});   
      } else {
        response.send('connection successful!');
          // render to views/books/index.ejs
        //  response.render('customer-all',{customer:rows});
      }
  });
    //response.send('connection successful!');
  }else{
    response.send('connection is failed');
  }
})



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
