import { Request, Response } from "express";
import { PublicService } from "./public.service";
import { getAIResponse } from "../../lib/ai";


const getMedicines = async (req: Request, res: Response) => {
  try {
    const { categoryId, manufacturer, minPrice, maxPrice } = req.query;
    const medicines = await PublicService.getMedicines({
      categoryId: categoryId as string,
      manufacturer: manufacturer as string,
      minPrice: minPrice ? Number(minPrice) : undefined,
      maxPrice: maxPrice ? Number(maxPrice) : undefined,
    });
    res.json(medicines);
  } catch (e) {
    res.status(400).json({ error: "Failed to fetch medicines", details: e });
  }
};


const getMedicineById = async (req: Request, res: Response) => {
  try {
    const medicine = await PublicService.getMedicineById(String(req.params.id));
    if (!medicine) return res.status(404).json({ error: "Medicine not found" });
    res.json(medicine);
  } catch (e) {
    res.status(400).json({ error: "Failed to fetch medicine", details: e });
  }
};


const getCategories = async (_req: Request, res: Response) => {
  try {
    const categories = await PublicService.getCategories();
    res.json(categories);
  } catch (e) {
    res.status(400).json({ error: "Failed to fetch categories", details: e });
  }
};


const aiChat = async (req: Request, res: Response) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({
        message: "Message is required",
      });
    }

    const reply = await getAIResponse(message);

    res.json({
      success: true,
      data: reply,
    });
  } catch (err) {
    res.status(500).json({
      message: "AI failed",
    });
  }
};

export const PublicController = {
  getMedicines,
  getMedicineById,
  getCategories,
  aiChat
};
