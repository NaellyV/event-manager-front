

import Inicio from "@/image/page";
import Navbar from "./navbar/page";

export const metadata = {
  title: "Gerenciador de eventos",
};

export default function Home() {
  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <div className="flex flex-col md:flex-row justify-center items-center min-h-screen p-6 gap-8">
        <div className="text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-bold text-orange-600 mb-2">
            Easy <span className="block md:inline">Event</span>
          </h1>
          <p className="text-lg text-gray-600">Soluções simples para seus eventos</p>
        </div>
        <div className="p-4 rounded-xl">
          <Inicio />
        </div>
      </div>
    </div>
  );
}