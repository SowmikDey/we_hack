import express from "express";
import cookieParser from "cookie-parser";
import env from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import userRoute from "./routes/user.route.js";
import genSuggestRoute from "./routes/genSuggest.route.js";

env.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: 'https://we-hack-frontend.onrender.com',
  credentials: true,                                
  methods: ['GET', 'POST', 'PUT', 'DELETE'],         
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//routes
app.use("/api/user", userRoute);
app.use("/api/genSuggest", genSuggestRoute);

app.listen(PORT, () => { console.log(`Server is running on port:${PORT}`) });
