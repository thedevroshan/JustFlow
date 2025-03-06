'use client'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useMutation } from '@tanstack/react-query'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

// API
import { ResetPasswordAPI } from '../api/userAPI'

const ResetPasswordPage = () => {
  interface IResetPassword {
    isSame: boolean;
    hasEightCharacters: boolean;
    hasUpperCase: boolean;
    hasLowerCase: boolean;
    hasNumber: boolean;
    hasSpecialCharacter: boolean;
  }


  const searchParams = useSearchParams()
  
  const [password, setPassword] = useState<string>('')
  const [confirmPassword, setConfirmPassword] = useState<string>('')
  const [showPassword, setShowPassword] = useState<string>('password')
  const [checkParameter, setCheckParameter] = useState<IResetPassword>()
  const [shouldProceed, setShouldProceed] = useState<boolean>(false)
  const [fetchingError, setFetchingError] = useState<string>('')
  const [isReset, setIsReset] = useState<boolean>(false)

  const CheckParameter = () => {
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecialCharacter = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password);
    const hasEightCharacters = password.length >= 8;
    const isSame = password === confirmPassword && password != '' && confirmPassword != '';
  
    const allValid = hasUpperCase && hasLowerCase && hasNumber && hasSpecialCharacter && hasEightCharacters && isSame;
  
    setCheckParameter({
      hasUpperCase,
      hasLowerCase,
      hasNumber,
      hasSpecialCharacter,
      hasEightCharacters,
      isSame,
    });
  
    setShouldProceed(allValid);
  };
  

  useEffect(() => {
    CheckParameter()
    return () => {
    }
  }, [password, confirmPassword])


  const {mutateAsync: ResetPassword, isPending} = useMutation({
    mutationFn: ResetPasswordAPI,
    onSuccess: (data) => {
      if(!data.ok){
        setFetchingError(data.message);
        return;
      }
      setFetchingError('')
      setIsReset(true)
    },
    onError: (error) => {
      setFetchingError('Something went wrong. Try again later.')
    }
  })

  const HandleResetPassword = async () => {
    if(!shouldProceed){
      return;
    }
    const token:string | null = searchParams.get('token')
    if(token){
      await ResetPassword({password, confirmPassword, token})
    }
  }
  

  return (
    <>
    <section className='w-full h-[100vh] flex items-center justify-center'>
      <div className='w-[28vw] h-fit py-4 rounded-lg border border-secondary-border flex flex-col items-start justify-center px-5 select-none gap-3 shadow-sm'>
        <h2 className='text-lg font-semibold'>Reset Password</h2>

        {fetchingError && <span className='text-red-500 mx-auto text-sm'>{fetchingError}</span>}

        <input type={showPassword} placeholder='New Password' className='w-full px-2 border border-secondary-border text-lg py-1 rounded-lg outline-none shadow-xs' value={password} onChange={(e)=>{
          setPassword(e.target.value)
        }} onKeyDown={async (e)=>{
          if(e.key == 'Enter'){
            await HandleResetPassword()
          }
        }}/>
        <input type={showPassword} placeholder='Confirm Password' className='w-full px-2 border border-secondary-border text-lg py-1 rounded-lg outline-none shadow-xs' value={confirmPassword} onChange={(e)=>{
          setConfirmPassword(e.target.value)
        }} onKeyDown={async (e)=>{
          if(e.key == 'Enter'){
            await HandleResetPassword()
          }
        }}/>

        <button className='ml-auto cursor-pointer hover:text-black-btn-hover transition-all duration-150' onClick={(e:React.MouseEvent<HTMLButtonElement>)=>{
          const target = e.target as HTMLButtonElement
          showPassword === 'password' ? setShowPassword('text') : setShowPassword('password')
          showPassword === 'password' ? target.innerText = 'Hide Password' : target.innerText = 'Show Password'
        }}>Show Password</button>

        <button className='w-full py-2 bg-black text-white rounded-lg cursor-pointer hover:bg-black-btn-hover shadow-xs transition-all duration-200' onClick={async ()=>{
          await HandleResetPassword()
        }}>{isPending ? "Reseting":'Reset Password'}</button>

        <div className='flex flex-col items-start gap-1'>
          <span className={`text-sm transition-all duration-200 ${checkParameter?.isSame?'text-green-500 scale-105':'text-red-500'}`}>Password and Confirm Password must be same</span>
          <span className={`text-sm transition-all duration-200 ${checkParameter?.hasEightCharacters?'text-green-500 scale-105':'text-red-500'}`}>Password must be at least 8 characters long</span>
          <span className={`text-sm transition-all duration-200 ${checkParameter?.hasUpperCase?'text-green-500 scale-105':'text-red-500'}`}>Password must contain at least one uppercase letter</span>
          <span className={`text-sm transition-all duration-200 ${checkParameter?.hasLowerCase?'text-green-500 scale-105':'text-red-500'}`}>Password must contain at least one lowercase letter</span>
          <span className={`text-sm transition-all duration-200 ${checkParameter?.hasNumber?'text-green-500 scale-105':'text-red-500'}`}>Password must contain at least one number</span>
          <span className={`text-sm transition-all duration-200 ${checkParameter?.hasSpecialCharacter?'text-green-500 scale-105':'text-red-500'}`}>Password must contain at least one special character</span>
        </div>

        {isReset && <Link href={'/login'} className='w-full py-2 text-white hover:bg-black-btn-hover rounded-lg text-center transition-all duration-200 bg-black'>Login</Link>}
      </div>
    </section>
    </>
  )
}

export default ResetPasswordPage