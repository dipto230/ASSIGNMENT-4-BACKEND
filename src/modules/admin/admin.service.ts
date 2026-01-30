import { prisma } from "../../lib/prisma";
import { Prisma, User, Category } from "../../../generated/prisma/client";


const createCategory = async (data: Prisma.CategoryCreateInput): Promise<Category> => {
  return prisma.category.create({ data });
};

const getAllCategories = async (): Promise<Category[]> => {
  return prisma.category.findMany();
};

const getAllUsers = async () => {
  return prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      status: true,
      createdAt: true,
      updatedAt: true,
      image: true,
      emailVerified: true,
      phone: true,
    },
  });
};


const updateUserStatus = async (userId: string, status: "ACTIVE" | "BANNED"): Promise<User> => {
  return prisma.user.update({
    where: { id: userId },
    data: { status },
  });
};





const updateMedicineAvailability = async (
  medicineId: string,
  status: "AVAILABLE" | "UNAVAILABLE"
) => {
  return prisma.medicine.update({
    where: { id: medicineId },
    data: { isActive: status === "AVAILABLE" },
  });
};


const approveMedicine = async (medicineId: string, adminId: string) => {
  return prisma.medicine.update({
    where: { id: medicineId },
    data: {
      isApproved: true,
      approvedBy: adminId,
      approvedAt: new Date(),
    },
  });
};

const getAllOrders = async () => {
  return prisma.order.findMany({
    include: {
      user: { select: { id: true, name: true, email: true } },
      items: {
        include: {
          medicine: true,
          seller: { select: { id: true, name: true } },
        },
      },
      shipping: true,
    },
    orderBy: { createdAt: "desc" },
  });
};


















const getAllMedicines = async () => {
  return prisma.medicine.findMany({
    include: {
      category: true,
      seller: {
        select: { id: true, name: true, email: true },
      },
    },
    orderBy: { createdAt: "desc" },
  });
};



export const AdminService = {
  createCategory,
  getAllCategories,
  getAllUsers,
    updateUserStatus,

  approveMedicine,
  updateMedicineAvailability,
  getAllOrders,
 getAllMedicines 



};
