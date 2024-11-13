const mongoose = require('mongoose');
const URI = 'mongodb+srv://gsbsproductions:Sri2003@cluster0.yu3wrsk.mongodb.net/auth-app'; // Make sure to define your URI

const dbConnect = async () => {
    try {
        const db = await mongoose.connect(URI);
        if (db) {
            // Uncomment this if you want to execute it
            // await webinarModel.updateMany(
            //     { count: { $exists: false } },
            //     { $set: { count: 0 } } 
            // );
            return 'DB Connected successfully';
        }
    } catch (e) {
        console.log(e);
        process.exit(1);
    }
};

// Export the function
module.exports = dbConnect;
