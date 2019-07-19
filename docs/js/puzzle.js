/**
    Puzzle
    v0.1 | 2019.07.19
    Ben Borkowski - Lead Developer
**/

var VPuzzle = function () {
    console.log('hello world, new puzzle game created.')
    var canvas = document.getElementById('game');
    var ctx = canvas.getContext("2d");
    canvas.width = 500;
    canvas.height = 500;
    canvas.id = 'game';
    
    // draw / render everything
    var render = function () {
        ctx.clearRect(0,0,canvas.width, canvas.height);
        //type
        ctx.fillStyle = "rgb(255, 255, 255)";
        ctx.font = "18px Helvetica";
        ctx.textAlign = "left";
        ctx.textBaseline = "top";
        ctx.fillText("Puzzle Game" , 10 , 10);
        
        //test shape
        ctx.rect(50,50,50,50); //x,y,w,h
        ctx.fillStyle = "rgb(25,25,25)";
        ctx.fill();
        ctx.lineWidth = 1;
        ctx.strokeStyle = "rgb(255,255,255)";
        ctx.stroke();
    }
    
    return {
        render : render
    }
    
}

var game = new VPuzzle();
game.render();
