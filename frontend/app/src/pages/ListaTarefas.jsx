import React, { useState, useEffect } from 'react';
import { listarTarefas, deletarTarefa, atualizarTarefa } from '../services/api';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const ListaContainer = styled.div`
    font-family: 'Comic Neue', cursive;
    padding: 20px;
`;

const TituloPagina = styled.h2`
    margin-bottom: 20px;
`;

const LinkAdicionar = styled(Link)`
    display: inline-block;
    margin-bottom: 15px;
    text-decoration: none;
    color: #007bff;
`;

const Lista = styled.ul`
    list-style: none;
    padding: 0;
`;

const ItemLista = styled.li`
    border: 1px solid #ccc;
    margin-bottom: 10px;
    padding: 15px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: ${props => props.concluida ? '#f0fff0' : 'white'}; /* Verde claro se concluída */
`;

const InfoTarefa = styled.div`
    flex-grow: 1;
`;

const TituloTarefa = styled.strong`
    display: block;
    margin-bottom: 5px;
`;

const DescricaoTarefa = styled.p`
    margin-bottom: 5px;
    color: #555;
`;

const CheckboxConcluida = styled.input`
    margin-right: 10px;
    cursor: pointer;
`;

const LabelConcluida = styled.label`
    display: flex;
    align-items: center;
    margin-bottom: 5px;
`;

const Acoes = styled.div`
    button {
        margin-left: 10px;
        cursor: pointer;
        padding: 8px 12px;
        border: 1px solid #ccc;
        border-radius: 4px;
        background-color: white;
        &:hover {
            background-color: #eee;
        }
    }
`;

function ListaTarefas() {
    const [tarefas, setTarefas] = useState([]);

    useEffect(() => {
        carregarTarefas();
    }, []);

    const carregarTarefas = async () => {
        try {
            const response = await listarTarefas();
            setTarefas(response.data);
        } catch (error) {
            console.error("Erro ao carregar tarefas:", error);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Tem certeza que deseja deletar esta tarefa?")) {
            try {
                await deletarTarefa(id);
                carregarTarefas();
            } catch (error) {
                console.error("Erro ao deletar tarefa:", error);
            }
        }
    };

    const handleConcluidaChange = async (id, concluida) => {
        try {
            await atualizarTarefa(id, { concluida: !concluida });
            carregarTarefas();
        } catch (error) {
            console.error("Erro ao atualizar status da tarefa:", error);
        }
    };

    return (
        <ListaContainer>
            <TituloPagina>Lista de Tarefas</TituloPagina>
            <LinkAdicionar to="/cadastro">Adicionar Nova Tarefa</LinkAdicionar>
            <Lista>
                {tarefas.map(tarefa => (
                    <ItemLista key={tarefa.id} concluida={tarefa.concluida}>
                        <InfoTarefa>
                            <TituloTarefa>{tarefa.titulo}</TituloTarefa>
                            {tarefa.descricao && <DescricaoTarefa>{tarefa.descricao}</DescricaoTarefa>}
                            <LabelConcluida>
                                <CheckboxConcluida
                                    type="checkbox"
                                    checked={tarefa.concluida}
                                    onChange={() => handleConcluidaChange(tarefa.id, tarefa.concluida)}
                                />
                                Concluída
                            </LabelConcluida>
                        </InfoTarefa>
                        <Acoes>
                            <Link to={`/editar/${tarefa.id}`}>Editar</Link>
                            <button onClick={() => handleDelete(tarefa.id)}>Deletar</button>
                        </Acoes>
                    </ItemLista>
                ))}
            </Lista>
        </ListaContainer>
    );
}

export default ListaTarefas;