const express = require('express')

//Load Models
const User = require('../Model/user'); 
//Use Middlewares
const bcrypt = require('bcrypt');
const { generateToken } = require('../Middlewares/jwtUser');

const signup = async (req, res) => {
    try {
        const username = req.body.username
        const password =  req.body.password
        const firstname = req.body.firstname
        const lastname = req.body.lastname
        const email = req.body.email
        console.log(req.body)
        console.log(username, password)
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: 'Username already taken' });
        }
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, salt);

        const user = new User({
            username:username,
            passwordHash:passwordHash,
            realname:{
                firstname:firstname,
                lastname:lastname
            },
            email:email
        });
        await user.save();

        res.status(201).json({ user: { id: user._id, username: user.username } });
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Internal server error' });
    }
};

const login = async (req, res) => {
    try {
        const username = req.body.username
        const password = req.body.password
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        const isMatch = await bcrypt.compare(password, user.passwordHash);
        
        if (!isMatch) {
            return res.status(400).json({ message: 'Bad credentials' });
        }
        const token = generateToken(user);

        res.status(201).json({ token, user: { id: user._id, username: user.username } });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

const inquiryFormHandler = async (req, res) => {
    try {
        const { userId, content } = req.body;

        if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ message: 'Invalid user ID' });
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const inquiry = new Inquiry({
            user: userId,
            content,
        });

        await inquiry.save();

        user.inquiries.push(inquiry._id);
        await user.save();

        res.status(201).json({ message: 'Inquiry submitted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
module.exports = { signup, login, inquiryFormHandler };