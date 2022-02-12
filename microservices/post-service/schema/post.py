from pydantic import BaseModel


class Post(BaseModel):
    id: str
    title: str
    text: str
    userId: str
