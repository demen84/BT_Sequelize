import express from 'express';
import rootRouter from './src/routers/root.router.js';

const app = express();

app.use(express.json());

app.get('/check', (req, res) => {
    const data = req.body;
    console.log(data);

    res.json({
        title: "Bài tập Back End",
        message: "Kiểm tra server thành công",
        data: data
    });
});

const PORT = 3168;
const domain = `http://localhost:${PORT}`;

// Step 3:
app.use('/api', rootRouter);

app.listen(PORT, () => console.log(`Server online at ${domain}`));