/* checks if prisma client is connected already to re-use the conection and avoid muultiples ones. If not, creates a new conection */
import { PrismaClient } from '@prisma/client'

const globalForPrisma = global as unknown as { prisma: PrismaClient }

export const prisma =
    globalForPrisma.prisma ||
    new PrismaClient({
        log: ['query'],
    })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
