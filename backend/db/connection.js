const mongoose = require('mongoose');

const connection=async()=>{
    const isconnect=await mongoose.connect(`${process.env.MONGODB_CONNECTION}`);
    if(isconnect){
        console.log('DBconnect.....')
    }
}
connection();
module.exports = connection;