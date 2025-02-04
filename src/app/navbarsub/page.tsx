import Link from "next/link";
import { LogOut } from "lucide-react";

export default function Navbarsub() {
  return (
    <nav className="flex fixed w-full p-4 items-center justify-between bg-slate-200 shadow-xl">
      <div className="flex items-center gap-2">
        <img src="/favicon.ico" width={40} alt="Logo" />
        <h2 className="text-xl font-bold text-gray-700">EasyEvent</h2>
      </div>
      <div>
        <Link
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-customRed to-customOrange text-white rounded-lg shadow-md hover:from-customPurple hover:to-customRed transition-all duration-300"
          href="/"
        >
          <LogOut size={20} /> Logout
        </Link>
      </div>
    </nav>
  );
}
