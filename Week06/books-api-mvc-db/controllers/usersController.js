const User = require("../models/user.js");

const getAllUsers = async (req, res) => {
    try {
      const users = await Book.getAllUsers();
      res.json(users);
    } catch (error) {
      console.error(error);
      res.status(500).send("Error retrieving users");
    }
  };
  
  const getUserById = async (req, res) => {
    const userId = parseInt(req.params.id);
    try {
      const user = await User.getUserById(userId);
      if (!user) {
        return res.status(404).send("User not found");
      }
      res.json(user);
    } catch (error) {
      console.error(error);
      res.status(500).send("Error retrieving user");
    }
  };
  
  const createUser = async (req, res) => {
      const newUser = req.body;
      try {
        const createdUser = await User.createUser(newUser);
        res.status(201).json(createdUser);
      } catch (error) {
        console.error(error);
        res.status(500).send("Error creating User");
      }
    };
  
    const updateUser = async (req, res) => {
      const bookId = parseInt(req.params.id);
      const newUserData = req.body;
    
      try {
        const updatedUser = await User.updateUser(bookId, newUserData);
        if (!updatedBook) {
          return res.status(404).send("Usernot found");
        }
        res.json(updatedUser);
      } catch (error) {
        console.error(error);
        res.status(500).send("Error updating User");
      }
    };
    
    const deleteUser = async (req, res) => {
      const userId = parseInt(req.params.id);
    
      try {
        const success = await User.deleteUser(userId);
        if (!success) {
          return res.status(404).send("User not found");
        }
        res.status(204).send();
      } catch (error) {
        console.error(error);
        res.status(500).send("Error deleting user");
      }

    };

    async function searchUsers(req, res) {
        const searchTerm = req.query.searchTerm; // Extract search term from query params
      
        try {    
          const users = await User.searchUsers(searchTerm);
          res.json(users);
        } catch (error) {
          console.error(error);
          res.status(500).json({ message: "Error searching users" });
        }
      }
    
    module.exports = {
      getAllUsers,
      createUser,
      getUserById,
      updateUser,
      deleteUser,
      searchUsers,
    };