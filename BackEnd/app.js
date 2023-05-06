const express = require("express");
const cors = require("cors");

const accountRouter = require("./app/routes/account.route");
const diaryRouter = require("./app/routes/diary.route");

const ApiError = require("./app/api-error");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/Account", accountRouter);
app.use("/api/Diary", diaryRouter);

app.get("/", (req,res) => {
    res.json({ message: "Welcome to Diary application."});
});

app.use((req, res, next) => {
    return next(new ApiError(404, "Resource not found"));
});

app.use((err, req, res, next) => {
    return res.status(err.statusCode || 500).json({message: err.message || "Internal Server Error"});
});



module.exports = app;