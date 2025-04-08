import React, { useState, useEffect } from 'react';
import { listarTarefas, deletarTarefa } from '../services/api';
import { Link } from 'react-router';
import styled from 'styled-components';

const ListaContainer = styled.div`
    font-family: 'Comic Neue', cursive;
    padding: 20px;
`;

const TituloPagina = styled.h2`
    margin-bottom: 20px;
`;

const Lista = styled.ul`
    list-style: none;
    padding: 0;
`;

const ItemLista = styled.li`
    border: 1px solid #ccc;
    margin-bottom: 10px;
    padding: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const Acoes = styled.div`
    button {
        margin-left: 10px;
        cursor: pointer;
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
                carregarTarefas(); // Recarrega a lista após a exclusão
            } catch (error) {
                console.error("Erro ao deletar tarefa:", error);
            }
        }
    };

    return (
        <ListaContainer>
            <TituloPagina>Lista de Tarefas</TituloPagina>
            <Link to="/cadastro">Adicionar Nova Tarefa</Link>
            <Lista>
                {tarefas.map(tarefa => (
                    <ItemLista key={tarefa.id}>
                        <div>
                            <strong>{tarefa.titulo}</strong>
                            {tarefa.descricao && <p>{tarefa.descricao}</p>}
                            <small>Concluída: {tarefa.concluida ? 'Sim' : 'Não'}</small>
                        </div>
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