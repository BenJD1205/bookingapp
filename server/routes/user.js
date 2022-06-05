import express from 'express';
const router = express.Router();
import {updateUser,deleteUser,getUser,getUsers} from '../controllers/user.js';
import {verifyToken, verifyUser, verifyAdmin} from '../utils/verifyToken.js';

//update
router.put("/:id", verifyUser,updateUser);
//detele
router.delete("/:id", verifyUser,deleteUser);
//get
router.get("/:id", verifyUser,getUser);
//get all
router.get("/", verifyAdmin,getUsers);


export default router;