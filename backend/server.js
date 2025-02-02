import express from "express"
import cors from "cors"
import { connectDB } from "./config/db.js";
// import foodModel from "./models/foodModel.js";
import foodRouter from "./routes/foodRoute.js";
import userRouter from "./routes/userRoutes.js";
import cartRouter from "./routes/cartRoute.js";

//app config
const app=express();
const PORT=3000


//middleware
app.use(express.json());
app.use(cors())

//db connection
connectDB();

//api endpoints
app.use('/api/food',foodRouter)
app.use('/api/user',userRouter)
app.use('/api/cart',cartRouter)
app.use('/images',express.static('uploads'))

app.get("/",(req,res) => {
    res.send("API Working")
}
)

app.listen(PORT,() => {
    console.log("Server started on 3000")
}
)
// mongosh "mongodb+srv://cluster2.txypt.mongodb.net/" --apiVersion 1 --username varadlimbkar