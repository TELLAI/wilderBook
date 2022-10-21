
import {dataSource} from"./utils"
import { ApolloServer } from "apollo-server";
import { buildSchema } from "type-graphql";
import { WildersResolver } from "./resolvers/wilder";
import { UpvotesResolver } from "./resolvers/Upvotes";
import { SkillResolver } from "./resolvers/Skill";


const PORT = 5000;

async function bootstrap() : Promise<void>{
  // ... Building schema here
  const schema = await buildSchema({
    resolvers: [WildersResolver, UpvotesResolver, SkillResolver]
  });

  // Create the GraphQL server
  const server = new ApolloServer({
    schema,
  });

  // Start the server
  const { url } = await server.listen(PORT);
  // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
  console.log(`Server is running, GraphQL Playground available at ${url}`);

  try{
    await dataSource.initialize();
    console.log("I'm connected");
  } catch(err) {
    console.log("Dommage")
    console.log(err)
  }
}

// eslint-disable-next-line @typescript-eslint/no-floating-promises
bootstrap();

// server.listen(5000).then(
//   async () => {
//     console.log("listening on port 5000")   
    
//   try {
//     await dataSource.initialize()
    
//   }catch(err : any){
//     console.log("Error when initialized dataSource", err)
//   }
//     })












// import express, {Request, Response} from "express";
// import bodyParser from "body-parser";

// import wilderController from "./controller/wilder";
// import skillController from "./controller/Skill";
// import connexionController from "./controller/Upvotes";
// import multer from "./middleware/multer-config"
// import cors from "cors";
// const app = express();

// interface IOptions {
//   origin: [string];
//   credentials: boolean;
//   allowedHeaders: string[];
//   exposedHeaders: string[];
//   methods: string;
//   preflightContinue: boolean;
// }

// const corsOptions : IOptions = {
//   origin: ["http://localhost:3000"],
//   credentials: true,
//   allowedHeaders: ["sessionId", "Content-Type"],
//   exposedHeaders: ["sessionId"],
//   methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
//   preflightContinue: false,
// };

// app.use(cors(corsOptions));
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

// app.get("/", (req : Request, res : Response) => {
//     console.log("request info : ", req.url)
//     res.send("hello")
// })


// // Wilder routes
// app.post("/api/wilder/add", multer, wilderController.create);
// app.put("/api/wilder/change", wilderController.change)
// app.delete("/api/wilder/delete/:id", wilderController.delete)
// app.get("/api/wilder/liste", wilderController.view)
// app.get("/api/wilder/find/:id", wilderController.find)

// // Skill Routes
// app.post("/api/skill/add", skillController.add)
// app.get("/api/skill/liste", skillController.view)
// app.put("/api/skill/change", skillController.change)
// app.delete("/api/skill/delete/:name", skillController.delete)

// // relation skill wilder
// // app.post("/api/connexion/add/:skillName/:wilderName/", wilderController.addSkill)
// app.post("/api/connexion/add",  connexionController.add);
// app.put("/api/connexion/update", connexionController.update);


