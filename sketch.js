///<reference path="p5.global-mode.d.ts" />
/**
 * Just using typescript header (?) to make
 * intellisense aware of p5 modules
 * 
 * The typescript file is from here:
 * https://github.com/toolness/friendly-error-fellowship/blob/gh-pages/experiments/typescript/p5.global-mode.d.ts
 *  */ 

 class Projectile{
        constructor(x,y,r,vx,vy){
                this.x = x;
                this.y = y;
                this.r = r;
                this.vx = vx;
                this.vy = vy;
                this.palette = ["#E59577","#EB8851","#774E7A","#763142","#243E81"];
                this.color = color(random(this.palette));
        }

        display(){
                stroke(this.color);
                fill(this.color);
                circle(this.x,this.y,this.r*2);
        }

        isOutCanvas(W,H){
                return (this.x + this.r) > W-1 ||
                        (this.x - this.r) < 1 ||
                        (this.y + this.r) > H-1 ||
                        (this.y - this.r) < 1;
        }

        adjustPosInCanvas(W,H){
                if( (this.x + this.r) > W ){
                        this.x = W-this.r;
                }
                if( (this.x - this.r) < 0 ){
                        this.x = this.r;
                }
                if( (this.y + this.r) > H ){
                        this.y = H-this.r;
                }
                if( (this.y - this.r) < 0){
                        this.y = this.r;
                }
        }

        update(dT,gx,gy){
                this.updatePosition(dT,gx,gy);
                this.updateVelocity(dT,gx,gy);
        }

        updatePosition(dT,gx,gy){
                this.x = this.x + (this.vx * dT) + (gx * pow(dT,2) / 2);
                this.y = this.y + (this.vy * dT) + (gy * pow(dT,2) / 2);
        }
        updateVelocity(dT,gx,gy){
                this.vx = this.vx + (gx * dT);
                this.vy = this.vy + (gy * dT);
        }
}
let c,c1,gx,gy;
var arr = new Array();


function setup(){
        let canvas = createCanvas(600,600); //createCanvas(600,600,WEBGL);
        canvas.parent('frame');
        background(color(0,0,0));
        
        arr[0] = new Projectile(200,200,20,0,0);
        arr[1] = new Projectile(400,200,20,0,0);
        
        gx = 0;
        gy = 900;
}

function draw(){
	background(0);
        stroke(255);
        let dT = deltaTime/1000;
        for(let i=0;i<arr.length;i++){
                prj=arr[i];
                if(!prj.isOutCanvas(600,600)){
                        prj.update(dT,gx,gy);
                }else {
                        prj.adjustPosInCanvas(600,600);
                }
                prj.display();
        }
}



