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
var myBoard = new window.Board({
    "el": ".box",
    "color": "#000",
    "size": 10,
    "zIndex": 1
});
```

## 初始化控件的配置项说明

```bash
    el: 画板容器元素,支持id选择符,类选择符和元素选择符 | String
    color: 默认画笔颜色 | String
    size: 默认画笔粗细 | Number
    zIndex: 创建该画布在容器中的层级(若有多层画布,每个画布的zIndex应该不同) | Number
```

## API

以创建好的myBoard实例为例:

##### 返回画板层级数

```bash
    let num = myBoard.getZindex();
    console.log(num);
```

##### 返回画板容器信息

```bash
    let arr = myBoard.getBoardInfo();
    console.log(arr);
    /*
        返回值是一个带有每一层画布信息的数组
        [
            {
                "boardItem": board1, // 画布实例
                "zIndex": 1 // 画布在该画板容器中的层级
            },
            {
                "boardItem": board2,
                "zIndex": 2
            }
        ]
    */
```