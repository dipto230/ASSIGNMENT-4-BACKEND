import { Request, Response } from "express";
import { AdminService } from "./admin.service";


const addCategory = async (req: Request, res: Response) => {
  try {
    const category = await AdminService.createCategory(req.body);
    res.status(201).json(category);
  } catch (e) {
    res.status(400).json({ error: "Failed to create category", details: e });
  }
};

const getCategories = async (req: Request, res: Response) => {
  try {
    const categories = await AdminService.getAllCategories();
    res.json(categories);
  } catch (e) {
    res.status(400).json({ error: "Failed to fetch categories", details: e });
  }
};


const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await AdminService.getAllUsers();
    res.json(users);
  } catch (e) {
    res.status(400).json({ error: "Failed to fetch users", details: e });
  }
};

const updateUserStatus = async (req: Request, res: Response) => {
  try {
    const { status } = req.body;
    if (!["ACTIVE", "BANNED"].includes(status)) {
      return res.status(400).json({ error: "Invalid status" });
    }
    const user = await AdminService.updateUserStatus(req.params.id, status);
    res.json(user);
  } catch (e) {
    res.status(400).json({ error: "Failed to update user status", details: e });
  }
};

const updateMedicineStatus = async (req: any, res: Response) => {
  try {
    const { status } = req.body;

    
    if (status === "APPROVE") {
      const medicine = await AdminService.approveMedicine(req.params.id, req.user.id);
      return res.json(medicine);
    }

    
    if (!["AVAILABLE", "UNAVAILABLE"].includes(status)) {
      return res.status(400).json({ error: "Invalid status" });
    }

    const medicine = await AdminService.updateMedicineStatus(
      req.params.id,
      status as "AVAILABLE" | "UNAVAILABLE"
    );
    res.json(medicine);
  } catch (e) {
    res.status(400).json({ error: "Failed to update medicine status", details: e });
  }
};
const updateMedicineAvailability = async (req: Request, res: Response) => {
  try {
    const { status } = req.body;

    if (!["AVAILABLE", "UNAVAILABLE"].includes(status)) {
      return res.status(400).json({ error: "Invalid status" });
    }

    const medicine = await AdminService.updateMedicineAvailability(
      req.params.id,
      status as "AVAILABLE" | "UNAVAILABLE"
    );

    res.json(medicine);
  } catch (e) {
    res.status(400).json({ error: "Failed to update availability", details: e });
  }
};
const getAllOrders = async (req: Request, res: Response) => {
  try {
    const orders = await AdminService.getAllOrders();
    res.json(orders);
  } catch (e) {
    res.status(400).json({ error: "Failed to fetch orders", details: e });
  }
};



const getAllMedicines = async (_req: Request, res: Response) => {
  try {
    const medicines = await AdminService.getAllMedicines();
    res.json(medicines);
  } catch (e) {
    res.status(400).json({ error: "Failed to fetch medicines", details: e });
  }
};



export const AdminController = {
  addCategory,
  getCategories,
  getUsers,
    updateUserStatus,
  updateMedicineStatus,
  updateMedicineAvailability,
  getAllOrders,
  getAllMedicines

};
