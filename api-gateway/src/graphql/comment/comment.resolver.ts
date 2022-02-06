import { Resolver, Query, Args, Arg, ID, Mutation } from 'type-graphql';
import { Comment } from './comment.model';

@Resolver((of) => Comment)
export class CommentResolver {
  @Query((returns) => [Comment])
  comments(@Arg('postId', (type) => ID) postId: string): Comment[] {
    return [];
  }
}
