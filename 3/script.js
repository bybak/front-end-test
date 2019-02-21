class graph {

  constructor(canvas) {
    this.canvas = canvas;
    this.context = this.canvas.getContext('2d');

    this.setVertex = false;
    this.setEdge = false;

    this.vertexCoordinates = {};
    this.oneEdgeCoordinates = [];
    this.AdjList = new Map();

    this.canvas.addEventListener('click', event => {
      if (this.setVertex) {
        this.addPoint(event);
      }
      if (this.setEdge) {
        this.defineEdge(event);
      }
    });

    this.vertexCount = 0;
  }

  getMousePos(evt) {
    var rect = this.canvas.getBoundingClientRect();
    return {
        x: (evt.clientX - rect.left) / (rect.right - rect.left) * this.canvas.width,
        y: (evt.clientY - rect.top) / (rect.bottom - rect.top) * this.canvas.height
    };
  }

  addPoint(evt) {
    this.vertexCount++;

    let coordinates = this.getMousePos(evt);
    let x = coordinates.x;
    let y = coordinates.y;
    let w = 16;

    this.context.beginPath();
    this.context.fillStyle = "rgb(200,0,0)";
    this.context.arc(x, y, w/2, 0, 2 * Math.PI, false);
    this.context.fill();

    this.context.font = '8pt Calibri';
    this.context.fillStyle = 'white';
    this.context.textAlign = 'center';
    this.context.fillText(this.vertexCount, x, y+3);

    this.vertexCoordinates[this.vertexCount] = [x, y];

    this.addVertex(this.vertexCount);

    this.setVertex = false;
  }

  addVertex(v){
      this.AdjList.set(v, []);
  }

  findVertex(findx, findy){
    let vertex;
    Object.entries(this.vertexCoordinates).forEach(
      ([key, value]) => {
        let x = value[0];
        let y = value[1];

        if((findx >= x-5 && findx <= x+5) && (findy >= y-5 && findy <= y+5)) {
          vertex = key;
          return;
        }
      }
    );

    return vertex;
  }

  defineEdge(evt) {
    let coordinates = this.getMousePos(evt);
    let x = coordinates.x;
    let y = coordinates.y;

    let vertexNumber = this.findVertex(x, y);

    if(vertexNumber !== undefined) {
      this.oneEdgeCoordinates.push(vertexNumber);
    }

    if(this.oneEdgeCoordinates.length == 2) {
      this.addEdge(this.oneEdgeCoordinates[0], this.oneEdgeCoordinates[1]);
      this.oneEdgeCoordinates = [];
      this.setEdge = false;
    }
  }


  addEdge(v, w){

    v = parseInt(v);
    w = parseInt(w);

    this.AdjList.get(v).push(w);

    this.AdjList.get(w).push(v);
    this.drawEdge(v, w);
  }

  drawEdge(v, h) {
    this.context.beginPath();
    this.context.moveTo(this.vertexCoordinates[v][0], this.vertexCoordinates[v][1]);
    this.context.lineTo(this.vertexCoordinates[h][0], this.vertexCoordinates[h][1]);
    this.context.stroke();
  }

  addEdgeStart() {
    this.setEdge = true;
  }

  addVertexStart() {
    this.setVertex = true;
  }

}
