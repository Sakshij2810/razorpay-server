import express from "express";
import { config } from "dotenv";
import paymentRoute from "./routes/paymentRoute.js";
import cors from "cors";

// Load environment variables
config({ path: "./config/config.env" });

export const app = express();

// Dynamic CORS middleware for multiple origins
const allowedOrigins = [
  "https://razorpay-client-hazel.vercel.app", // Allow Vercel frontend
  "http://localhost:3000", // Allow local development
];

const corsOptions = (req, callback) => {
  const origin = req.header("Origin");
  if (allowedOrigins.includes(origin)) {
    callback(null, { origin: true, credentials: true });
  } else {
    callback(null, { origin: false });
  }
};

// Use the CORS middleware
app.use(cors(corsOptions));

// Middleware for parsing JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api", paymentRoute);

app.get("/", (req, res) => {
  res.send("Server is running...");
});

app.get("/api/getkey", (req, res) =>
  res.status(200).json({ key: process.env.RAZORPAY_API_KEY })
);
