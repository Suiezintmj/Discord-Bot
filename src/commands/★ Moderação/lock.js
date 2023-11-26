const Discord = require("discord.js")
module.exports={
    name:"lock",
    description:"[🩸 Admin] Trava o Canal!, Destrancar",
    options:[
        {
        name: 'options',
        description: 'Escolha se deseja on ou off',
        type: Discord.ApplicationCommandOptionType.String,
        required: true,
        choices: [
            { name: 'Trancado', value: 'on' },
            { name: 'Destrancado', value: 'off' },
        ]
    }
],
run: async (client, interaction)=>{
    const options = interaction.options.getString('options')
    
    switch(options){
    case 'on': {
        interaction.reply({content:` ✔️ O canal foi trancado com sucesso!`}).then(msg =>{
        interaction.channel.permissionOverwrites.edit(interaction.guild.id, {SendMessages: false}).catch(e =>{
        console.log(e)
        interaction.editReply(`❌ Ops, algo deu errado ao tentar trancar este chat.`)})
        })
    }
    break;
    case 'off': {
        interaction.reply({
        content:` ✔️ O canal foi destrancado com sucesso!`
        }).then(msg =>{
            interaction.channel.permissionOverwrites.edit(interaction.guild.id, {SendMessages: true}).catch(e =>{
                console.log(e)
                interaction.editReply(`❌ Ops, algo deu errado ao tentar destrancado este chat.`)
            })
        })
    }
    break;
    } 
}
}