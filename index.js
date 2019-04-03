/**
 * 2019/4/2
 * 基于drawingboard.js封装的画板组件
 * author: sfl
 */
import './lib/drawingboard/index';
import './lib/drawingboard/index.css';

(function (w, d) {

    var Z_INDEX = 0;
    var BOARD_ARR = [];

    var Board = function (o) {
        this.options = Object.assign({}, o);
        this.controls = [
            "Color",
            {
                Size: {
                    type: "dropdown"
                }
            },
            'Navigation',
            { DrawingMode: { filler: false } }
        ];
        this.init();
    };

    Board.prototype = {
        init: function () {
            Z_INDEX = this.options.zIndex;
            this.createBoard();
        },
        createBoard: function () {
            var _this = this;
            var wrapDom = this.getWrapDom();
            wrapDom.style.position = "relative";
            var item = d.createElement('div');
            item.setAttribute("id", "board-" + Z_INDEX);
            item.style.position = "absolute";
            item.style.width = "100%";
            item.style.height = "100%";
            item.style.zIndex = Z_INDEX;
            wrapDom.appendChild(item);
            var board = new window.DrawingBoard.Board(item.id, {
                background: false,
                color: _this.options.color,
                size: _this.options.size,
                controls: _this.controls,
                eraserColor: 'background',
                webStorage: 'local'
            });
            board.addControl('Download');
            BOARD_ARR.push({
                "boardItem": board,
                "zIndex": Z_INDEX
            });
        },
        getWrapDom: function () {
            let dom = null;
            switch (this.options.el[0]) {
                case "#":
                    dom = d.getElementById(this.options.el.substr(1));
                    break;
                case ".":
                    dom = d.getElementsByClassName(this.options.el.substr(1))[0];
                    break;
                default:
                    dom = d.getElementsByTagName(this.options.el)[0];
                    break;
            }
            return dom;
        },
        getZindex: function () {
            return Z_INDEX;
        },
        getBoardInfo: function () {
            return BOARD_ARR;
        }
    };

    w.Board = Board;

})(window, document);