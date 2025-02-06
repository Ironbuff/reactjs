// Importing mongoose, a library used to interact with MongoDB
import mongoose from 'mongoose'; 

// Defining the structure (schema) for storing user data in the database
const UserSchema = new mongoose.Schema({
    name: { 
        type: String, // The 'name' field will store a text value (string)
        required: true // This field is required, meaning it cannot be empty
    },
    email: { 
        type: String, // The 'email' field will store a text value (string)
        required: true, // This field is required
        unique: true // The email must be unique, meaning no two users can have the same email
    },
    password: { 
        type: String, // The 'password' field will store a text value (hashed password)
        required: true // This field is required
    }
});

// Creating a 'User' model based on the schema
// This model will allow us to interact with the 'users' collection in the database
const User = mongoose.model('User', UserSchema);

// Exporting the User model so it can be used in other parts of the application
export default User; 
