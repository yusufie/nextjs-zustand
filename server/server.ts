const express = require('express');
const app = express();
const mongoose = require('mongoose');

app.use(express.json());

// Import the yourAuthenticationLogic function from auth.js
const { MongoClient } = require("mongodb");

async function yourAuthenticationLogic(credentials) {
  const { email, password } = credentials;

  try {
    // Connect to the MongoDB database
    const client = new MongoClient("mongodb://127.0.0.1:27017", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    await client.connect();

    // Access the "usersdata" collection
    const db = client.db("usersdata");
    const usersCollection = db.collection("users");

    // Find the user based on the provided email
    const user = await usersCollection.findOne({ email });

    // Close the database connection
    client.close();

    // Check if the user exists and the password is correct
    if (user && user.password === password) {
      // Return the user object if authentication is successful
      return user;
    } else {
      // If authentication fails, throw an error or return null
      throw new Error("Invalid email or password");
    }
  } catch (error) {
    // Handle any errors that occur during authentication
    throw new Error("Authentication failed");
  }
}

// const User = require('/models/User');
const userSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  age: { type: Number, required: true },
  password: { type: String, required: true },
  role: { type: String, default: 'Admin' },
  status: { type: String, default: 'active' },
});

const User = mongoose.model('User', userSchema);

// Create a new user
app.post('/api/users', async (req, res) => {
  try {
    const { fullName, email, phone, age, password } = req.body;

        // Format the phone number by inserting dashes
        const formattedPhone = phone.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');

    const newUser = new User({ fullName, email, phone: formattedPhone, age, password });
    await newUser.save();

    res.json(newUser);
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Login endpoint
app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Call yourAuthenticationLogic function to handle authentication
    const user = await yourAuthenticationLogic({ email, password });


    // Check if the user exists in the database
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Check if the password matches
    if (password !== user.password) {
      return res.status(401).json({ error: 'Invalid password' });
    }

    // User login successful
    res.status(200).json({ message: 'User login successful' });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get all users
app.get('/api/users', async (req, res) => {
  try {
    const searchQuery = req.query.fullName || ""; // Get the fullName query parameter or use an empty string if not provided

    const users = await User.find({
      fullName: { $regex: searchQuery, $options: 'i' } // Perform a case-insensitive search using $regex
    });

    res.json(users);
  } catch (error) {
    console.error('Error getting users:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get a user by ID
app.get('/api/users/:id', async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    console.error('Error getting user:', error);
    res.status(500).json({ error: 'Server error' });
  }
});


// Update a user by ID
app.put('/api/users/:id', async (req, res) => {
  try {
    const userId = req.params.id;
    const updatedUser = req.body;

    const user = await User.findByIdAndUpdate(userId, updatedUser, { new: true });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ error: 'Server error' });
  }
});


// Delete a user by ID
app.delete('/api/users/:id', async (req, res) => {
  try {
    const userId = req.params.id;

    const user = await User.findByIdAndDelete(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ error: 'Server error' });
  }
});



mongoose.connect('mongodb://127.0.0.1:27017/usersdata', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Connected to MongoDB');
})
.catch((error) => {
  console.error('Error connecting to MongoDB:', error);
});


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
