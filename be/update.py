from run_command import run_command
import database
import models


def main():
    db = database.SessionLocal()
    query = db.query(models.App).all()
    db.close()

    run_command([f"+app_update {single.id} validate" for single in query])


if __name__ == "__main__":
    main()
