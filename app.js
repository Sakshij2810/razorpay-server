import express from "express";
import { config } from "dotenv";
import paymentRoute from "./routes/paymentRoute.js";
import cors from "cors";

config({ path: "./config/config.env" });
export const app = express();

const corsOptions = {
  origin: [
    "https://razorpay-client-hazel.vercel.app", // Allow Vercel frontend
    "http://localhost:3000", // Allow local development
  ],
  methods: ["GET", "POST"], // Allow specific HTTP methods
  credentials: true, // Allow credentials if needed
};

app.use(cors(corsOptions)); // Use the CORS middleware

// app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", paymentRoute);

app.get("/", () => {
  console.log("server is running...");
});

app.get("/api/getkey", (req, res) =>
  res.status(200).json({ key: process.env.RAZORPAY_API_KEY })
);
