class Vector {
    constructor(x, y, base32) {
      this.x = base32 ? parseInt(x, 32) : x;
      this.y = base32 ? parseInt(y, 32) : y;
    }
    
    addSelf(vec) {
      this.x += vec.x;
      this.y += vec.y;
    }
  }
  
  class Powerup {
    constructor(type, data) {
      this.type = type;
      this.data = data;
    }
  }
  
  
  
  function decode(trackStr) {
    const parts = trackStr.split('#');
    let physicsLines = parts[0] || '';
    let sceneryLines = parts[1] || '';
    let powerups = parts[2] || '';
    let vehicle = parts[3] || '';
    
    physicsLines = decodeLines(physicsLines);
    sceneryLines = decodeLines(sceneryLines);
    powerups = decodePowerups(powerups);
    
    return {physicsLines, sceneryLines, powerups, vehicle};
  }
  
  function decodeLines(lineStr) {
    let lines = lineStr.split(',');
    if (lines[0] === '') return [];
    let output = new Array(lines.length);
    for (let i = 0; i < output.length; i++) output[i] = [];
    
    for (let i = 0; i < lines.length; i++) {
      lines[i] = lines[i].split(' ');
      for (let j = 0; j < lines[i].length; j += 2) {
        output[i].push(new Vector(lines[i][j], lines[i][j + 1], true));
      }
    }
    return output;
  }
  
  function decodePowerups(powerupStr) {
    let powerups = powerupStr.split(',');
    if (powerups[0] === '') return [];
    for (let i = 0; i < powerups.length; i++) {
      let powerupData = powerups[i].split(' ');
      switch (powerupData[0]) {
        case 'T':
        case 'S':
        case 'O':
        case 'C':
        case 'A':
          powerups[i] = new Powerup(powerupData[0], {
            pos: new Vector(powerupData[1], powerupData[2], true)
          });
          break;
        case 'B':
        case 'G':
          powerups[i] = new Powerup(powerupData[0], {
            pos: new Vector(powerupData[1], powerupData[2], true),
            angle: parseInt(powerupData[3], 32)
          });
          break;
        case 'W':
          powerups[i] = new Powerup(powerupData[0], {
            pos1: new Vector(powerupData[1], powerupData[2], true),
            pos2: new Vector(powerupData[3], powerupData[4], true)
          });
          break;
        case 'V':
          powerups[i] = new Powerup(powerupData[0], {
            pos: new Vector(powerupData[1], powerupData[2], true),
            vehicle: parseInt(powerupData[3]),
            time: parseInt(powerupData[4], 32)
          });
      }
    }
    return powerups;
  }
  
  
  
  function move(track, offset) {
    for (let line of track.physicsLines) {
      for (let point of line) {
        point.addSelf(offset);
      }
    }
    for (let line of track.sceneryLines) {
      for (let point of line) {
        point.addSelf(offset);
      }
    }
    for (let powerup of track.powerups) {
      if ('TSOCABGV'.includes(powerup.type)) {
        powerup.data.pos.addSelf(offset);
      }
      else if ('W'.includes(powerup.type)) {
        powerup.data.pos1.addSelf(offset);
        powerup.data.pos2.addSelf(offset);
      }
    }
  }
  
  function applyMatrix(track, matrix) {
    for (let line of track.physicsLines) {
      for (let point of line) {
        const x = point.x;
        point.x = matrix[0] * x + matrix[1] * point.y;
        point.y = matrix[2] * x + matrix[3] * point.y;
      }
    }
    for (let line of track.sceneryLines) {
      for (let point of line) {
        const x = point.x;
        point.x = matrix[0] * x + matrix[1] * point.y;
        point.y = matrix[2] * x + matrix[3] * point.y;
      }
    }
    for (let powerup of track.powerups) {
      if ('TSOCABGV'.includes(powerup.type)) {
        const x = powerup.data.pos.x;
        powerup.data.pos.x = matrix[0] * x + matrix[1] * powerup.data.pos.y;
        powerup.data.pos.y = matrix[2] * x + matrix[3] * powerup.data.pos.y;
        if ('BG'.includes(powerup.type)) {
          const a = (powerup.data.angle - 90) * Math.PI / 180;
          const newAngle = Math.atan2(matrix[2] * Math.cos(a) + matrix[3] * Math.sin(a), matrix[0] * Math.cos(a) + matrix[1] * Math.sin(a));
          powerup.data.angle = Math.round(90 + 180 / Math.PI * newAngle);
          if (powerup.data.angle < 0) powerup.data.angle += 360;
        }
      }
      else if ('W'.includes(powerup.type)) {
        powerup.data.pos1.addSelf(offset);
        powerup.data.pos2.addSelf(offset);
      }
    }
  }
  
  
  
  function encode(track) {
    let str = '';
    let added = false;
    
    for (let line of track.physicsLines) {
      added = true;
      for (let point of line) {
        str += Math.round(point.x).toString(32) + ' '
             + Math.round(point.y).toString(32) + ' ';
      }
      str = str.slice(0, -1);
      str += ',';
    }
    if (added) str = str.slice(0, -1);
    str += '#';
    added = false;
    
    for (let line of track.sceneryLines) {
      added = true;
      for (let point of line) {
        str += Math.round(point.x).toString(32) + ' '
             + Math.round(point.y).toString(32) + ' ';
      }
      str = str.slice(0, -1);
      str += ',';
    }
    if (added) str = str.slice(0, -1);
    str += '#';
    added = false;
    
    for (let powerup of track.powerups) {
      added = true;
      str += powerup.type + ' ';
      switch(powerup.type) {
        case 'T':
        case 'S':
        case 'O':
        case 'C':
        case 'A':
          str += Math.round(powerup.data.pos.x).toString(32) + ' '
               + Math.round(powerup.data.pos.y).toString(32);
          break;
        case 'B':
        case 'G':
          str += Math.round(powerup.data.pos.x).toString(32) + ' '
               + Math.round(powerup.data.pos.y).toString(32) + ' '
               + Math.round(powerup.data.angle).toString(32);
          break;
        case 'W':
          str += Math.round(powerup.data.pos1.x).toString(32) + ' '
               + Math.round(powerup.data.pos1.y).toString(32) + ' '
               + Math.round(powerup.data.pos2.x).toString(32) + ' '
               + Math.round(powerup.data.pos2.y).toString(32);
          break;
        case 'V':
          str += Math.round(powerup.data.pos.x).toString(32) + ' '
               + Math.round(powerup.data.pos.y).toString(32) + ' '
               + powerup.data.vehicle.toString(32) + ' '
               + powerup.data.time.toString(32);
      }
      str += ',';
    }
    if (added) str = str.slice(0, -1);
    
    if (track.vehicle !== '') {
      str += '#' + track.vehicle;
    }
    
    return str;
  }
  
  
  
  
  
  
  const button = document.getElementById('button');
  const textBox = document.getElementById('inputBox');
  const xBox = document.getElementById('xMove');
  const yBox = document.getElementById('yMove');
  
  
  
  button.onclick = function() {
    let input = textBox.value;
    let offset = new Vector(parseInt(xBox.value) || 0, parseInt(-yBox.value) || 0);
    let track = decode(input);
    move(track, offset);
    let output = encode(track);
    textBox.value = output;
  }
  
  
  document.getElementById('flip-x-button').onclick = () => {
    const track = decode(textBox.value);
    applyMatrix(track, [-1, 0, 0, 1])
    textBox.value = encode(track);
  }
  document.getElementById('flip-y-button').onclick = () => {
    const track = decode(textBox.value);
    applyMatrix(track, [1, 0, 0, -1])
    textBox.value = encode(track);
  }
  document.getElementById('rotate-cw').onclick = () => {
    const track = decode(textBox.value);
    applyMatrix(track, [0, -1, 1, 0])
    textBox.value = encode(track);
  }
  document.getElementById('rotate-ccw').onclick = () => {
    const track = decode(textBox.value);
    applyMatrix(track, [0, 1, -1, 0])
    textBox.value = encode(track);
  }
  document.getElementById('rotate-button').onclick = () => {
    const track = decode(textBox.value);
    const angle = Math.PI / 180 * document.getElementById('rotate').value;
    applyMatrix(track, [Math.cos(angle), Math.sin(angle), -Math.sin(angle), Math.cos(angle)])
    textBox.value = encode(track);
  }