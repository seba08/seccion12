const { Router } = require('express');
const router = Router();
const fs = require('fs')

const PATH_ROUTES = __dirname;

//Cargar rutas dinamicas

const removeExt = (filename) =>{
    return filename.split('.').shift();
}

fs.readdirSync(PATH_ROUTES).filter(file=>{
    const name = removeExt(file);

    if(name !== 'index'){
        router.use(`/${name}`, require(`./${file}`));
    }
})

module.exports = router;