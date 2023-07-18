const express = require("express");
const cors = require("cors");
const path = require("path");
const fs = require("fs");

const app = express();

// 使用 cors 中间件处理跨域请求
app.use(cors());

const port = 3001;

const {
  getAllImagePaths,
  formatDataToObject,
} = require("./src/methods/getAllImagePaths.js");

app.use(express.static(path.join(__dirname, "src/public")));

// 定义路由和处理程序
app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/images", (req, res) => {
  const directoryPath = "src/public/images/";
  const imagePaths = getAllImagePaths(directoryPath);
  const data = imagePaths.map((item) => {
    const p = item.replaceAll(path.sep, "/").replace(directoryPath, "");
    return p;
  });
  const object = formatDataToObject(data);
  console.log(object);

  res.json(object);
});

// 启动服务器
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
