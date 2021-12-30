var htmlCanvas = document.getElementById("canvas");
/* Создание объекта canvas (var canvas) из элемента HTML canvas. */
var canvas = htmlCanvas.getContext("2d");
/*Создание двумерного объекта рисования (var canvas) для объекта canvasю*/
var canvasRadius = htmlCanvas.height / 2;
/* Рассчеет радиуса часов, используя высоту холста.
   Использование высоты холста для расчета радиуса часов заставляет часы работать при любом размере холста */
canvas.translate(canvasRadius, canvasRadius);
/* Переназначение позиции (0,0) (объекта рисования) в центр холста: */
canvasRadius = canvasRadius * 0.9;
/* Уменьшение радиус часов (до 90%), чтобы нарисовать часы в пределах холста. */
setInterval(drawClock,1000);
/* Создание функцию для отрисовки часов. */
function drawFace(canvas, canvasRadius) {
  var grdCanvas;
  canvas.beginPath();
  canvas.arc(0, 0, canvasRadius, 0, 2 * Math.PI);
  canvas.fillStyle = "lightgrey";
  canvas.fill();
  grdCanvas = canvas.createRadialGradient(
    0,
    0,
    canvasRadius * 0.7,
    0,
    0,
    canvasRadius * 2.5
  );
  grdCanvas.addColorStop(0, "#333");
  grdCanvas.addColorStop(0.5, "white");
  grdCanvas.addColorStop(1, "#333");
  canvas.strokeStyle = grdCanvas;
  canvas.lineWidth = canvasRadius * 0.1;
  canvas.stroke();

  canvas.beginPath();
  canvas.arc(0, 0, canvasRadius * 0.05, 0, 2 * Math.PI);
  canvas.fillStyle = grdCanvas;
  canvas.fill();
}
function drawNumbers(canvas, canvasRadius) {
  var ang;
  var num;
  canvas.font = canvasRadius * 0.15 + "px arial";
  /* Устанавливает размер шрифта (объекта рисования) на 15% от радиуса: */
  canvas.textBaseline = "middle";
  canvas.textAlign = "center";
  /* Устанавливает выравнивание текста по середине и по центру позиции печати.*/
  // pi = 3,14159; 1rad = 57,2deg;
  for (num = 1; num < 13; num++) {
    // Получение угла в радианах.
    ang = (num * Math.PI) / 6; // 0.5(30); 1.0(60); 1.5(90); 2.0; 2.6; 3.1; 3.6(210); 4.1(240); 4.7(270); 5.2; 5,7; 6.2;
    canvas.rotate(ang);
    // Вращение объекта на ang градусов.
    canvas.translate(0, -canvasRadius * 0.8);
    // Фиксирование "указателя" на текущем положении ang градусов.
    canvas.rotate(-ang);
    // Вращение объекта в обратную сторону.
    canvas.fillText(num.toString(), 0, 0);
    // Вывод текста на месте текущего указателя.
    canvas.rotate(ang);
    // Возвращение "указателя" на исходное положение(середина).
    canvas.translate(0, canvasRadius * 0.8);
    // Возвращение "указателя" на исходное положение.
    canvas.rotate(-ang);
    // Возвращение объекта на исходное положение.
  }
}
function drawTime(canvas, canvasRadius) {
  // "Метки" стрелок в радианах.
  var nowDate = new Date();
  // Дата на компьютере.
  console.log(nowDate);
  var hour = nowDate.getHours();
  // Извлечение времени в часах.
  console.log(hour);
  var minute = nowDate.getMinutes();
  // Извлечение времени  в минутах.
  console.log(minute);
  var second = nowDate.getSeconds();
  // Извлечение времени  в секундах.
  console.log(second);
  // === hourHMS ===
  var hourClock = hour % 12;
  // Угол часовой стрелки, зависящий от кол-ва "пройденных" делений.
  console.log(hourClock);
  var hourHR = (hourClock * Math.PI) / 6;
  // Предположение: Угол в радианах часовой стрелки для часа.(12 делений).
  console.log(hourHR);
  var hourMR = (minute * Math.PI) / (6 * 60);
  // Угол в радианах часовой стрелки для минут(720 делений).
  console.log(hourMR);
  var hourSR = (second * Math.PI) / (360 * 60);
  // Угол в радианах часовой стрелки для секунд(43.200 делений).
  console.log(hourSR);
  hourClock = hourHR + hourMR + hourSR;
  // Часовая стрелка в ЧМС.
  console.log(hourClock);
  drawHand(canvas, hourClock, canvasRadius * 0.5, canvasRadius * 0.05);
  // === minuteMS ===
  // Отрисовка часовой стрелки.
  var minuteMR = (minute * Math.PI) / 30;
  // Получение угла в радианах менутной и секундной стрелки.
  var minuteSR = (second * Math.PI) / (30 * 60);
  // Получение угла в радианах секундной стрелки.
  var minuteClock = minuteMR + minuteSR;
  drawHand(canvas, minuteClock, canvasRadius * 0.7, canvasRadius * 0.03);
  var secondClock = (second * Math.PI) / 30;
  drawHand(canvas, secondClock, canvasRadius * 0.8, canvasRadius * 0.02);
}
function drawHand(canvas, positionClock, length, width) {
  canvas.beginPath();
  // Начало линии.
  canvas.lineWidth = width;
  // Установка ширины стрелки.
  canvas.lineCap = "round";
  // Указание типа конца стрелки.
  canvas.moveTo(0, 0);
  // Перемещение "метки" в центр по радиусу.
  canvas.rotate(positionClock);
  // Смещение холста по часовой стрелки на rad часов.
  canvas.lineTo(0, -length);
  // Координаты линии от середины холста через радиус к его верхнему краю.
  canvas.stroke();
  // Отрисовка стрелки часа.
  canvas.rotate(-positionClock);
  // Возвращение ротации холста на 0 rad.
}
function drawClock() {
  drawFace(canvas, canvasRadius);
  drawNumbers(canvas, canvasRadius);
  drawTime(canvas, canvasRadius);
}

