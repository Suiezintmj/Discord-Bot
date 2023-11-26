
const Discord = require("discord.js")

module.exports = {
   name: 'messageCreate',
   async execute(client, message) {

      if (message.author.bot) return;
      if (message.content == `<@!${client.user.id}>` || message.content == `<@${client.user.id}>`) 
      {
         const inivite = new Discord.ActionRowBuilder()
            .addComponents(
               new Discord.ButtonBuilder()
                  .setURL("https://discord.com/oauth2/authorize?client_id=${client.user.id}&scopet=bot&permissions=2147483647")
                  .setLabel("Me adicione")
                  .setStyle(5)
            )
         const embed = new Discord.EmbedBuilder()
            .setColor("Random")
            .addFields({
               name: `***<:7337zerotwohello:1081601838442348716> oie ${message.author.username} , então vc me marcou né , então aqui esta o básico sobre mim!***`,
               value: "Para sabe das minhas Atulizaçãês ultilize /news"},
               {
                  name: ' **<:emoji_22:918659167445712976> **|** ajuda • meu comado de ajuda e help**',
                  value: " use /help para ve a minha lista de comandos"
               },
               {

                  name: "**<:Mikasa2:918655540249374822>**|** bugs • então acho um bug**",

                  value: "use /bug para reporta algum bug"

               })

         message.reply({ embeds: [embed], components: [inivite] })

      }
   }
};