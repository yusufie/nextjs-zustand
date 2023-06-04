export {};

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

module.exports = yourAuthenticationLogic;

