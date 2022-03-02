const { Intents } = require("discord.js");
const { DIRECT_MESSAGES, GUILD_MESSAGES, GUILDS } = Intents.FLAGS;

const botIntents = [DIRECT_MESSAGES, GUILD_MESSAGES, GUILDS];

const commands = {
  ping: "ping",
  getName: "get-name",
  tellJoke: "tell-a-joke",
  sad: "sad",
  lastMsgs: "last-messages",
};

const prefix = "!";

const jokes = [
    "What do you call a fake noodle? An Impasta.",
    "Why did the scarecrow win an award? Because he was outstanding in his field.",
];

const sad = [
    "Why did the cookie go to the doctor? Because he felt crummy.",
    "Why did the tomato blush? Because it saw the salad dressing.",
    "Why did the picture go to jail? Because it was framed.",
];


module.exports = { botIntents, commands, prefix, jokes, sad};
