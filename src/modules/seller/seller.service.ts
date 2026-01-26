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

const updateOrderItemStatus = async (
  itemId: string,
  sellerId: string,
  status: OrderStatus
) => {
  return prisma.orderItem.updateMany({
    where: { id: itemId, sellerId },
    data: { status },
  });
};

export const SellerService = {
  createMedicine,
  updateMedicine,
  deleteMedicine,
  getSellerMedicines,
  getSellerOrderItems,
  updateOrderItemStatus,
};
