const Discord = require('discord.js');//Script by: CroneGamesPlays#9901

const Guild = require("../../database/Schemas/Guild")
const Canvas = require('canvas');
module.exports = {
    name: "guildMemberRemove",

    async execute(client, member) {
      let guilddb = await Guild.findOne({
        idS: member.guild.id,
      });
       


            const channelLeaveID = guilddb.goodbye.channel
            const canal = member.guild.channels.cache.get(channelLeaveID);
            const canvass = guilddb.goodbye.canvas
            const messagem = guilddb.goodbye.msg
            const channelImageLeave = guilddb.goodbye.img

            
      
 
            const canvas = Canvas.createCanvas(1024, 500)
                  const ctx = canvas.getContext('2d')
                  ctx.font = '72px Montserrat';
                  ctx.fillStyle = '#ffffff';
              
              
                      const background = await Canvas.loadImage(channelImageLeave);
                      ctx.drawImage(background, 0, 0, 1024, 500)
                      ctx.beginPath();
                      ctx.arc(512, 166, 128, 0, Math.PI * 2, true);
                      ctx.stroke()
                      ctx.fill()
              
              
                    
        
                    
                      ctx.font = '42px arial',
                      ctx.textAlign = 'center';
                    
                      ctx.fillText(`${member.user.tag.toUpperCase()}`, 512, 360)
                      ctx.font = '32px arial'
                      ctx.fillText(`Saiu de ${member.guild.name}`, 512, 410)
                      ctx.font = '32px arial'
                      ctx.fillText(`Total de membro ${member.guild.memberCount}`, 512, 455)
                      ctx.beginPath()
                      ctx.arc(512, 166, 119, 0, Math.PI * 2, true)
                      ctx.closePath()
                      ctx.clip()
                      await Canvas.loadImage(member.user.displayAvatarURL({ extension: 'png', size: 1024 }))
                        .then(img => {
                          ctx.drawImage(img, 393, 47, 238, 238);
                        })
              const attachment = new Discord.AttachmentBuilder(canvas.toBuffer(), { name: "saiu-image.png"})
                       
           
            let embedLeave = new Discord.EmbedBuilder()
            .setAuthor({ name: member.guild.name, iconURL: member.guild.iconURL({ dynamic: true }) })
            .setColor("#a600ff")
            .setDescription(messagem)
            .setImage(channelImageLeave)
            .setFooter({ text: `© ${client.user.username} 2023 | Development by CroneGamesPlays#9901` })
            .setTimestamp()
            let embedLeave2 = new Discord.EmbedBuilder()
            .setAuthor({ name: member.guild.name, iconURL: member.guild.iconURL({ dynamic: true }) })
            .setColor("#a600ff")
            .setDescription(messagem
            .replace(/{name}/g, `${member.user.username}`)
            .replace(/{total}/g, member.guild.memberCount)
            .replace(/{guildName}/g, member.guild.name)
            .replace(/{tag}/g, member.user.tag))
            .setImage("attachment://saiu-image.png")
            .setFooter({ text: `© ${client.user.username} 2023 | Development by CroneGamesPlays#9901` })
            .setTimestamp()
            if(canvass === "Canvas"){
              canal.send({files:[attachment]})
            }else if(canvass === "canvasembed"){
              canal.send({files:[attachment], embeds:[embedLeave2]})
            }else{
            canal.send({ embeds: [embedLeave], content: `***Membro Saiu!*** [ ${member} ]` })
}
               
    }
}