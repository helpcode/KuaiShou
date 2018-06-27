const request = require("request");
const rp = require("request-promise");
const fs = require("fs");
const config = require("./../config.json");
let num = 0,
  total = 0;
/**
 * 发送request网络请求下载MP4视频，
 * 在这之前因为主播主页可能会存在项目内容，所以需要排除相册 pic38: 不下载
 * 只下载MP4的视频
 * @param {*string} name 主播id作为文件夹名称
 * @param {*object} url 主播发布的视频 photoId字段作为视频名称
 */
const downMP4 = (name, url) => {
  var isVideoUrl = url.playUrl;
  if (isVideoUrl.indexOf("pic38:") >= 0) {
    num++;
  } else {
    total++;
    request(isVideoUrl).pipe(
      fs.createWriteStream(`${name}/${url.photoId}.mp4`)
    );
  }

  console.log(`检测到图片相册，共：${num}个，跳过下载...`);
  console.log(`检测到MP4视频，共：${total}个，下载成功...\n`);
};

/**
 * 创建文件夹
 * @param {*string} name 文件名称
 */
const mkDir = name => {
  var paths = LocalPath(name);
  fs.mkdir(
    paths,
    0777,
    err =>
      err
        ? err.code == "EEXIST"
          ? console.log("文件夹存在")
          : err
        : console.log("文件夹创建成功")
  );
  return paths;
};

/**
 * 发送http请求获取数据
 * @param {*object} par 参数
 * @param {*} cb 回调函数
 */
const http = (par, cb) => {
  // 构造HTTP请求基本配置信息
  var options = {
    method: par.methods || "GET",
    uri: par.url,
    body: par.body || {},
    json: true
  };

  // 发送请求
  rp(options)
    .then(repos => {
      cb(repos);
      return repos;
    })
    .catch(err => {
      console.log("----网络请求错误----");
      console.log(err);
      console.log("----网络请求错误----");
    });
};

/**
 * 拼接完整的URL地址
 * @param {*string} type 地址类型
 * @param {*string} url 主播的id
 */
const SplicingURL = (type, url) => {
  switch (type) {
    case "home":
      return `${config.kuaishou.homepage}${url}`;
      break;
    default:
      console.log("不存在该分类...");
      break;
  }
};

/**
 * 遍历数据，想原数据拼接写入 href 地址
 * @param {*object} data 原数据
 * @param {*function} callback 回调
 */
const FeachData = (data, callback) => {
  let params = data.list;
  for (const key in params) {
    params[key].href = `${config.kuaishou.playvideo}${params[key].eid}/${
      params[key].photoId
    }?f=pc_live`;
  }
  callback(data);
};

const LocalPath = filename => {
  return `mp4/${filename}`;
};

module.exports = {
  http,
  SplicingURL,
  FeachData,
  downMP4,
  LocalPath,
  mkDir
};
