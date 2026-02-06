import express from "express"
import dotenv from "dotenv"
import path from "path"
import cors from "cors"
import {connectDB} from "./db/db.js"
import predictRoutes from "./routes/predict.route.js";
import wbjeeRoutes from "./routes/wbjee.route.js"; 





dotenv.config()

//connect to database
connectDB();

const app=express();
const PORT=process.env.port ||5000;

app.use(cors({
    origin:"http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  
}));

app.use(express.json());

app.use("/api", predictRoutes);
app.use("/api/wbjee", wbjeeRoutes);




app.get("/",(req,res)=>{
    res.send("SERVER IS ONLINE");
})

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
});

