import express from "express";

const app = express();

app.use(express.json()); // to read JSON from POST requests

// ✅ default route
app.get("/", (req, res) => {
  res.send("Dabite Restaurant backend is running 🚀");
});

// ✅ signup route
app.post("/signup", (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  // This is just a placeholder — you can later connect it to your Supabase or DB
  res.status(201).json({
    message: "Signup successful!",
    user: { name, email },
  });
});

// ✅ login route (optional)
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Missing credentials" });
  }

  // placeholder response
  res.status(200).json({ message: "Login successful!" });
});

// ✅ Start server
const PORT = process.env.PORT || 5050;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});