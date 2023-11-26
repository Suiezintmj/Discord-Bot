const Discord = require("discord.js");

const moment = require("moment");
require("moment-duration-format");
const schema = require("../../database/Schemas/User");
const cooldowns = {}
const ms = require("ms");
module.exports = {
  name: 'rep',
  description: 'Dá uma reputação para um usuário',
  options: [
    {
      name: "user",
      description: "mencione um usuario",
      type: Discord.ApplicationCommandOptionType.User,
      required: true
    }
  ],
  run: async (client, interaction) => {
    const user = interaction.options.getUser("user");

    let userdb2 = await schema.findOne({ userId: interaction.user.id });
    if (!userdb2) {
      const newuser = new schema({ userId: interaction.user.id });
      await newuser.save();
      userdb2 = await schema.findOne({ userId: interaction.user.id });
    }

    let userdb = await schema.findOne({ userId: user.id });
    if (!userdb) {
      const newuser = new schema({ userId: user.id });
      await newuser.save();
      userdb = await schema.findOne({ userId: user.id });
    }




    if (!user)
      return interaction.reply({
        content: `${interaction.user}, você deve mencionar para quem deseja enviar uma reputação.`
      });

    if (user.bot)
      return interaction.reply({
        content: `${interaction.user}, você não pode enviar reputação para bots.`
      });

    if (!userdb)
      return interaction.reply({
        content: `${interaction.user}, este usuário não está registrado em minha database.`
      });
    if (!cooldowns[interaction.user.id]) cooldowns[interaction.user.id] = { lastCmd: null };
    let ultimocmd = cooldowns[interaction.user.id].lastCmd
    let timeout = ms("1 days")
    if (ultimocmd !== null && timeout - (Date.now() - ultimocmd) > 0) {
      let time = ms(timeout - (Date.now() - ultimocmd))
      let resta = [time.seconds, 'segundos'];
      if (resta[0] == 0) resta = ['alguns', 'millisegundos']
      if (resta[0] == 1) resta = [time.seconds, 'segundo']
      i.update({
        embeds: [
          new Discord.EmbedBuilder()
            .setColor("Red")

            .setDescription(`Espere \`${time}\` para poder resgatar seu daily novamente!`)
        ], ephemeral: true
      })
      return;

    } 
      interaction.reply({
        embeds: [
          new Discord.EmbedBuilder()
            .setColor("Random")
            .setDescription(`${interaction.user}, você enviou uma reputaçaõ para o usuário **${user.tag}** com sucesso.`)
        ]
      });
      userdb2.cooldowns.reptime = Date.now(); await userdb2.save();
      userdb.reputation = userdb.reputation + 1; await userdb.save();
    }
  }