(function() {
    const t = document.createElement("link").relList;
    if (t && t.supports && t.supports("modulepreload"))
        return;
    for (const i of document.querySelectorAll('link[rel="modulepreload"]'))
        s(i);
    new MutationObserver(i=>{
        for (const a of i)
            if (a.type === "childList")
                for (const r of a.addedNodes)
                    r.tagName === "LINK" && r.rel === "modulepreload" && s(r)
    }
    ).observe(document, {
        childList: !0,
        subtree: !0
    });
    function e(i) {
        const a = {};
        return i.integrity && (a.integrity = i.integrity),
        i.referrerpolicy && (a.referrerPolicy = i.referrerpolicy),
        i.crossorigin === "use-credentials" ? a.credentials = "include" : i.crossorigin === "anonymous" ? a.credentials = "omit" : a.credentials = "same-origin",
        a
    }
    function s(i) {
        if (i.ep)
            return;
        i.ep = !0;
        const a = e(i);
        fetch(i.href, a)
    }
}
)();
const Ee = 50;
class Tt {
    static getHexTable() {
        return "0123456789ABCDEF".split("")
    }
    static getDigit(t) {
        return Tt.getHexTable()[Math.round(Math.random() * t)]
    }
    static generateRandomDark() {
        let t = "#";
        for (let e = 0; e < 6; e++)
            t += Tt.getDigit(10);
        return t
    }
}
class l {
    constructor(t=0, e=0) {
        this.x = t,
        this.y = e
    }
    toPixel(t) {
        return new l((this.x - t.camera.x) * t.zoomFactor + t.canvas.width / 2,(this.y - t.camera.y) * t.zoomFactor + t.canvas.height / 2)
    }
    normalizeToCanvas(t) {
        return new l((this.x - t.canvas.width / 2) / t.zoomFactor + t.camera.x,(this.y - t.canvas.height / 2) / t.zoomFactor + t.camera.y)
    }
    set(t) {
        return this.x = t.x,
        this.y = t.y,
        this
    }
    selfAdd(t) {
        return this.x += t.x,
        this.y += t.y,
        this
    }
    selfSub(t) {
        return this.x -= t.x,
        this.y -= t.y,
        this
    }
    selfScale(t) {
        return this.x *= t,
        this.y *= t,
        this
    }
    clone() {
        return new l(this.x,this.y)
    }
    add(t) {
        return new l(this.x + t.x,this.y + t.y)
    }
    sub(t) {
        return new l(this.x - t.x,this.y - t.y)
    }
    scale(t) {
        return new l(this.x * t,this.y * t)
    }
    recipScale(t) {
        return new l(this.x / t,this.y / t)
    }
    dot(t) {
        return this.x * t.x + this.y * t.y
    }
    getLength() {
        return Math.sqrt(this.x * this.x + this.y * this.y)
    }
    lengthSquared() {
        return this.x * this.x + this.y * this.y
    }
    distanceTo(t) {
        let e = this.x - t.x
          , s = this.y - t.y;
        return Math.sqrt(e * e + s * s)
    }
    distanceToSquared(t) {
        let e = this.x - t.x
          , s = this.y - t.y;
        return e * e + s * s
    }
    toString() {
        return Math.round(this.x).toString(32) + " " + Math.round(this.y).toString(32)
    }
    toArray() {
        return [this.x, this.y]
    }
}
class F {
    fixedUpdate() {
        throw new Error("Unimplemented method fixedUpdate()")
    }
    update(t, e) {
        throw new Error("Unimplemented method update(progress, delta)")
    }
    render(t) {
        throw new Error("Unimplemented method render(ctx)")
    }
}
class W extends F {
    constructor(t=new l, e=new l, s=10) {
        super(),
        this.pos = t.clone(),
        this.oldPos = t.clone(),
        this.displayPos = t.add(e),
        this.velocity = e.clone(),
        this.size = s
    }
    fixedUpdate() {
        this.displayPos = this.pos
    }
    update(t, e) {
        this.displayPos = this.pos.add(this.velocity.scale(t))
    }
    render(t) {}
}
class x extends W {
    constructor(t, e) {
        super(t),
        this.bike = e,
        this.motor = 0,
        this.touch = !0,
        this.driving = !1
    }
    drive(t) {
        this.addFriction(t),
        this.driving = !0
    }
    addFriction(t) {
        this.pos.selfAdd(t.scale(-t.dot(this.velocity) * this.motor))
    }
    fixedUpdate() {
        this.velocity.selfAdd(this.bike.gravity).selfScale(this.bike.friction),
        this.pos.selfAdd(this.velocity),
        this.driving = !1,
        this.touch && this.bike.track.touch(this),
        this.velocity = this.pos.sub(this.oldPos),
        this.oldPos.set(this.pos),
        super.fixedUpdate()
    }
    clone() {
        let t = new this.constructor(this.pos,this.bike);
        return t.oldPos = this.oldPos.clone(),
        t.velocity = this.velocity.clone(),
        t.size = this.size,
        t.motor = this.motor,
        t.driving = this.driving,
        t
    }
}
class Qt extends x {
    constructor(t, e) {
        super(t, e),
        this.motor = .3,
        this.rotationSpeed = 0,
        this.speedValue = 0
    }
    drive(t) {
        this.pos.selfAdd(t.scale(this.speedValue * this.bike.direction)),
        this.bike.runner.downPressed && this.addFriction(t),
        this.rotationSpeed = t.dot(this.velocity) / this.size,
        this.driving = !0
    }
    clone() {
        let t = super.clone();
        return t.speedValue = this.speedValue,
        t
    }
}
class Q {
    constructor(t, e, s) {
        this.vec = t,
        this.x = e,
        this.y = s
    }
    scale(t, e) {
        return this.vec.add(this.x.scale(t)).add(this.y.scale(e))
    }
}
class w {
    static render(t, e) {
        t.beginPath();
        for (let s of e) {
            let i = s.shift();
            t.moveTo(i.x, i.y);
            for (let a of s)
                t.lineTo(a.x, a.y)
        }
        t.stroke()
    }
}
class dt extends W {
    constructor(t, e, s, i) {
        super(new l(e.x + 5 * (Math.random() - Math.random()),e.y + 5 * (Math.random() - Math.random())), new l(s.x + 5 * (Math.random() - Math.random()),s.y + 5 * (Math.random() - Math.random()))),
        this.bike = t,
        this.explosion = i,
        this.track = this.explosion.track,
        this.size = 2 + Math.random() * 9,
        this.rotation = Math.random() * 2 * Math.PI,
        this.rotationSpeed = Math.random() - Math.random(),
        this.friction = .05,
        this.touch = !0,
        this.shape = [1, .7, .8, .9, .5, 1, .7, 1]
    }
    drive(t) {
        this.rotationSpeed = t.dot(this.velocity) / this.size,
        this.pos.selfAdd(t.scale(-t.dot(this.velocity) * this.friction)),
        this.rotation += this.rotationSpeed;
        let e = t.getLength();
        if (e > 0) {
            let s = new l(-t.y / e,t.x / e);
            this.oldPos.selfAdd(s.scale(s.dot(this.velocity) * .8))
        }
    }
    fixedUpdate() {
        this.velocity.selfAdd(this.explosion.gravity),
        this.velocity = this.velocity.scale(.99),
        this.pos.selfAdd(this.velocity),
        this.driving = !1,
        this.touch && this.track.touch(this),
        this.velocity = this.pos.sub(this.oldPos),
        this.oldPos.set(this.pos),
        super.fixedUpdate()
    }
    update(t, e) {
        super.update(t),
        this.rotation += this.rotationSpeed * e / 40
    }
    render(t) {
        let e = this.displayPos.toPixel(this.track)
          , s = this.size * this.track.zoomFactor
          , i = new Array;
        for (let a in this.shape) {
            let r = this.shape[a] * s
              , n = e.x + r * Math.cos(this.rotation + Math.PI * a / 4)
              , h = e.y + r * Math.sin(this.rotation + Math.PI * a / 4);
            i.push(new l(n,h))
        }
        t.fillStyle = "#000",
        w.render(t, [i]),
        t.fill()
    }
}
class Fe extends W {
    constructor(t, e, s, i, a) {
        super(t, e),
        this.track = a,
        this.speedValue = 30 + 20 * Math.random(),
        this.points = [new dt(s,t,e,this), new dt(s,t,e,this), new dt(s,t,e,this), new dt(s,t,e,this), new dt(s,t,e,this)],
        this.pos = t.clone(),
        this.gravity = s.gravity.clone(),
        this.time = i
    }
    fixedUpdate() {
        for (let t of this.points)
            t.fixedUpdate()
    }
    update(t, e) {
        for (let s of this.points)
            s.update(t, e)
    }
    render(t) {
        if (this.speedValue > 0) {
            this.speedValue -= 10;
            let e = this.pos.toPixel(this.track)
              , s = Math.random() * 2 * Math.PI
              , i = new Array;
            for (let a = 0; a < 16; a++) {
                let r = (this.speedValue + 30 * Math.random()) / 2
                  , n = e.x + r * Math.cos(s + 2 * Math.PI * a / 16)
                  , h = e.y + r * Math.sin(s + 2 * Math.PI * a / 16);
                i.push(new l(n,h))
            }
            t.fillStyle = "#ff0",
            w.render(t, [i]),
            t.fill()
        }
        for (let e of this.points)
            e.render(t)
    }
}
class I extends F {
    constructor(t, e) {
        super(),
        this.id = I.id++,
        this.track = e,
        this.pos = t,
        this.endPos = t,
        this.recorded = !1,
        this.grid = null,
        this.cache = null
    }
    static get itemName() {
        return "Item"
    }
    static get color() {
        return "#fff"
    }
    static get code() {
        return null
    }
    fixedUpdate() {}
    update(t, e) {}
    render(t) {
        let e = this.pos.toPixel(this.track);
        t.save(),
        t.fillStyle = this.constructor.color,
        t.lineWidth = Math.max(2 * this.track.zoomFactor, .5),
        t.beginPath(),
        t.moveTo(e.x + 7 * this.track.zoomFactor, e.y),
        t.arc(e.x, e.y, 7 * this.track.zoomFactor, 0, 2 * Math.PI, !0),
        t.fill(),
        t.stroke(),
        t.restore()
    }
    renderDebug(t) {
        let e = this.pos.toPixel(this.track);
        t.save(),
        t.font = `bold ${Math.min(15 * this.track.zoomFactor, 15)}px Ubuntu`,
        t.fillStyle = "#000";
        let s = t.measureText(this.id);
        t.fillText(this.id, e.x - s.width / 2, e.y - 15 * this.track.zoomFactor),
        t.restore()
    }
    touch(t) {
        t.pos.distanceToSquared(this.pos) < 500 && this.onTouch(t)
    }
    checkDelete(t, e) {
        return t.distanceTo(this.pos) < e + 7 ? (this.removeFromTrack(),
        this) : null
    }
    addToTrack() {
        return this.track.add(this, this.grid, this.cache),
        this.onAdd(),
        this
    }
    removeFromTrack() {
        return this.track.remove(this),
        this.onDelete(),
        this
    }
    toString() {
        return this.recorded = !0,
        this.constructor.code + " " + this.pos.toString()
    }
    onTouch(t) {}
    onDelete() {
        this.grid.totalObjects.delete(this.id)
    }
    onAdd() {
        this.grid.totalObjects.set(this.id, this)
    }
    static createInstance(t, e) {
        let s = new l(parseInt(t[1], 32),parseInt(t[2], 32));
        return new this(s,e)
    }
}
I.id = 0;
class ot extends I {
    constructor(t, e) {
        super(t, e),
        this.reached = !1
    }
    static get reachedColor() {
        return "#fff"
    }
    render(t) {
        let e = this.pos.toPixel(this.track);
        t.save(),
        t.fillStyle = this.reached ? this.constructor.reachedColor : this.constructor.color,
        t.lineWidth = Math.max(2 * this.track.zoomFactor, .5),
        t.beginPath(),
        t.moveTo(e.x + 7 * this.track.zoomFactor, e.y),
        t.arc(e.x, e.y, 7 * this.track.zoomFactor, 0, 2 * Math.PI, !0),
        t.fill(),
        t.stroke(),
        t.restore()
    }
    onTouch(t) {
        (t.bike.runner instanceof rt || !this.reached) && (t.bike.runner instanceof rt || (this.reached = !0),
        t.bike.runner.actionQueue.has(this.id) || this.onReach(t))
    }
    onReach(t) {
        t.bike.runner.reachablesReached.has(this.id) || t.bike.runner.actionQueue.set(this.id, this)
    }
    onAdd() {
        super.onAdd(),
        this.track.reachables.set(this.id, this)
    }
    onDelete() {
        super.onDelete(),
        this.track.reachables.delete(this.id)
    }
}
class zt extends ot {
    static get itemName() {
        return "Checkpoint"
    }
    static get color() {
        return "#00f"
    }
    static get reachedColor() {
        return "#aaf"
    }
    static get code() {
        return "C"
    }
}
class Ut extends ot {
    static get itemName() {
        return "Target"
    }
    static get color() {
        return "#ff0"
    }
    static get reachedColor() {
        return "#ffa"
    }
    static get code() {
        return "T"
    }
    onReach(t) {
        t.bike.runner.targetsReached.has(this.id) || t.bike.runner.actionQueue.set(this.id, this)
    }
    onAdd() {
        super.onAdd(),
        this.track.targets.set(this.id, this)
    }
    onDelete() {
        super.onDelete(),
        this.track.targets.delete(this.id)
    }
}
class v extends F {
    constructor(t, e) {
        super(),
        this.a = t,
        this.b = e,
        this.lengthTowards = 40,
        this.len = 40,
        this.dampConstant = .5,
        this.springConstant = .7
    }
    lean(t, e) {
        this.len += (this.lengthTowards - t - this.len) / e
    }
    rotate(t) {
        let e = this.b.pos.sub(this.a.pos)
          , s = new l(-e.y / this.len,e.x / this.len);
        this.a.pos.selfAdd(s.scale(t)),
        this.b.pos.selfAdd(s.scale(-t))
    }
    turn() {
        let t = new l;
        t.set(this.a.pos),
        this.a.pos.set(this.b.pos),
        this.b.pos.set(t),
        t.set(this.a.oldPos),
        this.a.oldPos.set(this.b.oldPos),
        this.b.oldPos.set(t),
        t.set(this.a.velocity),
        this.a.velocity.set(this.b.velocity),
        this.b.velocity.set(t),
        t = this.a.rotation,
        this.a.rotation = this.b.rotation,
        this.b.rotation = t
    }
    getLength() {
        return this.b.pos.sub(this.a.pos).getLength()
    }
    clone() {
        let t = new v(this.a,this.b);
        return t.lengthTowards = this.lengthTowards,
        t.len = this.len,
        t.dampConstant = this.dampConstant,
        t.springConstant = this.springConstant,
        t
    }
    fixedUpdate() {
        let t = this.b.pos.sub(this.a.pos)
          , e = t.getLength();
        if (e < 1)
            return this;
        t = t.scale(1 / e);
        let s = t.scale((e - this.len) * this.springConstant)
          , i = this.b.velocity.sub(this.a.velocity).dot(t) * this.dampConstant;
        return s.selfAdd(t.scale(i)),
        this.b.velocity.selfAdd(s.scale(-1)),
        this.a.velocity.selfAdd(s),
        this
    }
    update(t, e) {}
    render(t) {}
}
class Oe extends W {
    constructor(t, e) {
        super(new l, new l, 0),
        this.rider = t,
        this.track = e.track,
        this.points = [this.head = new x(t.head,e), this.hip = new x(t.hip,e), this.elbow = new x(t.elbow,e), this.shadowElbow = new x(t.shadowElbow,e), this.hand = new x(t.hand,e), this.shadowHand = new x(t.shadowHand,e), this.knee = new x(t.knee,e), this.shadowKnee = new x(t.shadowKnee,e), this.foot = new x(t.foot,e), this.shadowFoot = new x(t.shadowFoot,e)],
        this.inflexibleJoints = [new v(this.head,this.hip), new v(this.head,this.elbow), new v(this.elbow,this.hand), new v(this.head,this.shadowElbow), new v(this.shadowElbow,this.shadowHand)],
        this.joints = this.inflexibleJoints.concat([new v(this.hip,this.knee), new v(this.knee,this.foot), new v(this.hip,this.shadowKnee), new v(this.shadowKnee,this.shadowFoot)]);
        for (let s of this.points)
            s.size = 3,
            s.friction = .05;
        this.head.size = this.hip.size = 8;
        for (let s of this.joints)
            s.springConstant = .4,
            s.dampConstant = .7
    }
    setVelocity(t, e) {
        t.selfScale(.5),
        e.selfScale(.5);
        for (let a of this.joints) {
            let r = a.getLength();
            r > 20 && (r = 20),
            a.len = r,
            a.lengthTowards = r
        }
        for (let a of this.inflexibleJoints)
            a.lengthTowards = 13,
            a.len = 13;
        let s = [this.head, this.elbow, this.shadowElbow, this.hand, this.shadowHand]
          , i = [this.hip, this.knee, this.shadowKnee, this.foot, this.shadowFoot];
        for (let a of s)
            a.oldPos = a.pos.sub(t);
        for (let a of i)
            a.oldPos = a.pos.sub(e);
        for (let a of this.points)
            a.velocity.set(a.pos.sub(a.oldPos)),
            a.velocity.x += Math.random() - Math.random(),
            a.velocity.y += Math.random() - Math.random()
    }
    fixedUpdate() {
        for (let t of this.joints)
            t.fixedUpdate();
        for (let t of this.points)
            t.fixedUpdate()
    }
    update(t, e) {
        for (let s of this.points)
            s.update(t, e)
    }
    render(t) {
        let e = this.head.displayPos.toPixel(this.track)
          , s = this.elbow.displayPos.toPixel(this.track)
          , i = this.hand.displayPos.toPixel(this.track)
          , a = this.shadowElbow.displayPos.toPixel(this.track)
          , r = this.shadowHand.displayPos.toPixel(this.track)
          , n = this.knee.displayPos.toPixel(this.track)
          , h = this.foot.displayPos.toPixel(this.track)
          , c = this.shadowKnee.displayPos.toPixel(this.track)
          , d = this.shadowFoot.displayPos.toPixel(this.track)
          , u = this.hip.displayPos.toPixel(this.track);
        t.lineWidth = 5 * this.track.zoomFactor,
        t.strokeStyle = "rgba(0,0,0,0.5)",
        w.render(t, [[e, a, r], [u, c, d]]),
        t.strokeStyle = "#000",
        w.render(t, [[e, s, i], [u, n, h]]),
        t.lineWidth = 8 * this.track.zoomFactor,
        w.render(t, [[u, e]]),
        e.selfAdd(e.sub(u).scale(.25)),
        t.lineWidth = 2 * this.track.zoomFactor,
        t.beginPath(),
        t.moveTo(e.x + 5 * this.track.zoomFactor, e.y),
        t.arc(e.x, e.y, 5 * this.track.zoomFactor, 0, 2 * Math.PI, !0),
        t.stroke()
    }
}
class te extends I {
    static get itemName() {
        return "Bomb"
    }
    static get color() {
        return "#f00"
    }
    static get code() {
        return "O"
    }
    onTouch(t) {
        t.bike.runner.explode(this.pos, t.velocity)
    }
}
class ee extends I {
    static get itemName() {
        return "Slow-Motion"
    }
    static get color() {
        return "#eee"
    }
    static get code() {
        return "S"
    }
    onTouch(t) {
        t.bike.setSlow(!0)
    }
}
class Nt extends I {
    constructor(t, e, s) {
        super(t, s),
        this.rotation = e;
        let i = e * Math.PI / 180;
        this.direction = new l(-Math.sin(i),Math.cos(i))
    }
    render(t) {
        let e = this.pos.toPixel(this.track);
        t.save(),
        t.fillStyle = this.constructor.color,
        t.lineWidth = Math.max(2 * this.track.zoomFactor, .5),
        t.beginPath(),
        t.translate(e.x, e.y),
        t.rotate(this.rotation * Math.PI / 180),
        t.moveTo(-7 * this.track.zoomFactor, -10 * this.track.zoomFactor),
        t.lineTo(0, 10 * this.track.zoomFactor),
        t.lineTo(7 * this.track.zoomFactor, -10 * this.track.zoomFactor),
        t.lineTo(-7 * this.track.zoomFactor, -10 * this.track.zoomFactor),
        t.fill(),
        t.stroke(),
        t.restore()
    }
    touch(t) {
        t.pos.distanceToSquared(this.pos) < 1e3 && this.onTouch(t)
    }
    toString() {
        return this.constructor.code + " " + this.pos.toString() + " " + (this.rotation - 180).toString(32)
    }
    static createInstance(t, e) {
        let s = new l(parseInt(t[1], 32),parseInt(t[2], 32));
        return new this(s,parseInt(t[3], 32) + 180,e)
    }
}
class se extends Nt {
    static get itemName() {
        return "Boost"
    }
    static get color() {
        return "#ff0"
    }
    static get code() {
        return "B"
    }
    onTouch(t) {
        for (let e of t.bike.points)
            e.pos.selfAdd(this.direction)
    }
}
class ie extends Nt {
    constructor(t, e, s) {
        super(t, e, s),
        this.direction.selfScale(.3)
    }
    static get itemName() {
        return "Gravity"
    }
    static get color() {
        return "#0f0"
    }
    static get code() {
        return "G"
    }
    onTouch(t) {
        t.bike.gravity.set(this.direction)
    }
}
class ae extends ot {
    constructor(t) {
        super(new l, t),
        this.instances = new Array
    }
    addToTrack() {
        for (let t of this.instances)
            t.grid = this.grid,
            t.cache = this.cache,
            t.addToTrack(!0)
    }
    removeFromTrack() {
        for (let t of this.instances)
            t.removeFromTrack(!0)
    }
    toString(t) {
        let e = t;
        for (let s of this.instances)
            s.recorded = !0,
            e += s.toString(!0).substring(1);
        return e
    }
    onTouch(t, e) {
        (t.bike.runner instanceof rt || !this.reached) && (t.bike.runner instanceof rt || (this.reached = !0,
        this.instances.forEach(s=>{
            s.reached = !0,
            t.bike.runner.reachablesReached.has(s.id) || t.bike.runner.actionQueue.set(s.id, s)
        }
        )),
        this.onReach(t),
        this.instances.filter(s=>s !== e).forEach(s=>{
            e.onReach(t, s)
        }
        ))
    }
    static createInstance(t, e, s) {
        let i = new this(e);
        for (let a = 0; a < s.itemCount; a++) {
            let r = [t[0]];
            for (let h = 1; h < s.argumentCount + 1; h++)
                r.push(t[a * s.argumentCount + h]);
            let n = s.createInstance(r, e, !0);
            n.group = i,
            i.instances.push(n)
        }
        return i
    }
}
class Gt extends ot {
    static get itemCount() {
        return 2
    }
    static get argumentCount() {
        return 2
    }
    constructor(t, e) {
        super(t, e),
        this.group = null
    }
    addToTrack(t) {
        t ? super.addToTrack() : this.group.addToTrack()
    }
    removeFromTrack(t) {
        t ? super.removeFromTrack() : this.group.removeFromTrack()
    }
    onTouch(t) {
        this.group.onTouch(t, this)
    }
    toString(t) {
        return t ? super.toString() : this.group.toString(this.constructor.code)
    }
    renderDebug(t) {
        t.save(),
        t.strokeStyle = "#f00";
        let e = this.pos.toPixel(this.track);
        t.moveTo(e.x, e.y),
        this.group.instances.filter(s=>s !== this).forEach(s=>{
            let i = s.pos.toPixel(this.track);
            t.lineTo(i.x, i.y)
        }
        ),
        t.stroke(),
        t.restore()
    }
    static createInstance(t, e, s) {
        return s ? super.createInstance(t, e) : ae.createInstance(t, e, this)
    }
}
class re extends Gt {
    static get itemName() {
        return "Teleporter"
    }
    static get color() {
        return "#f0f"
    }
    static get reachedColor() {
        return "#faf"
    }
    static get code() {
        return "W"
    }
    onReach(t, e) {
        if (e && !t.bike.runner.reachablesReached.has(this.id)) {
            let s = e.pos.sub(this.pos);
            t.bike.points.forEach(i=>{
                i.pos.selfAdd(s),
                i.oldPos.selfAdd(s)
            }
            ),
            this.track.focalPoint != null && this.track.focalPoint == t.bike.hitbox && this.track.camera.set(this.track.focalPoint.pos)
        }
    }
}
const ze = [te, ee, se, zt, ie, Ut, re]
  , qt = "LINE"
  , Ft = "LINE_FOREGROUND"
  , Ue = {
    INVINCIBILITY: 1 << 0,
    NO_STEER: 1 << 1
};
class oe extends F {
    constructor(t, e) {
        super(),
        this.track = t,
        this.done = !1,
        this.snapshots = new Array,
        this.targetsReached = new Map,
        this.reachablesReached = new Map,
        this.instance = null,
        this.initialBike = null,
        this.bikeClass = e,
        this.upPressed = !1,
        this.downPressed = !1,
        this.leftPressed = !1,
        this.rightPressed = !1,
        this.turnPressed = !1,
        this.actionQueue = new Map,
        this.mustSave = !1,
        this.dead = !1,
        this.deadObject = null,
        this.modifiersMask = 0
    }
    createBike() {
        let t = this.bikeClass;
        this.instance = new t(this.track,this),
        this.assignColor(),
        this.initialBike = this.instance.clone()
    }
    assignColor() {}
    startFrom(t) {
        this.done = !1,
        this.dead = !1,
        this.deadObject = null,
        this.actionQueue = new Map;
        let e = this.initialBike;
        this.targetsReached = new Map,
        this.reachablesReached = new Map,
        this.upPressed = !1,
        this.downPressed = !1,
        this.leftPressed = !1,
        this.rightPressed = !1,
        this.turnPressed = !1,
        this.modifiersMask = 0,
        this.track.time = 0,
        t && (e = t.bike,
        this.targetsReached = new Map(t.targetsReached),
        this.reachablesReached = new Map(t.reachablesReached),
        this.upPressed = t.upPressed,
        this.downPressed = t.downPressed,
        this.leftPressed = t.leftPressed,
        this.rightPressed = t.rightPressed,
        this.turnPressed = t.turnPressed,
        this.modifiersMask = t.modifiersMask,
        this.track.time = t.time),
        this.instance = e.clone(),
        this.track.toolManager.active = !1
    }
    die() {
        return this.modifiersMask & Ue.INVINCIBILITY ? !1 : (this.dead = !0,
        this.upPressed = !1,
        this.downPressed = !1,
        this.leftPressed = !1,
        this.rightPressed = !1,
        this.turnPressed = !1,
        this.instance.hitbox.touch = !1,
        this.instance.hitbox.drive = ()=>{}
        ,
        this.instance.backWheel.speedValue = 0,
        !0)
    }
    crash() {
        this.die() && (this.deadObject = new Oe(this.instance.getRider(),this.instance),
        this.deadObject.setVelocity(this.instance.hitbox.velocity.clone(), this.instance.backWheel.velocity.clone()))
    }
    explode(t, e) {
        this.die() && (this.deadObject = new Fe(t,e,this.instance.clone(),this.track.time,this.track),
        this.instance = null)
    }
    hitReachable(t) {
        this.reachablesReached.has(t.id) || this.reachablesReached.set(t.id, !0)
    }
    hitTarget(t) {
        this.targetsReached.has(t.id) || (this.targetsReached.set(t.id, !0),
        this.onHitTarget())
    }
    hitCheckpoint(t) {
        this.reachablesReached.has(t.id) || (this.reachablesReached.set(t.id, !0),
        this.onHitCheckpoint())
    }
    onHitTarget() {}
    onHitCheckpoint() {}
    reset() {
        this.snapshots = new Array
    }
    restart() {
        this.startFrom(this.snapshots[this.snapshots.length - 1])
    }
    save() {
        this.snapshots.push(this.snapshot())
    }
    snapshot() {
        return {
            time: this.track.time,
            targetsReached: new Map(this.targetsReached),
            reachablesReached: new Map(this.reachablesReached),
            upPressed: this.upPressed,
            downPressed: this.downPressed,
            leftPressed: this.leftPressed,
            rightPressed: this.rightPressed,
            turnPressed: this.turnPressed,
            bike: this.instance.clone(),
            modifiersMask: this.modifiersMask
        }
    }
    popCheckpoint() {
        this.snapshots.pop()
    }
    processActionQueue() {
        this.actionQueue.forEach(t=>{
            t instanceof zt ? this.hitCheckpoint(t) : t instanceof Ut ? this.hitTarget(t) : t instanceof ot && this.hitReachable(t)
        }
        )
    }
    updateControls() {
        throw new Exception("Unimplemented method updateControls()")
    }
    renderInstance(t) {
        throw new Exception("Unimplemented method renderInstance(ctx)")
    }
    fixedUpdate() {
        if (this.actionQueue.size && (this.processActionQueue(),
        this.actionQueue = new Map),
        this.mustSave && (this.mustSave = !1,
        this.save()),
        this.instance instanceof at && (this.instance.backWheel.driving && this.instance.frontWheel.driving && !this.dead && this.instance.setSlow(!1),
        this.dead || this.updateControls(),
        this.instance.updatePhysics(),
        this.instance.slow && (this.instance.slowParity = 1 - this.instance.slowParity),
        !this.instance.slow || this.instance.slowParity === 0)) {
            for (let t = this.instance.joints.length - 1; t >= 0; t--)
                this.instance.joints[t].fixedUpdate();
            for (let t = this.instance.points.length - 1; t >= 0; t--)
                this.instance.points[t].fixedUpdate()
        }
        this.deadObject instanceof W && this.deadObject.fixedUpdate()
    }
    update(t, e) {
        this.instance instanceof at && (this.instance.slow && (t = (t + this.instance.slowParity) / 2),
        this.instance.backWheel.update(t),
        this.instance.frontWheel.update(t),
        this.instance.hitbox.update(t),
        this.upPressed && (this.instance.distance += this.instance.backWheel.rotationSpeed * e / 100)),
        this.deadObject instanceof W && this.deadObject.update(t, e)
    }
    render(t) {
        this.instance instanceof at && this.renderInstance(t),
        this.deadObject instanceof W && this.deadObject.render(t)
    }
    renderDebug(t) {
        let e = new Array;
        this.instance instanceof at && (e = e.concat(this.instance.points)),
        this.deadObject instanceof W && (e = e.concat(this.deadObject.points));
        for (let s of e)
            if (s.touch) {
                let i = Math.floor(s.pos.x / this.track.grid.cellSize - .5)
                  , a = Math.floor(s.pos.y / this.track.grid.cellSize - .5)
                  , r = this.track.grid.cellSize * this.track.zoomFactor
                  , n = Math.floor(this.track.canvas.width / 2 - this.track.camera.x * this.track.zoomFactor + i * r)
                  , h = Math.floor(this.track.canvas.height / 2 - this.track.camera.y * this.track.zoomFactor + a * r);
                t.fillStyle = "#ff000005",
                t.fillRect(n, h, r, r),
                t.fillRect(n, h + r, r, r),
                t.fillRect(n + r, h, r, r),
                t.fillRect(n + r, h + r, r, r);
                let c = s.displayPos.toPixel(this.track);
                t.fillStyle = "#00ff0055",
                t.beginPath(),
                t.arc(c.x, c.y, s.size * this.track.zoomFactor, 0, 2 * Math.PI, !0),
                t.fill()
            }
    }
}
class at {
    static get bikeName() {
        return "Bike"
    }
    constructor(t, e) {
        this.track = t,
        this.runner = e,
        this.friction = .99,
        this.distance = 0,
        this.direction = 1,
        this.gravity = new l(0,.3),
        this.slow = !1,
        this.slowParity = 0,
        this.color = "#000",
        this.headGear = "hat",
        this.rotationFactor = 0,
        this.hitbox = new x(new l,this),
        this.hitbox.drive = s=>this.runner.crash(),
        this.backWheel = new Qt(new l,this),
        this.frontWheel = new Qt(new l,this),
        this.headToBack = new v(this.hitbox,this.backWheel),
        this.frontToBack = new v(this.backWheel,this.frontWheel),
        this.headToFront = new v(this.frontWheel,this.hitbox),
        this.points = [this.hitbox, this.backWheel, this.frontWheel],
        this.joints = [this.headToBack, this.frontToBack, this.headToFront],
        this.keyLog = new Map,
        this.keyLog.set("upPressed", new Array),
        this.keyLog.set("downPressed", new Array),
        this.keyLog.set("leftPressed", new Array),
        this.keyLog.set("rightPressed", new Array),
        this.keyLog.set("turnPressed", new Array),
        this.setBikeInitialState(t.origin)
    }
    setBikeInitialState(t) {}
    updatePhysics() {
        this.runner.turnPressed && this.turn(),
        this.backWheel.speedValue += (this.runner.upPressed - this.backWheel.speedValue) / 10;
        let t = this.runner.leftPressed - this.runner.rightPressed;
        this.headToBack.lean(t * 5 * this.direction, 5),
        this.headToFront.lean(-t * 5 * this.direction, 5),
        this.frontToBack.rotate(t / this.rotationFactor),
        !t && this.runner.upPressed && (this.headToBack.lean(-7, 5),
        this.headToFront.lean(7, 5))
    }
    setSlow(t) {
        (!this.slow && t || !t) && (this.slowParity = 0),
        this.slow = t
    }
    turn() {
        this.direction = -this.direction,
        this.frontToBack.turn();
        let t = this.headToBack.len;
        this.headToBack.len = this.headToFront.len,
        this.headToFront.len = t
    }
    getRider() {
        let t = {}
          , e = this.frontWheel.pos.sub(this.backWheel.pos)
          , s = this.hitbox.pos.sub(this.frontWheel.pos.add(this.backWheel.pos).scale(.5))
          , i = new l(e.y * this.direction,-e.x * this.direction)
          , a = new l(6 * Math.cos(this.distance),6 * Math.sin(this.distance))
          , r = 9
          , n = 7
          , h = 13
          , c = new Q(this.backWheel.pos,e,s)
          , d = new Q(this.backWheel.pos,e,i);
        t.head = c.scale(.35, 1.2),
        t.hand = d.scale(.8, .68),
        t.shadowHand = t.hand.clone(),
        t.hip = d.scale(.2, .5),
        t.foot = d.scale(.4, .05).add(a),
        t.shadowFoot = d.scale(.4, .05).sub(a);
        let u = t.head.sub(t.hand)
          , y = new l(u.y * this.direction,-u.x * this.direction)
          , M = (r ** 2 + n ** 2) / y.lengthSquared();
        t.elbow = t.head.add(t.hand).scale(.5).add(y.scale(M)),
        t.shadowElbow = t.elbow.clone();
        let A = t.hip.sub(t.foot)
          , p = new l(-A.y * this.direction,A.x * this.direction)
          , P = 2 * h ** 2 / p.lengthSquared();
        t.knee = t.hip.add(t.foot).scale(.5).add(p.scale(P));
        let C = t.hip.sub(t.shadowFoot)
          , S = new l(-C.y * this.direction,C.x * this.direction)
          , D = 2 * h ** 2 / S.lengthSquared();
        return t.shadowKnee = t.hip.add(t.shadowFoot).scale(.5).add(S.scale(D)),
        t
    }
    clone() {
        let t = new this.constructor(this.track,this.runner);
        t.friction = this.friction,
        t.distance = this.distance,
        t.direction = this.direction,
        t.gravity = this.gravity.clone(),
        t.slow = this.slow,
        t.slowParity = this.slowParity,
        t.color = this.color,
        t.headGear = this.headGear,
        t.rotationFactor = this.rotationFactor,
        t.backWheel = this.backWheel.clone(),
        t.backWheel.bike = t,
        t.frontWheel = this.frontWheel.clone(),
        t.frontWheel.bike = t,
        t.hitbox = this.hitbox.clone(),
        t.hitbox.bike = t,
        t.hitbox.drive = s=>t.runner.crash(),
        t.headToBack = this.headToBack.clone(),
        t.headToBack.a = t.hitbox,
        t.headToBack.b = t.backWheel,
        t.frontToBack = this.frontToBack.clone(),
        t.frontToBack.a = t.backWheel,
        t.frontToBack.b = t.frontWheel,
        t.headToFront = this.headToFront.clone(),
        t.headToFront.a = t.frontWheel,
        t.headToFront.b = t.hitbox,
        t.points = [t.hitbox, t.backWheel, t.frontWheel],
        t.joints = [t.headToBack, t.frontToBack, t.headToFront];
        let e = new Map;
        return e.set("upPressed", [...this.keyLog.get("upPressed")]),
        e.set("downPressed", [...this.keyLog.get("downPressed")]),
        e.set("leftPressed", [...this.keyLog.get("leftPressed")]),
        e.set("rightPressed", [...this.keyLog.get("rightPressed")]),
        e.set("turnPressed", [...this.keyLog.get("turnPressed")]),
        t.keyLog = e,
        t
    }
}
class Ct extends at {
    static get bikeName() {
        return "BMX"
    }
    constructor(t, e) {
        super(t, e),
        this.hitbox.size = 14,
        this.backWheel.size = 11.7,
        this.frontWheel.size = 11.7,
        this.headToBack.len = 45,
        this.headToBack.lengthTowards = 45,
        this.headToBack.springConstant = .35,
        this.headToBack.dampConstant = .3,
        this.frontToBack.len = 42,
        this.frontToBack.lengthTowards = 42,
        this.frontToBack.springConstant = .35,
        this.frontToBack.dampConstant = .3,
        this.headToFront.len = 45,
        this.headToFront.lengthTowards = 45,
        this.headToFront.springConstant = .35,
        this.headToFront.dampConstant = .3,
        this.rotationFactor = 6
    }
    setBikeInitialState(t) {
        this.hitbox.pos = new l(t.x,t.y - 1),
        this.hitbox.oldPos = this.hitbox.pos.clone(),
        this.hitbox.displayPos = this.hitbox.pos.clone(),
        this.backWheel.pos = new l(t.x - 21,t.y + 38),
        this.backWheel.oldPos = this.backWheel.pos.clone(),
        this.backWheel.displayPos = this.backWheel.pos.clone(),
        this.frontWheel.pos = new l(t.x + 21,t.y + 38),
        this.frontWheel.oldPos = this.frontWheel.pos.clone(),
        this.frontWheel.displayPos = this.frontWheel.pos.clone()
    }
}
class ne extends at {
    static get bikeName() {
        return "MTB"
    }
    constructor(t, e) {
        super(t, e),
        this.hitbox.size = 14,
        this.backWheel.size = 14,
        this.frontWheel.size = 14,
        this.headToBack.len = 47,
        this.headToBack.lengthTowards = 47,
        this.headToBack.springConstant = .2,
        this.headToBack.dampConstant = .3,
        this.frontToBack.len = 45,
        this.frontToBack.lengthTowards = 45,
        this.frontToBack.springConstant = .2,
        this.frontToBack.dampConstant = .3,
        this.headToFront.len = 45,
        this.headToFront.lengthTowards = 45,
        this.headToFront.springConstant = .2,
        this.headToFront.dampConstant = .3,
        this.rotationFactor = 8
    }
    setBikeInitialState(t) {
        this.hitbox.pos = new l(t.x + 2,t.y - 3),
        this.hitbox.oldPos = this.hitbox.pos.clone(),
        this.hitbox.displayPos = this.hitbox.pos.clone(),
        this.backWheel.pos = new l(t.x - 23,t.y + 35),
        this.backWheel.oldPos = this.backWheel.pos.clone(),
        this.backWheel.displayPos = this.backWheel.pos.clone(),
        this.frontWheel.pos = new l(t.x + 23,t.y + 35),
        this.frontWheel.oldPos = this.frontWheel.pos.clone(),
        this.frontWheel.displayPos = this.frontWheel.pos.clone()
    }
}
class Ne {
    static render(t, e, s) {
        let i = e.backWheel.displayPos.toPixel(e.track)
          , a = e.frontWheel.displayPos.toPixel(e.track)
          , r = e.hitbox.displayPos.toPixel(e.track)
          , n = a.sub(i)
          , h = new l((a.y - i.y) * e.direction,(i.x - a.x) * e.direction)
          , c = new Q(i,n,h)
          , d = 3.5
          , u = (e.backWheel.size - d / 2) * e.track.zoomFactor
          , y = c.scale(.3, .25)
          , M = c.scale(.84, .42)
          , A = c.scale(.84, .37)
          , p = c.scale(.4, .05)
          , P = new l(6 * e.track.zoomFactor * Math.cos(e.distance),6 * e.track.zoomFactor * Math.sin(e.distance))
          , C = p.add(P)
          , S = p.sub(P)
          , D = c.scale(.17, .38)
          , O = c.scale(.3, .45)
          , z = c.scale(.25, .4)
          , U = c.scale(.97, 0)
          , N = c.scale(.8, .48)
          , B = c.scale(.86, .5)
          , ut = c.scale(.82, .65)
          , H = c.scale(.78, .67);
        if (t.strokeStyle = e.color,
        t.globalAlpha = s,
        t.lineWidth = d * e.track.zoomFactor,
        t.beginPath(),
        t.arc(i.x, i.y, u, 0, 2 * Math.PI, !0),
        t.moveTo(a.x + u, a.y),
        t.arc(a.x, a.y, u, 0, 2 * Math.PI, !0),
        t.stroke(),
        t.lineWidth = 3 * e.track.zoomFactor,
        w.render(t, [[i, y, M], [A, p, i], [C, S], [D, O], [p, z], [a, U, N, B, ut, H]]),
        e.runner.dead)
            return;
        let gt = r.sub(i.add(n.scale(.5)))
          , L = new Q(y,n,gt)
          , G = L.scale(-.1, .3)
          , ht = L.scale(.05, .9)
          , _ = L.scale(.15, 1.05)
          , E = 2 * (10 * e.track.zoomFactor) ** 2
          , K = C.sub(G)
          , X = new l(K.y * e.direction,-K.x * e.direction)
          , ft = E / K.lengthSquared()
          , lt = G.add(K.scale(.5)).add(X.scale(ft))
          , ct = S.sub(G)
          , pt = new l(ct.y * e.direction,-ct.x * e.direction)
          , J = E / ct.lengthSquared()
          , Lt = G.add(ct.scale(.5)).add(pt.scale(J))
          , kt = 5 * e.track.zoomFactor
          , Pt = 9 * e.track.zoomFactor
          , $ = 7 * e.track.zoomFactor
          , Rt = Pt ** 2 + $ ** 2
          , tt = ht.sub(H)
          , xt = new l(tt.y * e.direction,-tt.x * e.direction)
          , mt = Rt / tt.lengthSquared()
          , It = H.add(tt.scale(.4)).add(xt.scale(mt));
        t.lineCap = "round",
        t.lineWidth = 6 * e.track.zoomFactor,
        t.globalAlpha = .5 * s,
        w.render(t, [[S, Lt, G]]),
        t.globalAlpha = s,
        w.render(t, [[C, lt, G]]),
        t.lineWidth = 8 * e.track.zoomFactor,
        w.render(t, [[G, ht]]),
        t.lineWidth = 2 * e.track.zoomFactor,
        t.beginPath(),
        t.moveTo(_.x + kt, _.y),
        t.arc(_.x, _.y, kt, 0, 2 * Math.PI, !0),
        t.stroke();
        let yt = L.scale(.35, 1.15)
          , wt = L.scale(-.05, 1.1)
          , et = L.scale(.25, 1.13)
          , Dt = L.scale(.05, 1.11)
          , Bt = yt.sub(L.x.scale(.1)).selfAdd(L.y.scale(.2))
          , Et = wt.add(L.x.scale(.02)).selfAdd(L.y.scale(.2));
        t.fillStyle = e.color,
        w.render(t, [[yt, et, Bt, Et, Dt, wt]]),
        t.fill(),
        t.lineWidth = 5 * e.track.zoomFactor,
        w.render(t, [[ht, It, H]]),
        t.strokeStyle = "#000",
        t.globalAlpha = 1
    }
}
class Ge {
    static render(t, e, s) {
        let i = e.backWheel.displayPos.toPixel(e.track)
          , a = e.frontWheel.displayPos.toPixel(e.track)
          , r = e.hitbox.displayPos.toPixel(e.track)
          , n = a.sub(i)
          , h = new l((a.y - i.y) * e.direction,(i.x - a.x) * e.direction)
          , c = r.sub(i.add(n.scale(.5)))
          , d = new Q(i,n,h)
          , u = new Q(i,n,c)
          , y = 3.5
          , M = (e.backWheel.size - y / 2) * e.track.zoomFactor
          , A = d.scale(.4, .05)
          , p = u.scale(.46, .4)
          , P = u.scale(.72, .64)
          , C = d.scale(.43, .05)
          , S = u.scale(.45, .3)
          , D = u.scale(.3, .4)
          , O = u.scale(.46, .4)
          , z = u.scale(.28, .5)
          , U = u.scale(.25, .6)
          , N = u.scale(.17, .6)
          , B = u.scale(.3, .6)
          , ut = new l(6 * e.track.zoomFactor * Math.cos(e.distance),6 * e.track.zoomFactor * Math.sin(e.distance))
          , H = A.add(ut)
          , gt = A.sub(ut)
          , L = u.scale(.71, .73)
          , G = u.scale(.73, .77)
          , ht = u.scale(.7, .8);
        if (t.strokeStyle = e.color,
        t.globalAlpha = s,
        t.lineWidth = y * e.track.zoomFactor,
        t.beginPath(),
        t.arc(i.x, i.y, M, 0, 2 * Math.PI, !0),
        t.moveTo(a.x + M, a.y),
        t.arc(a.x, a.y, M, 0, 2 * Math.PI, !0),
        t.stroke(),
        t.fillStyle = e.color,
        t.globalAlpha = .5 * s,
        t.beginPath(),
        t.arc(i.x, i.y, M * .5, 0, 2 * Math.PI, !0),
        t.moveTo(a.x + M, a.y),
        t.arc(a.x, a.y, M * .4, 0, 2 * Math.PI, !0),
        t.fill(),
        t.globalAlpha = s,
        t.lineWidth = 5 * e.track.zoomFactor,
        w.render(t, [[i, A], [P, p, A]]),
        t.lineWidth = 2 * e.track.zoomFactor,
        w.render(t, [[P, C], [S, D, U], [N, B], [H, gt]]),
        t.lineWidth = e.track.zoomFactor,
        w.render(t, [[O, z]]),
        t.lineWidth = 3 * e.track.zoomFactor,
        w.render(t, [[a, L, G, ht]]),
        e.runner.dead)
            return;
        let _ = u.scale(.3, .25)
          , R = new Q(_,n,c)
          , E = R.scale(-.05, .42)
          , K = R.scale(.1, .93)
          , X = R.scale(.2, 1.09)
          , ft = u.scale(.4, .05)
          , lt = u.scale(.67, .8)
          , pt = 2 * (10 * e.track.zoomFactor) ** 2
          , J = ft.sub(E)
          , Lt = new l(J.y * e.direction,-J.x * e.direction)
          , kt = pt / J.lengthSquared()
          , Pt = E.add(J.scale(.5)).add(Lt.scale(kt))
          , $ = ft.sub(E)
          , Rt = new l($.y * e.direction,-$.x * e.direction)
          , tt = pt / $.lengthSquared()
          , xt = E.add($.scale(.5)).add(Rt.scale(tt))
          , mt = 5 * e.track.zoomFactor
          , It = 8 * e.track.zoomFactor
          , yt = 4 * e.track.zoomFactor
          , wt = It ** 2 + yt ** 2
          , et = K.sub(lt)
          , Dt = new l(et.y * e.direction,-et.x * e.direction)
          , Bt = wt / et.lengthSquared()
          , Et = lt.add(et.scale(.3)).add(Dt.scale(Bt));
        t.lineCap = "round",
        t.lineWidth = 6 * e.track.zoomFactor,
        t.globalAlpha = .5 * s,
        w.render(t, [[gt, xt, E]]),
        t.globalAlpha = s,
        w.render(t, [[H, Pt, E]]),
        t.lineWidth = 8 * e.track.zoomFactor,
        w.render(t, [[E, K]]),
        t.lineWidth = 2 * e.track.zoomFactor,
        t.beginPath(),
        t.moveTo(X.x + mt, X.y),
        t.arc(X.x, X.y, mt, 0, 2 * Math.PI, !0),
        t.stroke();
        let Vt = R.scale(.37, 1.19)
          , Ht = R.scale(.02, 1.14)
          , xe = R.scale(.28, 1.17)
          , Ie = R.scale(.09, 1.15)
          , De = Vt.sub(R.x.scale(.1)).selfAdd(R.y.scale(.2))
          , Be = Ht.add(R.x.scale(.02)).selfAdd(R.y.scale(.2));
        t.fillStyle = e.color,
        w.render(t, [[Vt, xe, De, Be, Ie, Ht]]),
        t.fill(),
        t.lineWidth = 5 * e.track.zoomFactor,
        w.render(t, [[K, Et, lt]]),
        t.strokeStyle = "#000",
        t.globalAlpha = 1
    }
}
const he = {
    BMX: Ct,
    MTB: ne
}
  , We = {
    BMX: ne,
    MTB: Ct
}
  , Ke = {
    BMX: Ne,
    MTB: Ge
};
class le {
    static parse(t) {
        let e = t.split(",")
          , s = new Map;
        return s.set("keys", new Map),
        s.get("keys").set("upPressed", new Array),
        s.get("keys").set("downPressed", new Array),
        s.get("keys").set("leftPressed", new Array),
        s.get("keys").set("rightPressed", new Array),
        s.get("keys").set("turnPressed", new Array),
        s.get("keys").forEach(i=>{
            i.push(...e.shift().split(" "))
        }
        ),
        s.set("time", e[0] || 0),
        s.set("bike", he[e[1]] || Ct),
        s.set("name", e[2] || "Ghost"),
        s
    }
    static generate(t) {
        let e = new Array;
        return t.instance.keyLog.forEach(s=>{
            e.push(s.join(" "))
        }
        ),
        e.push(t.track.time, t.bikeClass.bikeName),
        e.join(",")
    }
}
class ce {
    static render(t, e, s) {
        let i = Ke[e.constructor.bikeName];
        i != null && i.render(t, e, s)
    }
}
class rt extends oe {
    constructor(t, e) {
        let s = le.parse(e);
        super(t, s.get("bike")),
        this.keys = s.get("keys"),
        this.finalTime = s.get("time"),
        this.ghostName = s.get("name")
    }
    assignColor() {
        this.instance.color = Tt.generateRandomDark()
    }
    onHitTarget() {
        this.targetsReached.size >= this.track.targets.size && (this.done = !0)
    }
    updateControls() {
        this.keys.forEach((t,e)=>{
            t.includes(this.track.time.toString()) && (this[e] = !this[e])
        }
        )
    }
    renderInstance(t) {
        ce.render(t, this.instance, .6);
        let e = this.instance.backWheel.displayPos.add(this.instance.frontWheel.displayPos).add(this.instance.hitbox.displayPos).recipScale(3).toPixel(this.track);
        t.save(),
        t.font = `bold ${Math.min(25 * this.track.zoomFactor, 15)}px Ubuntu`;
        let i = t.measureText(this.ghostName).width;
        t.fillStyle = this.instance.color;
        let a = e.x - i / 2
          , r = e.y - this.instance.hitbox.size * 4 * this.track.zoomFactor;
        t.fillText(this.ghostName, a, r),
        t.restore()
    }
}
class m {
    constructor() {
        this.controls = new Map,
        this.holding = new Map,
        this.firedOnce = new Map
    }
    registerControl(t, e) {
        this.controls.set(t, e)
    }
    isDown(t) {
        let e = !!this.holding.get(t)
          , s = this.controls.get(t).fireOnce
          , i = !!this.firedOnce.get(t);
        return s && !i && e ? (this.firedOnce.set(t, !0),
        !0) : e && (!s || !i)
    }
    test(t, e) {
        let s = t.codes.includes(e.which) || t.codes.includes(e.code);
        return s && t.modifiers === m.NONE && (s = !e.ctrlKey && !e.altKey && !e.shiftKey),
        s && t.modifiers & m.CTRL && (s = e.ctrlKey),
        s && t.modifiers & m.ALT && (s = e.altKey),
        s && t.modifiers & m.SHIFT && (s = e.shiftKey),
        s
    }
    onKeyDown(t) {
        this.controls.forEach((e,s)=>{
            this.test(e, t) && (t.preventDefault(),
            this.holding.get(s) || (this.holding.set(s, !0),
            document.dispatchEvent(new CustomEvent("keyboarddown",{
                detail: s
            }))))
        }
        )
    }
    onKeyUp(t) {
        this.controls.forEach((e,s)=>{
            this.test(e, t) && (t.preventDefault(),
            this.holding.get(s) && (this.holding.set(s, !1),
            this.firedOnce.set(s, !1),
            document.dispatchEvent(new CustomEvent("keyboardup",{
                detail: s
            }))))
        }
        )
    }
}
m.NONE = 0;
m.CTRL = 1 << 0;
m.ALT = 1 << 1;
m.SHIFT = 1 << 2;
class g {
    constructor(t, e=m.NONE, s=!1) {
        Array.isArray(t) || (t = [t]),
        this.codes = t,
        this.modifiers = e,
        this.fireOnce = s
    }
}
const je = 8
  , Ye = 13
  , Ve = 32
  , He = 37
  , Qe = 38
  , qe = 39
  , Ze = 40
  , _e = 65
  , de = 66
  , Xe = 67
  , Je = 68
  , $e = 69
  , ts = 70
  , Wt = 71
  , es = 73
  , ss = 77
  , is = 78
  , as = 79
  , rs = 80
  , ue = 81
  , os = 82
  , ge = 83
  , ns = 84
  , fe = 87
  , hs = 90;
