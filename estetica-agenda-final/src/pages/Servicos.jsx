import React from 'react';
import { Link } from 'react-router-dom';

import imgLimpezaPele2 from '../assets/img/Limpeza-Pele2.jpg';
import imgFacial3 from '../assets/img/facial3.jpg';
import imgFacial4 from '../assets/img/facial4.jpg';
import imgFacial1 from '../assets/img/facial1.jpg';

import imgMassagem from '../assets/img/Massagem.jpg';
import imgMassagem2 from '../assets/img/massagem2.jpg';
import imgMassagem3 from '../assets/img/massagem3.jpg';
import imgMassagem4 from '../assets/img/massagem4.jpg';

import imgDepilacaoLaser from '../assets/img/Depilacao-Laser.jpg';
import imgLaser2 from '../assets/img/laser2.jpg';

import imgTratamentoCorporal from '../assets/img/Tratamento-Corporal.jpg';
import imgTratamento1 from '../assets/img/tratamento1.jpg';
import imgMassagem5 from '../assets/img/massagem5.jpg';
import imgSobrenos2 from '../assets/img/sobrenos2.jpg';

import imgDoctor1 from '../assets/img/doctor1.jpg'; 
import imgDoctor2 from '../assets/img/doctor2.jpg'; 
import imgDoctor3 from '../assets/img/doctor3.jpg'; 
import imgDoctor4 from '../assets/img/doctor4.jpg'; 


// Dados dos serviços detalhados 
const servicosDetalhes = [
    {
        nome: "Limpeza de Pele",
        descricaoCurta: "Pele renovada, limpa e radiante com nossos cuidados especializados.",
        imagem: imgLimpezaPele2, 
        tratamentos: [
            {
                id: "limpeza-profunda",
                nome: "Limpeza de Pele Profunda",
                descricao: "Remoção de cravos e espinhas, desintoxicação e hidratação para uma pele saudável.",
                imagem: imgFacial3, 
                beneficios: ["Remoção de impurezas", "Melhora da textura", "Pele mais luminosa"]
            },
            {
                id: "peeling-diamante",
                nome: "Limpeza de Pele com Peeling de Diamante",
                descricao: "Esfoliação profunda que remove células mortas, suaviza linhas finas e uniformiza o tom da pele.",
                imagem: imgFacial4, 
                beneficios: ["Redução de poros", "Estímulo de colágeno", "Pele aveludada"]
            },
            { 
                id: "hidratacao-facial",
                nome: "Hidratação Facial Revitalizante",
                descricao: "Tratamento para repor a umidade da pele, restaurar o brilho e a elasticidade, essencial para todos os tipos de pele.",
                imagem: imgFacial1, 
                beneficios: ["Pele macia e suave", "Redução de linhas finas", "Aspecto saudável"]
            },
        ]
    },
    {
        nome: "Massagem Terapêutica",
        descricaoCurta: "Alivie tensões e promova o bem-estar do corpo e da mente.",
        imagem: imgMassagem, 
        tratamentos: [
            {
                id: "massagem-relaxante",
                nome: "Massagem Relaxante",
                descricao: "Técnicas suaves que promovem relaxamento muscular profundo e alívio do estresse diário.",
                imagem: imgMassagem2, 
                beneficios: ["Redução de estresse", "Melhora do sono", "Alívio de dores leves"]
            },
            {
                id: "massagem-modeladora",
                nome: "Massagem Modeladora",
                descricao: "Manobras intensas que atuam na redução de medidas e celulite, modelando o contorno corporal.",
                imagem: imgMassagem3, 
                beneficios: ["Redução de celulite", "Melhora da circulação", "Contorno corporal"]
            },
            { 
                id: "pedras-quentes",
                nome: "Massagem com Pedras Quentes",
                descricao: "Terapia milenar que utiliza pedras vulcânicas aquecidas para um relaxamento profundo e alívio de tensões.",
                imagem: imgMassagem4, 
                beneficios: ["Alívio de dores musculares", "Melhora da energia", "Relaxamento profundo"]
            },
        ]
    },
    {
        nome: "Depilação a Laser",
        descricaoCurta: "Liberte-se dos pelos indesejados com tecnologia avançada e resultados duradouros.",
        imagem: imgDepilacaoLaser, 
        tratamentos: [
            {
                id: "laser-diodo",
                nome: "Depilação a Laser Diodo",
                descricao: "Tecnologia eficaz para remoção de pelos em diversas áreas do corpo, com segurança e conforto.",
                imagem: imgLaser2, 
                beneficios: ["Resultados duradouros", "Pele lisa", "Redução de pelos encravados"]
            },
        ]
    },
    {
        nome: "Tratamentos Corporais",
        descricaoCurta: "Cuidados especializados para o corpo que transformam e elevam sua autoestima.",
        imagem: imgTratamentoCorporal, 
        tratamentos: [
            {
                id: "drenagem-linfatica",
                nome: "Drenagem Linfática",
                descricao: "Massagem suave que estimula o sistema linfático, reduzindo inchaços e melhorando a circulação.",
                imagem: imgTratamento1, 
                beneficios: ["Redução de retenção de líquidos", "Desintoxicação", "Melhora da celulite"]
            },
            {
                id: "reducao-medidas",
                nome: "Redução de Medidas",
                descricao: "Procedimentos e tecnologias combinadas para combater a gordura localizada e modelar o corpo.",
                imagem: imgMassagem5, 
                beneficios: ["Remodelagem corporal", "Redução de gordura", "Melhora da silhueta"]
            },
            { 
                id: "esfoliacao-corporal",
                nome: "Esfoliação Corporal Renovadora",
                descricao: "Tratamento que remove células mortas, deixando a pele macia, sedosa e preparada para absorver nutrientes.",
                imagem: imgSobrenos2, 
                beneficios: ["Pele renovada", "Hidratação profunda", "Melhora da circulação"]
            },
        ]
    },
];

