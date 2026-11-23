const express = require("express");
const router = express.Router();
const supabase = require("../config/supabase");
const requireAdmin = require("../config/requireAdmin");

// Helper to format project rows for frontend compatibility (_id and id both present)
function formatProject(row) {
  if (!row) return null;
  return {
    ...row,
    _id: row.id,
  };
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
    res.status(500).json({ message: "Failed to fetch projects.", error: err.message });
  }
});

// GET /api/projects/:id - get one project (public)
router.get("/:id", async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .eq("id", req.params.id)
      .single();

    if (error || !data) return res.status(404).json({ message: "Project not found." });
    res.json(formatProject(data));
  } catch (err) {
    res.status(400).json({ message: "Invalid project id.", error: err.message });
  }
});

// POST /api/projects - create a project (admin only)
router.post("/", requireAdmin, async (req, res) => {
  try {
    const { _id, id, ...payload } = req.body;
    const { data, error } = await supabase
      .from("projects")
      .insert([payload])
      .select()
      .single();

    if (error) throw error;
    res.status(201).json(formatProject(data));
  } catch (err) {
    res.status(400).json({ message: "Failed to create project.", error: err.message });
  }
});

// PUT /api/projects/:id - update a project (admin only)
router.put("/:id", requireAdmin, async (req, res) => {
  try {
    const { _id, id, created_at, ...updates } = req.body;
    updates.updated_at = new Date().toISOString();

    const { data, error } = await supabase
      .from("projects")
      .update(updates)
      .eq("id", req.params.id)
      .select()
      .single();

    if (error) throw error;
    if (!data) return res.status(404).json({ message: "Project not found." });
    res.json(formatProject(data));
  } catch (err) {
    res.status(400).json({ message: "Failed to update project.", error: err.message });
  }
});

// DELETE /api/projects/:id - delete a project (admin only)
router.delete("/:id", requireAdmin, async (req, res) => {
  try {
    const { error } = await supabase
      .from("projects")
      .delete()
      .eq("id", req.params.id);

    if (error) throw error;
    res.json({ message: "Project deleted.", id: req.params.id });
  } catch (err) {
    res.status(400).json({ message: "Failed to delete project.", error: err.message });
  }
});

module.exports = router;
