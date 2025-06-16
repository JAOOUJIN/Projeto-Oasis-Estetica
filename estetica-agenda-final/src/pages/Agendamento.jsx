import React, { useState, useEffect } from "react";
import ConsultaLista from "../components/ConsultaLista";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../styles/datepicker-theme.css";
import { Link } from "react-router-dom";


// Dados estáticos dos serviços oferecidos e seus profissionais associados
const servicos = [
    { nome: "Limpeza de Pele", profissional: "Dra. Juliana" },
    { nome: "Massagem", profissional: "Carlos Mendes" },
    { nome: "Depilação a Laser", profissional: "Dra. Sofia" },
    { nome: "Tratamentos Corporais", profissional: "Dra. Maria" },
];

// Componente principal da página de Agendamento.
const Agendamento = () => {
    // Estado para armazenar e gerenciar a lista de todas as consultas agendadas
    // Inicializa pegando dados do localStorage
    const [consultas, setConsultas] = useState(() => {
        const armazenadas = localStorage.getItem("consultas");
        return armazenadas ? JSON.parse(armazenadas) : [];
    });

    // Estados para exibir mensagens de sucesso ou erro ao usuário
    const [mensagem, setMensagem] = useState("");
    const [erro, setErro] = useState("");

    // Estado para controlar o modo de edição (se uma consulta está sendo editada)
    // Armazena o ID da consulta sendo editada, ou null se estiver criando
    const [editandoId, setEditandoId] = useState(null);

    // Estado para gerenciar os dados do formulário de agendamento
    const [form, setForm] = useState({
        nomeCliente: "",
        cpf: "",
        servico: "",
        profissional: "",
        dataHora: null,
    });


    // Efeito para carregar as consultas do localStorage quando o componente é montado.
    useEffect(() => {
        const armazenadas = localStorage.getItem("consultas");
        if (armazenadas) {
            // Converte strings de data de volta para objetos Date para o DatePicker.
            const parsedConsultas = JSON.parse(armazenadas).map(consulta => ({
                ...consulta,
                dataHora: new Date(consulta.dataHora)
            }));
            setConsultas(parsedConsultas);
        }
    }, []);

    // Efeito para salvar as consultas no localStorage sempre que o estado 'consultas' muda.
    useEffect(() => {
        localStorage.setItem("consultas", JSON.stringify(consultas));
    }, [consultas]); // Roda sempre que 'consultas' é atualizado.

    // --- Funções Auxiliares ---

    // Exibe mensagens de feedback (sucesso ou erro) ao usuário por um tempo limitado
    const displayMessage = (msg, type = "success") => {
        if (type === "success") { setMensagem(msg); setErro(""); }
        else { setErro(msg); setMensagem(""); }
        setTimeout(() => { setMensagem(""); setErro(""); }, 4000); // Mensagem some após 4 segundos.
    };

    // Lida com a mudança de valor nos campos do formulário.
    const handleChange = (e) => {
        const { name, value } = e.target;

        // Lógica para preencher o profissional automaticamente baseado no serviço.
        if (name === "servico") {
            const servicoSelecionado = servicos.find((s) => s.nome === value);
            const profissional = servicoSelecionado ? servicoSelecionado.profissional : "";
            setForm({ ...form, servico: value, profissional, });
        }
        // Lógica para formatar o CPF enquanto o usuário digita.
        else if (name === "cpf") {
            const cpfNumeros = value.replace(/\D/g, '');
            const cpfLimitado = cpfNumeros.substring(0, 11);
            let cpfFormatado = cpfLimitado;
            // Adiciona pontos e traço para formatação visual.
            if (cpfLimitado.length > 3) { cpfFormatado = cpfLimitado.substring(0, 3) + '.' + cpfLimitado.substring(3); }
            if (cpfLimitado.length > 6) { cpfFormatado = cpfLimitado.substring(0, 3) + '.' + cpfLimitado.substring(3, 6) + '.' + cpfLimitado.substring(6); }
            if (cpfLimitado.length > 9) { cpfFormatado = cpfLimitado.substring(0, 3) + '.' + cpfLimitado.substring(3, 6) + '.' + cpfLimitado.substring(6, 9) + '-' + cpfLimitado.substring(9, 11); }
            setForm({ ...form, [name]: cpfFormatado });
        }
        else {
            setForm({ ...form, [name]: value });
        }
    };

    // Lida com a submissão do formulário (Criação ou Atualização de Agendamento)
    const handleSubmit = (e) => {
        e.preventDefault();
        setMensagem(""); setErro("");

        // Validação de campos obrigatórios
        if (!form.nomeCliente || !form.cpf || !form.servico || !form.dataHora) {
            displayMessage("Por favor, preencha todos os campos obrigatórios (Nome, CPF, Serviço e Data/Hora).", "error");
            return;
        }

        // Validação do formato do CPF (11 dígitos numéricos)
        const cpfLimpo = form.cpf.replace(/\D/g, '');
        if (cpfLimpo.length !== 11) {
            displayMessage("CPF inválido. Deve conter 11 dígitos numéricos.", "error");
            return;
        }

        const dataHoraSelecionada = form.dataHora.getTime();
        const now = new Date().getTime();

        // Validação de data/hora no passado
        if (dataHoraSelecionada < now) {
            displayMessage("Você não pode agendar para um horário que já passou.", "error");
            return;
        }

        const data = new Date(dataHoraSelecionada);
        const hora = data.getHours();
        const minutos = data.getMinutes();
        const dia = data.getDay();

        // Validação de horário comercial (08h às 17h, dias úteis)
        if (hora < 8 || hora >= 18 || dia === 0 || dia === 6) {
            displayMessage("Escolha um horário entre 08h e 17h em dias úteis (Segunda a Sexta).", "error");
            return;
        }
        // Validação de horários cheios (ex: 08:00, 09:00)
        if (minutos !== 0) {
            displayMessage("Por favor, selecione um horário cheio (ex: 08:00, 09:00).", "error");
            return;
        }

        // --- Lógica de Conflito e Consistência (CRUD - Create/Update) ---

        // 1. Verifica se o PROFISSIONAL já está ocupado naquele horário.
        const conflitoProfissional = consultas.find(
            (c) => c.profissional === form.profissional && new Date(c.dataHora).getTime() === dataHoraSelecionada && c.id !== editandoId
        );
        if (conflitoProfissional) {
            displayMessage(`O profissional ${form.profissional} já está ocupado nesse horário. Por favor, escolha outro horário.`, "error");
            return;
        }

        // 2. Verifica se o CLIENTE (CPF) já tem alguma consulta agendada para o MESMO HORÁRIO.
        const conflitoClienteNoHorario = consultas.find(
            (c) => c.cpf && c.cpf.replace(/\D/g, '') === cpfLimpo && new Date(c.dataHora).getTime() === dataHoraSelecionada && c.id !== editandoId
        );
        if (conflitoClienteNoHorario) {
            displayMessage("Você já possui um agendamento para este horário. Por favor, escolha outro horário ou edite seu agendamento existente.", "error");
            return;
        }

        // 3. Valida consistência de nome para o CPF existente.
        const clienteExistenteComCpf = consultas.find(
            (c) => c.cpf && c.cpf.replace(/\D/g, '') === cpfLimpo && c.id !== editandoId
        );
        if (clienteExistenteComCpf && clienteExistenteComCpf.nomeCliente.toLowerCase() !== form.nomeCliente.toLowerCase()) {
            displayMessage(`O CPF ${form.cpf} já está registrado com o nome "${clienteExistenteComCpf.nomeCliente}". Por favor, utilize o nome correto ou edite um agendamento existente.`, "error");
            return;
        }

        // --- Operação de Criação ou Atualização ---
        if (editandoId) { // Se 'editandoId' não for null, estamos em modo de atualização.
            const consultasAtualizadas = consultas.map((c) =>
                c.id === editandoId ? { ...form, id: editandoId, dataHora: form.dataHora.toISOString(), status: "Agendado" } : c
            );
            setConsultas(consultasAtualizadas);
            setEditandoId(null); // Sai do modo de edição.
            displayMessage("Consulta atualizada com sucesso!");
        } else { // Se 'editandoId' for null, estamos em modo de criação.
            const novaConsulta = {
                id: Date.now(),
                ...form,
                dataHora: form.dataHora.toISOString(),
                status: "Agendado",
            };
            setConsultas([...consultas, novaConsulta]);
            displayMessage("Consulta agendada com sucesso!");
        }

        // Limpa o formulário após a operação.
        setForm({ nomeCliente: "", cpf: "", servico: "", profissional: "", dataHora: null, });
    };

    // Função para cancelar um agendamento (CRUD - Delete).
    const handleCancelar = (id) => {
        const atualizadas = consultas.filter((c) => c.id !== id);
        setConsultas(atualizadas);
        displayMessage("Consulta cancelada.", "success");
    };

    // Função para preencher o formulário com dados de uma consulta para edição (CRUD - Read para Update).
    const handleEdit = (consulta) => {
        setEditandoId(consulta.id); // Define o ID da consulta que será editada.
        // Preenche o formulário com os dados da consulta, convertendo dataHora para objeto Date.
        setForm({
            nomeCliente: consulta.nomeCliente,
            cpf: consulta.cpf,
            servico: consulta.servico,
            profissional: consulta.profissional,
            dataHora: new Date(consulta.dataHora),
        });
        displayMessage("Editando consulta...", "info");
    };

    // Função para cancelar o modo de edição e limpar o formulário.
    const handleCancelEdit = () => {
        setEditandoId(null);
        setForm({ nomeCliente: "", cpf: "", servico: "", profissional: "", dataHora: null, });
        displayMessage("Edição cancelada.", "error");
    };

    // --- Lógica do DatePicker (Horários Disponíveis) ---

    // Define o horário mínimo selecionável no DatePicker.
    const getMinTime = (date) => {
        const now = new Date();
        // Se a data selecionada for hoje, o horário mínimo é a hora atual + 1h (ou 8h se for antes).
        if (date && date.toDateString() === now.toDateString()) {
            const currentHour = now.getHours();
            const minHour = currentHour < 8 ? 8 : currentHour + 1;
            const minTime = new Date();
            minTime.setHours(minHour, 0, 0, 0);
            return minTime;
        }
        // Para outros dias, o horário mínimo é 8h.
        const defaultMinTime = new Date();
        defaultMinTime.setHours(8, 0, 0, 0);
        return defaultMinTime;
    };

    // Define o horário máximo selecionável no DatePicker (até 17:00).
    const getMaxTime = () => {
        const maxTime = new Date();
        maxTime.setHours(17, 0, 0, 0);
        return maxTime;
    };

    // --- Estrutura da Interface de Usuário ---
    return (
        <main className="py-16 px-6 bg-gray-50 text-gray-800">
            <div className="max-w-5xl mx-auto bg-white p-8 md:p-12 shadow-2xl rounded-3xl border border-purple-200">
                <h2 className="text-4xl font-extrabold text-center text-purple-800 mb-10">
                    Agende seu Atendimento
                </h2>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                    {/* Coluna da Esquerda: Formulário de Agendamento */}
                    <div>
                        <h3 className="text-2xl font-bold text-purple-700 mb-6 border-b-2 border-purple-300 pb-3">
                            {/* Título muda para "Editar Consulta" ou "Detalhes da Consulta" */}
                            {editandoId ? "Editar Consulta" : "Detalhes da Consulta"}
                        </h3>
                        {/* Formulário para criar ou editar agendamentos */}
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label htmlFor="nomeCliente" className="block mb-1 text-sm font-medium text-gray-700">Seu nome</label>
                                <input
                                    type="text" id="nomeCliente" name="nomeCliente" value={form.nomeCliente} onChange={handleChange}
                                    placeholder="Digite seu nome completo" required
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition duration-200"
                                />
                            </div>

                            <div>
                                <label htmlFor="cpf" className="block mb-1 text-sm font-medium text-gray-700">Seu CPF</label>
                                <input
                                    type="text" id="cpf" name="cpf" value={form.cpf} onChange={handleChange}
                                    placeholder="000.000.000-00" maxLength="14" required
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition duration-200"
                                />
                            </div>

                            <div>
                                <label htmlFor="servico" className="block mb-1 text-sm font-medium text-gray-700">Serviço</label>
                                <select
                                    id="servico" name="servico" value={form.servico} onChange={handleChange} required
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition duration-200 bg-white"
                                >
                                    <option value="">Selecione um serviço</option>
                                    {servicos.map((s) => (<option key={s.nome} value={s.nome}>{s.nome}</option>))}
                                </select>
                            </div>

                            <div>
                                <label htmlFor="profissional" className="block mb-1 text-sm font-medium text-gray-700">Profissional</label>
                                <input
                                    type="text" id="profissional" name="profissional" value={form.profissional} readOnly disabled
                                    className="w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg shadow-sm cursor-not-allowed"
                                />
                            </div>

                            <div>
                                <label htmlFor="dataHora" className="block mb-1 text-sm font-medium text-gray-700">Data e horário</label>
                                <DatePicker
                                    selected={form.dataHora} onChange={(data) => setForm({ ...form, dataHora: data })}
                                    showTimeSelect timeFormat="HH:mm" timeIntervals={60} minDate={new Date()}
                                    minTime={getMinTime(form.dataHora || new Date())} maxTime={getMaxTime()}
                                    dateFormat="dd/MM/yyyy HH:mm" placeholderText="Escolha a melhor data e horário"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition duration-200 bg-white"
                                />
                            </div>

                            {/* Botão de Submissão (Criar/Atualizar) */}
                            <button
                                type="submit"
                                className="w-full py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition duration-300 transform hover:scale-105 shadow-md"
                            >
                                {editandoId ? "Atualizar Agendamento" : "Confirmar Agendamento"}
                            </button>

                            {/* Botão para Cancelar Edição (aparece apenas no modo de edição) */}
                            {editandoId && (
                                <button
                                    type="button" onClick={handleCancelEdit}
                                    className="w-full py-2 bg-gray-300 text-gray-800 font-semibold rounded-lg hover:bg-gray-400 transition duration-300 shadow-md"
                                >
                                    Cancelar Edição
                                </button>
                            )}
                        </form>

                        {/* Mensagens de sucesso ou erro */}
                        {mensagem && (<p className="mt-4 text-green-600 text-center font-semibold text-lg animate-pulse">{mensagem}</p>)}
                        {erro && (<p className="mt-4 text-red-600 text-center font-semibold text-lg animate-pulse">{erro}</p>)}
                    </div>

                    {/* Coluna da Direita: Lista de Agendamentos e CTA */}
                    <div>
                        <h3 className="text-2xl font-bold text-purple-700 mb-6 border-b-2 border-purple-300 pb-3">
                            Meus Agendamentos
                        </h3>
                        {/* Componente que exibe a lista de agendamentos do CPF atual */}
                        <ConsultaLista
                            consultas={consultas}
                            onCancelar={handleCancelar}
                            onEdit={handleEdit}
                            cpfAtual={form.cpf}
                        />

                        {/* CTA para a página de serviços */}
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