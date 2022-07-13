var express = require('express');
var router = express.Router();

var dbconnection = require('../config/db_connection');


//create reports

router.get('/create',function(request,response,next){
          
            response.render('c_reports-create',{message : request.flash('message')});
            
    
})


router.post('/create-c_reports',function(request,response,next){

    let c_id = request.body.c_id;
    
    let school_items = request.body.school_items;
    let amount_donated = request.body.amount_donated;
    let special_requests = request.body.special_requests;
  

    if(dbconnection!=null){

        dbconnection.query("INSERT INTO `customer_reports`( `c_id`,  `school_items`, `amount_donated`,`special_requests`) VALUES ('"+c_id+"','"+school_items+"','"+amount_donated+"','"+special_requests+"')" ,function(error,success){   
     
            if(!error){
               
                request.flash('message','Saved successfully!');
                response.redirect('/c_reports/create');
               // response.send('success');
            }else{
                response.send(error.message);
            }
        })

    }

    
});





  
  
  


  //Display all the customers


router.get('/all', function(req, res, next) {

    
    //dbconnection.query('SELECT * FROM customer_reports',function(err,rows)     {
    dbconnection.query('SELECT * FROM customer_reports INNER JOIN customer ON customer_reports.c_id = customer.id',function(err,rows)     {
 
        if(err) {
            req.flash('error', err);
            // render to views/books/index.ejs
            res.render('c_reports-all',{reports:' '});   
        } else {
            // render to views/books/index.ejs
            res.render('c_reports-all',{reports:rows});
        }
    });
});





// Edit customer
router.get('/edit/(:id)', function(req, res, next) {

    let id = req.params.id;
   
    dbconnection.query('SELECT * FROM customer_reports WHERE id = ' + id, function(err, rows, fields) {
        if(err) throw err
         
        // if user not found
        if (rows.length <= 0) {
            req.flash('error', 'Customer reports not found with id = ' + id)
            res.redirect('/c_reports/all')
        }
        // if book found
        else {
            // render to edit.ejs
            res.render('c_reports-update', {
                title: 'Edit customer_reports', 
                id: rows[0].id,
                c_id: rows[0].c_id,
                
                school_items: rows[0].school_items,
                amount_donated: rows[0].amount_donated,
                special_requests: rows[0].special_requests
            })
        }
    })
})


//Update reports

router.get('/update',function(request,response,next){
    response.render('c_reports-update',{message : request.flash('message')});
  })



router.post('/update-c_reports/:id', function(req, res, next) {

    let id = req.params.id;
    let c_id = req.body.c_id;
   
    let school_items = req.body.school_items;
    let amount_donated = req.body.amount_donated;
    let special_requests = req.body.special_requests;
    let errors = false;

    if(c_id.length === 0 || amount_donated.length === 0) {
        errors = true;
        
        // set flash message
        req.flash('error', "Please enter customer_id and amount donated");
        // render to add.ejs with flash message

        res.render('c_reports-update', {
            title: 'Edit customer reports', 
            id: id,
            c_id: c_id,
            
            school_items:school_items,
            amount_donated: amount_donated,
            special_requests : special_requests

        })
      
    }

    // if no error
    if( !errors ) {   
 
    
        // update query
        dbconnection.query("UPDATE `customer_reports` SET   `c_id` = '"+c_id+"', `school_items` ='"+school_items+"', `amount_donated` = '"+amount_donated+"',`special_requests` ='"+special_requests+"' WHERE `id` = '"+id+"' ", function(err, result) {
            //if(err) throw err
            if (err) {
                // set flash message
                req.flash('error', err)
                // render to edit.ejs
                res.render('c_reports/edit', {
                    id: req.params.id,
                    c_id: form_data.s_name,
                    
                    school_items : form_data.school_items,
                    amount_donated : form_data.amount_donated,
                    special_requests : form_data.special_requests
                })
            } else {
                req.flash('message','Customer reports successfully updated!');
                res.redirect('/c_reports/create');
               
            }
        })
    }
})
   
// delete book
router.get('/delete/(:id)', function(req, res, next) {

    let id = req.params.id;
     
    dbconnection.query('DELETE FROM customer_reports WHERE id = ' + id, function(err, result) {
        //if(err) throw err
        if (err) {
            // set flash message
            req.flash('error', err)
            // redirect to books page
            res.redirect('/c_reports/all')
        } else {
            // set flash message
            req.flash('message', 'Customer reports successfully deleted! ID = ' + id)
            // redirect to books page
            res.redirect('/c_reports/all')
        }
    })
})




  //Display all the customers


  router.get('/details/(:id)', function(req, res, next) {
    let id = req.params.id;

    
    //dbconnection.query('SELECT * FROM customer_reports',function(err,rows)     {
    dbconnection.query('SELECT * FROM customer_reports INNER JOIN customer ON customer_reports.c_id = customer.id WHERE customer_reports.id = ' + id,function(err,rows)     {
 
        if(err) {
            req.flash('error', err);
            // render to views/books/index.ejs
            res.render('c_reports-details',{reports:' '});   
        } else {
            // render to views/books/index.ejs
            res.render('c_reports-details',{reports:rows});
        }
    });
});


module.exports = router;