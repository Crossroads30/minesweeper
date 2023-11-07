

const conteiner = document.createElement('div');
document.body.append(conteiner);
conteiner.className = 'conteiner';

const gameTitle = document.createElement('h1');
conteiner.append(gameTitle);
gameTitle.className = 'title';
gameTitle.innerHTML = 'Minesweeper';

const timer = document.createElement('div');
conteiner.append(timer);
timer.className = 'timer';
timer.innerHTML = '<span class="time">00:00:000</span> <span class="timer">Moves: <a id="clicks">0</a></span>';
timer.style.display = 'none';

const levelRequest = document.createElement('p');
conteiner.append(levelRequest);
levelRequest.className = 'request';
levelRequest.innerHTML = 'Please select a difficulty level!';


// const clicker = document.createElement('div');
// conteiner.append(clicker);
// clicker.className = 'timer';
// clicker.innerHTML = '<p>Moves: <a id="clicks">0</a></p>';

let clicks = 0;
let moves = true;

// const fieldSize = document.createElement('div');
// conteiner.append(fieldSize);
// fieldSize.className = 'field-size';
// fieldSize.innerHTML = "Field Size: <input id='fieldsize' class='field-input' 'type='text' maxlength='2' onchange='' value='10'> <input id='setButton' type='button' value='Set'>";
// let fieldSizeValue;

// async function setSize() {
// fieldSizeValue = document.getElementById('fieldsize').value;
// }
// setSize()
// console.log(fieldSizeValue);

// let fieldSizeValue;

let playingField = document.createElement('div');
// conteiner.append(playingField);
playingField.className = 'playing-field';
playingField.id = 'field';
// playingField.style.gridTemplateColumns = `repeat(${fieldSizeValue}, 50px)`;
// playingField.style.gridTemplateRows = `repeat(${fieldSizeValue}, 50px)`;

// playingField.addEventListener('click', moveCounter);

playingField = [];

// let minesCount = 10;
let minesCount;
let minesLeft = minesCount;



const minesLocation = [];

let rows; 
let columns;
let gameOver = false;
let cellsClicked = 0;

let lap = document.querySelector('.lap');
let p = document.querySelector('.time');
let h6 = document.querySelectorAll('h6');
let startTime;
let RAF;
let ms;
let s;
let m;
let laps = Date.now(0);
let timeRun = false;

function add(x, y) {
   let s = '00' + x;
   return s.substring(s.length - y)
};

function clockRun() {
   ms = Date.now() - startTime;
   s = Math.floor(ms / 1000);
   ms = ms % 1000;
   m = Math.floor(s / 60);
   s = s % 60;
   p.innerHTML = [add(m, 2), add(s, 2), add(ms, 3)].join(':');
   RAF = requestAnimationFrame(clockRun);
};

function startTimer() {
   let cells = document.querySelectorAll('.cell');

   cells.forEach((el) => {
      el.addEventListener('click', () => {
         if (timeRun == false) {
            startTime = Date.now();
            clockRun();
            timeRun = true;
         }
      })
   })
};


function setMines() {
   let bombsLeft = minesCount;
   while (bombsLeft > 0) {
      let r = Math.floor(Math.random() * rows);
      let c = Math.floor(Math.random() * columns);
      let id = r.toString() + "-" + c.toString();
      if (!minesLocation.includes(id)) {
         minesLocation.push(id);
         bombsLeft -= 1;
      }
   }
};
let game = false;
// document.addEventListener('click', function(e) {
//    console.log(e.target)
// });

// createGame();
setLevel();

