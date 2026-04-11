import express, { Router } from "express";
import { PublicController } from "./public.controller";


const router: Router = express.Router();

router.get("/medicines", PublicController.getMedicines);
router.get("/medicines/:id", PublicController.getMedicineById);

router.get("/categories", PublicController.getCategories);

export const PublicRouter = router;


