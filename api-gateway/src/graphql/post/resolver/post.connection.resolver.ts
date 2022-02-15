import { Resolver, Query, Args } from 'type-graphql';
import { Service } from 'typedi';
import { PaginationArgs } from '../../common/model/pagination';
import { PostConnection } from '../model/post.connection.model';

@Service()
@Resolver((of) => PostConnection)
export class PostConnectionResolver {
  @Query((returns) => PostConnection)
  posts(@Args() params: PaginationArgs): PostConnection {
    return {} as PostConnection;
  }
}
