"use client";

import { useState, useEffect } from "react";
import Navbarsub from "../navbarsub/page";
import dynamic from 'next/dynamic';

// Carrega o componente Map apenas no lado do cliente
const Map = dynamic(() => import('../map'), {
  ssr: false,
});

export default function CreateEvent() {
  const [userId, setUserId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    date: "",
    time: "",
    location: "",
    userId: "",
  });

  const [participants, setParticipants] = useState<string[]>([]);
  const [newParticipant, setNewParticipant] = useState("");

  useEffect(() => {
    // Garante que só roda no cliente
    if (typeof window !== 'undefined') {
      const id = localStorage.getItem("id");
      setUserId(id);
      setFormData(prev => ({ ...prev, userId: id || "" }));
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddParticipant = () => {
    if (newParticipant.trim() !== "") {
      setParticipants([...participants, newParticipant.trim()]);
      setNewParticipant("");
    }
  };

  const handleRemoveParticipant = (index: number) => {
    setParticipants(participants.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Modo demo - salva no localStorage
    const mockEvent = {
      ...formData,
      participants,
      id: "event-" + Math.random().toString(36).substring(2, 9),
      createdAt: new Date().toISOString()
    };

    const savedEvents = JSON.parse(localStorage.getItem("mockEvents") || "[]");
    localStorage.setItem("mockEvents", JSON.stringify([...savedEvents, mockEvent]));

    alert(`Evento "${mockEvent.name}" criado com sucesso! (Modo demo)\n\nParticipantes: ${participants.join(", ") || "Nenhum"}`);
    
    // Limpa o formulário
    setFormData({
      name: "",
      description: "",
      date: "",
      time: "",
      location: "",
      userId: userId || "",
    });
    setParticipants([]);
  };

  const setDefaultLocation = () => {
    setFormData({
      ...formData,
      location: "IFMA - Instituto Federal do Maranhão - Timon,MA",
    });
  };

  return (
    <div className="h-screen bg-slate-100 flex flex-col items-center">
      <Navbarsub />
      <div className="w-full max-w-2xl bg-white p-6 mt-20 shadow-lg rounded-xl">
        <h2 className="text-3xl font-semibold text-center mb-6">Criar Evento</h2>
        
        {/* Aviso de modo demo */}
        <div className="mb-4 p-3 bg-yellow-50 text-yellow-800 rounded-md">
          <p className="text-sm">
            ⚠️ <strong>Modo demonstração:</strong> Os dados são salvos apenas localmente.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Título</label>
            <input
              type="text"
              name="name"
              className="w-full px-4 py-2 border rounded-md"
              required
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Descrição</label>
            <textarea
              name="description"
              className="w-full h-32 border rounded-md p-2"
              value={formData.description}
              onChange={handleChange}
            />
          </div>

          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700">Data</label>
              <input
                type="date"
                name="date"
                className="w-full px-4 py-2 border rounded-md"
                required
                value={formData.date}
                onChange={handleChange}
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700">Hora</label>
              <input
                type="time"
                name="time"
                className="w-full px-4 py-2 border rounded-md"
                required
                value={formData.time}
                onChange={handleChange}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Localização</label>
            <input
              type="text"
              name="location"
              className="w-full px-4 py-2 border rounded-md"
              required
              value={formData.location}
              onChange={handleChange}
            />
            <button
              type="button"
              onClick={setDefaultLocation}
              className="mt-2 text-blue-500 hover:text-blue-700 text-sm"
            >
              Usar Local Padrão
            </button>
          </div>

          <div>
            <Map address={formData.location} />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Participantes</label>
            <div className="flex gap-2 mt-1">
              <input
                type="text"
                className="flex-1 px-4 py-2 border rounded-md"
                placeholder="E-mail, telefone ou ID"
                value={newParticipant}
                onChange={(e) => setNewParticipant(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleAddParticipant()}
              />
              <button
                type="button"
                onClick={handleAddParticipant}
                className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
              >
                Adicionar
              </button>
            </div>
            <ul className="mt-2 space-y-1">
              {participants.map((participant, index) => (
                <li key={index} className="flex justify-between items-center bg-gray-100 px-3 py-2 rounded-md">
                  <span>{participant}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveParticipant(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Remover
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-customRed to-customOrange text-white p-2 rounded-lg shadow-md hover:from-customPurple hover:to-customRed transition-colors mt-4"
          >
            Criar Evento
          </button>
        </form>
      </div>
    </div>
  );
}