from typing import List
from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from . import models, schemas
from .database import get_db, engine, SessionLocal

models.Base.metadata.create_all(bind=engine)

app = FastAPI()

# --- CORS ---

origins = [
    "http://localhost:3000",  # A origem do seu frontend React (porta padrão)
    "http://localhost:5173",  # Outras origens que você pode querer permitir
    # "*",                      # Permite todas as origens (apenas para desenvolvimento)
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],      # Permite todos os métodos HTTP (GET, POST, PUT, DELETE, etc.)
    allow_headers=["*"],      # Permite todos os headers
)

# --- Schemas Pydantic ---

class TarefaBase(schemas.TarefaBase):
    pass

class TarefaCreate(schemas.TarefaCreate):
    pass

class Tarefa(schemas.Tarefa):
    pass

# --- Rotas ---

@app.get("/health/")
def health_check():
    return {"status": "ok"}

@app.post("/tarefas/", response_model=Tarefa)
def criar_tarefa(tarefa: TarefaCreate, db: Session = Depends(get_db)):
    db_tarefa = models.Tarefa(**tarefa.dict())
    db.add(db_tarefa)
    db.commit()
    db.refresh(db_tarefa)
    return db_tarefa

@app.get("/tarefas/", response_model=List[Tarefa])
def listar_tarefas(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    tarefas = db.query(models.Tarefa).offset(skip).limit(limit).all()
    return tarefas

@app.get("/tarefas/{tarefa_id}", response_model=Tarefa)
def obter_tarefa(tarefa_id: int, db: Session = Depends(get_db)):
    db_tarefa = db.query(models.Tarefa).filter(models.Tarefa.id == tarefa_id).first()
    if db_tarefa is None:
        raise HTTPException(status_code=404, detail="Tarefa não encontrada")
    return db_tarefa

@app.put("/tarefas/{tarefa_id}", response_model=Tarefa)
def atualizar_tarefa(tarefa_id: int, tarefa: TarefaCreate, db: Session = Depends(get_db)):
    db_tarefa = db.query(models.Tarefa).filter(models.Tarefa.id == tarefa_id).first()
    if db_tarefa is None:
        raise HTTPException(status_code=404, detail="Tarefa não encontrada")
    for key, value in tarefa.dict(exclude_unset=True).items():
        setattr(db_tarefa, key, value)
    db.add(db_tarefa)
    db.commit()
    db.refresh(db_tarefa)
    return db_tarefa

@app.delete("/tarefas/{tarefa_id}", response_model=Tarefa)
def deletar_tarefa(tarefa_id: int, db: Session = Depends(get_db)):
    db_tarefa = db.query(models.Tarefa).filter(models.Tarefa.id == tarefa_id).first()
    if db_tarefa is None:
        raise HTTPException(status_code=404, detail="Tarefa não encontrada")
    db.delete(db_tarefa)
    db.commit()
    return db_tarefa

# --- Testes ---

