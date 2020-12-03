const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        unique: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid')
            }
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 7,
        trim: true,
        validate(value) {
            if (value.toLowerCase().includes('password')) {
                throw new Error('Password cannot contain "password"')
            }
        }
    },
    age: {
        type: Number,
        default: 0,
        validate(value) {
            if (value < 0) {
                throw new Error('Age must be a positive number')
            }
        }
    }
})


//pre - especificar el codigo que hay que ejecutar previamente a guardar usamos function porque necesitamos el this.
userSchema.pre('save', async function(next){
    const user = this
    if(user.isModified('password')){
        //cuando se modiifca el pass hacemos nuevo hash
        user.password = await bcrypt.hash(user.password, 8)
    }
})

const User = mongoose.model('User', userSchema)
module.exports = User