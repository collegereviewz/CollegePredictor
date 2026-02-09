import {predictGateColleges} from "../controller/gatePredict.controller.js";
import express from "express";
const router = express.Router();
router.post("/predict", predictGateColleges);

export default router;


