import React, { useState } from 'react';
import { criarTarefa } from '../services/api';
import { useNavigate, Link } from 'react-router';
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
        &:hover {
            background-color: #0056b3;
        }
    }

    .erro {
        color: red;
        margin-top: 5px;
    }

    .sucesso {
        color: green;
        margin-top: 5px;
    }
`;

const LinkVoltar = styled(Link)`
    margin-top: 15px;
    display: inline-block;
    text-decoration: none;
    color: #555;
    &:hover {
        color: #000;
    }
`;

function CadastroTarefa() {
    const [titulo, setTitulo] = useState('');
    const [descricao, setDescricao] = useState('');
    const [erro, setErro] = useState('');
    const [sucesso, setSucesso] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        setErro('');
        setSucesso('');

        if (!titulo.trim()) {
            setErro('O título da tarefa é obrigatório.');
            return;
        }

        try {
            const novaTarefa = { titulo, descricao };
            await criarTarefa(novaTarefa);
            setSucesso('Tarefa cadastrada com sucesso!');
            setTitulo('');
            setDescricao('');
            setTimeout(() => navigate('/'), 1500); // Redireciona após 1.5 segundos
        } catch (error) {
            console.error("Erro ao cadastrar tarefa:", error);
            setErro('Ocorreu um erro ao cadastrar a tarefa.');
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
                {erro && <div className="erro">{erro}</div>}

                <label htmlFor="descricao">Descrição:</label>
                <textarea
                    id="descricao"
                    value={descricao}
                    onChange={(e) => setDescricao(e.target.value)}
                />

                <button type="submit">Cadastrar</button>
                {sucesso && <div className="sucesso">{sucesso}</div>}
                <LinkVoltar to="/">Voltar para a Lista</LinkVoltar>
            </Formulario>
        </CadastroContainer>
    );
}

export default CadastroTarefa;