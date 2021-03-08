const monsterModel = require("../models/monster");
const { MessageEmbed } = require("discord.js");
const { monsterInfo } = require("../include/monsterInfo");

module.exports = {
    async monsterSearch(message, search) {
        let monsterFound = false;
        const sendMessage = await message.channel.send(
            new MessageEmbed().setTitle("Processando...")
        );
        await monsterModel.find({}, (err, monsters) => {
            monsters.every((monster) => {
                const monsterNameBr = monster.name.ptBr.toLowerCase();
                const monsterNameEn = monster.name.en.toLowerCase();
                if (monster.id == search) {
                    monsterFound = !monsterFound;
                    monsterInfo(sendMessage, monster);
                    return false;
                }
                if (monsterNameBr.includes(search)) {
                    monsterFound = !monsterFound;
                    monsterInfo(sendMessage, monster);
                    return false;
                }
                if (monsterNameEn.includes(search)) {
                    monsterFound = !monsterFound;
                    monsterInfo(sendMessage, monster);
                    return false;
                }
            });
        });
        if (!monsterFound) {
            sendMessage.edit(
                new MessageEmbed()
                    .setTitle("Nenhum monstro encontrado.")
                    .setTimestamp(Date.now())
                    .setFooter("RagnarokBot by Bravan")
            );
        }
    },
};
