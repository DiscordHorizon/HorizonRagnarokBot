const monsterModel = require("../models/monster");
const { MessageEmbed } = require("discord.js");
const { monsterInfo } = require("../include/monsterInfo");

module.exports = {
    async monsterSearch(message, search) {
        const sendMessage = await message.channel.send(
            new MessageEmbed().setTitle("Processando...")
        );
        await monsterModel.find({}, (err, monsters) => {
            monsters.forEach((monster) => {
                const monsterNameBr = monster.name.ptBr.toLowerCase();
                const monsterNameEn = monster.name.en.toLowerCase();
                if (monster.id == search) {
                    return monsterInfo(sendMessage, monster);
                }
                if (monsterNameBr.includes(search)) {
                    return monsterInfo(sendMessage, monster);
                }
                if (monsterNameEn.includes(search)) {
                    return monsterInfo(sendMessage, monster);
                }
            });
        });
    },
};
