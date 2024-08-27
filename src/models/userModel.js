import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please provide a username"],
        unique: true
    },
    fullName: {
        type: String,
        required: true
    },
    bio:{
        type: String,
    },
    location:{
        type: String,
    },
    email: {
        type: String,
        required: [true, "Please provide an email"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "Please provide a password"],
    },
    profilePicUrl: {
        type: String, // URL for the profile picture (e.g., from Cloudinary)
        default: '' // Default value if the user doesn't upload a profile picture
    },
    thumbnailUrl: {
        type: String, // URL for the thumbnail image, can be generated during image processing
        default: ''
    },
    links: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Link' 
    }],
}, { timestamps: true });

// Use mongoose.models to prevent re-compiling the model
const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
