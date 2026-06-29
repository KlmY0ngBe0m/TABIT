# TABIT

[韓国語 README](./README.ko.md)

## プロジェクト紹介

TABITは、ユーザーの予算、旅行日数、同行者、旅行スタイル、興味に合わせて、日本旅行の目的地と簡単な旅行プランを提案するAI旅行推薦Webサービスです。

最初はHTML/CSS/JavaScriptでプロトタイプを作成し、その後Next.jsとTypeScriptを使ったWebアプリケーションへ移行しました。現在はNext.jsのAPI RouteからOpenAI APIを呼び出し、ユーザー入力に基づいた旅行推薦を生成します。

## 対象ユーザー

日本旅行を計画している旅行者を想定しています。

特に、旅行先を自分で調べる時間を減らし、予算や興味に合った候補をすばやく確認したいユーザーを対象にしています。

## 主な機能

- 予算、旅行日数、同行者、旅行スタイル、興味の入力
- 予算と興味項目の入力チェック
- 韓国語 / 日本語 UI 切り替え
- OpenAI APIによる旅行推薦生成
- APIリクエスト中のローディング表示
- API失敗時のfallback推薦
- 推薦旅行地、推薦理由、想定予算、簡単な日程の表示

## 使用技術

- Next.js
- React
- TypeScript
- OpenAI API
- HTML / CSS
- Git / GitHub

## 開発方向

このプロジェクトでは、単にAI APIを呼び出すだけではなく、ユーザー入力、フロントエンドの状態管理、サーバー側API処理、fallback処理、多言語UIを一つのサービスとして実装することを目指しました。

旅行業界、観光DX、Web開発、システムエンジニア職への応募を想定したポートフォリオプロジェクトです。

## 現在のプロトタイプ

最初のバージョンは `practice` フォルダでHTML、CSS、JavaScriptのみを使って作成しました。

その後、保守性と拡張性を高めるため、Next.jsとTypeScriptへ移行しました。現在のメイン実装は `frontend` フォルダにあります。

## 実装済み機能

- HTML/CSS/JavaScriptによる初期プロトタイプ
- Next.js / TypeScriptへの移行
- 旅行条件入力フォーム
- Reactのstateによる入力値管理
- コンポーネント分割
  - TravelForm
  - InterestSelector
  - RecommendationCard
- 韓国語 / 日本語の表示切り替え
- Next.js API Routeの作成
- OpenAI APIとの連携
- APIキーの環境変数管理
- API失敗時のfallback推薦
- ローディング表示
- エラーハンドリング

## 現在の処理フロー

```text
ユーザー入力
-> React state管理
-> Next.js API Route
-> OpenAI APIリクエスト
-> AIによる旅行推薦生成
-> 結果カード表示
```

OpenAI APIキーが設定されていない場合、またはAPIリクエストに失敗した場合は、選択された興味に基づいてfallback推薦を返します。

## 環境変数

`frontend/.env.local` を作成し、OpenAI APIキーを設定します。

```env
OPENAI_API_KEY=your_api_key_here
```

`.env.local` はGitHubにコミットしないでください。

## 実行方法

```bash
cd frontend
npm install
npm run dev
```

ブラウザで以下にアクセスします。

```text
http://localhost:3000
```

## テスト項目

- 予算が未入力の場合、エラーメッセージが表示されること
- 最低予算未満の場合、エラーメッセージが表示されること
- 興味が未選択の場合、エラーメッセージが表示されること
- 推薦生成中にローディング表示が出ること
- OpenAI APIが成功した場合、AI推薦結果が表示されること
- OpenAI APIが失敗した場合、fallback推薦が表示されること
- 韓国語 / 日本語のUI切り替えができること

## 現在の状態

OpenAI APIを利用したAI旅行推薦機能まで実装済みです。

現在はローカル環境で動作確認を行っており、次の段階ではREADMEの整備、UI改善、デプロイを進める予定です。

## 今後の予定

- サービスのデプロイ
- UIデザインの改善
- AIレスポンス形式の検証強化
- 推薦履歴の保存機能
- 旅行日程のPDF出力
- プロジェクト説明用ドキュメントの作成