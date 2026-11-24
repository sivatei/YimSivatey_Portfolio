const express = require("express");
const router = express.Router();
const supabase = require("../config/supabase");
const requireAdmin = require("../config/requireAdmin");

// POST /api/contact - visitor submits the contact form (public)
router.post("/", async (req, res) => {
  try {
    const rawName = typeof req.body?.name === "string" ? req.body.name.trim() : "";
    const rawEmail = typeof req.body?.email === "string" ? req.body.email.trim() : "";
    const rawMessage = typeof req.body?.message === "string" ? req.body.message.trim() : "";

    if (!rawName || !rawEmail || !rawMessage) {
      return res.status(400).json({ message: "Name, email, and message are all required." });
    }

    if (rawName.length > 120 || rawEmail.length > 254 || rawMessage.length > 5000) {
      return res.status(400).json({ message: "Input exceeds allowed character length." });
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(rawEmail)) {
      return res.status(400).json({ message: "Please provide a valid email address." });
    }

    const { error } = await supabase
      .from("contacts")
      .insert([{ name: rawName, email: rawEmail, message: rawMessage }]);

    if (error) throw error;

    res.status(201).json({ message: "Message received. Thank you for reaching out!" });
  } catch (err) {
    console.error("POST /api/contact failed:", err.message);
    res.status(500).json({ message: "Failed to send message." });
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
    console.error("GET /api/contact failed:", err.message);
    res.status(500).json({ message: "Failed to fetch messages." });
  }
});

module.exports = router;
