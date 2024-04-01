import EventEmitter from "../utils/EventEmitter.js";

export default class extends EventEmitter {
	down = false;
	position = {
		x: 0,
		y: 0,
		toCanvas(canvas) {
			return {
				x: (this.x - canvas.view.width / 2 + canvas.camera.x) / canvas.zoom,
				y: (this.y - canvas.view.height / 2 + canvas.camera.y) / canvas.zoom
			}
		}
	}
	pointA = Object.assign({}, this.position);
	pointB = Object.assign({}, this.position);
	get isAlternate() {
		return this.down && (event.buttons & 1) != 1;
	}

	get locked() {
		return document.pointerLockElement !== null;
	}

	lockedToTarget(event) {
		return document.pointerLockElement === event.target;
	}

	init(target = document) {
		target.addEventListener('pointerdown', this.pointerdown = this.pointerdown.bind(this));
		target.addEventListener('pointermove', this.move = this.move.bind(this));
		target.addEventListener('pointerup', this.up = this.up.bind(this));
		target.addEventListener('wheel', this.wheel = this.wheel.bind(this), { passive: false });
		this.close = this.close.bind(this, target);
	}

	pointerdown(event) {
		event.preventDefault();
		this.down = true;
		this.rightButtonDown = event.button === 2;
		this.locked || (this.position.x = event.offsetX * window.devicePixelRatio,
		this.position.y = event.offsetY * window.devicePixelRatio,
		this.pointA = Object.assign({}, this.position));
		this.emit('down', event);
	}

	move(event) {
		event.preventDefault();
		this.position.x = event.offsetX * window.devicePixelRatio;
		this.position.y = event.offsetY * window.devicePixelRatio;
		this.emit('move', event);
	}

	up(event) {
		event.preventDefault();
		this.down = false;
		if (event.button === 2) {
		  this.rightButtonDown = false; // Reset right mouse button state
		}
		this.pointB = Object.assign({}, this.position);
		this.emit('up', event);
	  }

	wheel(event) {
		event.preventDefault();
		this.emit('wheel', event);
	}

	close(target) {
		target.removeEventListener('pointerdown', this.pointerdown);
		target.removeEventListener('pointermove', this.move);
		target.removeEventListener('pointerup', this.up);
		target.removeEventListener('wheel', this.wheel);
	}
}