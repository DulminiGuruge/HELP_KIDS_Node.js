var express = require('express');
var router = express.Router();

var dbconnection = require('../config/db_connection');


//create staff

router.get('/create',function(request,response,next){
  response.render('staff-create',{message : request.flash('message')});
})


router.post('/create-staff',function(request,response,next){

    let s_name = request.body.s_name;
    let role = request.body.role;

    let email = request.body.email;
  
    let phone = request.body.phone;
    let username = request.body.username;
    let password = request.body.password;
  

    if(dbconnection!=null){

        dbconnection.query("INSERT INTO `staff`( `s_name`, `role`, `phone`, `email`,`username`,`password`) VALUES ('"+s_name+"','"+role+"','"+phone+"','"+email+"','"+username+"','"+password+"')" ,function(error,success){   
     
            if(!error){
               
                request.flash('message','Saved successfully!');
                response.redirect('/staff/create');
               
            }else{
                response.send(error.message);
            }
        })

    }

    
});





  

  //Display all the staff


router
.get('/all', function(req, res, next) {
      
    
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
   
    dbconnection.query('SELECT * FROM staff WHERE s_id = ' + id, function(err, rows, fields) {
        if(err) throw err
         
        // if staff not found
        if (rows.length <= 0) {
            req.flash('error', 'Staff not found with s_id = ' + id)
            res.redirect('/staff/all')
        }
        // if staff found
        else {
            
            res.render('staff-update', {
                title: 'Edit staff', 
                s_id: rows[0].s_id,
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
            s_id: id,
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
        dbconnection.query("UPDATE `staff` SET   `s_name` = '"+s_name+"', `role` = '"+role+"', `phone` ='"+phone+"', `email` = '"+email+"', `username` = '"+username+"', `password` = '"+password+"' WHERE `s_id` = '"+id+"' ", function(err, result) {
            //if(err) throw err
            if (err) {
                // set flash message
                req.flash('error', err)
                
                res.render('staff/edit', {
                    s_id: req.params.id,
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
     
    dbconnection.query('DELETE FROM staff WHERE s_id = ' + id, function(err, result) {
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
            res.redirect('/staff/all')
        }
    })
})


module.exports = router;