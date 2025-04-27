require("dotenv").config();
const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();

app.use(cors());

app.get("/api-tianditu/v2/search", async (req, res) => {
    try {
        const { keyWord, level, mapBound, queryType, start, count, type, tk } = req.query;
        const postStr = JSON.stringify({
            keyWord,
            level: Number(level),
            mapBound,
            queryType: Number(queryType),
            start: Number(start),
            count: Number(count),
        });
        const url = `${process.env.TIANDITU_API}/v2/search?postStr=${postStr}&type=${type}&tk=${tk}`;
        const response = await axios.get(url, {
            headers: {
                Referer: "https://your-domain.com",
                "User-Agent":
                    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/119.0.0.0 Safari/537.36",
            },
        });
        res.json(response.data);
    } catch (error) {
        console.error("请求天地图出错:", error.response?.status, error.response?.data || error.message);
        res.status(500).json({ error: "服务器错误" });
    }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`🚀 中转服务器运行在 http://localhost:${port}`);
});
