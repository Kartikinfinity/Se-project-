const mongoose = require("mongoose");
const User = require("./models/User");
const bcrypt = require("bcryptjs");

mongoose.connect("mongodb://127.0.0.1:27017/smartLeaveDB");

const teachers = [
  { name: "pawan kumar ", email: "pawan@college.com", password: "pawan123" },
  { name: "kranti kumar ", email: "kranti@college.com", password: "kranti123" },
  { name: "ashish sharma", email: "ashish@college.com", password: "ashish123" }
];

async function seed() {
  for (let t of teachers) {
    const exists = await User.findOne({ email: t.email });
    if (exists) {
      console.log("Already exists:", t.email);
      continue;
    }
    const hashed = await bcrypt.hash(t.password, 10);
    await User.create({
      name: t.name,
      email: t.email,
      password: hashed,
      role: "teacher"
    });
    console.log("Added:", t.email);
  }
  process.exit();
}

seed();
