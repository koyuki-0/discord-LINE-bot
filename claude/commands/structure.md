# コマンド構造

## 基本構造

コマンドファイルは以下の基本構造を持つ必要があります：

```javascript
module.exports = {
    data: new SlashCommandBuilder()
        .setName('コマンド名')
        .setDescription('コマンドの説明'),
    async execute(interaction) {
        // コマンドの実行内容
    }
};
```

## 現在のコマンド

### Basic Commands
- `ping.js` - ボットの応答時間を確認

### Private Commands
- `reload.js` - コマンドの再読み込み
- `runningServer.js` - サーバー稼働状況確認

## コマンドの登録

1. `commands/` 内の適切なサブディレクトリに配置
2. `commandHandler.js` が自動的に読み込み
3. `data` と `execute` プロパティが必須

## 注意点

- コマンドファイルは`.js`拡張子が必要
- サブディレクトリから再帰的に読み込まれる
- 既存のコマンドはSlash Command形式で実装