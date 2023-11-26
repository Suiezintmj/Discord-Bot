const Discord = require("discord.js")
const schemas = require("../../database/Schemas/User")
module.exports = {
    name: "warn",
    description: "warn",
    options: [
        {
            name: "add",
            description: "dar um aviso em alguém",
            type: Discord.ApplicationCommandOptionType.Subcommand,
            options: [
                {
                    name: "user",
                    description: "Marque o usuario",
                    type: Discord.ApplicationCommandOptionType.User,
                    required: true

                },
                {
                    name: "motivo",
                    description: "Motivo do aviso",
                    type: Discord.ApplicationCommandOptionType.String,

                }
            ]
        },
        {
            name: "remover",
            description: "remover um aviso em alguém",
            type: Discord.ApplicationCommandOptionType.Subcommand,
            options: [
                {
                    name: "user",
                    description: "Marque o usuario",
                    type: Discord.ApplicationCommandOptionType.User,
                    required: true

                },
                {
                    name: "quatidade",
                    description: "quatidade de warn removindo",
                    type: Discord.ApplicationCommandOptionType.Number,
                    required: true

                },
            ]
        }
    ],
    run: async (client, interaction) => {
        if (!interaction.member.permissions.has(Discord.PermissionFlagsBits.Administrator)) return interaction.reply({ content: "Você não tem permissão para utilizar esse comando" })
        const user = interaction.options.getUser("user")
        let usuario = await schemas.findOne({ userId: interaction.user.id })
        if (interaction.options.getSubcommand("remover")) {
            let quatidade = interaction.options.getNumber("quatidade")

            usuario.warn.quatidade -= quatidade;
            await usuario.save();
            interaction.reply({
                embeds: [
                    new Discord.EmbedBuilder()
                        .setColor("Red")

                        .setDescription(`Membro: ${user}\nWarn por: ${interaction.user}`)
                        .addFields({ name: 'Quantidade de warns', value: `${usuario.warn.quatidade}` })


                ]
            })
            return;
        }
        if (interaction.options.getSubcommand("add")) {

            let motivo = interaction.options.getString("motivo")
            if (!motivo) {
                motivo = "sem razão"
            }
            usuario.warn.quatidade += 1;
            await usuario.save();
            interaction.reply({
                embeds: [
                    new Discord.EmbedBuilder()
                        .setColor("Red")
                        .setDescription(`Membro: ${user}\nWarn por: ${interaction.user}\nMotivo: ${motivo}`)
                        .addFields({ name: 'Quantidade de warns', value: `${usuario.warn.quatidade}` })
                        .setTimestamp()

                ]
            })
        }
    }
}