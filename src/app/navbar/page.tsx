import Link from "next/link";
import Image from "next/image";
import { LogIn, UserPlus } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="flex fixed w-full p-4 items-center justify-between bg-slate-200 shadow-xl z-50">
      <div className="flex items-center gap-2">
        <Image 
          src="/favicon.ico" 
          width={40} 
          height={40}
          alt="EasyEvent Logo"
          className="object-contain"
        />
        <h2 className="text-xl font-bold text-gray-700">EasyEvent</h2>
      </div>
      <div className="flex gap-3">
        <Link
          href="/login"
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-customRed to-customOrange text-white rounded-lg shadow-md hover:from-customPurple hover:to-customRed transition-all duration-300 hover:scale-105"
          aria-label="Login"
        >
          <LogIn size={20} /> 
          <span>Login</span>
        </Link>
        <Link
          href="/cadastro"
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-customRed to-customOrange text-white rounded-lg shadow-md hover:from-customPurple hover:to-customRed transition-all duration-300 hover:scale-105"
          aria-label="Cadastro"
        >
          <UserPlus size={20} /> 
          <span>Cadastro</span>
        </Link>
      </div>
    </nav>
  );
}