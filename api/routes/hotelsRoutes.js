import express from 'express'
import { createHotel, updateHotel, deleteHotel, getHotel, getAllHotel , CountByCity , CountByType, getHotelRooms,getAllHotels} from '../controller/hotelController.js';
import { verifyAdmin } from '../utils/verifyToken.js';
const router = express.Router();

router.post('/', createHotel);

router.put('/:id', updateHotel);

router.delete('/:id', deleteHotel);

router.get('/find/:id', getHotel);

router.get('/', getAllHotels);

router.get('/getAll', getAllHotel);

router.get('/CountByCity', CountByCity);

router.get('/CountByType', CountByType);

router.get('/room/:id', getHotelRooms)


export default router