class ls extends oe {
    constructor(t, e) {
        super(t, e),
        this.track.event.keyboard.registerControl("Up", new g(Qe)),
        this.track.event.keyboard.registerControl("Down", new g(Ze)),
        this.track.event.keyboard.registerControl("Left", new g(He)),
        this.track.event.keyboard.registerControl("Right", new g(qe)),
        this.track.event.keyboard.registerControl("Z", new g(hs,m.NONE,!0))
    }
    startFrom(t) {
        super.startFrom(t),
        this.targetsReached.forEach((e,s)=>{
            this.track.targets.has(s) && (this.track.targets.get(s).reached = !0)
        }
        ),
        this.reachablesReached.forEach((e,s)=>{
            this.track.reachables.has(s) && (this.track.reachables.get(s).reached = !0)
        }
        )
    }
    onHitTarget() {
        this.targetsReached.size >= this.track.targets.size && this.track.isRace() && (this.done = !0)
    }
    onHitCheckpoint() {
        this.mustSave = !0,
        this.track.ghostRunners.forEach(t=>{
            t.mustSave = !0
        }
        )
    }
    updateControls() {
        let t = new Map;
        t.set("upPressed", this.track.event.keyboard.isDown("Up")),
        t.set("downPressed", this.track.event.keyboard.isDown("Down")),
        t.set("leftPressed", this.track.event.keyboard.isDown("Left")),
        t.set("rightPressed", this.track.event.keyboard.isDown("Right")),
        t.set("turnPressed", this.track.event.keyboard.isDown("Z")),
        t.forEach((e,s)=>{
            e !== this[s] && (this.instance.keyLog.get(s).push(this.track.time.toString()),
            this[s] = e)
        }
        ),
        [...t.values()].some(Boolean) && (this.track.focalPoint = this.instance.hitbox,
        this.track.toolManager.active = !1)
    }
    renderInstance(t) {
        ce.render(t, this.instance, 1)
    }
}
const Zt = 100
  , _t = 400
  , cs = [[0, 0], [1, 0], [1, 1], [0, 1]]
  , ds = "-18 1i 18 1i"
  , pe = 2
  , ke = 1e5
  , me = .2
  , us = 4;
