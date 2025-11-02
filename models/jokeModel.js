import { pool } from "../db.js";

export async function getCategories() {
  const result = await pool.query("SELECT DISTINCT category FROM jokes");
  return result.rows.map(r => r.category);
}

export async function getJokesByCategory(category, limit) {
  let query = "SELECT * FROM jokes WHERE category = $1";
  const params = [category];
  if (limit) {
    query += " LIMIT $2";
    params.push(limit);
  }
  const result = await pool.query(query, params);
  return result.rows;
}

export async function getRandomJoke() {
  const result = await pool.query("SELECT * FROM jokes ORDER BY RANDOM() LIMIT 1");
  return result.rows[0];
}

export async function addJoke(category, setup, delivery) {
  await pool.query(
    "INSERT INTO jokes (category, setup, delivery) VALUES ($1, $2, $3)",
    [category, setup, delivery]
  );
  const updated = await pool.query("SELECT * FROM jokes WHERE category = $1", [category]);
  return updated.rows;
}
