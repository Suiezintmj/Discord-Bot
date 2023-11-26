const Discord = require("discord.js");
const { Hercai } = require('hercai');

module.exports = {
  name: "imagine",
  description: "[💜]Descreva algo para a sayorus imaginar, e ela te entregará uma imagem.",
  type: Discord.ApplicationCommandType.ChatInput,
  options: [
    {
      name: "texto",
      type: Discord.ApplicationCommandOptionType.String,
      description: "[💜]Digite o que quer que seja imaginado pela Sayorus.",
      required: true,
    }
  ],
  run: async (bot, interaction) => {
    const client = new Hercai();
    const cooldowns = {};

    try {
      // Deferir a resposta de forma temporária e visível apenas para o usuário
      await interaction.deferReply({ ephemeral: true });

      const canalId = interaction.channel.id;

      if (cooldowns[canalId] && cooldowns[canalId] > Date.now()) {
        const tempoRestante = (cooldowns[canalId] - Date.now()) / 1000;
        return interaction.editReply(`Aguarde ${tempoRestante.toFixed(1)} segundos antes de usar este comando novamente.`);
      }

      const imagem = interaction.options.getString('texto');
      const resposta = await client.drawImage({ model: "v2", prompt: imagem });

      cooldowns[canalId] = Date.now() + 7000;

      if (resposta.url) {
        const embed = new Discord.EmbedBuilder()
          .setColor('#FF007F')
          .setDescription(`**Comando Em BetaTEST, pode ocorrer erros.\nPedido por:** ${interaction.user}\n**Prompt**: ${imagem}`)
          .setImage(resposta.url)
          .setTimestamp(new Date());

        interaction.editReply({ content: '# Imagem Gerada🌟', embeds: [embed] });
      } else {
        console.error(resposta.error || 'Erro desconhecido na API da Hercai.');
        interaction.editReply('**Ocorreu um erro ao gerar a imagem.**\n **Por favor, contate meu DEV** [[AQUI]](seu discord aqui).');
      }
    } catch (error) {
      console.error(error);
      interaction.editReply('Ocorreu um erro ao processar sua solicitação.');
    }
  }
};
