const express = require("express");
const router = express.Router();
const supabase = require("../config/supabase");
const requireAdmin = require("../config/requireAdmin");

// POST /api/contact - visitor submits the contact form (public)
router.post("/", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ message: "Name, email, and message are all required." });
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      return res.status(400).json({ message: "Please provide a valid email address." });
    }

    const { error } = await supabase
      .from("contacts")
      .insert([{ name: name.trim(), email: email.trim(), message: message.trim() }]);

    if (error) throw error;

    res.status(201).json({ message: "Message received. Thank you for reaching out!" });
  } catch (err) {
    res.status(500).json({ message: "Failed to send message.", error: err.message });
  }
});

// GET /api/contact - view submitted messages (admin only)
router.get("/", requireAdmin, async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("contacts")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;
    res.json(data || []);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch messages.", error: err.message });
  }
});

module.exports = router;
