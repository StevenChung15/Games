let board = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
  ];
  
let w; 
let h; 

let ai = 'X';
let human = 'O';
let currentPlayer = human;

function setup() {
  let canvas = createCanvas(500,500);
  canvas.parent('game');
  w = width / 3;
  h = height / 3;
  //Randomizing who goes first
  if(random(1) > 0.5){
    bestMove();
  }

}

//To help checking the rows
function equals3(a, b, c) {
  return a == b && b == c && a != '';
}

//Check if there is a Winner
function checkWinner() {
  let winner = null;

  // Horizontal
  for (let i = 0; i < 3; i++) {
    if (equals3(board[i][0], board[i][1], board[i][2])) {
      winner = board[i][0];
    }
  }

  // Vertical
  for (let i = 0; i < 3; i++) {
    if (equals3(board[0][i], board[1][i], board[2][i])) {
      winner = board[0][i];
    }
  }

  // Diagonal
  if (equals3(board[0][0], board[1][1], board[2][2])) {
    winner = board[0][0];
  }
  if (equals3(board[2][0], board[1][1], board[0][2])) {
    winner = board[2][0];
  }

  let openSpots = 0;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (board[i][j] == '') {
        openSpots++;
      }
    }
  }

  if (winner == null && openSpots == 0) {
    return 'tie';
  } 
  
  else {
    return winner;
  }
}

//Player's Movement Check
function mousePressed() {
  if (currentPlayer == human) {
    
    let i = floor(mouseX / w);
    let j = floor(mouseY / h);

    if (board[i][j] == '') {
      board[i][j] = human;
      currentPlayer = ai;
      bestMove();
    }
  }
}

//Game System Overall
function draw() {
  background(0,0,0);
  strokeWeight(10);
  stroke(255,255,255);
  
  //Vertical Line
  line(w, 0, w, height);
  line(w * 2, 0, w * 2, height);
  
  //Horizontal Line
  line(0, h, width, h);
  line(0, h * 2, width, h * 2);

  //Drawing the X and O
  for (let j = 0; j < 3; j++) {
    for (let i = 0; i < 3; i++) {
      let x = w * i + w / 2;
      let y = h * j + h / 2;
      let spot = board[i][j];
      textSize(32);
      let r = w / 4;
      if (spot == human) {
        noFill();
        ellipse(x, y, r * 2);
      } 
      
      else if (spot == ai) {
        line(x - r, y - r, x + r, y + r);
        line(x + r, y - r, x - r, y + r);
      }
    }
  }

  //Checks and Announce Winner
  let result = checkWinner();
  if (result != null) {
    noLoop();
    let resultP = createP('');
    resultP.parent('announcement');
    if (result == 'tie') {
      resultP.html('Its a Draw!');
    } 
    else if(result == ai) {
        resultP.html('Computer Wins !');
    }
    else{
      resultP.html('Human Wins !');
    }
  }
}

  