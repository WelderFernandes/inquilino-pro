import { Prisma, PrismaClient } from '@/lib/generated/prisma'

const prisma = new PrismaClient()

const userData: Prisma.UserCreateInput[] = [
  {
    name: 'Alice',
    email: 'alice@prisma.io',
    password: 'password',
  },
  {
    name: 'Bob',
    email: 'bob@prisma.io',
    password: 'password',
  },
]

export async function main() {
  for (const u of userData) {
    await prisma.user.create({ data: u })
  }
}

main()
