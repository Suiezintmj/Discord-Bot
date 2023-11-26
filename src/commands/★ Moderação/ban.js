const Discord = require('discord.js');
module.exports = {
    name: "ban",
    description: "para punir um usuario",
    type: Discord.ApplicationCommandType.ChatInput,
    options: [
        {
            name: "user",
            description: "Selecione um usuario",
            type: Discord.ApplicationCommandOptionType.User,
            require: true,
        },
        {
            name: "motivo",
            description: "Escolhar um motivo para punir o usuario",
            type: Discord.ApplicationCommandOptionType.String,
            require: false,
        }
    ],
    run: async (client, interaction) => {
        if (!interaction.member.permissions.has(Discord.PermissionFlagsBits.BanMembers))
            return interaction.reply({ embeds: [new Discord.EmbedBuilder().setColor("Random").setDescription(`Olá, ${interaction.user} Você não tem permissão para utilizar esse comando`)] })
        let info = {
            user: interaction.options.getUser("user"),
            motivo: interaction.options.getString("motivo") || 'sem motivo'
        }
        let user2 = interaction.guild.members.cache.get(info.user.id)
        if (!info.user) return interaction.reply({ content: `Coloque um id valido`, ephemera: true })
        const embed = new Discord.EmbedBuilder()
            .setColor("Random")
            .setTitle("Sistema de Punições")
            .setDescription(`Clique na reação ✅ para confirmar. \n Se não, clique em ❌ para cancelar.`)
            .addFields({
                name: "Usuário:",
                value: ` ${interaction.user}`
            },
                {
                    name: `Autor do banimento:`,
                    value: `⠀Tag: \`${interaction.user.tag}\`\n⠀ID: \`${interaction.user.id}\``,
                    inline: false
                },
                {
                    name: "<:amongreport:899874292664270879>:Motivo",
                    value: `${info.motivo}`
                })
            .setTimestamp()
        const Simounão = new Discord.ActionRowBuilder()
            .addComponents(
                new Discord.ButtonBuilder()
                    .setCustomId("sim")
                    .setLabel("Banir")
                    .setEmoji("✅")
                    .setStyle(2),
                new Discord.ButtonBuilder()
                    .setCustomId("nao")
                    .setLabel("Cancelar")
                    .setEmoji("❌")
                    .setStyle(2)
            )

        interaction.reply({ embeds: [embed], components: [Simounão], ephemera: true })
        const filtro = i => i.customId === "Simounão" && i.user.id === interaction.user.id;
        const coletor = interaction.channel.createMessageComponentCollector({ filtro, time: 100000 });
        coletor.on('collect', async i => {
            switch (i.customId) {
                case 'sim':
                    {
                        let embed2 = new Discord.EmbedBuilder()
                            .setColor('Random')
                            .setDescription(`o usuario ${info.user} (\`${interaction.user.id}\`) foi banido do servidor pelo motivo \`${info.motivo}\` com Sucesso`)
                            .setFooter({ text: `comando requisitado por: ${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL({ format: 'png' }) })
                        user2.ban({ reason: [info.motivo] }).then(() => {
                            i.reply({ embeds: [embed2] })
                        })
                    }
                    break;
                case 'nao':
                    {
                        i.reply({ content: `Banimento cancelado`, ephemera: true }).then(() => {
                            setTimeout(() => {
                                interaction.deleteReply()
                            }, 6000)
                        })
                    }
                    break;
            }
        })
    }
}
