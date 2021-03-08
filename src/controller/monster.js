const monsterModel = require("../models/monster");
const { MessageEmbed } = require('discord.js');

function sendMonster(message, monster) {
    const monsterCard = new MessageEmbed()
        .setTitle(monster.name.ptBr)
        .setDescription(monster.name.en)
        .setThumbnail(monster.info.gif)
        .setColor("3498DB")
        .addFields(
            {
                name: 'HP',
                value: monster.info.hp,
                inline: true
            }
        )
        .setFooter('RagnarokBot by Bravan')
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