import express from "express";
import { addFood,listFood, removeFood} from "../controllers/foodControllers.js";  // Correct import for the controller
import multer from "multer";
import fs from "fs";

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


export default foodRouter;




// import express from "express"
// import { addFood } from "../controllers/foodControllers.js"
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