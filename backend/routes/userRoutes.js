import express from 'express';
const router = express.Router();
import asyncHandler from '../middleware/asyncHandler.js';
import {authUser, 
    registerUser,
    logoutUser, 
    getUserById, 
    updateUserPrifile, 
    getUsers, 
    deleteUsers, 
    getUserProfile, 
    updateUser} from '../controllers/userController.js'

router.route('/').post(registerUser).get(getUsers);
router.post('/logout', logoutUser);
router.post('/login', authUser);
router.route('/profile').get(getUserProfile).put(updateUserPrifile);
router.route('/:id').delete(deleteUsers).get(getUserById).put(updateUser);

export default router;
