import express from 'express'
import { createRoom, updateRoom, deleteRoom, getRoom, getAllRoom ,updateRoomAvailability} from '../controller/roomController.js';
import { verifyAdmin } from '../utils/verifyToken.js';
const router = express.Router();

router.post('/:hotelid', createRoom);

router.put('/:id', updateRoom);

router.put("/availability/:id", updateRoomAvailability);

router.delete('/:id/:hotelid', deleteRoom);

router.get('/:id', getRoom);

router.get('/', getAllRoom);

export default router