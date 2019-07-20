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
    
    var settings = {
        tileSize : 50,
        tileCount : 5
    };
    
    //sample array of squares to make up one shape
    var tiles = {}
    
    var drawTile = function (x,y) {
        //test shape
        ctx.rect(x,y,settings.tileSize,settings.tileSize); //x,y,w,h
        ctx.fillStyle = "rgb(25,25,25)";
        ctx.fill();
        ctx.lineWidth = 1;
        ctx.strokeStyle = "rgb(255,255,255)";
        ctx.stroke();
    }
    
    var drawTiles = function() {
        var x = 20;
        var y = 50;
        var i = 0;
        for(i=0; i < settings.tileCount; i++){
            drawTile(x,y);
            y += settings.tileSize;
        }
    }
    
    // draw / render everything
    var render = function () {
        ctx.clearRect(0,0,canvas.width, canvas.height);
        //type
        ctx.fillStyle = "rgb(255, 255, 255)";
        ctx.font = "18px Helvetica";
        ctx.textAlign = "left";
        ctx.textBaseline = "top";
        ctx.fillText("Puzzle Game" , 10 , 10);
        
        drawTiles();
        
    }
    
    return {
        render : render
    }
    
}

var game = new VPuzzle();
game.render();
