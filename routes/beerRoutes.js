const express = require('express');
const router = express.Router();
const Beer = require('../models/Beer');

// ALL ROUTES ARE PREFIXED WITH '/beers' IN app.js

// '/beers' => get all the beers
router.get('/', (req, res, next) => {
  Beer.find()
  .then(beersFromAPI => res.status(200).json(beersFromAPI))
  .catch(err => next(err));
});


// '/beers/search/?q=...' => gets the beer(s) based on the search term
// '/beers/search/?q=lager' will get 2 lagers we have currently in the DB
router.get('/search', (req, res, next) => {
  Beer.find({ "name" : { $regex: req.query.q, $options: 'i' }})
  .then(foundBeer => res.status(200).json(foundBeer) )
  .catch(err => next(err));
});


// '/beers/random' => gets a random beer
router.get('/random', (req, res, next) => {
  Beer.find()
  .then(beersFromAPI => {
    const rdmIndex = Math.floor(Math.random() * beersFromAPI.length);
    res.status(200).json(beersFromAPI[rdmIndex]);
  })
  .catch(err => next(err));
});


// '/beers/new' => post route to create a new beer
// all fields are type of String, except `attenuation_level` which is a Number
router.post('/new', (req, res, next) => {
  const {
    name,
    tagline,
    description,
    first_brewed,
    brewers_tips,
    attenuation_level,
    contributed_by
  } = req.body;

  Beer.create({
    name, 
    tagline, 
    description, 
    first_brewed,
    brewers_tips,
    attenuation_level,
    contributed_by
  })
  .then( () => res.status(200).json({message: "New beer successfully saved to database!"}))
  .catch(err => next(err));
});

// '/beers/121hygytyda898' => gets a specific beer based on the `id` provided through URL
router.get('/:id', (req, res, next) => {
  Beer.findOne({"_id": req.params.id})
  .then(foundBeer => res.status(200).json(foundBeer))
  .catch(err => next(err));
});

module.exports = router;