const jwt = require('jsonwebtoken');

const generarJWT = async( uid = '' )=>{
    return new Promise((resolve, reject) => {
        const payload = { uid };

        jwt.sign(payload, process.env.SECRETORPRIVITEKEY, {
            expiresIn: '4h'
        }, (error, token) =>{

            if(error){
                console.log(error)
                reject(error)
            }else{

                resolve(token)
            }
        })
    })
}


module.exports = {
    generarJWT
}