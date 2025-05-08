const mongoose = require("mongoose")

const TestimonialSchema = new mongoose.Schema({
  author: {
    type: String,
    required: true,
    validate: {
      validator: (value) => {
        return value.trim().length > 3;
      },
      message: "Author field cannot be empty and must be bigger than 3 letters.",
    },
  },
  user: {  // This is the user field, set as optional
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',  // Assuming you have a User model, and referencing the user who created the testimonial
    required: false  // Set to false to make it optional
},
  text: {
    type: String,
    required: true,
    validate: {
      validator: (value) => {
        return value.trim().length > 40;
      },
      message: "Text field cannot be empty and must be bigger than 40 letters.",
    },
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    required: false,
  },
  title: {
    type: String,
    required: false,
    validate: {
      validator: (value) => {
        return value.trim().length > 5;
      },
      message: "Title must be at least 6 characters long.",
    },
  },
  date: {
    type: Date,
    default: Date.now,
  },
  verified: {
    type: Boolean,
    default: false,
  },
}, { timestamps: true });

const TestimonialModel = mongoose.model("testimonials", TestimonialSchema)
module.exports = TestimonialModel
