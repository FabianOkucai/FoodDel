const mysql = require('mysql2/promise');

// Function to connect to the MySQL database
const connectDB = async () => {
  try {
    const connection = await mysql.createConnection({
      host: "localhost",       // Replace with your MySQL host if it's different
      user: "root",            // Replace with your MySQL username
      password: "2005",        // Replace with your MySQL password
      database: "fooddb",      // Replace with your MySQL database name
    });

    console.log("MySQL Database connected successfully");
    return connection;
  } catch (error) {
    console.error("Error connecting to MySQL Database:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;

// export const connectDB = async () => {
//     await mongoose.connect('mongodb+srv://greatstack:2005@cluster0.2sr11.mongodb.net/food-del').then(()=>console.log("DB Connected"));
// }



