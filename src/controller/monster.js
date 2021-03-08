const monsterModel = require("../models/monster");

async function getMonsters() {
    var monsters = [];
    await monsterModel.find({} , (err, monster) => {
        monsters.push(monster);
    });
}
getMonsters();

module.exports = {
    async getMonsterInfo(message, search) {
        console.log(monsters.find(search));
    },
};
