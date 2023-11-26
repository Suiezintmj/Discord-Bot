//incompleto
/*

const Discord = require("discord.js")
module.exports = {
    name: "embed",
    description: "criar embed",
    options: [],
    run: async (client, interaction) => {

        const embed = new Discord.EmbedBuilder()
            .setTitle("Personalize abaixo")
            .setColor("Blue")
            .setDescription("embed não pode ser vazio")

        const button = new Discord.ActionRowBuilder()
            .addComponents(
                new Discord.ButtonBuilder()
                    .setCustomId("titulo")
                    .setLabel("Título")
                    .setStyle(2),
                new Discord.ButtonBuilder()
                    .setCustomId("cor")
                    .setLabel("Cor")
                    .setStyle(2),
                new Discord.ButtonBuilder()
                    .setCustomId("Autor")
                    .setLabel("Autor")
                    .setStyle(2),
                new Discord.ButtonBuilder()
                    .setCustomId("Descrição")
                    .setLabel("Descrição")
                    .setStyle(2),
                new Discord.ButtonBuilder()
                    .setCustomId("Editar-Campos")
                    .setLabel("Campos")
                    .setStyle(2),
            )
        const button1 = new Discord.ActionRowBuilder()
            .addComponents(
                new Discord.ButtonBuilder()
                    .setCustomId("Imagemthumbnail")
                    .setLabel("Imagem e thumbnail")
                    .setStyle(2),

                new Discord.ButtonBuilder()
                    .setCustomId("registro2")
                    .setLabel("Rodapé")
                    .setStyle(2),
                new Discord.ButtonBuilder()
                    .setCustomId("sentar")
                    .setLabel("Setar em ")
                    .setStyle(2),



            )
        const button2 = new Discord.ActionRowBuilder()
            .addComponents(
                new Discord.ButtonBuilder()
                    .setCustomId(`${interaction.user.id}-importa-embed-criar`)
                    .setLabel(`Importar Json`)

                    .setStyle(1),
                new Discord.ButtonBuilder()
                    .setCustomId(`${interaction.user.id}-exportar-embed-criar`)
                    .setLabel(`Exportar Json`)

                    .setStyle(1),

                new Discord.ButtonBuilder()
                    .setCustomId("Enviar")
                    .setLabel("Enviar")

                    .setStyle(3),
            )
        interaction.reply({ content: "embed personalizando", components: [button, button1, button2], embeds: [embed] })
        const filtro = i => i.user.id === interaction.user.id;
        const coletor = interaction.channel.createMessageComponentCollector({ filtro, time: 100000 });
        coletor.on('collect', async (i) => {


            if (i.customId == "titulo") {
                const motal = new Discord.ModalBuilder()
                    .setCustomId("embed")
                    .setTitle("Titulo");
                const titulo = new Discord.TextInputBuilder()
                    .setLabel("Título Do Embed")
                    .setCustomId("titulo2")
                    .setRequired(true)
                    .setStyle(Discord.TextInputStyle.Short)



                motal.addComponents(
                    new Discord.ActionRowBuilder()
                        .addComponents(titulo)
                )
                await i.showModal(motal)
            }
            if (i.customId === "cor") {
                const motal = new Discord.ModalBuilder()
                    .setCustomId("embed")
                    .setTitle("Cor");
                const cor = new Discord.TextInputBuilder()
                    .setLabel("Cor Do Embed")
                    .setCustomId("Cor1")
                    .setRequired(true)
                    .setStyle(Discord.TextInputStyle.Short)

                motal.addComponents(
                    new Discord.ActionRowBuilder()
                        .addComponents(cor)
                )
                await i.showModal(motal)
            } else if (i.customId == "Autor") {
                const motal = new Discord.ModalBuilder()
                    .setCustomId("embed")
                    .setTitle("Autor");
                const Autor = new Discord.TextInputBuilder()
                    .setLabel("Autor Do Embed")
                    .setCustomId("Autor2")
                    .setRequired(true)
                    .setStyle(Discord.TextInputStyle.Short)

                motal.addComponents(
                    new Discord.ActionRowBuilder()
                        .addComponents(Autor)
                )
                await i.showModal(motal)
            }
            else if (i.customId == "Descrição") {
                const motal = new Discord.ModalBuilder()
                    .setCustomId("embed")
                    .setTitle("Descrição");
                const Descrição = new Discord.TextInputBuilder()
                    .setLabel("Descrição Do Embed")
                    .setCustomId("Descrição2")
                    .setRequired(true)
                    .setStyle(Discord.TextInputStyle.Short)

                motal.addComponents(
                    new Discord.ActionRowBuilder()
                        .addComponents(Descrição)
                )
                await i.showModal(motal)
            }
            else if (i.customId == "Editar-Campos") {

                embed.addFields({ name: `A`, value: `a` })

                const buttin = new Discord.ActionRowBuilder()
                    .addComponents(
                        new Discord.ButtonBuilder()

                            .setCustomId("apagar")
                            .setLabel("apagar")
                            .setStyle(2),
                        new Discord.ButtonBuilder()
                            .setCustomId("add")
                            .setLabel("Adicionar")
                            .setStyle(2),
                        new Discord.ButtonBuilder()
                            .setCustomId("editar")
                            .setLabel("Editar")
                            .setStyle(2),

                    )
                i.update({ embeds: [embed], components: [buttin] })

            }
            else if (i.customId == "Imagemthumbnail") {
                const motal = new Discord.ModalBuilder()
                    .setCustomId("embed")
                    .setTitle("Imagem-thumbnail");
                const imagem = new Discord.TextInputBuilder()
                    .setLabel("Imagem  Do Embed")
                    .setCustomId("Imagem")
                    .setRequired(true)
                    .setStyle(Discord.TextInputStyle.Short)
                const thumbnail = new Discord.TextInputBuilder()
                    .setLabel("thumbnail Do Embed")
                    .setCustomId("thumbnail")
                    .setRequired(true)
                    .setStyle(Discord.TextInputStyle.Short)

                motal.addComponents(
                    new Discord.ActionRowBuilder()
                        .addComponents(imagem)
                        .addComponents(thumbnail)
                )
                await i.showModal(motal)
            }
            else if (i.customId == "rodapé") {
                const motal = new Discord.ModalBuilder()
                    .setCustomId("embed")
                    .setTitle("rodapé");
                const rodapé = new Discord.TextInputBuilder()
                    .setLabel("rodapé Do Embed")
                    .setCustomId("rodapé2s")
                    .setRequired(true)
                    .setStyle(Discord.TextInputStyle.Short)

                motal.addComponents(
                    new Discord.ActionRowBuilder()
                        .addComponents(rodapé)
                )
                await i.showModal(motal)
            } else if (i.isModalSubmit()) {
                const titulo = i.fields.getTextInputValue("titulo")
                const descriçãos = i.fields.getTextInputValue("Descrição2")
                i.update({
                    embeds: [
                        new Discord.EmbedBuilder()
                            .setTitle(titulo)
                            .setDescription(descriçãos)
                            .setColor("Aqua")
                    ]
                })
            }
            if (i.customId == "Editar") {
                const filter = i => i.user.id === interaction.user.id;
                const coletor = interaction.channel.createMessageComponentCollector({ filter, time: 100000 });
                coletor.on("collect", async (i) => {
                    const motal = new Discord.ModalBuilder()
                        .setCustomId("embed2")
                        .setTitle("rodapé");
                    const rodap = new Discord.TextInputBuilder()
                        .setLabel("rodapé Do Embed")
                        .setCustomId("flirs")
                        .setRequired(true)
                        .setStyle(Discord.TextInputStyle.Short)

                    motal.addComponents(
                        new Discord.ActionRowBuilder()
                            .addComponents(rodap)
                    )
                    await i.showModal(motal)

                })

            }

        })
    }
}
*/