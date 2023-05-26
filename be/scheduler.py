import logging

from rocketry import Rocketry
from rocketry.conds import cron

import database
import models
from shared import run_command

app = Rocketry(execution="async")


@app.task(cron("0 4 * * *"))
async def update():
    db = database.SessionLocal()
    app_ids = db.query(models.App.id).all()
    logging.error(app_ids)
    db.close()
    await run_command([f"+app_update {app_id} validate" for app_id in app_ids])


if __name__ == "__main__":
    app.run()
