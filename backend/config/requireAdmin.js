const crypto = require("crypto");

/**
 * Protects admin write routes (POST/PUT/DELETE) using the `x-admin-key` header
 * compared in constant time against `process.env.ADMIN_KEY`.
 */
function requireAdmin(req, res, next) {
  const providedKey = req.header("x-admin-key");
  const expectedKey = process.env.ADMIN_KEY;

  if (!expectedKey) {
    return res.status(500).json({ message: "Server misconfigured: ADMIN_KEY not set." });
  }

  if (!providedKey) {
    return res.status(401).json({ message: "Unauthorized: missing or invalid admin key." });
  }

  const providedBuf = Buffer.from(providedKey);
  const expectedBuf = Buffer.from(expectedKey);

  if (
    providedBuf.length !== expectedBuf.length ||
    !crypto.timingSafeEqual(providedBuf, expectedBuf)
  ) {
    return res.status(401).json({ message: "Unauthorized: missing or invalid admin key." });
  }

  next();
}

module.exports = requireAdmin;
