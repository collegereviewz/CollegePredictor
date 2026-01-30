import express from "express";
import { predictColleges } from "../controller/predict.controller.js";

const router = express.Router();

router.post("/predict", predictColleges);

export default router;
