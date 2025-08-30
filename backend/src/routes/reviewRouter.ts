import express from "express";
import * as reviewController from "../controllers/reviewController";
import { validateDto } from "../middlewares/validate";
import { CreateReviewDto } from "../dtos/CreateReviewDto";
const router = express.Router();

router.get("/:movieId/reviews", reviewController.getMovieReviews);
router.post("/", validateDto(CreateReviewDto), reviewController.createReview);

export default router;