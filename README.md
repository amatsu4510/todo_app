# todoリストサンプルプログラム
## 開発環境

このプロジェクトで使用する主な開発環境と技術スタックは以下の通りです。

| 項目 | 技術 / バージョン | 説明 |
| :--- | :--- | :--- |
| **開発環境OS** | **WSL (Windows Subsystem for Linux)** | Windows OS上でLinux環境を統合し、ネイティブに近いパフォーマンスで開発を行います。 |
| **コンテナ** | **Docker** | 開発環境の構築と移植性を高めるために使用します。Docker Composeを用いて、プロジェクト全体をコンテナ化します。 |
| **ランタイム** | **Node.js** (推奨バージョン) | Next.jsの実行環境です。 |
| **フレームワーク** | **Next.js** | Reactベースのフルスタックフレームワークで、サーバーサイドレンダリング (SSR) や静的サイトジェネレーション (SSG) などの機能を提供します。 |
| **言語** | **TypeScript** | JavaScriptのスーパーセットであり、静的型付けによる堅牢なコード開発を可能にします。 |
| **CSSフレームワーク** | **Tailwind CSS** | ユーティリティファーストのCSSフレームワークで、カスタムのCSSを書くことなく、迅速にモダンなUIを構築できます。 |

<br>

**ローカル開発のセットアップ**

1.  **WSL 2** および **Docker Desktop** (WSL 2 バックエンドを有効化) がインストールされていることを確認してください。
2.  プロジェクトルート（WSL側のLinuxファイルシステム内）でDocker Composeを起動し、開発サーバーをコンテナ内で立ち上げます。
    ```bash
    cd todo_app/src
    sudo npm install
    sudo docker up --build
    ```
3.  ブラウザで指定されたURL（通常は `http://localhost:3000`）にアクセスします。

***

## 参考サイト
* **[Microsoft](https://learn.microsoft.com/ja-jp/windows/wsl/install)**: WSL を使用して Windows に Linux をインストールする方法
* **[Qiita](https://qiita.com/Jazuma/items/9274d90167a3b61791fa)**: WSL2のUbuntuにDockerをインストールする
* **[Qiita](https://qiita.com/Keichan_15/items/4fc605895fef2a33b629)**: Next.js(TypeScript) × Docker(Compose V2) 最速構築Tips.
