require('dotenv').config(); // ローカルの.envファイルを読み込む
const fs = require('node:fs');
const path = require('node:path');
const http = require('http');

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

            // Add this section for the web server to bind to a port for Render.com
            const port = process.env.PORT || 3000; // Render.com will provide PORT
            http.createServer((req, res) => {
                res.writeHead(200, { 'Content-Type': 'text/plain' });
                res.end('Discord bot is running!\n');
            }).listen(port, () => {
                console.log(`Web server listening on port ${port}`);
            });
            // End of web server section

        });
    } catch (err) {
        console.log(`! login failed: ${err}`);
    }
})();
console.log("index.js finished");