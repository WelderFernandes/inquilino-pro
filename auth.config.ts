import Credentials from 'next-auth/providers/credentials'
import type { NextAuthConfig } from 'next-auth'
import prisma from './lib/prisma'
import bcryptjs from 'bcryptjs'

export const authConfig = {
  pages: {
    signIn: '/auth/sign-in',
  },
  callbacks: {
    async session({ session, token }) {
      const user = await prisma.user.findUnique({
        where: {
          email: token.email!,
        },
      })
      return {
        ...session,
        user: {
          ...session.user,
          avatarUrl: user?.image,
          id: token.sub,
          emailVerified: token.emailVerified,
        },
      }
    },
    async jwt({ token, user }) {
      if (user) {
        token.sub = user.id
      }
      return token
    },
  },
  providers: [
    Credentials({
      name: 'Credentials',
      credentials: {
        email: {
          label: 'Email',
          type: 'email',
          placeholder: 'email@example.com',
        },
        password: { label: 'Password', type: 'password' },
        remember: { label: 'Remember me', type: 'checkbox' },
      },
      async authorize(credentials) {
        try {
          const user = await prisma.user.findUnique({
            where: {
              email: credentials?.email as string | undefined,
            },
            select: {
              id: true,
              name: true,
              email: true,
              emailVerified: true,
              image: true,
              password: true,
            },
          })
          console.log({ user })

          if (!user) {
            throw new Error('Invalid credentials')
          }
          const passwordMatch = await bcryptjs.compare(
            String(credentials?.password ?? ''),
            user.password ?? '',
          )

          if (!passwordMatch) {
            throw new Error('Invalid credentials')
          }
          return user
        } catch (error) {
          console.error('Authentication error:', error)
          return null
        }
      },
    }),
  ],
  debug: process.env.NODE_ENV === 'development',
  useSecureCookies: process.env.NODE_ENV === 'production',
} satisfies NextAuthConfig