// Dados dos profissionais
const profissionais = [
    {
        id: "juliana",
        nome: "Dra. Juliana Silva",
        especialidade: "Dermatologista Esteticista",
        bio: "Com anos de experiência e paixão pela pele, a Dra. Juliana é especialista em tratamentos faciais avançados e limpeza de pele.",
        foto: imgDoctor3, 
        servicos: ["Limpeza de Pele"]
    },
    {
        id: "carlos",
        nome: "Carlos Mendes",
        especialidade: "Massoterapeuta Master",
        bio: "Carlos é nosso expert em massagens relaxantes e modeladoras, com técnicas que promovem o bem-estar total.",
        foto: imgDoctor4, 
        servicos: ["Massagem Terapêutica"]
    },
    {
        id: "sofia",
        nome: "Dra. Sofia Ramos",
        especialidade: "Especialista em Laser",
        bio: "Pioneira em depilação a laser, a Dra. Sofia garante resultados eficazes e seguros com a mais alta tecnologia.",
        foto: imgDoctor1, 
        servicos: ["Depilação a Laser"]
    },
    {
        id: "maria",
        nome: "Dra. Maria Oliveira",
        especialidade: "Esteticista Corporal",
        bio: "A Dra. Maria é dedicada aos tratamentos corporais, auxiliando na redução de medidas e no contorno perfeito.",
        foto: imgDoctor2, 
        servicos: ["Tratamentos Corporais"]
    },
];


