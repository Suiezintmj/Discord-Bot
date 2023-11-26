//fase de teste
const Discord = require("discord.js")
const { TextInputStyle, InteractionType } = require("discord.js")
const Guild = require("../../database/Schemas/Guild")
const { closeDelimiter } = require("ejs")

module.exports = {
    name: "configurar",
    description: "Configurar Sistemas",
    options: [{

        name: "logs",
        description: "[👑 ADM] Setar o canal de logs do delete, Editar messagem.",
        type: Discord.ApplicationCommandOptionType.Subcommand,
        options: [
            {
                name: "canal",
                description: "Mencione um canal.",
                type: Discord.ApplicationCommandOptionType.Channel,
                required: true,
            },
            {
                name: "status",
                description: "Status do Sistma.",
                type: Discord.ApplicationCommandOptionType.String,
                required: true,
                choices: [
                    {
                        name: 'Ativar',
                        value: 'on',
                    },
                    {
                        name: 'Desativar',
                        value: 'off',
                    }
                ],
            }
        ],
    },
    {
        name: "anti-convite",
        description: '[👑 Moderação] Antilinks',
        type: Discord.ApplicationCommandOptionType.Subcommand,
        options: [
            {
                name: 'opção',
                description: 'Selecione uma opção.',
                type: Discord.ApplicationCommandOptionType.String,
                required: true,
                choices: [
                    {
                        name: 'Ativar',
                        value: 'on',
                    },
                    {
                        name: 'Desativar',
                        value: 'off',
                    }
                ],
            }],
    },
    {
        name: "sugestão-set",
        description: "teste",
        type: Discord.ApplicationCommandOptionType.Subcommand,
        options: [{
            name: "canal",
            description: "Canal que sera setando",
            type: Discord.ApplicationCommandOptionType.Channel,
            channel_types: [0],
            required: true
        }]

    },
    /*{
        name: "parceria",
        description: "Configurar o canal de parceria",
        type: Discord.ApplicationCommandOptionType.Subcommand,
        options: [{
            name: "canal",
            description: "canal aonde será a parceria",
            type: Discord.ApplicationCommandOptionType.Channel,
            required: true,
        },
        ]
    },*/
    {
        name: "sistemas",
        description: "Configurar Sistemas",
        type: Discord.ApplicationCommandOptionType.Subcommand,
    },
    {
        name: 'setwelcome',
        description: '[Mods] - Seta o canal de welcome.',
        type: Discord.ApplicationCommandOptionType.Subcommand,
        options: [
            {
                name: 'channel',
                description: 'Selecione o canal de bem-vindo:',
                type: Discord.ApplicationCommandOptionType.Channel,
                required: true
            },
            {
                name: 'img',
                description: 'Insira o link png, jpg, webp ou gif que esteja hospedado no Discord ou TenorGIF:',
                type: Discord.ApplicationCommandOptionType.String,
                required: true,
            },

            {
                name: 'canvas',
                description: 'Insira o link png, jpg, webp ou gif que esteja hospedado no Discord ou TenorGIF:',
                type: Discord.ApplicationCommandOptionType.String,
                required: false,
                choices: [
                    {
                        name: 'canvas-com-embed',
                        value: 'canvasembed',
                    },
                    {
                        name: 'Canvas',
                        value: 'Canvas',
                    },
                    {
                        name: "embed",
                        value: "embed"
                    }
                ],
            },
        ],
    },
    {
        name: 'setleave',
        description: '[Mods] - Seta o canal de saida.',
        type: Discord.ApplicationCommandOptionType.Subcommand,
        options: [
            {
                name: 'channelleaveop',
                description: 'Selecione o canal de saida:',
                type: Discord.ApplicationCommandOptionType.Channel,
                channelTypes: [
                    Discord.ChannelType.GuildText,
                ],
                required: true
            },
            {
                name: 'imageleaveop',
                description: 'Insira o link png, jpg, webp ou gif que esteja hospedado no Discord ou TenorGIF:',
                type: Discord.ApplicationCommandOptionType.String,
                required: false
            },
            {
                name: 'descrição',
                description: 'Coloque uma descrição',
                type: Discord.ApplicationCommandOptionType.String,
                required: false
            },
            {
                name: 'canvas',
                description: 'Insira o link png, jpg, webp ou gif que esteja hospedado no Discord ou TenorGIF:',
                type: Discord.ApplicationCommandOptionType.String,
                required: false,
                choices: [
                    {
                        name: 'canvas-com-embed',
                        value: 'canvasembed',
                    },
                    {
                        name: 'Canvas',
                        value: 'Canvas',
                    },
                    {
                        name: "embed",
                        value: "embed"
                    }
                ],
            }
        ],
    }
    ],


    run: async (client, interaction) => {
        if (!interaction.channel.permissionsFor(interaction.user).has(Discord.PermissionFlagsBits.Administrator)) {
            return interaction.reply({
                embeds: [
                    new Discord.EmbedBuilder()
                        .setColor("Red")
                        .setDescription(`:x: | Você não possui permissão para executar este comando.`)
                ], ephemeral: true
            })
        }
        switch (interaction.options.getSubcommand()) {
            case 'logs':
                {
                    let channel = interaction.options.getChannel("canal")
                    let status = interaction.options.getString("status")
                    if (!channel) return interaction.reply({
                        embeds: [
                            new Discord.EmbedBuilder()
                                .setColor("Random")
                                .setDescription(`**❌ - ${interaction.user}, Você provavelmente selecionou um canal de voz ou categoria. Por favor selecione um canal de texto.**`)
                        ]
                    })
                    await Guild.findOneAndUpdate(
                        { idS: interaction.guild.id },
                        { $set: { "logs.logs": channel.id } }
                    );
                    await Guild.findOneAndUpdate(
                        { idS: interaction.guild.id },
                        { $set: { "logs.status": status } })
                    interaction.reply({
                        embeds: [
                            new Discord.EmbedBuilder()
                                .setColor("Random")
                                .setDescription(`Canal setando com sucesso em ${channel}`)
                                .addFields({
                                    name: "Status",
                                    value: `${status}`
                                })
                        ]
                    })
                }
                break;
            case 'anti-convite':
                {

                    const link = interaction.options.getString("opção")
                    if (!interaction.member.permissions.has(Discord.PermissionFlagsBits.Administrator)) return interaction.reply({ embeds: [new Discord.EmbedBuilder().setColor("Random").setDescription(`${interaction.user} você não tem permissão para utilizar esse comando`)] })
                    switch (link) {
                        case 'on':
                            {
                                await Guild.findOneAndUpdate(
                                    { idS: interaction.guild.id },
                                    { $set: { "antinvite.status": true } }
                                )
                                interaction.reply({
                                    embeds: [
                                        new Discord.EmbedBuilder()
                                            .setColor('Blue')
                                            .setTitle("Ativo")
                                            .setDescription(`${interaction.user}  sistema de Anti-Convite foi Ativando com sucesso `)
                                    ], ephemeral: true
                                })
                            }
                            break;
                        case 'off':
                            {
                                await Guild.findOneAndUpdate(
                                    { idS: interaction.guild.id },
                                    { $set: { "antinvite.status": false } }
                                )
                                interaction.reply({
                                    embeds: [
                                        new Discord.EmbedBuilder()
                                            .setColor("Purple")
                                            .setTitle("Desativando")
                                            .setDescription(`${interaction.user} Sistema de anti-Convite foi desativando com sucesso`)
                                    ], ephemeral: true
                                })
                            }
                            break;
                    }

                }
                break;
            case 'sistemas':
                {
                    interaction.reply({
                        embeds: [
                            new Discord.EmbedBuilder()
                                .setDescription(`Clique no botão de acordo com oque você deseja configurar.`)
                                .setColor("Gold")
                        ],
                        components: [
                            new Discord.ActionRowBuilder()
                                .addComponents(
                                    new Discord.ButtonBuilder()
                                        .setCustomId("membro_novo")
                                        .setLabel("Sistema de boas vindas")
                                        .setStyle(2)
                                        .setEmoji("🏠"),
                                    new Discord.ButtonBuilder()
                                        .setCustomId("auto_role")
                                        .setLabel("Sistema de AutoRole")
                                        .setStyle(2)
                                        .setEmoji("🌵"),
                                    new Discord.ButtonBuilder()
                                        .setCustomId("sistema_verificação")
                                        .setLabel("Sistema de Verificação")
                                        .setStyle(2)
                                        .setEmoji("🏆"),
                                )
                        ], ephemeral: true
                    })
                }
                break;
            case 'setwelcome':
                {
                    let canal = interaction.options.getChannel('channel');
                    const opção = interaction.options.getString("canvas")
                    let imageurlwelcome = interaction.options.getString('img')


                    let embed = new Discord.EmbedBuilder()
                        .setColor("Green")
                        .setImage(imageurlwelcome)
                    let descri = new Discord.ActionRowBuilder()
                        .addComponents(
                            new Discord.ButtonBuilder()
                                .setCustomId("msga")
                                .setStyle(2)
                                .setLabel("Descrição"),
                            new Discord.ButtonBuilder()
                                .setCustomId("emite")
                                .setLabel("Simular entrada de membro")
                                .setStyle(2)

                        )
                    await Guild.findOneAndUpdate(
                        { idS: interaction.guild.id },
                        { $set: { "welcome.channel": canal.id } }, { boas_vindas: `${canal}` }).then(() => { embed.addFields({ name: `💬 Canal de boas vindas:`, value: `${canal}` }) })
                    await Guild.findOneAndUpdate(
                        { idS: interaction.guild.id },
                        { $set: { "welcome.img": imageurlwelcome } })
                    await Guild.findOneAndUpdate(
                        { idS: interaction.guild.id },
                        { $set: { "welcome.canvas": opção } })


                    interaction.reply({
                        embeds: [embed], components: [descri],
                        ephemeral: true
                    })
                    let filtro = i => i.user.id === interaction.user.id;
                    let coletor = interaction.channel.createMessageComponentCollector({ filtro, time: 180000 });
                    coletor.on("collect", async i => {
                        if (i.customId === "emite") {
                            client.emit("guildMemberAdd", i.member);
                            i.reply({
                                embeds: [
                                    new Discord.EmbedBuilder()
                                        .setColor("Random")
                                        .setDescription(`| Sucesso! Evento de entrada de membro enviado, vai para seu canal de boas-vindas  (se você tiver um!)`)
                                ], ephemeral: true
                            });
                        }
                    })


                }
                break;
            case 'setleave':
                {
                    let channelleave = interaction.options.getChannel('channelleaveop');
                    let descrição = interaction.options.getString("descrição")
                    let imageurlleave = interaction.options.getString('imageleaveop')
                    const opção = interaction.options.getString("canvas")
                    await Guild.findOneAndUpdate(
                        { idS: interaction.guild.id },
                        { $set: { "goodbye.channel": channelleave.id } })

                    await Guild.findOneAndUpdate(
                        { idS: interaction.guild.id },
                        { $set: { "goodbye.msg": descrição } })
                    await Guild.findOneAndUpdate(
                        { idS: interaction.guild.id },
                        { $set: { "goodbye.img": imageurlleave } })


                    await Guild.findOneAndUpdate(
                        { idS: interaction.guild.id },
                        { $set: { "goodbye.canvas": opção } })

                    interaction.reply({ content: `Configurei o canal de leave em **${channelleave.name}**, a imagem tambem já foi adicionada.`, ephemeral: false })

                }
                break;
            case 'sugestão-set':
                {
                    const canal = interaction.options.getChannel("canal")
                    interaction.reply({
                        embeds: [
                            new Discord.EmbedBuilder()
                                .setColor("Random")
                                .setDescription("Canal setado com sucesso!")
                                .setFields({
                                    name: "Canal:",
                                    value: `${canal}`
                                })
                        ], ephemeral: true
                    })
                    await Guild.findOneAndUpdate(
                        { idS: interaction.guild.id },
                        { $set: { "sugestao.channel": canal.id } })
                }
        }
    }
}

