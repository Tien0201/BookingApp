import express from 'express'
import dotenv from 'dotenv'
import mongoose, { connect } from 'mongoose'
import cookieParser from 'cookie-parser'
import cors from 'cors'

import authRoute from './routes/authRoutes.js'
import userRoute from './routes/usersRoutes.js'
import roomRoute from './routes/roomsRoutes.js'
import hotelRoute from './routes/hotelsRoutes.js'

import { logger, logEvents } from './middleware/logger.js'


const app = express();
const port = 8800;
dotenv.config();

const dbConnect = async() =>{
    try{
        await mongoose.connect(process.env.MONGODB)
        console.log("mongodb connected")
    }catch(err){
        throw err;
    }
};

mongoose.connection.on("disconnected" , ()=>{
    console.log("db disconnected!!!!")
});

mongoose.connection.on("connected" , ()=>{
    console.log("reconnected")
});

mongoose.connection.on('error' , err =>{
    console.log(err);
    logEvents(`${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`,'mongoErrLog.txt')
})

//middlewares
app.use(cookieParser())
app.use(express.json());
app.use(logger);
app.use(cors());


app.use("/api/auth" , authRoute);
app.use("/api/users" , userRoute);
app.use("/api/rooms" ,  roomRoute);
app.use("/api/hotels" , hotelRoute);

//errorHandler
app.use((err,req,res,next) =>{
    const errorStatus = err.status || 500
    const errorMessage = err.message || "Something went wrong"
    return res.status(errorStatus).json({
        success : false,
        status : errorStatus,
        message : errorMessage,
        stack : err.stack
    });
});


app.listen(port , () =>{
    dbConnect();
    console.log(`Server running at http://localhost:${port}/`);
});