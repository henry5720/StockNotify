import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { resolve, dirname } from "path";
import express, { json } from "express";
import { serve, setup } from "swagger-ui-express";
import dotenv from "dotenv";
import { stockInfo } from "./routes/index.js";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const JsonPath = resolve(__dirname, "./swagger.json");
const jsonContent = readFileSync(JsonPath, "utf-8");
const swaggerDocument = JSON.parse(jsonContent);

dotenv.config();
const port = process.env.PORT || 5000;
const app = express();
app.use(json()); // 中間件解析 JSON 請求主體
app.use("/swagger", serve, setup(swaggerDocument)); // 設置 Swagger UI
app.get("/", (req, res) => {
    // res.redirect('/swagger');
    res.send("<h1>Welcome!</h1>");
});
app.use("/api", stockInfo);

app.listen(port, () => console.log(`[server] http://localhost:${port}`));
