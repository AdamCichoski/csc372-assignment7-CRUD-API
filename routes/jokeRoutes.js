import express from "express";
import {
  getCategoriesController,
  getJokesByCategoryController,
  getRandomJokeController,
  addJokeController,
} from "../controllers/jokeController.js";

export const router = express.Router();

router.get("/categories", getCategoriesController);
router.get("/category/:category", getJokesByCategoryController);
router.get("/random", getRandomJokeController);
router.post("/joke/add", addJokeController);
