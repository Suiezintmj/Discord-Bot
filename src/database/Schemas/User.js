const mongoose = require("mongoose");
const Schema = mongoose.Schema;
let userSchema = new Schema({
  userId:  {
    type: String,
    unique: true,
    required: true,
  },
 

  ship:{ type: Number, default: 0},
  money: { type: Number, default: 1000 },
  daily: { type: Number, default: 0 },
 
  bank: {
    type: Number,
    default: 1000,
    required: true,
  },
 
 

  Exp: {
    xp: { type: Number, default: 1 },
    level: { type: Number, default: 1 },
    nextLevel: { type: Number, default: 100 },
    id: { type: String, default: "null" },
    user: { type: String, default: "null" },
  },
  
  
  work: {
    trabalho:{type: String, default:"null"},
    exp: { type: Number, default: 1 },
    level: { type: Number, default: 1 },
    nextLevel: { type: Number, default: 250 },
    coins: { type: Number, default: 200 },
    name: { type: String, default: "null" },
  },
  cooldowns: { 
    daily: { type: String, default: 0 },
    cc: { type: String, default: 0 },
    work: { type: String, default: 0 },
    crime: { type: String, default: 0 },
    marrytime: { type: String, default: 0 },
    reptime: { type: String, default: 0},
  },
  shop: {
    itens: {
      pickaxe: {
        type: Object,
        default: { id: 1, size: 0, price: 3000, name: "Picareta", emoji: "❤️" },
      },
      axe: {
        type: Object,
        default: { id: 2, size: 0, price: 5000, name: "Machado", emoji: "❤️" },
      },
      hoe: {
        type: Object,
        default: { id: 3, size: 0, price: 6000, name: "Enxada", emoji: "❤️" },
      },
      sword: {
        type: Object,
        default: { id: 4, size: 0, price: 7000, name: "Espada", emoji: "❤️" },
      },
      shovel: {
        type: Object,
        default: { id: 5, size: 0, price: 8000, name: "Pá", emoji: "❤️" },
      },
    },
  },
  factory: {
    name: { type: String, default: "null" },
    exp: { type: Number, default: 0 },
    level: { type: Number, default: 1 },
    nextLevel: { type: Number, default: 500 },
    owner: { type: String, default: "null" },
    employers: { type: Array, default: [] },
    hasFactory: { type: Boolean, default: false },
    createFactory: { type: Boolean, default: false },
    lastWork: { type: Number, default: 0 },
  },
  aboutme: { type: String, default: "Digite /sobremim para trocar" },
  reputation:{ type: Number, default: 0 },

  marry: {
    married: { type: Boolean, default: false },
    with: { type: String, default: "null"},
  },
  backgrounds: {
    has: { type: String, default: "null" },
  },
  layout: {
    has: { type: Array, default: [] },
    active: { type: Number, default: 0},
  },
  warn:{
    quatidade:{ type: Number, default: 0}
  }
});

const User = mongoose.model("Users", userSchema);
module.exports = User;