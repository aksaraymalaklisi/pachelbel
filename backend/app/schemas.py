from pydantic import BaseModel

class TarefaBase(BaseModel):
    titulo: str
    descricao: str | None = None
    concluida: bool = False  # Certifique-se de que é bool aqui

class TarefaCreate(TarefaBase):
    pass

class Tarefa(TarefaBase):
    id: int

    class Config:
        from_attributes = True