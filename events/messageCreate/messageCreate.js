const { Events } = require('discord.js');
const { sendLineMessage } = require('../../handlers/lineHandler');

module.exports = {
    name: Events.MessageCreate,
    once: false,
    async execute(message, client) {
        // Bot自身のメッセージは無視
        if (message.author.bot) {
            return;
        }

        // configから監視対象のチャンネルIDを取得 (修正済み)
        const targetChannelId = client.config.discordChannelId;

        // 特定のチャンネルのメッセージか確認
        if (message.channel.id === targetChannelId) {
            const messageToSend = `${message.author.username}: ${message.content}`;
            await sendLineMessage(messageToSend, client.config);
        }
    },
};
