import Tool from "./Tool.js";

export default class extends Tool {
	offsetX = 0;
	offsetY = 0;
	physics = [];
	scenery = [];
	draw(ctx) {
		ctx.save();
		ctx.lineWidth = 2;
		ctx.lineCap = 'round';
		ctx.strokeStyle = this.canvas.sceneryStyle;
		for (const line of this.scenery) {
			ctx.beginPath();
			ctx.moveTo(line[0], line[1]);
			for (let i = 2; i < line.length; i += 2) {
				ctx.lineTo(line[i], line[i + 1]);
			}

			ctx.stroke();
		}

		ctx.strokeStyle = this.canvas.physicsStyle;
		for (const line of this.physics) {
			ctx.beginPath();
			ctx.moveTo(line[0], line[1]);
			for (let i = 2; i < line.length; i += 2) {
				ctx.lineTo(line[i], line[i + 1]);
			}

			ctx.stroke();
		}

		ctx.restore();
	}

	keydown(event) {
		switch (event.key.toLowerCase()) {
			case 'f': {
				for (const line of this.constructor.physics) {
					for (let i = 0; i < line.length; i += 2) {
						if (event.shiftKey)
							line[i + 1] = line[i + 1] * -1 - 2 * (this.offsetY % 25);
						else
							line[i] = line[i] * -1 - 2 * (this.offsetX % 25);
					}
				}

				for (const line of this.constructor.scenery) {
					for (let i = 0; i < line.length; i += 2) {
						if (event.shiftKey)
							line[i + 1] = line[i + 1] * -1 - 2 * (this.offsetY % 25);
						else
							line[i] = line[i] * -1 - 2 * (this.offsetX % 25);
					}
				}
				break;
			}
				
			case 's': {
				for (const line of this.constructor.physics) {
					for (let i = 0; i < line.length; i += 2) {
						if (event.shiftKey && event.ctrlKey){
							line[i] = line[i] * (1 / 1.05) / 25 * 25; 
							line[i + 1] = line[i + 1] * (1 / 1.05) / 25 * 25;
						}
						else if (event.ctrlKey){
							line[i] = line[i] * 1.05 / 25 * 25; 
							line[i + 1] = line[i + 1] * 1.05 / 25 * 25;
						}
						else if (event.shiftKey){
							line[i] = line[i] * 0.5 / 25 * 25;
							line[i + 1] = line[i + 1] * 0.5 / 25 * 25;
						}
						else{
							line[i] = line[i] * 2 / 25 * 25;
							line[i + 1] = line[i + 1] * 2 / 25 * 25;
						}
					}
				}

				for (const line of this.constructor.scenery) {
					for (let i = 0; i < line.length; i += 2) {
						if (event.shiftKey && event.ctrlKey){
							line[i] = line[i] * (1 / 1.05) / 25 * 25; 
							line[i + 1] = line[i + 1] * (1 / 1.05) / 25 * 25;
						}
						else if (event.ctrlKey){
							line[i] = line[i] * 1.05 / 25 * 25; 
							line[i + 1] = line[i + 1] * 1.05 / 25 * 25;
						}
						else if (event.shiftKey){
							line[i] = line[i] * 0.5 / 25 * 25;
							line[i + 1] = line[i + 1] * 0.5 / 25 * 25;
						}
						else{
							line[i] = line[i] * 2 / 25 * 25;
							line[i + 1] = line[i + 1] * 2 / 25 * 25;
						}
					}
				}
				break;
			}	

			case 'r': {
				const rotationFactor = 90 * -Math.PI / 180;
				for (const line of this.constructor.physics) {
					for (let i = 0, e; i < line.length; i += 2) {
						if (event.shiftKey && event.ctrlKey){
						e = line[i];
						line[i] = (Math.cos(5 * Math.PI / 180) * e + Math.sin(5 * Math.PI / 180) * line[i + 1] / 25 * 25);
						line[i + 1] = (-Math.sin(5 * Math.PI / 180) * e + Math.cos(5 * Math.PI / 180) * line[i + 1] / 25 * 25);
						}
						else if (event.ctrlKey){
						e = line[i];
						line[i] = (Math.cos(5 * -Math.PI / 180) * e + Math.sin(5 * -Math.PI / 180) * line[i + 1] / 25 * 25);
						line[i + 1] = (-Math.sin(5 * -Math.PI / 180) * e + Math.cos(5 * -Math.PI / 180) * line[i + 1] / 25 * 25);
						}
						else if (event.shiftKey){
							e = line[i];
						line[i] = (Math.cos(90 * Math.PI / 180) * e + Math.sin(90 * Math.PI / 180) * line[i + 1] / 25 * 25);
						line[i + 1] = (-Math.sin(90 * Math.PI / 180) * e + Math.cos(90 * Math.PI / 180) * line[i + 1] / 25 * 25);
						}
						else{
						e = line[i];
						line[i] = (Math.cos(rotationFactor) * e + Math.sin(rotationFactor) * line[i + 1] / 25 * 25);
						line[i + 1] = (-Math.sin(rotationFactor) * e + Math.cos(rotationFactor) * line[i + 1] / 25 * 25);
						}
					}
				}

				for (const line of this.constructor.scenery) {
					for (let i = 0, e; i < line.length; i += 2) {
						if (event.shiftKey && event.ctrlKey){
						e = line[i];
						line[i] = (Math.cos(5 * Math.PI / 180) * e + Math.sin(5 * Math.PI / 180) * line[i + 1] / 25 * 25);
						line[i + 1] = (-Math.sin(5 * Math.PI / 180) * e + Math.cos(5 * Math.PI / 180) * line[i + 1] / 25 * 25);
						}
						else if (event.ctrlKey){
						e = line[i];
						line[i] = (Math.cos(5 * -Math.PI / 180) * e + Math.sin(5 * -Math.PI / 180) * line[i + 1] / 25 * 25);
						line[i + 1] = (-Math.sin(5 * -Math.PI / 180) * e + Math.cos(5 * -Math.PI / 180) * line[i + 1] / 25 * 25);
						}
						else if (event.shiftKey){
							e = line[i];
						line[i] = (Math.cos(90 * Math.PI / 180) * e + Math.sin(90 * Math.PI / 180) * line[i + 1] / 25 * 25);
						line[i + 1] = (-Math.sin(90 * Math.PI / 180) * e + Math.cos(90 * Math.PI / 180) * line[i + 1] / 25 * 25);
						}
						else{
						e = line[i];
						line[i] = (Math.cos(rotationFactor) * e + Math.sin(rotationFactor) * line[i + 1] / 25 * 25);
						line[i + 1] = (-Math.sin(rotationFactor) * e + Math.cos(rotationFactor) * line[i + 1] / 25 * 25);
						}
					}
				}
				break;
			}
		}

		this.stroke();
		this.canvas.draw();
	}

