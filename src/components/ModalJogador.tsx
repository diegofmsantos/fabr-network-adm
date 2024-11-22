import { useState } from "react";
import { api } from "@/api/api";
import InputField from "@/components/InputField"; // Reutilizando o componente de input
import { Estatisticas, Jogador } from "@/types/jogador";

export default function ModalJogador({
    jogador,
    closeModal,
}: {
    jogador: Jogador;
    closeModal: () => void;
}) {
    const [formData, setFormData] = useState<Jogador>({
        ...jogador,
        estatisticas: {
            passe: jogador.estatisticas?.passe || {
                passes_completos: 0,
                passes_tentados: 0,
                jardas_de_passe: 0,
                td_passados: 0,
                interceptacoes_sofridas: 0,
                sacks_sofridos: 0,
                fumble_de_passador: 0,
            },
            corrida: jogador.estatisticas?.corrida || {
                corridas: 0,
                jardas_corridas: 0,
                tds_corridos: 0,
                fumble_de_corredor: 0,
            },
            recepcao: jogador.estatisticas?.recepcao || {
                recepcoes: 0,
                alvo: 0,
                jardas_recebidas: 0,
                tds_recebidos: 0,
                fumble_de_recebedor: 0,
            },
            retorno: jogador.estatisticas?.retorno || {
                retornos: 0,
                jardas_retornadas: 0,
                td_retornados: 0,
                fumble_retornador: 0,
            },
            defesa: jogador.estatisticas?.defesa || {
                tackles_totais: 0,
                tackles_for_loss: 0,
                sacks_forcado: 0,
                fumble_forcado: 0,
                interceptacao_forcada: 0,
                passe_desviado: 0,
                safety: 0,
                td_defensivo: 0,
            },
            kicker: jogador.estatisticas?.kicker || {
                xp_bons: 0,
                tentativas_de_xp: 0,
                fg_bons: 0,
                tentativas_de_fg: 0,
                fg_mais_longo: 0,
                fg_0_10: "",
                fg_11_20: "",
                fg_21_30: "",
                fg_31_40: "",
                fg_41_50: "",
            },
            punter: jogador.estatisticas?.punter || {
                punts: 0,
                jardas_de_punt: 0,
            },
        },
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: isNaN(Number(value)) ? value : Number(value),
        }));
    };

    const handleStatisticChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        const [_, groupKey, fieldKey] = name.split(".") as [string, keyof Estatisticas, string];

        setFormData((prev) => {
            const updatedGroup = {
                ...(prev.estatisticas?.[groupKey] || {}),
                [fieldKey]: isNaN(Number(value)) ? value : Number(value),
            };

            return {
                ...prev,
                estatisticas: {
                    ...prev.estatisticas,
                    [groupKey]: updatedGroup,
                },
            } as Jogador;
        });
    };

    const handleSave = async () => {
        try {
            console.log("Dados enviados para atualização:", formData);

            // Certifique-se de que o ID está sendo usado na rota
            await api.put(`/jogador/${jogador.id}`, formData);
            alert("Jogador atualizado com sucesso!");
            closeModal();
        } catch (error) {
            console.error("Erro ao atualizar jogador:", error);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-md w-2/3 h-screen relative flex flex-col">
                {/* Botão para fechar o modal */}
                <button
                    className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
                    onClick={closeModal}
                >
                    ✖
                </button>

                <h2 className="text-2xl font-bold mb-4">Editar Jogador</h2>

                {/* Conteúdo com rolagem */}
                <div className="overflow-y-auto flex-1">
                    <div className="grid grid-cols-2 gap-4 mb-4">
                        <InputField
                            name="nome"
                            value={formData.nome}
                            onChange={handleChange}
                            placeholder="Nome do Jogador"
                        />
                        <InputField
                            name="posicao"
                            value={formData.posicao}
                            onChange={handleChange}
                            placeholder="Posição"
                        />
                        <InputField
                            name="numero"
                            value={formData.numero}
                            onChange={handleChange}
                            placeholder="Número"
                        />
                        <InputField
                            name="altura"
                            value={formData.altura}
                            onChange={handleChange}
                            placeholder="Altura (m)"
                        />
                        <InputField
                            name="peso"
                            value={formData.peso}
                            onChange={handleChange}
                            placeholder="Peso (kg)"
                        />
                        <InputField
                            name="idade"
                            value={formData.idade}
                            onChange={handleChange}
                            placeholder="Idade"
                        />
                        <InputField
                            name="nacionalidade"
                            value={formData.nacionalidade}
                            onChange={handleChange}
                            placeholder="Nacionalidade"
                        />
                        <InputField
                            name="cidade"
                            value={formData.cidade}
                            onChange={handleChange}
                            placeholder="Cidade"
                        />
                        <InputField
                            name="instagram"
                            value={formData.instagram}
                            onChange={handleChange}
                            placeholder="Instagram"
                        />
                        <InputField
                            name="instagram2"
                            value={formData.instagram2}
                            onChange={handleChange}
                            placeholder="Instagram 2"
                        />
                    </div>

                    <h3 className="text-xl font-bold mb-2">Estatísticas</h3>
                    <div className="grid grid-cols-3 gap-4">
                        {Object.entries(formData.estatisticas || {}).map(([group, stats]) => (
                            <div key={group} className="border p-2 rounded-md">
                                <h4 className="text-lg font-bold mb-2 capitalize">{group}</h4>
                                {Object.entries(stats || {}).map(([field, value]) => (
                                    <InputField
                                        key={field}
                                        name={`estatisticas.${group}.${field}`}
                                        value={value}
                                        onChange={handleStatisticChange}
                                        placeholder={field}
                                    />
                                ))}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Botões fixos */}
                <div className="mt-4 flex justify-end gap-2">
                    <button
                        onClick={closeModal}
                        className="bg-gray-500 text-white px-4 py-2 rounded-md"
                    >
                        Fechar
                    </button>
                    <button
                        onClick={handleSave}
                        className="bg-green-500 text-white px-4 py-2 rounded-md"
                    >
                        Salvar
                    </button>
                </div>
            </div>
        </div>
    );
}
