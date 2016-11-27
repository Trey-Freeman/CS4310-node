(function() {
	$(document).ready(function() {
		//Canvas stuff
		var canvas = $('#canvas')[0];
		var canvasContext = canvas.getContext('2d');
		var canvasWidth = canvas.width;
		var canvasHeight = canvas.height;

		//Initialize cellWidth and pther important variables to keep track
		var cellWidth = 10;
		var direction;
		var food;
		var score;

		//Snake, an array of cells to make up the snake
		var snake;

		/* Initialize the canvas game */
		function init() {
			direction = 'right';
			createSnake();
			createFood();
			if(typeof gameLoop !== "undefined") clearInterval(gameLoop);
			gameLoop = setInterval(drawSnake, 60);
		}

		/* Initialize the snake */
		function createSnake() {
			var snakeLength = 5;
			snake = [];
			for (var i = snakeLength - 1; i >= 0; i--) {
				snake.push({x: i, y:0});
			}
		}

		/* Randomly create the food for the snake */
		function createFood() {
			food = {
				x: Math.round(Math.random() * (canvasWidth - cellWidth)/cellWidth),
				y: Math.round(Math.random() * (canvasHeight - cellWidth)/cellWidth)
			}
		}

		function drawSnake() {
			//Set fill style
			canvasContext.fillStyle = 'white';
			//Fill the canvas with white, need to repaint the canvas with each move
			canvasContext.fillRect(0, 0, canvasWidth, canvasHeight);

			//Logic for moving snake (pop the tail cell and push it to the front of the snake)
			var nextX = snake[0].x;
			var nextY = snake[0].y;
			//Increment these positions depending on movements so that we have new coordinates for the next cell
			switch(direction) {
				case 'right':
					nextX++;
					break;
				case 'left':
					nextX--;
					break;
				case 'up':
					nextY++;
					break;
				case 'down':
					nextY--;
					break;
			}

			//Add cases for the snake hitting its own body and hitting the walls
			if(nextX === -1 || nextX === canvasWidth/cellWidth 
				|| nextY === -1 || nextY === canvasHeight/cellWidth || checkCollision(nextX, nextY, snake)) {
				//restart the game
				init();
				return;
			}

			//Handle case where the snake collides with the food (if the head position matches food position, add new head)
			if(nextX === food.x && nextY === food.y) {
				var tail = {x: nextX, y: nextY}
				//recreate food
				createFood();
			} else {
				var tail = snake.pop();
				tail.x = nextX;
				tail.y = nextY;
			}

			//Add tail to the head of our snake
			snake.unshift(tail);

			//Draw the snake
			for (var i = 0; i < snake.length; i++) {
				var cell = snake[i];
				//Draw the cells
				drawCell(cell.x, cell.y);
			}

			//Draw food
			drawCell(food.x, food.y);

		}

		function drawCell(x, y) {
			canvasContext.fillStyle = 'black';
			canvasContext.fillRect(x * cellWidth, y * cellWidth, cellWidth, cellWidth);
		}

		function checkCollision(x, y, array) {
			//This function will check if the provided x/y coordinates exist
			//in an array of cells or not
			for(var i = 0; i < array.length; i++) {
				if(array[i].x === x && array[i].y === y)
				 return true;
			}
			return false;
		}

		//Add the keyboard controls
		$(document).keydown(function(e){
			e.preventDefault();
			var key = e.which;
			//Doesn't allow snake to go backwards
			if(key == "37" && direction != "right") direction = "left";
			else if(key == "40" && direction != "down") direction = "up";
			else if(key == "39" && direction != "left") direction = "right";
			else if(key == "38" && direction != "up") direction = "down";
		});

		init();
	});
})();