let num = localStorage.getItem("task").split("|~|")[1]
console.log(num)

function sim(num){
  /*
  Diffusion-limited aggregation
  By Johan Karlsson
  
  Thanks to Paul Bourke!
  http://paulbourke.net/fractals/dla/
*/
  let canvas = $(".canvas")[0];
  let ctx = canvas.getContext("2d");

  // css canvas size
dpr=1.5; //system size / canvas area  
  width =$(".canvas-area").attr("width");
  // console.log(canvas,width)
  height = Math.floor(($("canvas").css("height"))/dpr);

  // actual canvas size
  canvas.width = 1000*dpr; //window.innerWidth;
  canvas.height = 1000*dpr; //window.innerHeight;

  // Build a matrix that corresponds 
  // to all pixels on the canvas.
  var matrix = new Array(canvas.width);
  for(var x = 0; x < canvas.width; x++) {
    matrix[x] = new Array(canvas.height);    
    for(var y = 0; y < canvas.height; y++) { 
      matrix[x][y] = 0;    
    }    
    matrix[x][canvas.height-1] = 1;
    // ctx.fillRect(x, y, width, height);
    // x,y:start w,h:size of rect
    ctx.fillRect(x, canvas.height-1, 1, 1);
  }

  x=Math.floor((0.3+Math.random()*0.3)*canvas.width)
  y=Math.floor((0.6+Math.random()*0.3)*canvas.width)
  matrix[x][y] = 1;
  ctx.fillRect(x, canvas.height-1, 1, 1);

  x=Math.floor((0.6+Math.random()*0.3)*canvas.width)
  y=Math.floor((0.6+Math.random()*0.2)*canvas.width)
  matrix[x][y] = 1;
  ctx.fillRect(x, canvas.height-1, 1, 1);




  var counter = 0;
  ctx.fillStyle = $(".canvas").css("backgroundColor");
    ctx.fillRect(0, 0, canvas.width, canvas.height);


   //! attr: numofpointadd 
  function Particle() {
    // Pick a random point on the 
    // border of the canvas


    this.x = Math.random()*canvas.width*1;
    if(Math.random()<0.4){
      this.y = canvas.width ;
    }else{
      this.y = canvas.width*1 ;
    };
    this.speed = 1;
    this.angle = Math.random() * 2 * Math.PI;
    this.move = function () {
      this.angle += Math.random() - 0.5;
      
      // Make sure angle is down
      if(this.angle > Math.PI) {
        this.angle = Math.PI;
      } else if (this.angle < 0) {
        this.angle = 0;
      }
      this.x += Math.cos(this.angle) * this.speed;
      this.y += Math.sin(this.angle) * this.speed;
      
      // Wrap around the screen
      if(this.x >= canvas.width) {
        this.x = 0;
      } else if(this.x < 0) {
        this.x = canvas.width - 1;
      }
      if(this.y >= canvas.height) {
        this.y = 0;
      } else if(this.y < 0) {
        this.y = canvas.height - 1;
      }
    }
  }

  function isCollition(x, y) {
    if(x >= matrix.length || x < 0 || y >= matrix[x].length || y < 0) {
      return false;
    }
    return matrix[x][y] === 1;
  }

  var p = new Particle(num);

  var x, y;
  // Brownian walk
  function walk(num) {
    for(var i = 0; i < Math.floor(num/200); i++) {
      // Walk around till we hit something
      do {
        p.move();
        x = Math.round(p.x);
        y = Math.round(p.y);
      } while(!(
        isCollition(x-1, y-1) ||
        isCollition(x  , y-1) ||
        isCollition(x+1, y-1) ||
        isCollition(x-1, y  ) ||
        isCollition(x  , y  ) ||
        isCollition(x+1, y  ) ||
        isCollition(x-1, y+1) ||
        isCollition(x  , y+1) ||
        isCollition(x+1, y+1)
      ));
      if(x >= 0 && x < canvas.width && y >= 0 && y < canvas.height) {
        // We have a collition
        // Put a mark in the matrix
        matrix[x][y] = 1;
        // !color change
        ctx.fillStyle = "hsl(" + counter/300 + ", 100%, 50%)";
        // ...and on the canvas
        ctx.fillRect(p.x, p.y, 1, 1);
        
        // Spawn a new particle
        p = new Particle();
        x = Math.round(p.x);
        y = Math.round(p.y);

        counter++;
      }
    }
    requestAnimationFrame(walk);
  }
  walk(num);
};