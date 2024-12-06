import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/clean_energy_innovations')
  .then(() => console.log(''))
  .catch(err => console.error('MongoDB connection error:', err));

// User Schema
const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String
});

const summarySchema = new mongoose.Schema({
  name: String,
  Adoption: Number,
  Reduction: Number,
});

const reportSchema = new mongoose.Schema({
  year: Number,
  Wind: Number,
  Solar: Number,
  LEDs: Number,
  EVs: Number,
});

const User = mongoose.model('User', userSchema);
const Summary = mongoose.model('Summary', summarySchema);
const Report = mongoose.model('Report', reportSchema);

// Authentication Middleware
const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
    const user = await User.findById(decoded.userId);
    
    if (!user) {
      throw new Error();
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).send({ error: 'Please authenticate.' });
  }
};

// Auth Routes
app.post('/api/auth/signup', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 8);
    const user = new User({ name, email, password: hashedPassword });
    await user.save();
    res.status(201).send({ message: 'User created successfully' });
  } catch (error) {
    res.status(400).send(error);
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new Error('Invalid login credentials');
    }

    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '24h' }
    );

    res.send({
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email
      }
    });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

// Protected Routes
app.get('/api/summary-data', auth, async (req, res) => {
  try {
    const summaryData = await Summary.find(); // Fetch all documents
    res.json(summaryData);
  } catch (error) {
    console.error('Error fetching summary data:', error);
  }
});

app.get('/api/report-data', auth, async (req, res) => {
  try {
    const reportData = await Report.find(); // Fetch all documents
    res.json(reportData);
  } catch (error) {
    console.error('Error fetching report data:', error);
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
});