
const {userOne,admin}= require("./user.util")
const generateToken=require('../../api/utils/generateToken')

const adminAccessToken = generateToken(admin._id.toString())
const userAccessToken = generateToken(userOne._id.toString())

module.exports={userAccessToken,adminAccessToken}