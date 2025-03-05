'use client'
import React from "react";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";

// API
import { ForgotPasswordAPI } from "../api/userAPI";

const ForgotPasswordPage = () => {
    const [fetcingError, setFetcingError] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [isSent, setIsSent] = useState<boolean>(false)

    const {mutateAsync: ForgotPassword, isPending} = useMutation({
        mutationFn: ForgotPasswordAPI,
        onSuccess: (data) => {
            if(!data.ok){
                setFetcingError(data.message)
                setIsSent(false)
                return;
            }
            setFetcingError('')
            setIsSent(true)
        },
        onError: (error) => {
            setFetcingError("Something went wrong. Try again later")
        }
    })

    const HandleForgotPassword = async () => {
        if(!email){
            setFetcingError('Email is required')
            return;
        }
        setFetcingError('')
        await ForgotPassword({email})
    }

  return (
    <section className="w-full h-[100vh] flex items-center justify-center">
      <div className="w-[28vw] h-fit py-4 rounded-lg border border-primary-border flex flex-col items-start justify-center px-5 select-none gap-3 shadow-sm" onKeyDown={async (e)=>{
        if(e.key == 'Enter'){
            await HandleForgotPassword()
        }
      }}>
        <h2 className="font-semibold text-xl">Forgot Password</h2>

        {fetcingError && <span className="text-red-500 text-sm mx-auto">{fetcingError}</span>}

        <input type="text" placeholder="Email" className="w-full outline-none border border-primary-border py-1 text-lg px-3 rounded-lg shadow-xs" value={email} onChange={(e)=>{
            setEmail(e.target.value)
        }}/>

        <button className={`w-full py-2 rounded-lg hover:bg-black-btn-hover text-white cursor-pointer ${isPending?'bg-black-btn-hover cursor-not-allowed': 'bg-black'}`} onClick={async ()=>{
            await HandleForgotPassword()
        }}>{isPending?'Sending...':'Send Reset Password Link'}</button>

        <p>{isSent?'Rest Password link sent to your email succesfully':'We will send you a reset password link to your email. Check your spam folder or inbox.'}</p>

        <span className="text-red-500">Note: Link will be expired in 2 minute</span>
      </div>
    </section>
  );
};

export default ForgotPasswordPage;
