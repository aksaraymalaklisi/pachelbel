-- Cria o banco de dados sistema_db se ele não existir
CREATE DATABASE IF NOT EXISTS sistema_db;

-- Seleciona o banco de dados sistema_db para uso
USE sistema_db;

-- Cria a tabela tarefas se ela não existir
CREATE TABLE IF NOT EXISTS tarefas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(100) NOT NULL,
    descricao VARCHAR(255),
    concluida BOOLEAN DEFAULT FALSE
);

-- Insere dados iniciais na tabela tarefas (opcional, mas útil para testes)
INSERT INTO tarefas (titulo, descricao, concluida) VALUES
('Estudar FastAPI', 'Aprender os conceitos básicos', FALSE),
('Criar frontend React', 'Desenvolver a interface do usuário', FALSE),
('Integrar API com React', 'Conectar o frontend ao backend', FALSE);