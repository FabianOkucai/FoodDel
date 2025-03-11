import { insertFood, fetchAllFood, deleteFood } from "../queries/foodQueries.js"; // Import the fetchAllFood query function

// Add a new food item
export const addFood = async (req, res) => {
  const { name, description, price, category } = req.body;
  const image = req.file ? req.file.filename : null; // Handle image if uploaded

  const foodData = { name, description, price, category, image };

  try {

    const result = await insertFood(foodData); // Call the query function to insert food
    res.json({ success: true, message: "Food Added", data: result });

  } catch (error) {

    console.log(error);
    res.json({ success: false, message: "Database Error" });
     
  }

};
 
 
// Retrieve all food items

export const listFood = async (req, res) => {

  try {

    const foods = await fetchAllFood(); // Call the query function to fetch all food items
    res.json({ success: true, data: foods });

  } catch (error) {

    console.log(error);
    res.json({ success: false, message: "Error fetching food items" });

  }

};



export const removeFood = async (req,res) => {

  try{

    const { id } = req.body;
    const result = await deleteFood(id);  
    res.json({ success: true, message: "Food item removed", data: result});
  
  } catch (error) {

    res.json({ success: false, message: "Error removing food item", error:error.message});

  }
  
};


// import foodModel from "../models/foodModel.js";
// import fs from 'fs'


// // add food item 

// const addFood = async (req,res) => {
//     let image_filename = `${req.file.filename}`;

//     const food = new foodModel({
//         name:req.body.name,
//         description:req.body.description,
//         price:req.body.price,
//         category:req.body.category,
//         image:image_filename

//     })

//     try{
//         await food.save();
//         res.json({success:true,message:"Food Added"})
//     } catch (error) {
//         console.log(error)
//         res.json({success:false,message:"Error"})
//     }
// }

// export {addFood}`