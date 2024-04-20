const mongoose = require("mongoose");

const connectDb = async () => {


    try {

        const connection = await mongoose.connect(process.env.CONNECTION_STRING);
        console.log("DataBase Connected :",
    connection.connection.host,
connection.connection.name);

    }

    catch(err) {
        console.log(err);
        process.exit(1);
    }
};

module.exports = connectDb;