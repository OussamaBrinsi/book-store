const mongoose = require("mongoose");
const User = require("./user.model");
const path = require("path");
const envPath = path.resolve(__dirname, "../../.env");
console.log("Loading .env from:", envPath);
require("dotenv").config({ path: envPath });
console.log("DB_URL:", process.env.DB_URL);

async function ensureAdmin() {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log("Connected to MongoDB");
    const defaultUsername = "admin123";
    const defaultPassword = "admin";
    const existing = await User.findOne({
      username: defaultUsername,
      role: "admin",
    });
    if (!existing) {
      const admin = new User({
        username: defaultUsername,
        password: defaultPassword,
        role: "admin",
      });
      await admin.save();
      console.log(`Admin user created: ${defaultUsername}/${defaultPassword}`);
    } else {
      console.log("Admin user already exists.");
    }
    mongoose.disconnect();
  } catch (err) {
    console.error("Error in ensureAdmin:", err);
  }
}

ensureAdmin();
