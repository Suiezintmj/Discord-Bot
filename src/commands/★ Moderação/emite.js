const Discord = require("discord.js");

module.exports = {
    name: 'simular',
    description: 'Escolha o evento que você quer Emite',
    options:[{
        name: 'options',
        description: 'Escolha se deseja entrar ou sair',
        type: Discord.ApplicationCommandOptionType.String,
        required: true,
        choices: [
            { name: 'Entradas', value: 'join' },
            { name: 'Saídas', value: 'leave' },
        ]
    }],
  
 run: async (client, interaction) => {
    const options =  interaction.options.getString("options")
    if (!interaction.member.permissions.has(Discord.PermissionFlagsBits.Administrator)) return;
    switch(options){
        case "join": {
            interaction.reply({
                embeds:[
                    new Discord.EmbedBuilder()
                    .setColor('Random')
                    .setDescription( `| Sucesso! Evento de entrada de membro enviado, vai para seu canal de boas-vindas  (se você tiver um!)`)
                ],ephemeral: true
            })
            client.emit("guildMemberAdd", interaction.member);
        }
        break;

        case 'leave': {
            interaction.reply({
                embeds:[
                    new Discord.EmbedBuilder()
                    .setColor("Random")
                    .setDescription( `| Sucesso! Evento de saida de membro enviado, vai para seu canal de boas-vindas  (se você tiver um!)`)
                ],ephemeral: true
            })
            client.emit("guildMemberRemove", interaction.member);
        }
        break;
    }
       }
}


//comando antigo
/*
    if (!interaction.member.permissions.has(Discord.PermissionFlagsBits.Administrator)) {
        return await interaction.reply({
            embeds: [
            new Discord.EmbedBuilder()
            .setColor("Random")
            .setDescription( ` | Você não tem permissão para execunta o evento de entrada! Você precisa de \`Administrator\`permissão!`)
         ], ephemeral: true 
        });
       }
       if(interaction.options.getSubcommand()=== "join"){
       client.emit("guildMemberAdd", interaction.member);
       interaction.reply({
        embeds: [
            new Discord.EmbedBuilder()
            .setColor("Random")
            .setDescription( `| Sucesso! Evento de entrada de membro enviado, vai para seu canal de boas-vindas  (se você tiver um!)`)
        ], ephemeral: true
       });
      } 
      else{
      
    
            if (!interaction.member.permissions.has(Discord.PermissionFlagsBits.Administrator)) {
             return await interaction.reply({
                 embeds: [
                 new Discord.EmbedBuilder()
                 .setColor("Random")
                 .setDescription( ` | Você não tem permissão para execunta o evento de saida! Você precisa de \`Administrator\`permissão!`)
              ],ephemeral: true 
             });
            }
            client.emit("guildMemberRemove", interaction.member);
            interaction.reply({
             embeds: [
                 new Discord.EmbedBuilder()
                 .setColor("Random")
                 .setDescription( `| Sucesso! Evento de saida de membro enviado, vai para seu canal de boas-vindas  (se você tiver um!)`)
             ],ephemeral: true
            });
           }
        */