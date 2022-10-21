"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Upvotes_1 = require("../entities/Upvotes");
const Wilder_1 = require("../entities/Wilder");
const Skill_1 = require("../entities/Skill");
const utils_1 = require("../utils");
const repository = utils_1.dataSource.getRepository(Upvotes_1.Upvote);
const repoWilder = utils_1.dataSource.getRepository(Wilder_1.Wilder);
const repoSkill = utils_1.dataSource.getRepository(Skill_1.Skill);
exports.default = {
    add: async (req, res) => {
        const wilderId = await repoWilder.findOneBy({
            name: req.body.wilder,
        });
        const skillId = await repoSkill.findOneBy({
            name: req.body.skill,
        });
        if (wilderId != null && skillId != null) {
            const upvote = {
                wilder: { id: wilderId.id },
                skill: { id: skillId.id },
            };
            const data = await repository.save(upvote);
            res.json(data);
        }
    },
    update: async (req, res) => {
        const wilderId = await repoWilder.findOneBy({
            name: req.body.wilder,
        });
        const skillId = await repoSkill.findOneBy({
            name: req.body.skill,
        });
        if (wilderId != null && skillId != null) {
            const upvote = {
                wilder: { id: wilderId.id },
                skill: { id: skillId.id },
            };
            const data = await repository.findOneBy(upvote);
            if (data != null) {
                data.votes = req.body.newVotes;
                await repository.save(data);
                console.log(data);
            }
        }
    },
};
