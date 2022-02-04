import { Resolver, Query, Args, Arg, ID, Mutation } from 'type-graphql';
import Post from '../models/post/post';

@Resolver((of) => Post)
export default class MovieListResolver {
  @Query((returns) => Post)
  movieList(@Arg('id', (type) => ID) id: string): Post {
    return {} as Post;
  }
}
