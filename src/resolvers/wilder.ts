import { Arg, ID, Mutation, Query, Resolver } from "type-graphql";
import {Wilder} from "../entities/Wilder";
import { dataSource } from "../utils";

@Resolver()
export class WildersResolver {
  @Mutation(() => Wilder)
  async createWilder(@Arg("name") name: string): Promise<Wilder> {
    return await dataSource.getRepository(Wilder).save({ name });
  }

  @Mutation(() => Wilder, {nullable: true})
  async deleteWilder(@Arg("id", () => ID) id: number): Promise<Wilder | null> {

    const wilder = await dataSource.getRepository(Wilder).findOne({ where: {id} })

    if(wilder === null){
      return null
    }
     return await dataSource.getRepository(Wilder).remove(wilder);
  }

  @Query(() => [Wilder])
  async getWilders(): Promise<Wilder[]> {
    return await dataSource
      .getRepository(Wilder)
      .find({ relations: ["upvotes", "upvotes.skill"] });
  }

  @Query(() => Wilder, { nullable: true })
  async getOneWilder(@Arg(`id`, () => ID) id: number): Promise<Wilder | null> {
    return await dataSource
      .getRepository(Wilder)
      .findOne({ where: { id }, relations: ["upvotes", "upvotes.skill"] });
  }
}

// export default  {
//     create : (req : Request, res: Response) : void => {
//         dataSource
//         .getRepository(Wilder)
//         .save(req.body)
//         .then(()  : void => {
//             res.send("created wilder")
//         })
//         .catch(() : void => {
//             res.send("Error while created wilder")
//         })
//     },

//     change : (req : Request, res : Response) : void => {
//         const repository = dataSource.getRepository(Wilder)
//         const { id } = req.body
//         const { name } = req.body
        
//         repository.query('UPDATE wilder SET name =? WHERE id =?', [name, id])
//         .then(()  : void => {
//             console.log("it's update")
//         })
//         .catch((err)  : void => {
//             console.log(err)
//         })
//     },

//     view : (req : Request, res : Response) : void => {
//         dataSource
//           .getRepository(Wilder)
//           .find({ relations: ["upvotes", "upvotes.skill"] })
//           .then((data) : void => {
//             res.json(data);
//           })
//           .catch((err) : void => {
//             console.log(err);
//           });
//     },

//     delete : (req : Request, res : Response)  : void => {
//         const deleteId : number  = Number(req.params.id)
//         dataSource
//         .getRepository(Wilder)
//         .delete({ id : deleteId })
//         .then(() : void => {
//             console.log("it's dead")
//         })
//         .catch((err : any) : void => {
//             console.log(err)
//         })
//     },
    
//     find : (req : Request, res : Response)  : void => {
        
//         const findId : number = Number(req.params.id)
//         dataSource.getRepository(Wilder)
//         .findOneBy(
//             { id : findId }
//         )
//         .then((data) : void => {
//             res.json(data)
//         })
//         .catch((err : any) : void => {
//             console.log(err)
//         })
//     },
// }