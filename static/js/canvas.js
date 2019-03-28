window.addEventListener("load" , function() {

    var canvas = document.getElementById("canvas_test");

    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;

var ctx = canvas.getContext("2d");

ctx.lineWidth = 10;
ctx.lineJoin = "round";

ctx.strokeRect(100,100,200,500);

var painting = false;

function startPainting(e) {
    e.preventDefault();
    painting = true;
    console.log("start = " + painting);
    console.log(e.clientY);

    ctx.beginPath();
    ctx.arc(e.clientX, (e.clientY+20), 5, 0, Math.PI * 2, true); // Outer circle
    ctx.fill();
    ctx.beginPath();
}

function stopPainting(e) {
    painting = false;
    console.log("stop = " + painting);
    
    ctx.moveTo(e.clientX, e.clientY);
    ctx.beginPath();
}

function draw(e) {
    e.preventDefault();

    if(!painting) return;

    console.log("drawing");
    //ctx.lineWidth = 10;
    //ctx.lineCap = "round";

    //ctx.strokeRect(100,100,200,500);
    ctx.lineTo(e.clientX, e.clientY+20);
    ctx.stroke();
}

function draw2(e) {
    e.preventDefault();
    ctx.lineWidth = 10;
    ctx.lineJoin = "round";
    ctx.strokeRect(e.clientX,e.clientY,50,50);

    ctx.lineTo(e.clientX, e.clientY+20);
    ctx.stroke();
}

function startTest(e) {
    e.preventDefault();
    let y = e.pageY;
    window.alert(e.touches);
}


//eventListenrs pour le desktop
canvas.addEventListener("mousedown", startPainting);
canvas.addEventListener("mouseup", stopPainting);
canvas.addEventListener("mousemove", draw); 

//eventListener pour les mobiles
//touch retourne une liste d'objets touches
/* 
canvas.addEventListener("touchstart", startPainting, false);
canvas.addEventListener("touchend", stopPainting, false);
canvas.addEventListener("touchmove", draw, false); 
*/

})



