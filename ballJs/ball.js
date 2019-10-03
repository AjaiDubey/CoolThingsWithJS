var canvas = document.getElementById("root");
var ctx = canvas.getContext('2d');

var p = { x: 20, y: 20 };
var velo = 5,
    corner = 50,
    rad = 20;
var ball = { x: p.x, y: p.y };
var moveX = Math.cos(Math.PI / 180 * corner) * velo;
var moveY = Math.sin(Math.PI / 180 * corner) * velo;

canvas.addEventListener("click", function (evt) {
    var mousePos = getMousePos(canvas, evt);
    if(mousePos.x <= (ball.x + rad) && mousePos.x >= (ball.x - rad) && mousePos.y <= (ball.y + rad) && mousePos.y >= (ball.y - rad)){
        alert("acertou a bola")
    }
    //alert(mousePos.x + ',' + mousePos.y);
}, false);

function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
      x: evt.clientX - rect.left,
      y: evt.clientY - rect.top
    };
}

function DrawMe() {
    ctx.clearRect(0, 0, 500, 500);
    if (ball.x > canvas.width - rad || ball.x < rad) moveX = -moveX;
    if (ball.y > canvas.height - rad || ball.y < rad) moveY = -moveY;

    ball.x += moveX;
    ball.y += moveY;

    ctx.beginPath();
    ctx.fillStyle = 'red';
    ctx.arc(ball.x, ball.y, rad, 0, Math.PI * 2, false);
    ctx.fill();
    ctx.closePath();
}
setInterval(DrawMe, 10);
