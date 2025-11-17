// backend/seedAdmin.js
const mongoose = require("mongoose");
const User = require("./models/User");
const bcrypt = require("bcryptjs");

const MONGO = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/smartLeaveDB";

async function run() {
  await mongoose.connect(MONGO);
  const email = "admin@example.com";
  const exists = await User.findOne({ email });
  if (exists) {
    console.log("Admin already exists:", email);
    process.exit(0);
  }
  const hashed = await bcrypt.hash("admin123", 10);
  await User.create({
    name: "Admin",
    email,
    password: hashed,
    role: "admin"
  });
  console.log("Admin created:", email, "password: admin123");
  process.exit(0);
}
run().catch(e => { console.error(e); process.exit(1); });
