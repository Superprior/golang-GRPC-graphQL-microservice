import { Resolver, Query, Args, Ctx } from 'type-graphql';
import ConnectionArgs from '../arguments/paginationArgs';
import PostConnection from '../models/post/postConnection';

@Resolver((of) => PostConnection)
export default class PostConnectionResolver {
  @Query((returns) => PostConnection)
  posts(@Args() params: ConnectionArgs): PostConnection {
    return {} as PostConnection;
  }
}
