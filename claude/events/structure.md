# イベント構造

## 現在のイベント

### ready
- ボットが起動した際の処理

### interactionCreate
- スラッシュコマンド等のインタラクションを処理

### messageCreate
- メッセージが作成された際の処理

### guildMemberAdd
- サーバーにメンバーが参加した際の処理

### guildMemberUpdate
- メンバー情報が更新された際の処理

## イベントファイル構造

```javascript
module.exports = {
    name: 'イベント名',
    async execute(parameters) {
        // イベントの実行内容
    }
};
```

## 注意点

- イベントハンドラーは`eventHandler.js`で管理
- サブディレクトリから再帰的に読み込まれる
- Discord.js v14の形式に対応