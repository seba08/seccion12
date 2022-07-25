const { Schema, model } = require('mongoose')

const roleSchema = new Schema({
    role: {
        type: String,
        required: [true, 'El role es obligatorio']
    }
})

module.exports = model('roles', roleSchema)