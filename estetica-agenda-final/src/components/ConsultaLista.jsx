import {
    FaUser, FaCalendarAlt, FaUserMd, FaSpa, FaTrashAlt, FaEdit, FaIdCard
} from "react-icons/fa";

// Componente para exibir e gerenciar a lista de consultas de um cliente.
// Filtra as consultas com base no CPF digitado no formulário.
const ConsultaLista = ({ consultas, onCancelar, onEdit, cpfAtual = "" }) => {
    // Limpa o CPF para comparação (remove pontos e traços).
    const cpfParaFiltrar = cpfAtual.replace(/\D/g, '');

    // Filtra as consultas para exibir apenas as do CPF digitado.
    const consultasFiltradas = consultas.filter(
        (c) => c.cpf && c.cpf.replace(/\D/g, '') === cpfParaFiltrar
    );

    // --- Mensagens Condicionais (quando não há CPF ou agendamentos) ---
    if (!cpfAtual) {
        return (
            <p className="mt-6 p-4 text-center text-sm text-gray-500 italic bg-purple-50 rounded-lg animate-fade-in border border-purple-200">
                Digite seu CPF no formulário para visualizar suas consultas agendadas.
            </p>
        );
    }

    if (cpfParaFiltrar.length < 11 || consultasFiltradas.length === 0) {
        return (
            <p className="mt-6 p-4 text-center text-sm text-gray-500 italic bg-yellow-50 rounded-lg animate-fade-in border border-yellow-200">
                Nenhuma consulta agendada encontrada para o CPF digitado.
            </p>
        );
    }

    // --- Renderização dos Cards de Consulta ---
    return (
        <div className="mt-6 space-y-4">
            {consultasFiltradas.map((consulta) => (
                <div
                    key={consulta.id} // Chave única para cada item na lista
                    className="bg-white text-gray-800 p-4 rounded-lg shadow-md transition transform hover:scale-[1.01] hover:shadow-xl duration-300 relative animate-fade-in border border-purple-100"
                >
                    {/* Botões de Ação (Editar e Cancelar) */}
                    <div className="absolute top-2 right-2 flex space-x-2">
                        <button
                            onClick={() => onEdit(consulta)} // Aciona a função de edição no componente pai
                            className="text-blue-500 hover:text-blue-700 transition"
                            title="Editar agendamento"
                        >
                            <FaEdit />
                        </button>
                        <button
                            onClick={() => onCancelar(consulta.id)} // Aciona a função de cancelamento no componente pai
                            className="text-red-500 hover:text-red-700 transition"
                            title="Cancelar agendamento"
                        >
                            <FaTrashAlt />
                        </button>
                    </div>

                    {/* Detalhes da Consulta */}
                    <p className="flex items-center gap-2 mb-1 text-base">
                        <FaUser className="text-purple-600" />
                        <span className="font-medium text-gray-700">Cliente:</span>{" "}
                        <span className="font-normal text-gray-800">{consulta.nomeCliente}</span>
                    </p>

                    <p className="flex items-center gap-2 mb-1 text-base">
                        <FaIdCard className="text-purple-600" />
                        <span className="font-medium text-gray-700">CPF:</span>{" "}
                        <span className="font-normal text-gray-800">{consulta.cpf}</span>
                    </p>

                    <p className="flex items-center gap-2 mb-1 text-base">
                        <FaSpa className="text-purple-600" />
                        <span className="font-medium text-gray-700">Serviço:</span>{" "}
                        <span className="font-normal text-gray-800">{consulta.servico}</span>
                    </p>

                    <p className="flex items-center gap-2 mb-1 text-base">
                        <FaUserMd className="text-purple-600" />
                        <span className="font-medium text-gray-700">Profissional:</span>{" "}
                        <span className="font-normal text-gray-800">{consulta.profissional}</span>
                    </p>

                    <p className="flex items-center gap-2 text-base">
                        <FaCalendarAlt className="text-purple-600" />
                        <span className="font-medium text-gray-700">Data e Hora:</span>{" "}
                        <span className="font-normal text-gray-800">
                            {/* Formata a data para exibição */}
                            {new Date(consulta.dataHora).toLocaleString("pt-BR", {
                                day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit",
                            })}
                        </span>
                    </p>

                    {/* Status do Agendamento */}
                    <p className="mt-2 text-sm">
                        <span className="font-semibold text-purple-700">Status:</span>{" "}
                        <span className="text-green-600 font-medium px-2 py-1 rounded-full bg-green-100">
                            {consulta.status}
                        </span>
                    </p>
                </div>
            ))}
        </div>
    );
};

export default ConsultaLista;