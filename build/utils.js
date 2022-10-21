"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dataSource = void 0;
const typeorm_1 = require("typeorm");
const Skill_1 = require("./entities/Skill");
const Wilder_1 = require("./entities/Wilder");
const Upvotes_1 = require("./entities/Upvotes");
exports.dataSource = new typeorm_1.DataSource({
    type: "sqlite",
    database: "./wilders.db",
    synchronize: true,
    entities: [
        Wilder_1.Wilder, Skill_1.Skill, Upvotes_1.Upvote
    ],
    logging: ["query", "error"],
});
