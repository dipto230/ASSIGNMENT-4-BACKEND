import { prisma } from "../../lib/prisma";

interface GetMedicinesFilters {
  categoryId?: string | undefined;
  manufacturer?: string | undefined;
  minPrice?: number | undefined;
  maxPrice?: number | undefined;
}


const getMedicines = async (filters: GetMedicinesFilters) => {
  const where: any = {
    isActive: true,
    isApproved: true, 
  };

  if (filters.categoryId) where.categoryId = filters.categoryId;
  if (filters.manufacturer) where.manufacturer = { contains: filters.manufacturer, mode: "insensitive" };
  if (filters.minPrice || filters.maxPrice) {
    where.price = {};
    if (filters.minPrice) where.price.gte = filters.minPrice;
    if (filters.maxPrice) where.price.lte = filters.maxPrice;
  }

  return prisma.medicine.findMany({
    where,
    include: { category: true, reviews: true },
    orderBy: { createdAt: "desc" },
  });
};

const getMedicineById = async (id: string) => {
  return prisma.medicine.findFirst({
    where: { id, isActive: true, isApproved: true },
    include: { category: true, reviews: { include: { user: { select: { name: true } } } } },
  });
};

const getCategories = async () => {
  return prisma.category.findMany({
    include: { medicines: { where: { isActive: true, isApproved: true } } },
  });
};

const searchMedicinesSmart = async (query: string) => {
  const medicines = await prisma.medicine.findMany({
    include: {
      category: true,
    },
  });

  const q = query.toLowerCase();

  const filtered = medicines.filter((med) => {
    return (
      med.name?.toLowerCase().includes(q) ||
      med.description?.toLowerCase().includes(q) ||
      med.category?.name?.toLowerCase().includes(q)
    );
  });

  return filtered.slice(0, 10);
};

export const PublicService = {
  getMedicines,
  getMedicineById,
  getCategories,
  searchMedicinesSmart
};
