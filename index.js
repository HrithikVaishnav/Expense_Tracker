const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoute');
const expenseRoute = require('./routes/expenseRoute');
const categoryRoute = require('./routes/categoryRoute');
require('dotenv').config();
const cors = require('cors');

require("./models/User");
require("./models/Category");
require("./models/Expense");

const requireAuth = require('./middleware/requireAuth');

const app = express();
app.use(
    cors({
        origin: "http://localhost:3000",
    })
)
app.use(bodyParser.json());
//app.use(authRoutes);
//app.use(expenseRoute);
//app.use(categoryRoute);

const URI = process.env.URI;

mongoose.connect(URI, {
    useNewUrlParser : true,
    useUnifiedTopology:true
});

mongoose.connection.on('connected',()=> {
    console.log("Connected with database");
});

mongoose.connection.on('error',(err)=> {
    console.error('Error occured',err);
});

app.use('/', authRoutes);

//app.get('/',requireAuth,(req,res) => {
//    res.send(`Your Email ${req.user.email}`);
//});

app.use('/Category/', categoryRoute);

app.use('/Category/Expense/', expenseRoute);

//app.get('/Category/Expense/', requireAuth,(req,res) => {
//    res.send(`Your Email ${req.user.email}`);
//});


app.listen(8000,()=>{
    console.log("server running on port 8000");
})

