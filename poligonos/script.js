class Polygon {
  vertices = [];
  canvas = null;

  constructor(canvas, vertices = []) {
    this.vertices = vertices;
    this.canvas = canvas;
  }

  addVertex(vertex) {
    this.vertices.push(vertex);
  }

  render() {
    const ctx = this.canvas.getContext("2d");

    ctx.fillStyle = "red";
    this.vertices.forEach((vertex) => {
      ctx.beginPath();
      ctx.arc(vertex.x, vertex.y, 5, 0, 2 * Math.PI);
      ctx.fill();
    });

    ctx.beginPath();
    this.vertices.forEach((vertex, index) => {
      if (index === 0) {
        ctx.moveTo(vertex.x, vertex.y);
      } else {
        ctx.lineTo(vertex.x, vertex.y);
      }
    });

    ctx.stroke();
  }
}

const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
const middle = { x: canvas.width / 2, y: canvas.height / 2 };
const polygons = [];

function renderCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  polygons.forEach((polygon) => polygon.render());
}

const line = new Polygon(canvas, [
  { x: middle.x - 100, y: middle.y },
  { x: middle.x + 100, y: middle.y },
]);

polygons.push(line);

let numVertices = parseInt(prompt("Enter number of vertices (3 - 8):"));
while (typeof numVertices !== "number" || numVertices < 3 || numVertices > 8) {
  numVertices = parseInt(prompt("Enter number of vertices (3 - 8):"));
}

const verticeList = [];
const first = {
  x: Math.floor(Math.random() * canvas.width),
  y: Math.floor(Math.random() * canvas.height),
};
verticeList.push(first);

for (let i = 1; i < numVertices; i++) {
  const x = Math.floor(Math.random() * canvas.width);
  const y = Math.floor(Math.random() * canvas.height);
  verticeList.push({ x, y });
}
verticeList.push(first);

polygons.push(new Polygon(canvas, verticeList));

renderCanvas();

let moveVertex = null;
let fixedVertex = null;
let selectedLine = null;
let startX = null;
let startY = null;

canvas.addEventListener("mousedown", function (event) {
  const clickX = event.offsetX;
  const clickY = event.offsetY;

  // mover vertices
  for (const polygon of polygons) {
    for (const [index, vertex] of polygon.vertices.entries()) {
      const distance = Math.sqrt(
        Math.pow(clickX - vertex.x, 2) + Math.pow(clickY - vertex.y, 2)
      );

      if (distance < 5) {
        moveVertex = polygon.vertices[index];
        fixedVertex = polygon.vertices[index === 0 ? 1 : 0];

        canvas.addEventListener("mousemove", moveVertexHandler);

        canvas.addEventListener("mouseup", function () {
          canvas.removeEventListener("mousemove", moveVertexHandler);
        });

        return;
      }
    }

    // mover retas
    for (let i = 0; i < polygon.vertices.length; i++) {
      const vertex1 = polygon.vertices[i];
      const vertex2 = polygon.vertices[(i + 1) % polygon.vertices.length];

      const distance = pointToLineDistance(
        clickX,
        clickY,
        vertex1.x,
        vertex1.y,
        vertex2.x,
        vertex2.y
      );

      if (distance < 5) {
        selectedLine = [vertex1, vertex2];

        startX = clickX;
        startY = clickY;

        canvas.addEventListener("mousemove", moveLineHandler);

        canvas.addEventListener("mouseup", function () {
          canvas.removeEventListener("mousemove", moveLineHandler);
        });
      }
    }
  }
});

function moveVertexHandler(event) {
  const moveX = event.offsetX;
  const moveY = event.offsetY;

  moveVertex.x = moveX;
  moveVertex.y = moveY;

  renderCanvas();
}

function moveLineHandler(event) {
  const moveX = event.offsetX;
  const moveY = event.offsetY;

  const deltaX = moveX - startX;
  const deltaY = moveY - startY;

  selectedLine[0].x += deltaX;
  selectedLine[0].y += deltaY;

  selectedLine[1].x += deltaX;
  selectedLine[1].y += deltaY;

  startX = moveX;
  startY = moveY;

  renderCanvas();
}

function pointToLineDistance(px, py, x1, y1, x2, y2) {
  const A = px - x1;
  const B = py - y1;
  const C = x2 - x1;
  const D = y2 - y1;

  const dot = A * C + B * D;
  const len_sq = C * C + D * D;
  let param = -1;

  if (len_sq !== 0) param = dot / len_sq;

  let xx, yy;

  if (param < 0) {
    xx = x1;
    yy = y1;
  } else if (param > 1) {
    xx = x2;
    yy = y2;
  } else {
    xx = x1 + param * C;
    yy = y1 + param * D;
  }

  const dx = px - xx;
  const dy = py - yy;
  return Math.sqrt(dx * dx + dy * dy);
}

// adicionra vertices
canvas.addEventListener("contextmenu", function (event) {
  event.preventDefault();

  const clickX = event.offsetX;
  const clickY = event.offsetY;

  for (const polygon of polygons) {
    for (let i = 0; i < polygon.vertices.length; i++) {
      const vertex1 = polygon.vertices[i];
      const vertex2 = polygon.vertices[(i + 1) % polygon.vertices.length];

      const distance = pointToLineDistance(
        clickX,
        clickY,
        vertex1.x,
        vertex1.y,
        vertex2.x,
        vertex2.y
      );

      if (distance < 5) {
        polygon.vertices.splice(i + 1, 0, { x: clickX, y: clickY });

        renderCanvas();

        return;
      }
    }
  }
});
