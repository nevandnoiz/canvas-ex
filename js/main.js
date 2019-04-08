'use strict'

let gCanvas;
let gCtx;
let gCurrColor = 'black';
let gCurrShape = 'line';
let gCurrWidth = 1;
let gMouseClicked = false;
let gPrevPos;
let randomShapeMode = false;
let randomColorMode = false;

function init() {
    gCanvas = document.querySelector("#our-canvas");
    gCtx = gCanvas.getContext('2d');
    setCtxProperties()
}

function onMouseDownUp() {
    gMouseClicked = !gMouseClicked;
    gPrevPos = {};

}

function onMouseMove(ev) {
    if (!gMouseClicked) return;


    if (randomShapeMode) setRandomShape();
    if (randomColorMode) setRandomColor();

    let x = ev.offsetX;
    let y = ev.offsetY;
    switch (gCurrShape) {
        case 'line':
            drawLine(x, y);
            break;
        case 'circle':
            drawCircle(x, y);
            break;
        case 'square':
            drawSquare(x, y);
            break;
        case 'triangle':
            drawTriangle(x, y);
    }
}

function drawLine(x, y) {
    if (!gPrevPos.prevX) gPrevPos.prevX = x;
    if (!gPrevPos.prevY) gPrevPos.prevY = y;
    gCtx.beginPath();
    gCtx.lineJoin = 'round';
    gCtx.moveTo(gPrevPos.prevX, gPrevPos.prevY);
    gCtx.lineTo(x, y);
    gCtx.closePath()
    gCtx.stroke();
    gPrevPos.prevX = x;
    gPrevPos.prevY = y;
}

function drawSquare(x, y) {
    gCtx.beginPath();
    gCtx.rect(x, y, 30, 30);
    gCtx.closePath()
    gCtx.stroke();
}



function drawCircle(x, y) {
    gCtx.beginPath();
    gCtx.arc(x, y, 10, 0, 2 * Math.PI);
    gCtx.closePath();
    gCtx.stroke();
}


function drawTriangle(x, y) {
    gCtx.beginPath();
    gCtx.moveTo(x, y);
    gCtx.lineTo(x + 25, y + 50);
    gCtx.lineTo(x - 25, y + 50);
    gCtx.closePath();
    gCtx.stroke();
}

function setCtxProperties() {
    gCtx.strokeStyle = gCurrColor;
    gCtx.lineWidth = gCurrWidth;
}

function onSetColor(value) {
    gCurrColor = `${value}`;
    gCtx.strokeStyle = gCurrColor;
}

function onSetShape(value) {
    if (value === 'random') {
        randomShapeMode = true;
    } else {
        randomShapeMode = false;
        gCurrShape = value;
    }
}

function onSetWidth(value) {
    gCurrWidth = value;
    gCtx.lineWidth = gCurrWidth;
    document.querySelector('.range-value').innerText = value;
}

function setRandomShape() {
    const num = Math.floor(Math.random() * 3);
    const shapes = ['circle', 'square', 'triangle'];
    gCurrShape = shapes[num];
}

let gColorInterval;
function toggleRandomColor(elBtn) {
    randomColorMode = !randomColorMode;
    if (randomColorMode) {
        elBtn.style.backgroundColor = `#${getRandomColor()}`;
        gColorInterval = setInterval(() => {
            elBtn.style.backgroundColor = `#${getRandomColor()}`;
        }, 1000);
    } else {
        clearInterval(gColorInterval);
        elBtn.style.backgroundColor = 'white';
        gCtx.strokeStyle = gCurrColor;
    }
}



function setRandomColor() {
    gCtx.strokeStyle = `#${getRandomColor()}`;
}

function getRandomColor() {
    return Math.floor(Math.random() * 16777215).toString(16);
}