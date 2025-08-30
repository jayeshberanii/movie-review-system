import express from "express";
import reviewRouter from "./reviewRouter";
import movieRouter from "./movieRouter";

const router = express.Router();

router.use("/reviews", reviewRouter);
router.use("/movies", movieRouter);

export default router;