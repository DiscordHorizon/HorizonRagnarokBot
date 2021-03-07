const monsterModel = require("../models/monster");

module.exports = {
    async getMonsters() {
        const monsters = await monsterModel.listIndexes();
        console.log(monsters);
    },
    async getMonsterInfo(search) {
        try {
            const monster = await monsterModel.findOne({ id: search });
        } catch (error) {
            try {
                const monster = await monsterModel.findOne({
                    name: { ptBr: search },
                });
            } catch (error) {
                const monster = await monsterModel.findOne({
                    name: { en: search },
                });
            }
        }
    },
};
