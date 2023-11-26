const Discord = require("discord.js")
const { QuickDB } = require('quick.db')
const db = new QuickDB()
const Guild = require("../../database/Schemas/Guild")
module.exports = {
    name: "painel",
    description: "Enviar painel de verificação.",
    options: [
        {
            name: "verificação",
            description: "Enviar painel de verificação.",
            type: Discord.ApplicationCommandOptionType.Subcommand,
            options: [
                {
                    name: "channel",
                    description: "Selecione um canal.",
                    type: Discord.ApplicationCommandOptionType.Channel,
                },
            ],
        },
    ],

    run: async (client, interaction) => {
        let guilddb = await Guild.findOne({
            idS: interaction.guild.id,
          });
        let channel = interaction.options.getChannel("channel") || interaction.channel;
        let role = guilddb.role.role

        if (!interaction.channel.permissionsFor(interaction.user).has(Discord.PermissionFlagsBits.Administrator)) {
            return interaction.reply({
                embeds: [
                    new Discord.EmbedBuilder()
                        .setColor("Red")
                        .setDescription(` Você não pussui permissão.`)
                ], ephemeral: true
            })
        } else if (!role) {
            return interaction.reply({
                embeds: [
                    new Discord.EmbedBuilder()
                        .setDescription(`Cargo não configurado.`)
                        .setColor("Red")
                ], ephemeral: true
            });
        } else if (Discord.ChannelType.GuildText !== channel.type) {
            return interaction.reply({
                embeds: [
                    new Discord.EmbedBuilder()
                        .setColor("Red")
                        .setDescription(` Selecione um canal de texto.`)
                ], ephemeral: true
            })
        } else {

            channel.send({
                embeds: [
                    new Discord.EmbedBuilder()
                        .setColor("Green")
                        .setDescription(` Clique no botão abaixo para se verificar no servidor.`)
                ],
                components: [
                    new Discord.ActionRowBuilder()
                        .addComponents(
                            new Discord.ButtonBuilder()
                                .setCustomId("Verificar")
                                .setLabel("Verificar-se")
                                .setStyle(Discord.ButtonStyle.Success)
                        )
                ]
            }).then(() => {
                interaction.reply({
                    embeds: [
                        new Discord.EmbedBuilder()
                            .setColor("Green")
                            .setDescription(`Painel enviado com sucesso!`)
                    ], ephemeral: true
                })
            })





        }
    }
}