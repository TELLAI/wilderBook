import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Upvote } from "./Upvotes";
import { Field, ID, ObjectType } from "type-graphql";

@Entity()
@ObjectType()
export class Skill {

  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id: number;

  @Column()
  @Field()
  name : string;

  @OneToMany(() => Upvote, "skill")
  @Field(() => [Upvote])
  upvotes : Upvote[]


}
