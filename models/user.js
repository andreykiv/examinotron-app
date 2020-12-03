const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jsonwebtoken = require('jsonwebtoken')

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
    },
    tokens: [
        {token: {
            type: String,
            required: true
        }}
    ]
})

userSchema.methods.generateAuthToken = async function(){
    const user = this
    const token = await jsonwebtoken.sign({_id: user._id.toString()}, 'estoessupersecreto', {expiresIn: '7 days'})
    user.tokens = user.tokens.concat({token: token})
    await user.save()
    
    return token
}

//funciones que le queremos poner a userSchema se crean con .statics (mirar docs) cuando empieza por la U mayuscula se pone en statics, sin'o en methods.
userSchema.statics.findUserByCredentials = async (email, password) =>{
    const user = await User.findOne({email: email})
    if(!user){
        throw new Error('Email or password not valid')
    } 
    const isOK = await bcrypt.compare(password, user.password)
    if(!isOK){
        throw new Error('Email or password not valid')
    }
    return user
}

//pre - especificar el codigo que hay que ejecutar previamente a guardar, en nuestro caso hacer el hash y guradarlo. Usamos function porque necesitamos el this.
userSchema.pre('save', async function(next){
    const user = this
    if(user.isModified('password')){
        //cuando se modiifca el pass hacemos nuevo hash
        user.password = await bcrypt.hash(user.password, 8)
    }
    next()
})

const User = mongoose.model('User', userSchema)
module.exports = User