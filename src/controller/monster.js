const monsterModel = require("../models/monster");
const { MessageEmbed } = require('discord.js');

function sendMonster(message, monster) {
    const monsterCard = new MessageEmbed()
        .setTitle(monster.name.ptBr)
        .setThumbnail(monster.info.gif);
    message.channel.send(monsterCard);
}

module.exports = {
    async getMonsters(message, search, command) {
        let monsters = [];
        await monsterModel.find({} , (err, monster) => {
            monsters.push(monster);
        });
    },
    async monsterInfo(message, search) {
        await monsterModel.find({}, (err, monsters) => {
            monsters.forEach(monster => {
                if (monster.id == search) {
                    sendMonster(message, monster)
                }
            })
        })
    }
}