require('dotenv').config(); // For environment variables
const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const cors = require('cors');
const path=require('path')

const User = require("./models/usersrerigister.model")
const BusExpense = require('./models/busexpenses.model');

const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })


const app = express();

const mucrl="mongodb+srv://mohan:mohan123@cluster0.1n4fd.mongodb.net/peoples?retryWrites=true&w=majority&appName=Cluster0/peoples"
mongoose.connect(mucrl).then(()=>console.log("connected to Mongo Db")).catch(()=>{console.log("Not Connected to mongo db")})
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const JWT_SECRET = process.env.JWT_SECRET || 'jwtsecretekey';

app.get("/", async(req, res) => {
    const totalData=await User.find()
    res.send(totalData)
});


app.post('/signup', async (req, res) => {
    try {
        const { username, password, role } = req.body;

        const userExists = await User.findOne({ username });
        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const user = new User(req.body);
        await user.save();
        res.status(201).json({ message: 'Signup successful', user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error during signup' });
    }
});

app.post('/login', async (req, res) => {
      var bj=await User.find()
      console.log(bj)
    try {
        const { username, password } = req.body;

        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }

        if (user.password !== password) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const payload = { id: user._id, role: user.role };
        const token = jwt.sign({ payload }, JWT_SECRET, { expiresIn: '1h' });

        res.json({ message: 'Login successful', token,user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

app.post('/adddriver',async function(req,res){
    try{
       var adddriver=req.body
       const newdriver=new BusExpense(adddriver)
       const newdriveradd= await newdriver.save()
       res.json({message:"driver added"})
    }
    catch(err){
       console.log(err)
       res.json({message:"driver not add"})
    }
})
app.get('/busexpenses', async (req, res) => {
    try { 
        const totalData=await User.find()
        const busExpenses = await BusExpense.find();
        res.json({totalData,busExpenses});
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching bus expenses' });
    }
});
app.delete('/deletedriver/:id', async(req,res)=>{
    const {id}=req.params
    try{

        const Delete= await BusExpense.findByIdAndDelete({_id:req.params.id})
        res.json({message:'delete successfully'})
    }
    catch(err){
        console.log(err)
        res.json({message:'not delete'})
    }
})
app.post("/addexpenses",async (req,res)=>{
    console.log(req.body)
    const busexp=req.body
    const busExpens= await new BusExpense(busexp)
   const newbusexpensesadd = busExpens.save()
   res.json({message:"expenses added"})
})
app.get("/getbusexpenses", async (req, res) => {
    try {
        const totalData = await User.find();
        const getbusexpenses = await BusExpense.find();
        res.json({ message: "data", totalData, getbusexpenses });
    } catch (error) {
        console.log(error)
    }
});

const PORT = process.env.PORT || 5002;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
