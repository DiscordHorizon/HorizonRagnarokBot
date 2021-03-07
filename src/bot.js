const Discord = require('discord.js');
const { config } = require('./config');

const bot = new Discord.Client();

bot.on('ready', async () => {
    await bot.user.setPresence({
        activity: {
            name: `Bora jogar Ragnarok!!!`,
            type: 1,
            url: "https://twitch.tv/bravanzin",
        },
    });
    console.log("[Bot] Connected");
});

bot.on('message', async (message) => {
    if (message.author.bot) return;
})

bot.login(config.tokens.discord);