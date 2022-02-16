import { Comment } from './comment.model';

export interface ICommentService {
  commentsForPosts: (postIds: string[]) => Promise<Comment[]>;
}
