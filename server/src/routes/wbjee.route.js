import {predictWBJEEColleges} from "../controller/wbjee.controller.js";
import express from "express";
const router = express.Router();
router.post("/predict", predictWBJEEColleges);

export default router;


