const mongoose = require('mongoose')

const connect_db = async() =>{
    try{
const conn = await mongoose.connect(process.env.MONGO_URI)
console.log(`DB CONNECTION SUCCESS : ${conn.connection.name}`.bgWhite.yellow)
}catch(error){
console.log(`DB CONNECTION FAILED :${error.message}`.bgRed)
}
}
module.exports = connect_db