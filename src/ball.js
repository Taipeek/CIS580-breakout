export default class Ball {
    constructor(game) {
        this.radius = 5;
        this.game = game;
        this.paddle = game.paddle;
        this.bricks = game.bricks;
        this.width = game.canvasGameWidth;
        this.height = game.canvasGameHeigth;
        this.x = this.paddle.x1 + this.paddle.width / 2;
        this.y = this.paddle.y - this.radius;
        this.vx = 0;
        this.vy = 0;
        this.brickHitSound = new Audio("paddleHit.wav");
        this.paddleHitSound = new Audio("brickHit.wav");
        this.getPaddleAngle = this.getPaddleAngle.bind(this);
        this.update = this.update.bind(this);
        this.render = this.render.bind(this);
        this.shoot = this.shoot.bind(this);
    }

    update() {
        let collision;
        if (this.x - this.radius <= 0) this.vx = -this.vx;
        if (this.x + this.radius >= this.width) this.vx = -this.vx;
        if (this.x >= this.paddle.x1 && this.x <= this.paddle.x2 && this.y + this.radius >= this.paddle.y) return this.getPaddleAngle();
        if (this.y + this.radius >= this.height) return this.game.gameOver();
        if (this.y < this.bricks.brickWallHeight + 10)
            collision = this.bricks.checkCollision(this.x, this.y, this.radius, this.vy);
        else
            collision = 0;
        if (collision !== 0) {
            this.game.gameState.score++;
            this.brickHitSound.play();
        }
        if (collision > 0) this.vy = -this.vy;
        if (collision < 0) this.vx = -this.vx;
        else if (this.y - this.radius <= 0) this.vy = -this.vy;


        this.y = this.y + this.vy;
        this.x = this.x + this.vx;

    }

    getPaddleAngle() {
        this.vy = -this.vy;
        this.y = this.y + 2 * this.vy;
        this.x = this.x + 2 * this.vx;
        this.paddleHitSound.play();

    }

    render(context) {
        context.save();
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
        context.fillStyle = 'black';
        context.fill();
        context.restore();
    }

    shoot() {
        this.vx = this.vy = -3;
        this.y = this.y + this.vy;
        this.x = this.x + this.vx;
    }
}