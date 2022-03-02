const { Client, MessageEmbed, MessageEmbedAuthor } = require("discord.js");
const { botIntents, prefix, commands, sad, jokes } = require("./config/config");
const config = require("./config/default");

const client = new Client({
  intents: botIntents,
  partials: ["CHANNEL", "MESSAGE"],
});

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on("ready", () => {
  client.user.setPresence({
      activities: [{ 
        name: "Tower",
        type: "COMPETING"
      }],
      // status: "idle"
  })
})

const getLastMsgs = async (msg) => {
  // fetching the last 10 messages
  const res = await msg.channel.messages.fetch({ limit: 10 });

  const lastTenMsgs = res.map((message) => {
    return message.content;
  });

  const embeds = [];

  lastTenMsgs.forEach((msg, index) => {
    const embed = new MessageEmbed()
      .setColor("#3caf50")
      .setTitle(`Message ${index + 1}`)
      .setDescription(`${msg}`)
      .setThumbnail(`https://i.imgur.com/wSTFkRM.png`)
      .setFooter({
        text: "Encourage Bot",
        iconURL: "https://i.imgur.com/wSTFkRM.png",
      })
     

    embeds.push(embed);
  });

  return embeds;
};

client.on("messageCreate", async function (message) {
  // console.log(message.content);
  const messageContent = message.content.toLowerCase().trim();
  if (message.author.bot) return;

  // Regular message
  if (messageContent.startsWith("hello")) {
    message.reply("who's there?");
  }
  // Check if the message starts with the prefix (command)
  if (messageContent.startsWith(prefix)) {
    const commandBody = messageContent.slice(prefix.length);
    const args = commandBody.split(" ");
    const command = args.shift().toLowerCase();

    if (command === commands.ping) {
      const timeTaken = Date.now() - message.createdTimestamp;
      message.reply(`Pong! This message had a latency of ${timeTaken}ms.`);
    } else if (command === commands.getName) {
      message.reply(`Hello ${message.author.username}!`);
    } else if (command === commands.tellJoke) {
      message.reply(jokes[Math.floor(Math.random() * jokes.length)]);
    } else if (command === commands.sad) {
      message.reply(sad[Math.floor(Math.random() * sad.length)]);
    } else if (command === commands.lastMsgs) {
      const reply = await getLastMsgs(message);
      message.author.send({ embeds: reply });
    } else {
      message.reply(`Your command is not found, ask the admin!`);
    }
  }
});

const startBot = () => {
  client.login(config.DISCORD_TOKEN);
};

module.exports = startBot;
