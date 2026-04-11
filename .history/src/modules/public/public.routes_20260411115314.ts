import express, { Router } from "express";
import {  PublicController } from "./public.controller";




const router: Router = express.Router();

router.get("/medicines", PublicController.getMedicines);
router.get("/medicines/:id", PublicController.getMedicineById);

router.get("/categories", PublicController.getCategories);

router.post("/ai-chat", PublicController.aiChat);
router.get("/smart-search", PublicController.smartSearch(req, res));

export const PublicRouter = router;


