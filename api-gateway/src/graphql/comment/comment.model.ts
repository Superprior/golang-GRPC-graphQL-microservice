import { ObjectType, Field, ID } from 'type-graphql';

@ObjectType()
export class Comment {
  @Field((type) => ID)
  id: string;

  @Field((type) => String)
  text: string;

  @Field((type) => String)
  authorId: string;

  @Field((type) => String)
  postId: string;

  @Field((type) => Number)
  createdAt: number;

  @Field((type) => Number)
  updatedAt: number;
}
