import mongoose from "mongoose";

const linkSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId, // Reference to the User model
    ref: "User",
    required: true,
  },
  title: {
    type: String,
    required: true, // Title of the link
  },
  url: {
    type: String,
    required: true, // Actual URL
  },
  order: {
    type: Number, // Allows you to order the links for display purposes
    default: 0,
  },
  isVisible: {
    type: Boolean,
    default: true, // Toggle visibility of a link
  },
}, { timestamps: true });

// Use mongoose.models to prevent re-compiling the model
const Link = mongoose.models.Link || mongoose.model("Link", linkSchema);

export default Link;
