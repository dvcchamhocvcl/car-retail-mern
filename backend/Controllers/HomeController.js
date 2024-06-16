const express = require('express')

//Load Models
const User = require('../Model/user'); 
const Inquiry = require('../Model/inqury')
//Use Middlewares
const bcrypt = require('bcrypt');

const signup = async (req, res) => {
    try {
        console.log(req.body)
        const username = req.body.username
        const password =  req.body.password
        const firstname = req.body.firstname
        const lastname = req.body.lastname
        const email = req.body.email
        console.log(username, password)
        const existingUser = await User.findOne({ username:username });
        if (existingUser) {
            return res.status(400).json({ message: 'Username already taken' });
        }
        const saltRounds = 10;
        const salt = bcrypt.genSaltSync(saltRounds);
        const passwordHash = bcrypt.hashSync(password, salt);

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
        console.log(`Request Body: ${req.body}`);
        const user = await User.findOne({ username:username });
        if (!user) {
            return res.status(400).json({ message: 'No User' });
        }
        if (!bcrypt.compareSync(password, user.passwordHash)) {
            return res.status(400).json({ message: 'Bad credentials' });
        }else{
            req.session.authenticated = true
            req.session.user = {
                username:username,
                id: user._id
            }
            console.log(`user logged in as ${req.session.user}`)
            res.status(201).json({ user: { id: user._id, username: user.username }, message:'logged in' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};
const logout = async (req, res) =>{
    try {
        req.session.destroy()
        res.status(200).json({message:'logged out'})
    } catch (error) {
        res.status(500).json({message: 'Internal Server Error'})
    }
    
}
const inquiryFormHandler = async (req, res) => {
    try {
        const fullname = req.body.fullname
        const phoneNumber = req.body.phoneNumber
        const email = req.body.email
        const message = req.body.message

        const inquiry = new Inquiry({
            fullname:fullname ,
            phoneNumber:phoneNumber ,
            email:email ,
            message:message ,
        });

        await inquiry.save();
        res.status(201).json({ message: 'Inquiry submitted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
module.exports = { signup, login,logout, inquiryFormHandler };