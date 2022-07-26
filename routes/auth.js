const { Router } = require('express');
const { check } = require('express-validator');
const { postAuth, getAuth } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');
const { roleValidation, emailValidation, existeUserById } = require('../helpers/db-validators');

const User = require('../models/users')
const router = Router();

router.get('/', getAuth)


router.post('/login',[
    check('email', 'El correo es obligatorio').isEmail(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    validarCampos
], postAuth);


module.exports = router;