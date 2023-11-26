const { ApplicationCommandType, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js")
const schema = require("../../database/Schemas/User");
const Discord = require("discord.js")


module.exports = {

  name: "divorciar",
  type: ApplicationCommandType.ChatInput,
  description: "O casamento não deu certo?",
  options: [],

  run: async (client, interaction, args) => {


    let userdb2 = await schema.findOne({ userId: interaction.user.id })





    let casado = userdb2.marry.with
    let csadoCom = await client.users.cache.get(casado);
    let botao1 = new ActionRowBuilder().addComponents(

      new ButtonBuilder()
        .setLabel(`Divorciar`)
        .setCustomId(`sim`)
        .setEmoji(`💔`)
        .setStyle(ButtonStyle.Primary)
        .setDisabled(false),
      new ButtonBuilder()
        .setLabel(`Cancelar`)
        .setEmoji(`<a:Nao_ATa:1006978308317122570>`)
        .setCustomId(`nao`)
        .setStyle(ButtonStyle.Danger)
        .setDisabled(false)

    )

    if (userdb2.marry.with == null || userdb2.marry.married == false) {
      interaction.reply({ content: `Você não está casado com ninguém.`, ephemeral: true });

    } else {
      interaction.reply({
        embeds: [
          new Discord.EmbedBuilder()
            .setColor("Random")
            .setTitle(`💔 | Divórcio`)
            .setDescription(`${interaction.user} quer mesmo se divorciar de ${csadoCom}?`)
            .setImage("http://sm.ign.com/ign_br/screenshot/default/shock_yr3c.gif")
            .setThumbnail(interaction.user.displayAvatarURL({ dynamic: true, size: 2048, format: "jpg" })
            )
        ], components: [botao1]
      })


    }
    const filtro = i => i.customId === "botao1" && i.user.id === interaction.user.id;
    const coletor = interaction.channel.createMessageComponentCollector({ filtro, time: 100000 });

    coletor.on('collect', async i => {

      if (i.customId === "sim") {

        i.reply({
          content: `Você se divociou Com Sucesso!`
        })
        await schema.findOneAndUpdate(
          { userId: interaction.user.id },
          {
            $set: {
              "marry.with": "null",
              "marry.married": false,
              "cooldowns.marrytime": 0,
            },
          }
        );
        await schema.findOneAndUpdate(
          { userId: userdb2.marry.with },
          {
            $set: {
              "marry.with": "null",
              "marry.married": false,
              "cooldowns.marrytime": 0,
            },
          }
        );
      } else if (i.customId == "nao") {
        interaction.editReply({
          embeds: [new Discord.EmbedBuilder()
            .setTitle(`💔 | Divórcio`)
            .setColor("a5d7ff")
            .setDescription(`${interaction.user} recusou o pedido de Divocio.`)
          ], components: []
        })

      }


    })
  }
}