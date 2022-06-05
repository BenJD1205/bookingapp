import express from 'express';
const router = express.Router();
import {createRoom, updateRoom,deleteRoom,getRoom,getRooms, updateRoomAvailability} from '../controllers/room.js';
import {verifyAdmin} from '../utils/verifyToken.js';

//Create
router.post('/:hotelid', verifyAdmin,createRoom);
//update
router.put("/:id", verifyAdmin,updateRoom);
//availibity
router.put("/availability/:id", verifyAdmin,updateRoomAvailability);
//detele
router.delete("/:id/:hotelid", verifyAdmin,deleteRoom);
//get
router.get("/:id", getRoom);
//get all
router.get("/",getRooms);

export default router;