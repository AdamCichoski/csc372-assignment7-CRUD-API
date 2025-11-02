import {
  getCategories,
  getJokesByCategory,
  getRandomJoke,
  addJoke,
} from "../models/jokeModel.js";

export async function getCategoriesController(req, res) {
  try {
    const categories = await getCategories();
    res.json(categories);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch categories" });
  }
}

export async function getJokesByCategoryController(req, res) {
  try {
    const { category } = req.params;
    const { limit } = req.query;

    const jokes = await getJokesByCategory(category, limit);
    if (jokes.length === 0) {
      return res.status(404).json({ error: "Category not found or empty" });
    }
    res.json(jokes);
  } catch (err) {
    res.status(500).json({ error: "Error fetching jokes" });
  }
}

export async function getRandomJokeController(req, res) {
  try {
    const joke = await getRandomJoke();
    res.json(joke);
  } catch (err) {
    res.status(500).json({ error: "Error fetching random joke" });
  }
}

export async function addJokeController(req, res) {
  try {
    const { category, setup, delivery } = req.body;

    if (!category || !setup || !delivery) {
      return res.status(400).json({ error: "Missing category, setup, or delivery" });
    }

    const updated = await addJoke(category, setup, delivery);
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: "Error adding joke" });
  }
}
