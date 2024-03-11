import ObjectTool from "./ObjectTool.js";

let code = null;
export default class extends ObjectTool {
  init() {
    code = prompt('Enter your custom object code:') ?? code;
    if (code !== null) {
      const parts = code.split('#').map(part => part.split(/,+/g).filter(empty => empty).map(line => line.split(/\s+/g).map(coord => parseInt(coord, 32))));

      const physicsLines = [];
      const sceneryLines = [];

      const separateLines = (lineGroup) => {
        const separated = [];
        if (lineGroup.length <= 4) {
          separated.push(lineGroup);
        } else {
          for (let i = 0; i < lineGroup.length - 2; i += 2) {
            const line = [lineGroup[i], lineGroup[i + 1], lineGroup[i + 2], lineGroup[i + 3]];
            separated.push(line);
          }
        }
        return separated;
      };

      for (const lineGroup of parts[0]) {
        const separated = separateLines(lineGroup);
        physicsLines.push(...separated);
      }

      for (const lineGroup of parts[1]) {
        const separated = separateLines(lineGroup);
        sceneryLines.push(...separated);
      }

      const allLines = [...physicsLines, ...sceneryLines];
      const flatX = allLines.flatMap(lines => lines.filter((_, index) => index % 2 === 0));
      const width = Math.min(...flatX) + Math.max(...flatX);
      const flatY = allLines.flatMap(lines => lines.filter((_, index) => index % 2 === 1));
      const height = Math.min(...flatY) + Math.max(...flatY);

      for (const line of physicsLines) {
        for (let i = 0; i < line.length; i += 2) {
          line[i] -= width / 2 + width / 2 % 25;
          line[i + 1] -= height / 2 + height / 2 % 25;
        }
      }

      for (const line of sceneryLines) {
        for (let i = 0; i < line.length; i += 2) {
          line[i] -= width / 2 + width / 2 % 25;
          line[i + 1] -= height / 2 + height / 2 % 25;
        }
      }

      this.offsetX = width / 2;
      this.offsetY = height / 2;
      this.constructor.physics = physicsLines;
      this.constructor.scenery = sceneryLines;
    }
  }

  static physics = [];
  static scenery = [];
}