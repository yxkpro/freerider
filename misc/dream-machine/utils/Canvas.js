import MouseHandler from "../handlers/MouseHandler.js";
import ToolHandler from "../handlers/ToolHandler.js";

const key = 'super-mario-visualizer-settings';
const LevelDictionary = await fetch('constants/objects.json').then(r => r.json());
export default class {
	camera = {x: 0,y: 0};
	mouse = new MouseHandler();
	settings = new Proxy(Object.assign({
		theme: 'light'
	}, JSON.parse(localStorage.getItem(key))), {
		get(target, key) {
			if (typeof target[key] == 'object' && target[key] !== null) {
				return new Proxy(target[key], this);
			}

			return target[key];
		},
		set: (...args) => {
			Reflect.set(...args);
			localStorage.setItem(key, JSON.stringify(this.settings));
			return true;
		},
		deleteProperty: (...args) => {
			Reflect.deleteProperty(...args);
			localStorage.setItem(key, JSON.stringify(this.settings));
			return true;
		}
	});
	tools = new ToolHandler(this);
	zoom = 1;
	physics = [];
	scenery = [];
	objects = [];
	constructor(view) {
		this.view = view;
		this.ctx = this.view.getContext('2d');
		this.physicsStyle = '#'.padEnd(7, this.settings.theme == 'dark' ? 'F' : '0');
		this.sceneryStyle = '#'.padEnd(7, this.settings.theme == 'dark' ? '9' : 'A');

		this.mouse.init(this.view);
		this.mouse.on('down', this.press.bind(this));
		this.mouse.on('move', this.stroke.bind(this));
		this.mouse.on('up', this.clip.bind(this));
		this.mouse.on('wheel', this.wheel.bind(this));
		if ('level' in window) {
			for (const id in LevelDictionary) {
				level.lastElementChild.before(Object.assign(document.createElement('option'), {
					innerText: id.replace('_', ' '),
					style: 'text-transform: capitalize;',
					value: id
				}));
			}
		}

		document.addEventListener('keydown', this.keydown.bind(this));
		window.addEventListener('resize', this.constructor.resize.bind(this.view));
		window.dispatchEvent(new Event('resize'));
	}

	clear() {
		this.physics.splice(0);
		this.scenery.splice(0);
		this.objects.splice(0);
	}

	draw() {
		this.ctx.setTransform(1, 0, 0, 1, 0, 0);
		this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
		this.ctx.translate(this.ctx.canvas.width / 2 - this.camera.x, this.ctx.canvas.height / 2 - this.camera.y);
		this.ctx.scale(this.zoom, this.zoom);
		this.ctx.save();
		this.ctx.lineWidth = 2;
		this.ctx.lineCap = 'round';
		this.ctx.strokeStyle = this.sceneryStyle;
		for (const line of this.scenery.concat(...this.objects.map(({ scenery }) => scenery))) {
			if (line.length < 4) continue;
			this.ctx.beginPath();
			this.ctx.moveTo(line[0], line[1]);
			for (let i = 2; i < line.length; i += 2) {
				this.ctx.lineTo(line[i], line[i + 1]);
			}

			this.ctx.stroke();
		}
		this.ctx.strokeStyle = this.physicsStyle;
		for (const line of this.physics.concat(...this.objects.map(({ physics }) => physics))) {
			if (line.length < 4) continue;
			this.ctx.beginPath();
			this.ctx.moveTo(line[0], line[1]);
			for (let i = 2; i < line.length; i += 2) {
				this.ctx.lineTo(line[i], line[i + 1]);
			}

			this.ctx.stroke();
		}


		this.ctx.restore();
		this.tools.selected.draw(this.ctx);
	}

	import(code) {
		this.clear();
		const [physics, scenery, powerups] = code.split('#');
		physics.length > 0 && this.physics.push(...this.constructor.parseLines(physics));
		scenery.length > 0 && this.scenery.push(...this.constructor.parseLines(scenery));
		powerups.length > 0 && (this.powerups = powerups);
		this.draw();
	}

