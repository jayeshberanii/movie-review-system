import express from "express";
import * as movieController from "../controllers/movieController";
import { CreateMovieDto } from "../dtos/CreateMovieDto";
import { validateDto } from "../middlewares/validate";

const router = express.Router();

router.get("/", movieController.getMovies);
router.get("/:id", movieController.getMovie);
router.post("/", validateDto(CreateMovieDto), movieController.createMovie);

export default router;