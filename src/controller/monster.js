const monsterModel = require("../models/monster");

module.exports = {
    async getMonsters(message, search, command) {
        let monsters = [];
        await monsterModel.find({} , (err, monster) => {
            monsters.push(monster);
        });
        if (command === 'info') {
            this.getMonsterInfo(message, search);
        }
    },
    async getMonsterInfo(message, search) {
        console.log(monsters.find(search));
    },
};
