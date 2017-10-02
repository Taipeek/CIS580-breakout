// game.js


import Paddle from "./paddle";
import Bricks from "./bricks";
import Ball from "./ball";

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
        document.body.appendChild(this.canvas);
        this.ctx = this.canvas.getContext('2d');

        //Game state
        this.gameState = "new";


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

        // Start the game loop
        this.gameLoopInterval = setInterval(this.gameLoop, this.gameLoopSpeed);
        this.paddleLoopInterval = null;
    }


    handleKeyDown(event) {
        event.preventDefault();
        if (this.gameState === "new") {
            switch (event.key) {
                case ' ':
                    this.ball.shoot("right");
                    this.gameState = "running"
                    break;
            }
            return;
        }
        if(this.paddleLoopInterval !== null) return;
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

    clearPaddleLoop(){
        this.paddle.direction = "none";
        clearInterval(this.paddleLoopInterval);
        this.paddleLoopInterval = null;
    }

    gameOver(){
        this.gameState = "over";
        alert("over");
    }


    update() {
        if (this.gameState !== "over") {
            this.ball.update();
        }
    }


    render() {
        this.ctx.fillStyle = "white";
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.paddle.render(this.ctx);
        this.bricks.render(this.ctx);
        this.ball.render(this.ctx);

    }

    gameLoop() {
        this.update();
        this.render();
    }

    paddleLoop(){
        this.paddle.move();
    }

}
