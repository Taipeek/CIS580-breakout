// game.js


import Paddle from "./paddle";
import Bricks from "./bricks";
import Ball from "./ball";
import ScoreBoard from "./scoreBoard";

export default class Game {
    constructor() {

        // Create the screen buffer canvas
        this.canvas = document.createElement('canvas');
        this.canvasGameHeigth = 500;
        this.canvasGameWidth = 800;
        this.canvas.width = 800;
        this.canvas.height = 520;
        this.gameLoopSpeed = 5;
        this.paddleLoopSpeed = 5;
        this.gameOverSound = new Audio(process.env.PUBLIC_URL +"./gameOver.waw");
        document.body.appendChild(this.canvas);
        this.ctx = this.canvas.getContext('2d');

        //Game state
        this.gameState = {
            status: "new",
            score: 0,
            lives: 3
        };


        // Bind class functions
        this.handleKeyDow = this.handleKeyDown.bind(this);
        this.handleKeyUp = this.handleKeyUp.bind(this);
        this.clearPaddleLoop = this.clearPaddleLoop.bind(this);
        this.update = this.update.bind(this);
        this.render = this.render.bind(this);
        this.gameLoop = this.gameLoop.bind(this);
        this.paddleLoop = this.paddleLoop.bind(this);
        window.onkeydown = this.handleKeyDow;
        window.onkeyup = this.handleKeyUp;

        //Create game objects
        this.paddle = new Paddle(this.canvasGameWidth, this.canvasGameHeigth);
        this.bricks = new Bricks(this.canvasGameWidth, this.canvasGameHeigth);
        this.ball = new Ball(this);
        this.scoreBoard = new ScoreBoard(0, this.canvasGameHeigth, this.canvas.width, this.canvas.height - this.canvasGameHeigth);

        // Start the game loop
        this.gameLoopInterval = null;
        this.paddleLoopInterval = null;

        //initial render
        this.render();
    }


    handleKeyDown(event) {
        event.preventDefault();
        if (this.gameState.status === "new" || this.gameState.status === "standby") {
            switch (event.key) {
                case ' ':
                    this.ball.shoot();
                    this.gameLoopInterval = setInterval(this.gameLoop, this.gameLoopSpeed);
                    this.gameState.status = "running"
                    break;
            }
            return;
        }
        if (this.paddleLoopInterval !== null) return;
        switch (event.key) {
            case 'a':
            case 'ArrowLeft':
                this.paddle.direction = "left";
                this.paddleLoopInterval = setInterval(this.paddleLoop, this.paddleLoopSpeed);
                break;
            case 'd':
            case 'ArrowRight':
                this.paddle.direction = "right";
                this.paddleLoopInterval = setInterval(this.paddleLoop, this.paddleLoopSpeed);
                break;
        }
        this.render();
    }

    handleKeyUp(event) {
        event.preventDefault();
        switch (event.key) {
            case 'a':
            case 'ArrowLeft':
                this.clearPaddleLoop();
                break;
            case 'd':
            case 'ArrowRight':
                this.clearPaddleLoop();
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
        if(--this.gameState.lives >= 1) {
            this.paddle = new Paddle(this.canvasGameWidth, this.canvasGameHeigth);
            this.ball = new Ball(this);
            this.gameState.status = "standby";
            clearInterval(this.gameLoopInterval);
            this.gameLoopInterval = null;
            return;
        }
        this.gameState.status = "over";
        clearInterval(this.gameLoopInterval);
        this.gameLoopInterval = null;
        this.gameOverSound.play();

    }


    update() {
        if (this.gameState.status === "running") {
            this.ball.update();
        }
    }


    render() {
        this.ctx.fillStyle = "white";
        this.ctx.strokeStyle = "black";
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.paddle.render(this.ctx);
        this.bricks.render(this.ctx);
        this.ball.render(this.ctx);
        this.scoreBoard.render(this.ctx,this.gameState);

    }

    gameLoop() {
        this.update();
        this.render();
    }

    paddleLoop() {
        this.paddle.move();
    }

}
