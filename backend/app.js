import express from "express";
import dotenv from "dotenv";
// connets frontend to backend
import cors from "cors";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import applicationRouter from "./routes/applicationRouter.js"
import userRouter from "./routes/userRouter.js"
import projectRouter from "./routes/projectRouter.js"
import { connectDB } from "./database/dbConnection.js"; 
import { errorMiddleware} from "./middlewares/error.js"

const app=express();
//connection of env file 
dotenv.config({path:'./config/config.env'});

import cors from "cors";

const allowedOrigins = [
  "https://innovate-hub.onrender.com",
  "https://innovate-hub-frontend.onrender.com"
];

  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true, // Allow cookies and authorization headers
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  allowedHeaders: "Origin, X-Requested-With, Content-Type, Accept, Authorization"
}));

 // Preflight requests

app.use(cookieParser());
//aprse only json data neglect other
app.use(express.json());
//converts string into json foramt
app.use(express.urlencoded({extended:true}));
//u cazn use multer 
app.use(fileUpload({
    useTempFiles:true,
    tempFileDir:"/tmp/",
}));

app.use("/api/v1/user",userRouter);
app.use("/api/v1/application",applicationRouter);
app.use("/api/v1/project",projectRouter);

connectDB();

app.use(errorMiddleware);

export default app
