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
        &:hover {
            background-color: #1e7e34;
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

function EditarTarefa() {
    const { id } = useParams();
    const [titulo, setTitulo] = useState('');
    const [descricao, setDescricao] = useState('');
    const [erro, setErro] = useState('');
    const [sucesso, setSucesso] = useState('');
    const navigate = useNavigate();
    const [carregando, setCarregando] = useState(true);

    useEffect(() => {
        const carregarTarefa = async () => {
            setCarregando(true);
            try {
                const response = await obterTarefa(id);
                setTitulo(response.data.titulo);
                setDescricao(response.data.descricao || '');
                setCarregando(false);
            } catch (error) {
                console.error("Erro ao carregar tarefa para edição:", error);
                setErro('Erro ao carregar os detalhes da tarefa.');
                setCarregando(false);
            }
        };

        carregarTarefa();
    }, [id]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setErro('');
        setSucesso('');

        if (!titulo.trim()) {
            setErro('O título da tarefa é obrigatório.');
            return;
        }

        try {
            const tarefaAtualizada = { titulo, descricao };
            await atualizarTarefa(id, tarefaAtualizada);
            setSucesso('Tarefa atualizada com sucesso!');
            setTimeout(() => navigate('/'), 1500); // Redireciona após 1.5 segundos
        } catch (error) {
            console.error("Erro ao atualizar tarefa:", error);
            setErro('Ocorreu um erro ao atualizar a tarefa.');
        }
    };

    if (carregando) {
        return <div>Carregando detalhes da tarefa...</div>;
    }

    return (
        <EdicaoContainer>
            <TituloPagina>Edição de Tarefa</TituloPagina>
            {erro && <div className="erro">{erro}</div>}
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
                {sucesso && <div className="sucesso">{sucesso}</div>}
                <LinkVoltar to="/">Voltar para a Lista</LinkVoltar>
            </Formulario>
        </EdicaoContainer>
    );
}

export default EditarTarefa;