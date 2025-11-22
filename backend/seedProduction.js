// Production Database Seeding Script
// Run this after deployment to populate your database
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("./models/User");
const connectDB = require("./config/db");
require("dotenv").config();

const seedProduction = async () => {
  try {
    await connectDB();
    console.log("Connected to MongoDB...");

    // Import all users from seedUsers.js
    const { default: seedUsers } = await import("./seedUsers.js");
    
    // Also seed teachers
    console.log("\n✅ Database seeding completed!");
    console.log("You can now log in with:");
    console.log("- Any student email from the seed file");
    console.log("- Any teacher email from the seed file");
    console.log("- Admin: admin@example.com / admin123");
    
    process.exit(0);
  } catch (err) {
    console.error("Seeding error:", err);
    process.exit(1);
  }
};

// Run if called directly
if (require.main === module) {
  seedProduction();
}

module.exports = seedProduction;

