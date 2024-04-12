import Line from "/misc/drawpad/tools/Line.js";
import Brush from "/misc/drawpad/tools/Brush.js";
import Curve from "/misc/drawpad/tools/Curve.js";
import Circle from "/misc/drawpad/tools/Circle.js";
import Ellipse from "/misc/drawpad/tools/Ellipse.js";
import Rectangle from "/misc/drawpad/tools/Rectangle.js";
import Eraser from "/misc/drawpad/tools/Eraser.js";
import Camera from "/misc/drawpad/tools/Camera.js";
import Select from "/misc/drawpad/tools/Select.js";

export default class {
	_selected = 'line';
	cache = new Map();
	constructor(parent) {
		this.canvas = parent;
		this.cache.set('brush', new Brush(this));
		this.cache.set('camera', new Camera(this));
		this.cache.set('curve', new Curve(this));
		this.cache.set('circle', new Circle(this));
		this.cache.set('ellipse', new Ellipse(this));
		this.cache.set('eraser', new Eraser(this));
		this.cache.set('line', new Line(this));
		this.cache.set('rectangle', new Rectangle(this));
		this.cache.set('select', new Select(this));
	}

	get selected() {
		return this.cache.get(this._selected);
	}

	set selected(toolName) {
		if (!this.cache.has(toolName)) {
			throw new Error(`Hmm. What's a "${toolName}" tool?`);
		} else if (this.isSelected(toolName)) {
			return;
		}

		this.selected.close();
		this._selected = toolName.toLowerCase();
		this.selected.init();
		this.canvas.view.style.setProperty('cursor', this._selected === 'camera' ? 'move' : 'default');

		const colours = document.querySelector("#container .user-interface section.bottom.left");
		colours !== null && colours.style[(/^(brush|curve|(dynamic_)?circle|ellipse|line|rectangle)$/i.test(this._selected) ? 'remove' : 'set') + 'Property']('display', 'none');
	}

	select(toolName) {
		return this.selected = toolName.toLowerCase();
	}

	isSelected(toolName) {
		return toolName.toLowerCase() === this._selected.toLowerCase();
	}
}