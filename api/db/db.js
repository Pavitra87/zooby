const mongoose = require('mongoose')

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log("Mongodb connected successfully...!")
    } catch (error) {
        console.log('mongodb connection failed', error)
        process.exit(1)
    }
}


module.exports = {connectDB}