import express from "express";
import { config } from "dotenv";
import paymentRoute from "./routes/paymentRoute.js";
import cors from "cors";

config({ path: "./config/config.env" });
export const app = express();

// Add this configuration to allow specific origins
const corsOptions = {
  origin: ["http://localhost:3000"], // Add your frontend's URL
  methods: ["GET", "POST"], // Allow specific methods
  allowedHeaders: ["Content-Type"], // Allow specific headers
};

app.use(cors(corsOptions)); // Use the CORS middleware

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", paymentRoute);

app.get("/api/getkey", (req, res) =>
  res.status(200).json({ key: process.env.RAZORPAY_API_KEY })
);
