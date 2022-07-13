var express = require('express');
var router = express.Router();

var dbconnection = require('../config/db_connection');


//create customer

router.get('/create',function(request,response,next){
  response.render('customer-create',{message : request.flash('message')});
})


router.post('/create-customer',function(request,response,next){

    let c_name = request.body.c_name;
    let date_of_birth = request.body.date_of_birth;
    let address = request.body.address;
    let phone = request.body.phone;
  

    if(dbconnection!=null){

        dbconnection.query("INSERT INTO `customer`( `c_name`, `date_of_birth`, `address`, `phone`) VALUES ('"+c_name+"','"+date_of_birth+"','"+address+"','"+phone+"')" ,function(error,success){   
     
            if(!error){
               
                request.flash('message','Saved successfully!');
                response.redirect('/customer/create');
               // response.send('success');
            }else{
                response.send(error.message);
            }
        })

    }

    
});





  
  
  


  //Display all the customers


router.get('/all', function(req, res, next) {
      
    dbconnection.query('SELECT * FROM customer',function(err,rows)     {
 
        if(err) {
            req.flash('error', err);
            // render to views/books/index.ejs
            res.render('customer-all',{customer:' '});   
        } else {
            // render to views/books/index.ejs
            res.render('customer-all',{customer:rows});
        }
    });
});





// Edit customer
router.get('/edit/(:id)', function(req, res, next) {

    let id = req.params.id;
   
    dbconnection.query('SELECT * FROM customer WHERE id = ' + id, function(err, rows, fields) {
        if(err) throw err
         
        // if user not found
        if (rows.length <= 0) {
            req.flash('error', 'Customer not found with id = ' + id)
            res.redirect('/customer/all')
        }
        // if book found
        else {
            // render to edit.ejs
            res.render('customer-update', {
                title: 'Edit customer', 
                id: rows[0].id,
                c_name: rows[0].c_name,
                date_of_birth: rows[0].date_of_birth,
                address: rows[0].address,
                phone: rows[0].phone
            })
        }
    })
})


//Update customer

router.get('/update',function(request,response,next){
    response.render('customer-update',{message : request.flash('message')});
  })



router.post('/update-customer/:id', function(req, res, next) {

    let id = req.params.id;
    let c_name = req.body.c_name;
    let date_of_birth = req.body.date_of_birth;
    let address = req.body.address;
    let phone = req.body.phone;
    let errors = false;

    if(c_name.length === 0 ) {
        errors = true;
        
        // set flash message
        req.flash('error', "Please enter name and age");
        // render to add.ejs with flash message

        res.render('customer-update', {
            title: 'Edit customer', 
            id: id,
            c_name: c_name,
            date_of_birth: date_of_birth,
            address:address,
            phone: phone
        })
      
    }

    // if no error
    if( !errors ) {   
 
    
        // update query
        dbconnection.query("UPDATE `customer` SET   `c_name` = '"+c_name+"', `date_of_birth` = '"+date_of_birth+"', `address` ='"+address+"', `phone` = '"+phone+"' WHERE `id` = '"+id+"' ", function(err, result) {
            //if(err) throw err
            if (err) {
                // set flash message
                req.flash('error', err)
                // render to edit.ejs
                res.render('customer/edit', {
                    id: req.params.id,
                    c_name: form_data.c_name,
                    date_of_birth: form_data.date_of_birth,
                    phone : form_data.phone,
                    address : form_data.address
                })
            } else {
                req.flash('message','Customer successfully updated!');
                res.redirect('/customer/create');
               
            }
        })
    }
})
   
// delete book
router.get('/delete/(:id)', function(req, res, next) {

    let id = req.params.id;
     
    dbconnection.query('DELETE FROM customer WHERE id = ' + id, function(err, result) {
        //if(err) throw err
        if (err) {
            // set flash message
            req.flash('error', err)
            // redirect to books page
            res.redirect('/customer/all')
        } else {
            // set flash message
            req.flash('message', 'Customer successfully deleted! ID = ' + id)
            // redirect to books page
            res.redirect('/customer/all')
        }
    })
})


module.exports = router;