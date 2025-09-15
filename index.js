require('dotenv').config(); // ローカルの.envファイルを読み込む
const fs = require('node:fs');
const path = require('node:path');

const { Client, Collection, GatewayIntentBits, Partials } = require('discord.js');
const { Guilds, GuildMessages, MessageContent } = GatewayIntentBits;
const { User, Message, GuildMember, ThreadMember, Channel } = Partials;

const { loadEvents } = require('./handlers/eventHandler');
const { loadCommands } = require('./handlers/commandHandler');
const { loadErrors } = require('./handlers/errorHandler');

const client = new Client({ 
    intents: [Guilds, GuildMessages, MessageContent],
    partials: [User, Message, GuildMember, ThreadMember]
});

// 【最終版】環境変数から直接すべての設定を構築する
client.config = {
    token: process.env.DISCORD_TOKEN,
    LINE_ACCESS_TOKEN: process.env.LINE_ACCESS_TOKEN,
    discordChannelId: process.env.discordChannelId,
    line_user_id: process.env.line_user_id,
    line_group_id: process.env.line_group_id,
    DISCORD_CLIENT_ID: process.env.DISCORD_CLIENT_ID,
    guildId: process.env.guildId,
    errReportChId: process.env.errReportChId,
    MONGO_URI: process.env.MONGO_URI
};

client.commands = new Collection();

(async () => {
    try {
        client.login(client.config.token).then(() => {
            console.log("client login");
            loadEvents(client);
            loadCommands(client);
            loadErrors(client);
            console.log("loaded everything");
        });
    } catch (err) {
        console.log(`! login failed: ${err}`);
    }
})();
console.log("index.js finished");