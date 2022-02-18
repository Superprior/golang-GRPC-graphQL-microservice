import { Resolver, Query, Arg, ID, FieldResolver, Root } from 'type-graphql';
import { Service } from 'typedi';
import DataLoader from 'dataloader';
import { Loader } from 'type-graphql-dataloader';
import groupBy from 'lodash.groupby';
import { Comment, CommentService } from '../../comment';
import { Post } from '../model/post.model';
import { PostService } from '../post.service';
import { PostResultUnion } from '../post.unions';

let commentServiceRef: CommentService;

@Service()
@Resolver((of) => Post)
export class PostResolver {
  constructor(
    private readonly postService: PostService,
    commentService: CommentService
  ) {
    commentServiceRef = commentService;
  }

  @Query((returns) => [Post])
  async posts(@Arg('userId', (type) => ID) userId: string): Promise<Post[]> {
    const posts = await this.postService.getAllPostsByUser(userId);
    return posts;
  }

  @Query((returns) => PostResultUnion)
  async post(
    @Arg('id', (type) => ID) id: string
  ): Promise<typeof PostResultUnion> {
    const post = await this.postService.getPostById(id);
    if (post) return post;
    return { code: '10', message: 'Post not found!' };
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
