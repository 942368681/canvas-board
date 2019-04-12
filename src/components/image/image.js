import './image.css';

export const Image = function (data, coordinate, Z_INDEX_TOTAL) {
    this.url = data;
    this.coordinate = coordinate;
    this.zIndex = Z_INDEX_TOTAL;
    this.dom = null;
    this.init();
};

Image.prototype = {
    init: function () {
        this.dom = document.createElement('img');
        this.dom.setAttribute("class", "drag-img")
        this.dom.style.cssText = "left: " + this.coordinate.x + "px; top: " + this.coordinate.y + "px; z-index: " + this.zIndex + "";
        this.dom.setAttribute('src', this.url);
    }
};