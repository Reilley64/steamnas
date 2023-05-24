from fastapi import BackgroundTasks, Depends, FastAPI
from fastapi.middleware.cors import CORSMiddleware
from run_command import run_command
import database
import models
from sqlalchemy.orm import Session
import requests

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

models.Base.metadata.create_all(bind=database.engine)


def get_db():
    db = database.SessionLocal()
    try:
        yield db
    finally:
        db.close()


@app.get("/installed")
def installed(db: Session = Depends(get_db)):
    return db.query(models.App).all()


@app.post("/install/{app_id}")
def install(app_id: str, background_tasks: BackgroundTasks, db: Session = Depends(get_db)):
    response = requests.get(f"http://store.steampowered.com/api/appdetails/?appids={app_id}")
    response = response.json()

    create = models.App(id=app_id, name=response[app_id]["data"]["name"], image=response[app_id]["data"]["header_image"])
    db.add(create)
    db.commit()
    db.refresh(create)

    background_tasks.add_task(run_command, [f"+app_update {app_id} validate"])

    return create


@app.delete("/uninstall/{app_id}")
def uninstall(app_id: str, background_tasks: BackgroundTasks, db: Session = Depends(get_db)):
    db.query(models.App).filter(models.App.id == app_id).first().delete()

    background_tasks.add_task(run_command, [f"+app_uninstall {app_id}"])

    return 200