	stroke() {
		this.physics = structuredClone(this.constructor.physics);
		this.scenery = structuredClone(this.constructor.scenery);
		for (const line of this.physics) {
			for (let i = 0; i < line.length; i += 2) {
					if (event.ctrlKey){
					line[i] += Math.round(((this.mouse.position.x + this.offsetX % 25 - this.canvas.view.width / 2 + this.canvas.camera.x) / this.canvas.zoom) / 1) * 1;
					line[i + 1] += Math.round(((this.mouse.position.y + this.offsetY % 25 - this.canvas.view.height / 2 + this.canvas.camera.y) / this.canvas.zoom) / 1) * 1;
				}
				else{
					line[i] += Math.round(((this.mouse.position.x + this.offsetX % 25 - this.canvas.view.width / 2 + this.canvas.camera.x) / this.canvas.zoom) / 5) * 5;
					line[i + 1] += Math.round(((this.mouse.position.y + this.offsetY % 25 - this.canvas.view.height / 2 + this.canvas.camera.y) / this.canvas.zoom) / 5) * 5;
				}
			}
		}

		for (const line of this.scenery) {
			for (let i = 0; i < line.length; i += 2) {
				if (event.ctrlKey){
					line[i] += Math.round(((this.mouse.position.x + this.offsetX % 25 - this.canvas.view.width / 2 + this.canvas.camera.x) / this.canvas.zoom) / 1) * 1;
					line[i + 1] += Math.round(((this.mouse.position.y + this.offsetY % 25 - this.canvas.view.height / 2 + this.canvas.camera.y) / this.canvas.zoom) / 1) * 1;
				}
				else{
					line[i] += Math.round(((this.mouse.position.x + this.offsetX % 25 - this.canvas.view.width / 2 + this.canvas.camera.x) / this.canvas.zoom) / 5) * 5;
					line[i + 1] += Math.round(((this.mouse.position.y + this.offsetY % 25 - this.canvas.view.height / 2 + this.canvas.camera.y) / this.canvas.zoom) / 5) * 5;
				}
			}
		}
	}

	clip() {
		this.canvas.objects.push({
			physics: structuredClone(this.physics),
			scenery: structuredClone(this.scenery)
		});
	}
}