import { ObjectType } from 'type-graphql';
import { EdgeResponse } from '../../common/model/pagination';
import { Post } from './post.model';

@ObjectType()
export class PostEdge extends EdgeResponse(Post) {}
