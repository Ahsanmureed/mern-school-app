import mongoose from "mongoose";
// env config
import dotenv from 'dotenv'
dotenv.config()
// connection
const URL= process.env.DB_URL

const connection = async()=>{
  try {
    const connect = await mongoose.connect(URL)
    console.log('DataBase Connected');
  } catch (error) {
    console.log(error);
  }
}
export default connection