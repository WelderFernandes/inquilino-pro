'use client'

import React from 'react'
import { Particles } from './particles'

const SignIn1 = () => {
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [error, setError] = React.useState('')

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }

  const handleSignIn = () => {
    if (!email || !password) {
      setError('Please enter both email and password.')
      return
    }
    if (!validateEmail(email)) {
      setError('Please enter a valid email address.')
      return
    }
    setError('')
    alert('Sign in successful! (Demo)')
  }

  return (
    <div className="relative flex h-full min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-[#121212]">
      <div className="absolute h-screen w-screen">
        <div className="absolute inset-0 z-10 bg-[radial-gradient(ellipse_at_top,_transparent_0%,_#121212_50%)]" />
        <Particles quantity={1000} />
      </div>
      {/* Centered glass card */}
      <div className="relative z-10 flex w-full max-w-sm flex-col items-center rounded-3xl bg-radial-[at_25%_25%] from-zinc-700/60 to-zinc-900/60 to-75% p-8 shadow-2xl backdrop-blur-sm">
        {/* Logo */}
        <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-white/20 shadow-lg">
          <img src="http://hextaui.com/logo.svg" />
        </div>
        {/* Title */}
        <h2 className="mb-6 text-center text-2xl font-semibold text-white">
          Alugue
        </h2>
        {/* Form */}
        <div className="flex w-full flex-col gap-4">
          <div className="flex w-full flex-col gap-3">
            <input
              placeholder="Email"
              type="email"
              value={email}
              className="w-full rounded-xl bg-white/10 px-5 py-3 text-sm text-white placeholder-gray-300 focus:ring-2 focus:ring-gray-400 focus:outline-none"
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              placeholder="Password"
              type="password"
              value={password}
              className="w-full rounded-xl bg-white/10 px-5 py-3 text-sm text-white placeholder-gray-300 focus:ring-2 focus:ring-gray-400 focus:outline-none"
              onChange={(e) => setPassword(e.target.value)}
            />
            {error && (
              <div className="text-left text-sm text-red-400">{error}</div>
            )}
          </div>
          <hr className="opacity-10" />
          <div>
            <button
              onClick={handleSignIn}
              className="mb-3 w-full rounded-full bg-white/10 px-5 py-3 text-sm font-medium text-white shadow transition hover:bg-white/20"
            >
              Sign in
            </button>
            {/* Google Sign In */}
            <button className="mb-2 flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-b from-[#232526] to-[#2d2e30] px-5 py-3 text-sm font-medium text-white shadow transition hover:brightness-110">
              <img
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                alt="Google"
                className="h-5 w-5"
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
        </div>
      </div>
      {/* User count and avatars */}
      <div className="relative z-10 mt-12 flex flex-col items-center text-center">
        <p className="mb-2 text-sm text-gray-400">
          Join <span className="font-medium text-white">thousands</span> of
          developers who are already using HextaUI.
        </p>
        <div className="flex">
          <img
            src="https://randomuser.me/api/portraits/men/32.jpg"
            alt="user"
            className="h-8 w-8 rounded-full border-2 border-[#181824] object-cover"
          />
          <img
            src="https://randomuser.me/api/portraits/women/44.jpg"
            alt="user"
            className="h-8 w-8 rounded-full border-2 border-[#181824] object-cover"
          />
          <img
            src="https://randomuser.me/api/portraits/men/54.jpg"
            alt="user"
            className="h-8 w-8 rounded-full border-2 border-[#181824] object-cover"
          />
          <img
            src="https://randomuser.me/api/portraits/women/68.jpg"
            alt="user"
            className="h-8 w-8 rounded-full border-2 border-[#181824] object-cover"
          />
        </div>
      </div>
    </div>
  )
}

export { SignIn1 }
