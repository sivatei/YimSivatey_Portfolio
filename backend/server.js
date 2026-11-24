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
app.use(express.json({ limit: "100kb" }));

const allowedOrigins = (process.env.CLIENT_ORIGIN || "")
  .split(",")
  .map((o) => o.trim())
  .filter(Boolean);

app.use(
  cors({
    origin(origin, callback) {
      // Allow requests with no Origin header (curl, healthchecks, server-to-server)
      // or when CLIENT_ORIGIN is unset / wildcard.
      if (
        !origin ||
        allowedOrigins.length === 0 ||
        allowedOrigins.includes("*") ||
        allowedOrigins.includes(origin)
      ) {
        return callback(null, true);
      }
      return callback(new Error("Origin not allowed by CORS."));
    },
  })
);

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
  if (err.message === "Origin not allowed by CORS.") {
    return res.status(403).json({ message: err.message });
  }
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