	press(event) {
		this.mouse.locked || this.view.setPointerCapture(event.pointerId);
		event.shiftKey || this.tools.selected.press(event);
	}

	stroke(event) {
		if (event.shiftKey && this.mouse.down) {
			this.tools.cache.get('camera').stroke(event);
		} else
			this.tools.selected.stroke(event);

		this.draw();
	}

	clip(event) {
		this.mouse.locked || this.view.releasePointerCapture(event.pointerId);
		event.shiftKey || this.tools.selected.clip(event);
	}

	wheel(event) {
		if (event.shiftKey) {
			if (event.deltaY < 0) {
				this.zoom = Math.min(this.zoom * window.devicePixelRatio + .25, window.devicePixelRatio * 4);
				this.draw();
			} else {
				this.zoom = Math.max(this.zoom / window.devicePixelRatio - .25, window.devicePixelRatio / 5);
				this.draw();
			}

			
		}
		else {
		if (event.deltaY > 0 && this.tools.selected.size <= 2) {
			return;
		} else if (event.deltaY < 0 && this.tools.selected.size >= 200) {
			return;
		}

		this.tools.selected.size -= event.deltaY / 20;
	}}

	keydown(event) {
		event.preventDefault();
		switch (event.key.toLowerCase()) {
			case '+':
			case '=':
				if (event.shiftKey) {
				this.zoom = Math.min(this.zoom * window.devicePixelRatio + .25, window.devicePixelRatio * 4);
				this.draw();
				break;}

				else {
					this.tools.selected.size += 5;
					this.draw();
				break;}

			case '_':
			case '-':
				if (event.shiftKey) {
				this.zoom = Math.max(this.zoom / window.devicePixelRatio - .25, window.devicePixelRatio / 5);
				this.draw();
				break;}

				else {
					this.tools.selected.size -= 5;
					this.draw();
					break;}

			case 'enter':
				this.camera.x = 0;
				this.camera.y = 0;
				this.draw();
				break;
		}

		this.tools.selected.keydown(event);
	}

	loadLevel(levelId) {
		if (/^custom$/i.test(levelId)) {
			return this.import(prompt('Enter your custom level code:') ?? LevelDictionary['blank']);
		}

		this.import(LevelDictionary[levelId]);
	}

	toString() {
		const physics = this.physics.concat(...this.objects.filter(({ physics }) => physics.length).map(({ physics }) => physics));
		const scenery = this.scenery.concat(...this.objects.filter(({ scenery }) => scenery.length).map(({ scenery }) => scenery));
		const miniPhysics = structuredClone(physics);
		const miniScenery = structuredClone(scenery);
		for (const line of Array(...miniPhysics, ...miniScenery)) {
			for (let i = 0; i < line.length; i += 2) {
								line[i] = Math.floor(line[i] * 0.6);
				line[i + 1] = Math.floor(line[i + 1] * 0.6) + 6e3;
			}
		}
		if (event.ctrlKey){
		return Array(physics.concat(miniPhysics).map(line => line.map(coord => coord.toString(32)).join(' ')).join(','), scenery.concat(miniScenery).map(line => line.map(coord => coord.toString(32)).join(' ')).join(','), this.powerups || '').join('#');
}
		else{
return Array(physics.map(line => line.map(coord => coord.toString(32)).join(' ')).join(','), scenery.map(line => line.map(coord => coord.toString(32)).join(' ')).join(','), this.powerups || '').join('#');
}
	}


	static parseLines(part) {
		return part.split(/,+/g).map(line => line.split(/\s+/g).map(coord => parseInt(coord, 32)));
	}

	static resize(event) {
		this.setAttribute('height', getComputedStyle(this).getPropertyValue('height').slice(0, -2) * window.devicePixelRatio);
		this.setAttribute('width', getComputedStyle(this).getPropertyValue('width').slice(0, -2) * window.devicePixelRatio);
	}
}