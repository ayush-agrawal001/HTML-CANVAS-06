var canvas = document.querySelector("canvas");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext("2d");

var mouse = {
    x : 0,
    y : 0
}

window.addEventListener("mousemove", function(event){
    mouse.x = event.x; 
    mouse.y = event.y;

    // console.log(mouse.x)

});

function Circle(x,y,dx,dy,radius,color) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.color = color;

    this.draw = function () {         
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0 , Math.PI * 2 , false);
        c.fillStyle = this.color;
        c.fill();
        c.strokeStyle = "black";
        c.stroke();
        c.closePath();
    }
    
    this.update = function () {
        
        this.x += this.dx;
        this.y += this.dy;        
        this.draw();
    }
    
}

function getdistance(x1,y1,x2,y2) {
    let xDis = x1 - x2;
    let yDis = y1 - y2;

    return Math.sqrt(Math.pow(xDis, 2) + Math.pow(yDis, 2));

}

var circle1 
var circle2

function init() {
    circle1 = new Circle(canvas.width / 2 ,canvas.height / 2, 0, 0, 100,"black");
    
    // circle2 is set to undefined so that the initial position 
    //of circle2 will not be specified explicitly when the init() function is called.
    circle2 = new Circle(undefined, undefined, 0, 0, 50,"red");


}

function anima_collision(){
    requestAnimationFrame(anima_collision);
    c.clearRect(0,0,canvas.width,canvas.height);
    
    circle1.update();
   
   // In the anima_collision() function, which is called repeatedly for animation,
   // circle2.x and circle2.y are updated with mouse.x and mouse.y respectively.
   // This suggests that circle2 is intended to follow the mouse cursor during the animation.
   
    circle2.x = mouse.x;
    circle2.y = mouse.y;
    circle2.update();

    if (getdistance(circle1.x,circle1.y,circle2.x,circle2.y) 
                < circle1.radius + circle2.radius
    ) {
        circle1.color = "red"
    }else{
        circle1.color = "black"
    }

    // console.log(getdistance(circle1.x,circle1.y,circle2.x,circle2.y));
}

init();
anima_collision();