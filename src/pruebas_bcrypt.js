const bcrypt = require('bcryptjs');
const { get } = require('mongoose');

const myPassword = "123123"

const myUser = {
    password: "123asddsas",
    hash: undefined
}
//Sync way----->

//generate a hash from a password
let salt = bcrypt.genSaltSync(10);
let hash = bcrypt.hashSync(myUser.password, salt)

//check passwords:
let isEqual = () =>{
  let result = bcrypt.compareSync(myUser.password, hash)
    console.log("Sync way equal: ", result) 
} 
isEqual()


//Async way---->

//get the hash:
const getHash = async(password) => {
    return  await bcrypt.hash(password, 9)
}

//check password:
const isEqualAsync = async(password)=> {
    return await bcrypt.compare(password, await getHash(password))
}

isEqualAsync("secreto").then((data) => (console.log("isEqual :", data)))

//estructura then/catch
const otraIdea = (pass) => bcrypt.hash(pass, 8).then((hash) =>{return bcrypt.compare(pass, hash)}).then((todoBien) =>{console.log(todoBien)}).catch((e)=>{"mira por dónde: ", console.log(e)})
otraIdea('asdasdk');

const comparar = async (password) => {
    const hash = await bcrypt.hash(password, 8)
    console.log('solution hash: ', hash);
    const isOK = await bcrypt.compare(password, hash)
    console.log('solution isOK: ', isOK);
    return isOK
}

comparar("hellothere")

