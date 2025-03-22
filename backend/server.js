import express from "express";
import cookieParser from "cookie-parser";
import env from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";

env.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: '',
  credentials: true
}));
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


app.listen(PORT, () => { console.log(`Server is running on port:${PORT}`) });