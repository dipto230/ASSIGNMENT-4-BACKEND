import { prisma } from "../../lib/prisma";
import { OrderStatus, Prisma } from "../../../generated/prisma/client";



const createMedicine = async (
  sellerId: string,
  data: Omit<Prisma.MedicineUncheckedCreateInput, 'sellerId'>
) => {
  if (!data.categoryId) {
    throw new Error("categoryId is required to create a medicine");
  }

  return prisma.medicine.create({
    data: {
      ...data,
      sellerId,        
      isApproved: false,
      isActive: true,
    },
  });
};



const updateMedicine = async (
  medicineId: string,
  sellerId: string,
  data: Prisma.MedicineUpdateInput
) => {
  return prisma.medicine.updateMany({
    where: { id: medicineId, sellerId },
    data,
  });
};

const deleteMedicine = async (medicineId: string, sellerId: string) => {
  return prisma.medicine.deleteMany({
    where: { id: medicineId, sellerId },
  });
};

const getSellerMedicines = async (sellerId: string) => {
  return prisma.medicine.findMany({
    where: { sellerId },
    include: { category: true, reviews: true },
  });
};



const getSellerOrderItems = async (sellerId: string) => {
  return prisma.orderItem.findMany({
    where: { sellerId },
    include: {
      order: { include: { shipping: true, user: true } },
      medicine: true,
    },
  });
};

const updateMainOrderStatus = async (orderId: string) => {
  const items = await prisma.orderItem.findMany({ where: { orderId } });

  const statuses = items.map((i) => i.status);

  let newStatus: OrderStatus = "PLACED";

  if (statuses.every((s) => s === "CANCELLED")) newStatus = "CANCELLED";
  else if (statuses.every((s) => s === "DELIVERED")) newStatus = "DELIVERED";
  else if (statuses.every((s) => s === "SHIPPED")) newStatus = "SHIPPED";
  else if (statuses.some((s) => s === "PROCESSING")) newStatus = "PROCESSING";

  await prisma.order.update({
    where: { id: orderId },
    data: { status: newStatus },
  });
};


const updateOrderItemStatus = async (
  itemId: string,
  sellerId: string,
  status: OrderStatus
) => {
  const item = await prisma.orderItem.findFirst({
    where: { id: itemId, sellerId },
    include: { medicine: true },
  });

  if (!item) throw new Error("Order item not found");

  
  if (status === "PROCESSING" && item.status === "PLACED") {
    if (item.quantity > item.medicine.stock) {
      throw new Error("Stock not available anymore");
    }

    await prisma.medicine.update({
      where: { id: item.medicineId },
      data: { stock: { decrement: item.quantity } },
    });
  }

  const updatedItem = await prisma.orderItem.update({
    where: { id: itemId },
    data: { status },
  });

  await updateMainOrderStatus(item.orderId);

  return updatedItem;
};


export const SellerService = {
  createMedicine,
  updateMedicine,
  deleteMedicine,
  getSellerMedicines,
  getSellerOrderItems,
  updateOrderItemStatus,
};
