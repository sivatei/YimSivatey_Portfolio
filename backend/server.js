const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, ".env") });
const express = require("express");
const cors = require("cors");

// Determine database mode: Supabase (preferred) or MongoDB (legacy fallback)
const useSupabase = Boolean(
  process.env.SUPABASE_URL &&
    (process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY)
);

const projectRoutes = useSupabase
  ? require("./routes/projectsSupabase")
  : require("./routes/projects");

const contactRoutes = useSupabase
  ? require("./routes/contactSupabase")
  : require("./routes/contact");

const app = express();

// --- Middleware ---
app.use(express.json());
app.use(cors());

// --- Routes ---
app.get("/", (req, res) => {
  res.json({
    status: "ok",
    message: "Portfolio API is running.",
    database: useSupabase ? "Supabase (PostgreSQL)" : "MongoDB",
  });
});

app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    uptime: process.uptime(),
    database: useSupabase ? "Supabase" : "MongoDB",
  });
});

app.use("/api/projects", projectRoutes);
app.use("/api/contact", contactRoutes);

// --- 404 handler ---
app.use((req, res) => {
  res.status(404).json({ message: "Route not found." });
});

// --- Error handler ---
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong on the server." });
});

const PORT = process.env.PORT || 5000;

if (useSupabase) {
  console.log("Database Mode: Supabase (PostgreSQL)");
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
} else {
  console.log("Database Mode: MongoDB Atlas");
  const connectDB = require("./config/db");
  connectDB().then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  });
}
