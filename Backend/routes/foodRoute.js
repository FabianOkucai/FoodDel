const express = require('express');
const { addFood, listFood, removeFood } = require('../controllers/foodControllers');
const multer = require('multer');
const fs = require('fs');

const foodRouter = express.Router();

// Image Storage Engine for uploading images

const storage = multer.diskStorage({

  filename: (req, file, cb) => {

    return cb(null, `${Date.now()}${file.originalname}`);
    
  },

});

const upload = multer({ storage: storage });

// Route to add food
foodRouter.post("/add", upload.single("image"), addFood);

foodRouter.get("/list",listFood)

foodRouter.post("/remove",removeFood)


module.exports = foodRouter;
// import multer from "multer"
// import fs from "fs";

// const foodRouter = express.Router();

// // Image Storage Engine
// const storage = multer.diskStorage({
//     filename:(req,file,cb)=>{
//         return cb(null, `${Date.now()}${file.originalname}`)
//     }

// })

// const upload = multer({storage:storage})

// foodRouter.post("/add",upload.single("image"),addFood);



// export default foodRouter;