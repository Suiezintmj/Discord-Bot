const Discord = module.require("discord.js");
const canvacord = require("canvacord")
module.exports = {
  name: "wasted",
  description: "Coloque a foto do GTA Wasted sobre os avatares!",
  options:[{
    name:"user",
    description:"mencione um usuario",
    type: Discord.ApplicationCommandOptionType.User
  }],
  run: async (client, interaction, args) => {
    const user = interaction.options.getUser("user")|| interaction.user
   interaction.reply({content:"Carregando"})
   let avatar = user.avatarURL({ dynamic: true, extension: "png", size: 1024 });
    let image = await  canvacord.Canvas.wasted(avatar);
      let attachment = new Discord.AttachmentBuilder(image, {name:"chances-image.png"});
  
    await interaction.editReply({
      content:(""),
      files: [ attachment],
    });
  },
};