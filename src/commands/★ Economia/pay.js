const { EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder, ApplicationCommandOptionType } = require("discord.js") //...
const { unabbreviate } = require("util-stunks") //usado para transformar "20k" em 20000 por exemplo!
const Schema = require("../../database/Schemas/User");
const Discord = require("discord.js")

module.exports = {
  name: "pay",
  description: "[ 💳 - Economia ] Pague uma quantia de moedas para um usuário.",
  type: Discord.ApplicationCommandType.ChatInput,
  options: [
    {
      name: "usuário",
      type: Discord.ApplicationCommandOptionType.User,
      description: "Mencione um usuário para pagar.",
      required: true
    },
    {
      name: "quantia",
      type: Discord.ApplicationCommandOptionType.Number,
      description: "Coloque uma quantia para pagar.",
      required: true
    }

  ],

  run: async (client, interaction, args) => {

    let user = interaction.options.getUser("usuário");
    let quantia = interaction.options.getNumber("quantia")

    let confirmar = new Discord.ActionRowBuilder()

      .addComponents(
        new Discord.ButtonBuilder()
          .setCustomId("sim")
          .setLabel("Pagar")
          .setStyle(2)
      )

    interaction.reply({



      content: (`> (💰) **Hey** ${user}! ${interaction.user} quer lhe tranferir 💰 \`${quantia}\` dinheiros para você.`), components: [confirmar]
    })

    let userdb2 = await Schema.findOne({ userId: interaction.user.id });
    if (!userdb2) {
      const newuser = new Schema({ userId: interaction.user.id });
      await newuser.save();
      userdb2 = await Schema.findOne({ userId: interaction.user.id });
    }

    let userdb = await Schema.findOne({ userId: user.id });
    if (!userdb) {
      const newuser = new Schema({ userId: user.id });
      await newuser.save();
      userdb = await Schema.findOne({ userId: user.id });
    }
    let embed = new Discord.EmbedBuilder()
      .setTitle(`Você pagou \`${quantia}\` para \`${user.username}\``)
      .setColor("23006e")
      .setDescription(`Você não possui \`${quantia}\` moedas, possui apenas \`${userdb.bank}\` moedas.`)

    let embed2 = new Discord.EmbedBuilder()
      .setTitle(`Você enviou dinhero para ${user.username}`)
      .setColor("23006e")
      .setDescription(`Você enviou \`${quantia}\` moedas para ${user} com sucesso.`)
    let filtro = i => i.user.id === interaction.user.id;
    let coletor = interaction.channel.createMessageComponentCollector({ filtro, time: 180000 });


    coletor.on('collect', async i => {
      if (i.customId === "sim") {

        if (!userdb || userdb2.money == 0 || userdb2.money < quantia) {
          i.reply({ embeds: [embed] });
        } else {
          userdb2.money = userdb2.money - quantia; userdb2.save();
          userdb.money = userdb.money + quantia; userdb.save();

          i.reply({ embeds: [embed2] })
        }
      }

    })
  }
}

