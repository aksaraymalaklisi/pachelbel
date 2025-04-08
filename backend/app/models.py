from sqlalchemy import Column, Integer, String, Boolean
from .database import Base

class Tarefa(Base):
    __tablename__ = 'tarefas'

    id = Column(Integer, primary_key=True, index=True)
    titulo = Column(String(100))
    descricao = Column(String(255), nullable=True)
    concluida = Column(Boolean, default=False)

if __name__ == "__main__":
    print("models.py rodando.")