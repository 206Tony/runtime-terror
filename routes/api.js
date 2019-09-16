const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Drink = require('../models/drink');

// GET /api/drinks -- display/get all drinks -- WORKS
router.get('/drinks', (req, res) => {
  Drink.find({}, (err, drinks) => {
    if (err) res.json(err)
    res.json(drinks)
    //res.json({type: 'success', message: "You accessed the protected api routes"})
  })
})

// GET /api/drinks/:drinkid -- display/get selected drink -- WORKS 
router.get('/drinks/:drinkid', (req, res) => {
  Drink.findById(req.params.drinkid, (err, drink) => {
    if (err) res.json(err)
    res.json(drink)
  })
})

//GET /users/:userid/drinks -- get drinks for one user -- WORKS
router.get('/drinks', (req, res) => {
  User.findById(req.user._id).populate('drinks').exec((err, user) => {
    if (err) res.json(err)
    res.json(user)
  }) 
})


//POST /users/:userid/drinks -- create new drink -- WORKS, BUT need to figure out how to post ingredients
router.post('/drinks', (req, res) =>{
  User.findById(req.user._id, function(err, user) {
    Drink.findById(
      req.body._id, 
      function(err,drink){
          user.drinks.push(drink)
          user.save(function(err, user){
            if (err) res.json(err)
            res.json(user)
      })
    })
  })
})

//DELETE /users/:userid/drinks/:drinkid -- detete one drink from one user -- WORKS
router.delete('/drinks/:drinkid', (req, res) => {
  User.findById(req.user._id, (err, user) => {
    user.drinks.pull(req.params.drinkid)
    user.save(err => {
      if (err) res.json(err)
      Drink.deleteOne({_id: req.body.drinkid}, err => {
        if (err) res.json(err)
        res.json(user)
      })
    })
  })
})

module.exports = router;


// GET /drinks/drinkName
// router.get('/drinks/:drinkName', (req, res) => {
//   Drink.findOne(req.query.drinkName, (err, drink) => {
//     if (err) res.json(err)
//     res.json(drinks)
//   })
// })



// POST /drinks -- create new drink
// router.post('/drinks', (req, res) => {
//   let drink = new Drink({ 
//     drinkName: req.body.drinkName,
//     ingredients: req.body.ingredients,
//     instructions: req.body.instructins
//   });
//   drink.save((err, drink) => {
//     res.json(drink)
//   })
// })
//PUT /drinks/:id -- update one drink
// router.put('/drinks/:drinkid', (req, res) => {
//   Drink.findByIdAndUpdate(
//     req.params.drinkid, 
//     { drinkName: req.body.drinkName,
//       ingredients: req.body.ingredients,
//       instructions: req.body.instructins
//     }, 
//     {new: true}, 
//     (err, drink) => {
//       if (err) res.json(err)
//       res.status(203).json(drink)
//   }) 
// })
// DELETE /drinks/:drinkid -- delete a drink
// router.delete('/drinks/:drinkid', (req, res) => {
//   Drink.findByIdAndDelete(
//     req.params.drinkid,
//     function(err) {
//       if (err) res.json(err)
//       res.json({message: "DELETED!"})
//   })
// })



//GET /users/:userid/drinks/:drinkid -- WORKS
// router.get('/drinks/:drinkid', (req, res) => {
//   Drink.findById(req.params.drinkid, (err, drink) => {
//     if (err) res.json(err)
//     res.json(drink)
//   })
// })

