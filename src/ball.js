export default class Ball {
    constructor(paddle) {
        this.paddle = paddle;
        this.x = paddle.x1;
        this.y = paddle.y - 2;
        this.vx = 0;
        this.vy = 0;
        this.update = this.update.bind(this);
        this.render = this.render.bind(this);
        this.shoot = this.shoot.bind(this);
    }

    update() {
        this.x = Math.floor(this.x + this.vx);
        this.y = Math.floor(this.y + this.vy);

    }

    render(context) {
        context.save();
        context.fillStyle = "black";
        context.fillRect(this.x, this.y, 1, 1);
        context.restore();
    }

    shoot() {
        this.vx = this.vy = -2;
    }
}