  
export type Object = {
    draw: (ctx: CanvasRenderingContext2D) => void
}

export class Rectangle {

    width: number;
    height: number;
    x: number;
    y: number;
    color: string;
  
    constructor({
      x = 0,
      y = 0,
      width = 50,
      height = 50,
      color = 'blue'
    }) {
      this.x = x - width / 2; // Calculate top-left corner from center
      this.y = y - height / 2; // Calculate top-left corner from center
      this.width = width;
      this.height = height;
      this.color = color;
    }
  
    draw(
      ctx: CanvasRenderingContext2D 
    ) {
      ctx.fillStyle = this.color;
      ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}

export class FixationCross {

    size: number;
    x: number;
    y: number;
    color: string;
    thickness: number;
  
    constructor({
      x = 0,
      y = 0,
      size = 50,
      color = 'black',
      thickness = null
    }) {
      this.x = x; // Center point
      this.y = y; // Center point
      this.size = size;
      this.color = color;
      this.thickness = thickness ?? size / 5;
    }
  
    draw(
      ctx: CanvasRenderingContext2D 
    ) {
      const halfSize = this.size / 2;
      const halfThickness = this.thickness / 2;

      // Draw horizontal rectangle
      ctx.fillStyle = this.color;
      ctx.fillRect(this.x - halfSize, this.y - halfThickness, this.size, this.thickness);
      
      // Draw vertical rectangle
      ctx.fillRect(this.x - halfThickness, this.y - halfSize, this.thickness, this.size);
    }
}