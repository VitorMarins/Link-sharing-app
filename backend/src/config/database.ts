import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../../generated/prisma/client";

const connectionString = `${process.env.DATABASE_URL}`;
const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not defined in the environment variables.");
}

async function testarConexao() {
  try {
    await prisma.$queryRaw`SELECT 1`;
    console.log(
      "✅ Conexão com o banco de dados do Supabase estabelecida com sucesso!"
    );
  } catch (error) {
    console.error("❌ Erro ao conectar ao banco de dados:", error);
  }
}
testarConexao();

export { prisma };
