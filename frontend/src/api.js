// Central place for all calls to the backend API.
// The base URL comes from an environment variable so it can point at
// localhost during development and your deployed Render backend in production.

const RAW_API_URL =
  import.meta.env.VITE_API_URL ||
  (import.meta.env.PROD
    ? "https://sivatey-portfolio-backend.onrender.com"
    : "http://localhost:5000");

const API_URL = RAW_API_URL.replace(/\/+$/, "");

async function handleResponse(res) {
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data.message || "Request failed.");
  }
  return data;
}

export async function getProjects() {
  const res = await fetch(`${API_URL}/api/projects`);
  return handleResponse(res);
}

export async function getProject(id) {
  const res = await fetch(`${API_URL}/api/projects/${id}`);
  return handleResponse(res);
}

export async function createProject(project, adminKey) {
  const res = await fetch(`${API_URL}/api/projects`, {
    method: "POST",
    headers: { "Content-Type": "application/json", "x-admin-key": adminKey },
    body: JSON.stringify(project),
  });
  return handleResponse(res);
}

export async function updateProject(id, project, adminKey) {
  const res = await fetch(`${API_URL}/api/projects/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", "x-admin-key": adminKey },
    body: JSON.stringify(project),
  });
  return handleResponse(res);
}

export async function deleteProject(id, adminKey) {
  const res = await fetch(`${API_URL}/api/projects/${id}`, {
    method: "DELETE",
    headers: { "x-admin-key": adminKey },
  });
  return handleResponse(res);
}

export async function sendContactMessage(payload) {
  const res = await fetch(`${API_URL}/api/contact`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return handleResponse(res);
}

export async function verifyAdminKey(adminKey) {
  const res = await fetch(`${API_URL}/api/projects/verify-admin`, {
    method: "POST",
    headers: { "x-admin-key": adminKey },
  });
  return handleResponse(res);
}
