const buttonUp = document.getElementById('up');
const buttonLeft = document.getElementById('left');
const buttonDown = document.getElementById('down');
const buttonRight = document.getElementById('right');

const cvs = document.getElementById('snake');
const ctx = cvs.getContext('2d')

// Create unit
const box = 32

// Load Images
const groundImg = new Image()
groundImg.src = './assets/ground.png';

const foodImg = new Image()
foodImg.src = './assets/food.png';

const head_upImg = new Image()
head_upImg.src = './assets/head_up.png';

const head_downImg = new Image()
head_downImg.src = './assets/head_down.png';

const head_rightImg = new Image()
head_rightImg.src = './assets/head_right.png';

const head_leftImg = new Image()
head_leftImg.src = './assets/head_left.png';

const bodyImg = new Image()
bodyImg.src = './assets/body.png';

// Create Snake
let snake = [];
snake[0] = {
  x: 9*box,
  y: 10*box
}

// Create food
let food = {
  x: Math.floor(Math.random() * 17+1) * box,
  y: Math.floor(Math.random() * 15+3) * box
}

// Create Score
let score = 0;

// Declare
let d;

// Control the Snake via Onscreen buttons
buttonUp.addEventListener('click', () => {
  d = 'UP';
})
buttonLeft.addEventListener('click', () => {
  d = 'LEFT';
})
buttonDown.addEventListener('click', () => {
  d = 'DOWN';
})
buttonRight.addEventListener('click', () => {
  d = 'RIGHT';
})

// Control the Snake via Keyboard
document.addEventListener('keydown', (direction) => {
  if(event.keyCode == 37 && d != 'RIGHT') {
    d = 'LEFT';
  } else if(event.keyCode == 38 && d != 'DOWN') {
    d = 'UP';
  } else if(event.keyCode == 39 && d != 'LEFT') {
    d = 'RIGHT';
  } else if(event.keyCode == 40 && d != 'UP') {
    d = 'DOWN';
  }
});

// Check Collision
function collision(head, array) {
  for (let i = 0; i < array.length; i++) {
    if (head.x == array[i].x && head.y == array[i].y) {
      return true;
    }
  }
  return false;
}

// Draw everything
function draw() {
  ctx.drawImage(groundImg, 0, 0);

  for (let i = 0; i < snake.length; i++) {
    if (i == 0) {
      if (d == 'UP') {
        ctx.drawImage(head_upImg, snake[0].x, snake[0].y);
      } else if (d == 'DOWN') {
        ctx.drawImage(head_downImg, snake[0].x, snake[0].y);
      } else if (d == 'RIGHT') {
        ctx.drawImage(head_rightImg, snake[0].x, snake[0].y);
      } else if (d == 'LEFT') {
        ctx.drawImage(head_leftImg, snake[0].x, snake[0].y);
      } else {
        ctx.drawImage(head_upImg, snake[0].x, snake[0].y);
      }
    }
    else {
      ctx.drawImage(bodyImg, snake[i].x, snake[i].y);
    }
  }

  ctx.drawImage(foodImg, food.x, food.y);

  // Old Head Position
  let snakeX = snake[0].x;
  let snakeY = snake[0].y;

  // Check Driection
  if (d == 'LEFT') snakeX -= box;
  if (d == 'RIGHT') snakeX += box;
  if (d == 'UP') snakeY -= box;
  if (d == 'DOWN') snakeY += box;

  // Increment snake Length if she eats food
  if(snakeX == food.x && snakeY == food.y) {

    // Increase the Score
    score++;

    // Generate new Food
    food = {
      x: Math.floor(Math.random() * 17+1) * box,
      y: Math.floor(Math.random() * 15+3) * box
    }
    // Don't remove the Tail
  } else {
      // Remove the Tail
      snake.pop()
  }

  // Add new Head
  let newHead = {
    x: snakeX,
    y: snakeY
  }

  // Game Over
  if(snakeX < box || snakeX > 17 * box || snakeY < 3 * box || snakeY > 17 * box || collision(newHead, snake)) {
    clearInterval(game);
  }

  // Put new hat at the first Position in the Array
  snake.unshift(newHead);

  ctx.fillStyle = 'white';
  ctx.font = '45px Changa one';
  ctx.fillText(score, 2.5*box, 1.5*box);
}

// Call Draw-Function every 100 ms
let game = setInterval(draw, 200)
