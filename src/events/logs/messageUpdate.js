const Discord = require("discord.js");

const Guild = require("../../database/Schemas/Guild")
module.exports = {
    name: 'messageUpdate',
    async execute(client, message, oldMessage, newMessage, member) {



        let guilddb = await Guild.findOne({
            idS: message.guild.id,
        });
        let verificando = guilddb.logs.status
        if (!verificando || verificando === "off" || verificando === null || verificando === false) return;
        if (verificando === "on") {
            let channel = guilddb.logs.logs

            if (!channel) return;
            let canal = client.channels.cache.get(channel)
            try {
                canal.send({
                    embeds: [
                        new Discord.EmbedBuilder()
                            .setTitle(` LOG | Mensagem Editada.`)
                            .setColor('#10fee4')
                            .setThumbnail(`${client.user.displayAvatarURL({ size: 2048 })}`)
                            .setFooter({ text: `© ${client.user.username} 2023` })
                            .setTimestamp(new Date())
                            .setDescription(`**‣ Autor da mensagem** \n> **Usuário:** ${message.author} \n> **ID:** ${message.author.id} \n\n** ‣ Canal:** \n> ${message.channel} \n\n**Mensagem antiga:** \n \`\`\`${message.content}\`\`\` \n**Mensagem nova:** \n \`\`\`${oldMessage.content}\`\`\``)
                    ]
                })
            } catch {
                return;
            }
        }

    }
}