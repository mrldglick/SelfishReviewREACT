const mongoose = require('mongoose');

const filmSchema = new mongoose.Schema({
  title: { type: String, required: true, unique: true },
  releaseYear: Number,
  director: String,
  tags: [
    {
      addedBy: { type: mongoose.Schema.ObjectId, ref: 'User' },
      tagname: String
    }
  ],
  imgUrl: String,
  review: String
});

module.exports = mongoose.model('Film', filmSchema);
