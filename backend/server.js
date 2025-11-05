import express from "express";
import cors from "cors";
import mongoose from "mongoose";

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("."));

// MongoDB connection
const uri = "mongodb+srv://fatma:0123456789_@cluster0.qwgmu6j.mongodb.net/skillshare?retryWrites=true&w=majority";

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.error("❌ MongoDB connection error:", err));

// User Schema
const userSchema = new mongoose.Schema({
  name: String,
  skillHave: String,
  skillWant: String,
  date: { type: Date, default: Date.now }
});

const User = mongoose.model("User", userSchema);

// Routes
app.get("/users", async (req, res) => {
  try {
    const users = await User.find().sort({ date: -1 });
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/addUser", async (req, res) => {
  try {
    const { name, skillHave, skillWant } = req.body;
    const user = new User({ name, skillHave, skillWant });
    await user.save();
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
