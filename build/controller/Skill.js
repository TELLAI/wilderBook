"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Skill_1 = require("../entities/Skill");
const utils_1 = require("../utils");
const repository = utils_1.dataSource.getRepository(Skill_1.Skill);
exports.default = {
    add: (req, res) => {
        const skillAdd = req.body;
        repository
            .save(skillAdd)
            .then((data) => {
            console.log(data);
            res.json(data);
        })
            .catch((err) => {
            console.log(err);
        });
    },
    view: async (req, res) => {
        try {
            const data = await repository.find({
                relations: ["upvotes", "upvotes.wilder"],
            });
            console.log(data);
            res.json(data);
        }
        catch (err) {
            console.log(err);
        }
    },
    change: async (req, res) => {
        const changeId = Number(req.params.id);
        try {
            const skill = await repository.findOneBy({ id: changeId });
            if (skill != null) {
                Object.assign(skill, req.body);
                const updateSkill = repository.save(skill);
                res.json(updateSkill);
            }
        }
        catch (err) {
            console.log(err);
        }
    },
    delete: async (req, res) => {
        const deleteName = req.params.name;
        try {
            await repository.delete({ name: deleteName }).then((data) => {
                console.log(data);
            });
        }
        catch (err) {
            console.log("error when delete", err);
        }
    },
};
