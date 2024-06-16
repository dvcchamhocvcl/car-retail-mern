const mongoose = require('mongoose');
const Admin = require('../Model/admin')
const Comment = require('../Model/comment')

const bcrypt = require('bcrypt');

const adminSignup = async (req, res) => {
    try {
        const { username, password} = req.body;

        const existingUser = await Admin.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: 'Username already taken' });
        }
        
        const saltRounds = 10;
        const salt = bcrypt.genSaltSync(saltRounds);
        const passwordHash = await bcrypt.hashSync(password, salt);

        const user = new Admin({
            username,
            passwordHash,
        });
        await user.save()
        res.status(201).json({ user: { id: user._id, username: user.username } });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

const adminLogin = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await Admin.findOne({ username:username });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        const isMatch = bcrypt.compare(password, user.passwordHash);
        
        if (!bcrypt.compareSync(password, user.passwordHash)) {
            return res.status(400).json({ message: 'Bad credentials' });
        }
        req.session.authenticated = true
        req.session.user = {
            username:username,
            id: user._id,
            isAdmin: 'true'
        }
        res.status(200).json({ user: { id: user._id, username: user.username } });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

async function getallComments(req,res) {
    if(req.session.user.isAdmin){

    }
    const comments = await Comment.find({})
    
}
async function deleteUserComments(req,res){

}
module.exports = {  
  deleteUserComments,adminLogin,adminSignup, getallComments
};
