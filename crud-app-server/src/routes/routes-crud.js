var express = require('express')
var router = express.Router()

var Crud = require('../models/model-crud')


router.get('/',  function (req, res, next) {
     
    // const { firebaseUser } = req
    Crud.find( (err, user) => {

        if (err) { return next(err) }
        res.custom({
            success: true, message: "user found", data: user
        })
    })
})


router.post('/save', function (req, res, next) {
       let user = req
              console.log(user)
    
    const newUser = new Crud();
    newUser.firstName = req.body.data.firstName;
    newUser.lastName = req.body.data.lastName
    newUser.email = req.body.data.email
    newUser.phone = user.body.data.phone;
    newUser.location = req.body.data.location;
    newUser.hobby = req.body.data.hobby
    newUser.save((err, newUser) => {
           
        if (err) { return next(err) }

        res.custom({
            success: true, message: "user successfully added", data: newUser
        })


    })
})

router.get('/:id', function (req, res) {
    /* 
        Todo
    */
})


// update user route
router.put('/update', function (req, res, next) {
    console.log(req.body.data);
    let updateUser = {
        firstName: req.body.data.newData.firstName,
        lastName: req.body.data.newData.lastName,
        email: req.body.data.newData.email,
        phone: req.body.data.newData.phone,
        location: req.body.data.newData.location,
        hobby: req.body.data.newData.hobby
    }
    Crud.findByIdAndUpdate(req.body.data.id, updateUser, { new: true }, (err, updatedata) => {
        if (err) { return next(err) }  

        if(updatedata){
            res.custom({
                success: true, message: " successfully updated", data: updatedata
            })
        }
    })
   
})

//delete course 
router.delete('/', function (req, res, next) {
    
    let user = req.user;
    const userId = req.query.userId;
    
    Crud.deleteOne({_id: userId},function(err, del){
        if (err) { return next(err) } 
        if(del){
         
        
            res.custom({
                success: true, message: " successfully deleted"
            })
        }
        
    })
})


module.exports = router