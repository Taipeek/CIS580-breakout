export default class Bricks {
    constructor(canvasWidth, canvasHeight) {
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        this.brickCount = 10;
        this.brickWidth = canvasWidth / this.brickCount;
        this.brickHeight = 10;
        this.bricks = [[], [], [], [], [], [], [], []];
        this.removeBrick = this.removeBrick.bind(this);
        this.render = this.render.bind(this);
        this.checkCollision = this.checkCollision.bind(this);
        for (var i = 0; i < this.brickCount; i++) {
            this.bricks[0][i] = this.bricks[1][i] = "yellow";
            this.bricks[2][i] = this.bricks[3][i] = "green";
            this.bricks[4][i] = this.bricks[5][i] = "orange";
            this.bricks[6][i] = this.bricks[7][i] = "red";
        }

    }

    removeBrick(x, y) {
        this.bricks[y][x] = null;
        return true;
    }

    checkCollision(x, y, radius, direction) {
        for (let i = 0; i < this.bricks.length; i++) {
            for (let j = 0; j < this.bricks[i].length; j++) {
                if (this.bricks[i][j] === null) continue;
                let rx = Bricks.clamp(x, j * this.brickWidth, j * this.brickWidth + this.brickWidth);
                let ry = Bricks.clamp(y, i * this.brickHeight, i * this.brickHeight + this.brickHeight);
                let distSquared = Math.pow(rx - x, 2) + Math.pow(ry - y, 2);
                if (distSquared < Math.pow(radius, 2) && this.removeBrick(j, i)) {
                    if (direction < 0) {
                        if (y < i * this.brickHeight + this.brickHeight) return -1; //returns side collision from bottom
                    } else {
                        if (y > i * this.brickHeight) return -1; //returns side collision from top
                    }
                    return 1;
                }

            }
        }
        return 0;
        // return this.bricks.some((brickRow, rowIndex) => {
        //     return brickRow.some((brick, index) => {
        //         if (brick === null) return false;
        //         let rx = Bricks.clamp(x, index * this.brickWidth, index * this.brickWidth + this.brickWidth);
        //         let ry = Bricks.clamp(y, rowIndex * this.brickHeight, rowIndex * this.brickHeight + this.brickHeight);
        //         let distSquared = Math.pow(rx - x, 2) + Math.pow(ry - y, 2);
        //         return distSquared < Math.pow(radius, 2) && this.removeBrick(index, rowIndex);
        //     })
        // });
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

    static clamp(value, lborder, rborder) {
        if (value >= lborder && value <= rborder) return value;
        if (value >= rborder) return rborder;
        if (value <= lborder) return lborder;
    }
}
