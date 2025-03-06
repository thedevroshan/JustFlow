"use client";
import React from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

interface NavbarItem {
  name: string;
  icon: string;
  href: string;
  activeIcon: string;
}

const Navbar = () => {
  const currentPath = usePathname();

  const navbarNotAllowedInPahts = [
    "/login",
    "/signup",
    "/",
    "/forgot-password",
    "/reset-password",
  ];

  const navbarItems: NavbarItem[]  = [
    {
      name: "Home",
      icon: "/home-outline-icon.png",
      href: "/home",
      activeIcon: "/home-icon.png",
    },
    {
      name: "Team",
      icon: "/team-outline-icon.png",
      href: "/team",
      activeIcon: "/team-icon.png",
    },
    {
      name: "Archive",
      icon: "/archive-outline-icon.png",
      href: "/archive",
      activeIcon: "/archive-icon.png",
    },
    {
      name: "Trash",
      icon: "/trash-outline-icon.png",
      href: "/trash",
      activeIcon: "/trash-icon.png",
    },
    {
      name: "Settings",
      icon: "/settings-outline-icon.png",
      href: "/settings",
      activeIcon: "/settings-icon.png",
    },
  ];

  return (
    <nav
      className={`flex-col items-center justify-start py-2 gap-4 bg-black w-[4vw] h-[100vh] border-r border-primary-border ${
        navbarNotAllowedInPahts.includes(currentPath) ? "hidden" : "flex"
      }`}
    >
      <Image src="/user-icon.png" alt="Profile Pic" width={45} height={45} className="cursor-pointer"/>

      <div className="flex flex-col items-center justify-start gap-4">
        {navbarItems.map((item) => (
          <Link href={item.href} key={item.name}>
            <Image src={currentPath === item.href ? item.activeIcon : item.icon} alt={item.name} width={30} height={30} className={`cursor-pointer ${currentPath === item.href ? "scale-110" : ""} transition-all duration-200`}/>
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
