export default class Bricks {
    constructor(width, height) {
        this.width = width;
        this.height = height;
        this.bricks = [[], [], [], [], [], [], [], []];
        this.render = this.render.bind(this);
        for (var i = 0; i < this.width; i++) {
            this.bricks[0][i] = this.bricks[1][i] = "yellow";
            this.bricks[2][i] = this.bricks[3][i] = "green";
            this.bricks[4][i] = this.bricks[5][i] = "orange";
            this.bricks[6][i] = this.bricks[7][i] = "red";
        }
    }


    render(ctx) {
        ctx.save();
        this.bricks.forEach((brickRow, rowIdex) => {
            brickRow.forEach((brick, index) => {
                ctx.fillStyle = brick;
                ctx.fillRect(index, rowIdex, 1, 1);
            })
        });

        ctx.restore();
    }
}
