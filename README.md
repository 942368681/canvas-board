# canvas-board
基于drawingboard.js封装的画板插件，支持多层级画板叠加和多媒体设备数据接入展示以及多媒体控件的拖拽。

## 下载

使用npm:

```bash
$ npm install -S canvas-board
```

## 引入

```bash
// 依赖jQuery,建议以cdn的方式在页面引入

// index.html

<script src="https://cdn.bootcss.com/jquery/3.3.1/jquery.js"></script>

// index.js

import 'canvas-board';
```

## 使用

基本使用:

```bash
var myboard = window.Board({
    "el": ".box",
    "zIndexInfo": [
        {
            "color": "#000",
            "size": 10,
            "zIndex": 1
        },
        {
            "color": "#000",
            "size": 10,
            "zIndex": 2
        }
    ],
    "mediaTypes": ['img', 'video', 'audio']
});
```

## 初始化控件的配置项说明

```bash
    el: 画板容器元素,支持id选择符,类选择符和元素选择符 | String
    zIndexInfo: 画板初始化层级以及每层画布的初始参数(详情见zIndexInfo说明)，支持多级画布 | Array
    mediaTypes: 初始化多媒体按钮组按钮类型 | Array
```

## zIndexInfo说明

```bash
    {
        "color": "#000", // 该层画布画笔默认颜色 | String
        "size": 10, // 该层画布画笔默认粗细 | Number
        "zIndex": 1 // 该层画布在画板容器中的层级 | Number
    }
```

## API

以创建好的myBoard实例为例:

##### 返回画板层级信息

```bash
    let obj = myBoard.getZindex();
    console.log(obj);
    /*
        返回值是一个含有层级信息的对象
        {
            board: 0,   // 画布层数
            img: 2,     // 图片控件层数
            video: 0,   // 视频控件层数
            audio: 0,   // 音频控件层数
            total: 2    // 画板容器内总层数
        }
    */
```

##### 返回画板容器信息

```bash
    let arr = myBoard.getBoardInfo();
    console.log(arr);
    /*
        返回值是一个带有每一层画布信息的数组
        [
            {
                "type": "board", // 该层级的类型，与mediaTypes中的类型一一对应
                "boardItem": board1, // 画布实例
                "zIndex": 1 // 画布在该画板容器中的层级
            },
            {
                "type": "board",
                "boardItem": board2,
                "zIndex": 2
            }
        ]
    */
```