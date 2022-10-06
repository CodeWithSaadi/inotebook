// only use to connect with mongoDB

const mongosse = require('mongoose');

const mongoURI = "mongodb+srv://CodeWithSaadi:saad0955975@cluster0.9itvfr1.mongodb.net/inotebook"

const connectToMongo = () => {
    mongosse.connect(mongoURI, () => {
        console.log("connected to MONGO successfully");
    })
}

module.exports = connectToMongo;

