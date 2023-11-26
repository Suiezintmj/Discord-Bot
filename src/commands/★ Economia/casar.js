const Discord = require("discord.js");
const { Schema } = require("mongoose");
const schema = require("../../database/Schemas/User");
module.exports = {
    name: "casar",
    description: "casar com alguem.",
    options: [
        {
         name: "user",
         description: "usuário que você quer casar.",
         type: 6,
         required: true
        },
        ],
    run: async (client, interaction) => {
        
     const user = interaction.options.getUser("user")
     
     let userdb2 = await  schema.findOne({ userId: interaction.user.id });
     if (!userdb2) {
         const newuser = new  schema({ userId: interaction.user.id });
         await newuser.save();
         userdb2 = await  schema.findOne({ userId: interaction.user.id });
     }
 
     let userdb = await  schema.findOne({ userId: user.id });
     if (!userdb) {
         const newuser = new schema({ userId: user.id });
         await newuser.save();
         userdb = await schema.findOne({ userId: user.id });
     }
      
     if(interaction.user.id == user.id) return interaction.reply({embeds: [new Discord.EmbedBuilder()
    .setTitle(`✋ Calma ai...`)
    .setColor("a5d7ff")
    .setDescription(`**Calma!** Você pode se casar consigo mesmo.`)
], ephemeral: true})

    if(userdb2.marry.married) return interaction.reply({embeds: [new Discord.EmbedBuilder()
    .setTitle(`✋ Calma ai...`)
    .setColor("a5d7ff")
    .setDescription(`**Calma!** Você já está casado com alguém.`)
], ephemeral: true})

    if(userdb.marry.married) return interaction.reply({embeds: [new Discord.EmbedBuilder()
    .setTitle(`✋ Calma ai...`)
    .setColor("a5d7ff")
    .setDescription(`**Calma!** ${user} já está casado com alguém.`)
], ephemeral: true})

    const butao = new Discord.ActionRowBuilder()
	.addComponents(
		new Discord.ButtonBuilder()
		.setCustomId(`aceitar`)
		.setLabel('Aceitar')
		.setStyle(Discord.ButtonStyle.Secondary),
		new Discord.ButtonBuilder()
		.setCustomId(`recusar`)
		.setLabel('Recusar')
		.setStyle(Discord.ButtonStyle.Secondary),
			);

   interaction.reply({embeds: [new Discord.EmbedBuilder()
    .setTitle(`💒 Casamentos 💍`)
    .setColor("a5d7ff")
    .setDescription(`Ei ${user}. ${interaction.user} quer se casar com você, aceitas?`)
], components: [butao], fetchReply: true}).then(msg =>{
    
    const collector = msg.createMessageComponentCollector({ idle: 1000 * 60 * 10 });

collector.on('collect', async i => {
  
  if(i.user.id !=user.id) return i.reply({embeds: [new Discord.EmbedBuilder()
    .setTitle(`👨 Calma ae...`)
    .setColor("a5d7ff")
    .setDescription(`Só quem recebeu o pedido de casamento pode usar o botão.`)
], ephemeral: true})

   collector.stop()

   if(i.customId == "aceitar"){
       
    await schema.findOneAndUpdate(
        { userId: interaction.user.id },
        {
          $set: {
            "marry.with": user.id,
            "marry.married": true,
            "cooldowns.marrytime": Date.now(),
          },
        }
      );
      await schema.findOneAndUpdate(
        { userId: user.id },
        {
          $set: {
            "marry.with": interaction.user.id,
            "marry.married": true,
            "cooldowns.marrytime": Date.now(),
          },
        }
      ); 
       interaction.editReply({embeds: [new Discord.EmbedBuilder()
    .setTitle(`😶✋ Casados!`)
    .setColor("a5d7ff")
    .setDescription(`${user} aceitou o pedido de casamento de ${interaction.user}! 🎉🎉🎉🎉🎉`)
], components: []})
   }
   
   if(i.customId == "recusar"){
      interaction.editReply({embeds: [new Discord.EmbedBuilder()
    .setTitle(`😢 Perdemo fml...`)
    .setColor("a5d7ff")
    .setDescription(`${user} recusou o pedido de casamento de ${interaction.user}.`)
], components: []})
       
   }
   
})

})

    }
};