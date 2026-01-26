import express, { Router } from "express";
import { SellerController } from "./seller.controller";
import { verifyAuth } from "../../middlewares/auth.middleware";
import { verifySeller } from "../../middlewares/role.middleware";

const router: Router = express.Router();


router.use(verifyAuth, verifySeller);

router.post("/medicines", SellerController.addMedicine);
router.put("/medicines/:id", SellerController.updateMedicine);
router.delete("/medicines/:id", SellerController.deleteMedicine);
router.get("/medicines", SellerController.getMedicines);


router.get("/orders", SellerController.getOrders);
router.patch("/orders/:itemId/status", SellerController.updateOrderStatus);

export const SellerRouter = router;
