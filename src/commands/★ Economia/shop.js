/*
const Discord = require("discord.js");
const schema = require("../../database/Schemas/User")
module.exports = {
    name:"shop",
    description:"shop",
    options:[],
    
run:async (client, interaction)=>{
    

    const doc = await schema.findOne({ userId: interaction.user.id });

    const itens = await schema.findOne({ userId: interaction.user.id })
      .then((x) => Object.entries(x.shop.itens));

  
    let  embed = new Discord.EmbedBuilder()
    .setColor("Random")
    .setTitle( `Lista dos itens da minha Loja.`)
      .addFields({
        name:"Lista",
        value:`${itens
          .map(([, x]) => x)
          .filter((x) => x != true)
          .map(
            (x) =>
             ` > ( Nome: **${x.name}** )\n> Valor: **\`${x.price}\`**`
          )
          .join("\n\n")}`
      })
      const menu = new Discord.ActionRowBuilder()
      .addComponents(
        new Discord.StringSelectMenuBuilder()
        .setCustomId("loja")
        .setPlaceholder('teste')
        .addOptions(
          {
            label: `${itens
              .map(([, x]) => x)
              .filter((x) => x != true)
              .map(
                (x) =>
                 `${x.name}`)}`,
            emoji: "<:null:1104112394436886700>",
            value: "painel"
        },
        {
            label: "Utilidade",
            description: "Veja meus comandos de utilidade.",
            emoji: "<:null:1104112643356229712> ",
            value: "utilidade"
        },
        {
            label: "Diversão",
            description: "Veja meus comandos de diversão.",
            emoji: "<:icons_bright:1104145437901983917>",
            value: "diversao"
        },
        {
            label: "Administração",
            description: "Veja meus comandos de administração.",
            emoji: "<:null:1104112643356229712>",
            value: "adm"
        },
        {
            label: "Economia",
            description: "Veja meus comandos de administração.",
            emoji: "<:icon:1104148381380653177>",
            value: "economia"
        }
        )
      )
   interaction.reply({embeds:[embed], components:[menu]})
    }
  
}
*/