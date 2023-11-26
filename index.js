const { token } = require("./config");
const fs = require("fs");
const { GatewayIntentBits, Client, Collection, InteractionType } = require('discord.js')
const Discord = require("discord.js")
const config = require("./config")
const chalk = require('chalk');
const client = new Client({
  intents: [32767],
  partials: ["USER", "CHANNEL", "GUILD_MEMBER", "MESSAGE", "REACTION"]
});
client.queue = new Map()

client.login(token).catch(() => {
  console.log(`${chalk.greenBright(`[SYSTEM]`)} ${chalk.redBright(`TOKEN NÃO CONFIGURADO.`)}`)
})
client.config = require('./config')
client.commands = new Collection();
client.aliases = new Collection();
client.slashCommands = new Collection();
client.categories = fs.readdirSync(`./src/Prefixcommnds/`);

fs.readdirSync('./src/Prefixcommnds/').forEach(local => {
  const comandos = fs.readdirSync(`./src/Prefixcommnds/${local}`).filter(arquivo => arquivo.endsWith('.js'))

  for (let file of comandos) {
    let puxar = require(`./src/Prefixcommnds/${local}/${file}`)

    if (puxar.name) {
      client.commands.set(puxar.name, puxar)
    }
    if (puxar.aliases && Array.isArray(puxar.aliases))
      puxar.aliases.forEach(x => client.aliases.set(x, puxar.name))
  }
});
fs.readdirSync('./src/events/').forEach(local => {
  const eventos = fs.readdirSync(`./src/events/${local}`).filter(arquivo => arquivo.endsWith('.js'))

  for (let file of eventos) {
    let events = require(`./src/events/${local}/${file}`)
    if (events.once) {
      client.once(events.name, (...args) => events.execute(client, ...args))
    } else {
      client.on(events.name, (...args) => events.execute(client, ...args))
    }
  }
})



const SlashsArray = []
fs.readdirSync('./src/commands/').forEach(local => {
  const scomandos = fs.readdirSync(`./src/commands/${local}`).filter(arquivo => arquivo.endsWith('.js'))

  for (let file of scomandos) {
    const slashcommand = require(`./src/commands/${local}/${file}`)

    if (slashcommand.name) {
      client.slashCommands.set(slashcommand.name, slashcommand);
      SlashsArray.push(slashcommand)
    }
  }
})

client.on("ready", async () => {
  await client.application.commands.set(SlashsArray).then(() => {
    console.log(`${chalk.whiteBright(`[SLASH COMMANDS]`)} ${chalk.redBright(`Comandos Carregados!`)}`)
  })
})
client.on("ready", async () => {
  console.log(`${chalk.whiteBright(`[Events]`)} ${chalk.redBright(`Eventos Carregados!`)}`)

})

process.on("uncaughtException", (err) => {
  console.log("Uncaught Exception: " + err);
})
process.on("unhandledRejection", (reason, promise) => {
  console.log(`${chalk.redBright("[ERRO DETECTADO]")}`, promise, `${chalk.redBright(reason.message)}`)
})

const connectiondb = require("./src/database/index")
connectiondb.start();