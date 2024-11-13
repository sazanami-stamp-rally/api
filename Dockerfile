# ベースイメージとして軽量なNode 18を使用
FROM node:22-alpine

# 作業ディレクトリを設定
WORKDIR /app

# package.jsonとpackage-lock.jsonをコピー
COPY package*.json ./

# 依存関係をインストール
RUN npm install --only=production

# ソースコードをコピー
COPY . .

ARG DATABASE_URL

ENV DATABASE_URL=$DATABASE_URL

# # マイグレーションを実行
# RUN npx prisma migrate deploy
#
# # seed
# RUN npm run seed

# アプリケーションを起動する
CMD ["npm", "run", "start"]

# DockerコンテナでExposeするポート
EXPOSE 3000

