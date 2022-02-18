from fastapi import APIRouter, status
from pydantic import BaseModel
from typing import List
from schema import Comment


class BulkPostInput(BaseModel):
    postIds: List[str]


router = APIRouter()


@router.post("/posts", response_model=List[Comment], status_code=200)
def get_comments_for_posts(bulkPostInput: BulkPostInput):
    postIds = bulkPostInput.postIds
    list = []
    for i in range(0, len(postIds)):
        id = str(i+1)
        itemId = "COMMENT_ID_"+id
        comment = Comment(id=itemId, text="Comment "+id,
                          postId=postIds[i], authorId="user_id")
        list.append(comment)
    return list
