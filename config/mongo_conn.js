const mongoose = require('mongoose')

//const uri = process.env.MONGO_ATLAS;

const dbConnection = async()=>{
    try{
       const conn = await mongoose.connect(process.env.MONGO_ATLAS)
       console.log("Conexión existosa...!")
    }catch(error){
        console.log(error);
        throw new Error("Error al conectarse a la base de datos...!");
    }
}
module.exports = {
    dbConnection
};