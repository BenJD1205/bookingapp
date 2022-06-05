import express from 'express';
const router = express.Router();
import {createHotel, updateHotel,deleteHotel,
    getHotel,getHotels, countByCity, countByType, getHotelRooms
} from '../controllers/hotel.js';
import {verifyAdmin} from '../utils/verifyToken.js';

//Create
router.post('/', verifyAdmin,createHotel);
//update
router.put("/:id", verifyAdmin,updateHotel);
//detele
router.delete("/:id", deleteHotel);
//get
router.get("/find/:id", getHotel);
//get all
router.get("/",getHotels);

router.get("/countByCity",countByCity);
router.get("/countByType",countByType);
router.get("/room/:id", getHotelRooms);



export default router;