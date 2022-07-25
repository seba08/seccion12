const Role = require('../models/role')
const User = require('../models/users')

const roleValidation = async( role = '') =>{
    //Encontrar el rol desde la base de datos

    const existeRole = await Role.findOne({role})
    if(!existeRole){
        throw new Error(`El role ${role} no está registrado en la BD`)
    }
}

const emailValidation = async(email)=>{
    //Verificar si el correo existe
    const existeEmail = await User.findOne({email});
    if(existeEmail){
         throw new Error(`El email ${email}, ya está registrado en la BD`)
     }
}

const existeUserById = async(id)=>{

   const existeUser = await User.findById(id)
    if(!existeUser){
        throw new Error(`El id no existe ${id}`) 
    }
}

module.exports = {
    roleValidation,
    emailValidation,
    existeUserById
}