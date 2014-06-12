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

var myBoard = function() {
  this.colCon = {};
  this.majCon = {};
  this.minCon = {};
  this.rowCon = {};
};

myBoard.prototype.toggle = function (row, col) {
  this.colCon[col] = !this.colCon[col];
  this.majCon[col-row] = !this.majCon[col-row];
  this.minCon[col+row] = !this.minCon[col+row];
  this.rowCon[row] = !this.rowCon[row];
};

myBoard.prototype.hasRowConflictAt = function(row) {
  return !!this.rowCon[row];
};

myBoard.prototype.hasColConflictAt = function(col) {
  return !!this.colCon[col];
};

myBoard.prototype.hasMajorDiagonalConflictAt = function(row, col) {
  return !!this.majCon[col-row];
};

myBoard.prototype.hasMinorDiagonalConflictAt = function(row, col) {
  return !!this.minCon[col+row];
};

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

  var curBoard = new myBoard();

  var placeElemInRow = function(curCol) {
    if (curCol === n){
      solutionCount++;
      return;
    }
    for (var curRow = 0; curRow < n; curRow++){
      if (!curBoard.hasRowConflictAt(curRow)){
        curBoard.toggle(curRow, curCol);
        placeElemInRow(curCol + 1);
        curBoard.toggle(curRow, curCol);
      }
    }
  };

  // manually loop over first column for n/2 rows
  for(var i = 0; i < Math.floor(n/2); i++){
    curBoard.toggle(i, 0);
    placeElemInRow(1);
    curBoard.toggle(i, 0);
  }

  // doubling to account for symmetry
  if(n !== 1) {
    solutionCount *= 2;

    // if odd, recurse over placement in median row
    if((n % 2) === 1) {
      curBoard.toggle(Math.ceil(n/2), 0);
      placeElemInRow(1);
      curBoard.toggle(Math.ceil(n/2), 0);
    }
  } else {
    // special case: n === 1  --> loop over first column not initiated
    solutionCount = 1;
  }

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
          || curBoard.hasMajorDiagonalConflictAt(curCol - curRow)
          || curBoard.hasMinorDiagonalConflictAt(curRow + curCol))){
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

  var curBoard = new myBoard();

  var placeElemInRow = function(curCol) {
    if (curCol === n){
      solutionCount++;
      return;
    }
    for (var curRow = 0; curRow < n; curRow++){
      if (!(
          curBoard.hasRowConflictAt(curRow)
          || curBoard.hasMajorDiagonalConflictAt(curRow, curCol)
          || curBoard.hasMinorDiagonalConflictAt(curRow, curCol))) {
        curBoard.toggle(curRow, curCol);
        placeElemInRow(curCol + 1);
        curBoard.toggle(curRow, curCol);
      }
    }
  };

  // manually loop over first column for n/2 rows
  for(var i = 0; i < Math.floor(n/2); i++){
    curBoard.toggle(i, 0);
    placeElemInRow(1);
    curBoard.toggle(i, 0);
  }

  // double to account for symmetry
  if(n > 1) {
    solutionCount *= 2;

    // if odd, place in median row of column 0 and recurse over other columns
    if((n % 2) === 1) {
      curBoard.toggle(Math.ceil(n/2), 0);
      placeElemInRow(1);
      curBoard.toggle(Math.ceil(n/2), 0);
    }
  } else {
    // special case: n === 1 or 0  --> loop over first column not initiated
    solutionCount = 1;
  }

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};

// // Time Profiling:
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

// countNQueensSolutions(11);

// console.log('11', (new Date() - now));

// now = new Date();

// countNQueensSolutions(12);

// console.log('12', (new Date() - now));

// now = new Date();

// countNQueensSolutions(13);

// console.log('13', (new Date() - now));

// now = new Date();

// countNQueensSolutions(14);

// console.log('14', (new Date() - now));

// now = new Date();

// countNQueensSolutions(15);

// console.log('15', (new Date() - now));
