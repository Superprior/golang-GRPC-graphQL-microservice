import { Service } from 'typedi';
import { Post } from './model/post.model';
import { IPostService } from './post.interface';
import { POST_SERVICE_URL } from '../../config';
import { HttpClient } from '../service/http.service';

@Service()
export class PostService implements IPostService {
  // eslint-disable-next-line no-empty-function
  constructor(private readonly httpClient: HttpClient) {}

  async getPostById(id: string): Promise<Post> {
    const post = await this.httpClient.get<Post>(
      `${POST_SERVICE_URL}/posts/${id}`
    );
    return post;
  }

  async getAllPostsByUser(userId: string): Promise<Post[]> {
    const posts = await this.httpClient.get<Post[]>(
      `${POST_SERVICE_URL}/posts/users/${userId}`
    );
    return posts;
  }
}
