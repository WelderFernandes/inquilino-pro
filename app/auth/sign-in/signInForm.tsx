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

const signInSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(1, 'Password is required'),
})

export function SignInForm() {
  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  async function onSubmit(values: z.infer<typeof signInSchema>) {
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
    }
  }

  return (
    <div className="">
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
            </div>
            <hr className="opacity-10" />
            <div>
              <Button
                type="submit"
                className="mb-3 w-full rounded-full bg-white/10 px-5 py-3 text-sm font-medium text-white shadow transition hover:bg-white/20"
              >
                Sign in
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
                Continue with Google
              </Button>
              <div className="mt-2 w-full text-center">
                <span className="text-xs text-gray-400">
                  Dont have an account?{' '}
                  <a
                    href="#"
                    className="text-white/80 underline hover:text-white"
                  >
                    Sign up, its free!
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
    </div>
  )
}
