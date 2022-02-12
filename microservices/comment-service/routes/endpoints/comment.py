from fastapi import APIRouter, status
from typing import List
from schema import Comment

router = APIRouter()


@router.get("/{post_id}", response_model=List[Comment], status_code=200)
def get_comments_for_post(post_id: str):
    list = []
    for i in range(0, 10):
        comment = Comment(text="Comment "+str(i+1), postId=post_id)
        list.append(comment)
    return list
