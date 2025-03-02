'use client';
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface NavLink {
    name: string
    href: string
    inActiveIcon: string
    activeIcon: string
}

const Navbar = () => {
    const currentPathname = usePathname()

    const navLinks: NavLink[] = [
        {
            name: 'Home',
            href: '/home',
            inActiveIcon: '/home-outline-icon.png',
            activeIcon: '/home-icon.png'
        },            
        {
            name: 'Team',
            href: '/team',
            inActiveIcon: '/team-outline-icon.png',
            activeIcon: '/team-icon.png'
        },            
        {
            name: 'Archive',
            href: '/archive',
            inActiveIcon: '/archive-outline-icon.png',
            activeIcon: '/archive-icon.png'
        },            
        {
            name: 'Trash',
            href: '/trash',
            inActiveIcon: '/trash-outline-icon.png',
            activeIcon: '/trash-icon.png'
        },            
        {
            name: 'Setting',
            href: '/setting',
            inActiveIcon: '/setting-outline-icon.png',
            activeIcon: '/setting-icon.png'
        },                       
    ]

  return (
    <nav className={`w-14 h-[100vh] flex-col items-center justify-start gap-6 border-r-2 border-primary-border bg-background py-2 px-1 ${currentPathname == '/' || currentPathname == '/login' || currentPathname == '/signup' ? 'hidden' : 'flex'}`}>
        <Image
            src='/user-icon.png'
            alt='Profile Icon'
            width={40}
            height={40}
        />

        <div className='flex flex-col gap-4'>
            {navLinks.map(link => (
                <Link href={link.href} key={link.name}>
                    <Image
                        src={currentPathname === link.href ? link.activeIcon : link.inActiveIcon}
                        alt={link.name}
                        width={28}
                        height={28}
                        className={`${currentPathname === link.href?'scale-115':'scale-100'} transition-all duration-300`}
                    />
                </Link>
            ))}            
        </div>
    </nav>
  )
}

export default Navbar