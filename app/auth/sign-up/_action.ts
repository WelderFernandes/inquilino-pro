'use server'
import { User } from '@/lib/generated/prisma'
import prisma from '@/lib/prisma'

export async function getUserByEmail(email: string) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    })
    return user
  } catch (error) {
    console.error('Error fetching user by email:', error)
    throw new Error('Failed to fetch user by email')
  }
}

export async function createUser({ name, email, password }: Partial<User>) {
  try {
    const user = prisma.user.create({
      data: {
        name,
        email,
        password,
      },
    })
    return user
  } catch (error) {
    console.error('Error creating user:', error)
    throw new Error('Failed to create user')
  }
}
