import asyncHandler from '../middleware/asyncHandler.js';
import User from '../models/userModel.js';
import generateToken from '../utils/generateToken.js';

// @desc    Auth user and get the token
// @route   POST /api/users/login
// @access  Public
const authUser = asyncHandler(async (req, res) => {
    const {email, password} = req.body;
    const user = await User.findOne({email});

    if(user && (await user.matchPassword(password))){
        generateToken(res, user._id);
        
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
    const {name, email, password} = req.body;

    const userExist = await User.findOne({email});
    if(userExist){
        res.status(400);
        throw new Error('User already exist!')
    }
    const user = await User.create({
        name, 
        email,
        password,
    });

    if (user){
        generateToken(res, user._id);
        res.status(200).json({
            _id: user._id,
            name:user.name,
            email: user.email,
            IsAdmin: user.isAdmin
        })
    }
});

// @desc    Log out user / clear cookie
// @route   POST /api/users/logout
// @access  private
const logoutUser= asyncHandler(async (req, res) => {
    res.cookie('jwt', '', {
        httpOnly: true,
        expired: new Date(0)
    });

    res.status(200).json({message: 'Logged out successfully!'})
});

// @desc    Get user profile
// @route   GET /api/users
// @access  Public
const getUserProfile= asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    if (user){
        generateToken(res, user._id);
        res.status(200).json({
            _id: user._id,
            name:user.name,
            email: user.email,
            IsAdmin: user.isAdmin
        })
    }else{
        res.status(404);
        throw new Error('User Not Found!')
    }
});

// @desc    Update user profile
// @route   PUT /api/users
// @access  Private
const updateUserPrifile= asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    if (user){
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        if(req.body.password){
            user.password = req.body.password;
        }
        const updateUser = await user.save();
        res.status(200).json({
            _id: updateUser._id,
            name:updateUser.name,
            email: updateUser.email,
            IsAdmin: updateUser.isAdmin
        });
    }else{
        res.status(404);
        throw new Error('User Not Found!')
    }
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