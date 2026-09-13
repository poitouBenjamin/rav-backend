import { pool } from "../../config/db.js";

export async function findUserByEmail(email: string) {
  const { rows } = await pool.query(
    "SELECT id, email, password_hash FROM users WHERE email = $1",
    [email],
  );
  return rows[0] ?? null;
}
export async function createUser(email: string, passwordHash: string) {
  const { rows } = await pool.query(
    "INSERT INTO users (email, password_hash) VALUES ($1, $2) RETURNING id, email",
    [email, passwordHash],
  );
  return rows[0];
}
export async function hasProile(userId: string) {
  const { rows } = await pool.query(
    "SELECT 1 FROM profiles WHERE user_id = $1",
    [userId],
  );
  return rows.length > 0;
}
