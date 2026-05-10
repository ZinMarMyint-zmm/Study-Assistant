from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session

import models, schemas 
from database import engine,SessionLocal

from fastapi.middleware.cors import CORSMiddleware

models.Base.metadata.create_all(bind=engine)

app = FastAPI()

origins = [
    "http://localhost:3000",
    "https://study-assistant-ten.vercel.app",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

# DB connection
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Create Tasks
@app.post("/tasks",response_model=schemas.TaskResponse)
def create_task(task: schemas.TaskCreate,db: Session = Depends(get_db)):
    db_task = models.Task(
        title = task.title,
        description = task.description
    )
    db.add(db_task)
    db.commit()
    db.refresh(db_task)
    return db_task

# Get Tasks
@app.get("/tasks",response_model = list[schemas.TaskResponse])
def get_tasks(db: Session = Depends(get_db)):
    return db.query(models.Task).all()

@app.post("/ai/suggest-plan")
def suggest_plan(days: int):
    plan = []

    for i in range(1, days + 1):
        plan.append(f"Day {i}: Study topic {i}")

    return {"plan": plan}

@app.post("/ai/summarize")
def summarize(text: str):
    words = text.split()
    short = " ".join(words[:20])
    return {"summary": short}

#delete task
@app.delete("/tasks/{task_id}")
def delete_task(task_id: int, db: Session = Depends(get_db)):
    task = db.query(models.Task).filter(models.Task.id == task_id).first()

    if not task:
        return {"error": "Task not found"}

    db.delete(task)
    db.commit()

    return {"message": "Task deleted"}

#complete task
@app.put("/tasks/{task_id}/complete")
def complete_task(task_id: int, db: Session = Depends(get_db)):
    task = db.query(models.Task).filter(models.Task.id == task_id).first()

    if not task:
        return {"error": "Task not found"}

    task.status = "completed"

    db.commit()
    db.refresh(task)

    return task

#edit task
@app.put("/tasks/{task_id}/edit")
def edit_task(
    task_id: int,
    updated_task: schemas.TaskCreate,
    db: Session = Depends(get_db)
):
    task = db.query(models.Task).filter(models.Task.id == task_id).first()

    if not task:
        return {"error": "Task not found"}

    task.title = updated_task.title
    task.description = updated_task.description

    db.commit()
    db.refresh(task)

    return task