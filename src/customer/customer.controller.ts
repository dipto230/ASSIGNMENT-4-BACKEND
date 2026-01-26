import { Request, Response } from "express";
import { CustomerService } from "./customer.service";

interface AuthRequest extends Request {
  user?: { id: string; role: string };
}


const getCart = async (req: AuthRequest, res: Response) => {
  try {
    const cart = await CustomerService.getCart(req.user!.id);
    res.json(cart);
  } catch (e) {
    res.status(400).json({ error: "Failed to get cart", details: e });
  }
};

const addToCart = async (req: AuthRequest, res: Response) => {
  try {
    const { medicineId, quantity } = req.body;
    const cartItem = await CustomerService.addToCart(req.user!.id, medicineId, quantity);
    res.status(201).json(cartItem);
  } catch (e) {
    res.status(400).json({ error: "Failed to add to cart", details: e });
  }
};

const updateCartItem = async (req: AuthRequest, res: Response) => {
  try {
    const { quantity } = req.body;
    const cartItem = await CustomerService.updateCartItem(req.params.cartItemId, req.user!.id, quantity);
    res.json(cartItem);
  } catch (e) {
    res.status(400).json({ error: "Failed to update cart item", details: e });
  }
};

const removeCartItem = async (req: AuthRequest, res: Response) => {
  try {
    await CustomerService.removeCartItem(req.params.cartItemId, req.user!.id);
    res.json({ message: "Item removed from cart" });
  } catch (e) {
    res.status(400).json({ error: "Failed to remove cart item", details: e });
  }
};


const placeOrder = async (req: AuthRequest, res: Response) => {
  try {
    const { shipping, paymentMethod } = req.body;
    const order = await CustomerService.placeOrder(req.user!.id, shipping, paymentMethod);
    res.status(201).json(order);
  } catch (e) {
    res.status(400).json({ error: "Failed to place order", details: e });
  }
};

const getOrders = async (req: AuthRequest, res: Response) => {
  try {
    const orders = await CustomerService.getOrders(req.user!.id);
    res.json(orders);
  } catch (e) {
    res.status(400).json({ error: "Failed to get orders", details: e });
  }
};

const getOrderById = async (req: AuthRequest, res: Response) => {
  try {
    const order = await CustomerService.getOrderById(req.params.id, req.user!.id);
    if (!order) return res.status(404).json({ error: "Order not found" });
    res.json(order);
  } catch (e) {
    res.status(400).json({ error: "Failed to get order", details: e });
  }
};


const addReview = async (req: AuthRequest, res: Response) => {
  try {
    const { medicineId, rating, comment } = req.body;
    const review = await CustomerService.addReview(req.user!.id, medicineId, rating, comment);
    res.status(201).json(review);
  } catch (e) {
    res.status(400).json({ error: "Failed to add review", details: e });
  }
};

export const CustomerController = {
  getCart,
  addToCart,
  updateCartItem,
  removeCartItem,
  placeOrder,
  getOrders,
  getOrderById,
  addReview,
};
