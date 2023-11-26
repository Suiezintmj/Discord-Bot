const Discord = require("discord.js");
const  durationTime  = require('util-stunks')  
const moment = require("moment")
require("moment-duration-format")
const config = require("../../../config")
module.exports = {
    name:"bot-info",
    description:"[❔ - Informação] Veja Minhas Informações",
    type: Discord.ApplicationCommandType.ChatInput,
run: async (client, interaction) => {
    let info = {
        ping: client.ws.ping,
        dev: client.users.cache.get(config.owner),
        gateway: Date.now() - interaction.createdTimestamp,
        membros: client.users.cache.size,
        servidor: client.guilds.cache.size,
        canais: client.channels.cache.size,
        server: interaction.guild.members.cache.get(client.user.id),
        up: moment.duration(client.uptime).format(" D [Dias], H [Horas], m [Minutos]"),
    }   
    const convite = "https://discord.com/api/oauth2/authorize?client_id=${config.client_}&permissions=0&scope=bot%20applications.commands"
    const button  = new Discord.ActionRowBuilder()
    .addComponents(
        new Discord.ButtonBuilder()
        .setLabel('Convidar')
        .setURL(convite)
        .setStyle(5)
    )
    const embed = new Discord.EmbedBuilder()
    .setTitle('📃 - Minhas Informações ⏬')
    .setColor("#2e4ae2")
    .setDescription(`**Olá ${interaction.user}, Eu sou o ${client.user.username}, Eu sou um Bot de Uso Geral, Tenho Varios Comandos Você Pode Velos Usando __/help__**`)
    .addFields(
    {
        
            name: '👑 {/} - Estou Sendo Desenvolvido Pelo:',
            value: `\`\`\`${info.dev.username}\`\`\``,
            inline: true,
            
    
    },
    {
        name: '🌐 Ping:',
        value: `\`\`\`Ping: ${info.ping}\`\`\``,
        inline: true

    },
    {
        name: '🆔 - ID:',
        value: `\`\`\`${client.user.id}\`\`\``,
        inline: false,
        
    },
    {
        name: '👾 Linguagem de programação que eu fui criado:',
        value: `\`\`\`Node.Js\`\`\``,
        inline: false,
        
    },
    {
        name: '📚 Livraria',
        value: `\`\`\`Discord.js v14\`\`\``
    },
    {
        name: '📅 - Entrou no Servidor:',
        value: `<t:${Math.ceil(info.server.joinedTimestamp / 1000)}:F>`,
        inline: false,
    },
    {
        name: `📆 - Criado:`,
        value: `<t:${parseInt(client.user.createdTimestamp / 1000)}>`,
        inline: false,
    },

     {
        name: '🔌 Para saber todos os meus comandos:',
        value: `\`\`\`Digite /help\`\`\``
     },
     {
        name: '👋 Membros do seu servidor:',
        value: `\`\`\`Membros: ${info.membros}\`\`\``
     },
     {
        name: '🕗 Uptime:',
        value: `\`\`\`online a ${info.up}\`\`\``
     },
     {
        name: `💻 Ram:`,
        value: `\`\`\`${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2) + 'MB'}\`\`\``
     },

)
    .setFooter({ text: client.user.username, iconURL: client.user.displayAvatarURL({ dynamic: true }) })
    .setThumbnail(interaction.user.displayAvatarURL({ dynamic: true }))
    interaction.reply({embeds:[embed]})
}
}