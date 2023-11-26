  
  const Discord = require('discord.js')
  const canvacord = require("canvacord")
  const db = require ('quick.db')
  
  module.exports = {
    name:"triggered",
    description:"teste",
    options:[
        {
            name: "usuário",
            type: Discord.ApplicationCommandOptionType.User,
            description: "Veja a carteira de um usuário.",
            required: false 
        }
    ],
    run: async (client, interaction, args) => {
   
      let user = interaction.options.getUser("usuário")|| interaction.user;
        interaction.reply({content:"carregando"})
  
      let avatar = user.avatarURL({ dynamic: true, extension: "png", size: 1024 });
  
      let image = await canvacord.Canvas.trigger(avatar);
      let attachment = new Discord.AttachmentBuilder(image, {name:"triggered.gif"});
      return interaction.editReply({content:(" "), files: [attachment] });
  
    }
  }
  