const mongoose = require('mongoose');
const Beer = require('../models/Beer');
const beers = require('../beers.json');

const dbName = 'beers-api';
mongoose.connect(`mongodb://localhost/${dbName}`);


Beer.create(beers, (err) => {
    if (err) { throw(err) }
    console.log(`Created ${beers.length} beers`);
    mongoose.connection.close();
});