/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other

window.findNRooksSolution = function(n) {
  var solution;

  var curBoard = new Board({'n': n});

  var placeElemInRow = function(curCol) {
    if(!solution) {
      if (curCol === n){
        solution = _.map(curBoard.rows(), function(innerArr) {
          return innerArr.slice(0);
        });
        return;
      }
      for (var curRow = 0; curRow < n; curRow++){
        curBoard.togglePiece(curRow, curCol);
        if (!curBoard.hasRowConflictAt(curRow)){
          placeElemInRow(curCol + 1);
        }
        curBoard.togglePiece(curRow, curCol);
      }
    }
  };

  placeElemInRow(0);

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};



// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = 0;

  var curBoard = new Board({'n': n});

  var placeElemInRow = function(curCol) {
    if (curCol === n){
      solutionCount++;
      return;
    }
    for (var curRow = 0; curRow < n; curRow++){
      curBoard.togglePiece(curRow, curCol);
      if (!curBoard.hasRowConflictAt(curRow)){
        placeElemInRow(curCol + 1);
      }
      curBoard.togglePiece(curRow, curCol);
    }
  };

  placeElemInRow(0);

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};



// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution;

  var curBoard = new Board({'n': n});

  var placeElemInRow = function(curCol) {
    if(!solution) {
      if (curCol === n){
        solution = _.map(curBoard.rows(), function(innerArr) {
          return innerArr.slice(0);
        });
        console.dir(solution);
        return;
      }
      for (var curRow = 0; curRow < n; curRow++){
        curBoard.togglePiece(curRow, curCol);
        if (!(
          curBoard.hasRowConflictAt(curRow)
          || curBoard.hasMajorDiagonalConflictAt(curBoard._getFirstRowColumnIndexForMajorDiagonalOn(curRow, curCol))
          || curBoard.hasMinorDiagonalConflictAt(curBoard._getFirstRowColumnIndexForMinorDiagonalOn(curRow, curCol)))){
          placeElemInRow(curCol + 1);
        }
        curBoard.togglePiece(curRow, curCol);
      }
    }
  };

  placeElemInRow(0);

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution || (new Board({'n':n}).rows());
};


// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = 0;

  var curBoard = new Board({'n': n});

  var placeElemInRow = function(curCol) {
    if (curCol === n){
      solutionCount++;
      return;
    }
    for (var curRow = 0; curRow < n; curRow++){
      curBoard.togglePiece(curRow, curCol);
      if (!(
          curBoard.hasRowConflictAt(curRow)
          || curBoard.hasMajorDiagonalConflictAt(curBoard._getFirstRowColumnIndexForMajorDiagonalOn(curRow, curCol))
          || curBoard.hasMinorDiagonalConflictAt(curBoard._getFirstRowColumnIndexForMinorDiagonalOn(curRow, curCol)))){
        placeElemInRow(curCol + 1);
      }
      curBoard.togglePiece(curRow, curCol);
    }
  };

  placeElemInRow(0);

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};


// Time Profiling:
// var now = new Date();

// countNQueensSolutions(5);

// console.log('5', (new Date() - now));

// now = new Date();

// countNQueensSolutions(6);

// console.log('6', (new Date() - now));
// now = new Date();

// countNQueensSolutions(7);

// console.log('7', (new Date() - now));
// now = new Date();

// countNQueensSolutions(8);

// console.log('8', (new Date() - now));
// now = new Date();

// countNQueensSolutions(9);

// console.log('9', (new Date() - now));
// now = new Date();

// countNQueensSolutions(10);

// console.log('10', (new Date() - now));

// now = new Date();

console.log(countNQueensSolutions(11));

// console.log('11', (new Date() - now));
