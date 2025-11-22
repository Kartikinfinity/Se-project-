const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("./models/User");
const connectDB = require("./config/db");

const seed = async () => {
  await connectDB();
  try {
    const users = [
      // Students from Image 1
      { name: "Riya Thakur", email: "riyathakur@amity.edu", password: "riyathakur123", role: "student", className: "CSE-2" },
      { name: "Aman Dubey", email: "amandubey@amity.edu", password: "amandubey123", role: "student", className: "CSE-2" },
      { name: "Manan Chauhan", email: "mananchauhan@amity.edu", password: "mananchauhan123", role: "student", className: "CSE-2" },
      { name: "Paras Motwani", email: "parasmotwani@amity.edu", password: "parasmotwani123", role: "student", className: "CSE-2" },
      { name: "Kunal Sahu", email: "kunalsahu@amity.edu", password: "kunalsahu123", role: "student", className: "CSE-2" },
      { name: "Sai Rishikesh", email: "sairishikesh@amity.edu", password: "sairishikesh123", role: "student", className: "CSE-2" },
      { name: "Rutparnna Ku. Sahu", email: "rutparnnakusahu@amity.edu", password: "rutparnnakusahu123", role: "student", className: "CSE-2" },
      { name: "Yoganshu Shori", email: "yoganshushori@amity.edu", password: "yoganshushori123", role: "student", className: "CSE-2" },
      { name: "Raghunath Burudi", email: "raghunathburudi@amity.edu", password: "raghunathburudi123", role: "student", className: "CSE-2" },
      { name: "Harshita Verma", email: "harshitaverma@amity.edu", password: "harshitaverma123", role: "student", className: "CSE-2" },
      { name: "Lakhinana Nishita", email: "lakhinananishita@amity.edu", password: "lakhinananishita123", role: "student", className: "CSE-2" },
      { name: "Shirish Kumar Jaiswal", email: "shirishkumarjaiswal@amity.edu", password: "shirishkumarjaiswal123", role: "student", className: "CSE-2" },
      { name: "Chatti Kirti Yadav", email: "chattikirtiyadav@amity.edu", password: "chattikirtiyadav123", role: "student", className: "CSE-2" },
      { name: "Aglave Yogeshwari Rajendra", email: "aglaveyogeshwarirajendra@amity.edu", password: "aglaveyogeshwarirajendra123", role: "student", className: "CSE-2" },
      { name: "Himanchal Sahu", email: "himanchalsahu@amity.edu", password: "himanchalsahu123", role: "student", className: "CSE-2" },
      { name: "Amol Gupta", email: "amolgupta@amity.edu", password: "amolgupta123", role: "student", className: "CSE-2" },
      { name: "Sakina Ali", email: "sakinaali@amity.edu", password: "sakinaali123", role: "student", className: "CSE-2" },
      { name: "Sarwang Sinha", email: "sarwangsinha@amity.edu", password: "sarwangsinha123", role: "student", className: "CSE-2" },
      { name: "Anukriti Soni", email: "anukritisoni@amity.edu", password: "anukritisoni123", role: "student", className: "CSE-2" },
      { name: "Sriansh sahu", email: "srianshsahu@amity.edu", password: "srianshsahu123", role: "student", className: "CSE-2" },
      { name: "Ajit Sidar", email: "ajitsidar@amity.edu", password: "ajitsidar123", role: "student", className: "CSE-2" },
      { name: "Ujjwal Singh", email: "ujjwalsingh@amity.edu", password: "ujjwalsingh123", role: "student", className: "CSE-2" },
      { name: "Shraddha Dansena", email: "shraddhadansena@amity.edu", password: "shraddhadansena123", role: "student", className: "CSE-2" },
      { name: "Priyansh Singh", email: "priyanshsingh@amity.edu", password: "priyanshsingh123", role: "student", className: "CSE-2" },
      
      // Students from Image 2
      { name: "Shailesh Verma", email: "shaileshverma@amity.edu", password: "shaileshverma123", role: "student", className: "CSE-2" },
      { name: "Madhudeep Singh", email: "madhudeepsingh@amity.edu", password: "madhudeepsingh123", role: "student", className: "CSE-2" },
      { name: "Anjali Bisht", email: "anjalibisht@amity.edu", password: "anjalibisht123", role: "student", className: "CSE-2" },
      { name: "Avant Tembhare", email: "avanttembhare@amity.edu", password: "avanttembhare123", role: "student", className: "CSE-2" },
      { name: "Ankit Agarwal", email: "ankitagarwal@amity.edu", password: "ankitagarwal123", role: "student", className: "CSE-2" },
      { name: "Rohan Sahu", email: "rohansahu@amity.edu", password: "rohansahu123", role: "student", className: "CSE-2" },
      { name: "Vijay Kumar", email: "vijaykumar@amity.edu", password: "vijaykumar123", role: "student", className: "CSE-2" },
      { name: "Bikash Bardhan", email: "bikashbardhan@amity.edu", password: "bikashbardhan123", role: "student", className: "CSE-2" },
      { name: "Aditya Pundir", email: "adityapundir@amity.edu", password: "adityapundir123", role: "student", className: "CSE-2" },
      { name: "Krish Kesharwani", email: "krishkesharwani@amity.edu", password: "krishkesharwani123", role: "student", className: "CSE-2" },
      { name: "Gaurav Sahu", email: "gauravsahu@amity.edu", password: "gauravsahu123", role: "student", className: "CSE-2" },
      { name: "Surya Ashok", email: "suryaashok@amity.edu", password: "suryaashok123", role: "student", className: "CSE-2" },
      { name: "Rahul Sharma", email: "rahulsharma@amity.edu", password: "rahulsharma123", role: "student", className: "CSE-2" },
      { name: "Deepjyoti Saha", email: "deepjyotisaha@amity.edu", password: "deepjyotisaha123", role: "student", className: "CSE-2" },
      { name: "Shilpa Vishwakarma", email: "shilpavishwakarma@amity.edu", password: "shilpavishwakarma123", role: "student", className: "CSE-2" },
      { name: "Priyanshu Pandey", email: "priyanshupandey@amity.edu", password: "priyanshupandey123", role: "student", className: "CSE-2" },
      { name: "Srijan Guhathakurta", email: "srijanguhathakurta@amity.edu", password: "srijanguhathakurta123", role: "student", className: "CSE-2" },
      { name: "Abhay Pandey", email: "abhaypandey@amity.edu", password: "abhaypandey123", role: "student", className: "CSE-2" },
      { name: "Pratiksha Waghmare", email: "pratikshawaghmare@amity.edu", password: "pratikshawaghmare123", role: "student", className: "CSE-2" },
      { name: "Sakshi Bhatt", email: "sakshibhatt@amity.edu", password: "sakshibhatt123", role: "student", className: "CSE-2" },
      { name: "Kshitij Puri Goswami", email: "kshitijpurigoswami@amity.edu", password: "kshitijpurigoswami123", role: "student", className: "CSE-2" },
      { name: "Rahul Pradhan", email: "rahulpradhan@amity.edu", password: "rahulpradhan123", role: "student", className: "CSE-2" },
      { name: "Siddheshwari Sahu", email: "siddheshwarisahu@amity.edu", password: "siddheshwarisahu123", role: "student", className: "CSE-2" },
      { name: "Vipin Bihari Jaiswal", email: "vipinbiharijaiswal@amity.edu", password: "vipinbiharijaiswal123", role: "student", className: "CSE-2" },
      
      // Students from Image 3
      { name: "Keshav Thakur", email: "keshavthakur@amity.edu", password: "keshavthakur123", role: "student", className: "CSE-2" },
      { name: "Aayush Valmiki", email: "aayushvalmiki@amity.edu", password: "aayushvalmiki123", role: "student", className: "CSE-2" },
      { name: "Hina Sahu", email: "hinasahu@amity.edu", password: "hinasahu123", role: "student", className: "CSE-2" },
      { name: "Archana Nagarwal", email: "archananagarwal@amity.edu", password: "archananagarwal123", role: "student", className: "CSE-2" },
      { name: "Akshat Singh Arora", email: "akshatsingharora@amity.edu", password: "akshatsingharora123", role: "student", className: "CSE-2" },
      { name: "Vedant Chaudhary", email: "vedantchaudhary@amity.edu", password: "vedantchaudhary123", role: "student", className: "CSE-2" },
      { name: "Saurabh Shriwastava", email: "saurabhshriwastava@amity.edu", password: "saurabhshriwastava123", role: "student", className: "CSE-2" },
      { name: "Heemanshu Harpal", email: "heemanshuharpal@amity.edu", password: "heemanshuharpal123", role: "student", className: "CSE-2" },
      { name: "Yashveer Singh", email: "yashveersingh@amity.edu", password: "yashveersingh123", role: "student", className: "CSE-2" },
      { name: "Jaianjan", email: "jaianjan@amity.edu", password: "jaianjan123", role: "student", className: "CSE-2" },
      { name: "Harshwardhan Shukla", email: "harshwardhanshukla@amity.edu", password: "harshwardhanshukla123", role: "student", className: "CSE-2" },
      { name: "Gaurav sahu", email: "gauravsahu@amity.edu", password: "gauravsahu123", role: "student", className: "CSE-2" },
      { name: "Arya Das", email: "aryadas@amity.edu", password: "aryadas123", role: "student", className: "CSE-2" },
      
      // Students from Image 4 (24 students)
      { name: "Manisha Biswal", email: "manishabiswal@amity.edu", password: "manishabiswal123", role: "student", className: "CSE-2" },
      { name: "Sashibhusan Mishra", email: "sashibhusanmishra@amity.edu", password: "sashibhusanmishra123", role: "student", className: "CSE-2" },
      { name: "Neha Biswal", email: "nehabiswal@amity.edu", password: "nehabiswal123", role: "student", className: "CSE-2" },
      { name: "Gourav Kumar Behera", email: "gouravkumarbehera@amity.edu", password: "gouravkumarbehera123", role: "student", className: "CSE-2" },
      { name: "Subham Swastik Sahu", email: "subhamswastiksahu@amity.edu", password: "subhamswastiksahu123", role: "student", className: "CSE-2" },
      { name: "Kartik Shreekumar", email: "kartikshreekumar@amity.edu", password: "kartikshreekumar123", role: "student", className: "CSE-2" },
      { name: "P. Mohan", email: "pmohan@amity.edu", password: "pmohan123", role: "student", className: "CSE-2" },
      { name: "Poonam Kumari", email: "poonamkumari@amity.edu", password: "poonamkumari123", role: "student", className: "CSE-2" },
      { name: "Kavya Sadasivan", email: "kavyasadasivan@amity.edu", password: "kavyasadasivan123", role: "student", className: "CSE-2" },
      { name: "Ayush Yadav", email: "ayushyadav@amity.edu", password: "ayushyadav123", role: "student", className: "CSE-2" },
      { name: "Yuti Sasane", email: "yutisasane@amity.edu", password: "yutisasane123", role: "student", className: "CSE-2" },
      { name: "N. Harsha Vardhan", email: "nharshavardhan@amity.edu", password: "nharshavardhan123", role: "student", className: "CSE-2" },
      { name: "Sai Raj Gahir", email: "sairajgahir@amity.edu", password: "sairajgahir123", role: "student", className: "CSE-2" },
      { name: "Nibedita Patel", email: "nibeditapatel@amity.edu", password: "nibeditapatel123", role: "student", className: "CSE-2" },
      { name: "Akshita Mahanti", email: "akshitamahanti@amity.edu", password: "akshitamahanti123", role: "student", className: "CSE-2" },
      { name: "Piyush Kumar Pandey", email: "piyushkumarpandey@amity.edu", password: "piyushkumarpandey123", role: "student", className: "CSE-2" },
      { name: "Bhaabani Sankar Biswal", email: "bhaabanisankarbiswal@amity.edu", password: "bhaabanisankarbiswal123", role: "student", className: "CSE-2" },
      { name: "Avneesh Kumar Jha", email: "avneeshkumarjha@amity.edu", password: "avneeshkumarjha123", role: "student", className: "CSE-2" },
      { name: "Dinesh Sagar", email: "dineshsagar@amity.edu", password: "dineshsagar123", role: "student", className: "CSE-2" },
      { name: "Jay Upadhyay", email: "jayupadhyay@amity.edu", password: "jayupadhyay123", role: "student", className: "CSE-2" },
      { name: "Priyanshu Panda", email: "priyanshupanda@amity.edu", password: "priyanshupanda123", role: "student", className: "CSE-2" },
      { name: "Naman Kumar", email: "namankumar@amity.edu", password: "namankumar123", role: "student", className: "CSE-2" },
      { name: "Kartik Prajapati", email: "kartikprajapati@amity.edu", password: "kartikprajapati123", role: "student", className: "CSE-2" },
      { name: "Atharv Pratap Singh", email: "atharvpratapsingh@amity.edu", password: "atharvpratapsingh123", role: "student", className: "CSE-2" },
      
      // Students from Image 5 (25 students)
      { name: "Shashwat Steel Babar", email: "shashwatsteelbabar@amity.edu", password: "shashwatsteelbabar123", role: "student", className: "CSE-2" },
      { name: "Sophia S Mathai", email: "sophiasmathai@amity.edu", password: "sophiasmathai123", role: "student", className: "CSE-2" },
      { name: "Harsh Vardhan Majji", email: "harshvardhanmajji@amity.edu", password: "harshvardhanmajji123", role: "student", className: "CSE-2" },
      { name: "Ayush Yadu", email: "ayushyadu@amity.edu", password: "ayushyadu123", role: "student", className: "CSE-2" },
      { name: "Krishna Sharma", email: "krishnasharma@amity.edu", password: "krishnasharma123", role: "student", className: "CSE-2" },
      { name: "Yogesh Wathe", email: "yogeshwathe@amity.edu", password: "yogeshwathe123", role: "student", className: "CSE-2" },
      { name: "Richa Sharma", email: "richasharma@amity.edu", password: "richasharma123", role: "student", className: "CSE-2" },
      { name: "Harsh Singh", email: "harshsingh@amity.edu", password: "harshsingh123", role: "student", className: "CSE-2" },
      { name: "Shivam Srivastava", email: "shivamsrivastava@amity.edu", password: "shivamsrivastava123", role: "student", className: "CSE-2" },
      { name: "M. Nipun", email: "mnipun@amity.edu", password: "mnipun123", role: "student", className: "CSE-2" },
      { name: "Nikhil Kumar Singh", email: "nikhilkumarsingh@amity.edu", password: "nikhilkumarsingh123", role: "student", className: "CSE-2" },
      { name: "Aastha Gupta", email: "aasthagupta@amity.edu", password: "aasthagupta123", role: "student", className: "CSE-2" },
      { name: "Ashwin Raj", email: "ashwinraj@amity.edu", password: "ashwinraj123", role: "student", className: "CSE-2" },
      { name: "Swarup Gandharva", email: "swarupgandharva@amity.edu", password: "swarupgandharva123", role: "student", className: "CSE-2" },
      { name: "Shreeya Tayal", email: "shreeyatayal@amity.edu", password: "shreeyatayal123", role: "student", className: "CSE-2" },
      { name: "Omkar Singh", email: "omkarsingh@amity.edu", password: "omkarsingh123", role: "student", className: "CSE-2" },
      { name: "Ankush Patel", email: "ankushpatel@amity.edu", password: "ankushpatel123", role: "student", className: "CSE-2" },
      { name: "Nikhil Yadav", email: "nikhilyadav@amity.edu", password: "nikhilyadav123", role: "student", className: "CSE-2" },
      { name: "Nitin Kumar Singh", email: "nitinkumarsingh@amity.edu", password: "nitinkumarsingh123", role: "student", className: "CSE-2" },
      { name: "Shreyansh Jaiswal", email: "shreyanshjaiswal@amity.edu", password: "shreyanshjaiswal123", role: "student", className: "CSE-2" },
      { name: "Kohana Diwan", email: "kohanadiwan@amity.edu", password: "kohanadiwan123", role: "student", className: "CSE-2" },
      { name: "Mansi Verma", email: "mansiverma@amity.edu", password: "mansiverma123", role: "student", className: "CSE-2" },
      { name: "Swapnil Gupta", email: "swapnilgupta@amity.edu", password: "swapnilgupta123", role: "student", className: "CSE-2" },
      { name: "Sarthak Dubey", email: "sarthakdubey@amity.edu", password: "sarthakdubey123", role: "student", className: "CSE-2" },
      { name: "Amit Soni", email: "amitsoni@amity.edu", password: "amitsoni123", role: "student", className: "CSE-2" },
      
      // Students from Image 6 (9 students)
      { name: "Aayush Kotwani", email: "aayushkotwani@amity.edu", password: "aayushkotwani123", role: "student", className: "CSE-2" },
      { name: "Tushar Shendey", email: "tusharshendey@amity.edu", password: "tusharshendey123", role: "student", className: "CSE-2" },
      { name: "Aditya Chourasia", email: "adityachourasia@amity.edu", password: "adityachourasia123", role: "student", className: "CSE-2" },
      { name: "Kirti Sagar", email: "kirtisagar@amity.edu", password: "kirtisagar123", role: "student", className: "CSE-2" },
      { name: "Ananya Verma", email: "ananyaverma@amity.edu", password: "ananyaverma123", role: "student", className: "CSE-2" },
      { name: "Shikhar Vishwakarma", email: "shikharvishwakarma@amity.edu", password: "shikharvishwakarma123", role: "student", className: "CSE-2" },
      { name: "Dimpal Sahu", email: "dimpalsahu@amity.edu", password: "dimpalsahu123", role: "student", className: "CSE-2" },
      { name: "Satyam Sharma", email: "satyamsharma@amity.edu", password: "satyamsharma123", role: "student", className: "CSE-2" },
      { name: "Arwindh Kesharwani", email: "arwindhkesharwani@amity.edu", password: "arwindhkesharwani123", role: "student", className: "CSE-2" },
      
      // Teacher and Admin (keeping existing)
      { name: "Teacher One", email: "teacher1@example.com", password: "teacher123", role: "teacher", department: "CSE" },
      { name: "Admin One", email: "admin@example.com", password: "admin123", role: "admin" }
    ];

    for (const u of users) {
      const exists = await User.findOne({ email: u.email });
      if (exists) {
        console.log(u.email, "already exists");
        continue;
      }
      const hashed = await bcrypt.hash(u.password, 10);
      await User.create({ ...u, password: hashed });
      console.log("Created", u.email);
    }
    console.log("Seeding done");
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seed();
