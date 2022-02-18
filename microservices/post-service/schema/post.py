from pydantic import BaseModel


class Post(BaseModel):
    id: str
    title: str
    body: str
    userId: str
