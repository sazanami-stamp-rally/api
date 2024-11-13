# ベースイメージとして軽量なNode 18を使用
FROM node:18-alpine

# 作業ディレクトリを設定
WORKDIR /app

# package.jsonとpackage-lock.jsonをコピー
COPY package*.json ./

# 依存関係をインストール
RUN npm install --only=production

# ソースコードをコピー
COPY . .

RUN npx prisma generate

# アプリケーションを起動する
CMD ["npm", "run", "start"]

# DockerコンテナでExposeするポート
EXPOSE 3000

