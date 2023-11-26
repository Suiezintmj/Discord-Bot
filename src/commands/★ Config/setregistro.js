
// pqp mlk oq tu tava fazendo
/*
const Discord = require("discord.js")
const Schemas = require("../../database/Schemas/Guild")

module.exports = {
    name: "config-registro",
    description: "Configuração De Registro",
    options: [
        {
            name: "set-channel",
            description: "Setar canal de registro",
            type: Discord.ApplicationCommandOptionType.Subcommand,
            options: [
                {
                    name: "channel",
                    description: "Escolhar um canal",
                    type: Discord.ApplicationCommandOptionType.Channel,
                    channel_types: [0],
                    required: true
                }
            ]

        },
        {
            name: "role-registro",
            description: "Configuração Dos Cargos",
            type: Discord.ApplicationCommandOptionType.Subcommand,
            options: [
                {
                    name: "name-message",
                    description: "Nome da mensagem",
                    type: Discord.ApplicationCommandOptionType.String,

                },
                {
                    name: "emoji",
                    description: "Emoji",
                    type: Discord.ApplicationCommandOptionType.String,


                },
                {
                    name: "menu",
                    description: "Escolha o menu de registro",
                    type: Discord.ApplicationCommandOptionType.String,
                    choices: [
                        {
                            name: 'select-menu',
                            value: 'menuzin',
                        },
                        {
                            name: 'botão',
                            value: 'button',
                        },
                    ],

                },
                {
                    name: "role_1",
                    description: "cargo_1",
                    type: Discord.ApplicationCommandOptionType.Role,

                },
                {
                    name: "role_2",
                    description: "cargo_2",
                    type: Discord.ApplicationCommandOptionType.Role,

                },
                {
                    name: "role_3",
                    description: "cargo_3",
                    type: Discord.ApplicationCommandOptionType.Role,


                },
                {
                    name: "role_4",
                    description: "cargo_4",
                    type: Discord.ApplicationCommandOptionType.Role,


                },
                {
                    name: "role_5",
                    description: "cargo_5",
                    type: Discord.ApplicationCommandOptionType.Role,


                },
                {
                    name: "role_6",
                    description: "cargo_6",
                    type: Discord.ApplicationCommandOptionType.Role,


                },
            ]
        }
    ],
    run: async (client, interaction) => {
        if (interaction.options.getSubcommand() === "set-channel") {
            if (interaction.member.permissions.has(Discord.PermissionFlagsBits.Administrator)) return;
            const Channel = interaction.options.getChannel("channel")
            await Schemas.findOneAndUpdate({ idS: interaction.guild.id },
                { $set: { "registro.channel": Channel } })
            interaction.reply({ content: `${Channel} Foi setado com sucesso` })
        } else if (interaction.options.getSubcommand("role-registro")) {
            let nome = interaction.options.getString("name-message")
            let role_1 = interaction.options.getRole("role_1")
            let role_2 = interaction.options.getRole("role_2")
            let role_3 = interaction.options.getRole("role_3")
            let role_4 = interaction.options.getRole("role_4")
            let role_5 = interaction.options.getRole("role_5")
            let role_6 = interaction.options.getRole("role_6")
            let option = interaction.options.getString("menu")
            await Schemas.findOneAndUpdate({ idS: interaction.guild.id },
                { $set: { "registro.nome": nome } })
            await Schemas.findOneAndUpdate({ idS: interaction.guild.id },
                { $set: { "registro.role": role_1 } })
            await Schemas.findOneAndUpdate({ idS: interaction.guild.id },
                { $set: { "registro.role": role_2 } })
            await Schemas.findOneAndUpdate({ idS: interaction.guild.id },
                { $set: { "registro.role": role_3 } })
            await Schemas.findOneAndUpdate({ idS: interaction.guild.id },
                { $set: { "registro.role": role_4 } })
            await Schemas.findOneAndUpdate({ idS: interaction.guild.id },
                { $set: { "registro.role": role_5 } })
            await Schemas.findOneAndUpdate({ idS: interaction.guild.id },
                { $set: { "registro.role": role_6 } })
            await Schemas.findOneAndUpdate({ idS: interaction.guild.id },
                { $set: { "registro.option": option } })
            interaction.reply({
                embeds: [
                    new Discord.EmbedBuilder()
                        .setColor("Aqua")
                        .setDescription("Sucesso")
                ],
                components: [
                    new Discord.ActionRowBuilder()
                        .addComponents(
                            new Discord.ButtonBuilder()
                                .setCustomId("enviar")
                                .setLabel("Enviar")
                                .setStyle(2)
                        )
                ]
            })



            const coletor = interaction.channel.createMessageCollector({
                filter: i => i.author.id === interaction.user.id,
                max: 1,
            })
            coletor.on("collect", async (i) => {
                if (i.customId == "enviar") {
                    const data = await Schemas.findOne({ idS: interaction.guild.id })
                    channel = data.registro.channel
                    channel.send({ content: "Teste" })
                }
            })
        }
    }
}
*/