from sqlalchemy import Column, Integer, String, Boolean
from sqlalchemy import Column, Integer, String
from app.database import Base

class Task(Base):
    __tablename__ = 'tasks'

    id = Column(Integer, primary_key=True, index=True)
    titulo = Column(String(100))
    descricao = Column(String(255), nullable=True)
    concluida = Column(Boolean, default=False)

if __name__ == "__main__":
    print("models.py rodando.")