const mongoose = require('mongoose')
var pool = () => {
    mongoose.Promise = global.Promise
    mongoose.connect('mongodb+srv://huanle120201:Huanle120201@cluster0.hsf7e8d.mongodb.net/blogreact')

    mongoose.connection
        .once("open", () => console.log("MongoDB is running!"))
        .on("error", (err) => console.log(err))
}

module.exports = pool
