const { Events } = require('discord.js');
const { sendLinePush } = require('../../handlers/lineHandler');

module.exports = {
    name: Events.MessageCreate,
    once: false,
    async execute(message, client) {
        // Bot自身や監視対象外のチャンネルは無視
        if (message.author.bot) return;
        const targetChannelId = client.config.discordChannelId;
        if (message.channel.id !== targetChannelId) return;

        const lineMessages = [];
        const authorName = message.author.username;

        // テキストメッセージの処理
        if (message.content) {
            lineMessages.push({
                type: 'text',
                text: `${authorName}: ${message.content}`,
            });
        }

        // 添付ファイルの処理
        if (message.attachments.size > 0) {
            let videoNotificationSent = false; // 動画通知を一度だけ送るためのフラグ

            // テキストがなく、添付ファイルのみの場合、誰が送ったかを示すテキストを追加
            if (!message.content) {
                lineMessages.push({
                    type: 'text',
                    text: `${authorName}さんがファイルを送信しました。`,
                });
            }

            for (const attachment of message.attachments.values()) {
                const contentType = attachment.contentType || '';

                if (contentType.startsWith('image/')) {
                    // 画像はこれまで通り画像メッセージとして送信
                    lineMessages.push({
                        type: 'image',
                        originalContentUrl: attachment.url,
                        previewImageUrl: attachment.url,
                    });
                } else if (contentType.startsWith('video/') && !videoNotificationSent) {
                    // 【変更点】動画の場合は一度だけテキストで通知
                    lineMessages.push({
                        type: 'text',
                        text: '動画が送信されました。',
                    });
                    videoNotificationSent = true; // 通知済みフラグを立てる
                }
            }
        }

        // 送信するメッセージがあればLINEに送信
        if (lineMessages.length > 0) {
            // LINE APIは一度に5件までしかメッセージを送信できないため、5件ずつに分割して送信
            for (let i = 0; i < lineMessages.length; i += 5) {
                const chunk = lineMessages.slice(i, i + 5);
                await sendLinePush(chunk, client.config);
            }
        }
    },
};
