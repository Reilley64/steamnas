from sqlalchemy import Column, String
from database import Base

class App(Base):
    __tablename__ = "apps"

    id = Column(String, primary_key=True, index=True)
    name = Column(String)
    image = Column(String)
