var mongoose = require("mongoose")
var userrigesterSchema = mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    },
    role:{
        type:String,
        required:false,
        enum:"user",
        default:"user",
    },
})
var User = mongoose.model('bususer',userrigesterSchema)
module.exports = User