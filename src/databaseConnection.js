const mongoose = require('mongoose')

const dataConnection = ()=>{
    const connectionString = process.env.DDBB;

    mongoose.connect(connectionString);
    const connection = mongoose.connection;

    connection.once("open",()=>{
        console.log("DDBB CONNECT SUCCESSFUL");
    })
}

module.exports = dataConnection