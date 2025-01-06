const mysql = require('mysql2'); 

const dbConfig = {
    host: "localhost",
    user: "root",
    password: "root", 
    database: "indigov"
}

const pool = mysql.createPool(dbConfig);

// Promisify query function for async/await
const promisePool = pool.promise(); 

// Query function
const executeQuery = async (sql, params) => {
    try {
      const [rows] = await promisePool.execute(sql, params);
      return rows;
    } catch (error) {
      console.error("Database query error: ", error);
      throw error;
    }
  };
  
  // GET Constituents
  const getAllConstituents = async () => {
    const sql = "SELECT * FROM constituents"; 
    return executeQuery(sql);
  };
  

  const getConstituents = async (queryData) => {
    const { startDate, endDate } = queryData;
    const sql = "SELECT * FROM constituents WHERE createdDate < ? AND createdDate > ?"; 
    return executeQuery(sql, [startDate, endDate]);
  };

  // POST a new Constituent
  const createConstituent = async (constituentData) => {
    const { name, email, address } = constituentData;
    const sql = "INSERT INTO constituents (name, email, address) VALUES (?, ?, ?)";
    return executeQuery(sql, [name, email, address]);
  };

  // POST a new Constituent
  const updateConstituent = async (constituentData) => {
    const { name, email, address } = constituentData;
    const sql = "UPDATE constituents SET name = ?, address = ? WHERE email = ?";
    return executeQuery(sql, [name, email, address]);
  };
  
  // GET a Constituent - Input is an email 
  const getConstituentByEmail = async (email) => {
    const sql = "SELECT * FROM constituents WHERE email = ?"; 
    return executeQuery(sql, [email]);
  }

  // GET a Constituent - Input is an email 
  const getConstituentById = async (id) => {
    const sql = "SELECT * FROM constituents WHERE id = ?"; 
    return executeQuery(sql, [id]);
  }

  // DELETE a Constituent - Input is an email 
  const deleteConstituentById = async (id) => {
    const sql = "DELETE FROM constituents WHERE id = ?"; 
    return executeQuery(sql, [id]);
  }

module.exports = { getAllConstituents, getConstituentByEmail, getConstituentById, createConstituent, updateConstituent, deleteConstituentById };