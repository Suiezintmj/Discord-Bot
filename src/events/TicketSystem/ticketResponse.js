const { Client, EmbedBuilder, ChannelType, ActionRowBuilder, ButtonBuilder, ButtonStyle, PermissionFlagsBits } = require("discord.js");
const TicketSchema = require('../../database/Schemas/TicketDB');
const TicketSetup = require('../../database/Schemas/TicketSetupDB');
  
  module.exports = {
    name: "interactionCreate",
  
    /**
     * @param {Client} client
     */
   
    async execute(client,interaction) {

        const {guild, member, customId, channel} = interaction;

        switch (customId) {
            case "createTicket":
    
        const {ViewChannel, SendMessages, ManageChannels, ReadMessageHistory} = PermissionFlagsBits;
        const ticketId = Math.floor(Math.random() * 9000) + 10000;
        if (!interaction.isButton()) return;
        const data = await TicketSetup.findOne({GuildID: guild.id});
        if (!data)
        return await interaction.reply({
          embeds: [
              new EmbedBuilder()
                .setTitle("Sistema de Ticket")
                .setColor("Red")
                .setDescription("Você ainda não configurou o sistema de tickets.")
                .addFields(
                  {
                    name: "<:Slash:1088996088712794162> Usar",
                    value: "<:icon_reply:1088996218283229184>  /tickets setup",
                    inline: true,
                  },
                ),
            ],
            ephemeral: true,
      });
        if (!data) return;
        const alreadyticketEmbed = new EmbedBuilder().setDescription('Desculpe, mas você já tem um ticket aberto').setColor('Red')
        const findTicket = await TicketSchema.findOne({GuildID: guild.id, OwnerID: member.id});
        if (findTicket) return interaction.reply({embeds: [alreadyticketEmbed], ephemeral: true}).catch(error => {return});
        if (!guild.members.me.permissions.has(ManageChannels)) return interaction.reply({content: 'Desculpe, não tenho permissões.', ephemeral: true}).catch(error => {return});
    
        try {
            await guild.channels.create({
                name: `🎫・ticket┋${interaction.user.tag}┋` + ticketId,
                type: ChannelType.GuildText,
                topic: interaction.user.id,
                parent: data.Category,
                permissionOverwrites: [
                    {
                        id: data.Everyone,
                        deny: [ViewChannel, SendMessages, ReadMessageHistory],
                    },
                    {
                        id: data.Handlers,
                        allow: [ViewChannel, SendMessages, ReadMessageHistory, ManageChannels],
                    },
                    {
                        id: member.id,
                        allow: [ViewChannel, SendMessages, ReadMessageHistory],
                    },
                ],
            }).catch(error => {return}).then(async (channel) => {
                await TicketSchema.create({
                    GuildID: guild.id,
                    OwnerID: member.id,
                    MemberID: member.id,
                    TicketID: ticketId,
                    ChannelID: channel.id,
                    Locked: false,
                    Claimed: false,
                });
                await channel.setTopic('🌿 Ticket aberto por' + ' <@' + member.id + '>').catch(error => {return});
                const embed = new EmbedBuilder().setTitle('Bem-vindo a você, obrigado por abrir um ticket.').setDescription('Um membro de nossa equipe de moderação em breve cuidará de sua solicitação.\nObrigado por esperar com calma e bom humor')
                const button = new ActionRowBuilder().setComponents(
                    new ButtonBuilder().setCustomId('ticket-close').setLabel('Fechar').setStyle(ButtonStyle.Danger).setEmoji('📪'),
                    new ButtonBuilder().setCustomId('ticket-lock').setLabel('Bloquear').setStyle(ButtonStyle.Secondary).setEmoji('🔒'),
                    new ButtonBuilder().setCustomId('ticket-unlock').setLabel('Desbloquear').setStyle(ButtonStyle.Secondary).setEmoji('🔓'),
                    new ButtonBuilder().setCustomId('ticket-manage').setLabel('Membros').setStyle(ButtonStyle.Secondary).setEmoji('➕'),
                    new ButtonBuilder().setCustomId('ticket-claim').setLabel('Reivindicar').setStyle(ButtonStyle.Primary).setEmoji('👋'),
                );
                channel.send({embeds: ([embed]),components: [button]}).catch(error => {return});
                const handlersmention = await channel.send({content : '<@&' + data.Handlers + '>'});
                handlersmention.delete().catch(error => {return});
                const ticketmessage = new EmbedBuilder().setDescription('✅ O seu ticket foi criado' + ' <#' + channel.id + '>').setColor('Green');
                interaction.reply({embeds: [ticketmessage], ephemeral: true}).catch(error => {return});
            })
        } catch (err) {
            return console.log(err);
        }
    }

    },
  };