class T {
    constructor(t, e) {
        this.cells = new Map,
        this.cellSize = t,
        this.cellClass = e,
        this.totalSolidLines = new Map,
        this.totalSceneryLines = new Map,
        this.totalObjects = new Map
    }
    getKey(t, e) {
        return `${t},${e}`
    }
    has(t, e) {
        return !!this.cells.has(this.getKey(t, e))
    }
    cell(t, e) {
        let s = this.getKey(t, e);
        if (!this.has(t, e)) {
            let i = t * this.cellSize
              , a = e * this.cellSize
              , r = this.cellClass;
            this.cells.set(s, new r(i,a,this.cellSize))
        }
        return this.cells.get(s)
    }
    add(t) {
        this.getCellsForItem(t).forEach(e=>{
            e.push(t)
        }
        )
    }
    remove(t) {
        this.getCellsForItem(t).forEach(e=>{
            e.remove(t)
        }
        )
    }
    getCellsForItem(t) {
        return T.spread(t.pos, t.endPos, this.cellSize).reduce((e,s)=>{
            let i = T.gridCoords(s, this.cellSize);
            return e.push(this.cell(i.x, i.y)),
            e
        }
        , new Array)
    }
    cellBlockAction(t, e, s) {
        for (let[i,a] of cs)
            s(this.cell(t + i, e + a))
    }
    static gridCoords(t, e) {
        return new l(Math.floor(t.x / e),Math.floor(t.y / e))
    }
    static spread(t, e, s) {
        T.spreadCache.has(s) || T.spreadCache.set(s, new Map);
        let i = T.spreadCache.get(s)
          , a = t + ";" + e;
        if (i.has(a))
            return i.get(a);
        if (t.x === e.x && t.y === e.y)
            return i.set(a, [new l(t.x,t.y)]),
            i.get(a);
        i.set(a, new Array);
        let r = i.get(a);
        const n = (A,p)=>A < 0 ? Math.round(Math.ceil((p + 1) / s + A) * s) - 1 : Math.round(Math.floor(p / s + A) * s);
        let h = t.clone()
          , c = (e.y - h.y) / (e.x - h.x)
          , d = t.x < e.x ? 1 : -1
          , u = t.y < e.y ? 1 : -1
          , y = 0;
        r.push(t);
        let M = T.gridCoords(e, s);
        for (; y < 5e3; ) {
            let A = T.gridCoords(h, s);
            if (A.x === M.x && A.y === M.y)
                break;
            let p = n(d, h.x)
              , P = Math.round(t.y + (p - t.x) * c)
              , C = new l(p,P)
              , S = n(u, h.y)
              , D = Math.round(t.x + (S - t.y) / c)
              , O = new l(D,S)
              , z = t.sub(C)
              , U = t.sub(O);
            z.x ** 2 + z.y ** 2 < U.x ** 2 + U.y ** 2 ? h = C : h = O,
            r.push(h),
            y++
        }
        return r
    }
}
T.spreadCache = new Map;
class St extends I {
    constructor(t, e, s) {
        super(t, s),
        this.endPos = e,
        this.vector = this.endPos.sub(this.pos),
        this.len = this.vector.getLength(),
        this.touched = !1
    }
    touch(t) {}
    checkDelete(t, e) {
        let s = t.sub(this.pos)
          , i = this.vector.recipScale(this.len)
          , a = s.dot(i)
          , r = new l;
        return a <= 0 ? r.set(this.pos) : a >= this.len ? r.set(this.endPos) : r.set(this.pos.add(i.scale(a))),
        t.sub(r).getLength() <= e ? (this.removeFromTrack(),
        this) : null
    }
    getEnd() {
        this.recorded = !0;
        let t = " " + this.endPos.toString()
          , e = T.gridCoords(this.endPos, this.grid.cellSize)
          , i = this.grid.cell(e.x, e.y).search(this.endPos, this.constructor);
        return i !== void 0 && (t += i.getEnd()),
        t
    }
    toString() {
        return this.pos.toString() + this.getEnd()
    }
    renderCache(t, e, s, i) {
        t.beginPath(),
        t.moveTo(this.pos.x * i - e, this.pos.y * i - s),
        t.lineTo(this.endPos.x * i - e, this.endPos.y * i - s),
        t.stroke()
    }
    render(t) {}
}
class q extends St {
    onDelete() {
        this.grid.totalSceneryLines.delete(this.id)
    }
    onAdd() {
        this.grid.totalSceneryLines.set(this.id, this)
    }
}
class Z extends St {
    onDelete() {
        this.grid.totalSolidLines.delete(this.id)
    }
    onAdd() {
        this.grid.totalSolidLines.set(this.id, this)
    }
    touch(t) {
        if (!this.touched) {
            this.touched = !0;
            let e = null
              , s = t.pos.sub(this.pos)
              , i = s.dot(this.vector) / this.len / this.len
              , a = 1;
            if (i >= 0 && i <= 1) {
                let n = s.sub(t.velocity)
                  , h = s.x * this.vector.y - s.y * this.vector.x
                  , c = n.x * this.vector.y - n.y * this.vector.x;
                a = h * c < 0 ? -1 : 1,
                e = s.sub(this.vector.scale(i))
            } else if (i * this.len >= -t.size && i * this.len <= this.len + t.size) {
                let n = i > 0 ? this.endPos : this.pos;
                e = t.pos.sub(n)
            }
            let r = e ? e.getLength() : 0;
            (r < t.size || a < 0) && r !== 0 && (t.pos.selfAdd(e.scale((t.size * a - r) / r)),
            t.drive(new l(-e.y / r,e.x / r)))
        }
    }
}
class ye {
    constructor(t, e, s) {
        this.x = t,
        this.y = e,
        this.size = s,
        this.scenery = new Array,
        this.lines = new Array,
        this.objects = new Array,
        this.linesByType = new Map,
        this.linesByType.set(Z, this.lines),
        this.linesByType.set(q, this.scenery)
    }
    push(t) {
        t instanceof q ? this.scenery.push(t) : t instanceof Z ? this.lines.push(t) : t instanceof I && this.objects.push(t),
        this.clear()
    }
    remove(t) {
        t instanceof q ? this.scenery = this.scenery.filter(e=>e !== t) : t instanceof Z ? this.lines = this.lines.filter(e=>e !== t) : t instanceof I && (this.objects = this.objects.filter(e=>e !== t)),
        this.clear()
    }
    clear() {}
}
class Xt extends ye {
    touch(t) {
        for (let e = this.lines.length - 1; e >= 0; e--)
            this.lines[e].touch(t);
        if (!t.bike.runner.dead)
            for (let e = this.objects.length - 1; e >= 0; e--)
                this.objects[e].touch(t)
    }
    untouch() {
        for (let t of this.lines)
            t.touched = !1
    }
    search(t, e) {
        let s = this.linesByType.get(e);
        for (let i of s)
            if (i && i.pos.x === t.x && i.pos.y === t.y && !i.recorded)
                return i
    }
    checkDelete(t, e, s) {
        let i = new Array;
        const a = r=>{
            let n = r.checkDelete(t, e);
            n && i.push(n)
        }
        ;
        if (s.get("line"))
            for (let r of this.lines)
                a(r);
        if (s.get("scenery"))
            for (let r of this.scenery)
                a(r);
        if (s.get("object"))
            for (let r of this.objects)
                a(r);
        return i
    }
}
class gs {
    constructor(t) {
        this.callback = t,
        this.definition = {},
        this.transferables = []
    }
}
class fs extends gs {
    constructor(t, e, s, i, a) {
        super(a);
        let[r,n] = this.createBuffers(t);
        this.definition = {
            cellSize: t.size,
            zoom: e,
            opacityFactor: s,
            x: t.x,
            y: t.y,
            sceneryBuffer: r,
            lineBuffer: n,
            canvas: i
        },
        this.transferables = [r, n, i]
    }
    createBuffers(t) {
        let e = new Array;
        for (let a of t.scenery)
            e.push(a.pos.x, a.pos.y, a.endPos.x, a.endPos.y);
        let s = new Int32Array(e);
        e = new Array;
        for (let a of t.lines)
            e.push(...a.pos.toArray(), ...a.endPos.toArray());
        let i = new Int32Array(e);
        return [s.buffer, i.buffer]
    }
}
class ps {
    static createWorker() {
        let t = ()=>{
            class s {
                constructor() {
                    this.id = 0,
                    this.pending = !1
                }
                postMessage(r) {
                    self.postMessage(r)
                }
                postText(r) {
                    this.postMessage({
                        msg: r
                    })
                }
                postCommand(r, n) {
                    this.postMessage({
                        cmd: r,
                        args: n
                    })
                }
                handleMessage(r) {
                    if (r.data.cmd === void 0) {
                        this.postText(`#${this.id} Unknown message: ${r.data}`);
                        return
                    }
                    switch (r.data.cmd) {
                    case "setId":
                        this.id = r.data.id,
                        this.postText(`Worker #${this.id} allocated`);
                        break;
                    case "newTask":
                        this.requestTask();
                        break;
                    case "startTask":
                        this.doTask(r.data);
                        break;
                    case "noTask":
                        this.noTask();
                        break;
                    default:
                        this.postText(`#${this.id} Unknown command: ${r.data.cmd}`)
                    }
                }
                requestTask() {
                    this.pending || (this.pending = !0,
                    this.postCommand("requestTask"))
                }
                setBusy(r) {
                    this.postCommand(r ? "busy" : "idle"),
                    r || this.requestTask()
                }
                doTask(r) {
                    this.pending = !1,
                    this.setBusy(!0),
                    this.renderCell(r.task),
                    this.postMessage({
                        cmd: "taskResult",
                        id: r.id,
                        result: !0
                    }),
                    this.setBusy(!1)
                }
                noTask() {
                    this.pending = !1
                }
                renderCell(r) {
                    let n = r.cellSize, h = r.zoom, c = r.opacityFactor, d = r.x, u = r.y, y = [...new Int32Array(r.sceneryBuffer)], M = [...new Int32Array(r.lineBuffer)], A = r.canvas, p = A.getContext("2d"), P, C, S, D, O = d * h - 1, z = u * h - 1;
                    const U = N=>{
                        for (let B = 0; B < N.length - 3; B += 4)
                            P = N[B],
                            C = N[B + 1],
                            S = N[B + 2],
                            D = N[B + 3],
                            p.beginPath(),
                            p.moveTo(P * h - O, C * h - z),
                            p.lineTo(S * h - O, D * h - z),
                            p.stroke()
                    }
                    ;
                    A.width = n * h + 2,
                    A.height = n * h + 2,
                    p.lineCap = "round",
                    p.lineWidth = Math.max(2 * h, .5),
                    p.globalAlpha = c,
                    p.strokeStyle = "#aaa",
                    U(y),
                    p.strokeStyle = "#000",
                    U(M)
                }
            }
            let i = new s;
            self.addEventListener("message", a=>i.handleMessage(a))
        }
        ;
        return new Worker(URL.createObjectURL(new Blob([`(${t.toString()})()`])))
    }
}
class f {
    static createWorkerPool() {
        for (let t = 0; t < navigator.hardwareConcurrency - 1; t++)
            f.workers[t] = ps.createWorker(),
            f.workers[t].addEventListener("message", e=>f.handleMessage(e, t)),
            f.workers[t].postMessage({
                cmd: "setId",
                id: t
            })
    }
    static broadcastMessage(t, e) {
        for (let s in f.workers)
            f.postMessage(s, t, e)
    }
    static postMessage(t, e, s) {
        f.workers[t].postMessage(e, s)
    }
    static handleMessage(t, e) {
        if (t.data.cmd)
            switch (t.data.cmd) {
            case "requestTask":
                f.provideTask(e);
                break;
            case "taskResult":
                f.receiveResults(t.data, e);
                break;
            case "busy":
            case "idle":
                break;
            default:
                console.log(`Unknown command: ${t.data.cmd}`, t.data)
            }
        else
            t.data.msg ? console.log(`Message from #${e}: ${t.data.msg}`) : console.log(`Received from #${e}`, t.data)
    }
    static provideTask(t) {
        if (f.queue.length > 0) {
            console.log(`#${t} requested a task`);
            let e = f.queue.shift();
            f.taskId++,
            f.callbacks[f.taskId] = e.callback,
            f.postMessage(t, {
                cmd: "startTask",
                id: f.taskId,
                task: e.definition
            }, e.transferables)
        } else
            console.log(`#${t} no tasks available`),
            f.postMessage(t, {
                cmd: "noTask"
            })
    }
    static postTask(t) {
        f.queue.push(t),
        f.queue.length == 1 && f.broadcastMessage({
            cmd: "newTask"
        }),
        console.log(`Task queue: ${f.queue.length}`)
    }
    static receiveResults(t, e) {
        if (t.id === void 0) {
            console.log(`Unidentified task result from #${e}`, t);
            return
        }
        let s = f.callbacks[t.id];
        s && (f.callbacks[t.id] = null,
        s())
    }
}
f.taskId = 0;
f.workers = [];
f.queue = [];
f.callbacks = [];
class Jt extends ye {
    constructor(t, e, s) {
        super(t, e, s),
        this.canvas = new Map
    }
    clear() {
        this.canvas = new Map
    }
    getCanvas(t, e, s, i) {
        return this.canvas.has(t) || this.canvas.set(t, this.renderCache(t, e, s, i)),
        this.canvas.get(t)
    }
    renderCache(t, e, s, i) {
        let a = document.createElement("canvas");
        if (s) {
            let r = a.transferControlToOffscreen();
            f.postTask(new fs(this,t,e,r,i))
        } else {
            let r = a.getContext("2d");
            a.width = this.size * t + 2,
            a.height = this.size * t + 2,
            r.lineCap = "round",
            r.lineWidth = Math.max(2 * t, .5),
            r.globalAlpha = e,
            r.strokeStyle = "#aaa";
            for (let n of this.scenery)
                n.renderCache(r, this.x * t - 1, this.y * t - 1, t);
            r.strokeStyle = "#000";
            for (let n of this.lines)
                n.renderCache(r, this.x * t - 1, this.y * t - 1, t);
            i && i()
        }
        return a
    }
}
class ks {
    constructor() {
        this.undoStack = new Array,
        this.undoPosition = 0
    }
    push(t) {
        let e = Math.min(this.undoStack.length, this.undoPosition + 1);
        for (let s in this.undoStack)
            s >= e && this.undoStack.splice(s, 1);
        return this.undoPosition = this.undoStack.push(t) - 1,
        this
    }
    undo() {
        if (this.undoPosition >= 0 && this.undoStack.length) {
            let t = this.undoStack[this.undoPosition--].undo;
            typeof t == "function" && t(this)
        }
        return this
    }
    redo() {
        if (this.undoPosition < this.undoStack.length - 1) {
            let t = this.undoStack[++this.undoPosition].redo;
            typeof t == "function" && t(this)
        }
        return this
    }
}
class k extends F {
    constructor(t, e, s, i, a, r, n) {
        super(),
        this.uiManager = t,
        this.track = e,
        this.originalX = s,
        this.originalY = i,
        this.x = s,
        this.y = i,
        this.width = a,
        this.height = r,
        this.align = n,
        this.hovered = !1,
        this.focused = !1
    }
    intersects(t) {
        let e = t.toPixel(this.track);
        return e.x > this.x && e.y > this.y && e.x < this.x + this.width && e.y < this.y + this.height
    }
    fixedUpdate() {}
    update(t, e) {
        this.track.event.mouseIn || (this.hovered = !1)
    }
    render(t) {
        this.align & k.ALIGN_BOTTOM && (this.y = this.track.canvas.height - this.height - this.originalY),
        this.align & k.ALIGN_RIGHT && (this.x = this.track.canvas.width - this.width - this.originalX),
        this.align & k.ALIGN_HORIZONTAL_CENTER && (this.x = (this.track.canvas.width - this.width) / 2),
        this.align & k.ALIGN_VERTICAL_CENTER && (this.y = (this.track.canvas.height - this.height) / 2)
    }
    onClick() {}
    onMouseMove(t) {
        let e = this.intersects(this.track.realMousePos);
        this.hovered = e,
        !e && this.focused && (this.focused = !1)
    }
    onMouseDown(t) {
        this.focused = this.intersects(this.track.realMousePos)
    }
    onMouseUp(t) {
        this.intersects(this.track.realMousePos) && this.focused && (this.focused = !1,
        this.onClick())
    }
}
k.ALIGN_RIGHT = 1 << 0;
k.ALIGN_BOTTOM = 1 << 1;
k.ALIGN_HORIZONTAL_CENTER = 1 << 2;
k.ALIGN_VERTICAL_CENTER = 1 << 3;
class Y extends k {
    constructor(t, e, s, i, a, r, n, h, c) {
        super(t, e, s, i, a, r, c),
        this.label = n,
        this.onClick = h,
        this.color = "#fff",
        this.hoveredColor = "#ddd",
        this.focusedColor = "#ccc"
    }
    render(t) {
        super.render(t),
        t.save(),
        t.lineWidth = 2,
        t.strokeRect(this.x, this.y, this.width, this.height);
        let e = t.measureText(this.label)
          , s = e.width
          , i = e.actualBoundingBoxAscent + e.actualBoundingBoxDescent;
        t.fillStyle = this.hovered ? this.focused ? this.focusedColor : this.hoveredColor : this.color,
        t.beginPath(),
        t.rect(this.x, this.y, this.width, this.height),
        t.fill(),
        t.fillStyle = "#000",
        t.fillText(this.label, this.x + (this.width - s) / 2, this.y + (this.height + i) / 2),
        t.restore()
    }
}
class we extends k {
    constructor(t, e) {
        super(t, e),
        this.items = new Array
    }
    intersects(t) {
        for (let e of this.items)
            if (e.intersects(t))
                return !0;
        return !1
    }
    fixedUpdate() {
        for (let t of this.items)
            t.fixedUpdate()
    }
    update(t, e) {
        super.update(t, e);
        for (let s of this.items)
            s.update(t, e)
    }
    render(t) {
        for (let e of this.items)
            e.render(t)
    }
    onMouseMove(t) {
        super.onMouseMove(t);
        for (let e of this.items)
            e.onMouseMove(t)
    }
    onMouseDown(t) {
        super.onMouseDown(t);
        for (let e of this.items)
            e.onMouseDown(t)
    }
    onMouseUp(t) {
        super.onMouseUp(t);
        for (let e of this.items)
            e.onMouseUp(t)
    }
}
class ms extends Y {
    constructor(t, e, s, i, a, r) {
        super(t, e, 0, s, 26, 26, "", a, r),
        this.toolClass = i,
        this.toolLabel = i.toolName,
        this.activeColor = "#456",
        this.icon = this.createIcon(this.toolClass.icon),
        this.optionsUI = new we(this.uiManager,this.track)
    }
    createIcon(t) {
        let e = `./icon/${t}.svg`;
        t.type === "b64" && (e = t.data);
        let s = document.createElement("canvas")
          , i = s.getContext("2d");
        s.width = 24,
        s.height = 24;
        let a = new Image;
        return a.onload = function() {
            let r = 1;
            t.type === "b64" && (r = 6),
            i.drawImage(a, r, r)
        }
        ,
        a.src = e,
        s
    }
    render(t) {
        if (super.render(t),
        t.save(),
        t.drawImage(this.icon, this.x, this.y),
        t.strokeStyle = "#000",
        t.lineWidth = 2,
        t.strokeRect(this.x, this.y, this.width, this.height),
        this.hovered) {
            let e = `${this.toolLabel} (${this.toolClass.keyLabel})`
              , s = t.measureText(e)
              , i = s.width
              , a = s.actualBoundingBoxAscent + s.actualBoundingBoxDescent
              , r = this.x + this.width + 4;
            this.x > this.track.canvas.width / 2 && (r = this.x - 8 - i);
            let n = r + 2;
            t.fillStyle = "#fff",
            t.beginPath(),
            t.rect(r, this.y + 1, i + 4, 24),
            t.fill(),
            t.stroke(),
            t.fillStyle = "#000",
            t.fillText(e, n, this.y + a + 5)
        }
        t.restore()
    }
    toggleActive() {
        [this.activeColor,this.color] = [this.color, this.activeColor]
    }
}
class b extends F {
    static get toolName() {
        return "Tool"
    }
    static get keyLabel() {
        return null
    }
    static get key() {
        return null
    }
    static get icon() {
        return null
    }
    constructor(t) {
        super(),
        this.track = t,
        this.mouseDown = !1,
        this.alwaysRender = !1,
        this.ui = null,
        this.optionsOpen = !1,
        this.group = null
    }
    registerControls() {
        this.constructor.keyLabel != null && this.constructor.key != null && this.track.event.keyboard.registerControl(this.constructor.keyLabel, this.constructor.key)
    }
    getUI(t, e, s) {
        return this.ui == null && (this.ui = new ms(t,this.track,e * 26,this.constructor,()=>this.run(),s)),
        this.ui
    }
    isHolding() {
        return this.track.event.keyboard.isDown(this.constructor.keyLabel)
    }
    run() {
        this.group && (this.group.ui.icon = this.ui.icon,
        this.group.currentInstance = this),
        this.track.toolManager.setTool(this)
    }
    createOptionsUI() {}
    openOptions() {
        this.ui.optionsUI.items.length == 0 && this.createOptionsUI(),
        this.ui.uiManager.uiElements.push(this.ui.optionsUI),
        this.optionsOpen = !0
    }
    closeOptions() {
        this.ui.uiManager.uiElements = this.ui.uiManager.uiElements.filter(t=>t !== this.ui.optionsUI),
        this.optionsOpen = !1
    }
    activate() {
        this.group && this.group.openOptions(),
        this.ui.uiManager.cursor = "none",
        this.openOptions()
    }
    deactivate() {
        this.group && this.group.closeOptions(),
        this.closeOptions(),
        this.mouseDown = !1
    }
    onMouseDown(t) {
        this.mouseDown = !0
    }
    onMouseUp(t) {
        this.mouseDown = !1
    }
    onMouseMove(t) {
        this.track.focalPoint = null
    }
    onScroll(t) {
        let e = this.track.mousePos;
        this.track.focalPoint && (e = this.track.focalPoint.displayPos),
        this.track.zoom(e, -Math.sign(t.deltaY))
    }
    fixedUpdate() {}
    update(t, e) {}
    render(t) {}
}
class ys extends F {
    constructor(t) {
        super(),
        this.track = t,
        this.tool = null,
        this.active = !1,
        this.cameraTool = null
    }
    setTool(t) {
        t !== this.tool ? (this.tool && (this.tool.ui.toggleActive(),
        this.tool.deactivate()),
        this.tool = t,
        this.tool.activate(),
        this.tool.ui.toggleActive()) : this.tool.optionsOpen ? this.tool.closeOptions() : this.tool.openOptions()
    }
    setCamera(t) {
        this.cameraTool = t
    }
    fixedUpdate() {
        this.tool && this.active && this.tool.fixedUpdate()
    }
    update(t, e) {
        this.tool && this.active && this.tool.update(t, e)
    }
    render(t) {
        this.tool && (this.allowRender() || this.tool.alwaysRender) && this.tool.render(t)
    }
    onMouseDown(t) {
        this.tool && t.button != 2 && (this.active = !0,
        this.tool.onMouseDown(t)),
        this.tool !== this.cameraTool && this.cameraTool && t.button == 2 && this.cameraTool.onMouseDown(t)
    }
    onMouseUp(t) {
        this.tool && (this.active = !0,
        this.tool.onMouseUp(t)),
        this.tool !== this.cameraTool && this.cameraTool && this.cameraTool.onMouseUp(t)
    }
    onMouseMove(t) {
        this.tool && (this.active = !0,
        this.tool.onMouseMove(t)),
        this.tool !== this.cameraTool && this.cameraTool && this.cameraTool.onMouseMove(t)
    }
    onScroll(t) {
        this.tool && (this.active = !0,
        this.tool.onScroll(t))
    }
    onContextMenu(t) {
        this.tool && (this.active = !0)
    }
    allowRender() {
        return this.track.event.mouseIn && this.track.event.allowStateEvent() && this.active
    }
}
class ws {
    constructor() {
        this.toolsByToolName = new Map,
        this.toolsByKeyLabel = new Map
    }
    setTools(t) {
        for (let e in t)
            this.toolsByToolName.set(t[e].constructor.toolName, t[e]),
            this.toolsByKeyLabel.set(t[e].constructor.keyLabel, t[e])
    }
    getByToolName(t) {
        return this.toolsByToolName.get(t)
    }
    getByKeyLabel(t) {
        return this.toolsByKeyLabel.get(t)
    }
}
class Kt extends b {
    static get toolName() {
        return "Pause"
    }
    static get keyLabel() {
        return "Space"
    }
    static get key() {
        return new g(Ve)
    }
    static get icon() {
        return "pause"
    }
    getUI(t, e) {
        return super.getUI(t, e),
        this.pauseIcon = this.ui.icon,
        this.unpauseIcon = this.ui.createIcon("play"),
        this.pauseLabel = this.ui.toolLabel,
        this.unpauseLabel = "Unpause",
        this.ui
    }
    run() {
        this.track.paused = !this.track.paused,
        this.updateUI()
    }
    updateUI() {
        this.ui.icon = this.track.paused ? this.unpauseIcon : this.pauseIcon,
        this.ui.toolLabel = this.track.paused ? this.unpauseLabel : this.pauseLabel
    }
}
class As extends F {
    constructor(t) {
        super(),
        this.track = t,
        this.uiElements = new Array,
        this.cursor = "none"
    }
    fixedUpdate() {
        for (let t of this.uiElements)
            t.fixedUpdate()
    }
    update(t, e) {
        for (let s of this.uiElements)
            s.update(t, e)
    }
    render(t) {
        for (let s of this.uiElements)
            s.render(t);
        let e = this.uiElements.some(s=>s.hovered);
        this.track.canvas.style.cursor = e ? "pointer" : this.cursor
    }
    onMouseMove(t) {
        for (let e of this.uiElements)
            e.onMouseMove(t)
    }
    onMouseDown(t) {
        for (let e of this.uiElements)
            e.onMouseDown(t)
    }
    onMouseUp(t) {
        for (let e of this.uiElements)
            e.onMouseUp(t)
    }
}
class vt extends F {
    constructor(t) {
        super(),
        this.isTrackUpload = !1,
        this.manager = t,
        this.ui = new As(this.track)
    }
    get track() {
        return this.manager.track
    }
    set track(t) {
        this.manager.track = t
    }
    onEnter() {}
    onLeave() {}
    onMouseDown(t) {}
    onMouseUp(t) {}
    onMouseMove(t) {}
    onScroll(t) {}
    onContextMenu(t) {}
    onKeyboardDown(t) {}
    onVisibilityChange() {}
}
class Ts extends F {
    constructor(t, e, s) {
        super(),
        this.game = t,
        this.event = new Ms(this),
        this.track = new Ae(e,s,this.event),
        this.event.attach(),
        this.states = new Map,
        this.stateStack = new Array
    }
    push(t) {
        let e = this.getState(t);
        e.onEnter(),
        this.stateStack.push(e)
    }
    pop() {
        return this.stateStack.length ? (this.getCurrent().ui.uiElements = new Array,
        this.getCurrent().onLeave(),
        this.stateStack.pop()) : null
    }
    addState(t, e) {
        let s = new t(this);
        this.states.set(e, s)
    }
    getState(t) {
        return this.states.get(t)
    }
    fixedUpdate() {
        this.stateStack.length && (this.getCurrent().fixedUpdate(),
        this.getCurrent().ui.fixedUpdate())
    }
    update(t, e) {
        this.stateStack.length && (this.getCurrent().update(t, e),
        this.getCurrent().ui.update(t, e))
    }
    render(t) {
        this.stateStack.length && (this.getCurrent().render(t),
        this.getCurrent().ui.render(t))
    }
    getCurrent() {
        return this.stateStack[this.stateStack.length - 1]
    }
}
class Ms {
    constructor(t) {
        this.stateManager = t,
        this.keyboard = new m,
        this.mouseIn = !1
    }
    getTrack() {
        return this.stateManager.track
    }
    getUI() {
        return this.stateManager.getCurrent().ui
    }
    attach() {
        this.getTrack().canvas.addEventListener("mousedown", t=>this.onMouseDown(t)),
        this.getTrack().canvas.addEventListener("mouseup", t=>this.onMouseUp(t)),
        this.getTrack().canvas.addEventListener("mousemove", t=>this.onMouseMove(t)),
        this.getTrack().canvas.addEventListener("wheel", t=>this.onScroll(t)),
        this.getTrack().canvas.addEventListener("mouseenter", t=>this.onMouseEnter(t)),
        this.getTrack().canvas.addEventListener("mouseout", t=>this.onMouseOut(t)),
        this.getTrack().canvas.addEventListener("contextmenu", t=>this.onContextMenu(t)),
        document.addEventListener("visibilitychange", ()=>this.onVisibilityChange()),
        document.addEventListener("keydown", t=>this.onKeyDown(t)),
        document.addEventListener("keyup", t=>this.onKeyUp(t)),
        document.addEventListener("keyboarddown", t=>this.onKeyboardDown(t))
    }
    onMouseDown(t) {
        t.preventDefault(),
        this.setMousePos(t),
        this.getTrack().focalPoint = null,
        this.getTrack().lastClick.set(this.getTrack().mousePos),
        this.getUI().onMouseDown(t),
        this.allowStateEvent() && this.stateManager.getCurrent().onMouseDown(t)
    }
    onMouseUp(t) {
        this.getUI().onMouseUp(t),
        this.allowStateEvent() && this.stateManager.getCurrent().onMouseUp(t)
    }
    onMouseMove(t) {
        this.setMousePos(t),
        this.getUI().onMouseMove(t),
        this.allowStateEvent() && this.stateManager.getCurrent().onMouseMove(t)
    }
    onScroll(t) {
        t.preventDefault(),
        this.stateManager.stateStack.length && this.stateManager.getCurrent().onScroll(t)
    }
    onContextMenu(t) {
        t.preventDefault(),
        this.stateManager.stateStack.length && this.stateManager.getCurrent().onContextMenu(t)
    }
    onMouseEnter(t) {
        this.mouseIn = !0
    }
    onMouseOut(t) {
        this.mouseIn = !1
    }
    onKeyDown(t) {
        document.activeElement === document.body && this.keyboard.onKeyDown(t)
    }
    onKeyUp(t) {
        this.keyboard.onKeyUp(t)
    }
    onKeyboardDown(t) {
        this.stateManager.stateStack.length && this.stateManager.getCurrent().onKeyboardDown(t)
    }
    onVisibilityChange() {
        this.stateManager.stateStack.length && this.stateManager.getCurrent().onVisibilityChange()
    }
    setMousePos(t) {
        let e = this.getTrack().canvas.getBoundingClientRect();
        this.getTrack().realMousePos.set(new l(t.clientX - e.left + window.pageXOffset,t.clientY - e.top + window.pageYOffset).normalizeToCanvas(this.getTrack())),
        this.getTrack().mousePos.x = Math.round(this.getTrack().realMousePos.x / this.getTrack().gridDetail) * this.getTrack().gridDetail,
        this.getTrack().mousePos.y = Math.round(this.getTrack().realMousePos.y / this.getTrack().gridDetail) * this.getTrack().gridDetail
    }
    allowStateEvent() {
        return !this.getUI().uiElements.some(t=>t.hovered) && this.stateManager.stateStack.length
    }
}
class Ae {
    constructor(t, e={}, s) {
        this.canvas = t,
        this.id = e.id,
        this.trackCode = e.trackCode,
        this.event = s,
        this.toolManager = new ys(this),
        this.zoomFactor = .6,
        this.camera = new l,
        this.origin = new l,
        this.focalPoint = new W(new l,new l),
        this.realMousePos = new l,
        this.mousePos = new l,
        this.lastClick = new l,
        this.gridDetail = 1,
        this.grid = new T(Zt,Xt),
        this.foregroundGrid = new T(Zt,Xt),
        this.cache = new T(_t,Jt),
        this.foregroundCache = new T(_t,Jt),
        this.targets = new Map,
        this.reachables = new Map,
        this.toolCollection = new ws,
        this.paused = !1,
        this.time = 0,
        this.playerRunner = new ls(this,Ct),
        this.ghostRunners = new Map,
        this.ghostCache = new Map,
        this.undoManager = new ks,
        this.debug = !1,
        this.fastRender = !1
    }
    isRace() {
        return this.id && typeof this.id == "number"
    }
    zoom(t, e) {
        let s = t.toPixel(this);
        this.zoomFactor = Math.min(us, Math.max(me, Math.round((this.zoomFactor + .2 * e) * 100) / 100)),
        this.camera.x = t.x - (s.x - this.canvas.width / 2) / this.zoomFactor,
        this.camera.y = t.y - (s.y - this.canvas.height / 2) / this.zoomFactor
    }
    remove(t) {
        t.grid.remove(t),
        t.cache.remove(t)
    }
    add(t, e, s) {
        return (!(t instanceof St) || t.len >= pe && t.len < ke) && (e.add(t),
        s.add(t)),
        t
    }
    touch(t) {
        let e = Math.floor(t.pos.x / this.grid.cellSize - .5)
          , s = Math.floor(t.pos.y / this.grid.cellSize - .5);
        this.grid.cellBlockAction(e, s, i=>i.untouch()),
        this.grid.cellBlockAction(e, s, i=>i.touch(t))
    }
    checkDelete(t, e, s) {
        let i = Math.floor(t.x / this.grid.cellSize - .5)
          , a = Math.floor(t.y / this.grid.cellSize - .5)
          , r = new Array;
        const n = (y,M)=>{
            r.push(...y.checkDelete(t, e, M))
        }
        ;
        let h = s.get("mainLayer")
          , c = s.get("foregroundLayer")
          , d = [...h.values()].some(Boolean)
          , u = [...c.values()].some(Boolean);
        return d && this.grid.cellBlockAction(i, a, y=>n(y, h)),
        u && this.foregroundGrid.cellBlockAction(i, a, y=>n(y, c)),
        r
    }
    unreachEverything() {
        this.grid.cells.forEach((t,e)=>{
            for (let s of t.objects)
                s instanceof ot && (s.reached = !1,
                s instanceof Gt && (s.group.reached = !1))
        }
        )
    }
    pause(t) {
        this.paused = t,
        this.toolCollection.getByToolName(Kt.toolName).updateUI()
    }
    restart() {
        this.unreachEverything(),
        this.pause(!1),
        this.playerRunner.restart(),
        this.ghostRunners.forEach(t=>{
            t.restart()
        }
        ),
        this.updateFocalPoint()
    }
    updateFocalPoint() {
        this.focalPoint = this.playerRunner.instance.hitbox,
        !this.playerRunner.snapshots.length && this.ghostRunners.size && (this.focalPoint = this.ghostRunners.get(Array.from(this.ghostRunners.keys())[0]).instance.hitbox),
        this.camera.set(this.focalPoint.displayPos)
    }
}
class bs {
    constructor(t) {
        this.track = t,
        this.stepSize = 1e3,
        this.memReset();
        let e = this.track.grid
          , s = this.track.foregroundGrid;
        this.length = e.totalSolidLines.size + e.totalSceneryLines.size + e.totalObjects.size + s.totalSolidLines.size + s.totalSceneryLines.size
    }
    memReset() {
        this.done = !1,
        this.currentStep = this.generateLines,
        this.progress = 0,
        this.lineData = this.emptyData(),
        this.foregroundLineData = this.emptyData(),
        this.sceneryData = this.emptyData(),
        this.foregroundSceneryData = this.emptyData(),
        this.objectData = this.emptyData()
    }
    generate(t, e, s) {
        let i = this.stepSize
          , a = Math.min(t.index + i, e.size)
          , r = Array.from(e.values());
        for (; t.index < a; t.index++) {
            let n = r[t.index];
            n.recorded || (t.code += `${n.toString()},`)
        }
        t.index >= e.size && (this.currentStep = s)
    }
    generateLines() {
        this.generate(this.lineData, this.track.grid.totalSolidLines, this.generateScenery)
    }
    generateScenery() {
        this.generate(this.sceneryData, this.track.grid.totalSceneryLines, this.generateObjects)
    }
    generateObjects() {
        let t = this.stepSize
          , e = Math.min(this.objectData.index + t, this.track.grid.totalObjects.size)
          , s = Array.from(this.track.grid.totalObjects.values());
        for (; this.objectData.index < e; this.objectData.index++) {
            let i = s[this.objectData.index];
            i.recorded || (this.objectData.code += `${i.toString()},`)
        }
        this.objectData.index >= this.track.grid.totalObjects.size && (this.currentStep = this.generateForegroundLines)
    }
    generateForegroundLines() {
        this.generate(this.foregroundLineData, this.track.foregroundGrid.totalSolidLines, this.generateForegroundScenery)
    }
    generateForegroundScenery() {
        this.generate(this.foregroundSceneryData, this.track.foregroundGrid.totalSceneryLines, this.finish)
    }
    finish() {
        this.cleanup(),
        this.done = !0
    }
    cleanup() {
        this.track.grid.totalSolidLines.forEach((t,e)=>t.recorded = !1),
        this.track.grid.totalSceneryLines.forEach((t,e)=>t.recorded = !1),
        this.track.foregroundGrid.totalSolidLines.forEach((t,e)=>t.recorded = !1),
        this.track.foregroundGrid.totalSceneryLines.forEach((t,e)=>t.recorded = !1)
    }
    getCode() {
        return `${this.lineData.code}#${this.sceneryData.code}#${this.objectData.code}#${this.foregroundLineData.code}#${this.foregroundSceneryData.code}#${this.track.playerRunner.bikeClass.bikeName}#${this.track.origin.toString()}`
    }
    emptyData() {
        return {
            code: "",
            index: 0
        }
    }
}
class Cs extends vt {
    onEnter() {
        this.generator = new bs(this.track)
    }
    fixedUpdate() {}
    update(t, e) {
        if (this.generator.currentStep(),
        this.generator.progress = this.generator.lineData.index + this.generator.foregroundLineData.index + this.generator.sceneryData.index + this.generator.foregroundSceneryData.index + this.generator.objectData.index,
        this.generator.done) {
            this.manager.pop();
            let s = this.generator.getCode();
            if (this.generator.memReset(),
            this.isTrackUpload)
                this.isTrackUpload = !1,
                this.track.trackCode = s,
                this.track.pause(!0),
                this.manager.push("trackUpload");
            else {
                let i = document.createElement("a");
                i.download = "track.txt";
                let a = new Blob([s],{
                    type: "text/plain"
                })
                  , r = URL.createObjectURL(a);
                i.href = r,
                i.click(),
                URL.revokeObjectURL(r)
            }
        }
    }
    render(t) {
        let e = this.track.canvas.height / 2 - 15
          , s = this.track.canvas.width - 200;
        t.clearRect(0, 0, this.track.canvas.width, this.track.canvas.height),
        t.fillStyle = "#ccc",
        t.fillRect(100, e, s, 30),
        t.fillStyle = "#aaa",
        t.fillRect(100, e, this.generator.progress / this.generator.length * s, 30),
        t.strokeRect(99, e - 1, s - 1, 32);
        let i = `Generating track code: ${Math.round(this.generator.progress / this.generator.length * 100)} %`
          , a = t.measureText(i)
          , r = a.width
          , n = a.actualBoundingBoxAscent + a.actualBoundingBoxDescent;
        t.fillStyle = "#000",
        t.fillText(i, (this.track.canvas.width - r) / 2, (this.track.canvas.height + n) / 2)
    }
}
class Ss {
    constructor(t) {
        this.track = t,
        this.stepSize = 1e3
    }
    init(t) {
        this.memReset(),
        this.split(t),
        this.length = this.solidLineData.code.length + this.sceneryLineData.code.length + this.itemData.code.length + this.foregroundSolidLineData.code.length + this.foregroundSceneryLineData.code.length
    }
    memReset() {
        this.done = !1,
        this.currentStep = this.parseSolidLines,
        this.progress = 0,
        this.progressLabel = null,
        this.solidLineData = this.emptyData(),
        this.sceneryLineData = this.emptyData(),
        this.itemData = this.emptyData(),
        this.foregroundSolidLineData = this.emptyData(),
        this.foregroundSceneryLineData = this.emptyData(),
        this.codeBike = "",
        this.codeOrigin = "",
        this.caching = !1,
        this.cacheIndex = 0,
        this.renderIndex = 0,
        this.proxyIndex = 0
    }
    parseSolidLines() {
        this.progressLabel = "Solid lines",
        this.parseLines(this.solidLineData, Z, qt, this.parseSceneryLines)
    }
    parseSceneryLines() {
        this.progressLabel = "Scenery lines",
        this.parseLines(this.sceneryLineData, q, qt, this.parseItems)
    }
    parseItems() {
        this.progressLabel = "Items";
        let t = new Map;
        ze.map(e=>{
            t.set(e.code, e)
        }
        ),
        this.loopItems(t)
    }
    loopItems(t) {
        let e = Math.min(this.itemData.index + this.stepSize, this.itemData.code.length);
        for (; this.itemData.index < e; this.itemData.index++) {
            let s = this.itemData.code[this.itemData.index].split(" ");
            if (s.length > 2) {
                let i = t.get(s[0]);
                if (i) {
                    let a = i.createInstance(s, this.track);
                    a.grid = this.track.grid,
                    a.cache = this.track.cache,
                    a.addToTrack()
                }
            }
        }
        this.itemData.index >= this.itemData.code.length && (this.currentStep = this.parseForegroundSolidLines)
    }
    parseForegroundSolidLines() {
        this.progressLabel = "Foreground Solid lines",
        this.parseLines(this.foregroundSolidLineData, Z, Ft, this.parseForegroundSceneryLines)
    }
    parseForegroundSceneryLines() {
        this.progressLabel = "Foreground Scenery lines",
        this.parseLines(this.foregroundSceneryLineData, q, Ft, this.parseOrigin)
    }
    parseOrigin() {
        this.progressLabel = "Origin";
        let t = this.codeOrigin.split(" ")
          , e = new l(parseInt(t[0], 32),parseInt(t[1], 32));
        this.track.origin.set(e),
        this.track.camera.set(e),
        this.currentStep = this.parseBike
    }
    parseBike() {
        this.progressLabel = "Bike",
        this.track.playerRunner.bikeClass = he[this.codeBike],
        this.track.playerRunner.createBike(),
        this.track.focalPoint = this.track.playerRunner.instance.hitbox,
        this.currentStep = this.processMainCache,
        this.caching = !0
    }
    processMainCache() {
        this.progressLabel = "Main cache",
        this.length = this.track.cache.cells.size,
        this.processCache(this.track.cache, 1, this.processForegroundCache)
    }
    processForegroundCache() {
        this.progressLabel = "Foreground cache",
        this.length = this.track.foregroundCache.cells.size,
        this.processCache(this.track.foregroundCache, .5, this.finish)
    }
    finish() {
        this.memReset(),
        this.done = !0
    }
    parseLines(t, e, s, i) {
        let a = Math.min(t.index + this.stepSize, t.code.length);
        for (; t.index < a; t.index++) {
            let r = t.code[t.index].split(" ");
            if (r.length > 3)
                for (let n = 0, h = r.length - 2; n < h; n += 2) {
                    let c = this.track.grid
                      , d = this.track.cache;
                    s == Ft && (c = this.track.foregroundGrid,
                    d = this.track.foregroundCache);
                    let u = new e(new l(parseInt(r[n], 32),parseInt(r[n + 1], 32)),new l(parseInt(r[n + 2], 32),parseInt(r[n + 3], 32)),this.track);
                    u.grid = c,
                    u.cache = d,
                    u.addToTrack()
                }
        }
        t.index >= t.code.length && (this.currentStep = i)
    }
    processCache(t, e, s) {
        let i = Math.min(this.cacheIndex + 1, t.cells.size)
          , a = Array.from(t.cells.values());
        for (; this.cacheIndex < i; this.cacheIndex++) {
            let r = a[this.cacheIndex];
            for (let n = me; n <= 1; n = Math.round((n + .2) * 100) / 100)
                r.lines.length + r.scenery.length > 500 ? r.canvas.set(n, r.renderCache(n, e, !0, ()=>{
                    this.proxyIndex++
                }
                )) : this.proxyIndex++,
                this.renderIndex++
        }
        this.cacheIndex >= t.cells.size && this.proxyIndex >= this.renderIndex && (this.proxyIndex = 0,
        this.renderIndex = 0,
        this.cacheIndex = 0,
        this.currentStep = s)
    }
    split(t) {
        let e = t.split("#")
          , s = 0;
        try {
            this.solidLineData.code = e[s++].split(","),
            this.sceneryLineData.code = e[s++].split(","),
            this.itemData.code = e[s++].split(","),
            this.foregroundSolidLineData.code = e[s++].split(","),
            this.foregroundSceneryLineData.code = e[s++].split(","),
            this.codeBike = e[s++] || "BMX",
            this.codeOrigin = e[s] || "0 0"
        } catch {
            this.codeBike = this.codeBike || "BMX",
            this.codeOrigin = this.codeOrigin || "0 0"
        }
    }
    emptyData() {
        return {
            code: "",
            index: 0
        }
    }
}
class Mt {
    static getPostRequest(t, e) {
        let s = new Array;
        for (let a in e) {
            let r = e[a];
            s.push([a, encodeURIComponent(r)].join("="))
        }
        let i = new XMLHttpRequest;
        return i.open("POST", t, !1),
        i.setRequestHeader("Content-type", "application/x-www-form-urlencoded"),
        i.send(s.join("&")),
        i
    }
}
const vs = "./db/trackdata/"
  , Ls = "./db/ghostdata/"
  , Ps = "./db/ghostupload/"
  , Rs = "./db/trackupload/";
