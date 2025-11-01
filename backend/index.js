import express from "express";

const app = express();

// default route
app.get("/", (req, res) => {
  res.send("Dabite Restaurant backend is running 🚀");
});

// listen on Render's port
const PORT = process.env.PORT || 5050;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});