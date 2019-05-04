const mongoose = require('mongoose');

const beerSchema = new mongoose.Schema({  
  name: { type: String, required: [true, 'The name is required'] },
  tagline: String,
  description: String,
  first_brewed: String,
  brewers_tips: String,
  attenuation_level: Number,
  contributed_by: String,
  image_url: {
    type: String,
    default: "https://images.punkapi.com/v2/keg.png"
  }
});

module.exports = mongoose.model('Beer', beerSchema);
