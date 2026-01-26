import { Request, Response } from "express";
import { PublicService } from "./public.service";


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
