from pydantic import BaseModel


class Comment(BaseModel):
    text: str
    postId: str
