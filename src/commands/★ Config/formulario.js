const Discord = require("discord.js")
const { QuickDB } = require("quick.db")
const db = new QuickDB()
const Guild = require("../../database/Schemas/Guild")
module.exports = {
  name: "formulário", // Coloque o nome do comando
  description: "[💼 Administração] Abra o painel do formulário para os membros.", // Coloque a descrição do comando
  type: Discord.ApplicationCommandType.ChatInput,
  options: [
  {
      name:"messagem",
     description:"Em teste",
     type:  Discord.ApplicationCommandOptionType.Subcommand,
     options:[
      {
        name: "chat",
        description: "Mencione um canal.",
        type: Discord.ApplicationCommandOptionType.Channel,
        required: true,
      },
      {
        name: "canal_de_logs",
        description: "Canal para enviar as logs dos formulários recebidos.",
        type: Discord.ApplicationCommandOptionType.Channel,
        required: true,
    },
        {
      name: "cor",
      description: "em teste",
      type: Discord.ApplicationCommandOptionType.String,
      required: false,
    }
     ],
  },
  {
      name: "canais",
      description: "Escolher os canais de logs e formulario",
      type:  Discord.ApplicationCommandOptionType.Subcommand,
      options:[
        {
          name: "canal_formulário",
          description: "Canal para enviar o formulário para os membros.",
          type: Discord.ApplicationCommandOptionType.Channel,
          required: true,
      },
      {
          name: "canal_logs",
          description: "Canal para enviar as logs dos formulários recebidos.",
          type: Discord.ApplicationCommandOptionType.Channel,
          required: true,
      }
      ],
  },

  ],

  run: async (client, interaction) => {
    
    if (!interaction.member.permissions.has(Discord.PermissionFlagsBits.Administrator)) {
        interaction.reply({ content: `Você não possui permissão para utilizar este comando.`, ephemeral: true })
    } 
    let chat = interaction.options.getChannel("chat")
    let canal_logs2 = interaction.options.getChannel("canal_de_logs")
    if (interaction.options.getSubcommand() === "messagem") {

            
        const modal = new Discord.ModalBuilder()
          .setCustomId(`Embed`)
          .setTitle(`Criar Embed 🔪`)

        const TítuloEmbed = new Discord.TextInputBuilder()
          .setCustomId(`TítuloEmbed`)
          .setLabel(`Título da Embed`)
          .setPlaceholder(`Insira o título da Embed.`)
          .setStyle(Discord.TextInputStyle.Short)
        
        const DescriçãoEmbed = new Discord.TextInputBuilder()
          .setCustomId(`DescriçãoEmbed`)
          .setLabel(`Descrição da Embed`)
          .setPlaceholder(`Insira a descrição da Embed`)
          .setStyle(Discord.TextInputStyle.Paragraph)
          const Banner = new Discord.TextInputBuilder()
          .setCustomId(`Thumbnail`)
          .setLabel(`Thumbnail da Embed`)
          .setPlaceholder(`Insira o Thumbnail da Embed.`)
          .setStyle(Discord.TextInputStyle.Short)
          .setRequired(false)



        const PrimeiraActionRow = new Discord.ActionRowBuilder()
          .addComponents(TítuloEmbed);

        const SegundaActionRow = new Discord.ActionRowBuilder()
          .addComponents(DescriçãoEmbed);
          const terceiroActionRow = new Discord.ActionRowBuilder()
          .addComponents(Banner);


  modal.addComponents(PrimeiraActionRow, SegundaActionRow, terceiroActionRow)

  await interaction.showModal(modal);

  client.once(`interactionCreate`, async interaction => {
    if (!interaction.isModalSubmit()) return;

    if (interaction.customId === `Embed`) {

      const DescriçãoEmbed = interaction.fields.getTextInputValue(`DescriçãoEmbed`);
      const TítuloEmbed = interaction.fields.getTextInputValue(`TítuloEmbed`);
      const Thumbnail = interaction.fields.getTextInputValue(`Thumbnail`);
      let embedModal1 = new Discord.EmbedBuilder()
       .setColor(`Random`)
        .setTitle(`${TítuloEmbed}`)
        .setDescription(`${DescriçãoEmbed}`)
        .setThumbnail(`${Thumbnail}`|| interaction.guild.iconURL({ dynamic: true }))
        let botao = new Discord.ActionRowBuilder().addComponents(
          new Discord.ButtonBuilder()
          .setCustomId("formulario")
          .setEmoji("📋")
          .setDisabled(false)
          .setLabel("Formulário")
          .setStyle(Discord.ButtonStyle.Secondary)
      );


        interaction.reply({
        content: `✅ | Modal enviado com sucesso.`, ephemeral: true
      })
      chat.send({
        embeds: [embedModal1],components: [botao]
      })
    await Guild.findOneAndUpdate(
      { idS: interaction.guild.id },
      { $set: { "fomulario.logs": canal_logs2 } }
    );
    }
    })
     }
else {
        const canal_formulario = interaction.options.getChannel("canal_formulário")
        const canal_logs = interaction.options.getChannel("canal_logs")

        if (canal_formulario.type !== Discord.ChannelType.GuildText) {
            interaction.reply({ content: `O canal ${canal_formulario} não é um canal de texto.`, ephemeral: true })
        } else if (canal_logs.type !== Discord.ChannelType.GuildText) {
            interaction.reply({ content: `O canal ${data.fomulario.logs} não é um canal de texto.`, ephemeral: true })
        } else {
        
          await Guild.findOneAndUpdate(
            { idS: interaction.guild.id },
            { $set: { "fomulario.channel": canal_formulario } }
          )
          await Guild.findOneAndUpdate(
            { idS: interaction.guild.id },
            { $set: { "fomulario.logs": canal_logs } }
          );

            let embed = new Discord.EmbedBuilder()
            .setDescription("Random")
            .setColor('303136')
            .setTitle("Canais Configurados!")
            .setDescription(`> Canal do Formulário: ${canal_formulario}.\n> Canal de Logs: ${canal_logs}.`)

            interaction.reply({ embeds: [embed], ephemeral: true }).then( () => {
                let embed_formulario = new Discord.EmbedBuilder()
                .setColor("303136")
                .setAuthor({ name: interaction.guild.name, iconURL: interaction.guild.iconURL({ dynamic: true }) })
                .setThumbnail(interaction.guild.iconURL({ dynamic: true }))
                .setTitle(`Formulário STAFF`)
                .setDescription(`Formulário STAFF
                ﹒૮🌼﹒∇﹐Requesitos para se tornar um staff﹑҂
                
                ➜🌟・Estar no servidor a mais de 7 dias. ˳⁺៸៸
                
                ➜🌟・Possuir a idade mínima de 11 anos ou + ˳⁺៸៸
                
                ➜🌟・Possuir experiência˳⁺៸៸
                
                ➜🌟・Ter um historico limpo (Nunca ter feito raid ou algo do tipo)˳⁺៸៸
                
                ➜🌟・Ser ativo no servidor. ˳⁺៸៸
                
                ➜🌟・Não ser tóxico e não abusar do poder de staff. ˳⁺៸៸
                
                ➜🌟・Ser responsável! ˳⁺៸៸
                
                ➜🌟・NÃO QUERER SER STAFF APENAS POR STATUS. ˳⁺៸៸`);

                let botao = new Discord.ActionRowBuilder().addComponents(
                    new Discord.ButtonBuilder()
                    .setCustomId("formulario")
                    .setEmoji("📋")
                    .setDisabled(false)
                    .setLabel("Formulário")
                    .setStyle(Discord.ButtonStyle.Secondary)
                );

                canal_formulario.send({ embeds: [embed_formulario], components: [botao] })

               
        }) 
    }
  }
}
}