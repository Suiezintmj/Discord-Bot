const Discord = require("discord.js");
const Guild = require("../../database/Schemas/Guild")

module.exports = {
    name:'guildBanRemove',
    async execute(client, member) {
    let database = await Guild.findOne({
        idS: member.guild.id
    });
    if (database.logs.logs){
        let channel =  database.logs.logs
        let canal = client.channels.cache.get(channel)
        const embed = new Discord.EmbedBuilder()
        .setColor("#10fee4")
        .setThumbnail(`${client.user.displayAvatarURL({ size: 2048 })}`) 
        .setTitle(` ‣ LOG | Usuario Desbanido.`)
        .setDescription(` ‣ Informações do usuario:\n > **Membro:${member.user}** \n > **ID:${member.user.id}**`)
        .setFooter({ text:  `© ${client.user.username} 2023`})
        .setTimestamp(new Date())
        canal.send({ embeds: [embed] });
    }else{
    let channel = database.logs.ban
    let canal = client.channels.cache.get(channel)
    const embedban = new Discord.EmbedBuilder()
    .setColor("#10fee4")
    .setThumbnail(`${client.user.displayAvatarURL({ size: 2048 })}`) 
    .setTitle(` ‣ LOG | Usuario Desbanido.`)
    .setDescription(` ‣ Informações do usuario:\n > **Membro:${member.user}** \n > **ID:${member.user.id}**`)
    .setFooter({ text:  `© ${client.user.username} 2023`})
    .setTimestamp(new Date())
    canal.send({ embeds: [embedban] });
    }}}
