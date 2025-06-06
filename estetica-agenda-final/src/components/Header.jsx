import { Link } from "react-router-dom";
import logo from "../assets/img/logo.png";
import { FaHome } from "react-icons/fa";

function Header() {
    return (
        <header className="bg-purple-100 shadow-md sticky top-0 z-50">
            <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-center gap-x-12">
                {/* Logo */}
                <Link to="/" className="flex items-center">
                    <div className="flex items-center">
                        <img
                            src={logo}
                            alt="Logo Oásis Estética"
                            className="h-20 w-auto"
                        />
                    </div>
                </Link>

                {/* Menu de navegação */}
                <nav className="flex gap-x-6 text-sm sm:text-base font-medium text-gray-800">
                    <Link to="/" className="hover:text-purple-600 transition flex items-center">
                        <FaHome className="text-xl" />
                    </Link>
                    <Link to="/servicos" className="hover:text-purple-600 transition">
                        Serviços
                    </Link>
                    <Link to="/agendamento" className="hover:text-purple-600 transition">
                        Agendamento
                    </Link>
                    <Link to="/sobre" className="hover:text-purple-600 transition">
                        Sobre Nós
                    </Link>
                    <Link to="/contato" className="hover:text-purple-600 transition">
                        Contato
                    </Link>
                </nav>
            </div>
        </header>
    );
}

export default Header;