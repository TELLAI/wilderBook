"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const utils_1 = require("./utils");
const wilder_1 = __importDefault(require("./controller/wilder"));
const Skill_1 = __importDefault(require("./controller/Skill"));
const Upvotes_1 = __importDefault(require("./controller/Upvotes"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const corsOptions = {
    origin: ["http://localhost:3000"],
    credentials: true,
    allowedHeaders: ["sessionId", "Content-Type"],
    exposedHeaders: ["sessionId"],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
};
app.use((0, cors_1.default)(corsOptions));
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.get("/", (req, res) => {
    console.log("request info : ", req.url);
    res.send("hello");
});
// Wilder routes
app.post("/api/wilder/add", wilder_1.default.create);
app.put("/api/wilder/change", wilder_1.default.change);
app.delete("/api/wilder/delete/:id", wilder_1.default.delete);
app.get("/api/wilder/liste", wilder_1.default.view);
app.get("/api/wilder/find/:id", wilder_1.default.find);
// Skill Routes
app.post("/api/skill/add", Skill_1.default.add);
app.get("/api/skill/liste", Skill_1.default.view);
app.put("/api/skill/change", Skill_1.default.change);
app.delete("/api/skill/delete/:name", Skill_1.default.delete);
// relation skill wilder
// app.post("/api/connexion/add/:skillName/:wilderName/", wilderController.addSkill)
app.post("/api/connexion/add", Upvotes_1.default.add);
app.put("/api/connexion/update", Upvotes_1.default.update);
const start = async () => {
    try {
        await utils_1.dataSource.initialize();
        app.listen(5000, () => {
            console.log("listening on port 5000");
        });
    }
    catch (err) {
        console.log("Error when initialized dataSource", err);
    }
};
void start();
