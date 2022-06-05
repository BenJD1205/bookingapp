import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import authRoute from './routes/auth.js'; 
import userRoute from './routes/user.js';
import roomsRoute from './routes/rooms.js';
import hotelsRoute from './routes/hotels.js';
import cookieParser from 'cookie-parser';

//initial app
const app = express();
dotenv.config();

//middleware
app.use(cors())
app.use(cookieParser());
app.use(express.json());

///connect DB mongoose.
const connect = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to mongoDB.")
    }
    catch(error){
        throw error;
    }
}

mongoose.connection.on("disconnected", () => {
    console.log("mongoDB disconnected");
});

mongoose.connection.on("connected",() =>{
    console.log("mongoDB connected");
})

//Routes
app.use('/api/auth',authRoute);
app.use('/api/users',userRoute);
app.use('/api/hotels', hotelsRoute);
app.use('/api/rooms', roomsRoute);

//middleware handle
app.use((err,req,res,next) =>{
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "Something went wrong!";
    return res.status(errorStatus).json({
        success:false,
        status:errorStatus,
        message:errorMessage,
        stack:err.stack
    })
})

//origin port backend
const PORT = process.env.PORT || 5000;

app.listen(PORT,()=>{
    connect();
    console.log(`Server is running at port ${PORT}`);
})