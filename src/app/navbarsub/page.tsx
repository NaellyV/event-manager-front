"use client";

import Link from "next/link";
import Image from "next/image";
import { LogOut, Mail } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Navbarsub() {
  const router = useRouter();

  const handleLogout = () => {
    // Only run on client side
    if (typeof window !== 'undefined') {
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      router.push("/");
    }
  };

  return (
    <nav className="flex fixed w-full p-4 items-center justify-between bg-slate-200 shadow-xl z-50">
      <Link href="/dashboard" className="flex items-center gap-2 hover:opacity-80">
        <Image 
          src="/favicon.ico" 
          width={40} 
          height={40}
          alt="EasyEvent Logo"
          className="object-contain"
          priority
        />
        <h2 className="text-xl font-bold text-gray-700">EasyEvent</h2>
      </Link>
      
      <div className="flex items-center gap-4">
        <Link
          href="/convites"
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-lg shadow-md hover:from-blue-700 hover:to-blue-500 transition-all duration-300 hover:scale-[1.03]"
          aria-label="Meus Convites"
        >
          <Mail size={20} aria-hidden="true" />
          <span>Meus Convites</span>
        </Link>
        
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-customRed to-customOrange text-white rounded-lg shadow-md hover:from-customPurple hover:to-customRed transition-all duration-300 hover:scale-[1.03]"
          aria-label="Sair"
        >
          <LogOut size={20} aria-hidden="true" />
          <span>Sair</span>
        </button>
      </div>
    </nav>
  );
}