const Discord = require('discord.js')
const bot = new Discord.Client()

const config = require("./config.json")

function verifyPermission(message) {
    let modRole = message.guild.roles.find("name", config.modRole)
    if(!message.member.roles.has(modRole.id)) {
     return message.reply("[:x:] Vous n'avez pas la permission d'utiliser cette commande !").catch(console.error)
    }
    return true
}

bot.on('ready', () => {
    console.log("Switchy is operational")
})

bot.on("guildMemberAdd", member => {
    let guild = member.guild
    guild.defaultChannel.sendMessage(`Bienvenue ${member.user} sur le serveur.`)
})

bot.on("message", message => {
    if (message.author.bot) return;
    if (!message.content.startsWith(config.prefix)) return
    
    let command = message.content.split(" ")[0];
    command = command.slice(config.prefix.length)

    let args = message.content.split(" ").slice(1)

    /**
     * SAY COMMAND / ADMIN COMMAND
     */
    if (command === "say") {
        if(verifyPermission(message) == true){
            message.channel.sendMessage(args.join(" "))
        }
    }

})


bot.login(config.token)