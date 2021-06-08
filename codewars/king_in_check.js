/*
|---|---|---|---|---|---|---|---|
|   |   |   |   |   |   |   |   |
|---|---|---|---|---|---|---|---|
|   |   |   | ♜ |   |   |   |   |
|---|---|---|---|---|---|---|---|
|   |   |   |   |   |   |   |   |
|---|---|---|---|---|---|---|---|
|   |   |   | ♔ |   |   |   |   |
|---|---|---|---|---|---|---|---|
|   |   |   |   |   |   |   |   |
|---|---|---|---|---|---|---|---|
|   |   |   |   |   |   |   |   |
|---|---|---|---|---|---|---|---|
|   |   |   |   |   |   |   |   |
|---|---|---|---|---|---|---|---|
|   |   |   |   |   |   |   |   |
|---|---|---|---|---|---|---|---|
*/

function kingIsInCheck (chessboard) {
    // Parse the board
    var king = -1;
    var out = false;
    // find the king, then check in every direction that he could be checked
    for(let i = 0; i < chessboard.length; i++) {
        index = chessboard[i].indexOf('♔');
        if (index !== -1) {
            king = [i, index];
            break;
        }
    }

    // ROOK AND QUEEN 
    // Check the horizontal
    out |= clearDirection(chessboard, c => [king[0], king[1] - c], c => '♜♛')
    out |= clearDirection(chessboard, c => [king[0], king[1] + c], c => '♜♛')
    
    // Check the vertical
    out |= clearDirection(chessboard, c => [king[0] - c, king[1]], c => '♜♛')
    out |= clearDirection(chessboard, c => [king[0] + c, king[1]], c => '♜♛') 

    // BISHOP QUEEN PAWN
    // Go diagonal (down left)
    out |= clearDirection(chessboard, c=> [king[0] - c, king[1] - c], c => (c == 1) ? '♟♝♛' : '♝♛')
    out |= clearDirection(chessboard, c=> [king[0] - c, king[1] + c], c => (c == 1) ? '♟♝♛' : '♝♛')
        
    // BISHOP QUEEN (NO PAWN)
    // Go diagonal (up left)
    out |= clearDirection(chessboard, c=> [king[0] + c, king[1] - c], c => '♝♛')
        
    // Go diagonal (up right)
    out |= clearDirection(chessboard, c=> [king[0] + c, king[1] + c], c => '♝♛')
    
    // KNIGHT
    // Slightly different approach as we must check all valid squares (rather than until the first invalid one)
    let dirs = [[-2, -1], [-2, 1], [1, 2], [1, -2], [2, 1], [2, -1], [-1, 2], [-1, -2]]
    for(let i = 0; i < 8; i++) {
        let square = [king[0] + dirs[i][0], king[1] + dirs[i][1]]
        if(isValid(square) && chessboard[square[0]][square[1]] == '♞')
            return true;
    }

    return out; 
}

// Given the chessboard, the king position, and a function to iterate 
// The iterate function should take a count and the king pos and return an array size 2 of [row, col] of the next square
// cond is a function that returns the pieces we are looking for based on count
function clearDirection(chessboard, iterate, cond) {
    let count = 1
    let nextSquare = iterate(count)
    while(isValid(nextSquare)) {
        if(cond(count).includes(chessboard[nextSquare[0]][nextSquare[1]]))
            return true;
        
        if(chessboard[nextSquare[0]][nextSquare[1]] !== ' ') 
            return false;
        
        nextSquare = iterate(++count)
    }
}

var isValid = (square) => square[0] < 8 && square[0] >= 0 && square[1] < 8 && square[1] >= 0;

function doSampleTest(chessboard, expected, description) {
    console.log('Attempting: ' + description);
    console.log((kingIsInCheck(chessboard) == expected ? "Passed!" : "Failed"));
}

var chessboard = "";

chessboard = [
		[' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
		[' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
		[' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
		[' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
		[' ', ' ', ' ', '♟', ' ', ' ', ' ', ' '],
		[' ', ' ', '♔', ' ', ' ', ' ', ' ', ' '],
		[' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
		[' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ']];

doSampleTest(chessboard, true, 'pawn');


chessboard = [
		[' ', ' ', ' ', ' ', ' ', ' ', ' ', '♝'],
		[' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
		[' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
		[' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
		[' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
		[' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
		[' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
		['♔', ' ', ' ', ' ', ' ', ' ', ' ', ' ']];

doSampleTest(chessboard, true, 'bishop');

chessboard = [
		[' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
		[' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
		[' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
		[' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
		[' ', ' ', '♔', ' ', ' ', '♜', ' ', ' '],
		[' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
		[' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
		[' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ']];

doSampleTest(chessboard, true, 'rook');

chessboard = [
		[' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
		[' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
		[' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
		[' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
		[' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
		[' ', '♔', ' ', ' ', ' ', ' ', ' ', ' '],
		[' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
		['♞', ' ', ' ', ' ', ' ', ' ', ' ', ' ']];

doSampleTest(chessboard, true, 'knight');

chessboard = [
		[' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
		[' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
		[' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
		[' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
		[' ', '♛', ' ', '♔', ' ', ' ', ' ', ' '],
		[' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
		[' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
		[' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ']];

doSampleTest(chessboard, true, 'queen horizontal');

chessboard = [
		[' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
		[' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
		[' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
		[' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
		[' ', ' ', ' ', '♔', ' ', ' ', ' ', ' '],
		[' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
		[' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
		[' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ']];

doSampleTest(chessboard, false, 'empty');

chessboard = [
		[' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
		[' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
		[' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
		['♛', ' ', ' ', '♞', ' ', ' ', ' ', '♛'],
		[' ', ' ', ' ', '♔', ' ', ' ', ' ', ' '],
		[' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
		[' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
		[' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ']];

doSampleTest(chessboard, false, 'multiple pieces, no check');

chessboard = [
		[' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
		[' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
		[' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
		[' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
		['♜', ' ', '♝', '♔', ' ', ' ', ' ', ' '],
		[' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
		[' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
		[' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ']];

doSampleTest(chessboard, false, 'blocked');