class xs extends vt {
    onEnter() {
        let t = ds;
        if (this.track.id) {
            let e = Mt.getPostRequest(vs, {
                id: this.track.id
            })
              , s = JSON.parse(e.responseText);
            if (s === !1)
                return alert("Track does not exist"),
                !1;
            t = s.CODE
        } else
            this.track.trackCode && (t = this.track.trackCode,
            this.track.id = null);
        this.track.trackCode = null,
        this.parser = new Ss(this.track),
        this.parser.init(t)
    }
    fixedUpdate() {}
    update(t, e) {
        !this.parser || (this.parser.currentStep(),
        this.parser.caching ? (this.parser.progress = this.parser.proxyIndex,
        this.parser.length = this.parser.renderIndex) : this.parser.progress = this.parser.solidLineData.index + this.parser.sceneryLineData.index + this.parser.itemData.index + this.parser.foregroundSolidLineData.index + this.parser.foregroundSceneryLineData.index,
        this.parser.done && this.manager.push("track"))
    }
    render(t) {
        if (!this.parser) {
            t.clearRect(0, 0, this.track.canvas.width, this.track.canvas.height);
            let h = "Track does not exist!"
              , c = t.measureText(h)
              , d = c.width
              , u = c.actualBoundingBoxAscent + c.actualBoundingBoxDescent;
            t.fillStyle = "#000",
            t.fillText(h, (this.track.canvas.width - d) / 2, (this.track.canvas.height + u) / 2);
            return
        }
        let e = this.track.canvas.height / 2 - 15
          , s = this.track.canvas.width - 200;
        t.clearRect(0, 0, this.track.canvas.width, this.track.canvas.height),
        t.fillStyle = "#ccc",
        t.fillRect(100, e, s, 30);
        let i = "Parsing...";
        this.parser.caching ? i = `Caching: ${this.parser.progressLabel} - ${this.parser.progress} / ${this.parser.length} cells` : i = `Parsing ${this.parser.progressLabel}: ${Math.round(this.parser.progress / this.parser.length * 100)} %`,
        t.fillStyle = "#aaa",
        t.fillRect(100, e, this.parser.progress / this.parser.length * s, 30),
        t.strokeRect(99, e - 1, s - 1, 32);
        let a = t.measureText(i)
          , r = a.width
          , n = a.actualBoundingBoxAscent + a.actualBoundingBoxDescent;
        t.fillStyle = "#000",
        t.fillText(i, (this.track.canvas.width - r) / 2, (this.track.canvas.height + n) / 2)
    }
}
class $t {
    static format(t) {
        let e = Math.floor(t / 6e4)
          , s = Math.floor(t % 6e4 / 1e3)
          , i = Math.floor((t - e * 6e4 - s * 1e3) / 100);
        return `${e.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}.${i}`
    }
}
class Ot extends we {
    constructor(t, e, s, i) {
        super(t, e),
        this.addItems(s, i)
    }
    addItems(t, e) {
        let s = new Array;
        for (let i in t) {
            let a = new t[i](this.track);
            a.registerControls(),
            this.items.push(a.getUI(this.uiManager, i, e)),
            s.push(a)
        }
        this.track.toolCollection.setTools(s)
    }
}
class j extends b {
    static get toolName() {
        return "Camera"
    }
    static get keyLabel() {
        return "R"
    }
    static get key() {
        return new g(os)
    }
    static get icon() {
        return "arrows"
    }
    activate() {
        this.ui.uiManager.cursor = "move"
    }
    onMouseMove(t) {
        this.mouseDown && (super.onMouseMove(t),
        this.track.camera.selfAdd(this.track.lastClick.sub(this.track.mousePos)),
        this.track.mousePos.set(this.track.lastClick))
    }
}
class V extends b {
    getUI(t) {
        return new k(null,this.track)
    }
    run() {}
}
const Te = {
    type: "b64",
    data: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAYAAAAfSC3RAAAA+0lEQVQoU2NkIBMwkqmPAZtGBaBh+VxcDBYgQ799YzgBpCYC8QNkS9A1OrCyMmwxN2dgd3ZmYAEp3LuX4c+JEww//vxh8AVyD8A0I2tUAGq6MmsWA3dCAqoHFixgYEhLY/j2+zeDNsxmZI0TbG0Zcg4dYmDG5m+g3J8jRximAuUKQPJwjUA/nSgtZTBvaMAeXCDxtjaGo0BbbUjW2N3NcBIYWOBAQ3dqNtCp4EBBB3Z2DH8PH2aYguFUoAAocK4CA4cLW+CkpjJ8BYasDrbAAVkCio6tFhYMbMjRcfw4w0+gJh9c0QFznQLIOWgJYALMJmzxiD04cYiSnVYBx/BOD75iif8AAAAASUVORK5CYII="
}
  , Is = {
    type: "b64",
    data: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAYAAAAfSC3RAAAA60lEQVQoU2NkIBMwkqmPAZdGAaCB+lBDLwLpD+gWYNPYAFRUj6ZwApBfiCyGppFzGQMDfyADw3IOBgYHqLoDQDrtCwPDo4MMDD99YJqRNSYwMHDOZGC4xsbAoIBmIcil0r8ZGL6lARkLQJLIGjcwMOT7MzCAXIUNFAAFJ24EEgFoGrlOMDCUmjMwgLyIDYDEpwID6o0BtWxkAPqRC+jHp0A/gmIDGYD8KAP041esfgRKsm9lYFB0ZGCYzokaqpnfGRjunmNg+G2DLVRBYiCrQJ7JR7NyIlQcnhDwpRxwIADBBSAmKuXgCFVUYQB7ODAP/zl/3wAAAABJRU5ErkJggg=="
}
  , Ds = {
    type: "b64",
    data: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAYAAAAfSC3RAAAA80lEQVQoU2NkIBMwkqmPAZtGBaBh+VwMDBYgQ78xMJwAUhOB+AGyJegaHVgZGLaYMzCwOzMwsIAU7mVg+APU+eMPA4MvkHsAphlZowJQ05VZDAzcCWjuXwDkpwEt/83AoA2zGVnjBFsGhpxDDAzM2PwNlPtzhIFhKlCuACQP1wj004lSBgbzBhyhBRJvY2A4CrTVhmSN3QwMJ4GBBQ40dKdmA50KDhR0YMfA8PcwA8MUDKcCBUCBcxUYOFzYAieVgeErMGR1sAUOyBJQdGwFuoUNOTqOMzD8BGrywRUdMNcpgJyDlgAmwGyCKaJqksMRIajCAPcZNg+bMA2tAAAAAElFTkSuQmCC"
}
  , Bs = {
    type: "b64",
    data: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAYAAAAfSC3RAAABCklEQVQoU2NkIBMwkqmPAZtGBaBh+ZycnBYgQ79//34CSE0E4gfIlqBrdGBhYdliYmLCbm9vzwJSePDgwT+nT5/+8ffvX18g9wBMM7JGBaCmKxMmTOCOiopC8cGyZcsYCgoKvv3580cbZjOyxgmWlpY5W7duZcbmby8vrz8nTpyYCpQrAMnDNQL9dCIvL8+8vLwca3h1dnYy9Pb2HgXaakOyxkmTJp0EBhY40NCdmg10KjhQ0IG3t/ff48ePT8FwKlAAFDhXgYHDhS1w8vPzvwJDVgdb4IAsAUXHVlNTUzY7OzuwzYcOHfpz6tSpn0BNPriiA+Y6BZBz0BLABJhN2OIRa2jiEiQ7rQIAX99mD5/aTbMAAAAASUVORK5CYII="
}
  , Es = {
    type: "b64",
    data: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAYAAAAfSC3RAAABHElEQVQoU42QzUoCYRSGH+kPs0UtEnKTrdzWtmtIsEVBkuCuoBbdQncwi5KWQlHoSqj7yI2LVrapIBcVNIbUovebGZ3xa9QODN+Zc97n/CUIrSx3NfI/yj01icQgm+SaNHsYPM6qCr5ywxfFYRAKpKjzyUwsuMAPLjvKNWwQIa7QeZUYNiPdpcu3SgcWjuoHquxrlEura0nIlVYhXMQGC+pX44lZFoPS73qXPH+7P+bfUU0kpROcsTyobY5yTEdLpKPz2x1NzmGLI26Z9oR5HeWOc3knk8B1Ce55C2T+mBv6mpNAmOOZC1Y84SEv9MhEofgdfYXDJgd8MEWLij3mODCrZDvosqb38b8dzXUfPLFLzobGdTS5/hWdOPAXFiAzD4GmcBMAAAAASUVORK5CYII="
}
  , Fs = {
    type: "b64",
    data: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAYAAAAfSC3RAAAA5klEQVQoU2NkIBMwkqmPAaSxgZOTQfX7d4ZVQPZGYg0Ca5SXZ6h//Zrh9+/fDL+AeDVQbAMhQ8Aa6+sZ6hsagKqBytesYfi1dCkDGzc3w6uvXxmWAeUXAvEFdJegaIRJfvgAN+T31q0MrOzsDM9+/gR7ZSIQPwCpw6oR2XSYId3dDL+uXQO75CbQJdOJ0rgRGGQgjVevgjXewqkRZAtIMdC/v7dsATv1OdSpE7A6FRQ4a9cy/FqyBGzya2jgLMAZOAoKkOj49QscJbDoAEUJTgDyYwIwAbhBEwBexcimUJTkiE1lKOoAvC5w7vOxxigAAAAASUVORK5CYII="
}
  , Os = {
    type: "b64",
    data: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAYAAAAfSC3RAAAAAXNSR0IArs4c6QAAANdJREFUOE+d0jFqAlEQxvGfZxCrSA4QW69g0mqheAOLwNZaZbdKak8hWqxtFo+QNoJlQCvxBhbhLQhrdpG4Uw3vvf+bmW++hprRqMmpAh/x2tTshk9PTl+Y41As8hd8Qzw01NbO3+3traxCGiO5wEUwVPpZWgpgMQI4MgpHHWxDUgTf+/rTVFo59sDA2voDsyuwpfU5Nn6e5+OUIxJZWGRHx5e7wImJVFoGcbPVnp6NTblVPOG7SpxEIs5FrRYnXFyt4+xsZyeT3VzHRZEHRPca4N8OrO3VXy/aQA8BldDfAAAAAElFTkSuQmCC"
}
  , zs = {
    type: "b64",
    data: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAYAAAAfSC3RAAAAY0lEQVQ4T53S0QmAMAyE4b9LuIlO4bhOoZs4hUQMlNImV/OcjwtcCj+nTLgFOL79TYWOVuACJNiiHbizxC6ycyM4RBEM0QimqAcl1EIZ1XAK1fAEvNy3p+yjvA6DNhLKegxDHzm4IA9ZY5FTAAAAAElFTkSuQmCC"
}
  , Us = {
    type: "b64",
    data: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAYAAAAfSC3RAAAAdElEQVQ4T2NkIBMwEqtv3bp1Yn/+/NkCUh8WFmZGlEYkTaYMDAynidKIromFhcUnKCjoFV4bcWkCORenRnyacGokpAmrRmI0YWgkVhOKRlI0wTWSqgmucdWqVacYGBjAkQuLJ0IpChwdUI0MxGrCG4+EbAQAEzpiD4Q7bNkAAAAASUVORK5CYII="
}
  , Ns = {
    type: "b64",
    data: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAYAAAAfSC3RAAAAJ0lEQVQ4T2NkIBMwkqmPYaRrPAUNODNsAYgvcMjWiDemRnp04A0cADZMAg80IkHmAAAAAElFTkSuQmCC"
}
  , Gs = {
    type: "b64",
    data: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAYAAAAfSC3RAAAALklEQVQ4T2NkIBMwkqmPYURrXLVq1SlQwIWFhZlhC0CcgUO2RkLRNKKjg1DgAACPswgPeqoQowAAAABJRU5ErkJggg=="
};
class nt extends b {
    static get itemClass() {
        return I
    }
    onMouseDown(t) {
        let e = this.constructor.itemClass
          , s = new e(this.track.mousePos.clone(),this.track);
        s.grid = this.track.grid,
        s.cache = this.track.cache,
        s.addToTrack(),
        this.track.undoManager.push({
            undo: ()=>s.removeFromTrack(),
            redo: ()=>s.addToTrack()
        })
    }
    render(t) {
        let e = this.track.mousePos.toPixel(this.track);
        t.fillStyle = this.constructor.itemClass.color,
        t.strokeStyle = "#000",
        t.lineWidth = Math.max(2 * this.track.zoomFactor, .5),
        t.beginPath(),
        t.arc(e.x, e.y, 7 * this.track.zoomFactor, 0, 2 * Math.PI),
        t.fill(),
        t.stroke()
    }
}
class Ws extends nt {
    static get toolName() {
        return "Bomb"
    }
    static get keyLabel() {
        return "Shift+O"
    }
    static get key() {
        return new g(as,m.SHIFT)
    }
    static get icon() {
        return Ds
    }
    static get itemClass() {
        return te
    }
}
class Ks extends nt {
    static get toolName() {
        return "Checkpoint"
    }
    static get keyLabel() {
        return "Shift+C"
    }
    static get key() {
        return new g(Xe,m.SHIFT)
    }
    static get icon() {
        return Is
    }
    static get itemClass() {
        return zt
    }
}
class js extends nt {
    static get toolName() {
        return "Slow-Motion"
    }
    static get keyLabel() {
        return "Shift+S"
    }
    static get key() {
        return new g(ge,m.SHIFT)
    }
    static get icon() {
        return Bs
    }
    static get itemClass() {
        return ee
    }
}
class Ys extends nt {
    static get toolName() {
        return "Target"
    }
    static get keyLabel() {
        return "Shift+T"
    }
    static get key() {
        return new g(ns,m.SHIFT)
    }
    static get icon() {
        return Te
    }
    static get itemClass() {
        return Ut
    }
}
class Me extends nt {
    static get itemClass() {
        return Nt
    }
    onMouseDown(t) {
        this.mouseDown = !0
    }
    onMouseUp(t) {
        if (!this.mouseDown)
            return;
        this.mouseDown = !1;
        let e = this.constructor.itemClass
          , s = Math.atan2(this.track.lastClick.x - this.track.mousePos.x, this.track.mousePos.y - this.track.lastClick.y)
          , i = Math.round(s * 180 / Math.PI)
          , a = new e(this.track.lastClick.clone(),i,this.track);
        a.grid = this.track.grid,
        a.cache = this.track.cache,
        a.addToTrack(),
        this.track.undoManager.push({
            undo: ()=>a.removeFromTrack(),
            redo: ()=>a.addToTrack()
        })
    }
    render(t) {
        let e = this.track.lastClick.toPixel(this.track)
          , s = this.track.mousePos.toPixel(this.track);
        t.beginPath(),
        t.fillStyle = this.constructor.itemClass.color,
        t.strokeStyle = "#000",
        t.lineWidth = Math.max(.5, this.track.zoomFactor * 2),
        t.save(),
        this.mouseDown ? (t.arc(s.x, s.y, 3 * this.track.zoomFactor, 0, 2 * Math.PI),
        t.translate(e.x, e.y),
        t.rotate(Math.atan2(e.x - s.x, s.y - e.y))) : t.translate(s.x, s.y),
        t.moveTo(-7 * this.track.zoomFactor, -10 * this.track.zoomFactor),
        t.lineTo(0, 10 * this.track.zoomFactor),
        t.lineTo(7 * this.track.zoomFactor, -10 * this.track.zoomFactor),
        t.lineTo(-7 * this.track.zoomFactor, -10 * this.track.zoomFactor),
        t.fill(),
        t.stroke(),
        t.restore()
    }
}
class Vs extends Me {
    static get toolName() {
        return "Boost"
    }
    static get keyLabel() {
        return "Shift+B"
    }
    static get key() {
        return new g(de,m.SHIFT)
    }
    static get icon() {
        return Fs
    }
    static get itemClass() {
        return se
    }
}
class Hs extends Me {
    static get toolName() {
        return "Gravity"
    }
    static get keyLabel() {
        return "Shift+G"
    }
    static get key() {
        return new g(Wt,m.SHIFT)
    }
    static get icon() {
        return Es
    }
    static get itemClass() {
        return ie
    }
}
class bt extends b {
    static get toolName() {
        return "Toggle Fullscreen"
    }
    static get keyLabel() {
        return "F"
    }
    static get key() {
        return new g(ts)
    }
    static get icon() {
        return "expand"
    }
    constructor(t) {
        super(t),
        this.target = this.track.canvas.parentElement
    }
    run() {
        this.fullscreenElement() ? this.exitFullscreen() : this.requestFullscreen(this.target)
    }
    fullscreenElement() {
        return document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement || null
    }
    exitFullscreen() {
        (document.exitFullscreen || document.webkitExitFullscreen || document.mozCancelFullScreen || document.mozExitFullScreen || document.msExitFullscreen).call(document)
    }
    requestFullscreen(t) {
        (t.requestFullscreen || t.webkitRequestFullscreen || t.mozRequestFullScreen || t.msRequestFullscreen).call(t)
    }
}
class st extends Y {
    constructor(t, e, s, i, a, r, n, h, c, d) {
        super(t, e, s, i, a, r, n, c, d),
        this.active = !1,
        this.activeLabel = h,
        this.inactiveLabel = n,
        this.callback = c,
        this.onClick = this.toggle
    }
    toggle() {
        this.active = !this.active,
        this.label = this.active ? this.activeLabel : this.inactiveLabel,
        this.callback()
    }
}
class Qs extends b {
    static get toolName() {
        return "Eraser"
    }
    static get keyLabel() {
        return "E"
    }
    static get key() {
        return new g($e)
    }
    static get icon() {
        return "eraser"
    }
    constructor(t) {
        super(t),
        this.size = 15,
        this.minSize = 5,
        this.maxSize = 40,
        this.restrict = new Map,
        this.restrict.set("foregroundLayer", new Map),
        this.restrict.get("foregroundLayer").set("line", !0),
        this.restrict.get("foregroundLayer").set("scenery", !0),
        this.restrict.get("foregroundLayer").set("object", !1),
        this.restrict.set("mainLayer", new Map),
        this.restrict.get("mainLayer").set("line", !0),
        this.restrict.get("mainLayer").set("scenery", !0),
        this.restrict.get("mainLayer").set("object", !0)
    }
    onMouseDown(t) {
        super.onMouseDown(t),
        this.onMouseMove(t)
    }
    onMouseMove(t) {
        if (super.onMouseMove(t),
        this.mouseDown) {
            let e = this.track.checkDelete(this.track.mousePos, this.size, this.restrict);
            e.length && this.track.undoManager.push({
                undo: ()=>e.forEach(s=>s.addToTrack()),
                redo: ()=>e.forEach(s=>s.removeFromTrack())
            })
        }
    }
    onScroll(t) {
        this.isHolding() ? this.size = Math.max(this.minSize, Math.min(this.maxSize, this.size + 5 * -Math.sign(t.deltaY))) : super.onScroll(t)
    }
    createOptionsUI() {
        let t = (this.track.canvas.width - 300) / 2
          , e = new st(this.ui,this.track,t,5,300,30,"Foreground Line: inactive","Foreground Line: active",()=>this.restrict.get("foregroundLayer").set("line", !this.restrict.get("foregroundLayer").get("line")),k.ALIGN_HORIZONTAL_CENTER);
        e.active = !0,
        e.label = e.activeLabel;
        let s = new st(this.ui,this.track,t,40,300,30,"Foreground Scenery: inactive","Foreground Scenery: active",()=>this.restrict.get("foregroundLayer").set("scenery", !this.restrict.get("foregroundLayer").get("scenery")),k.ALIGN_HORIZONTAL_CENTER);
        s.active = !0,
        s.label = s.activeLabel;
        let i = new st(this.ui,this.track,t,75,300,30,"Main Line: inactive","Main Line: active",()=>this.restrict.get("mainLayer").set("line", !this.restrict.get("mainLayer").get("line")),k.ALIGN_HORIZONTAL_CENTER);
        i.active = !0,
        i.label = i.activeLabel;
        let a = new st(this.ui,this.track,t,110,300,30,"Main Scenery: inactive","Main Scenery: active",()=>this.restrict.get("mainLayer").set("scenery", !this.restrict.get("mainLayer").get("scenery")),k.ALIGN_HORIZONTAL_CENTER);
        a.active = !0,
        a.label = a.activeLabel;
        let r = new st(this.ui,this.track,t,145,300,30,"Main Object: inactive","Main Object: active",()=>this.restrict.get("mainLayer").set("object", !this.restrict.get("mainLayer").get("object")),k.ALIGN_HORIZONTAL_CENTER);
        r.active = !0,
        r.label = r.activeLabel,
        this.ui.optionsUI.items.push(e, s, i, a, r)
    }
    render(t) {
        let e = this.track.mousePos.toPixel(this.track);
        t.beginPath(),
        t.arc(e.x, e.y, this.size * this.track.zoomFactor, 0, 2 * Math.PI, !0),
        t.fillStyle = "#ffb6c1",
        t.fill()
    }
}
class be extends b {
    static get toolName() {
        return "Restart"
    }
    static get keyLabel() {
        return "Enter"
    }
    static get key() {
        return new g(Ye)
    }
    static get icon() {
        return "restart"
    }
    run() {
        this.track.restart()
    }
}
class Ce extends b {
    static get toolName() {
        return "Cancel Checkpoint"
    }
    static get keyLabel() {
        return "Backspace"
    }
    static get key() {
        return new g(je)
    }
    static get icon() {
        return "rewind"
    }
    run() {
        this.track.playerRunner.popCheckpoint(),
        this.track.ghostRunners.forEach(t=>{
            t.popCheckpoint()
        }
        ),
        this.track.restart()
    }
}
class qs extends b {
    static get toolName() {
        return "Undo"
    }
    static get keyLabel() {
        return "M"
    }
    static get key() {
        return new g(ss)
    }
    static get icon() {
        return "undo"
    }
    run() {
        this.track.undoManager.undo()
    }
}
class Zs extends b {
    static get toolName() {
        return "Redo"
    }
    static get keyLabel() {
        return "N"
    }
    static get key() {
        return new g(is)
    }
    static get icon() {
        return "redo"
    }
    run() {
        this.track.undoManager.redo()
    }
}
class jt extends b {
    static get lineClass() {
        return St
    }
    constructor(t) {
        super(t),
        this.foreground = !1,
        this.lastLine = null
    }
    onMouseDown(t) {
        this.isHolding() ? (this.lastLine == null && (this.lastLine = this.track.mousePos.clone()),
        this.addLine(this.lastLine)) : this.mouseDown = !0
    }
    onMouseUp(t) {
        !this.mouseDown || (this.mouseDown = !1,
        this.isHolding() || this.addLine(this.track.lastClick))
    }
    addLine(t) {
        let e = this.constructor.lineClass
          , s = new e(t.clone(),this.track.mousePos.clone(),this.track)
          , i = this.track.grid
          , a = this.track.cache;
        this.foreground && (i = this.track.foregroundGrid,
        a = this.track.foregroundCache),
        s.grid = i,
        s.cache = a,
        s.addToTrack(),
        this.track.undoManager.push({
            undo: ()=>s.removeFromTrack(),
            redo: ()=>s.addToTrack()
        }),
        this.lastLine = this.track.mousePos.clone()
    }
    checkLineLength() {
        let t = Math.max(Math.abs(this.track.lastClick.x - this.track.mousePos.x), Math.abs(this.track.lastClick.y - this.track.mousePos.y));
        return t >= pe && t < ke
    }
    createOptionsUI() {
        let t = (this.track.canvas.width - 300) / 2
          , e = new st(this.ui,this.track,t,5,300,30,"Layer: Main","Layer: Foreground",()=>this.foreground = !this.foreground,k.ALIGN_HORIZONTAL_CENTER);
        e.color = "#fff",
        e.hoveredColor = "#eee",
        e.focusedColor = "#ddd",
        this.ui.optionsUI.items.push(e)
    }
    update(t, e) {
        if (this.mouseDown || this.isHolding()) {
            let s = this.track.mousePos.toPixel(this.track)
              , i = new l
              , a = e / 4 / this.track.zoomFactor;
            s.x < 50 ? i.x = -a : s.x > this.track.canvas.width - 50 && (i.x = a),
            s.y < 50 ? i.y = -a : s.y > this.track.canvas.height - 50 && (i.y = a),
            this.track.camera.selfAdd(i),
            this.track.mousePos.selfAdd(i)
        }
    }
    render(t) {
        let e = this.track.mousePos.toPixel(this.track);
        t.lineWidth = 2,
        t.strokeStyle = "#000",
        t.lineCap = "round",
        t.beginPath(),
        t.moveTo(e.x - 10, e.y),
        t.lineTo(e.x + 10, e.y),
        t.moveTo(e.x, e.y - 10),
        t.lineTo(e.x, e.y + 10),
        t.stroke(),
        (this.mouseDown || this.isHolding()) && this.renderLineInfo(t, e),
        this.renderLineSize(t, e)
    }
    renderLineSize(t, e) {}
    renderLineInfo(t, e) {
        t.save(),
        t.strokeStyle = this.checkLineLength() ? "#00f" : "#f00",
        t.lineWidth = this.track.zoomFactor * 2;
        let s = this.track.lastClick;
        this.isHolding() && (s = this.lastLine == null ? this.track.mousePos : this.lastLine),
        w.render(t, [[s.toPixel(this.track), e]]);
        let i = s.distanceTo(this.track.mousePos)
          , a = this.track.mousePos.sub(s)
          , r = -Math.atan2(a.y, a.x) / Math.PI * 180;
        t.lineWidth = .5,
        t.fillStyle = "#777",
        t.fillText(Math.round(i), e.x + 3, e.y - 3),
        t.textAlign = "right",
        t.fillText(Math.round(r) + "\xB0", e.x - 3, e.y - 3),
        t.textAlign = "left",
        t.restore()
    }
}
class _s extends jt {
    static get toolName() {
        return "Solid Line"
    }
    static get keyLabel() {
        return "Q"
    }
    static get key() {
        return new g(ue)
    }
    static get icon() {
        return zs
    }
    static get lineClass() {
        return Z
    }
}
class Xs extends jt {
    static get toolName() {
        return "Scenery Line"
    }
    static get keyLabel() {
        return "W"
    }
    static get key() {
        return new g(fe)
    }
    static get icon() {
        return Us
    }
    static get lineClass() {
        return q
    }
}
class Se extends jt {
    constructor(t) {
        super(t),
        this.size = 20,
        this.minSize = 4,
        this.maxSize = 200
    }
    onScroll(t) {
        this.isHolding() ? this.size = Math.min(this.maxSize, Math.max(this.minSize, this.size + 8 * -Math.sign(t.deltaY))) : super.onScroll(t)
    }
    update(t, e) {
        if (this.mouseDown || this.isHolding() && this.lastLine != null) {
            let s = this.isHolding() ? this.lastLine : this.track.lastClick;
            s.distanceTo(this.track.mousePos) >= this.size && (this.addLine(s),
            this.track.lastClick = this.lastLine.clone())
        } else
            this.lastLine == null && (this.lastLine = this.track.mousePos.clone());
        super.update(t, e)
    }
    renderLineSize(t, e) {
        t.fillText(this.size, e.x + 3, e.y + 12)
    }
}
class Js extends Se {
    static get toolName() {
        return "Solid Brush"
    }
    static get keyLabel() {
        return "A"
    }
    static get key() {
        return new g(_e)
    }
    static get icon() {
        return Ns
    }
    static get lineClass() {
        return Z
    }
}
class $s extends Se {
    static get toolName() {
        return "Scenery Brush"
    }
    static get keyLabel() {
        return "S"
    }
    static get key() {
        return new g(ge)
    }
    static get icon() {
        return Gs
    }
    static get lineClass() {
        return q
    }
}
class Yt extends b {
    constructor(t) {
        super(t),
        this.toggleColor = "#077"
    }
    run() {
        [this.toggleColor,this.ui.color] = [this.ui.color, this.toggleColor],
        this.toggle()
    }
    toggle() {}
}
class ti extends Yt {
    static get toolName() {
        return "Toggle Grid Snapping"
    }
    static get keyLabel() {
        return "G"
    }
    static get key() {
        return new g(Wt,m.NONE)
    }
    static get icon() {
        return "grid"
    }
    toggle() {
        this.track.gridDetail = 11 - this.track.gridDetail
    }
}
class ve extends b {
    static get toolName() {
        return "Start Position"
    }
    static get keyLabel() {
        return "P"
    }
    static get key() {
        return new g(rs)
    }
    static get icon() {
        return "start"
    }
    constructor(t) {
        super(t),
        this.alwaysRender = !0
    }
    activate() {
        super.activate(),
        this.ui.uiManager.cursor = "pointer",
        this.createDummyRunner()
    }
    onMouseMove(t) {
        super.onMouseMove(t),
        this.mouseDown && this.dummyRunner.instance.setBikeInitialState(this.track.mousePos)
    }
    onMouseUp(t) {
        !this.mouseDown || (this.mouseDown = !1,
        this.setStartPosition(this.track.mousePos))
    }
    setStartPosition(t) {
        this.track.origin.set(t);
        let e = this.track.playerRunner.bikeClass;
        this.track.playerRunner.initialBike = new e(this.track,this.track.playerRunner),
        this.dummyRunner.instance.setBikeInitialState(t)
    }
    createDummyRunner() {
        this.dummyRunner = new rt(this.track,`,,,,,,${this.track.playerRunner.bikeClass.bikeName},Start Position`),
        this.dummyRunner.assignColor = ()=>{}
        ,
        this.dummyRunner.createBike()
    }
    render(t) {
        this.dummyRunner.renderInstance(t)
    }
    createOptionsUI() {
        let t = (this.track.canvas.width - 300) / 2
          , e = new Y(this.ui,this.track,t,5,300,30,"Reset start position (0,0)",()=>this.setStartPosition(new l));
        e.color = "#fff",
        e.hoveredColor = "#eee",
        e.focusedColor = "#ddd",
        this.ui.optionsUI.items.push(e)
    }
}
class Le extends b {
    static get toolName() {
        return "Switch Bike"
    }
    static get keyLabel() {
        return "Control+B"
    }
    static get key() {
        return new g(de,m.CTRL)
    }
    static get icon() {
        return "bike"
    }
    run() {
        this.track.playerRunner.bikeClass = We[this.track.playerRunner.bikeClass.bikeName],
        this.track.playerRunner.createBike(),
        this.track.playerRunner.reset(),
        this.track.ghostRunners.forEach(e=>{
            e.reset()
        }
        ),
        this.track.restart();
        let t = this.track.toolCollection.getByToolName(ve.toolName);
        t != null && t.createDummyRunner()
    }
}
class Pe extends b {
    static get toolName() {
        return "Focus ghost"
    }
    static get keyLabel() {
        return "Control+G"
    }
    static get key() {
        return new g(Wt,m.CTRL)
    }
    static get icon() {
        return "focus"
    }
    constructor(t) {
        super(t),
        this.currentGhostIndex = 0
    }
    run() {
        if ((this.track.focalPoint == null || this.track.focalPoint === this.track.playerRunner.instance.hitbox) && (this.currentGhostIndex = 0),
        this.track.ghostRunners.size) {
            this.currentGhostIndex = (this.currentGhostIndex + 1) % this.track.ghostRunners.size;
            let t = Array.from(this.track.ghostRunners.keys())[this.currentGhostIndex];
            this.track.focalPoint = this.track.ghostRunners.get(t).instance.hitbox
        }
    }
}
class ei extends b {
    constructor(t, e) {
        super(t),
        this.instances = new Array;
        for (let s of e)
            this.instances.push(new s(t))
    }
    getUI(t, e, s) {
        super.getUI(t, e, s),
        this.instancesUI = new Array;
        for (let i of this.instances) {
            i.group = this,
            i.registerControls();
            let a = i.getUI(t, 0, s);
            a.originalX = 30,
            a.y = this.ui.y + 26 * this.instancesUI.length,
            this.instancesUI.push(a),
            this.currentInstance || (this.ui.icon = a.icon,
            this.currentInstance = i)
        }
        return this.track.toolCollection.setTools(this.instances),
        this.ui
    }
    run() {
        this.track.toolManager.setTool(this.currentInstance)
    }
    createOptionsUI() {
        this.ui.optionsUI.items.push(...this.instancesUI)
    }
}
class si extends ei {
    static get toolName() {
        return "Item Group"
    }
    static get keyLabel() {
        return "I"
    }
    static get key() {
        return new g(es)
    }
    static get icon() {
        return Te
    }
    constructor(t) {
        super(t, ci)
    }
}
class ii extends Yt {
    static get toolName() {
        return "Toggle Debug"
    }
    static get keyLabel() {
        return "Control+D"
    }
    static get key() {
        return new g(Je,m.CTRL)
    }
    static get icon() {
        return "debug"
    }
    toggle() {
        this.track.debug = !this.track.debug
    }
}
class ai extends nt {
    static get itemClass() {
        return Gt
    }
    constructor(t) {
        super(t),
        this.posToCreate = new Array,
        this.alwaysRender = !0
    }
    activate() {
        super.activate(),
        this.posToCreate = new Array
    }
    createGroup() {
        let t = new ae(this.track);
        t.grid = this.track.grid,
        t.cache = this.track.cache;
        for (let e of this.posToCreate) {
            let s = this.constructor.itemClass
              , i = new s(e,this.track);
            i.group = t,
            t.instances.push(i)
        }
        t.addToTrack(),
        this.track.undoManager.push({
            undo: ()=>t.removeFromTrack(),
            redo: ()=>t.addToTrack()
        })
    }
    onMouseDown(t) {
        this.posToCreate.length < this.constructor.itemClass.itemCount && this.posToCreate.push(this.track.mousePos.clone()),
        this.posToCreate.length == this.constructor.itemClass.itemCount && (this.createGroup(),
        this.posToCreate = new Array)
    }
    render(t) {
        t.save(),
        this.track.event.mouseIn && super.render(t);
        let e = null;
        for (let s of this.posToCreate)
            e != null && this.renderLink(t, e, s),
            e = s.toPixel(this.track),
            t.fillStyle = this.constructor.itemClass.color,
            t.strokeStyle = "#000",
            t.lineWidth = Math.max(2 * this.track.zoomFactor, .5),
            t.beginPath(),
            t.arc(e.x, e.y, 7 * this.track.zoomFactor, 0, 2 * Math.PI),
            t.fill(),
            t.stroke();
        e != null && this.renderLink(t, e, this.track.mousePos.toPixel(this.track)),
        t.restore()
    }
    renderLink(t, e, s) {
        t.strokeStyle = "#f00",
        t.moveTo(e.x, e.y),
        t.lineTo(s.x, s.y),
        t.stroke()
    }
}
class ri extends ai {
    static get toolName() {
        return "Teleporter"
    }
    static get keyLabel() {
        return "Shift+W"
    }
    static get key() {
        return new g(fe,m.SHIFT)
    }
    static get icon() {
        return Os
    }
    static get itemClass() {
        return re
    }
}
class oi extends Yt {
    static get toolName() {
        return "Toggle Fast Renderer (may cause flickering)"
    }
    static get keyLabel() {
        return "Control+Q"
    }
    static get key() {
        return new g(ue,m.CTRL)
    }
    static get icon() {
        return "speed"
    }
    toggle() {
        this.track.fastRender = !this.track.fastRender
    }
}
const ni = [Kt, be, Ce, V, Le, Pe, V, j, bt]
  , hi = [Kt, be, Ce, V, Le, Pe, V, j, bt, V, qs, Zs]
  , li = [Js, $s, _s, Xs, Qs, ti, V, si, V, ve, V, ii, oi]
  , ci = [Ys, Ks, Vs, Hs, Ws, js, ri];
