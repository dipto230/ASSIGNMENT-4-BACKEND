import express, { Router } from "express";
import { AdminController } from "./admin.controller";
import { verifyAuth } from "../../middlewares/auth.middleware";
import { verifyAdmin } from "../../middlewares/role.middleware";

const router: Router = express.Router();


router.use(verifyAuth, verifyAdmin);


router.post("/categories", AdminController.addCategory);
router.get("/categories", AdminController.getCategories);


router.get("/users", AdminController.getUsers);
router.patch("/users/:id/status", AdminController.updateUserStatus);


router.patch("/medicines/:id/availability", AdminController.updateMedicineAvailability);

router.get("/orders", AdminController.getAllOrders);



router.get("/medicines", AdminController.getAllMedicines);



export const AdminRouter = router;
