import { prisma } from "../../lib/prisma";
import { Prisma, User, Category } from "../../../generated/prisma/client";


const createCategory = async (data: Prisma.CategoryCreateInput): Promise<Category> => {
  return prisma.category.create({ data });
};

const getAllCategories = async (): Promise<Category[]> => {
  return prisma.category.findMany();
};

const getAllUsers = async (): Promise<User[]> => {
  return prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      status: true,
      createdAt: true,
    },
  });
};

const updateUserStatus = async (userId: string, status: "ACTIVE" | "BANNED"): Promise<User> => {
  return prisma.user.update({
    where: { id: userId },
    data: { status },
  });
};


const updateMedicineStatus = async (medicineId: string, status: "AVAILABLE" | "UNAVAILABLE"): Promise<Medicine> => {
  return prisma.medicine.update({
    where: { id: medicineId },
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

export const AdminService = {
  createCategory,
  getAllCategories,
  getAllUsers,
    updateUserStatus,
  updateMedicineStatus,
  approveMedicine


};
