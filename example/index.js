import '../src/canvas-board';

const myboard = Board({
    "el": ".box",
    "zIndexInfo": [{
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
    //   "mediaControlsData": [{type: "img", url: ""}],
    "mediaTypes": ['img', 'video', 'audio']
});

console.log(myboard);
console.log(myboard.getZindex());
console.log(myboard.getBoardInfo());