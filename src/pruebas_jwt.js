const jasonwebtoken = require('jsonwebtoken')

const payload = {_id: "123"}

const secretKey = "elSuperSecreto"

const firmar = async (payload, secretKey) =>{
    const jwt = await jasonwebtoken.sign(payload, secretKey, {expiresIn: "2 days"})
    console.log(jwt);
}

const verificar = async (jwt, secret) => {
    const decoded = await jasonwebtoken.verify(jwt, secretKey)
    console.log(decoded);
}

firmar(payload, secretKey)
verificar("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiIxMjMiLCJpYXQiOjE2MDY5ODk1NjB9.NMsFSIFuWWlTtiM2KarpUFf9M0pM1El1mEtRrz7GSUk", secretKey)

<h1>hello</h1>


