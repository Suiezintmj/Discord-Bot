const Discord = require("discord.js")
const ms = require("ms");
const TIME = ms("1 hours");
const Guild = require("../../database/Schemas/Guild")
module.exports = {
  name: 'messageCreate',
  async execute(client, message) {
    let guilddb = await Guild.findOne({
      idS: message.guild.id,
    });
    if (message.author.bot) return;
    if (message.channel.type == 'dm') return;
    let muterole = message.guild.roles.cache.find(
      role => role.name === 'Mutado'
    );
    let canal = guilddb.parceria.channel
    let verificando = guilddb.antinvite.status
    if (!verificando || verificando === "off" || verificando === null || verificando === false) return;
    if (verificando === true) {

      if (!message.channel.permissionsFor(message.author).has(Discord.PermissionFlagsBits.ManageGuild))
        if (!message.channel.permissionsFor(message.author).has(Discord.PermissionFlagsBits.Administrator))
          if (canal === canal) {
            if (message.content.includes("discord.gg".toLowerCase() || "discordapp.com".toLowerCase() || "invite".toLowerCase() || "(invite)".toLowerCase() || "gi".toLowerCase())) {
              message.delete();

              message.member.roles.add(muterole)
              message.channel.send({
                content: `${message.author}`,
                embeds: [
                  new Discord.EmbedBuilder()
                    .setTitle(`Invite block`)
                    .setDescription(`**${message.author.tag},** Você não pode enviar convites aqui.\n você Está silenciado, porque enviou convite de outro servidor `)
                    .setColor("Red")
                    .setFooter({ text: message.guild.name, iconURL: message.guild.iconURL({ dinamyc: true }) })
                ]
              })


              if (!muterole) {
                try {


                  muterole = await message.guild.roles.create({
                    name: 'Mutado',
                    permissions: []
                  });
                  message.guild.channels.cache.forEach(async (channel, id) => {
                    await channel.createOverwrite(muterole, {
                      SEND_MESSAGES: false,
                      ADD_REACTIONS: false
                    });
                  });
                } catch (e) {
                  console.log(e);
                }
              }

              setTimeout(() => {
                message.member.roles.remove(muterole);
                message.channel.send(`😘${message.author} Agora Você pode falar novamente, mas Não cometa o mesmo erro!`);
              }, TIME);
            } else {
              userData.msgCount = msgCount;
              usersMap.set(message.author.id, userData);
            }
          }
    }
  }
}