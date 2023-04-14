const express=require('express');
const hbs=require('express-handlebars');
var app=express();
const{allowInsecurePrototypeAccess}=require('@handlebars/allow-prototype-access');
const Handelbars=require('handlebars');
const nhanvienRoutes=require('./routes/NhanVienRoutes')
const mongoose=require('mongoose');
const cors=require('cors');

const uri="mongodb+srv://traz08102003:vrRJOA6nqwODzFmz@cp17303.4gzmzyt.mongodb.net/Cp17303?retryWrites=true&w=majority";

mongoose.connect(uri,{
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(console.log("kết nối thành công"));

app.engine(".hbs",hbs.engine({
    extname:"hbs",
    defaultLayout:false,
    layoutsDir:"views/layouts/",
    handlebars:allowInsecurePrototypeAccess(Handelbars)
}));

app.set("view engine",".hbs");
app.set("views","./views");

app.use('/',nhanvienRoutes);
// app.use(cors());
// app.use(bodyParser.json());
app.listen(8080,()=>
console.log("Server is running on port 8080...")
);


