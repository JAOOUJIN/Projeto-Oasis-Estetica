import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaInstagram, FaFacebookF, FaWhatsapp } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import logo from '../assets/img/logo.png';

const Footer = () => (
    <footer className="bg-purple-100 text-gray-700 py-10 px-6 mt-12 shadow-inner">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
            <div className="flex flex-col items-center md:items-start text-center md:text-left">
                <Link to="/" className="mb-4">
                    <img src={logo} alt="Logo Oásis Estética" className="h-24 w-auto" />
                </Link>
                <p className="text-sm">
                    Sua jornada para a beleza e bem-estar começa aqui. Conheça nossos tratamentos especializados.
                </p>
            </div>

            {/* Links Rápidos */}
            <div className="text-center md:text-left">
                <h3 className="text-lg font-semibold text-purple-800 mb-4">Links Rápidos</h3>
                <ul className="space-y-2">
                    <li><Link to="/" className="hover:text-purple-600 transition">Início</Link></li>
                    <li><Link to="/servicos" className="hover:text-purple-600 transition">Serviços</Link></li>
                    <li><Link to="/agendamento" className="hover:text-purple-600 transition">Agendamento</Link></li>
                    <li><Link to="/sobre" className="hover:text-purple-600 transition">Sobre Nós</Link></li>
                    <li><Link to="/contato" className="hover:text-purple-600 transition">Contato</Link></li>
                </ul>
            </div>

            {/* Contato */}
            <div className="text-center md:text-left">
                <h3 className="text-lg font-semibold text-purple-800 mb-4">Contato</h3>
                <address className="not-italic space-y-2">
                    <p className="flex items-center justify-center md:justify-start gap-2">
                        <FaMapMarkerAlt className="text-purple-600 text-lg" /> Rua Teodoro Sampaio, 1449 - São Paulo, SP
                    </p>
                    <p className="flex items-center justify-center md:justify-start gap-2">
                        <FaPhone className="text-purple-600 text-lg" /> (11) 99667-9717
                    </p>
                    <p className="flex items-center justify-center md:justify-start gap-2">
                        <FaEnvelope className="text-purple-600 text-lg" /> contato@oasisestetica.com
                    </p>
                    <p className="flex items-center justify-center md:justify-start gap-2">
                        <FaWhatsapp className="text-purple-600 text-lg" /> (11) 99667-9717
                    </p>
                </address>
            </div>

            {/* Redes Sociais e Horário */}
            <div className="text-center md:text-left">
                <h3 className="text-lg font-semibold text-purple-800 mb-4">Siga-nos</h3>
                <div className="flex justify-center md:justify-start space-x-4 mb-6">
                    <a href="https://www.instagram.com/seungjin_c/" target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:text-purple-800 transition">
                        <FaInstagram className="text-3xl" />
                    </a>
                    <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:text-purple-800 transition">
                        <FaFacebookF className="text-3xl" />
                    </a>
                    <a href="https://wa.me/11996679717" target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:text-purple-800 transition">
                        <FaWhatsapp className="text-3xl" />
                    </a>
                </div>

                <h3 className="text-lg font-semibold text-purple-800 mb-4">Horário de Funcionamento</h3>
                <p className="text-sm">Seg - Sex: 09:00 - 18:00</p>
                <p className="text-sm">Sáb: Fechado</p>
                <p className="text-sm">Dom: Fechado</p>
            </div>
        </div>

        {/* Linha de Copyright */}
        <div className="border-t border-purple-300 mt-10 pt-6 text-center text-sm text-gray-600">
            <p>&copy; {new Date().getFullYear()} Oásis Estética. Todos os direitos reservados.</p>
        </div>
    </footer>
);

export default Footer;