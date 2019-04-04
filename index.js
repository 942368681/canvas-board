/**
 * 2019/4/2
 * 基于drawingboard.js封装的画板组件
 * author: sfl
 */
import './lib/drawingboard/index';
import './lib/drawingboard/index.css';

(function (w, d) {

    var Z_INDEX_TOTAL = 0;
    var BOARD_ARR = [];
    var WRAP_DOM = null;

    var Board = function (o) {

        /**
         * 私有方法和变量
         * 完成控件的初始化创建
         * 不对外暴露
         */
        var options = Object.assign({}, o);
        var controls = [
            "Color",
            { Size: { type: "dropdown" } },
            'Navigation',
            { DrawingMode: { filler: false } }
        ];

        var init = function () {
            Z_INDEX_TOTAL = options.zIndexInfo.length;
            WRAP_DOM = getWrapDom();
            WRAP_DOM.style.position = "relative";
            for (var i = 0, l = options.zIndexInfo.length; i < l; i++) {
                createBoard(options.zIndexInfo[i]);
            }
            createToolBar();
        };

        // 创建画布
        var createBoard = function (obj) {
            var item = d.createElement('div');
            item.setAttribute("id", "board-" + obj.zIndex);
            item.style.cssText = "position: absolute; width: 100%; height: 100%; z-index: "+ obj.zIndex +";";
            WRAP_DOM.appendChild(item);
            var board = new window.DrawingBoard.Board(item.id, {
                background: false,
                color: obj.color,
                size: obj.size,
                controls: controls,
                eraserColor: 'background',
                webStorage: 'local',
                enlargeYourContainer: false
            });
            board.addControl('Download');
            BOARD_ARR.push({
                "type": "board",
                "boardItem": board,
                "zIndex": obj.zIndex
            });
        };
        
        // 获取容器dom节点
        var getWrapDom = function () {
            var dom = null;
            switch (options.el[0]) {
                case "#":
                    dom = d.getElementById(options.el.substr(1));
                    break;
                case ".":
                    dom = d.getElementsByClassName(options.el.substr(1))[0];
                    break;
                default:
                    dom = d.getElementsByTagName(options.el)[0];
                    break;
            }
            return dom;
        };

        // 创建工具按钮组并添加点击事件
        var createToolBar = function () {
            var toolBarBox = d.createElement('div');
            toolBarBox.setAttribute("class", "canvas-board-toolbar");
            toolBarBox.style.cssText = "position: absolute; right: 0; bottom: -50px; height: 40px;";
            for (var i = 0, l = options.mediaTypes.length; i < l; i++) {
                var oType = options.mediaTypes[i];
                var oBtn = d.createElement('div');
                oBtn.setAttribute("class", "canvas-board-toolbar "+ oType +"-btn");
                oBtn.setAttribute('data-type', oType);
                oBtn.style.cssText = "width: 40px; height: 40px; float: left; margin-left: 18px; border-radius: 8px; background: #999; cursor: pointer;";
                toolBarBox.appendChild(oBtn);
            }
            toolBarBox.addEventListener('click', function (ev) {
                /**
                 * 在此调用原生控件
                 * 视频，音频，图片...
                 * 确认后，拿到数据data，走下文方法
                 */
                var data = "https://avatars1.githubusercontent.com/u/30041245?s=60&v=4"; // :)
                if (ev.target.dataset.type) createDragDom(ev.target.dataset.type, data);
            });
            WRAP_DOM.appendChild(toolBarBox);
        };

        // 创建多媒体元素并初始化拖拽
        var createDragDom = function (type, data) {
            Z_INDEX_TOTAL += 1;
            var dom = null;
            var info = {
                type: "",
                dom: "",
                zIndex: ""
            };
            var coordinate = getRandomPosition();
            switch (type) {
                case 'img':
                    dom = new Image(data, coordinate).dom;
                    info.type = "img";
                    info.dom = dom;
                    info.zIndex = Z_INDEX_TOTAL;
                    break;
                case 'video':
                
                    break;
                case 'audio':
                
                    break;
                default:
                    break;
            }
            BOARD_ARR.push(info);
            WRAP_DOM.appendChild(dom);
            new Drag(dom);
        }

        // 获取画板随机位置
        var getRandomPosition = function () {
            var clientW = WRAP_DOM.clientWidth;
            var clientH = WRAP_DOM.clientHeight;
            var xRange = [clientW*0.2, clientW - clientW*0.4];
            var yRange = [clientH*0.2, clientH - clientH*0.4];
            return {
                x: Math.round(Math.random()*(xRange[1] - xRange[0]) + xRange[0]),
                y: Math.round(Math.random()*(yRange[1] - yRange[0]) + yRange[0])
            }
        };

        /**
         * 初始化方法执行
         */
        init();
    };

    /**
     * 公有方法
     * 外部调用的API
     */
    Board.prototype = {
        // 获取画板层级信息
        getZindex: function () {
            return {
                board: BOARD_ARR.filter(function (e) {return e.type === "board"}).length,
                img: BOARD_ARR.filter(function (e) {return e.type === "img"}).length,
                video: BOARD_ARR.filter(function (e) {return e.type === "video"}).length,
                audio: BOARD_ARR.filter(function (e) {return e.type === "audio"}).length,
                total: Z_INDEX_TOTAL
            };
        },
        // 获取画板各层级信息
        getBoardInfo: function () {
            return BOARD_ARR;
        }
    };

    w.Board = Board;



    /**
     * 拖拽类
     * 兼容PC和移动端事件
     * 
     */
    function Drag(dom) {
        this.dom = dom;
        this.flag = false;
        var self = this;
        var sty = null;
        if (window.getComputedStyle) {
            sty = window.getComputedStyle(self.dom, null); // 非IE
        } else {
            sty = self.dom.currentStyle; // IE
        }
        this.maxLeft = WRAP_DOM.clientWidth - sty.width.split('px')[0] - 20; //当前元素可移动的最大左偏移
        this.maxTop = WRAP_DOM.clientHeight - sty.height.split('px')[0] - 20; //当前元素可移动的最大上偏移

        self.dom.addEventListener("mousedown", function (e) {
            self.down(self);
        }, false);
        self.dom.addEventListener("touchstart", function (e) {
            self.down(self);
        }, false)

    }
    //按下
    Drag.prototype.down = function (self) {
        event.preventDefault();
        self.flag = true;
        var touch;
        if (event.touches) {
            touch = event.touches[0];
        } else {
            touch = event;
        }
        var offLeft = touch.clientX - self.dom.offsetLeft; //当前点击点相对元素左边框的距离
        var offTop = touch.clientY - self.dom.offsetTop; //当前点击点相对元素上边框的距离

        window.addEventListener("mousemove", function () {
            self.move(self, offLeft, offTop);
        }, false);
        window.addEventListener("touchmove", function () {
            self.move(self, offLeft, offTop);
        }, false)
        window.addEventListener("mouseup", function () {
            self.end(self);
        }, false);
        window.addEventListener("touchend", function () {
            self.end(self);
        }, false);
    }
    //移动
    Drag.prototype.move = function (self, offLeft, offTop) {
        if (self.flag) {
            var touch;
            if (event.touches) {
                touch = event.touches[0];
            } else {
                touch = event;
            }
            var endX = touch.clientX - offLeft; //元素移动后的left距离
            var endY = touch.clientY - offTop; //元素移动后的top距离
            if (endX <= 20) {
                endX = 20;
            } else if (endX >= self.maxLeft) {
                endX = self.maxLeft;
            }
            if (endY <= 40) {
                endY = 40;
            } else if (endY >= self.maxTop) {
                endY = self.maxTop;
            }

            self.dom.style.left = endX + "px";
            self.dom.style.top = endY + "px";
        }
    }
    //释放
    Drag.prototype.end = function (self) {
        self.flag = false;
    }

    /**
     * 图片类
     * 产出图片dom
     */

    function Image (data, coordinate) {
        this.url = data;
        this.coordinate = coordinate;
        this.dom = null;
        this.init();
    }

    Image.prototype = {
        init: function () {
            this.dom = d.createElement('img');
            this.dom.style.cssText = "width: 100px; height: 100px; border: 0; display: block; position: absolute; background: #f1f1f1; left: "+ this.coordinate.x +"px; top: "+ this.coordinate.y +"px; z-index: "+ Z_INDEX_TOTAL +"";
            this.dom.setAttribute('src', this.url);
        }
    };

})(window, document);