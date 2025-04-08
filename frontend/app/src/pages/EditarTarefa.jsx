import React, { useState, useEffect } from 'react';
import { obterTarefa, atualizarTarefa } from '../services/api';
import { useNavigate, useParams, Link } from 'react-router';
import styled from 'styled-components';

const EdicaoContainer = styled.div`
    font-family: 'Comic Neue', cursive;
    padding: 20px;
`;

const TituloPagina = styled.h2`
    margin-bottom: 20px;
`;

const Formulario = styled.form`
    display: flex;
    flex-direction: column;
    max-width: 400px;

    label {
        margin-bottom: 5px;
    }

    input, textarea, button {
        padding: 8px;
        margin-bottom: 10px;
        border: 1px solid #ccc;
        border-radius: 4px;
    }

    button {
        cursor: pointer;
        background-color: #28a745;
        color: white;
    }
`;

function EditarTarefa() {
    const { id } = useParams();
    const [titulo, setTitulo] = useState('');
    const [descricao, setDescricao] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const carregarTarefa = async () => {
            try {
                const response = await obterTarefa(id);
                setTitulo(response.data.titulo);
                setDescricao(response.data.descricao || '');
            } catch (error) {
                console.error("Erro ao carregar tarefa para edição:", error);
            }
        };

        carregarTarefa();
    }, [id]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const tarefaAtualizada = { titulo, descricao };
            await atualizarTarefa(id, tarefaAtualizada);
            navigate('/'); // Redireciona para a lista após a edição
        } catch (error) {
            console.error("Erro ao atualizar tarefa:", error);
        }
    };

    return (
        <EdicaoContainer>
            <TituloPagina>Edição de Tarefa</TituloPagina>
            <Formulario onSubmit={handleSubmit}>
                <label htmlFor="titulo">Título:</label>
                <input
                    type="text"
                    id="titulo"
                    value={titulo}
                    onChange={(e) => setTitulo(e.target.value)}
                    required
                />

                <label htmlFor="descricao">Descrição:</label>
                <textarea
                    id="descricao"
                    value={descricao}
                    onChange={(e) => setDescricao(e.target.value)}
                />

                <button type="submit">Salvar Edições</button>
                <Link to="/">Voltar para a Lista</Link>
            </Formulario>
        </EdicaoContainer>
    );
}

export default EditarTarefa;