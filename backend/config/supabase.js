const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });
const { createClient } = require("@supabase/supabase-js");

let supabaseUrl = (process.env.SUPABASE_URL || "").trim();
// Strip trailing /rest/v1 or slashes if provided
if (supabaseUrl.includes("/rest/v1")) {
  supabaseUrl = supabaseUrl.replace(/\/rest\/v1\/?$/, "");
}
supabaseUrl = supabaseUrl.replace(/\/+$/, "");

const supabaseKey = (
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  process.env.SUPABASE_ANON_KEY ||
  ""
).trim();

if (!supabaseUrl || !supabaseKey) {
  console.warn("WARNING: SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY is not defined in environment variables.");
}

const supabase = createClient(supabaseUrl, supabaseKey);

module.exports = supabase;
