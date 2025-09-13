const axios = require('axios');

async function sendLineMessage(text, lineConfig) {
    // 考えられるキー名のパターンをすべてチェックする (修正済み)
    const accessToken = lineConfig.line_channel_access_token || lineConfig.LINE_ACCESS_TOKEN;
    const groupId = lineConfig.line_group_id || lineConfig.lineGroupId || lineConfig.LINE_GROUP_ID;

    if (!accessToken || !groupId) {
        console.error('[LINE Handler] LINEのアクセストークンまたはグループIDが設定されていません。');
        console.error(`[DEBUG] Found Token: ${accessToken}, Found GroupID: ${groupId}`);
        return;
    }

    const url = 'https://api.line.me/v2/bot/message/push';
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`, // 修正済み
    };
    const body = {
        to: groupId, // 修正済み
        messages: [
            {
                type: 'text',
                text: text,
            },
        ],
    };

    try {
        await axios.post(url, body, { headers });
        console.log('[LINE Handler] LINEへのメッセージ送信に成功しました。');
    } catch (error) {
        console.error('[LINE Handler] LINEへのメッセージ送信に失敗しました:', error.response ? error.response.data : error.message);
    }
}

module.exports = { sendLineMessage };
