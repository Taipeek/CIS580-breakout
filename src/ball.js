export default class Ball {
    constructor(game) {
        this.game = game;
        this.paddle = game.paddle;
        this.bricks = game.bricks;
        this.width = game.canvas.width;
        this.height = game.canvas.height;
        this.x = this.paddle.x1;
        this.y = this.paddle.y - 2;
        this.vx = 0;
        this.vy = 0;
        this.update = this.update.bind(this);
        this.render = this.render.bind(this);
        this.shoot = this.shoot.bind(this);
    }

    update() {
        if (this.x === 0) this.vx = -this.vx;
        if (this.x === this.width-1) this.vx = -this.vx;
        if (this.y >= this.height-1) return this.game.gameOver();
        if (this.y === 0) this.vy = -this.vy;

        this.y = Math.floor(this.y + this.vy);
        this.x = Math.floor(this.x + this.vx);

    }

    render(context) {
        context.save();
        context.fillStyle = "black";
        context.fillRect(this.x, this.y, 1, 1);
        context.restore();
    }

    shoot() {
        this.vx = this.vy = -1;
    }
}