import { Resolver, Query, Args, Ctx } from 'type-graphql';
import { PaginationArgs } from '../../common/model/pagination';
import { PostConnection } from '../model/post.connection.model';

@Resolver((of) => PostConnection)
export class PostConnectionResolver {
  @Query((returns) => PostConnection)
  posts(@Args() params: PaginationArgs): PostConnection {
    return {} as PostConnection;
  }
}
