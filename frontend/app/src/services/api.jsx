import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000'; // URL base da sua API FastAPI

const api = axios.create({
    baseURL: API_BASE_URL,
});

// Funções para interagir com a API de tarefas

// Listar todas as tarefas
export const listarTarefas = () => {
    return api.get('/tarefas/');
};

// Obter uma tarefa por ID
export const obterTarefa = (id) => {
    return api.get(`/tarefas/${id}`);
};

// Criar uma nova tarefa
export const criarTarefa = (tarefa) => {
    return api.post('/tarefas/', tarefa);
};

// Atualizar uma tarefa
export const atualizarTarefa = (id, tarefa) => {
    return api.put(`/tarefas/${id}`, tarefa);
};

// Deletar uma tarefa
export const deletarTarefa = (id) => {
    return api.delete(`/tarefas/${id}`);
};