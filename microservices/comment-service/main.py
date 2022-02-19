import uvicorn
from typing import Optional

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes import routes

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(routes)
if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=9003)

# python3 main.py

# https://fastapi.tiangolo.com/uk/deployment/docker/#build-a-docker-image-for-fastapi
# Start with the url below because it conforms the service project folder
# https://fastapi.tiangolo.com/uk/deployment/docker/#build-a-docker-image-with-a-single-file-fastapi
