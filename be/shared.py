import asyncio
from fastapi import WebSocket
import os
import database


class Listener:
    def __init__(self):
        self.subscribers = []

    async def add_subscriber(self, websocket: WebSocket):
        self.subscribers.append(websocket)

    async def remove_subscriber(self, websocket: WebSocket):
        self.subscribers.remove(websocket)

    async def notify_subscribers(self, message: str):
        for subscriber in self.subscribers:
            await subscriber.send_text(message)


listener = Listener()


def get_db():
    db = database.SessionLocal()
    try:
        yield db
    finally:
        db.close()


async def run_command(command):
    full_command = [
        "steamcmd",
        "+@NoPromptForPassword 1",
        "+@sSteamCmdForcePlatformType windows",
        f"+login {os.environ['STEAM_USERNAME']} {os.environ['STEAM_PASSWORD']}",
    ]
    full_command.extend(command)
    full_command.append("+quit")

    p = await asyncio.create_subprocess_exec(*full_command, stdout=asyncio.subprocess.PIPE,
                                             stderr=asyncio.subprocess.PIPE)
    while True:
        stdout = await p.stdout.readline()
        stderr = await p.stderr.readline()

        if stdout:
            await listener.notify_subscribers(stdout.decode().strip())
        if stderr:
            await listener.notify_subscribers(stderr.decode().strip())

        if not stdout and not stderr and p.returncode is not None:
            break
