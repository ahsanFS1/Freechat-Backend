import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  const tables = ["Message", "Conversation"];
  for (const table of tables) {
    await prisma.$queryRawUnsafe(
      `TRUNCATE TABLE "${table}" RESTART IDENTITY CASCADE;`
    );
    console.log(`Cleared table: ${table}`);
  }
  await prisma.$disconnect();
}

main();
