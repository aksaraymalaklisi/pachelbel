import React, { useState } from 'react';
import { criarTarefa } from '../services/api';
import { useNavigate } from 'react-router';
import styled from 'styled-components';

const CadastroContainer = styled.div`
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
        background-color: #007bff;
        color: white;
    }
`;

function CadastroTarefa() {
    const [titulo, setTitulo] = useState('');
    const [descricao, setDescricao] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const novaTarefa = { titulo, descricao };
            await criarTarefa(novaTarefa);
            navigate('/'); // Redireciona para a lista após o cadastro
        } catch (error) {
            console.error("Erro ao cadastrar tarefa:", error);
        }
    };

    return (
        <CadastroContainer>
            <TituloPagina>Cadastro de Nova Tarefa</TituloPagina>
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

                <button type="submit">Cadastrar</button>
                <Link to="/">Voltar para a Lista</Link>
            </Formulario>
        </CadastroContainer>
    );
}

export default CadastroTarefa;