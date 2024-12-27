import dotenv from 'dotenv'
import mongoose from 'mongoose'
import app from './app.js'

dotenv.config({path: './.env'})

const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD)




mongoose.connect(DB).then(()=>{
    console.log("DataBase is Conntected Successfully")
}).catch((error)=>{
    console.log(`DataBase is not Connected Due To ${error}`)
})


const port = process.env.PORT || 3000;

app.listen(port, ()=>{
    console.log(`App is Listen On Port ${port} ...`)
})