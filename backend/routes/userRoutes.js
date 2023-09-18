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
import { protect, admin } from '../middleware/authMiddleware.js';

router.route('/').post(registerUser).get(protect, admin, getUsers);

router.post('/logout', logoutUser);

router.post('/login', authUser);

router.route('/profile').get(protect, getUserProfile).
put(protect, updateUserPrifile);

router.route('/:id').delete(protect, admin, deleteUsers).
get(protect, admin, getUserById).
put(protect, admin, updateUser);

export default router;
