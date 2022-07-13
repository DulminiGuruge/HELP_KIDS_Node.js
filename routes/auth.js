var express = require('express');
var router = express.Router();

var dbconnection = require('../config/db_connection');


//create staff

router.get('/userlogin',function(request,response,next){
  response.render('login',{message : request.flash('message')});
})


router.post('/authentication',function(request,response,next){

    let username = request.body.username;
    let password = request.body.password;
   
  

    if(dbconnection!=null){

        dbconnection.query("SELECT * FROM `staff` WHERE  `username` = '"+s_name+"' AND `password` = '"+password+"' " ,function(error,success){   
     
            if(!error){
               
               // request.flash('message','Saved successfully!');
                response.redirect('/');
               
            }else{
                
                request.flash('message','Saved successfully!');
                response.redirect('/auth/userlogin');
            }
        })

    }

    
});





  
  
  


  //Display all the staff


router.get('/all', function(req, res, next) {
      
    dbconnection.query('SELECT * FROM staff',function(err,rows)     {
 
        if(err) {
            req.flash('error', err);
            
            res.render('staff-all',{staff:' '});   
        } else {
            
            res.render('staff-all',{staff:rows});
        }
    });
});





// Edit staff
router.get('/edit/(:id)', function(req, res, next) {

    let id = req.params.id;
   
    dbconnection.query('SELECT * FROM staff WHERE id = ' + id, function(err, rows, fields) {
        if(err) throw err
         
        // if staff not found
        if (rows.length <= 0) {
            req.flash('error', 'Staff not found with id = ' + id)
            res.redirect('/staff/all')
        }
        // if staff found
        else {
            
            res.render('staff-update', {
                title: 'Edit staff', 
                id: rows[0].id,
                s_name: rows[0].s_name,
                role: rows[0].role,
                phone: rows[0].phone,
                email: rows[0].email,
                username: rows[0].username,
                password: rows[0].password
            })
        }
    })
})


//Update staff

router.get('/update',function(request,response,next){
    response.render('staff-update',{message : request.flash('message')});
  })



router.post('/update-staff/:id', function(req, res, next) {

    let id = req.params.id;
    let s_name = req.body.s_name;
    let role = req.body.role;
    let phone = req.body.phone;
    let email = req.body.email;
    let username = req.body.username;
    let password = req.body.password;
    let errors = false;

    if(s_name.length === 0 || role.length === 0) {
        errors = true;
        
        // set flash message
        req.flash('error', "Please enter name and role");
       
        res.render('staff-update', {
            title: 'Edit staff', 
            id: id,
            s_name: s_name,
            role: role,
            phone:phone,
            email: email,
            username:username,
            password: password
        })
      
    }

    // if no error
    if( !errors ) {   
 
    
        // update query
        dbconnection.query("UPDATE `staff` SET   `s_name` = '"+s_name+"', `role` = '"+role+"', `phone` ='"+phone+"', `email` = '"+email+"', `username` = '"+username+"', `password` = '"+password+"' WHERE `id` = '"+id+"' ", function(err, result) {
            //if(err) throw err
            if (err) {
                // set flash message
                req.flash('error', err)
                
                res.render('customer/edit', {
                    id: req.params.id,
                    s_name: form_data.s_name,
                    role: form_data.role,
                    phone : form_data.phone,
                    email : form_data.email,
                    username: form_data.username,
                    password : form_data.password
                })
            } else {
                req.flash('message','Staff successfully updated!');
                res.redirect('/staff/create');
               
            }
        })
    }
})
   
// delete staff
router.get('/delete/(:id)', function(req, res, next) {

    let id = req.params.id;
     
    dbconnection.query('DELETE FROM staff WHERE id = ' + id, function(err, result) {
        //if(err) throw err
        if (err) {
            // set flash message
            req.flash('error', err)
            // redirect to staff page
            res.redirect('/staff/all')
        } else {
            // set flash message
            req.flash('message', 'Satff successfully deleted! ID = ' + id)
            // redirect to staff page
            res.redirect('/customer/all')
        }
    })
})


module.exports = router;