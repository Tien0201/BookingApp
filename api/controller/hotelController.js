import Hotel from '../models/Hotel.js'
import Room from '../models/Room.js'


export const createHotel = async(req,res,next) =>{
    const newHotel = new Hotel(req.body)
    try{
        const savedHotel = await newHotel.save();
        res.status(200).json(savedHotel);
    }catch(err){
        next(err)
    }
}

export const updateHotel = async(req,res,next) =>{
    try{
        const updatedHotel = await Hotel.findByIdAndUpdate(req.params.id, {$set: req.body} , {new: true})
        res.status(200).json(updatedHotel);
    }catch(err){
        next(err)
    }
}

export const deleteHotel = async(req,res,next) =>{
    try{
        const foundHotel = await Hotel.findByIdAndDelete(req.params.id)
        if(!foundHotel){
            res.status(400).json(`Hotel with id ${req.params.id} can not be found `);
        }else{
            res.status(200).json(`Hotel with id ${req.params.id} deleted `);
        }
    }catch(err){
        next(err)
    }
}
export const getHotel = async(req,res,next) =>{
    try{
        const hotel = await Hotel.findById(req.params.id)
        res.status(200).json(hotel);
    }catch(err){
        next(err)
    }
}

function isString(value) {
    return typeof value === 'string' || value instanceof String;
}

export const getAllHotel = async(req,res,next) =>{
    const { min, max , ...others } = req.query;

    try{
        const limit = parseInt(req.query.limit) || 10;
        const hotels = await Hotel.find({...others,
        cheapestPrice: {$gte : min || 1 , $lte  : max || 999}, // gt: greater than , lt : less than , $lte : less than and equal
    }).limit(5)
        res.status(200).json(hotels);
      
    }catch(err){
        next(err)
    }
}

export const getAllHotels = async(req,res,next) =>{

    try{
        const hotels = await Hotel.find()
        res.status(200).json(hotels);
      
    }catch(err){
        next(err)
    }
}


export const CountByCity = async(req,res,next) =>{

    const cities = req.query.cities.split(",")
    try{
        const citiesList = await Promise.all(cities.map(city => {
           return Hotel.countDocuments({city : city})
        })
    )
        res.status(200).json(citiesList);
    }catch(err){
        next(err)
    }
}

export const CountByType = async(req,res,next) =>{

    try{
        const hotelCount = await Hotel.countDocuments({type : "hotel"})
        const apertmentCount = await Hotel.countDocuments({type : "apertment"})
        const resortCount = await Hotel.countDocuments({type : "resort"})
        const villaCount = await Hotel.countDocuments({type : "villa"})
        const cabinCount = await Hotel.countDocuments({type : "cabin"})
        res.status(200).json([  
            {type : "hotel" ,count: hotelCount},
            {type : "apertment" ,count: apertmentCount},
            {type : "resort" ,count: resortCount},
            {type : "villa" ,count: villaCount},
            {type : "cabin" ,count: cabinCount}
        ]);
    }catch (err){
        next(err)
    }
}

export const getHotelRooms = async(req,res,next) =>{
    const id = req.params.id
    try{
        const hotel = await Hotel.findById(id) 
        const list = await Promise.all(
            hotel.rooms.map((room) => {
                return Room.findById(room)
    }));
        res.status(200).json(list)
    }catch(err){
        next(err) 
    }
}