const COLORS = ["red", "blue", "green"];
const BALLS_PER_TUBE = 4;
const TUBE_COUNT = 5;
const gameDiv = document.getElementById("game");
let tubes = [];
let selected = null;

function setupGame() {
  tubes = [];
  let balls = [];
  COLORS.forEach(color => {
    for (let i = 0; i < BALLS_PER_TUBE; i++) balls.push(color);
  });
  balls = shuffle(balls);

  for (let i = 0; i < TUBE_COUNT; i++) {
    if (i < COLORS.length) {
      tubes.push(balls.splice(0, BALLS_PER_TUBE));
    } else {
      tubes.push([]);
    }
  }
  drawGame();
}

function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

function drawGame() {
  gameDiv.innerHTML = "";
  tubes.forEach((tube, index) => {
    const tubeDiv = document.createElement("div");
    tubeDiv.className = "tube";
    if (index === selected) tubeDiv.style.border = "3px solid gold";
    tube.forEach(ball => {
      const ballDiv = document.createElement("div");
      ballDiv.className = "ball";
      ballDiv.style.background = ball;
      tubeDiv.appendChild(ballDiv);
    });
    tubeDiv.addEventListener("click", () => handleClick(index));
    gameDiv.appendChild(tubeDiv);
  });
}

function handleClick(index) {
  if (selected === null && tubes[index].length) {
    selected = index;
  } else if (selected !== null && selected !== index) {
    moveBall(selected, index);
    selected = null;
  } else {
    selected = null;
  }
  drawGame();
}

function moveBall(from, to) {
  if (!tubes[from].length) return;
  if (tubes[to].length >= BALLS_PER_TUBE) return;
  const ball = tubes[from][tubes[from].length - 1];
  if (tubes[to].length && tubes[to][tubes[to].length - 1] !== ball) return;

  tubes[to].push(tubes[from].pop());
  checkWin();
}

function checkWin() {
  const win = tubes.every(tube =>
    tube.length === 0 || (tube.length === BALLS_PER_TUBE && tube.every(ball => ball === tube[0]))
  );
  if (win) alert("You Win!");
}

setupGame();
