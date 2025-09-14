const axios = require('axios');

/**
 * LINEにプッシュメッセージを送信します。
 * @param {Array<object>} messages 送信するメッセージオブジェクトの配列
 * @param {object} lineConfig LINEの設定情報
 */
async function sendLinePush(messages, lineConfig) {
    // 考えられるキー名のパターンをすべてチェックする
    const accessToken = lineConfig.line_channel_access_token || lineConfig.LINE_ACCESS_TOKEN;
    
    // 【変更点】宛先を決定するロジック
    // ユーザーIDを優先し、なければグループIDを宛先にする
    const userId = lineConfig.line_user_id || lineConfig.lineUserId || lineConfig.LINE_USER_ID;
    const groupId = lineConfig.line_group_id || lineConfig.lineGroupId || lineConfig.LINE_GROUP_ID;
    const destination = userId || groupId;

    if (!accessToken || !destination) {
        console.error('[LINE Handler] LINEのアクセストークンまたは宛先ID（ユーザー/グループ）が設定されていません。');
        return;
    }
    
    if (!messages || messages.length === 0) {
        console.error('[LINE Handler] 送信するメッセージがありません。');
        return;
    }

    const url = 'https://api.line.me/v2/bot/message/push';
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
    };
    const body = {
        to: destination, // 宛先を動的に設定
        messages: messages,
    };

    try {
        await axios.post(url, body, { headers });
        console.log(`[LINE Handler] LINEへのメッセージ送信に成功しました。(${messages.length}件)`);
    } catch (error) {
        console.error('[LINE Handler] LINEへのメッセージ送信に失敗しました:', error.response ? error.response.data : error.message);
    }
}

module.exports = { sendLinePush };
