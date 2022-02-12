from fastapi import APIRouter, status

router = APIRouter()


@router.get("/", status_code=200)
def home():
    return {"Hello": "World"}