const Servicos = () => {
  return (
    <div className="py-16 px-6 bg-gray-50 text-gray-800">
      {/* Banner de Introdução */}
      <div className="max-w-7xl mx-auto text-center mb-16 p-8 bg-gradient-to-r from-purple-500 to-purple-700 text-white rounded-xl shadow-lg">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Nossos Serviços Especializados</h1>
        <p className="text-lg md:text-xl">
          Descubra uma gama completa de tratamentos estéticos e terapêuticos, desenvolvidos para realçar sua beleza e bem-estar.
        </p>
      </div>

      {/* Seção de Visão Geral dos Tipos de Serviço */}
      <div className="max-w-7xl mx-auto mb-16">
        <h2 className="text-3xl font-bold text-center text-purple-700 mb-10">Explore Nossas Categorias</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {servicosDetalhes.map((categoria) => (
            <div key={categoria.nome} className="bg-white rounded-xl shadow-md overflow-hidden transform hover:scale-105 transition duration-300">
              <img src={categoria.imagem} alt={categoria.nome} className="w-full h-48 object-cover" />
              <div className="p-5">
                <h3 className="text-xl font-semibold text-purple-800 mb-2">{categoria.nome}</h3>
                <p className="text-gray-600 text-sm">{categoria.descricaoCurta}</p>
                <Link to={`#${categoria.nome.toLowerCase().replace(/\s/g, '-')}`} className="mt-4 inline-block text-purple-600 hover:underline font-medium">
                  Ver Detalhes
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Serviços Detalhados */}
      {servicosDetalhes.map((categoria) => (
        <div key={categoria.nome} id={categoria.nome.toLowerCase().replace(/\s/g, '-')} className="max-w-7xl mx-auto mb-20 pt-8">
          <h2 className="text-3xl font-bold text-center text-purple-700 mb-10">{categoria.nome}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categoria.tratamentos.map((tratamento) => (
              <div key={tratamento.id} className="bg-white rounded-xl shadow-lg overflow-hidden border border-purple-100">
                <img src={tratamento.imagem} alt={tratamento.nome} className="w-full h-56 object-cover" />
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-purple-800 mb-3">{tratamento.nome}</h3>
                  <p className="text-gray-700 mb-4">{tratamento.descricao}</p>
                  <ul className="list-disc list-inside text-gray-600 space-y-1">
                    {tratamento.beneficios.map((beneficio, i) => (
                      <li key={i} className="flex items-center">
                        <span className="text-purple-500 mr-2">✔</span> {beneficio}
                      </li>
                    ))}
                  </ul>
                  <Link to="/agendamento" className="mt-6 inline-block bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-full font-semibold transition duration-300 transform hover:scale-105 shadow-md">
                    Agendar {tratamento.nome.split(' ')[0]}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Conheça Nossos EspecialistaS */}
      <div className="max-w-7xl mx-auto mb-20 mt-20">
        <h2 className="text-3xl font-bold text-center text-purple-700 mb-10">Conheça Nossos Especialistas</h2>
        <p className="text-lg text-center text-gray-700 mb-12 max-w-3xl mx-auto">
          Nossa equipe é formada por profissionais apaixonados e dedicados, com expertise nas mais diversas áreas da estética e bem-estar.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {profissionais.map((p) => (
            <div key={p.id} className="bg-white rounded-xl shadow-lg overflow-hidden text-center border border-purple-100 transform hover:scale-105 transition duration-300">
              <img src={p.foto} alt={p.nome} className="w-full h-64 object-cover object-top" /> 
              <div className="p-6">
                <h3 className="text-xl font-bold text-purple-800 mb-2">{p.nome}</h3>
                <p className="text-purple-600 font-semibold text-sm mb-3">{p.especialidade}</p>
                <p className="text-gray-700 text-sm mb-4 line-clamp-3">{p.bio}</p> 
                <p className="text-gray-500 text-xs italic">Especialidades: {p.servicos.join(', ')}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Final */}
      <div className="max-w-4xl mx-auto text-center bg-gradient-to-r from-purple-600 to-purple-800 text-white p-10 rounded-xl shadow-2xl">
        <h2 className="text-3xl font-bold mb-4">Pronta para Cuidar de Você?</h2>
        <p className="text-lg mb-6">
          Agende sua consulta e dê o primeiro passo para uma experiência de bem-estar inesquecível.
        </p>
        <Link
          to="/agendamento"
          className="inline-block bg-white hover:bg-gray-100 transition text-purple-700 px-8 py-4 rounded-full font-semibold text-xl transform hover:scale-105 shadow-lg"
        >
          Agende seu Horário
        </Link>
      </div>
    </div>
  );
};

export default Servicos;