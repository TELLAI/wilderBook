import { Arg, ID, Mutation, Resolver } from "type-graphql";
import { Skill } from "../entities/Skill";
import { Upvote } from "../entities/Upvotes";
import { Wilder } from "../entities/Wilder";
import {dataSource} from "../utils";


@Resolver()
export class UpvotesResolver {
  @Mutation(() => Upvote)
  async addUpvote(
    @Arg("skill") skill: string,
    @Arg("wilder") wilder: string,
    @Arg("votes") votes: number
  ): Promise<Upvote | null> {
    const wilderId = await dataSource.getRepository(Wilder).findOneBy({
      name: wilder,
    });
    const skillId = await dataSource.getRepository(Skill).findOneBy({
      name: skill,
    });
    if (wilderId != null && skillId != null) {
      const upvote = {
        wilder: { id: wilderId.id, name: wilderId.name },
        skill: { id: skillId.id, name: skillId.name },
        votes,
      };

      const data = await dataSource.getRepository(Upvote).save(upvote);

      return data;
    }
    return null;
  }

  @Mutation(() => Upvote)
  async updateUpvote(
    @Arg("skill") skill: string,
    @Arg("wilder") wilder: string,
    @Arg("votes") votes: number,
    @Arg("voteId", () => ID) voteId: number
  ): Promise<Upvote | null> {
    const wilderId = await dataSource.getRepository(Wilder).findOneBy({
      name: wilder,
    });
    const skillId = await dataSource.getRepository(Skill).findOneBy({
      name: skill,
    });
    if (wilderId != null && skillId != null) {

      const data = await dataSource.getRepository(Upvote).findOne({
        where: {
          id: voteId,
        },
      });

      if(data === null){
        return null
      }
      data.votes = votes

      return await dataSource.getRepository(Upvote).save(data);
    }
    return null;
  }
}
















// import { Request, Response } from "express";
// import {Upvote} from "../entities/Upvotes";
// import {Wilder} from "../entities/Wilder";
// import {Skill} from "../entities/Skill";


// const repository = dataSource.getRepository(Upvote);
// const repoWilder = dataSource.getRepository(Wilder);
// const repoSkill = dataSource.getRepository(Skill);

// export default {
//   add: async (req: Request, res: Response): Promise<void> => {
//     const wilderId = await repoWilder.findOneBy({
//       name: req.body.wilder,
//     });
//     const skillId = await repoSkill.findOneBy({
//       name: req.body.skill,
//     });
//     if (wilderId != null && skillId != null) {
//       const upvote = {
//         wilder: { id: wilderId.id },
//         skill: { id: skillId.id },
//       };

//       const data = await repository.save(upvote);

//       res.json(data);
//     }
//   },

//   update: async (req: Request, res: Response) => {
//     const wilderId = await repoWilder.findOneBy({
//       name: req.body.wilder,
//     });
//     const skillId = await repoSkill.findOneBy({
//       name: req.body.skill,
//     });

//     if (wilderId != null && skillId != null) {
//       const upvote = {
//         wilder: { id: wilderId.id },
//         skill: { id: skillId.id },
//       };
//       const data = await repository.findOneBy(upvote);
//       if (data != null) {
//         data.votes = req.body.newVotes;
//         await repository.save(data);
//         console.log(data);
//       }
//     }
//   },
// };
