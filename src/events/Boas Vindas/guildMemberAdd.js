const Discord = require("discord.js")

const Canvas = require('canvas');
const infos = require("../../languages/pt-br")
const { registerFont } = require('canvas')

registerFont("assets/fonts/Montserrat-Black.ttf", { family: "Montserrat" });
registerFont("assets/fonts/Segoe Print.ttf", { family: "Segoe Print" });
registerFont("assets/fonts/Segoe UI.ttf", { family: "Segoe UI" });

const Guild = require("../../database/Schemas/Guild")
module.exports = {
  name: "guildMemberAdd",

  async execute(client, member, interaction) {
    let guildid = await Guild.findOne({ idS: member.guild.id })
    const info = {
      msg: guildid.welcome.msg || infos.embeds.welcome.descrição,
      imagem: guildid.welcome.img,
      channel: guildid.welcome.channel,
      embedcanvas: guildid.welcome.canvas
    }
    if (!info.channel) return interaction.reply({ content: "Error" })
    if (!info.imagem) return interaction.reply({ content: "Error" })

    let canal = member.guild.channels.cache.get(info.channel)
    switch (info.embedcanvas) {
      case 'canvasembed':
        {
          const canvas = Canvas.createCanvas(1024, 550);
          const ctx = canvas.getContext('2d');
          const background = await Canvas.loadImage(info.imagem);
          ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

          ctx.font = '42px Montserrat',
            ctx.textAlign = 'center';

          ctx.fillText(`${member.user.tag.toUpperCase()}`, 512, 410)
          ctx.font = '32px Montserrat'
          ctx.fillText(`Você é o membro ${member.guild.memberCount}`, 512, 455)

          ctx.beginPath();
          canvas.context.arc(512, 166, 119, 0, Math.PI * 2, true)
          ctx.closePath();
          ctx.clip();

          const avatar = await Canvas.loadImage(member.user.displayAvatarURL({ dynamic: true, extension: 'jpg', size: 1024 }));

          ctx.drawImage(avatar, 393, canvas.height / 2 - 250, 238, 238);
          const attachment = new Discord.AttachmentBuilder(canvas.toBuffer(), { name: "welcome-image.png" })
          const bemvindo = new Discord.EmbedBuilder()
            .setColor("Random")
            .setDescription(info.msg
              .replace(/{member}/g, `<@${member.id}>`)
              .replace(/{name}/g, `${member.user.username}`)
              .replace(/{total}/g, member.guild.memberCount)
              .replace(/{guildName}/g, member.guild.name)
              .replace(/{tag}/g, member.user.tag))
            .setImage('attachment://welcome-image.png')
          canal.send({ files: [attachment], embeds: [bemvindo] })
        }
        break;
      case 'Canvas':
        {
          const canvas = Canvas.createCanvas(1024, 550);
          const ctx = canvas.getContext('2d');
          const background = await Canvas.loadImage(info.imagem);
          ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

          ctx.font = '42px Montserrat',
            ctx.textAlign = 'center';

          ctx.fillText(`${member.user.tag.toUpperCase()}`, 512, 410)
          ctx.font = '32px Montserrat'
          ctx.fillText(`Você é o membro ${member.guild.memberCount}`, 512, 455)

          ctx.beginPath();
          canvas.context.arc(512, 166, 119, 0, Math.PI * 2, true)
          ctx.closePath();
          ctx.clip();

          const avatar = await Canvas.loadImage(member.user.displayAvatarURL({ dynamic: true, extension: 'jpg', size: 1024 }));

          ctx.drawImage(avatar, 393, canvas.height / 2 - 250, 238, 238);
          const attachment = new Discord.AttachmentBuilder(canvas.toBuffer(), { name: "welcome-image.png" })
          canal.send({ files: [attachment], content: `${info.msg}` })
        }
        break;
      case 'embed':
        {
          canal.send({
            embeds: [
              new Discord.EmbedBuilder()
                .setColor("Random")
                .setDescription(info.msg
                  .replace(/{member}/g, `<@${member.id}>`)
                  .replace(/{name}/g, `${member.user.username}`)
                  .replace(/{total}/g, member.guild.memberCount)
                  .replace(/{guildName}/g, member.guild.name)
                  .replace(/{tag}/g, member.user.tag))
                .setImage(info.imagem)
            ]
          })
        }
    }


  }
}
/*
    if (embedcanvas == "canvasembed") {
      const canvas = Canvas.createCanvas(1024, 550);
      const ctx = canvas.getContext('2d');
      const background = await Canvas.loadImage(imagem);
  
      ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
  
      ctx.font = '42px Montserrat',
        ctx.textAlign = 'center';
  
      ctx.fillText(`${member.user.tag.toUpperCase()}`, 512, 410)
      ctx.font = '32px Montserrat'
      ctx.fillText(`Você é o membro ${member.guild.memberCount}`, 512, 455)
  
      ctx.beginPath();
      canvas.context.arc(512, 166, 119, 0, Math.PI * 2, true)
      ctx.closePath();
      ctx.clip();
  
      const avatar = await Canvas.loadImage(member.user.displayAvatarURL({ dynamic: true, extension: 'jpg', size: 1024 }));
  
      ctx.drawImage(avatar, 393, canvas.height / 2 - 250, 238, 238);
      const attachment = new Discord.AttachmentBuilder(canvas.toBuffer(), { name: "welcome-image.png" })
      const bemvindo = new Discord.EmbedBuilder()
        .setColor("Random")
        .setDescription(msg
          .replace(/{member}/g, `<@${member.id}>`)
          .replace(/{name}/g, `${member.user.username}`)
          .replace(/{total}/g, member.guild.memberCount)
          .replace(/{guildName}/g, member.guild.name)
          .replace(/{tag}/g, member.user.tag))
        .setImage('attachment://welcome-image.png')
      canal.send({ files: [attachment], embeds: [bemvindo] })
    } else if (embedcanvas == "Canvas") {
      canal.send({ files: [attachment], content: `${msg}` })
    } else {
      canal.send({
        embeds: [
          new Discord.EmbedBuilder()
            .setColor("Random")
            .setDescription(msg
              .replace(/{member}/g, `<@${member.id}>`)
              .replace(/{name}/g, `${member.user.username}`)
              .replace(/{total}/g, member.guild.memberCount)
              .replace(/{guildName}/g, member.guild.name)
              .replace(/{tag}/g, member.user.tag))
            .setImage(imagem)
        ]
      })
    }
  }
}
*/