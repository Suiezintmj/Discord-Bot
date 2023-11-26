const Discord = require("discord.js")
const Schemas = require("../../database/Schemas/User")
const ms = require("ms");
module.exports = {
    name: "work",
    description: "Trabalhe e ganhe algumas Mkcoins",
    options: [{
        name: 'trabalho',
        description: 'Selecione um trabalho',
        type: Discord.ApplicationCommandOptionType.String,
        required: true,
        choices: [
            {
                name: "Programandor",
                value: "Programandor"
            },
            {
                name: "Mecanico",
                value: "Mecanico"
            },
            {
                name: "Construtor",
                value: "Construtor"
            },
            {
                name: "Agricultor",
                value: "Agricultor"
            },
            {
                name: "Garçom",
                value: "Garçoms"
            },
            {
                name: "Cozinheiro",
                value: "Cozinheiro"
            },
            {
                name: "Vendedor",
                value: "Vendedor"
            },
            {
                name: "Barqueiro",
                value: "Barqueiro"
            },
            {
                name: "Youtuber",
                value: "Youtuber"
            },
            {
                name: "Padeiro",
                value: "Padeiro"
            },
        ]
    }],
    run: async (client, interaction) => {
        let data = await Schemas.findOne({ userId: interaction.user.id })
        if (!data) {
            interaction.reply("usúario não registrando no meu banco de dados")
            data = await Schemas.create({
                userId: interaction.user.id,
            });
        }



        let timeout = ms("1 days")
        let author = 0

        if (timeout - (Date.now() - author) > 0) {
            let time = ms(timeout - (Date.now() - author))
            let resta = [time.seconds, 'segundos'];
            if (resta[0] == 0) resta = ['alguns', 'millisegundos']
            if (resta[0] == 1) resta = [time.seconds, 'segundo']
            return interaction.reply({ content: `Você ja trabalhou demais, descanse por ${resta}` })

        }
        let works = interaction.options.getString("trabalho")
        let construiu = [
            "Um telhado",
            "Uma Casa de Dois Andares"]
        let randomzin = construiu[Math.floor(Math.random() * construiu.length)];
        let random = Math.floor((Math.random() * 10));
        let random2 = Math.floor((Math.random() * 5));
        let amount = Math.floor(Math.random() * 4000) + 1;

        data.cooldowns.work = Date.now();
        data.bank += amount * 1;
        await data.save();
        switch (works) {
            case 'Programador':
                {
                    interaction.reply({ content: `Você programou ${random} bots e ganhou ${amount} como recompensa` })
                }
                break;
            case 'Construtor':
                {
                    interaction.reply({ content: `Você construiu ${randomzin} e ganhou ${amount}` })
                }
                break;
            case 'Agricultor':
                {
                    interaction.reply({ content: `Você plantou ${random} rosas e como recompensa ganhou ${amount}` })
                }
                break;
            case 'Garçom':
                {
                    interaction.reply({ content: `${random} clientes te avaliaram como ${random2} estrelas e você ganhou ${amount}` })
                }
                break;
            case 'Mecanico':
                {
                    interaction.reply({ content: `Você trabalhou como mecanico e ganhou ${amount}` })
                }
                break;
            case 'Cozinheiro':
                {
                    interaction.reply({ content: `Você trabalhou como cozinheiro, cozinhou para 50 pessoas e todas te avaliaram bem, tome ${amount} moneys como recompensa` })
                }
                break;
            case 'Vendedor':
                {
                    interaction.reply({ content: `Você ganhou ${amount} por ter vendido 4 roupas` })
                }
                break;
            case 'Barqueiro':
                {
                    interaction.reply({ content: `Você ganhou ${amount} por ter vendido 4 roupas` })
                }
                break;
            case 'Youtuber':
                {
                    interaction.reply({ content: `${random} pessoas apareceram em anuncios no seu video e você ganhou ${amount}` })
                }
                break;
            case 'Padeiro':
                {
                    interaction.reply({ content: `Você fez ${random} bolos e ganhou ${amount}` })
                }
                break;
        }

    }

}