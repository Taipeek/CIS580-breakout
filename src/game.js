// game.js


import Paddle from "./paddle";
import Bricks from "./bricks";
import Ball from "./ball";
import ScoreBoard from "./scoreBoard";

export default class Game {
    constructor() {
        //Game state
        this.gameState = {};

        // Create the screen buffer canvas
        this.canvas = document.createElement('canvas');
        this.canvasGameHeigth = 550;
        this.canvasGameWidth = 800;
        this.canvas.width = 800;
        this.canvas.height = this.canvasGameHeigth + 20;
        this.gameLoopSpeed = function () {
            return 10 - (this.gameState.level);
        };
        this.paddleLoopSpeed = 5;
        this.gameOverSound = new Audio("gameOver.wav");
        document.body.appendChild(this.canvas);
        this.ctx = this.canvas.getContext('2d');


        // Bind class functions
        this.handleKeyDow = this.handleKeyDown.bind(this);
        this.handleKeyUp = this.handleKeyUp.bind(this);
        this.clearPaddleLoop = this.clearPaddleLoop.bind(this);
        this.newGame = this.newGame.bind(this);
        this.update = this.update.bind(this);
        this.render = this.render.bind(this);
        this.gameLoop = this.gameLoop.bind(this);
        this.paddleLoop = this.paddleLoop.bind(this);
        window.onkeydown = this.handleKeyDow;
        window.onkeyup = this.handleKeyUp;

        //initial render
        this.newGame();
        setTimeout(() => {
            //just waiting to load image
            this.render();
        }, 500);

    }

    newGame() {
        this.gameState = {
            status: "new",
            score: 0,
            lives: 3,
            level: 1
        };
        //Create game objects
        this.paddle = new Paddle(this.canvasGameWidth, this.canvasGameHeigth);
        this.bricks = new Bricks(this.canvasGameWidth, this.canvasGameHeigth);
        this.ball = new Ball(this);
        this.scoreBoard = new ScoreBoard(0, this.canvasGameHeigth, this.canvas.width, this.canvas.height - this.canvasGameHeigth);

        // Start the game loop
        this.gameLoopInterval = null;
        this.paddleLoopInterval = null;

    }

    handleKeyDown(event) {
        event.preventDefault();
        if (this.gameState.status !== "running") {
            switch (event.key) {
                case ' ':
                    if (this.gameState.status === "over") {
                        this.newGame();
                        return;
                    }
                    this.ball.shoot();
                    this.gameLoopInterval = setInterval(this.gameLoop, this.gameLoopSpeed());
                    this.gameState.status = "running";
                    break;
            }
            return;
        }
        switch (event.key) {
            case 'a':
            case 'ArrowLeft':
                if (this.paddle.cancelLeft || this.paddle.direction === "left") return;
                if (this.paddle.direction === "right") {
                    this.paddle.cancelRight = true;
                }
                this.paddle.direction = "left";
                if (this.paddleLoopInterval === null)
                    this.paddleLoopInterval = setInterval(this.paddleLoop, this.paddleLoopSpeed);
                break;
            case 'd':
            case 'ArrowRight':
                if (this.paddle.cancelRight || this.paddle.direction === "right") return;
                if (this.paddle.direction === "left") {
                    this.paddle.cancelLeft = true;
                }
                this.paddle.direction = "right";
                if (this.paddleLoopInterval === null)
                    this.paddleLoopInterval = setInterval(this.paddleLoop, this.paddleLoopSpeed);
                break;
        }
    }

    handleKeyUp(event) {
        event.preventDefault();
        switch (event.key) {
            case 'a':
            case 'ArrowLeft':
                if (this.paddle.direction === "left")
                    this.clearPaddleLoop();
                this.paddle.cancelLeft = false;
                break;
            case 'd':
            case 'ArrowRight':
                if (this.paddle.direction === "right")
                    this.clearPaddleLoop();
                this.paddle.cancelRight = false;
                break;
        }
        this.render();
    }

    clearPaddleLoop() {
        this.paddle.direction = "none";
        clearInterval(this.paddleLoopInterval);
        this.paddleLoopInterval = null;
    }

    gameOver() {
        if (--this.gameState.lives >= 1) {
            this.paddle = new Paddle(this.canvasGameWidth, this.canvasGameHeigth);
            this.ball = new Ball(this);
            this.gameState.status = "standby";
            clearInterval(this.gameLoopInterval);
            clearInterval(this.paddleLoopInterval);
            this.gameLoopInterval = this.paddleLoopInterval = null;
            return;
        }
        this.gameState.status = "over";
        clearInterval(this.gameLoopInterval);
        this.gameLoopInterval = null;
        this.gameOverSound.play();
        this.scoreBoard.renderGameOver(this.ctx, this.gameState);

    }


    nextLevel() {
        this.bricks = new Bricks(this.canvasGameWidth, this.canvasGameHeigth);
        this.ball.bricks = this.bricks;
        this.gameState.level++;
        clearInterval(this.gameLoopInterval);
        this.gameLoopInterval = setInterval(this.gameLoop, this.gameLoopSpeed());
    }


    update() {
        if (this.gameState.status === "running") {
            this.ball.update();
            if (this.bricks.brickCount === 0)
                this.nextLevel();
        }
    }


    render() {
        this.ctx.fillStyle = "white";
        this.ctx.strokeStyle = "black";
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.paddle.render(this.ctx);
        this.bricks.render(this.ctx);
        this.ball.render(this.ctx);
        this.scoreBoard.render(this.ctx, this.gameState);
        this.scoreBoard.renderGameOver(this.ctx, this.gameState)
    }

    gameLoop() {
        this.update();
        this.render();
    }

    paddleLoop() {
        this.paddle.move();
    }

}
