const slotItems = ["🍇", "🍉", "🍌", "🍎", "🍒"];
const db = require("quick.db");
const { MessageEmbed } = require('discord.js');  

module.exports = {
    name: 'slots',
    aliases: [],
    category: 'Economy',
    utilisation: '{prefix}slots <amount>',
    execute(bot, message, args) {

    let user = message.author;
    let moneydb = db.fetch(`money_${message.guild.id}_${user.id}`)
    let money = parseInt(args[0]);
    let win = false;

    let moneymore = new MessageEmbed()
    .setColor("#ff0000")
    .setDescription(`❌ You are betting more than you have`);

    let moneyhelp = new MessageEmbed()
    .setColor("#ff0000")
    .setDescription(`❌ Specify an amount`); 

    if (!money) return message.channel.send(moneyhelp);
    if (money > moneydb) return message.channel.send(moneymore);

    let number = []
    for (let i = 0; i < 3; i++) { number[i] = Math.floor(Math.random() * slotItems.length); }

    if (number[0] == number[1] && number[1] == number[2])  { 
        money *= 3
        win = true;
    } else if (number[0] == number[1] || number[0] == number[2] || number[1] == number[2]) { 
        money *= 2
        win = true;
    }
    if (win) {
        let slotsEmbed1 = new MessageEmbed()
            .setDescription(`${slotItems[number[0]]} | ${slotItems[number[1]]} | ${slotItems[number[2]]}\n\nYou won ${money} coins`)
            .setColor("#ff0000")
        message.channel.send(slotsEmbed1)
        db.add(`money_${message.guild.id}_${user.id}`, money)
    } else {
        let slotsEmbed = new MessageEmbed()
            .setDescription(`${slotItems[number[0]]} | ${slotItems[number[1]]} | ${slotItems[number[2]]}\n\nYou lost ${money} coins`)
            .setColor("#ff0000")
        message.channel.send(slotsEmbed)
        db.subtract(`money_${message.guild.id}_${user.id}`, money)
    }

}
}