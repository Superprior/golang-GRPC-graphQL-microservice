import { Resolver, Query, Arg, ID, FieldResolver, Root } from 'type-graphql';
import { Service } from 'typedi';
import DataLoader from 'dataloader';
import { Loader } from 'type-graphql-dataloader';
import groupBy from 'lodash.groupby';
import { Comment, CommentService } from '../../comment';
import { Post } from '../model/post.model';

let commentServiceRef: CommentService;

@Service()
@Resolver((of) => Post)
export class PostResolver {
  constructor(commentService: CommentService) {
    commentServiceRef = commentService;
  }

  @Query((returns) => [Post])
  async posts(@Arg('userId', (type) => ID) userId: string): Promise<Post[]> {
    return [
      {
        id: 'POST_ID_1',
        userId: 'USER_ID',
        title: 'TITLE_1',
        body: 'BODY_1'
      } as Post,
      {
        id: 'POST_ID_2',
        userId: 'USER_ID',
        title: 'TITLE_2',
        body: 'BODY_2'
      } as Post
    ];
  }

  @Query((returns) => Post)
  post(@Arg('id', (type) => ID) id: string): Post {
    return {} as Post;
  }

  @FieldResolver()
  @Loader<string, any>(async (ids, { context }) => {
    const postComments = await commentServiceRef.commentsForPosts(
      ids as string[]
    );
    const commentsById = groupBy(postComments, 'postId');
    return ids.map((id) => commentsById[id] ?? []);
  })
  async comments(@Root() post: Post) {
    return (dataLoader: DataLoader<string, Comment[]>) =>
      dataLoader.load(post.id);
  }
}
