export default class Paddle {
    constructor(cavasWidth, canvasHeight) {
        this.cavasWidth = cavasWidth;
        this.width = 100;
        this.height = 15;
        this.paddleSpeed = 3;
        this.direction = "none";
        this.cancelRight = false;
        this.cancelLeft = false;
        this.x1 = Math.floor(cavasWidth / 2 - this.width / 2);
        this.x2 = this.x1 + this.width;
        this.y = canvasHeight - this.height;
        this.move = this.move.bind(this);
        this.render = this.render.bind(this);
        this.image = new Image(this.width, this.height);
        this.image.src = "paddle.bmp"
    }

    move() {
        if (this.direction === "right") {
            if (this.x2 + 1 > this.cavasWidth) return;
            this.x1 += this.paddleSpeed;
            this.x2 += this.paddleSpeed;
        } else {
            if (this.x1 - 1 < 0) return;
            this.x1 -= this.paddleSpeed;
            this.x2 -= this.paddleSpeed;
        }
    }

    render(ctx) {
        ctx.save();
        ctx.fillStyle = 'black';
        // ctx.fillRect(this.x1, this.y, this.width, this.height);
        ctx.drawImage(this.image,this.x1,this.y);
        ctx.restore();
    }
}
