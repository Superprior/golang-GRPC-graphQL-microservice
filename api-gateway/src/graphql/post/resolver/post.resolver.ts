import { Resolver, Query, Arg, ID } from 'type-graphql';
import { Post } from '../model/post.model';

@Resolver((of) => Post)
export class PostResolver {
  @Query((returns) => Post)
  post(@Arg('id', (type) => ID) id: string): Post {
    return {} as Post;
  }
}
