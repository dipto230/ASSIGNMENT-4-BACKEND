import { prisma } from "../src/lib/prisma";

console.log("Seed script started...");

async function main() {
  const categories = ["Pain Relief", "Antibiotics", "Vitamins"];

  for (const name of categories) {
    const category = await prisma.category.upsert({
      where: { name },
      update: {},
      create: { name },
    });
    console.log(`Seeded category: ${category.name}`);
  }

  console.log("Seeding finished!");
}

main()
  .catch((e) => console.error("Seeding error:", e))
  .finally(async () => {
    await prisma.$disconnect();
    console.log("Database disconnected.");
  });
