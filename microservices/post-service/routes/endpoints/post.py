from fastapi import APIRouter, status
from typing import List
from schema import Post

router = APIRouter()


@router.get("/users/{userId}", response_model=List[Post], status_code=200)
def get_posts_by_user(userId: str):
    list = []
    for i in range(0, 2):
        id = str(i+1)
        itemId = "POST_ID_"+id
        post = Post(id=itemId, title="Post "+id,
                    body=str(i+1)+" Post", userId=userId)
        list.append(post)
    return list


@router.get("/{id}", response_model=Post, status_code=200)
def get_post(id: str):
    return Post(id=id, title="Post A",
                body="This is a nice post", userId="user_id")
