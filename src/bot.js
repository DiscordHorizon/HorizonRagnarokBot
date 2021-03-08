const Discord = require('discord.js');
const { config } = require('./config');
const { getMonsters, monsterSearch } = require('./controller/monster');

const bot = new Discord.Client();
bot.commands = new Discord.Collection();


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

    const arg = message.content.slice(config.prefix.length).trim().split(/ +/g);
    const command = arg.shift().toLowerCase();
    let args = arg.shift();

    //* montar string de pesquisa
    while (arg.length > 0) {
        args = args + " " + arg[0];
        arg.shift();
    }

    //* executar comando
    if (command === 'mi') {
        monsterSearch(message, args.toLocaleLowerCase());
    }
})

bot.login(config.tokens.discord);