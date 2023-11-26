const Discord = require("discord.js")
module.exports = {
    name:"desbanir",
    description: "Desbanir um usuário.", 
    type: Discord.ApplicationCommandType.ChatInput,
    options: [
      {
          name: "user",
          description: "Mencione um usuário para ser desbanido.",
          type: Discord.ApplicationCommandOptionType.User,
          required: true,
      },
      {
          name: "motivo",
          description: "Coleque o motivo do desbanimento.",
          type: Discord.ApplicationCommandOptionType.String,
          required: false,
      }
  ],
  run:  async (client, interaction) => {
    if(!interaction.member.permissions.has(Discord.PermissionFlagsBits.BanMembers)) return interaction.reply({
        content:`Você não tem permissão para utilizar esse comando`})
    const user = interaction.options.getUser("user")
    const motivo = interaction.options.getString("motivo")
    if (!motivo) motivo = "Não definido."
 
           const embed = new Discord.EmbedBuilder()
            .setColor("Random")
            .setDescription(`⚒️Desbanimento⚒️️️`)
            .addFields(
                {
                    name: "Usuário desbanido",
                    value: `${user}`
                },
                {
                    name:"Id do Usuário",
                    value:`${user.id}`
                },
                {
                    name:"Desbanido por",
                    value:`${interaction.user}`
                }
            )
      
    let erro = new Discord.EmbedBuilder()
    .setColor("Red")
    .setDescription(`Não foi possível desbanir o usuário ${user} (\`${user.id}\`) do servidor!`);
    interaction.guild.members.unban(user.id, motivo).then( () => {
        interaction.reply({ embeds: [embed], ephemera:true })
    }).catch(e => {
        interaction.reply({ embeds: [erro], ephemera:true })
    })

   }

  
}