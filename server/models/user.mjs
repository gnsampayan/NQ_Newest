// import Joi from 'joi';
// import mongoose from 'mongoose';

// const userSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: true,
//     minlength: 5,
//     maxlength: 50
//   },
//   email: {
//     type: String,
//     required: true,
//     minlength: 5,
//     maxlength: 255,
//     unique: true
//   },
//   password: {
//     type: String,
//     required: true,
//     minlength: 5,
//     maxlength: 1024 // post-hashed max-length
//   }
// });

// const User = mongoose.model('User', userSchema);

// function validateUser(user) {
//   const schema = Joi.object({
//     name: Joi.string().min(5).max(50).required(),
//     email: Joi.string().min(5).max(255).required().email(),
//     password: Joi.string().min(5).max(255).required() //pre-hashed max-length
//   });

//   return schema.validate(user);
// }

// export { User, validateUser };
