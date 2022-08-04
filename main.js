const Ball = function(x, y, radius) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.direction = Math.random() * Math.PI * 2;
    this.speed = Math.random() * 3 + 1;
    this.color = "rgba(" + Math.floor(Math.random() * 256) + "," + Math.floor(Math.random() * 256) + "," + Math.floor(Math.random() * 256) + "," + (Math.random() + .2) + ")";
}

Ball.prototype = {
    updatePosition:function(width, height) {
        this.x += Math.cos(this.direction) * this.speed;
        this.y += Math.sin(this.direction) * this.speed;

        //x-axis collision code
        if (this.x - this.radius < 0) {
            this.x = this.radius;
            this.direction = Math.atan2(Math.sin(this.direction), Math.cos(this.direction) * -1);
        } else if (this.x + this.radius > width) {
            this.x = width - this.radius;
            this.direction = Math.atan2(Math.sin(this.direction), Math.cos(this.direction) * -1);
        }

        //y-axis collision code
        if (this.y - this.radius < 0) {
            this.y = this.radius;
            this.direction = Math.atan2(Math.sin(this.direction) * -1, Math.cos(this.direction));
        } else if (this.y + this.radius > height) {
            this.y = height - this.radius;
            this.direction = Math.atan2(Math.sin(this.direction) * -1, Math.cos(this.direction));
        }
    }
}

let x = document.documentElement.clientWidth * 0.5;
let y = document.documentElement.clientHeight * 0.5;
var balls = new Array();
for(let index = 0; index < 40; index++) {
    balls.push(new Ball(x, y, Math.random() * 35 + 15));
}

let context = document.querySelector("canvas").getContext("2d");
//The window.requestAnimationFrame() method tells the browser that you wish to perform an animation and requests that the browser calls a specified function to update an animation before the next repaint.
function loop() {
    window.requestAnimationFrame(loop);

    let width = document.documentElement.clientWidth;
    let height = document.documentElement.clientHeight;

    context.canvas.width = width;
    context.canvas.height = height;

    for(let index = 0; index < balls.length; index++) {
        let ball = balls[index];
            context.fillStyle = ball.color;
            context.beginPath();
            context.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
            context.fill();
        ball.updatePosition(width, height);
    }
}

loop();