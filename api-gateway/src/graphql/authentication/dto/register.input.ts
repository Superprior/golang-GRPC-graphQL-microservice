import { InputType, Field } from 'type-graphql';
import { IsEmail } from 'class-validator';

@InputType({ description: 'Register Input' })
export class RegisterInput {
  @Field((type) => String)
  @IsEmail()
  email: string;

  @Field((type) => String)
  password: string;

  @Field((type) => String)
  name: string;
}
