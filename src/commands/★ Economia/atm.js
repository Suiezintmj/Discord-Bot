const Discord = require("discord.js")
const schema = require("../../database/Schemas/User");

const Utils = require("../../utils/Util");
const Emojis = require("../../utils/Emojis");
module.exports =  {
    name: "atm",
    description: "[ 💳 - Economia ] Veja sua quantidade de moedas em sua carteira.",
    type: Discord.ApplicationCommandType.ChatInput,
    options: [
        {
            name: "usuário",
            type: Discord.ApplicationCommandOptionType.User,
            description: "Veja a carteira de um usuário.",
            required: false 
        }
    ],
    
    run: async (client, interaction, args) => {
        let user = interaction.options.getUser("usuário")|| interaction.user
        const userdb = await schema.findOne({
          userId: user.id
      }) ||  { banco: 0, money: 0}
       
       
            const EMBED = new Discord.EmbedBuilder(interaction.author)
             
              .addFields(
                {
                  name: `${Emojis.Coins} Coins fora do Banco`,
                  value: `${userdb.money}`,
                },
      
                {
                  name: `${Emojis.Bank} Coins no Banco`,
                  value: `${userdb.bank}`,
                },
               
              )
              .setThumbnail(
                user.displayAvatarURL({ dynamic: true, size: 2048, format: "jpg" })
              );
      
              interaction.reply({embeds: [EMBED]})
              }
        }
      
