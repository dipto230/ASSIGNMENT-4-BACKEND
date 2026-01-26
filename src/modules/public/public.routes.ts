import express, { Router } from "express";
import { PublicController } from "./public.controller";

const router: Router = express.Router();

router.get("/medicines", PublicController.getMedicines);
router.get("/medicines/:id", PublicController.getMedicineById);

