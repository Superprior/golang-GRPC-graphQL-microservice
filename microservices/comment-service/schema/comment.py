from pydantic import BaseModel


class Comment(BaseModel):
    id: str
    text: str
    postId: str
