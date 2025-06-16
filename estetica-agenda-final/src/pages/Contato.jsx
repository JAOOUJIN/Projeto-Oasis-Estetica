import React, { useState } from 'react';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaWhatsapp, FaStoreAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';

// CADA UNIDADE DEVE TER SUA PRÓPRIA 'mapaEmbedUrl' GERADA NO GOOGLE MAPS.
const unidades = [
  {
    id: 'pinheiros',
    nome: 'Oásis Estética - Pinheiros',
    endereco: 'R. Teodoro Sampaio, 1449 - Pinheiros, São Paulo - SP, 05405-150',
    telefone: '(11) 3061-0075',
    whatsapp: '(11) 99667-9717',
    email: 'contato.pinheiros@oasisestetica.com',
    horario: { segSex: '09:00 - 18:00', sab: 'Fechado', dom: 'Fechado' },
    mapaEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7314.403007676125!2d-46.68579052401469!3d-23.561205378799908!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce579c68a96d1d%3A0x6f7c4724842a67cf!2sR.%20Teodoro%20Sampaio%2C%201449%20-%20Pinheiros%2C%20S%C3%A3o%20Paulo%20-%20SP%2C%2005405-150!5e0!3m2!1spt-BR!2sbr!4v1749133275876!5m2!1spt-BR!2sbr"
  },
  {
    id: 'centro',
    nome: 'Oásis Estética - Centro',
    endereco: 'Praça Dr. João Mendes, 42 - Centro Histórico de São Paulo, São Paulo - SP, 01001-000',
    telefone: '(11) 2283-2509',
    whatsapp: '(11) 91679-7428',
    email: 'contato.centro@oasisestetica.com',
    horario: { segSex: '09:00 - 18:00', sab: 'Fechado', dom: 'Fechado' },
    mapaEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7314.947610568875!2d-46.63817452391458!3d-23.551420861228625!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce59abba3225e7%3A0x41f754812e221725!2sPra%C3%A7a%20Dr.%20Jo%C3%A3o%20Mendes%2C%2042%20-%20Centro%20Hist%C3%B3rico%20de%20S%C3%A3o%20Paulo%2C%20S%C3%A3o%20Paulo%20-%20SP%2C%2001001-000!5e0!3m2!1spt-BR!2sbr!4v1749132329534!5m2!1spt-BR!2sbr"
  },
  {
    id: 'consolacao',
    nome: 'Oásis Estética - Consolação',
    endereco: 'R. Augusta, 1279 - Consolação, São Paulo - SP, 01305-100',
    telefone: '(11) 3476-2319',
    whatsapp: '(11) 54771-6893',
    email: 'contato.consolacao@oasisestetica.com',
    horario: { segSex: '09:00 - 18:00', sab: 'Fechado', dom: 'Fechado' },
    mapaEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1828.6803069216032!2d-46.6579840092649!3d-23.55548859721184!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce58334650d6a7%3A0x7a84f2bf168f59ee!2sR.%20Augusta%2C%201279%20-%20Consola%C3%A7%C3%A3o%2C%20S%C3%A3o%20Paulo%20-%20SP%2C%2001305-100!5e0!3m2!1spt-BR!2sbr!4v1749134176490!5m2!1spt-BR!2sbr"
  },
];

// Componente principal da página de Contato.
const Contato = () => {
  const [selectedUnit, setSelectedUnit] = useState(unidades[0]);

  // Função para mudar a unidade selecionada quando o usuário clica em um card.
  const handleUnitChange = (unitId) => {
    const unit = unidades.find(u => u.id === unitId);
    if (unit) {
      setSelectedUnit(unit);
    }
  };

  return (
    <div className="py-16 px-6 max-w-7xl mx-auto text-gray-800">
      <h1 className="text-4xl md:text-5xl font-bold text-center text-purple-700 mb-12">
        Encontre a Oásis Estética mais perto de você!
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16 bg-white p-8 rounded-2xl shadow-xl">

        {/* Seletor de Unidades e Detalhes */}
        <div>
          {/* Lista de Unidades cards */}
          <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
            {unidades.map(unit => (
              <div
                key={unit.id}
                className={`p-4 border rounded-lg cursor-pointer transition duration-200 ${selectedUnit.id === unit.id ? 'bg-purple-100 border-purple-500 shadow-md' : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                  }`}
                onClick={() => handleUnitChange(unit.id)}
              >
                <h3 className="text-xl font-semibold text-purple-700 mb-2 flex items-center">
                  <FaStoreAlt className="text-purple-600 text-lg mr-2" /> {unit.nome}
                </h3>
                <p className="flex items-center gap-2 text-gray-600 text-sm">
                  <FaMapMarkerAlt className="text-purple-500" /> {unit.endereco}
                </p>
                <p className="flex items-center gap-2 text-gray-600 text-sm">
                  <FaPhone className="text-purple-500" /> {unit.telefone}
                </p>
                <p className="flex items-center gap-2 text-gray-600 text-sm">
                  <FaWhatsapp className="text-purple-500" /> {unit.whatsapp}
                </p>
                <p className="flex items-center gap-2 text-gray-600 text-sm">
                  <FaEnvelope className="text-purple-500" /> {unit.email}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative overflow-hidden rounded-2xl bg-purple-800 p-4">
          <div className="flex items-center text-white text-xl font-bold mb-4">
            <FaStoreAlt className="mr-2" /> {selectedUnit.nome}
          </div>
          <div className="relative overflow-hidden rounded-lg shadow-inner h-[450px]">
            <iframe
              src={selectedUnit.mapaEmbedUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title={`Localização da unidade ${selectedUnit.nome}`}
              className="absolute inset-0 w-full h-full rounded-lg"
            ></iframe>
          </div>
        </div>
      </div>

      {/* Call to Action Final */}
      <div className="text-center bg-purple-600 text-white p-8 rounded-lg shadow-xl mt-16">
        <h2 className="text-3xl font-bold mb-4">Pronto para Sua Transformação?</h2>
        <p className="text-lg mb-6">
          Agende sua avaliação em uma de nossas unidades!
        </p>
        <Link
          to="/agendamento"
          className="inline-block bg-white hover:bg-gray-100 transition text-purple-600 px-8 py-4 rounded-full font-semibold text-xl"
        >
          Agendar uma Avaliação
        </Link>
      </div>
    </div>
  );
};

export default Contato;