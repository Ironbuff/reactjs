const {z} = require('zod')

const passwordSchema = z.object({
    password:z.string()
    .min(6,"Password Length must be atleast 6 letter long")
    .regex(/[a-z]/,"It must contain atleast one small character")
    .regex(/[A-Z]/,"It must contain atleast one capital letter")
    .regex(/[0-9]/,"Password must contain atleast one number")
    .regex(/[^A-Za-z0-9]/, "Password must have at least one special character")

})


module.exports=passwordSchema