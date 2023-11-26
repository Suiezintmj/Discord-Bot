const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let guildSchema = new Schema({
  idS: { type: String },

  welcome: {
    canvas: { type: String, default: "null" },
    channel: { type: String, default: "null" },
    img: { type: String, default: "https://i.imgur.com/i2nRAku.jpg" },
    msg: { type: String},
  },
  goodbye: {
    canvas: { type: String, default: "null" },
    channel: { type: String, default: "null" },
    img: { type: String, default: "https://i.imgur.com/i2nRAku.jpg" },
    msg: { type: String},
  },
  embed:{
    titulo:{type: String, default: "null"},
    imagem:{type: String, default: "null"},
    cor: {type: String, default: "null"},
    descrição:{type: String, default: "null"},
    thumbnail:{type: String, default:"null"}
  },
  parceria:{
    channel: { type: String, default: "null" },
  },
  byebye: {
    status: { type: Boolean, default: false },
    channel: { type: String, default: "null" },
    msg: { type: String, default: "null" },
  },
sugestao:{
  channel: { type: String, default: "null" },
},
  logs: {
    logs: { type: String, default: "null" },
    status: { type: String, default: "null"},
  },
 
  autorole: {
    status: { type: Boolean, default: false },
    autoRole: { type: String, default: [] },
  },
  
  antinvite: {
    msg: { type: String, default: "null" },
    status: { type: Boolean, default: false },
    channels: { type: Array, default: [] },
    roles: { type: Array, default: [] },
  },
  antifake: {
    status: { type: Boolean, default: false },
    days: { type: Number, default: 0 },
  },
 tempo:{
  mute:{ type: Number, default: 0 }
 },
  ban:{
    recent:{type: Boolean, default: false}
   },
    fomulario: {
      channel: { type: String, default: "null" },
      logs: { type: String, default: "null" },
      status: { type: Boolean, default: false },
    },
    registro:{
      channel:{ type: String, default: "null" },
      nome:{type: Array, default: "null"},
      role:{type: Array, default: "null"},
      option:{ type: String, default: "null"}
    },
  createCall: {
    status: { type: Boolean, default: false },
    category: { type: String, default: "null" },
    channel: { type: String, default: "null" },
    users: {
      type: Array,
      default: [],
    },
  },
});

let Guild = mongoose.model("Guilds", guildSchema);
module.exports = Guild;