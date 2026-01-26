import { Request, Response } from "express";
import { SellerService } from "./seller.service";

interface AuthRequest extends Request {
  user?: { id: string; role: string };
}


const addMedicine = async (req: AuthRequest, res: Response) => {
  const medicine = await SellerService.createMedicine(req.user!.id, req.body);
  res.status(201).json(medicine);
};

const updateMedicine = async (req: AuthRequest, res: Response) => {
  const result = await SellerService.updateMedicine(
    req.params.id,
    req.user!.id,
    req.body
  );
  res.json(result);
};

const deleteMedicine = async (req: AuthRequest, res: Response) => {
  await SellerService.deleteMedicine(req.params.id, req.user!.id);
  res.json({ message: "Medicine deleted" });
};

const getMedicines = async (req: AuthRequest, res: Response) => {
  const medicines = await SellerService.getSellerMedicines(req.user!.id);
  res.json(medicines);
};



const getOrders = async (req: AuthRequest, res: Response) => {
  const orders = await SellerService.getSellerOrderItems(req.user!.id);
  res.json(orders);
};

const updateOrderStatus = async (req: AuthRequest, res: Response) => {
  const item = await SellerService.updateOrderItemStatus(
    req.params.itemId,
    req.user!.id,
    req.body.status
  );
  res.json(item);
};

export const SellerController = {
  addMedicine,
  updateMedicine,
  deleteMedicine,
  getMedicines,
  getOrders,
  updateOrderStatus,
};
