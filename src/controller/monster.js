const monsterModel = require("../models/monster");
const { MessageEmbed } = require("discord.js");
const { monsterInfo } = require('../include/monsterInfo');

async function listMonsters(message, monsters, search) {
    const monstersCard = new MessageEmbed()
            .setTitle("Monstros")
            .setDescription(`Lista de monstros que contém: \`${search}\` no nome`)
        monsters.forEach(id => {
            const monster = await monsterModel.findOne({ id: id });
            monstersCard.addField(monster.name.ptBr, monster.name.en);
        })
            .setTimestamp(new Date())
            .setFooter("RagnarokBot by Bravan");
        message.edit(monstersCard);
}

module.exports = {
    async getMonsters(message, search, command) {
        let monsters = [];
        await monsterModel.find({}, (err, monster) => {
            monsters.push(monster);
        });
    },
    async monsterSearch(message, search) {
        const sendMessage = await message.channel.send(new MessageEmbed().setTitle('Processando...'));
        let searchsIds = [];
        await monsterModel.find({}, (err, monsters) => {
            monsters.forEach((monster) => {
                const monsterNameBr = monster.name.ptBr.toLowerCase();
                const monsterNameEn = monster.name.en.toLowerCase();
                if (monster.id == search) {
                    return monsterInfo(sendMessage, monster);
                }
                if (monsterNameBr === search) {
                    return monsterInfo(sendMessage, monster);
                }
                if (monsterNameEn === search) {
                    return monsterInfo(sendMessage, monster);
                }
                if (monsterNameBr.includes(search)) {
                    searchsIds.push(monster.id);
                }
                if (monsterNameEn.includes(search)) {
                    searchsIds.push(monster.id);
                }
            });
            if (searchsIds.length) {
                if (searchsIds.length === 1) {
                    const monsterInfo = monsterModel.findOne({ id: searchsIds[0]});
                    monsterInfo(sendMessage, monsterInfo);
                }
                listMonsters(sendMessage, searchsIds, search);
            }
        });
    },
};