/*
        if (interaction.options.getSubcommand() == "parceria") {
            let canal = interaction.options.getChannel("canal")
            const button = new Discord.ActionRowBuilder()
                .addComponents(
                    new Discord.ButtonBuilder()
                        .setCustomId("titulo2")
                        .setLabel("Configurar")
                        .setStyle(2),
                )

            const coletor_1 = interaction.channel.createMessageCollector({
                filter: i => i.author.id === interaction.user.id,
                max: 1,
            })
            interaction.reply({
                embeds: [
                    new Discord.EmbedBuilder()
                        .setDescription(`Qual a descrição da embed?`)
                        .setColor("Green")
                ]

            })
            coletor_1.on('collect', async (mensagem) => {
                try {
                    let descrição = mensagem.content


                    if (descrição === undefined) {
                        interaction.editReply({
                            embeds: [
                                new Discord.EmbedBuilder()
                                    .setDescription(`❌ | Error.`)
                                    .setColor("Red")
                            ],
                        }).then(() => { mensagem.delete() })
                    } else {
                        await Guild.findOneAndUpdate(
                            { idS: interaction.guild.id },
                            { $set: { "embed.descrição": descrição } }
                        );
                        interaction.editReply({
                            embeds: [
                                new Discord.EmbedBuilder()
                                    .setDescription(descrição)
                                    .setColor("Green")
                            ], components: [button]
                        }).then(() => { mensagem.delete() })
                    }
                } catch {
                    interaction.editReply({
                        embeds: [
                            new Discord.EmbedBuilder()
                                .setDescription(`❌ | Error.`)
                                .setColor("Red")
                        ]
                    }).then(() => { mensagem.delete() })
                }
            })

            const filtro = i => i.user.id === interaction.user.id;
            const coletor = interaction.channel.createMessageComponentCollector({ filtro, time: 100000 });
            coletor.on("collect", async (i) => {
                if (i.customId == "titulo2") {
                    const modal = new Discord.ModalBuilder()
                        .setCustomId(`Embed`)
                        .setTitle(`Criar Embed 🔪`)

                    const TítuloEmbed = new Discord.TextInputBuilder()
                        .setCustomId(`TítuloEmbed`)
                        .setLabel(`Título da Embed`)
                        .setPlaceholder(`Insira o título da Embed.`)
                        .setStyle(TextInputStyle.Short)

                    const CorEmbed = new Discord.TextInputBuilder()
                        .setCustomId(`CorEmbed`)
                        .setLabel(`Descrição da Embed`)
                        .setPlaceholder(`Insira a descrição da Embed`)
                        .setStyle(TextInputStyle.Paragraph)
                    const imagemEmbed = new Discord.TextInputBuilder()
                        .setCustomId(`imagemEmbed`)
                        .setLabel(`Descrição da Embed`)
                        .setPlaceholder(`Insira a descrição da Embed`)
                        .setStyle(TextInputStyle.Paragraph)

                    const ThumbnailEmbed = new Discord.TextInputBuilder()
                        .setCustomId(`ThumbnailEmbed`)
                        .setLabel(`Descrição da Embed`)
                        .setPlaceholder(`Insira a descrição da Embed`)
                        .setStyle(TextInputStyle.Paragraph)


                    const PrimeiraActionRow = new Discord.ActionRowBuilder()
                        .addComponents(TítuloEmbed);

                    const SegundaActionRow = new Discord.ActionRowBuilder()
                        .addComponents(CorEmbed);
                    const TerceiraActionRow = new Discord.ActionRowBuilder().addComponents(imagemEmbed);
                    const Terceira2ActionRow = new Discord.ActionRowBuilder().addComponents(ThumbnailEmbed);



                    modal.addComponents(PrimeiraActionRow, SegundaActionRow, TerceiraActionRow, Terceira2ActionRow)

                    await i.showModal(modal);

                    client.once(`interactionCreate`, async interaction => {
                        if (!interaction.isModalSubmit()) return;

                        if (interaction.customId === `Embed`) {
                            const guildid = await Guild.findOne({
                                idS: interaction.guild.id
                            })
                            let descrição = guildid.embed.descrição

                            const TítuloEmbed = interaction.fields.getTextInputValue(`TítuloEmbed`);
                            const imagem = interaction.fields.getTextInputValue(`imagemEmbed`);
                            let Thumbnail = interaction.fields.getTextInputValue(`ThumbnailEmbed`);
                            let embedModal1 = new Discord.EmbedBuilder()
                                .setColor(`Random`)
                                .setTitle(`${TítuloEmbed}`)
                                .setThumbnail(Thumbnail)
                                .setImage(imagem)
                                .setDescription(descrição)

                            await Guild.findOneAndUpdate(
                                { idS: interaction.guild.id },
                                { $set: { "parceria.channel": canal.id } }
                            );
                            await Guild.findOneAndUpdate(
                                { idS: interaction.guild.id },
                                { $set: { "embed.titulo": TítuloEmbed } }
                            );
                            await Guild.findOneAndUpdate(
                                { idS: interaction.guild.id },
                                { $set: { "embed.thumbnail": Thumbnail } }
                            );
                            await Guild.findOneAndUpdate(
                                { idS: interaction.guild.id },
                                { $set: { "embed.imagem": imagem } }
                            );
                            interaction.update({
                                embeds: [embedModal1], ephemeral: true

                            })

                        }
                    })
                }
            })
        }
        */

