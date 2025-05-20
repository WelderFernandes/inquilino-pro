'use client'

import React from 'react'
import { Particles } from './particles'
import { Formik, Form, Field } from 'formik'
import * as z from 'zod'
import { toFormikValidationSchema } from 'zod-formik-adapter'
import Image from 'next/image'
import { signIn } from 'next-auth/react'

const signInSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(1, 'Password is required'),
})

const SignIn1 = () => {
  return (
    <div className="relative flex h-full min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-[#121212]">
      <div className="absolute h-screen w-screen">
        <div className="absolute inset-0 z-10 bg-[radial-gradient(ellipse_at_top,_transparent_0%,_#121212_50%)]" />
        <Particles quantity={1000} />
      </div>
      <div className="relative z-10 flex w-full max-w-sm flex-col items-center rounded-3xl bg-radial-[at_25%_25%] from-zinc-700/60 to-zinc-900/60 to-75% p-8 shadow-2xl backdrop-blur-sm">
        <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-white/20 shadow-lg">
          <Image
            src="http://hextaui.com/logo.svg"
            alt="Logo"
            width={48}
            height={48}
          />
        </div>
        <h2 className="mb-6 text-center text-2xl font-semibold text-white">
          Alugue
        </h2>
        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={toFormikValidationSchema(signInSchema)}
          onSubmit={async (values, { setSubmitting }) => {
            try {
              const result = await signIn('credentials', {
                email: values.email,
                password: values.password,
                redirect: false,
              })

              if (result?.error) {
                throw new Error(result.error)
              }

              alert('Sign in successful!')
            } catch (error) {
              console.log('aqui', error)
              alert(`Error: ${error}`)
            } finally {
              setSubmitting(false)
            }
          }}
        >
          {({ errors, touched }) => (
            <Form className="flex w-full flex-col gap-4">
              <div className="flex w-full flex-col gap-3">
                <Field
                  name="email"
                  type="email"
                  placeholder="Email"
                  className="w-full rounded-xl bg-white/10 px-5 py-3 text-sm text-white placeholder-gray-300 focus:ring-2 focus:ring-gray-400 focus:outline-none"
                />
                {errors.email && touched.email && (
                  <div className="text-left text-sm text-red-400">
                    {errors.email}
                  </div>
                )}
                <Field
                  name="password"
                  type="password"
                  placeholder="Password"
                  className="w-full rounded-xl bg-white/10 px-5 py-3 text-sm text-white placeholder-gray-300 focus:ring-2 focus:ring-gray-400 focus:outline-none"
                />
                {errors.password && touched.password && (
                  <div className="text-left text-sm text-red-400">
                    {errors.password}
                  </div>
                )}
              </div>
              <hr className="opacity-10" />
              <div>
                <button
                  type="submit"
                  className="mb-3 w-full rounded-full bg-white/10 px-5 py-3 text-sm font-medium text-white shadow transition hover:bg-white/20"
                >
                  Sign in
                </button>
                <button
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
                  Continue with Google
                </button>
                <div className="mt-2 w-full text-center">
                  <span className="text-xs text-gray-400">
                    Don't have an account?{' '}
                    <a
                      href="#"
                      className="text-white/80 underline hover:text-white"
                    >
                      Sign up, it's free!
                    </a>
                  </span>
                </div>
              </div>
            </Form>
          )}
        </Formik>
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
    </div>
  )
}

export { SignIn1 }
