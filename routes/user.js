const { express, router, utils, config, downMP4 } = require("./../import");

let ids = "";

router.all("*", function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type,Content-Length, Authorization, Accept,X-Requested-With"
  );
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  req.method == "OPTIONS" ? res.send(200) : next();
});

/**
 * 获取主播的主页数据
 * userid: 主播快手ID
 * http://127.0.0.1:3000/api/v1.0/json/index/Lovexx99
 */
router.get("/index/:userid", (req, res, next) => {
  let UserId = req.params.userid || Modular.config.defaultPage;
  utils.http(
    {
      methods: "GET",
      // 拼接主播主页
      url: utils.SplicingURL("home", UserId)
    },
    result => {
      // 用过正则获取html页面中的json数据
      let user = JSON.parse(
        result.match(/VUE_MODEL_INIT_STATE.profileGallery=([\s\S]*?);/)[1]
      );
      // 全局存储主播id，作为文件夹名称
      ids = user.profile.principalId;

      // 输出json数据给前端开发者
      utils.FeachData(user, par => res.json(par));
      // 拿到json数据中主播发布过的主页视频列表数据
      var lists = user.profile.list;
      // 遍历主播主页的数组

      // 根据主播id创建文件夹
      var paths = utils.mkDir(ids);

      for (const key in lists) {
        // 如果主播正在进行直播，那么排除 lists 数组中第一条正在直播的object数据，
        // 然后下载 所有主播发布的mp4视频

        console.log(`\n\n主播：${ids}，主页视频总数：${lists.length} \n`);

        if (!lists[key].hasOwnProperty("user")) {
          utils.downMP4(paths, lists[key]); //
        } else {
          console.log(`主播正在进行直播，排除直播数据不下载...`);
        }
      }
    }
  );
});

/**
 * 获取主播主页的下一页数据
 * kwaiId： 用户ID
 * pcursor：下一个页码
 * http://127.0.0.1:3000/api/v1.0/json/videolist/kwaiId/pcursor
 */
router.get("/videolist/:kwaiId/:pcursor", (req, res, next) => {
  let pcursor = req.params.pcursor || config.defaultPage;
  let kwaiId = req.params.kwaiId || config.defaultPcursor;
  utils.http(
    {
      methods: "POST",
      url: config.kuaishou.videolist,
      body: {
        count: 24,
        pcursor: pcursor,
        principalId: kwaiId
      }
    },
    result => {
      utils.FeachData(result, par => res.json(result));

      var lists = result.list;
      for (const key in lists) {
        if (!lists[key].hasOwnProperty("user")) {
          utils.downMP4(utils.LocalPath(ids), lists[key]);
        }
      }
    }
  );
});

/**
 * 解析视频的真实mp4播放地址
 * http://127.0.0.1:3000/api/v1.0/json/down?href=https://www.kuaishou.com/photo/***?f=pc_live
 */
router.get("/down", (req, res, next) => {
  let play = req.query.href;
  utils.http(
    {
      methods: "GET",
      url: play
    },
    result => {
      let urls = JSON.parse(
        result.match(/window.__data__ = ([\s\S]*?);<\/script>/)[1]
      );
      res.json({
        satus: "Parse The Success",
        video: urls.mp4Url
      });
    }
  );
});

module.exports = router;
