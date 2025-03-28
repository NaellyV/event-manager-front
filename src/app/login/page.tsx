"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface LoginForm {
  email: string;
  password: string; 
}

const Login = () => {
  const [formData, setFormData] = useState<LoginForm>({
    email: "",
    password: "",
  });
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  
  useEffect(()=>{
    const token = localStorage.getItem("token");
    const id = localStorage.getItem("id");


  },[router])
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
  
    const MOCK_EMAIL = "demo@teste.com";
    const MOCK_PASSWORD = "123456";
    const MOCK_USER_ID = "user-123";
  
    if (formData.email === MOCK_EMAIL && formData.password === MOCK_PASSWORD) {
      localStorage.setItem("id", MOCK_USER_ID);
      localStorage.setItem("token", "fake-jwt-token");
      router.push("/dashboard");
    } else {
      setError("Credenciais inválidas. Use: demo@teste.com / 123456");
    }
  };

  return (
    
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="p-8 bg-white rounded-xl shadow-xl w-96">
      <p className="text-sm text-gray-600 mb-4 ">
  🔹 Para teste, use: <strong>demo@teste.com</strong> / <strong>123456</strong>
</p>
        <h2 className="text-2xl font-bold text-center mb-4">Login</h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Senha
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full p-2 bg-gradient-to-r from-customRed to-customOrange text-white rounded-lg shadow-md hover:from-customPurple hover:to-customRed"
          >
            Entrar
          </button>
        </form>
        <div className="mt-4 text-center">
          <p>
            Não tem uma conta?{" "}
            <Link href="/cadastro" className="text-blue-500 hover:underline">
              Cadastre-se
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
