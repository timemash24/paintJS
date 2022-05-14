// 그림판 만들기

const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const randomColor = document.getElementById("jsRColor");
const range = document.getElementById("jsRange");
const paint = document.getElementById("jsPaint");
const fill = document.getElementById("jsFill");
const erase = document.getElementById("jsErase");
const clearBtn = document.getElementById("jsClear");
const saveBtn = document.getElementById("jsSave");

const INITIAL_COLOR = "#2c2c2c";
const CANVAS_SIZE = 700;

// 캔버스 객체 위에 그리기 가능하도록 크기 설정
canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

// 저장시 배경 투명이 되지 않게 흰색 배경 설정
ctx.fillStyle = "white";
ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;

let painting = false;
let filling = false;

function stopPainting() {
  painting = false;
}

function startPainting() {
  painting = true;
}

// 마우스 누르고 있는 동안 선 그리기
function onMouseMove(evet) {
  // clientX : window 내에서 마우스 x좌표, offsetX : canvas 내에서 마우스 x좌표
  const x = event.offsetX;
  const y = event.offsetY;
  if (!painting) {
    ctx.beginPath();
    ctx.moveTo(x, y);
  } else {
    ctx.lineTo(x, y);
    ctx.stroke();
  }
}

// 마우스 떼었을 때 선 끝내기
function onMouseLeave(event) {
  stopPainting();
}

// 클릭한 색상으로 브러쉬 색상 변경
function handleColorClick(event) {
  const color = event.target.style.backgroundColor;
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
}

function handleRandomColor() {
  const random = Math.floor(Math.random()*16777215).toString(16);
  console.log(random);
  ctx.strokeStyle = "#" + random;
  ctx.fillStyle = "#" + random;
}

// 브러쉬 크기 변경
function handeleRangeChange(event) {
  const size = event.target.value;
  ctx.lineWidth = size;
}

// 그리기 버튼
function handlePaintClick() {
  if (filling) filling = false;
}

// 채우기 버튼
function handleFillClick() {
  if (!filling) filling = true;
}

// 지우기
function handleEraseClick() {
  ctx.strokeStyle = "white";
  if (filling) filling = false;
}

// 채우기 실행
function handleCanvasClick() {
  if (filling) {
    ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
  }
}

// 마우스 우클릭 방지
function handleCM(event) {
  event.preventDefault();
}

// 초기화 기능
function handleClearClick() {
  if (window.confirm("그림판을 초기화하시겠습니까?")) {
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    ctx.fillStyle = INITIAL_COLOR;
    ctx.strokeStyle = INITIAL_COLOR;
  }
}

// 저장 기능
function handleSaveClick() {
  if (window.confirm("그림을 저장하시겠습니까?")) {
    const image = canvas.toDataURL();
    const link = document.createElement("a");
    link.href = image;
    link.download = "PaintJS[EXPORT]";
    link.click();
  }
}

if (canvas) {
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mousedown", startPainting);
  canvas.addEventListener("mouseup", stopPainting);
  canvas.addEventListener("mouseleave", stopPainting);
  canvas.addEventListener("click", handleCanvasClick);
  canvas.addEventListener("contextmenu", handleCM);
}

if (colors) {
  Array.from(colors).forEach((color) =>
    color.addEventListener("click", handleColorClick)
  );
}

if(randomColor) {
  randomColor.addEventListener("click", handleRandomColor);
}

if (range) {
  range.addEventListener("input", handeleRangeChange);
}

if (paint) {
  paint.addEventListener("click", handlePaintClick);
}

if (fill) {
  fill.addEventListener("click", handleFillClick);
}

if (erase) {
  erase.addEventListener("click", handleEraseClick);
}

if (clearBtn) {
  clearBtn.addEventListener("click", handleClearClick);
}

if (saveBtn) {
  saveBtn.addEventListener("click", handleSaveClick);
}
