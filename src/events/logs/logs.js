
const Discord = require("discord.js")
const Guild = require("../../database/Schemas/Guild")

const data = new Date()
const date = data.getHours()

const calls_e_info = '🔵';
const calls_e_verify = '✅';
const calls_e_no = '🚫';
const calls_e_voice = '🎤';
const calls_e_danger = '⚠️';

module.exports = {
    name: 'interactionCreate',

    async execute(client, interaction) {

        let requireDB = await Guild.findOne({ idS: interaction.guild.id })
        const calls_imagem_criada = 'https://cdn.wallpapersafari.com/0/37/PNEURJ.jpg'; // IMPORTANTE
        const calls_imagem_deletada = 'https://cdn.wallpapersafari.com/0/37/PNEURJ.jpg'; // IMPORTANTE
        const calls_imagem_geral = 'https://cdn.wallpapersafari.com/0/37/PNEURJ.jpg'; // IMPORTANTE
        const alreadyEmbed = new Discord.EmbedBuilder().setColor('Orange');


        const calls_config_cLogs = requireDB.createCall.logs;
        const calls_config_cPrincipal = requireDB.createCall.channel
        const calls_config_categoriaCalls = requireDB.createCall.category;
        const calls_logs = interaction.guild.channels.cache.get(calls_config_cLogs)
        const calls_principal = interaction.guild.channels.cache.get(calls_config_cPrincipal)

        const calls_bloqueada_botao = new Discord.ActionRowBuilder()
            .addComponents(
                new Discord.ButtonBuilder()
                    .setCustomId("text_002")
                    .setLabel('Calls')
                    .setDisabled(true)
                    .setStyle(Discord.ButtonStyle.Secondary),
            )
            .addComponents(
                new Discord.ButtonBuilder()
                    .setCustomId("text_003")
                    .setLabel('🔊 Bloqueada')
                    .setDisabled(true)
                    .setStyle(Discord.ButtonStyle.Primary),
            )


        const calls_desbloqueada_botao = new Discord.ActionRowBuilder()
            .addComponents(
                new Discord.ButtonBuilder()
                    .setCustomId("text_004")
                    .setLabel('Calls')
                    .setDisabled(true)
                    .setStyle(Discord.ButtonStyle.Secondary),
            )
            .addComponents(
                new Discord.ButtonBuilder()
                    .setCustomId("text_005")
                    .setLabel('🔊 Desbloqueada')
                    .setDisabled(true)
                    .setStyle(Discord.ButtonStyle.Primary),
            )

        const calls_criada_botao = new Discord.ActionRowBuilder()
            .addComponents(
                new Discord.ButtonBuilder()
                    .setCustomId("text_006")
                    .setLabel('Calls')
                    .setDisabled(true)
                    .setStyle(Discord.ButtonStyle.Secondary),
            )
            .addComponents(
                new Discord.ButtonBuilder()
                    .setCustomId("text_007")
                    .setLabel('🔊 Criada')
                    .setDisabled(true)
                    .setStyle(Discord.ButtonStyle.Success),
            )
        const calls_deletada_botao = new Discord.ActionRowBuilder()
            .addComponents(
                new Discord.ButtonBuilder()
                    .setCustomId("text_008")
                    .setLabel('Calls')
                    .setDisabled(true)
                    .setStyle(Discord.ButtonStyle.Secondary),

            )
            .addComponents(
                new Discord.ButtonBuilder()
                    .setCustomId("text_009")
                    .setLabel('🔊 Deletada')
                    .setDisabled(true)
                    .setStyle(Discord.ButtonStyle.Danger),
            )


        if (interaction.customId == 'btn-calls-criar') {
            const user = interaction.user;

            const canal_principal = await interaction.guild.channels.create({
                name: `🔒 -- ${interaction.user.username}`,
                parent: calls_config_categoriaCalls,
                type: 2,
                permissionOverwrites: [
                    {
                        id: interaction.guild.id,
                        deny: ["Connect"],
                    },
                    {
                        id: interaction.member,
                        allow: ["ViewChannel", "Stream", 'Connect', 'Speak', "SendMessages", "AddReactions", "AttachFiles", 'UseApplicationCommands', "MoveMembers"],
                    },
                ],
            });

            const canal_aguardando = await interaction.guild.channels.create({
                name: `⌚ -- ${interaction.user.username}`,
                parent: calls_config_categoriaCalls,
                type: 2,
                permissionOverwrites: [
                    {
                        id: interaction.guild.id,
                        allow: ["Connect"],
                        deny: ["Stream", 'Speak', "SendMessages", "AddReactions", "AttachFiles", 'UseApplicationCommands'],
                    },
                    {
                        id: interaction.member,
                        allow: ["ViewChannel", 'Connect', 'Speak', "SendMessages", "AddReactions", 'UseApplicationCommands', "MoveMembers"],
                    },
                ],
            });
            const criar_buttons = new Discord.ActionRowBuilder()
                .addComponents(
                    new Discord.ButtonBuilder()
                        .setCustomId("text_001")
                        .setLabel('Calls')
                        .setDisabled(true)
                        .setStyle(Discord.ButtonStyle.Success),
                )
                .addComponents(
                    new Discord.ButtonBuilder()
                        .setLabel('🔊 Principal')
                        .setURL(`https://discord.com/channels/${interaction.guild.id}/${canal_principal.id}`)
                        .setStyle(Discord.ButtonStyle.Link),
                )
                .addComponents(

                    new Discord.ButtonBuilder()
                        .setLabel('🔊 Aguardando')
                        .setURL(`https://discord.com/channels/${interaction.guild.id}/${canal_aguardando.id}`)
                        .setStyle(Discord.ButtonStyle.Link),

                );

            const log = new Discord.EmbedBuilder()
                .setAuthor({ name: `Call Criada` })
                .setDescription(`${calls_e_voice} **Call:** ${canal_principal} / ${canal_aguardando}\n${calls_e_info} **Call de:** ${interaction.user}\n⌚ **Data:** *${date}*`)
                .setThumbnail(calls_imagem_criada)
                .setFooter({ text: `${canal_principal.id} | ${interaction.user.id}` });

            calls_logs.send({ embeds: [log], components: [calls_criada_botao, criar_buttons] })

            interaction.reply({ content: `${calls_e_verify} ${interaction.user} **seu canal privado foi criado!** *Entre nos canais clicando nos botões abaixo.*\n${calls_e_info} *Para liberar a entrada de seus amigos no seu canal, peça para eles entrarem no seu canal de* "**agurdando**", *depois disso basta move-los para seu canal principal.*`, components: [criar_buttons], ephemeral: true })

        } //

        if (interaction.customId == 'btn-calls_deletar_1') {
            let call_principal = client.channels.cache.find(c => c.name == `🔒 -- ${interaction.user.username}`)
            let call_aguaradando = client.channels.cache.find(c => c.name == `⌚ -- ${interaction.user.username}`)

            if (!call_principal) {
                console.log("Erro" + interaction.user.id + "    /    " + interaction.user.username)
                interaction.reply({ content: `❌`, ephemeral: true })
            }
            if (!call_aguaradando) {
                interaction.reply({ content: `${calls_e_no} ${interaction.user}** sua call foi deletada com sucesso!**`, ephemeral: true }).then(() => {
                    const embed_log = new Discord.EmbedBuilder()
                        .setAuthor({ name: `Call Deletada` })
                        .setDescription(`${calls_e_voice} **Call:** ${call_principal} / ${call_aguaradando}\n${calls_e_info} **Call de:** ${interaction.user}\n⌚ **Data:** *${date}*`)
                        .setThumbnail(calls_imagem_deletada)

                    calls_logs.send({ embeds: [embed_log], components: [calls_deletada_botao] })
                    call_principal.delete();
                })
            }
            else {
                interaction.reply({ content: `${calls_e_no} ${interaction.user}** sua call foi deletada com sucesso!**`, ephemeral: true }).then(() => {
                    const embed_log = new Discord.EmbedBuilder()
                        .setAuthor({ name: `Call Deletada` })
                        .setDescription(`${calls_e_voice} **Call:** ${call_principal} / ${call_aguaradando}\n${calls_e_info} **Call de:** ${interaction.user}\n⌚ **Data:** *${date}*`)
                        .setThumbnail(calls_imagem_deletada)

                    calls_logs.send({ embeds: [embed_log], components: [calls_deletada_botao] })
                    call_principal.delete();
                    call_aguaradando.delete();
                })
            }
        } //

        if (interaction.customId == 'btn-calls_painelAvancado') {
            let call_aguaradando = client.channels.cache.find(c => c.name == `⌚ -- ${interaction.user}`)
            let canal_principal = client.channels.cache.find(c => c.name == `🔒 -- ${interaction.user}`)

            if (!canal_principal) {
                interaction.reply({ content: `${calls_e_no} ${interaction.user}, *você não pode usar este recurso no momento.* :(`, ephemeral: true })
            }
            else {
                const calls_painelAvancado_botao = new Discord.ActionRowBuilder()
                    .addComponents(
                        new Discord.ButtonBuilder()
                            .setCustomId("btn-calls_block")
                            .setLabel('Bloquear')
                            .setEmoji(calls_e_no)
                            .setStyle(Discord.ButtonStyle.Danger),
                    )
                    .addComponents(
                        new Discord.ButtonBuilder()
                            .setCustomId("btn-calls_unblock")
                            .setLabel('Desbloquear')
                            .setEmoji(calls_e_verify)
                            .setStyle(Discord.ButtonStyle.Success),
                    )

                interaction.reply({ components: [calls_painelAvancado_botao], ephemeral: true })
            }
        }

        if (interaction.customId == 'btn-calls_block') {
            let call_aguaradando = client.channels.cache.find(c => c.name == `⌚ -- ${interaction.user.id}`)
            let canal_principal = client.channels.cache.find(c => c.name == `🔒 -- ${interaction.user.id}`)

            if (!canal_principal && !call_aguaradando) {
                interaction.reply({ content: `${calls_e_no} ${interaction.user}, **você não criou uma call!**\n${calls_e_info} *Crie uma para ter acesso a este recurso.*`, ephemeral: true })
            }
            if (call_aguaradando) {
                interaction.reply({ content: `${calls_e_verify} **Sua call foi bloquada com sucesso!**\n${calls_e_info} *Agora seu canal de sala de espera foi deletado, portanto novos membros não poderão solicitar entrada e nem saber que você tem uma call privada criada.*`, ephemeral: true })
                call_aguaradando.delete()

                const log = new Discord.EmbedBuilder()
                    .setAuthor({ name: `Call Bloqueada` })
                    .setDescription(`${calls_e_voice} **Call:** ${canal_principal}\n${calls_e_info} **Call de:** ${interaction.user}\n⌚ **Data:** *${date}*`)
                    .setThumbnail(calls_imagem_geral)
                    .setFooter({ text: `${canal_principal.id} | ${interaction.user.id}` });
                calls_logs.send({ embeds: [log], components: [calls_bloqueada_botao] })
            }
        }


        if (interaction.customId == 'btn-calls_unblock') {
            let call_principal = client.channels.cache.find(c => c.name == `🔒 -- ${interaction.user.id}`)
            let call_aguaradando = client.channels.cache.find(c => c.name == `⌚ -- ${interaction.user.id}`)

            if (!call_principal) {
                interaction.reply({ content: `${calls_e_no} ${interaction.user} **você não criou uma call!** *Crie uma para ter acesso a este recurso.*`, ephemeral: true })
            }
            if (call_principal && !call_aguaradando) {
                const canal_aguardando = await interaction.guild.channels.create({
                    name: `⌚ -- ${interaction.user.id}`,
                    parent: calls_config_categoriaCalls,
                    type: 2,
                    permissionOverwrites: [
                        {
                            id: interaction.guild.id,
                            allow: ["Connect"],
                            deny: ["Stream", 'Speak', "SendMessages", "AddReactions", "AttachFiles", 'UseApplicationCommands'],
                        },
                        {
                            id: interaction.member,
                            allow: ["ViewChannel", 'Connect', 'Speak', "SendMessages", "AddReactions", 'UseApplicationCommands', "MoveMembers"],
                        },
                    ],
                });
                const desbloquear_buttons = new Discord.ActionRowBuilder()
                    .addComponents(
                        new Discord.ButtonBuilder()
                            .setCustomId("text_001")
                            .setLabel('Calls')
                            .setDisabled(true)
                            .setStyle(Discord.ButtonStyle.Success),
                    )
                    .addComponents(
                        new Discord.ButtonBuilder()
                            .setLabel('🔊 Aguardando')
                            .setURL(`https://discord.com/channels/${interaction.guild.id}/${canal_aguardando.id}`)
                            .setStyle(Discord.ButtonStyle.Link),
                    )

                interaction.reply({ content: `${calls_e_verify} **Sua call foi desbloquada com sucesso!**\n${calls_e_info} *Seu canal de espera foi criado novamente e agora novos membros podem solicitar entrada.*`, components: [desbloquear_buttons], ephemeral: true })

                const log = new Discord.EmbedBuilder()
                    .setAuthor({ name: `Call Desbloqueada` })
                    .setDescription(`${calls_e_voice} **Call:** ${call_principal} / ${canal_aguardando}\n${calls_e_info} **Call de:** ${interaction.user}\n⌚ **Data:** *${date}*`)
                    .setThumbnail(calls_imagem_geral)
                    .setFooter({ text: `${call_principal.id} | ${interaction.user.id}` });
                calls_logs.send({ embeds: [log], components: [calls_desbloqueada_botao] })
            }

        }
        if (interaction.isButton()) {
            let requireDB = await Guild.findOne({ idS: interaction.guild.id })
            if (interaction.customId === "formulario") {

                if (!interaction.guild.channels.cache.get(requireDB.welcome.channel)) return interaction.reply({ content: `O sistema está desativado.`, ephemeral: true })
                const modal = new Discord.ModalBuilder()
                    .setCustomId("modal")
                    .setTitle("Formulário");

                const primeira = new Discord.TextInputBuilder()
                    .setCustomId("primeira")
                    .setLabel("Qual e seu nome/sobrenome?")
                    .setMaxLength(20)
                    .setPlaceholder("Nome/Sobrenome")
                    .setRequired(true)
                    .setStyle(Discord.TextInputStyle.Short)

                const segundo = new Discord.TextInputBuilder()
                    .setCustomId("segundo")
                    .setLabel("Qual e sua idade?")
                    .setMaxLength(2)
                    .setPlaceholder("Idade")
                    .setStyle(Discord.TextInputStyle.Short)
                    .setRequired(true)

                const terceira = new Discord.TextInputBuilder()
                    .setCustomId("terceira")
                    .setLabel(`Qual e seu horario disponivel?`)
                    .setPlaceholder("Manhã/Tarde/Noite/Madrugada")
                    .setStyle(Discord.TextInputStyle.Short)
                    .setRequired(true)
                const quarta = new Discord.TextInputBuilder()
                    .setCustomId("quarta")
                    .setLabel(`Em qual área você tem interesse em trabalhar?`)
                    .setPlaceholder("Parceria/Mod/Punição")
                    .setStyle(Discord.TextInputStyle.Short)
                    .setRequired(true)

                const setimo = new Discord.TextInputBuilder()
                    .setCustomId("setimo")
                    .setLabel(`Porque devemos te aceitar na STAFF?`)
                    .setMaxLength(1000)
                    .setPlaceholder("Motivo")
                    .setStyle(Discord.TextInputStyle.Paragraph)
                    .setRequired(true)
                modal.addComponents(
                    new Discord.ActionRowBuilder().addComponents(primeira),
                    new Discord.ActionRowBuilder().addComponents(segundo),
                    new Discord.ActionRowBuilder().addComponents(terceira),
                    new Discord.ActionRowBuilder().addComponents(quarta),
                    new Discord.ActionRowBuilder().addComponents(setimo)

                )
                await interaction.showModal(modal)
            }
        } else if (interaction.isModalSubmit()) {
            if (interaction.customId === "modal2") {
                let res1 = interaction.fields.getTextInputValue("primeira")
                let res2 = interaction.fields.getTextInputValue("segundo")
                let res3 = interaction.fields.getTextInputValue("terceira")
                let res4 = interaction.fields.getTextInputValue("quarta")
                let res7 = interaction.fields.getTextInputValue("setimo")

                if (!res1) res1 = "Não informado"
                if (!res2) res2 = "Não informado"
                if (!res3) res3 = "Não informado"
                if (!res4) res4 = "Não informado"
                if (!res7) res7 = "Não informado"
                let embed = new Discord.EmbedBuilder()
                    .setColor("303136")
                    .setAuthor({ name: interaction.guild.name, iconURL: interaction.guild.iconURL({ dynamic: true }) })
                    .setThumbnail(interaction.user.displayAvatarURL({ dynamic: true }))
                    .setDescription(`**Usuario:** ${interaction.user}\n**ID:** \`${interaction.user.id}\``)
                    .addFields(
                        {
                            name: `Nome`,
                            value: `\`\`\`${res1}\`\`\``,
                            inline: true
                        },
                        {
                            name: `Idade`,
                            value: `\`\`\`${res2}\`\`\``,
                            inline: true
                        },
                        {
                            name: `Horarios`,
                            value: `\`\`\`${res3}\`\`\``,
                            inline: true
                        },
                        {
                            name: `Em qual área você tem interesse em trabalhar?`,
                            value: `\`\`\`${res4}\`\`\``,
                            inline: true
                        },

                        {
                            name: `Motivo`,
                            value: `\`\`\`${res7}\`\`\``,
                            inline: false
                        }
                    );

                interaction.reply({
                    embeds: [new Discord.EmbedBuilder().setDescription(`**${interaction.user},** Seu formulário foi enviado com sucesso. Aguarde a resposta no seu privado!`)
                        .setColor("303136")
                    ],
                    ephemeral: true,
                })
                let data;
                try {
                    data = await Guild.findOne({
                        idS: interaction.guild.id
                    });

                    if (!data) {
                        data = await Guild.create({
                            idS: interaction.guild.id,
                        });
                    }
                } catch (err) {
                    console.log(err);
                    await interaction.reply({
                        content: "Ocorreu um erro ao executar este comando...",
                        ephemeral: true,
                    });
                }
                await interaction.guild.channels.cache.get(await data.fomulario.logs).send({ embeds: [embed] })
            }
        }

        if (interaction.isUserSelectMenu()) {

            if (interaction.customId === "member") {

                const avatar = '<@' + interaction.values[0] + '>'
                let avatar2 = interaction.values[0].user.avatarURL({ format: 'png', dynamic: true, size: 2048 });
                interaction.reply({
                    embeds: [
                        new Discord.EmbedBuilder()
                            .setColor("Random")
                            .setImage(avatar2)
                    ],
                })
            }



        }
    }
}
