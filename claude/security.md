# セキュリティガイドライン

## 機密情報の管理

### 環境変数の使用
- **絶対に** `config.json` に機密情報を直接記述しない
- `.env` ファイルで機密情報を管理
- 本番環境では環境変数を設定

### 必要な環境変数
```env
DISCORD_TOKEN=your_discord_bot_token_here
DISCORD_CLIENT_ID=your_discord_client_id_here
MONGO_URI=your_mongodb_connection_string_here
ERROR_REPORT_CHANNEL_ID=your_error_report_channel_id_here
```

### Gitignore設定
以下のファイルは必ずGitから除外：
- `.env`
- `config.json`
- `logs/`

## セットアップ手順

1. `.env.template` を `.env` にコピー
2. `.env` に実際の値を入力
3. `config.json` は削除または空にする

## 注意事項

- **トークンは絶対に公開しない**
- MongoDBの認証情報も同様に厳重管理
- 定期的にトークンを再生成
- ログファイルにも機密情報を出力しない

## 緊急時の対応

もし機密情報が漏洩した場合：
1. 即座にDiscordでトークンを無効化
2. MongoDBのパスワードを変更
3. 新しいトークンで環境変数を更新