function setLevel() {
   const levelSwitcher = document.createElement('div');
   levelSwitcher.className = 'level-switcher'
   levelSwitcher.innerHTML = ' <div><input class="level-easy switcher-level" type="radio"></input><span>easy</span></div>';
   levelSwitcher.innerHTML += ' <div><input class="level-medium switcher-level" type="radio"></input><span>medium</span></div>';
   levelSwitcher.innerHTML += ' <div><input class="level-hard switcher-level" type="radio"></input><span>hard</span></div>';
   conteiner.append(levelSwitcher);
   levelSwitcher.addEventListener('click', () => {
      if (game == true) {
         return
      } else if (document.querySelector('.level-easy').checked) {
         minesCount = 5;
         minesLeft = minesCount;
         minesCountSection.innerHTML = `Mines: ${minesLeft}`;
         rows = 10;
         columns = rows;
         let playingField = document.createElement('div');
         conteiner.append(playingField);
         playingField.className = 'playing-field';
         playingField.id = 'field';
         playingField.style.gridTemplateColumns = `repeat(${rows}, 50px)`;
         playingField.style.gridTemplateRows = `repeat(${rows}, 50px)`;
         levelRequest.style.display = 'none';
         levelSwitcher.style.display = 'none';
         timer.style.display = 'block';
         createGame();
         startTimer();
         game = true;
      } else if (document.querySelector('.level-medium').checked) {
         minesCount = 12;
         minesLeft = minesCount;
         minesCountSection.innerHTML = `Mines: ${minesLeft}`;
         rows = 12;
         columns = rows;
         let playingField = document.createElement('div');
         conteiner.append(playingField);
         playingField.className = 'playing-field';
         playingField.id = 'field';
         playingField.style.gridTemplateColumns = `repeat(${rows}, 50px)`;
         playingField.style.gridTemplateRows = `repeat(${rows}, 50px)`;
         levelRequest.style.display = 'none';
         levelSwitcher.style.display = 'none';
         timer.style.display = 'block';
         createGame();
         startTimer();
         game = true;
      } else if (document.querySelector('.level-hard').checked) {
         minesCount = 30;
         minesLeft = minesCount;
         minesCountSection.innerHTML = `Mines: ${minesLeft}`;
         rows = 14;
         columns = rows;
         let playingField = document.createElement('div');
         conteiner.append(playingField);
         playingField.className = 'playing-field';
         playingField.id = 'field';
         playingField.style.gridTemplateColumns = `repeat(${rows}, 50px)`;
         playingField.style.gridTemplateRows = `repeat(${rows}, 50px)`;
         levelRequest.style.display = 'none';
         levelSwitcher.style.display = 'none';
         timer.style.display = 'block';
         createGame();
         startTimer();
         game = true;
      }
   })
}

const minesCountSection = document.createElement('h2');
conteiner.append(minesCountSection);
minesCountSection.className = 'mines-count';


function createGame() {
   setMines();

   for (let r = 0; r < rows; r++) {
      let row = [];
      for (let c = 0; c < columns; c++) {
         let cell = document.createElement("div");
         cell.id = r.toString() + "-" + c.toString();
         cell.addEventListener('click', clickOnCell);
         document.getElementById("field").append(cell);
         cell.className = 'cell active';
         row.push(cell);

         cell.oncontextmenu = function () {
            if (gameOver) {
               return;
            }
            if (cell.innerHTML == '') {
               cell.innerHTML = "🚩";
               minesLeft -= 1;
               minesCountSection.innerHTML = `Mines: ${minesLeft}`;
               setFlagSound();
            }
            else if (cell.innerHTML == "🚩") {
               cell.innerHTML = "";
               minesLeft += 1;
               minesCountSection.innerHTML = `Mines: ${minesLeft}`;
               removeFlagSound();
            }
            return false;
         }
      }
      playingField.push(row);
   };

   function setFlagSound() {
      let flagSound = new Audio();
      flagSound.preload = 'auto';
      flagSound.src = './sound/set-flag-sound.mp3';
      flagSound.play();
   };

   function removeFlagSound() {
      let removeflagSound = new Audio();
      removeflagSound.preload = 'auto';
      removeflagSound.src = './sound/remove-flag-sound.mp3';
      removeflagSound.play();
   }

   function clickOnCell() {
      if (gameOver || this.classList.contains("cell-clicked")) {
         return;
      }
      moveCounter();
      clickSound();

      let cell = this;

      if (minesLocation.includes(cell.id) && cell.innerText !== "🚩") {
         timeRun = true;
         showBombs();
         gameOver = true;
         let cells = document.querySelectorAll('.cell');
         cells.forEach((el) => {
            el.style.pointerEvents = 'none';
         })
         boomSound();
         setTimeout(loseSound, 1000);
         return;
      }
      else if (cell.innerText == "🚩") {
         return;
      }

      let numbersOfBombsArownd = cell.id.split("-");
      let r = parseInt(numbersOfBombsArownd[0]);
      let c = parseInt(numbersOfBombsArownd[1]);
      checkBomb(r, c);
   };

   function clickSound() {
      let clickSound = new Audio();
      clickSound.preload = 'auto';
      clickSound.src = './sound/click-sound.mp3';
      clickSound.play();
   };

   function boomSound() {
      let clickBoom = new Audio();
      clickBoom.preload = 'auto';
      clickBoom.src = './sound/boom-sound.mp3';
      clickBoom.play();
   };

   function loseSound() {
      let youLoseSound = new Audio();
      youLoseSound.preload = 'auto';
      youLoseSound.src = './sound/lose-sound.mp3';
      youLoseSound.play();
   };

   function showBombs() {
      for (let r = 0; r < rows; r++) {
         for (let c = 0; c < columns; c++) {
            let cell = playingField[r][c];
            if (minesLocation.includes(cell.id)) {
               cell.innerText = "💣";
               cell.style.background = "linear-gradient(to bottom, red, #ccc)";
               minesCountSection.innerHTML = "Game over. Try again";
               cancelAnimationFrame(RAF);
               gameOver = true;
               timeRun = true;
               moves = false;
            }
         }
      }
      let newGameButton = document.createElement('button');
      conteiner.append(newGameButton);
      newGameButton.className = 'game-button';
      newGameButton.innerText = "New Game";

      newGameButton.addEventListener('click', () => {
         window.location.reload();
      })
   }
};

