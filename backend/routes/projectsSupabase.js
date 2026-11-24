const express = require("express");
const router = express.Router();
const supabase = require("../config/supabase");
const requireAdmin = require("../config/requireAdmin");

const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const ALLOWED_FIELDS = [
  "title",
  "description",
  "techStack",
  "imageUrl",
  "imageUrls",
  "videoUrl",
  "githubUrl",
  "liveUrl",
  "role",
  "featured",
  "order",
];

function formatProject(row) {
  if (!row) return null;
  return {
    ...row,
    _id: row.id,
  };
}

function pickProjectFields(body = {}) {
  const result = {};
  for (const field of ALLOWED_FIELDS) {
    if (body[field] !== undefined) {
      result[field] = body[field];
    }
  }
  if (typeof result.title === "string") result.title = result.title.trim();
  if (typeof result.description === "string") result.description = result.description.trim();
  if (result.techStack !== undefined && !Array.isArray(result.techStack)) {
    result.techStack = [];
  }
  if (result.imageUrls !== undefined && !Array.isArray(result.imageUrls)) {
    result.imageUrls = [];
  }
  return result;
}

// POST /api/projects/verify-admin - verify if admin key is correct
router.post("/verify-admin", requireAdmin, (req, res) => {
  res.json({ verified: true });
});

// GET /api/projects - list all projects (public)
router.get("/", async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .order("order", { ascending: true })
      .order("created_at", { ascending: false });

    if (error) throw error;
    res.json((data || []).map(formatProject));
  } catch (err) {
    console.error("GET /api/projects failed:", err.message);
    res.status(500).json({ message: "Failed to fetch projects." });
  }
});

// GET /api/projects/:id - get one project (public)
router.get("/:id", async (req, res) => {
  if (!UUID_REGEX.test(req.params.id)) {
    return res.status(400).json({ message: "Invalid project id." });
  }

  try {
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .eq("id", req.params.id)
      .single();

    if (error || !data) return res.status(404).json({ message: "Project not found." });
    res.json(formatProject(data));
  } catch (err) {
    console.error("GET /api/projects/:id failed:", err.message);
    res.status(500).json({ message: "Failed to fetch project." });
  }
});

// POST /api/projects - create a project (admin only)
router.post("/", requireAdmin, async (req, res) => {
  const payload = pickProjectFields(req.body);

  if (!payload.title || !payload.description) {
    return res.status(400).json({ message: "Title and description are required." });
  }

  try {
    const { data, error } = await supabase
      .from("projects")
      .insert([payload])
      .select()
      .single();

    if (error) throw error;
    res.status(201).json(formatProject(data));
  } catch (err) {
    console.error("POST /api/projects failed:", err.message);
    res.status(400).json({ message: "Failed to create project." });
  }
});

// PUT /api/projects/:id - update a project (admin only)
router.put("/:id", requireAdmin, async (req, res) => {
  if (!UUID_REGEX.test(req.params.id)) {
    return res.status(400).json({ message: "Invalid project id." });
  }

  const updates = pickProjectFields(req.body);
  if (Object.keys(updates).length === 0) {
    return res.status(400).json({ message: "No valid fields provided for update." });
  }
  if (updates.title !== undefined && !updates.title) {
    return res.status(400).json({ message: "Title cannot be empty." });
  }
  if (updates.description !== undefined && !updates.description) {
    return res.status(400).json({ message: "Description cannot be empty." });
  }
  updates.updated_at = new Date().toISOString();

  try {
    const { data, error } = await supabase
      .from("projects")
      .update(updates)
      .eq("id", req.params.id)
      .select()
      .maybeSingle();

    if (error) throw error;
    if (!data) return res.status(404).json({ message: "Project not found." });
    res.json(formatProject(data));
  } catch (err) {
    console.error("PUT /api/projects/:id failed:", err.message);
    res.status(400).json({ message: "Failed to update project." });
  }
});

// DELETE /api/projects/:id - delete a project (admin only)
router.delete("/:id", requireAdmin, async (req, res) => {
  if (!UUID_REGEX.test(req.params.id)) {
    return res.status(400).json({ message: "Invalid project id." });
  }

  try {
    const { data, error } = await supabase
      .from("projects")
      .delete()
      .eq("id", req.params.id)
      .select("id")
      .maybeSingle();

    if (error) throw error;
    if (!data) return res.status(404).json({ message: "Project not found." });
    res.json({ message: "Project deleted.", id: data.id });
  } catch (err) {
    console.error("DELETE /api/projects/:id failed:", err.message);
    res.status(400).json({ message: "Failed to delete project." });
  }
});

module.exports = router;
