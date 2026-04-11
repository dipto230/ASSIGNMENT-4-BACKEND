import express, { Router } from "express";
import { PublicController } from "./public.controller";
import { aiChat } from './../../../.history/src/modules/public/public.controller_20260411113610';


const router: Router = express.Router();

router.get("/medicines", PublicController.getMedicines);
router.get("/medicines/:id", PublicController.getMedicineById);

router.get("/categories", PublicController.getCategories);

router.post("/ai-chat", aiChat);

export const PublicRouter = router;


