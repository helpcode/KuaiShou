# 接口

---

!> 注意：接口统一运行在 http://xxx.com:3000/api/v1.0/json

## 1: 获取主播的主页数据

---

| 接口地址      | 请求方式 | 参数                   |
| :------------ | :------- | ---------------------- |
| /index/userid | GET      | userid：主播快手 id 号 |

- 实例：[http://127.0.0.1:3000/api/v1.0/json/index/3xy5mxzf9wbsjsi](http://127.0.0.1:3000/api/v1.0/json/index/3xy5mxzf9wbsjsi)

- 数据返回：

```json
{
  "list": [
    {
      "eid": "1XPaCXnlajP7IcljrHEWDVSg",
      "photoId": "1XYbUaSReeL-vGnBbJPxQWvg",
      "caption": "xxxxxx",
      "thumbnailUrl":
        "https://tx2.a.yximgs.com/upic/2018/05/08/16/BMjAxODA1MDgxNjIwNDdfNTgxMDQ0NzgwXzYyMDgyNjU2MTlfMV8z_Bf1c7bff50f37be6b0d906b2cc5a4e81e.jpg",
      "viewCount": "1.2w",
      "likeCount": "602",
      "commentCount": "51",
      "timestamp": 1525767652400,
      "workType": "video",
      "type": "work",
      "href":
        "https://www.kuaishou.com/photo/1XPaCXnlajP7IcljrHEWDVSg/1XYbUaSReeL-vGnBbJPxQWvg?f=pc_live"
    }
  ],
  "pcursor": "1.525141391674E12",
  "userInfo": {
    "eid": "1XPaCXnlajP7IcljrHEWDVSg",
    "kwaiId": "xxx",
    "userId": 581044780,
    "id": "xxx",
    "profile":
      "https://tx2.a.yximgs.com/uhead/AB/2018/03/28/14/BMjAxODAzMjgxNDQ1MDFfNTgxMDQ0NzgwXzJfaGQ0NzRfNzI1_s.jpg",
    "name": "抱xxx走xxx",
    "description":
      "....支持快手🔥\n......................👆  取关的，感谢你曾经的关注❤\n\n👗微❤",
    "sex": "F",
    "cityName": "",
    "following": 0,
    "living": false,
    "isNew": false,
    "countsInfo": {
      "fan": "6.1w",
      "follow": "178",
      "photo": "155"
    }
  },
  "principalId": "xxxxx"
}
```

## 2: 获取对应主播主页视频(数据分页)

---

| 接口地址                  | 请求方式 | 参数                                                                           |
| :------------------------ | :------- | ------------------------------------------------------------------------------ |
| /videolist/userid/pcursor | GET      | userid：主播快手 id 号<br> pcursor: 下一页的页码，[接口 1] 的 pcursor 字段数值 |

- 实例：[http://127.0.0.1:3000/api/v1.0/json/videolist/3xy5mxzf9wbsjsi/1.501168403403E12](http://127.0.0.1:3000/api/v1.0/json/videolist/3xy5mxzf9wbsjsi/1.501168403403E12)

- 数据返回：

```json
{
  "result": 1,
  "list": [
    {
      "eid": "1XPaCXnlajP7IcljrHEWDVSg",
      "photoId": "1XYbUaSReeL-s38rT3SzP7Rw",
      "caption": "蚊xsxs😭😭xxx😹😹.xsxs个xsxs😨😨",
      "thumbnailUrl":
        "https://tx2.a.yximgs.com/upic/2018/04/20/13/BMjAxODA0MjAxMzUxMDNfNTgxMDQ0NzgwXzU5NjAxNDUzNjNfMV8z_B38c81af3e58101bb5880197f1fe8be7f.jpg",
      "viewCount": "1.6w",
      "likeCount": "370",
      "commentCount": "40",
      "timestamp": 1524203473650,
      "workType": "video",
      "type": "work",
      "href":
        "https://www.kuaishou.com/photo/1XPaCXnlajP7IcljrHEWDVSg/1XYbUaSReeL-s38rT3SzP7Rw?f=pc_live"
    }
  ],
  "pcursor": "1.522636912545E12"
}
```

## 3: 解析视频的真实 mp4 播放地址

---

| 接口地址            | 请求方式 | 参数                                                                                                        |
| :------------------ | :------- | ----------------------------------------------------------------------------------------------------------- |
| /down?href=videourl | GET      | href：[接口 1][接口2] 视频列表中字段 "href" <br/> 为视频快手在线播放地址放入这里解析将获得视频真实 mp4 地址 |

- 实例：[http://127.0.0.1:3000/api/v1.0/json/down?href=https://www.kuaishou.com/...-1rxNhtLFw?f=pc_live](http://127.0.0.1:3000/api/v1.0/json/down?href=https://www.kuaishou.com/...-1rxNhtLFw?f=pc_live)

- 数据返回：

```json
{
  "satus": "Parse The Success",
  "video":
    "https://txmov2.a.yximgs.com/upic/2018/04/20/13/BMjAxODA0MjAxMzUxMDNfNTgxMDQ0NzgwXzU5NjAxNDUzNjNfMV8z_b_B2176b04496bb89fd4e3a091668847559.mp4"
}
```
