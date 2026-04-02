const mysql = require('mysql2/promise');

const dbConfig = {

  host: "localhost",
  user: "root",
  password: "2005",
  database: "fooddb",
  
};

const insertFood = async ({ name, description, price, image, category }) => {
  const query = "INSERT INTO food (name, description, price, image, category) VALUES (?, ?, ?, ?, ?)";
  const db = await mysql.createConnection(dbConfig);
  const [result] = await db.execute(query, [name, description, price, image, category]);
  return result;
};

const fetchAllFood = async () => {
  const db = await mysql.createConnection(dbConfig);
  const [foods] = await db.execute("SELECT * FROM food");
  return foods;
};

const deleteFood = async (id) => {
  const db = await mysql.createConnection(dbConfig);
  const query = "DELETE FROM food WHERE id = ?";
  const[result] = await db.execute(query, [id]);
  return result
}

module.exports = {
  insertFood,
  fetchAllFood,
  deleteFood
};