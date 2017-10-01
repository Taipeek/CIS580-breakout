export default class Paddle {
    constructor(width, height) {
        this.x1 = Math.floor(width / 2) - 3;
        this.x2 = this.x1 + 6;
        this.y = height;
        this.width = width;
        this.move = this.move.bind(this);
        this.render = this.render.bind(this);
    }

    move(direction) {
        if (direction === "right") {
            if (this.x2 + 1 > this.width) return;
            this.x1++;
            this.x2++;
        } else {
            if (this.x1 - 1 < 0) return;
            this.x1--;
            this.x2--;
        }
    }

    render(ctx) {
        ctx.save();
        ctx.fillStyle = 'black';
        ctx.fillRect(this.x1, this.y - 1, this.x2 - this.x1, 1);
        ctx.restore();
    }
}
