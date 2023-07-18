const fs = require("fs");
const path = require("path");

function getAllImagePaths(directoryPath, imagePaths = []) {
  const files = fs.readdirSync(directoryPath);
  files.forEach((file) => {
    const filePath = path.join(directoryPath, file);
    const fileStat = fs.statSync(filePath);
    if (fileStat.isDirectory()) {
      // 如果是文件夹，则递归调用 getAllImagePaths
      getAllImagePaths(filePath, imagePaths);
    } else {
      // 如果是图片文件，则将其路径添加到 imagePaths 数组中
      const extname = path.extname(filePath).toLowerCase();
      if (extname === ".jpg" || extname === ".jpeg" || extname === ".png") {
        imagePaths.push(filePath);
      }
    }
  });
  return imagePaths;
}

/**
 * 将扁平化数据转化为多维对象
 * @param  data
 * @returns
 */
function formatDataToObject(data) {
  const object = {};
  data.forEach((item) => {
    const [year, month, filename] = item.split("/");

    if (!object[year]) {
      object[year] = {};
    }

    if (!object[year][month]) {
      object[year][month] = [];
    }

    object[year][month].push(filename);
  });
  return object;
}

module.exports = {
  getAllImagePaths,
  formatDataToObject,
};
