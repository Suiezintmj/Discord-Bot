const Discord = require("discord.js")

const Guild = require("../../database/Schemas/Guild")


module.exports ={
    name: "interactionCreate",

    async execute(client, interaction) {
        let guilddb = await Guild.findOne({
            idS: interaction.guild.id,
          });
        
        if(interaction.isButton()){
           if(interaction.customId === "msga"){

          
                interaction.reply({
                    embeds:[
                        new Discord.EmbedBuilder()
                        .setDescription(`Qual a Descrição Do  Bem vindo?
                        > **{member}** - menciona o membro\n> **{name}** - coloca o nome do membro\n > **{tag}** - Tag o membro\n> **{total}** - pega o total de membros na guild\n> **{guildName}** - pega o nome do servidor`)
                        .setColor("Green")
                    ],ephemeral: true
                  })
                  let coletor_1 = interaction.channel.createMessageCollector({
                        filter: i => i.author.id === interaction.user.id,
                        max: 1,
                    })
                coletor_1.on("collect", async(message)=>{
                  
                    let msg = message.content
        
                await Guild.findOneAndUpdate(
                { idS: interaction.guild.id },
                { $set: { "welcome.msg": msg} })
                
                     let embed = new Discord.EmbedBuilder()
                        .setColor("Green")
                       
                        .setDescription(msg)
                                
                            message.reply({
                            embeds: [embed],components:[
                                new Discord.ActionRowBuilder()
                                .addComponents(
                                    new Discord.ButtonBuilder()
                                    .setCustomId("emite2")
                                    .setLabel("emiti entrada de membro")
                                    .setStyle(2)
                                )
                            ],
                            ephemeral: true})
                        })
                                
                
           
          } 
        }
        let filtro = i => i.user.id === interaction.user.id;
        let coletor = interaction.channel.createMessageComponentCollector({filtro, time: 180000 });
    coletor.on("collect",async i =>{
        if(i.customId ==="emite2"){
         client.emit("guildMemberAdd", i.member);
         i.reply({
         embeds: [
             new Discord.EmbedBuilder()
             .setColor("Random")
             .setDescription( `| Sucesso! Evento de entrada de membro enviado, vai para seu canal de boas-vindas  (se você tiver um!)`)
         ], ephemeral: true
        });
        }    })

        }
        }
    