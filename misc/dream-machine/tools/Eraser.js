import Tool from "./Tool.js";

export default class extends Tool {
  _size = 20;

  draw(ctx) {
    ctx.save();
    ctx.beginPath();
    ctx.fillStyle = 'khaki';
    ctx.globalAlpha = .8;
    ctx.arc((this.mouse.position.x - this.canvas.view.width / 2 + this.canvas.camera.x) / this.canvas.zoom, (this.mouse.position.y - this.canvas.view.height / 2 + this.canvas.camera.y) / this.canvas.zoom, this._size, 0, 2 * Math.PI);
    ctx.fill();
    ctx.restore();
  }

  erase(event) {
    const positionX = (this.mouse.position.x - this.canvas.view.width / 2 + this.canvas.camera.x) / this.canvas.zoom;
    const positionY = (this.mouse.position.y - this.canvas.view.height / 2 + this.canvas.camera.y) / this.canvas.zoom;
    const isCtrlKeyHeld = event.ctrlKey || event.metaKey; // Check if Ctrl key is held

    this.canvas.objects.forEach((object, index, objects) => {
      if (isCtrlKeyHeld) {
        this.eraseLinesFromObject(object.physics, positionX, positionY);
        this.eraseLinesFromObject(object.scenery, positionX, positionY);
      } else {
        for (const line of object.physics) {
          for (let i = 0; i < line.length - 2; i += 2) {
            let vector = {
              x: line[i] - line[i + 2],
              y: line[i + 1] - line[i + 3]
            };

            let len = Math.sqrt(vector.x ** 2 + vector.y ** 2);
            let b = (positionX - line[i + 2]) * (vector.x / len) + (positionY - line[i + 3]) * (vector.y / len);
            if (b >= len) {
              vector.x = line[i] - positionX;
              vector.y = line[i + 1] - positionY;
            } else {
              const clone = structuredClone(vector);
              vector.x = line[i + 2] - positionX;
              vector.y = line[i + 3] - positionY;
              if (b > 0) {
                vector.x += clone.x / len * b;
                vector.y += clone.y / len * b;
              }
            }

            if (Math.sqrt(vector.x ** 2 + vector.y ** 2) <= this._size) {
              objects.splice(index, 1);
              return;
            }
          }
        }
        for (const line of object.scenery) {
          for (let i = 0; i < line.length - 2; i += 2) {
            let vector = {
              x: line[i] - line[i + 2],
              y: line[i + 1] - line[i + 3]
            };

            let len = Math.sqrt(vector.x ** 2 + vector.y ** 2);
            let b = (positionX - line[i + 2]) * (vector.x / len) + (positionY - line[i + 3]) * (vector.y / len);
            if (b >= len) {
              vector.x = line[i] - positionX;
              vector.y = line[i + 1] - positionY;
            } else {
              const clone = structuredClone(vector);
              vector.x = line[i + 2] - positionX;
              vector.y = line[i + 3] - positionY;
              if (b > 0) {
                vector.x += clone.x / len * b;
                vector.y += clone.y / len * b;
              }
            }

            if (Math.sqrt(vector.x ** 2 + vector.y ** 2) <= this._size) {
              objects.splice(index, 1);
              return;
            }
          }
        }
      }
    });

    // Move the objects.splice(index, 1) lines here if you want to remove objects after iterating through all lines
  }

  eraseLinesFromObject(lines, positionX, positionY) {
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const lineSegments = line.slice(); // Create a copy of the line segments

      let segmentsToRemove = [];

      for (let j = 0; j < lineSegments.length; j += 4) {
        const x1 = lineSegments[j];
        const y1 = lineSegments[j + 1];
        const x2 = lineSegments[j + 2];
        const y2 = lineSegments[j + 3];

        let vector = {
          x: x1 - x2,
          y: y1 - y2,
        };

        let len = Math.sqrt(vector.x ** 2 + vector.y ** 2);
        let b =
          (positionX - x2) * (vector.x / len) + (positionY - y2) * (vector.y / len);

        if (b >= len) {
          vector.x = x1 - positionX;
          vector.y = y1 - positionY;
        } else {
          const clone = structuredClone(vector);
          vector.x = x2 - positionX;
          vector.y = y2 - positionY;
          if (b > 0) {
            vector.x += clone.x / len * b;
            vector.y += clone.y / len * b;
          }
        }

        if (Math.sqrt(vector.x ** 2 + vector.y ** 2) <= this._size) {
          segmentsToRemove.push(j, j + 1, j + 2, j + 3);
        }
      }

      // Remove the line segments from the array in reverse order
      for (let k = segmentsToRemove.length - 1; k >= 0; k--) {
        const segmentIndex = segmentsToRemove[k];
        lineSegments.splice(segmentIndex, 4);
      }

      // Update the original line with the remaining line segments
      lines[i] = lineSegments;
    }
  }

  press(event) {
    if (!this.mouse.isAlternate) {
      this.erase(event);
    }
  }

  stroke(event) {
    if (this.mouse.down && !this.mouse.isAlternate) {
      this.erase(event);
    }
  }
}
