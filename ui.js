class Screen {
  constructor(width,height) {
    if (width && height) {
      this.width = width;
      this.height = height;
      this.screen = [...new Array(this.width)].map(e => [...new Array(this.height)].map(e=>[]));
      this.elms = [];
      this.binders = {};
    }
  }
  addElement(el) {
    this.elms.push(el);
  }
  setpixel(x,y,id) {
    if (x>=0 && x<this.width && y>=0 && y<this.height) {
      this.screen[x][y].push(id);
    }
  }
  bind(id,func) {
    if (this.binders[id]) this.binders[id].push(func);
    else this.binders[id] = [func];
  }
  click(x,y) {
    var len = this.screen[x][y].length;
    if (len!=0) this.binders[this.screen[x][y][len-1]][0](); 
  }
  render() {
    var el;
    for (el of this.elms) el.render();
  }
}

class Element {
  constructor(x,y,w,h,id,screen) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.id = id;
    this.screen = screen;
    screen.addElement(this);
  }
  render() {
    var i,j;
    for (i=this.x; i<this.x+this.w; i++) {
      for (j=this.y; j<this.y+this.h; j++) {
        this.screen.setpixel(i,j,this.id);
        var rgb = this.style(i,j);
        canvas.getContext("2d").fillStyle = "rgb("+rgb[0]+","+rgb[1]+","+rgb[2]+")";
        canvas.getContext("2d").fillRect(i,j,1,1);
      }
    }
  }
  style(func) {
    this.style=func;
  }
  onclick(func) {
    this.screen.bind(this.id,func);
  }
}
