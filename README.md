## Back-end (FastAPI)

- **Estrutura do Projeto:**
    * Contém uma estrutura básica de pastas com `app` contendo os arquivos principais (`main.py`, `models.py`, `schemas.py`, `database.py`).

- **Modelo de Dados (`models.py`):**
    * O modelo em SQLAlchemy foi definido a tabela `tarefas` com os campos `id`, `titulo`, `descricao` e `concluida`.

- **Conexão com o Banco de Dados (`database.py`):**
    * A conexão com o banco de dados MySQL foi configurado com SQLAlchemy no arquivo database.py.

- **Rotas da API (`main.py`):**
    * Estas são as seguintes rotas usadas (não inclui /health/, que é para testes.)
        * `POST /tarefas/`: Criar uma nova tarefa.
        * `GET /tarefas/`: Listar todas as tarefas.
        * `GET /tarefas/{tarefa_id}`: Obter uma tarefa específica por ID.
        * `PUT /tarefas/{tarefa_id}`: Atualizar uma tarefa existente.
        * `DELETE /tarefas/{tarefa_id}`: Deletar uma tarefa.

- **CORS (`main.py`):**
    * Foi configurado o middleware CORS para permitir requisições do front-end React (rodando em `http://localhost:3000` e `http://localhost:5173`).

- **Script SQL (`schema.sql`):**
    * Há um script SQL para criar o banco de dados `sistema_db` e a tabela `tarefas`.

## Front-end (React com Vite)

Não há muito o que dizer. Vite, Axios, React Router e Styled Components foram utilizados.

## Adicionais

### Iniciar Uvicorn
- É necessário estar na pasta backend.
```
uvicorn app.main:app --reload
```

### Instalar e iniciar Vite 
- É necessário estar na pasta app.
```
npm install
npm run dev
```

### Arquivo .env
É necessário preencher as seguintes entradas:
```
DB_USER=fastapi_user
DB_PASS=senha_do_usuario
DB_HOST=localhost
DB_PORT=3306
DB_NAME=sistema_db
