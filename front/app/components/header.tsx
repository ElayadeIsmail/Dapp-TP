import { Book, Home } from "lucide-react";
import { NavLink } from "react-router";
import { Link } from "react-router";

export default function Header() {
  return (
    <header className="bg-indigo-900 text-white py-8 px-6 md:px-12">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">
          Projet de Fin de Module
        </h1>

        <h2 className="text-xl md:text-2xl font-semibold mb-2">
          Développement d'une dApp pour le TP 3
        </h2>
        <div className="flex items-center space-x-2 text-indigo-200">
          <Book size={18} />
          <span className="text-lg">Solidity, Truffle et ReactJS</span>
        </div>
      </div>
    </header>
  );
}
