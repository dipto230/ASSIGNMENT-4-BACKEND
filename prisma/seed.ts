import { prisma } from "../src/lib/prisma";

console.log("Seed script started...");

async function main() {
  const categories = [
    "Pain Relief",
    "Antibiotics",
    "Vitamins",
    "Cold & Flu",
    "Surgical Gloves",
    "Thermometer",
    "Diabetes Care",
  ];

  console.log("Starting to seed categories...");

  for (const name of categories) {
    try {
      const category = await prisma.category.upsert({
        where: { name },
        update: {},
        create: { name },
      });
      console.log(`Seeded category: ${category.name}`);
    } catch (error) {
      console.error(`Error seeding category ${name}:`, error);
    }
  }

  console.log("All categories seeded!");
}

main()
  .catch((e) => console.error("Seeding error:", e))
  .finally(async () => {
    await prisma.$disconnect();
    console.log("Database disconnected.");
  });
