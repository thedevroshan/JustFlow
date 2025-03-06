import Image from "next/image";
import Link from "next/link";


export default function Home() {
  return (
    <>
    <nav className="w-[100vw] h-[8vh] shadow-sm flex items-center px-4 justify-between border border-secondary-border">


      <span className="text-xl font-semibold">NexFlow</span>

      <div className="flex items-centers gap-3 justify-between">
        <Link href={'/signup'} className="bg-transparent px-7 py-1 rounded-lg hover:bg-transparent-btn-hover transition-all duration-200">Sign Up</Link>
        <Link href={'/login'} className="bg-black text-white px-7 py-1 rounded-lg hover:bg-black-btn-hover transition-all duration-200">Login</Link>
      </div>
    </nav>
    </>
  );
}
