from fastapi import APIRouter

router = APIRouter()


@router.get("/salud")
def salud():
    return {"estado": "ok"}
