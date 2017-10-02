export default class Bricks {
    constructor(canvasWidth, canvasHeight) {
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        this.brickCount = 10;
        this.brickWidth = canvasWidth / this.brickCount;
        this.brickHeight = 10;
        this.bricks = [[], [], [], [], [], [], [], []];
        this.render = this.render.bind(this);
        this.checkCollision = this.checkCollision.bind(this);
        for (var i = 0; i < this.brickCount; i++) {
            this.bricks[0][i] = this.bricks[1][i] = "yellow";
            this.bricks[2][i] = this.bricks[3][i] = "green";
            this.bricks[4][i] = this.bricks[5][i] = "orange";
            this.bricks[6][i] = this.bricks[7][i] = "red";
        }
        Math.prototype.clamp = function (value,lborder,rborder) {
            
        }
    }

    checkCollision(x, y, radius) {
        return this.bricks.some((brickRow, rowIndex) => {
            return brickRow.some((brick, index) => {
                let rx = Math.clamp(x, index * this.brickWidth, index * this.brickWidth + this.brickWidth);
                let ry = Math.clamp(y, rowIndex * this.brickHeight, rowIndex * this.brickHeight + this.brickHeight);
                let distSquared = Math.pow(rx - x, 2) + Math.pow(ry - y, 2);
                return distSquared < Math.pow(radius, 2);
            })
        });
    }




    render(ctx) {
        ctx.save();
        this.bricks.forEach((brickRow, rowIndex) => {
            brickRow.forEach((brick, index) => {
                if (brick === null) return;
                ctx.fillStyle = brick;
                ctx.strokeStyle = "black";
                ctx.fillRect(index * this.brickWidth, rowIndex * this.brickHeight, this.brickWidth, this.brickHeight);
                ctx.strokeRect(index * this.brickWidth, rowIndex * this.brickHeight, this.brickWidth, this.brickHeight);
            })
        });

        ctx.restore();
    }
}
