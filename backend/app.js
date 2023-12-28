import express, { json } from "express";
import { createServer } from "node:http";
import { fileURLToPath } from "node:url";
import path, { dirname, join } from "node:path";
import { readFileSync } from "fs";
import { serve, setup } from "swagger-ui-express";
import { Server } from "socket.io";
import { stockInfo } from "./routes/index.js";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const server = createServer(app);
const port = process.env.PORT || 5000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const JsonPath = join(__dirname, "./swagger.json");
const jsonContent = readFileSync(JsonPath, "utf-8");
const swaggerDocument = JSON.parse(jsonContent);

app.use(express.static(path.join(__dirname, "dist"))); // 設置靜態文件目錄
app.use(json()); // 中間件解析 JSON 請求主體
app.use("/swagger", serve, setup(swaggerDocument)); // 設置 Swagger UI
app.use("/api", stockInfo);
app.get("/", () => {
    // res.redirect('/swagger');
    // res.send("<h1>Welcome!</h1>");
});
server.listen(port, () => console.log(`[server] http://localhost:${port}`));

const io = new Server(server);
io.on("connection", (socket) => {
    // console.log({socket});
    console.log("[socket] user connected");
    socket.on("disconnect", () => {
        console.log("user disconnected");
    });
    socket.on("chat message", (msg) => {
        console.log("message: " + msg);
    });
});
