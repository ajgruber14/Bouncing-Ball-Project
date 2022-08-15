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

const toggleButton = document.getElementsByClassName('toggle-button')[0];
const navbarLinks = document.getElementsByClassName('navbar-links')[0];

toggleButton.addEventListener('click', () => {
    navbarLinks.classList.toggle('active');
})

const body = document.querySelector('body');
const toggle = document.getElementById('toggle');
toggle.onclick = function(){
    toggle.classList.toggle('active')
    body.classList.toggle('active');
}



let scrollpos = window.scrollY;
let header = document.querySelector('header');;

function removeOpacity() {
    header.style.opacity = "0";
    header.style.pointerEvents = "none";
}
function addOpacity() {
    header.style.opacity = "1";
    header.style.pointerEvents = "all";
}

window.addEventListener('scroll', function(){ 
    scrollpos = window.scrollY;

    if(scrollpos > 50){
        removeOpacity();
    }
    else {
        addOpacity();
    }
    console.log(scrollpos);
});