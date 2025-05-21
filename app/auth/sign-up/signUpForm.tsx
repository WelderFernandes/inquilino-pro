import React from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import Image from 'next/image'
import { signIn } from 'next-auth/react'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import bcryptjs from 'bcryptjs'
import { createUser, getUserByEmail } from './_action'

const signUpSchema = z
  .object({
    name: z.string().min(1, 'Name is required'),
    email: z.string().email('Please enter a valid email address'),
    password: z
      .string()
      .min(8, 'Password must be at least 8 characters')
      .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
      .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
      .regex(/[0-9]/, 'Password must contain at least one number'),
    confirmPassword: z.string().min(1, 'Password confirmation is required'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  })

export function SignUpForm() {
  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  })

  async function onSubmit(values: z.infer<typeof signUpSchema>) {
    try {
      const existingUser = await getUserByEmail(values.email)
      console.log({ existingUser })

      if (existingUser) {
        throw new Error('Email already registered')
      }

      const password = await bcryptjs.hash(values.password, 12)
      console.log({ values })

      const data = {
        name: values.name,
        email: values.email,
        password,
      }
      const user = await createUser(data)
      console.log('User created:', user)

      if (!user) {
        alert('An error occurred while creating the account')
      }

      alert('Account created successfully!')
    } catch (error) {
      console.error('Error creating account:', error)
      // alert(error instanceof Error ? error.message : 'An error occurred')
    }
  }

  return (
    <>
      <div className="relative z-10 flex w-full max-w-sm flex-col items-center rounded-3xl bg-radial-[at_25%_25%] from-zinc-700/60 to-zinc-900/60 to-75% p-8 shadow-2xl backdrop-blur-sm">
        <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-white/20 shadow-lg">
          <Image
            src="http://hextaui.com/logo.svg"
            alt="Logo"
            width={48}
            height={48}
          />
        </div>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex w-full flex-col gap-4"
          >
            <div className="flex w-full flex-col gap-3">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Full Name"
                        className="w-full rounded-xl bg-white/10 px-5 py-3 text-sm text-white placeholder-gray-300 focus:ring-2 focus:ring-gray-400 focus:outline-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-left text-sm text-red-400" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="Email"
                        className="w-full rounded-xl bg-white/10 px-5 py-3 text-sm text-white placeholder-gray-300 focus:ring-2 focus:ring-gray-400 focus:outline-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-left text-sm text-red-400" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Password"
                        className="w-full rounded-xl bg-white/10 px-5 py-3 text-sm text-white placeholder-gray-300 focus:ring-2 focus:ring-gray-400 focus:outline-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-left text-sm text-red-400" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Confirm Password"
                        className="w-full rounded-xl bg-white/10 px-5 py-3 text-sm text-white placeholder-gray-300 focus:ring-2 focus:ring-gray-400 focus:outline-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-left text-sm text-red-400" />
                  </FormItem>
                )}
              />
            </div>
            <hr className="opacity-10" />
            <div>
              <Button
                type="submit"
                className="mb-3 w-full rounded-full bg-white/10 px-5 py-3 text-sm font-medium text-white shadow transition hover:bg-white/20"
              >
                Create Account
              </Button>
              <Button
                type="button"
                onClick={() => signIn('google')}
                className="mb-2 flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-b from-[#232526] to-[#2d2e30] px-5 py-3 text-sm font-medium text-white shadow transition hover:brightness-110"
              >
                <Image
                  src="https://www.svgrepo.com/show/475656/google-color.svg"
                  alt="Google"
                  width={20}
                  height={20}
                />
                Sign up with Google
              </Button>
              <div className="mt-2 w-full text-center">
                <span className="text-xs text-gray-400">
                  Already have an account?{' '}
                  <a
                    href="#"
                    className="text-white/80 underline hover:text-white"
                  >
                    Sign in here
                  </a>
                </span>
              </div>
            </div>
          </form>
        </Form>
      </div>
      <div className="relative z-10 mt-12 flex flex-col items-center text-center">
        <p className="mb-2 text-sm text-gray-400">
          Join <span className="font-medium text-white">thousands</span> of
          developers who are already using HextaUI.
        </p>
        <div className="flex">
          <Image
            src="https://randomuser.me/api/portraits/men/32.jpg"
            alt="user"
            width={32}
            height={32}
            className="h-8 w-8 rounded-full border-2 border-[#181824] object-cover"
          />
          <Image
            src="https://randomuser.me/api/portraits/women/44.jpg"
            alt="user"
            width={32}
            height={32}
            className="h-8 w-8 rounded-full border-2 border-[#181824] object-cover"
          />
          <Image
            src="https://randomuser.me/api/portraits/men/54.jpg"
            alt="user"
            width={32}
            height={32}
            className="h-8 w-8 rounded-full border-2 border-[#181824] object-cover"
          />
          <Image
            src="https://randomuser.me/api/portraits/women/68.jpg"
            alt="user"
            width={32}
            height={32}
            className="h-8 w-8 rounded-full border-2 border-[#181824] object-cover"
          />
        </div>
      </div>
    </>
  )
}
