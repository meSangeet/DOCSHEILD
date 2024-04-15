const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const cors = require("cors"); // Add this line
const app = express();

app.use(cors()); // Add this line
app.use(express.json());
require("dotenv").config();


//importing files
const Teacher = require('./models/teachers');

app.use(express.json());
require("dotenv").config();

const uri = process.env.URI.replace("<password>", process.env.PASSWORD);

mongoose.connect(uri).then(() => {
  console.log(`connected to the database`);
});

const adminPassword = "admin_password";

app.post('/admin/add-teacher', async (req, res) => {
    const { email, password, digitalCertificate } = req.body;
  
    try {
  
      const newTeacher = new Teacher({
        email,
        password,
        digitalCertificate
      });
      await newTeacher.save();
  
      res.status(201).json({ message: 'Teacher added successfully' });
    } catch (error) {
      console.error('Error adding teacher:', error);
      res.status(500).send('Internal Server Error');
    }
  });

app.post('/admin/login', async (req, res) => {
    const { password } = req.body;
  
    try {
      const isPasswordValid = (password == adminPassword)
      if (!isPasswordValid) {
        return res.status(401).json({ message: "Unsuccessful admin login" });
      }
      return res.status(200).json({ message: "Successful admin login" });
    } catch (error) {
      console.error('Error logging in admin:', error);
      return res.status(500).send('Internal Server Error');
    }
  });
  

app.get('/admin/login', async (req, res) => {
    res.json({
        "msg":"hi"
    })
})

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
