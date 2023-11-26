const Discord = require("discord.js")
module.exports ={
 name:"abraça",
 description:"para abraça alguém",
 options:[
    {
        name:"user",
        description: "mencione alguém",
        type:Discord.ApplicationCommandType.User,
    }
 ],
run:async (client, interaction)=>{
    const user = interaction.options.getUser("user")
        var lista1 = [
            'https://imgur.com/II1bakc.gif',
            'https://imgur.com/MzAjNdv.gif',
            'https://imgur.com/eKcWCgS.gif',
            'https://imgur.com/3aX4Qq2.gif',
            'https://imgur.com/uobBW9K.gif'
        ];
        var lista2 = [
            'https://imgur.com/3jzT5g6.gif',
            'https://imgur.com/VrETTlv.gif',
            'https://imgur.com/FozOXkB.gif',
            'https://imgur.com/7GhTplD.gif',
            'https://imgur.com/B6UKulT.gif'
        ];
    var random = lista1[Math.floor(Math.random() * lista1.length)];
    var random1 = lista2 [Math.floor(Math.random() * lista2.length)]
    interaction.reply({
        embeds:[
            new Discord.EmbedBuilder()
            .setColor("Blue")
            .setDescription(`${interaction.user}  Deu um abraço em ${user}`)
            .setImage(random)
        ],
        components:[
            new Discord.ActionRowBuilder().addComponents(
                new Discord.ButtonBuilder()
                .setCustomId("1")
                .setLabel("Retribuir")
                .setStyle(Discord.ButtonStyle.Secondary)
            )
        ]
    })
}
}