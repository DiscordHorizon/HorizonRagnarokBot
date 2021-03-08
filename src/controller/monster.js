const monsterModel = require("../models/monster");

module.exports = {
    async getMonsters(message, search, command) {
        let monsters = [];
        await monsterModel.find({} , (err, monster) => {
            monsters.push(monster);
        });
    },
    async monsterInfo(message, search) {
        await monsterModel.find({}, (err, monster) => {
            if (monster.id === search) console.log(monster);
        })
    }
}