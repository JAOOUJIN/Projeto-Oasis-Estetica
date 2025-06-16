import { Link } from "react-router-dom";

// Importa as imagens utilizadas nas diferentes seções da página.
import heroImg from "../assets/img/Limpeza-Pele.jpg";
import limpezaImg from "../assets/img/Limpeza-Pele2.jpg";
import massagemImg from "../assets/img/Massagem.jpg";
import depilacaoImg from "../assets/img/Depilacao-Laser.jpg";
import tratamentosImg from "../assets/img/Tratamento-Corporal.jpg";
import sobreImg from "../assets/img/sobrenos3.jpg";
import locationImg from "../assets/img/Espaco.jpg";


// Dados estáticos dos serviços exibidos na seção "Nossos Serviços".
const servicos = [
  {
    title: "Limpeza de Pele",
    img: limpezaImg,
    description: "Remove impurezas e células mortas, deixando sua pele renovada, saudável e com brilho natural.",
  },
  {
    title: "Massagem Relaxante",
    img: massagemImg,
    description: "Relaxe corpo e mente com nossas massagens que reduzem o estresse e aliviam tensões.",
  },
  {
    title: "Depilação a Laser",
    img: depilacaoImg,
    description: "Acabe com os pelos indesejados de forma eficaz e duradoura com tecnologia de ponta.",
  },
  {
    title: "Tratamentos Corporais",
    img: tratamentosImg,
    description: "Melhore sua autoestima com tratamentos que cuidam do seu corpo e realçam sua beleza.",
  },
];

// Componente principal da página Home.
const Home = () => {
  return (
    <section className="text-gray-800">
      {/* Seção HERO (Banner Principal) */}
      <div
        className="w-full h-[500px] bg-cover bg-center flex items-center justify-center text-white"
        style={{ backgroundImage: `url(${heroImg})` }}
      >
        <div className="text-center px-4">
          <h1 className="text-4xl md:text-5xl font-bold drop-shadow-lg">
            Bem-vindo ao Oásis Estética
          </h1>
          <p className="mt-4 text-lg md:text-xl max-w-xl mx-auto">
            Cuide da sua beleza e bem-estar com nossos serviços especializados.
          </p>
          {/* Botão CTA que leva para a página de Agendamento. */}
          <Link
            to="/agendamento"
            className="mt-6 inline-block bg-purple-600 hover:bg-purple-700 transition text-white px-6 py-3 rounded-full font-semibold"
          >
            Agendar Consulta
          </Link>
        </div>
      </div>

      {/* Seção "Nossos Serviços" (Visão Geral) */}
      {/* Apresenta os principais serviços da clínica em cards, com imagem, título e descrição. */}
      <div className="py-16 px-6 max-w-7xl mx-auto text-center bg-white shadow-xl rounded-lg -mt-20 relative z-10">
        <h2 className="text-3xl font-bold text-purple-700 mb-10">Nossos Serviços</h2>
        {/* Grid de cards de serviço, responsivo para diferentes tamanhos de tela. */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {servicos.map((s, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transform hover:-translate-y-1 transition duration-300"
            >
              <img src={s.img} alt={s.title} className="h-64 w-full object-cover" />
              <div className="p-6 text-left">
                <h3 className="text-xl font-semibold text-purple-700 mb-2">{s.title}</h3>
                <p className="text-sm text-gray-600">{s.description}</p>
              </div>
            </div>
          ))}
        </div>
        {/* Link para a página completa de Serviços. */}
        <Link
          to="/servicos"
          className="mt-10 inline-block text-purple-600 hover:underline font-medium"
        >
          Ver todos os serviços
        </Link>
      </div>

      {/* Seção "Quem Somos" */}
      {/* Apresenta uma breve introdução sobre a clínica com imagem e texto, e um link para a página completa "Sobre Nós". */}
      <div className="py-16 px-6 max-w-7xl mx-auto text-center bg-gray-50 rounded-lg shadow-lg my-12">
        <h2 className="text-3xl font-bold text-purple-700 mb-10">Quem Somos</h2>
        {/* Layout flexível de imagem e texto (coluna em mobile, linha em desktop). */}
        <div className="flex flex-col md:flex-row items-center gap-10">
          <div className="md:w-1/2">
            <img
              src={sobreImg}
              alt="Sobre Oásis Estética"
              className="rounded-lg shadow-md w-full h-auto object-cover"
            />
          </div>
          <div className="md:w-1/2 text-left">
            <p className="text-lg mb-4">
              No Oásis Estética, acreditamos que a verdadeira beleza vem do bem-estar.
              Nosso espaço foi criado para ser um refúgio de tranquilidade e renovação,
              onde cada tratamento é uma jornada personalizada para realçar sua essência.
            </p>
            <p className="text-md mb-6">
              Com uma equipe de profissionais altamente qualificados e as mais recentes tecnologias,
              oferecemos um ambiente acolhedor e seguro para todos os seus cuidados de pele e corpo.
              Descubra o oásis que existe em você!
            </p>
            {/* Botão para saber mais na página "Sobre Nós". */}
            <Link
              to="/sobre"
              className="inline-block bg-purple-600 hover:bg-purple-700 transition text-white px-6 py-3 rounded-full font-semibold"
            >
              Saiba Mais Sobre Nós
            </Link>
          </div>
        </div>
      </div>

      {/* Seção "Encontre a Oásis Estética" (Contato Rápido) */}
      {/* Convida o usuário a encontrar a clínica, com imagem e link para a página de Contato. */}
      <div className="py-16 px-6 max-w-7xl mx-auto text-center bg-white rounded-lg shadow-lg my-12">
        <h2 className="text-3xl font-bold text-purple-700 mb-10">Encontre a Oásis Estética</h2>
        <div className="flex flex-col md:flex-row items-center gap-10">
          <div className="w-full md:w-1/2">
            <img
              src={locationImg}
              alt="Localização Oásis Estética"
              className="rounded-lg shadow-md w-full h-[350px] object-cover transition duration-300 hover:scale-105"
            />
          </div>
          <div className="w-full md:w-1/2 text-left">
            <p className="text-lg mb-4">
              Estamos localizados no coração da cidade, prontos para oferecer a você uma experiência de beleza e bem-estar inesquecível.
            </p>
            <p className="text-md mb-6">
              Venha nos visitar ou agende sua consulta online. Sua transformação começa aqui!
            </p>
            {/* Link para a página de Contato. */}
            <Link
              to="/contato"
              className="inline-block bg-purple-600 hover:bg-purple-700 transition text-white px-6 py-3 rounded-full font-semibold"
            >
              Ver no Mapa e Fale Conosco
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;