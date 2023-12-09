# 使用 Node.js 的官方鏡像作為基本映像
FROM node:21-alpine3.17

# 設定工作目錄
WORKDIR /StockNotify/backend

# 將 package.json 和 package-lock.json 複製到容器中
COPY package*.json ./

# 安裝應用的相依套件
RUN yarn install

# 複製應用程式的源代碼到容器中
COPY . .

# 公開應用程式運行的端口
EXPOSE 5000

# 定義應用程式的啟動命令
CMD ["yarn", "start"]
