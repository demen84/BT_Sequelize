import express from "express";
import cors from "cors";
import rootRouter from "./src/routers/root.router.js";
import { appError } from "./src/common/app-error/app.error.js";

const app = express();

app.use(express.json()); // Parse JSON

// Config CORS:
app.use(
    cors({
        origin: [
            "http://localhost:3000",
            "http://localhost:3001",
            "http://localhost:3168",
            "https://google.com",
            "https://yahoo.com",
        ],
    })
);

// API test to check connect
app.get("/check", (req, res) => {
    const data = req.body;
    console.log(data);

    res.json({
        title: "Bài tập nộp - Buổi 10 - Sequelize",
        message: "Kiểm tra kết nối thành công",
        data: data,
    });
});

/**
 * Middleware xử lý lỗi toàn cục
 */
app.use(appError);

const PORT = 3168;
const domain = `http://localhost:${PORT}`;

// Step 3:
app.use("/api", rootRouter);

app.listen(PORT, () => console.log(`Server online at ${domain}`));
