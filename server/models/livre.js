const mongoose = require('mongoose');

const config = require('./../config/config.js').get(process.env.NODE_ENV)


const livreSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    author: {
      type: String,
      required: true
    },
    review: {
      type: String,
      default: 'n/a'
    },
    pages: {
      type: String,
      default: 'n/a'
    },
    rating: {
      type: Number,
      default: 1,
      min: 1,
      max: 5,
      required: true
    },
    price: {
      type: String,
      default: 'n/a'
    },
    ownerId: {
      type: String,
      required: true
    }},{ timestamps: true }
);




const Livre = mongoose.model('Livre', livreSchema);
module.exports = { Livre }
