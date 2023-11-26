const Discord = require('discord.js');
module.exports = {
    name:"kick",
    description:"para punir um usuario",
    type: Discord.ApplicationCommandType.ChatInput,
    options:[
        {
            name:"user",
            description:"Selecione um usuario",
            type: Discord.ApplicationCommandOptionType.User,
            require: true,
        },
        {
            name:"motivo",
            description:"Escolhar um motivo para punir o usuario",
            type: Discord.ApplicationCommandOptionType.String,
            require: false,
        }
    ],
run: async(client, interaction) =>{
    if(!interaction.member.permissions.has(Discord.PermissionFlagsBits.KickMembers)){
       return interaction.reply({
        embeds:[
            new Discord.EmbedBuilder()
            .setColor("Random")
            .setDescription(`Olá, ${interaction.user} Você não tem permissão para utilizar esse comando`)]
       })
    }
  
    
      const user = interaction.options.getUser("user")
      let user2 = interaction.guild.members.cache.get(user.id)
      let motivo = interaction.options.getString("motivo")
      if(!motivo) motivo = "sem motivo"
      if(!user) return interaction.reply({content:`Coloque um id valido`, ephemeral: true})
      const embed = new Discord.EmbedBuilder()
      .setColor("Random")
      .setDescription(`**Usuário que será Expulso: ${interaction.user}** \n **Motivo: **${motivo}.\n\nClique na reação ✅ para confirmar. \n Se não, clique em ❌ para cancelar.`)
      .setTimestamp()
      const Simounão = new Discord.ActionRowBuilder()
      .addComponents(
        new Discord.ButtonBuilder()
        .setCustomId("sim")
        .setLabel("expulsa")
        .setEmoji("✅")
        .setStyle(2),
        new Discord.ButtonBuilder()
        .setCustomId("nao")
        .setLabel("Cancelar")
        .setEmoji("❌")
        .setStyle(2)
        )

    interaction.reply({embeds:[embed], components:[Simounão], ephemera: true})
    const filtro = i => i.customId === "Simounão" && i.user.id === interaction.user.id;
    const coletor = interaction.channel.createMessageComponentCollector({ filtro, time: 100000 });
    coletor.on('collect', async i =>{
        switch(i.customId)
        {
            case 'sim':
                {
                    let embed2 = new Discord.EmbedBuilder()
                    .setColor('Random')
                    .setDescription(`o usuario ${user} (\`${interaction.user.id}\`) foi Expulso do servidor pelo motivo \`${motivo}\` com Sucesso` )
                    .setFooter({text: `comando requisitado por: ${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL({format: 'png'})})
                    user2.kick({ reason: [motivo]}).then(()=> {
                      i.reply({ embeds: [customId ]})
                    })
                }
                break;
            case 'nao': 
            {
                i.reply({content:`expulsamento cancelado`, ephemera: true}).then(() => {
                    setTimeout(() => {
                        interaction.deleteReply()
                    }, 6000)
                })
            }       
        }
    
    })

}
}