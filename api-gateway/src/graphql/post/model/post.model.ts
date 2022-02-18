import { ObjectType, Field, ID } from 'type-graphql';
import { Comment } from '../../comment';

@ObjectType()
export class Post {
  @Field((type) => ID)
  id: string;

  @Field((type) => String)
  title: string;

  @Field((type) => String)
  body: string;

  @Field((type) => String)
  userId: string;

  @Field((type) => [Comment])
  comments: Comment[];
}
