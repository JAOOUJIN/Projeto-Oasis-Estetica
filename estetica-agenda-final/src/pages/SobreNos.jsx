import { Link } from "react-router-dom";
import clinicInterior from "../assets/img/Espaco.jpg";
import teamPhoto from "../assets/img/team3.jpg";  

const SobreNos = () => {
  return (
    <div className="py-16 px-6 max-w-7xl mx-auto text-gray-800">
      {/* Título Principal */}
      <h1 className="text-4xl md:text-5xl font-bold text-center text-purple-700 mb-12">
        Nossa História e Compromisso
      </h1>

      {/* Quem Somos e Nossa Filosofia */}
      <div className="flex flex-col md:flex-row items-center gap-10 mb-16 bg-white p-8 rounded-lg shadow-md">
        <div className="md:w-1/2">
          <img 
            src={clinicInterior} 
            alt="Interior da Clínica Oásis Estética" 
            className="rounded-lg shadow-md w-full h-auto object-cover" 
          />
        </div>
        <div className="md:w-1/2 text-left">
          <h2 className="text-3xl font-semibold text-purple-700 mb-4">
            Transformando Sonhos em Realidade
          </h2>
          <p className="text-lg mb-4">
            Fundada em 2025, a Oásis Estética nasceu com a missão de oferecer um santuário de beleza
            e bem-estar, onde cada cliente é tratado com cuidado, respeito e profissionalismo.
            Acreditamos que a estética vai além da aparência; é sobre autoconfiança e saúde integral.
          </p>
          <p className="text-md mb-4">
            Nosso compromisso é com a excelência em cada detalhe, desde o ambiente acolhedor
            até a tecnologia de ponta e a expertise de nossa equipe. Estamos em constante
            atualização para trazer a você os melhores e mais inovadores tratamentos.
          </p>
        </div>
      </div>

      {/* Missão, Visão e Valores */}
      <div className="mb-16 text-center">
        <h2 className="text-3xl font-semibold text-purple-700 mb-8">Nossa Missão, Visão e Valores</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-purple-800 mb-3">Missão</h3>
            <p className="text-sm">
              Proporcionar experiências de beleza e bem-estar que elevem a autoestima, utilizando
              técnicas e produtos de alta qualidade, em um ambiente seguro e acolhedor.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-purple-800 mb-3">Visão</h3>
            <p className="text-sm">
              Ser referência em estética e bem-estar na região, reconhecida pela excelência
              dos serviços e pela satisfação dos nossos clientes.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-purple-800 mb-3">Valores</h3>
            <ul className="list-disc list-inside text-sm text-left mx-auto max-w-fit">
              <li>Excelência e Qualidade</li>
              <li>Ética e Transparência</li>
              <li>Cuidado e Respeito</li>
              <li>Inovação Constante</li>
              <li>Paixão por Transformar</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Nossa Equipe */}
      <div className="mb-16 text-center">
        <h2 className="text-3xl font-semibold text-purple-700 mb-8">Conheça Nossa Equipe</h2>
        <img 
            src={teamPhoto}
            alt="Nossa Equipe Oásis Estética" 
            className="rounded-lg shadow-md w-full max-w-4xl h-[400px] object-cover mb-6 mx-auto" 
        />
        <p className="text-lg mx-auto max-w-2xl">
          Nossa equipe é formada por profissionais apaixonados e dedicados,
          prontos para oferecer o melhor atendimento e os resultados que você merece.
        </p>
      </div>
    
      {/* Call to Action */}
      <div className="text-center bg-purple-600 text-white p-8 rounded-lg shadow-xl">
        <h2 className="text-3xl font-bold mb-4">Pronto para Sua Transformação?</h2>
        <p className="text-lg mb-6">
          Agende sua avaliação e descubra como podemos realçar sua beleza.
        </p>
        <Link
          to="/agendamento"
          className="inline-block bg-white hover:bg-gray-100 transition text-purple-600 px-8 py-4 rounded-full font-semibold text-xl"
        >
          Agendar Agora
        </Link>
      </div>
    </div>
  );
};

export default SobreNos;