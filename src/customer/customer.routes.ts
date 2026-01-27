import express, { Router } from "express";
import { CustomerController } from "./customer.controller";
import { verifyAuth } from "../middlewares/auth.middleware";


const router: Router = express.Router();


router.use(verifyAuth);


router.get("/cart", CustomerController.getCart);
router.post("/cart", CustomerController.addToCart);
router.patch("/cart/:cartItemId", CustomerController.updateCartItem);
router.delete("/cart/:cartItemId", CustomerController.removeCartItem);


router.post("/orders", CustomerController.placeOrder);
router.get("/orders", CustomerController.getOrders);
router.get("/orders/:id", CustomerController.getOrderById);

router.get("/profile", CustomerController.getProfile);

router.patch("/profile", CustomerController.updateProfile);



router.post("/reviews", CustomerController.addReview);

export const CustomerRouter = router;
