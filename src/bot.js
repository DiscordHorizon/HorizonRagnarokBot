const Discord = require('discord.js');
const { config } = require('./config');

const bot = new Discord.Client();

bot.on('ready', () => {
    await bot.user.setPresence({
        activity: {
            name: `Bora jogar Ragnarok!!!`,
            type: 1,
            url: "https://twitch.tv/bravanzin",
        },
    });
    users(bot.guilds.cache.get(config.channels.guild));
    console.log("[Bot] Connected");
})

bot.login(config.tokens.discord);