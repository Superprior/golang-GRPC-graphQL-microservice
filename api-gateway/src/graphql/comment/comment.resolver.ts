import { Resolver, Query, Arg, ID } from 'type-graphql';
import { Service } from 'typedi';
import { Comment } from './comment.model';

@Service()
@Resolver((of) => Comment)
export class CommentResolver {
  @Query((returns) => [Comment])
  comments(@Arg('postId', (type) => ID) postId: string): Comment[] {
    return [];
  }
}
