const { request, response } = require('express')
const bcrypt = require('bcryptjs')
const User = require('../models/users')
const getUsers = async(req, res = response)=>{
    const { limite = 5, desde = 0 } = req.query;
    const query = {status: true}
    /* const users = await User.find(query)
        .skip(desde)
        .limit(limite) */
   
    const [ total, usuarios ] = await Promise.all([
        User.count(query),
        User.find(query)
            .skip(desde)
            .limit(limite)
    ])
    res.json({

        total,
        usuarios
    }
    )

}
const postUser = async(req, res = response)=>{
    const { name, email, password, role } = req.body;
    const user = new User({name, email, password, role})

    //Encriptar contraseña
    const salt = bcrypt.genSaltSync(10)
    user.password = bcrypt.hashSync(password, salt)
    //Guardar data
    //Usamos el método save para poder guardar la data en nuestra db
    await user.save();
    res.json({
        user
    })
    console.log("Usuario creado correctamente...!")
}

const putUser = async(req = request, res = response)=>{

    const { id } = req.params;
    const {_id, password, google, email, ...resto } = req.body;
    
    if(password){
        //Encriptar contraseña
        const salt = bcrypt.genSaltSync(10)
        resto.password = bcrypt.hashSync(password, salt)
    }

    const userUpdated = await User.findByIdAndUpdate(id, resto)
    
    res.json({
        msg: 'Usuario actualizado correctamente...!!!',
        userUpdated
        
    })
}

const deleteUser = async(req, res = response)=> {
    const { id } = req.params

    const user = await User.findByIdAndUpdate(id, {status: false})

    res.json(
        user
    )
}


module.exports = {
    getUsers,
    postUser,
    putUser,
    deleteUser
}