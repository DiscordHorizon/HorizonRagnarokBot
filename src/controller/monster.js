const monsterModel = require("../models/monster");
const { MessageEmbed } = require("discord.js");

function sendMonster(message, monster) {
    const monsterCard = new MessageEmbed()
        .setTitle(monster.name.ptBr)
        .setDescription(monster.name.en)
        .setThumbnail(monster.info.gif)
        .setColor("3498DB");
    if (monster.info.outros.boss) {
        monsterCard.addField("Monstro", "MVP ou miniboss");
    } else {
        monsterCard.addField("Monstro", "Normal");
    }
    monsterCard
        .addFields(
            {
                name: "Raça",
                value: monster.info.atributos.race,
                inline: true,
            },
            {
                name: "Elemento",
                value: monster.info.atributos.element,
                inline: true,
            },
            {
                name: "Tamanho",
                value: monster.info.atributos.size,
                inline: true,
            },
            {
                name: "\u200b",
                value: "\u200b",
            },
            {
                name: "Hp",
                value: monster.info.atributos.hp,
                inline: true,
            },
            {
                name: "Exp de base",
                value: monster.info.atributos.baseExp,
                inline: true,
            },
            {
                name: "Exp de Classe",
                value: monster.info.atributos.jobExp,
                inline: true,
            },
            {
                name: "Ataque",
                value: monster.info.atributos.atk,
                inline: true,
            },
            {
                name: "Defesa",
                value: monster.info.atributos.def,
                inline: true,
            },
            {
                name: "Defesa Mágica",
                value: monster.info.atributos.mdef,
                inline: true,
            },
            {
                name: "\u200b",
                value: "\u200b",
            },
            {
                name: "Drops",
                value: "Itens dropados pelo monstro",
            }
        )
        .setTimestamp(new Date())
        .setFooter("RagnarokBot by Bravan");

    let isMvp = false;

    monster.info.drops.forEach((drop) => {
        if (drop.MVPDrop && !isMvp) {
            monsterCard.addFields({
                name: "MVP drops",
                value: 'Itens dropados considerados "MVP drops"',
            });
            isMvp = !isMvp;
        }
        monsterCard.addField(drop.name, drop.rate + "%", true);
    });

    message.channel.send(monsterCard);
}

module.exports = {
    async getMonsters(message, search, command) {
        let monsters = [];
        await monsterModel.find({}, (err, monster) => {
            monsters.push(monster);
        });
    },
    async monsterInfo(message, search) {
        await monsterModel.find({}, (err, monsters) => {
            monsters.forEach((monster) => {
                if (monster.id == search) {
                    sendMonster(message, monster);
                }
            });
        });
    },
};
