import { ObjectType } from 'type-graphql';
import { ConnectionResponse } from '../../common/model/pagination';
// import { PostEdge } from './post.edge.model';
import { Post } from './post.model';

@ObjectType()
export class PostConnection extends ConnectionResponse(Post) {}
