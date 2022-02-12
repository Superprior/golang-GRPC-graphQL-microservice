from fastapi import APIRouter

from .endpoints import comment
from .endpoints import home

routes = APIRouter()
routes.include_router(comment.router, prefix="/comments", tags=["comment"])
routes.include_router(home.router)
