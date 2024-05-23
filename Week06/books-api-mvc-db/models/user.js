const dbConfig = require("../dbConfig");
const sql = require('mssql');

class User {
    constructor(id, username, email) {
      this.id = id;
      this.username = username;
      this.email = email;
    }

    static async getAllUsers() {
        const connection = await sql.connect(dbConfig);
    
        const sqlQuery = `SELECT * FROM Users`; // Replace with your actual table name
    
        const request = connection.request();
        const result = await request.query(sqlQuery);
    
        connection.close();
    
        return result.recordset.map(
          (row) => new User(row.id, row.username, row.email)
        ); // Convert rows to User objects
      }
    
      static async getUserById(id) {
        const connection = await sql.connect(dbConfig);
    
        const sqlQuery = `SELECT * FROM User WHERE id = @id`; // Parameterized query
    
        const request = connection.request();
        request.input("id", id);
        const result = await request.query(sqlQuery);
      
  
        connection.close();
    
        return result.recordset[0]
          ? new Book(
              result.recordset[0].id,
              result.recordset[0].username,
              result.recordset[0].email
            )
          : null; // Handle user not found
      }
      static async createBook(newBookData) {
          const connection = await sql.connect(dbConfig);
      
          const sqlQuery = `INSERT INTO Users (username, email) VALUES (@username, @email); SELECT SCOPE_IDENTITY() AS id;`; // Retrieve ID of inserted record
      
          const request = connection.request();
          request.input("username", newBookData.username);
          request.input("email", newBookData.email);
      
          const result = await request.query(sqlQuery);
      
          connection.close();
      
          // Retrieve the newly created book using its ID
          return this.getUserById(result.recordset[0].id);
        }
  
        static async updateUser(id, newBookData) {
          const connection = await sql.connect(dbConfig);
      
          const sqlQuery = `UPDATE Users SET username = @username, email = @email WHERE id = @id`; // Parameterized query
      
          const request = connection.request();
          request.input("id", id);
          request.input("username", newBookData.useername || null); // Handle optional fields
          request.input("email", newBookData.email || null);
      
          await request.query(sqlQuery);
      
          connection.close();
      
          return this.getUserById(id); // returning the updated user data
        }
      
        static async deleteBook(id) {
          const connection = await sql.connect(dbConfig);
      
          const sqlQuery = `DELETE FROM Users WHERE id = @id`; // Parameterized query
      
          const request = connection.request();
          request.input("id", id);
          const result = await request.query(sqlQuery);
      
          connection.close();
      
          return result.rowsAffected > 0; // Indicate success based on affected rows
        }

        static async searchUsers(searchTerm) {
            const connection = await sql.connect(dbConfig);
        
            try {
              const query = `
                SELECT * FROM Users
                WHERE username LIKE '%${searchTerm}%'
                  OR email LIKE '%${searchTerm}%'
              `;
        
              const result = await connection.request().query(query);
              return result.recordset;
            } catch (error) {
              throw new Error("Error searching users"); // Or handle error differently
            } finally {
              await connection.close(); // Close connection even on errors
            }
        }
    }
  
  module.exports = User;
