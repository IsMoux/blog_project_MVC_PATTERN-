require("dotenv").config();

const express=require("express");
const expresslayout=require("express-ejs-layouts");
const connectDB= require("./config/db");

const app = express();
const port = 3000;
connectDB();

app.use(express.static('public'));
app.use(express.urlencoded({extended:true}));
app.use(express.json())

//templating Engine:
app.use(expresslayout);


app.set('layout','./layouts/main');
app.set('view engine','ejs');

app.use('/',require('./routes/main'));

app.listen(port,
    ()=>{console.log(`app is running in ${port}`);
});
