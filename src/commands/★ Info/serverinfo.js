const Discord = require("discord.js")

module.exports = {
    name:"server-info",
    description:"Mostrar as infomarção do servido",
    options:[],
run:async (client, interaction)=>   {
    let guild = interaction.guild
    let createdDate = interaction.guild.createdAt.toLocaleDateString("eng");
    let canais = interaction.guild.channels.cache.size;
    let emoji= interaction.guild.emojis.cache.size;
    let staticEmoji = interaction.guild.emojis.cache.filter((e) => !e.animated).size;
    let animatedEmoji = interaction.guild.emojis.cache.filter((e) => e.animated ).size;
  
    interaction.reply({
        embeds:[
            new Discord.EmbedBuilder()
            .setColor("Random")
            .setTitle(`${guild.name}`)
            .setDescription(`**ID**: ${guild.id}\n**Dono**: ${guild.ownerId}`)
            .setThumbnail(guild.iconURL({ format: 'png', dynamic: true, size: 2048}))
            .setImage("https://i.pinimg.com/564x/c8/2e/1e/c82e1e552215676dd5b91548d5ad8ab0.jpg")
            .addFields(
                {
                    name:"Região",
                    value:`${interaction.guildLocale}`,
                    inline: true
                },
                {
                    name:"Verificação",
                    value:`${guild.verificationLevel}`,
                    inline: true
                },{
                    name:"Boosts",
                    value:`${guild.premiumSubscriptionCount}`,
                    inline: true
                },
                {
                    name:"Usuarios",
                    value:`${guild.memberCount}`,
                    inline: true
                },
                {
                    name:"Canais em geral",
                    value: `Canais: ${canais}\n Cargos: ${guild.roles.cache.size}`,
                    inline: true
                },

                {
                    name: 'Emojis',
                    value: `normal: ${staticEmoji}\n Animados: ${animatedEmoji}\nTotal: ${emoji}`,
                    inline: true
                },
            
                {
                    name: `Servidor criado`,
                    value: `<t:${parseInt(interaction.guild.createdTimestamp / 1000)}>`,
                    inline: true,
                },
                {
                    name: `🚀 ${interaction.user.username} entrou em `,
                    value: `<t:${parseInt(guild.joinedTimestamp / 1000)}:F>`,
                    inline: true,
                },
            )
        ]
    })
}
}