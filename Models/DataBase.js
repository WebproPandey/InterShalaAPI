const mongoose = require('mongoose')


exports.connectDatabase = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL);

        console.log('Database Connection ');
        
    } catch (error) {
        console.error('Error connecting to MongoDB:', error.message)
    }
 
}

