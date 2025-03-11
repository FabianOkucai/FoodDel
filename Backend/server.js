import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";  // Correct import for database connection
import foodRouter from "./routes/foodRoute.js";  // Correct import for the food route

// App configuration
const app = express();
const port = 4000;

// Middleware
app.use(express.json());
app.use(cors());

// Database connection
connectDB();  // Now it's calling the function correctly

// API endpoints
app.use("/api/food", foodRouter);
app.use("/images",express.static('uploads'))

app.get("/", (req, res) => {
  res.send("API Working");
});

// Server start
app.listen(port, () => {
  
  console.log(`Server Started on http://localhost:${port}`);

});




// import express from "express"
// import cors from "cors"
// import { connectDB } from "./config/db.js"
// import foodRouter from "./routes/foodRoute.js"



// // app config
// const app = express()
// const port = 4000


// // middleware 
// app.use(express.json())
// app.use(cors())

// // db connection
// - connectDB;
// + connectDB();


// // api endpoints
// app.use("/api/food",foodRouter)

// app.get("/",(req,res)=> {
//     res.send("API Working")
// })

// app.listen(port, ()=>{
//     console.log(`Server Started on http://localhost:${port}`)
// })

