module.exports = {
    name: 'debug',
    aliases: [],
    category: 'Owner',
    utilisation: '{prefix}debug',

    execute(client, message) {
      
      if(message.author.id === "612589827262644234") return message.channel.send(`${client.emotes.success} - ${client.user.username} connected in **${client.voice.connections.size}** channels from **${client.guilds.cache.size}** servers`);
      
      message.channel.send(client.language.No_Owner)
    
    },
};
