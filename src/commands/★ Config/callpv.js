const Discord = require("discord.js")
const Guild = require("../../database/Schemas/Guild")

const Utils = require("../../utils/Util");
  const Emojis = require("../../utils/Emojis");
module.exports = {
    name: "admin-painelcalls",
    description: "[ADMIN] Enviar painel calls",
   options:[
    
        {
            name: "channel",
            description: "Selecione o canal onde os tickets devem ser criados",
            type: 7,
            channel_types: [0],
            required: true,
        },
        {
            name: "category",
            description: "Selecione a categoria onde o canal de voz devem ser criados.",
            type: 7,
            channel_types: [4],
            required: true,
        },

        {
            name: "logs",
            description: "Selecione o canal para onde as logs devem ser enviadas.",
            type: 7,
            channel_types: [0],
            required: true,
        },
    
   ],

    run: async (client, interaction) => {
        if (!interaction.member.permissions.has(Discord.PermissionFlagsBits.Administrator)) return interaction.reply({ content: `❌ | Somente \`administradores\` podem usar este comando ${interaction.user}!` }).then(() => {
            setTimeout(() => {
                interaction.deleteReply()
            }, 15000)
        })
        else {
            const channel = interaction.options.getChannel('channel');
            const category = interaction.options.getChannel('category');
            const logs = interaction.options.getChannel('logs');
       
            await Guild.findOneAndUpdate(
                { idS: interaction.guild.id },
                { $set: { "createCall.channel": channel.id} }
               )
               await Guild.findOneAndUpdate(
                { idS: interaction.guild.id },
                { $set: { "createCall.category": category.id} }
               )
               await Guild.findOneAndUpdate(
                { idS: interaction.guild.id },
                { $set: { "createCall.logs":  logs.id} }
               )
            const criar = new Discord.ButtonBuilder()
                .setCustomId("btn-calls-criar")
                .setLabel("Criar Call")
                .setEmoji(Emojis.Certo)
                .setStyle(Discord.ButtonStyle.Success)

            const deletar = new Discord.ButtonBuilder()
                .setCustomId("btn-calls_deletar_1")
                .setLabel("Deletar Call")
                .setEmoji(Emojis.Errado)
                .setStyle(Discord.ButtonStyle.Danger)

            const maisOpcoes = new Discord.ButtonBuilder()
                .setCustomId("btn-calls_painelAvancado")
                .setLabel("Mais Opções")
                .setEmoji(Emojis.Computer)
                .setStyle(Discord.ButtonStyle.Primary)
                .setDisabled(false)

            const painel_calls = new Discord.ActionRowBuilder().addComponents(criar, deletar, maisOpcoes);

            const embed_calls = new Discord.EmbedBuilder()
            .setAuthor({ name: ` Sistema de calls`})
            .setDescription(`🔵 Utilize o painel para criar e gerenciar sua call privada.\n🎤*Após isso serão criados dois canais de voz automaticamente, um com emoji de cadeado e outro com emoji de relógio. Entre no canal principal, com emoji de cadeado, utilizando os botões disponíveis na mensagem de sucesso após já ter criado o seu canal. Seus amigos/convidados poderão solicitar entrada no seu canal entrando no seu canal com símbolo de relógio, uma vez que um usuário entra neste canal, o dono da call privada tem permissão para mover este membro da call de aguardando para a call principal.*`)

            interaction.channel.send({ embeds: [embed_calls], components: [painel_calls]})
            interaction.reply({content: '✔', ephemeral: true})
        }
    }
}
