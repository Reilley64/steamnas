from sqlalchemy import ARRAY, Column, String

from database import Base


class App(Base):
    __tablename__ = "apps"

    id = Column(String, primary_key=True, index=True)
    name = Column(String)
    description = Column(String)
    genres = Column(ARRAY(String))
    developers = Column(ARRAY(String))
    publishers = Column(ARRAY(String))
    image = Column(String)
