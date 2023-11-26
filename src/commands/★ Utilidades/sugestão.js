const Discord = require("discord.js");
const Guild = require("../../database/Schemas/Guild")
module.exports = {
    name: "sugestão",
    description: "teste",
    options: [
        {
            name: 'msg',
            description: "Sugestão",
            type: Discord.ApplicationCommandOptionType.String,
        },

    ],
    run: async (client, interaction) => {
        let guilddb = await Guild.findOne({
            idS: interaction.guild.id,
        });
        let canal = guilddb.sugestao.channel
        let channel = interaction.guild.channels.cache.get(canal)
        const msg = interaction.options.getString("msg")

        const embed = new Discord.EmbedBuilder()
            .setColor("Random")
            .setAuthor({ name: `👤 ` + interaction.user.tag, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })
            .setThumbnail(interaction.user.displayAvatarURL({ dynamic: true, size: 4096 }))
            .setTitle("New Sugestão")
            .setFields({
                name: "Susgetão de:",
                value: `${interaction.user}`
            })
            .setImage("https://pfps.gg/assets/banners/2004-zero-two-art.png")
            .setDescription(`> ${msg}`)
        interaction.reply({ content: "sugestão enviada", ephemeral: true })

        channel.createWebhook({ name: `${interaction.user.tag}`, avatar: interaction.user.displayAvatarURL({ dynamic: true, format: "png" }) }).then((webhook) => {

            webhook.send({ embeds: [embed] }).then(() => {
                webhook.delete();
            });
        });


    }
}