import NextAuth from 'next-auth'
import prisma from '@/lib/prisma'
// import bcrypt from 'bcrypt'
import { PrismaAdapter } from '@auth/prisma-adapter'
import { authConfig } from './auth.config'

export const {
  handlers: { GET, POST },
  signIn,
  signOut,
  auth,
} = NextAuth({
  adapter: PrismaAdapter(prisma),
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
    updateAge: 24 * 60 * 60, // 24 hours
    generateSessionToken: () => {
      return crypto.randomUUID()
    },
  },
  ...authConfig,
})
