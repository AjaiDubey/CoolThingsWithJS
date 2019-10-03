var gameOver = false;
var whichPlayerLost = 0;

var players = [];

const diff = 10;

function setup() {
    createCanvas(500, 500);
    frameRate(15);
    stroke(255);
    strokeWeight(10)

    players[0] = new Lightbike(0, 0);
    players[0].dir = 'right';
    players[0].myColor = color(255, 0, 0);
    players[0].playerID = 1;

    players[1] = new Lightbike(width - diff, width - diff);
    players[1].dir = 'left';
    players[1].myColor = color(50, 50, 255);
    players[1].playerID = 2;
}
function draw() {
    background(0);
    if (!gameOver) {
        players[0].update();
        players[0].show();
        players[0].otherHit(1);
        players[0].selfHit();

        players[1].update();
        players[1].show();
        players[1].selfHit();
        players[1].otherHit(0);

    } else {
        if (whichPlayerLost == 1) {
            fill(255, 255, 0);
            text("Player 2 is victorious!", width / 2, height / 2);
        } else {
            fill(255, 255, 0);
            text("Player 1 is victorious!", width / 2, height / 2);
        }
    }
}
function keyPressed() {
    switch (keyCode) {
        case 37:
            if (players[0].dir !== 'right') {
                players[0].dir = 'left';
            }
            break;
        case 39:
            if (players[0].dir !== 'left') {
                players[0].dir = 'right';
            }
            break;
        case 38:
            if (players[0].dir !== 'down') {
                players[0].dir = 'up';
            }
            break;
        case 40:
            if (players[0].dir !== 'up') {
                players[0].dir = 'down';
            }
            break;
    }
}

function Lightbike(spawnX, spawnY) {
    this.x = spawnX;
    this.y = spawnY;
    this.dir = 'right';
    this.total = 0;
    this.trail = [];

    this.myColor = color(255);
    this.playerID;

    this.selfHit = function () {
        for (var i = 0; i < this.trail.length; i++) {

            var pos = this.trail[i];

            var d = dist(this.x, this.y, pos.x, pos.y);
            if (d < 1) {
                gameOver = true;
                whichPlayerLost = this.playerID;
            }
        }
    }

    this.otherHit = function (otherID) {
        for (var i = 0; i < players[otherID].trail.length; i++) {

            var tailPos = players[otherID].trail[i];

            var d = dist(tailPos.x, tailPos.y, this.x, this.y);

            if (d < 1) {
                gameOver = true;
                whichPlayerLost = this.playerID;
            }
        }
    }
    this.update = function () {
        this.total++;

        if (this.total === this.trail.length) {
            for (var i = 0; i < this.trail.length - 1; i++) {
                this.trail[i] = this.trail[i + 1];
            }
        }
        this.trail[this.total - 1] = createVector(this.x, this.y);

        if (this.dir == 'right')
            this.x = this.x + 1 * diff;
        if (this.dir == 'left')
            this.x = this.x - 1 * diff;
        if (this.dir == 'up')
            this.y = this.y - 1 * diff;
        if (this.dir == 'down')
            this.y = this.y + 1 * diff;

        this.x = constrain(this.x, 0, width - diff);
        this.y = constrain(this.y, 0, height - diff);
    }

    this.show = function () {
        fill(this.myColor);
        noStroke();
        for (var i = 0; i < this.trail.length; i++) {
            rect(this.trail[i].x, this.trail[i].y, diff, diff);
        }
        rect(this.x, this.y, diff, diff);
    }
}