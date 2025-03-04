'use client'
import React from 'react'
import Link from 'next/link'
import { useState } from 'react'


const SignUpPage = () => {
    const [showPassword, setShowPassword] = useState<string>('password')

  return (
    <>
    <section className='w-[100vw] h-[100vh] flex justify-center items-center'>
        <Link href={'/'} className='absolute top-0 left-0 text-xsm pl-4 pt-3'>Back To Home</Link>

        <div className='flex flex-col items-start justify-start gap-2 w-[70vw] sm:w-[50vw] md:w-[40vw] lg:w-[28vw] h-fit border border-primary-border bg-white rounded-lg shadow-lg px-3 py-3'>
            <span className='text-2xl font-semibold'>Sign Up</span>

            <input type='text' placeholder='Name' className='w-full py-1 font-medium text-lg shadow-xs border border-primary-border rounded-md px-3 outline-none'/>
            <input type='text' placeholder='Email' className='w-full py-1 font-medium text-lg shadow-xs border border-primary-border rounded-md px-3 outline-none'/>
            
            <div className='w-full flex h-fit items-center justify-end'>
                <input type={showPassword} placeholder='Password' className='w-full py-1 font-medium text-lg shadow-xs border border-primary-border rounded-md px-3 select-none outline-none'/>
                <span className='absolute pr-2 cursor-pointer select-none' onClick={(e: React.MouseEvent<HTMLSpanElement>)=>{
                    if(showPassword === 'password'){
                        setShowPassword('text')
                        return;
                    }
                    setShowPassword('password')
                }}>{showPassword=='password'?'Show':'Hide'}</span>
            </div>

            <span className='text-xl text-primary-text mx-auto'>OR</span>

            <div className='w-full flex flex-col gap-2 justify-between items-center'>
                <button className='bg-white w-full py-1 border border-primary-border rounded-lg hover:bg-gray-200 cursor-pointer shadow-2xs transition-all duration-150'>Continue With Google</button>
                <button className='bg-white w-full py-1 border border-primary-border rounded-lg hover:bg-gray-200 cursor-pointerr shadow-2xs transition-all duration-150 cursor-pointer'>Continue With GitHub</button>
            </div>

            <span className='text-xl text-primary-text mx-auto'>OR</span>

            <div className='w-full flex flex-col gap-2 justify-between items-center pb-4'>
                <span className='text-sm'>Already have an account? 
                    <Link href={'/login'} className='text-blue-600 hover:underline'>Login</Link>
                </span>
            </div>
        </div>
    </section>
    </>
  )
}

export default SignUpPage