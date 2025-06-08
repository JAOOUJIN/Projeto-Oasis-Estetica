import React, { useState, useEffect } from "react";
import ConsultaLista from "../components/ConsultaLista"; 
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../styles/datepicker-theme.css"; 
import { Link } from "react-router-dom"; 


const servicos = [
    { nome: "Limpeza de Pele", profissional: "Dra. Juliana" },
    { nome: "Massagem", profissional: "Carlos Mendes" },
    { nome: "Depilação a Laser", profissional: "Dra. Sofia" },
    { nome: "Tratamentos Corporais", profissional: "Dra. Maria" },
];

const Agendamento = () => {
    const [consultas, setConsultas] = useState(() => {
        const armazenadas = localStorage.getItem("consultas");
        return armazenadas ? JSON.parse(armazenadas) : [];
    });

    const [mensagem, setMensagem] = useState("");
    const [erro, setErro] = useState(""); 
    
    const [editandoId, setEditandoId] = useState(null); 

    const [form, setForm] = useState({
        nomeCliente: "",
        cpf: "",
        servico: "",
        profissional: "",
        dataHora: null,
    });

    useEffect(() => {
        const armazenadas = localStorage.getItem("consultas");
        if (armazenadas) {
            const parsedConsultas = JSON.parse(armazenadas).map(consulta => ({
                ...consulta,
                dataHora: new Date(consulta.dataHora) 
            }));
            setConsultas(parsedConsultas);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("consultas", JSON.stringify(consultas));
    }, [consultas]);

    const displayMessage = (msg, type = "success") => {
        if (type === "success") {
            setMensagem(msg);
            setErro("");
        } else {
            setErro(msg);
            setMensagem("");
        }
        setTimeout(() => {
            setMensagem("");
            setErro("");
        }, 4000); 
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === "servico") {
            const servicoSelecionado = servicos.find((s) => s.nome === value);
            const profissional = servicoSelecionado ? servicoSelecionado.profissional : "";
            setForm({
                ...form,
                servico: value,
                profissional,
            });
        } else if (name === "cpf") {
            const cpfNumeros = value.replace(/\D/g, ''); 
            const cpfLimitado = cpfNumeros.substring(0, 11); 
            let cpfFormatado = cpfLimitado;

            if (cpfLimitado.length > 3) {
                cpfFormatado = cpfLimitado.substring(0, 3) + '.' + cpfLimitado.substring(3);
            }
            if (cpfLimitado.length > 6) {
                cpfFormatado = cpfLimitado.substring(0, 3) + '.' + cpfLimitado.substring(3, 6) + '.' + cpfLimitado.substring(6);
            }
            if (cpfLimitado.length > 9) {
                cpfFormatado = cpfLimitado.substring(0, 3) + '.' + cpfLimitado.substring(3, 6) + '.' + cpfLimitado.substring(6, 9) + '-' + cpfLimitado.substring(9, 11);
            }
            setForm({ ...form, [name]: cpfFormatado });
        } else {
            setForm({ ...form, [name]: value });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setMensagem(""); 
        setErro("");

        if (!form.nomeCliente || !form.cpf || !form.servico || !form.dataHora) {
            displayMessage("Por favor, preencha todos os campos obrigatórios (Nome, CPF, Serviço e Data/Hora).", "error");
            return;
        }

        const cpfLimpo = form.cpf.replace(/\D/g, '');
        if (cpfLimpo.length !== 11) {
            displayMessage("CPF inválido. Deve conter 11 dígitos numéricos.", "error");
            return;
        }

        const dataHoraSelecionada = form.dataHora.getTime(); 
        const now = new Date().getTime();

        if (dataHoraSelecionada < now) {
            displayMessage("Você não pode agendar para um horário que já passou.", "error");
            return;
        }

        const data = new Date(dataHoraSelecionada);
        const hora = data.getHours();
        const minutos = data.getMinutes();
        const dia = data.getDay(); 

        if (hora < 8 || hora >= 18 || dia === 0 || dia === 6) { 
            displayMessage("Escolha um horário entre 08h e 17h em dias úteis (Segunda a Sexta).", "error"); 
            return;
        }

        if (minutos !== 0) {
            displayMessage("Por favor, selecione um horário cheio (ex: 08:00, 09:00).", "error");
            return;
        }

        const conflitoProfissional = consultas.find(
            (c) =>
                c.profissional === form.profissional &&
                new Date(c.dataHora).getTime() === dataHoraSelecionada &&
                c.id !== editandoId 
        );

        if (conflitoProfissional) {
            displayMessage(`O profissional ${form.profissional} já está ocupado nesse horário. Por favor, escolha outro horário.`, "error");
            return;
        }

        const conflitoClienteNoHorario = consultas.find(
            (c) =>
                c.cpf && c.cpf.replace(/\D/g, '') === cpfLimpo && 
                new Date(c.dataHora).getTime() === dataHoraSelecionada &&
                c.id !== editandoId 
        );

        if (conflitoClienteNoHorario) {
            displayMessage("Você já possui um agendamento para este horário. Por favor, escolha outro horário ou edite seu agendamento existente.", "error");
            return;
        }

        const clienteExistenteComCpf = consultas.find(
            (c) =>
                c.cpf && c.cpf.replace(/\D/g, '') === cpfLimpo &&
                c.id !== editandoId 
        );

        if (clienteExistenteComCpf && clienteExistenteComCpf.nomeCliente.toLowerCase() !== form.nomeCliente.toLowerCase()) {
            displayMessage(`O CPF ${form.cpf} já está registrado com o nome "${clienteExistenteComCpf.nomeCliente}". Por favor, utilize o nome correto ou edite um agendamento existente.`, "error");
            return;
        }

        if (editandoId) {
            const consultasAtualizadas = consultas.map((c) =>
                c.id === editandoId
                    ? { ...form, id: editandoId, dataHora: form.dataHora.toISOString(), status: "Agendado" }
                    : c
            );
            setConsultas(consultasAtualizadas);
            setEditandoId(null); 
            displayMessage("Consulta atualizada com sucesso!");
        } else {
            const novaConsulta = {
                id: Date.now(),
                ...form, 
                dataHora: form.dataHora.toISOString(), 
                status: "Agendado",
            };
            setConsultas([...consultas, novaConsulta]);
            displayMessage("Consulta agendada com sucesso!");
        }

        setForm({
            nomeCliente: "",
            cpf: "",
            servico: "",
            profissional: "",
            dataHora: null,
        });
    };

    const handleCancelar = (id) => {
        const atualizadas = consultas.filter((c) => c.id !== id);
        setConsultas(atualizadas);
        displayMessage("Consulta cancelada.", "success");
    };

    const handleEdit = (consulta) => {
        setEditandoId(consulta.id); 
        setForm({
            nomeCliente: consulta.nomeCliente, 
            cpf: consulta.cpf,                 
            servico: consulta.servico,
            profissional: consulta.profissional,
            dataHora: new Date(consulta.dataHora), 
        });
        displayMessage("Editando consulta...", "info"); 
    };

    const handleCancelEdit = () => {
        setEditandoId(null);
        setForm({
            nomeCliente: "",
            cpf: "",
            servico: "",
            profissional: "",
            dataHora: null,
        });
        displayMessage("Edição cancelada.", "error");
    };

    const getMinTime = (date) => {
      const now = new Date();
      if (date && date.toDateString() === now.toDateString()) {
        const currentHour = now.getHours();
        const currentMinute = now.getMinutes();
        const minHour = currentHour < 8 ? 8 : currentHour + 1; 
        const minMinute = 0; 
        
        const minTime = new Date();
        minTime.setHours(minHour, minMinute, 0, 0);
        return minTime;
      }
      const defaultMinTime = new Date();
      defaultMinTime.setHours(8, 0, 0, 0); 
      return defaultMinTime;
    };

    const getMaxTime = () => {
        const maxTime = new Date();
        maxTime.setHours(17, 0, 0, 0); 
        return maxTime;
    };

    return (
        <main className="py-16 px-6 bg-gray-50 text-gray-800">
            <div className="max-w-5xl mx-auto bg-white p-8 md:p-12 shadow-2xl rounded-3xl border border-purple-200">
                <h2 className="text-4xl font-extrabold text-center text-purple-800 mb-10">
                    Agende seu Atendimento
                </h2>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                    {/* Formulário de Agendamento */}
                    <div>
                        <h3 className="text-2xl font-bold text-purple-700 mb-6 border-b-2 border-purple-300 pb-3">
                            {editandoId ? "Editar Consulta" : "Detalhes da Consulta"}
                        </h3>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label htmlFor="nomeCliente" className="block mb-1 text-sm font-medium text-gray-700">Seu nome</label>
                                <input
                                    type="text"
                                    id="nomeCliente"
                                    name="nomeCliente"
                                    value={form.nomeCliente}
                                    onChange={handleChange}
                                    placeholder="Digite seu nome completo"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition duration-200"
                                    required
                                />
                            </div>
                            
                            <div>
                                <label htmlFor="cpf" className="block mb-1 text-sm font-medium text-gray-700">Seu CPF</label>
                                <input
                                    type="text"
                                    id="cpf"
                                    name="cpf"
                                    value={form.cpf}
                                    onChange={handleChange}
                                    placeholder="000.000.000-00"
                                    maxLength="14"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition duration-200"
                                    required
                                />
                            </div>

                            <div>
                                <label htmlFor="servico" className="block mb-1 text-sm font-medium text-gray-700">Serviço</label>
                                <select
                                    id="servico"
                                    name="servico"
                                    value={form.servico}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition duration-200 bg-white"
                                    required
                                >
                                    <option value="">Selecione um serviço</option>
                                    {servicos.map((s) => (
                                        <option key={s.nome} value={s.nome}>
                                            {s.nome}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label htmlFor="profissional" className="block mb-1 text-sm font-medium text-gray-700">Profissional</label>
                                <input
                                    type="text"
                                    id="profissional"
                                    name="profissional"
                                    value={form.profissional}
                                    readOnly
                                    disabled
                                    className="w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg shadow-sm cursor-not-allowed" 
                                />
                            </div>

                            <div>
                                <label htmlFor="dataHora" className="block mb-1 text-sm font-medium text-gray-700">Data e horário</label>
                                <DatePicker
                                    selected={form.dataHora}
                                    onChange={(data) => setForm({ ...form, dataHora: data })}
                                    showTimeSelect
                                    timeFormat="HH:mm"
                                    timeIntervals={60}
                                    minDate={new Date()}
                                    minTime={getMinTime(form.dataHora || new Date())}
                                    maxTime={getMaxTime()} 
                                    dateFormat="dd/MM/yyyy HH:mm"
                                    placeholderText="Escolha a melhor data e horário"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition duration-200 bg-white"
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition duration-300 transform hover:scale-105 shadow-md"
                            >
                                {editandoId ? "Atualizar Agendamento" : "Confirmar Agendamento"}
                            </button>

                            {editandoId && (
                                <button
                                    type="button"
                                    onClick={handleCancelEdit}
                                    className="w-full py-2 bg-gray-300 text-gray-800 font-semibold rounded-lg hover:bg-gray-400 transition duration-300 shadow-md"
                                >
                                    Cancelar Edição
                                </button>
                            )}
                        </form>

                        {mensagem && (
                            <p className="mt-4 text-green-600 text-center font-semibold text-lg animate-pulse">{mensagem}</p>
                        )}
                        {erro && (
                            <p className="mt-4 text-red-600 text-center font-semibold text-lg animate-pulse">{erro}</p>
                        )}
                    </div>

                    {/* Lista de Agendamentos */}
                    <div>
                        <h3 className="text-2xl font-bold text-purple-700 mb-6 border-b-2 border-purple-300 pb-3">
                            Meus Agendamentos
                        </h3>
                        <ConsultaLista
                            consultas={consultas}
                            onCancelar={handleCancelar}
                            onEdit={handleEdit}
                            cpfAtual={form.cpf}
                        />

                        <div className="mt-10 bg-purple-50 p-6 rounded-lg shadow-md text-center">
                            <h4 className="text-xl font-bold text-purple-700 mb-3">Conheça Nossos Tratamentos</h4>
                            <p className="text-gray-600 mb-4">
                                Explore a variedade de serviços que oferecemos para o seu bem-estar.
                            </p>
                            <Link to="/servicos" className="inline-block bg-purple-600 hover:bg-purple-700 text-white px-5 py-2 rounded-full font-semibold">
                                Ver Serviços
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Agendamento;