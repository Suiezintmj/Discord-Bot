const Discord = require("discord.js");
const Guild = require("../../database/Schemas/Guild")

module.exports = {
    name: 'messageDelete',
    async execute(client, message, oldMessage, newMessage, member) {

        let guilddb = await Guild.findOne({
            idS: message.guild.id,
        });
        let channel = guilddb.logs.logs
        let verificando = guilddb.logs.status
        if (!verificando || verificando === "off" || verificando === null || verificando === false) return;
        if (verificando === "on") {

            if (!channel) return;
            let canal = client.channels.cache.get(channel)
            try {
                canal.send({
                    embeds: [
                        new Discord.EmbedBuilder()
                            .setTitle(` LOG | Mensagem apagada.`)
                            .setColor('#10fee4')
                            .setThumbnail(`${client.user.displayAvatarURL({ size: 2048 })}`)
                            .setImage("https://i.pinimg.com/originals/c4/ff/a2/c4ffa2fe53711d3ff2bca4966acc4190.gif")
                            .setTimestamp(new Date())
                            .setDescription(`** Autor da mensagem** \n`)
                            .addFields(
                                { name: "**Usuário:**", value: `${message.author}` },
                                { name: "**ID:**", value: `${message.author.id}` },
                                {
                                    name: "**Canal**",
                                    value: `${message.channel}`,
                                },
                                {
                                    name: "**Mensagem deletada:**",
                                    value: `\`\`\`${message.content}\`\`\``
                                }
                            )
                    ]
                })
            } catch {
                return;
            }
        }
    }
}