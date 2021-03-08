const Discord = require('discord.js');
const fs = require("fs");
const { config } = require('./config');

const bot = new Discord.Client();
bot.commands = new Discord.Collection();

//* ler comandos da pasta "commands"
fs.readdir("./commands/", (err, files) => {
    if (err) {
        console.log(err);
    }
    let commandjs = files.filter((f) => f.split(".").pop() == "js");
    commandjs.forEach((f, i) => {
        let props = require(`./commands/${f}`);
        console.log(`[Command] Comando ${f} carregado com sucesso.`);
        bot.commands.set(props.info.name, props);
    });
});

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
    const commandcmd = bot.commands.get(command);
    if (commandcmd) {
        commandcmd.run(bot, message, args);
    }
})

bot.login(config.tokens.discord);