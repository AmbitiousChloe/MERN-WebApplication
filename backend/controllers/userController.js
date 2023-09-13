import asyncHandler from '../middleware/asyncHandler.js';
import User from '../models/userModel.js';
import jwt from 'jsonwebtoken';

// @desc    Auth user and get the token
// @route   POST /api/users/login
// @access  Public
const authUser = asyncHandler(async (req, res) => {
    const {email, password} = req.body;
    const user = await User.findOne({email});

    if(user && (await user.matchPassword(password))){
        //userId: user._id -- object with the payload
        const token = jwt.sign({userId: user._id}, 
            process.env.JWT_SECRET, {expiresIn: '30d'});
        //set jwt as HTTP-only cookie
        res.cookie('jwt', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV !== 'development',
            sameSite: 'strict',
            maxAge: 30*24*60*60*1000 //30 days
        });
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin
        });
    }else{
        res.status(401);
        throw new Error('Invalid email or password');
    }
});

// @desc    Register User
// @route   POST /api/users
// @access  Public
const registerUser= asyncHandler(async (req, res) => {
    res.send('Register User')
});

// @desc    Log out user / clear cookie
// @route   POST /api/users/logout
// @access  private
const logoutUser= asyncHandler(async (req, res) => {
    res.send('Log out')
});

// @desc    Get user profile
// @route   GET /api/users
// @access  Public
const getUserProfile= asyncHandler(async (req, res) => {
    res.send('get user profile')
});

// @desc    Update user profile
// @route   PUT /api/users
// @access  Private
const updateUserPrifile= asyncHandler(async (req, res) => {
    res.send('update user profile')
});

// @desc    get user profile
// @route   GET /api/users
// @access  private/admin
const getUsers= asyncHandler(async (req, res) => {
    res.send('get users')
});

// @desc    get user profile
// @route   DELETE /api/users/:id
// @access  private/admin
const deleteUsers= asyncHandler(async (req, res) => {
    res.send('delete users')
});

// @desc    get user by ID
// @route   GET /api/users/:id
// @access  private/admin
const getUserById= asyncHandler(async (req, res) => {
    res.send('get user by id')
});

// @desc    update user
// @route   PUT /api/users
// @access  private/admin
const updateUser= asyncHandler(async (req, res) => {
    res.send('update user')
});

export {authUser, 
    registerUser, 
    logoutUser, 
    getUserById, 
    updateUserPrifile, 
    getUsers, 
    deleteUsers, 
    getUserProfile, 
    updateUser}