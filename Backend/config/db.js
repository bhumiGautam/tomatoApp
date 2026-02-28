import mongoose from "mongoose";


 export const connectDB= async ()=>{
    // mongodb+srv://bhumigautam25:7759887117@cluster0.r5smjxh.mongodb.net
    await mongoose.connect('mongodb+srv://gautamkumarpandey149_db_user:IwdxEUyJpQ5f8mWV@newconnection.cupauuw.mongodb.net/?appName=NewConnection/food').then(()=>console.log("DB Connected"));
}
// mongodb://localhost:27017/food-del