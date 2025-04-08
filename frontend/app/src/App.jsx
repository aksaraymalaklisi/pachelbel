import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router';
import ListaTarefas from './pages/ListaTarefas';
import CadastroTarefa from './pages/CadastroTarefa';
import EditarTarefa from './pages/EditarTarefa';
import styled from 'styled-components';
import GlobalStyle from './GlobalStyles';

const AppContainer = styled.div`
    font-family: 'Comic Neue', cursive;
    padding: 20px;
`;

const Navigation = styled.nav`
    margin-bottom: 20px;
    ul {
        list-style: none;
        padding: 0;
        display: flex;
        gap: 20px;
    }
    li a {
        text-decoration: none;
        color: #007bff;
    }
`;

function App() {
    return (
        <Router>
            <GlobalStyle />
            <AppContainer>
                <Navigation>
                    <ul>
                        <li>
                            <Link to="/">Lista de Tarefas</Link>
                        </li>
                        <li>
                            <Link to="/cadastro">Cadastrar Tarefa</Link>
                        </li>
                    </ul>
                </Navigation>
                <Routes>
                    <Route path="/" element={<ListaTarefas />} />
                    <Route path="/cadastro" element={<CadastroTarefa />} />
                    <Route path="/editar/:id" element={<EditarTarefa />} />
                </Routes>
            </AppContainer>
        </Router>
    );
}

export default App;