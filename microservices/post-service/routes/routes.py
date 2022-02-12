from fastapi import APIRouter

from .endpoints import post
from .endpoints import home

routes = APIRouter()
routes.include_router(post.router, prefix="/posts", tags=["post"])
routes.include_router(home.router)
