export default class ScoreBoard {
    constructor(x,y, width,height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.render = this.render.bind(this);
    }

    render(ctx,gameState) {
        ctx.save();
        ctx.strokeStyle = 'black';
        ctx.strokeRect(this.x, this.y, this.width, this.height);
        ctx.fillStyle = "black";
        ctx.font = '18px sans-serif';
        ctx.fontStyle = 'bold';
        ctx.fillText("Score: "+gameState.score, this.x, this.y+18);
        ctx.fillText("Lives: "+gameState.lives, this.x+100, this.y+18);
        ctx.restore();
    }
}
