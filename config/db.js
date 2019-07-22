// this is where we will do our mongodb conncetion

const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI');

const connectDB = async () => {
    try {
        await mongoose.connect(db,
            { useNewUrlParser: true });
        console.log("MongoDB Connected...")
    } catch(err) {
        console.error(err.message);
        // Exit process with faliure
        process.exit(1);
    }
}

module.exports = connectDB;


// THIS IS A TEST ! THIS IS A YO! THIS A TEST B !