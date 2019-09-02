/**
    Puzzle
    v0.1 | 2019.07.19
    Ben Borkowski - Lead Developer
**/

var VPuzzle = function () {
    console.log('hello world, new puzzle game created.')

    var N = 4; //the number of tiles to find all shapes for
    var shapes = []; //the main array of all shapes
    var grid = [];
    var calc = 0; //the number loops made;

    var canvas = document.getElementById('game');
    var ctx = canvas.getContext("2d");
    canvas.width = 700;
    canvas.height = 700;
    canvas.id = 'game';

    // init
    var init = function () {
        grid = makeGrid(state.nBuild,state.nBuild,null);
        nLoop();
        console.log('*** done making shapes:');
        console.log(calc);
        console.log(shapes);
        render();
    }

    //set constants based on settins
    var constants = {
        startingX : 20,
        startingY : 50,
    }

    var settings = {
        tileSize : 10,
        startingX : constants.startingX,
        startingY : constants.startingY,
    }

    //a state to save the tile positions as we build each shape
    var state = {
        gridMaxX : 1,
        gridMaxY : 1,
        nBuild : 1,
    }

    /**
        the main shapebuilder, recursive to build the next shape on the list
         *************************************************************************************
    **/
    var nLoop = function () {
        console.log('-----------------------------------------------------');
        console.log('** N Loop **************** ' + Number(state.nBuild) + ' of ' + N);
        //grid = makeGrid(state.nBuild,state.nBuild,null);
        //test each shpae from the last N count

        //first see if any shapes in our current N count
        if( !shapes[state.nBuild] ){
            //make the first shape long shape
            var shape = [];
            var tile = [];
            var i = 1;
            for(i; i <= state.nBuild; i++){
                tile = [i,1];
                shape.push(tile);
            }
            shapes[state.nBuild] = [];
            shapes[state.nBuild].push(shape);
        }

        //next, if there's a previous N shpaes, loop through them
        if( shapes[state.nBuild - 1] && shapes[state.nBuild - 1].length > 0 ){
            i = 0;
            var checkShape = null;
            for(i; i < shapes[state.nBuild - 1].length; i++){
                //place the checkshape on a new grid, and loop through each possilbe addition
                checkShape = shapes[state.nBuild - 1][i];
                console.log('*************************************************');
                console.log('Checking an new Shape from N-1 * ' + 'checking shapes: N' + Number(state.nBuild - 1) + ' : ' + i);
                console.log(checkShape);
                //make new grid 1x larger around new shape
                //loop the shape and find the dimensions
                var maxW = 0;
                var maxH = 0;
                var j = 0;
                for(j;j<checkShape.length;j++){
                    var testTile = checkShape[j];
                    if( testTile[0] >  maxW) maxW = testTile[0];
                    if( testTile[1] >  maxH) maxH = testTile[1];
                }

                var tempGrid = makeGrid(maxW + 2, maxH + 2,null);

                //place shape on grid // mark occupied
                tempGrid = placeShapeOnGridWithSpace(checkShape,tempGrid);

                //loop and check each unoccupied space
                var z = 0;
                var newShape = null;
                var isNew = null;
                for(z; z<tempGrid.length; z++){
                    calc++;
                    if( tempGrid[z].occupied == false ){
                        newShape = addTileForNewShape(tempGrid,tempGrid[z]);
                        if(newShape){
                            console.log('TESTING A NEW SHAPE ('+ shapes[state.nBuild].length +')...start to look at each last shape');
                            console.log(newShape);
                            isNew = testForNewShape(newShape);
                            if(isNew){
                                shapes[state.nBuild].push(newShape);
                            }
                        }
                    }
                }
            }
        }

        //see if we need to go to the next N
        if(state.nBuild < N){
            //go on to next N count
            state.nBuild++;
            nLoop();
        }
    }
    /**
        END N LOOP
        *************************************************************************************
    **/

    /*
        Test a shape against all the shapes in the current N build
    */
    var testForNewShape = function(newShape){
        var i = 0;
        var newShapeGrid = makeGrid(state.nBuild,state.nBuild,null);
        var oldShapeGrid = null;

        newShapeGrid = placeShapeOnGrid(newShape,newShapeGrid);
        
        var newShapeGridR90 = rotateGrid(newShapeGrid,'r90');
        var newShapeGridR180 = rotateGrid(newShapeGrid,'r180');
        var newShapeGridR270 = rotateGrid(newShapeGrid,'r270');
        
        var newShapeGridFlip = flipGrid(newShapeGrid);

        var newShapeGridFlipR90 = rotateGrid(newShapeGridFlip,'r90');
        var newShapeGridFlipR180 = rotateGrid(newShapeGridFlip,'r180');
        var newShapeGridFlipR270 = rotateGrid(newShapeGridFlip,'r270');
        

        //temp for now just rough out and each possible orientation
        //rotate 90 //rotate 180 //270
        //flip //flip 90 //flip 180 //flip 720

        // for each shape on this N build test the new shape and each rotation
        for(i = 0; i < shapes[state.nBuild].length; i++){
            console.log( 'TESTING for Dupes -- N' + state.nBuild + ' shape #' + Number(i+1) );
            
            oldShapeGrid = makeGrid(state.nBuild,state.nBuild,null);
            oldShapeGrid = placeShapeOnGrid(shapes[state.nBuild][i],oldShapeGrid);
            
            if( Number(i+1) == 3 && state.nBuild == 4 && shapes[state.nBuild].length == 3 ){
                console.log('THIS SHOULD BE A DUPE ????????????????');
                console.log(oldShapeGrid);
                console.log(newShapeGridFlip);
            }

            if( isDupe(newShapeGrid, oldShapeGrid)  ) return false;
            
            if( isDupe(newShapeGridR90, oldShapeGrid)  ) return false;
            if( isDupe(newShapeGridR180, oldShapeGrid)  ) return false;
            if( isDupe(newShapeGridR270, oldShapeGrid)  ) return false;
            
            if( isDupe(newShapeGridFlip, oldShapeGrid)  ) return false;
            
            if( isDupe(newShapeGridFlipR90, oldShapeGrid)  ) return false;
            if( isDupe(newShapeGridFlipR180, oldShapeGrid)  ) return false;
            if( isDupe(newShapeGridFlipR270, oldShapeGrid)  ) return false;

        }
        console.log('* It is new!');
        return true;
    }

    var isDupe = function(newGrid,oldGrid){
        var found = 0;
        for(i = 0; i < oldGrid.length; i++){
            if(oldGrid[i].occupied == true){
                for(j = 0; j < newGrid.length; j++){
                    if(newGrid[j].occupied == true){
                        if( oldGrid[i].x == newGrid[j].x && oldGrid[i].y == newGrid[j].y ){
                            found++;
                        }
                    }
                }
            }
        }
        if(found == state.nBuild){
            return true;
        }
        return false;
    }
    
    var flipGrid = function(grid){
        var g = [];
        var space = null;
        for(y = 0; y <= state.gridMaxY; y++){
            for(x = state.gridMaxX; x > 0; x--){
                space = {x:x,y:y,occupied:false};
                g.push(space);
            }
        }
        //copy the occopied spaces from the old grid
        for(var z = 0; z < grid.length; z++){
            if(grid[z].occupied == true) g[z].occupied = true;
        }
        //var tempShape = extractShapeFromGrid(g);
        //var g = placeShapeOnGrid(tempShape,g);
        return g;
    }
    
    var rotateGrid = function(grid,orient){
        //if orient flip the gride keys as needed
        //r90,r180,r270,f,f90,f180,f270
        var g = [];
        var space = null;
        switch (orient){
            
            case 'r90':
                for(x = state.gridMaxX; x > 0; x--){
                    for(y = 1; y <= state.gridMaxY; y++){
                        space = {x:x,y:y,occupied:false};
                        g.push(space);
                    }
                }
            break;
            case 'r180':
                for(y = state.gridMaxY; y > 0; y--){
                    for(x = state.gridMaxX; x > 0; x--){
                        space = {x:x,y:y,occupied:false};
                        g.push(space);
                    }
                }
            break;
            case 'r270':
                for(x = 0; x <= state.gridMaxX; x++){
                    for(y = state.gridMaxY; y > 0; y--){
                        space = {x:x,y:y,occupied:false};
                        g.push(space);
                    }
                }
            break;
            default:
                return grid;
            break;
        }
        //copy the occopied spaces from the old grid
        for(var z = 0; z < grid.length; z++){
            if(grid[z].occupied == true) g[z].occupied = true;
        }
        var tempShape = extractShapeFromGrid(g);
        var g = placeShapeOnGrid(tempShape,g);
        return g;
    }

    var placeShapeOnGrid = function(shape,grid){
        var j = 0;
        var z = 0;
        for(z = 0; z < grid.length; z++){
            grid[z].occupied = false;
        }
        for(j = 0; j < shape.length; j++){
            for(z = 0; z < grid.length; z++){
                if(grid[z].x == shape[j][0] && grid[z].y == shape[j][1]){
                    grid[z].occupied = true;
                }
            }
        }
        return grid;
    }
    
    var extractShapeFromGrid = function(grid){
        var j = 0;
        var shape = [];
        for(j = 0; j<grid.length; j++){
            if( grid[j].occupied == true ){
                tile = [];
                tile[0] = grid[j].x;
                tile[1] = grid[j].y;
                shape.push(tile);
            }
        }
        shape = resetShapeToTopLeft(shape);
        return shape;
    }
    
    var resetShapeToTopLeft = function(shape){
        //reset shape to top left of grid
        var lowestX = N;
        var lowestY = N;
        var j = 0;
        for(j = 0; j<shape.length; j++){
            if( shape[j][0] < lowestX ) lowestX = shape[j][0];
            if( shape[j][1] < lowestY ) lowestY = shape[j][1];
        }
        for(j = 0; j<shape.length; j++){
            shape[j][0] = shape[j][0] - (lowestX - 1);
            shape[j][1] = shape[j][1] - (lowestY - 1);;
        }
        return shape;
    }

    var addTileForNewShape = function(grid,addTile){
        var z = 0;
        var shape = [];
        var tile = [];
        var isValid = false;
        for(z; z<grid.length; z++){
            if( grid[z].occupied == true ){
                //check if the new piece will be adjacent to something
                if(
                    ( Math.abs(addTile.x - grid[z].x) == 1 && addTile.y - grid[z].y == 0 ) ||
                    ( addTile.x - grid[z].x == 0 && Math.abs(addTile.y - grid[z].y) == 1 )
                ){
                    isValid = true;
                }
                //add this tile to the shape
                tile = [];
                tile[0] = Number(grid[z].x);
                tile[1] = Number(grid[z].y);
                shape.push(tile);
            }
        }
        if(isValid == false){
            return false;
        }
        //addtile
        tile = [];
        tile[0] = addTile.x;
        tile[1] = addTile.y;
        shape.push(tile);
        shape = resetShapeToTopLeft(shape);
        return shape;
    }

    var placeShapeOnGridWithSpace = function(shape,grid){
        var i = 0;
        var z = 0;
        for(z; z < grid.length; z++){
            for(i=0; i<shape.length; i++){
                if( grid[z].x == shape[i][0] + 1 && grid[z].y == shape[i][1] + 1 ){
                    grid[z].occupied = true;
                }
            }
        }
        return grid;
    }

    //make a grid, this is the grid to check against for the current N step
    var makeGrid = function (maxW,maxH,orient) {
        state.gridMaxX = maxW;
        state.gridMaxY = maxH;
        var g = [];
        for(y = 1; y <= state.gridMaxY; y++){
            for(x = 1; x <= state.gridMaxX; x++){
                space = {x:x,y:y,occupied:false};
                g.push(space);
            }
        }
        return g;
    }

    /*
        Drawings and Rendering Functions
    */

    // draw / render everything
    var render = function () {
        ctx.clearRect(0,0,canvas.width, canvas.height);
        //type
        ctx.fillStyle = "rgb(255, 255, 255)";
        ctx.font = "18px Helvetica";
        ctx.textAlign = "left";
        ctx.textBaseline = "top";
        ctx.fillText("Puzzle Game" , 10 , 10);
        drawShapes();
    }

    //draw all the shpaes in the list
    var drawShapes = function () {
        console.log('drawing all shapes...');
        console.log(shapes);
        var stepToDraw = state.nBuild;
        var i = 0;
        var count = shapes[stepToDraw].length;
        for(i=0; i < count; i++){
            drawShape( shapes[stepToDraw][i] );
            resetPosition();
        }
    }

    //position the next shape draw in next spot on canvas
    var resetPosition = function () {

        settings.startingX += (settings.tileSize * (N + 1) );

        //if it goes off the edge move down in Y
        if( settings.startingX + (settings.tileSize * (N) ) > canvas.width ){
            settings.startingX = constants.startingX;
            settings.startingY += (settings.tileSize * (N + 1) );
        }

    }

    //draw a shape based on an x,y tile position array
    var drawShape = function (shape) {
        drawBackground(settings.startingX,settings.startingY);
        var x = settings.startingX;
        var y = settings.startingY;
        var i = 0;
        var count = shape.length;
        for(i=0; i < count; i++){
            x = settings.startingX + (shape[i][0]) * settings.tileSize - settings.tileSize;
            y = settings.startingY + (shape[i][1]) * settings.tileSize - settings.tileSize;
            drawTile( x, y );
        }
    }

    //draw one tile on the x,y grid
    var drawTile = function ( x, y ) {
        //test shape
        ctx.fillStyle = "rgb(20,20,20)";
        ctx.lineWidth = 1;
        ctx.strokeStyle = "rgb(120,120,120)";
        ctx.fillRect( x, y, settings.tileSize, settings.tileSize );
        ctx.strokeRect( x, y, settings.tileSize, settings.tileSize );
    }

    //draw the background, the max area for this shape builder
    var drawBackground = function ( x, y ) {
        ctx.fillStyle = "rgb(65,65,65)";
        ctx.fillRect( x, y, (settings.tileSize * N), (settings.tileSize * N) );
    }

    return {
        init : init
    }

}

var game = new VPuzzle();
game.init();
