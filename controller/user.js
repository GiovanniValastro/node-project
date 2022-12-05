const User = require('../model/User');
const Joi = require('joi');

const createUser = async (req, res) => {
  const validationSchema = Joi.object({
    nickname: Joi.string().min(3).required(),
    age: Joi.number().integer().required(), 
    city: Joi.string().min(3).required() 
  })
  const { value, error } = validationSchema.validate(req.body)
  if(error) return res.status(404).render('user/register', {error: error.details[0].message })
  try{
    const user = await User.findOne({ nickname: value.nickname })
    if(user) { 
      req.session.userId = user.id;
      return res.status(200).redirect('/post');
    }
    const newUser = new User(value)
    await newUser.save();      
    req.session.userId = newUser.id;
    res.status(200).redirect('/post');
  }catch(error){
    res.status(404).json({message: error.message});
  }  
}

const getUsers = async (req, res) => {
  try{
    const users = await User.find();
    res.status(200).render('user/user', {users: users });
  }catch(error) {
    res.status(404).json({message: error.message});
  }  
} 

const getUser = async (req, res) => {
  try{
    const user = await User.findById(req.params.id);
    res.status(200).render('user/edit', {user: user});
  }catch(error){
    res.status(404).json({message: error.message})
  } 
}  

const updateUser = async (req, res) => {
  const validationSchema = Joi.object({
    nickname: Joi.string().min(3).required(),
    age: Joi.number().integer().required(), 
    city: Joi.string().min(3).required() 
  })  
  const { value, error } = validationSchema.validate(req.body)
  if(error) return res.status(404).render('user/edit', {error: error.details[0].message })
  try{
    const user = { nickname: value.nickname, age: value.age, city: value.city };
    const userUpdate = await User.findByIdAndUpdate(req.params.id, user, { new: true });
    res.status(200).json(userUpdate);
  }catch(error) {
    res.status(404).json({message: error.message});
  }  
}

const deleteUser = async (req, res) => {
  try{
    const user = await User.findByIdAndDelete(req.params.id);
    res.status(200).json(user);
  }catch(error) {
    res.status(404).json({message: error.message});
  }  
}

module.exports = { getUsers, getUser, createUser, updateUser, deleteUser };