class di extends vt {
    onEnter() {
        let t = new Ot(this.ui,this.track,this.track.isRace() ? ni : hi);
        if (this.track.toolManager.setTool(this.track.toolCollection.getByToolName(j.toolName)),
        this.track.toolManager.setCamera(this.track.toolCollection.getByToolName(j.toolName)),
        this.ui.uiElements.push(t),
        !this.track.isRace()) {
            let e = new Ot(this.ui,this.track,li,k.ALIGN_RIGHT)
              , s = new Y(this.ui,this.track,10,10,100,26,"Import track",()=>this.handleImport(),k.ALIGN_BOTTOM)
              , i = new Y(this.ui,this.track,120,10,100,26,"Export track",()=>this.handleExport(),k.ALIGN_BOTTOM)
              , a = new Y(this.ui,this.track,230,10,100,26,"Upload track",()=>this.handleUpload(),k.ALIGN_BOTTOM);
            this.ui.uiElements.push(e, s, i, a)
        }
    }
    handleImport() {
        let t = document.createElement("input");
        t.type = "file",
        t.addEventListener("change", ()=>{
            let e = t.files[0];
            if (e) {
                let s = new FileReader;
                s.onload = ()=>{
                    this.track = new Ae(this.track.canvas,{
                        trackCode: s.result
                    },this.manager.event),
                    this.manager.getState("parser").onEnter(),
                    this.manager.pop()
                }
                ,
                s.readAsText(e)
            }
        }
        ),
        t.click()
    }
    handleExport() {
        this.manager.push("generator")
    }
    handleUpload() {
        this.manager.getState("generator").isTrackUpload = !0,
        this.manager.push("generator")
    }
    toggleGhost(t) {
        if (this.track.ghostRunners.has(t))
            this.track.ghostRunners.delete(t),
            this.track.updateFocalPoint();
        else {
            let e = ",,,,,,BMX,Ghost";
            if (this.track.ghostCache.has(t))
                e = this.track.ghostCache.get(t);
            else {
                let i = Mt.getPostRequest(Ls, {
                    trackId: this.track.id,
                    id: t
                });
                e = JSON.parse(i.responseText).GHOSTSTRING,
                this.track.ghostCache.set(t, e)
            }
            let s = new rt(this.track,e);
            this.track.ghostRunners.set(t, s),
            s.createBike(),
            this.track.ghostRunners = new Map([...this.track.ghostRunners.entries()].sort((i,a)=>i[1].finalTime - a[1].finalTime)),
            this.track.playerRunner.reset(),
            this.track.ghostRunners.forEach(i=>{
                i.reset()
            }
            ),
            this.track.restart()
        }
    }
    saveGhost() {
        if (confirm("Do you want to save this time?")) {
            let t = le.generate(this.track.playerRunner), e = Mt.getPostRequest(Ps, {
                ghostString: t,
                trackId: this.track.id,
                time: this.track.time
            }), s;
            try {
                s = JSON.parse(e.responseText),
                console.log(s.ID)
            } catch {
                alert(`Your ghost was refused: ${s}`)
            }
        }
    }
    fixedUpdate() {
        this.track.toolManager.fixedUpdate(),
        this.track.paused || (this.track.playerRunner.fixedUpdate(),
        this.track.ghostRunners.forEach(t=>{
            t.done || t.fixedUpdate()
        }
        ),
        this.track.time++)
    }
    update(t, e) {
        this.track.playerRunner.done && (this.track.playerRunner.done = !1,
        this.saveGhost()),
        this.track.toolManager.update(t, e),
        this.track.paused || (this.track.ghostRunners.forEach(s=>{
            s.done || s.update(t, e)
        }
        ),
        this.track.playerRunner.update(t, e)),
        this.track.focalPoint && this.track.camera.selfAdd(this.track.focalPoint.displayPos.sub(this.track.camera).scale(e / 200))
    }
    render(t) {
        t.clearRect(0, 0, this.track.canvas.width, this.track.canvas.height);
        let e = new l(0,0).normalizeToCanvas(this.track)
          , s = new l(this.track.canvas.width,this.track.canvas.height).normalizeToCanvas(this.track)
          , i = T.gridCoords(e, this.track.cache.cellSize)
          , a = T.gridCoords(s, this.track.cache.cellSize)
          , r = T.gridCoords(e, this.track.grid.cellSize)
          , n = T.gridCoords(s, this.track.grid.cellSize);
        for (let c = i.x; c <= a.x; c++)
            for (let d = i.y; d <= a.y; d++)
                this.renderCache(t, this.track.cache, c, d, 1);
        this.track.ghostRunners.forEach(c=>{
            c.render(t)
        }
        ),
        this.track.playerRunner.render(t);
        for (let c = i.x; c <= a.x; c++)
            for (let d = i.y; d <= a.y; d++)
                this.renderCache(t, this.track.foregroundCache, c, d, .5);
        this.track.toolManager.render(t),
        t.lineWidth = .5,
        t.fillStyle = "#000",
        t.fillText($t.format(this.track.time * this.manager.game.frameDuration), 30, 15),
        t.fillText(`${this.track.playerRunner.targetsReached.size}/${this.track.targets.size}`, 30, 30);
        let h = 0;
        this.track.ghostRunners.forEach(c=>{
            let d = Math.max(0, c.finalTime - this.track.time)
              , u = d > 0 ? $t.format(d * this.manager.game.frameDuration) : "finished!"
              , y = `${c.ghostName}: ${u} - ${c.targetsReached.size}/${this.track.targets.size}`
              , M = t.measureText(y);
            t.fillStyle = c.instance.color,
            t.fillText(y, this.track.canvas.width - 30 - M.width, 15 * (1 + h++))
        }
        ),
        this.track.debug && this.renderDebug(t, i, a, r, n)
    }
    renderDebug(t, e, s, i, a) {
        t.save(),
        t.beginPath();
        for (let r = e.y; r <= s.y; r++) {
            let n = Math.floor(this.track.canvas.height / 2 - this.track.camera.y * this.track.zoomFactor + r * this.track.cache.cellSize * this.track.zoomFactor);
            t.moveTo(0, n),
            t.lineTo(this.track.canvas.width, n)
        }
        for (let r = e.x; r <= s.x; r++) {
            let n = Math.floor(this.track.canvas.width / 2 - this.track.camera.x * this.track.zoomFactor + r * this.track.cache.cellSize * this.track.zoomFactor);
            t.moveTo(n, 0),
            t.lineTo(n, this.track.canvas.height)
        }
        t.strokeStyle = "#0000ff55",
        t.lineWidth = 2,
        t.stroke(),
        t.beginPath();
        for (let r = i.y; r <= a.y; r++) {
            let n = Math.floor(this.track.canvas.height / 2 - this.track.camera.y * this.track.zoomFactor + r * this.track.grid.cellSize * this.track.zoomFactor);
            t.moveTo(0, n),
            t.lineTo(this.track.canvas.width, n)
        }
        for (let r = i.x; r <= a.x; r++) {
            let n = Math.floor(this.track.canvas.width / 2 - this.track.camera.x * this.track.zoomFactor + r * this.track.grid.cellSize * this.track.zoomFactor);
            t.moveTo(n, 0),
            t.lineTo(n, this.track.canvas.height)
        }
        t.strokeStyle = "#0000ff22",
        t.lineWidth = 2,
        t.stroke(),
        this.track.ghostRunners.forEach(r=>{
            r.renderDebug(t)
        }
        ),
        this.track.playerRunner.renderDebug(t),
        t.restore()
    }
    renderCache(t, e, s, i, a) {
        if (e.has(s, i)) {
            let r = e.cell(s, i);
            t.drawImage(r.getCanvas(this.track.zoomFactor, a, this.track.fastRender), Math.floor(this.track.canvas.width / 2 - this.track.camera.x * this.track.zoomFactor + r.x * this.track.zoomFactor) - 1, Math.floor(this.track.canvas.height / 2 - this.track.camera.y * this.track.zoomFactor + r.y * this.track.zoomFactor) - 1),
            t.strokeStyle = "#000";
            for (let n of r.objects)
                n.render(t),
                this.track.debug && n.renderDebug(t)
        }
    }
    onMouseDown(t) {
        this.track.toolManager.onMouseDown(t)
    }
    onMouseUp(t) {
        this.track.toolManager.onMouseUp(t)
    }
    onMouseMove(t) {
        this.track.toolManager.onMouseMove(t)
    }
    onScroll(t) {
        this.track.toolManager.onScroll(t)
    }
    onContextMenu(t) {
        this.track.toolManager.onContextMenu(t)
    }
    onKeyboardDown(t) {
        let e = this.track.toolCollection.getByKeyLabel(t.detail);
        e && e.run(!0)
    }
    onVisibilityChange() {
        document.hidden && this.track.pause(!0)
    }
}
class ui extends vt {
    onEnter() {
        let t = new Ot(this.ui,this.track,[j, bt]);
        this.track.toolManager.setTool(this.track.toolCollection.getByToolName(j.toolName)),
        this.track.toolManager.setCamera(this.track.toolCollection.getByToolName(j.toolName)),
        this.ui.uiElements.push(t);
        let e = new Y(this.ui,this.track,10,10,100,26,"Cancel",()=>this.handleCancel(),k.ALIGN_BOTTOM)
          , s = new Y(this.ui,this.track,0,10,200,26,"Upload with thumbnail",()=>this.handleUploadWithThumbnail(),k.ALIGN_BOTTOM | k.ALIGN_HORIZONTAL_CENTER);
        this.ui.uiElements.push(e, s)
    }
    handleCancel() {
        this.manager.pop()
    }
    handleUploadWithThumbnail() {
        let t = document.createElement("canvas");
        t.width = 500,
        t.height = 300,
        this.track.zoomFactor *= 2,
        this.screenshotting = !0,
        this.render(this.track.canvas.getContext("2d")),
        t.getContext("2d").drawImage(this.track.canvas, (this.track.canvas.width - 500) / 2, (this.track.canvas.height - 300) / 2, 500, 300, 0, 0, 500, 300),
        this.track.zoomFactor /= 2,
        this.screenshotting = !1;
        let e = t.toDataURL("image/png"), s = Mt.getPostRequest(Rs, {
            trackCode: this.track.trackCode,
            thumbnail: e.replace("data:image/png;base64,", "")
        }), i;
        try {
            i = JSON.parse(s.responseText),
            location.href = `./tracks/${i.ID}/`
        } catch {
            return alert(`Your track was refused: ${i}`),
            !1
        }
    }
    fixedUpdate() {
        this.track.toolManager.fixedUpdate()
    }
    update(t, e) {
        this.track.toolManager.update(t, e)
    }
    render(t) {
        t.clearRect(0, 0, this.track.canvas.width, this.track.canvas.height);
        let e = new l(0,0).normalizeToCanvas(this.track)
          , s = new l(this.track.canvas.width,this.track.canvas.height).normalizeToCanvas(this.track)
          , i = T.gridCoords(e, this.track.cache.cellSize)
          , a = T.gridCoords(s, this.track.cache.cellSize);
        for (let h = i.x; h <= a.x; h++)
            for (let c = i.y; c <= a.y; c++)
                this.renderCache(t, this.track.cache, h, c, 1);
        this.track.ghostRunners.forEach(h=>{
            h.render(t)
        }
        ),
        this.track.playerRunner.render(t);
        for (let h = i.x; h <= a.x; h++)
            for (let c = i.y; c <= a.y; c++)
                this.renderCache(t, this.track.foregroundCache, h, c, .5);
        if (this.track.toolManager.render(t),
        !this.screenshotting) {
            let h = (this.track.canvas.width - 250) / 2
              , c = h + 250
              , d = (this.track.canvas.height - 150) / 2
              , u = d + 150;
            t.save(),
            t.lineWidth = 1,
            t.strokeStyle = "#fff",
            t.fillStyle = "rgba(0, 0, 0, 0.4)",
            t.fillRect(0, 0, this.track.canvas.width, d),
            t.fillRect(0, u, this.track.canvas.width, d),
            t.fillRect(0, d, h, 150),
            t.fillRect(c, d, h, 150),
            t.strokeRect(h, d, 250, 150),
            t.restore()
        }
        let r = "Use your mouse to drag & fit an interesting part of your track in the thumbnail"
          , n = t.measureText(r).width;
        t.fillStyle = "#fff",
        t.fillRect((this.track.canvas.width - n) / 2 - 4, 6, n + 8, 18),
        t.fillStyle = "#000",
        t.fillText(r, (this.track.canvas.width - n) / 2, 20)
    }
    renderCache(t, e, s, i, a) {
        if (e.has(s, i)) {
            let r = e.cell(s, i);
            t.drawImage(r.getCanvas(this.track.zoomFactor, a, this.track.fastRender), Math.floor(this.track.canvas.width / 2 - this.track.camera.x * this.track.zoomFactor + r.x * this.track.zoomFactor) - 1, Math.floor(this.track.canvas.height / 2 - this.track.camera.y * this.track.zoomFactor + r.y * this.track.zoomFactor) - 1),
            t.strokeStyle = "#000";
            for (let n of r.objects)
                n.render(t)
        }
    }
    onMouseDown(t) {
        this.track.toolManager.onMouseDown(t)
    }
    onMouseUp(t) {
        this.track.toolManager.onMouseUp(t)
    }
    onMouseMove(t) {
        this.track.toolManager.onMouseMove(t)
    }
    onScroll(t) {
        this.track.toolManager.onScroll(t)
    }
    onContextMenu(t) {
        this.track.toolManager.onContextMenu(t)
    }
    onKeyboardDown(t) {
        let e = this.track.toolCollection.getByKeyLabel(t.detail);
        (e instanceof j || e instanceof bt) && e.run()
    }
    onVisibilityChange() {
        document.hidden && this.track.pause(!0)
    }
}
class gi {
    constructor(t, e) {
        f.createWorkerPool(),
        this.stateManager = new Ts(this,t,e),
        this.stateManager.addState(xs, "parser"),
        this.stateManager.addState(di, "track"),
        this.stateManager.addState(Cs, "generator"),
        this.stateManager.addState(ui, "trackUpload"),
        this.ctx = t.getContext("2d"),
        this.lastTime = performance.now(),
        this.timer = performance.now(),
        this.frameDuration = 1e3 / Ee,
        this.progress = 0,
        this.frames = 0,
        this.updates = 0
    }
    run() {
        requestAnimationFrame(()=>this.run());
        let t = performance.now()
          , e = t - this.lastTime;
        for (e > 1e3 && (e = this.frameDuration),
        this.progress += e / this.frameDuration,
        this.lastTime = t; this.progress >= 1; )
            this.stateManager.fixedUpdate(),
            this.updates++,
            this.progress--;
        this.stateManager.update(this.progress, e),
        this.stateManager.render(this.ctx),
        this.frames++,
        performance.now() - this.timer > 1e3 && (this.timer = performance.now(),
        document.title = `OpenRider - ${this.updates} ups, ${this.frames} fps`,
        this.updates = 0,
        this.frames = 0)
    }
}
document.createElement("canvas").getContext || (location.href = "https://browsehappy.com/");
let it = document.querySelector("[data-play=openrider]"), At;
window.addEventListener("resize", o=>Re());
Re();
function Re() {
    it.width = it.parentElement.clientWidth,
    it.height = it.parentElement.clientHeight,
    fi(it.getContext("2d"))
}
function fi(o) {
    o.lineCap = "round",
    o.lineJoin = "round",
    o.font = "bold 15px Ubuntu"
}
function pi(o) {
    At = new gi(it,o),
    At.run(),
    At.stateManager.push("parser")
}
function ki(o) {
    At.stateManager.getState("track").toggleGhost(o)
}
export const mi = {
    newGame: pi,
    toggleGhost: ki
};
