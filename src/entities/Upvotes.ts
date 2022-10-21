import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Field, ID, Int, ObjectType } from "type-graphql";
import { Wilder } from "./Wilder";
import { Skill } from "./Skill";

@Entity()
@ObjectType()
export class Upvote {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id: number;

  @Column({ default: 0 })
  @Field(() => Int)
  votes: number;

  @ManyToOne(() => Wilder, "upvotes", { onDelete: "CASCADE" })
  @Field(() => Wilder)
  wilder: Wilder;

  @ManyToOne(() => Skill, "upvotes")
  @Field(() => Skill)
  skill: Skill;
}
