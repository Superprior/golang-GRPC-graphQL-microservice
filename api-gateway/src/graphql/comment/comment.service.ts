import { Service } from 'typedi';
import { ICommentService } from './comment.interface';
import { Comment } from './comment.model';

@Service()
export class CommentService implements ICommentService {
  async commentsForPosts(postIds: string[]): Promise<Comment[]> {
    return [
      {
        id: 'COMMENT_ID_1',
        text: 'COMMENT_1',
        authorId: 'USER_ID',
        postId: 'POST_ID_1'
      } as Comment,
      {
        id: 'COMMENT_ID_2',
        text: 'COMMENT_2',
        authorId: 'USER_ID',
        postId: 'POST_ID_2'
      } as Comment
    ];
  }
}
