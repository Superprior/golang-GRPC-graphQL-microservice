import { Comment } from './comment.model';

export interface ICommentService {
  commentsForBulkPostId: (postIds: string[]) => Promise<Comment[]>;
}
