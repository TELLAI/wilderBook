"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Wilder_1 = require("../entities/Wilder");
const utils_1 = require("../utils");
exports.default = {
    create: (req, res) => {
        utils_1.dataSource
            .getRepository(Wilder_1.Wilder)
            .save(req.body)
            .then(() => {
            res.send("created wilder");
        })
            .catch(() => {
            res.send("Error while created wilder");
        });
    },
    change: (req, res) => {
        const repository = utils_1.dataSource.getRepository(Wilder_1.Wilder);
        const { id } = req.body;
        const { name } = req.body;
        repository.query('UPDATE wilder SET name =? WHERE id =?', [name, id])
            .then(() => {
            console.log("it's update");
        })
            .catch((err) => {
            console.log(err);
        });
    },
    view: (req, res) => {
        utils_1.dataSource
            .getRepository(Wilder_1.Wilder)
            .find({ relations: ["upvotes", "upvotes.skill"] })
            .then((data) => {
            res.json(data);
        })
            .catch((err) => {
            console.log(err);
        });
    },
    delete: (req, res) => {
        const deleteId = Number(req.params.id);
        utils_1.dataSource
            .getRepository(Wilder_1.Wilder)
            .delete({ id: deleteId })
            .then(() => {
            console.log("it's dead");
        })
            .catch((err) => {
            console.log(err);
        });
    },
    find: (req, res) => {
        const findId = Number(req.params.id);
        utils_1.dataSource.getRepository(Wilder_1.Wilder)
            .findOneBy({ id: findId })
            .then((data) => {
            res.json(data);
        })
            .catch((err) => {
            console.log(err);
        });
    },
};
