import { Service } from 'typedi';
import { HttpClient } from '../../middleware/http.client';
import { ICommentService } from './comment.interface';
import { Comment } from './comment.model';
import { COMMENT_SERVICE_URL } from '../../config';

@Service()
export class CommentService implements ICommentService {
  // eslint-disable-next-line no-empty-function
  constructor(private readonly httpClient: HttpClient) {}

  async commentsForPosts(postIds: string[]): Promise<Comment[]> {
    const url = `${COMMENT_SERVICE_URL}/comments/posts`;
    const comments = await this.httpClient.post<Comment[]>(url, { postIds });
    return comments;
  }
}
