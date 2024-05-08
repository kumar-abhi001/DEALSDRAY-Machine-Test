import dotenv from "dotenv";
import connectDb from "./src/db/connect.js";
import express from "express";
import Admins from "./src/models/admins.model.js";
import Employees from "./src/models/employees.model.js";
import { upload } from "./src/middleware/multer.middleware.js";
import { uploadOnCloudinary } from "./src/utils/cloudinary.js";
import fs from "fs";
import { verifyJWT } from "./src/middleware/auth.middleware.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import jwt from "jsonwebtoken";
import bodyParser from "body-parser";

dotenv.config({ path: ".env" });

const port = process.env.PORT || 3000;
const app = express();

const dbConnectionIstance = connectDb().catch((error) => console.log("Error in connect db: ", error));
app.use(express.json());
app.use(cookieParser());
app.use(cors());


app.get("/", (req, res) => {
  res.cookie("token", "abhishek")
    .json({ "Hello World!": "Welcome to Employee Management System" });
});

//admin login
app.post("/admin/login", async (req, res) => {
  const { username, password, token } = req.body;
  if (token) {
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, user) => {
      if (error) {
        return res.status(403).json({ message: "Invalid token", data: {} });
      }
      return res.status(200).json({ message: "Admin login successfully", data: user, token: token });
    });
  }
  else {
    const admin = await Admins.findOne({ username, password }).select("-password");

  if (admin) {
    const token = jwt.sign({ username, password }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "1h" });
    return res.status(200).json({ message: "Admin login successfully", data: admin, token: token });
  } else { 
    return res.status(400).json({ message: "Invalid username or password", data: {} });
  }
  }
});

//logout
app.use(verifyJWT);


//add employee
app.post("/add/employee", upload.single("image"),  async (req, res) => {
  const { name, email, phone, designation, gender, course } = req.body;

  if (!name || !email || !phone || !designation || !gender || !course) { 
    return res.status(400).json({ message: "Please fill all the fields", success: false, data: {} });
  }

  if(!req.file) {
    return res.status(400).json({ message: "Please upload file", success: false, data: {} });
  }

  if (phone.length != 10) { 
    return res.status(400).json({ message: "Phone number must be 10 digits", success: false, data: {} });
  }


  const employeeExist = await Employees.findOne({ email });
  if (employeeExist) {
    return res.status(400).json({ message: "Employee already exist", success: false, data: {} });
  }

  const localFilePath = req.file?.path;
  if (!localFilePath) {
    return res.send({ message: "Please upload file", data: {} } );
  }
  console.log(req.file?.mimetype);

  //check file type
  if (req.file.mimetype != "image/jpeg" && req.file.mimetype != "image/png") {
    fs.unlinkSync(localFilePath);
    return res.status(400).json({ message: "Only Upload jpg/png file", success: false, data: {} });
  }

  //upload file on cloudinary
  const picture = await uploadOnCloudinary(localFilePath);

  const newEmployee =  new Employees({ name, email, phone, designation, picture, gender, course });
  await newEmployee.save().then((employee) => {
    res.status(201).json({ message: "Employee added successfully", success: true, data: employee });
  }).catch((error) => console.log("Error in saving employee", error));

})
  
app.get("/employees", verifyJWT,  async (req, res) => { 
  const employees = await Employees.find();
  res.status(200).json({ message: "All employees", data: employees });
});

app.get("/employee/:id", verifyJWT, async (req, res) => { 
  const employee = await Employees.findById(req.params.id);
  if (!employee) {
    return res.status(404).json({ message: "Employee not found", data: {} });
  }
  res.status(200).json({ message: "Employee found", data: employee });
});

app.patch("/employee/:id", upload.single("image"), async (req, res) => {
  const { id, name, email, phone, designation, gender, course } = req.body;

  const employee = await Employees.findById(id);

  if (!employee) {
    return res.status(404).json({ message: "Employee not found", data: {} });
  }

  const localFilePath = req.file?.path;
  const picture = await uploadOnCloudinary(localFilePath);

  const updatedEmployee = await Employees.findByIdAndUpdate({ _id: id },
    { name, email, phone, designation, gender, course })
  
  if (!updatedEmployee) { 
    return res.status(400).json({ status: 400, message: "Error in updating employee", data: {} });
  }

  fs.unlink(localFilePath, (error) => {
    if (error) {
      console.log("Error in deleting file", error);
    }
  }); 

  res.status(200).json({ status: 200, message: "Employee updated successfully", data: updatedEmployee });
});

app.delete("/employee/:id", async (req, res) => {
  const employee = await Employees.findByIdAndDelete(req.params.id);
  if (!employee) {
    return res.status(404).json({ message: "Employee not found", data: {} });
  }
  res.status(200).json({ status: 200, message: "Employee deleted successfully", data: employee });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});