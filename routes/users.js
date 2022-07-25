const { Router } = require('express');
const { check } = require('express-validator');
const {
     getUsers,
     postUser,
     putUser,
     deleteUser } = require('../controllers/users.controller');
const { validarCampos } = require('../middlewares/validar-campos');
const { roleValidation, emailValidation, existeUserById } = require('../helpers/db-validators');


const router = Router();

router.get('/', getUsers);

router.post('/',[
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'La contraseña debe contener minimo 6 caracteres').isLength({min:6}),
    //check('email', 'El correo no es válido').isEmail(),
    check('email').custom(emailValidation),
    //check('role', 'El role no es válido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    check('role').custom(roleValidation),
    validarCampos
], postUser);

router.put('/:id',[
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeUserById),
    check('role').custom(roleValidation),
    validarCampos
], putUser)

router.delete('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeUserById),
    validarCampos
], deleteUser)

module.exports = router;