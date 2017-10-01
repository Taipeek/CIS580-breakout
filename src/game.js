// game.js


import Paddle from "./paddle";
import Bricks from "./bricks";
import Ball from "./ball";

export default class Game {
    constructor() {

        // Create the screen buffer canvas
        this.canvas = document.createElement('canvas');
        this.canvas.width = 80;
        this.canvas.height = 50;
        document.body.appendChild(this.canvas);
        this.ctx = this.canvas.getContext('2d');

        //Game state
        this.gameState = "new";


        // Bind class functions
        this.handleKeyDow = this.handleKeyDown.bind(this);
        this.update = this.update.bind(this);
        this.render = this.render.bind(this);
        this.loop = this.loop.bind(this);
        window.onkeydown = this.handleKeyDow;

        //Create game objects
        this.paddle = new Paddle(this.canvas.width, this.canvas.height);
        this.bricks = new Bricks(this.canvas.width, this.canvas.height);
        this.ball = new Ball(this);

        // Start the game loop
        this.interval = setInterval(this.loop, 300);
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
        switch (event.key) {
            case 'a':
            case 'ArrowLeft':
                this.paddle.move("left");
                break;
            case 'd':
            case 'ArrowRight':
                this.paddle.move("right");
                break;
        }
        this.render();
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

    loop() {
        this.update();
        this.render();
    }
}
