import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import jwt from "jsonwebtoken";
import { createClient } from "@supabase/supabase-js";

dotenv.config();

const app = express();

// ✅ Middleware
app.use(
  cors({
    origin: "*", // Allow requests from anywhere (you can restrict later)
  })
);
app.use(express.json());

// ✅ Supabase setup
const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_KEY!
);

// ✅ Root route — check if server is working
app.get("/", (req, res) => {
  res.send("✅ Backend server is running and reachable!");
});

// 🧾 Signup Route
app.post("/signup", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ error: "Email and password required" });

  const { data, error } = await supabase.auth.signUp({ email, password });

  if (error) {
    console.error("❌ Supabase signup error:", error.message);
    return res.status(400).json({ error: error.message });
  }

  res.json({
    message: "✅ Signup successful! Please check your email to verify.",
    user: data.user,
  });
});

// 🔐 Login Route
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ error: "Email and password required" });

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    console.error("❌ Supabase login error:", error.message);
    return res.status(400).json({ error: error.message });
  }

  // ✅ Create a custom JWT for your backend
  const token = jwt.sign({ email }, process.env.JWT_SECRET!, {
    expiresIn: "1h",
  });

  res.json({
    message: "✅ Login successful",
    token,
    user: data.user,
  });
});

// 👤 Protected Route Example
app.get("/profile", (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader)
    return res.status(401).json({ error: "No token provided" });

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    res.json({ message: "✅ Profile access granted", user: decoded });
  } catch {
    res.status(403).json({ error: "Invalid or expired token" });
  }
});

// ✅ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));