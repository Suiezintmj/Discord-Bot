const Discord = require("discord.js")
const map = new Map();
const usersMap = new Map();
const LIMIT = 5;
const TIME = 70000;
const DIFF = 3000;
module.exports = {
   name: 'messageCreate',
   async execute(client, message) {
    if (message.author.bot) return;
    if (
      message.content == `<@!${client.user.id}>` ||
      message.content == `<@${client.user.id}>`
  ) return;
    if (usersMap.has(message.author.id)) {
      const userData = usersMap.get(message.author.id);

      const user = message.author.id
      const { lastMessage, timer } = userData;
      const difference = message.createdTimestamp - lastMessage.createdTimestamp;
      let msgCount = userData.msgCount;
      console.log(difference);
  
      if (difference > DIFF) {
        clearTimeout(timer);
        console.log('Cleared Timeout');
        userData.msgCount = 1;
        userData.lastMessage = message;
        userData.timer = setTimeout(() => {
          usersMap.delete(message.author.id);
          console.log('Removido do mapa.');
        }, TIME);
        usersMap.set(message.author.id, userData);
      } else {
        ++msgCount;
    
        if (parseInt(msgCount) === LIMIT) {
          let muterole = message.guild.roles.cache.find(
            role => role.name === 'Mutado'
          );
          if (!muterole) {
            try {
              muterole = await message.guild.roles.create({
                name: 'Mutado',
                permissions: []
              });
              message.guild.channels.cache.forEach(async (channel, id) => {
                await channel.createOverwrite(muterole, {
                  SEND_MESSAGES: false,
                  ADD_REACTIONS: false
                });
              });
            } catch (e) {
              console.log(e);
            }
          }
          message.member.roles.add(muterole);
          message.channel.send(
            `🍰**${message.author} você Está silenciado, porque floodou/spammou muitas mensagens!**`);
          setTimeout(() => {
            
            message.channel.send(`😘${message.author} Agora Você pode falar novamente, mas Não cometa o mesmo erro!`);
          }, TIME);
        } else {
          userData.msgCount = msgCount;
          usersMap.set(message.author.id, userData);
        }
      }
    } else {
      let fn = setTimeout(() => {
        usersMap.delete(message.author.id);
        console.log('Removido do mapa.');
      }, TIME);
      usersMap.set(message.author.id, {
        msgCount: 1,
        lastMessage: message,
        timer: fn
      });
    }
     


}}