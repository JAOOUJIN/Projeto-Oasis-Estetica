import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Agendamento from "./pages/Agendamento";
import Servicos from "./pages/Servicos";
import Contato from "./pages/Contato";
import SobreNos from "./pages/SobreNos";

import "./index.css";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 text-gray-800 flex flex-col">
        <Header />

        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/agendamento" element={<Agendamento />} />
            <Route path="/servicos" element={<Servicos />} />
            <Route path="/contato" element={<Contato />} />
            <Route path="/sobre" element={<SobreNos />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
