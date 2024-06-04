import express from 'express'
import {  updateUser, deleteUser, getUser, getAllUser } from '../controller/userController.js';
import { verifyToken , verifyUser , verifyAdmin } from '../utils/verifyToken.js';
const router = express.Router();


router.put('/:id', updateUser);

router.delete('/:id', deleteUser);

router.get('/:id', getUser);

router.get('/', getAllUser);

export default router