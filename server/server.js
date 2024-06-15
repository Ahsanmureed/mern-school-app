import express from "express";
import dotenv from "dotenv";
import bodyParser from 'body-parser';
import multer from "multer";
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import path from "path";
import fs from "fs"
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
// env config
dotenv.config();
// server
const app = express();
const port = process.env.PORT;
app.listen(port, () => {
  console.log("Server is working");
});
//middlewares
import cors from "cors";
import cookieParser from "cookie-parser";
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5173"],
    methods: ["GET", "PUT", "DELETE", "POST"],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(bodyParser.json());
// DataBase Connection
import connection from "./database/dbConnection.js";
connection();

// userRoutes
import userRoutes from "./routes/userRoutes.js";
app.use("/api/v1", userRoutes);
// Attendance Routes
import AttendanceRoutes from "./routes/Attendance.js";
app.use("/api/v1/attendance",AttendanceRoutes)
// leaveRoutes
import leaveRoutes from "./routes/leaveRoutes.js";
app.use("/api/v1/leave", leaveRoutes);
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null,  file.originalname);
  },
});

const upload = multer({ storage });

// POST route to handle image upload
app.post('/api/upload', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }
  res.json({ message:"Successfully uploaded image" });
});


const fileDownloadEndpoint = (req, res) => {
  const fileName = req.params.filename;
  const filePath = path.join(__dirname, 'uploads', fileName);

  try {
    if (fs.existsSync(filePath)) {
      res.sendFile(filePath);
    } else {
      res.status(404).send('File not found.');
    }
  } catch (error) {
    console.error('Error downloading file:', error);
    res.status(500).send('Internal server');
  }
};

app.get('/download/:filename', fileDownloadEndpoint);        

