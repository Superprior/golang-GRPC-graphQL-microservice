import { Post } from './model/post.model';

export interface IPostService {
  getPostById: (id: string) => Promise<Post>;
  getAllPostsByUser: (userId: string) => Promise<Post[]>;
}
