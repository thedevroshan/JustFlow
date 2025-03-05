'use client'
import React from 'react'
import Link from 'next/link'
import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'

// Utils
import { ValidateSignUp, IAuthFieldError } from '../utils/ValidateAuthFields'

// API
import { SignUpAPI } from '../api/authAPI'


const SignUpPage = () => {
    const [showPassword, setShowPassword] = useState<string>('password')
    const [name, setName] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [errors, setErrors] = useState<IAuthFieldError[] | null>(null)
    const [fetchingError, setFetchingError] = useState<string>('')
    const [isSignedUp, setSignedUp] = useState<boolean>(false)

    const {mutateAsync: SignUp,isPending} = useMutation({
        mutationFn: SignUpAPI,
        onSuccess:(data) => {
            if(!data.ok){
                setFetchingError(data.message)
                setErrors(null);
                setSignedUp(false)
                return;
            }
            setErrors(null);
            setFetchingError('')
            setSignedUp(true)
            console.log(data)
        },
        onError:(error) => {
            setFetchingError('Something went wrong')
            setSignedUp(false)
        }
    })

    const HandleSignUp = async () => {
        const errors = ValidateSignUp(name,email,password)
        if(errors != null){
            setErrors(errors)
            return;
        }
        await SignUp({name,email,password})
    }


  return (
    <>
    <section className='w-[100vw] h-[100vh] flex justify-center items-center'>
        <Link href={'/'} className='absolute top-0 left-0 text-xsm pl-4 pt-3'>Back To Home</Link>

        {!isSignedUp && <div className='flex flex-col items-start justify-start gap-2 w-[70vw] sm:w-[50vw] md:w-[40vw] lg:w-[28vw] h-fit border border-primary-border bg-white rounded-lg shadow-lg px-3 py-3' onKeyDown={(e)=>{
            if(e.key === 'Enter'){
                HandleSignUp()
            }
        }}>
            <span className='text-2xl font-semibold'>Sign Up</span>

            {fetchingError && <span className='text-red-600 text-sm mx-auto'>{fetchingError}</span>}

            <input type='text' placeholder='Name' className='w-full py-1 font-medium text-lg shadow-xs border border-primary-border rounded-md px-3 outline-none' value={name} onChange={(e)=>{
                setName(e.target.value)
            }}/>
            {errors != null && errors.find(error => error.field == 'name')&& <span className='text-red-600 text-sm'>{errors.find(error => error.field == 'name')?.message}</span>}
            <input type='text' placeholder='Email' className='w-full py-1 font-medium text-lg shadow-xs border border-primary-border rounded-md px-3 outline-none'  value={email} onChange={(e)=>{
                setEmail(e.target.value)
            }}/>
            {errors != null && errors.find(error => error.field == 'email')&& <span className='text-red-600 text-sm'>{errors.find(error => error.field == 'email')?.message}</span>}
            
            <div className='w-full flex flex-col h-fit items-end justify-center'>
                <input type={showPassword} placeholder='Password' className='w-full py-1 font-medium text-lg shadow-xs border border-primary-border rounded-md px-3 select-none outline-none'  value={password} onChange={(e)=>{
                setPassword(e.target.value)
            }}/>

                {errors != null && errors.find(error => error.field == 'password')&& <span className='text-red-600 mr-auto text-sm'>{errors.find(error => error.field == 'password')?.message}</span>}

                <span className='absolute pr-2 cursor-pointer select-none' onClick={(e: React.MouseEvent<HTMLSpanElement>)=>{
                    if(showPassword === 'password'){
                        setShowPassword('text')
                        return;
                    }
                    setShowPassword('password')
                }}>{showPassword=='password'?'Show':'Hide'}</span>
            </div>
            <button className={`bg-black w-full py-2 rounded-lg hover:bg-black-btn-hover text-white cursor-pointer shadow-2xs transition-all duration-200 ${isPending?"cursor-not-allowed opacity-90":""}`} onClick={async ()=>{
                await HandleSignUp()
            }}>
                {isPending ? 'Signing Up...' : 'Sign Up'}
            </button>

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
        </div>}

        {isSignedUp && <div className='w-[70vw] h-fit sm:w-[50vw] md:w-[40vw] flex flex-col items-center gap-3 justify-center lg:w-[58vw] border border-primary-border bg-white rounded-lg shadow-lg px-3  py-12'>
            <h2 className='text-3xl'>Signed Up Successfully</h2>
            
            <p className='text-xl text-center'>We have sent you a email for verification of your account. <br/> Check your inbox or spam folder</p>

            <Link href={'/login'} className='bg-black text-white px-16 py-2 rounded-lg hover:bg-black-btn-hover'>Login</Link>
        </div>}

    </section>
    </>
  )
}

export default SignUpPage