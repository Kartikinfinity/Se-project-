const mongoose = require("mongoose");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const connectDB = require("../config/db");

const teachers = [
  { name: "Dr. Kranti Kumar Dewangan", email: "drkrantikumardewangan@amity.edu", password: "drkrantikumardewangan123", department: "CSE" },
  { name: "Dr. Munna Dan", email: "drmunnadan@amity.edu", password: "drmunnadan123", department: "CSE" },
  { name: "Dr. Jyoti Singh", email: "drjyotisingh@amity.edu", password: "drjyotisingh123", department: "CSE" },
  { name: "Dr. Shrikumar Panda", email: "drshrikumarpanda@amity.edu", password: "drshrikumarpanda123", department: "CSE" },
  { name: "Ashish Sharma", email: "ashishsharma@amity.edu", password: "ashishsharma123", department: "CSE" },
  { name: "Dr. Pawan Kumar", email: "drpawankumar@amity.edu", password: "drpawankumar123", department: "CSE" },
  { name: "Dr. Pratichi Tiwari", email: "drpratichitiwari@amity.edu", password: "drpratichitiwari123", department: "CSE" },
  { name: "Dr. Mohaminul Islam", email: "drmohaminulislam@amity.edu", password: "drmohaminulislam123", department: "CSE" },
  { name: "Disha Mondal", email: "dishamondal@amity.edu", password: "dishamondal123", department: "CSE" }
];

async function seed() {
  await connectDB();
  try {
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
      role: "teacher",
      department: t.department
    });
      console.log("Added:", t.email);
    }
    console.log("Seeding done");
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

seed();
