from fastapi import BackgroundTasks, Depends, FastAPI, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
import requests
import models
from shared import get_db, listener, run_command

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/installed")
def installed(db: Session = Depends(get_db)):
    return db.query(models.App).all()


@app.post("/install/{app_id}")
def install(app_id: str, background_tasks: BackgroundTasks, db: Session = Depends(get_db)):
    response = requests.get(f"http://store.steampowered.com/api/appdetails/?appids={app_id}")
    response = response.json()

    new_app = models.App(
        id=app_id,
        name=response[app_id]['data']['name'],
        description=response[app_id]['data']['short_description'],
        genres=[genre['description'] for genre in response[app_id]['data'].get('genres', [])],
        developers=response[app_id]['data'].get('developers', []),
        publishers=response[app_id]['data'].get('publishers', []),
        image=response[app_id]['data']['header_image'],
    )
    db.add(new_app)
    db.commit()
    db.refresh(new_app)

    background_tasks.add_task(run_command, command=[f"+app_update {app_id} validate"])

    return new_app


@app.delete("/uninstall/{app_id}")
def uninstall(app_id: str, background_tasks: BackgroundTasks, db: Session = Depends(get_db)):
    db.query(models.App).filter(models.App.id == app_id).first().delete()

    background_tasks.add_task(run_command, command=[f"+app_uninstall {app_id}"])

    return 200


@app.websocket("/ws")
async def subscribe(websocket: WebSocket):
    await websocket.accept()
    await listener.add_subscriber(websocket)
    try:
        while True:
            _ = await websocket.receive_text()
    except WebSocketDisconnect:
        await listener.remove_subscriber(websocket)


if __name__ == "__main__":
    app.run()
