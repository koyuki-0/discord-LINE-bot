# Discord Bot Architecture Overview

## プロジェクト構造

```
discordbot_template/
├── index.js                 # エントリーポイント
├── config.json             # 設定ファイル
├── package.json            # 依存関係
├── commands/               # コマンドファイル
│   ├── basic commands/     # 基本コマンド
│   └── private commands/   # プライベートコマンド
├── events/                 # イベントハンドラー
│   ├── ready/
│   ├── interactionCreate/
│   ├── messageCreate/
│   ├── guildMemberAdd/
│   └── guildMemberUpdate/
├── handlers/               # ハンドラー
│   ├── commandHandler.js
│   ├── errorHandler.js
│   └── eventHandler.js
├── functions/              # 共通関数
├── DBmodels/              # データベースモデル
└── logs/                  # ログファイル
```

## 依存関係

- discord.js v14.14.1
- ascii-table v0.0.9

## 主要コンポーネント

- **Command Handler**: コマンドの動的読み込み
- **Event Handler**: イベントの動的読み込み
- **Error Handler**: エラーハンドリング