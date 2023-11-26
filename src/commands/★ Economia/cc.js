const Discord = require("discord.js")

const ms = require("ms");
const schema = require("../../database/Schemas/User");

const cooldowns = {}
module.exports = {
  name: "cartão-clonado",
  description: "[ 💳 - Economia ]  Clonar cartão de alguem",
  options: [],
  run: async (client, interaction) => {

    let data = await schema.findOne({ userId: interaction.user.id });

    if (!cooldowns[interaction.user.id]) cooldowns[interaction.user.id] = { lastCmd: null };
    let ultimocmd = cooldowns[interaction.user.id].lastCmd
    let timeout = ms("6000000")
    if (ultimocmd !== null && timeout - (Date.now() - ultimocmd) > 0) {
      let time = ms(timeout - (Date.now() - ultimocmd))
      let resta = [time.seconds, 'segundos'];
      if (resta[0] == 0) resta = ['alguns', 'millisegundos']
      if (resta[0] == 1) resta = [time.seconds, 'segundo']
      
      interaction.reply({ content: ` Hm, você já fez um Cartão hoje! Volte daqui \`${resta}\`` })
      return;
    }
    cooldowns[interaction.user.id].lastCmd = Date.now()
    let amount = Math.ceil(Math.random() * 5000)
    let embed1 = new Discord.EmbedBuilder()
      .setTitle(" Cartão Clonando")
      .setColor("#8c28FF")
      .setDescription(`>**Parabéns \`${interaction.user.username}\` Você acaba de clonar um cartão de crédito, e ganhou  ${amount} Mkcoins**`)
      .setTimestamp();

    data.money = data.money + amount;
    data.cooldowns.cc = Date.now();
    data.save();

    interaction.reply({ embeds: [embed1] })
  }

}
