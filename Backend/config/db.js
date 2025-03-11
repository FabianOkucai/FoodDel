import mysql from "mysql2/promise";  // Import mysql2 library for MySQL connection

// Function to connect to the MySQL database
export const connectDB = async () => {
  try {
    const connection = await mysql.createConnection({
      host: "localhost",       // Replace with your MySQL host if it's different
      user: "root",            // Replace with your MySQL username
      password: "2005",        // Replace with your MySQL password
      database: "fooddb",      // Replace with your MySQL database name
    });

    console.log("MySQL Database connected successfully");
    return connection;  // Return the connection object for later use
  } catch (error) {
    console.error("Error connecting to MySQL Database:", error.message);
    process.exit(1);  // Exit the process if the connection fails
  }
  
};



// import mongoose from "mongoose";

// export const connectDB = async () => {
//     await mongoose.connect('mongodb+srv://greatstack:2005@cluster0.2sr11.mongodb.net/food-del').then(()=>console.log("DB Connected"));
// }



