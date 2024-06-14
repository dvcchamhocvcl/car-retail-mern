const mongoose = require('mongoose');
const Admin = require('../Model/admin')

const bcrypt = require('bcrypt');
const { generateToken } = require('../Middlewares/jwtUser');

const adminSignup = async (req, res) => {
    try {
        const { username, password, firstname, lastname, email } = req.body;

        const existingUser = await Admin.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: 'Username already taken' });
        }
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, salt);

        const user = new Admin({
            username,
            passwordHash,
        });
        await user.save();

        const token = generateToken(user);

        res.status(201).json({ token, user: { id: user._id, username: user.username } });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

const adminLogin = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await Admin.findOne({ username });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        const isMatch = await bcrypt.compare(password, user.passwordHash);
        
        if (!isMatch) {
            return res.status(400).json({ message: 'Bad credentials' });
        }
        const token = generateToken(user);

        res.status(200).json({ token, user: { id: user._id, username: user.username } });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};
async function getUser(req, res){

}
async function getUsers(req, res){
    
}
async function deleteUserComments(req,res){

}
async function makeAdmin(req,res){

}
async function removeAdmin(req,res){
    
}
module.exports = {  
  deleteUserComments,adminLogin,adminSignup,
  makeAdmin,removeAdmin, getUser,getUsers
};
