import { ObjectType } from 'type-graphql';
import { EdgeResponse } from '../../common/pagination';
import { Post } from './post.model';

@ObjectType()
export class PostEdge extends EdgeResponse(Post) {}
