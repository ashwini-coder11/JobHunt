import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
 import userRoute from "./routes/user.route.js";
// import companyRoute from "./routes/company.route.js";
// import jobRoute from "./routes/job.route.js";
// import applicationRoute from "./routes/application.route.js";

dotenv.config({});

const app = express();

// middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
const corsOptions = {
    origin:'*',
    // credentials:true
}

app.use(cors(corsOptions));

const PORT = process.env.PORT || 3000;



app.get('/', (req, res) => {
  res.send('Hello World!');
});


app.use("/api/v1/user", userRoute);




app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running on port ${PORT}`);
});
