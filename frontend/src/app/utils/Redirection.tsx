'use client'
import { useEffect } from "react"
import { useMutation } from "@tanstack/react-query"
import { usePathname } from "next/navigation"
import { useRouter } from "next/navigation"

import { IsLoggedInAPI } from "../api/userAPI"

export const Redirection = () => {
    const currentPath = usePathname()
    const router = useRouter()

    const pathsAllowedInLogoutState = ['/login', '/signup', '/']
    const pathsAllowedInBothState = ['/reset-password', '/forgot-password']

    const {mutateAsync: isLoggedIn} = useMutation({
        mutationFn: IsLoggedInAPI,
        onSuccess: (data) => {
            if(!data.ok){
                if(pathsAllowedInBothState.includes(currentPath) || pathsAllowedInLogoutState.includes(currentPath)){
                    return;
                }else {
                    currentPath != '/login'?router.push('/login'):null
                }
            }else {
                if(pathsAllowedInLogoutState.includes(currentPath)){
                    router.push('/home')
                    return;
                }
            }
        }
    })

    useEffect(() => {
        isLoggedIn()
        return () => { }
    }, [currentPath])

    return (
        <></>
    )
}