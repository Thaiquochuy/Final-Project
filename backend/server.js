import express from "express"
import cors from "cors"
import { DBconnect } from "./config/db.js"
import foodRouter from "./routes/FoodRoute.js"
import 'dotenv/config'
import userRouter from "./routes/userRoute.js"
import cartRouter from "./routes/cartRoute.js"
import orderRouter from "./routes/orderRoute.js"


//app config
const app = express()
const port = 4000

// middleware
app.use(express.json())
app.use(cors())

//DB COnnection
DBconnect();


//API EPs
app.use("/api/food",foodRouter)
app.use("/images",express.static('uploads'))
app.use("/api/user",userRouter)
app.use("/api/cart",cartRouter)
app.use("/api/order",orderRouter)

app.get("/",(req,res)=>{
    res.send("API Working")
})

app.listen(port,()=>{
    console.log(`Server Started on http://localhost:${port}`)
})



//Đường dẫn
//mongodb+srv://tam:215052015@cluster0.yhdgb.mongodb.net/?


//TEST THỬ