function moveCounter() {
   if (moves == true) {
      clicks += 1;
      document.getElementById("clicks").innerHTML = clicks;
   }
};

function checkBomb(r, c) {
   if (r < 0 || r >= rows || c < 0 || c >= columns) {
      return;
   }

   if (playingField[r][c].classList.contains("cell-clicked")) {
      return;
   }

   playingField[r][c].classList.add("cell-clicked");
   playingField[r][c].classList.remove("active");

   cellsClicked += 1;

   let bombsFound = 0;

   //top 3
   bombsFound += checkCell(r - 1, c - 1);      //top left
   bombsFound += checkCell(r - 1, c);        //top 
   bombsFound += checkCell(r - 1, c + 1);      //top right

   //left and right
   bombsFound += checkCell(r, c - 1);        //left
   bombsFound += checkCell(r, c + 1);        //right

   //bottom 3
   bombsFound += checkCell(r + 1, c - 1);      //bottom left
   bombsFound += checkCell(r + 1, c);        //bottom 
   bombsFound += checkCell(r + 1, c + 1);      //bottom right

   if (bombsFound > 0) {
      playingField[r][c].innerText = bombsFound;
      playingField[r][c].classList.add("n" + bombsFound.toString());
   } else {
      //top 3
      checkBomb(r - 1, c - 1);    //top left
      checkBomb(r - 1, c);      //top
      checkBomb(r - 1, c + 1);    //top right

      //left and right
      checkBomb(r, c - 1);      //left
      checkBomb(r, c + 1);      //right

      //bottom 3
      checkBomb(r + 1, c - 1);    //bottom left
      checkBomb(r + 1, c);      //bottom
      checkBomb(r + 1, c + 1);    //bottom right
   }

   if (cellsClicked === rows * columns - minesCount) {
      winSound();
      minesCount = "Cleared!";
      let message = document.createElement('p');
      message.className = 'win-message';
      message.innerHTML = `Hooray! You found all mines in ${p.innerText} seconds and ${clicks} moves!`
      conteiner.append(message);
      minesCountSection.innerHTML = `Mines: ${minesCount}`;
      cancelAnimationFrame(RAF);
      gameOver = true;
      moves = false;
      timeRun = true;
      let movesNumb = document.getElementById('clicks');
      movesNumb.innerHTML = `${clicks}`;
      // clicker.innerHTML = `<p>Moves: <a id="clicks">${clicks+1}</a></p>`;
      let cells = document.querySelectorAll('.cell');
      cells.forEach((el) => {
         el.style.pointerEvents = 'none';
      })

      function winSound() {
         let youWinSound = new Audio();
         youWinSound.preload = 'auto';
         youWinSound.src = './sound/win-sound.mp3';
         youWinSound.play();
      };

      let newGameButton = document.createElement('button');
      conteiner.append(newGameButton);
      newGameButton.className = 'game-button';
      newGameButton.innerText = "New Game";

      newGameButton.addEventListener('click', () => {
         window.location.reload();
      })
   }
};

function checkCell(r, c) {
   if (r < 0 || r >= rows || c < 0 || c >= columns) {
      return 0;
   }
   if (minesLocation.includes(r.toString() + "-" + c.toString())) {
      return 1;
   }
   return 0;
};


