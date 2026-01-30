
import { CartItem, Order, OrderItem, Review, ShippingInfo } from "../../generated/prisma/client";
import { prisma } from "../lib/prisma";

export const CustomerService = {

  getCart: async (userId: string) => {
    return prisma.cartItem.findMany({
      where: { userId },
      include: { medicine: true },
    });
  },

  addToCart: async (userId: string, medicineId: string, quantity: number) => {
    return prisma.cartItem.upsert({
      where: { userId_medicineId: { userId, medicineId } },
      update: { quantity },
      create: { userId, medicineId, quantity },
    });
  },

  updateCartItem: async (cartItemId: string, userId: string, quantity: number) => {
    return prisma.cartItem.updateMany({
      where: { id: cartItemId, userId },
      data: { quantity },
    });
  },

  removeCartItem: async (cartItemId: string, userId: string) => {
    return prisma.cartItem.deleteMany({
      where: { id: cartItemId, userId },
    });
  },


 placeOrder: async (
  userId: string,
  shipping: { name: string; phone: string; address: string; city: string; postalCode: string; country: string },
  paymentMethod: "COD" = "COD"
) => {
  const cartItems = await prisma.cartItem.findMany({
    where: { userId },
    include: { medicine: true },
  });

  if (cartItems.length === 0) throw new Error("Cart is empty");

  for (const item of cartItems) {
    if (!item.medicine.isActive || !item.medicine.isApproved) {
      throw new Error(`${item.medicine.name} is not available`);
    }
    if (item.quantity > item.medicine.stock) {
      throw new Error(`Not enough stock for ${item.medicine.name}`);
    }
  }

  const total = cartItems.reduce(
    (acc, item) => acc + Number(item.medicine.price) * item.quantity,
    0
  );

  const order = await prisma.order.create({
    data: {
      userId,
      total,
      paymentMethod,
      paymentStatus: "PENDING",
      status: "PLACED",
      items: {
        create: cartItems.map((item) => ({
          medicineId: item.medicineId,
          sellerId: item.medicine.sellerId,
          quantity: item.quantity,
          price: item.medicine.price,
          status: "PLACED", 
        })),
      },
      shipping: { create: shipping },
    },
    include: { items: true, shipping: true },
  });

  await prisma.cartItem.deleteMany({ where: { userId } });

  return order;
},


  getOrders: async (userId: string) => {
    return prisma.order.findMany({
      where: { userId },
      include: { items: { include: { medicine: true } }, shipping: true },
      orderBy: { createdAt: "desc" },
    });
  },

  getOrderById: async (orderId: string, userId: string) => {
    return prisma.order.findFirst({
      where: { id: orderId, userId },
      include: { items: { include: { medicine: true } }, shipping: true },
    });
  },


  addReview: async (userId: string, medicineId: string, rating: number, comment?: string) => {
   
    const orders = await prisma.orderItem.findMany({
      where: { sellerId: userId, medicineId },
    });

  
    return prisma.review.create({
      data: { userId, medicineId, rating, comment: comment ?? null },

    });
  },
  updateProfile: async (
  userId: string,
  data: { name?: string; phone?: string; image?: string }
) => {
  return prisma.user.update({
    where: { id: userId },
    data,
    select: {
      id: true,
      name: true,
      email: true,
      phone: true,
      image: true,
      role: true,
    },
  });
  },
  
  getProfile: async (userId: string) => {
  return prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      name: true,
      email: true,
      phone: true,
      image: true,
      role: true,
    },
  });
},


};
