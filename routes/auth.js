const { Router } = require('express');
const { check } = require('express-validator');
const { postAuth, getAuth, googleSignIn, getGoogle } = require('../controllers/auth');
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

//Google routes

router.get('/google', getGoogle)
router.post('/google',[
    check('id_token', 'id_token es necesario').not().isEmpty(),
    validarCampos
], googleSignIn);


module.exports = router;