import { Field, ID, ObjectType } from "type-graphql";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Upvote } from "./Upvotes";


@Entity()
@ObjectType()
export class Wilder {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id: number;

  @Column()
  @Field()
  name: string;

  @OneToMany(() => Upvote, "wilder")
  @Field(() => [Upvote])
  upvotes: Upvote[];
}
