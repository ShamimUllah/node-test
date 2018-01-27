var mongoose = require('mongoose')
var Schema = mongoose.Schema

var blogSchema = new Schema({
  'title': String,
  'author': String,
  'body': String
})
module.exports = mongoose.model('Blog', blogSchema)
