## 注意！！注意！！注意！！注意！！

这个项目的代码已经失效，因为快手的接口采用GraphQL重写了！！

如果确实需要快手接口的数据，可以从快手pc端爬数据，本人这里已经整理出很多自己用的接口了！！

**下面这些接口需要你自己实现后端去调用，然后把数据返回给自己的前端即可。如果你只想用现成的，可以使用我写好的接口**

**项目目前还没部署，有需要的可以找我要！！**

## 最新快手接口文档

快手接口整理

接口地址：https://live.kuaishou.com/m_graphql

注意：

  - 1：下面接口调用时，请先在PC端登录快手然后复制请求头中的cookies，然后使用后端伪造请求头来调用快手接口，后端拿到数据后
     将数据返回给我们自己的前端。
  - 2：项目中只有这一个接口地址，通过调用接口中不同方法来获取不同数据
  - 3：后端需要使用专门的 graphql 插件去发送请求


**1：用户主页喜欢视频列表接口**

请求：POST

调用方法：likedFeedsQuery()

方法参数：
  - 1：principalId 用户快手id（用户自定义的用户名）
  - 2：pcursor     当前的页码（类似分页的page参数），如果留空，默认第一页
  - 3：count       一页展示多少条数据（类似分页的limit参数），默认24

调用实例：
```js
query {
    likedFeeds(principalId: "geekhelp", pcursor: "1.582321864999E12", count: 24) {
        pcursor
        list {
            id,thumbnailUrl,poster,workType,type,useVideoPlayer,imgUrls,imgSizes,magicFace,
            musicName,caption,location,liked,onlyFollowerCanComment,relativeHeight,timestamp,width,height,
            counts {
                displayView,displayLike,displayComment
            },
            user {
                id,eid,name,avatar,
            },
            expTag
        }
    }
}
```

**2：获取视频的评论**

请求：POST

调用方法：commentListQuery()

方法参数：
  - 1：count 评论数
  - 2：page  无用参数，但是必填默认1即可
  - 3：pcursor 分页的页面，每次请求都会返回下次页码
  - 4：photoId 要获取视频评论的id
  
```js
query {
   shortVideoCommentList(photoId: '', page: 1,  pcursor: '', count: 20t) {
     commentCount,realCommentCount,pcursor,
     commentList {
       commentId,authorId,authorName,content,headurl,timestamp,authorEid,status,
       subCommentCount,subCommentsPcursor,likedCount,liked,
       subComments {
           commentId,authorId,authorName,content,headurl,timestamp,authorEid
           status,replyToUserName,replyTo,replyToEid
       }
     }
   }
}
```

**3：获取热门推荐视频**

请求：POST

调用方法：videoRecommendFeeds()

方法参数：
  - 1：count   展示多少条
  - 2：photoId 视频的id参数

调用实例：

```js
query {
  videoRecommendFeeds(photoId: $photoId, count: $count) {
    list {
      user {
        id,avatar,name
      },
      id,thumbnailUrl,poster,workType,type,useVideoPlayer,imgUrls,
      imgSizes,magicFace,musicName,caption,location,liked,onlyFollowerCanComment,
      relativeHeight,timestamp,width,height,
      counts {
        displayView,displayLike,displayComment
      },
      expTag
    }
  }
}
```

**4：获取视频的真实MP4播放地址**

请求：POST

调用方法：feedById()

方法参数：
  - 1：principalId 主播的快手id，从 likedFeeds 方法 list.user.id 获得
  - 2：photoId     视频的id参数，从 likedFeeds 方法 list.id 中获得

调用实例：
```js
query {
  feedById(principalId: "xxx", photoId: "xxxx") {
          currentWork {
              playUrl,poster
          }
      }
}
```

**5：获取主播首页的视频**

请求：POST

调用方法：publicFeeds()

方法参数：

  - 1：principalId 主播的快手id
  - 2：pcursor     分页页码
  - 3：count       一页展示多少数据

调用实例：

```js
query {
   publicFeeds(principalId: "xxxx", pcursor: "xxxx", count: 24) {
       pcursor,
        list {
            id,thumbnailUrl,poster,workType,type,useVideoPlayer,imgUrls,imgSizes,magicFace,musicName,
            caption,location,liked,onlyFollowerCanComment,relativeHeight,timestamp,width,height,
            counts {
                displayView,displayLike,displayComment
            },
            user {
                id,eid,name,avatar,cityName
            },
            expTag
        }
   }
}
```


**6：获取视频回复的展开更多**

请求：POST

调用方法：subCommentList()

方法参数：

  - 1：photoId       视频id
  - 2：rootCommentId 回复的顶级评论
  - 3：pcursor       下标
  - 4：count         数量

调用实例：

```js
 query {
  subCommentList(photoId: $photoId, rootCommentId: $rootCommentId, pcursor: $pcursor, count: $count) {
    pcursor
    subCommentsList {
      commentId,authorId,authorName,content
      headurl,timestamp,authorEid,status,replyToUserName,replyTo,
      replyToEid
    }
  }
}
```

**7：对视频进行 喜欢收藏**

请求：POST

调用方法：likeVideo()

方法参数：

  - 1：photoId       视频id
  - 2：principalId   快手用户id
  - 3：cancel        0 喜欢，1 取消喜欢
  
```js  
query {
  likeVideo(photoId: $photoId, principalId: $principalId, cancel: $cancel) {
    result
  }
}
```

**7：获取自己关注的主播，有哪些正在进行直播**

请求：GET

https://live.kuaishou.com/rest/wd/live/liveStream/myfollow



----



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
