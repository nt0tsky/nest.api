import {Field, InputType} from '@nestjs/graphql';

@InputType()
export class NewBookmarkInput {
  @Field({nullable: false})
  description: string;
}