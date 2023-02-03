const express = require("express");
const app= express();
const mongoose = require("mongoose")
const dotenv = require("dotenv");
const userRoute= require("./routes/user.js")
const authRoute = require("./routes/auth.js")
const cartRoute = require("./routes/cart.js")
const orderRoute = require("./routes/order.js")
const productRoute = require("./routes/product.js")

dotenv.config();

mongoose
.connect(process.env.MONGO)
.then( ()=>console.log("DB connection sucess"))
.catch((err)=>{console.log(err)}
)

app.use(express.json());
app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/products" , productRoute);
app.use("/api/carts" , cartRoute);
app.use("/api/orders" , orderRoute);

app.listen(5000, ()=>{
    console.log("Backed Serve Running")
});