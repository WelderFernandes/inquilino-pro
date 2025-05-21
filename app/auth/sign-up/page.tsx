'use client'

import { Particles } from '@/components/ui/particles'
import { SignUpForm } from './signUpForm'

export default function SignUp() {
  return (
    <>
      <div className="relative flex h-full min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-[#121212]">
        <div className="absolute h-screen w-screen">
          <div className="absolute inset-0 z-10 bg-[radial-gradient(ellipse_at_top,_transparent_0%,_#121212_50%)]" />
          <Particles quantity={1000} />
        </div>
        <SignUpForm />
      </div>
    </>
  )
}
