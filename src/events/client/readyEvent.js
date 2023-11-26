const Discord = require("discord.js")
const { QuickDB } = require("quick.db");
const db = new QuickDB();
const chalk = require('chalk');

module.exports = {
    name: 'ready',
    once: true,

    async execute(client, interaction) {
        console.log(`${chalk.greenBright(`[SYSTEM]`)} ${chalk.yellowBright(`${client.user.tag} Está online.`)}`)

        let status = [
            `🆘 | Use /help em seu servidor para obter ajuda`,
            `🌏 | Estou em ${client.guilds.cache.size} servidores!`,
            `⌨️ | Estou online em ${client.channels.cache.size} canais!`,
            `📱 | Estou assistindo ${client.users.cache.size} usuários!`,
            `⚙️ | Estou Sendo Configurado...`,
            `😊 | Fui criado para ajudar e divertir vocês!`
       
    
        ],
            i = 0
        setInterval(() => {
            client.user.setActivity(`${status[i++ % status.length]}`, {
                type: 3, 
            
            })
        }, 15000)
        client.user.setStatus('idle')
    }
}