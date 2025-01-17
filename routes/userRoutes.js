var express=require('express')

const router=express.Router()

router.get("/admin",function(req,res){
    res.json({message:'welcome to admin'})
})
router.get("/manager",function(req,res){
    res.json({message:'welcome to admin'})
})
router.get("/user",function(req,res){
    res.json({message:'welcome to admin'})
})
module.exports=router