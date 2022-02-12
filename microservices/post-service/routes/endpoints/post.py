from fastapi import APIRouter, status
from typing import List
from schema import Post

router = APIRouter()


@router.get("/{user_id}", response_model=List[Post], status_code=200)
def get_posts_for_user(user_id: str):
    list = []
    for i in range(0, 10):
        itemId = str(i+1)
        post = Post(id=itemId, title="Post "+itemId,
                    text=str(i+1)+" Post", userId=user_id)
        list.append(post)
    return list
