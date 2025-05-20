import Credentials from 'next-auth/providers/credentials'
import type { NextAuthConfig } from 'next-auth'
import prisma from './lib/prisma'
import bcryptjs from 'bcryptjs'

export const authConfig = {
  pages: {
    signIn: '/auth/sign-in',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user
      const isOnDashboard = nextUrl.pathname.startsWith('/')

      if (isOnDashboard) {
        if (isLoggedIn) return true
        return false
      } else if (isLoggedIn) {
        return Response.redirect(new URL('/', nextUrl))
      }
      return true
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
          return {
            id: user.id,
            email: user.email,
            name: user.name,
            image: user.image,
          }
        } catch (error) {
          console.error('Authentication error:', error)
          return null
        }
      },
    }),
  ],
} satisfies NextAuthConfig
