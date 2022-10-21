import { Arg, Mutation, Resolver } from "type-graphql";
import {Skill} from "../entities/Skill";
import {dataSource} from "../utils";


@Resolver()
export class SkillResolver {

  @Mutation(() => Skill)
  async createSkill( @Arg("name") name: string) : Promise<Skill> {
    return await dataSource.getRepository(Skill).save({ name })
  }

}


// export default {
//   add: (req: Request, res: Response) : void => {

//     const skillAdd : ISkillAdd = req.body
//     repository
//       .save(skillAdd)
//       .then((data) : void => {
//         console.log(data);
//         res.json(data);
//       })
//       .catch((err) : void => {
//         console.log(err);
//       });
//   },

//   view: async (req : Request, res : Response) : Promise<void> => {
//     try {
//       const data = await repository.find({
//         relations: ["upvotes", "upvotes.wilder"],
//       });
//       console.log(data);
//       res.json(data);
//     } catch (err) {
//       console.log(err);
//     }
//   },

//   change: async (req : Request, res : Response) : Promise<void> => {
//     const changeId : number = Number(req.params.id);
//     try {
//       const skill = await repository.findOneBy({ id: changeId })
//       if(skill != null){
//         Object.assign(skill, req.body);
//         const updateSkill = repository.save(skill)
//         res.json(updateSkill);
//       }
        
//     }catch (err : any) {
//       console.log(err);
//     }
//   },

//   delete: async (req : Request, res : Response) : Promise<void> => {
//     const deleteName : string = req.params.name;
//     try {
//       await repository.delete({ name: deleteName }).then((data) : void => {
//         console.log(data);
//       });
//     } catch (err : any) {
//       console.log("error when delete", err);
//     }
//   },
// };
