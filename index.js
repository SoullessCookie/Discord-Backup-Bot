const Discord = require('discord.js');
const client = new Discord.Client();

client.on('message', message => {
  if (message.content === '!backup') {
    // Create an object to store the guild's data
    const guildData = {
      id: message.guild.id,
      name: message.guild.name,
      members: [],
      roles: [],
      channels: []
    };

    // Iterate through the guild's members and add their data to the object
    message.guild.members.cache.forEach(member => {
      guildData.members.push({
        id: member.id,
        username: member.user.username,
        discriminator: member.user.discriminator,
        avatar: member.user.avatar,
        roles: member.roles.cache.map(role => role.id)
      });
    });

    // Iterate through the guild's roles and add their data to the object
    message.guild.roles.cache.forEach(role => {
      guildData.roles.push({
        id: role.id,
        name: role.name,
        color: role.color,
        permissions: role.permissions,
        position: role.position
      });
    });

    // Iterate through the guild's channels and add their data to the object
    message.guild.channels.cache.forEach(channel => {
      guildData.channels.push({
        id: channel.id,
        type: channel.type,
        name: channel.name,
        position: channel.position
      });
    });

    // Save the guild data to the database
    saveGuildBackup(guildData);
    message.channel.send('Guild backup created successfully!');
  }
});

client.login('YOUR_BOT_TOKEN');
