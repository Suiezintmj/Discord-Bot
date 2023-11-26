const Discord = require("discord.js")
const Utils = require("../../utils/Util");
const Emojis = require("../../utils/Emojis");
const Canvas = require('canvas');
const block = "⬛";
const heart = "<:4300_pink_square:1129736824290562229>";
const Schemas = require("../../database/Schemas/User")
module.exports = {
  name: "ship",
  description: "Descubra o quanto 2 pessoas se amam!",
  category: "Fun",
  options: [
    {
      name: "user",
      description: "O primeiro usuário.",
      type: 6,
      required: true,
    },
    {
      name: "user2",
      description: "O segundo usuário.",
      required: false,
      type: 6
    },
  ],

  run: async (client, interaction) => {
    interaction.deferReply()
    let user_1 = interaction.options.getUser("user");
    let user_2 = interaction.options.getUser("user2") || interaction.user;

    let userdb = await Schemas.findOne({ userId: user_1.id })
    if (!userdb) {
      let newuser = await Schemas.create({ userId: user_1.id })
      newuser.money = 1000
      newuser.save()
    }
    let userdb2 = await Schemas.findOne({ userId: user_2.id })
    if (!userdb2) {
      let newuser = await Schemas.create({ userId: user_2.id })
      newuser.money = 1000
      newuser.save()
    }

    let resolte = userdb.ship || userdb2.ship



    let hearts;
    if (userdb.ship == userdb2.ship) {
      hearts = resolte
    } else {
      hearts = Math.floor(Math.random() * 105) + 0
    }
    const hearte = (hearts / 10)
    const str = `${heart.repeat(hearte)}${block.repeat(11 - hearte)} ${hearts}%`;
    userdb.ship = hearts
    userdb.save()
    userdb2.ship = hearts
    userdb2.save()
    let emoticon;
    if (hearts > 60) {
      emoticon = (Emojis.coração)
    } else if (hearts >= 40) {
      emoticon = (Emojis.shrug)
    } else {
      emoticon = (Emojis.sob);
    }

    const canvas = Canvas.createCanvas(384, 160)
    let ctx = canvas.getContext("2d")

    ctx.font = '100px  "Montserrat"';
    await Utils.renderEmoji(ctx, ` ${emoticon}`, 100, 100);
    let foto1 = await Canvas.loadImage(user_2.avatarURL({ extension: 'png', dynamic: true, size: 2048 }))
    let foto2 = await Canvas.loadImage(user_1.avatarURL({ extension: 'png', dynamic: true, size: 2048 }))

    ctx.drawImage(foto1, -10, 0, 128, 128)
    ctx.drawImage(foto2, 260, 0, 128, 128)


    ctx.font = '23px  "Montserrat"';
    await Utils.renderEmoji(ctx, ` ${str}`, 10, 150);
    const attachment = new Discord.AttachmentBuilder(canvas.toBuffer(), { name: "Ship.png" })
    let nomeFim1 = user_2.username.length;
    let nomeFim2 = user_1.username.length;

    let calc1 = nomeFim1 - 3
    let calc2 = nomeFim2 - 3
    let nomeship;
    if (hearts > 60) {
      nomeship = user_1.user.username.slice(0, 3) + user_2.username.slice(0, 3);

    } else if (hearts >= 40) {
      nomeship = user_1.username.slice(0, calc1) + user_2.username.slice(0, calc2)
    } else {
      nomeship = user_1.username.slice(calc1, nomeFim1) + user_2.username.slice(calc2, nomeFim2)
    }
    let desc;
    if (hearts > 90) {
      desc = (":sparkling_heart: HMMM, vai rolar ou não vai? :sparkling_heart:\n``" + user_1.username + "``\n``" + user_2.username + "``\n:heart: ``" + nomeship + "`` Esse é o casal perfeito! :heart:");
    } else if (hearts >= 70) {
      desc = (":sparkling_heart: HMMM, vai rolar ou não vai? :sparkling_heart:\n``" + user_1.username + "``\n``" + user_2.username + "``\n:neutral_face: ``" + nomeship + "`` Esses aqui já tão se pegando e não contaram pra niguém! :neutral_face:");
    } else if (hearts >= 45) {
      desc = (":sparkling_heart: HMMM, vai rolar ou não vai? :sparkling_heart:\n``" + user_1.username + "``\n``" + user_2.username + "``\n:no_mouth: ``" + nomeship + "`` Talvez só precisa o " + user_2.username + " querer... :no_mouth:");
    } else {
      desc = (":sparkling_heart: HMMM, vai rolar ou não vai? :sparkling_heart:\n``" + user_1.username + "``\n``" + user_2.username + "``\n:cry: ``" + nomeship + "`` queria muito dizer que é possivel, mas... :cry: ");
    }

    const embed = new Discord.EmbedBuilder()
      .setColor('Red')
      .setTitle('💓 **__Teremos um novo casal aqui?__** 💓')
      .setDescription(desc)
      .setImage("attachment://Ship.png")
    interaction.editReply({ files: [attachment], embeds: [embed] })

  }
} 