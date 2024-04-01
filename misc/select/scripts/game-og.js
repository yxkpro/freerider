!(function t(e, i, n) {
  function s(o, a) {
    if (!i[o]) {
      if (!e[o]) {
        var h = "function" == typeof require && require;
        if (!a && h) return h(o, !0);
        if (r) return r(o, !0);
        var c = new Error("Cannot find module '" + o + "'");
        throw ((c.code = "MODULE_NOT_FOUND"), c);
      }
      var l = (i[o] = { exports: {} });
      e[o][0].call(
        l.exports,
        function (t) {
          var i = e[o][1][t];
          return s(i ? i : t);
        },
        l,
        l.exports,
        t,
        e,
        i,
        n
      );
    }
    return i[o].exports;
  }
  for (
    var r = "function" == typeof require && require, o = 0;
    o < n.length;
    o++
  )
    s(n[o]);
  return s;
})(
  {
    1: [
      function (t, e) {
        function i() {
          (this._events = this._events || {}),
            (this._maxListeners = this._maxListeners || void 0);
        }
        function n(t) {
          return "function" == typeof t;
        }
        function s(t) {
          return "number" == typeof t;
        }
        function r(t) {
          return "object" == typeof t && null !== t;
        }
        function o(t) {
          return void 0 === t;
        }
        (e.exports = i),
          (i.EventEmitter = i),
          (i.prototype._events = void 0),
          (i.prototype._maxListeners = void 0),
          (i.defaultMaxListeners = 10),
          (i.prototype.setMaxListeners = function (t) {
            if (!s(t) || 0 > t || isNaN(t))
              throw TypeError("n must be a positive number");
            return (this._maxListeners = t), this;
          }),
          (i.prototype.emit = function (t) {
            var e, i, s, a, h, c;
            if (
              (this._events || (this._events = {}),
              "error" === t &&
                (!this._events.error ||
                  (r(this._events.error) && !this._events.error.length)))
            ) {
              if (((e = arguments[1]), e instanceof Error)) throw e;
              throw TypeError('Uncaught, unspecified "error" event.');
            }
            if (((i = this._events[t]), o(i))) return !1;
            if (n(i))
              switch (arguments.length) {
                case 1:
                  i.call(this);
                  break;
                case 2:
                  i.call(this, arguments[1]);
                  break;
                case 3:
                  i.call(this, arguments[1], arguments[2]);
                  break;
                default:
                  for (
                    s = arguments.length, a = new Array(s - 1), h = 1;
                    s > h;
                    h++
                  )
                    a[h - 1] = arguments[h];
                  i.apply(this, a);
              }
            else if (r(i)) {
              for (
                s = arguments.length, a = new Array(s - 1), h = 1;
                s > h;
                h++
              )
                a[h - 1] = arguments[h];
              for (c = i.slice(), s = c.length, h = 0; s > h; h++)
                c[h].apply(this, a);
            }
            return !0;
          }),
          (i.prototype.addListener = function (t, e) {
            var s;
            if (!n(e)) throw TypeError("listener must be a function");
            if (
              (this._events || (this._events = {}),
              this._events.newListener &&
                this.emit("newListener", t, n(e.listener) ? e.listener : e),
              this._events[t]
                ? r(this._events[t])
                  ? this._events[t].push(e)
                  : (this._events[t] = [this._events[t], e])
                : (this._events[t] = e),
              r(this._events[t]) && !this._events[t].warned)
            ) {
              var s;
              (s = o(this._maxListeners)
                ? i.defaultMaxListeners
                : this._maxListeners),
                s &&
                  s > 0 &&
                  this._events[t].length > s &&
                  ((this._events[t].warned = !0),
                  console.error(
                    "(node) warning: possible EventEmitter memory leak detected. %d listeners added. Use emitter.setMaxListeners() to increase limit.",
                    this._events[t].length
                  ),
                  "function" == typeof console.trace && console.trace());
            }
            return this;
          }),
          (i.prototype.on = i.prototype.addListener),
          (i.prototype.once = function (t, e) {
            function i() {
              this.removeListener(t, i),
                s || ((s = !0), e.apply(this, arguments));
            }
            if (!n(e)) throw TypeError("listener must be a function");
            var s = !1;
            return (i.listener = e), this.on(t, i), this;
          }),
          (i.prototype.removeListener = function (t, e) {
            var i, s, o, a;
            if (!n(e)) throw TypeError("listener must be a function");
            if (!this._events || !this._events[t]) return this;
            if (
              ((i = this._events[t]),
              (o = i.length),
              (s = -1),
              i === e || (n(i.listener) && i.listener === e))
            )
              delete this._events[t],
                this._events.removeListener &&
                  this.emit("removeListener", t, e);
            else if (r(i)) {
              for (a = o; a-- > 0; )
                if (i[a] === e || (i[a].listener && i[a].listener === e)) {
                  s = a;
                  break;
                }
              if (0 > s) return this;
              1 === i.length
                ? ((i.length = 0), delete this._events[t])
                : i.splice(s, 1),
                this._events.removeListener &&
                  this.emit("removeListener", t, e);
            }
            return this;
          }),
          (i.prototype.removeAllListeners = function (t) {
            var e, i;
            if (!this._events) return this;
            if (!this._events.removeListener)
              return (
                0 === arguments.length
                  ? (this._events = {})
                  : this._events[t] && delete this._events[t],
                this
              );
            if (0 === arguments.length) {
              for (e in this._events)
                "removeListener" !== e && this.removeAllListeners(e);
              return (
                this.removeAllListeners("removeListener"),
                (this._events = {}),
                this
              );
            }
            if (((i = this._events[t]), n(i))) this.removeListener(t, i);
            else for (; i.length; ) this.removeListener(t, i[i.length - 1]);
            return delete this._events[t], this;
          }),
          (i.prototype.listeners = function (t) {
            var e;
            return (e =
              this._events && this._events[t]
                ? n(this._events[t])
                  ? [this._events[t]]
                  : this._events[t].slice()
                : []);
          }),
          (i.listenerCount = function (t, e) {
            var i;
            return (i =
              t._events && t._events[e]
                ? n(t._events[e])
                  ? 1
                  : t._events[e].length
                : 0);
          });
      },
      {},
    ],
    2: [
      function (t) {
        !(function (e) {
          "use strict";
          function i(t, e, i) {
            (this.assets = e),
              (this.settings = i),
              this.initCanvas(),
              this.initStage(),
              this.setSize(),
              this.switchScene(t),
              this.setSize(),
              this.startTicker();
          }
          t("../libs/createjs/easeljs-0.8"), t("../libs/performance");
          var n = t("./scenes/editor"),
            s = t("./scenes/main"),
            r = { Editor: n, Main: s };
          (i.prototype = {
            gameContainer: null,
            tickCount: 0,
            currentScene: null,
            assets: null,
            stage: null,
            canvas: null,
            stats: null,
            width: 0,
            height: 0,
            fullscreen: !1,
            onStateChange: null,
            initCanvas: function () {
              var t = document.createElement("canvas"),
                e = document.getElementById(this.settings.defaultContainerID);
              e.appendChild(t), (this.gameContainer = e), (this.canvas = t);
            },
            initStage: function () {
              var t = new createjs.Stage(this.canvas);
              (t.autoClear = !1),
                createjs.Touch.enable(t),
                t.enableMouseOver(30),
                (t.mouseMoveOutside = !0),
                (t.preventSelection = !1),
                (this.stage = t);
            },
            setSize: function () {
              var t = window.innerHeight,
                e = window.innerWidth;
              if (!this.settings.fullscreen && !this.settings.isStandalone) {
                var i = this.gameContainer;
                (t = i.clientHeight), (e = i.clientWidth);
              }
              if (this.currentScene) {
                var n = this.currentScene.getCanvasOffset();
                t -= n.height;
              }
              var s = 1;
              void 0 !== window.devicePixelRatio &&
                (s = window.devicePixelRatio),
                this.settings.lowQualityMode && (s = 1);
              var r = e * s,
                o = t * s;
              (r !== this.width || o !== this.height) &&
                ((this.width = r),
                (this.height = o),
                (this.canvas.width = r),
                (this.canvas.height = o)),
                (this.pixelRatio = s),
                (this.canvas.style.width = e + "px"),
                (this.canvas.style.height = t + "px"),
                this.currentScene && this.currentScene.command("resize");
            },
            startTicker: function () {
              (createjs.Ticker.timingMode = createjs.Ticker.RAF_SYNCED),
                createjs.Ticker.setFPS(this.settings.drawFPS),
                createjs.Ticker.on("tick", this.update.bind(this));
            },
            update: function () {
              this.currentScene.update(), this.tickCount++;
            },
            switchScene: function (t) {
              null !== this.currentScene && this.currentScene.close(),
                (this.currentScene = new r[t](this));
            },
            command: function () {
              this.currentScene.command.apply(this.currentScene, arguments);
            },
            close: function () {
              createjs.Ticker.reset(),
                createjs.Ticker.removeAllEventListeners(),
                this.currentScene.close(),
                (this.currentScene = null),
                (this.assets = null),
                (this.settings = null),
                (this.stage.autoClear = !0),
                this.stage.removeAllChildren(),
                this.stage.update(),
                this.stage.enableDOMEvents(!1),
                this.stage.removeAllEventListeners(),
                (this.stage = null),
                this.canvas.parentNode.removeChild(this.canvas),
                (this.canvas = null),
                (this.tickCount = null),
                (this.height = null),
                (this.width = null);
            },
          }),
            (e.Game = i);
        })((window = window || {}));
      },
      {
        "../libs/createjs/easeljs-0.8": 76,
        "../libs/performance": 78,
        "./scenes/editor": 17,
        "./scenes/main": 18,
      },
    ],
    3: [
      function (t, e) {
        function i() {}
        var n = t("../../libs/lodash-3.10.1.js"),
          s = i.prototype;
        (s.defaultControlOptions = { visible: !0 }),
          (s.name = null),
          (s.controlsSpriteSheetData = null),
          (s.controlData = null),
          (s.game = null),
          (s.scene = null),
          (s.settings = null),
          (s.stage = null),
          (s.controlsContainer = null),
          (s.controlsSprite = null),
          (s.gamepad = null),
          (s.initialize = function (t) {
            (this.scene = t),
              (this.game = t.game),
              (this.assets = t.assets),
              (this.settings = t.settings),
              (this.stage = t.game.stage),
              (this.mouse = t.mouse),
              (this.playerManager = t.playerManager),
              this.createSprite(),
              this.addControls(),
              this.resize();
          }),
          (s.addControls = function () {}),
          (s.createSprite = function () {
            var t = this.scene.assets.getResult(this.name),
              e = this.controlsSpriteSheetData;
            e.images = [t];
            var i = new createjs.SpriteSheet(e),
              n = new createjs.Sprite(i);
            this.controlsSprite = n;
          }),
          (s.isVisible = function () {
            return this.controlsContainer.visible;
          }),
          (s.hide = function () {
            this.controlsContainer.visible = !1;
          }),
          (s.show = function () {
            this.controlsContainer.visible = !0;
          }),
          (s.setVisibility = function (t) {
            this.controlsContainer.visible = t;
          }),
          (s.createControl = function (t) {
            var e = this.controlsSprite,
              i = n.extend({}, this.defaultControlOptions, this.controlData[t]),
              s = e.clone();
            s.gotoAndStop(t),
              (s.buttonDetails = i),
              (s.cursor = "pointer"),
              s.on("mousedown", this.controlDown.bind(this)),
              s.on("pressup", this.controlUp.bind(this)),
              s.on("mouseover", this.mouseOver.bind(this)),
              s.on("mouseout", this.mouseOut.bind(this));
            var r = s.getBounds();
            if (
              ((s.regX = r.width / 2),
              (s.regY = r.height / 2),
              (s.alpha = 0.5),
              (s.name = t),
              (s.visible = i.visible),
              i.hitArea)
            ) {
              var o = i.hitArea,
                a = new createjs.Shape();
              o.radius
                ? a.graphics.beginFill("#000").drawCircle(o.x, o.y, o.radius)
                : a.graphics
                    .beginFill("#000")
                    .drawRect(o.x, o.y, o.width, o.height),
                (s.hitArea = a);
            }
            return s;
          }),
          (s.mouseOver = function (t) {
            var e = t.target;
            (e.alpha = 0.8), (this.mouse.enabled = !1);
          }),
          (s.mouseOut = function (t) {
            var e = t.target;
            (e.alpha = 0.5), (this.mouse.enabled = !0);
          }),
          (s.controlDown = function (t) {
            var e = t.target,
              i = e.buttonDetails,
              n = this.playerManager.firstPlayer.getGamepad();
            if (i.key) {
              var s = i.key;
              n.setButtonDown(s);
            }
            if (i.keys)
              for (var r = i.keys, o = r.length, a = 0; o > a; a++) {
                var s = r[a];
                n.setButtonDown(s);
              }
            i.downCallback && i.downCallback(t),
              this.settings.mobile && (this.mouse.enabled = !1),
              (e.alpha = 1);
          }),
          (s.controlUp = function (t) {
            var e = t.target,
              i = e.buttonDetails,
              n = this.playerManager.firstPlayer.getGamepad();
            if (i.key) {
              var s = i.key;
              n.setButtonUp(s);
            }
            if (i.keys)
              for (var r = i.keys, o = r.length, a = 0; o > a; a++) {
                var s = r[a];
                n.setButtonUp(s);
              }
            i.upCallback && i.upCallback(t),
              this.settings.mobile
                ? ((this.mouse.enabled = !0), (e.alpha = 0.5))
                : (e.alpha = 0.8);
          }),
          (s.close = function () {}),
          (s.update = function () {}),
          (s.resize = function () {
            var t = this.scene.game,
              e = (this.scene.screen, t.width),
              i = t.height,
              n = t.pixelRatio,
              s = this.controlsContainer.children;
            for (var r in s) {
              var o = s[r],
                a = o.buttonDetails;
              a.bottom && (o.y = i - a.bottom * (n / 2)),
                a.left && (o.x = a.left * (n / 2)),
                a.right && (o.x = e - a.right * (n / 2)),
                a.top && (o.y = a.top * (n / 2)),
                (o.scaleX = o.scaleY = n / 2);
            }
          }),
          (e.exports = i);
      },
      { "../../libs/lodash-3.10.1.js": 77 },
    ],
    4: [
      function (t, e) {
        function i(t) {
          this.initialize(t);
        }
        var n = t("./controls"),
          s = (i.prototype = new n());
        (s.name = "fullscreen_controls"),
          (s.fullscreenControl = null),
          (s.fullscreen = !1),
          (s.controlsSpriteSheetData = {
            frames: [
              [230, 2, 76, 76],
              [154, 2, 76, 76],
              [78, 2, 76, 76],
              [2, 2, 76, 76],
            ],
            animations: {
              "exit_fullscreen_btn-hover": [0],
              exit_fullscreen_btn: [1],
              "fullscreen_btn-hover": [2],
              fullscreen_btn: [3],
            },
          }),
          (s.controlData = {
            "fullscreen_btn-hover": { top: 60, right: 150, key: "fullscreen" },
          }),
          (s.update = function () {
            var t = this.scene.settings.fullscreen;
            this.fullscreen !== t &&
              (this.fullscreenControl.gotoAndStop(
                t ? "exit_fullscreen_btn-hover" : "fullscreen_btn-hover"
              ),
              (this.fullscreen = t));
          }),
          (s.addControls = function () {
            var t = new createjs.Container();
            t.addChild(this.createControl("fullscreen_btn-hover")),
              (this.controlsContainer = t),
              (this.fullscreenControl = t.getChildByName(
                "fullscreen_btn-hover"
              )),
              this.stage.addChild(t);
          }),
          (e.exports = i);
      },
      { "./controls": 3 },
    ],
    5: [
      function (t, e) {
        function i(t) {
          this.initialize(t);
        }
        var n = t("./controls"),
          s = (i.prototype = new n());
        (s.name = "pause_controls"),
          (s.pauseControl = null),
          (s.paused = !1),
          (s.controlsSpriteSheetData = {
            frames: [
              [230, 2, 76, 76],
              [154, 2, 76, 76],
              [78, 2, 76, 76],
              [2, 2, 76, 76],
            ],
            animations: {
              "pause_btn-hover": [0],
              pause_btn: [1],
              "play_btn-hover": [2],
              play_btn: [3],
            },
          }),
          (s.controlData = {
            "pause_btn-hover": { key: "pause", top: 60, right: 70 },
          }),
          (s.update = function () {
            var t = this.scene.paused;
            this.paused !== t &&
              (t
                ? (this.pauseControl.gotoAndStop("play_btn-hover"),
                  (this.paused = !0))
                : (this.pauseControl.gotoAndStop("pause_btn-hover"),
                  (this.paused = !1)));
          }),
          (s.addControls = function () {
            var t = new createjs.Container();
            t.addChild(this.createControl("pause_btn-hover")),
              (this.controlsContainer = t),
              (this.pauseControl = t.getChildByName("pause_btn-hover")),
              this.stage.addChild(t);
          }),
          (e.exports = i);
      },
      { "./controls": 3 },
    ],
    6: [
      function (t, e) {
        function i(t) {
          this.initialize(t);
        }
        var n = t("./controls"),
          s = (i.prototype = new n());
        (s.name = "phone_controls"),
          (s.mainResize = s.resize),
          (s.zoomControlsContainer = null),
          (s.lastCheckpointButton = null),
          (s.replayButton = null),
          (s.controlsSpriteSheetData = {
            frames: [
              [782, 2, 128, 128],
              [652, 2, 128, 128],
              [522, 2, 128, 128],
              [912, 78, 75, 75],
              [392, 2, 128, 128],
              [912, 2, 75, 75],
              [262, 2, 128, 128],
              [132, 2, 128, 128],
              [2, 2, 128, 128],
            ],
            animations: {
              accelerate: [0],
              brake: [1],
              direction: [2],
              last_checkpoint: [3],
              left: [4],
              replay: [5],
              right: [6],
              zoom_in: [7],
              zoom_out: [8],
            },
          }),
          (s.controlData = {
            brake: {
              key: "down",
              bottom: 100,
              left: 100,
              hitArea: { width: 250, height: 200, x: -30, y: -15 },
            },
            direction: {
              key: "z",
              bottom: 250,
              right: 100,
              hitArea: { width: 200, height: 200, x: -20, y: -65 },
            },
            forward: {
              key: "up",
              bottom: 250,
              left: 100,
              hitArea: { width: 250, height: 200, x: -30, y: -65 },
            },
            last_checkpoint: { key: "enter", top: 60, left: 160 },
            left: {
              key: "left",
              bottom: 100,
              right: 250,
              hitArea: { width: 230, height: 230, x: -100, y: -65 },
            },
            right: {
              key: "right",
              bottom: 100,
              right: 100,
              hitArea: { width: 200, height: 200, x: -10, y: -15 },
            },
            replay: { key: "restart", top: 60, left: 80 },
            zoom_in: { key: "zoom_increase", bottom: 100, right: 100 },
            zoom_out: { key: "zoom_decrease", bottom: 100, left: 100 },
          }),
          (s.addControls = function () {
            var t = this.createControl("last_checkpoint"),
              e = this.createControl("replay"),
              i = this.createControl("zoom_in"),
              n = this.createControl("zoom_out"),
              s = new createjs.Container();
            s.addChild(this.createControl("left")),
              s.addChild(this.createControl("right")),
              s.addChild(this.createControl("forward")),
              s.addChild(this.createControl("brake")),
              s.addChild(this.createControl("direction")),
              s.addChild(t),
              s.addChild(e),
              s.addChild(i),
              s.addChild(n);
            var r = new createjs.Container();
            r.addChild(i),
              r.addChild(n),
              (r.visibility = !1),
              (this.lastCheckpointButton = t),
              (this.replayButton = e),
              (this.controlsContainer = s),
              (this.zoomControlsContainer = r),
              this.stage.addChild(s),
              this.stage.addChild(r);
          }),
          (s.resize = function () {
            var t = this.scene.game,
              e = (this.scene.screen, t.width),
              i = t.height,
              n = t.pixelRatio,
              s = this.zoomControlsContainer.children;
            for (var r in s) {
              var o = s[r],
                a = o.buttonDetails;
              a.bottom && (o.y = i - a.bottom * (n / 2)),
                a.left && (o.x = a.left * (n / 2)),
                a.right && (o.x = e - a.right * (n / 2)),
                a.top && (o.y = a.top * (n / 2)),
                (o.scaleX = o.scaleY = n / 2);
            }
            this.mainResize();
          }),
          (s.setZoomControlsVisibilty = function (t) {
            this.zoomControlsContainer.visible = t;
          }),
          (s.update = function () {
            var t = this.scene;
            this.lastCheckpointButton.visible =
              t.playerManager.firstPlayer.hasCheckpoints() ? !0 : !1;
          }),
          (e.exports = i);
      },
      { "./controls": 3 },
    ],
    7: [
      function (t, e) {
        function i(t) {
          this.initialize(t);
        }
        var n = t("./controls"),
          s = (i.prototype = new n());
        (s.name = "redo_undo_controls"),
          (s.controlsSpriteSheetData = {
            frames: [
              [78, 2, 76, 76],
              [2, 2, 76, 76],
            ],
            animations: { redo: [0], undo: [1] },
          }),
          (s.controlData = {
            redo: { keys: ["ctrl", "y"], top: 60, right: 160 },
            undo: { keys: ["ctrl", "z"], top: 60, right: 240 },
          }),
          (s.addControls = function () {
            var t = new createjs.Container();
            t.addChild(this.createControl("redo")),
              t.addChild(this.createControl("undo")),
              (this.controlsContainer = t),
              this.stage.addChild(t);
          }),
          (s.update = function () {
            var t = this.scene,
              e = this.scene.paused;
            t.controls &&
              this.controlsContainer.visible !== e &&
              (this.controlsContainer.visible = e);
          }),
          (e.exports = i);
      },
      { "./controls": 3 },
    ],
    8: [
      function (t, e) {
        function i(t) {
          var e = t.settings;
          if (e.fullscreenAvailable === !1) {
            var i = this.controlData["settings_btn-hover"];
            (i.top = 60), (i.right = 150);
          }
          this.initialize(t);
        }
        var n = t("./controls"),
          s = (i.prototype = new n());
        (s.name = "settings_controls"),
          (s.controlsSpriteSheetData = {
            frames: [
              [78, 2, 76, 76],
              [2, 2, 76, 76],
            ],
            animations: { "settings_btn-hover": [0], settings_btn: [1] },
          }),
          (s.controlData = {
            "settings_btn-hover": { top: 60, right: 230, key: "settings" },
          }),
          (s.update = function () {}),
          (s.addControls = function () {
            var t = new createjs.Container();
            t.addChild(this.createControl("settings_btn-hover")),
              (this.controlsContainer = t),
              this.stage.addChild(t);
          }),
          (e.exports = i);
      },
      { "./controls": 3 },
    ],
    9: [
      function (t, e) {
        function i(t) {
          this.initialize(t);
        }
        var n = t("./controls"),
          s = (i.prototype = new n());
        (s.name = "tablet_controls"),
          (s.mainResize = s.resize),
          (s.zoomControlsContainer = null),
          (s.lastCheckpointButton = null),
          (s.controlsSpriteSheetData = {
            frames: [
              [154, 306, 150, 150],
              [154, 154, 150, 150],
              [382, 154, 75, 75],
              [306, 2, 150, 150],
              [154, 2, 150, 150],
              [306, 154, 75, 75],
              [2, 306, 150, 150],
              [2, 154, 150, 150],
              [2, 2, 150, 150],
            ],
            animations: {
              accelerate: [0],
              brake: [1],
              last_checkpoint: [2],
              direction: [3],
              left: [4],
              replay: [5],
              right: [6],
              zoom_in: [7],
              zoom_out: [8],
            },
          }),
          (s.controlData = {
            brake: {
              key: "down",
              bottom: 120,
              left: 285,
              hitArea: { radius: 150, x: 75, y: 90 },
            },
            direction: {
              key: "z",
              bottom: 285,
              right: 450,
              hitArea: { radius: 150, x: 40, y: 40 },
            },
            forward: {
              key: "up",
              bottom: 285,
              left: 140,
              hitArea: { radius: 150, x: 75, y: 75 },
            },
            last_checkpoint: { key: "enter", top: 60, left: 160 },
            left: {
              key: "left",
              bottom: 120,
              right: 285,
              hitArea: { radius: 150, x: 75, y: 75 },
            },
            right: {
              key: "right",
              bottom: 285,
              right: 140,
              hitArea: { radius: 150, x: 100, y: 40 },
            },
            replay: { key: "restart", top: 60, left: 80 },
            zoom_in: { key: "zoom_increase", bottom: 285, right: 140 },
            zoom_out: { key: "zoom_decrease", bottom: 285, left: 140 },
          }),
          (s.resize = function () {
            var t = this.scene.game,
              e = (this.scene.screen, t.width),
              i = t.height,
              n = t.pixelRatio,
              s = this.zoomControlsContainer.children;
            for (var r in s) {
              var o = s[r],
                a = o.buttonDetails;
              a.bottom && (o.y = i - a.bottom * (n / 2)),
                a.left && (o.x = a.left * (n / 2)),
                a.right && (o.x = e - a.right * (n / 2)),
                a.top && (o.y = a.top * (n / 2)),
                (o.scaleX = o.scaleY = n / 2);
            }
            this.mainResize();
          }),
          (s.setZoomControlsVisibilty = function (t) {
            this.zoomControlsContainer.visible = t;
          }),
          (s.addControls = function () {
            var t = this.createControl("zoom_in"),
              e = this.createControl("zoom_out"),
              i = new createjs.Container();
            i.addChild(this.createControl("left")),
              i.addChild(this.createControl("right")),
              i.addChild(this.createControl("forward")),
              i.addChild(this.createControl("brake")),
              i.addChild(this.createControl("direction")),
              i.addChild(this.createControl("last_checkpoint")),
              i.addChild(this.createControl("replay"));
            var n = new createjs.Container();
            n.addChild(t),
              n.addChild(e),
              (n.visible = !1),
              (this.lastCheckpointButton = i.getChildByName("last_checkpoint")),
              (this.controlsContainer = i),
              (this.zoomControlsContainer = n),
              this.stage.addChild(i),
              this.stage.addChild(n);
          }),
          (s.update = function () {
            var t = this.scene;
            this.lastCheckpointButton.visible =
              t.playerManager.firstPlayer.hasCheckpoints() ? !0 : !1;
          }),
          (e.exports = i);
      },
      { "./controls": 3 },
    ],
    10: [
      function (t, e, i) {
        !(function () {
          "use strict";
          function t(t) {
            (this.drawAngle = 0), (this.colors = t), this.createVersion();
          }
          var n = GameInventoryManager.HeadClass,
            s = {},
            r = 0,
            o = 0,
            a = -3,
            h = 1,
            c = 115,
            l = 112,
            u = 0.17,
            p = (t.prototype = new n());
          (p.versionName = ""),
            (p.dirty = !0),
            (p.cache = function (t) {
              var e = s[this.versionName];
              e.dirty = !1;
              var t = Math.max(t, 1),
                i = c * t * u,
                n = l * t * u,
                a = e.canvas;
              (a.width = i),
                (a.height = n),
                (r = a.width / 2),
                (o = a.height / 2);
              var h = a.getContext("2d"),
                p = u * t,
                d = this.colors;
              h.scale(p, p),
                h.translate(0, 0),
                (h.strokeStyle = "rgba(0,0,0,0)"),
                (h.lineCap = "butt"),
                (h.lineJoin = "miter"),
                (h.miterLimit = 4),
                h.save(),
                (h.fillStyle = "#ffffff"),
                h.beginPath(),
                h.arc(70.473, 52.5, 30.3, 0, 6.283185307179586, !0),
                h.closePath(),
                h.fill(),
                h.stroke(),
                h.restore(),
                h.save(),
                (h.fillStyle = d.back),
                h.beginPath(),
                h.moveTo(41.169, 60.946),
                h.bezierCurveTo(
                  36.97,
                  47.830999999999996,
                  41.82899999999999,
                  33.021,
                  53.928999999999995,
                  25.150999999999996
                ),
                h.bezierCurveTo(
                  68.43299999999999,
                  15.717999999999996,
                  87.83599999999998,
                  19.828999999999997,
                  97.269,
                  34.331999999999994
                ),
                h.bezierCurveTo(
                  99.11200000000001,
                  37.166,
                  100.43100000000001,
                  40.18899999999999,
                  101.263,
                  43.288999999999994
                ),
                h.lineTo(41.169, 60.946),
                h.closePath(),
                h.fill(),
                h.stroke(),
                h.restore(),
                d.front &&
                  (h.save(),
                  (h.fillStyle = d.front),
                  h.beginPath(),
                  h.moveTo(60.101, 55.383),
                  h.lineTo(41.168, 60.946000000000005),
                  h.bezierCurveTo(
                    37.525,
                    49.569,
                    40.708999999999996,
                    36.92400000000001,
                    49.513,
                    28.632000000000005
                  ),
                  h.bezierCurveTo(
                    52.115,
                    36.598,
                    55.665,
                    46.185,
                    60.101,
                    55.383
                  ),
                  h.closePath(),
                  h.fill(),
                  h.stroke(),
                  h.restore()),
                h.save(),
                h.beginPath(),
                h.moveTo(70.473, 22.2),
                h.bezierCurveTo(87.207, 22.2, 100.773, 35.765, 100.773, 52.5),
                h.bezierCurveTo(100.773, 69.235, 87.208, 82.8, 70.473, 82.8),
                h.bezierCurveTo(53.738, 82.8, 40.173, 69.235, 40.173, 52.5),
                h.bezierCurveTo(40.173, 35.765, 53.739, 22.2, 70.473, 22.2),
                h.moveTo(70.473, 15.2),
                h.bezierCurveTo(49.906, 15.2, 33.173, 31.932, 33.173, 52.5),
                h.bezierCurveTo(33.173, 73.068, 49.905, 89.8, 70.473, 89.8),
                h.bezierCurveTo(91.041, 89.8, 107.773, 73.068, 107.773, 52.5),
                h.bezierCurveTo(
                  107.773,
                  31.932000000000002,
                  91.041,
                  15.2,
                  70.473,
                  15.2
                ),
                h.lineTo(70.473, 15.2),
                h.closePath(),
                h.fill(),
                h.stroke(),
                h.restore(),
                h.save(),
                h.beginPath(),
                h.moveTo(95.955, 35.72),
                h.bezierCurveTo(
                  70.699,
                  43.291,
                  45.543,
                  50.857,
                  20.391000000000005,
                  58.525
                ),
                h.bezierCurveTo(
                  16.828000000000007,
                  59.647999999999996,
                  13.261000000000006,
                  60.671,
                  9.598000000000006,
                  61.796
                ),
                h.bezierCurveTo(
                  2.1710000000000065,
                  64.05199999999999,
                  5.767000000000007,
                  75.536,
                  13.194000000000006,
                  73.28
                ),
                h.bezierCurveTo(
                  38.345000000000006,
                  65.612,
                  63.59700000000001,
                  57.942,
                  88.753,
                  50.375
                ),
                h.bezierCurveTo(
                  92.316,
                  49.252,
                  95.884,
                  48.229,
                  99.54599999999999,
                  47.103
                ),
                h.bezierCurveTo(
                  106.874,
                  44.851,
                  103.281,
                  33.467,
                  95.955,
                  35.72
                ),
                h.lineTo(95.955, 35.72),
                h.closePath(),
                h.fill(),
                h.stroke(),
                h.restore();
            }),
            (p.getVersions = function () {
              return s;
            }),
            (p.getBaseWidth = function () {
              return c;
            }),
            (p.getBaseHeight = function () {
              return l;
            }),
            (p.getDrawOffsetX = function () {
              return a;
            }),
            (p.getDrawOffsetY = function () {
              return h;
            }),
            (p.getScale = function () {
              return u;
            }),
            GameInventoryManager &&
              GameInventoryManager.register("backwardscap", t),
            "undefined" != typeof i &&
              ("undefined" != typeof e && e.exports && (i = e.exports = t),
              (i.BackwardsCap = t));
        })();
      },
      {},
    ],
    11: [
      function (t, e, i) {
        !(function () {
          "use strict";
          function t(t) {
            (this.drawAngle = 0), (this.colors = t), this.createVersion();
          }
          var n = GameInventoryManager.HeadClass,
            s = Math.max,
            r = {},
            o = 0,
            a = 0,
            h = 2.2,
            c = 1,
            l = 115,
            u = 112,
            p = 0.17,
            d = (t.prototype = new n());
          (d.versionName = ""),
            (d.dirty = !0),
            (d.getVersions = function () {
              return r;
            }),
            (d.cache = function (t) {
              var e = r[this.versionName];
              e.dirty = !1;
              var t = s(t, 1),
                i = l * t * p,
                n = u * t * p,
                h = e.canvas;
              (h.width = i),
                (h.height = n),
                (o = h.width / 2),
                (a = h.height / 2);
              var c = h.getContext("2d"),
                d = p * t;
              c.save(),
                c.scale(d, d),
                c.translate(0, 0),
                c.beginPath(),
                (c.strokeStyle = "rgba(0,0,0,0)"),
                (c.lineCap = "butt"),
                (c.lineJoin = "miter"),
                (c.miterLimit = 4),
                c.save(),
                (c.fillStyle = "#ffffff"),
                c.beginPath(),
                c.arc(42.4, 52.5, 30.3, 0, 6.283185307179586, !0),
                c.closePath(),
                c.fill(),
                c.stroke(),
                c.restore(),
                c.save(),
                (c.fillStyle = this.colors.back),
                c.beginPath(),
                c.moveTo(71.624, 44.496),
                c.bezierCurveTo(68.112, 31.647, 56.363, 22.2, 42.4, 22.2),
                c.bezierCurveTo(
                  25.665999999999997,
                  22.2,
                  12.099999999999998,
                  35.765,
                  12.099999999999998,
                  52.5
                ),
                c.bezierCurveTo(
                  12.099999999999998,
                  55.771,
                  12.623999999999999,
                  58.916,
                  13.582999999999998,
                  61.867000000000004
                ),
                c.lineTo(71.624, 44.496),
                c.closePath(),
                c.fill(),
                c.stroke(),
                c.restore(),
                this.colors.front &&
                  (c.save(),
                  c.beginPath(),
                  c.moveTo(76.917, 38.393),
                  c.bezierCurveTo(
                    71.677,
                    25.617,
                    59.54900000000001,
                    16.371000000000002,
                    45.172,
                    15.309000000000001
                  ),
                  c.bezierCurveTo(
                    47.57899999999999,
                    22.559,
                    50.918,
                    33.862,
                    52.501,
                    44.894999999999996
                  ),
                  c.bezierCurveTo(
                    60.643,
                    42.731,
                    68.775,
                    40.566,
                    76.917,
                    38.393
                  ),
                  c.closePath(),
                  (c.fillStyle = this.colors.front),
                  c.fill(),
                  c.stroke(),
                  c.restore()),
                c.save(),
                c.beginPath(),
                c.moveTo(42.4, 22.2),
                c.bezierCurveTo(59.134, 22.2, 72.7, 35.765, 72.7, 52.5),
                c.bezierCurveTo(72.7, 69.235, 59.135, 82.8, 42.4, 82.8),
                c.bezierCurveTo(25.665, 82.8, 12.1, 69.234, 12.1, 52.5),
                c.bezierCurveTo(
                  12.1,
                  35.766000000000005,
                  25.666,
                  22.2,
                  42.4,
                  22.2
                ),
                c.moveTo(42.4, 15.2),
                c.bezierCurveTo(
                  21.833,
                  15.2,
                  5.100000000000001,
                  31.932,
                  5.100000000000001,
                  52.5
                ),
                c.bezierCurveTo(
                  5.100000000000001,
                  73.068,
                  21.832,
                  89.8,
                  42.4,
                  89.8
                ),
                c.bezierCurveTo(
                  62.967999999999996,
                  89.8,
                  79.69999999999999,
                  73.068,
                  79.69999999999999,
                  52.5
                ),
                c.bezierCurveTo(
                  79.69999999999999,
                  31.932000000000002,
                  62.968,
                  15.2,
                  42.4,
                  15.2
                ),
                c.lineTo(42.4, 15.2),
                c.closePath(),
                c.fill(),
                c.stroke(),
                c.restore(),
                c.save(),
                c.beginPath(),
                c.moveTo(16.3, 66.85),
                c.bezierCurveTo(
                  41.8,
                  60.148999999999994,
                  67.2,
                  53.449999999999996,
                  92.601,
                  46.648999999999994
                ),
                c.bezierCurveTo(
                  96.201,
                  45.648999999999994,
                  99.8,
                  44.748999999999995,
                  103.5,
                  43.748999999999995
                ),
                c.bezierCurveTo(
                  111,
                  41.748999999999995,
                  107.8,
                  30.148999999999994,
                  100.3,
                  32.148999999999994
                ),
                c.bezierCurveTo(
                  74.901,
                  38.94899999999999,
                  49.400999999999996,
                  45.748999999999995,
                  24,
                  52.449
                ),
                c.bezierCurveTo(20.4, 53.449, 16.8, 54.349, 13.101, 55.349),
                c.bezierCurveTo(5.7, 57.35, 8.9, 68.85, 16.3, 66.85),
                c.lineTo(16.3, 66.85),
                c.closePath(),
                c.fill(),
                c.stroke(),
                c.restore();
            }),
            (d.setDirty = function () {
              r[this.versionName].dirty = !0;
            }),
            (d.getBaseWidth = function () {
              return l;
            }),
            (d.getBaseHeight = function () {
              return u;
            }),
            (d.getDrawOffsetX = function () {
              return h;
            }),
            (d.getDrawOffsetY = function () {
              return c;
            }),
            (d.getScale = function () {
              return p;
            }),
            GameInventoryManager &&
              GameInventoryManager.register("forwardcap", t),
            "undefined" != typeof i &&
              ("undefined" != typeof e && e.exports && (i = e.exports = t),
              (i.ForwardCap = t));
        })();
      },
      {},
    ],
    12: [
      function (t, e) {
        function i() {}
        t("../inventorymanager");
        var n = (Math.atan2, i.prototype);
        (n.createVersion = function () {
          var t = this.colors,
            e = this.getVersions(),
            i = "";
          for (var n in t) t.hasOwnProperty(n) && (i += t[n]);
          (this.versionName = i),
            e[i] ||
              (e[i] = { dirty: !0, canvas: document.createElement("canvas") });
        }),
          (n.draw = function (t, e, i, n, s, r) {
            var o = this.getCache(s),
              a = this.getBaseWidth(),
              h = this.getBaseHeight(),
              c = this.getScale(),
              l = this.getDrawOffsetX(),
              u = this.getDrawOffsetY(),
              p = a * s * c,
              d = h * s * c,
              f = l * s - p / 2,
              g = u * s - d / 2,
              v = -1 === r;
            t.translate(e, i),
              t.rotate(n),
              v && t.scale(1, -1),
              t.drawImage(o, f, g, p, d),
              v && t.scale(1, -1),
              t.rotate(-n),
              t.translate(-e, -i);
          }),
          (n.getCache = function (t) {
            var e = this.getVersions();
            return (
              e[this.versionName].dirty && this.cache(t),
              e[this.versionName].canvas
            );
          }),
          (n.setDirty = function () {
            var t = this.getVersions();
            t[this.versionName].dirty = !0;
          }),
          (e.exports = i),
          GameInventoryManager && (GameInventoryManager.HeadClass = i);
      },
      { "../inventorymanager": 13 },
    ],
    13: [
      function (t, e) {
        function i() {}
        var n = {},
          s = {},
          r = {},
          o = i.prototype;
        (o.getItem = function (t) {
          var e = t.classname,
            i = t.script,
            o = t.options,
            a = t.type;
          n[e] ||
            ("1" === a && ((e = "forwardcap"), (o = { back: "white" })),
            r[i] || ((r[i] = !0), GameManager.loadFile(i)));
          var h = this.generateID(a, e, o);
          return s[h] || (s[h] = new n[e](o)), s[h];
        }),
          (o.redraw = function () {
            for (var t in s) s.hasOwnProperty(t) && s[t].setDirty();
          }),
          (o.generateID = function (t, e, i) {
            var e = t + e;
            if (i) for (var n in i) i.hasOwnProperty(n) && (e += i[n]);
            return e;
          }),
          (o.register = function (t, e) {
            n[t] = e;
          }),
          (o.clear = function () {}),
          (window.GameInventoryManager = new i()),
          (e.exports = i);
      },
      {},
    ],
    14: [
      function (t, e) {
        function i(t, e, i, a, h) {
          var c = [],
            l = t,
            u = e,
            p = (a - e) / (i - t),
            d = i > t ? 1 : -1,
            f = a > e ? 1 : -1,
            g = 0;
          c.push(t, e);
          do {
            var v = s(l / h) == s(i / h),
              m = s(u / h) == s(a / h);
            if (v && m) break;
            var y = 0,
              w = 0;
            (y = n(s(l / h + d) * h)),
              0 > d && (y = n(r((l + 1) / h + d) * h) - 1),
              (w = n(e + (y - t) * p));
            var _ = 0,
              x = 0;
            (x = n(s(u / h + f) * h)),
              0 > f && (x = n(r((u + 1) / h + f) * h) - 1),
              (_ = n(t + (x - e) / p)),
              o(y - t, 2) + o(w - e, 2) < o(_ - t, 2) + o(x - e, 2)
                ? ((l = y), (u = w), c.push(y, w))
                : ((l = _), (u = x), c.push(_, x));
          } while (g++ < 5e3);
          return c;
        }
        var n = (t("./cartesian"), Math.round),
          s = Math.floor,
          r = Math.ceil,
          o = Math.pow;
        e.exports = i;
      },
      { "./cartesian": 15 },
    ],
    15: [
      function (t, e) {
        function i(t, e) {
          (this.x = t), (this.y = e);
        }
        var n = Math.sqrt,
          s = Math.pow,
          r = (Math.round, Math.atan2),
          o = Math.PI;
        (i.prototype = {
          x: 0,
          y: 0,
          toReal: function (t) {
            var e = t.camera,
              n = t.screen,
              s = (this.x - n.center.x) / e.zoom + e.position.x,
              r = (this.y - n.center.y) / e.zoom + e.position.y;
            return new i(s, r);
          },
          toScreen: function (t) {
            var e = t.camera,
              n = t.screen,
              s = (this.x - e.position.x) * e.zoom + n.center.x,
              r = (this.y - e.position.y) * e.zoom + n.center.y;
            return new i(s, r);
          },
          lenSqr: function () {
            return s(this.x, 2) + s(this.y, 2);
          },
          len: function () {
            return n(s(this.x, 2) + s(this.y, 2));
          },
          dot: function (t) {
            return this.x * t.x + this.y * t.y;
          },
          factor: function (t) {
            return new i(this.x * t, this.y * t);
          },
          factorSelf: function (t) {
            (this.x = this.x * t), (this.y = this.y * t);
          },
          factorOut: function (t, e) {
            (e.x = this.x * t), (e.y = this.y * t);
          },
          add: function (t) {
            return new i(this.x + t.x, this.y + t.y);
          },
          inc: function (t) {
            (this.x += t.x), (this.y += t.y);
          },
          addOut: function (t, e) {
            (e.x = this.x + t.x), (e.y = this.y + t.y);
          },
          sub: function (t) {
            return new i(this.x - t.x, this.y - t.y);
          },
          subOut: function (t, e) {
            (e.x = this.x - t.x), (e.y = this.y - t.y);
          },
          subSelf: function (t) {
            (this.x = this.x - t.x), (this.y = this.y - t.y);
          },
          equ: function (t) {
            (this.x = t.x), (this.y = t.y);
          },
          normalize: function () {
            var t = n(s(this.x, 2) + s(this.y, 2));
            return new i(this.x / t, this.y / t);
          },
          nicerAngle: function (t) {
            var e = t.sub(this),
              i = r(e.x, -e.y),
              n = i * (180 / o);
            return 0 > n && (n += 360), n;
          },
        }),
          (e.exports = i);
      },
      {},
    ],
    16: [
      function (t, e) {
        function i(t, e, i) {
          function o(t, e, i, n, s, r) {
            f.push(t, e), a(t, e, i, n, s, r, 0), f.push(s, r);
          }
          function a(t, e, i, o, h, c, l) {
            if (!(l > v)) {
              var u = (t + i) / 2,
                p = (e + o) / 2,
                d = (i + h) / 2,
                _ = (o + c) / 2,
                x = (u + d) / 2,
                b = (p + _) / 2,
                T = h - t,
                k = c - e,
                S = n((i - h) * k - (o - c) * T);
              if (S > m) {
                if (g * (T * T + k * k) >= S * S) {
                  if (w > y) return void f.push(x, b);
                  var C = n(s(c - o, h - i) - s(o - e, i - t));
                  if ((C >= r && (C = 2 * r - C), y > C))
                    return void f.push(x, b);
                }
              } else if (
                ((T = x - (t + h) / 2),
                (k = b - (e + c) / 2),
                g >= T * T + k * k)
              )
                return void f.push(x, b);
              a(t, e, u, p, x, b, l + 1), a(x, b, d, _, h, c, l + 1);
            }
          }
          var h = t.x,
            c = t.y,
            l = e.x,
            u = e.y,
            p = i.x,
            d = i.y,
            f = [],
            g = 0.25,
            v = 10,
            m = 1e-30,
            y = 0,
            w = 0.01;
          return o(h, c, l, u, p, d), f;
        }
        var n = Math.abs,
          s = Math.atan2,
          r = Math.PI;
        e.exports = i;
      },
      {},
    ],
    17: [
      function (t, e) {
        function i(t) {
          (this.game = t),
            (this.assets = t.assets),
            (this.stage = t.stage),
            (this.settings = t.settings),
            (this.sound = new k(this)),
            (this.mouse = new n(this)),
            this.mouse.disableContextMenu(),
            (this.message = new S(this)),
            (this.camera = new s(this)),
            (this.screen = new r(this)),
            this.createTrack(),
            (this.loadingcircle = new y(this)),
            (this.loading = !1),
            (this.paused = this.settings.mobile
              ? !0
              : this.settings.startPaused),
            (this.playing = this.settings.waitForKeyPress),
            (this.playerManager = new o(this)),
            (this.vehicleTimer = new a(this)),
            (this.score = new w(this)),
            this.createMainPlayer(),
            this.createControls(),
            (this.state = {}),
            this.registerTools(),
            this.restart(),
            this.initializeAnalytics(),
            this.stage.addEventListener(
              "stagemousedown",
              this.tapToStartOrRestart.bind(this)
            );
        }
        {
          var n = (t("../math/cartesian"), t("../utils/mousehandler")),
            s = t("../view/camera"),
            r = t("../view/screen"),
            o = t("../vehicles/player_manager"),
            a = t("../utils/vehicletimer"),
            h = t("../tools/toolhandler"),
            c = t("../tools/cameratool"),
            l = t("../tools/curvetool"),
            u = t("../tools/straightlinetool"),
            p = t("../tools/brushtool"),
            d = t("../tools/selecttool"),
            f = t("../tools/erasertool"),
            g = t("../tools/poweruptool"),
            v = t("../tools/vehiclepoweruptool"),
            m = t("../tracks/track"),
            y = (t("../utils/gamepad"), t("../utils/loadingcircle")),
            w = t("../utils/score"),
            _ = t("../controls/tablet"),
            x = t("../controls/phone"),
            b = t("../controls/pause"),
            T = t("../controls/redoundo"),
            k = t("../utils/soundmanager"),
            S = t("../utils/messagemanager"),
            C = Application.Helpers.GoogleAnalyticsHelper;
          Math.round;
        }
        (i.prototype = {
          game: null,
          assets: null,
          stage: null,
          canvas: null,
          settings: null,
          camera: null,
          screen: null,
          mouse: null,
          track: null,
          player: null,
          players: null,
          ticks: 0,
          state: null,
          stateDirty: !0,
          onStateChange: null,
          loading: !1,
          playing: !1,
          paused: !1,
          vehicle: "Mtb",
          showDialog: !1,
          dialogOptions: !1,
          importCode: !1,
          clear: !1,
          redoundoControls: null,
          pauseControls: null,
          inFocus: !0,
          controls: null,
          verified: !1,
          getCanvasOffset: function () {
            var t = { height: 90, width: 0 };
            return (
              this.settings.isStandalone && (t = { height: 90, width: 0 }), t
            );
          },
          tapToStartOrRestart: function () {
            if (this.settings.mobile) {
              var t = this.playerManager.firstPlayer;
              if (t && t._crashed && !this.paused) {
                var e = t.getGamepad();
                e.setButtonDown("enter");
              } else this.play();
            }
          },
          analytics: null,
          initializeAnalytics: function () {
            (this.analytics = { deaths: 0, mouseEvents: 0 }),
              this.trackAction("editor-open", "open");
          },
          createMainPlayer: function () {
            var t = this.playerManager,
              e = t.createPlayer(this, this.settings.user),
              i = e.getGamepad();
            i.setKeyMap(this.settings.editorHotkeys),
              (i.onButtonDown = this.buttonDown.bind(this)),
              i.listen(),
              (this.playerManager.firstPlayer = e),
              this.playerManager.addPlayer(e);
          },
          createControls: function () {
            "tablet" === this.settings.controls &&
              ((this.controls = new _(this)), this.controls.hide()),
              "phone" === this.settings.controls &&
                ((this.controls = new x(this)), this.controls.hide()),
              (this.redoundoControls = new T(this)),
              (this.pauseControls = new b(this));
          },
          createTrack: function () {
            this.track && this.track.close();
            var t = new m(this),
              e = this.getAvailableTrackCode();
            0 != e
              ? (t.read(e),
                (this.track = t),
                (this.preloading = !1),
                (this.loading = !1),
                this.stateChanged())
              : t.addDefaultLine(),
              (this.importCode = !1),
              (this.restartTrack = !0),
              (this.clear = !1),
              (this.track = t);
          },
          updateControls: function () {
            if (this.controls) {
              var t = this.paused;
              this.controls.isVisible() === t &&
                (t ||
                  ((this.playing = !1),
                  this.camera.focusOnMainPlayer(),
                  this.toolHandler.setTool("camera")),
                this.controls.setVisibility(!t),
                this.updateState()),
                this.controls.update();
            }
            this.pauseControls.update();
          },
          registerTools: function () {
            var t = new h(this);
            t.enableGridUse(),
              (this.toolHandler = t),
              t.registerTool(c),
              t.registerTool(l),
              t.registerTool(u),
              t.registerTool(p),
              t.registerTool(d),
              t.registerTool(f),
              t.registerTool(g),
              t.registerTool(v),
              t.setTool(this.settings.startTool);
          },
          updateToolHandler: function () {
            (this.controls && this.controls.isVisible() !== !1) ||
              this.toolHandler.update();
          },
          play: function () {
            this.playing = !0;
          },
          update: function () {
            this.updateToolHandler(),
              this.mouse.update(),
              this.showDialog || (this.updateGamepads(), this.checkGamepads()),
              this.screen.update(),
              this.updateControls(),
              this.camera.update(),
              this.sound.update(),
              this.restartTrack && this.restart(),
              !this.paused &&
                this.playing &&
                (this.message.update(),
                this.updatePlayers(),
                this.ticks++,
                this.playerManager.firstPlayer.complete &&
                  this.trackComplete()),
              this.score.update(),
              this.vehicleTimer.update(),
              (this.importCode || this.clear) && this.createTrack(),
              this.stateDirty && this.updateState(),
              this.stage.clear(),
              this.draw(),
              this.stage.update(),
              this.camera.updateZoom();
          },
          updateGamepads: function () {
            this.playerManager.updateGamepads();
          },
          checkGamepads: function () {
            this.playerManager.checkKeys();
          },
          stopAudio: function () {
            createjs.Sound.stop();
          },
          restart: function () {
            (this.verified = !this.settings.requireTrackVerification),
              (this.track.dirty = !1),
              this.track.resetPowerups(),
              this.message.hide(),
              (this.restartTrack = !1),
              (this.playing = !1),
              (this.ticks = 0),
              this.playerManager.reset(),
              this.camera.focusOnPlayer(),
              this.camera.fastforward(),
              this.stateChanged();
          },
          buttonDown: function (t) {
            var e = this.camera;
            switch (((this.playing = !0), t)) {
              case "up":
              case "down":
              case "left":
              case "right":
                e.focusOnMainPlayer();
                break;
              case "change_camera":
                e.focusOnNextPlayer();
                break;
              case "pause":
                (this.paused = !this.paused), this.stateChanged();
                break;
              case "settings":
                this.command("dialog", "settings");
                break;
              case "change_vehicle":
                this.toggleVehicle();
                break;
              case "zoom_increase":
                e.increaseZoom();
                break;
              case "zoom_decrease":
                e.decreaseZoom();
                break;
              case "fullscreen":
                this.toggleFullscreen();
            }
          },
          toggleFullscreen: function () {
            if (this.settings.embedded) {
              var t = this.settings,
                e = t.basePlatformUrl + "/t/" + t.track.url;
              window.open(e);
            } else
              this.settings.fullscreenAvailable &&
                ((this.settings.fullscreen = !this.settings.fullscreen),
                this.stateChanged());
          },
          updatePlayers: function () {
            this.playerManager.update();
          },
          drawPlayers: function () {
            this.playerManager.draw();
          },
          draw: function () {
            this.toolHandler.drawGrid(),
              this.track.draw(),
              this.drawPlayers(),
              (this.controls && this.controls.isVisible() !== !1) ||
                this.toolHandler.draw(),
              this.loading && this.loadingcircle.draw(),
              this.message.draw();
          },
          getAvailableTrackCode: function () {
            var t = this.settings,
              e = !1;
            return (
              t.importCode && "false" !== t.importCode
                ? ((e = t.importCode), (t.importCode = null))
                : this.importCode &&
                  ((e = this.importCode), (this.importCode = null)),
              e
            );
          },
          redraw: function () {
            this.track.undraw(),
              GameInventoryManager.redraw(),
              this.toolHandler.resize();
          },
          resize: function () {
            this.pauseControls.resize(),
              this.redoundoControls.resize(),
              this.controls && this.controls.resize();
          },
          updateState: function () {
            var t = this.getState();
            null !== this.game.onStateChange && this.game.onStateChange(t),
              (this.stateDirty = !1);
          },
          stateChanged: function () {
            this.stateDirty = !0;
          },
          getState: function () {
            var t = this.state;
            return (
              (t.paused = this.paused),
              (t.loading = this.loading),
              (t.playing = this.playing),
              (t.tool = this.toolHandler.currentTool),
              (t.toolOptions = this.toolHandler.getToolOptions()),
              (t.grid = this.toolHandler.options.grid),
              (t.cameraLocked = this.toolHandler.options.cameraLocked),
              (t.zoomPercentage = this.camera.zoomPercentage),
              (t.vehicle = this.vehicle),
              (t.showDialog = this.showDialog),
              (t.dialogOptions = this.dialogOptions),
              (t.preloading = !1),
              (t.fullscreen = this.settings.fullscreen),
              (t.inFocus = this.inFocus),
              this.controls && (t.hideMenus = this.controls.isVisible()),
              t
            );
          },
          toggleVehicle: function () {
            var t = this.track.allowedVehicles,
              e = t.length,
              i = this.vehicle,
              n = t.indexOf(i);
            n++, n >= e && (n = 0);
            var i = t[n];
            this.selectVehicle(i);
          },
          selectVehicle: function (t) {
            var e = this.track.allowedVehicles,
              i = e.indexOf(t);
            -1 !== i &&
              ((this.settings.track.vehicle = t),
              (this.vehicle = t),
              this.playerManager.firstPlayer.setBaseVehicle(t),
              (this.restartTrack = !0));
          },
          trackAction: function (t, e) {
            var i = this.toolHandler.analytics.actions,
              n = this.mouse.analytics.clicks,
              s = i + n,
              r = {
                category: "create",
                action: t,
                label: e,
                value: s,
                non_interaction: !0,
              };
            C.track_event(r);
          },
          openDialog: function (t) {
            switch (((this.dialogOptions = {}), t)) {
              case "import":
                break;
              case "export":
                setTimeout(this.getTrackCode.bind(this), 750);
                break;
              case "upload":
                "undefined" == typeof isChromeApp &&
                  setTimeout(this.getTrackCode.bind(this), 750);
            }
            (this.playing = !1), (this.showDialog = t), this.stateChanged();
          },
          getTrackCode: function () {
            (this.dialogOptions = {}),
              (this.dialogOptions.verified = this.verified),
              (this.dialogOptions.code = this.track.getCode()),
              this.stateChanged();
          },
          trackComplete: function () {
            this.track.dirty || (this.verified = !0);
          },
          hideControlPlanel: function () {},
          showControlPlanel: function () {},
          command: function () {
            var t = Array.prototype.slice.call(arguments, 0),
              e = t.shift();
            switch (e) {
              case "change tool":
                var i = t[0];
                this.toolHandler.setTool(i);
                break;
              case "change tool option":
                var n = t[0],
                  s = t[1];
                this.toolHandler.setToolOption(n, s), this.stateChanged();
                break;
              case "snap":
                this.toolHandler.toggleSnap();
                break;
              case "add track":
                this.track.read(demo.code), (track = null);
                break;
              case "redraw":
                this.redraw();
                break;
              case "fullscreen":
                (this.settings.fullscreen = !this.settings.fullscreen),
                  this.stateChanged();
                break;
              case "grid":
                this.toolHandler.toggleGrid();
                break;
              case "lock camera":
                this.toolHandler.toggleCameraLock();
                break;
              case "toggle vehicle":
                this.toggleVehicle();
                break;
              case "reset zoom":
                this.camera.resetZoom();
                break;
              case "increase zoom":
                this.camera.increaseZoom();
                break;
              case "decrease zoom":
                this.camera.decreaseZoom();
                break;
              case "change lineType":
                var r = t[0];
                (this.toolHandler.options.lineType = r), this.stateChanged();
                break;
              case "resize":
                this.resize();
                break;
              case "dialog":
                var o = t[0];
                o === !1 ? this.listen() : this.unlisten(), this.openDialog(o);
                break;
              case "focused":
                var a = t[0];
                a === !0
                  ? ((this.inFocus = !0),
                    this.showDialog === !1 && this.listen())
                  : ((this.inFocus = !1), this.unlisten(), (this.playing = !1)),
                  this.stateChanged();
                break;
              case "clear track":
                this.trackAction("editor-action", "clear"), (this.clear = !0);
                break;
              case "import":
                var h = t[0];
                h.length <= 0 && (h = !1),
                  (this.importCode = h),
                  (this.clear = t[1]),
                  this.command("dialog", !1);
            }
          },
          listen: function () {
            var t = this.playerManager.firstPlayer,
              e = t.getGamepad();
            e.listen();
          },
          unlisten: function () {
            var t = this.playerManager.firstPlayer,
              e = t.getGamepad();
            e.unlisten();
          },
          stopAudio: function () {
            createjs.Sound.stop();
          },
          close: function () {
            this.trackAction("editor-exit", "exit"),
              (this.pauseControls = null),
              this.mouse.close(),
              (this.mouse = null),
              this.camera.close(),
              (this.camera = null),
              this.screen.close(),
              (this.screen = null),
              this.vehicleTimer.close(),
              (this.vehicleTimer = null),
              this.playerManager.close(),
              (this.playerManager = null),
              this.sound.close(),
              (this.sound = null),
              this.track.close(),
              this.toolHandler.close(),
              (this.game = null),
              (this.assets = null),
              (this.settings = null),
              (this.stage = null),
              (this.track = null),
              (this.state = null),
              this.stopAudio();
          },
        }),
          (e.exports = i);
      },
      {
        "../controls/pause": 5,
        "../controls/phone": 6,
        "../controls/redoundo": 7,
        "../controls/tablet": 9,
        "../math/cartesian": 15,
        "../tools/brushtool": 30,
        "../tools/cameratool": 31,
        "../tools/curvetool": 32,
        "../tools/erasertool": 33,
        "../tools/poweruptool": 34,
        "../tools/selecttool": 41,
        "../tools/straightlinetool": 42,
        "../tools/toolhandler": 44,
        "../tools/vehiclepoweruptool": 45,
        "../tracks/track": 47,
        "../utils/gamepad": 51,
        "../utils/loadingcircle": 52,
        "../utils/messagemanager": 53,
        "../utils/mousehandler": 54,
        "../utils/score": 57,
        "../utils/soundmanager": 59,
        "../utils/vehicletimer": 60,
        "../vehicles/player_manager": 68,
        "../view/camera": 74,
        "../view/screen": 75,
      },
    ],
    18: [
      function (t, e) {
        function i(t) {
          (this.game = t),
            (this.assets = t.assets),
            (this.stage = t.stage),
            (this.settings = t.settings),
            (this.sound = new _(this)),
            (this.mouse = new n(this)),
            this.initalizeCamera(),
            (this.screen = new c(this)),
            this.createTrack(),
            (this.score = new s(this)),
            (this.raceTimes = new o(this)),
            (this.message = new x(this)),
            this.settings.isCampaign && (this.campaignScore = new r(this)),
            (this.loadingcircle = new v(this)),
            (this.loading = !1),
            (this.ready = !1),
            (this.paused = !1),
            (this.playing = !this.settings.waitForKeyPress),
            (this.playerManager = new p(this)),
            (this.vehicleTimer = new d(this)),
            (this.showSkip = !1),
            (this.races = []),
            this.createMainPlayer(),
            this.createControls(),
            (this.state = {}),
            this.registerTools(),
            this.setStartingVehicle(),
            this.restart(),
            this.initializeAnalytics(),
            this.stage.addEventListener(
              "stagemousedown",
              this.tapToStartOrRestart.bind(this)
            );
        }
        var n = (t("../math/cartesian"), t("../utils/mousehandler")),
          s = t("../utils/score"),
          r = t("../utils/campaignscore"),
          o = t("../utils/racetimes"),
          a = Application.Helpers.GoogleAnalyticsHelper,
          h = t("../view/camera"),
          c = t("../view/screen"),
          l = t("../tools/toolhandler"),
          u = t("../tools/cameratool"),
          p = t("../vehicles/player_manager"),
          d = t("../utils/vehicletimer"),
          f = t("../tracks/track"),
          g = (t("../utils/gamepad"), {});
        (g.MTB = t("../vehicles/mtb")), (g.BMX = t("../vehicles/bmx"));
        var v = t("../utils/loadingcircle"),
          m = t("../controls/tablet"),
          y = t("../controls/phone"),
          w = t("../controls/pause"),
          _ = t("../utils/soundmanager"),
          x = t("../utils/messagemanager"),
          b = t("../controls/fullscreen"),
          T = t("../controls/settings"),
          k = Math.round,
          S = t("../../libs/lodash-3.10.1"),
          C = t("../utils/sha256"),
          P = t("../utils/formatnumber");
        (i.prototype = {
          game: null,
          assets: null,
          stage: null,
          settings: null,
          camera: null,
          score: null,
          screen: null,
          mouse: null,
          track: null,
          player: null,
          players: null,
          ticks: 0,
          races: null,
          state: null,
          stateDirty: !0,
          onStateChange: null,
          loading: !1,
          playing: !1,
          ready: !1,
          paused: !1,
          vehicle: "Mtb",
          showDialog: !1,
          dialogOptions: !1,
          importCode: !1,
          preloading: !0,
          loading: !0,
          pauseControls: null,
          fullscreenControls: null,
          settingsControls: null,
          controls: null,
          inFocus: !0,
          message: null,
          showControls: !1,
          showSkip: !1,
          getCanvasOffset: function () {
            var t = { height: 0, width: 0 };
            return t;
          },
          tapToStartOrRestart: function () {
            if (this.settings.mobile) {
              var t = this.playerManager.firstPlayer;
              if (t && t._crashed && !this.paused) {
                var e = t.getGamepad();
                e.setButtonDown("enter");
              } else this.play();
            }
          },
          analytics: null,
          initializeAnalytics: function () {
            this.analytics = { deaths: 0 };
          },
          createControls: function () {
            "tablet" === this.settings.controls &&
              ((this.controls = new m(this)), this.controls.hide()),
              "phone" === this.settings.controls &&
                ((this.controls = new y(this)), this.controls.hide()),
              (this.pauseControls = new w(this)),
              this.settings.fullscreenAvailable &&
                (this.fullscreenControls = new b(this)),
              (this.settingsControls = new T(this));
          },
          play: function () {
            (this.playing = !0), this.hideControlPlanel();
          },
          buttonDown: function (t) {
            if (!this.showDialog) {
              var e = this.camera;
              switch (t) {
                case "change_camera":
                  e.focusOnNextPlayer();
                  break;
                case "pause":
                  (this.paused = !this.paused), this.stateChanged();
                  break;
                case "settings":
                  this.openDialog("settings");
                  break;
                case "exit_fullscreen":
                  this.exitFullscreen();
                  break;
                case "change_vehicle":
                  this.toggleVehicle();
                  break;
                case "zoom_increase":
                  e.increaseZoom();
                  break;
                case "zoom_decrease":
                  e.decreaseZoom();
                  break;
                case "fullscreen":
                  this.toggleFullscreen();
              }
            }
          },
          exitFullscreen: function () {
            this.settings.fullscreenAvailable &&
              ((this.settings.fullscreen = !1),
              this.trackEvent(
                "game-ui",
                "game-fullscreen-toggle",
                "game-out-fullscreen"
              ),
              this.stateChanged());
          },
          toggleFullscreen: function () {
            if (this.settings.embedded) {
              var t = this.settings,
                e = t.basePlatformUrl + "/t/" + t.track.url;
              window.open(e);
            } else
              this.settings.fullscreenAvailable &&
                ((this.settings.fullscreen = !this.settings.fullscreen),
                this.stateChanged(),
                this.settings.fullscreen
                  ? this.trackEvent(
                      "game-ui",
                      "game-fullscreen-toggle",
                      "game-into-fullscreen"
                    )
                  : this.trackEvent(
                      "game-ui",
                      "game-fullscreen-toggle",
                      "game-out-fullscreen"
                    ));
          },
          trackEvent: function (t, e, i) {
            var n = {
              category: t,
              action: e,
              label: i,
              value: 0,
              non_interaction: !0,
            };
            a.track_event(n);
          },
          getAvailableTrackCode: function () {
            var t = this.settings,
              e = !1;
            return (
              t.importCode && "false" !== t.importCode
                ? ((e = t.importCode), (t.importCode = null))
                : this.importCode &&
                  ((e = this.importCode), (this.importCode = null)),
              e
            );
          },
          createMainPlayer: function () {
            var t = this.playerManager,
              e = t.createPlayer(this, this.settings.user),
              i = e.getGamepad();
            i.setKeyMap(this.settings.playHotkeys),
              i.recordKeys(this.settings.keysToRecord),
              (i.onButtonDown = this.buttonDown.bind(this)),
              i.listen(),
              (this.playerManager.firstPlayer = e),
              this.playerManager.addPlayer(e);
          },
          createTrack: function () {
            this.track && this.track.close();
            var t = new f(this),
              e = this.getAvailableTrackCode();
            0 != e &&
              (t.read(e),
              (this.track = t),
              this.setTrackAllowedVehicles(),
              (this.preloading = !1),
              (this.loading = !1),
              (this.restartTrack = !0),
              this.stateChanged(),
              (this.ready = !0)),
              (this.track = t);
          },
          setTrackAllowedVehicles: function () {
            var t = this.track,
              e = this.settings.track;
            e && (t.allowedVehicles = e.vehicles);
          },
          initalizeCamera: function () {
            this.camera = new h(this);
          },
          updateControls: function () {
            if (this.controls) {
              var t = this.paused;
              this.controls.isVisible() === t &&
                (t ||
                  ((this.playing = !1),
                  this.camera.focusOnMainPlayer(),
                  this.toolHandler.setTool("camera")),
                this.controls.setVisibility(!t),
                this.controls.setZoomControlsVisibilty(t),
                this.updateState()),
                this.controls.update();
            }
            this.pauseControls.update(),
              this.settings.fullscreenAvailable &&
                this.fullscreenControls.update();
          },
          registerTools: function () {
            var t = new l(this);
            (this.toolHandler = t), t.registerTool(u), t.setTool("Camera");
          },
          updateToolHandler: function () {
            (this.controls && this.controls.isVisible() !== !1) ||
              this.toolHandler.update();
          },
          update: function () {
            this.ready
              ? (this.updateToolHandler(),
                this.mouse.update(),
                this.paused ||
                  this.showDialog ||
                  (this.updateGamepads(), this.checkGamepads()),
                this.screen.update(),
                this.updateControls(),
                this.camera.update(),
                this.sound.update(),
                this.restartTrack && this.restart(),
                !this.paused &&
                  this.playing &&
                  (this.message.update(),
                  this.updatePlayers(),
                  this.playerManager.firstPlayer.complete
                    ? this.trackComplete()
                    : this.ticks++),
                this.updateScore(),
                this.vehicleTimer.update(),
                this.stateDirty && this.updateState(),
                this.stage.clear(),
                this.draw(),
                this.stage.update(),
                this.camera.updateZoom())
              : this.importCode && this.createTrack();
          },
          updateScore: function () {
            this.score.update(),
              this.campaignScore && this.campaignScore.update(),
              this.raceTimes.update();
          },
          restart: function () {
            this.settings.mobile
              ? this.message.show("Press Any Button To Start", 1, "#333333")
              : this.message.show(
                  "Press Any Key To Start",
                  1,
                  "#333333",
                  "#FFFFFF"
                ),
              this.track.resetPowerups(),
              (this.restartTrack = !1),
              (this.paused = !1),
              (this.playing = !this.settings.waitForKeyPress),
              (this.ticks = 0),
              this.playerManager.reset(),
              this.playerManager.getPlayerCount() > 0 &&
                (this.camera.focusIndex = 1),
              this.camera.focusOnPlayer(),
              this.camera.fastforward(),
              this.showControlPlanel("main");
          },
          listen: function () {
            var t = this.playerManager.firstPlayer,
              e = t.getGamepad();
            e.listen();
          },
          unlisten: function () {
            var t = this.playerManager.firstPlayer,
              e = t.getGamepad();
            e.unlisten();
          },
          stopAudio: function () {
            createjs.Sound.stop();
          },
          setStartingVehicle: function () {
            var t = this.settings,
              e = t.startVehicle;
            t.track && (e = t.track.vehicle), (this.vehicle = e);
          },
          updateGamepads: function () {
            this.playerManager.updateGamepads();
          },
          checkGamepads: function () {
            this.playerManager.checkKeys();
          },
          updatePlayers: function () {
            this.playerManager.update();
          },
          drawPlayers: function () {
            this.playerManager.draw();
          },
          hideControlPlanel: function () {
            this.showSkip && ((this.showSkip = !1), this.stateChanged()),
              this.showControls !== !1 &&
                ((this.showControls = !1), this.stateChanged());
          },
          showControlPlanel: function (t) {
            this.settings.isCampaign &&
              !this.settings.mobile &&
              this.settings.campaignData.can_skip &&
              this.analytics &&
              this.analytics.deaths > 5 &&
              ((this.showSkip = !0), this.stateChanged()),
              this.showControls !== t &&
                this.settings.showHelpControls &&
                ((this.showControls = t), this.stateChanged());
          },
          draw: function () {
            this.toolHandler.drawGrid(),
              this.track.draw(),
              this.drawPlayers(),
              (this.controls && this.controls.isVisible() !== !1) ||
                this.toolHandler.draw(),
              this.loading && this.loadingcircle.draw(),
              this.message.draw();
          },
          redraw: function () {
            this.track.undraw(),
              GameInventoryManager.redraw(),
              this.toolHandler.resize();
          },
          resize: function () {
            this.pauseControls.resize(),
              this.settings.fullscreenAvailable &&
                this.fullscreenControls.resize(),
              this.settingsControls.resize(),
              this.controls && this.controls.resize();
          },
          updateState: function () {
            var t = this.getState();
            null !== this.game.onStateChange && this.game.onStateChange(t),
              (this.stateDirty = !1);
          },
          stateChanged: function () {
            this.stateDirty = !0;
          },
          getState: function () {
            var t = this.state;
            return (
              (t.paused = this.paused),
              (t.showDialog = this.showDialog),
              (t.dialogOptions = this.dialogOptions),
              (t.fullscreen = this.settings.fullscreen),
              (t.preloading = this.preloading),
              (t.inFocus = this.inFocus),
              (t.showControls = this.showControls),
              (t.showSkip = this.showSkip),
              t
            );
          },
          toggleVehicle: function () {
            var t = this.track.allowedVehicles,
              e = t.length,
              i = this.vehicle,
              n = t.indexOf(i);
            n++, n >= e && (n = 0);
            var i = t[n];
            this.selectVehicle(i);
          },
          selectVehicle: function (t) {
            var e = this.track.allowedVehicles,
              i = e.indexOf(t);
            -1 !== i &&
              ((this.settings.track.vehicle = t),
              (this.vehicle = t),
              this.playerManager.firstPlayer.setBaseVehicle(t),
              (this.restartTrack = !0));
          },
          openDialog: function (t) {
            (this.playing = !1), (this.showDialog = t), this.stateChanged();
          },
          command: function () {
            var t = Array.prototype.slice.call(arguments, 0),
              e = t.shift();
            switch (e) {
              case "resize":
                this.resize();
                break;
              case "dialog":
                var i = t[0];
                i === !1 ? this.listen() : this.unlisten(), this.openDialog(i);
                break;
              case "focused":
                var n = t[0];
                n === !0
                  ? ((this.inFocus = !0),
                    this.showDialog === !1 && this.listen())
                  : ((this.inFocus = !1), this.unlisten(), (this.playing = !1)),
                  this.stateChanged();
                break;
              case "add track":
                var s = t[0];
                this.importCode = s.code;
                break;
              case "clear race":
                (this.races = []),
                  (this.restartTrack = !0),
                  this.raceTimes.clear();
                break;
              case "add race":
                var r = t[0],
                  o = t[1];
                this.addRaces(r),
                  o
                    ? ((this.dialogOptions = { races: this.races }),
                      this.command("dialog", "race_dialog"))
                    : this.stateChanged();
                break;
              case "change vehicle":
                var a = t[0];
                this.selectVehicle(a);
                break;
              case "restart":
                this.command("dialog", !1), (this.restartTrack = !0);
                break;
              case "fullscreen":
                this.toggleFullscreen();
                break;
              case "exit_fullscreen":
                this.exitFullscreen();
            }
          },
          addRaces: function (t) {
            this.mergeRaces(t),
              this.sortRaces(),
              this.formatRaces(),
              this.addRaceTimes(),
              this.addPlayers(),
              (this.restartTrack = !0);
          },
          addRaceTimes: function () {
            var t = this.settings.raceColors,
              e = t.length,
              i = this.races,
              n = this.raceTimes;
            n.clear();
            for (var s in i) {
              var r = i[s];
              (r.user.color = t[s % e]), n.addRace(r, s);
            }
          },
          addPlayers: function () {
            var t = this.races,
              e = this.playerManager;
            e.clear();
            var i = this.settings.keysToRecord;
            for (var n in t) {
              var s = t[n],
                r = s.user,
                o = s.race,
                a = o.code;
              "string" == typeof a && (a = JSON.parse(a));
              var h = e.createPlayer(this, r);
              h.setBaseVehicle(o.vehicle), h.setAsGhost();
              var c = h.getGamepad();
              c.loadPlayback(a, i), e.addPlayer(h);
            }
          },
          formatRaces: function () {
            var t = this.races;
            for (var e in t) {
              var i = t[e].race,
                n = i.code;
              if ("string" == typeof n) {
                n = JSON.parse(n);
                for (var s in n) {
                  var r = n[s],
                    o = S.countBy(r, S.identity);
                  n[s] = o;
                }
                i.code = n;
              }
            }
          },
          removeDuplicateRaces: function () {
            var t = S.uniq(this.races, this.uniqesByUserIdIterator.bind(this));
            this.races = t;
          },
          uniqesByUserIdIterator: function (t) {
            var e = t.user;
            return e.u_id;
          },
          sortRaces: function () {
            var t = S.sortBy(
              this.races,
              this.sortByRunTicksIterator.bind(this)
            );
            this.races = t;
          },
          mergeRaces: function (t) {
            var e = this.races;
            S.each(t, function (t) {
              var i = S.find(e, function (e) {
                return e.user.u_id === t.user.u_id;
              });
              i ? S.extend(i, t) : e.push(t);
            });
          },
          sortByRunTicksIterator: function (t) {
            var e = this.settings,
              i = parseInt(t.race.run_ticks),
              n = P((i / e.drawFPS) * 1e3);
            return (t.runTime = n), i;
          },
          verifyComplete: function () {
            var t = this.playerManager.firstPlayer,
              e = t._powerupsConsumed.targets,
              i = this.track.targets,
              n = !0;
            for (var s in i) {
              var r = i[s],
                o = r.id;
              -1 === e.indexOf(o) && (n = !1);
            }
            return n;
          },
          trackComplete: function () {
            if (this.verifyComplete()) {
              this.sound.play("victory_sound");
              var t = this.playerManager;
              t.mutePlayers();
              var e = t.firstPlayer,
                i = e.getGamepad(),
                n = i.getReplayString(),
                s = this.settings,
                r = this.ticks,
                o = P((r / s.drawFPS) * 1e3),
                a = $("#track-data").data("t_id"),
                h = {
                  t_id: a,
                  u_id: s.user.u_id,
                  code: n,
                  vehicle: e._baseVehicleType,
                  run_ticks: r,
                  fps: 25,
                  time: o,
                },
                c =
                  h.t_id +
                  "|" +
                  h.u_id +
                  "|" +
                  h.code +
                  "|" +
                  h.run_ticks +
                  "|" +
                  h.vehicle +
                  "|" +
                  h.fps +
                  "|erxrHHcksIHHksktt8933XhwlstTekz",
                l = C.SHA256(c).toString();
              h.sig = l;
              var u = this.races,
                p = u.length,
                d = [];
              if (p > 0) {
                for (var f = 0; p > f; f++) d.push(u[f].user.u_id);
                h.races = d;
              }
              s.isCampaign && (h.is_campaign = !0),
                (this.dialogOptions = {
                  postData: h,
                  analytics: this.analytics,
                }),
                s.isCampaign
                  ? this.command("dialog", "campaign_complete")
                  : this.command("dialog", "track_complete"),
                this.listen();
            }
          },
          drawFPS: function () {
            var t = createjs.Ticker.getMeasuredFPS(),
              e = this.game.pixelRatio,
              i = this.game.canvas.getContext("2d"),
              n = 5,
              s = this.screen.height - 12 * e,
              r = k(10 * t) / 10,
              o = "FPS : " + r;
            i.save(),
              (i.fillStyle = "#000000"),
              (i.font = 8 * e + "pt arial"),
              i.fillText(o, n * e, s),
              i.restore();
          },
          close: function () {
            (this.fullscreenControls = null),
              (this.settingsControls = null),
              (this.pauseControls = null),
              (this.raceTimes = null),
              (this.score = null),
              (this.campaignScore = null),
              this.mouse.close(),
              (this.mouse = null),
              this.camera.close(),
              (this.camera = null),
              this.screen.close(),
              (this.screen = null),
              this.vehicleTimer.close(),
              (this.vehicleTimer = null),
              this.playerManager.close(),
              (this.playerManager = null),
              this.sound.close(),
              (this.sound = null),
              this.track.close(),
              this.toolHandler.close(),
              (this.game = null),
              (this.assets = null),
              (this.settings = null),
              (this.stage = null),
              (this.track = null),
              (this.state = null),
              this.stopAudio();
          },
        }),
          (e.exports = i);
      },
      {
        "../../libs/lodash-3.10.1": 77,
        "../controls/fullscreen": 4,
        "../controls/pause": 5,
        "../controls/phone": 6,
        "../controls/settings": 8,
        "../controls/tablet": 9,
        "../math/cartesian": 15,
        "../tools/cameratool": 31,
        "../tools/toolhandler": 44,
        "../tracks/track": 47,
        "../utils/campaignscore": 48,
        "../utils/formatnumber": 50,
        "../utils/gamepad": 51,
        "../utils/loadingcircle": 52,
        "../utils/messagemanager": 53,
        "../utils/mousehandler": 54,
        "../utils/racetimes": 56,
        "../utils/score": 57,
        "../utils/sha256": 58,
        "../utils/soundmanager": 59,
        "../utils/vehicletimer": 60,
        "../vehicles/bmx": 61,
        "../vehicles/mtb": 66,
        "../vehicles/player_manager": 68,
        "../view/camera": 74,
        "../view/screen": 75,
      },
    ],
    19: [
      function (t, e) {
        function i(t, e, i, s) {
          var r = new n(t, e),
            o = new n(i, s),
            a = o.sub(r);
          (this.p1 = r),
            (this.p2 = o),
            (this.pp = a),
            (this.len = a.len()),
            (this.sectors = []),
            (this.collided = !1),
            (this.remove = !1),
            (this.highlight = !1),
            (this.recorded = !1);
        }
        var n = t("../math/cartesian"),
          s = Math.sqrt,
          r = Math.pow,
          o = (Math.round, Math.floor);
        (i.prototype = {
          sectors: null,
          p1: null,
          p2: null,
          pp: null,
          len: 0,
          collided: !1,
          remove: !1,
          highlight: !1,
          recorded: !1,
          getCode: function (t) {
            this.recorded = !0;
            var e = this.p2,
              i = " " + e.x.toString(32) + " " + e.y.toString(32),
              n = this.checkForConnectedLine(t, e);
            return n && (i += n.getCode(t)), i;
          },
          checkForConnectedLine: function (t, e) {
            var i = t.settings.physicsSectorSize,
              n = t.sectors.physicsSectors,
              s = o(e.x / i),
              r = o(e.y / i);
            return n[s][r].searchForLine("physicsLines", e);
          },
          addSectorReference: function (t) {
            this.sectors.push(t);
          },
          removeAllReferences: function () {
            this.remove = !0;
            for (var t = this.sectors, e = t.length, i = 0; e > i; i++)
              (t[i].drawn = !1), (t[i].dirty = !0);
            this.sectors = [];
          },
          erase: function (t, e) {
            var i = !1;
            if (!this.remove) {
              var n = this.p1,
                r = this.p2,
                o = t,
                a = e,
                h = r.sub(n),
                c = n.sub(o),
                l = h.dot(h),
                u = 2 * c.dot(h),
                p = c.dot(c) - a * a,
                d = u * u - 4 * l * p;
              if (d > 0) {
                d = s(d);
                var f = (-u - d) / (2 * l),
                  g = (-u + d) / (2 * l);
                f >= 0 && 1 >= f && ((i = !0), this.removeAllReferences()),
                  g >= 0 && 1 >= g && ((i = !0), this.removeAllReferences());
              }
              this.intersects(this.p1.x, this.p1.y, t.x, t.y, e)
                ? ((i = !0), this.removeAllReferences())
                : this.intersects(this.p2.x, this.p2.y, t.x, t.y, e) &&
                  ((i = !0), this.removeAllReferences());
            }
            return i;
          },
          intersects: function (t, e, i, n, s) {
            var r = t - i,
              o = e - n;
            return s * s >= r * r + o * o;
          },
          collide: function (t) {
            if (!this.collided) {
              this.collided = !0;
              var e = t.pos,
                i = t.vel,
                n = t.radius,
                o = 0,
                a = 0,
                h = 0,
                c = this.p1,
                l = this.p2,
                u = e.x - c.x,
                p = e.y - c.y,
                d = this.pp,
                f = this.len,
                g = (u * d.x + p * d.y) / f / f;
              if (g >= 0 && 1 >= g) {
                var v =
                    (u * d.y - p * d.x) * ((u - i.x) * d.y - (p - i.y) * d.x) <
                    0
                      ? -1
                      : 1,
                  o = u - d.x * g,
                  a = p - d.y * g;
                if (
                  ((h = s(r(o, 2) + r(a, 2))),
                  0 === h && (h = 1),
                  n > h || 0 > v)
                ) {
                  var m = (n * v - h) / h;
                  return (
                    (e.x += o * m), (e.y += a * m), void t.drive(-a / h, o / h)
                  );
                }
              }
              if (!(-n > g * f || g * f > f + n)) {
                var y = g > 0 ? l : c;
                if (
                  ((o = e.x - y.x),
                  (a = e.y - y.y),
                  (h = s(r(o, 2) + r(a, 2))),
                  0 === h && (h = 1),
                  n > h)
                ) {
                  var m = (n - h) / h;
                  return (
                    (e.x += o * m), (e.y += a * m), void t.drive(-a / h, o / h)
                  );
                }
              }
            }
          },
        }),
          (e.exports = i);
      },
      { "../math/cartesian": 15 },
    ],
    20: [
      function (t, e) {
        function i() {}
        var n = (t("../math/cartesian"), Math.PI, Math.sqrt),
          s = Math.pow,
          r = i.prototype;
        (r.init = function (t) {
          (this.game = t.scene.game),
            (this.scene = t.scene),
            (this.settings = this.game.settings),
            (this.remove = !1);
        }),
          (r.scene = null),
          (r.angle = 0),
          (r.x = 0),
          (r.y = 0),
          (r.name = null),
          (r.sector = null),
          (r.settings = null),
          (r.remove = !1),
          (r.getCode = function () {}),
          (r.draw = function () {}),
          (r.erase = function (t, e) {
            var i = !1;
            if (!this.remove) {
              var r = n(s(t.x - this.x, 2) + s(t.y - this.y, 2));
              e >= r && ((i = !0), this.removeAllReferences());
            }
            return i;
          }),
          (r.removeAllReferences = function () {
            (this.remove = !0),
              this.sector &&
                ((this.sector.powerupCanvasDrawn = !1),
                (this.sector.dirty = !0),
                (this.sector = null)),
              this.scene.track.cleanPowerups();
          }),
          (r.collide = function (t) {
            var e = t.pos.x - this.x,
              i = t.pos.y - this.y,
              r = n(s(e, 2) + s(i, 2));
            !this.hit &&
              26 > r &&
              ((this.hit = !0), (this.sector.powerupCanvasDrawn = !1));
          }),
          (r.addSectorReference = function (t) {
            this.sector = t;
          }),
          (e.exports = i);
      },
      { "../math/cartesian": 15 },
    ],
    21: [
      function (t, e) {
        function i(t, e, i) {
          (this.x = t), (this.y = e), this.init(i), (this.hit = !1);
        }
        var n = t("../powerup"),
          s = {
            canvas: document.createElement("canvas"),
            dirty: !0,
            width: 26,
            height: 26,
          },
          r = (Math.random, Math.pow),
          o = Math.sqrt,
          a = (Math.cos, Math.sin, (i.prototype = new n()));
        (a.x = 0),
          (a.y = 0),
          (a.name = "bomb"),
          (a.getCode = function () {
            return "O " + this.x.toString(32) + " " + this.y.toString(32);
          }),
          (a.recache = function (t) {
            s.dirty = !1;
            var e = s.canvas;
            (e.width = s.width * t), (e.height = s.height * t);
            var i = e.getContext("2d"),
              n = e.width / 2,
              r = e.height / 2;
            this.drawCircle(n, r, t, i),
              this.settings.developerMode &&
                (i.beginPath(),
                i.rect(0, 0, e.width, e.height),
                (i.strokeStyle = "red"),
                (i.strokeWidth = 1 * t),
                i.stroke());
          }),
          (a.setDirty = function (t) {
            s.dirty = t;
          }),
          (a.draw = function (t, e, i, n) {
            if (!this.hit) {
              s.dirty && this.recache(i);
              var r = s.width * i,
                o = s.height * i,
                a = r / 2,
                h = o / 2;
              n.drawImage(s.canvas, t - a, e - h, r, o);
            }
          }),
          (a.drawCircle = function (t, e, i, n) {
            (i *= 0.2),
              (n.fillStyle = "#000"),
              (n.strokeStyle = "#000"),
              (n.lineWidth = 8 * i),
              n.beginPath(),
              n.moveTo(53 * i, 105 * i),
              n.lineTo(41.5 * i, 115 * i),
              n.lineTo(43 * i, 100 * i),
              n.bezierCurveTo(
                35.5 * i,
                95 * i,
                30 * i,
                88.5 * i,
                26.5 * i,
                80 * i
              ),
              n.lineTo(11 * i, 78 * i),
              n.lineTo(24 * i, 69.5 * i),
              n.bezierCurveTo(24 * i, 68 * i, 24 * i, 67 * i, 24 * i, 66 * i),
              n.bezierCurveTo(24 * i, 58.5 * i, 26 * i, 51 * i, 30 * i, 45 * i),
              n.lineTo(22 * i, 31.5 * i),
              n.lineTo(37.5 * i, 36 * i),
              n.bezierCurveTo(
                43.5 * i,
                31 * i,
                51 * i,
                27.5 * i,
                60 * i,
                26 * i
              ),
              n.lineTo(66 * i, 11 * i),
              n.lineTo(72 * i, 26.5 * i),
              n.bezierCurveTo(
                80.5 * i,
                27.5 * i,
                88 * i,
                31 * i,
                93.5 * i,
                36.5 * i
              ),
              n.lineTo(110 * i, 31.5 * i),
              n.lineTo(101.5 * i, 46 * i),
              n.bezierCurveTo(
                105 * i,
                52 * i,
                107 * i,
                59 * i,
                107 * i,
                66 * i
              ),
              n.bezierCurveTo(
                107 * i,
                67 * i,
                107 * i,
                68 * i,
                107 * i,
                69 * i
              ),
              n.lineTo(121 * i, 78 * i),
              n.lineTo(104.5 * i, 80.5 * i),
              n.bezierCurveTo(
                101.5 * i,
                88 * i,
                96 * i,
                95 * i,
                89 * i,
                99.5 * i
              ),
              n.lineTo(90.5 * i, 115 * i),
              n.lineTo(78.5 * i, 104.5 * i),
              n.bezierCurveTo(
                74.5 * i,
                106 * i,
                70 * i,
                107 * i,
                65.5 * i,
                107 * i
              ),
              n.bezierCurveTo(
                61 * i,
                107 * i,
                57 * i,
                106 * i,
                53 * i,
                105 * i
              ),
              n.lineTo(53 * i, 105 * i),
              n.closePath(),
              n.fill(),
              n.stroke(),
              n.beginPath(),
              n.arc(66 * i, 66 * i, 40 * i, 0 * i, 2 * Math.PI, !0),
              (n.lineWidth = 2 * i),
              (n.fillStyle = "#d12929"),
              n.fill(),
              n.stroke(),
              n.beginPath(),
              n.arc(66 * i, 66 * i, 8 * i, 0 * i, 2 * Math.PI, !0),
              (n.lineWidth = 2 * i),
              (n.fillStyle = "#000"),
              n.fill(),
              n.stroke();
          }),
          (a.collide = function (t) {
            var e = t.parent,
              i = e.player,
              n = t.pos.x - this.x,
              s = t.pos.y - this.y,
              a = o(r(n, 2) + r(s, 2));
            20 > a &&
              i.isAlive() &&
              (e.explode(),
              i.isGhost() === !1 &&
                ((this.hit = !0), (this.sector.powerupCanvasDrawn = !1)));
          }),
          (e.exports = i);
      },
      { "../powerup": 20 },
    ],
    22: [
      function (t, e) {
        function i(t, e, i, n) {
          (this.x = t), (this.y = e), (this.angle = i), (this.realAngle = i);
          var s = ((i - 180) / 360) * 2 * Math.PI;
          (this.directionX = (-Math.sin(s)).toFixed(15) / 1),
            (this.directionY = Math.cos(s).toFixed(15) / 1),
            this.init(n);
        }
        var n = t("../powerup"),
          s = (Math.max, Math.sqrt, Math.pow),
          r = {
            canvas: document.createElement("canvas"),
            dirty: !0,
            width: 24,
            height: 16,
          },
          o = (i.prototype = new n());
        (o.x = 0),
          (o.y = 0),
          (o.name = "boost"),
          (o.angle = 0),
          (o.realAngle = 0),
          (o.directionX = 0),
          (o.directionY = 0),
          (o.getCode = function () {
            return (
              "B " +
              this.x.toString(32) +
              " " +
              this.y.toString(32) +
              " " +
              this.realAngle.toString(32)
            );
          }),
          (o.recache = function (t) {
            r.dirty = !1;
            var e = r.canvas;
            (e.width = r.width * t), (e.height = r.height * t);
            var i = e.getContext("2d"),
              n = e.width / 2,
              s = e.height / 2;
            this.drawCircle(n, s, t, i),
              this.settings.developerMode &&
                (i.beginPath(),
                i.rect(0, 0, e.width, e.height),
                (i.strokeStyle = "red"),
                (i.strokeWidth = 1 * t),
                i.stroke());
          }),
          (o.setDirty = function (t) {
            r.dirty = t;
          }),
          (o.draw = function (t, e, i, n) {
            r.dirty && this.recache(i);
            var s = r.width * i,
              o = r.height * i,
              a = s / 2,
              h = o / 2,
              c = t,
              l = e,
              u = (this.angle - 90) * (Math.PI / 180);
            n.translate(c, l),
              n.rotate(u),
              n.drawImage(r.canvas, -a, -h, s, o),
              n.rotate(-u),
              n.translate(-c, -l);
          }),
          (o.drawCircle = function (t, e, i, n) {
            n.save(),
              (n.strokeStyle = "rgba(0,0,0,0)"),
              (n.lineCap = "round"),
              (n.fillStyle = "#8ac832"),
              (n.strokeStyle = "#000000"),
              (i *= 0.2),
              (n.lineWidth = Math.max(8 * i, 1)),
              n.beginPath(),
              n.moveTo(0 * i, 0 * i),
              n.lineTo(118 * i, 0 * i),
              n.lineTo(118 * i, 81 * i),
              n.lineTo(0 * i, 81 * i),
              n.closePath(),
              n.beginPath(),
              n.moveTo(3 * i, 1.5 * i),
              n.lineTo(35 * i, 1.7 * i),
              n.lineTo(66 * i, 40 * i),
              n.lineTo(34 * i, 78 * i),
              n.lineTo(4 * i, 78 * i),
              n.lineTo(36 * i, 39 * i),
              n.lineTo(3 * i, 1.5 * i),
              n.closePath(),
              n.moveTo(53 * i, 1.5 * i),
              n.lineTo(85 * i, 1.7 * i),
              n.lineTo(116 * i, 40 * i),
              n.lineTo(84 * i, 78 * i),
              n.lineTo(54 * i, 78 * i),
              n.lineTo(85 * i, 39 * i),
              n.lineTo(53 * i, 1.5 * i),
              n.closePath(),
              n.fill(),
              n.stroke();
          }),
          (o.collide = function (t) {
            var e = t.parent,
              i = e.player,
              n = t.pos.x - this.x,
              r = t.pos.y - this.y,
              o = s(n, 2) + s(r, 2),
              a = e.masses,
              h = a.length,
              c = this.directionX,
              l = this.directionY;
            if (1e3 > o && i.isAlive()) {
              for (var u = h - 1; u >= 0; u--) {
                var p = a[u].pos;
                (p.x += c), (p.y += l);
              }
              i.isGhost() === !1 &&
                (this.scene.sound.play("boost_sound"),
                this.scene.message.show("Boost Engaged", 50, "#8ac832"));
            }
          }),
          (e.exports = i);
      },
      { "../powerup": 20 },
    ],
    23: [
      function (t, e) {
        function i(t, e, i) {
          (this.x = t),
            (this.y = e),
            (this.id = o().toString(36).substr(2)),
            this.init(i);
        }
        var n = t("../powerup"),
          s = Math.sqrt,
          r = Math.pow,
          o = Math.random,
          a = {
            canvas: document.createElement("canvas"),
            dirty: !0,
            width: 20,
            height: 32,
          },
          h = (i.prototype = new n());
        (h.x = 0),
          (h.y = 0),
          (h.name = "checkpoint"),
          (h.getCode = function () {
            return "C " + this.x.toString(32) + " " + this.y.toString(32);
          }),
          (h.recache = function (t) {
            a.dirty = !1;
            var e = a.canvas;
            (e.width = a.width * t), (e.height = a.height * t);
            var i = e.getContext("2d"),
              n = e.width / 2,
              s = e.height / 2;
            this.drawCircle(n, s, t, i),
              this.settings.developerMode &&
                (i.beginPath(),
                i.rect(0, 0, e.width, e.height),
                (i.strokeStyle = "red"),
                (i.strokeWidth = 1 * t),
                i.stroke());
          }),
          (h.setDirty = function (t) {
            a.dirty = t;
          }),
          (h.draw = function (t, e, i, n) {
            a.dirty && this.recache(i);
            var s = a.width * i,
              r = a.height * i,
              o = s / 2,
              h = r / 2;
            n.save(),
              this.hit && (n.globalAlpha = 0.3),
              n.drawImage(a.canvas, t - o, e - h, s, r),
              n.restore();
          }),
          (h.drawCircle = function (t, e, i, n) {
            (i *= 0.15),
              n.save(),
              n.translate(1, 1),
              n.beginPath(),
              n.moveTo(0 * i, 0 * i),
              n.lineTo(112 * i, 0 * i),
              n.lineTo(112 * i, 95 * i),
              n.lineTo(0 * i, 95 * i),
              n.closePath(),
              (n.fillStyle = "#826cdc"),
              (n.strokeStyle = "#000000"),
              (n.lineWidth = 8 * i),
              n.beginPath(),
              n.moveTo(3 * i, 10 * i),
              n.bezierCurveTo(3 * i, 10 * i, 33.5 * i, 27 * i, 55 * i, 10 * i),
              n.bezierCurveTo(76 * i, -6 * i, 108 * i, 10 * i, 108 * i, 10 * i),
              n.lineTo(109 * i, 86 * i),
              n.bezierCurveTo(
                109 * i,
                86 * i,
                74 * i,
                73.5 * i,
                56.5 * i,
                86 * i
              ),
              n.bezierCurveTo(40 * i, 98 * i, 3 * i, 88.5 * i, 3 * i, 88.5 * i),
              n.lineTo(3 * i, 10 * i),
              n.closePath(),
              n.fill(),
              n.stroke(),
              n.beginPath(),
              (n.lineWidth = 15 * i),
              n.moveTo(3 * i, 10 * i),
              n.lineTo(3 * i, 180 * i),
              n.stroke(),
              n.restore();
          }),
          (h.collide = function (t) {
            {
              var e = t.parent,
                i = e.player,
                n = t.pos.x - this.x,
                o = t.pos.y - this.y,
                a = s(r(n, 2) + r(o, 2)),
                h = i._powerupsConsumed.checkpoints;
              this.scene;
            }
            26 > a &&
              i.isAlive() &&
              -1 === h.indexOf(this.id) &&
              (h.push(this.id),
              i.setCheckpointOnUpdate(),
              i.isGhost() === !1 &&
                ((this.hit = !0),
                (this.sector.powerupCanvasDrawn = !1),
                this.scene.message.show(
                  "Checkpoint Saved",
                  50,
                  "#826cdc",
                  "#FFFFFF"
                ),
                this.scene.sound.play("checkpoint_sound")));
          }),
          (e.exports = i);
      },
      { "../powerup": 20 },
    ],
    24: [
      function (t, e) {
        function i(t, e, i, n) {
          (this.x = t),
            (this.y = e),
            (this.angle = i - 180),
            (this.realAngle = i);
          var s = (this.angle / 360) * 2 * Math.PI;
          (this.directionX = (-0.3 * Math.sin(s)).toFixed(15) / 1),
            (this.directionY = (0.3 * Math.cos(s)).toFixed(15) / 1),
            this.init(n);
        }
        var n = t("../powerup"),
          s = (Math.max, Math.sqrt, Math.pow),
          r = {
            canvas: document.createElement("canvas"),
            dirty: !0,
            width: 20,
            height: 20,
          },
          o = (i.prototype = new n());
        (o.x = 0),
          (o.y = 0),
          (o.angle = 0),
          (o.realAngle = 0),
          (o.name = "gravity"),
          (o.recache = function (t) {
            r.dirty = !1;
            var e = r.canvas;
            (e.width = r.width * t), (e.height = r.height * t);
            var i = e.getContext("2d"),
              n = e.width / 2,
              s = e.height / 2;
            this.drawArrow(n, s, t, i),
              this.settings.developerMode &&
                (i.beginPath(),
                i.rect(0, 0, e.width, e.height),
                (i.strokeStyle = "red"),
                (i.strokeWidth = 3 * t),
                i.stroke());
          }),
          (o.getCode = function () {
            return (
              "G " +
              this.x.toString(32) +
              " " +
              this.y.toString(32) +
              " " +
              this.realAngle.toString(32)
            );
          }),
          (o.setDirty = function (t) {
            r.dirty = t;
          }),
          (o.draw = function (t, e, i, n) {
            r.dirty && this.recache(i);
            var s = r.width * i,
              o = r.height * i,
              a = s / 2,
              h = o / 2,
              c = t,
              l = e,
              u = (this.angle + 90) * (Math.PI / 180);
            n.translate(c, l),
              n.rotate(u),
              n.drawImage(r.canvas, -a, -h, s, o),
              n.rotate(-u),
              n.translate(-c, -l);
          }),
          (o.drawArrow = function (t, e, i, n) {
            (i *= 0.2),
              n.beginPath(),
              n.moveTo(0 * i, 0 * i),
              n.lineTo(97 * i, 0 * i),
              n.lineTo(97 * i, 96 * i),
              n.lineTo(0 * i, 96 * i),
              n.closePath(),
              n.clip(),
              (n.fillStyle = "rgba(0, 0, 0, 0)"),
              (n.strokeStyle = "rgba(0, 0, 0, 0)"),
              (n.lineWidth = Math.max(6 * i, 1)),
              n.save(),
              (n.fillStyle = "#376eb7"),
              (n.strokeStyle = "#000000"),
              n.beginPath(),
              n.moveTo(41 * i, 70 * i),
              n.lineTo(41 * i, 95 * i),
              n.lineTo(97 * i, 48 * i),
              n.lineTo(41 * i, 1 * i),
              n.lineTo(41 * i, 25 * i),
              n.lineTo(1 * i, 25 * i),
              n.lineTo(1 * i, 70 * i),
              n.lineTo(41 * i, 70 * i),
              n.closePath(),
              n.closePath(),
              n.fill(),
              n.stroke();
          }),
          (o.collide = function (t) {
            var e = t.parent,
              i = e.player,
              n = t.pos.x - this.x,
              r = t.pos.y - this.y,
              o = s(n, 2) + s(r, 2),
              a = e.masses,
              h = (a.length, this.directionX),
              c = this.directionY;
            1e3 > o &&
              i.isAlive() &&
              ((e.gravity.x = h),
              (e.gravity.y = c),
              i.isGhost() === !1 &&
                (this.scene.message.show(
                  "Gravity Changed",
                  50,
                  "#1F80C3",
                  "#FFFFFF"
                ),
                this.scene.sound.play("gravity_down_sound")));
          }),
          (e.exports = i);
      },
      { "../powerup": 20 },
    ],
    25: [
      function (t, e) {
        function i(t, e, i) {
          (this.x = t), (this.y = e), this.init(i);
        }
        var n = t("../powerup"),
          s = Math.sqrt,
          r = Math.pow,
          o = {
            canvas: document.createElement("canvas"),
            dirty: !0,
            width: 24,
            height: 24,
          },
          a = (i.prototype = new n());
        (a.x = 0),
          (a.y = 0),
          (a.name = "slowmo"),
          (a.recache = function (t) {
            o.dirty = !1;
            var e = o.canvas;
            (e.width = o.width * t), (e.height = o.height * t);
            var i = e.getContext("2d"),
              n = e.width / 2,
              s = e.height / 2;
            this.drawCircle(n, s, t, i),
              this.settings.developerMode &&
                (i.beginPath(),
                i.rect(0, 0, e.width, e.height),
                (i.strokeStyle = "red"),
                (i.strokeWidth = 1 * t),
                i.stroke());
          }),
          (a.setDirty = function (t) {
            o.dirty = t;
          }),
          (a.getCode = function () {
            return "S " + this.x.toString(32) + " " + this.y.toString(32);
          }),
          (a.draw = function (t, e, i, n) {
            o.dirty && this.recache(i);
            var s = o.width * i,
              r = o.height * i,
              a = s / 2,
              h = r / 2;
            n.drawImage(o.canvas, t - a, e - h, s, r);
          }),
          (a.collide = function (t) {
            var e = t.parent,
              i = e.player,
              n = t.pos.x - this.x,
              o = t.pos.y - this.y,
              a = s(r(n, 2) + r(o, 2));
            !this.hit &&
              26 > a &&
              i.isAlive() &&
              ((e.slow = !0),
              i.isGhost() === !1 &&
                (this.scene.sound.play("slowmo_sound"),
                this.scene.message.show(
                  "Slow Motion",
                  50,
                  "#FFFFFF",
                  "#000000"
                )));
          }),
          (a.drawCircle = function (t, e, i, n) {
            n.save(),
              n.beginPath(),
              (i *= 0.2),
              n.moveTo(0 * i, 0 * i),
              n.lineTo(116 * i, 0 * i),
              n.lineTo(116 * i, 114 * i),
              n.lineTo(0 * i, 114 * i),
              n.closePath(),
              (n.fillStyle = "#FFF"),
              (n.strokeStyle = "#000000"),
              (n.lineWidth = Math.max(3 * i, 0.5)),
              n.beginPath(),
              n.moveTo(58 * i, 111 * i),
              n.bezierCurveTo(
                89 * i,
                111 * i,
                114 * i,
                87 * i,
                114 * i,
                56 * i
              ),
              n.bezierCurveTo(114 * i, 26 * i, 89 * i, 2 * i, 58 * i, 2 * i),
              n.bezierCurveTo(
                27.1748289 * i,
                2 * i,
                2 * i,
                26 * i,
                2 * i,
                56 * i
              ),
              n.bezierCurveTo(
                2 * i,
                87 * i,
                27.1748289 * i,
                111 * i,
                58 * i,
                111 * i
              ),
              n.closePath(),
              n.moveTo(58 * i, 103 * i),
              n.bezierCurveTo(
                84 * i,
                103 * i,
                106 * i,
                82 * i,
                106 * i,
                56 * i
              ),
              n.bezierCurveTo(106 * i, 30 * i, 84 * i, 9 * i, 58 * i, 9 * i),
              n.bezierCurveTo(31 * i, 9 * i, 10 * i, 30 * i, 10 * i, 56 * i),
              n.bezierCurveTo(10 * i, 82 * i, 31 * i, 103 * i, 58 * i, 103 * i),
              n.closePath(),
              n.moveTo(58 * i, 55 * i),
              n.lineTo(37 * i, 23 * i),
              n.lineTo(35 * i, 25 * i),
              n.lineTo(56 * i, 57 * i),
              n.lineTo(58 * i, 55 * i),
              n.closePath(),
              n.moveTo(58.5 * i, 59 * i),
              n.lineTo(81.5 * i, 59 * i),
              n.lineTo(81.5 * i, 56 * i),
              n.lineTo(58.5 * i, 56 * i),
              n.lineTo(58.5 * i, 59 * i),
              n.closePath(),
              n.moveTo(98.5 * i, 59 * i),
              n.lineTo(105.5 * i, 59 * i),
              n.lineTo(105.5 * i, 56 * i),
              n.lineTo(98.5 * i, 56 * i),
              n.lineTo(98.5 * i, 59 * i),
              n.closePath(),
              n.moveTo(11.5 * i, 59 * i),
              n.lineTo(18.5 * i, 59 * i),
              n.lineTo(18.5 * i, 56 * i),
              n.lineTo(11.5 * i, 56 * i),
              n.lineTo(11.5 * i, 59 * i),
              n.closePath(),
              n.moveTo(57 * i, 96 * i),
              n.lineTo(57 * i, 101.5 * i),
              n.lineTo(60 * i, 101.5 * i),
              n.lineTo(60 * i, 96 * i),
              n.lineTo(57 * i, 96 * i),
              n.closePath(),
              n.moveTo(57 * i, 12 * i),
              n.lineTo(57 * i, 17.5 * i),
              n.lineTo(60 * i, 17.5 * i),
              n.lineTo(60 * i, 12 * i),
              n.lineTo(57 * i, 12 * i),
              n.closePath(),
              n.fill(),
              n.stroke();
          }),
          (e.exports = i);
      },
      { "../powerup": 20 },
    ],
    26: [
      function (t, e) {
        function i(t, e, i) {
          (this.x = t),
            (this.y = e),
            (this.hit = !1),
            (this.id = o().toString(36).substr(2)),
            this.init(i);
        }
        var n = t("../powerup"),
          s = Math.sqrt,
          r = Math.pow,
          o = Math.random,
          a = {
            canvas: document.createElement("canvas"),
            width: 35,
            height: 35,
          },
          h = {
            canvas: document.createElement("canvas"),
            width: 35,
            height: 35,
          },
          c = !0,
          l = (i.prototype = new n());
        (l.x = 0),
          (l.y = 0),
          (l.name = "goal"),
          (l.hit = !1),
          (l.superErase = l.erase),
          (l.getCode = function () {
            return "T " + this.x.toString(32) + " " + this.y.toString(32);
          }),
          (l.recache = function (t) {
            (c = !1), this.cacheStar(t), this.cacheEmptyStar(t);
          }),
          (l.cacheStar = function (t) {
            var e = a.canvas;
            (e.width = a.width * t), (e.height = a.height * t);
            var i = e.getContext("2d"),
              n = e.width / 2,
              s = e.height / 2;
            this.drawStar(n, s, 5, 10, 5, !0, t, i),
              this.settings.developerMode &&
                (i.beginPath(),
                i.rect(0, 0, e.width, e.height),
                (i.strokeStyle = "red"),
                (i.strokeWidth = 1 * t),
                i.stroke());
          }),
          (l.cacheEmptyStar = function (t) {
            var e = h.canvas;
            (e.width = h.width * t), (e.height = h.height * t);
            var i = e.getContext("2d"),
              n = e.width / 2,
              s = e.height / 2;
            this.drawStar(n, s, 5, 10, 5, !1, t, i),
              this.settings.developerMode &&
                (i.beginPath(),
                i.rect(0, 0, e.width, e.height),
                (i.strokeStyle = "red"),
                (i.strokeWidth = 1 * t),
                i.stroke());
          }),
          (l.setDirty = function (t) {
            c = t;
          }),
          (l.draw = function (t, e, i, n) {
            if (this.hit) {
              var s = h.width * i,
                r = h.height * i,
                o = s / 2,
                l = r / 2;
              n.drawImage(h.canvas, t - o, e - l, s, r);
            } else {
              c && this.recache(i);
              var s = a.width * i,
                r = a.height * i,
                o = s / 2,
                l = r / 2;
              n.drawImage(a.canvas, t - o, e - l, s, r);
            }
          }),
          (l.drawStar = function (t, e, i, n, s, r, o, a) {
            var h = (Math.PI / 2) * 3,
              c = t,
              l = e,
              u = Math.PI / i;
            (n *= o),
              (s *= o),
              (a.strokeSyle = "#000"),
              a.beginPath(),
              a.moveTo(t, e - n);
            for (var p = 0; i > p; p++)
              (c = t + Math.cos(h) * n),
                (l = e + Math.sin(h) * n),
                a.lineTo(c, l),
                (h += u),
                (c = t + Math.cos(h) * s),
                (l = e + Math.sin(h) * s),
                a.lineTo(c, l),
                (h += u);
            a.lineTo(t, e - n),
              a.closePath(),
              (a.lineWidth = Math.max(2 * o, 1)),
              (a.strokeStyle = "black"),
              a.stroke(),
              (a.fillStyle = r ? "#FAE335" : "#FFFFFF"),
              a.fill();
          }),
          (l.collide = function (t) {
            var e = t.parent,
              i = e.player,
              n = t.pos.x - this.x,
              o = t.pos.y - this.y,
              a = s(r(n, 2) + r(o, 2)),
              h = i._powerupsConsumed.targets,
              c = this.scene;
            if (26 > a && i.isAlive() && -1 === h.indexOf(this.id)) {
              h.push(this.id);
              var l = h.length,
                u = c.track.targetCount;
              i.isGhost() === !1 &&
                ((this.hit = !0),
                (this.sector.powerupCanvasDrawn = !1),
                c.sound.play("goal_sound"),
                c.message.show(
                  l + " of " + u + " Stars",
                  50,
                  "#FAE335",
                  "#666666"
                )),
                l >= u && (i.complete = !0);
            }
          }),
          (e.exports = i);
      },
      { "../powerup": 20 },
    ],
    27: [
      function (t, e) {
        function i(t, e, i, s) {
          (this.p1 = new n(t, e)),
            (this.p2 = new n(i, s)),
            (this.pp = this.p2.sub(this.p1)),
            (this.len = this.pp.len()),
            (this.sectors = []);
        }
        var n = t("../math/cartesian"),
          s = Math.sqrt,
          r = (Math.pow, Math.round, Math.floor);
        (i.prototype = {
          sectors: null,
          p1: null,
          p2: null,
          pp: null,
          len: 0,
          collided: !1,
          remove: !1,
          recorded: !1,
          getCode: function (t) {
            this.recorded = !0;
            var e = this.p2,
              i = " " + e.x.toString(32) + " " + e.y.toString(32),
              n = this.checkForConnectedLine(t, e);
            return n && (i += n.getCode(t)), i;
          },
          checkForConnectedLine: function (t, e) {
            var i = t.settings.drawSectorSize,
              n = t.sectors.drawSectors,
              s = r(e.x / i),
              o = r(e.y / i);
            return n[s][o].searchForLine("sceneryLines", e);
          },
          erase: function (t, e) {
            var i = !1;
            if (!this.remove) {
              var n = this.p1,
                r = this.p2,
                o = t,
                a = e,
                h = r.sub(n),
                c = n.sub(o),
                l = h.dot(h),
                u = 2 * c.dot(h),
                p = c.dot(c) - a * a,
                d = u * u - 4 * l * p;
              if (d > 0) {
                d = s(d);
                var f = (-u - d) / (2 * l),
                  g = (-u + d) / (2 * l);
                f >= 0 && 1 >= f && ((i = !0), this.removeAllReferences()),
                  g >= 0 && 1 >= g && ((i = !0), this.removeAllReferences());
              }
              this.intersects(this.p1.x, this.p1.y, t.x, t.y, e)
                ? ((i = !0), this.removeAllReferences())
                : this.intersects(this.p2.x, this.p2.y, t.x, t.y, e) &&
                  ((i = !0), this.removeAllReferences());
            }
            return i;
          },
          intersects: function (t, e, i, n, s) {
            var r = t - i,
              o = e - n;
            return s * s >= r * r + o * o;
          },
          addSectorReference: function (t) {
            this.sectors.push(t);
          },
          removeAllReferences: function () {
            this.remove = !0;
            for (var t = this.sectors, e = t.length, i = 0; e > i; i++)
              (t[i].drawn = !1), (t[i].dirty = !0);
            this.sectors = [];
          },
        }),
          (e.exports = i);
      },
      { "../math/cartesian": 15 },
    ],
    28: [
      function (t, e) {
        function i(t, e, i) {
          (this.track = i),
            (this.scene = i.scene),
            (this.settings = i.settings),
            (this.drawSectorSize = this.settings.drawSectorSize),
            (this.row = e),
            (this.column = t),
            (this.camera = i.camera),
            (this.zoom = i.camera.zoom),
            (this.canvasPool = i.canvasPool),
            (this.x = t * this.drawSectorSize),
            (this.y = e * this.drawSectorSize),
            (this.realX = this.x * this.zoom),
            (this.realY = this.y * this.zoom),
            (this.lineCount = 0),
            (this.powerupsCount = 0),
            (this.drawn = !1),
            (this.dirty = !1),
            (this.physicsLines = []),
            (this.sceneryLines = []),
            (this.hasPowerups = !1),
            (this.powerups = {
              all: [],
              goals: [],
              gravitys: [],
              boosts: [],
              slowmos: [],
              checkpoints: [],
              bombs: [],
            });
        }
        {
          var n = (t("../math/cartesian"), t("./physicsline")),
            s = t("./sceneryline");
          Math.max, Math.min;
        }
        (i.prototype = {
          image: !1,
          scene: null,
          settings: null,
          drawSectorSize: null,
          row: 0,
          column: 0,
          camera: null,
          zoom: 0,
          x: 0,
          y: 0,
          realX: 0,
          realY: 0,
          lineCount: 0,
          powerupsCount: 0,
          drawn: !1,
          physicsLines: [],
          sceneryLines: [],
          powerups: [],
          canvasPool: null,
          canvas: null,
          powerupCanvas: null,
          powerupCanvasOffset: 30,
          powerupCanvasDrawn: !1,
          dirty: !1,
          addLine: function (t) {
            t instanceof n && this.physicsLines.push(t),
              t instanceof s && this.sceneryLines.push(t),
              this.lineCount++,
              (this.drawn = !1);
          },
          searchForLine: function (t, e) {
            var i = this[t],
              n = !1;
            for (var s in i) {
              var r = i[s];
              r.p1.x === e.x &&
                r.p1.y === e.y &&
                r.recorded === !1 &&
                r.remove === !1 &&
                (n = r);
            }
            return n;
          },
          addPowerup: function (t) {
            var e = this.powerups,
              i = null;
            switch (t.name) {
              case "goal":
                i = e.goals;
                break;
              case "gravity":
                i = e.gravitys;
                break;
              case "slowmo":
                i = e.slowmos;
                break;
              case "boost":
                i = e.boosts;
                break;
              case "checkpoint":
                i = e.checkpoints;
                break;
              case "bomb":
                i = e.bombs;
            }
            e.all.push(t),
              i.push(t),
              this.powerupsCount++,
              (this.hasPowerups = !0),
              (this.powerupCanvasDrawn = !1);
          },
          erase: function (t, e, i) {
            var n = [];
            if (i.physics === !0)
              for (
                var s = this.physicsLines, r = s.length, o = r - 1;
                o >= 0;
                o--
              ) {
                var a = s[o];
                a.erase(t, e) && n.push(a);
              }
            if (i.scenery === !0)
              for (
                var h = this.sceneryLines, c = h.length, l = c - 1;
                l >= 0;
                l--
              ) {
                var u = h[l];
                u.erase(t, e) && n.push(u);
              }
            if (i.powerups === !0)
              for (
                var p = this.powerups.all, d = p.length, f = d - 1;
                f >= 0;
                f--
              ) {
                var g = p[f];
                g.erase(t, e) && n.push(g);
              }
            return n;
          },
          cleanSector: function () {
            this.cleanSectorType("physicsLines"),
              this.cleanSectorType("sceneryLines"),
              this.cleanSectorType("powerups", "all"),
              0 === this.powerups.all.length
                ? ((this.hasPowerups = !1),
                  this.powerupCanvas &&
                    (this.canvasPool.releaseCanvas(this.powerupCanvas),
                    (this.powerupCanvas = null)))
                : (this.hasPowerups = !0),
              (this.dirty = !1);
          },
          cleanSectorType: function (t, e) {
            var i = this[t];
            e && (i = i[e]);
            for (var n = i.length, s = n - 1; s >= 0; s--) {
              var r = i[s];
              r.remove && i.splice(s, 1);
            }
          },
          draw: function () {
            var t = this.scene.camera,
              e = t.zoom,
              i = this.physicsLines,
              n = this.sceneryLines,
              s = (this.drawSectorSize * e) | 0,
              r = this.canvasPool.getCanvas();
            (r.width = s), (r.height = s);
            var o = r.getContext("2d");
            o.clearRect(0, 0, r.width, r.height);
            var a = 2 * e > 0.5 ? 2 * e : 0.5,
              h = this.settings.sceneryLineColor,
              c = this.settings.physicsLineColor;
            o.save(),
              o.beginPath(),
              (o.lineWidth = a),
              (o.lineCap = "round"),
              (o.strokeStyle = h),
              this.drawLines(n, e, o),
              o.stroke(),
              o.beginPath(),
              (o.lineWidth = a),
              (o.lineCap = "round"),
              (o.strokeStyle = c),
              this.drawLines(i, e, o),
              o.stroke(),
              this.settings.developerMode &&
                (o.beginPath(),
                (o.strokeStyle = "blue"),
                o.rect(0, 0, s, s),
                o.stroke()),
              (this.canvas = r),
              (this.drawn = !0);
          },
          drawLine: function (t, e) {
            var i,
              n,
              s,
              r,
              o,
              a,
              h = this.canvas,
              c = this.scene.camera,
              l = c.zoom,
              u = 2 * l > 0.5 ? 2 * l : 0.5,
              p = !1,
              d = this.x,
              f = this.y;
            if (!h) {
              var g = (this.drawSectorSize * l) | 0;
              (h = this.canvasPool.getCanvas()),
                (h.width = g),
                (h.height = g),
                (p = h.getContext("2d"));
            }
            p || (p = h.getContext("2d")),
              (o = t.p1),
              (a = t.p2),
              (i = (o.x - d) * l),
              (n = (o.y - f) * l),
              (s = (a.x - d) * l),
              (r = (a.y - f) * l),
              p.save(),
              p.beginPath(),
              (p.lineWidth = u),
              (p.lineCap = "round"),
              (p.strokeStyle = e),
              p.moveTo(i, n),
              p.lineTo(s, r),
              p.stroke();
          },
          cachePowerupSector: function () {
            this.powerupCanvasDrawn = !0;
            var t = this.powerups.all;
            if (t.length > 0) {
              var e = this.scene.camera,
                i = e.zoom,
                n = (this.drawSectorSize * i) | 0,
                s = this.powerupCanvasOffset,
                r = this.canvasPool.getCanvas();
              (r.width = n + s * i), (r.height = n + s * i);
              var o = r.getContext("2d");
              o.clearRect(0, 0, r.width, r.height),
                this.drawPowerups(this.powerups.slowmos, i, o),
                this.drawPowerups(this.powerups.checkpoints, i, o),
                this.drawPowerups(this.powerups.boosts, i, o),
                this.drawPowerups(this.powerups.gravitys, i, o),
                this.drawPowerups(this.powerups.bombs, i, o),
                this.drawPowerups(this.powerups.goals, i, o),
                (this.powerupCanvas = r),
                this.settings.developerMode &&
                  (o.beginPath(),
                  (o.strokeStyle = "red"),
                  o.rect(0, 0, r.width, r.height),
                  o.stroke());
            }
          },
          update: function () {
            var t = this.camera.zoom;
            (this.realX = (this.x * t) | 0),
              (this.realY = (this.y * t) | 0),
              (this.zoom = t);
          },
          resetCollided: function () {
            for (
              var t = this.physicsLines, e = t.length, i = e - 1;
              i >= 0;
              i--
            )
              t[i] && (t[i].collided = !1);
          },
          collide: function (t) {
            for (
              var e = t.parent, i = this.physicsLines, n = i.length, s = n - 1;
              s >= 0;
              s--
            )
              if (i[s]) {
                var r = i[s];
                r.remove ? i.splice(s, 1) : r.collide(t);
              }
            if (e.powerupsEnabled)
              for (
                var o = this.powerups.all, a = o.length, h = a - 1;
                h >= 0;
                h--
              ) {
                var c = o[h];
                c.remove ? o.splice(h, 1) : o[h].collide(t);
              }
          },
          drawLines: function (t, e, i) {
            for (
              var n,
                s,
                r,
                o,
                a,
                h,
                c,
                l = this.x,
                u = this.y,
                p = t.length,
                d = p - 1;
              d >= 0;
              d--
            ) {
              var a = t[d];
              a.remove
                ? t.splice(d, 1)
                : ((h = a.p1),
                  (c = a.p2),
                  (n = (h.x - l) * e),
                  (s = (h.y - u) * e),
                  (r = (c.x - l) * e),
                  (o = (c.y - u) * e),
                  i.moveTo(n, s),
                  i.lineTo(r, o));
            }
          },
          drawPowerups: function (t, e, i) {
            for (
              var t = t,
                n = t.length,
                s = this.x,
                r = this.y,
                o = (this.powerupCanvasOffset * e) / 2,
                a = n - 1;
              a >= 0;
              a--
            ) {
              var h = t[a];
              if (h.remove) t.splice(a, 1);
              else {
                var c = (h.x - s) * e + o,
                  l = (h.y - r) * e + o;
                h.draw(c, l, e, i);
              }
            }
          },
          drawBackground: function (t, e, i) {
            var n = (this.drawSectorSize * e) | 0;
            t.beginPath(), t.rect(0, 0, n, n), (t.fillStyle = i), t.fill();
          },
          clear: function () {
            (this.drawn = !1),
              (this.powerupCanvasDrawn = !1),
              this.canvas &&
                ((this.canvas = null),
                this.canvasPool.releaseCanvas(this.canvas)),
              this.powerupCanvas &&
                (this.canvasPool.releaseCanvas(this.powerupCanvas),
                (this.powerupCanvas = null));
          },
          close: function () {
            (this.track = null),
              (this.scene = null),
              (this.settings = null),
              (this.drawSectorSize = null),
              (this.row = null),
              (this.column = null),
              (this.camera = null),
              (this.zoom = null),
              (this.canvasPool = null),
              (this.x = null),
              (this.y = null),
              (this.realX = null),
              (this.realY = null),
              (this.lineCount = null),
              (this.drawn = null),
              (this.physicsLines = null),
              (this.sceneryLines = null),
              (this.canvas = null);
          },
        }),
          (e.exports = i);
      },
      { "../math/cartesian": 15, "./physicsline": 19, "./sceneryline": 27 },
    ],
    29: [
      function (t, e) {
        function i(t, e, i, n) {
          (this.x = t),
            (this.y = e),
            (this.time = i),
            (this.id = r().toString(36).substr(2)),
            (this.hit = !1),
            this.init(n);
        }
        var n = t("../powerup"),
          s = {
            canvas: document.createElement("canvas"),
            dirty: !0,
            width: 32,
            height: 42,
          },
          r = Math.random,
          o = Math.pow,
          a = Math.sqrt,
          h = (Math.cos, Math.sin, (i.prototype = new n()));
        (h.x = 0),
          (h.y = 0),
          (h.name = "bomb"),
          (h.getCode = function () {
            return (
              "V " +
              this.x.toString(32) +
              " " +
              this.y.toString(32) +
              " 1 " +
              this.time.toString(32)
            );
          }),
          (h.recache = function (t) {
            s.dirty = !1;
            var e = s.canvas;
            (e.width = s.width * t), (e.height = s.height * t);
            var i = e.getContext("2d"),
              n = e.width / 2,
              r = e.height / 2;
            this.drawIcon(n, r, t, i);
          }),
          (h.setDirty = function (t) {
            s.dirty = t;
          }),
          (h.draw = function (t, e, i, n) {
            if (!this.hit) {
              s.dirty && this.recache(i);
              var r = s.width * i,
                o = s.height * i,
                a = r / 2,
                h = o / 2;
              n.drawImage(s.canvas, t - a, e - h, r, o);
            }
          }),
          (h.drawIcon = function (t, e, i, n) {
            (i *= 1),
              (n.lineCap = "butt"),
              (n.lineJoin = "miter"),
              (n.miterLimit = 4 * i),
              (n.fillStyle = "#000000"),
              n.beginPath(),
              n.moveTo(15 * i, 4.5 * i),
              n.lineTo(15 * i, 2.5 * i),
              n.bezierCurveTo(
                15 * i,
                1.4 * i,
                14.1 * i,
                0.5 * i,
                13 * i,
                0.5 * i
              ),
              n.bezierCurveTo(
                11.9 * i,
                0.5 * i,
                11 * i,
                1.4 * i,
                11 * i,
                2.5 * i
              ),
              n.lineTo(11 * i, 4.5 * i),
              n.bezierCurveTo(
                11 * i,
                5.6 * i,
                11.9 * i,
                6.5 * i,
                13 * i,
                6.5 * i
              ),
              n.bezierCurveTo(
                14.1 * i,
                6.5 * i,
                15 * i,
                5.6 * i,
                15 * i,
                4.5 * i
              ),
              n.lineTo(15 * i, 4.5 * i),
              n.closePath(),
              n.fill(),
              n.beginPath(),
              (n.lineCap = "round"),
              (n.lineWidth = 2 * i),
              n.moveTo(1 * i, 3 * i),
              n.lineTo(25 * i, 3 * i),
              n.stroke(),
              (n.lineCap = "butt"),
              (n.lineWidth = 1 * i),
              n.beginPath(),
              n.moveTo(6.1 * i, 26.9 * i),
              n.lineTo(4.1 * i, 31.9 * i),
              n.bezierCurveTo(
                3.8 * i,
                32.7 * i,
                4.2 * i,
                33.6 * i,
                4.9 * i,
                33.9 * i
              ),
              n.bezierCurveTo(
                5.7 * i,
                34.2 * i,
                6.6 * i,
                33.8 * i,
                6.9 * i,
                33 * i
              ),
              n.lineTo(8.9 * i, 28 * i),
              n.bezierCurveTo(
                9.2 * i,
                27.3 * i,
                8.8 * i,
                26.4 * i,
                8 * i,
                26.1 * i
              ),
              n.bezierCurveTo(
                7.3 * i,
                25.8 * i,
                6.4 * i,
                26.1 * i,
                6.1 * i,
                26.9 * i
              ),
              n.lineTo(6.1 * i, 26.9 * i),
              n.closePath(),
              n.fill(),
              n.stroke(),
              n.beginPath(),
              n.moveTo(17 * i, 28 * i),
              n.lineTo(19 * i, 33 * i),
              n.bezierCurveTo(
                19.4 * i,
                33.8 * i,
                20.3 * i,
                34.2 * i,
                21 * i,
                33.9 * i
              ),
              n.bezierCurveTo(
                21.8 * i,
                33.6 * i,
                22.2 * i,
                32.7 * i,
                21.9 * i,
                31.9 * i
              ),
              n.lineTo(19.9 * i, 26.9 * i),
              n.bezierCurveTo(
                19.6 * i,
                26.2 * i,
                18.7 * i,
                25.8 * i,
                17.9 * i,
                26.1 * i
              ),
              n.bezierCurveTo(
                17.2 * i,
                26.4 * i,
                16.8 * i,
                27.3 * i,
                17.1 * i,
                28 * i
              ),
              n.lineTo(17 * i, 28 * i),
              n.closePath(),
              n.fill(),
              n.stroke(),
              (n.fillStyle = "#f59423"),
              (n.strokeStyle = "#000000"),
              (n.lineWidth = 2 * i),
              n.beginPath(),
              n.arc(13 * i, 17 * i, 11 * i, 0 * i, 2 * Math.PI, !0),
              n.closePath(),
              n.fill(),
              n.stroke(),
              (n.fillStyle = "#000000"),
              n.beginPath(),
              n.moveTo(21 * i, 17 * i),
              n.bezierCurveTo(21 * i, 12.6 * i, 17.4 * i, 9 * i, 13 * i, 9 * i),
              n.bezierCurveTo(8.6 * i, 9 * i, 5 * i, 12.6 * i, 5 * i, 17 * i),
              n.lineTo(21 * i, 17 * i),
              n.closePath(),
              n.fill();
          }),
          (h.collide = function (t) {
            var e = t.parent,
              i = e.player,
              n = t.pos.x - this.x,
              s = t.pos.y - this.y,
              r = a(o(n, 2) + o(s, 2)),
              h = i._powerupsConsumed.misc,
              c = this.scene;
            if (30 > r && i.isAlive() && -1 === h.indexOf(this.id)) {
              h.push(this.id);
              var l = this.time * c.settings.drawFPS;
              i.createTempVehicle("HELI", l, { x: this.x, y: this.y }, e.dir),
                c.camera.playerFocus === i &&
                  (c.camera.focusOnPlayer(), c.vehicleTimer.playerAddedTime(i)),
                i.isGhost() === !1 &&
                  ((this.hit = !0),
                  (this.sector.powerupCanvasDrawn = !1),
                  this.scene.message.show(
                    "Helicopter Powerup!",
                    50,
                    "#F2902E",
                    !1
                  ));
            }
          }),
          (e.exports = i);
      },
      { "../powerup": 20 },
    ],
    30: [
      function (t, e) {
        var i = t("../math/cartesian"),
          n = t("./tool"),
          s =
            (t("../../libs/lodash-3.10.1"),
            Math.sqrt,
            Math.pow,
            Math.round,
            function (t) {
              this.toolInit(t),
                (this.p1 = new i(0, 0)),
                (this.p2 = new i(0, 0)),
                (this.active = !1);
              var e = t.scene.settings.brush;
              (this.addedObjects = []),
                (this.options = {
                  breakLength: e.breakLength,
                  maxBreakLength: e.maxBreakLength,
                  minBreakLength: e.minBreakLength,
                  breakLengthSensitivity: e.breakLengthSensitivity,
                  trailSpeed: e.trailSpeed,
                  maxTrailSpeed: e.maxTrailSpeed,
                  minTrailSpeed: e.minTrailSpeed,
                  trailSpeedSensitivity: e.trailSpeedSensitivity,
                });
            }),
          r = (s.prototype = new n());
        (r.toolInit = r.init),
          (r.toolUpdate = r.update),
          (r.name = "Brush"),
          (r.p1 = null),
          (r.p2 = null),
          (r.active = !1),
          (r.options = null),
          (r.reset = function () {
            this.recordActionsToToolhandler(), (this.active = !1);
          }),
          (r.recordActionsToToolhandler = function () {
            var t,
              e = this.addedObjects,
              i = e.length;
            if (i)
              for (t = 0; i > t; t++)
                this.toolhandler.addActionToTimeline({
                  type: "add",
                  objects: [e[t]],
                });
            this.addedObjects = [];
          }),
          (r.press = function () {
            if ((this.recordActionsToToolhandler(), !this.active)) {
              var t = this.mouse.touch.real;
              (this.p1.x = t.x),
                (this.p1.y = t.y),
                (this.p2.x = t.x),
                (this.p2.y = t.y),
                (this.active = !0);
            }
          }),
          (r.hold = function () {
            var t = this.mouse.touch.real,
              e = this.p1,
              i = this.p2,
              n = this.options.trailSpeed,
              s = this.options.breakLength;
            i.inc(t.sub(i).factor(n));
            var r = screen.height + t.sub(i).len();
            if (((r *= s), i.sub(e).lenSqr() > r)) {
              var o = this.scene.track,
                a = !1;
              (a =
                "physics" === this.toolhandler.options.lineType
                  ? o.addPhysicsLine(e.x, e.y, i.x, i.y)
                  : o.addSceneryLine(e.x, e.y, i.x, i.y)),
                a && this.addedObjects.push(a),
                e.equ(i),
                (this.toolhandler.snapPoint.x = i.x),
                (this.toolhandler.snapPoint.y = i.y);
            }
            this.toolhandler.moveCameraTowardsMouse();
          }),
          (r.release = function () {
            var t = this.p1,
              e = this.p2,
              i = this.scene.track,
              n = !1;
            (n =
              "physics" === this.toolhandler.options.lineType
                ? i.addPhysicsLine(t.x, t.y, e.x, e.y)
                : i.addSceneryLine(t.x, t.y, e.x, e.y)),
              n && this.addedObjects.push(n),
              this.recordActionsToToolhandler();
            var s = this.toolhandler,
              r = s.snapPoint;
            (r.x = e.x), (r.y = e.y), (this.active = !1);
          }),
          (r.update = function () {
            var t = this.toolhandler.gamepad,
              e = this.mouse;
            t.isButtonDown("alt")
              ? e.mousewheel !== !1 && this.adjustTrailSpeed(e.mousewheel)
              : t.isButtonDown("shift") &&
                e.mousewheel !== !1 &&
                this.adjustBreakLength(e.mousewheel);
            var i = this.toolhandler;
            i.options.snap &&
              ((this.active = !0),
              (this.p1.x = i.snapPoint.x),
              (this.p1.y = i.snapPoint.y),
              (this.p2.x = e.touch.real.x),
              (this.p2.y = e.touch.real.y)),
              this.toolUpdate();
          }),
          (r.adjustTrailSpeed = function (t) {
            var e = this.options.trailSpeed,
              i = this.options.trailSpeedSensitivity,
              n = this.options.maxTrailSpeed,
              s = this.options.minTrailSpeed;
            t > 0 ? ((e += i), e > n && (e = n)) : ((e -= i), s > e && (e = s)),
              this.setOption("trailSpeed", e);
          }),
          (r.adjustBreakLength = function (t) {
            var e = this.options.breakLength,
              i = this.options.breakLengthSensitivity,
              n = this.options.maxBreakLength,
              s = this.options.minBreakLength;
            t > 0 ? ((e += i), e > n && (e = n)) : ((e -= i), s > e && (e = s)),
              this.setOption("breakLength", e);
          }),
          (r.setOption = function (t, e) {
            (this.options[t] = e), this.toolhandler.scene.stateChanged();
          }),
          (r.getOptions = function () {
            var t = this.toolhandler,
              e = this.options;
            return (
              (e.lineType = t.options.lineType), (e.snap = t.options.snap), e
            );
          }),
          (r.draw = function () {
            var t = this.scene,
              e = (t.game.canvas, t.game.canvas.getContext("2d")),
              i = t.camera,
              n = i.zoom;
            this.drawCursor(e),
              this.active &&
                (this.drawLine(e, n),
                this.drawPoint(e, this.p1, n),
                this.drawPoint(e, this.p2, n));
          }),
          (r.drawText = function (t) {
            var e = this.name,
              i = this.options.breakLength,
              n = this.options.trailSpeed,
              s = this.game.pixelRatio;
            (t.fillStyle = "#000000"),
              (t.font = 12 * s + "pt arial"),
              t.fillText(e, 10 * s, 20 * s),
              (t.font = 8 * s + "pt arial"),
              (n = 0 | n),
              (i = i),
              t.fillText("Trail speed : " + n, 10 * s, 40 * s),
              t.fillText("Break length : " + i, 10 * s, 60 * s);
          }),
          (r.drawCursor = function (t) {
            var e = this.mouse.touch,
              i = e.real.toScreen(this.scene),
              n = this.camera.zoom,
              s = this.toolhandler,
              r = (s.options.lineType, s.options.grid),
              o = "#1884cf";
            if (r) {
              var a = 5 * n;
              t.beginPath(),
                t.moveTo(i.x, i.y - a),
                t.lineTo(i.x, i.y + a),
                t.moveTo(i.x - a, i.y),
                t.lineTo(i.x + a, i.y),
                (t.lineWidth = 1 * n),
                t.stroke();
            } else
              t.beginPath(),
                t.arc(i.x, i.y, 1 * n, 0, 2 * Math.PI, !1),
                (t.lineWidth = 1),
                (t.fillStyle = o),
                t.fill();
          }),
          (r.drawPoint = function (t, e, i) {
            var n = e.toScreen(this.scene);
            t.beginPath(),
              t.arc(n.x, n.y, 1 * i, 0, 2 * Math.PI, !1),
              (t.lineWidth = 1),
              (t.fillStyle = "#1884cf"),
              t.fill();
          }),
          (r.drawLine = function (t, e) {
            var i = this.scene,
              n = (i.game.canvas, 2 * e > 0.5 ? 2 * e : 0.5),
              s = this.toolhandler,
              r = s.options.lineType,
              o = "physics" === r ? "#000" : "#AAA";
            t.beginPath(),
              (t.lineWidth = n),
              (t.lineCap = "round"),
              (t.strokeStyle = o);
            var a = this.p1.toScreen(this.scene),
              h = this.p2.toScreen(this.scene);
            t.moveTo(a.x, a.y), t.lineTo(h.x, h.y), t.stroke();
          }),
          (e.exports = s);
      },
      { "../../libs/lodash-3.10.1": 77, "../math/cartesian": 15, "./tool": 43 },
    ],
    31: [
      function (t, e) {
        var i = (t("../math/cartesian"), t("./tool")),
          n = function (t) {
            this.toolInit(t);
          },
          s = (n.prototype = new i());
        (s.toolInit = s.init),
          (s.toolDraw = s.draw),
          (s.name = "Camera"),
          (s.hold = function () {
            var t = this.mouse.touch,
              e = t.pos,
              i = this.camera,
              n = t.old.pos.sub(e).factor(1 / i.zoom);
            i.position.inc(n);
          }),
          (s.draw = function () {
            {
              var t = this.scene;
              t.game.canvas, t.game.canvas.getContext("2d");
            }
          }),
          (s.drawText = function (t) {
            {
              var e = this.name,
                i = this.game.pixelRatio,
                n = this.scene;
              n.game.canvas;
            }
            (t.fillStyle = "#000000"),
              (t.font = 12 * i + "pt arial"),
              t.fillText(e, 10 * i, 20 * i),
              (t.font = 8 * i + "pt arial");
          }),
          (e.exports = n);
      },
      { "../math/cartesian": 15, "./tool": 43 },
    ],
    32: [
      function (t, e) {
        var i = t("../math/cartesian"),
          n = t("../math/curvedivision"),
          s = t("./tool"),
          r = Math.sqrt,
          o = Math.pow,
          a = function (t) {
            this.toolInit(t),
              (this.p1 = new i(0, 0)),
              (this.p2 = new i(0, 0)),
              (this.midpoint = new i(0, 0)),
              (this.active = !1),
              (this.options = {});
          },
          h = (a.prototype = new s());
        (h.toolInit = h.init),
          (h.name = "Curve"),
          (h.active = !1),
          (h.p1 = null),
          (h.p2 = null),
          (h.midpoint = null),
          (h.anchoring = !1),
          (h.options = null),
          (h.getOptions = function () {
            var t = this.toolhandler,
              e = this.options;
            return (
              (e.lineType = t.options.lineType), (e.snap = t.options.snap), e
            );
          }),
          (h.reset = function () {
            (this.active = !1), (this.anchoring = !1);
          }),
          (h.press = function () {
            if (!this.active) {
              this.active = !0;
              var t = this.mouse.touch.real;
              (this.p1.x = t.x), (this.p1.y = t.y);
            }
          }),
          (h.hold = function () {
            var t = this.mouse.touch.real;
            (this.p2.x = t.x), (this.p2.y = t.y);
            var e = this.p1,
              i = this.p2;
            (this.midpoint.x = (e.x + i.x) / 2),
              (this.midpoint.y = (e.y + i.y) / 2),
              this.toolhandler.moveCameraTowardsMouse();
          }),
          (h.release = function () {
            var t = this.p1,
              e = this.p2,
              i = this.midpoint,
              n = this.toolhandler;
            if (this.anchoring) {
              if (i.x === e.x && i.y === e.y) {
                var s = this.scene.track,
                  a = !1;
                (a =
                  "physics" === n.options.lineType
                    ? s.addPhysicsLine(t.x, t.y, e.x, e.y)
                    : s.addSceneryLine(t.x, t.y, e.x, e.y)),
                  a && n.addActionToTimeline({ type: "add", objects: [a] }),
                  (n.snapPoint.x = e.x),
                  (n.snapPoint.y = e.y);
              } else this.splitAndAddCurve();
              (this.anchoring = !1), (this.active = !1);
            } else {
              var h = e.x - t.x,
                c = e.y - t.y,
                l = r(o(h, 2) + o(c, 2));
              l > 0 ? (this.anchoring = !0) : (this.active = !1);
            }
          }),
          (h.updateAnchor = function () {
            var t = this.mouse.touch.real;
            (this.midpoint.x = t.x), (this.midpoint.y = t.y);
          }),
          (h.splitAndAddCurve = function () {
            for (
              var t = (performance.now(), n(this.p1, this.midpoint, this.p2)),
                e = this.scene.track,
                i = t.length,
                s = this.toolhandler,
                r = [],
                o = 0;
              i - 2 > o;
              o += 2
            ) {
              var a = t[o],
                h = t[o + 1],
                c = t[o + 2],
                l = t[o + 3],
                u = !1;
              (u =
                "physics" === s.options.lineType
                  ? e.addPhysicsLine(a, h, c, l)
                  : e.addSceneryLine(a, h, c, l)),
                u && r.push(u),
                (s.snapPoint.x = c),
                (s.snapPoint.y = l);
            }
            r.length > 0 && s.addActionToTimeline({ type: "add", objects: r });
          }),
          (h.update = function () {
            var t = this.mouse,
              e = t.touch,
              i = t.secondaryTouch,
              n = this.toolhandler.gamepad,
              s = this.toolhandler;
            s.options.snap &&
              ((this.active = !0),
              (this.p1 = s.snapPoint),
              this.anchoring || this.hold());
            var r = this.toolhandler.options,
              o = n.isButtonDown("shift");
            r.rightClickMove && (o = i.old.down),
              o
                ? (e.old.down || r.rightClickMove) && this.moveCamera()
                : (e.press && !this.anchoring && this.press(),
                  e.old.down && !this.anchoring && this.hold(),
                  e.release && this.release(),
                  this.anchoring && this.updateAnchor()),
              t.mousewheel !== !1 &&
                n.isButtonDown("shift") === !1 &&
                this.mousewheel(t.mousewheel);
          }),
          (h.draw = function () {
            var t = this.scene,
              e = (t.game.canvas, t.game.canvas.getContext("2d")),
              i = t.camera,
              n = i.zoom;
            this.drawCursor(e, n),
              this.active &&
                (this.drawLine(e, n),
                this.drawPoint(e, this.p1, n),
                this.drawPoint(e, this.p2, n));
          }),
          (h.toScreen = function (t, e) {
            var i = this.scene.camera,
              n = this.scene.screen;
            return (t - i.position[e]) * i.zoom + n.center[e];
          }),
          (h.drawCursor = function (t, e) {
            var i = this.mouse.touch,
              n = i.real.toScreen(this.scene),
              s = this.toolhandler,
              r = (s.options.lineType, s.options.grid),
              o = "#1884cf";
            if (r) {
              var a = 5 * e;
              t.beginPath(),
                t.moveTo(n.x, n.y - a),
                t.lineTo(n.x, n.y + a),
                t.moveTo(n.x - a, n.y),
                t.lineTo(n.x + a, n.y),
                (t.lineWidth = 1 * e),
                t.stroke();
            } else
              t.beginPath(),
                t.arc(n.x, n.y, 1 * e, 0, 2 * Math.PI, !1),
                (t.lineWidth = 1),
                (t.fillStyle = o),
                t.fill();
          }),
          (h.drawPoint = function (t, e, i) {
            var n = e.toScreen(this.scene);
            t.beginPath(),
              t.arc(n.x, n.y, 1 * i, 0, 2 * Math.PI, !1),
              (t.lineWidth = 1),
              (t.fillStyle = "#1884cf"),
              t.fill();
          }),
          (h.drawText = function (t) {
            {
              var e = this.name,
                i = this.game.pixelRatio,
                n = this.scene;
              n.game.canvas;
            }
            (t.fillStyle = "#000000"),
              (t.font = 12 * i + "pt arial"),
              t.fillText(e, 10 * i, 20 * i),
              (t.font = 8 * i + "pt arial");
          }),
          (h.drawLine = function (t, e) {
            var i = this.scene,
              n = (i.game.canvas, 2 * e > 0.5 ? 2 * e : 0.5),
              s = this.toolhandler,
              r = s.options.lineType,
              o = "physics" === r ? "#000" : "#AAA";
            t.beginPath(),
              (t.lineWidth = n),
              (t.lineCap = "round"),
              (t.strokeStyle = o);
            var a = this.p1.toScreen(this.scene),
              h = this.p2.toScreen(this.scene),
              c = this.midpoint.toScreen(this.scene);
            t.moveTo(a.x, a.y),
              t.quadraticCurveTo(c.x, c.y, h.x, h.y),
              t.stroke();
          }),
          (e.exports = a);
      },
      { "../math/cartesian": 15, "../math/curvedivision": 16, "./tool": 43 },
    ],
    33: [
      function (t, e) {
        var i = t("../math/cartesian"),
          n = t("./tool"),
          s = t("../../libs/lodash-3.10.1"),
          r = Math.round,
          o = function (t) {
            this.toolInit(t);
            var e = t.scene.settings.eraser;
            (this.options = e),
              (this.eraserPoint = new i()),
              (this.erasedObjects = []);
          },
          a = (o.prototype = new n());
        (a.toolInit = a.init),
          (a.toolUpdate = a.update),
          (a.name = "Eraser"),
          (a.options = null),
          (a.reset = function () {
            this.recordActionsToToolhandler();
          }),
          (a.press = function () {
            this.recordActionsToToolhandler();
          }),
          (a.recordActionsToToolhandler = function () {
            this.erasedObjects.length > 0 &&
              this.toolhandler.addActionToTimeline({
                type: "remove",
                objects: s.flatten(this.erasedObjects),
              }),
              (this.erasedObjects = []);
          }),
          (a.release = function () {
            this.recordActionsToToolhandler();
          }),
          (a.hold = function () {
            var t = this.mouse.touch,
              e = t.pos,
              i = this.scene.track,
              n = this.scene.screen,
              s = this.scene.camera,
              o = n.center,
              a = s.position,
              h = (e.x - o.x) / s.zoom + a.x,
              c = (e.y - o.y) / s.zoom + a.y;
            (this.eraserPoint.x = r(h)), (this.eraserPoint.y = r(c));
            var l = i.erase(
              this.eraserPoint,
              this.options.radius / this.scene.camera.zoom,
              this.options.types
            );
            l.length > 0 && this.erasedObjects.push(l);
          }),
          (a.draw = function () {
            var t = this.scene,
              e = (t.game.canvas, t.game.canvas.getContext("2d"));
            this.drawEraser(e);
          }),
          (a.drawEraser = function (t) {
            {
              var e = this.mouse.touch,
                i = e.pos;
              this.camera.zoom;
            }
            t.beginPath(),
              t.arc(i.x, i.y, this.options.radius, 0, 2 * Math.PI, !1),
              (t.lineWidth = 1),
              (t.fillStyle = "rgba(255,255,255,0.8)"),
              t.fill(),
              (t.strokeStyle = "#000000"),
              t.stroke();
          }),
          (a.setOption = function (t, e) {
            (this.options[t] = e), this.toolhandler.scene.stateChanged();
          }),
          (a.getOptions = function () {
            return this.options;
          }),
          (a.update = function () {
            var t = this.toolhandler.gamepad,
              e = this.mouse;
            t.isButtonDown("shift") &&
              e.mousewheel !== !1 &&
              this.adjustRadius(e.mousewheel),
              this.toolUpdate();
          }),
          (a.adjustRadius = function (t) {
            var e = this.options.radius,
              i = this.options.radiusSizeSensitivity,
              n = this.options.maxRadius,
              s = this.options.minRadius,
              r = t > 0 ? i : -i;
            (e += r),
              s > e ? (e = s) : e > n && (e = n),
              this.setOption("radius", e);
          }),
          (e.exports = o);
      },
      { "../../libs/lodash-3.10.1": 77, "../math/cartesian": 15, "./tool": 43 },
    ],
    34: [
      function (t, e) {
        var i = (t("../math/cartesian"), t("./tool")),
          n = (Math.round, t("./poweruptools/gravitytool")),
          s = t("./poweruptools/goaltool"),
          r = t("./poweruptools/boosttool"),
          o = t("./poweruptools/slowmotool"),
          a = t("./poweruptools/checkpointtool"),
          h = t("./poweruptools/bombtool"),
          c = function (t) {
            this.toolInit(t),
              (this.powerupTools = {}),
              this.registerPowerupTools(),
              (this.options = { selected: "goal" });
          },
          l = (c.prototype = new i());
        (l.toolInit = l.init),
          (l.toolUpdate = l.update),
          (l.name = "Powerup"),
          (l.powerupTools = null),
          (l.registerPowerupTools = function () {
            this.registerTool(new s(this.toolhandler)),
              this.registerTool(new r(this.toolhandler)),
              this.registerTool(new n(this.toolhandler)),
              this.registerTool(new o(this.toolhandler)),
              this.registerTool(new h(this.toolhandler)),
              this.registerTool(new a(this.toolhandler));
          }),
          (l.registerTool = function (t) {
            this.powerupTools[t.name] = t;
          }),
          (l.setOption = function (t, e) {
            this.options[t] = e;
          }),
          (l.getOptions = function () {
            return this.options;
          }),
          (l.update = function () {
            var t = this.toolhandler.gamepad,
              e = (this.mouse, this.options);
            t.isButtonDown("opt1") &&
              ((e.selected = "goal"),
              t.setButtonUp("opt1"),
              this.toolhandler.scene.stateChanged()),
              t.isButtonDown("opt2") &&
                ((e.selected = "boost"),
                t.setButtonUp("opt2"),
                this.toolhandler.scene.stateChanged()),
              t.isButtonDown("opt3") &&
                ((e.selected = "gravity"),
                t.setButtonUp("opt3"),
                this.toolhandler.scene.stateChanged()),
              t.isButtonDown("opt4") &&
                ((e.selected = "slowmo"),
                t.setButtonUp("opt4"),
                this.toolhandler.scene.stateChanged()),
              t.isButtonDown("opt5") &&
                ((e.selected = "bomb"),
                t.setButtonUp("opt5"),
                this.toolhandler.scene.stateChanged()),
              t.isButtonDown("opt6") &&
                ((e.selected = "checkpoint"),
                t.setButtonUp("opt6"),
                this.toolhandler.scene.stateChanged()),
              this.toolUpdate();
          }),
          (l.press = function () {
            var t = this.options.selected;
            this.powerupTools[t].press();
          }),
          (l.hold = function () {
            var t = this.options.selected;
            this.powerupTools[t].hold();
          }),
          (l.release = function () {
            var t = this.options.selected;
            this.powerupTools[t].release();
          }),
          (l.draw = function () {
            var t = this.scene,
              e = (t.game.canvas, t.game.canvas.getContext("2d")),
              i = this.options;
            this.powerupTools[i.selected].draw(e);
          }),
          (e.exports = c);
      },
      {
        "../math/cartesian": 15,
        "./poweruptools/bombtool": 35,
        "./poweruptools/boosttool": 36,
        "./poweruptools/checkpointtool": 37,
        "./poweruptools/goaltool": 38,
        "./poweruptools/gravitytool": 39,
        "./poweruptools/slowmotool": 40,
        "./tool": 43,
      },
    ],
    35: [
      function (t, e) {
        var i = t("../../math/cartesian"),
          n = t("../tool"),
          s = t("../../sector/powerups/bomb"),
          r = function (t) {
            this.toolInit(t),
              (this.powerup = new s(0, 0, t.scene.track)),
              (this.p1 = new i(0, 0)),
              (this.p2 = new i(0, 0)),
              (this.active = !1);
          },
          o = (r.prototype = new n());
        (o.toolInit = o.init),
          (o.toolUpdate = o.update),
          (o.powerup = null),
          (o.name = "bomb"),
          (o.p1 = null),
          (o.p2 = null),
          (o.active = !1),
          (o.draw = function (t) {
            var e = this.mouse.touch,
              i = (e.pos, this.camera.zoom),
              n = this.scene.settings.device,
              s = this.scene.screen;
            if (this.active === !0) {
              var r = s.realToScreen(this.p1.x, "x"),
                o = s.realToScreen(this.p1.y, "y");
              (t.globalAlpha = 0.4),
                this.powerup.draw(r, o, i, t),
                (t.globalAlpha = 1);
            } else if ("desktop" === n) {
              var r = s.realToScreen(e.real.x, "x"),
                o = s.realToScreen(e.real.y, "y");
              (t.globalAlpha = 0.8),
                this.powerup.draw(r, o, i, t),
                (t.globalAlpha = 1);
            }
          }),
          (o.press = function () {
            var t = this.mouse.touch,
              e = t.real;
            (this.p1.x = e.x),
              (this.p1.y = e.y),
              (this.p2.x = e.x),
              (this.p2.y = e.y),
              (this.active = !0);
          }),
          (o.hold = function () {
            var t = this.mouse.touch,
              e = t.real;
            (this.p2.x = e.x), (this.p2.y = e.y);
          }),
          (o.release = function () {
            var t = (this.scene.screen, this.scene.track),
              e = new s(this.p1.x, this.p1.y, t);
            t.addPowerup(e),
              (this.active = !1),
              this.toolhandler.addActionToTimeline({
                type: "add",
                objects: [e],
              });
          }),
          (e.exports = r);
      },
      {
        "../../math/cartesian": 15,
        "../../sector/powerups/bomb": 21,
        "../tool": 43,
      },
    ],
    36: [
      function (t, e) {
        var i = t("../../math/cartesian"),
          n = t("../tool"),
          s = t("../../sector/powerups/boost"),
          r = Math.PI,
          o = Math.atan2,
          a = Math.pow,
          h = Math.sqrt,
          c = Math.max,
          l = Math.min,
          u = function (t) {
            this.toolInit(t),
              (this.powerup = new s(0, 0, 0, t.scene.track)),
              (this.p1 = new i(0, 0)),
              (this.p2 = new i(0, 0)),
              (this.active = !1);
          },
          p = (u.prototype = new n());
        (p.toolInit = p.init),
          (p.toolUpdate = p.update),
          (p.powerup = null),
          (p.name = "boost"),
          (p.p1 = null),
          (p.p2 = null),
          (p.active = !1),
          (p.press = function () {
            var t = this.mouse.touch,
              e = t.real;
            (this.p1.x = e.x),
              (this.p1.y = e.y),
              (this.p2.x = e.x),
              (this.p2.y = e.y),
              (this.active = !0);
          }),
          (p.hold = function () {
            var t = this.mouse.touch,
              e = t.real;
            (this.p2.x = e.x), (this.p2.y = e.y);
          }),
          (p.release = function () {
            var t = this.scene.track,
              e = new s(this.p1.x, this.p1.y, this.powerup.angle, t);
            t.addPowerup(e),
              (this.active = !1),
              this.toolhandler.addActionToTimeline({
                type: "add",
                objects: [e],
              });
          }),
          (p.draw = function (t) {
            var e = this.mouse.touch,
              i = (e.pos, this.camera.zoom),
              n = this.scene.screen,
              s = this.scene.settings.device;
            if (this.active === !0) {
              var a = n.realToScreen(this.p1.x, "x"),
                h = n.realToScreen(this.p1.y, "y"),
                c = this.p1,
                l = this.p2,
                u = c.y - l.y,
                p = c.x - l.x,
                d = o(c.y - l.y, c.x - l.x);
              0 === p && 0 === u && (d = r - r / 2),
                0 > d && (d += 2 * r),
                this.drawPathToMouse(t, d),
                (this.powerup.angle = (d * (180 / r) - 90) | 0),
                this.powerup.draw(a, h, i, t);
            } else if ("desktop" === s) {
              (t.globalAlpha = 0.8), (this.powerup.angle = 0);
              var a = n.realToScreen(e.real.x, "x"),
                h = n.realToScreen(e.real.y, "y");
              this.powerup.draw(a, h, i, t), (t.globalAlpha = 1);
            }
          }),
          (p.drawPathToMouse = function (t, e) {
            var i = this.p1,
              n = this.p2,
              s = this.scene.screen,
              o = this.scene.camera.zoom,
              u = s.realToScreen(i.x, "x"),
              p = s.realToScreen(i.y, "y"),
              d = s.realToScreen(n.x, "x"),
              f = s.realToScreen(n.y, "y"),
              g = h(a(d - u, 2) + a(f - p, 2));
            30 * o > g && (g = 30 * o),
              (t.strokeStyle = "#ADCF7D"),
              (t.lineWidth = c(1, 2 * o)),
              t.beginPath(),
              t.moveTo(u, p),
              t.lineTo(u + g, p),
              t.stroke(),
              t.beginPath(),
              t.moveTo(u, p),
              t.lineTo(d, f),
              t.stroke(),
              t.closePath();
            var v = e + 180 * (r / 180),
              m = l(g, 50 * o);
            t.beginPath(),
              t.moveTo(u, p),
              t.arc(u, p, m, v, 0, !1),
              t.moveTo(u, p),
              t.stroke(),
              (t.fillStyle = "rgba(173, 207, 125,0.2)"),
              t.fill(),
              t.closePath();
          }),
          (e.exports = u);
      },
      {
        "../../math/cartesian": 15,
        "../../sector/powerups/boost": 22,
        "../tool": 43,
      },
    ],
    37: [
      function (t, e) {
        var i = t("../../math/cartesian"),
          n = t("../tool"),
          s = t("../../sector/powerups/checkpoint"),
          r = function (t) {
            this.toolInit(t),
              (this.powerup = new s(0, 0, t.scene.track)),
              (this.p1 = new i(0, 0)),
              (this.p2 = new i(0, 0)),
              (this.active = !1);
          },
          o = (r.prototype = new n());
        (o.toolInit = o.init),
          (o.toolUpdate = o.update),
          (o.powerup = null),
          (o.name = "checkpoint"),
          (o.p1 = null),
          (o.p2 = null),
          (o.active = !1),
          (o.draw = function (t) {
            var e = this.mouse.touch,
              i = (e.pos, this.camera.zoom),
              n = this.scene.settings.device,
              s = this.scene.screen;
            if (this.active === !0) {
              var r = s.realToScreen(this.p1.x, "x"),
                o = s.realToScreen(this.p1.y, "y");
              (t.globalAlpha = 0.4),
                this.powerup.draw(r, o, i, t),
                (t.globalAlpha = 1);
            } else if ("desktop" === n) {
              var r = s.realToScreen(e.real.x, "x"),
                o = s.realToScreen(e.real.y, "y");
              (t.globalAlpha = 0.8),
                this.powerup.draw(r, o, i, t),
                (t.globalAlpha = 1);
            }
          }),
          (o.press = function () {
            var t = this.mouse.touch,
              e = t.real;
            (this.p1.x = e.x),
              (this.p1.y = e.y),
              (this.p2.x = e.x),
              (this.p2.y = e.y),
              (this.active = !0);
          }),
          (o.hold = function () {
            var t = this.mouse.touch,
              e = t.real;
            (this.p2.x = e.x), (this.p2.y = e.y);
          }),
          (o.release = function () {
            var t = (this.scene.screen, this.scene.track),
              e = new s(this.p1.x, this.p1.y, t);
            t.addPowerup(e),
              (this.active = !1),
              this.toolhandler.addActionToTimeline({
                type: "add",
                objects: [e],
              });
          }),
          (e.exports = r);
      },
      {
        "../../math/cartesian": 15,
        "../../sector/powerups/checkpoint": 23,
        "../tool": 43,
      },
    ],
    38: [
      function (t, e) {
        var i = t("../../math/cartesian"),
          n = t("../tool"),
          s = t("../../sector/powerups/target"),
          r = function (t) {
            this.toolInit(t),
              (this.powerup = new s(0, 0, t.scene.track)),
              (this.p1 = new i(0, 0)),
              (this.p2 = new i(0, 0)),
              (this.active = !1);
          },
          o = (r.prototype = new n());
        (o.toolInit = o.init),
          (o.toolUpdate = o.update),
          (o.powerup = null),
          (o.name = "goal"),
          (o.p1 = null),
          (o.p2 = null),
          (o.active = !1),
          (o.draw = function (t) {
            var e = this.mouse.touch,
              i = (e.pos, this.camera.zoom),
              n = this.scene.settings.device,
              s = this.scene.screen;
            if (this.active === !0) {
              var r = s.realToScreen(this.p1.x, "x"),
                o = s.realToScreen(this.p1.y, "y");
              (t.globalAlpha = 0.4),
                this.powerup.draw(r, o, i, t),
                (t.globalAlpha = 1);
            } else if ("desktop" === n) {
              var r = s.realToScreen(e.real.x, "x"),
                o = s.realToScreen(e.real.y, "y");
              (t.globalAlpha = 0.8),
                this.powerup.draw(r, o, i, t),
                (t.globalAlpha = 1);
            }
          }),
          (o.press = function () {
            var t = this.mouse.touch,
              e = t.real;
            (this.p1.x = e.x),
              (this.p1.y = e.y),
              (this.p2.x = e.x),
              (this.p2.y = e.y),
              (this.active = !0);
          }),
          (o.hold = function () {
            var t = this.mouse.touch,
              e = t.real;
            (this.p2.x = e.x), (this.p2.y = e.y);
          }),
          (o.release = function () {
            var t = (this.scene.screen, this.scene.track),
              e = new s(this.p1.x, this.p1.y, t);
            t.addTarget(e),
              t.addPowerup(e),
              (this.active = !1),
              this.toolhandler.addActionToTimeline({
                type: "add",
                objects: [e],
              });
          }),
          (e.exports = r);
      },
      {
        "../../math/cartesian": 15,
        "../../sector/powerups/target": 26,
        "../tool": 43,
      },
    ],
    39: [
      function (t, e) {
        var i = t("../../math/cartesian"),
          n = t("../tool"),
          s = t("../../sector/powerups/gravity"),
          r = Math.PI,
          o = Math.atan2,
          a = Math.pow,
          h = Math.sqrt,
          c = Math.max,
          l = Math.min,
          u = function (t) {
            this.toolInit(t),
              (this.powerup = new s(0, 0, 0, t.scene.track)),
              (this.p1 = new i(0, 0)),
              (this.p2 = new i(0, 0)),
              (this.active = !1);
          },
          p = (u.prototype = new n());
        (p.toolInit = p.init),
          (p.toolUpdate = p.update),
          (p.powerup = null),
          (p.name = "gravity"),
          (p.p1 = null),
          (p.p2 = null),
          (p.active = !1),
          (p.press = function () {
            var t = this.mouse.touch,
              e = t.real;
            (this.p1.x = e.x),
              (this.p1.y = e.y),
              (this.p2.x = e.x),
              (this.p2.y = e.y),
              (this.active = !0);
          }),
          (p.hold = function () {
            var t = this.mouse.touch,
              e = t.real;
            (this.p2.x = e.x), (this.p2.y = e.y);
          }),
          (p.release = function () {
            var t = this.scene.track,
              e = new s(this.p1.x, this.p1.y, this.powerup.angle - 180, t);
            t.addPowerup(e),
              (this.active = !1),
              this.toolhandler.addActionToTimeline({
                type: "add",
                objects: [e],
              });
          }),
          (p.draw = function (t) {
            var e = this.mouse.touch,
              i = (e.pos, this.camera.zoom),
              n = this.scene.screen,
              s = this.scene.settings.device;
            if (this.active === !0) {
              var a = n.realToScreen(this.p1.x, "x"),
                h = n.realToScreen(this.p1.y, "y"),
                c = this.p1,
                l = this.p2,
                u = c.y - l.y,
                p = c.x - l.x,
                d = o(c.y - l.y, c.x - l.x);
              0 === p && 0 === u && (d = r - r / 2),
                0 > d && (d += 2 * r),
                this.drawPathToMouse(t, d),
                (this.powerup.angle = (d * (180 / r) + 90) | 0),
                this.powerup.draw(a, h, i, t);
            } else if ("desktop" === s) {
              (t.globalAlpha = 0.8), (this.powerup.angle = 180);
              var a = n.realToScreen(e.real.x, "x"),
                h = n.realToScreen(e.real.y, "y");
              this.powerup.draw(a, h, i, t), (t.globalAlpha = 1);
            }
          }),
          (p.drawPathToMouse = function (t, e) {
            var i = this.p1,
              n = this.p2,
              s = this.scene.screen,
              o = this.scene.camera.zoom,
              u = s.realToScreen(i.x, "x"),
              p = s.realToScreen(i.y, "y"),
              d = s.realToScreen(n.x, "x"),
              f = s.realToScreen(n.y, "y"),
              g = h(a(d - u, 2) + a(f - p, 2));
            30 * o > g && (g = 30 * o),
              (t.strokeStyle = "#A2B7D2"),
              (t.lineWidth = c(1, 2 * o)),
              t.beginPath(),
              t.moveTo(u, p),
              t.lineTo(u + g, p),
              t.stroke(),
              t.beginPath(),
              t.moveTo(u, p),
              t.lineTo(d, f),
              t.stroke(),
              t.closePath();
            var v = e + 180 * (r / 180),
              m = l(g, 50 * o);
            t.beginPath(),
              t.moveTo(u, p),
              t.arc(u, p, m, v, 0, !1),
              t.moveTo(u, p),
              t.stroke(),
              (t.fillStyle = "rgba(162, 183, 210,0.2)"),
              t.fill(),
              t.closePath();
          }),
          (e.exports = u);
      },
      {
        "../../math/cartesian": 15,
        "../../sector/powerups/gravity": 24,
        "../tool": 43,
      },
    ],
    40: [
      function (t, e) {
        var i = t("../../math/cartesian"),
          n = t("../tool"),
          s = t("../../sector/powerups/slowmo"),
          r = function (t) {
            this.toolInit(t),
              (this.powerup = new s(0, 0, t.scene.track)),
              (this.p1 = new i(0, 0)),
              (this.p2 = new i(0, 0)),
              (this.active = !1);
          },
          o = (r.prototype = new n());
        (o.toolInit = o.init),
          (o.toolUpdate = o.update),
          (o.powerup = null),
          (o.name = "slowmo"),
          (o.p1 = null),
          (o.p2 = null),
          (o.active = !1),
          (o.draw = function (t) {
            var e = this.mouse.touch,
              i = (e.pos, this.camera.zoom),
              n = this.scene.settings.device,
              s = this.scene.screen;
            if (this.active === !0) {
              var r = s.realToScreen(this.p1.x, "x"),
                o = s.realToScreen(this.p1.y, "y");
              (t.globalAlpha = 0.4),
                this.powerup.draw(r, o, i, t),
                (t.globalAlpha = 1);
            } else if ("desktop" === n) {
              var r = s.realToScreen(e.real.x, "x"),
                o = s.realToScreen(e.real.y, "y");
              (t.globalAlpha = 0.8),
                this.powerup.draw(r, o, i, t),
                (t.globalAlpha = 1);
            }
          }),
          (o.press = function () {
            var t = this.mouse.touch,
              e = t.real;
            (this.p1.x = e.x),
              (this.p1.y = e.y),
              (this.p2.x = e.x),
              (this.p2.y = e.y),
              (this.active = !0);
          }),
          (o.hold = function () {
            var t = this.mouse.touch,
              e = t.real;
            (this.p2.x = e.x), (this.p2.y = e.y);
          }),
          (o.release = function () {
            var t = (this.scene.screen, this.scene.track),
              e = new s(this.p1.x, this.p1.y, t);
            t.addPowerup(e),
              (this.active = !1),
              this.toolhandler.addActionToTimeline({
                type: "add",
                objects: [e],
              });
          }),
          (e.exports = r);
      },
      {
        "../../math/cartesian": 15,
        "../../sector/powerups/slowmo": 25,
        "../tool": 43,
      },
    ],
    41: [
      function (t, e) {
        var i = t("../math/cartesian"),
          n = t("./tool"),
          s = t("../utils/path"),
          r = t("../sector/physicsline"),
          o = t("../sector/sceneryline"),
          a = Math.min,
          h = Math.max,
          c = Math.abs,
          l = function (t) {
            this.toolInit(t),
              (this.p1 = new i(0, 0)),
              (this.p2 = new i(0, 0)),
              (this.selectedElements = []),
              (this.dashOffset = 0);
          },
          u = (l.prototype = new n());
        (u.toolInit = u.init),
          (u.name = "Select"),
          (u.passive = !1),
          (u.active = !1),
          (u.p1 = null),
          (u.p2 = null),
          (u.selectedElements = []),
          (u.dashOffset = 0),
          (u.selectedSectors = []),
          (u.press = function () {
            var t = this.mouse.touch.real;
            (this.passive = !1),
              (this.active = !0),
              (this.p1.x = t.x),
              (this.p1.y = t.y),
              (this.p2.x = t.x),
              (this.p2.y = t.y);
          }),
          (u.hold = function () {
            var t = this.mouse.touch.real;
            (this.p2.x = t.x), (this.p2.y = t.y);
          }),
          (u.unselectElements = function () {
            for (
              var t = this.selectedElements, e = t.length, i = 0;
              e > i;
              i++
            ) {
              var n = t[i];
              n instanceof r && n.highlightLine(!1),
                n instanceof o && n.highlightLine(!1);
            }
          }),
          (u.release = function () {
            this.unselectElements();
            for (
              var t =
                  (performance.now(),
                  this.scene.track.select(this.p1, this.p2)),
                e = t.length,
                i = [],
                n = 0;
              e > n;
              n++
            ) {
              var s = t[n];
              this.intersectsLine(s.p1, s.p2) &&
                (s.removeAllReferences(), i.push(s));
            }
            (this.selectedElements = i),
              (this.active = !1),
              (this.passive = !0);
          }),
          (u.buildPaths = function (t) {
            for (var e = []; t.length > 0; ) {
              var i = new s();
              i.build(t), e.push(i);
            }
          }),
          (u.intersectsLine = function (t, e) {
            var i = a(this.p1.y, this.p2.y),
              n = a(this.p1.x, this.p2.x),
              s = h(this.p1.y, this.p2.y),
              r = h(this.p1.x, this.p2.x),
              o = c(r - n),
              l = c(i - s),
              u = t.x,
              p = e.x;
            if (
              (t.x > e.x && ((u = e.x), (p = t.x)),
              p > n + o && (p = n + o),
              n > u && (u = n),
              u > p)
            )
              return !1;
            var d = t.y,
              f = e.y,
              g = e.x - t.x;
            if (c(g) > 1e-7) {
              var v = (e.y - t.y) / g,
                m = t.y - v * t.x;
              (d = v * u + m), (f = v * p + m);
            }
            if (d > f) {
              var y = f;
              (f = d), (d = y);
            }
            return f > i + l && (f = i + l), i > d && (d = i), d > f ? !1 : !0;
          }),
          (u.toScreen = function (t, e) {
            var i = this.scene.camera,
              n = this.scene.screen;
            return (t - i.position[e]) * i.zoom + n.center[e];
          }),
          (u.draw = function () {
            var t = this.scene,
              e = (t.game.canvas, t.game.canvas.getContext("2d"));
            if ((this.drawText(e), this.active || this.passive)) {
              var i = this.p1.toScreen(this.scene),
                n = this.p2.toScreen(this.scene),
                s = n.x - i.x,
                r = n.y - i.y;
              e.save(),
                e.setLineDash &&
                  (e.setLineDash([6]), (e.lineDashOffset = this.dashOffset)),
                this.active
                  ? (e.beginPath(),
                    e.rect(i.x, i.y, s, r),
                    (e.fillStyle = "rgba(24, 132, 207, 0.3)"),
                    e.fill(),
                    (e.lineWidth = 2),
                    (e.strokeStyle = "rgba(24, 132, 207, 0.7)"),
                    e.stroke())
                  : this.passive &&
                    ((e.strokeStyle = "rgba(24, 132, 207, 0.7)"),
                    (e.lineWidth = 2),
                    e.strokeRect(i.x, i.y, s, r)),
                e.restore(),
                this.dashOffset > 22 && (this.dashOffset = 0),
                this.dashOffset++;
            }
          }),
          (u.reset = function () {
            (this.p1.x = 0),
              (this.p1.y = 0),
              (this.p2.x = 0),
              (this.p2.y = 0),
              (this.active = !1),
              (this.passive = !1),
              this.unselectElements();
          }),
          (u.drawSectors = function () {
            for (
              var t = this.scene,
                e = t.camera,
                i = t.screen,
                n = t.game.canvas.getContext("2d"),
                s = e.zoom,
                r = e.position,
                o = t.screen.center,
                a = this.settings.drawSectorSize * s,
                h = (r.x * s) / a,
                c = (r.y * s) / a,
                l = i.width / a,
                u = i.height / a,
                p = u / 2,
                d = l / 2,
                f = h - d - 1,
                g = c - p - 1,
                v = h + d,
                m = c + p,
                y = this.totalSectors,
                w = y.length,
                _ = 0;
              w > _;
              _++
            ) {
              var x = y[_],
                b = x.row,
                T = x.column;
              if (T >= f && v >= T && b >= g && m >= b) {
                x.drawn === !1 && x.image === !1 && x.draw();
                var k = T * a - h * a + o.x,
                  S = b * a - c * a + o.y;
                (k = 0 | k),
                  (S = 0 | S),
                  x.image
                    ? n.drawImage(x.image, k, S)
                    : n.drawImage(x.canvas, k, S);
              } else x.drawn && x.clear();
            }
          }),
          (u.drawText = function (t) {
            {
              var e = this.name,
                i = this.game.pixelRatio,
                n = this.scene;
              n.game.canvas, this.radius;
            }
            t.save(),
              (t.fillStyle = "#000000"),
              (t.font = 12 * i + "pt arial"),
              t.fillText(e, 10 * i, 20 * i),
              (t.font = 8 * i + "pt arial");
          }),
          (u.close = function () {
            (this.dashOffset = 0),
              (this.selectedElements = []),
              (this.mouse = null),
              (this.camera = null),
              (this.scene = null),
              (this.toolHandler = null),
              (this.p2 = null),
              (this.p1 = null),
              (this.active = !1),
              (this.passive = !1);
          }),
          (e.exports = l);
      },
      {
        "../math/cartesian": 15,
        "../sector/physicsline": 19,
        "../sector/sceneryline": 27,
        "../utils/path": 55,
        "./tool": 43,
      },
    ],
    42: [
      function (t, e) {
        var i = t("../math/cartesian"),
          n = t("./tool"),
          s =
            (Math.sqrt,
            Math.pow,
            function (t) {
              (this.game = t.scene.game),
                this.toolInit(t),
                (this.p1 = new i(0, 0)),
                (this.p2 = new i(0, 0)),
                (this.active = !1),
                (this.options = {});
            }),
          r = (s.prototype = new n());
        (r.toolInit = r.init),
          (r.toolUpdate = r.update),
          (r.toolDraw = r.draw),
          (r.name = "StraightLine"),
          (r.p1 = null),
          (r.p2 = null),
          (r.active = !1),
          (r.reset = function () {
            this.active = !1;
          }),
          (r.press = function () {
            if (!this.active) {
              var t = this.mouse.touch.real;
              (this.p1.x = t.x), (this.p1.y = t.y), (this.active = !0);
            }
          }),
          (r.getOptions = function () {
            var t = this.toolhandler,
              e = this.options;
            return (
              (e.lineType = t.options.lineType), (e.snap = t.options.snap), e
            );
          }),
          (r.hold = function () {
            var t = this.mouse.touch.real;
            (this.p2.x = t.x),
              (this.p2.y = t.y),
              this.toolhandler.moveCameraTowardsMouse();
          }),
          (r.release = function () {
            var t = this.p1,
              e = this.p2,
              i = this.scene.track,
              n = this.toolhandler,
              s = !1;
            (s =
              "physics" === n.options.lineType
                ? i.addPhysicsLine(t.x, t.y, e.x, e.y)
                : i.addSceneryLine(t.x, t.y, e.x, e.y)),
              s && n.addActionToTimeline({ type: "add", objects: [s] });
            var r = n.snapPoint;
            (r.x = e.x), (r.y = e.y), (this.active = !1);
          }),
          (r.update = function () {
            this.toolUpdate();
            var t = this.toolhandler;
            t.options.snap &&
              ((this.active = !0), (this.p1 = t.snapPoint), this.hold());
          }),
          (r.draw = function () {
            var t = this.scene,
              e = (t.game.canvas, t.game.canvas.getContext("2d")),
              i = t.camera,
              n = i.zoom;
            this.drawCursor(e),
              this.active &&
                (this.drawLine(e, n),
                this.drawPoint(e, this.p1, n),
                this.drawPoint(e, this.p2, n));
          }),
          (r.drawCursor = function (t) {
            var e = this.mouse.touch,
              i = e.real.toScreen(this.scene),
              n = this.camera.zoom,
              s = this.toolhandler,
              r = (s.options.lineType, s.options.grid),
              o = "#1884cf";
            if (r) {
              var a = 5 * n;
              t.beginPath(),
                t.moveTo(i.x, i.y - a),
                t.lineTo(i.x, i.y + a),
                t.moveTo(i.x - a, i.y),
                t.lineTo(i.x + a, i.y),
                (t.lineWidth = 1 * n),
                t.stroke();
            } else
              t.beginPath(),
                t.arc(i.x, i.y, 1 * n, 0, 2 * Math.PI, !1),
                (t.lineWidth = 1),
                (t.fillStyle = o),
                t.fill();
          }),
          (r.drawText = function (t) {
            {
              var e = this.name,
                i = this.game.pixelRatio,
                n = this.scene;
              n.game.canvas;
            }
            (t.fillStyle = "#000000"),
              (t.font = 12 * i + "pt arial"),
              t.fillText(e, 10 * i, 20 * i),
              (t.font = 8 * i + "pt arial");
          }),
          (r.drawPoint = function (t, e, i) {
            var n = e.toScreen(this.scene);
            t.beginPath(),
              t.arc(n.x, n.y, 1 * i, 0, 2 * Math.PI, !1),
              (t.lineWidth = 1),
              (t.fillStyle = "#1884cf"),
              t.fill();
          }),
          (r.drawLine = function (t, e) {
            var i = this.scene,
              n = (i.game.canvas, 2 * e > 0.5 ? 2 * e : 0.5),
              s = this.toolhandler,
              r = s.options.lineType,
              o = "physics" === r ? "#000" : "#AAA";
            t.beginPath(),
              (t.lineWidth = n),
              (t.lineCap = "round"),
              (t.strokeStyle = o);
            var a = this.p1.toScreen(this.scene),
              h = this.p2.toScreen(this.scene);
            t.moveTo(a.x, a.y), t.lineTo(h.x, h.y), t.stroke();
          }),
          (e.exports = s);
      },
      { "../math/cartesian": 15, "./tool": 43 },
    ],

    444: [
      // ==UserScript==
// @name         select tool
// @version      2024-01-11
// @description  oh god another one !?!
// @author       pie42
// @match        https://www.freeriderhd.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=undefined.
// @grant        none
// ==/UserScript==

function load() {
    // this is more hacky than i'd like it to be but it works
    let zv = GameManager.game.currentScene.camera.position.factor(0),
        vector = (x = 0, y = 0) => {return zv.factor(0).add({x, y})},
        hovered,
        selected,
        hoverList,
        selectList,
        // used for recreating parts of the selectList when playing
        // will be done in the sector the player's in and nearby sectors, and just left until movement starts again
        hoverPhysicsList = {},
        selectPhysicsList = {},
        selectOffset = vector(),
        // since this is used to track, not render, we can get away with only having one of these
        pointOffset = vector(),
        isHoverList = false,
        isSelectList = false,
        hoverPoint,
        selectPoint,
        connected,
        connectedPoint,
        isSelectedUpdated = true,
        // used to temporarily recreate the selected line while you're playing the track (so it feels nicer)
        isSelectIntangible = true,
        tempSelect;
    // for debugging
    let frameMinDist,
        frameBestLine;
    // render info
    let powerups = {
        // the colors for these are the last 2 arguments, and go normal color, nostalgia mode
        "bomb": [20, '#d12929', '#f00'],
        "boost": [Math.sqrt(1000), '#8ac932', '#ff0'],
        "checkpoint": [26, '#826cdc', '#00f'],
        "gravity": [Math.sqrt(1000), '#376eb7', '#0f0'],
        "slowmo": [26, '#733', '#733'],
        "goal": [26, '#fae335', '#ff0'],
        "teleport": [Math.sqrt(1000), '#dd45ec', '#f0f'],
        "antigravity": [Math.sqrt(1000), '#09faf3', '#0ff'],
        "blob": [30, '#a784c5', '#cdbade'],
        "balloon": [30, '#f02728', '#f57070'],
        "helicopter": [30, '#f2902e', '#f6b36f'],
        "truck": [30, '#94d44e', '#b9e38c'],
    },
        polyMod = GameManager.game?.mod;
    window.selected = selected;
    window.hovered = hovered;
    const HOVER_DIST = 10;
    // old line - used to work until mysterious unannounced chrome changes killed it
    //class P extends GameManager.game.currentScene.toolHandler.tools.straightline.__proto__.__proto__.constructor {
    class SelectTool {
        constructor(s) {
            // new line - since i can't seem to use super anymore, i can accomplish the same thing with a temporary variable
            let supa = Object.create(GameManager.game.currentScene.toolHandler.tools.straightline.__proto__.__proto__);
            for (let i in supa) {
                if (!this[i])
                    this.__proto__[i] = supa[i];
            }
            this.supa = supa;
            this.toolUpdate = supa.update;
            console.log(supa, this);
            supa.init.apply(this, [s]);
            this.toolHandler = s;
            this.p1 = undefined;
            this.p2 = undefined;
            this.dashOffset = 0;
            this.name = 'select';
            this.down = false;
            // make a copy
            this.oldMouse = this.mouse.touch.real.factor(1);
        }

        get selected() {
            return isSelectList ? selectList : selected ? [selected] : [];
        }

        get hovered() {
            return isHoverList ? hoverList : hovered ? [hovered] : [];
        }

        press() {
            this.down = true;
            if (hovered && hovered === tempSelect?.[0]) {
                hovered = selected;
                console.log('clicked on temp :P');
                if (selectPoint && selected) {
                    if (selectPoint.x == selected.p1.x && selectPoint.y == selected.p1.y) {
                        selectPoint = selected.p1;
                    } else if (selectPoint.x == selected.p2.x && selectPoint.y == selected.p2.y) {
                        selectPoint = selected.p2;
                    }
                }
            }
            if (selected && selected != hovered) {
                let a = [recreate(selected)];
                if (selectPoint && connected) {
                    connected.removeAllReferences();
                    a = [a[0], recreate(connected)];
                    connected = connected.newVersion;
                }
                if (selectOffset.x || selectOffset.y) {
                    let {x, y} = selectOffset;
                    this.scene.toolHandler.addActionToTimeline({
                        objects: a,
                        type: 'transform',
                        move: {x, y},
                        applied: true,
                    });
                    // idk man this is wack
                    if (selected.p1) {
                        selected.p1.inc(selectOffset);
                        selected.p2.inc(selectOffset);
                    }
                    selectOffset = vector();
                } else if (pointOffset.x || pointOffset.y) {
                    let pointName = (selectPoint.x == selected.p1.x && selectPoint.y == selected.p1.y) ? 'p1' : 'p2',
                        points = [pointName],
                        objects = [selected],
                        {x, y} = pointOffset;
                    if (connected) {
                        points.push(connectedPoint);
                        objects.push(connected);
                    }
                    this.scene.toolHandler.addActionToTimeline({
                        objects,
                        points,
                        type: 'transform',
                        move: {x, y},
                        applied: true,
                    });
                    pointOffset = vector();
                }
                connected = undefined;
                console.log('recreated', a);
            }
            if (isSelectList && (hovered || !pointrect(this.mouse.touch.real, this.p1, this.p2))) {
                for (let i of selectList) {
                    i.removeAllReferences();
                }
                let a = selectList.map(s => recreate(s));
                if (selectOffset.x || selectOffset.y) {
                    let {x, y} = selectOffset;
                    this.scene.toolHandler.addActionToTimeline({
                        objects: a,
                        type: 'transform',
                        move: {x, y},
                        applied: true,
                    });
                }
                console.log('recreated', a);
            }
            if (hovered) {
                // TO-DO: find a better place to put / store this
                let oldConnected = [connected, connectedPoint];
                if (hovered != selected)
                    selectOffset = vector();
                else {
                    tempSelect?.[0]?.removeAllReferences?.();
                    tempSelect = undefined;
                    isSelectIntangible = true;
                    if (selectPoint && connected) {
                        connected.removeAllReferences();
                        recreate(connected);
                        connected = undefined;
                    }
                }
                selected = hovered;
                isHoverList = false;
                window.selected = hovered;
                if (selected) {
                    console.log('selected', selected);
                    selected.removeAllReferences();
                    let minDist = HOVER_DIST / this.scene.camera.zoom,
                        minPoint = undefined;
                    if (selected.p1) {
                        for (let i of [selected.p1, selected.p2]) {
                            let dist = pointsdf(this.mouse.touch.real, i.add(selectOffset));
                            if (dist < minDist) {
                                minDist = dist;
                                minPoint = i;
                            }
                        }
                        if (minPoint) {
                            let size = this.scene.track.settings.drawSectorSize,
                                sectors = this.scene.track.sectors.drawSectors,
                                sectorPos = minPoint.factor(1 / size),
                                sector = sectors[Math.floor(sectorPos.x)]?.[Math.floor(sectorPos.y)],
                                lines = sector?.['highlight' in selected ? "physicsLines" : "sceneryLines"] || [];
                            if (connected && !connected.newVersion) {
                                connected.removeAllReferences();
                                recreate(connected);
                            }
                            connected = undefined;
                            for (let i of lines) {
                                if (!i.remove && i.p1.x == minPoint.x && i.p1.y == minPoint.y) {
                                    connected = i;
                                    connectedPoint = 'p1';
                                    break;
                                } else if (!i.remove && i.p2.x == minPoint.x && i.p2.y == minPoint.y) {
                                    connected = i;
                                    connectedPoint = 'p2';
                                    break;
                                }
                            }
                            if (connected) {
                                connected.removeAllReferences();
                                console.log('connected to', connected);
                            }
                        }
                    }
                    if (selectPoint != minPoint) {
                        if (selectPoint == undefined && (selectOffset.x || selectOffset.y)) {
                            let {x, y} = selectOffset;
                            this.scene.toolHandler.addActionToTimeline({
                                objects: [selected],
                                type: 'transform',
                                move: {x, y},
                                applied: true,
                            });
                            selected.p1.inc(selectOffset);
                            selected.p2.inc(selectOffset);
                            selectOffset = vector();
                        } else if (pointOffset.x || pointOffset.y) {
                            let pointName = (selectPoint.x == selected.p1.x && selectPoint.y == selected.p1.y) ? 'p1' : 'p2',
                                points = [pointName],
                                objects = [selected],
                                {x, y} = pointOffset;
                            if (oldConnected[0]) {
                                points.push(oldConnected[1]);
                                objects.push(oldConnected[0]);
                            }
                            this.scene.toolHandler.addActionToTimeline({
                                objects,
                                points,
                                type: 'transform',
                                move: {x, y},
                                applied: true,
                            });
                            pointOffset = vector();
                        }
                    }
                    selectPoint = minPoint;
                }
                isSelectList = false;
                selectList = selectPhysicsList = undefined;
            } else if (this.p1 && pointrect(this.mouse.touch.real, this.p1, this.p2)) {
                selected = undefined;
                console.log('in rect!');
            } else {
                isSelectedUpdated = false;
                isHoverList = true;
                hoverList = [];
                this.p1 = this.mouse.touch.real.factor(1);
                this.p2 = this.mouse.touch.real.factor(1);
            }
        }

        hold() {
            if (isHoverList) {
                this.p2 = this.mouse.touch.real.factor(1);
            }
        }

        update(force = false) {
            const mousePos = this.mouse.touch.real;
            shouldUpdate: if (force || !(mousePos.x == this.oldMouse.x && mousePos.y == this.oldMouse.y)) {
                if (isHoverList)
                    this.p2 = mousePos.factor(1);
                // this is my current best guess for if there exists something to move and we should move it
                if (this.scene.state.paused && this.down && this.selected.length && isSelectedUpdated) {
                    // remove the line if it's been temporarily recreated
                    if (!isSelectIntangible) {
                        isSelectIntangible = true;
                        tempSelect?.[0]?.removeAllReferences?.();
                        tempSelect = undefined;
                        if (connected) {
                            connected.removeAllReferences();
                        }
                    }
                    if (tempSelect && tempSelect.length) {
                        for (let i of tempSelect) {
                            i.removeAllReferences();
                        }
                        for (let x in selectPhysicsList) {
                            let row = selectPhysicsList[x];
                            for (let y in row) {
                                let cell = row[y];
                                if (cell.mark) {
                                    cell.mark = false;
                                    for (let line of cell) {
                                        line.temp = false;
                                    }
                                }
                            }
                        }
                        isSelectIntangible = true;
                        tempSelect = undefined;
                    }
                    let dMouse = mousePos.sub(this.oldMouse);
                    dMouse.x = Math.round(dMouse.x);
                    dMouse.y = Math.round(dMouse.y);
                    if (this.scene.toolHandler.options.grid) {
                        let gridSize = this.scene.toolHandler.options.gridSize;
                        dMouse.x = Math.round(dMouse.x / gridSize) * gridSize;
                        dMouse.y = Math.round(dMouse.y / gridSize) * gridSize;
                    }
                    // points get moved seperately (since it's only one point moving rather than a whole line or group of objects)
                    if (selectPoint) {
                        selectPoint.inc(dMouse);
                        selected.pp = selected.p2.sub(selected.p1);
                        selected.len = selected.pp.len();
                        if (connected) {
                            connected[connectedPoint].inc(dMouse);
                            connected.pp = connected.p2.sub(connected.p1);
                            connected.len = connected.pp.len();
                        }
                        pointOffset = dMouse.add(pointOffset);
                    } else {
                        // by switching to the selectOffset for everything, this is a lot simpler :)
                        selectOffset = dMouse.add(selectOffset);
                        if (isSelectList) {
                            this.p1.inc(dMouse);
                            this.p2.inc(dMouse);
                        }
                    }
                    break shouldUpdate;
                }

                if (isHoverList) {
                    this.multiHover();
                } else {
                    this.singleHover(mousePos);
                }
            }
            if (force) return;
            this.oldMouse = this.mouse.touch.real.factor(1);
            this.toolUpdate();
        }

        singleHover(mousePos) {
            let minDist = 1000,
                bestLine = undefined,
                adjustedDist = 2 * HOVER_DIST / this.scene.camera.zoom;
            // selected doesn't exist on the track, so we have to check it separately
            if (selected) {
                let dist = selected.p1 ?
                    linesdf(mousePos.sub(selectOffset), selected) :
                pointsdf(mousePos.sub(selectOffset), selected);
                if (dist < minDist) {
                    minDist = dist;
                    bestLine = selected;
                }
            }

            let sectorSize = this.scene.settings.drawSectorSize,
                sectorPos = mousePos.factor(1 / sectorSize);
            sectorPos.x = Math.floor(sectorPos.x);
            sectorPos.y = Math.floor(sectorPos.y);
            let currentSectorData = this.testSectorSingle(sectorPos);
            if (currentSectorData[0] < minDist) {
                [minDist, bestLine] = currentSectorData;
            }
            // this is all to figure out which sectors we even need to check
            // i.e. within range to have a line that can possibly be close enough
            // the position of the sector in track-space
            let sectorTrackPos = sectorPos.factor(sectorSize),
                // the position of the mouse within the sector
                posInSector = mousePos.sub(sectorTrackPos),
                // a zero vector (for checking the top left)
                zeroVector = posInSector.factor(0),
                // a vector of just the sector size (for checking the bottom right)
                maxPos = zeroVector.add({x: sectorSize, y: sectorSize}),
                sectorsToCheck = [],
                positions = [zeroVector, posInSector, maxPos];
            for (let i = -1; i < 2; i++) {
                let x = positions[i + 1].x;
                for (let j = -1; j < 2; j++) {
                    // we don't need to re-check the current sector
                    if (!i && !j)
                        continue;
                    let y = positions[j + 1].y;
                    if (pointsdf(mousePos, {x, y}) <= adjustedDist * 1.5) {
                        sectorsToCheck.push([i, j]);
                    }
                }
            }

            for (let i of sectorsToCheck) {
                let sectorData = this.testSectorSingle(sectorPos.add(i));
                if (sectorData[0] < minDist) {
                    [minDist, bestLine] = sectorData;
                }
            }
            [frameMinDist, frameBestLine] = [minDist, bestLine];
            if (minDist < adjustedDist) {
                hovered = bestLine;
            } else {
                hovered = undefined;
                return;
            }
            minDist = HOVER_DIST / this.scene.camera.zoom;
            let minPoint = undefined,
                isSelected = hovered == selected;
            if (hovered.p1) {
                for (let i of [hovered.p1, hovered.p2]) {
                    let dist = pointsdf(mousePos, i.add(isSelected ? selectOffset : vector()));
                    if (dist < minDist) {
                        minDist = dist;
                        minPoint = i;
                    }
                }
            }
            hoverPoint = minPoint;
        }

        multiHover() {
            // this logic is very simple: decide which sectors to add, then add everything necessary from them
            let sectorSize = this.scene.settings.drawSectorSize,
                minVec = {x: Math.min(this.p1.x, this.p2.x), y: Math.min(this.p1.y, this.p2.y)},
                maxVec = {x: Math.max(this.p1.x, this.p2.x), y: Math.max(this.p1.y, this.p2.y)},
                lines = [];
            hoverPhysicsList = {};
            for (let x = Math.floor(minVec.x / sectorSize); x <= Math.ceil(maxVec.x / sectorSize); x++) {
                let row = this.scene.track.sectors.drawSectors[x];
                if (!row) continue;
                hoverPhysicsList[x] = {};
                for (let y = Math.floor(minVec.y / sectorSize); y <= Math.ceil(maxVec.y / sectorSize); y++) {
                    hoverPhysicsList[x][y] = [];
                    lines.push(...this.testSectorMulti({x, y}, minVec, maxVec).filter(i => !lines.includes(i) && !i.remove));
                }
            }
            hoverList = lines;
        }

        release() {
            this.down = false;
            isSelectedUpdated = true;
            if (isHoverList) {
                selected = undefined;
                isSelectList = true;
                selectList = [...hoverList];
                selectPhysicsList = hoverPhysicsList;
                hoverList = [];
                isHoverList = false;
                selectOffset = vector();
                for (let i of selectList) {
                    i.removeAllReferences();
                }
                console.log('selected!', selectList);
            }
        }

        draw() {
            let ctx = this.game.canvas.getContext('2d');
            // debug (draw info about the best line
            /*//
            if (frameBestLine) {
                if (frameBestLine.rp1) {
                let rp1 = frameBestLine.p1.toScreen(this.scene),
                    rp2 = frameBestLine.p2.toScreen(this.scene),
                    rpp = frameBestLine.pp;
                ctx.strokeStyle = '#ff0000';
                ctx.beginPath();
                ctx.moveTo(rp1.x, rp1.y);
                ctx.moveTo(rp2.x, rp2.y);
                ctx.stroke();
                ctx.fillText(frameMinDist, rp1.x - rpp.x * Math.sign(rpp.x) / 2, rp1.y - rpp.y * Math.sign(rpp.y) / 2);
                } else {
                    let pos = scene.camera.position.factor(0).add(frameBestLine).toScreen(scene)
                    ctx.fillText(frameMinDist, pos.x + 10, pos.y + 10);
                }
            }
            //*/
            if (!isHoverList && !isSelectList) return;
            let rp1 = this.p1.toScreen(this.scene),
                rp2 = this.p2.toScreen(this.scene),
                w = rp2.x - rp1.x,
                h = rp2.y - rp1.y;
            ctx.save();
            if (ctx.setLineDash)
                ctx.setLineDash([6]);
            ctx.lineDashOffset = this.dashOffset++;
            ctx.beginPath();
            ctx.rect(rp1.x, rp1.y, w, h);
            ctx.fillStyle = "rgba(24, 132, 207, 0.3)";
            isHoverList && ctx.fill();
            ctx.strokeStyle = "rgba(24, 132, 207, 0.7)";
            ctx.lineWidth = 2;
            ctx.stroke();
            ctx.restore();
            this.dashOffset %= 23;
        }

        testSectorSingle(sectorPos) {
            let mousePos = this.mouse.touch.real,
                sector = this.scene.track.sectors.drawSectors?.[sectorPos.x]?.[sectorPos.y],
                minDist = 1000,
                bestLine = undefined;
            if (sector == undefined) {
                return [minDist, bestLine];
            }
            for (let i of sector.physicsLines) {
                if (i.remove)
                    continue;
                let dist = linesdf(mousePos, i);
                if (dist < minDist && i != tempSelect) {
                    minDist = dist;
                    bestLine = i;
                }
            }
            for (let i of sector.sceneryLines) {
                if (i.remove)
                    continue;
                let dist = linesdf(mousePos, i);
                if (dist < minDist) {
                    minDist = dist;
                    bestLine = i;
                }
            }
            for (let i of sector.powerups.all) {
                if (i.remove)
                    continue;
                let dist = pointsdf(mousePos, i);
                if (dist < minDist) {
                    minDist = dist;
                    bestLine = i;
                }
            }
            return [minDist, bestLine];
        }

        testSectorMulti(sectorPos, minVec, maxVec) {
            let sectorSize = this.scene.settings.drawSectorSize,
                sectorTrackPos = {x: sectorPos.x * sectorSize, y: sectorPos.y * sectorSize},
                sector = this.scene.track.sectors.drawSectors?.[sectorPos.x]?.[sectorPos.y];
            if (sector == undefined)
                return [];
            // see if we can just return the whole sector
            if (minVec.x <= sectorTrackPos.x &&
                minVec.y <= sectorTrackPos.y &&
                maxVec.x >= sectorTrackPos.x + sectorSize &&
                maxVec.y >= sectorTrackPos.y + sectorSize) {
                hoverPhysicsList[sectorPos.x][sectorPos.y] = sector.physicsLines.filter(i => !i.remove)
                    .concat(sector.powerups.all.filter(i => !i.remove));
                return hoverPhysicsList[sectorPos.x][sectorPos.y]
                    .concat(sector.sceneryLines.filter(i => !i.remove));
            }
            let toReturn = [];
            for (let i of sector.physicsLines) {
                if (i.remove)
                    continue;
                if (rectcollide(i.p1, i.p2, minVec, maxVec))
                    toReturn.push(i);
            }
            for (let i of sector.powerups.all) {
                if (i.remove)
                    continue;
                if (pointrect(i, minVec, maxVec))
                    toReturn.push(i);
            }
            hoverPhysicsList[sectorPos.x][sectorPos.y] = [...toReturn];
            for (let i of sector.sceneryLines) {
                if (i.remove)
                    continue;
                if (rectcollide(i.p1, i.p2, minVec, maxVec))
                    toReturn.push(i);
            }
            return toReturn;
        }
    }

    let game = GameManager.game,
        scene = game.currentScene,
        active = false;

    scene.toolHandler.registerTool(SelectTool);
    let selectTool = scene.toolHandler.tools.select;

    // fix undo / redo for moved objects
    // this is a little bit weird but it seems to work:
    /* - if anything in toRevert has been removed and not recreated, we assume it's been selected and cancel the action
     * (still debating how to actually undo the lines (i.e. whether to use the same lines or recreate them every time))
     */
    scene.toolHandler.revertAction = (old => () => {
        let oldPointer = scene.toolHandler.actionTimelinePointer;
        old.apply(scene.toolHandler);
        if (oldPointer == scene.toolHandler.actionTimelinePointer) return;
        let toRevert = scene.toolHandler.actionTimeline[scene.toolHandler.actionTimelinePointer];
        if (toRevert) toRevert.objects = toRevert.objects.map(i => {while (i.newVersion) i = i.newVersion; return i});
        if (toRevert && toRevert.type == 'transform' && toRevert.applied) {
            if (toRevert.objects.some(i => i.remove)) {
                scene.toolHandler.actionTimelinePointer = oldPointer;
                return;
            }
            //*//
            toRevert.objects = toRevert.objects.map(i => {
                if (i.remove) {
                    while (i.newVersion)
                        i = i.newVersion;
                }
                i.removeAllReferences();
                return recreate(i, {x: -toRevert.move.x, y: -toRevert.move.y});
            });
            //*/
            /*//
            toRevert.objects.forEach(i => {
                while (i.newVersion) i = i.newVersion;
                i.removeAllReferences();
            });
            scene.track.cleanTrack();
            toRevert.objects.forEach((i, j) => {
                if (i.p1) {
                    let {x, y} = toRevert.move,
                        backwards = {x: -x, y: -y};
                    if (toRevert.points?.[j]) {
                        i[toRevert.points[j]].inc(backwards);
                    } else {
                        i.p1.inc(backwards);
                        i.p2.inc(backwards);
                    }
                } else {
                    i.x -= toRevert.move.x;
                    i.y -= toRevert.move.y;
                }
            });
            scene.toolHandler.addObjects(toRevert.objects);
            //*/
            toRevert.applied = false;
        }
    })(scene.toolHandler.revertAction);

    scene.toolHandler.applyAction = (old => () => {
        let oldPointer = scene.toolHandler.actionTimelinePointer;
        old.apply(scene.toolHandler);
        if (oldPointer == scene.toolHandler.actionTimelinePointer) return;
        let toRevert = scene.toolHandler.actionTimeline[scene.toolHandler.actionTimelinePointer - 1];
        if (toRevert) toRevert.objects = toRevert.objects.map(i => {while (i.newVersion) i = i.newVersion; return i});
        if (toRevert && toRevert.type == 'transform' && !toRevert.applied) {
            if (toRevert.objects.some(i => i.remove)) {
                scene.toolHandler.actionTimelinePointer = oldPointer;
                return;
            }
            //*//
            toRevert.objects = toRevert.objects.map(i => {
                if (i.remove) {
                    while (i.newVersion)
                        i = i.newVersion;
                }
                i.removeAllReferences();
                return recreate(i, {x: toRevert.move.x, y: toRevert.move.y});
            });
            //*/
            /*//
            toRevert.objects.forEach(i => {
                while (i.newVersion) i = i.newVersion;
                i.removeAllReferences();
            });
            scene.track.cleanTrack();
            toRevert.objects.forEach((i, j) => {
                if (i.p1) {
                    if (toRevert.points?.[j]) {
                        i[toRevert.points[j]].inc(toRevert.move);
                    } else {
                        i.p1.inc(toRevert.move);
                        i.p2.inc(toRevert.move);
                    }
                } else {
                    i.x += toRevert.move.x;
                    i.y += toRevert.move.y;
                }
            });
            scene.toolHandler.addObjects(toRevert.objects);
            //*/
            toRevert.applied = true;
        }
    })(scene.toolHandler.applyAction);

    // also patch removeObjects and addObjects just for fun
    scene.toolHandler.removeObjects = (old => (t) => {
        for (let i in t)
            while (t[i].newVersion)
                t[i] = t[i].newVersion;
        //t = t.map(i => {while (i.newVersion) i = i.newVersion; return i;});
        old.apply(scene.toolHandler, [t]);
    })(scene.toolHandler.removeObjects);

    scene.toolHandler.addObjects = (old => (t) => {
        for (let i in t)
            while (t[i].newVersion)
                t[i] = t[i].newVersion;
        //t = t.map(i => {while (i.newVersion) i = i.newVersion; return i;});
        old.apply(scene.toolHandler, [t]);
    })(scene.toolHandler.addObjects);

    let bottomMenu = createElement('div', null, {
        classes: ['bottomToolOptions', 'bottomToolOptions_select'],
        data: {reactid: '.0.4.0.0'},
        children: [{
            tag: 'div',
            classes: ['bottomToolOptions-toolTitle'],
            data: {reactid: '.0.4.0.0.0'},
            children: [
                {
                    tag: 'span',
                    classes: ['editorgui_icons', 'editorgui_icons-icon_select'],
                    data: {reactid: '.0.4.0.0.0.0'},
                },
                {
                    tag: 'span',
                    classes: ['toolName'],
                    data: {reactid: '.0.4.0.0.0.1'},
                    children: [{
                        tag: 'span',
                        innerHTML: 'Select',
                        data: {reactid: '.0.4.0.0.0.1.0'},
                    }],
                }],
        }],
    }),
        button = createElement('div', null, {
            children: [{
                tag: 'span',
                classes: ['editorgui_icons', 'editorgui_icons-icon_select'],
            }],
            classes: ['sideButton', 'sideButton_selectTool'],
            onclick: () => {
                scene.toolHandler.setTool('select');
                let bottomToolTip = document.querySelector('.bottomMenu .clearfix');
                // need to delete the span that's supposed to be there to avoid react throwing a fit :(
                bottomToolTip.firstElementChild.remove();
                bottomToolTip.insertBefore(bottomMenu, bottomToolTip.firstElementChild);
            },
            oncreate: (e) => {
                doAMario('.leftMenu').then(i=>i.insertBefore(e, document.querySelector('.sideButton_cameraTool')));
            },
        });
    createElement('style', document.head, {
        innerHTML: `
    .editorgui_icons-icon_select {
    background-image: url(https://cdn.freeriderhd.com/free_rider_hd/assets/images/editor/gui/editorgui_icons_v5.png);
    width: 44px;
    height: 44px;
    background-size: 778px 124px;
    background-position: -322.5px 0px;
    }
    `});
    let moveSpeed = 0.3,
        moveAccumulator = 1;

    createjs.Ticker.addEventListener('tick', () => {
        if (!scene.state.paused && selected && isSelectIntangible && !tempSelect?.length) {
            tempSelect = [recreate(selected)];
            console.log('temporary', tempSelect);
            isSelectIntangible = false;
            if (connected) {
                connected.remove = 0;
                scene.track.addPhysicsLineToTrack(connected);
            }
        }
        if (!scene.state.paused && isSelectList) {
            tempSelect = tempSelect || [];
            let sectorSize = scene.settings.drawSectorSize,
                vehicle = scene.playerManager.firstPlayer._tempVehicle || scene.playerManager.firstPlayer._baseVehicle,
                pos = vehicle.masses[0].pos,
                sector = pos.factor(1 / sectorSize);
            sector.x = Math.floor(sector.x);
            sector.y = Math.floor(sector.y);
            for (let x = -1; x < 2; x++) {
                if (!selectPhysicsList[x]) continue;
                for (let y = -1; y < 2; y++) {
                    let cell = selectPhysicsList[x][y];
                    if (!cell || !cell.length || cell.mark) continue;
                    for (let i of cell) {
                        if (i.temp) continue;
                        let line = recreate(i);
                        tempSelect.push(line);
                        i.temp = true;
                    }
                    cell.mark = true;
                }
            }
        }
        // allow moving the currently selected object with movement keys when paused
        if (scene.state.paused && selectTool.selected.length && !tempSelect?.length) {
            let tdb = scene.playerManager.firstPlayer._gamepad.getDownButtons(),
                dir = vector();
            for (let button of tdb) {
                switch (button) {
                    case "up":
                        dir.y--;
                        break;
                    case "down":
                        dir.y++;
                        break;
                    case "right":
                        dir.x++;
                        break;
                    case "left":
                        dir.x--;
                        break;
                    case "46":
                        var objects = [...selectTool.selected];
                        if (connected)
                            objects.push(connected);
                        scene.toolHandler.addActionToTimeline({
                            objects,
                            type: 'remove',
                        });
                        selected = undefined;
                        selectPoint = undefined;
                        isSelectList = false;
                        selectOffset = vector();
                        break;
                }
            }
            if (selected) {
                let dirLen = Math.sqrt(dir.x ** 2 + dir.y ** 2);
                if (dirLen > 0) {
                    dir.x = dir.x * moveAccumulator / dirLen | 0;
                    dir.y = dir.y * moveAccumulator / dirLen | 0;
                    if (selectPoint) {
                        selectPoint.inc(dir);
                        if (connected) {
                            connected[connectedPoint].inc(dir);
                        }
                        pointOffset.inc(dir);
                    } else {
                        selectOffset.inc(dir);
                    }
                    moveSpeed *= 1.02;
                    moveAccumulator %= 1;
                    moveAccumulator += moveSpeed;
                    if (!isSelectIntangible) {
                        isSelectIntangible = true;
                        tempSelect?.[0]?.removeAllReferences?.();
                        tempSelect = undefined;
                        if (connected) {
                            connected.removeAllReferences();
                        }
                    }
                } else {
                    moveSpeed = 0.3;
                    moveAccumulator = 1;
                }
            }
        }
        let ctx = game.canvas.getContext('2d'),
            zoom = scene.camera.zoom;
        ctx.lineCap = "round";
        // render selected
        if (selectTool.selected.length) {
            // the actual line
            for (let selected of selectTool.selected) {
                if (selected.p1) {
                    let rp1 = selected.p1.add(selectOffset).toScreen(scene),
                        rp2 = selected.p2.add(selectOffset).toScreen(scene);
                    if (isSelectIntangible) {
                        ctx.lineWidth = Math.max(2 * zoom, 0.5);
                        ctx.strokeStyle = 'highlight' in selected ? '#000000' : '#AAAAAA';
                        ctx.beginPath();
                        ctx.moveTo(rp1.x, rp1.y);
                        ctx.lineTo(rp2.x, rp2.y);
                        ctx.stroke();
                    }
                    // the highlight on the line
                    ctx.lineWidth = Math.max(zoom, 1);
                    ctx.strokeStyle = selectPoint ? '#2200ff' : '#00ffff';
                    ctx.beginPath();
                    ctx.moveTo(rp1.x, rp1.y);
                    ctx.lineTo(rp2.x, rp2.y);
                    ctx.stroke();
                } else {
                    let data = powerups[selected.name];
                    if (!data) continue;
                    let camera = scene.camera,
                        pos = camera.position.factor(0).add(selected).add(selectOffset).toScreen(scene),
                        size = data[0] / zoom;
                    ctx.globalAlpha = 0.3;
                    ctx.fillStyle = data[1 + !!polyMod?.getVar("crPowerups")];
                    ctx.beginPath();
                    ctx.arc(pos.x, pos.y, Math.max(data[0] * zoom / 1.5, 1), 0, Math.PI * 2);
                    ctx.fill();
                    ctx.globalAlpha = 1;
                }
            }
            // handles
            if (!isSelectList && selected.p1) {
                let rp1 = selected.p1.add(selectOffset).toScreen(scene),
                    rp2 = selected.p2.add(selectOffset).toScreen(scene);
                for (let i of [rp1, rp2]) {
                    ctx.beginPath();
                    ctx.strokeStyle = '#2200ff';
                    ctx.fillStyle = '#00ffff';
                    ctx.rect(i.x - zoom * 2, i.y - zoom * 2, zoom * 4, zoom * 4);
                    ctx.fill();
                    ctx.stroke();
                }
                if (selectPoint) {
                    if (connected) {
                        let rp1 = connected.p1.add(selectOffset).toScreen(scene),
                            rp2 = connected.p2.add(selectOffset).toScreen(scene);
                        ctx.lineWidth = Math.max(2 * zoom, 0.5);
                        ctx.strokeStyle = 'highlight' in connected ? '#000000' : '#AAAAAA';
                        ctx.beginPath();
                        ctx.moveTo(rp1.x, rp1.y);
                        ctx.lineTo(rp2.x, rp2.y);
                        ctx.stroke();
                        // the highlight on the line
                        ctx.lineWidth = Math.max(zoom, 1);
                        ctx.strokeStyle = selectPoint ? '#2200ff' : '#00ffff';
                        ctx.beginPath();
                        ctx.moveTo(rp1.x, rp1.y);
                        ctx.lineTo(rp2.x, rp2.y);
                        ctx.stroke();
                        // the other handle
                        let rsp = connected[connectedPoint == 'p1' ? 'p2' : 'p1'].add(selectOffset).toScreen(scene);
                        ctx.beginPath();
                        ctx.strokeStyle = '#2200ff';
                        ctx.fillStyle = '#00ffff';
                        ctx.rect(rsp.x - zoom * 2, rsp.y - zoom * 2, zoom * 4, zoom * 4);
                        ctx.fill();
                        ctx.stroke();
                    }
                    let rsp = selectPoint.add(selectOffset).toScreen(scene);
                    ctx.beginPath();
                    ctx.strokeStyle = '#00ffff';
                    ctx.fillStyle = '#2200ff';
                    ctx.rect(rsp.x - zoom * 2, rsp.y - zoom * 2, zoom * 4, zoom * 4);
                    ctx.fill();
                    ctx.stroke();
                }
            }
        }
        // render hovered
        if (selectTool.hovered.length) {
            if (hoverPoint) {
                let isSelect = hovered == selected,
                    rsp = hoverPoint.add(isSelect ? selectOffset : vector()).toScreen(scene);
                ctx.beginPath();
                ctx.strokeStyle = '#00ddff';
                ctx.fillStyle = '#22ff00';
                ctx.rect(rsp.x - zoom * 3, rsp.y - zoom * 3, zoom * 6, zoom * 6);
                ctx.fill();
                ctx.stroke();
            } else {
                for (let hovered of selectTool.hovered) {
                    if (hovered.p1) {
                        ctx.lineWidth = Math.max(2 * zoom, 1);
                        ctx.strokeStyle = '#ffff00';
                        ctx.beginPath();
                        let isSelect = hovered == selected,
                            rp1 = hovered.p1.add(isSelect ? selectOffset : vector()).toScreen(scene),
                            rp2 = hovered.p2.add(isSelect ? selectOffset : vector()).toScreen(scene);
                        ctx.moveTo(rp1.x, rp1.y);
                        ctx.lineTo(rp2.x, rp2.y);
                        ctx.stroke();
                    } else {
                        let data = powerups[hovered.name];
                        if (!data) continue;
                        let isSelect = hovered == selected,
                            camera = scene.camera,
                            pos = camera.position.factor(0).add(hovered).add(isSelect ? selectOffset : vector()).toScreen(scene),
                            size = data[0] / zoom;
                        ctx.globalAlpha = 0.5;
                        ctx.fillStyle = data[1 + !!polyMod?.getVar("crPowerups")];
                        ctx.beginPath();
                        ctx.arc(pos.x, pos.y, Math.max(data[0] * zoom / 1.2, 1), 0, Math.PI * 2);
                        ctx.fill();
                        ctx.globalAlpha = 1;
                    }
                }
                if (!isHoverList && hovered.p1) {
                    let isSelect = hovered == selected,
                        rp1 = hovered.p1.add(isSelect ? selectOffset : vector()).toScreen(scene),
                        rp2 = hovered.p2.add(isSelect ? selectOffset : vector()).toScreen(scene);
                    //handles
                    for (let i of [rp1, rp2]) {
                        ctx.beginPath();
                        ctx.strokeStyle = '#22ff00';
                        ctx.fillStyle = '#00ddff';
                        ctx.rect(i.x - zoom * 3, i.y - zoom * 3, zoom * 6, zoom * 6);
                        ctx.fill();
                        ctx.stroke();
                    }
                }
            }
            // i tried to make it so the cursor would be a pointer, but it didn't really work out
            /*if (game.canvas.style.cursor != 'pointer')
                game.canvas.style.cursor = 'pointer';
        } else {
            game.canvas.style.cursor = 'auto';*/
        }
        let currentTool = scene.toolHandler.currentTool;
        if (active && currentTool != 'select') {
            active = false;
            button.classList.remove('active');
        } else if (!active && currentTool == 'select') {
            active = true;
            button.classList.add('active');
        }
    });

    function recreate(object, offset = selectOffset) {
        if (!object) return;
        if ('highlight' in object) {
            let re = scene.track.addPhysicsLine(object.p1.x + offset.x, object.p1.y + offset.y,
                                                object.p2.x + offset.x, object.p2.y + offset.y);
            object.newVersion = re;
            return re;
        } else if (object.p1) {
            let re = scene.track.addSceneryLine(object.p1.x + offset.x, object.p1.y + offset.y,
                                               object.p2.x + offset.x, object.p2.y + offset.y);
            object.newVersion = re;
            return re;
        } else {
            object.x += offset.x;
            object.y += offset.y;
            object.remove = 0;
            object.name == 'goal' && scene.track.addTarget(object);
            scene.track.addPowerup(object);
            return object
        }
    }
},

function linesdf(p, line) {
    // len has to be length squared for algorithm reasons
    let len = line.len * line.len,
        t = (((p.x - line.p1.x) * line.pp.x) + ((p.y - line.p1.y) * line.pp.y)) / len;
    t = Math.max(0, Math.min(1, t));
    return Math.hypot((p.x - (line.p1.x + (t * line.pp.x))), (p.y - (line.p1.y + (t * line.pp.y))));
},

function pointsdf(p, point) {
    return Math.hypot(p.x - point.x, p.y - point.y);
},

function linecollide(a1, b1, a2, b2) {
    let d = (((b2.y - a2.y) * (b1.x - a1.x)) - ((b2.x - a2.x) * (b1.y - a1.y))),
        uA = (((b2.x - a2.x) * (a1.y - a2.y)) - ((b2.y - a2.y) * (a1.x - a2.x))) / d,
        uB = (((b1.x - a1.x) * (a1.y - a2.y)) - ((b1.y - a1.y) * (a1.x - a2.x))) / d;
    return uA >= 0 && uA <= 1 && uB >= 0 && uB <= 1;
},

function rectcollide(l1, l2, ul, lr) {
    // we will always give the points as ul, lr
    /*let ul = {x: Math.min(r1.x, r2.x), y: Math.min(r1.y, r2.y)},
        lr = {x: Math.max(r1.x, r2.x), y: Math.max(r1.y, r2.y)};*/
    // if the line is completely within the rectangle
    if (l1.x >= ul.x && l2.x >= ul.x && l1.x <= lr.x && l2.x <= lr.x &&
        l1.y >= ul.y && l2.y >= ul.y && l1.y <= lr.y && l2.y <= lr.y)
        return true;

    // otherwise, check for collisions with the rectangle line segments
    if (linecollide(l1, l2, ul, {x: ul.x, y: lr.y}) ||
        linecollide(l1, l2, ul, {x: lr.x, y: ul.y}) ||
        linecollide(l1, l2, {x: ul.x, y: lr.y}, lr) ||
        linecollide(l1, l2, {x: lr.x, y: ul.y}, lr))
        return true;
    return false;
},

function pointrect(p, r1, r2) {
    let ul = {x: Math.min(r1.x, r2.x), y: Math.min(r1.y, r2.y)},
        lr = {x: Math.max(r1.x, r2.x), y: Math.max(r1.y, r2.y)};
    return p.x >= ul.x && p.x <= lr.x && p.y >= ul.y && p.y <= lr.y;
},

/**
 * Easy one-stop function to create and set up an element or even trees of elements.
 * @param {String} tag The type of element to create
 * @param {HTMLElement} [parent] (optional) Parent element to add this one to
 * @param {Object} [properties={}] Properties (e.g. innerHTML) to set on the element
 * @param {Array<Object|HTMLElement>} [properties.children] Optional short-circuit to create nested element, but prevents returning them
 * @param {String} properties.children[].tag Tag for the child
 * @param {Object} properties.children[].* Properties for the child
 * @param {Function} [properties.oncreate] Optional function to run once the element has been fully created
 * @param {Array<String>} [properties.classes] Classes to add to the created object
 * @returns {HTMLElement} The created element
 */
function createElement(tag, parent, properties = {}) {
    let element = document.createElement(tag),
        oncreate;
    if (parent) {
        parent.append(element);
    }
    for (let i in properties) {
        switch (i) {
            case 'children':
                for (let child of properties.children) {
                    if (child instanceof HTMLElement) {
                        element.append(child);
                    } else {
                        let properties = child,
                            tag = child.tag;
                        delete properties.tag;
                        createElement(tag, element, properties || {});
                    }
                }
                break;
                // delay running the oncreate function until all properties have been initialized
            case 'oncreate':
                oncreate = properties.oncreate;
                break;
            case 'classes':
                element.classList.add(...properties[i]);
                break;
            case 'data':
                for (let data in properties[i]) {
                    element.dataset[data] = properties[i][data];
                }
            default:
                element[i] = properties[i];
        }
    }
    if (oncreate) {
        oncreate(element);
    }
    return element;
},

function doAMario(selector) {
    return new Promise((resolve, reject) => {
        let interval = setInterval(() => {
            let found = document.querySelector(selector);
            if (found) {
                resolve(found);
                clearInterval(interval);
            }
        }, 250);
    });
},

function rInterval() {
    window.clearInterval(v);
},

    ],
    43: [
      function (t, e) {
        var i = (t("../math/cartesian"), Math.round, function () {});
        (i.prototype = {
          name: "",
          toolhandler: null,
          camera: null,
          mouse: null,
          scene: null,
          init: function (t) {
            (this.toolhandler = t),
              (this.scene = t.scene),
              (this.game = t.scene.game),
              (this.camera = t.scene.camera),
              (this.mouse = t.scene.mouse),
              (this.gamepad = t.gamepad);
          },
          press: function () {},
          hold: function () {},
          release: function () {},
          update: function () {
            var t = this.mouse,
              e = t.touch,
              i = t.secondaryTouch,
              n = this.toolhandler.gamepad,
              s = this.toolhandler.options,
              r = n.isButtonDown("shift");
            s.rightClickMove && (r = i.old.down),
              r
                ? (e.old.down || s.rightClickMove) && this.moveCamera()
                : (e.press && this.press(),
                  e.old.down && this.hold(),
                  e.release && this.release()),
              t.mousewheel !== !1 &&
                n.isButtonDown("shift") === !1 &&
                this.mousewheel(t.mousewheel);
          },
          moveCamera: function () {
            var t = this.mouse.secondaryTouch,
              e = t.pos,
              i = this.camera,
              n = t.old.pos.sub(e).factor(1 / i.zoom);
            i.position.inc(n);
          },
          draw: function () {},
          reset: function () {},
          mousewheel: function (t) {
            var e = this.scene.settings,
              i = this.scene.game.pixelRatio,
              n = e.cameraSensitivity,
              s = e.cameraZoomMin,
              r = e.cameraZoomMax,
              o = s * i,
              a = r * i,
              h = this.camera,
              c = this.mouse.touch,
              l = h.desiredZoom;
            (l += t * n),
              h.setZoom(l / i, c.pos),
              h.desiredZoom < o
                ? h.setZoom(s, c.pos)
                : h.desiredZoom > a && h.setZoom(r, c.pos);
          },
          checkKeys: function () {
            var t = this.gamepad,
              e = this.name.toLowerCase(),
              i = this.toolhandler;
            t.isButtonDown(e) && (i.setTool(e), t.setButtonUp(e));
          },
          getOptions: function () {
            return {};
          },
          close: function () {},
        }),
          (e.exports = i);
      },
      { "../math/cartesian": 15 },
    ],
    44: [
      function (t, e) {
        var i = t("../math/cartesian"),
          n = (t("../utils/canvaspool"), Math.sqrt, Math.pow, Math.floor),
          s = t("../sector/physicsline"),
          r = t("../sector/sceneryline"),
          o = t("../sector/powerups/target"),
          a = 50,
          h = function (t) {
            (this.currentTool = ""),
              (this.scene = t),
              (this.camera = t.camera),
              (this.mouse = t.mouse),
              (this.mouse.updateCallback = this.draw.bind(this)),
              (this.gamepad = t.playerManager.firstPlayer.getGamepad()),
              (this.tools = {}),
              (this.options = t.settings.toolHandler),
              (this.snapPoint = new i()),
              this.snapPoint.equ(this.scene.track.defaultLine.p2),
              (this.gridCache = !1),
              this.initAnalytics(),
              (this.actionTimeline = []),
              (this.actionTimelinePointer = 0);
          };
        (h.prototype = {
          currentTool: "",
          scene: null,
          camera: null,
          mouse: null,
          tools: {},
          gamepad: null,
          gridCache: !1,
          gridCacheAlpha: 1,
          gridUseEnabled: !1,
          snapPoint: !1,
          options: null,
          initAnalytics: function () {
            this.analytics = { actions: 0 };
          },
          enableGridUse: function () {
            this.gridUseEnabled = !0;
          },
          getToolOptions: function () {
            return this.tools[this.currentTool].getOptions();
          },
          setToolOption: function (t, e) {
            this.tools[this.currentTool].setOption(t, e);
          },
          registerTool: function (t) {
            var t = new t(this),
              e = t.name.toLowerCase();
            this.tools[e] = t;
          },
          setTool: function (t) {
            var t = t.toLowerCase();
            this.currentTool !== t &&
              (this.resetTool(),
              (this.currentTool = t),
              this.scene.stateChanged(),
              this.analytics.actions++);
          },
          addActionToTimeline: function (t) {
            this.actionTimeline.length >= a &&
              (this.actionTimeline.splice(0, this.actionTimeline.length - a),
              (this.actionTimelinePointer = a)),
              this.actionTimeline.splice(this.actionTimelinePointer),
              this.actionTimeline.push(t),
              this.actionTimelinePointer++;
          },
          revertAction: function () {
            var t = this.actionTimelinePointer;
            if (t > 0) {
              var e = this.actionTimeline[t - 1];
              switch ((t--, e.type)) {
                case "add":
                  this.removeObjects(e.objects);
                  break;
                case "remove":
                  this.addObjects(e.objects);
              }
              this.actionTimelinePointer = t;
            }
          },
          applyAction: function () {
            var t = this.actionTimeline,
              e = this.actionTimelinePointer;
            if (e < t.length) {
              var i = this.actionTimeline[e];
              switch ((e++, i.type)) {
                case "add":
                  this.addObjects(i.objects);
                  break;
                case "remove":
                  this.removeObjects(i.objects);
              }
              this.actionTimelinePointer = e;
            }
          },
          removeObjects: function (t) {
            for (var e = t.length, i = 0; e > i; i++) {
              var n = t[i];
              (n.remove = !0), n.removeAllReferences();
            }
            this.scene.track.cleanTrack();
          },
          addObjects: function (t) {
            for (var e = t.length, i = this.scene.track, n = 0; e > n; n++) {
              var a = t[n];
              a instanceof s
                ? ((a.remove = !1), i.addPhysicsLineToTrack(a))
                : a instanceof r
                ? ((a.remove = !1), i.addSceneryLineToTrack(a))
                : a instanceof o
                ? ((a.remove = !1), i.addTarget(a), i.addPowerup(a))
                : ((a.remove = !1), i.addPowerup(a));
            }
          },
          resetTool: function () {
            "" !== this.currentTool && this.tools[this.currentTool].reset();
          },
          update: function () {
            this.checkGrid(),
              this.mouse.enabled && this.tools[this.currentTool].update(),
              this.checkHotkeys(),
              this.checkMouse(),
              this.checkSnap();
          },
          checkGrid: function () {
            var t = this.scene.camera;
            t.zoom !== t.desiredZoom && (this.gridCache = !1);
          },
          checkSnap: function () {
            this.options.snapLocked && (this.options.snap = !0);
          },
          moveCameraTowardsMouse: function () {
            if (this.options.cameraLocked === !1) {
              var t = this.scene.screen,
                e = 100,
                i = t.height - e,
                n = 0 + e,
                s = t.width - e,
                r = 0 + e,
                o = this.options.cameraMoveSpeed,
                a = t.center,
                h = this.camera,
                c = this.mouse.touch,
                l = c.pos.x,
                u = c.pos.y,
                p = 0.8 * (l - a.x),
                d = u - a.y;
              (l >= s || r >= l || u >= i || n >= u) &&
                ((h.position.x += p * o * (1 / h.zoom)),
                (h.position.y += d * o * (1 / h.zoom)));
            }
          },
          checkMouse: function () {
            var t = this.mouse.touch,
              e = this.mouse.secondaryTouch;
            (t.press || e.press) && this.press();
          },
          press: function () {
            this.camera.unfocus();
          },
          checkHotkeys: function () {
            var t = this.gamepad,
              e = this.options.snap,
              i = this.options.snapLocked,
              n = this.options.rightClickMove,
              s = t.isButtonDown("alt");
            n && (s = t.isButtonDown("shift")),
              s && !e
                ? this.toggleQuickSnap()
                : s || !e || i || this.toggleQuickSnap(),
              t.isButtonDown("ctrl") &&
                t.isButtonDown("z") &&
                (t.setButtonUp("z"), this.revertAction()),
              t.isButtonDown("ctrl") &&
                t.isButtonDown("y") &&
                (t.setButtonUp("y"), this.applyAction());
            var r = this.tools;
            for (var o in r) {
              var a = r[o];
              a.checkKeys();
            }
            this.gridUseEnabled &&
              t.isButtonDown("grid") &&
              (t.setButtonUp("grid"), this.toggleGrid()),
              t.isButtonDown("zoom_increase") &&
                (t.setButtonUp("zoom_increase"),
                this.scene.camera.increaseZoom()),
              t.isButtonDown("zoom_decrease") &&
                (t.setButtonUp("zoom_decrease"),
                this.scene.camera.decreaseZoom()),
              t.isButtonDown("zoom_100") &&
                (t.setButtonUp("zoom_100"), this.scene.camera.resetZoom()),
              t.isButtonDown("lineType") &&
                (t.setButtonUp("lineType"), this.toggleLineType());
          },
          toggleLineType: function () {
            var t = this.options.lineType;
            (this.options.lineType = "physics" === t ? "scenery" : "physics"),
              this.scene.stateChanged();
          },
          toggleGrid: function () {
            (this.options.grid = !this.options.grid), this.scene.stateChanged();
          },
          toggleSnap: function () {
            (this.options.snap = !this.options.snap),
              (this.options.snapLocked = !this.options.snapLocked),
              this.resetTool(),
              this.scene.stateChanged();
          },
          toggleQuickSnap: function () {
            this.options.snapLocked ||
              ((this.options.snap = !this.options.snap),
              this.resetTool(),
              this.scene.stateChanged());
          },
          toggleCameraLock: function () {
            (this.options.cameraLocked = !this.options.cameraLocked),
              this.scene.stateChanged();
          },
          draw: function () {
            this.scene.game.pixelRatio, this.scene.game.canvas.getContext("2d");
            this.mouse.enabled && this.tools[this.currentTool].draw();
          },
          drawGrid: function () {
            var t = this.scene.game.pixelRatio,
              e = this.scene.game.canvas.getContext("2d");
            this.options.grid === !0 &&
              this.options.visibleGrid &&
              this.drawCachedGrid(e, t);
          },
          drawCachedGrid: function (t, e) {
            this.gridCache === !1 && this.cacheGrid(e);
            var i = this.gridCache,
              n = i.width,
              s = i.height,
              r = this.scene.screen,
              o = r.center,
              a = ((o.x / n) | 0) + 2,
              h = ((o.y / s) | 0) + 2,
              c = this.camera.zoom,
              l = (this.camera.position.x * c) % n,
              u = (this.camera.position.y * c) % s;
            t.globalAlpha = this.gridCacheAlpha;
            for (var p = -a; a > p; p++)
              for (var d = -h; h > d; d++) {
                var f = p * n - l + o.x,
                  g = d * s - u + o.y;
                t.drawImage(i, 0, 0, s, n, f, g, n, s);
              }
            t.globalAlpha = 1;
          },
          cacheGrid: function () {
            var t = this.scene.camera.zoom,
              e = 200 * t,
              i = 200 * t,
              s = this.options.gridSize,
              r = s * t,
              o = document.createElement("canvas");
            (o.width = e), (o.height = i);
            var a = o.getContext("2d");
            (a.strokeStyle = this.options.gridMinorLineColor),
              (a.strokeWidth = 1),
              a.beginPath();
            var h = null,
              c = null,
              l = null,
              u = null;
            for (h = n(e / r), c = 0; h >= c; c++)
              (l = c * r), a.moveTo(l, 0), a.lineTo(l, i), a.stroke();
            for (h = n(i / r), c = 0; h >= c; c++)
              (u = c * r), a.moveTo(0, u), a.lineTo(e, u), a.stroke();
            a.beginPath(),
              a.rect(0, 0, e, i),
              (a.lineWidth = 2),
              (a.strokeStyle = this.options.gridMajorLineColor),
              a.stroke(),
              a.closePath(),
              (this.gridCache = o),
              (this.gridCacheAlpha = Math.min(t + 0.2, 1));
          },
          resize: function () {
            var t = this.scene.game.pixelRatio;
            this.cacheGrid(t);
          },
          undo: function () {},
          redo: function () {},
          close: function () {
            (this.actionTimeline = []),
              (this.actionTimelinePointer = 0),
              (this.tools = null),
              (this.mouse = null),
              (this.scene = null),
              (this.camera = null),
              (this.options.grid = !1),
              (this.options = null),
              (this.gridCache = null);
          },
        }),
          (e.exports = h);
      },
      {
        "../math/cartesian": 15,
        "../sector/physicsline": 19,
        "../sector/powerups/target": 26,
        "../sector/sceneryline": 27,
        "../utils/canvaspool": 49,
      },
    ],
    45: [
      function (t, e) {
        var i = (t("../math/cartesian"), t("./tool")),
          n = (Math.round, t("./vehiclepoweruptools/helicoptertool")),
          s = function (t) {
            this.toolInit(t),
              (this.powerupTools = {}),
              (this.options = t.scene.settings.vehiclePowerup),
              this.registerPowerupTools();
          },
          r = (s.prototype = new i());
        (r.toolInit = r.init),
          (r.toolUpdate = r.update),
          (r.name = "vehiclepowerup"),
          (r.powerupTools = null),
          (r.registerPowerupTools = function () {
            this.registerTool(new n(this, this.toolhandler));
          }),
          (r.registerTool = function (t) {
            this.powerupTools[t.name] = t;
          }),
          (r.setOption = function (t, e) {
            this.options[t] = e;
          }),
          (r.getOptions = function () {
            return this.options;
          }),
          (r.update = function () {
            this.toolhandler.gamepad, this.mouse, this.options;
            this.toolUpdate();
          }),
          (r.press = function () {
            var t = this.options.selected;
            this.powerupTools[t].press();
          }),
          (r.hold = function () {
            var t = this.options.selected;
            this.powerupTools[t].hold();
          }),
          (r.release = function () {
            var t = this.options.selected;
            this.powerupTools[t].release();
          }),
          (r.draw = function () {
            var t = this.scene,
              e = (t.game.canvas, t.game.canvas.getContext("2d")),
              i = this.options;
            this.powerupTools[i.selected].draw(e);
          }),
          (e.exports = s);
      },
      {
        "../math/cartesian": 15,
        "./tool": 43,
        "./vehiclepoweruptools/helicoptertool": 46,
      },
    ],
    46: [
      function (t, e) {
        var i = t("../../math/cartesian"),
          n = t("../tool"),
          s = t("../../sector/vehiclepowerups/helicopter"),
          r = function (t, e) {
            this.toolInit(e),
              (this.powerup = new s(0, 0, 0, e.scene.track)),
              (this.p1 = new i(0, 0)),
              (this.p2 = new i(0, 0)),
              (this.options = t.options),
              (this.active = !1);
          },
          o = (r.prototype = new n());
        (o.toolInit = o.init),
          (o.toolUpdate = o.update),
          (o.powerup = null),
          (o.name = "helicopter"),
          (o.p1 = null),
          (o.p2 = null),
          (o.active = !1),
          (o.draw = function (t) {
            var e = this.mouse.touch,
              i = e.pos,
              n = this.camera.zoom,
              s = this.scene.settings.device;
            if (
              (("desktop" === s || this.active) &&
                ((t.globalAlpha = 0.8),
                this.powerup.draw(i.x, i.y, n, t),
                (t.globalAlpha = 1)),
              this.active === !0)
            ) {
              var r = this.scene.screen,
                o = r.realToScreen(this.p1.x, "x"),
                a = r.realToScreen(this.p1.y, "y");
              (t.globalAlpha = 0.4),
                this.powerup.draw(o, a, n, t),
                (t.globalAlpha = 1);
            }
          }),
          (o.press = function () {
            var t = this.mouse.touch,
              e = t.real;
            (this.p1.x = e.x),
              (this.p1.y = e.y),
              (this.p2.x = e.x),
              (this.p2.y = e.y),
              (this.active = !0);
          }),
          (o.hold = function () {
            var t = this.mouse.touch,
              e = t.real;
            (this.p2.x = e.x), (this.p2.y = e.y);
          }),
          (o.release = function () {
            var t = (this.scene.screen, this.scene.track),
              e = new s(this.p1.x, this.p1.y, this.options.time, t);
            t.addPowerup(e),
              (this.active = !1),
              this.toolhandler.addActionToTimeline({
                type: "add",
                objects: [e],
              });
          }),
          (e.exports = r);
      },
      {
        "../../math/cartesian": 15,
        "../../sector/vehiclepowerups/helicopter": 29,
        "../tool": 43,
      },
    ],
    47: [
      function (t, e) {
        function i(t) {
          (this.scene = t),
            (this.game = t.game),
            (this.settings = t.game.settings),
            (this.camera = t.camera),
            (this.sectors = {}),
            (this.sectors.drawSectors = []),
            (this.sectors.physicsSectors = []),
            (this.totalSectors = []),
            (this.powerups = []),
            (this.powerupsLookupTable = {}),
            (this.physicsLines = []),
            (this.sceneryLines = []),
            (this.targets = []),
            (this.allowedVehicles = ["MTB", "BMX"]),
            (this.canvasPool = new b(t)),
            this.createPowerupCache();
        }
        var n = t("../math/cartesian"),
          s = t("../sector/physicsline"),
          r = t("../sector/sceneryline"),
          o = t("../math/bresenham"),
          a = t("../sector/sector"),
          h = t("../../libs/lodash-3.10.1"),
          c = Math.floor,
          l = Math.max,
          u = Math.min,
          p = Math.sqrt,
          d = Math.pow,
          f = Math.round,
          g = t("../sector/powerups/bomb"),
          v = t("../sector/powerups/gravity"),
          m = t("../sector/powerups/boost"),
          y = t("../sector/powerups/checkpoint"),
          w = t("../sector/powerups/target"),
          _ = t("../sector/powerups/slowmo"),
          x = t("../sector/vehiclepowerups/helicopter"),
          b = t("../utils/canvaspool"),
          T = { LINE: 1, POWERUPS: 2 },
          k = [];
        (i.prototype = {
          defaultLine: { p1: new n(-40, 50), p2: new n(40, 50) },
          game: null,
          scene: null,
          camera: null,
          canvas: null,
          canvasPool: null,
          settings: null,
          physicsLines: null,
          sceneryLines: null,
          powerups: null,
          targets: null,
          targetCount: 0,
          sectors: null,
          totalSectors: null,
          allowedVehicles: null,
          dirty: !1,
          createPowerupCache: function () {
            k.push(new m(0, 0, 0, this)),
              k.push(new _(0, 0, this)),
              k.push(new g(0, 0, this)),
              k.push(new v(0, 0, 0, this)),
              k.push(new y(0, 0, this)),
              k.push(new w(0, 0, this)),
              k.push(new x(0, 0, 0, this));
          },
          recachePowerups: function (t) {
            for (var e in k) k[e].recache(t);
          },
          read: function (t) {
            var e = t.split("#"),
              i = e[0].split(","),
              n = [],
              s = [];
            if (e.length > 2)
              var n = e[1].split(","),
                s = e[2].split(",");
            else if (e.length > 1) var s = e[1].split(",");
            this.addLines(i, this.addPhysicsLine),
              this.addLines(n, this.addSceneryLine),
              this.addPowerups(s);
          },
          addPowerups: function (t) {
            for (
              var e = t.length, i = [], n = (new Date().getTime(), 0);
              e > n;
              n++
            )
              if (((i = t[n].split(" ")), i.length >= 2)) {
                for (var s = [], r = i.length, o = 1; r > o; o++) {
                  var a = parseInt(i[o], 32);
                  s.push(a);
                }
                var h = f(s[0]),
                  c = f(s[1]),
                  p = null;
                switch (i[0]) {
                  case "B":
                    (p = new m(h, c, s[2], this)), this.addPowerup(p);
                    break;
                  case "S":
                    (p = new _(h, c, this)), this.addPowerup(p);
                    break;
                  case "O":
                    (p = new g(h, c, this)), this.addPowerup(p);
                    break;
                  case "G":
                    (p = new v(h, c, s[2], this)), this.addPowerup(p);
                    break;
                  case "C":
                    (p = new y(h, c, this)), this.addPowerup(p);
                    break;
                  case "T":
                    (p = new w(h, c, this)),
                      this.addTarget(p),
                      this.addPowerup(p);
                    break;
                  case "V":
                    var d = s[2],
                      b = s[3],
                      T = this.settings.vehiclePowerup.minTime,
                      k = this.settings.vehiclePowerup.maxTime;
                    (b = b || T), (b = u(b, k)), (b = l(b, T));
                    var p;
                    switch (d) {
                      case 1:
                        p = new x(h, c, b, this);
                    }
                    this.addPowerup(p);
                }
              }
          },
          addTarget: function (t) {
            (this.dirty = !0), this.targetCount++, this.targets.push(t);
          },
          addPowerup: function (t) {
            var e = this.sectors.drawSectors,
              i = this.sectors.physicsSectors,
              n = t.x,
              s = t.y,
              r = this.settings.drawSectorSize,
              o = this.settings.physicsSectorSize;
            this.addRef(n, s, t, T.POWERUPS, i, o);
            var a = this.addRef(n, s, t, T.POWERUPS, e, r);
            return (
              a !== !1 && this.totalSectors.push(a),
              null !== t &&
                (this.powerups.push(t),
                t.id && (this.powerupsLookupTable[t.id] = t)),
              t
            );
          },
          addLines: function (t, e) {
            for (var i = t.length, n = 0; i > n; n++) {
              var s = t[n].split(" "),
                r = s.length;
              if (r > 3)
                for (var o = 0; r - 2 > o; o += 2) {
                  var a = parseInt(s[o], 32),
                    h = parseInt(s[o + 1], 32),
                    c = parseInt(s[o + 2], 32),
                    l = parseInt(s[o + 3], 32),
                    u = a + h + c + l;
                  isNaN(u) || e.call(this, a, h, c, l);
                }
            }
          },
          addPhysicsLine: function (t, e, i, n) {
            var t = f(t),
              e = f(e),
              i = f(i),
              n = f(n),
              r = i - t,
              o = n - e,
              a = p(d(r, 2) + d(o, 2));
            if (a >= 2) {
              var h = new s(t, e, i, n);
              this.addPhysicsLineToTrack(h);
            }
            return h;
          },
          addPhysicsLineToTrack: function (t) {
            for (
              var e = this.settings.drawSectorSize,
                i = t.p1,
                n = t.p2,
                s = i.x,
                r = i.y,
                a = n.x,
                h = n.y,
                c = o(s, r, a, h, e),
                l = this.sectors.drawSectors,
                u = c.length,
                p = 0;
              u > p;
              p += 2
            ) {
              var d = c[p],
                f = c[p + 1],
                g = this.addRef(d, f, t, T.LINE, l, e);
              g !== !1 && this.totalSectors.push(g);
            }
            for (
              var v = this.settings.physicsSectorSize,
                m = o(s, r, a, h, v),
                y = this.sectors.physicsSectors,
                w = m.length,
                p = 0;
              w > p;
              p += 2
            ) {
              var d = m[p],
                f = m[p + 1];
              this.addRef(d, f, t, T.LINE, y, v);
            }
            return this.physicsLines.push(t), t;
          },
          addSceneryLine: function (t, e, i, n) {
            var t = f(t),
              e = f(e),
              i = f(i),
              n = f(n),
              s = i - t,
              o = n - e,
              a = p(d(s, 2) + d(o, 2));
            if (a >= 2) {
              var h = new r(t, e, i, n);
              this.addSceneryLineToTrack(h);
            }
            return h;
          },
          addSceneryLineToTrack: function (t) {
            for (
              var e = this.settings.drawSectorSize,
                i = t.p1,
                n = t.p2,
                s = i.x,
                r = i.y,
                a = n.x,
                h = n.y,
                c = o(s, r, a, h, e),
                l = this.sectors.drawSectors,
                u = c.length,
                p = 0;
              u > p;
              p += 2
            ) {
              var d = c[p],
                f = c[p + 1],
                g = this.addRef(d, f, t, T.LINE, l, e);
              g !== !1 && this.totalSectors.push(g);
            }
            return this.sceneryLines.push(t), t;
          },
          addRef: function (t, e, i, n, s, r) {
            var o = c(t / r),
              h = c(e / r),
              l = !1;
            if ((void 0 === s[o] && (s[o] = []), void 0 === s[o][h])) {
              var u = new a(o, h, this);
              (s[o][h] = u), (l = u);
            }
            switch (n) {
              case T.LINE:
                s[o][h].addLine(i), i.addSectorReference(s[o][h]);
                break;
              case T.POWERUPS:
                s[o][h].addPowerup(i), i.addSectorReference(s[o][h]);
            }
            return (this.dirty = !0), l;
          },
          cleanTrack: function () {
            this.cleanLines(), this.cleanPowerups();
          },
          cleanLines: function () {
            for (
              var t = this.physicsLines,
                e = this.sceneryLines,
                i = t.length,
                n = e.length,
                s = i - 1;
              s >= 0;
              s--
            )
              t[s].remove && t.splice(s, 1);
            for (var r = n - 1; r >= 0; r--) e[r].remove && e.splice(r, 1);
          },
          cleanPowerups: function () {
            for (
              var t = this.powerups,
                e = this.targets,
                i = this.targets.length,
                n = t.length,
                s = (this.powerupsLookupTable, n - 1);
              s >= 0;
              s--
            )
              t[s].remove && t.splice(s, 1);
            for (var r = i - 1; r >= 0; r--) e[r].remove && e.splice(r, 1);
            this.targetCount = e.length;
          },
          updatePowerupState: function (t) {
            var e = t._powerupsConsumed;
            this.resetPowerups();
            var i = e.targets,
              n = e.checkpoints,
              s = e.misc;
            this.setPowerupStates(i),
              this.setPowerupStates(n),
              this.setPowerupStates(s);
          },
          setPowerupStates: function (t) {
            var e = this.powerupsLookupTable;
            for (var i in t) {
              var n = t[i],
                s = e[n];
              s.remove && s.id && (delete e[n], delete t[n]),
                (s.hit = !0),
                (s.sector.powerupCanvasDrawn = !1);
            }
          },
          getCode: function () {
            this.cleanTrack();
            var t = this.powerups,
              e = this.physicsLines,
              i = this.sceneryLines,
              n = "",
              s = e.length,
              r = i.length,
              o = t.length;
            if (s > 0) {
              for (var a in e) {
                var h = e[a];
                h.recorded ||
                  (n +=
                    h.p1.x.toString(32) +
                    " " +
                    h.p1.y.toString(32) +
                    h.getCode(this) +
                    ",");
              }
              n = n.slice(0, -1);
              for (var a in e) e[a].recorded = !1;
            }
            if (((n += "#"), r > 0)) {
              for (var c in i) {
                var h = i[c];
                h.recorded ||
                  (n +=
                    h.p1.x.toString(32) +
                    " " +
                    h.p1.y.toString(32) +
                    h.getCode(this) +
                    ",");
              }
              n = n.slice(0, -1);
              for (var c in i) i[c].recorded = !1;
            }
            if (((n += "#"), o > 0)) {
              for (var l in t) {
                {
                  var u = t[l];
                  u.getCode();
                }
                n += u.getCode() + ",";
              }
              n = n.slice(0, -1);
            }
            return n;
          },
          resetPowerups: function () {
            var t = this.powerups;
            for (var e in t) {
              var i = t[e];
              i.hit &&
                !i.remove &&
                ((i.hit = !1), (i.sector.powerupCanvasDrawn = !1));
            }
          },
          addDefaultLine: function () {
            var t = this.defaultLine,
              e = t.p1,
              i = t.p2;
            this.addPhysicsLine(e.x, e.y, i.x, i.y);
          },
          erase: function (t, e, i) {
            this.dirty = !0;
            for (
              var n = t.x - e,
                s = t.y - e,
                r = t.x + e,
                o = t.y + e,
                a = l(n, r),
                p = u(n, r),
                d = l(s, o),
                f = u(s, o),
                g = this.settings.drawSectorSize,
                v = c(a / g),
                m = c(p / g),
                y = c(d / g),
                w = c(f / g),
                _ = this.sectors.drawSectors,
                x = [],
                b = m;
              v >= b;
              b++
            )
              for (var T = w; y >= T; T++)
                _[b] && _[b][T] && x.push(_[b][T].erase(t, e, i));
            return h.flatten(x);
          },
          drawAndCache: function () {
            for (
              var t = performance.now(),
                e = this.totalSectors,
                i = e.length,
                n = 0;
              i > n;
              n++
            ) {
              var s = e[n];
              !(function (t) {
                setTimeout(function () {
                  t.draw(), t.cacheAsImage();
                }, 250 * n);
              })(s);
            }
            var r = performance.now();
            console.log(
              "Track :: Time to draw entire track : " + (r - t) + "ms"
            );
          },
          undraw: function () {
            var t = (performance.now(), this.totalSectors);
            for (var e in t) {
              var i = t[e];
              i.drawn && i.clear(!0);
            }
            var n = this.camera.zoom;
            this.recachePowerups(Math.max(n, 1)), this.canvasPool.update();
          },
          collide: function (t) {
            var e = this.settings.physicsSectorSize,
              i = Math.floor(t.pos.x / e - 0.5),
              n = Math.floor(t.pos.y / e - 0.5),
              s = this.sectors.physicsSectors;
            s[i] && s[i][n] && s[i][n].resetCollided(),
              s[i + 1] && s[i + 1][n] && s[i + 1][n].resetCollided(),
              s[i + 1] && s[i + 1][n + 1] && s[i + 1][n + 1].resetCollided(),
              s[i] && s[i][n + 1] && s[i][n + 1].resetCollided(),
              s[i] && s[i][n] && s[i][n].collide(t),
              s[i + 1] && s[i + 1][n] && s[i + 1][n].collide(t),
              s[i + 1] && s[i + 1][n + 1] && s[i + 1][n + 1].collide(t),
              s[i] && s[i][n + 1] && s[i][n + 1].collide(t);
          },
          getDrawSector: function (t, e) {
            var i = this.settings.drawSectorSize,
              n = c(t / i),
              s = c(e / i),
              r = this.sectors.drawSectors,
              o = !1;
            return (
              "undefined" != typeof r[n] &&
                "undefined" != typeof r[n][s] &&
                (o = r[n][s]),
              o
            );
          },
          draw: function () {
            var t = this.scene,
              e = t.camera,
              i = t.screen,
              n = t.game.canvas.getContext("2d"),
              s = e.zoom,
              r = e.position,
              o = t.screen.center,
              a = this.settings.drawSectorSize * s,
              h = (r.x * s) / a,
              c = (r.y * s) / a,
              l = i.width / a,
              u = i.height / a,
              p = u / 2,
              d = l / 2,
              f = h - d - 1,
              g = c - p - 1,
              v = h + d,
              m = c + p;
            (n.imageSmoothingEnabled = !1),
              (n.mozImageSmoothingEnabled = !1),
              (n.oImageSmoothingEnabled = !1),
              (n.webkitImageSmoothingEnabled = !1);
            for (
              var y = h * a - o.x,
                w = c * a - o.y,
                _ = this.totalSectors,
                x = _.length,
                b = 0;
              x > b;
              b++
            ) {
              var T = _[b],
                k = T.row,
                S = T.column;
              if (
                (T.dirty && T.cleanSector(),
                S >= f && v >= S && k >= g && m >= k)
              ) {
                T.drawn === !1 && T.draw(),
                  T.hasPowerups &&
                    (T.powerupCanvasDrawn || T.cachePowerupSector());
                var C = S * a - y,
                  P = k * a - w;
                if (
                  ((C = 0 | C),
                  (P = 0 | P),
                  n.drawImage(T.canvas, C, P, a, a),
                  T.hasPowerups && T.powerupCanvasDrawn)
                ) {
                  var M = T.powerupCanvasOffset * s;
                  n.drawImage(
                    T.powerupCanvas,
                    C - M / 2,
                    P - M / 2,
                    a + M,
                    a + M
                  );
                }
              } else T.drawn && T.clear();
            }
          },
          closeSectors: function () {
            for (var t = this.totalSectors, e = t.length, i = 0; e > i; i++)
              t[i].close();
          },
          close: function () {
            (this.scene = null),
              this.closeSectors(),
              (this.totalSectors = null),
              (this.canvasPool = null),
              (this.sectors = null),
              (this.physicsLines = null),
              (this.sceneryLines = null),
              (this.powerups = null),
              (this.camera = null);
          },
        }),
          (e.exports = i);
      },
      {
        "../../libs/lodash-3.10.1": 77,
        "../math/bresenham": 14,
        "../math/cartesian": 15,
        "../sector/physicsline": 19,
        "../sector/powerups/bomb": 21,
        "../sector/powerups/boost": 22,
        "../sector/powerups/checkpoint": 23,
        "../sector/powerups/gravity": 24,
        "../sector/powerups/slowmo": 25,
        "../sector/powerups/target": 26,
        "../sector/sceneryline": 27,
        "../sector/sector": 28,
        "../sector/vehiclepowerups/helicopter": 29,
        "../utils/canvaspool": 49,
      },
    ],
    48: [
      function (t, e) {
        function i(t) {
          (this.scene = t),
            (this.settings = t.settings),
            this.build_interface();
        }
        var n = i.prototype;
        (n.scene = null),
          (n.container = null),
          (n.cached = !1),
          (n.build_interface = function () {
            this.sprite_sheet = this.create_sprite_sheet();
            var t = this.scene.game.pixelRatio,
              e = new createjs.Container(),
              i = "helsinki",
              n = this.settings.campaignData,
              s = n.goals,
              r = s.third,
              o = new createjs.Container(),
              a = this.get_sprite("bronze_medal"),
              r = new createjs.Text(r, "30px " + i, "#000000"),
              h = s.second,
              c = new createjs.Container(),
              l = this.get_sprite("silver_medal"),
              h = new createjs.Text(h, "30px " + i, "#000000"),
              u = s.first,
              p = new createjs.Container(),
              d = this.get_sprite("gold_medal"),
              u = new createjs.Text(u, "30px " + i, "#000000"),
              f = t / 2.5;
            "phone" === this.settings.controls && (f = t / 2.5),
              (a.y = 7),
              (a.x = 16),
              (r.x = 69),
              (r.y = 14),
              (l.y = 7),
              (l.x = 175),
              (h.x = 229),
              (h.y = 14),
              (d.y = 7),
              (d.x = 350),
              (u.y = 14),
              (u.x = 400),
              o.addChild(a),
              o.addChild(r),
              c.addChild(l),
              c.addChild(h),
              p.addChild(d),
              p.addChild(u),
              (o.alpha = 0.4),
              (c.alpha = 0.4),
              (p.alpha = 0.4),
              e.addChild(o),
              e.addChild(c),
              e.addChild(p),
              (e.scaleX = e.scaleY = f),
              (e.y = 80 * f),
              (e.x = 0),
              (this.bronze_container = o),
              (this.silver_container = c),
              (this.gold_container = p),
              (this.container = e),
              this.scene.game.stage.addChild(e),
              this.update_state();
          }),
          (n.update_state = function () {
            var t = this.settings.campaignData,
              e = t.user;
            switch (e.has_goal) {
              case 1:
              case "first":
                this.gold_container.alpha = 1;
              case "second":
              case 2:
                this.silver_container.alpha = 1;
              case "third":
              case 3:
                this.bronze_container.alpha = 1;
              case 0:
            }
          }),
          (n.center_container = function () {
            var t = this.scene.screen,
              e = this.container,
              i = e.getBounds(),
              n = this.scene.game.pixelRatio;
            (e.x = t.width / 2 - (i.width / 2) * e.scaleY), (e.y = 40 * n);
          }),
          (n.update = function () {
            this.settings.mobile && this.center_container(),
              this.update_state();
          }),
          (n.create_sprite_sheet = function () {
            var t = this.scene.assets.getResult("campaign_icons"),
              e = {
                images: [t],
                frames: [
                  [548, 68, 44, 44],
                  [2, 68, 452, 56],
                  [502, 68, 44, 44],
                  [2, 2, 588, 64],
                  [456, 68, 44, 44],
                ],
                animations: {
                  bronze_medal: [0],
                  center_panel: [1],
                  silver_medal: [2],
                  left_panel: [3],
                  gold_medal: [4],
                },
              },
              i = new createjs.SpriteSheet(e);
            return i;
          }),
          (n.get_sprite = function (t) {
            var e = this.sprite_sheet,
              i = new createjs.Sprite(e, t);
            return i.stop(), i;
          }),
          (e.exports = i);
      },
      {},
    ],
    49: [
      function (t, e) {
        function i(t) {
          (this.options = t),
            (this.canvasPool = []),
            t.screen && ((this.setToScreen = !0), this.update()),
            t.cap && ((this.setToScreen = !1), (this.poolCap = t.cap));
        }
        var n = Math.floor,
          s = Math.ceil;
        (i.prototype = {
          canvasPool: null,
          poolCap: 5e3,
          setToScreen: !0,
          options: null,
          update: function () {
            this.setToScreen && (this.getPoolCapFromScreen(), this.cleanPool());
          },
          getPoolCapFromScreen: function () {
            var t = this.options,
              e = t.settings,
              i = t.screen,
              r = (this.options.width, this.options.height, i.width),
              o = i.height,
              a = t.camera,
              h = a.zoom,
              c = n(e.drawSectorSize * h),
              l = s(r / c),
              u = s(o / c);
            this.poolCap = l * u + l + u;
          },
          getCanvas: function () {
            var t = this.canvasPool.pop();
            return null == t && (t = document.createElement("canvas")), t;
          },
          releaseCanvas: function (t) {
            this.canvasPool.length < this.poolCap && this.canvasPool.push(t);
          },
          cleanPool: function () {
            this.canvasPool.length > this.poolCap &&
              (this.canvasPool = this.canvasPool.slice(0, this.poolCap + 1));
          },
        }),
          (e.exports = i);
      },
      {},
    ],
    50: [
      function (t, e) {
        function i(t) {
          t = parseInt(t, 10);
          var e = n(t / 6e4),
            i = (t - 6e4 * e) / 1e3;
          return (
            (i = i.toFixed(2)),
            10 > e && (e = e),
            10 > i && (i = "0" + i),
            e + ":" + i
          );
        }
        var n = Math.floor;
        e.exports = i;
      },
      {},
    ],
    51: [
      function (t, e) {
        function i(t) {
          (this.scene = t),
            (this.tickDownButtons = {}),
            (this.previousTickDownButtons = {}),
            (this.downButtons = {}),
            (this.keymap = {}),
            (this.records = {}),
            (this.numberOfKeysDown = 0),
            (this.tickNumberOfKeysDown = 0);
        }
        var n = t("../../libs/lodash-3.10.1");
        (i.prototype = {
          tickDownButtons: null,
          previousTickDownButtons: null,
          downButtons: null,
          paused: !1,
          keymap: null,
          records: null,
          keysToRecord: null,
          keysToPlay: null,
          recording: !1,
          playback: null,
          numberOfKeysDown: 0,
          tickNumberOfKeysDown: 0,
          replaying: !1,
          listen: function () {
            (document.onkeydown = this.handleButtonDown.bind(this)),
              (document.onkeyup = this.handleButtonUp.bind(this));
          },
          unlisten: function () {
            (document.onkeydown = function () {}),
              (document.onkeyup = function () {});
          },
          pause: function () {
            this.paused = !0;
          },
          unpause: function () {
            this.paused = !1;
          },
          recordKeys: function (t) {
            (this.keysToRecord = t), (this.recording = !0);
          },
          loadPlayback: function (t, e) {
            (this.keysToPlay = e), (this.playback = t), (this.replaying = !0);
          },
          setKeyMap: function (t) {
            var e = {};
            for (var i in t)
              if (t[i] instanceof Array) for (var n in t[i]) e[t[i][n]] = i;
              else e[t[i]] = i;
            this.keymap = e;
          },
          handleButtonDown: function (t) {
            var e = this.getInternalCode(t.keyCode);
            "string" == typeof e && t.preventDefault(), this.setButtonDown(e);
          },
          handleButtonUp: function (t) {
            var e = this.getInternalCode(t.keyCode);
            "string" == typeof e && t.preventDefault(), this.setButtonUp(e);
          },
          getInternalCode: function (t) {
            var e = this.keymap;
            return e[t] || t;
          },
          setButtonsDown: function (t) {
            for (var e = 0, i = t.length; i > e; e++) this.setButtonDown(t[e]);
          },
          setButtonUp: function (t) {
            this.downButtons[t] &&
              (this.onButtonUp && this.onButtonUp(t),
              (this.downButtons[t] = !1),
              this.numberOfKeysDown--);
          },
          setButtonDown: function (t, e) {
            this.downButtons[t] ||
              (this.onButtonDown && this.onButtonDown(t),
              (this.downButtons[t] = e ? e : !0),
              this.numberOfKeysDown++);
          },
          isButtonDown: function (t) {
            var e = !1,
              i = this.tickDownButtons[t];
            return (i > 0 || 1 == i) && (e = !0), e;
          },
          getButtonDownOccurances: function (t) {
            var e = 0;
            if (this.isButtonDown(t)) {
              e = 1;
              var i = this.tickDownButtons[t];
              i !== !0 && (e = i);
            }
            return e;
          },
          getDownButtons: function () {
            var t = [];
            for (var e in this.tickDownButtons)
              this.tickDownButtons[e] && t.push(e);
            return t;
          },
          reset: function () {
            this.replaying && (this.downButtons = {}),
              (this.tickDownButtons = {}),
              (this.previousTickDownButtons = {}),
              (this.records = {});
          },
          update: function () {
            this.scene;
            this.replaying && this.updatePlayback(),
              (this.previousTickDownButtons = n.merge(
                {},
                this.tickDownButtons
              )),
              (this.tickDownButtons = n.merge({}, this.downButtons)),
              (this.tickNumberOfKeysDown = this.numberOfKeysDown),
              this.recording && this.updateRecording();
          },
          areKeysDown: function () {
            return this.tickNumberOfKeysDown > 0;
          },
          updatePlayback: function () {
            var t = this.keysToPlay,
              e = this.playback,
              i = this.scene.ticks;
            for (var n in t) {
              var s = t[n],
                r = s + "_up",
                o = s + "_down";
              if ("undefined" != typeof e[o] && "undefined" != typeof e[o][i]) {
                var a = e[o][i];
                this.setButtonDown(s, a);
              }
              "undefined" != typeof e[r] &&
                "undefined" != typeof e[r][i] &&
                this.setButtonUp(s);
            }
          },
          updateRecording: function () {
            var t = this.scene.ticks,
              e = this.records,
              i = (this.keymap, this.keysToRecord),
              n = this.tickDownButtons,
              s = this.previousTickDownButtons;
            for (var r in i) {
              var o = i[r];
              if ("undefined" != typeof n[o]) {
                var a = n[o],
                  h = !1;
                if (("undefined" != typeof s[o] && (h = s[o]), a !== h)) {
                  var c = o + "_up",
                    l = o + "_down",
                    u = c;
                  a && (u = l),
                    e[u] || (e[u] = []),
                    a || (e[l] && -1 !== e[l].indexOf(t) && (t += 1)),
                    e[u].push(t);
                }
              }
            }
          },
          buttonWasRecentlyDown: function (t) {
            var e = this.records;
            this.replaying && (e = this.playback);
            var i = t + "_down",
              n = !1;
            if (e[i]) {
              var s = this.scene.ticks,
                r = s,
                o = e[i],
                a = -1;
              (a = this.replaying ? "undefined" != typeof o[r] : o.indexOf(r)),
                -1 !== a && (n = !0);
            }
            return n;
          },
          getReplayString: function () {
            return JSON.stringify(this.records);
          },
          encodeReplayString: function (t) {
            var e = this.scene.settings,
              i = { version: e.replayVersion };
            for (var n in t) {
              var s = t[n];
              i[n] = "";
              for (var r in s) {
                var o = s[r];
                i[n] += o.toString(32) + " ";
              }
            }
            return i;
          },
          close: function () {
            this.unlisten(),
              (this.handleButtonUp = null),
              (this.handleButtonDown = null),
              (this.onButtonDown = null),
              (this.onButtonUp = null),
              (this.scene = null),
              (this.tickDownButtons = null),
              (this.downButtons = null),
              (this.keymap = null),
              (this.records = null),
              (this.keysToRecord = null);
          },
        }),
          (e.exports = i);
      },
      { "../../libs/lodash-3.10.1": 77 },
    ],
    52: [
      function (t, e) {
        var i =
          (t("../math/cartesian"),
          Math.round,
          function (t) {
            (this.scene = t),
              (this.screen = t.screen),
              (this.context = t.game.canvas.getContext("2d")),
              (this.clockwise = !1),
              (this.settings = { radius: 10, color: "#1884cf" });
          });
        (i.prototype = {
          scene: null,
          clockwise: !1,
          context: null,
          screen: null,
          pixelRatio: 1,
          draw: function () {
            var t = this.context,
              e = this.screen,
              i = this.settings,
              n = this.scene.game.pixelRatio,
              s = i.radius,
              r = this.clockwise,
              o = ((this.scene.game.tickCount % 25) / 25) * 2 * Math.PI;
            0 === o &&
              (this.clockwise && (o = 2 * Math.PI),
              (this.clockwise = !this.clockwise));
            var a = r ? 0 : o,
              h = r ? o : 0,
              c = e.width - 25 * n,
              l = e.height - 25 * n,
              u = !1;
            t.beginPath(),
              t.arc(c, l, s * n, a, h, u),
              (t.lineWidth = 3 * n),
              (t.strokeStyle = i.color),
              t.stroke();
          },
        }),
          (e.exports = i);
      },
      { "../math/cartesian": 15 },
    ],
    53: [
      function (t, e) {
        function i(t) {
          (this.scene = t),
            (this.message = !1),
            (this.timeout = !1),
            (this.color = "#000");
        }
        var n = i.prototype;
        (n.message = null),
          (n.timeout = null),
          (n.draw = function () {
            var t = this.message,
              e = this.timeout,
              i = this.color,
              n = this.outline;
            if (
              (e !== !1 && 0 >= e && (t = !1),
              this.scene.paused &&
                ((i = !1),
                (n = !1),
                (t = this.scene.settings.mobile
                  ? "Paused"
                  : "Paused - Press Spacebar to Continue")),
              i === !1 && (i = "#333333"),
              t)
            ) {
              var s = this.scene.game,
                r = this.scene,
                o = s.pixelRatio,
                a = s.canvas.getContext("2d"),
                h = r.screen.center.x,
                c = 100,
                l = r.settings;
              "phone" === l.controls && (c = 80),
                a.save(),
                (a.fillStyle = i),
                (a.lineWidth = 4 * (o / 2)),
                (a.font = 12 * o + "pt helsinki"),
                (a.textAlign = "center"),
                n &&
                  ((a.strokeStyle = n),
                  a.strokeText(t, h, c * o),
                  (a.strokeStyle = "#000")),
                a.fillText(t, h, c * o),
                a.restore();
            }
          }),
          (n.show = function (t, e, i, n) {
            (this.message = t),
              (this.timeout = e),
              (this.color = i),
              (this.outline = n);
          }),
          (n.hide = function () {
            (this.message = !1), (this.color = !1), (this.outline = !1);
          }),
          (n.update = function () {
            this.timeout !== !1 && this.timeout--;
          }),
          (e.exports = i);
      },
      {},
    ],
    54: [
      function (t, e) {
        var i = t("../math/cartesian"),
          n = t("../../libs/lodash-3.10.1"),
          s = t("events").EventEmitter,
          r = Math.round,
          o = function (t) {
            (this.scene = t),
              (this.enabled = !0),
              (this.touch = this.getTouchObject()),
              (this.touch.old = this.getTouchObject()),
              (this.secondaryTouch = this.getTouchObject()),
              (this.secondaryTouch.old = this.getTouchObject()),
              this.initAnalytics(),
              this.bindToMouseEvents(),
              (this.updateCallback = !1);
          },
          a = (o.prototype = new s());
        (a.scene = null),
          (a.touch = null),
          (a.touches = []),
          (a.wheel = !1),
          (a.mousewheel = !1),
          (a.mouseMoveListener = null),
          (a.mouseUpListener = null),
          (a.mouseDownListener = null),
          (a.throttledMouseWheel = null),
          (a.analytics = null),
          (a.contextMenuHandler = function (t) {
            return t.stopPropagation(), t.preventDefault(), !1;
          }),
          (a.initAnalytics = function () {
            this.analytics = { clicks: 0 };
          }),
          (a.getTouchObject = function () {
            var t = {
              id: null,
              down: !1,
              press: !1,
              release: !1,
              pos: new i(0, 0),
              real: new i(0, 0),
              type: 1,
            };
            return t;
          }),
          (a.bindToMouseEvents = function () {
            var t = this.scene.game.stage,
              e = this.scene.game.canvas,
              i = this.onMouseMove.bind(this),
              s = this.onMouseDown.bind(this),
              r = this.onMouseUp.bind(this);
            t.addEventListener("stagemousemove", i),
              t.addEventListener("stagemousedown", s),
              t.addEventListener("stagemouseup", r),
              (this.mouseMoveListener = i),
              (this.mouseDownListener = s),
              (this.mouseUpListener = r);
            var o = n.throttle(this.onMouseWheel, 0);
            e.addEventListener("mousewheel", o.bind(this)),
              e.addEventListener("wheel", o.bind(this)),
              e.addEventListener("DOMMouseScroll", o.bind(this)),
              (this.mouseWheelListener = o);
          }),
          (a.onMouseDown = function (t) {
            this.analytics.clicks++,
              2 === t.nativeEvent.button
                ? this.secondaryTouch.down === !1 &&
                  (this.updatePosition(t, this.secondaryTouch),
                  (this.secondaryTouch.down = !0))
                : this.touch.down === !1 &&
                  (this.updatePosition(t, this.touch), (this.touch.down = !0));
          }),
          (a.disableContextMenu = function () {
            this.scene.game.canvas.oncontextmenu = function () {
              return !1;
            };
          }),
          (a.onMouseUp = function (t) {
            2 === t.nativeEvent.button
              ? this.secondaryTouch.down === !0 &&
                (this.updatePosition(t, this.secondaryTouch),
                (this.secondaryTouch.down = !1))
              : this.touch.down === !0 &&
                (this.updatePosition(t, this.touch), (this.touch.down = !1));
          }),
          (a.updatePosition = function (t, e) {
            (e.id = t.pointerID), (e.type = t.nativeEvent.button);
            var i = e.pos;
            (i.x = t.stageX), (i.y = t.stageY), this.updateRealPosition(e);
          }),
          (a.updateRealPosition = function (t) {
            var e = (t.old, t.pos),
              i = t.real,
              n = (t.down, this.scene),
              s = n.screen,
              o = n.camera,
              a = s.center,
              h = o.position,
              c = (e.x - a.x) / o.zoom + h.x,
              l = (e.y - a.y) / o.zoom + h.y;
            (i.x = r(c)), (i.y = r(l));
            var u = this.scene.settings;
            if (this.scene.toolHandler.options.grid) {
              var p = u.toolHandler.gridSize;
              (i.x = r(i.x / p) * p), (i.y = r(i.y / p) * p);
            }
            this.updateCallback;
          }),
          (a.onMouseWheel = function (t) {
            var t = window.event || t;
            t.preventDefault(), t.stopPropagation();
            var e = Math.max(-1, Math.min(1, t.deltaY || -t.detail));
            return (
              0 == e && (e = Math.max(-1, Math.min(1, t.deltaX || -t.detail))),
              (this.wheel = -e),
              !1
            );
          }),
          (a.onMouseMove = function (t) {
            this.updatePosition(t, this.touch),
              this.updatePosition(t, this.secondaryTouch);
          }),
          (a.update = function () {
            this.enabled &&
              (this.updateTouch(this.touch),
              this.updateTouch(this.secondaryTouch),
              this.updateWheel());
          }),
          (a.updateTouch = function (t) {
            var e = t.old,
              i = t.pos,
              n = t.real,
              s = t.down;
            (e.pos.x = i.x),
              (e.pos.y = i.y),
              (e.real.x = n.x),
              (e.real.y = n.y),
              !e.down && s && (t.press = !0),
              e.down && !s && (t.release = !0),
              e.press && (t.press = !1),
              e.release && (t.release = !1),
              this.updateRealPosition(t),
              (e.down = t.down),
              (e.press = t.press),
              (e.release = t.release);
          }),
          (a.updateWheel = function () {
            (this.mousewheel = this.wheel), (this.wheel = !1);
          }),
          (a.close = function () {
            var t = this.scene.game.stage,
              e = this.scene.game.canvas;
            t.removeAllEventListeners(),
              e.removeEventListener("mousewheel", this.mouseWheelListener),
              e.removeEventListener("DOMMouseScroll", this.mouseWheelListener),
              (this.touches = null),
              (this.touch = null),
              (this.scene = null),
              (this.wheel = null),
              (this.mouseMoveListener = null),
              (this.mouseDownListener = null),
              (this.mouseUpListener = null);
          }),
          (e.exports = o);
      },
      { "../../libs/lodash-3.10.1": 77, "../math/cartesian": 15, events: 1 },
    ],
    55: [
      function (t, e) {
        function i() {
          (this.start = null), (this.end = null), (this.verticies = []);
        }
        (i.prototype = {
          start: null,
          end: null,
          verticies: [],
          build: function (t) {
            var e = t.pop();
            (this.start = e.p1), (this.end = e.p2), this.verticies.push(e);
            for (var i = t.length, n = i - 1; n >= 0; n--) {
              var s = t[n],
                r = s.p1,
                o = s.p2;
              this.start.x === o.x && this.start.y === o.y
                ? (this.verticies.unshift(s),
                  (this.start = s.p1),
                  t.splice(n, 1))
                : this.end.x === r.x &&
                  this.end.y === r.y &&
                  (this.verticies.push(s), (this.end = s.p2), t.splice(n, 1));
            }
          },
        }),
          (e.exports = i);
      },
      {},
    ],
    56: [
      function (t, e) {
        function i(t) {
          (this.scene = t),
            (this.maxRaces = this.scene.settings.mobile ? 3 : 10),
            this.createContainer();
        }
        var n = t("./formatnumber"),
          s = i.prototype;
        (s.container = null),
          (s.raceList = []),
          (s.raceCount = 0),
          (s.highlightedRace = null),
          (s.raceOpacity = 0.3),
          (s.raceYOffset = 50),
          (s.mobileRaceXOffset = 180),
          (s.maxRaces = 10),
          (s.createContainer = function () {
            var t = this.scene.game,
              e = t.settings,
              i = t.pixelRatio,
              n = i / 2.5,
              s = new createjs.Container();
            (s.scaleX = s.scaleY = n),
              (s.y = 80 * n),
              (s.x = 15 * n),
              e.isCampaign && (s.y += 55 * n),
              (this.container = s),
              t.stage.addChild(s);
          }),
          (s.clear = function () {
            this.container.removeAllChildren(),
              (this.raceList = []),
              (this.raceCount = 0);
          }),
          (s.centerContainer = function () {
            var t = this.scene,
              e = t.screen,
              i = this.container,
              n = i.getBounds(),
              s = this.scene.game.pixelRatio;
            i.x = e.width / 2 - (n.width / 2) * i.scaleY;
            var r = 40;
            t.settings.isCampaign && (i.visible = !1), (i.y = r * s);
          }),
          (s.addRace = function (t, e) {
            if (this.raceCount < this.maxRaces) {
              var i = this.scene,
                s = i.game,
                r = (s.pixelRatio, t.user),
                o = t.race,
                a = i.settings,
                h = a.drawFPS,
                c = r.color,
                l = "helsinki",
                u = new createjs.Container(),
                p = (i.camera, new createjs.Shape()),
                d = p.graphics;
              d.setStrokeStyle(4, "round"),
                d.beginFill(c).drawCircle(0, 0, 20),
                (p.x = 25),
                (p.y = 25);
              var f = n((parseInt(o.run_ticks) / h) * 1e3),
                g = new createjs.Text(f, "30px " + l, "#000000");
              (g.x = 55), (g.y = 9);
              var v = new createjs.Text(
                r.d_name.charAt(0),
                "25px " + l,
                "#000000"
              );
              (v.x = 17), (v.y = 33), (v.textBaseline = "alphabetic");
              var m = new createjs.Container();
              m.addChild(p),
                m.addChild(v),
                m.cache(0, 0, 50, 50),
                m.removeAllChildren(),
                u.addChild(m, g),
                (u.alpha = this.raceOpacity),
                a.mobile
                  ? (u.x = e * this.mobileRaceXOffset)
                  : ((u.x = -2), (u.y = e * this.raceYOffset)),
                this.raceList.push(u),
                this.container.addChild(u),
                this.raceCount++;
            }
          }),
          (s.update = function () {
            if (this.raceCount > 0) {
              var t = this.scene.camera;
              t.focusIndex > 0 && t.focusIndex < this.maxRaces
                ? this.highlightRace(t.focusIndex - 1)
                : this.unhighlightRace(),
                this.scene.settings.mobile && this.centerContainer();
            }
          }),
          (s.highlightRace = function (t) {
            if (this.highlightedRace !== this.raceList[t]) {
              this.unhighlightRace();
              var e = this.raceList[t];
              (e.alpha = 1), (this.highlightedRace = e);
            }
          }),
          (s.unhighlightRace = function () {
            this.highlightedRace &&
              ((this.highlightedRace.alpha = this.raceOpacity),
              (this.highlightedRace = null));
          }),
          (e.exports = i);
      },
      { "./formatnumber": 50 },
    ],
    57: [
      function (t, e) {
        function i(t) {
          (this.scene = t), (this.stage = t.game.stage), this.build_interface();
        }
        var n = t("./formatnumber"),
          s = i.prototype;
        (s.container = null),
          (s.cached = !1),
          (s.scene = null),
          (s.state = null),
          (s.offset = { y: 0, x: 0 }),
          (s.build_interface = function () {
            var t = this.scene,
              e = t.game.pixelRatio,
              i = t.settings,
              n = new createjs.Container(),
              s = "helsinki",
              r = new createjs.Text("00:00.00", "40px " + s, "#000000"),
              o = new createjs.Text("TIME:", "20px " + s, "#999999"),
              a = this.get_timer_sprite(),
              h = new createjs.Text(" -- : --.--", "35px " + s, "#999999"),
              c = new createjs.Text("BEST:", "20px " + s, "#999999"),
              l = new createjs.Text("0/0", "40px " + s, "#000000"),
              u = new createjs.Bitmap(t.assets.getResult("targets_icon")),
              p = e / 2.5;
            i.mobile && (p = e / 2.5),
              (r.y = 18),
              (r.x = 57),
              (o.y = 3),
              (o.x = 59),
              (a.y = 0),
              (a.x = 0),
              (h.x = 237),
              (h.y = 21),
              (c.x = 240),
              (c.y = 3),
              (l.y = 15),
              (l.x = 460),
              (u.y = 0),
              (u.x = 400),
              n.addChild(r),
              n.addChild(o),
              n.addChild(a),
              n.addChild(h),
              n.addChild(c),
              n.addChild(l),
              n.addChild(u),
              (n.scaleX = n.scaleY = p),
              (n.y = (10 + this.offset.y) * p),
              (n.x = 10 * p),
              (this.best_time_title = c),
              (this.time_title = o),
              (this.container = n),
              (this.time = r),
              (this.goals = l),
              (this.best_time = h),
              this.stage.addChild(n);
          }),
          (s.update = function () {
            var t = this.scene,
              e = t.ticks,
              i = t.settings,
              s = t.track,
              r = t.playerManager.firstPlayer;
            this.cached === !1 &&
              e > 50 &&
              ((this.cached = !0), this.cache_fixed_text());
            var o = e / i.drawFPS;
            this.time.text = n(1e3 * o);
            var a = s.targetCount,
              h = r.getTargetsHit();
            this.goals.text = h + "/" + a;
            var c = " -- : --.--";
            i.isCampaign && i.campaignData.user.best_time
              ? (c = i.campaignData.user.best_time)
              : i.userTrackStats &&
                i.userTrackStats.best_time &&
                (c = i.userTrackStats.best_time),
              (this.best_time.text = c),
              i.mobile && this.center_container();
          }),
          (s.center_container = function () {
            var t = this.container,
              e = t.getBounds(),
              i = this.scene.screen,
              n = this.scene.game.pixelRatio;
            (t.x = i.width / 2 - (e.width / 2) * t.scaleY), (t.y = 10 * n);
          }),
          (s.cache_fixed_text = function () {
            var t,
              e = this.best_time_title,
              i = this.time_title,
              n = 10;
            (t = e.getBounds()),
              e.cache(t.x, t.y, t.width, t.height + n),
              (t = i.getBounds()),
              i.cache(t.x, t.y, t.width, t.height + n);
          }),
          (s.get_timer_sprite = function () {
            var t = this.scene.assets.getResult("time_icon"),
              e = { images: [t], frames: { width: 60, height: 60 } },
              i = new createjs.SpriteSheet(e),
              n = new createjs.Sprite(i);
            return n;
          }),
          (e.exports = i);
      },
      { "./formatnumber": 50 },
    ],
    58: [
      function (t, e) {
        var i =
          i ||
          (function (t, e) {
            var i = {},
              n = (i.lib = {}),
              s = function () {},
              r = (n.Base = {
                extend: function (t) {
                  s.prototype = this;
                  var e = new s();
                  return (
                    t && e.mixIn(t),
                    e.hasOwnProperty("init") ||
                      (e.init = function () {
                        e.$super.init.apply(this, arguments);
                      }),
                    (e.init.prototype = e),
                    (e.$super = this),
                    e
                  );
                },
                create: function () {
                  var t = this.extend();
                  return t.init.apply(t, arguments), t;
                },
                init: function () {},
                mixIn: function (t) {
                  for (var e in t) t.hasOwnProperty(e) && (this[e] = t[e]);
                  t.hasOwnProperty("toString") && (this.toString = t.toString);
                },
                clone: function () {
                  return this.init.prototype.extend(this);
                },
              }),
              o = (n.WordArray = r.extend({
                init: function (t, i) {
                  (t = this.words = t || []),
                    (this.sigBytes = i != e ? i : 4 * t.length);
                },
                toString: function (t) {
                  return (t || h).stringify(this);
                },
                concat: function (t) {
                  var e = this.words,
                    i = t.words,
                    n = this.sigBytes;
                  if (((t = t.sigBytes), this.clamp(), n % 4))
                    for (var s = 0; t > s; s++)
                      e[(n + s) >>> 2] |=
                        ((i[s >>> 2] >>> (24 - 8 * (s % 4))) & 255) <<
                        (24 - 8 * ((n + s) % 4));
                  else if (65535 < i.length)
                    for (s = 0; t > s; s += 4) e[(n + s) >>> 2] = i[s >>> 2];
                  else e.push.apply(e, i);
                  return (this.sigBytes += t), this;
                },
                clamp: function () {
                  var e = this.words,
                    i = this.sigBytes;
                  (e[i >>> 2] &= 4294967295 << (32 - 8 * (i % 4))),
                    (e.length = t.ceil(i / 4));
                },
                clone: function () {
                  var t = r.clone.call(this);
                  return (t.words = this.words.slice(0)), t;
                },
                random: function (e) {
                  for (var i = [], n = 0; e > n; n += 4)
                    i.push((4294967296 * t.random()) | 0);
                  return new o.init(i, e);
                },
              })),
              a = (i.enc = {}),
              h = (a.Hex = {
                stringify: function (t) {
                  var e = t.words;
                  t = t.sigBytes;
                  for (var i = [], n = 0; t > n; n++) {
                    var s = (e[n >>> 2] >>> (24 - 8 * (n % 4))) & 255;
                    i.push((s >>> 4).toString(16)),
                      i.push((15 & s).toString(16));
                  }
                  return i.join("");
                },
                parse: function (t) {
                  for (var e = t.length, i = [], n = 0; e > n; n += 2)
                    i[n >>> 3] |=
                      parseInt(t.substr(n, 2), 16) << (24 - 4 * (n % 8));
                  return new o.init(i, e / 2);
                },
              }),
              c = (a.Latin1 = {
                stringify: function (t) {
                  var e = t.words;
                  t = t.sigBytes;
                  for (var i = [], n = 0; t > n; n++)
                    i.push(
                      String.fromCharCode(
                        (e[n >>> 2] >>> (24 - 8 * (n % 4))) & 255
                      )
                    );
                  return i.join("");
                },
                parse: function (t) {
                  for (var e = t.length, i = [], n = 0; e > n; n++)
                    i[n >>> 2] |= (255 & t.charCodeAt(n)) << (24 - 8 * (n % 4));
                  return new o.init(i, e);
                },
              }),
              l = (a.Utf8 = {
                stringify: function (t) {
                  try {
                    return decodeURIComponent(escape(c.stringify(t)));
                  } catch (e) {
                    throw Error("Malformed UTF-8 data");
                  }
                },
                parse: function (t) {
                  return c.parse(unescape(encodeURIComponent(t)));
                },
              }),
              u = (n.BufferedBlockAlgorithm = r.extend({
                reset: function () {
                  (this._data = new o.init()), (this._nDataBytes = 0);
                },
                _append: function (t) {
                  "string" == typeof t && (t = l.parse(t)),
                    this._data.concat(t),
                    (this._nDataBytes += t.sigBytes);
                },
                _process: function (e) {
                  var i = this._data,
                    n = i.words,
                    s = i.sigBytes,
                    r = this.blockSize,
                    a = s / (4 * r),
                    a = e ? t.ceil(a) : t.max((0 | a) - this._minBufferSize, 0);
                  if (((e = a * r), (s = t.min(4 * e, s)), e)) {
                    for (var h = 0; e > h; h += r) this._doProcessBlock(n, h);
                    (h = n.splice(0, e)), (i.sigBytes -= s);
                  }
                  return new o.init(h, s);
                },
                clone: function () {
                  var t = r.clone.call(this);
                  return (t._data = this._data.clone()), t;
                },
                _minBufferSize: 0,
              }));
            n.Hasher = u.extend({
              cfg: r.extend(),
              init: function (t) {
                (this.cfg = this.cfg.extend(t)), this.reset();
              },
              reset: function () {
                u.reset.call(this), this._doReset();
              },
              update: function (t) {
                return this._append(t), this._process(), this;
              },
              finalize: function (t) {
                return t && this._append(t), this._doFinalize();
              },
              blockSize: 16,
              _createHelper: function (t) {
                return function (e, i) {
                  return new t.init(i).finalize(e);
                };
              },
              _createHmacHelper: function (t) {
                return function (e, i) {
                  return new p.HMAC.init(t, i).finalize(e);
                };
              },
            });
            var p = (i.algo = {});
            return i;
          })(Math);
        !(function (t) {
          for (
            var e = i,
              n = e.lib,
              s = n.WordArray,
              r = n.Hasher,
              n = e.algo,
              o = [],
              a = [],
              h = function (t) {
                return (4294967296 * (t - (0 | t))) | 0;
              },
              c = 2,
              l = 0;
            64 > l;

          ) {
            var u;
            t: {
              u = c;
              for (var p = t.sqrt(u), d = 2; p >= d; d++)
                if (!(u % d)) {
                  u = !1;
                  break t;
                }
              u = !0;
            }
            u &&
              (8 > l && (o[l] = h(t.pow(c, 0.5))),
              (a[l] = h(t.pow(c, 1 / 3))),
              l++),
              c++;
          }
          var f = [],
            n = (n.SHA256 = r.extend({
              _doReset: function () {
                this._hash = new s.init(o.slice(0));
              },
              _doProcessBlock: function (t, e) {
                for (
                  var i = this._hash.words,
                    n = i[0],
                    s = i[1],
                    r = i[2],
                    o = i[3],
                    h = i[4],
                    c = i[5],
                    l = i[6],
                    u = i[7],
                    p = 0;
                  64 > p;
                  p++
                ) {
                  if (16 > p) f[p] = 0 | t[e + p];
                  else {
                    var d = f[p - 15],
                      g = f[p - 2];
                    f[p] =
                      (((d << 25) | (d >>> 7)) ^
                        ((d << 14) | (d >>> 18)) ^
                        (d >>> 3)) +
                      f[p - 7] +
                      (((g << 15) | (g >>> 17)) ^
                        ((g << 13) | (g >>> 19)) ^
                        (g >>> 10)) +
                      f[p - 16];
                  }
                  (d =
                    u +
                    (((h << 26) | (h >>> 6)) ^
                      ((h << 21) | (h >>> 11)) ^
                      ((h << 7) | (h >>> 25))) +
                    ((h & c) ^ (~h & l)) +
                    a[p] +
                    f[p]),
                    (g =
                      (((n << 30) | (n >>> 2)) ^
                        ((n << 19) | (n >>> 13)) ^
                        ((n << 10) | (n >>> 22))) +
                      ((n & s) ^ (n & r) ^ (s & r))),
                    (u = l),
                    (l = c),
                    (c = h),
                    (h = (o + d) | 0),
                    (o = r),
                    (r = s),
                    (s = n),
                    (n = (d + g) | 0);
                }
                (i[0] = (i[0] + n) | 0),
                  (i[1] = (i[1] + s) | 0),
                  (i[2] = (i[2] + r) | 0),
                  (i[3] = (i[3] + o) | 0),
                  (i[4] = (i[4] + h) | 0),
                  (i[5] = (i[5] + c) | 0),
                  (i[6] = (i[6] + l) | 0),
                  (i[7] = (i[7] + u) | 0);
              },
              _doFinalize: function () {
                var e = this._data,
                  i = e.words,
                  n = 8 * this._nDataBytes,
                  s = 8 * e.sigBytes;
                return (
                  (i[s >>> 5] |= 128 << (24 - (s % 32))),
                  (i[(((s + 64) >>> 9) << 4) + 14] = t.floor(n / 4294967296)),
                  (i[(((s + 64) >>> 9) << 4) + 15] = n),
                  (e.sigBytes = 4 * i.length),
                  this._process(),
                  this._hash
                );
              },
              clone: function () {
                var t = r.clone.call(this);
                return (t._hash = this._hash.clone()), t;
              },
            }));
          (e.SHA256 = r._createHelper(n)),
            (e.HmacSHA256 = r._createHmacHelper(n));
        })(Math),
          (e.exports = i);
      },
      {},
    ],
    59: [
      function (t, e) {
        "use strict";
        var i =
          (Math.min,
          function (t) {
            (this.scene = t), (this.sounds = {});
          });
        (i.prototype = {
          sounds: null,
          update: function () {
            var t = createjs.Sound,
              e = this.scene,
              i = e.settings;
            t.setMute(e.paused || i.soundsEnabled === !1 ? !0 : !1);
          },
          setVolume: function (t, e) {
            this.sounds[t] && (this.sounds[t].volume = e);
          },
          muted: !1,
          mute_all: function () {
            var t = this.sounds;
            for (var e in t) t.hasOwnProperty(e) && (t[e].volume = 0);
            this.muted = !0;
          },
          stop_all: function () {
            var t = this.sounds;
            for (var e in t)
              t.hasOwnProperty(e) && ((t[e].volume = 0), t[e].stop());
          },
          play: function (t, e) {
            if (
              ((null === e || "undefined" == typeof e) && (e = 1),
              this.sounds[t])
            )
              this.sounds[t].volume = e;
            else if (this.scene.settings.soundsEnabled) {
              var i = createjs.Sound.play(t, { volume: e }),
                n = this;
              i.addEventListener("complete", function () {
                n.sounds[t] = null;
              }),
                (this.sounds[t] = i);
            }
          },
          stop: function (t) {
            this.sounds[t] && (this.sounds[t].stop(), (this.sounds[t] = null));
          },
          close: function () {
            this.sounds = null;
          },
        }),
          (e.exports = i);
      },
      {},
    ],
    60: [
      function (t, e) {
        function i(t) {
          (this.scene = t),
            (this.settings = t.settings),
            (this.player = !1),
            this.build_interface(),
            this.createPulseTween();
        }
        var n = t("../../libs/tween"),
          s = i.prototype;
        (s.scene = null),
          (s.container = null),
          (s.cached = !1),
          (s.build_interface = function () {
            var t = this.scene.game.pixelRatio,
              e = new createjs.Container(),
              i = "helsinki",
              n = new createjs.Shape();
            n.graphics
              .setStrokeStyle(5, "round")
              .beginStroke("rgba(242,144,66,1)")
              .beginFill("rgba(242,144,66,0.5)")
              .drawRoundRect(0, 0, 200, 60, 25);
            var s = new createjs.Text("00:00", "35px " + i, "#000000");
            (s.textAlign = "center"),
              (s.textBaseline = "middle"),
              (s.x = 100),
              (s.y = 30),
              e.addChild(n),
              e.addChild(s),
              (e.visible = !1),
              (e.scaleX = e.scaleY = t / 2),
              (this.timeText = s),
              (this.container = e),
              this.scene.game.stage.addChild(e),
              this.center_container();
          }),
          (s.setPlayer = function (t) {
            this.player = t;
          }),
          (s.removePlayer = function () {
            this.player = !1;
          }),
          (s.playerAddedTime = function (t) {
            this.player === t && this.createPulseTween();
          }),
          (s.createPulseTween = function () {
            var t = this.container,
              e = this.scene.game.pixelRatio,
              i = e / 2,
              s = { scale: i },
              r = { scale: 1.2 * i };
            this.pulse = new n.Tween(s)
              .to(r, 200)
              .repeat(1)
              .yoyo(!0)
              .easing(n.Easing.Cubic.InOut)
              .onUpdate(function () {
                t.scaleX = t.scaleY = this.scale;
              })
              .start();
          }),
          (s.center_container = function () {
            var t = this.scene.screen,
              e = this.container;
            (e.x = t.width / 2 - 100 * e.scaleX),
              (e.y = t.height - 100 * e.scaleY);
          }),
          (s.update = function () {
            n.update(),
              this.player && this.player._tempVehicleTicks > 0
                ? (this.center_container(), this.updateTime())
                : (this.container.visible = !1);
          }),
          (s.updateTime = function () {
            var t = (this.container, this.timeText),
              e = (this.player, this.player._tempVehicleTicks),
              i = this.scene.settings.drawFPS,
              n = e / i;
            n = n.toFixed(2);
            var s = "";
            10 > n && (s = "0"),
              (s += n),
              (t.text = s),
              (this.container.visible = !0);
          }),
          (s.close = function () {
            (this.container = null),
              (this.player = null),
              (this.scene = null),
              (this.settings = null),
              (this.timeText = null);
          }),
          (e.exports = i);
      },
      { "../../libs/tween": 79 },
    ],
    61: [
      function (t, e) {
        function i(t, e, i, n) {
          this.vehicleInit(t),
            this.createMasses(e, n),
            this.createSprings(),
            this.updateCameraFocalPoint(),
            this.stopSounds(),
            -1 === i && this.swap();
        }
        e.exports = i;
        var n = t("../math/cartesian"),
          s = t("./mass"),
          r = t("./spring"),
          o = t("./vehicle"),
          a = t("./wheel"),
          h = t("./ragdoll"),
          c = (Math.PI, Math.atan2),
          l = Math.floor,
          u = Math.random,
          p = Math.min,
          d = {
            BIKE_GROUND: "bike_ground",
            BIKE_AIR: "bike_air",
            BIKE_FALL_1: "bike_fall_1",
            BIKE_FALL_2: "bike_fall_2",
            BIKE_FALL_3: "bike_fall_3",
          },
          f = (i.prototype = new o());
        (f.vehicleName = "BMX"),
          (f.vehicleInit = f.init),
          (f.vehicleUpdate = f.update),
          (f.masses = null),
          (f.springs = null),
          (f.cosmetics = null),
          (f.slow = !1),
          (f.pedala = 0),
          (f.cosmeticHead = null),
          (f.cosmeticRearWheel = null),
          (f.cosmeticFrontWheel = null),
          (f.swapped = !1),
          (f.ragdoll = null),
          (f.createMasses = function (t, e) {
            this.masses = [];
            var i = new s(),
              r = new a(new n(t.x + 21, t.y + 3), this),
              o = new a(new n(t.x + -21, t.y + 3), this);
            i.init(new n(t.x, t.y - 36), this),
              (i.drive = this.createRagdoll.bind(this)),
              (o.radius = 11.7),
              (r.radius = 11.7),
              (i.radius = 14),
              i.vel.equ(e),
              o.vel.equ(e),
              r.vel.equ(e),
              this.masses.push(i),
              this.masses.push(o),
              this.masses.push(r),
              (this.head = i),
              (this.frontWheel = r),
              (this.rearWheel = o);
          }),
          (f.createSprings = function () {
            this.springs = [];
            var t = new r(this.head, this.rearWheel, this),
              e = new r(this.rearWheel, this.frontWheel, this),
              i = new r(this.frontWheel, this.head, this);
            (e.lrest = 42),
              (e.leff = 42),
              (e.springConstant = 0.35),
              (e.dampConstant = 0.3),
              (t.lrest = 45),
              (t.leff = 45),
              (t.springConstant = 0.35),
              (t.dampConstant = 0.3),
              (i.lrest = 45),
              (i.leff = 45),
              (i.springConstant = 0.35),
              (i.dampConstant = 0.3),
              this.springs.push(t),
              this.springs.push(e),
              this.springs.push(i),
              (this.rearSpring = t),
              (this.chasse = e),
              (this.frontSpring = i);
          }),
          (f.createRagdoll = function () {
            (this.ragdoll = new h(this.getStickMan(), this)),
              this.ragdoll.zero(this.head.vel, this.rearWheel.vel),
              (this.ragdoll.dir = this.dir),
              (this.rearWheel.motor = 0),
              (this.rearWheel.brake = !1),
              (this.frontWheel.brake = !1),
              (this.head.collide = !1),
              this.updateCameraFocalPoint(),
              this.player.isInFocus() && this.playBailSound(),
              this.dead();
          }),
          (f.stopSounds = function () {
            var t = this.scene.sound;
            t.stop(d.BIKE_AIR), t.stop(d.BIKE_GROUND);
          }),
          (f.playBailSound = function () {
            var t = this.scene.sound,
              e = p(this.speed / 50, 1),
              i = l(3 * u()) + 1;
            switch (i) {
              case 1:
                t.play(d.BIKE_FALL_1, e);
                break;
              case 2:
                t.play(d.BIKE_FALL_2, e);
                break;
              case 3:
                t.play(d.BIKE_FALL_3, e);
            }
          }),
          (f.updateCameraFocalPoint = function () {
            this.focalPoint = this.ragdoll ? this.ragdoll.head : this.head;
          }),
          (f.getStickMan = function () {
            var t = this.dir,
              e = this.head,
              i = this.frontWheel,
              s = this.rearWheel,
              r = this.pedala,
              o = i.pos.sub(s.pos),
              a = e.pos.sub(i.pos.add(s.pos).factor(0.5)),
              h = new n(o.y * t, -o.x * t),
              c = {};
            (c.head = s.pos.add(o.factor(0.35)).add(a.factor(1.2))),
              (c.lHand = c.rHand =
                s.pos.add(o.factor(0.8)).add(h.factor(0.68)));
            var l = c.head.sub(c.lHand);
            (l = new n(l.y * t, -l.x * t)),
              (c.lElbow = c.rElbow =
                c.head
                  .add(c.lHand)
                  .factor(0.5)
                  .add(l.factor(130 / l.lenSqr()))),
              (c.waist = s.pos.add(o.factor(0.2)).add(h.factor(0.5)));
            var u = new n(6 * Math.cos(r), 6 * Math.sin(r));
            return (
              (c.lFoot = s.pos.add(o.factor(0.4)).add(h.factor(0.05)).add(u)),
              (l = c.waist.sub(c.lFoot)),
              (l = new n(-l.y * t, l.x * t)),
              (c.lKnee = c.waist
                .add(c.lFoot)
                .factor(0.5)
                .add(l.factor(160 / l.lenSqr()))),
              (c.rFoot = s.pos.add(o.factor(0.4)).add(h.factor(0.05)).sub(u)),
              (l = c.waist.sub(c.rFoot)),
              (l = new n(-l.y * t, l.x * t)),
              (c.rKnee = c.waist
                .add(c.rFoot)
                .factor(0.5)
                .add(l.factor(160 / l.lenSqr()))),
              c
            );
          }),
          (f.update = function () {
            if (
              (this.crashed === !1 && (this.updateSound(), this.control()),
              this.explosion)
            )
              this.explosion.update();
            else {
              for (var t = this.springs, e = t.length, i = e - 1; i >= 0; i--)
                t[i].update();
              for (var n = this.masses, s = n.length, r = s - 1; r >= 0; r--)
                n[r].update();
              if (
                (this.rearWheel.contact &&
                  this.frontWheel.contact &&
                  (this.slow = !1),
                this.slow === !1)
              ) {
                this.crashed === !1 && this.control();
                for (var i = e - 1; i >= 0; i--) t[i].update();
                for (var r = s - 1; r >= 0; r--) n[r].update();
              }
              this.ragdoll ? this.ragdoll.update() : this.updateDrawHeadAngle();
            }
            this.updateCameraFocalPoint();
          }),
          (f.updateSound = function () {
            if (this.player.isInFocus()) {
              this.updateSpeed();
              var t = p(this.speed / 50, 1),
                e = this.scene.sound;
              this.rearWheel.contact || this.frontWheel.contact
                ? (e.play(d.BIKE_GROUND, t), e.stop(d.BIKE_AIR))
                : (e.play(d.BIKE_AIR, t), e.stop(d.BIKE_GROUND));
            }
          }),
          (f.stopSounds = function () {
            var t = this.scene.sound;
            t.stop(d.BIKE_AIR), t.stop(d.BIKE_GROUND);
          }),
          (f.swap = function () {
            (this.dir = -1 * this.dir), this.chasse.swap();
            var t = this.rearSpring.leff;
            (this.rearSpring.leff = this.frontSpring.leff),
              (this.frontSpring.leff = t);
          }),
          (f.control = function () {
            var t = this.gamepad,
              e = t.isButtonDown("up"),
              i = t.isButtonDown("down"),
              n = (t.isButtonDown("back"), t.isButtonDown("left")),
              s = t.isButtonDown("right"),
              r = t.isButtonDown("z"),
              o = e ? 1 : 0,
              a = this.rearWheel;
            (a.motor += (o - a.motor) / 10),
              r && !this.swapped && (this.swap(), (this.swapped = !0)),
              r || (this.swapped = !1),
              e && (this.pedala += this.rearWheel.speed / 5),
              (a.brake = i),
              i && this.frontSpring.contract(-10, 10),
              (this.frontWheel.brake =
                this.dir > 0 && s && i ? !0 : this.dir < 0 && n && i ? !0 : !1);
            var h = n ? 1 : 0;
            (h += s ? -1 : 0),
              this.rearSpring.contract(5 * h * this.dir, 5),
              this.frontSpring.contract(5 * -h * this.dir, 5),
              this.chasse.rotate(h / 6),
              !h &&
                e &&
                (this.rearSpring.contract(-7, 5),
                this.frontSpring.contract(7, 5));
          }),
          (f.draw = function () {
            if (this.explosion) this.explosion.draw();
            else {
              var t = this.scene.game.canvas.getContext("2d");
              if (
                ((t.imageSmoothingEnabled = !0),
                (t.webkitImageSmoothingEnabled = !0),
                (t.mozImageSmoothingEnabled = !0),
                this.settings.developerMode)
              )
                for (var e = this.masses, i = e.length, n = i - 1; n >= 0; n--)
                  e[n].draw();
              this.drawBikeFrame();
            }
          }),
          (f.updateDrawHeadAngle = function () {
            var t = this.frontWheel.pos,
              e = this.rearWheel.pos,
              i = t.x,
              n = t.y,
              s = e.x,
              r = e.y,
              o = i - s,
              a = n - r;
            this.drawHeadAngle = -(c(o, a) - Math.PI / 2);
          }),
          (f.drawBikeFrame = function () {
            var t = this.scene,
              e = this.rearWheel.pos.toScreen(t),
              i = this.frontWheel.pos.toScreen(t),
              s = this.head.pos.toScreen(t),
              r = (t.game.pixelRatio, this.player._opacity),
              o = i.sub(e),
              a = new n((i.y - e.y) * this.dir, (e.x - i.x) * this.dir),
              h = this.pedala,
              c = this.dir,
              l = t.camera.zoom,
              u = t.game.canvas.getContext("2d");
            (u.globalAlpha = r),
              (u.strokeStyle = "rgba(0,0,0,1)"),
              (u.lineWidth = 3 * l),
              (u.lineCap = "round"),
              (u.lineJoin = "round"),
              u.beginPath(),
              (u.fillStyle = "rgba(200,200, 200, 0.2)"),
              u.arc(i.x, i.y, 10.5 * l, 0, 2 * Math.PI, !1),
              u.fill(),
              u.stroke(),
              u.beginPath(),
              u.arc(e.x, e.y, 10.5 * l, 0, 2 * Math.PI, !1),
              u.fill(),
              u.stroke();
            var p = e.add(o.factor(0.3)).add(a.factor(0.25)),
              d = e.add(o.factor(0.4)).add(a.factor(0.05)),
              f = e.add(o.factor(0.84)).add(a.factor(0.42)),
              g = e.add(o.factor(0.84)).add(a.factor(0.37));
            u.beginPath(),
              (u.strokeStyle = "rgba(0,0,0,1)"),
              u.moveTo(e.x, e.y),
              u.lineTo(p.x, p.y),
              u.lineTo(f.x, f.y),
              u.moveTo(g.x, g.y),
              u.lineTo(d.x, d.y),
              u.lineTo(e.x, e.y),
              u.stroke(),
              u.beginPath(),
              (u.strokeStyle = "rgba(0,0,0,1)"),
              (u.lineWidth = Math.max(1 * l, 0.5)),
              u.arc(d.x, d.y, 3 * l, 0, 2 * Math.PI, !1),
              u.stroke();
            var v = new n(6 * Math.cos(h) * l, 6 * Math.sin(h) * l),
              m = d.add(v),
              y = d.sub(v);
            u.beginPath(), u.moveTo(m.x, m.y), u.lineTo(y.x, y.y), u.stroke();
            var w = e.add(o.factor(0.25)).add(a.factor(0.4)),
              _ = e.add(o.factor(0.17)).add(a.factor(0.38)),
              x = e.add(o.factor(0.3)).add(a.factor(0.45));
            u.beginPath(),
              (u.strokeStyle = "rgba(0,0,0,1)"),
              (u.lineWidth = 3 * l),
              u.moveTo(_.x, _.y),
              u.lineTo(x.x, x.y),
              u.moveTo(d.x, d.y),
              u.lineTo(w.x, w.y);
            var b = e.add(o.factor(1)).add(a.factor(0)),
              T = e.add(o.factor(0.97)).add(a.factor(0)),
              k = e.add(o.factor(0.8)).add(a.factor(0.48));
            u.moveTo(b.x, b.y), u.lineTo(T.x, T.y), u.lineTo(k.x, k.y);
            var S = e.add(o.factor(0.86)).add(a.factor(0.5)),
              C = e.add(o.factor(0.82)).add(a.factor(0.65)),
              P = e.add(o.factor(0.78)).add(a.factor(0.67));
            if (
              (u.moveTo(k.x, k.y),
              u.lineTo(S.x, S.y),
              u.lineTo(C.x, C.y),
              u.lineTo(P.x, P.y),
              u.stroke(),
              this.crashed)
            )
              this.ragdoll && this.ragdoll.draw();
            else {
              a = s.sub(e.add(o.factor(0.5)));
              var M = p.add(o.factor(-0.1)).add(a.factor(0.3)),
                E = m.sub(M),
                D = new n(E.y * c, -E.x * c);
              D = D.factor(l * l);
              var I = M.add(E.factor(0.5)).add(D.factor(200 / E.lenSqr())),
                A = m.add(E.factor(0.12)).add(D.factor(50 / E.lenSqr()));
              (E = y.sub(M)),
                (D = new n(E.y * c, -E.x * c)),
                (D = D.factor(l * l));
              var O = M.add(E.factor(0.5)).add(D.factor(200 / E.lenSqr())),
                j = y.add(E.factor(0.12)).add(D.factor(50 / E.lenSqr()));
              (u.strokeStyle = "rgba(0,0,0,0.5)"),
                (u.lineWidth = 6 * l),
                u.beginPath(),
                u.moveTo(y.x, y.y),
                u.lineTo(O.x, O.y),
                u.lineTo(M.x, M.y),
                u.stroke(),
                (u.lineWidth = 4 * l),
                u.beginPath(),
                u.moveTo(y.x, y.y),
                u.lineTo(j.x, j.y),
                u.stroke(),
                (u.lineWidth = 6 * l),
                (u.strokeStyle = "rgba(0,0,0,1)"),
                u.beginPath(),
                u.moveTo(m.x, m.y),
                u.lineTo(I.x, I.y),
                u.lineTo(M.x, M.y),
                u.stroke(),
                (u.lineWidth = 6 * l),
                u.beginPath(),
                u.moveTo(m.x, m.y),
                u.lineTo(A.x, A.y),
                u.stroke();
              var L = p.add(o.factor(0.05)).add(a.factor(0.9));
              (u.lineWidth = 8 * l),
                u.beginPath(),
                u.moveTo(M.x, M.y),
                u.lineTo(L.x, L.y),
                u.stroke();
              var F = p.add(o.factor(0.15)).add(a.factor(1.05));
              (o = L.sub(P)),
                (a = new n(o.y * c, -o.x * c)),
                (a = a.factor(l * l));
              var B = P.add(o.factor(0.4)).add(a.factor(130 / o.lenSqr()));
              (u.lineWidth = 5 * l),
                u.beginPath(),
                u.moveTo(L.x, L.y),
                u.lineTo(B.x, B.y),
                u.lineTo(P.x, P.y),
                u.stroke();
              var z = this.cosmetics,
                R = GameInventoryManager.getItem(z.head),
                W = this.drawHeadAngle;
              R.draw(u, F.x, F.y, W, l, this.dir), (u.globalAlpha = 1);
            }
          });
      },
      {
        "../math/cartesian": 15,
        "./mass": 65,
        "./ragdoll": 70,
        "./spring": 71,
        "./vehicle": 72,
        "./wheel": 73,
      },
    ],
    62: [
      function (t, e) {
        function i(t, e, i) {
          this.massInit(t, e),
            (this.color = i),
            (this.pos.x = t.x + 5 * (s() - s())),
            (this.pos.y = t.y + 5 * (s() - s())),
            (this.old.x = this.pos.x),
            (this.old.y = this.pos.y),
            (this.vel.y = 11 * (s() - s())),
            (this.vel.x = 11 * (s() - s())),
            (this.radius = 2 * s() * 5),
            (this.angle = 6.2 * s()),
            (this.speed = 1 * s() - 1 * s()),
            (this.friction = 0.05);
        }
        var n = (t("../math/cartesian"), t("./mass")),
          s = (t("./spring"), Math.random),
          r = Math.pow,
          o = Math.sqrt,
          a = Math.cos,
          h = Math.sin,
          c = [1, 0.7, 0.8, 0.9, 0.5, 1, 0.7, 1],
          l = (i.prototype = new n());
        (l.massInit = l.init),
          (l.massUpdate = l.update),
          (l.color = "black"),
          (l.drive = function (t, e) {
            var i = this.vel,
              n = this.pos;
            (this.speed = (t * i.x + e * i.y) / this.radius),
              (this.angle += this.speed);
            var s = -(t * i.x + e * i.y) * this.friction;
            (n.x += t * s), (n.y += e * s);
            var a = o(r(t, 2) + r(e, 2));
            if (a > 0) {
              var h = -e / a,
                c = t / a,
                l = 0.8 * (h * i.x + c * i.y);
              (this.old.x += h * l), (this.old.y += c * l);
            }
          }),
          (l.update = function () {
            {
              var t = this.scene;
              t.settings;
            }
            (this.angle += this.speed), this.massUpdate();
          }),
          (l.draw = function () {
            var t = this.scene.screen,
              e = this.scene.camera,
              i = t.realToScreen(this.pos.x, "x"),
              n = t.realToScreen(this.pos.y, "y"),
              s = 0,
              r = e.zoom,
              o = this.angle,
              l = c[0] * r * this.radius,
              u = i + l * a(o),
              p = n + l * h(o),
              d = this.scene.game.canvas.getContext("2d");
            for (
              d.lineWidth = 1 * r,
                d.strokeStyle = "#000000",
                d.beginPath(),
                d.moveTo(u, p),
                d.fillStyle = this.color;
              s++ < 8;

            )
              (l = c[s - 1] * r * this.radius),
                (u = i + l * a(o + (6.283 * s) / 8)),
                (p = n + l * h(o + (6.283 * s) / 8)),
                d.lineTo(u, p);
            d.fill(), d.stroke();
          }),
          (e.exports = i);
      },
      { "../math/cartesian": 15, "./mass": 65, "./spring": 71 },
    ],
    63: [
      function (t, e) {
        function i(t, e) {
          (this.time = 20),
            (this.gravity = new n(
              e.settings.defaultGravityX,
              e.settings.defaultGravityY
            )),
            (this.scene = e),
            this.createMasses(t),
            (this.positionX = t.x),
            (this.positionY = t.y);
        }
        var n = t("../math/cartesian"),
          s = (t("./mass"), t("./debris")),
          r = (t("./spring"), Math.random),
          o = Math.cos,
          a = Math.sin,
          h = i.prototype;
        (h.vehicleInit = h.init),
          (h.complete = !1),
          (h.time = 0),
          (h.powerupsEnabled = !1),
          (h.draw = function (t) {
            var e = this.time,
              i = this.positionX,
              n = this.positionY,
              s = this.scene.camera.zoom,
              h = this.scene.screen,
              c = this.scene.game.canvas.getContext("2d");
            if (((c.globalAlpha = t), e > 0)) {
              e -= 10;
              var l = h.realToScreen(i, "x"),
                u = h.realToScreen(n, "y"),
                p = 0,
                d = 6.2 * r(),
                f = e * s,
                g = l + f * o(d),
                v = u + f * a(d);
              for (
                c.lineWidth = 0,
                  c.strokeStyle = "black",
                  c.beginPath(),
                  c.moveTo(g, v),
                  c.fillStyle = "black";
                p++ < 16;

              )
                (f = (e + 30 * r()) * s),
                  (g = l + f * o(d + (6.283 * p) / 16)),
                  (v = u + f * a(d + (6.283 * p) / 16)),
                  c.lineTo(g, v);
              c.fill(), c.stroke();
            }
            var m = this.masses;
            for (var y in m) m[y].draw();
            (c.globalAlpha = 1), (this.time = e);
          }),
          (h.createMasses = function (t) {
            (this.masses = []),
              this.masses.push(new s(t, this, "#000000")),
              this.masses.push(new s(t, this, "#000000")),
              this.masses.push(new s(t, this, "#000000")),
              this.masses.push(new s(t, this, "#000000")),
              this.masses.push(new s(t, this, "#000000")),
              this.masses.push(new s(t, this, "#000000")),
              this.masses.push(new s(t, this, "#000000"));
          }),
          (h.update = function () {
            var t = this.masses;
            for (var e in t) t[e].update();
          }),
          (e.exports = i);
      },
      { "../math/cartesian": 15, "./debris": 62, "./mass": 65, "./spring": 71 },
    ],
    64: [
      function (t, e) {
        function i(t, e, i) {
          this.vehicleInit(t),
            this.createMasses(e),
            this.createSprings(),
            this.createCockpit(),
            this.updateCameraFocalPoint(),
            this.stopSounds(),
            -1 === i && this.swap();
        }
        var n = t("../math/cartesian"),
          s = t("./mass"),
          r = t("./spring"),
          o = t("./vehicle"),
          a = t("./prop"),
          h = (t("./ragdoll"), Math.PI, Math.atan2),
          c = Math.min,
          l = { HELICOPTER: "helicopter" },
          u = (i.prototype = new o());
        (u.vehicleName = "Helicopter"),
          (u.vehicleInit = u.init),
          (u.vehicleUpdate = u.update),
          (u.vehicleDraw = u.draw),
          (u.masses = null),
          (u.springs = null),
          (u.slow = !1),
          (u.swapped = !1),
          (u.createCockpit = function () {
            var t = document.createElement("canvas");
            this.canvasCockpit = t;
          }),
          (u.drawCockpit = function () {
            var t = this.canvasCockpit,
              e = this.masses,
              i = this.scene,
              n = i.camera.zoom,
              s = e[0].radius * n * 0.9,
              r = 50 * n,
              o = 50 * n;
            (t.width = r), (t.height = o);
            var a = 0,
              h = 0,
              c = Math.max(2 * n, 1),
              l = t.getContext("2d");
            l.save(),
              l.translate(r / 2, o / 2),
              l.scale(1.3, 1),
              l.beginPath(),
              l.arc(0, 0, s, 0, 1.5 * Math.PI, !1),
              l.lineTo(a, h),
              l.lineTo(a + s, h),
              l.closePath(),
              l.restore(),
              (l.fillStyle = "#000000"),
              l.fill(),
              (l.lineWidth = c),
              (l.strokeStyle = "black"),
              l.stroke(),
              l.save(),
              l.translate(r / 2, o / 2),
              l.scale(1.3, 1),
              l.beginPath(),
              l.arc(a, h, s, 0, 1.5 * Math.PI, !0),
              l.restore(),
              (l.lineWidth = c),
              (l.strokeStyle = "black"),
              l.stroke();
          }),
          (u.createMasses = function (t) {
            var e = [];
            e.push(new a(new n(t.x + 0, t.y + 18), this));
            var i = new s(),
              r = new s(),
              o = new s(),
              h = new s();
            i.init(new n(t.x + -17, t.y + 42), this),
              r.init(new n(t.x + 17, t.y + 42), this),
              o.init(new n(t.x + -40, t.y + 15), this),
              h.init(new n(t.x + 40, t.y + 15), this),
              e.push(i),
              e.push(r),
              e.push(o),
              e.push(h),
              (e[0].radius = 18),
              (e[1].radius = 8),
              (e[2].radius = 8),
              (e[3].grav = !1),
              (e[4].grav = e[4].collide = !1),
              (e[1].friction = 0.2),
              (e[2].friction = 0.2),
              (this.head = e[0]),
              (this.mass2 = e[1]),
              (this.mass3 = e[2]),
              (this.mass4 = e[3]),
              (this.rotor = 0),
              (this.rotor2 = 0),
              (this.dir = 1);
            var c = this;
            (e[3].drive = this.head.drive =
              function () {
                c.explode();
              }),
              (this.focalPoint = e[0]),
              (this.masses = e);
          }),
          (u.createSprings = function () {
            var t = this.masses,
              e = [];
            e.push(new r(t[0], t[1], this)),
              e.push(new r(t[2], t[0], this)),
              e.push(new r(t[2], t[1], this)),
              e.push(new r(t[0], t[3], this)),
              e.push(new r(t[1], t[3], this)),
              e.push(new r(t[0], t[4], this)),
              e.push(new r(t[2], t[4], this)),
              (this.spring1 = e[0]),
              (this.spring2 = e[1]),
              (this.spring3 = e[2]),
              (this.spring4 = e[3]),
              (this.spring5 = e[4]),
              (this.spring6 = e[5]),
              (this.spring7 = e[6]),
              (e[0].leff = e[4].lrest = 30),
              (e[1].leff = e[4].lrest = 30),
              (e[2].leff = e[4].lrest = 35),
              (e[4].leff = e[4].lrest = 35),
              (e[6].leff = e[4].lrest = 35);
            for (var i in e) e[i].dampConstant = 0.4;
            for (var i in e) e[i].springConstant = 0.5;
            this.springs = e;
          }),
          (u.updateCameraFocalPoint = function () {}),
          (u.update = function () {
            if (
              (this.crashed === !1 && (this.updateSound(), this.control()),
              this.explosion)
            )
              this.explosion.update();
            else {
              for (var t = this.springs, e = t.length, i = e - 1; i >= 0; i--)
                t[i].update();
              for (var n = this.masses, s = n.length, r = s - 1; r >= 0; r--)
                n[r].update();
              if (
                ((this.masses[1].contact || this.masses[2].contact) &&
                  (this.slow = !1),
                this.slow === !1)
              ) {
                this.crashed === !1 && this.control();
                for (var i = e - 1; i >= 0; i--) t[i].update();
                for (var r = s - 1; r >= 0; r--) n[r].update();
              }
              this.updateCockpitAngle();
            }
          }),
          (u.updateSound = function () {
            if (this.player.isInFocus()) {
              var t = this.scene.sound,
                e = c(this.head.motor, 1);
              t.play(l.HELICOPTER, e);
            }
          }),
          (u.stopSounds = function () {
            var t = this.scene.sound;
            t.stop(l.HELICOPTER);
          }),
          (u.swap = function () {
            var t = this.dir,
              e = this.springs,
              i = this.masses;
            (t = -1 * t), e[2].swap();
            var s = new n(0, 0),
              r = new n(0, 0),
              o = new n(0, 0);
            s.equ(i[3].pos),
              r.equ(i[3].old),
              o.equ(i[3].vel),
              i[3].pos.equ(i[4].pos),
              i[3].old.equ(i[4].old),
              i[3].vel.equ(i[4].vel),
              i[4].pos.equ(s),
              i[4].old.equ(r),
              i[4].vel.equ(o),
              (this.dir = t);
          }),
          (u.control = function () {
            var t = this.player.getGamepad(),
              e = t.isButtonDown("up"),
              i = (t.isButtonDown("down"), t.isButtonDown("back")),
              n = t.isButtonDown("left"),
              s = t.isButtonDown("right"),
              r = t.isButtonDown("z"),
              o = this.masses,
              a = this.springs;
            r && !this.swapped && (this.swap(), (this.swapped = !0)),
              r || (this.swapped = !1);
            var h = o[1].pos.add(o[2].pos).factor(0.5);
            (h = o[0].pos.sub(h)),
              (h = h.factor(1 / h.len())),
              o[0].angle.equ(h);
            var c = e ? 1 : 0;
            o[0].motor += (c - o[0].motor) / 10;
            var l = n ? 1 : 0;
            (l += s ? -1 : 0),
              a[2].rotate(l / 6),
              i && (this.scene.restartTrack = !0);
          }),
          (u.updateCockpitAngle = function () {
            var t = this.masses,
              e = t[0].pos,
              i = t[3].pos,
              n = e.x,
              s = e.y,
              r = i.x,
              o = i.y,
              a = n - r,
              c = s - o;
            this.cockpitAngle = -(h(a, c) - Math.PI / 2);
          }),
          (u.draw = function () {
            if (this.explosion) this.explosion.draw(1);
            else {
              var t = this.scene.game.canvas.getContext("2d");
              (t.imageSmoothingEnabled = !0),
                (t.webkitImageSmoothingEnabled = !0),
                (t.mozImageSmoothingEnabled = !0),
                (t.globalAlpha = this.player._opacity);
              var e = this.masses,
                i = this.dir,
                s = this.rotor,
                r = this.rotor2,
                o = this.scene,
                a = o.camera.zoom,
                h = e[1].pos.add(e[2].pos).factor(0.5);
              h = e[0].pos.sub(h).factor(a);
              var c = new n(-h.y * i, h.x * i),
                l = e[0].pos.toScreen(o);
              (s += 0.5 * e[0].motor + 0.05),
                s > 6.2831 && (s -= 6.2831),
                (r += 0.5),
                r > 6.2831 && (r -= 6.2831),
                (this.rotor = s),
                (this.rotor2 = r),
                (t.strokeStyle = "#000000"),
                (t.lineWidth = 5 * a),
                t.beginPath(),
                t.moveTo(l.x + 0.5 * h.x, l.y + 0.5 * h.y),
                t.lineTo(l.x + 0.8 * h.x, l.y + 0.8 * h.y),
                t.stroke(),
                (t.lineWidth = 3 * a),
                t.beginPath();
              var u = 0.9 * Math.cos(s);
              t.moveTo(l.x + 0.9 * h.x + c.x * u, l.y + 0.8 * h.y + c.y * u),
                t.lineTo(l.x + 0.9 * h.x - c.x * u, l.y + 0.8 * h.y - c.y * u),
                t.stroke();
              var p = e[1].pos.toScreen(o),
                d = e[2].pos.toScreen(o);
              (t.lineWidth = 4 * a),
                (t.stokeStyle = "#666666"),
                t.beginPath(),
                t.moveTo(
                  p.x - 0.2 * c.x - 0.1 * h.x,
                  p.y - 0.2 * c.y - 0.1 * h.y
                ),
                t.lineTo(p.x - 0.25 * h.x, p.y - 0.25 * h.y),
                t.lineTo(d.x - 0.25 * h.x, d.y - 0.25 * h.y),
                t.lineTo(
                  d.x + 0.2 * c.x - 0.1 * h.x,
                  d.y + 0.2 * c.y - 0.1 * h.y
                ),
                t.stroke(),
                (t.lineWidth = 3 * a),
                t.beginPath(),
                t.moveTo(p.x - 0.2 * h.x, p.y - 0.2 * h.y),
                t.lineTo(l.x, l.y),
                t.lineTo(d.x - 0.2 * h.x, d.y - 0.2 * h.y),
                t.stroke(),
                (t.lineWidth = 6 * a),
                (t.stokeStyle = "#000000"),
                t.beginPath();
              var f = e[3].pos.toScreen(o);
              t.moveTo(l.x, l.y),
                t.lineTo(f.x, f.y),
                t.lineTo(l.x - 0.1 * h.x, l.y - 0.3 * h.y),
                t.stroke(),
                (t.lineWidth = 2 * a),
                (t.stokeStyle = "#000000"),
                t.beginPath();
              var g = 7 * a,
                v = new n(g * Math.sin(-r), g * Math.cos(-r));
              t.moveTo(f.x + v.x, f.y + v.y),
                t.lineTo(f.x - v.x, f.y - v.y),
                t.moveTo(f.x - v.y, f.y + v.x),
                t.lineTo(f.x + v.y, f.y - v.x),
                t.stroke(),
                t.beginPath(),
                (t.lineWidth = 2 * a),
                t.arc(f.x, f.y, e[3].radius * a, 0, 2 * Math.PI, !1),
                t.stroke();
              {
                l.x, l.y;
              }
              this.drawCockpit();
              var m = this.canvasCockpit,
                y = m.width,
                w = m.height,
                _ = l.x + 5 * a * this.dir,
                x = l.y + 2 * a,
                b = 0,
                T = 0,
                k = y,
                S = w,
                C = b * a - k / 2,
                P = T * a - S / 2,
                M = this.cockpitAngle,
                E = -1 === i,
                D = this.cosmetics,
                I = GameInventoryManager.getItem(D.head),
                A = this.cockpitAngle;
              I.draw(t, _ + 5 * a * i, x - 5 * a, A, 0.7 * a, i),
                t.translate(_, x),
                t.rotate(M),
                E && t.scale(1, -1),
                t.drawImage(m, C, P, k, S),
                E && t.scale(1, -1),
                t.rotate(-M),
                t.translate(-_, -x),
                (t.globalAlpha = 1);
            }
          }),
          (e.exports = i);
      },
      {
        "../math/cartesian": 15,
        "./mass": 65,
        "./prop": 69,
        "./ragdoll": 70,
        "./spring": 71,
        "./vehicle": 72,
      },
    ],
    65: [
      function (t, e) {
        function i() {}
        var n = t("../math/cartesian");
        (i.prototype = {
          pos: null,
          old: null,
          vel: null,
          parent: null,
          radius: 0,
          friction: 0,
          collide: !1,
          contact: !1,
          scene: null,
          drawPos: null,
          init: function (t, e) {
            (this.pos = new n()),
              (this.old = new n()),
              (this.vel = new n(0, 0)),
              (this.drawPos = new n(0, 0)),
              (this.radius = 10),
              (this.friction = 0),
              (this.parent = e),
              (this.collide = !0),
              (this.contact = !1),
              (this.scene = e.scene),
              this.pos.equ(t),
              this.old.equ(t);
          },
          drive: function (t, e) {
            var i = this.friction,
              n = -(t * this.vel.x + e * this.vel.y) * i;
            (t *= n),
              (e *= n),
              (this.pos.x += t),
              (this.pos.y += e),
              (this.contact = !0);
          },
          update: function () {
            var t = this.vel;
            t.inc(this.parent.gravity),
              (t.x *= 0.99),
              (t.y *= 0.99),
              this.pos.inc(this.vel),
              (this.contact = !1),
              this.collide && this.scene.track.collide(this),
              (t.x = this.pos.x - this.old.x),
              (t.y = this.pos.y - this.old.y),
              this.old.equ(this.pos);
          },
          draw: function () {
            var t = this.pos.toScreen(this.scene),
              e = this.scene.game.canvas.getContext("2d"),
              i = (this.radius, this.scene.camera.zoom);
            e.beginPath(),
              (e.fillStyle = "rgba(0,0,0,1)"),
              e.arc(t.x, t.y, this.radius * i, 0, 2 * Math.PI, !1),
              e.fill(),
              e.closePath();
          },
        }),
          (e.exports = i);
      },
      { "../math/cartesian": 15 },
    ],
    66: [
      function (t, e) {
        var i = function (t, e, i, n) {
          (this.color = "rgba(0,0,0,1)"),
            this.vehicleInit(t),
            this.createMasses(e, n),
            this.createSprings(),
            this.updateCameraFocalPoint(),
            this.stopSounds(),
            -1 === i && this.swap();
        };
        e.exports = i;
        var n = t("../math/cartesian"),
          s = t("./mass"),
          r = t("./spring"),
          o = t("./vehicle"),
          a = t("./wheel"),
          h = t("./ragdoll"),
          c =
            (t("../cosmetics/heads/head"),
            t("../cosmetics/heads/forwardcap"),
            t("../cosmetics/heads/backwardcap"),
            Math.atan2),
          l = Math.min,
          u = Math.floor,
          p = Math.random,
          d = {
            BIKE_GROUND: "bike_ground",
            BIKE_AIR: "bike_air",
            BIKE_FALL_1: "bike_fall_1",
            BIKE_FALL_2: "bike_fall_2",
            BIKE_FALL_3: "bike_fall_3",
          },
          f = (i.prototype = new o());
        (f.vehicleName = "MTB"),
          (f.vehicleInit = f.init),
          (f.vehicleUpdate = f.update),
          (f.vehicleControl = f.control),
          (f.vehicleDraw = f.draw),
          (f.masses = null),
          (f.springs = null),
          (f.cosmetics = null),
          (f.slow = !1),
          (f.pedala = 0),
          (f.swapped = !1),
          (f.ragdoll = null),
          (f.crashed = !1),
          (f.createMasses = function (t, e) {
            this.masses = [];
            var i = new s(),
              r = new a(new n(t.x + 23, t.y), this),
              o = new a(new n(t.x + -23, t.y), this);
            i.init(new n(t.x + 2, t.y + -38), this),
              (i.drive = this.createRagdoll.bind(this)),
              (o.radius = 14),
              (r.radius = 14),
              (i.radius = 14),
              i.vel.equ(e),
              o.vel.equ(e),
              r.vel.equ(e),
              this.masses.push(i),
              this.masses.push(o),
              this.masses.push(r),
              (this.head = i),
              (this.frontWheel = r),
              (this.rearWheel = o);
          }),
          (f.createSprings = function () {
            this.springs = [];
            var t = new r(this.head, this.rearWheel, this),
              e = new r(this.rearWheel, this.frontWheel, this),
              i = new r(this.frontWheel, this.head, this);
            (e.lrest = 45),
              (e.leff = 45),
              (e.springConstant = 0.2),
              (e.dampConstant = 0.3),
              (t.lrest = 47),
              (t.leff = 47),
              (t.springConstant = 0.2),
              (t.dampConstant = 0.3),
              (i.lrest = 45),
              (i.leff = 45),
              (i.springConstant = 0.2),
              (i.dampConstant = 0.3),
              this.springs.push(t),
              this.springs.push(e),
              this.springs.push(i),
              (this.rearSpring = t),
              (this.chasse = e),
              (this.frontSpring = i);
          }),
          (f.createRagdoll = function () {
            (this.ragdoll = new h(this.getStickMan(), this)),
              this.ragdoll.zero(this.head.vel, this.rearWheel.vel),
              (this.ragdoll.dir = this.dir),
              (this.rearWheel.motor = 0),
              (this.rearWheel.brake = !1),
              (this.frontWheel.brake = !1),
              (this.head.collide = !1),
              this.player.isInFocus() && this.playBailSound(),
              this.dead();
          }),
          (f.playBailSound = function () {
            var t = this.scene.sound,
              e = l(this.speed / 50, 1),
              i = u(3 * p()) + 1;
            switch (i) {
              case 1:
                t.play(d.BIKE_FALL_1, e);
                break;
              case 2:
                t.play(d.BIKE_FALL_2, e);
                break;
              case 3:
                t.play(d.BIKE_FALL_3, e);
            }
          }),
          (f.updateCameraFocalPoint = function () {
            this.focalPoint = this.ragdoll ? this.ragdoll.head : this.head;
          }),
          (f.getStickMan = function () {
            var t = this.dir,
              e = this.head,
              i = this.frontWheel,
              s = this.rearWheel,
              r = this.pedala,
              o = i.pos.sub(s.pos),
              a = e.pos.sub(i.pos.add(s.pos).factor(0.5)),
              h = new n(o.y * t, -o.x * t),
              c = {};
            (c.head = s.pos.add(o.factor(0.35)).add(a.factor(1.2))),
              (c.lHand = c.rHand =
                s.pos.add(o.factor(0.8)).add(h.factor(0.68)));
            var l = c.head.sub(c.lHand);
            (l = new n(l.y * t, -l.x * t)),
              (c.lElbow = c.rElbow =
                c.head
                  .add(c.lHand)
                  .factor(0.5)
                  .add(l.factor(130 / l.lenSqr()))),
              (c.waist = s.pos.add(o.factor(0.2)).add(h.factor(0.5)));
            var u = new n(6 * Math.cos(r), 6 * Math.sin(r));
            return (
              (c.lFoot = s.pos.add(o.factor(0.4)).add(h.factor(0.05)).add(u)),
              (l = c.waist.sub(c.lFoot)),
              (l = new n(-l.y * t, l.x * t)),
              (c.lKnee = c.waist
                .add(c.lFoot)
                .factor(0.5)
                .add(l.factor(160 / l.lenSqr()))),
              (c.rFoot = s.pos.add(o.factor(0.4)).add(h.factor(0.05)).sub(u)),
              (l = c.waist.sub(c.rFoot)),
              (l = new n(-l.y * t, l.x * t)),
              (c.rKnee = c.waist
                .add(c.rFoot)
                .factor(0.5)
                .add(l.factor(160 / l.lenSqr()))),
              c
            );
          }),
          (f.update = function () {
            if (
              (this.crashed === !1 && (this.updateSound(), this.control()),
              this.explosion)
            )
              this.explosion.update();
            else {
              for (var t = this.springs, e = t.length, i = e - 1; i >= 0; i--)
                t[i].update();
              for (var n = this.masses, s = n.length, r = s - 1; r >= 0; r--)
                n[r].update();
              if (
                (this.rearWheel.contact &&
                  this.frontWheel.contact &&
                  (this.slow = !1),
                this.slow === !1)
              ) {
                this.crashed === !1 && this.control();
                for (var i = e - 1; i >= 0; i--) t[i].update();
                for (var r = s - 1; r >= 0; r--) n[r].update();
              }
              this.ragdoll ? this.ragdoll.update() : this.updateDrawHeadAngle();
            }
            this.updateCameraFocalPoint();
          }),
          (f.updateSound = function () {
            if (this.player.isInFocus()) {
              this.updateSpeed();
              var t = l(this.speed / 50, 1),
                e = this.scene.sound;
              this.rearWheel.contact || this.frontWheel.contact
                ? (e.play(d.BIKE_GROUND, t), e.stop(d.BIKE_AIR))
                : (e.play(d.BIKE_AIR, t), e.stop(d.BIKE_GROUND));
            }
          }),
          (f.stopSounds = function () {
            var t = this.scene.sound;
            t.stop(d.BIKE_AIR), t.stop(d.BIKE_GROUND);
          }),
          (f.updateDrawHeadAngle = function () {
            var t = this.frontWheel.pos,
              e = this.rearWheel.pos,
              i = t.x,
              n = t.y,
              s = e.x,
              r = e.y,
              o = i - s,
              a = n - r;
            this.drawHeadAngle = -(c(o, a) - Math.PI / 2);
          }),
          (f.swap = function () {
            (this.dir = -1 * this.dir), this.chasse.swap();
            var t = this.rearSpring.leff;
            (this.rearSpring.leff = this.frontSpring.leff),
              (this.frontSpring.leff = t);
          }),
          (f.control = function () {
            var t = this.gamepad,
              e = t.isButtonDown("up"),
              i = t.isButtonDown("down"),
              n = (t.isButtonDown("back"), t.isButtonDown("left")),
              s = t.isButtonDown("right"),
              r = t.isButtonDown("z"),
              o = e ? 1 : 0,
              a = this.rearWheel;
            (a.motor += (o - a.motor) / 10),
              r && !this.swapped && (this.swap(), (this.swapped = !0)),
              r || (this.swapped = !1),
              e && (this.pedala += this.rearWheel.speed / 5),
              (a.brake = i),
              (this.frontWheel.brake =
                this.dir > 0 && s && i ? !0 : this.dir < 0 && n && i ? !0 : !1);
            var h = n ? 1 : 0;
            (h += s ? -1 : 0),
              this.rearSpring.contract(5 * h * this.dir, 5),
              this.frontSpring.contract(5 * -h * this.dir, 5),
              this.chasse.rotate(h / 8),
              !h &&
                e &&
                (this.rearSpring.contract(-7, 5),
                this.frontSpring.contract(7, 5));
          }),
          (f.draw = function () {
            if (this.explosion) this.explosion.draw(1);
            else {
              var t = this.scene.game.canvas.getContext("2d");
              if (
                ((t.imageSmoothingEnabled = !0),
                (t.mozImageSmoothingEnabled = !0),
                (t.oImageSmoothingEnabled = !0),
                (t.webkitImageSmoothingEnabled = !0),
                this.settings.developerMode)
              )
                for (var e = this.masses, i = e.length, n = i - 1; n >= 0; n--)
                  e[n].draw();
              this.drawBikeFrame();
            }
          }),
          (f.drawBikeFrame = function () {
            var t = this.scene,
              e = this.frontWheel.pos.toScreen(t),
              i = this.rearWheel.pos.toScreen(t),
              s = this.head.pos.toScreen(t),
              r = (t.game.pixelRatio, t.camera.zoom),
              o = t.game.canvas.getContext("2d"),
              a = this.player._opacity,
              h = e.sub(i),
              c = new n((e.y - i.y) * this.dir, (i.x - e.x) * this.dir),
              l = h.factor(0.5);
            i.addOut(l, l),
              s.subOut(l, l),
              (o.globalAlpha = a),
              (o.strokeStyle = "#000000"),
              (o.lineWidth = 3 * r),
              (o.lineCap = "round"),
              (o.lineJoin = "round"),
              o.beginPath(),
              (o.fillStyle = "rgba(200,200, 200,0.2)"),
              o.arc(e.x, e.y, 12.5 * r, 0, 2 * Math.PI, !1),
              o.fill(),
              o.stroke(),
              o.beginPath(),
              o.arc(i.x, i.y, 12.5 * r, 0, 2 * Math.PI, !1),
              o.fill(),
              o.stroke(),
              (o.strokeStyle = "rgba(153, 153, 153,1)"),
              (o.fillStyle = "rgba(204, 204, 204,1)"),
              (o.lineWidth = 1),
              o.beginPath(),
              o.arc(e.x, e.y, 6 * r, 0, 2 * Math.PI, !1),
              o.fill(),
              o.stroke(),
              o.beginPath(),
              o.arc(i.x, i.y, 6 * r, 0, 2 * Math.PI, !1),
              o.fill(),
              o.stroke(),
              o.beginPath(),
              (o.strokeStyle = "#000000"),
              (o.lineWidth = 5 * r),
              o.moveTo(i.x, i.y),
              o.lineTo(
                i.x + 0.4 * h.x + 0.05 * c.x,
                i.y + 0.4 * h.y + 0.05 * c.y
              ),
              o.moveTo(
                i.x + 0.72 * h.x + 0.64 * l.x,
                i.y + 0.72 * h.y + 0.64 * l.y
              ),
              o.lineTo(
                i.x + 0.46 * h.x + 0.4 * l.x,
                i.y + 0.46 * h.y + 0.4 * l.y
              ),
              o.lineTo(
                i.x + 0.4 * h.x + 0.05 * c.x,
                i.y + 0.4 * h.y + 0.05 * c.y
              ),
              o.stroke(),
              o.beginPath(),
              (o.lineWidth = 2 * r),
              (o.strokeStyle = "#000000"),
              o.moveTo(
                i.x + 0.72 * h.x + 0.64 * l.x,
                i.y + 0.72 * h.y + 0.64 * l.y
              ),
              o.lineTo(
                i.x + 0.43 * h.x + 0.05 * c.x,
                i.y + 0.43 * h.y + 0.05 * c.y
              ),
              o.stroke(),
              o.beginPath(),
              (o.lineWidth = 1 * r),
              o.moveTo(
                i.x + 0.46 * h.x + 0.4 * l.x,
                i.y + 0.46 * h.y + 0.4 * l.y
              ),
              o.lineTo(
                i.x + 0.28 * h.x + 0.5 * l.x,
                i.y + 0.28 * h.y + 0.5 * l.y
              ),
              o.stroke(),
              o.beginPath(),
              (o.lineWidth = 2 * r),
              o.moveTo(
                i.x + 0.45 * h.x + 0.3 * l.x,
                i.y + 0.45 * h.y + 0.3 * l.y
              ),
              o.lineTo(
                i.x + 0.3 * h.x + 0.4 * l.x,
                i.y + 0.3 * h.y + 0.4 * l.y
              ),
              o.lineTo(
                i.x + 0.25 * h.x + 0.6 * l.x,
                i.y + 0.25 * h.y + 0.6 * l.y
              ),
              o.moveTo(
                i.x + 0.17 * h.x + 0.6 * l.x,
                i.y + 0.17 * h.y + 0.6 * l.y
              ),
              o.lineTo(
                i.x + 0.3 * h.x + 0.6 * l.x,
                i.y + 0.3 * h.y + 0.6 * l.y
              ),
              o.stroke(),
              o.beginPath(),
              (o.lineWidth = 3 * r),
              o.moveTo(e.x, e.y),
              o.lineTo(
                i.x + 0.71 * h.x + 0.73 * l.x,
                i.y + 0.71 * h.y + 0.73 * l.y
              ),
              o.lineTo(
                i.x + 0.73 * h.x + 0.77 * l.x,
                i.y + 0.73 * h.y + 0.77 * l.y
              ),
              o.lineTo(
                i.x + 0.7 * h.x + 0.8 * l.x,
                i.y + 0.7 * h.y + 0.8 * l.y
              ),
              o.stroke(),
              o.beginPath(),
              (o.lineWidth = 1 * r);
            var u = new n(
              6 * Math.cos(this.pedala) * r,
              6 * Math.sin(this.pedala) * r
            );
            if (
              (o.moveTo(
                i.x + 0.43 * h.x + 0.05 * c.x + u.x,
                i.y + 0.43 * h.y + 0.05 * c.y + u.y
              ),
              o.lineTo(
                i.x + 0.43 * h.x + 0.05 * c.x - u.x,
                i.y + 0.43 * h.y + 0.05 * c.y - u.y
              ),
              o.stroke(),
              this.crashed)
            )
              this.ragdoll && this.ragdoll.draw();
            else {
              h.factorOut(0.5, c), i.addOut(c, c), s.subOut(c, c);
              var p = h.factor(0.3);
              (p.x = i.x + p.x + 0.25 * c.x), (p.y = i.y + p.y + 0.25 * c.y);
              var d = h.factor(0.4);
              (d.x = i.x + d.x + 0.05 * c.x), (d.y = i.y + d.y + 0.05 * c.y);
              var f = d.add(u),
                g = d.sub(u),
                v = h.factor(0.67);
              (v.x = i.x + v.x + 0.8 * c.x), (v.y = i.y + v.y + 0.8 * c.y);
              var m = h.factor(-0.05);
              (m.x = p.x + m.x + 0.42 * c.x), (m.y = p.y + m.y + 0.42 * c.y);
              var y = f.sub(m),
                w = y.lenSqr();
              (l.x = y.y * this.dir),
                (l.y = -y.x * this.dir),
                l.factorSelf(r * r);
              var _ = y.factor(0.5);
              (_.x = m.x + _.x + l.x * (200 / y.lenSqr())),
                (_.y = m.y + _.y + l.y * (200 / y.lenSqr()));
              var x = y.factor(0.12);
              (x.x = f.x + x.x + l.x * (50 / w)),
                (x.y = f.y + x.y + l.y * (50 / w)),
                g.subOut(m, y),
                (w = y.lenSqr()),
                (l.x = y.y * this.dir),
                (l.y = -y.x * this.dir),
                l.factorSelf(r * r);
              var b = y.factor(0.5);
              (b.x = m.x + b.x + l.x * (200 / w)),
                (b.y = m.y + b.y + l.y * (200 / w));
              var T = y.factor(0.12);
              (T.x = g.x + T.x + l.x * (50 / w)),
                (T.y = g.y + T.y + l.y * (50 / w)),
                (o.strokeStyle = "rgba(0,0,0," + 0.5 * a + ")"),
                (o.lineWidth = 6 * r),
                o.beginPath(),
                o.moveTo(g.x, g.y),
                o.lineTo(b.x, b.y),
                o.lineTo(m.x, m.y),
                o.stroke(),
                (o.lineWidth = 4 * r),
                o.beginPath(),
                o.moveTo(g.x, g.y),
                o.lineTo(T.x, T.y),
                o.stroke(),
                (o.lineWidth = 6 * r),
                (o.strokeStyle = "#000000"),
                o.beginPath(),
                o.moveTo(f.x, f.y),
                o.lineTo(_.x, _.y),
                o.lineTo(m.x, m.y),
                o.stroke(),
                (o.lineWidth = 4 * r),
                o.beginPath(),
                o.moveTo(f.x, f.y),
                o.lineTo(x.x, x.y),
                o.stroke();
              var k = h.factor(0.1);
              (k.x = p.x + k.x + 0.95 * c.x),
                (k.y = p.y + k.y + 0.95 * c.y),
                (o.lineWidth = 8 * r),
                o.beginPath(),
                o.moveTo(m.x, m.y),
                o.lineTo(k.x, k.y),
                o.stroke();
              var S = h.factor(0.2);
              (S.x = p.x + S.x + 1.09 * c.x),
                (S.y = p.y + S.y + 1.09 * c.y),
                o.beginPath(),
                (o.lineWidth = 2 * r),
                k.subOut(v, h);
              var C = h.lenSqr();
              (c.x = h.y * this.dir),
                (c.y = -h.x * this.dir),
                c.factorSelf(r * r);
              var P = h.factor(0.3);
              (P.x = v.x + P.x + c.x * (80 / C)),
                (P.y = v.y + P.y + c.y * (80 / C)),
                (o.lineWidth = 5 * r),
                o.beginPath(),
                o.moveTo(k.x, k.y),
                o.lineTo(P.x, P.y),
                o.lineTo(v.x, v.y),
                o.stroke();
              var M = this.cosmetics,
                E = GameInventoryManager.getItem(M.head),
                D = this.drawHeadAngle;
              E.draw(o, S.x, S.y, D, r, this.dir), (o.globalAlpha = 1);
            }
          });
      },
      {
        "../cosmetics/heads/backwardcap": 10,
        "../cosmetics/heads/forwardcap": 11,
        "../cosmetics/heads/head": 12,
        "../math/cartesian": 15,
        "./mass": 65,
        "./ragdoll": 70,
        "./spring": 71,
        "./vehicle": 72,
        "./wheel": 73,
      },
    ],
    67: [
      function (t, e) {
        var i = function (t, e) {
          (this.id = d++),
            (this._scene = t),
            (this._game = t.game),
            (this._user = e),
            (this._settings = t.settings);
          var i = t.settings.startVehicle;
          t.settings.track && (i = t.settings.track.vehicle),
            (this._baseVehicleType = i),
            (this._gamepad = new s(t)),
            (this._ghost = !1),
            (this._color = e.color ? e.color : "#000000"),
            this.setDefaults(),
            this.createBaseVehicle(new n(0, 35), 1, new n(0, 0));
        };
        e.exports = i;
        var n = t("../math/cartesian"),
          s = t("../utils/gamepad"),
          r = t("./explosion"),
          o = t("./bmx"),
          a = t("./helicopter"),
          h = t("./mtb"),
          c = Math.sqrt,
          l = Math.pow,
          u = (Math.min, Math.max),
          p = {};
        (p.BMX = o), (p.MTB = h), (p.HELI = a);
        var d = 0,
          f = function g(t, e) {
            for (var i in e)
              try {
                t[i] = e[i].constructor == Object ? g(t[i], e[i]) : e[i];
              } catch (n) {
                t[i] = e[i];
              }
            return t;
          };
        (i.prototype.getCheckpointCount = function () {
          return this._checkpoints.length;
        }),
          (i.prototype.setDefaults = function () {
            (this._baseVehicle = !1),
              (this._tempVehicleType = null),
              (this._tempVehicle = !1),
              (this._tempVehicleTicks = 0),
              (this._addCheckpoint = !1),
              (this._checkpoints = []),
              (this._crashed = !1),
              (this._effect = !1),
              (this._effectTicks = 0),
              (this._opacity = 1),
              (this.complete = !1),
              (this._powerupsConsumed = {
                checkpoints: [],
                targets: [],
                misc: [],
              });
          }),
          (i.prototype.hasCheckpoints = function () {
            return this._checkpoints.length > 0;
          }),
          (i.prototype.setColor = function (t) {
            this._color = t;
          }),
          (i.prototype.dead = function () {
            if (((this._crashed = !0), this._ghost === !1)) {
              var t = this._scene,
                e = t.settings,
                i = t.message;
              this._checkpoints.length > 0
                ? e.mobile
                  ? i.show("Tap to go to checkpoint!", !1, "#000000", "#FFFFFF")
                  : i.show(
                      "Press Enter For Checkpoint",
                      !1,
                      "#000000",
                      "#FFFFFF"
                    )
                : e.mobile
                ? i.show("Tap to Restart!", !1, "#000000", "#FFFFFF")
                : i.show("Press Enter To Restart", !1, "#000000", "#FFFFFF");
            }
          }),
          (i.prototype.setAsGhost = function () {
            this._ghost = !0;
          }),
          (i.prototype.isGhost = function () {
            return this._ghost;
          }),
          (i.prototype.isAlive = function () {
            return !this._crashed;
          }),
          (i.prototype.getTargetsHit = function () {
            return this._powerupsConsumed.targets.length;
          }),
          (i.prototype.getGamepad = function () {
            return this._gamepad;
          }),
          (i.prototype.setBaseVehicle = function (t) {
            (this._baseVehicleType = t), this.reset();
          }),
          (i.prototype.createBaseVehicle = function (t, e, i) {
            this._tempVehicle && this._tempVehicle.stopSounds(),
              (this._baseVehicle = new p[this._baseVehicleType](this, t, e, i)),
              (this._tempVehicle = !1),
              (this._tempVehicleType = !1),
              (this._tempVehicleTicks = 0);
          }),
          (i.prototype.createTempVehicle = function (t, e, i, n) {
            this._tempVehicleType === t
              ? (this._tempVehicleTicks += e)
              : (this._baseVehicle.stopSounds(),
                (this._effect = new r(i, this._scene)),
                (this._effectTicks = 45),
                (this._tempVehicleType = t),
                (this._tempVehicle = new p[t](this, i, n)),
                (this._tempVehicleTicks = e));
          }),
          (i.prototype.update = function () {
            if (this.complete === !1) {
              var t = this._baseVehicle;
              this._tempVehicleTicks > 0 &&
                ((t = this._tempVehicle),
                this._crashed === !1 && this._tempVehicleTicks--,
                this._tempVehicleTicks <= 0 &&
                  this._crashed === !1 &&
                  ((this._effectTicks = 45),
                  (this._effect = new r(
                    this._tempVehicle.focalPoint.pos,
                    this._scene
                  )),
                  this.createBaseVehicle(
                    this._tempVehicle.focalPoint.pos,
                    this._tempVehicle.dir,
                    this._tempVehicle.masses[0].vel
                  ),
                  (t = this._baseVehicle))),
                this._effectTicks > 0 &&
                  (this._effectTicks--, this._effect.update()),
                t.update(),
                this._addCheckpoint &&
                  (this._createCheckpoint(), (this._addCheckpoint = !1));
            }
          }),
          (i.prototype.isInFocus = function () {
            var t = this._scene.camera,
              e = !1;
            return t.playerFocus && t.playerFocus === this && (e = !0), e;
          }),
          (i.prototype.updateOpacity = function () {
            var t = 1,
              e = this._scene.camera;
            if (e.playerFocus && e.playerFocus !== this) {
              var i = this.getDistanceBetweenPlayers(e.playerFocus);
              1200 > i && (t = Math.min(i / 500, 1));
            }
            this._opacity = t;
          }),
          (i.prototype.drawName = function () {
            var t = this._scene,
              e = (t.settings, this._color),
              i = this._user.d_name,
              n = t.game,
              s = t.camera.zoom,
              r = n.pixelRatio,
              o = n.canvas,
              a = o.getContext("2d"),
              h = this._opacity,
              c = this.getActiveVehicle(),
              l = c.focalPoint.pos.toScreen(t);
            (a.globalAlpha = h),
              a.beginPath(),
              (a.fillStyle = e),
              a.moveTo(l.x, l.y - 40 * s),
              a.lineTo(l.x - 5 * s, l.y - 50 * s),
              a.lineTo(l.x + 5 * s, l.y - 50 * s),
              a.lineTo(l.x, l.y - 40 * s),
              a.fill();
            var p = 9 * r * u(s, 1);
            (a.font = p + "pt helsinki"),
              (a.textAlign = "center"),
              (a.fillStyle = e),
              a.fillText(i, l.x, l.y - 60 * s),
              (a.globalAlpha = 1);
          }),
          (i.prototype.draw = function () {
            this.updateOpacity();
            var t = this._baseVehicle;
            this._tempVehicleTicks > 0 && (t = this._tempVehicle),
              this._effectTicks > 0 &&
                this._effect.draw(this._effectTicks / 100),
              t.draw(),
              this.isGhost() && this.drawName();
          }),
          (i.prototype.checkKeys = function () {
            var t = this._gamepad,
              e = this._ghost,
              i = this._scene;
            if (
              (e === !1 &&
                (t.areKeysDown() && !this._crashed && i.play(),
                t.isButtonDown("restart") &&
                  ((i.restartTrack = !0), t.setButtonUp("restart")),
                (t.isButtonDown("up") ||
                  t.isButtonDown("down") ||
                  t.isButtonDown("left") ||
                  t.isButtonDown("right")) &&
                  i.camera.focusOnMainPlayer()),
              t.isButtonDown("enter") &&
                (this.gotoCheckpoint(), t.setButtonUp("enter")),
              t.isButtonDown("backspace"))
            ) {
              var n = t.getButtonDownOccurances("backspace");
              this.removeCheckpoint(n), t.setButtonUp("backspace");
            }
          }),
          (i.prototype.getDistanceBetweenPlayers = function (t) {
            var e = t.getActiveVehicle(),
              i = this.getActiveVehicle(),
              n = e.focalPoint.pos.x - i.focalPoint.pos.x,
              s = e.focalPoint.pos.y - i.focalPoint.pos.y;
            return c(l(n, 2) + l(s, 2));
          }),
          (i.prototype.getActiveVehicle = function () {
            var t = this._baseVehicle;
            return this._tempVehicleTicks > 0 && (t = this._tempVehicle), t;
          }),
          (i.prototype._createCheckpoint = function () {
            var t = {};
            this._tempVehicleTicks > 0
              ? ((t._tempVehicleType = this._tempVehicleType),
                (t._tempVehicle = JSON.stringify(
                  this._tempVehicle,
                  this._snapshotFilter
                )),
                (t._tempVehicleTicks = this._tempVehicleTicks))
              : ((t._baseVehicleType = this._baseVehicleType),
                (t._baseVehicle = JSON.stringify(
                  this._baseVehicle,
                  this._snapshotFilter
                ))),
              (t._powerupsConsumed = JSON.stringify(this._powerupsConsumed)),
              (t._crashed = this._crashed),
              this._checkpoints.push(t);
          }),
          (i.prototype._snapshotFilter = function (t, e) {
            switch (t) {
              case "parent":
              case "player":
              case "scene":
              case "settings":
              case "masses":
              case "springs":
              case "focalPoint":
              case "gamepad":
                return void 0;
              case "explosion":
                return !1;
              default:
                return e;
            }
          }),
          (i.prototype.setCheckpointOnUpdate = function () {
            this._addCheckpoint = !0;
          }),
          (i.prototype.crashed = function () {
            this._crashed = !0;
          }),
          (i.prototype.gotoCheckpoint = function () {
            var t = this._gamepad,
              e = t.replaying,
              i = this._scene;
            if (this._checkpoints.length > 0) {
              var n = this._checkpoints[this._checkpoints.length - 1];
              if (n._tempVehicle) {
                this._baseVehicle.stopSounds();
                var s = this._tempVehicle;
                this._tempVehicleType !== n._tempVehicleType &&
                  (s = new p[n._tempVehicleType](this, { x: 0, y: 0 }));
                var r = JSON.parse(n._tempVehicle);
                f(s, r),
                  (this._tempVehicle = s),
                  (this._tempVehicleType = n._tempVehicleType),
                  (this._tempVehicleTicks = n._tempVehicleTicks),
                  s.updateCameraFocalPoint();
              } else {
                var s = this._baseVehicle,
                  r = JSON.parse(n._baseVehicle);
                f(s, r),
                  this._tempVehicle && this._tempVehicle.stopSounds(),
                  (this._baseVehicle = s),
                  (this._tempVehicleTicks = 0),
                  (this._tempVehicleType = !1),
                  s.updateCameraFocalPoint();
              }
              if (
                ((this._powerupsConsumed = JSON.parse(n._powerupsConsumed)),
                (this._crashed = n._crashed),
                e === !1)
              ) {
                var o = i.settings;
                i.settings.mobile
                  ? i.message.show("Tap to resume", 5, "#826cdc", "#FFFFFF")
                  : i.message.show(
                      "Press Backspace To Go Back Further",
                      5,
                      "#826cdc",
                      "#FFFFFF"
                    ),
                  i.track.updatePowerupState(this),
                  o.waitAtCheckpoints && (i.playing = !1),
                  i.camera.focusOnMainPlayer();
              }
              i.camera.playerFocus === this && i.camera.fastforward();
            } else e === !1 && this.restartScene();
          }),
          (i.prototype.restartScene = function () {
            var t = this._gamepad,
              e = t.replaying;
            e === !1 && (this._scene.restartTrack = !0);
          }),
          (i.prototype.removeCheckpoint = function (t) {
            if (this._checkpoints.length > 1) {
              for (var e = 0; t > e; e++) this._checkpoints.pop();
              this.gotoCheckpoint();
            } else this.restartScene();
          }),
          (i.prototype.close = function () {
            (this.id = null),
              (this._scene = null),
              (this._game = null),
              (this._user = null),
              (this._settings = null),
              (this._baseVehicleType = null),
              this._gamepad.close(),
              (this._gamepad = null),
              (this._baseVehicle = null),
              (this._tempVehicleType = null),
              (this._tempVehicle = null),
              (this._tempVehicleTicks = null),
              (this._addCheckpoint = null),
              (this._checkpoints = null),
              (this._crashed = null),
              (this._effect = null),
              (this._effectTicks = null),
              (this._powerupsConsumed = null);
          }),
          (i.prototype.reset = function () {
            this._tempVehicle && this._tempVehicle.stopSounds(),
              this._baseVehicle.stopSounds(),
              this.setDefaults(),
              this.createBaseVehicle(new n(0, 35), 1, new n(0, 0)),
              this._gamepad.reset();
          });
      },
      {
        "../math/cartesian": 15,
        "../utils/gamepad": 51,
        "./bmx": 61,
        "./explosion": 63,
        "./helicopter": 64,
        "./mtb": 66,
      },
    ],
    68: [
      function (t, e) {
        var i = function (t) {
          (this.scene = t),
            (this.game = t.game),
            (this.settings = t.settings),
            (this.firstPlayer = null),
            (this._players = []),
            (this._playerLookup = {});
        };
        e.exports = i;
        var n = t("./player");
        (i.prototype.update = function () {
          for (var t = this._players, e = t.length, i = 0; e > i; i++)
            t[i].update();
        }),
          (i.prototype.mutePlayers = function () {
            for (var t = this._players, e = t.length, i = 0; e > i; i++) {
              var n = t[i].getActiveVehicle();
              n.stopSounds();
            }
          }),
          (i.prototype.updateGamepads = function () {
            for (var t = this._players, e = t.length, i = 0; e > i; i++)
              t[i]._gamepad.update();
          }),
          (i.prototype.createPlayer = function (t, e) {
            return new n(this.scene, e);
          }),
          (i.prototype.addPlayer = function (t) {
            this._players.push(t), (this._playerLookup[t.id] = t);
          }),
          (i.prototype.checkKeys = function () {
            for (var t = this._players, e = t.length, i = 0; e > i; i++)
              t[i].checkKeys();
          }),
          (i.prototype.draw = function () {
            for (var t = this._players, e = t.length, i = 0; e > i; i++)
              t[i].draw();
          }),
          (i.prototype.getPlayerByIndex = function (t) {
            return this._players[t];
          }),
          (i.prototype.getPlayerById = function (t) {
            return this._playerLookup[t];
          }),
          (i.prototype.getPlayerCount = function () {
            return this._players.length;
          }),
          (i.prototype.reset = function () {
            for (var t = this._players, e = t.length, i = 0; e > i; i++)
              t[i].reset();
          }),
          (i.prototype.clear = function () {
            (this._players = []),
              (this._playerLookup = {}),
              this._players.push(this.firstPlayer),
              (this._playerLookup[this.firstPlayer.id] = this.firstPlayer);
          }),
          (i.prototype._closePlayers = function () {
            for (var t = this._players, e = t.length, i = 0; e > i; i++)
              t[i].close();
          }),
          (i.prototype.close = function () {
            this._closePlayers(),
              (this._players = null),
              (this.firstPlayer = null),
              (this._playerLookup = null),
              (this.scene = null),
              (this.game = null),
              (this.settings = null);
          });
      },
      { "./player": 67 },
    ],
    69: [
      function (t, e) {
        function i(t, e) {
          this.init(t, e),
            (this.motor = 0),
            (this.angle = new n(0, 0)),
            (this.radius = 10),
            (this.speed = 0);
        }
        var n = t("../math/cartesian"),
          s = t("./mass"),
          r = (i.prototype = new s());
        (r.motor = 0),
          (r.angle = 0),
          (r.speed = 0),
          (r.update = function () {
            var t = this.vel,
              e = this.angle,
              i = this.pos,
              n = this.old,
              s = this.motor;
            (t.y += 0),
              t.inc(e.factor(2 * s)),
              (t = t.factor(0.99)),
              i.inc(t),
              (this.contact = !1),
              this.collide && this.scene.track.collide(this),
              (this.vel = i.sub(n)),
              n.equ(i);
          }),
          (e.exports = i);
      },
      { "../math/cartesian": 15, "./mass": 65 },
    ],
    70: [
      function (t, e) {
        function i(t, e) {
          this.parent = e;
          var i,
            o,
            a,
            h,
            c,
            l,
            u,
            p,
            d,
            f,
            g = [],
            v = [],
            m = new n(0, 0);
          (i = new s()),
            (o = new s()),
            (a = new s()),
            (h = new s()),
            (l = new s()),
            (c = new s()),
            (u = new s()),
            (p = new s()),
            (d = new s()),
            (f = new s()),
            i.init(m, e),
            o.init(m, e),
            a.init(m, e),
            h.init(m, e),
            l.init(m, e),
            c.init(m, e),
            u.init(m, e),
            p.init(m, e),
            d.init(m, e),
            f.init(m, e),
            g.push(i),
            g.push(o),
            g.push(a),
            g.push(h),
            g.push(l),
            g.push(c),
            g.push(u),
            g.push(p),
            g.push(d),
            g.push(f),
            v.push(new r(i, o, this)),
            v.push(new r(i, a, this)),
            v.push(new r(a, l, this)),
            v.push(new r(i, h, this)),
            v.push(new r(h, c, this)),
            v.push(new r(o, u, this)),
            v.push(new r(u, d, this)),
            v.push(new r(o, p, this)),
            v.push(new r(p, f, this));
          for (var y in g) g[y].radius = 3;
          for (var y in g) g[y].friction = 0.05;
          i.radius = o.radius = 8;
          for (var y in v) v[y].springConstant = 0.4;
          for (var y in v) v[y].dampConstant = 0.7;
          (this.masses = g),
            (this.springs = v),
            (this.head = i),
            (this.waist = o),
            (this.lElbow = a),
            (this.rElbow = h),
            (this.rHand = c),
            (this.lHand = l),
            (this.lKnee = u),
            (this.rKnee = p),
            (this.lFoot = d),
            (this.rFoot = f);
          for (var y in t) this[y].pos.equ(t[y]);
        }
        var n = t("../math/cartesian"),
          s = t("./mass"),
          r = t("./spring"),
          o = t("./vehicle"),
          a = Math.atan2;
        (i.prototype = new o()),
          (i.prototype.init = i.prototype.initialize),
          (i.prototype.parent = null),
          (i.prototype.zero = function (t, e) {
            (t = t.factor(0.7)), (e = e.factor(0.7));
            var i = this.springs,
              n = this.masses;
            for (var s in i) {
              var r = i[s].m2.pos.sub(i[s].m1.pos).len();
              (i[s].lrest = r), (i[s].leff = r);
            }
            for (var s = 1; 4 >= s; s++) (i[s].lrest = 13), (i[s].leff = 13);
            for (var s in i)
              i[s].leff > 20 && ((i[s].lrest = 20), (i[s].leff = 20));
            var o = [
                this.head,
                this.lElbow,
                this.rElbow,
                this.lHand,
                this.rHand,
              ],
              a = [this.waist, this.lKnee, this.rKnee, this.lFoot, this.rFoot];
            for (var s in o) o[s].old = o[s].pos.sub(t);
            for (var s in a) a[s].old = a[s].pos.sub(e);
            for (var s in n)
              n[s].vel.equ(n[s].pos.sub(n[s].old)),
                (n[s].vel.x += 1 * (Math.random() - Math.random())),
                (n[s].vel.y += 1 * (Math.random() - Math.random()));
          }),
          (i.prototype.draw = function () {
            var t = this.head,
              e = this.waist,
              i = this.lElbow,
              n = this.rElbow,
              s = this.rHand,
              r = this.lHand,
              o = this.lKnee,
              a = this.rKnee,
              h = this.lFoot,
              c = this.rFoot,
              l = this.parent.scene,
              u = l.camera,
              p = u.zoom,
              d = l.game.canvas.getContext("2d"),
              f = (this.dir, this.parent.alpha);
            (d.strokeStyle = "rgba(0,0,0," + f + ")"),
              (d.lineWidth = 5 * p),
              (d.lineCap = "round"),
              (d.lineJoin = "round");
            var g = t.pos.toScreen(l);
            d.beginPath(), d.moveTo(g.x, g.y);
            var v = i.pos.toScreen(l);
            d.lineTo(v.x, v.y);
            var m = r.pos.toScreen(l);
            d.lineTo(m.x, m.y),
              d.stroke(),
              (d.strokeStyle = "rgba(0,0,0," + 0.5 * f + ")"),
              d.beginPath(),
              d.moveTo(g.x, g.y);
            var y = n.pos.toScreen(l);
            d.lineTo(y.x, y.y);
            var w = s.pos.toScreen(l);
            d.lineTo(w.x, w.y),
              d.stroke(),
              (d.strokeStyle = "rgba(0,0,0," + f + ")"),
              (d.lineWidth = 8 * p),
              d.beginPath(),
              d.moveTo(g.x, g.y);
            var _ = e.pos.toScreen(l);
            d.lineTo(_.x, _.y),
              d.stroke(),
              (d.lineWidth = 5 * p),
              d.beginPath(),
              d.moveTo(_.x, _.y);
            var x = o.pos.toScreen(l);
            d.lineTo(x.x, x.y);
            var b = h.pos.toScreen(l);
            d.lineTo(b.x, b.y);
            var T = o.pos.sub(e.pos).normalize();
            T = T.factor(4).add(h.pos);
            var k = T.toScreen(l);
            d.lineTo(k.x, k.y),
              d.stroke(),
              (d.strokeStyle = "rgba(0,0,0," + 0.5 * f + ")"),
              (d.lineWidth = 5 * p),
              d.beginPath(),
              d.moveTo(_.x, _.y);
            var S = a.pos.toScreen(l);
            d.lineTo(S.x, S.y);
            var C = a.pos.sub(e.pos).normalize();
            C = C.factor(4).add(c.pos);
            var P = c.pos.toScreen(l);
            d.lineTo(P.x, P.y);
            var M = C.toScreen(l);
            d.lineTo(M.x, M.y),
              d.stroke(),
              g.inc(g.sub(_).factor(0.25)),
              (d.lineWidth = 1 * p),
              (d.strokeStyle = "rgba(0,0,0," + f + ")"),
              (d.fillStyle = "rgba(255,255,255," + f + ")"),
              d.beginPath(),
              d.arc(g.x, g.y, 5 * p, 0, 1.99999 * Math.PI, !1),
              d.fill(),
              d.stroke(),
              (d.strokeStyle = "rgba(0,0,0," + f + ")"),
              (d.lineWidth = 0.5 * p),
              d.beginPath();
            var E = this.parent.cosmetics,
              D = GameInventoryManager.getItem(E.head),
              I = this.drawHeadAngle;
            D.draw(d, g.x, g.y, I, p, this.dir, 1);
          }),
          (i.prototype.update = function () {
            for (
              var t = (this.springs, this.masses, this.springs.length - 1);
              t >= 0;
              t--
            )
              this.springs[t].update();
            for (var e = this.masses.length - 1; e >= 0; e--)
              this.masses[e].update();
            this.updateDrawHeadAngle();
          }),
          (i.prototype.updateDrawHeadAngle = function () {
            var t, e;
            this.dir < 0
              ? ((e = this.head.pos), (t = this.waist.pos))
              : ((t = this.head.pos), (e = this.waist.pos));
            var i = t.x,
              n = t.y,
              s = e.x,
              r = e.y,
              o = i - s,
              h = n - r;
            this.drawHeadAngle = -(a(o, h) + Math.PI);
          }),
          (e.exports = i);
      },
      {
        "../math/cartesian": 15,
        "./mass": 65,
        "./spring": 71,
        "./vehicle": 72,
      },
    ],
    71: [
      function (t, e) {
        var i = t("../math/cartesian"),
          n = function (t, e, i) {
            (this.m1 = t),
              (this.m2 = e),
              (this.parent = i),
              (this.lrest = 40),
              (this.leff = 40),
              (this.dampConstant = 0.5),
              (this.springConstant = 0.7);
          };
        (n.prototype = {
          m1: null,
          m2: null,
          parent: null,
          lrest: 40,
          leff: 40,
          dampConstant: 0,
          springConstant: 0,
          swap: function () {
            var t = new i(),
              e = this.m1,
              n = this.m2;
            t.equ(e.pos),
              e.pos.equ(n.pos),
              n.pos.equ(t),
              t.equ(e.old),
              e.old.equ(n.old),
              n.old.equ(t),
              t.equ(e.vel),
              e.vel.equ(n.vel),
              n.vel.equ(t);
            var s = e.angle;
            (e.angle = n.angle), (n.angle = s);
          },
          update: function () {
            var t = new i(0, 0),
              e = this.m1,
              n = this.m2,
              s = e.pos,
              r = n.pos,
              o = e.vel,
              a = n.vel;
            (t.x = r.x - s.x), (t.y = r.y - s.y);
            var h = t.len();
            if (!(1 > h)) {
              var c = 1 / h;
              (t.x *= c), (t.y *= c);
              var l = (h - this.leff) * this.springConstant,
                u = { x: t.x * l, y: t.y * l },
                p = a.x - o.x,
                d = a.y - o.y,
                f = p * t.x + d * t.y,
                g = f * this.dampConstant,
                v = t.x * g,
                m = t.y * g;
              (u.x += v),
                (u.y += m),
                (a.x += -u.x),
                (a.y += -u.y),
                (o.x += u.x),
                (o.y += u.y);
            }
          },
          rotate: function (t) {
            var e = this.m1,
              i = this.m2,
              n = i.pos.x - e.pos.x,
              s = i.pos.y - e.pos.y,
              r = -s / this.leff,
              o = n / this.leff;
            (e.pos.x += r * t),
              (e.pos.y += o * t),
              (i.pos.x += r * -t),
              (i.pos.y += o * -t);
          },
          contract: function (t, e) {
            this.leff += (this.lrest - t - this.leff) / e;
          },
          setMasses: function (t, e) {
            (this.m1 = t), (this.m2 = e);
          },
        }),
          (e.exports = n);
      },
      { "../math/cartesian": 15 },
    ],
    72: [
      function (t, e) {
        var i = function () {};
        e.exports = i;
        {
          var n = t("../math/cartesian"),
            s = (t("../utils/gamepad"), t("./explosion")),
            r = (Math.sqrt, Math.pow, Math.abs),
            o = (Math.min, Math.floor, Math.round);
          Math.random;
        }
        (i.prototype.init = function (t) {
          (this.player = t),
            (this.scene = t._scene),
            (this.gamepad = t._gamepad),
            (this.settings = t._settings),
            (this.gravity = new n(
              this.settings.defaultGravityX,
              this.settings.defaultGravityY
            )),
            (this.complete = !1),
            (this.alive = !0),
            (this.crashed = !1),
            (this.dir = 1),
            (this.ghost = !1),
            (this.ragdoll = !1),
            (this.explosion = !1),
            (this.speed = 0),
            (this.powerupsEnabled = !0),
            this.createCosmetics();
        }),
          (i.prototype.explode = function () {
            this.scene.sound.play("bomb_sound", 1),
              (this.explosion = new s(this.masses[0].pos, this.scene)),
              this.dead();
          }),
          (i.prototype.createCosmetics = function () {
            var t = this.player._user,
              e = t.cosmetics;
            this.cosmetics = e;
          }),
          (i.prototype.updateSpeed = function () {
            this.speed = r(o(this.focalPoint.vel.x + this.focalPoint.vel.y));
          }),
          (i.prototype.close = function () {
            (this.scene = null),
              (this.settings = null),
              (this.gravity = null),
              (this.speed = null),
              (this.cosmetics = null),
              (this.explosion = null),
              (this.ragdoll = null),
              (this.ghost = null),
              (this.crashed = null),
              (this.alive = null),
              (this.gamepad = null);
          }),
          (i.prototype.dead = function () {
            this.stopSounds(),
              this.player.dead(),
              (this.crashed = !0),
              (this.alive = !1);
          }),
          (i.prototype.stopSounds = function () {});
      },
      { "../math/cartesian": 15, "../utils/gamepad": 51, "./explosion": 63 },
    ],
    73: [
      function (t, e) {
        function i(t, e) {
          this.init(t, e),
            (this.motor = 0),
            (this.brake = !1),
            (this.angle = 0),
            (this.speed = 0),
            (this.rotationSpeed = 0);
        }
        var n = (t("../math/cartesian"), t("./mass")),
          s = (i.prototype = new n());
        (s.motor = 0),
          (s.brake = !1),
          (s.angle = 0),
          (s.speed = 0),
          (s.drive = function (t, e) {
            var i = this.pos,
              n = this.motor * this.parent.dir,
              s = n * t,
              r = n * e;
            if (((i.x += s), (i.y += r), this.brake)) {
              var o = 0.3 * -(t * this.vel.x + e * this.vel.y),
                a = t * o,
                h = e * o;
              (i.x += a), (i.y += h);
            }
            (this.speed = (t * this.vel.x + e * this.vel.y) / this.radius),
              (this.rotationSpeed = this.speed),
              (this.angle += this.speed),
              (this.contact = !0);
          }),
          (s.massUpdate = s.update),
          (s.update = function () {
            var t = this.parent.gravity,
              e = this.pos,
              i = this.old,
              n = this.vel;
            (n.x += t.x),
              (n.y += t.y),
              (n.x *= 0.99),
              (n.y *= 0.99),
              (e.x += n.x),
              (e.y += n.y),
              (this.contact = !1),
              this.collide && this.scene.track.collide(this),
              (n.x = e.x - i.x),
              (n.y = e.y - i.y),
              this.old.equ(this.pos),
              (this.rotationSpeed = 0.999 * this.rotationSpeed);
          }),
          (e.exports = i);
      },
      { "../math/cartesian": 15, "./mass": 65 },
    ],
    74: [
      function (t, e) {
        function i(t) {
          var e = t.settings;
          (this.settings = e),
            (this.scene = t),
            (this.zoom = e.cameraStartZoom * t.game.pixelRatio),
            (this.desiredZoom = e.cameraStartZoom * t.game.pixelRatio),
            (this.zooming = !1),
            (this.position = new n(0, 0)),
            (this.zoomPercentage = this.getZoomAsPercentage()),
            (this.zoomPoint = !1);
        }
        var n = t("../math/cartesian"),
          s = Math.round,
          r = Math.abs;
        (i.prototype = {
          settings: null,
          scene: null,
          zoom: 1,
          position: null,
          desiredZoom: 1,
          zoomPercentage: 0,
          focusIndex: 0,
          playerFocus: null,
          focusOnNextPlayer: function () {
            var t = this.scene.playerManager.getPlayerCount();
            (this.focusIndex = (this.focusIndex + 1) % t), this.focusOnPlayer();
          },
          focusOnPlayer: function () {
            var t = this.scene,
              e = t.playerManager,
              i = e.getPlayerCount();
            i <= this.focusIndex && (this.focusIndex = 0);
            var n = e.getPlayerByIndex(this.focusIndex);
            if (this.playerFocus !== n) {
              var s = this.playerFocus;
              if (((this.playerFocus = n), t.vehicleTimer.setPlayer(n), s)) {
                var r = n.getDistanceBetweenPlayers(s);
                r > 1500 && this.fastforward();
              } else this.fastforward();
            }
          },
          focusOnMainPlayer: function () {
            (0 === this.focusIndex && this.playerFocus) ||
              ((this.focusIndex = 0), this.focusOnPlayer());
          },
          update: function () {
            if (this.playerFocus) {
              var t = this.playerFocus.getActiveVehicle(),
                e = t.focalPoint,
                i = this.position,
                n = 3;
              (i.x += (e.pos.x - i.x) / n), (i.y += (e.pos.y - i.y) / n);
            }
          },
          updateZoom: function () {
            var t = this.zoom,
              e = this.desiredZoom;
            t !== e &&
              ((this.scene.loading = !0),
              this._performZoom(),
              this.zoom === this.desiredZoom && this.zoomComplete());
          },
          zoomToPoint: function (t) {
            var e = (this.zoom, this.scene),
              i = e.screen,
              n = this.position,
              s = this.zoomPoint,
              r = i.toReal(s.x, "x"),
              o = i.toReal(s.y, "y"),
              a = s.x / i.width,
              h = s.y / i.height,
              c = i.width / t,
              l = i.height / t;
            (n.x = r - c * a + c / 2), (n.y = o - l * h + l / 2);
          },
          _performZoom: function () {
            var t = this.scene,
              e = (t.screen, this.position, this.zoom),
              i = this.desiredZoom,
              n = i - e,
              s = n / 3;
            (e += s),
              r(n) < 0.05 && (e = i),
              this.zoomPoint && this.zoomToPoint(e),
              (this.zoom = e);
          },
          zoomComplete: function () {
            this.scene.redraw(), (this.zooming = !1), (this.scene.loading = !1);
          },
          setZoom: function (t, e) {
            var i = this.scene;
            (this.desiredZoom = s(t * i.game.pixelRatio * 10) / 10),
              (this.zooming = !0),
              this.desiredZoom === this.zoom &&
                ((this.zooming = !1), (this.scene.state.loading = !1)),
              (this.zoomPoint = !1),
              null === this.playerFocus && e && (this.zoomPoint = e),
              (this.zoomPercentage = this.getZoomAsPercentage()),
              i.stateChanged();
          },
          resetZoom: function () {
            var t = this.settings.cameraStartZoom;
            this.setZoom(t);
          },
          getZoomAsPercentage: function () {
            var t = this.scene.settings,
              e =
                (this.desiredZoom /
                  this.scene.game.pixelRatio /
                  t.cameraStartZoom) *
                100;
            return 0 | e;
          },
          increaseZoom: function () {
            var t = this.scene.settings,
              e = t.cameraSensitivity,
              i = this.desiredZoom + 2 * e,
              n = this.scene.game.pixelRatio,
              s = t.cameraZoomMax,
              r = s * n;
            this.setZoom(i / n), this.desiredZoom > r && this.setZoom(s);
          },
          decreaseZoom: function () {
            var t = this.scene.settings,
              e = t.cameraSensitivity,
              i = this.desiredZoom - 2 * e,
              n = this.scene.game.pixelRatio,
              s = t.cameraZoomMin,
              r = s * n;
            this.setZoom(i / n), this.desiredZoom < r && this.setZoom(s);
          },
          unfocus: function () {
            (this.playerFocus = null), this.scene.vehicleTimer.removePlayer();
          },
          fastforward: function () {
            if (this.playerFocus) {
              var t = this.playerFocus.getActiveVehicle(),
                e = t.focalPoint;
              (this.position.x = e.pos.x), (this.position.y = e.pos.y);
            }
          },
          close: function () {
            (this.zoom = null),
              (this.scene = null),
              (this.position = null),
              (this.playerFocus = null);
          },
        }),
          (e.exports = i);
      },
      { "../math/cartesian": 15 },
    ],
    75: [
      function (t, e) {
        function i(t) {
          (this.scene = t),
            (this.game = t.game),
            (this.size = new n(0, 0)),
            (this.center = new n(0, 0)),
            this.setScreen();
        }
        var n = t("../math/cartesian");
        (i.prototype = {
          game: null,
          scene: null,
          size: null,
          center: null,
          width: 0,
          height: 0,
          setScreen: function () {
            var t = this.game.width,
              e = this.game.height;
            (this.width = t),
              (this.height = e),
              (this.size.x = t),
              (this.size.y = e),
              (this.center.x = t / 2),
              (this.center.y = e / 2);
          },
          update: function () {
            var t = this.game;
            (t.width !== this.width || t.height !== this.height) &&
              this.setScreen();
          },
          realToScreen: function (t, e) {
            var i = this.scene,
              n = i.camera,
              s = i.screen;
            return (t - n.position[e]) * n.zoom + s.center[e];
          },
          toReal: function (t, e) {
            var i = this.scene,
              n = i.camera,
              s = i.screen;
            return (t - s.center[e]) / n.zoom + n.position[e];
          },
          close: function () {
            (this.width = null),
              (this.height = null),
              (this.center = null),
              (this.size = null),
              (this.game = null),
              (this.scene = null);
          },
        }),
          (e.exports = i);
      },
      { "../math/cartesian": 15 },
    ],
    76: [
      function () {
        (this.createjs = this.createjs || {}),
          (createjs.extend = function (t, e) {
            "use strict";
            function i() {
              this.constructor = t;
            }
            return (i.prototype = e.prototype), (t.prototype = new i());
          }),
          (this.createjs = this.createjs || {}),
          (createjs.promote = function (t, e) {
            "use strict";
            var i = t.prototype,
              n =
                (Object.getPrototypeOf && Object.getPrototypeOf(i)) ||
                i.__proto__;
            if (n) {
              i[(e += "_") + "constructor"] = n.constructor;
              for (var s in n)
                i.hasOwnProperty(s) &&
                  "function" == typeof n[s] &&
                  (i[e + s] = n[s]);
            }
            return t;
          }),
          (this.createjs = this.createjs || {}),
          (createjs.indexOf = function (t, e) {
            "use strict";
            for (var i = 0, n = t.length; n > i; i++) if (e === t[i]) return i;
            return -1;
          }),
          (this.createjs = this.createjs || {}),
          (function () {
            "use strict";
            function t(t, e, i) {
              (this.type = t),
                (this.target = null),
                (this.currentTarget = null),
                (this.eventPhase = 0),
                (this.bubbles = !!e),
                (this.cancelable = !!i),
                (this.timeStamp = new Date().getTime()),
                (this.defaultPrevented = !1),
                (this.propagationStopped = !1),
                (this.immediatePropagationStopped = !1),
                (this.removed = !1);
            }
            var e = t.prototype;
            (e.preventDefault = function () {
              this.defaultPrevented = this.cancelable && !0;
            }),
              (e.stopPropagation = function () {
                this.propagationStopped = !0;
              }),
              (e.stopImmediatePropagation = function () {
                this.immediatePropagationStopped = this.propagationStopped = !0;
              }),
              (e.remove = function () {
                this.removed = !0;
              }),
              (e.clone = function () {
                return new t(this.type, this.bubbles, this.cancelable);
              }),
              (e.set = function (t) {
                for (var e in t) this[e] = t[e];
                return this;
              }),
              (e.toString = function () {
                return "[Event (type=" + this.type + ")]";
              }),
              (createjs.Event = t);
          })(),
          (this.createjs = this.createjs || {}),
          (function () {
            "use strict";
            function t() {
              (this._listeners = null), (this._captureListeners = null);
            }
            var e = t.prototype;
            (t.initialize = function (t) {
              (t.addEventListener = e.addEventListener),
                (t.on = e.on),
                (t.removeEventListener = t.off = e.removeEventListener),
                (t.removeAllEventListeners = e.removeAllEventListeners),
                (t.hasEventListener = e.hasEventListener),
                (t.dispatchEvent = e.dispatchEvent),
                (t._dispatchEvent = e._dispatchEvent),
                (t.willTrigger = e.willTrigger);
            }),
              (e.addEventListener = function (t, e, i) {
                var n;
                n = i
                  ? (this._captureListeners = this._captureListeners || {})
                  : (this._listeners = this._listeners || {});
                var s = n[t];
                return (
                  s && this.removeEventListener(t, e, i),
                  (s = n[t]),
                  s ? s.push(e) : (n[t] = [e]),
                  e
                );
              }),
              (e.on = function (t, e, i, n, s, r) {
                return (
                  e.handleEvent && ((i = i || e), (e = e.handleEvent)),
                  (i = i || this),
                  this.addEventListener(
                    t,
                    function (t) {
                      e.call(i, t, s), n && t.remove();
                    },
                    r
                  )
                );
              }),
              (e.removeEventListener = function (t, e, i) {
                var n = i ? this._captureListeners : this._listeners;
                if (n) {
                  var s = n[t];
                  if (s)
                    for (var r = 0, o = s.length; o > r; r++)
                      if (s[r] == e) {
                        1 == o ? delete n[t] : s.splice(r, 1);
                        break;
                      }
                }
              }),
              (e.off = e.removeEventListener),
              (e.removeAllEventListeners = function (t) {
                t
                  ? (this._listeners && delete this._listeners[t],
                    this._captureListeners && delete this._captureListeners[t])
                  : (this._listeners = this._captureListeners = null);
              }),
              (e.dispatchEvent = function (t) {
                if ("string" == typeof t) {
                  var e = this._listeners;
                  if (!e || !e[t]) return !1;
                  t = new createjs.Event(t);
                } else t.target && t.clone && (t = t.clone());
                try {
                  t.target = this;
                } catch (i) {}
                if (t.bubbles && this.parent) {
                  for (var n = this, s = [n]; n.parent; )
                    s.push((n = n.parent));
                  var r,
                    o = s.length;
                  for (r = o - 1; r >= 0 && !t.propagationStopped; r--)
                    s[r]._dispatchEvent(t, 1 + (0 == r));
                  for (r = 1; o > r && !t.propagationStopped; r++)
                    s[r]._dispatchEvent(t, 3);
                } else this._dispatchEvent(t, 2);
                return t.defaultPrevented;
              }),
              (e.hasEventListener = function (t) {
                var e = this._listeners,
                  i = this._captureListeners;
                return !!((e && e[t]) || (i && i[t]));
              }),
              (e.willTrigger = function (t) {
                for (var e = this; e; ) {
                  if (e.hasEventListener(t)) return !0;
                  e = e.parent;
                }
                return !1;
              }),
              (e.toString = function () {
                return "[EventDispatcher]";
              }),
              (e._dispatchEvent = function (t, e) {
                var i,
                  n = 1 == e ? this._captureListeners : this._listeners;
                if (t && n) {
                  var s = n[t.type];
                  if (!s || !(i = s.length)) return;
                  try {
                    t.currentTarget = this;
                  } catch (r) {}
                  try {
                    t.eventPhase = e;
                  } catch (r) {}
                  (t.removed = !1), (s = s.slice());
                  for (
                    var o = 0;
                    i > o && !t.immediatePropagationStopped;
                    o++
                  ) {
                    var a = s[o];
                    a.handleEvent ? a.handleEvent(t) : a(t),
                      t.removed &&
                        (this.off(t.type, a, 1 == e), (t.removed = !1));
                  }
                }
              }),
              (createjs.EventDispatcher = t);
          })(),
          (this.createjs = this.createjs || {}),
          (function () {
            "use strict";
            function t() {
              throw "Ticker cannot be instantiated.";
            }
            (t.RAF_SYNCHED = "synched"),
              (t.RAF = "raf"),
              (t.TIMEOUT = "timeout"),
              (t.useRAF = !1),
              (t.timingMode = null),
              (t.maxDelta = 0),
              (t.paused = !1),
              (t.removeEventListener = null),
              (t.removeAllEventListeners = null),
              (t.dispatchEvent = null),
              (t.hasEventListener = null),
              (t._listeners = null),
              createjs.EventDispatcher.initialize(t),
              (t._addEventListener = t.addEventListener),
              (t.addEventListener = function () {
                return (
                  !t._inited && t.init(),
                  t._addEventListener.apply(t, arguments)
                );
              }),
              (t._inited = !1),
              (t._startTime = 0),
              (t._pausedTime = 0),
              (t._ticks = 0),
              (t._pausedTicks = 0),
              (t._interval = 50),
              (t._lastTime = 0),
              (t._times = null),
              (t._tickTimes = null),
              (t._timerId = null),
              (t._raf = !0),
              (t.setInterval = function (e) {
                (t._interval = e), t._inited && t._setupTick();
              }),
              (t.getInterval = function () {
                return t._interval;
              }),
              (t.setFPS = function (e) {
                t.setInterval(1e3 / e);
              }),
              (t.getFPS = function () {
                return 1e3 / t._interval;
              });
            try {
              Object.defineProperties(t, {
                interval: { get: t.getInterval, set: t.setInterval },
                framerate: { get: t.getFPS, set: t.setFPS },
              });
            } catch (e) {
              console.log(e);
            }
            (t.init = function () {
              t._inited ||
                ((t._inited = !0),
                (t._times = []),
                (t._tickTimes = []),
                (t._startTime = t._getTime()),
                t._times.push((t._lastTime = 0)),
                (t.interval = t._interval));
            }),
              (t.reset = function () {
                if (t._raf) {
                  var e =
                    window.cancelAnimationFrame ||
                    window.webkitCancelAnimationFrame ||
                    window.mozCancelAnimationFrame ||
                    window.oCancelAnimationFrame ||
                    window.msCancelAnimationFrame;
                  e && e(t._timerId);
                } else clearTimeout(t._timerId);
                t.removeAllEventListeners("tick"),
                  (t._timerId = t._times = t._tickTimes = null),
                  (t._startTime = t._lastTime = t._ticks = 0),
                  (t._inited = !1);
              }),
              (t.getMeasuredTickTime = function (e) {
                var i = 0,
                  n = t._tickTimes;
                if (!n || n.length < 1) return -1;
                e = Math.min(n.length, e || 0 | t.getFPS());
                for (var s = 0; e > s; s++) i += n[s];
                return i / e;
              }),
              (t.getMeasuredFPS = function (e) {
                var i = t._times;
                return !i || i.length < 2
                  ? -1
                  : ((e = Math.min(i.length - 1, e || 0 | t.getFPS())),
                    1e3 / ((i[0] - i[e]) / e));
              }),
              (t.setPaused = function (e) {
                t.paused = e;
              }),
              (t.getPaused = function () {
                return t.paused;
              }),
              (t.getTime = function (e) {
                return t._startTime
                  ? t._getTime() - (e ? t._pausedTime : 0)
                  : -1;
              }),
              (t.getEventTime = function (e) {
                return t._startTime
                  ? (t._lastTime || t._startTime) - (e ? t._pausedTime : 0)
                  : -1;
              }),
              (t.getTicks = function (e) {
                return t._ticks - (e ? t._pausedTicks : 0);
              }),
              (t._handleSynch = function () {
                (t._timerId = null),
                  t._setupTick(),
                  t._getTime() - t._lastTime >= 0.97 * (t._interval - 1) &&
                    t._tick();
              }),
              (t._handleRAF = function () {
                (t._timerId = null), t._setupTick(), t._tick();
              }),
              (t._handleTimeout = function () {
                (t._timerId = null), t._setupTick(), t._tick();
              }),
              (t._setupTick = function () {
                if (null == t._timerId) {
                  var e = t.timingMode || (t.useRAF && t.RAF_SYNCHED);
                  if (e == t.RAF_SYNCHED || e == t.RAF) {
                    var i =
                      window.requestAnimationFrame ||
                      window.webkitRequestAnimationFrame ||
                      window.mozRequestAnimationFrame ||
                      window.oRequestAnimationFrame ||
                      window.msRequestAnimationFrame;
                    if (i)
                      return (
                        (t._timerId = i(
                          e == t.RAF ? t._handleRAF : t._handleSynch
                        )),
                        void (t._raf = !0)
                      );
                  }
                  (t._raf = !1),
                    (t._timerId = setTimeout(t._handleTimeout, t._interval));
                }
              }),
              (t._tick = function () {
                var e = t.paused,
                  i = t._getTime(),
                  n = i - t._lastTime;
                if (
                  ((t._lastTime = i),
                  t._ticks++,
                  e && (t._pausedTicks++, (t._pausedTime += n)),
                  t.hasEventListener("tick"))
                ) {
                  var s = new createjs.Event("tick"),
                    r = t.maxDelta;
                  (s.delta = r && n > r ? r : n),
                    (s.paused = e),
                    (s.time = i),
                    (s.runTime = i - t._pausedTime),
                    t.dispatchEvent(s);
                }
                for (
                  t._tickTimes.unshift(t._getTime() - i);
                  t._tickTimes.length > 100;

                )
                  t._tickTimes.pop();
                for (t._times.unshift(i); t._times.length > 100; )
                  t._times.pop();
              });
            var i =
              window.performance &&
              (performance.now ||
                performance.mozNow ||
                performance.msNow ||
                performance.oNow ||
                performance.webkitNow);
            (t._getTime = function () {
              return (
                ((i && i.call(performance)) || new Date().getTime()) -
                t._startTime
              );
            }),
              (createjs.Ticker = t);
          })(),
          (this.createjs = this.createjs || {}),
          (function () {
            "use strict";
            function t() {
              throw "UID cannot be instantiated";
            }
            (t._nextID = 0),
              (t.get = function () {
                return t._nextID++;
              }),
              (createjs.UID = t);
          })(),
          (this.createjs = this.createjs || {}),
          (function () {
            "use strict";
            function t(t, e, i, n, s, r, o, a, h, c) {
              this.Event_constructor(t, e, i),
                (this.stageX = n),
                (this.stageY = s),
                (this.rawX = null == h ? n : h),
                (this.rawY = null == c ? s : c),
                (this.nativeEvent = r),
                (this.pointerID = o),
                (this.primary = !!a);
            }
            var e = createjs.extend(t, createjs.Event);
            (e._get_localX = function () {
              return this.currentTarget.globalToLocal(this.rawX, this.rawY).x;
            }),
              (e._get_localY = function () {
                return this.currentTarget.globalToLocal(this.rawX, this.rawY).y;
              }),
              (e._get_isTouch = function () {
                return -1 !== this.pointerID;
              });
            try {
              Object.defineProperties(e, {
                localX: { get: e._get_localX },
                localY: { get: e._get_localY },
                isTouch: { get: e._get_isTouch },
              });
            } catch (i) {}
            (e.clone = function () {
              return new t(
                this.type,
                this.bubbles,
                this.cancelable,
                this.stageX,
                this.stageY,
                this.nativeEvent,
                this.pointerID,
                this.primary,
                this.rawX,
                this.rawY
              );
            }),
              (e.toString = function () {
                return (
                  "[MouseEvent (type=" +
                  this.type +
                  " stageX=" +
                  this.stageX +
                  " stageY=" +
                  this.stageY +
                  ")]"
                );
              }),
              (createjs.MouseEvent = createjs.promote(t, "Event"));
          })(),
          (this.createjs = this.createjs || {}),
          (function () {
            "use strict";
            function t(t, e, i, n, s, r) {
              this.setValues(t, e, i, n, s, r);
            }
            var e = t.prototype;
            (t.DEG_TO_RAD = Math.PI / 180),
              (t.identity = null),
              (e.setValues = function (t, e, i, n, s, r) {
                return (
                  (this.a = null == t ? 1 : t),
                  (this.b = e || 0),
                  (this.c = i || 0),
                  (this.d = null == n ? 1 : n),
                  (this.tx = s || 0),
                  (this.ty = r || 0),
                  this
                );
              }),
              (e.append = function (t, e, i, n, s, r) {
                var o = this.a,
                  a = this.b,
                  h = this.c,
                  c = this.d;
                return (
                  (1 != t || 0 != e || 0 != i || 1 != n) &&
                    ((this.a = o * t + h * e),
                    (this.b = a * t + c * e),
                    (this.c = o * i + h * n),
                    (this.d = a * i + c * n)),
                  (this.tx = o * s + h * r + this.tx),
                  (this.ty = a * s + c * r + this.ty),
                  this
                );
              }),
              (e.prepend = function (t, e, i, n, s, r) {
                var o = this.a,
                  a = this.c,
                  h = this.tx;
                return (
                  (this.a = t * o + i * this.b),
                  (this.b = e * o + n * this.b),
                  (this.c = t * a + i * this.d),
                  (this.d = e * a + n * this.d),
                  (this.tx = t * h + i * this.ty + s),
                  (this.ty = e * h + n * this.ty + r),
                  this
                );
              }),
              (e.appendMatrix = function (t) {
                return this.append(t.a, t.b, t.c, t.d, t.tx, t.ty);
              }),
              (e.prependMatrix = function (t) {
                return this.prepend(t.a, t.b, t.c, t.d, t.tx, t.ty);
              }),
              (e.appendTransform = function (e, i, n, s, r, o, a, h, c) {
                if (r % 360)
                  var l = r * t.DEG_TO_RAD,
                    u = Math.cos(l),
                    p = Math.sin(l);
                else (u = 1), (p = 0);
                return (
                  o || a
                    ? ((o *= t.DEG_TO_RAD),
                      (a *= t.DEG_TO_RAD),
                      this.append(
                        Math.cos(a),
                        Math.sin(a),
                        -Math.sin(o),
                        Math.cos(o),
                        e,
                        i
                      ),
                      this.append(u * n, p * n, -p * s, u * s, 0, 0))
                    : this.append(u * n, p * n, -p * s, u * s, e, i),
                  (h || c) &&
                    ((this.tx -= h * this.a + c * this.c),
                    (this.ty -= h * this.b + c * this.d)),
                  this
                );
              }),
              (e.prependTransform = function (e, i, n, s, r, o, a, h, c) {
                if (r % 360)
                  var l = r * t.DEG_TO_RAD,
                    u = Math.cos(l),
                    p = Math.sin(l);
                else (u = 1), (p = 0);
                return (
                  (h || c) && ((this.tx -= h), (this.ty -= c)),
                  o || a
                    ? ((o *= t.DEG_TO_RAD),
                      (a *= t.DEG_TO_RAD),
                      this.prepend(u * n, p * n, -p * s, u * s, 0, 0),
                      this.prepend(
                        Math.cos(a),
                        Math.sin(a),
                        -Math.sin(o),
                        Math.cos(o),
                        e,
                        i
                      ))
                    : this.prepend(u * n, p * n, -p * s, u * s, e, i),
                  this
                );
              }),
              (e.rotate = function (e) {
                e *= t.DEG_TO_RAD;
                var i = Math.cos(e),
                  n = Math.sin(e),
                  s = this.a,
                  r = this.b;
                return (
                  (this.a = s * i + this.c * n),
                  (this.b = r * i + this.d * n),
                  (this.c = -s * n + this.c * i),
                  (this.d = -r * n + this.d * i),
                  this
                );
              }),
              (e.skew = function (e, i) {
                return (
                  (e *= t.DEG_TO_RAD),
                  (i *= t.DEG_TO_RAD),
                  this.append(
                    Math.cos(i),
                    Math.sin(i),
                    -Math.sin(e),
                    Math.cos(e),
                    0,
                    0
                  ),
                  this
                );
              }),
              (e.scale = function (t, e) {
                return (
                  (this.a *= t),
                  (this.b *= t),
                  (this.c *= e),
                  (this.d *= e),
                  this
                );
              }),
              (e.translate = function (t, e) {
                return (
                  (this.tx += this.a * t + this.c * e),
                  (this.ty += this.b * t + this.d * e),
                  this
                );
              }),
              (e.identity = function () {
                return (
                  (this.a = this.d = 1),
                  (this.b = this.c = this.tx = this.ty = 0),
                  this
                );
              }),
              (e.invert = function () {
                var t = this.a,
                  e = this.b,
                  i = this.c,
                  n = this.d,
                  s = this.tx,
                  r = t * n - e * i;
                return (
                  (this.a = n / r),
                  (this.b = -e / r),
                  (this.c = -i / r),
                  (this.d = t / r),
                  (this.tx = (i * this.ty - n * s) / r),
                  (this.ty = -(t * this.ty - e * s) / r),
                  this
                );
              }),
              (e.isIdentity = function () {
                return (
                  0 === this.tx &&
                  0 === this.ty &&
                  1 === this.a &&
                  0 === this.b &&
                  0 === this.c &&
                  1 === this.d
                );
              }),
              (e.equals = function (t) {
                return (
                  this.tx === t.tx &&
                  this.ty === t.ty &&
                  this.a === t.a &&
                  this.b === t.b &&
                  this.c === t.c &&
                  this.d === t.d
                );
              }),
              (e.transformPoint = function (t, e, i) {
                return (
                  (i = i || {}),
                  (i.x = t * this.a + e * this.c + this.tx),
                  (i.y = t * this.b + e * this.d + this.ty),
                  i
                );
              }),
              (e.decompose = function (e) {
                null == e && (e = {}),
                  (e.x = this.tx),
                  (e.y = this.ty),
                  (e.scaleX = Math.sqrt(this.a * this.a + this.b * this.b)),
                  (e.scaleY = Math.sqrt(this.c * this.c + this.d * this.d));
                var i = Math.atan2(-this.c, this.d),
                  n = Math.atan2(this.b, this.a),
                  s = Math.abs(1 - i / n);
                return (
                  1e-5 > s
                    ? ((e.rotation = n / t.DEG_TO_RAD),
                      this.a < 0 &&
                        this.d >= 0 &&
                        (e.rotation += e.rotation <= 0 ? 180 : -180),
                      (e.skewX = e.skewY = 0))
                    : ((e.skewX = i / t.DEG_TO_RAD),
                      (e.skewY = n / t.DEG_TO_RAD)),
                  e
                );
              }),
              (e.copy = function (t) {
                return this.setValues(t.a, t.b, t.c, t.d, t.tx, t.ty);
              }),
              (e.clone = function () {
                return new t(this.a, this.b, this.c, this.d, this.tx, this.ty);
              }),
              (e.toString = function () {
                return (
                  "[Matrix2D (a=" +
                  this.a +
                  " b=" +
                  this.b +
                  " c=" +
                  this.c +
                  " d=" +
                  this.d +
                  " tx=" +
                  this.tx +
                  " ty=" +
                  this.ty +
                  ")]"
                );
              }),
              (t.identity = new t()),
              (createjs.Matrix2D = t);
          })(),
          (this.createjs = this.createjs || {}),
          (function () {
            "use strict";
            function t(t, e, i, n, s) {
              this.setValues(t, e, i, n, s);
            }
            var e = t.prototype;
            (e.setValues = function (t, e, i, n, s) {
              return (
                (this.visible = null == t ? !0 : !!t),
                (this.alpha = null == e ? 1 : e),
                (this.shadow = i),
                (this.compositeOperation = i),
                (this.matrix =
                  s ||
                  (this.matrix && this.matrix.identity()) ||
                  new createjs.Matrix2D()),
                this
              );
            }),
              (e.append = function (t, e, i, n, s) {
                return (
                  (this.alpha *= e),
                  (this.shadow = i || this.shadow),
                  (this.compositeOperation = n || this.compositeOperation),
                  (this.visible = this.visible && t),
                  s && this.matrix.appendMatrix(s),
                  this
                );
              }),
              (e.prepend = function (t, e, i, n, s) {
                return (
                  (this.alpha *= e),
                  (this.shadow = this.shadow || i),
                  (this.compositeOperation = this.compositeOperation || n),
                  (this.visible = this.visible && t),
                  s && this.matrix.prependMatrix(s),
                  this
                );
              }),
              (e.identity = function () {
                return (
                  (this.visible = !0),
                  (this.alpha = 1),
                  (this.shadow = this.compositeOperation = null),
                  this.matrix.identity(),
                  this
                );
              }),
              (e.clone = function () {
                return new t(
                  this.alpha,
                  this.shadow,
                  this.compositeOperation,
                  this.visible,
                  this.matrix.clone()
                );
              }),
              (createjs.DisplayProps = t);
          })(),
          (this.createjs = this.createjs || {}),
          (function () {
            "use strict";
            function t(t, e) {
              this.setValues(t, e);
            }
            var e = t.prototype;
            (e.setValues = function (t, e) {
              return (this.x = t || 0), (this.y = e || 0), this;
            }),
              (e.copy = function (t) {
                return (this.x = t.x), (this.y = t.y), this;
              }),
              (e.clone = function () {
                return new t(this.x, this.y);
              }),
              (e.toString = function () {
                return "[Point (x=" + this.x + " y=" + this.y + ")]";
              }),
              (createjs.Point = t);
          })(),
          (this.createjs = this.createjs || {}),
          (function () {
            "use strict";
            function t(t, e, i, n) {
              this.setValues(t, e, i, n);
            }
            var e = t.prototype;
            (e.setValues = function (t, e, i, n) {
              return (
                (this.x = t || 0),
                (this.y = e || 0),
                (this.width = i || 0),
                (this.height = n || 0),
                this
              );
            }),
              (e.extend = function (t, e, i, n) {
                return (
                  (i = i || 0),
                  (n = n || 0),
                  t + i > this.x + this.width && (this.width = t + i - this.x),
                  e + n > this.y + this.height &&
                    (this.height = e + n - this.y),
                  t < this.x && ((this.width += this.x - t), (this.x = t)),
                  e < this.y && ((this.height += this.y - e), (this.y = e)),
                  this
                );
              }),
              (e.pad = function (t, e, i, n) {
                return (
                  (this.x -= t),
                  (this.y -= e),
                  (this.width += t + i),
                  (this.height += e + n),
                  this
                );
              }),
              (e.copy = function (t) {
                return this.setValues(t.x, t.y, t.width, t.height);
              }),
              (e.contains = function (t, e, i, n) {
                return (
                  (i = i || 0),
                  (n = n || 0),
                  t >= this.x &&
                    t + i <= this.x + this.width &&
                    e >= this.y &&
                    e + n <= this.y + this.height
                );
              }),
              (e.union = function (t) {
                return this.clone().extend(t.x, t.y, t.width, t.height);
              }),
              (e.intersection = function (e) {
                var i = e.x,
                  n = e.y,
                  s = i + e.width,
                  r = n + e.height;
                return (
                  this.x > i && (i = this.x),
                  this.y > n && (n = this.y),
                  this.x + this.width < s && (s = this.x + this.width),
                  this.y + this.height < r && (r = this.y + this.height),
                  i >= s || n >= r ? null : new t(i, n, s - i, r - n)
                );
              }),
              (e.intersects = function (t) {
                return (
                  t.x <= this.x + this.width &&
                  this.x <= t.x + t.width &&
                  t.y <= this.y + this.height &&
                  this.y <= t.y + t.height
                );
              }),
              (e.isEmpty = function () {
                return this.width <= 0 || this.height <= 0;
              }),
              (e.clone = function () {
                return new t(this.x, this.y, this.width, this.height);
              }),
              (e.toString = function () {
                return (
                  "[Rectangle (x=" +
                  this.x +
                  " y=" +
                  this.y +
                  " width=" +
                  this.width +
                  " height=" +
                  this.height +
                  ")]"
                );
              }),
              (createjs.Rectangle = t);
          })(),
          (this.createjs = this.createjs || {}),
          (function () {
            "use strict";
            function t(t, e, i, n, s, r, o) {
              t.addEventListener &&
                ((this.target = t),
                (this.overLabel = null == i ? "over" : i),
                (this.outLabel = null == e ? "out" : e),
                (this.downLabel = null == n ? "down" : n),
                (this.play = s),
                (this._isPressed = !1),
                (this._isOver = !1),
                (this._enabled = !1),
                (t.mouseChildren = !1),
                (this.enabled = !0),
                this.handleEvent({}),
                r &&
                  (o &&
                    ((r.actionsEnabled = !1),
                    r.gotoAndStop && r.gotoAndStop(o)),
                  (t.hitArea = r)));
            }
            var e = t.prototype;
            (e.setEnabled = function (t) {
              if (t != this._enabled) {
                var e = this.target;
                (this._enabled = t),
                  t
                    ? ((e.cursor = "pointer"),
                      e.addEventListener("rollover", this),
                      e.addEventListener("rollout", this),
                      e.addEventListener("mousedown", this),
                      e.addEventListener("pressup", this))
                    : ((e.cursor = null),
                      e.removeEventListener("rollover", this),
                      e.removeEventListener("rollout", this),
                      e.removeEventListener("mousedown", this),
                      e.removeEventListener("pressup", this));
              }
            }),
              (e.getEnabled = function () {
                return this._enabled;
              });
            try {
              Object.defineProperties(e, {
                enabled: { get: e.getEnabled, set: e.setEnabled },
              });
            } catch (i) {}
            (e.toString = function () {
              return "[ButtonHelper]";
            }),
              (e.handleEvent = function (t) {
                var e,
                  i = this.target,
                  n = t.type;
                "mousedown" == n
                  ? ((this._isPressed = !0), (e = this.downLabel))
                  : "pressup" == n
                  ? ((this._isPressed = !1),
                    (e = this._isOver ? this.overLabel : this.outLabel))
                  : "rollover" == n
                  ? ((this._isOver = !0),
                    (e = this._isPressed ? this.downLabel : this.overLabel))
                  : ((this._isOver = !1),
                    (e = this._isPressed ? this.overLabel : this.outLabel)),
                  this.play
                    ? i.gotoAndPlay && i.gotoAndPlay(e)
                    : i.gotoAndStop && i.gotoAndStop(e);
              }),
              (createjs.ButtonHelper = t);
          })(),
          (this.createjs = this.createjs || {}),
          (function () {
            "use strict";
            function t(t, e, i, n) {
              (this.color = t || "black"),
                (this.offsetX = e || 0),
                (this.offsetY = i || 0),
                (this.blur = n || 0);
            }
            var e = t.prototype;
            (t.identity = new t("transparent", 0, 0, 0)),
              (e.toString = function () {
                return "[Shadow]";
              }),
              (e.clone = function () {
                return new t(this.color, this.offsetX, this.offsetY, this.blur);
              }),
              (createjs.Shadow = t);
          })(),
          (this.createjs = this.createjs || {}),
          (function () {
            "use strict";
            function t(t) {
              this.EventDispatcher_constructor(),
                (this.complete = !0),
                (this.framerate = 0),
                (this._animations = null),
                (this._frames = null),
                (this._images = null),
                (this._data = null),
                (this._loadCount = 0),
                (this._frameHeight = 0),
                (this._frameWidth = 0),
                (this._numFrames = 0),
                (this._regX = 0),
                (this._regY = 0),
                (this._spacing = 0),
                (this._margin = 0),
                this._parseData(t);
            }
            var e = createjs.extend(t, createjs.EventDispatcher);
            e.getAnimations = function () {
              return this._animations.slice();
            };
            try {
              Object.defineProperties(e, {
                animations: { get: e.getAnimations },
              });
            } catch (i) {}
            (e.getNumFrames = function (t) {
              if (null == t)
                return this._frames
                  ? this._frames.length
                  : this._numFrames || 0;
              var e = this._data[t];
              return null == e ? 0 : e.frames.length;
            }),
              (e.getAnimation = function (t) {
                return this._data[t];
              }),
              (e.getFrame = function (t) {
                var e;
                return this._frames && (e = this._frames[t]) ? e : null;
              }),
              (e.getFrameBounds = function (t, e) {
                var i = this.getFrame(t);
                return i
                  ? (e || new createjs.Rectangle()).setValues(
                      -i.regX,
                      -i.regY,
                      i.rect.width,
                      i.rect.height
                    )
                  : null;
              }),
              (e.toString = function () {
                return "[SpriteSheet]";
              }),
              (e.clone = function () {
                throw "SpriteSheet cannot be cloned.";
              }),
              (e._parseData = function (t) {
                var e, i, n, s;
                if (null != t) {
                  if (
                    ((this.framerate = t.framerate || 0),
                    t.images && (i = t.images.length) > 0)
                  )
                    for (s = this._images = [], e = 0; i > e; e++) {
                      var r = t.images[e];
                      if ("string" == typeof r) {
                        var o = r;
                        (r = document.createElement("img")), (r.src = o);
                      }
                      s.push(r),
                        r.getContext ||
                          r.complete ||
                          (this._loadCount++,
                          (this.complete = !1),
                          (function (t) {
                            r.onload = function () {
                              t._handleImageLoad();
                            };
                          })(this));
                    }
                  if (null == t.frames);
                  else if (t.frames instanceof Array)
                    for (
                      this._frames = [], s = t.frames, e = 0, i = s.length;
                      i > e;
                      e++
                    ) {
                      var a = s[e];
                      this._frames.push({
                        image: this._images[a[4] ? a[4] : 0],
                        rect: new createjs.Rectangle(a[0], a[1], a[2], a[3]),
                        regX: a[5] || 0,
                        regY: a[6] || 0,
                      });
                    }
                  else
                    (n = t.frames),
                      (this._frameWidth = n.width),
                      (this._frameHeight = n.height),
                      (this._regX = n.regX || 0),
                      (this._regY = n.regY || 0),
                      (this._spacing = n.spacing || 0),
                      (this._margin = n.margin || 0),
                      (this._numFrames = n.count),
                      0 == this._loadCount && this._calculateFrames();
                  if (((this._animations = []), null != (n = t.animations))) {
                    this._data = {};
                    var h;
                    for (h in n) {
                      var c = { name: h },
                        l = n[h];
                      if ("number" == typeof l) s = c.frames = [l];
                      else if (l instanceof Array)
                        if (1 == l.length) c.frames = [l[0]];
                        else
                          for (
                            c.speed = l[3],
                              c.next = l[2],
                              s = c.frames = [],
                              e = l[0];
                            e <= l[1];
                            e++
                          )
                            s.push(e);
                      else {
                        (c.speed = l.speed), (c.next = l.next);
                        var u = l.frames;
                        s = c.frames = "number" == typeof u ? [u] : u.slice(0);
                      }
                      (c.next === !0 || void 0 === c.next) && (c.next = h),
                        (c.next === !1 || (s.length < 2 && c.next == h)) &&
                          (c.next = null),
                        c.speed || (c.speed = 1),
                        this._animations.push(h),
                        (this._data[h] = c);
                    }
                  }
                }
              }),
              (e._handleImageLoad = function () {
                0 == --this._loadCount &&
                  (this._calculateFrames(),
                  (this.complete = !0),
                  this.dispatchEvent("complete"));
              }),
              (e._calculateFrames = function () {
                if (!this._frames && 0 != this._frameWidth) {
                  this._frames = [];
                  var t = this._numFrames || 1e5,
                    e = 0,
                    i = this._frameWidth,
                    n = this._frameHeight,
                    s = this._spacing,
                    r = this._margin;
                  t: for (var o = 0, a = this._images; o < a.length; o++)
                    for (
                      var h = a[o], c = h.width, l = h.height, u = r;
                      l - r - n >= u;

                    ) {
                      for (var p = r; c - r - i >= p; ) {
                        if (e >= t) break t;
                        e++,
                          this._frames.push({
                            image: h,
                            rect: new createjs.Rectangle(p, u, i, n),
                            regX: this._regX,
                            regY: this._regY,
                          }),
                          (p += i + s);
                      }
                      u += n + s;
                    }
                  this._numFrames = e;
                }
              }),
              (createjs.SpriteSheet = createjs.promote(t, "EventDispatcher"));
          })(),
          (this.createjs = this.createjs || {}),
          (function () {
            "use strict";
            function t() {
              (this.command = null),
                (this._stroke = null),
                (this._strokeStyle = null),
                (this._oldStrokeStyle = null),
                (this._strokeDash = null),
                (this._oldStrokeDash = null),
                (this._strokeIgnoreScale = !1),
                (this._fill = null),
                (this._instructions = []),
                (this._commitIndex = 0),
                (this._activeInstructions = []),
                (this._dirty = !1),
                (this._storeIndex = 0),
                this.clear();
            }
            var e = t.prototype,
              i = t;
            (t.getRGB = function (t, e, i, n) {
              return (
                null != t &&
                  null == i &&
                  ((n = e),
                  (i = 255 & t),
                  (e = (t >> 8) & 255),
                  (t = (t >> 16) & 255)),
                null == n
                  ? "rgb(" + t + "," + e + "," + i + ")"
                  : "rgba(" + t + "," + e + "," + i + "," + n + ")"
              );
            }),
              (t.getHSL = function (t, e, i, n) {
                return null == n
                  ? "hsl(" + (t % 360) + "," + e + "%," + i + "%)"
                  : "hsla(" + (t % 360) + "," + e + "%," + i + "%," + n + ")";
              }),
              (t.BASE_64 = {
                A: 0,
                B: 1,
                C: 2,
                D: 3,
                E: 4,
                F: 5,
                G: 6,
                H: 7,
                I: 8,
                J: 9,
                K: 10,
                L: 11,
                M: 12,
                N: 13,
                O: 14,
                P: 15,
                Q: 16,
                R: 17,
                S: 18,
                T: 19,
                U: 20,
                V: 21,
                W: 22,
                X: 23,
                Y: 24,
                Z: 25,
                a: 26,
                b: 27,
                c: 28,
                d: 29,
                e: 30,
                f: 31,
                g: 32,
                h: 33,
                i: 34,
                j: 35,
                k: 36,
                l: 37,
                m: 38,
                n: 39,
                o: 40,
                p: 41,
                q: 42,
                r: 43,
                s: 44,
                t: 45,
                u: 46,
                v: 47,
                w: 48,
                x: 49,
                y: 50,
                z: 51,
                0: 52,
                1: 53,
                2: 54,
                3: 55,
                4: 56,
                5: 57,
                6: 58,
                7: 59,
                8: 60,
                9: 61,
                "+": 62,
                "/": 63,
              }),
              (t.STROKE_CAPS_MAP = ["butt", "round", "square"]),
              (t.STROKE_JOINTS_MAP = ["miter", "round", "bevel"]);
            var n = createjs.createCanvas
              ? createjs.createCanvas()
              : document.createElement("canvas");
            n.getContext &&
              ((t._ctx = n.getContext("2d")), (n.width = n.height = 1)),
              (e.getInstructions = function () {
                return this._updateInstructions(), this._instructions;
              });
            try {
              Object.defineProperties(e, {
                instructions: { get: e.getInstructions },
              });
            } catch (s) {}
            (e.isEmpty = function () {
              return !(
                this._instructions.length || this._activeInstructions.length
              );
            }),
              (e.draw = function (t, e) {
                this._updateInstructions();
                for (
                  var i = this._instructions,
                    n = this._storeIndex,
                    s = i.length;
                  s > n;
                  n++
                )
                  i[n].exec(t, e);
              }),
              (e.drawAsPath = function (t) {
                this._updateInstructions();
                for (
                  var e,
                    i = this._instructions,
                    n = this._storeIndex,
                    s = i.length;
                  s > n;
                  n++
                )
                  (e = i[n]).path !== !1 && e.exec(t);
              }),
              (e.moveTo = function (t, e) {
                return this.append(new i.MoveTo(t, e), !0);
              }),
              (e.lineTo = function (t, e) {
                return this.append(new i.LineTo(t, e));
              }),
              (e.arcTo = function (t, e, n, s, r) {
                return this.append(new i.ArcTo(t, e, n, s, r));
              }),
              (e.arc = function (t, e, n, s, r, o) {
                return this.append(new i.Arc(t, e, n, s, r, o));
              }),
              (e.quadraticCurveTo = function (t, e, n, s) {
                return this.append(new i.QuadraticCurveTo(t, e, n, s));
              }),
              (e.bezierCurveTo = function (t, e, n, s, r, o) {
                return this.append(new i.BezierCurveTo(t, e, n, s, r, o));
              }),
              (e.rect = function (t, e, n, s) {
                return this.append(new i.Rect(t, e, n, s));
              }),
              (e.closePath = function () {
                return this._activeInstructions.length
                  ? this.append(new i.ClosePath())
                  : this;
              }),
              (e.clear = function () {
                return (
                  (this._instructions.length =
                    this._activeInstructions.length =
                    this._commitIndex =
                      0),
                  (this._strokeStyle =
                    this._stroke =
                    this._fill =
                    this._strokeDash =
                      null),
                  (this._dirty = this._strokeIgnoreScale = !1),
                  this
                );
              }),
              (e.beginFill = function (t) {
                return this._setFill(t ? new i.Fill(t) : null);
              }),
              (e.beginLinearGradientFill = function (t, e, n, s, r, o) {
                return this._setFill(
                  new i.Fill().linearGradient(t, e, n, s, r, o)
                );
              }),
              (e.beginRadialGradientFill = function (t, e, n, s, r, o, a, h) {
                return this._setFill(
                  new i.Fill().radialGradient(t, e, n, s, r, o, a, h)
                );
              }),
              (e.beginBitmapFill = function (t, e, n) {
                return this._setFill(new i.Fill(null, n).bitmap(t, e));
              }),
              (e.endFill = function () {
                return this.beginFill();
              }),
              (e.setStrokeStyle = function (t, e, n, s, r) {
                return (
                  this._updateInstructions(!0),
                  (this._strokeStyle = this.command =
                    new i.StrokeStyle(t, e, n, s, r)),
                  this._stroke && (this._stroke.ignoreScale = r),
                  (this._strokeIgnoreScale = r),
                  this
                );
              }),
              (e.setStrokeDash = function (t, e) {
                return (
                  this._updateInstructions(!0),
                  (this._strokeDash = this.command = new i.StrokeDash(t, e)),
                  this
                );
              }),
              (e.beginStroke = function (t) {
                return this._setStroke(t ? new i.Stroke(t) : null);
              }),
              (e.beginLinearGradientStroke = function (t, e, n, s, r, o) {
                return this._setStroke(
                  new i.Stroke().linearGradient(t, e, n, s, r, o)
                );
              }),
              (e.beginRadialGradientStroke = function (t, e, n, s, r, o, a, h) {
                return this._setStroke(
                  new i.Stroke().radialGradient(t, e, n, s, r, o, a, h)
                );
              }),
              (e.beginBitmapStroke = function (t, e) {
                return this._setStroke(new i.Stroke().bitmap(t, e));
              }),
              (e.endStroke = function () {
                return this.beginStroke();
              }),
              (e.curveTo = e.quadraticCurveTo),
              (e.drawRect = e.rect),
              (e.drawRoundRect = function (t, e, i, n, s) {
                return this.drawRoundRectComplex(t, e, i, n, s, s, s, s);
              }),
              (e.drawRoundRectComplex = function (t, e, n, s, r, o, a, h) {
                return this.append(new i.RoundRect(t, e, n, s, r, o, a, h));
              }),
              (e.drawCircle = function (t, e, n) {
                return this.append(new i.Circle(t, e, n));
              }),
              (e.drawEllipse = function (t, e, n, s) {
                return this.append(new i.Ellipse(t, e, n, s));
              }),
              (e.drawPolyStar = function (t, e, n, s, r, o) {
                return this.append(new i.PolyStar(t, e, n, s, r, o));
              }),
              (e.append = function (t, e) {
                return (
                  this._activeInstructions.push(t),
                  (this.command = t),
                  e || (this._dirty = !0),
                  this
                );
              }),
              (e.decodePath = function (e) {
                for (
                  var i = [
                      this.moveTo,
                      this.lineTo,
                      this.quadraticCurveTo,
                      this.bezierCurveTo,
                      this.closePath,
                    ],
                    n = [2, 2, 4, 6, 0],
                    s = 0,
                    r = e.length,
                    o = [],
                    a = 0,
                    h = 0,
                    c = t.BASE_64;
                  r > s;

                ) {
                  var l = e.charAt(s),
                    u = c[l],
                    p = u >> 3,
                    d = i[p];
                  if (!d || 3 & u) throw "bad path data (@" + s + "): " + l;
                  var f = n[p];
                  p || (a = h = 0), (o.length = 0), s++;
                  for (var g = ((u >> 2) & 1) + 2, v = 0; f > v; v++) {
                    var m = c[e.charAt(s)],
                      y = m >> 5 ? -1 : 1;
                    (m = ((31 & m) << 6) | c[e.charAt(s + 1)]),
                      3 == g && (m = (m << 6) | c[e.charAt(s + 2)]),
                      (m = (y * m) / 10),
                      v % 2 ? (a = m += a) : (h = m += h),
                      (o[v] = m),
                      (s += g);
                  }
                  d.apply(this, o);
                }
                return this;
              }),
              (e.store = function () {
                return (
                  this._updateInstructions(!0),
                  (this._storeIndex = this._instructions.length),
                  this
                );
              }),
              (e.unstore = function () {
                return (this._storeIndex = 0), this;
              }),
              (e.clone = function () {
                var e = new t();
                return (
                  (e.command = this.command),
                  (e._stroke = this._stroke),
                  (e._strokeStyle = this._strokeStyle),
                  (e._strokeDash = this._strokeDash),
                  (e._strokeIgnoreScale = this._strokeIgnoreScale),
                  (e._fill = this._fill),
                  (e._instructions = this._instructions.slice()),
                  (e._commitIndex = this._commitIndex),
                  (e._activeInstructions = this._activeInstructions.slice()),
                  (e._dirty = this._dirty),
                  (e._storeIndex = this._storeIndex),
                  e
                );
              }),
              (e.toString = function () {
                return "[Graphics]";
              }),
              (e.mt = e.moveTo),
              (e.lt = e.lineTo),
              (e.at = e.arcTo),
              (e.bt = e.bezierCurveTo),
              (e.qt = e.quadraticCurveTo),
              (e.a = e.arc),
              (e.r = e.rect),
              (e.cp = e.closePath),
              (e.c = e.clear),
              (e.f = e.beginFill),
              (e.lf = e.beginLinearGradientFill),
              (e.rf = e.beginRadialGradientFill),
              (e.bf = e.beginBitmapFill),
              (e.ef = e.endFill),
              (e.ss = e.setStrokeStyle),
              (e.sd = e.setStrokeDash),
              (e.s = e.beginStroke),
              (e.ls = e.beginLinearGradientStroke),
              (e.rs = e.beginRadialGradientStroke),
              (e.bs = e.beginBitmapStroke),
              (e.es = e.endStroke),
              (e.dr = e.drawRect),
              (e.rr = e.drawRoundRect),
              (e.rc = e.drawRoundRectComplex),
              (e.dc = e.drawCircle),
              (e.de = e.drawEllipse),
              (e.dp = e.drawPolyStar),
              (e.p = e.decodePath),
              (e._updateInstructions = function (e) {
                var i = this._instructions,
                  n = this._activeInstructions,
                  s = this._commitIndex;
                if (this._dirty && n.length) {
                  (i.length = s), i.push(t.beginCmd);
                  var r = n.length,
                    o = i.length;
                  i.length = o + r;
                  for (var a = 0; r > a; a++) i[a + o] = n[a];
                  this._fill && i.push(this._fill),
                    this._stroke &&
                      (this._strokeDash !== this._oldStrokeDash &&
                        ((this._oldStrokeDash = this._strokeDash),
                        i.push(this._strokeDash)),
                      this._strokeStyle !== this._oldStrokeStyle &&
                        ((this._oldStrokeStyle = this._strokeStyle),
                        i.push(this._strokeStyle)),
                      i.push(this._stroke)),
                    (this._dirty = !1);
                }
                e && ((n.length = 0), (this._commitIndex = i.length));
              }),
              (e._setFill = function (t) {
                return (
                  this._updateInstructions(!0),
                  (this.command = this._fill = t),
                  this
                );
              }),
              (e._setStroke = function (t) {
                return (
                  this._updateInstructions(!0),
                  (this.command = this._stroke = t) &&
                    (t.ignoreScale = this._strokeIgnoreScale),
                  this
                );
              }),
              ((i.LineTo = function (t, e) {
                (this.x = t), (this.y = e);
              }).prototype.exec = function (t) {
                t.lineTo(this.x, this.y);
              }),
              ((i.MoveTo = function (t, e) {
                (this.x = t), (this.y = e);
              }).prototype.exec = function (t) {
                t.moveTo(this.x, this.y);
              }),
              ((i.ArcTo = function (t, e, i, n, s) {
                (this.x1 = t),
                  (this.y1 = e),
                  (this.x2 = i),
                  (this.y2 = n),
                  (this.radius = s);
              }).prototype.exec = function (t) {
                t.arcTo(this.x1, this.y1, this.x2, this.y2, this.radius);
              }),
              ((i.Arc = function (t, e, i, n, s, r) {
                (this.x = t),
                  (this.y = e),
                  (this.radius = i),
                  (this.startAngle = n),
                  (this.endAngle = s),
                  (this.anticlockwise = !!r);
              }).prototype.exec = function (t) {
                t.arc(
                  this.x,
                  this.y,
                  this.radius,
                  this.startAngle,
                  this.endAngle,
                  this.anticlockwise
                );
              }),
              ((i.QuadraticCurveTo = function (t, e, i, n) {
                (this.cpx = t), (this.cpy = e), (this.x = i), (this.y = n);
              }).prototype.exec = function (t) {
                t.quadraticCurveTo(this.cpx, this.cpy, this.x, this.y);
              }),
              ((i.BezierCurveTo = function (t, e, i, n, s, r) {
                (this.cp1x = t),
                  (this.cp1y = e),
                  (this.cp2x = i),
                  (this.cp2y = n),
                  (this.x = s),
                  (this.y = r);
              }).prototype.exec = function (t) {
                t.bezierCurveTo(
                  this.cp1x,
                  this.cp1y,
                  this.cp2x,
                  this.cp2y,
                  this.x,
                  this.y
                );
              }),
              ((i.Rect = function (t, e, i, n) {
                (this.x = t), (this.y = e), (this.w = i), (this.h = n);
              }).prototype.exec = function (t) {
                t.rect(this.x, this.y, this.w, this.h);
              }),
              ((i.ClosePath = function () {}).prototype.exec = function (t) {
                t.closePath();
              }),
              ((i.BeginPath = function () {}).prototype.exec = function (t) {
                t.beginPath();
              }),
              (e = (i.Fill = function (t, e) {
                (this.style = t), (this.matrix = e);
              }).prototype),
              (e.exec = function (t) {
                if (this.style) {
                  t.fillStyle = this.style;
                  var e = this.matrix;
                  e && (t.save(), t.transform(e.a, e.b, e.c, e.d, e.tx, e.ty)),
                    t.fill(),
                    e && t.restore();
                }
              }),
              (e.linearGradient = function (e, i, n, s, r, o) {
                for (
                  var a = (this.style = t._ctx.createLinearGradient(
                      n,
                      s,
                      r,
                      o
                    )),
                    h = 0,
                    c = e.length;
                  c > h;
                  h++
                )
                  a.addColorStop(i[h], e[h]);
                return (
                  (a.props = {
                    colors: e,
                    ratios: i,
                    x0: n,
                    y0: s,
                    x1: r,
                    y1: o,
                    type: "linear",
                  }),
                  this
                );
              }),
              (e.radialGradient = function (e, i, n, s, r, o, a, h) {
                for (
                  var c = (this.style = t._ctx.createRadialGradient(
                      n,
                      s,
                      r,
                      o,
                      a,
                      h
                    )),
                    l = 0,
                    u = e.length;
                  u > l;
                  l++
                )
                  c.addColorStop(i[l], e[l]);
                return (
                  (c.props = {
                    colors: e,
                    ratios: i,
                    x0: n,
                    y0: s,
                    r0: r,
                    x1: o,
                    y1: a,
                    r1: h,
                    type: "radial",
                  }),
                  this
                );
              }),
              (e.bitmap = function (e, i) {
                var n = (this.style = t._ctx.createPattern(e, i || ""));
                return (
                  (n.props = { image: e, repetition: i, type: "bitmap" }), this
                );
              }),
              (e.path = !1),
              (e = (i.Stroke = function (t, e) {
                (this.style = t), (this.ignoreScale = e);
              }).prototype),
              (e.exec = function (t) {
                this.style &&
                  ((t.strokeStyle = this.style),
                  this.ignoreScale &&
                    (t.save(), t.setTransform(1, 0, 0, 1, 0, 0)),
                  t.stroke(),
                  this.ignoreScale && t.restore());
              }),
              (e.linearGradient = i.Fill.prototype.linearGradient),
              (e.radialGradient = i.Fill.prototype.radialGradient),
              (e.bitmap = i.Fill.prototype.bitmap),
              (e.path = !1),
              (e = (i.StrokeStyle = function (t, e, i, n) {
                (this.width = t),
                  (this.caps = e),
                  (this.joints = i),
                  (this.miterLimit = n);
              }).prototype),
              (e.exec = function (e) {
                (e.lineWidth = null == this.width ? "1" : this.width),
                  (e.lineCap =
                    null == this.caps
                      ? "butt"
                      : isNaN(this.caps)
                      ? this.caps
                      : t.STROKE_CAPS_MAP[this.caps]),
                  (e.lineJoin =
                    null == this.joints
                      ? "miter"
                      : isNaN(this.joints)
                      ? this.joints
                      : t.STROKE_JOINTS_MAP[this.joints]),
                  (e.miterLimit =
                    null == this.miterLimit ? "10" : this.miterLimit);
              }),
              (e.path = !1),
              ((i.StrokeDash = function (t, e) {
                (this.segments = t), (this.offset = e || 0);
              }).prototype.exec = function (t) {
                t.setLineDash &&
                  (t.setLineDash(this.segments || i.StrokeDash.EMPTY_SEGMENTS),
                  (t.lineDashOffset = this.offset || 0));
              }),
              (i.StrokeDash.EMPTY_SEGMENTS = []),
              ((i.RoundRect = function (t, e, i, n, s, r, o, a) {
                (this.x = t),
                  (this.y = e),
                  (this.w = i),
                  (this.h = n),
                  (this.radiusTL = s),
                  (this.radiusTR = r),
                  (this.radiusBR = o),
                  (this.radiusBL = a);
              }).prototype.exec = function (t) {
                var e = (c > h ? h : c) / 2,
                  i = 0,
                  n = 0,
                  s = 0,
                  r = 0,
                  o = this.x,
                  a = this.y,
                  h = this.w,
                  c = this.h,
                  l = this.radiusTL,
                  u = this.radiusTR,
                  p = this.radiusBR,
                  d = this.radiusBL;
                0 > l && (l *= i = -1),
                  l > e && (l = e),
                  0 > u && (u *= n = -1),
                  u > e && (u = e),
                  0 > p && (p *= s = -1),
                  p > e && (p = e),
                  0 > d && (d *= r = -1),
                  d > e && (d = e),
                  t.moveTo(o + h - u, a),
                  t.arcTo(o + h + u * n, a - u * n, o + h, a + u, u),
                  t.lineTo(o + h, a + c - p),
                  t.arcTo(o + h + p * s, a + c + p * s, o + h - p, a + c, p),
                  t.lineTo(o + d, a + c),
                  t.arcTo(o - d * r, a + c + d * r, o, a + c - d, d),
                  t.lineTo(o, a + l),
                  t.arcTo(o - l * i, a - l * i, o + l, a, l),
                  t.closePath();
              }),
              ((i.Circle = function (t, e, i) {
                (this.x = t), (this.y = e), (this.radius = i);
              }).prototype.exec = function (t) {
                t.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
              }),
              ((i.Ellipse = function (t, e, i, n) {
                (this.x = t), (this.y = e), (this.w = i), (this.h = n);
              }).prototype.exec = function (t) {
                var e = this.x,
                  i = this.y,
                  n = this.w,
                  s = this.h,
                  r = 0.5522848,
                  o = (n / 2) * r,
                  a = (s / 2) * r,
                  h = e + n,
                  c = i + s,
                  l = e + n / 2,
                  u = i + s / 2;
                t.moveTo(e, u),
                  t.bezierCurveTo(e, u - a, l - o, i, l, i),
                  t.bezierCurveTo(l + o, i, h, u - a, h, u),
                  t.bezierCurveTo(h, u + a, l + o, c, l, c),
                  t.bezierCurveTo(l - o, c, e, u + a, e, u);
              }),
              ((i.PolyStar = function (t, e, i, n, s, r) {
                (this.x = t),
                  (this.y = e),
                  (this.radius = i),
                  (this.sides = n),
                  (this.pointSize = s),
                  (this.angle = r);
              }).prototype.exec = function (t) {
                var e = this.x,
                  i = this.y,
                  n = this.radius,
                  s = ((this.angle || 0) / 180) * Math.PI,
                  r = this.sides,
                  o = 1 - (this.pointSize || 0),
                  a = Math.PI / r;
                t.moveTo(e + Math.cos(s) * n, i + Math.sin(s) * n);
                for (var h = 0; r > h; h++)
                  (s += a),
                    1 != o &&
                      t.lineTo(
                        e + Math.cos(s) * n * o,
                        i + Math.sin(s) * n * o
                      ),
                    (s += a),
                    t.lineTo(e + Math.cos(s) * n, i + Math.sin(s) * n);
                t.closePath();
              }),
              (t.beginCmd = new i.BeginPath()),
              (createjs.Graphics = t);
          })(),
          (this.createjs = this.createjs || {}),
          (function () {
            "use strict";
            function t() {
              this.EventDispatcher_constructor(),
                (this.alpha = 1),
                (this.cacheCanvas = null),
                (this.cacheID = 0),
                (this.id = createjs.UID.get()),
                (this.mouseEnabled = !0),
                (this.tickEnabled = !0),
                (this.name = null),
                (this.parent = null),
                (this.regX = 0),
                (this.regY = 0),
                (this.rotation = 0),
                (this.scaleX = 1),
                (this.scaleY = 1),
                (this.skewX = 0),
                (this.skewY = 0),
                (this.shadow = null),
                (this.visible = !0),
                (this.x = 0),
                (this.y = 0),
                (this.transformMatrix = null),
                (this.compositeOperation = null),
                (this.snapToPixel = !0),
                (this.filters = null),
                (this.mask = null),
                (this.hitArea = null),
                (this.cursor = null),
                (this._cacheOffsetX = 0),
                (this._cacheOffsetY = 0),
                (this._filterOffsetX = 0),
                (this._filterOffsetY = 0),
                (this._cacheScale = 1),
                (this._cacheDataURLID = 0),
                (this._cacheDataURL = null),
                (this._props = new createjs.DisplayProps()),
                (this._rectangle = new createjs.Rectangle()),
                (this._bounds = null);
            }
            var e = createjs.extend(t, createjs.EventDispatcher);
            (t._MOUSE_EVENTS = [
              "click",
              "dblclick",
              "mousedown",
              "mouseout",
              "mouseover",
              "pressmove",
              "pressup",
              "rollout",
              "rollover",
            ]),
              (t.suppressCrossDomainErrors = !1),
              (t._snapToPixelEnabled = !1);
            var i = createjs.createCanvas
              ? createjs.createCanvas()
              : document.createElement("canvas");
            i.getContext &&
              ((t._hitTestCanvas = i),
              (t._hitTestContext = i.getContext("2d")),
              (i.width = i.height = 1)),
              (t._nextCacheID = 1),
              (e.getStage = function () {
                for (var t = this, e = createjs.Stage; t.parent; ) t = t.parent;
                return t instanceof e ? t : null;
              });
            try {
              Object.defineProperties(e, { stage: { get: e.getStage } });
            } catch (n) {}
            (e.isVisible = function () {
              return !!(
                this.visible &&
                this.alpha > 0 &&
                0 != this.scaleX &&
                0 != this.scaleY
              );
            }),
              (e.draw = function (t, e) {
                var i = this.cacheCanvas;
                if (e || !i) return !1;
                var n = this._cacheScale;
                return (
                  t.drawImage(
                    i,
                    this._cacheOffsetX + this._filterOffsetX,
                    this._cacheOffsetY + this._filterOffsetY,
                    i.width / n,
                    i.height / n
                  ),
                  !0
                );
              }),
              (e.updateContext = function (e) {
                var i = this,
                  n = i.mask,
                  s = i._props.matrix;
                n &&
                  n.graphics &&
                  !n.graphics.isEmpty() &&
                  (n.getMatrix(s),
                  e.transform(s.a, s.b, s.c, s.d, s.tx, s.ty),
                  n.graphics.drawAsPath(e),
                  e.clip(),
                  s.invert(),
                  e.transform(s.a, s.b, s.c, s.d, s.tx, s.ty)),
                  this.getMatrix(s);
                var r = s.tx,
                  o = s.ty;
                t._snapToPixelEnabled &&
                  i.snapToPixel &&
                  ((r = (r + (0 > r ? -0.5 : 0.5)) | 0),
                  (o = (o + (0 > o ? -0.5 : 0.5)) | 0)),
                  e.transform(s.a, s.b, s.c, s.d, r, o),
                  (e.globalAlpha *= i.alpha),
                  i.compositeOperation &&
                    (e.globalCompositeOperation = i.compositeOperation),
                  i.shadow && this._applyShadow(e, i.shadow);
              }),
              (e.cache = function (t, e, i, n, s) {
                (s = s || 1),
                  this.cacheCanvas ||
                    (this.cacheCanvas = createjs.createCanvas
                      ? createjs.createCanvas()
                      : document.createElement("canvas")),
                  (this._cacheWidth = i),
                  (this._cacheHeight = n),
                  (this._cacheOffsetX = t),
                  (this._cacheOffsetY = e),
                  (this._cacheScale = s),
                  this.updateCache();
              }),
              (e.updateCache = function (e) {
                var i = this.cacheCanvas;
                if (!i) throw "cache() must be called before updateCache()";
                var n = this._cacheScale,
                  s = this._cacheOffsetX * n,
                  r = this._cacheOffsetY * n,
                  o = this._cacheWidth,
                  a = this._cacheHeight,
                  h = i.getContext("2d"),
                  c = this._getFilterBounds();
                (s += this._filterOffsetX = c.x),
                  (r += this._filterOffsetY = c.y),
                  (o = Math.ceil(o * n) + c.width),
                  (a = Math.ceil(a * n) + c.height),
                  o != i.width || a != i.height
                    ? ((i.width = o), (i.height = a))
                    : e || h.clearRect(0, 0, o + 1, a + 1),
                  h.save(),
                  (h.globalCompositeOperation = e),
                  h.setTransform(n, 0, 0, n, -s, -r),
                  this.draw(h, !0),
                  this._applyFilters(),
                  h.restore(),
                  (this.cacheID = t._nextCacheID++);
              }),
              (e.uncache = function () {
                (this._cacheDataURL = this.cacheCanvas = null),
                  (this.cacheID =
                    this._cacheOffsetX =
                    this._cacheOffsetY =
                    this._filterOffsetX =
                    this._filterOffsetY =
                      0),
                  (this._cacheScale = 1);
              }),
              (e.getCacheDataURL = function () {
                return this.cacheCanvas
                  ? (this.cacheID != this._cacheDataURLID &&
                      (this._cacheDataURL = this.cacheCanvas.toDataURL()),
                    this._cacheDataURL)
                  : null;
              }),
              (e.localToGlobal = function (t, e, i) {
                return this.getConcatenatedMatrix(
                  this._props.matrix
                ).transformPoint(t, e, i || new createjs.Point());
              }),
              (e.globalToLocal = function (t, e, i) {
                return this.getConcatenatedMatrix(this._props.matrix)
                  .invert()
                  .transformPoint(t, e, i || new createjs.Point());
              }),
              (e.localToLocal = function (t, e, i, n) {
                return (
                  (n = this.localToGlobal(t, e, n)),
                  i.globalToLocal(n.x, n.y, n)
                );
              }),
              (e.setTransform = function (t, e, i, n, s, r, o, a, h) {
                return (
                  (this.x = t || 0),
                  (this.y = e || 0),
                  (this.scaleX = null == i ? 1 : i),
                  (this.scaleY = null == n ? 1 : n),
                  (this.rotation = s || 0),
                  (this.skewX = r || 0),
                  (this.skewY = o || 0),
                  (this.regX = a || 0),
                  (this.regY = h || 0),
                  this
                );
              }),
              (e.getMatrix = function (t) {
                var e = this,
                  i = (t && t.identity()) || new createjs.Matrix2D();
                return e.transformMatrix
                  ? i.copy(e.transformMatrix)
                  : i.appendTransform(
                      e.x,
                      e.y,
                      e.scaleX,
                      e.scaleY,
                      e.rotation,
                      e.skewX,
                      e.skewY,
                      e.regX,
                      e.regY
                    );
              }),
              (e.getConcatenatedMatrix = function (t) {
                for (var e = this, i = this.getMatrix(t); (e = e.parent); )
                  i.prependMatrix(e.getMatrix(e._props.matrix));
                return i;
              }),
              (e.getConcatenatedDisplayProps = function (t) {
                t = t ? t.identity() : new createjs.DisplayProps();
                var e = this,
                  i = e.getMatrix(t.matrix);
                do
                  t.prepend(e.visible, e.alpha, e.shadow, e.compositeOperation),
                    e != this && i.prependMatrix(e.getMatrix(e._props.matrix));
                while ((e = e.parent));
                return t;
              }),
              (e.hitTest = function (e, i) {
                var n = t._hitTestContext;
                n.setTransform(1, 0, 0, 1, -e, -i), this.draw(n);
                var s = this._testHit(n);
                return (
                  n.setTransform(1, 0, 0, 1, 0, 0), n.clearRect(0, 0, 2, 2), s
                );
              }),
              (e.set = function (t) {
                for (var e in t) this[e] = t[e];
                return this;
              }),
              (e.getBounds = function () {
                if (this._bounds) return this._rectangle.copy(this._bounds);
                var t = this.cacheCanvas;
                if (t) {
                  var e = this._cacheScale;
                  return this._rectangle.setValues(
                    this._cacheOffsetX,
                    this._cacheOffsetY,
                    t.width / e,
                    t.height / e
                  );
                }
                return null;
              }),
              (e.getTransformedBounds = function () {
                return this._getBounds();
              }),
              (e.setBounds = function (t, e, i, n) {
                null == t && (this._bounds = t),
                  (this._bounds = (
                    this._bounds || new createjs.Rectangle()
                  ).setValues(t, e, i, n));
              }),
              (e.clone = function () {
                return this._cloneProps(new t());
              }),
              (e.toString = function () {
                return "[DisplayObject (name=" + this.name + ")]";
              }),
              (e._cloneProps = function (t) {
                return (
                  (t.alpha = this.alpha),
                  (t.mouseEnabled = this.mouseEnabled),
                  (t.tickEnabled = this.tickEnabled),
                  (t.name = this.name),
                  (t.regX = this.regX),
                  (t.regY = this.regY),
                  (t.rotation = this.rotation),
                  (t.scaleX = this.scaleX),
                  (t.scaleY = this.scaleY),
                  (t.shadow = this.shadow),
                  (t.skewX = this.skewX),
                  (t.skewY = this.skewY),
                  (t.visible = this.visible),
                  (t.x = this.x),
                  (t.y = this.y),
                  (t.compositeOperation = this.compositeOperation),
                  (t.snapToPixel = this.snapToPixel),
                  (t.filters =
                    null == this.filters ? null : this.filters.slice(0)),
                  (t.mask = this.mask),
                  (t.hitArea = this.hitArea),
                  (t.cursor = this.cursor),
                  (t._bounds = this._bounds),
                  t
                );
              }),
              (e._applyShadow = function (t, e) {
                (e = e || Shadow.identity),
                  (t.shadowColor = e.color),
                  (t.shadowOffsetX = e.offsetX),
                  (t.shadowOffsetY = e.offsetY),
                  (t.shadowBlur = e.blur);
              }),
              (e._tick = function (t) {
                var e = this._listeners;
                e &&
                  e.tick &&
                  ((t.target = null),
                  (t.propagationStopped = t.immediatePropagationStopped = !1),
                  this.dispatchEvent(t));
              }),
              (e._testHit = function (e) {
                try {
                  var i = e.getImageData(0, 0, 1, 1).data[3] > 1;
                } catch (n) {
                  if (!t.suppressCrossDomainErrors)
                    throw "An error has occurred. This is most likely due to security restrictions on reading canvas pixel data with local or cross-domain images.";
                }
                return i;
              }),
              (e._applyFilters = function () {
                if (
                  this.filters &&
                  0 != this.filters.length &&
                  this.cacheCanvas
                )
                  for (
                    var t = this.filters.length,
                      e = this.cacheCanvas.getContext("2d"),
                      i = this.cacheCanvas.width,
                      n = this.cacheCanvas.height,
                      s = 0;
                    t > s;
                    s++
                  )
                    this.filters[s].applyFilter(e, 0, 0, i, n);
              }),
              (e._getFilterBounds = function () {
                var t,
                  e = this.filters,
                  i = this._rectangle.setValues(0, 0, 0, 0);
                if (!e || !(t = e.length)) return i;
                for (var n = 0; t > n; n++) {
                  var s = this.filters[n];
                  s.getBounds && s.getBounds(i);
                }
                return i;
              }),
              (e._getBounds = function (t, e) {
                return this._transformBounds(this.getBounds(), t, e);
              }),
              (e._transformBounds = function (t, e, i) {
                if (!t) return t;
                var n = t.x,
                  s = t.y,
                  r = t.width,
                  o = t.height,
                  a = this._props.matrix;
                (a = i ? a.identity() : this.getMatrix(a)),
                  (n || s) && a.appendTransform(0, 0, 1, 1, 0, 0, 0, -n, -s),
                  e && a.prependMatrix(e);
                var h = r * a.a,
                  c = r * a.b,
                  l = o * a.c,
                  u = o * a.d,
                  p = a.tx,
                  d = a.ty,
                  f = p,
                  g = p,
                  v = d,
                  m = d;
                return (
                  (n = h + p) < f ? (f = n) : n > g && (g = n),
                  (n = h + l + p) < f ? (f = n) : n > g && (g = n),
                  (n = l + p) < f ? (f = n) : n > g && (g = n),
                  (s = c + d) < v ? (v = s) : s > m && (m = s),
                  (s = c + u + d) < v ? (v = s) : s > m && (m = s),
                  (s = u + d) < v ? (v = s) : s > m && (m = s),
                  t.setValues(f, v, g - f, m - v)
                );
              }),
              (e._hasMouseEventListener = function () {
                for (var e = t._MOUSE_EVENTS, i = 0, n = e.length; n > i; i++)
                  if (this.hasEventListener(e[i])) return !0;
                return !!this.cursor;
              }),
              (createjs.DisplayObject = createjs.promote(t, "EventDispatcher"));
          })(),
          (this.createjs = this.createjs || {}),
          (function () {
            "use strict";
            function t() {
              this.DisplayObject_constructor(),
                (this.children = []),
                (this.mouseChildren = !0),
                (this.tickChildren = !0);
            }
            var e = createjs.extend(t, createjs.DisplayObject);
            e.getNumChildren = function () {
              return this.children.length;
            };
            try {
              Object.defineProperties(e, {
                numChildren: { get: e.getNumChildren },
              });
            } catch (i) {}
            (e.initialize = t),
              (e.isVisible = function () {
                var t = this.cacheCanvas || this.children.length;
                return !!(
                  this.visible &&
                  this.alpha > 0 &&
                  0 != this.scaleX &&
                  0 != this.scaleY &&
                  t
                );
              }),
              (e.draw = function (t, e) {
                if (this.DisplayObject_draw(t, e)) return !0;
                for (
                  var i = this.children.slice(), n = 0, s = i.length;
                  s > n;
                  n++
                ) {
                  var r = i[n];
                  r.isVisible() &&
                    (t.save(), r.updateContext(t), r.draw(t), t.restore());
                }
                return !0;
              }),
              (e.addChild = function (t) {
                if (null == t) return t;
                var e = arguments.length;
                if (e > 1) {
                  for (var i = 0; e > i; i++) this.addChild(arguments[i]);
                  return arguments[e - 1];
                }
                return (
                  t.parent && t.parent.removeChild(t),
                  (t.parent = this),
                  this.children.push(t),
                  t.dispatchEvent("added"),
                  t
                );
              }),
              (e.addChildAt = function (t, e) {
                var i = arguments.length,
                  n = arguments[i - 1];
                if (0 > n || n > this.children.length) return arguments[i - 2];
                if (i > 2) {
                  for (var s = 0; i - 1 > s; s++)
                    this.addChildAt(arguments[s], n + s);
                  return arguments[i - 2];
                }
                return (
                  t.parent && t.parent.removeChild(t),
                  (t.parent = this),
                  this.children.splice(e, 0, t),
                  t.dispatchEvent("added"),
                  t
                );
              }),
              (e.removeChild = function (t) {
                var e = arguments.length;
                if (e > 1) {
                  for (var i = !0, n = 0; e > n; n++)
                    i = i && this.removeChild(arguments[n]);
                  return i;
                }
                return this.removeChildAt(createjs.indexOf(this.children, t));
              }),
              (e.removeChildAt = function (t) {
                var e = arguments.length;
                if (e > 1) {
                  for (var i = [], n = 0; e > n; n++) i[n] = arguments[n];
                  i.sort(function (t, e) {
                    return e - t;
                  });
                  for (var s = !0, n = 0; e > n; n++)
                    s = s && this.removeChildAt(i[n]);
                  return s;
                }
                if (0 > t || t > this.children.length - 1) return !1;
                var r = this.children[t];
                return (
                  r && (r.parent = null),
                  this.children.splice(t, 1),
                  r.dispatchEvent("removed"),
                  !0
                );
              }),
              (e.removeAllChildren = function () {
                for (var t = this.children; t.length; ) this.removeChildAt(0);
              }),
              (e.getChildAt = function (t) {
                return this.children[t];
              }),
              (e.getChildByName = function (t) {
                for (var e = this.children, i = 0, n = e.length; n > i; i++)
                  if (e[i].name == t) return e[i];
                return null;
              }),
              (e.sortChildren = function (t) {
                this.children.sort(t);
              }),
              (e.getChildIndex = function (t) {
                return createjs.indexOf(this.children, t);
              }),
              (e.swapChildrenAt = function (t, e) {
                var i = this.children,
                  n = i[t],
                  s = i[e];
                n && s && ((i[t] = s), (i[e] = n));
              }),
              (e.swapChildren = function (t, e) {
                for (
                  var i, n, s = this.children, r = 0, o = s.length;
                  o > r &&
                  (s[r] == t && (i = r),
                  s[r] == e && (n = r),
                  null == i || null == n);
                  r++
                );
                r != o && ((s[i] = e), (s[n] = t));
              }),
              (e.setChildIndex = function (t, e) {
                var i = this.children,
                  n = i.length;
                if (!(t.parent != this || 0 > e || e >= n)) {
                  for (var s = 0; n > s && i[s] != t; s++);
                  s != n && s != e && (i.splice(s, 1), i.splice(e, 0, t));
                }
              }),
              (e.contains = function (t) {
                for (; t; ) {
                  if (t == this) return !0;
                  t = t.parent;
                }
                return !1;
              }),
              (e.hitTest = function (t, e) {
                return null != this.getObjectUnderPoint(t, e);
              }),
              (e.getObjectsUnderPoint = function (t, e, i) {
                var n = [],
                  s = this.localToGlobal(t, e);
                return (
                  this._getObjectsUnderPoint(s.x, s.y, n, i > 0, 1 == i), n
                );
              }),
              (e.getObjectUnderPoint = function (t, e, i) {
                var n = this.localToGlobal(t, e);
                return this._getObjectsUnderPoint(
                  n.x,
                  n.y,
                  null,
                  i > 0,
                  1 == i
                );
              }),
              (e.getBounds = function () {
                return this._getBounds(null, !0);
              }),
              (e.getTransformedBounds = function () {
                return this._getBounds();
              }),
              (e.clone = function (e) {
                var i = this._cloneProps(new t());
                return e && this._cloneChildren(i), i;
              }),
              (e.toString = function () {
                return "[Container (name=" + this.name + ")]";
              }),
              (e._tick = function (t) {
                if (this.tickChildren)
                  for (var e = this.children.length - 1; e >= 0; e--) {
                    var i = this.children[e];
                    i.tickEnabled && i._tick && i._tick(t);
                  }
                this.DisplayObject__tick(t);
              }),
              (e._cloneChildren = function (t) {
                t.children.length && t.removeAllChildren();
                for (
                  var e = t.children, i = 0, n = this.children.length;
                  n > i;
                  i++
                ) {
                  var s = this.children[i].clone(!0);
                  (s.parent = t), e.push(s);
                }
              }),
              (e._getObjectsUnderPoint = function (e, i, n, s, r, o) {
                if (((o = o || 0), !o && !this._testMask(this, e, i)))
                  return null;
                var a,
                  h = createjs.DisplayObject._hitTestContext;
                r = r || (s && this._hasMouseEventListener());
                for (
                  var c = this.children, l = c.length, u = l - 1;
                  u >= 0;
                  u--
                ) {
                  var p = c[u],
                    d = p.hitArea;
                  if (
                    p.visible &&
                    (d || p.isVisible()) &&
                    (!s || p.mouseEnabled) &&
                    (d || this._testMask(p, e, i))
                  )
                    if (!d && p instanceof t) {
                      var f = p._getObjectsUnderPoint(e, i, n, s, r, o + 1);
                      if (!n && f) return s && !this.mouseChildren ? this : f;
                    } else {
                      if (s && !r && !p._hasMouseEventListener()) continue;
                      var g = p.getConcatenatedDisplayProps(p._props);
                      if (
                        ((a = g.matrix),
                        d &&
                          (a.appendMatrix(d.getMatrix(d._props.matrix)),
                          (g.alpha = d.alpha)),
                        (h.globalAlpha = g.alpha),
                        h.setTransform(a.a, a.b, a.c, a.d, a.tx - e, a.ty - i),
                        (d || p).draw(h),
                        !this._testHit(h))
                      )
                        continue;
                      if (
                        (h.setTransform(1, 0, 0, 1, 0, 0),
                        h.clearRect(0, 0, 2, 2),
                        !n)
                      )
                        return s && !this.mouseChildren ? this : p;
                      n.push(p);
                    }
                }
                return null;
              }),
              (e._testMask = function (t, e, i) {
                var n = t.mask;
                if (!n || !n.graphics || n.graphics.isEmpty()) return !0;
                var s = this._props.matrix,
                  r = t.parent;
                (s = r ? r.getConcatenatedMatrix(s) : s.identity()),
                  (s = n.getMatrix(n._props.matrix).prependMatrix(s));
                var o = createjs.DisplayObject._hitTestContext;
                return (
                  o.setTransform(s.a, s.b, s.c, s.d, s.tx - e, s.ty - i),
                  n.graphics.drawAsPath(o),
                  (o.fillStyle = "#000"),
                  o.fill(),
                  this._testHit(o)
                    ? (o.setTransform(1, 0, 0, 1, 0, 0),
                      o.clearRect(0, 0, 2, 2),
                      !0)
                    : !1
                );
              }),
              (e._getBounds = function (t, e) {
                var i = this.DisplayObject_getBounds();
                if (i) return this._transformBounds(i, t, e);
                var n = this._props.matrix;
                (n = e ? n.identity() : this.getMatrix(n)),
                  t && n.prependMatrix(t);
                for (
                  var s = this.children.length, r = null, o = 0;
                  s > o;
                  o++
                ) {
                  var a = this.children[o];
                  a.visible &&
                    (i = a._getBounds(n)) &&
                    (r
                      ? r.extend(i.x, i.y, i.width, i.height)
                      : (r = i.clone()));
                }
                return r;
              }),
              (createjs.Container = createjs.promote(t, "DisplayObject"));
          })(),
          (this.createjs = this.createjs || {}),
          (function () {
            "use strict";
            function t(t) {
              this.Container_constructor(),
                (this.autoClear = !0),
                (this.canvas =
                  "string" == typeof t ? document.getElementById(t) : t),
                (this.mouseX = 0),
                (this.mouseY = 0),
                (this.drawRect = null),
                (this.snapToPixelEnabled = !1),
                (this.mouseInBounds = !1),
                (this.tickOnUpdate = !0),
                (this.mouseMoveOutside = !1),
                (this.preventSelection = !0),
                (this._pointerData = {}),
                (this._pointerCount = 0),
                (this._primaryPointerID = null),
                (this._mouseOverIntervalID = null),
                (this._nextStage = null),
                (this._prevStage = null),
                this.enableDOMEvents(!0);
            }
            var e = createjs.extend(t, createjs.Container);
            (e._get_nextStage = function () {
              return this._nextStage;
            }),
              (e._set_nextStage = function (t) {
                this._nextStage && (this._nextStage._prevStage = null),
                  t && (t._prevStage = this),
                  (this._nextStage = t);
              });
            try {
              Object.defineProperties(e, {
                nextStage: { get: e._get_nextStage, set: e._set_nextStage },
              });
            } catch (i) {}
            (e.update = function (t) {
              if (
                this.canvas &&
                (this.tickOnUpdate && this.tick(t),
                !this.dispatchEvent("drawstart"))
              ) {
                createjs.DisplayObject._snapToPixelEnabled =
                  this.snapToPixelEnabled;
                var e = this.drawRect,
                  i = this.canvas.getContext("2d");
                i.setTransform(1, 0, 0, 1, 0, 0),
                  this.autoClear &&
                    (e
                      ? i.clearRect(e.x, e.y, e.width, e.height)
                      : i.clearRect(
                          0,
                          0,
                          this.canvas.width + 1,
                          this.canvas.height + 1
                        )),
                  i.save(),
                  this.drawRect &&
                    (i.beginPath(),
                    i.rect(e.x, e.y, e.width, e.height),
                    i.clip()),
                  this.updateContext(i),
                  this.draw(i, !1),
                  i.restore(),
                  this.dispatchEvent("drawend");
              }
            }),
              (e.tick = function (t) {
                if (this.tickEnabled && !this.dispatchEvent("tickstart")) {
                  var e = new createjs.Event("tick");
                  if (t) for (var i in t) t.hasOwnProperty(i) && (e[i] = t[i]);
                  this._tick(e), this.dispatchEvent("tickend");
                }
              }),
              (e.handleEvent = function (t) {
                "tick" == t.type && this.update(t);
              }),
              (e.clear = function () {
                if (this.canvas) {
                  var t = this.canvas.getContext("2d");
                  t.setTransform(1, 0, 0, 1, 0, 0),
                    t.clearRect(
                      0,
                      0,
                      this.canvas.width + 1,
                      this.canvas.height + 1
                    );
                }
              }),
              (e.toDataURL = function (t, e) {
                var i,
                  n = this.canvas.getContext("2d"),
                  s = this.canvas.width,
                  r = this.canvas.height;
                if (t) {
                  i = n.getImageData(0, 0, s, r);
                  var o = n.globalCompositeOperation;
                  (n.globalCompositeOperation = "destination-over"),
                    (n.fillStyle = t),
                    n.fillRect(0, 0, s, r);
                }
                var a = this.canvas.toDataURL(e || "image/png");
                return (
                  t &&
                    (n.putImageData(i, 0, 0), (n.globalCompositeOperation = o)),
                  a
                );
              }),
              (e.enableMouseOver = function (t) {
                if (
                  (this._mouseOverIntervalID &&
                    (clearInterval(this._mouseOverIntervalID),
                    (this._mouseOverIntervalID = null),
                    0 == t && this._testMouseOver(!0)),
                  null == t)
                )
                  t = 20;
                else if (0 >= t) return;
                var e = this;
                this._mouseOverIntervalID = setInterval(function () {
                  e._testMouseOver();
                }, 1e3 / Math.min(50, t));
              }),
              (e.enableDOMEvents = function (t) {
                null == t && (t = !0);
                var e,
                  i,
                  n = this._eventListeners;
                if (!t && n) {
                  for (e in n) (i = n[e]), i.t.removeEventListener(e, i.f, !1);
                  this._eventListeners = null;
                } else if (t && !n && this.canvas) {
                  var s = window.addEventListener ? window : document,
                    r = this;
                  (n = this._eventListeners = {}),
                    (n.mouseup = {
                      t: s,
                      f: function (t) {
                        r._handleMouseUp(t);
                      },
                    }),
                    (n.mousemove = {
                      t: s,
                      f: function (t) {
                        r._handleMouseMove(t);
                      },
                    }),
                    (n.dblclick = {
                      t: this.canvas,
                      f: function (t) {
                        r._handleDoubleClick(t);
                      },
                    }),
                    (n.mousedown = {
                      t: this.canvas,
                      f: function (t) {
                        r._handleMouseDown(t);
                      },
                    });
                  for (e in n) (i = n[e]), i.t.addEventListener(e, i.f, !1);
                }
              }),
              (e.clone = function () {
                throw "Stage cannot be cloned.";
              }),
              (e.toString = function () {
                return "[Stage (name=" + this.name + ")]";
              }),
              (e._getElementRect = function (t) {
                var e;
                try {
                  e = t.getBoundingClientRect();
                } catch (i) {
                  e = {
                    top: t.offsetTop,
                    left: t.offsetLeft,
                    width: t.offsetWidth,
                    height: t.offsetHeight,
                  };
                }
                var n =
                    (window.pageXOffset || document.scrollLeft || 0) -
                    (document.clientLeft || document.body.clientLeft || 0),
                  s =
                    (window.pageYOffset || document.scrollTop || 0) -
                    (document.clientTop || document.body.clientTop || 0),
                  r = window.getComputedStyle
                    ? getComputedStyle(t, null)
                    : t.currentStyle,
                  o = parseInt(r.paddingLeft) + parseInt(r.borderLeftWidth),
                  a = parseInt(r.paddingTop) + parseInt(r.borderTopWidth),
                  h = parseInt(r.paddingRight) + parseInt(r.borderRightWidth),
                  c = parseInt(r.paddingBottom) + parseInt(r.borderBottomWidth);
                return {
                  left: e.left + n + o,
                  right: e.right + n - h,
                  top: e.top + s + a,
                  bottom: e.bottom + s - c,
                };
              }),
              (e._getPointerData = function (t) {
                var e = this._pointerData[t];
                return e || (e = this._pointerData[t] = { x: 0, y: 0 }), e;
              }),
              (e._handleMouseMove = function (t) {
                t || (t = window.event),
                  this._handlePointerMove(-1, t, t.pageX, t.pageY);
              }),
              (e._handlePointerMove = function (t, e, i, n, s) {
                if ((!this._prevStage || void 0 !== s) && this.canvas) {
                  var r = this._nextStage,
                    o = this._getPointerData(t),
                    a = o.inBounds;
                  this._updatePointerPosition(t, e, i, n),
                    (a || o.inBounds || this.mouseMoveOutside) &&
                      (-1 === t &&
                        o.inBounds == !a &&
                        this._dispatchMouseEvent(
                          this,
                          a ? "mouseleave" : "mouseenter",
                          !1,
                          t,
                          o,
                          e
                        ),
                      this._dispatchMouseEvent(
                        this,
                        "stagemousemove",
                        !1,
                        t,
                        o,
                        e
                      ),
                      this._dispatchMouseEvent(
                        o.target,
                        "pressmove",
                        !0,
                        t,
                        o,
                        e
                      )),
                    r && r._handlePointerMove(t, e, i, n, null);
                }
              }),
              (e._updatePointerPosition = function (t, e, i, n) {
                var s = this._getElementRect(this.canvas);
                (i -= s.left), (n -= s.top);
                var r = this.canvas.width,
                  o = this.canvas.height;
                (i /= (s.right - s.left) / r), (n /= (s.bottom - s.top) / o);
                var a = this._getPointerData(t);
                (a.inBounds = i >= 0 && n >= 0 && r - 1 >= i && o - 1 >= n)
                  ? ((a.x = i), (a.y = n))
                  : this.mouseMoveOutside &&
                    ((a.x = 0 > i ? 0 : i > r - 1 ? r - 1 : i),
                    (a.y = 0 > n ? 0 : n > o - 1 ? o - 1 : n)),
                  (a.posEvtObj = e),
                  (a.rawX = i),
                  (a.rawY = n),
                  (t === this._primaryPointerID || -1 === t) &&
                    ((this.mouseX = a.x),
                    (this.mouseY = a.y),
                    (this.mouseInBounds = a.inBounds));
              }),
              (e._handleMouseUp = function (t) {
                this._handlePointerUp(-1, t, !1);
              }),
              (e._handlePointerUp = function (t, e, i, n) {
                var s = this._nextStage,
                  r = this._getPointerData(t);
                if (!this._prevStage || void 0 !== n) {
                  r.down &&
                    this._dispatchMouseEvent(this, "stagemouseup", !1, t, r, e),
                    (r.down = !1);
                  var o = null,
                    a = r.target;
                  n ||
                    (!a && !s) ||
                    (o = this._getObjectsUnderPoint(r.x, r.y, null, !0)),
                    o == a && this._dispatchMouseEvent(a, "click", !0, t, r, e),
                    this._dispatchMouseEvent(a, "pressup", !0, t, r, e),
                    i
                      ? (t == this._primaryPointerID &&
                          (this._primaryPointerID = null),
                        delete this._pointerData[t])
                      : (r.target = null),
                    s && s._handlePointerUp(t, e, i, n || (o && this));
                }
              }),
              (e._handleMouseDown = function (t) {
                this._handlePointerDown(-1, t, t.pageX, t.pageY);
              }),
              (e._handlePointerDown = function (t, e, i, n, s) {
                this.preventSelection && e.preventDefault(),
                  (null == this._primaryPointerID || -1 === t) &&
                    (this._primaryPointerID = t),
                  null != n && this._updatePointerPosition(t, e, i, n);
                var r = null,
                  o = this._nextStage,
                  a = this._getPointerData(t);
                a.inBounds &&
                  (this._dispatchMouseEvent(
                    this,
                    "stagemousedown",
                    !1,
                    t,
                    a,
                    e
                  ),
                  (a.down = !0)),
                  s ||
                    ((r = a.target =
                      this._getObjectsUnderPoint(a.x, a.y, null, !0)),
                    this._dispatchMouseEvent(
                      a.target,
                      "mousedown",
                      !0,
                      t,
                      a,
                      e
                    )),
                  o && o._handlePointerDown(t, e, i, n, s || (r && this));
              }),
              (e._testMouseOver = function (t, e, i) {
                if (!this._prevStage || void 0 !== e) {
                  var n = this._nextStage;
                  if (!this._mouseOverIntervalID)
                    return void (n && n._testMouseOver(t, e, i));
                  var s = this._getPointerData(-1);
                  if (
                    s &&
                    (t ||
                      this.mouseX != this._mouseOverX ||
                      this.mouseY != this._mouseOverY ||
                      !this.mouseInBounds)
                  ) {
                    var r,
                      o,
                      a,
                      h = s.posEvtObj,
                      c = i || (h && h.target == this.canvas),
                      l = null,
                      u = -1,
                      p = "";
                    !e &&
                      (t || (this.mouseInBounds && c)) &&
                      ((l = this._getObjectsUnderPoint(
                        this.mouseX,
                        this.mouseY,
                        null,
                        !0
                      )),
                      (this._mouseOverX = this.mouseX),
                      (this._mouseOverY = this.mouseY));
                    var d = this._mouseOverTarget || [],
                      f = d[d.length - 1],
                      g = (this._mouseOverTarget = []);
                    for (r = l; r; )
                      g.unshift(r),
                        null != r.cursor && (p = r.cursor),
                        (r = r.parent);
                    for (
                      this.canvas.style.cursor = p,
                        !e && i && (i.canvas.style.cursor = p),
                        o = 0,
                        a = g.length;
                      a > o && g[o] == d[o];
                      o++
                    )
                      u = o;
                    for (
                      f != l &&
                        this._dispatchMouseEvent(f, "mouseout", !0, -1, s, h),
                        o = d.length - 1;
                      o > u;
                      o--
                    )
                      this._dispatchMouseEvent(d[o], "rollout", !1, -1, s, h);
                    for (o = g.length - 1; o > u; o--)
                      this._dispatchMouseEvent(g[o], "rollover", !1, -1, s, h);
                    f != l &&
                      this._dispatchMouseEvent(l, "mouseover", !0, -1, s, h),
                      n &&
                        n._testMouseOver(t, e || (l && this), i || (c && this));
                  }
                }
              }),
              (e._handleDoubleClick = function (t, e) {
                var i = null,
                  n = this._nextStage,
                  s = this._getPointerData(-1);
                e ||
                  ((i = this._getObjectsUnderPoint(s.x, s.y, null, !0)),
                  this._dispatchMouseEvent(i, "dblclick", !0, -1, s, t)),
                  n && n._handleDoubleClick(t, e || (i && this));
              }),
              (e._dispatchMouseEvent = function (t, e, i, n, s, r) {
                if (t && (i || t.hasEventListener(e))) {
                  var o = new createjs.MouseEvent(
                    e,
                    i,
                    !1,
                    s.x,
                    s.y,
                    r,
                    n,
                    n === this._primaryPointerID || -1 === n,
                    s.rawX,
                    s.rawY
                  );
                  t.dispatchEvent(o);
                }
              }),
              (createjs.Stage = createjs.promote(t, "Container"));
          })(),
          (this.createjs = this.createjs || {}),
          (function () {
            function t(t) {
              this.DisplayObject_constructor(),
                "string" == typeof t
                  ? ((this.image = document.createElement("img")),
                    (this.image.src = t))
                  : (this.image = t),
                (this.sourceRect = null);
            }
            var e = createjs.extend(t, createjs.DisplayObject);
            (e.initialize = t),
              (e.isVisible = function () {
                var t =
                  this.cacheCanvas ||
                  (this.image &&
                    (this.image.complete ||
                      this.image.getContext ||
                      this.image.readyState >= 2));
                return !!(
                  this.visible &&
                  this.alpha > 0 &&
                  0 != this.scaleX &&
                  0 != this.scaleY &&
                  t
                );
              }),
              (e.draw = function (t, e) {
                if (this.DisplayObject_draw(t, e) || !this.image) return !0;
                var i = this.image,
                  n = this.sourceRect;
                if (n) {
                  var s = n.x,
                    r = n.y,
                    o = s + n.width,
                    a = r + n.height,
                    h = 0,
                    c = 0,
                    l = i.width,
                    u = i.height;
                  0 > s && ((h -= s), (s = 0)),
                    o > l && (o = l),
                    0 > r && ((c -= r), (r = 0)),
                    a > u && (a = u),
                    t.drawImage(i, s, r, o - s, a - r, h, c, o - s, a - r);
                } else t.drawImage(i, 0, 0);
                return !0;
              }),
              (e.getBounds = function () {
                var t = this.DisplayObject_getBounds();
                if (t) return t;
                var e = this.sourceRect || this.image,
                  i =
                    this.image &&
                    (this.image.complete ||
                      this.image.getContext ||
                      this.image.readyState >= 2);
                return i
                  ? this._rectangle.setValues(0, 0, e.width, e.height)
                  : null;
              }),
              (e.clone = function () {
                var e = new t(this.image);
                return (
                  this.sourceRect && (e.sourceRect = this.sourceRect.clone()),
                  this._cloneProps(e),
                  e
                );
              }),
              (e.toString = function () {
                return "[Bitmap (name=" + this.name + ")]";
              }),
              (createjs.Bitmap = createjs.promote(t, "DisplayObject"));
          })(),
          (this.createjs = this.createjs || {}),
          (function () {
            "use strict";
            function t(t, e) {
              this.DisplayObject_constructor(),
                (this.currentFrame = 0),
                (this.currentAnimation = null),
                (this.paused = !0),
                (this.spriteSheet = t),
                (this.currentAnimationFrame = 0),
                (this.framerate = 0),
                (this._animation = null),
                (this._currentFrame = null),
                (this._skipAdvance = !1),
                e && this.gotoAndPlay(e);
            }
            var e = createjs.extend(t, createjs.DisplayObject);
            (e.isVisible = function () {
              var t = this.cacheCanvas || this.spriteSheet.complete;
              return !!(
                this.visible &&
                this.alpha > 0 &&
                0 != this.scaleX &&
                0 != this.scaleY &&
                t
              );
            }),
              (e.draw = function (t, e) {
                if (this.DisplayObject_draw(t, e)) return !0;
                this._normalizeFrame();
                var i = this.spriteSheet.getFrame(0 | this._currentFrame);
                if (!i) return !1;
                var n = i.rect;
                return (
                  n.width &&
                    n.height &&
                    t.drawImage(
                      i.image,
                      n.x,
                      n.y,
                      n.width,
                      n.height,
                      -i.regX,
                      -i.regY,
                      n.width,
                      n.height
                    ),
                  !0
                );
              }),
              (e.play = function () {
                this.paused = !1;
              }),
              (e.stop = function () {
                this.paused = !0;
              }),
              (e.gotoAndPlay = function (t) {
                (this.paused = !1), (this._skipAdvance = !0), this._goto(t);
              }),
              (e.gotoAndStop = function (t) {
                (this.paused = !0), this._goto(t);
              }),
              (e.advance = function (t) {
                var e = this.framerate || this.spriteSheet.framerate,
                  i = e && null != t ? t / (1e3 / e) : 1;
                this._normalizeFrame(i);
              }),
              (e.getBounds = function () {
                return (
                  this.DisplayObject_getBounds() ||
                  this.spriteSheet.getFrameBounds(
                    this.currentFrame,
                    this._rectangle
                  )
                );
              }),
              (e.clone = function () {
                return this._cloneProps(new t(this.spriteSheet));
              }),
              (e.toString = function () {
                return "[Sprite (name=" + this.name + ")]";
              }),
              (e._cloneProps = function (t) {
                return (
                  this.DisplayObject__cloneProps(t),
                  (t.currentFrame = this.currentFrame),
                  (t.currentAnimation = this.currentAnimation),
                  (t.paused = this.paused),
                  (t.currentAnimationFrame = this.currentAnimationFrame),
                  (t.framerate = this.framerate),
                  (t._animation = this._animation),
                  (t._currentFrame = this._currentFrame),
                  (t._skipAdvance = this._skipAdvance),
                  t
                );
              }),
              (e._tick = function (t) {
                this.paused ||
                  (this._skipAdvance || this.advance(t && t.delta),
                  (this._skipAdvance = !1)),
                  this.DisplayObject__tick(t);
              }),
              (e._normalizeFrame = function (t) {
                t = t || 0;
                var e,
                  i = this._animation,
                  n = this.paused,
                  s = this._currentFrame;
                if (i) {
                  var r = i.speed || 1,
                    o = this.currentAnimationFrame;
                  if (((e = i.frames.length), o + t * r >= e)) {
                    var a = i.next;
                    if (this._dispatchAnimationEnd(i, s, n, a, e - 1)) return;
                    if (a) return this._goto(a, t - (e - o) / r);
                    (this.paused = !0), (o = i.frames.length - 1);
                  } else o += t * r;
                  (this.currentAnimationFrame = o),
                    (this._currentFrame = i.frames[0 | o]);
                } else if (
                  ((s = this._currentFrame += t),
                  (e = this.spriteSheet.getNumFrames()),
                  s >= e &&
                    e > 0 &&
                    !this._dispatchAnimationEnd(i, s, n, e - 1) &&
                    (this._currentFrame -= e) >= e)
                )
                  return this._normalizeFrame();
                (s = 0 | this._currentFrame),
                  this.currentFrame != s &&
                    ((this.currentFrame = s), this.dispatchEvent("change"));
              }),
              (e._dispatchAnimationEnd = function (t, e, i, n, s) {
                var r = t ? t.name : null;
                if (this.hasEventListener("animationend")) {
                  var o = new createjs.Event("animationend");
                  (o.name = r), (o.next = n), this.dispatchEvent(o);
                }
                var a = this._animation != t || this._currentFrame != e;
                return (
                  a ||
                    i ||
                    !this.paused ||
                    ((this.currentAnimationFrame = s), (a = !0)),
                  a
                );
              }),
              (e._goto = function (t, e) {
                if (((this.currentAnimationFrame = 0), isNaN(t))) {
                  var i = this.spriteSheet.getAnimation(t);
                  i &&
                    ((this._animation = i),
                    (this.currentAnimation = t),
                    this._normalizeFrame(e));
                } else
                  (this.currentAnimation = this._animation = null),
                    (this._currentFrame = t),
                    this._normalizeFrame();
              }),
              (createjs.Sprite = createjs.promote(t, "DisplayObject"));
          })(),
          (this.createjs = this.createjs || {}),
          (function () {
            "use strict";
            function t(t) {
              this.DisplayObject_constructor(),
                (this.graphics = t ? t : new createjs.Graphics());
            }
            var e = createjs.extend(t, createjs.DisplayObject);
            (e.isVisible = function () {
              var t =
                this.cacheCanvas || (this.graphics && !this.graphics.isEmpty());
              return !!(
                this.visible &&
                this.alpha > 0 &&
                0 != this.scaleX &&
                0 != this.scaleY &&
                t
              );
            }),
              (e.draw = function (t, e) {
                return this.DisplayObject_draw(t, e)
                  ? !0
                  : (this.graphics.draw(t, this), !0);
              }),
              (e.clone = function (e) {
                var i =
                  e && this.graphics ? this.graphics.clone() : this.graphics;
                return this._cloneProps(new t(i));
              }),
              (e.toString = function () {
                return "[Shape (name=" + this.name + ")]";
              }),
              (createjs.Shape = createjs.promote(t, "DisplayObject"));
          })(),
          (this.createjs = this.createjs || {}),
          (function () {
            "use strict";
            function t(t, e, i) {
              this.DisplayObject_constructor(),
                (this.text = t),
                (this.font = e),
                (this.color = i),
                (this.textAlign = "left"),
                (this.textBaseline = "top"),
                (this.maxWidth = null),
                (this.outline = 0),
                (this.lineHeight = 0),
                (this.lineWidth = null);
            }
            var e = createjs.extend(t, createjs.DisplayObject),
              i = createjs.createCanvas
                ? createjs.createCanvas()
                : document.createElement("canvas");
            i.getContext &&
              ((t._workingContext = i.getContext("2d")),
              (i.width = i.height = 1)),
              (t.H_OFFSETS = {
                start: 0,
                left: 0,
                center: -0.5,
                end: -1,
                right: -1,
              }),
              (t.V_OFFSETS = {
                top: 0,
                hanging: -0.01,
                middle: -0.4,
                alphabetic: -0.8,
                ideographic: -0.85,
                bottom: -1,
              }),
              (e.isVisible = function () {
                var t =
                  this.cacheCanvas || (null != this.text && "" !== this.text);
                return !!(
                  this.visible &&
                  this.alpha > 0 &&
                  0 != this.scaleX &&
                  0 != this.scaleY &&
                  t
                );
              }),
              (e.draw = function (t, e) {
                if (this.DisplayObject_draw(t, e)) return !0;
                var i = this.color || "#000";
                return (
                  this.outline
                    ? ((t.strokeStyle = i), (t.lineWidth = 1 * this.outline))
                    : (t.fillStyle = i),
                  this._drawText(this._prepContext(t)),
                  !0
                );
              }),
              (e.getMeasuredWidth = function () {
                return this._getMeasuredWidth(this.text);
              }),
              (e.getMeasuredLineHeight = function () {
                return 1.2 * this._getMeasuredWidth("M");
              }),
              (e.getMeasuredHeight = function () {
                return this._drawText(null, {}).height;
              }),
              (e.getBounds = function () {
                var e = this.DisplayObject_getBounds();
                if (e) return e;
                if (null == this.text || "" == this.text) return null;
                var i = this._drawText(null, {}),
                  n =
                    this.maxWidth && this.maxWidth < i.width
                      ? this.maxWidth
                      : i.width,
                  s = n * t.H_OFFSETS[this.textAlign || "left"],
                  r = this.lineHeight || this.getMeasuredLineHeight(),
                  o = r * t.V_OFFSETS[this.textBaseline || "top"];
                return this._rectangle.setValues(s, o, n, i.height);
              }),
              (e.getMetrics = function () {
                var e = { lines: [] };
                return (
                  (e.lineHeight =
                    this.lineHeight || this.getMeasuredLineHeight()),
                  (e.vOffset =
                    e.lineHeight * t.V_OFFSETS[this.textBaseline || "top"]),
                  this._drawText(null, e, e.lines)
                );
              }),
              (e.clone = function () {
                return this._cloneProps(
                  new t(this.text, this.font, this.color)
                );
              }),
              (e.toString = function () {
                return (
                  "[Text (text=" +
                  (this.text.length > 20
                    ? this.text.substr(0, 17) + "..."
                    : this.text) +
                  ")]"
                );
              }),
              (e._cloneProps = function (t) {
                return (
                  this.DisplayObject__cloneProps(t),
                  (t.textAlign = this.textAlign),
                  (t.textBaseline = this.textBaseline),
                  (t.maxWidth = this.maxWidth),
                  (t.outline = this.outline),
                  (t.lineHeight = this.lineHeight),
                  (t.lineWidth = this.lineWidth),
                  t
                );
              }),
              (e._prepContext = function (t) {
                return (
                  (t.font = this.font || "10px sans-serif"),
                  (t.textAlign = this.textAlign || "left"),
                  (t.textBaseline = this.textBaseline || "top"),
                  t
                );
              }),
              (e._drawText = function (e, i, n) {
                var s = !!e;
                s || ((e = t._workingContext), e.save(), this._prepContext(e));
                for (
                  var r = this.lineHeight || this.getMeasuredLineHeight(),
                    o = 0,
                    a = 0,
                    h = String(this.text).split(/(?:\r\n|\r|\n)/),
                    c = 0,
                    l = h.length;
                  l > c;
                  c++
                ) {
                  var u = h[c],
                    p = null;
                  if (
                    null != this.lineWidth &&
                    (p = e.measureText(u).width) > this.lineWidth
                  ) {
                    var d = u.split(/(\s)/);
                    (u = d[0]), (p = e.measureText(u).width);
                    for (var f = 1, g = d.length; g > f; f += 2) {
                      var v = e.measureText(d[f] + d[f + 1]).width;
                      p + v > this.lineWidth
                        ? (s && this._drawTextLine(e, u, a * r),
                          n && n.push(u),
                          p > o && (o = p),
                          (u = d[f + 1]),
                          (p = e.measureText(u).width),
                          a++)
                        : ((u += d[f] + d[f + 1]), (p += v));
                    }
                  }
                  s && this._drawTextLine(e, u, a * r),
                    n && n.push(u),
                    i && null == p && (p = e.measureText(u).width),
                    p > o && (o = p),
                    a++;
                }
                return (
                  i && ((i.width = o), (i.height = a * r)), s || e.restore(), i
                );
              }),
              (e._drawTextLine = function (t, e, i) {
                this.outline
                  ? t.strokeText(e, 0, i, this.maxWidth || 65535)
                  : t.fillText(e, 0, i, this.maxWidth || 65535);
              }),
              (e._getMeasuredWidth = function (e) {
                var i = t._workingContext;
                i.save();
                var n = this._prepContext(i).measureText(e).width;
                return i.restore(), n;
              }),
              (createjs.Text = createjs.promote(t, "DisplayObject"));
          })(),
          (this.createjs = this.createjs || {}),
          (function () {
            "use strict";
            function t(t, e) {
              this.Container_constructor(),
                (this.text = t || ""),
                (this.spriteSheet = e),
                (this.lineHeight = 0),
                (this.letterSpacing = 0),
                (this.spaceWidth = 0),
                (this._oldProps = {
                  text: 0,
                  spriteSheet: 0,
                  lineHeight: 0,
                  letterSpacing: 0,
                  spaceWidth: 0,
                });
            }
            var e = createjs.extend(t, createjs.Container);
            (t.maxPoolSize = 100),
              (t._spritePool = []),
              (e.draw = function (t, e) {
                this.DisplayObject_draw(t, e) ||
                  (this._updateText(), this.Container_draw(t, e));
              }),
              (e.getBounds = function () {
                return this._updateText(), this.Container_getBounds();
              }),
              (e.isVisible = function () {
                var t =
                  this.cacheCanvas ||
                  (this.spriteSheet && this.spriteSheet.complete && this.text);
                return !!(
                  this.visible &&
                  this.alpha > 0 &&
                  0 !== this.scaleX &&
                  0 !== this.scaleY &&
                  t
                );
              }),
              (e.clone = function () {
                return this._cloneProps(new t(this.text, this.spriteSheet));
              }),
              (e.addChild =
                e.addChildAt =
                e.removeChild =
                e.removeChildAt =
                e.removeAllChildren =
                  function () {}),
              (e._cloneProps = function (t) {
                return (
                  this.DisplayObject__cloneProps(t),
                  (t.lineHeight = this.lineHeight),
                  (t.letterSpacing = this.letterSpacing),
                  (t.spaceWidth = this.spaceWidth),
                  t
                );
              }),
              (e._getFrameIndex = function (t, e) {
                var i,
                  n = e.getAnimation(t);
                return (
                  n ||
                    (t != (i = t.toUpperCase()) ||
                      t != (i = t.toLowerCase()) ||
                      (i = null),
                    i && (n = e.getAnimation(i))),
                  n && n.frames[0]
                );
              }),
              (e._getFrame = function (t, e) {
                var i = this._getFrameIndex(t, e);
                return null == i ? i : e.getFrame(i);
              }),
              (e._getLineHeight = function (t) {
                var e =
                  this._getFrame("1", t) ||
                  this._getFrame("T", t) ||
                  this._getFrame("L", t) ||
                  t.getFrame(0);
                return e ? e.rect.height : 1;
              }),
              (e._getSpaceWidth = function (t) {
                var e =
                  this._getFrame("1", t) ||
                  this._getFrame("l", t) ||
                  this._getFrame("e", t) ||
                  this._getFrame("a", t) ||
                  t.getFrame(0);
                return e ? e.rect.width : 1;
              }),
              (e._updateText = function () {
                var e,
                  i = 0,
                  n = 0,
                  s = this._oldProps,
                  r = !1,
                  o = this.spaceWidth,
                  a = this.lineHeight,
                  h = this.spriteSheet,
                  c = t._spritePool,
                  l = this.children,
                  u = 0,
                  p = l.length;
                for (var d in s)
                  s[d] != this[d] && ((s[d] = this[d]), (r = !0));
                if (r) {
                  var f = !!this._getFrame(" ", h);
                  f || o || (o = this._getSpaceWidth(h)),
                    a || (a = this._getLineHeight(h));
                  for (var g = 0, v = this.text.length; v > g; g++) {
                    var m = this.text.charAt(g);
                    if (" " != m || f)
                      if ("\n" != m && "\r" != m) {
                        var y = this._getFrameIndex(m, h);
                        null != y &&
                          (p > u
                            ? (e = l[u])
                            : (l.push(
                                (e = c.length ? c.pop() : new createjs.Sprite())
                              ),
                              (e.parent = this),
                              p++),
                          (e.spriteSheet = h),
                          e.gotoAndStop(y),
                          (e.x = i),
                          (e.y = n),
                          u++,
                          (i += e.getBounds().width + this.letterSpacing));
                      } else
                        "\r" == m && "\n" == this.text.charAt(g + 1) && g++,
                          (i = 0),
                          (n += a);
                    else i += o;
                  }
                  for (; p > u; ) c.push((e = l.pop())), (e.parent = null), p--;
                  c.length > t.maxPoolSize && (c.length = t.maxPoolSize);
                }
              }),
              (createjs.BitmapText = createjs.promote(t, "Container"));
          })(),
          (this.createjs = this.createjs || {}),
          (function () {
            "use strict";
            function t() {
              throw "SpriteSheetUtils cannot be instantiated";
            }
            var e = createjs.createCanvas
              ? createjs.createCanvas()
              : document.createElement("canvas");
            e.getContext &&
              ((t._workingCanvas = e),
              (t._workingContext = e.getContext("2d")),
              (e.width = e.height = 1)),
              (t.addFlippedFrames = function (e, i, n, s) {
                if (i || n || s) {
                  var r = 0;
                  i && t._flip(e, ++r, !0, !1),
                    n && t._flip(e, ++r, !1, !0),
                    s && t._flip(e, ++r, !0, !0);
                }
              }),
              (t.extractFrame = function (e, i) {
                isNaN(i) && (i = e.getAnimation(i).frames[0]);
                var n = e.getFrame(i);
                if (!n) return null;
                var s = n.rect,
                  r = t._workingCanvas;
                (r.width = s.width),
                  (r.height = s.height),
                  t._workingContext.drawImage(
                    n.image,
                    s.x,
                    s.y,
                    s.width,
                    s.height,
                    0,
                    0,
                    s.width,
                    s.height
                  );
                var o = document.createElement("img");
                return (o.src = r.toDataURL("image/png")), o;
              }),
              (t.mergeAlpha = function (t, e, i) {
                i ||
                  (i = createjs.createCanvas
                    ? createjs.createCanvas()
                    : document.createElement("canvas")),
                  (i.width = Math.max(e.width, t.width)),
                  (i.height = Math.max(e.height, t.height));
                var n = i.getContext("2d");
                return (
                  n.save(),
                  n.drawImage(t, 0, 0),
                  (n.globalCompositeOperation = "destination-in"),
                  n.drawImage(e, 0, 0),
                  n.restore(),
                  i
                );
              }),
              (t._flip = function (e, i, n, s) {
                for (
                  var r = e._images,
                    o = t._workingCanvas,
                    a = t._workingContext,
                    h = r.length / i,
                    c = 0;
                  h > c;
                  c++
                ) {
                  var l = r[c];
                  (l.__tmp = c),
                    a.setTransform(1, 0, 0, 1, 0, 0),
                    a.clearRect(0, 0, o.width + 1, o.height + 1),
                    (o.width = l.width),
                    (o.height = l.height),
                    a.setTransform(
                      n ? -1 : 1,
                      0,
                      0,
                      s ? -1 : 1,
                      n ? l.width : 0,
                      s ? l.height : 0
                    ),
                    a.drawImage(l, 0, 0);
                  var u = document.createElement("img");
                  (u.src = o.toDataURL("image/png")),
                    (u.width = l.width),
                    (u.height = l.height),
                    r.push(u);
                }
                var p = e._frames,
                  d = p.length / i;
                for (c = 0; d > c; c++) {
                  l = p[c];
                  var f = l.rect.clone();
                  u = r[l.image.__tmp + h * i];
                  var g = { image: u, rect: f, regX: l.regX, regY: l.regY };
                  n &&
                    ((f.x = u.width - f.x - f.width),
                    (g.regX = f.width - l.regX)),
                    s &&
                      ((f.y = u.height - f.y - f.height),
                      (g.regY = f.height - l.regY)),
                    p.push(g);
                }
                var v = "_" + (n ? "h" : "") + (s ? "v" : ""),
                  m = e._animations,
                  y = e._data,
                  w = m.length / i;
                for (c = 0; w > c; c++) {
                  var _ = m[c];
                  l = y[_];
                  var x = {
                    name: _ + v,
                    speed: l.speed,
                    next: l.next,
                    frames: [],
                  };
                  l.next && (x.next += v), (p = l.frames);
                  for (var b = 0, T = p.length; T > b; b++)
                    x.frames.push(p[b] + d * i);
                  (y[x.name] = x), m.push(x.name);
                }
              }),
              (createjs.SpriteSheetUtils = t);
          })(),
          (this.createjs = this.createjs || {}),
          (function () {
            "use strict";
            function t() {
              this.EventDispatcher_constructor(),
                (this.maxWidth = 2048),
                (this.maxHeight = 2048),
                (this.spriteSheet = null),
                (this.scale = 1),
                (this.padding = 1),
                (this.timeSlice = 0.3),
                (this.progress = -1),
                (this._frames = []),
                (this._animations = {}),
                (this._data = null),
                (this._nextFrameIndex = 0),
                (this._index = 0),
                (this._timerID = null),
                (this._scale = 1);
            }
            var e = createjs.extend(t, createjs.EventDispatcher);
            (t.ERR_DIMENSIONS =
              "frame dimensions exceed max spritesheet dimensions"),
              (t.ERR_RUNNING = "a build is already running"),
              (e.addFrame = function (e, i, n, s, r) {
                if (this._data) throw t.ERR_RUNNING;
                var o = i || e.bounds || e.nominalBounds;
                return (
                  !o && e.getBounds && (o = e.getBounds()),
                  o
                    ? ((n = n || 1),
                      this._frames.push({
                        source: e,
                        sourceRect: o,
                        scale: n,
                        funct: s,
                        data: r,
                        index: this._frames.length,
                        height: o.height * n,
                      }) - 1)
                    : null
                );
              }),
              (e.addAnimation = function (e, i, n, s) {
                if (this._data) throw t.ERR_RUNNING;
                this._animations[e] = { frames: i, next: n, frequency: s };
              }),
              (e.addMovieClip = function (e, i, n, s, r, o) {
                if (this._data) throw t.ERR_RUNNING;
                var a = e.frameBounds,
                  h = i || e.bounds || e.nominalBounds;
                if ((!h && e.getBounds && (h = e.getBounds()), h || a)) {
                  var c,
                    l,
                    u = this._frames.length,
                    p = e.timeline.duration;
                  for (c = 0; p > c; c++) {
                    var d = a && a[c] ? a[c] : h;
                    this.addFrame(e, d, n, this._setupMovieClipFrame, {
                      i: c,
                      f: s,
                      d: r,
                    });
                  }
                  var f = e.timeline._labels,
                    g = [];
                  for (var v in f) g.push({ index: f[v], label: v });
                  if (g.length)
                    for (
                      g.sort(function (t, e) {
                        return t.index - e.index;
                      }),
                        c = 0,
                        l = g.length;
                      l > c;
                      c++
                    ) {
                      for (
                        var m = g[c].label,
                          y = u + g[c].index,
                          w = u + (c == l - 1 ? p : g[c + 1].index),
                          _ = [],
                          x = y;
                        w > x;
                        x++
                      )
                        _.push(x);
                      (!o || (m = o(m, e, y, w))) &&
                        this.addAnimation(m, _, !0);
                    }
                }
              }),
              (e.build = function () {
                if (this._data) throw t.ERR_RUNNING;
                for (this._startBuild(); this._drawNext(); );
                return this._endBuild(), this.spriteSheet;
              }),
              (e.buildAsync = function (e) {
                if (this._data) throw t.ERR_RUNNING;
                (this.timeSlice = e), this._startBuild();
                var i = this;
                this._timerID = setTimeout(function () {
                  i._run();
                }, 50 -
                  50 * Math.max(0.01, Math.min(0.99, this.timeSlice || 0.3)));
              }),
              (e.stopAsync = function () {
                clearTimeout(this._timerID), (this._data = null);
              }),
              (e.clone = function () {
                throw "SpriteSheetBuilder cannot be cloned.";
              }),
              (e.toString = function () {
                return "[SpriteSheetBuilder]";
              }),
              (e._startBuild = function () {
                var e = this.padding || 0;
                (this.progress = 0),
                  (this.spriteSheet = null),
                  (this._index = 0),
                  (this._scale = this.scale);
                var i = [];
                this._data = {
                  images: [],
                  frames: i,
                  animations: this._animations,
                };
                var n = this._frames.slice();
                if (
                  (n.sort(function (t, e) {
                    return t.height <= e.height ? -1 : 1;
                  }),
                  n[n.length - 1].height + 2 * e > this.maxHeight)
                )
                  throw t.ERR_DIMENSIONS;
                for (var s = 0, r = 0, o = 0; n.length; ) {
                  var a = this._fillRow(n, s, o, i, e);
                  if ((a.w > r && (r = a.w), (s += a.h), !a.h || !n.length)) {
                    var h = createjs.createCanvas
                      ? createjs.createCanvas()
                      : document.createElement("canvas");
                    (h.width = this._getSize(r, this.maxWidth)),
                      (h.height = this._getSize(s, this.maxHeight)),
                      (this._data.images[o] = h),
                      a.h || ((r = s = 0), o++);
                  }
                }
              }),
              (e._setupMovieClipFrame = function (t, e) {
                var i = t.actionsEnabled;
                (t.actionsEnabled = !1),
                  t.gotoAndStop(e.i),
                  (t.actionsEnabled = i),
                  e.f && e.f(t, e.d, e.i);
              }),
              (e._getSize = function (t, e) {
                for (var i = 4; Math.pow(2, ++i) < t; );
                return Math.min(e, Math.pow(2, i));
              }),
              (e._fillRow = function (e, i, n, s, r) {
                var o = this.maxWidth,
                  a = this.maxHeight;
                i += r;
                for (
                  var h = a - i, c = r, l = 0, u = e.length - 1;
                  u >= 0;
                  u--
                ) {
                  var p = e[u],
                    d = this._scale * p.scale,
                    f = p.sourceRect,
                    g = p.source,
                    v = Math.floor(d * f.x - r),
                    m = Math.floor(d * f.y - r),
                    y = Math.ceil(d * f.height + 2 * r),
                    w = Math.ceil(d * f.width + 2 * r);
                  if (w > o) throw t.ERR_DIMENSIONS;
                  y > h ||
                    c + w > o ||
                    ((p.img = n),
                    (p.rect = new createjs.Rectangle(c, i, w, y)),
                    (l = l || y),
                    e.splice(u, 1),
                    (s[p.index] = [
                      c,
                      i,
                      w,
                      y,
                      n,
                      Math.round(-v + d * g.regX - r),
                      Math.round(-m + d * g.regY - r),
                    ]),
                    (c += w));
                }
                return { w: c, h: l };
              }),
              (e._endBuild = function () {
                (this.spriteSheet = new createjs.SpriteSheet(this._data)),
                  (this._data = null),
                  (this.progress = 1),
                  this.dispatchEvent("complete");
              }),
              (e._run = function () {
                for (
                  var t =
                      50 *
                      Math.max(0.01, Math.min(0.99, this.timeSlice || 0.3)),
                    e = new Date().getTime() + t,
                    i = !1;
                  e > new Date().getTime();

                )
                  if (!this._drawNext()) {
                    i = !0;
                    break;
                  }
                if (i) this._endBuild();
                else {
                  var n = this;
                  this._timerID = setTimeout(function () {
                    n._run();
                  }, 50 - t);
                }
                var s = (this.progress = this._index / this._frames.length);
                if (this.hasEventListener("progress")) {
                  var r = new createjs.Event("progress");
                  (r.progress = s), this.dispatchEvent(r);
                }
              }),
              (e._drawNext = function () {
                var t = this._frames[this._index],
                  e = t.scale * this._scale,
                  i = t.rect,
                  n = t.sourceRect,
                  s = this._data.images[t.img],
                  r = s.getContext("2d");
                return (
                  t.funct && t.funct(t.source, t.data),
                  r.save(),
                  r.beginPath(),
                  r.rect(i.x, i.y, i.width, i.height),
                  r.clip(),
                  r.translate(
                    Math.ceil(i.x - n.x * e),
                    Math.ceil(i.y - n.y * e)
                  ),
                  r.scale(e, e),
                  t.source.draw(r),
                  r.restore(),
                  ++this._index < this._frames.length
                );
              }),
              (createjs.SpriteSheetBuilder = createjs.promote(
                t,
                "EventDispatcher"
              ));
          })(),
          (this.createjs = this.createjs || {}),
          (function () {
            "use strict";
            function t(t) {
              this.DisplayObject_constructor(),
                "string" == typeof t && (t = document.getElementById(t)),
                (this.mouseEnabled = !1);
              var e = t.style;
              (e.position = "absolute"),
                (e.transformOrigin =
                  e.WebkitTransformOrigin =
                  e.msTransformOrigin =
                  e.MozTransformOrigin =
                  e.OTransformOrigin =
                    "0% 0%"),
                (this.htmlElement = t),
                (this._oldProps = null);
            }
            var e = createjs.extend(t, createjs.DisplayObject);
            (e.isVisible = function () {
              return null != this.htmlElement;
            }),
              (e.draw = function () {
                return !0;
              }),
              (e.cache = function () {}),
              (e.uncache = function () {}),
              (e.updateCache = function () {}),
              (e.hitTest = function () {}),
              (e.localToGlobal = function () {}),
              (e.globalToLocal = function () {}),
              (e.localToLocal = function () {}),
              (e.clone = function () {
                throw "DOMElement cannot be cloned.";
              }),
              (e.toString = function () {
                return "[DOMElement (name=" + this.name + ")]";
              }),
              (e._tick = function (t) {
                var e = this.getStage();
                e && e.on("drawend", this._handleDrawEnd, this, !0),
                  this.DisplayObject__tick(t);
              }),
              (e._handleDrawEnd = function () {
                var t = this.htmlElement;
                if (t) {
                  var e = t.style,
                    i = this.getConcatenatedDisplayProps(this._props),
                    n = i.matrix,
                    s = i.visible ? "visible" : "hidden";
                  if ((s != e.visibility && (e.visibility = s), i.visible)) {
                    var r = this._oldProps,
                      o = r && r.matrix,
                      a = 1e4;
                    if (!o || !o.equals(n)) {
                      var h =
                        "matrix(" +
                        ((n.a * a) | 0) / a +
                        "," +
                        ((n.b * a) | 0) / a +
                        "," +
                        ((n.c * a) | 0) / a +
                        "," +
                        ((n.d * a) | 0) / a +
                        "," +
                        ((n.tx + 0.5) | 0);
                      (e.transform =
                        e.WebkitTransform =
                        e.OTransform =
                        e.msTransform =
                          h + "," + ((n.ty + 0.5) | 0) + ")"),
                        (e.MozTransform =
                          h + "px," + ((n.ty + 0.5) | 0) + "px)"),
                        r ||
                          (r = this._oldProps =
                            new createjs.DisplayProps(!0, 0 / 0)),
                        r.matrix.copy(n);
                    }
                    r.alpha != i.alpha &&
                      ((e.opacity = "" + ((i.alpha * a) | 0) / a),
                      (r.alpha = i.alpha));
                  }
                }
              }),
              (createjs.DOMElement = createjs.promote(t, "DisplayObject"));
          })(),
          (this.createjs = this.createjs || {}),
          (function () {
            "use strict";
            function t() {}
            var e = t.prototype;
            (e.getBounds = function (t) {
              return t;
            }),
              (e.applyFilter = function (t, e, i, n, s, r, o, a) {
                (r = r || t), null == o && (o = e), null == a && (a = i);
                try {
                  var h = t.getImageData(e, i, n, s);
                } catch (c) {
                  return !1;
                }
                return this._applyFilter(h)
                  ? (r.putImageData(h, o, a), !0)
                  : !1;
              }),
              (e.toString = function () {
                return "[Filter]";
              }),
              (e.clone = function () {
                return new t();
              }),
              (e._applyFilter = function () {
                return !0;
              }),
              (createjs.Filter = t);
          })(),
          (this.createjs = this.createjs || {}),
          (function () {
            "use strict";
            function t(t, e, i) {
              (isNaN(t) || 0 > t) && (t = 0),
                (isNaN(e) || 0 > e) && (e = 0),
                (isNaN(i) || 1 > i) && (i = 1),
                (this.blurX = 0 | t),
                (this.blurY = 0 | e),
                (this.quality = 0 | i);
            }
            var e = createjs.extend(t, createjs.Filter);
            (t.MUL_TABLE = [
              1, 171, 205, 293, 57, 373, 79, 137, 241, 27, 391, 357, 41, 19,
              283, 265, 497, 469, 443, 421, 25, 191, 365, 349, 335, 161, 155,
              149, 9, 278, 269, 261, 505, 245, 475, 231, 449, 437, 213, 415,
              405, 395, 193, 377, 369, 361, 353, 345, 169, 331, 325, 319, 313,
              307, 301, 37, 145, 285, 281, 69, 271, 267, 263, 259, 509, 501,
              493, 243, 479, 118, 465, 459, 113, 446, 55, 435, 429, 423, 209,
              413, 51, 403, 199, 393, 97, 3, 379, 375, 371, 367, 363, 359, 355,
              351, 347, 43, 85, 337, 333, 165, 327, 323, 5, 317, 157, 311, 77,
              305, 303, 75, 297, 294, 73, 289, 287, 71, 141, 279, 277, 275, 68,
              135, 67, 133, 33, 262, 260, 129, 511, 507, 503, 499, 495, 491, 61,
              121, 481, 477, 237, 235, 467, 232, 115, 457, 227, 451, 7, 445,
              221, 439, 218, 433, 215, 427, 425, 211, 419, 417, 207, 411, 409,
              203, 202, 401, 399, 396, 197, 49, 389, 387, 385, 383, 95, 189, 47,
              187, 93, 185, 23, 183, 91, 181, 45, 179, 89, 177, 11, 175, 87,
              173, 345, 343, 341, 339, 337, 21, 167, 83, 331, 329, 327, 163, 81,
              323, 321, 319, 159, 79, 315, 313, 39, 155, 309, 307, 153, 305,
              303, 151, 75, 299, 149, 37, 295, 147, 73, 291, 145, 289, 287, 143,
              285, 71, 141, 281, 35, 279, 139, 69, 275, 137, 273, 17, 271, 135,
              269, 267, 133, 265, 33, 263, 131, 261, 130, 259, 129, 257, 1,
            ]),
              (t.SHG_TABLE = [
                0, 9, 10, 11, 9, 12, 10, 11, 12, 9, 13, 13, 10, 9, 13, 13, 14,
                14, 14, 14, 10, 13, 14, 14, 14, 13, 13, 13, 9, 14, 14, 14, 15,
                14, 15, 14, 15, 15, 14, 15, 15, 15, 14, 15, 15, 15, 15, 15, 14,
                15, 15, 15, 15, 15, 15, 12, 14, 15, 15, 13, 15, 15, 15, 15, 16,
                16, 16, 15, 16, 14, 16, 16, 14, 16, 13, 16, 16, 16, 15, 16, 13,
                16, 15, 16, 14, 9, 16, 16, 16, 16, 16, 16, 16, 16, 16, 13, 14,
                16, 16, 15, 16, 16, 10, 16, 15, 16, 14, 16, 16, 14, 16, 16, 14,
                16, 16, 14, 15, 16, 16, 16, 14, 15, 14, 15, 13, 16, 16, 15, 17,
                17, 17, 17, 17, 17, 14, 15, 17, 17, 16, 16, 17, 16, 15, 17, 16,
                17, 11, 17, 16, 17, 16, 17, 16, 17, 17, 16, 17, 17, 16, 17, 17,
                16, 16, 17, 17, 17, 16, 14, 17, 17, 17, 17, 15, 16, 14, 16, 15,
                16, 13, 16, 15, 16, 14, 16, 15, 16, 12, 16, 15, 16, 17, 17, 17,
                17, 17, 13, 16, 15, 17, 17, 17, 16, 15, 17, 17, 17, 16, 15, 17,
                17, 14, 16, 17, 17, 16, 17, 17, 16, 15, 17, 16, 14, 17, 16, 15,
                17, 16, 17, 17, 16, 17, 15, 16, 17, 14, 17, 16, 15, 17, 16, 17,
                13, 17, 16, 17, 17, 16, 17, 14, 17, 16, 17, 16, 17, 16, 17, 9,
              ]),
              (e.getBounds = function (t) {
                var e = 0 | this.blurX,
                  i = 0 | this.blurY;
                if (0 >= e && 0 >= i) return t;
                var n = Math.pow(this.quality, 0.2);
                return (t || new createjs.Rectangle()).pad(
                  e * n + 1,
                  i * n + 1,
                  e * n + 1,
                  i * n + 1
                );
              }),
              (e.clone = function () {
                return new t(this.blurX, this.blurY, this.quality);
              }),
              (e.toString = function () {
                return "[BlurFilter]";
              }),
              (e._applyFilter = function (e) {
                var i = this.blurX >> 1;
                if (isNaN(i) || 0 > i) return !1;
                var n = this.blurY >> 1;
                if (isNaN(n) || 0 > n) return !1;
                if (0 == i && 0 == n) return !1;
                var s = this.quality;
                (isNaN(s) || 1 > s) && (s = 1),
                  (s |= 0),
                  s > 3 && (s = 3),
                  1 > s && (s = 1);
                var r = e.data,
                  o = 0,
                  a = 0,
                  h = 0,
                  c = 0,
                  l = 0,
                  u = 0,
                  p = 0,
                  d = 0,
                  f = 0,
                  g = 0,
                  v = 0,
                  m = 0,
                  y = 0,
                  w = 0,
                  _ = 0,
                  x = (i + i + 1) | 0,
                  b = (n + n + 1) | 0,
                  T = 0 | e.width,
                  k = 0 | e.height,
                  S = (T - 1) | 0,
                  C = (k - 1) | 0,
                  P = (i + 1) | 0,
                  M = (n + 1) | 0,
                  E = { r: 0, b: 0, g: 0, a: 0 },
                  D = E;
                for (h = 1; x > h; h++) D = D.n = { r: 0, b: 0, g: 0, a: 0 };
                D.n = E;
                var I = { r: 0, b: 0, g: 0, a: 0 },
                  A = I;
                for (h = 1; b > h; h++) A = A.n = { r: 0, b: 0, g: 0, a: 0 };
                A.n = I;
                for (
                  var O = null,
                    j = 0 | t.MUL_TABLE[i],
                    L = 0 | t.SHG_TABLE[i],
                    F = 0 | t.MUL_TABLE[n],
                    B = 0 | t.SHG_TABLE[n];
                  s-- > 0;

                ) {
                  p = u = 0;
                  var z = j,
                    R = L;
                  for (a = k; --a > -1; ) {
                    for (
                      d = P * (m = r[0 | u]),
                        f = P * (y = r[(u + 1) | 0]),
                        g = P * (w = r[(u + 2) | 0]),
                        v = P * (_ = r[(u + 3) | 0]),
                        D = E,
                        h = P;
                      --h > -1;

                    )
                      (D.r = m), (D.g = y), (D.b = w), (D.a = _), (D = D.n);
                    for (h = 1; P > h; h++)
                      (c = (u + ((h > S ? S : h) << 2)) | 0),
                        (d += D.r = r[c]),
                        (f += D.g = r[c + 1]),
                        (g += D.b = r[c + 2]),
                        (v += D.a = r[c + 3]),
                        (D = D.n);
                    for (O = E, o = 0; T > o; o++)
                      (r[u++] = (d * z) >>> R),
                        (r[u++] = (f * z) >>> R),
                        (r[u++] = (g * z) >>> R),
                        (r[u++] = (v * z) >>> R),
                        (c = (p + ((c = o + i + 1) < S ? c : S)) << 2),
                        (d -= O.r - (O.r = r[c])),
                        (f -= O.g - (O.g = r[c + 1])),
                        (g -= O.b - (O.b = r[c + 2])),
                        (v -= O.a - (O.a = r[c + 3])),
                        (O = O.n);
                    p += T;
                  }
                  for (z = F, R = B, o = 0; T > o; o++) {
                    for (
                      u = (o << 2) | 0,
                        d = (M * (m = r[u])) | 0,
                        f = (M * (y = r[(u + 1) | 0])) | 0,
                        g = (M * (w = r[(u + 2) | 0])) | 0,
                        v = (M * (_ = r[(u + 3) | 0])) | 0,
                        A = I,
                        h = 0;
                      M > h;
                      h++
                    )
                      (A.r = m), (A.g = y), (A.b = w), (A.a = _), (A = A.n);
                    for (l = T, h = 1; n >= h; h++)
                      (u = (l + o) << 2),
                        (d += A.r = r[u]),
                        (f += A.g = r[u + 1]),
                        (g += A.b = r[u + 2]),
                        (v += A.a = r[u + 3]),
                        (A = A.n),
                        C > h && (l += T);
                    if (((u = o), (O = I), s > 0))
                      for (a = 0; k > a; a++)
                        (c = u << 2),
                          (r[c + 3] = _ = (v * z) >>> R),
                          _ > 0
                            ? ((r[c] = (d * z) >>> R),
                              (r[c + 1] = (f * z) >>> R),
                              (r[c + 2] = (g * z) >>> R))
                            : (r[c] = r[c + 1] = r[c + 2] = 0),
                          (c = (o + ((c = a + M) < C ? c : C) * T) << 2),
                          (d -= O.r - (O.r = r[c])),
                          (f -= O.g - (O.g = r[c + 1])),
                          (g -= O.b - (O.b = r[c + 2])),
                          (v -= O.a - (O.a = r[c + 3])),
                          (O = O.n),
                          (u += T);
                    else
                      for (a = 0; k > a; a++)
                        (c = u << 2),
                          (r[c + 3] = _ = (v * z) >>> R),
                          _ > 0
                            ? ((_ = 255 / _),
                              (r[c] = ((d * z) >>> R) * _),
                              (r[c + 1] = ((f * z) >>> R) * _),
                              (r[c + 2] = ((g * z) >>> R) * _))
                            : (r[c] = r[c + 1] = r[c + 2] = 0),
                          (c = (o + ((c = a + M) < C ? c : C) * T) << 2),
                          (d -= O.r - (O.r = r[c])),
                          (f -= O.g - (O.g = r[c + 1])),
                          (g -= O.b - (O.b = r[c + 2])),
                          (v -= O.a - (O.a = r[c + 3])),
                          (O = O.n),
                          (u += T);
                  }
                }
                return !0;
              }),
              (createjs.BlurFilter = createjs.promote(t, "Filter"));
          })(),
          (this.createjs = this.createjs || {}),
          (function () {
            "use strict";
            function t(t) {
              (this.alphaMap = t),
                (this._alphaMap = null),
                (this._mapData = null);
            }
            var e = createjs.extend(t, createjs.Filter);
            (e.clone = function () {
              var e = new t(this.alphaMap);
              return (
                (e._alphaMap = this._alphaMap), (e._mapData = this._mapData), e
              );
            }),
              (e.toString = function () {
                return "[AlphaMapFilter]";
              }),
              (e._applyFilter = function (t) {
                if (!this.alphaMap) return !0;
                if (!this._prepAlphaMap()) return !1;
                for (
                  var e = t.data, i = this._mapData, n = 0, s = e.length;
                  s > n;
                  n += 4
                )
                  e[n + 3] = i[n] || 0;
                return !0;
              }),
              (e._prepAlphaMap = function () {
                if (!this.alphaMap) return !1;
                if (this.alphaMap == this._alphaMap && this._mapData) return !0;
                this._mapData = null;
                var t,
                  e = (this._alphaMap = this.alphaMap),
                  i = e;
                e instanceof HTMLCanvasElement
                  ? (t = i.getContext("2d"))
                  : ((i = createjs.createCanvas
                      ? createjs.createCanvas()
                      : document.createElement("canvas")),
                    (i.width = e.width),
                    (i.height = e.height),
                    (t = i.getContext("2d")),
                    t.drawImage(e, 0, 0));
                try {
                  var n = t.getImageData(0, 0, e.width, e.height);
                } catch (s) {
                  return !1;
                }
                return (this._mapData = n.data), !0;
              }),
              (createjs.AlphaMapFilter = createjs.promote(t, "Filter"));
          })(),
          (this.createjs = this.createjs || {}),
          (function () {
            "use strict";
            function t(t) {
              this.mask = t;
            }
            var e = createjs.extend(t, createjs.Filter);
            (e.applyFilter = function (t, e, i, n, s, r, o, a) {
              return this.mask
                ? ((r = r || t),
                  null == o && (o = e),
                  null == a && (a = i),
                  r.save(),
                  t != r
                    ? !1
                    : ((r.globalCompositeOperation = "destination-in"),
                      r.drawImage(this.mask, o, a),
                      r.restore(),
                      !0))
                : !0;
            }),
              (e.clone = function () {
                return new t(this.mask);
              }),
              (e.toString = function () {
                return "[AlphaMaskFilter]";
              }),
              (createjs.AlphaMaskFilter = createjs.promote(t, "Filter"));
          })(),
          (this.createjs = this.createjs || {}),
          (function () {
            "use strict";
            function t(t, e, i, n, s, r, o, a) {
              (this.redMultiplier = null != t ? t : 1),
                (this.greenMultiplier = null != e ? e : 1),
                (this.blueMultiplier = null != i ? i : 1),
                (this.alphaMultiplier = null != n ? n : 1),
                (this.redOffset = s || 0),
                (this.greenOffset = r || 0),
                (this.blueOffset = o || 0),
                (this.alphaOffset = a || 0);
            }
            var e = createjs.extend(t, createjs.Filter);
            (e.toString = function () {
              return "[ColorFilter]";
            }),
              (e.clone = function () {
                return new t(
                  this.redMultiplier,
                  this.greenMultiplier,
                  this.blueMultiplier,
                  this.alphaMultiplier,
                  this.redOffset,
                  this.greenOffset,
                  this.blueOffset,
                  this.alphaOffset
                );
              }),
              (e._applyFilter = function (t) {
                for (var e = t.data, i = e.length, n = 0; i > n; n += 4)
                  (e[n] = e[n] * this.redMultiplier + this.redOffset),
                    (e[n + 1] =
                      e[n + 1] * this.greenMultiplier + this.greenOffset),
                    (e[n + 2] =
                      e[n + 2] * this.blueMultiplier + this.blueOffset),
                    (e[n + 3] =
                      e[n + 3] * this.alphaMultiplier + this.alphaOffset);
                return !0;
              }),
              (createjs.ColorFilter = createjs.promote(t, "Filter"));
          })(),
          (this.createjs = this.createjs || {}),
          (function () {
            "use strict";
            function t(t, e, i, n) {
              this.setColor(t, e, i, n);
            }
            var e = t.prototype;
            (t.DELTA_INDEX = [
              0, 0.01, 0.02, 0.04, 0.05, 0.06, 0.07, 0.08, 0.1, 0.11, 0.12,
              0.14, 0.15, 0.16, 0.17, 0.18, 0.2, 0.21, 0.22, 0.24, 0.25, 0.27,
              0.28, 0.3, 0.32, 0.34, 0.36, 0.38, 0.4, 0.42, 0.44, 0.46, 0.48,
              0.5, 0.53, 0.56, 0.59, 0.62, 0.65, 0.68, 0.71, 0.74, 0.77, 0.8,
              0.83, 0.86, 0.89, 0.92, 0.95, 0.98, 1, 1.06, 1.12, 1.18, 1.24,
              1.3, 1.36, 1.42, 1.48, 1.54, 1.6, 1.66, 1.72, 1.78, 1.84, 1.9,
              1.96, 2, 2.12, 2.25, 2.37, 2.5, 2.62, 2.75, 2.87, 3, 3.2, 3.4,
              3.6, 3.8, 4, 4.3, 4.7, 4.9, 5, 5.5, 6, 6.5, 6.8, 7, 7.3, 7.5, 7.8,
              8, 8.4, 8.7, 9, 9.4, 9.6, 9.8, 10,
            ]),
              (t.IDENTITY_MATRIX = [
                1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0,
                0, 0, 0, 1,
              ]),
              (t.LENGTH = t.IDENTITY_MATRIX.length),
              (e.setColor = function (t, e, i, n) {
                return this.reset().adjustColor(t, e, i, n);
              }),
              (e.reset = function () {
                return this.copy(t.IDENTITY_MATRIX);
              }),
              (e.adjustColor = function (t, e, i, n) {
                return (
                  this.adjustHue(n),
                  this.adjustContrast(e),
                  this.adjustBrightness(t),
                  this.adjustSaturation(i)
                );
              }),
              (e.adjustBrightness = function (t) {
                return 0 == t || isNaN(t)
                  ? this
                  : ((t = this._cleanValue(t, 255)),
                    this._multiplyMatrix([
                      1,
                      0,
                      0,
                      0,
                      t,
                      0,
                      1,
                      0,
                      0,
                      t,
                      0,
                      0,
                      1,
                      0,
                      t,
                      0,
                      0,
                      0,
                      1,
                      0,
                      0,
                      0,
                      0,
                      0,
                      1,
                    ]),
                    this);
              }),
              (e.adjustContrast = function (e) {
                if (0 == e || isNaN(e)) return this;
                e = this._cleanValue(e, 100);
                var i;
                return (
                  0 > e
                    ? (i = 127 + (e / 100) * 127)
                    : ((i = e % 1),
                      (i =
                        0 == i
                          ? t.DELTA_INDEX[e]
                          : t.DELTA_INDEX[e << 0] * (1 - i) +
                            t.DELTA_INDEX[(e << 0) + 1] * i),
                      (i = 127 * i + 127)),
                  this._multiplyMatrix([
                    i / 127,
                    0,
                    0,
                    0,
                    0.5 * (127 - i),
                    0,
                    i / 127,
                    0,
                    0,
                    0.5 * (127 - i),
                    0,
                    0,
                    i / 127,
                    0,
                    0.5 * (127 - i),
                    0,
                    0,
                    0,
                    1,
                    0,
                    0,
                    0,
                    0,
                    0,
                    1,
                  ]),
                  this
                );
              }),
              (e.adjustSaturation = function (t) {
                if (0 == t || isNaN(t)) return this;
                t = this._cleanValue(t, 100);
                var e = 1 + (t > 0 ? (3 * t) / 100 : t / 100),
                  i = 0.3086,
                  n = 0.6094,
                  s = 0.082;
                return (
                  this._multiplyMatrix([
                    i * (1 - e) + e,
                    n * (1 - e),
                    s * (1 - e),
                    0,
                    0,
                    i * (1 - e),
                    n * (1 - e) + e,
                    s * (1 - e),
                    0,
                    0,
                    i * (1 - e),
                    n * (1 - e),
                    s * (1 - e) + e,
                    0,
                    0,
                    0,
                    0,
                    0,
                    1,
                    0,
                    0,
                    0,
                    0,
                    0,
                    1,
                  ]),
                  this
                );
              }),
              (e.adjustHue = function (t) {
                if (0 == t || isNaN(t)) return this;
                t = (this._cleanValue(t, 180) / 180) * Math.PI;
                var e = Math.cos(t),
                  i = Math.sin(t),
                  n = 0.213,
                  s = 0.715,
                  r = 0.072;
                return (
                  this._multiplyMatrix([
                    n + e * (1 - n) + i * -n,
                    s + e * -s + i * -s,
                    r + e * -r + i * (1 - r),
                    0,
                    0,
                    n + e * -n + 0.143 * i,
                    s + e * (1 - s) + 0.14 * i,
                    r + e * -r + i * -0.283,
                    0,
                    0,
                    n + e * -n + i * -(1 - n),
                    s + e * -s + i * s,
                    r + e * (1 - r) + i * r,
                    0,
                    0,
                    0,
                    0,
                    0,
                    1,
                    0,
                    0,
                    0,
                    0,
                    0,
                    1,
                  ]),
                  this
                );
              }),
              (e.concat = function (e) {
                return (
                  (e = this._fixMatrix(e)),
                  e.length != t.LENGTH ? this : (this._multiplyMatrix(e), this)
                );
              }),
              (e.clone = function () {
                return new t().copy(this);
              }),
              (e.toArray = function () {
                for (var e = [], i = 0, n = t.LENGTH; n > i; i++)
                  e[i] = this[i];
                return e;
              }),
              (e.copy = function (e) {
                for (var i = t.LENGTH, n = 0; i > n; n++) this[n] = e[n];
                return this;
              }),
              (e.toString = function () {
                return "[ColorMatrix]";
              }),
              (e._multiplyMatrix = function (t) {
                var e,
                  i,
                  n,
                  s = [];
                for (e = 0; 5 > e; e++) {
                  for (i = 0; 5 > i; i++) s[i] = this[i + 5 * e];
                  for (i = 0; 5 > i; i++) {
                    var r = 0;
                    for (n = 0; 5 > n; n++) r += t[i + 5 * n] * s[n];
                    this[i + 5 * e] = r;
                  }
                }
              }),
              (e._cleanValue = function (t, e) {
                return Math.min(e, Math.max(-e, t));
              }),
              (e._fixMatrix = function (e) {
                return (
                  e instanceof t && (e = e.toArray()),
                  e.length < t.LENGTH
                    ? (e = e
                        .slice(0, e.length)
                        .concat(t.IDENTITY_MATRIX.slice(e.length, t.LENGTH)))
                    : e.length > t.LENGTH && (e = e.slice(0, t.LENGTH)),
                  e
                );
              }),
              (createjs.ColorMatrix = t);
          })(),
          (this.createjs = this.createjs || {}),
          (function () {
            "use strict";
            function t(t) {
              this.matrix = t;
            }
            var e = createjs.extend(t, createjs.Filter);
            (e.toString = function () {
              return "[ColorMatrixFilter]";
            }),
              (e.clone = function () {
                return new t(this.matrix);
              }),
              (e._applyFilter = function (t) {
                for (
                  var e,
                    i,
                    n,
                    s,
                    r = t.data,
                    o = r.length,
                    a = this.matrix,
                    h = a[0],
                    c = a[1],
                    l = a[2],
                    u = a[3],
                    p = a[4],
                    d = a[5],
                    f = a[6],
                    g = a[7],
                    v = a[8],
                    m = a[9],
                    y = a[10],
                    w = a[11],
                    _ = a[12],
                    x = a[13],
                    b = a[14],
                    T = a[15],
                    k = a[16],
                    S = a[17],
                    C = a[18],
                    P = a[19],
                    M = 0;
                  o > M;
                  M += 4
                )
                  (e = r[M]),
                    (i = r[M + 1]),
                    (n = r[M + 2]),
                    (s = r[M + 3]),
                    (r[M] = e * h + i * c + n * l + s * u + p),
                    (r[M + 1] = e * d + i * f + n * g + s * v + m),
                    (r[M + 2] = e * y + i * w + n * _ + s * x + b),
                    (r[M + 3] = e * T + i * k + n * S + s * C + P);
                return !0;
              }),
              (createjs.ColorMatrixFilter = createjs.promote(t, "Filter"));
          })(),
          (this.createjs = this.createjs || {}),
          (function () {
            "use strict";
            function t() {
              throw "Touch cannot be instantiated";
            }
            (t.isSupported = function () {
              return !!(
                "ontouchstart" in window ||
                (window.navigator.msPointerEnabled &&
                  window.navigator.msMaxTouchPoints > 0) ||
                (window.navigator.pointerEnabled &&
                  window.navigator.maxTouchPoints > 0)
              );
            }),
              (t.enable = function (e, i, n) {
                return e && e.canvas && t.isSupported()
                  ? e.__touch
                    ? !0
                    : ((e.__touch = {
                        pointers: {},
                        multitouch: !i,
                        preventDefault: !n,
                        count: 0,
                      }),
                      "ontouchstart" in window
                        ? t._IOS_enable(e)
                        : (window.navigator.msPointerEnabled ||
                            window.navigator.pointerEnabled) &&
                          t._IE_enable(e),
                      !0)
                  : !1;
              }),
              (t.disable = function (e) {
                e &&
                  ("ontouchstart" in window
                    ? t._IOS_disable(e)
                    : (window.navigator.msPointerEnabled ||
                        window.navigator.pointerEnabled) &&
                      t._IE_disable(e),
                  delete e.__touch);
              }),
              (t._IOS_enable = function (e) {
                var i = e.canvas,
                  n = (e.__touch.f = function (i) {
                    t._IOS_handleEvent(e, i);
                  });
                i.addEventListener("touchstart", n, !1),
                  i.addEventListener("touchmove", n, !1),
                  i.addEventListener("touchend", n, !1),
                  i.addEventListener("touchcancel", n, !1);
              }),
              (t._IOS_disable = function (t) {
                var e = t.canvas;
                if (e) {
                  var i = t.__touch.f;
                  e.removeEventListener("touchstart", i, !1),
                    e.removeEventListener("touchmove", i, !1),
                    e.removeEventListener("touchend", i, !1),
                    e.removeEventListener("touchcancel", i, !1);
                }
              }),
              (t._IOS_handleEvent = function (t, e) {
                if (t) {
                  t.__touch.preventDefault &&
                    e.preventDefault &&
                    e.preventDefault();
                  for (
                    var i = e.changedTouches, n = e.type, s = 0, r = i.length;
                    r > s;
                    s++
                  ) {
                    var o = i[s],
                      a = o.identifier;
                    o.target == t.canvas &&
                      ("touchstart" == n
                        ? this._handleStart(t, a, e, o.pageX, o.pageY)
                        : "touchmove" == n
                        ? this._handleMove(t, a, e, o.pageX, o.pageY)
                        : ("touchend" == n || "touchcancel" == n) &&
                          this._handleEnd(t, a, e));
                  }
                }
              }),
              (t._IE_enable = function (e) {
                var i = e.canvas,
                  n = (e.__touch.f = function (i) {
                    t._IE_handleEvent(e, i);
                  });
                void 0 === window.navigator.pointerEnabled
                  ? (i.addEventListener("MSPointerDown", n, !1),
                    window.addEventListener("MSPointerMove", n, !1),
                    window.addEventListener("MSPointerUp", n, !1),
                    window.addEventListener("MSPointerCancel", n, !1),
                    e.__touch.preventDefault &&
                      (i.style.msTouchAction = "none"))
                  : (i.addEventListener("pointerdown", n, !1),
                    window.addEventListener("pointermove", n, !1),
                    window.addEventListener("pointerup", n, !1),
                    window.addEventListener("pointercancel", n, !1),
                    e.__touch.preventDefault && (i.style.touchAction = "none")),
                  (e.__touch.activeIDs = {});
              }),
              (t._IE_disable = function (t) {
                var e = t.__touch.f;
                void 0 === window.navigator.pointerEnabled
                  ? (window.removeEventListener("MSPointerMove", e, !1),
                    window.removeEventListener("MSPointerUp", e, !1),
                    window.removeEventListener("MSPointerCancel", e, !1),
                    t.canvas &&
                      t.canvas.removeEventListener("MSPointerDown", e, !1))
                  : (window.removeEventListener("pointermove", e, !1),
                    window.removeEventListener("pointerup", e, !1),
                    window.removeEventListener("pointercancel", e, !1),
                    t.canvas &&
                      t.canvas.removeEventListener("pointerdown", e, !1));
              }),
              (t._IE_handleEvent = function (t, e) {
                if (t) {
                  t.__touch.preventDefault &&
                    e.preventDefault &&
                    e.preventDefault();
                  var i = e.type,
                    n = e.pointerId,
                    s = t.__touch.activeIDs;
                  if ("MSPointerDown" == i || "pointerdown" == i) {
                    if (e.srcElement != t.canvas) return;
                    (s[n] = !0), this._handleStart(t, n, e, e.pageX, e.pageY);
                  } else
                    s[n] &&
                      ("MSPointerMove" == i || "pointermove" == i
                        ? this._handleMove(t, n, e, e.pageX, e.pageY)
                        : ("MSPointerUp" == i ||
                            "MSPointerCancel" == i ||
                            "pointerup" == i ||
                            "pointercancel" == i) &&
                          (delete s[n], this._handleEnd(t, n, e)));
                }
              }),
              (t._handleStart = function (t, e, i, n, s) {
                var r = t.__touch;
                if (r.multitouch || !r.count) {
                  var o = r.pointers;
                  o[e] ||
                    ((o[e] = !0), r.count++, t._handlePointerDown(e, i, n, s));
                }
              }),
              (t._handleMove = function (t, e, i, n, s) {
                t.__touch.pointers[e] && t._handlePointerMove(e, i, n, s);
              }),
              (t._handleEnd = function (t, e, i) {
                var n = t.__touch,
                  s = n.pointers;
                s[e] && (n.count--, t._handlePointerUp(e, i, !0), delete s[e]);
              }),
              (createjs.Touch = t);
          })(),
          (this.createjs = this.createjs || {}),
          (function () {
            "use strict";
            var t = (createjs.EaselJS = createjs.EaselJS || {});
            (t.version = "0.8.0"),
              (t.buildDate = "Thu, 15 Jan 2015 23:50:40 GMT");
          })();
      },
      {},
    ],
    77: [
      function (t, e, i) {
        (function (t) {
          (function () {
            function n(t, e) {
              if (t !== e) {
                var i = null === t,
                  n = t === T,
                  s = t === t,
                  r = null === e,
                  o = e === T,
                  a = e === e;
                if ((t > e && !r) || !s || (i && !o && a) || (n && a)) return 1;
                if ((e > t && !i) || !a || (r && !n && s) || (o && s))
                  return -1;
              }
              return 0;
            }
            function s(t, e, i) {
              for (var n = t.length, s = i ? n : -1; i ? s-- : ++s < n; )
                if (e(t[s], s, t)) return s;
              return -1;
            }
            function r(t, e, i) {
              if (e !== e) return g(t, i);
              i -= 1;
              for (var n = t.length; ++i < n; ) if (t[i] === e) return i;
              return -1;
            }
            function o(t) {
              return "function" == typeof t || !1;
            }
            function a(t) {
              return null == t ? "" : t + "";
            }
            function h(t, e) {
              for (
                var i = -1, n = t.length;
                ++i < n && -1 < e.indexOf(t.charAt(i));

              );
              return i;
            }
            function c(t, e) {
              for (var i = t.length; i-- && -1 < e.indexOf(t.charAt(i)); );
              return i;
            }
            function l(t, e) {
              return n(t.a, e.a) || t.b - e.b;
            }
            function u(t) {
              return ze[t];
            }
            function p(t) {
              return Re[t];
            }
            function d(t, e, i) {
              return e ? (t = Ue[t]) : i && (t = Ne[t]), "\\" + t;
            }
            function f(t) {
              return "\\" + Ne[t];
            }
            function g(t, e, i) {
              var n = t.length;
              for (e += i ? 0 : -1; i ? e-- : ++e < n; ) {
                var s = t[e];
                if (s !== s) return e;
              }
              return -1;
            }
            function v(t) {
              return !!t && "object" == typeof t;
            }
            function m(t) {
              return (
                (160 >= t && t >= 9 && 13 >= t) ||
                32 == t ||
                160 == t ||
                5760 == t ||
                6158 == t ||
                (t >= 8192 &&
                  (8202 >= t ||
                    8232 == t ||
                    8233 == t ||
                    8239 == t ||
                    8287 == t ||
                    12288 == t ||
                    65279 == t))
              );
            }
            function y(t, e) {
              for (var i = -1, n = t.length, s = -1, r = []; ++i < n; )
                t[i] === e && ((t[i] = U), (r[++s] = i));
              return r;
            }
            function w(t) {
              for (var e = -1, i = t.length; ++e < i && m(t.charCodeAt(e)); );
              return e;
            }
            function _(t) {
              for (var e = t.length; e-- && m(t.charCodeAt(e)); );
              return e;
            }
            function x(t) {
              return We[t];
            }
            function b(t) {
              function e(t) {
                if (v(t) && !(Mo(t) || t instanceof ze)) {
                  if (t instanceof m) return t;
                  if (tr.call(t, "__chain__") && tr.call(t, "__wrapped__"))
                    return Un(t);
                }
                return new m(t);
              }
              function i() {}
              function m(t, e, i) {
                (this.__wrapped__ = t),
                  (this.__actions__ = i || []),
                  (this.__chain__ = !!e);
              }
              function ze(t) {
                (this.__wrapped__ = t),
                  (this.__actions__ = []),
                  (this.__dir__ = 1),
                  (this.__filtered__ = !1),
                  (this.__iteratees__ = []),
                  (this.__takeCount__ = Pr),
                  (this.__views__ = []);
              }
              function Re() {
                this.__data__ = {};
              }
              function We(t) {
                var e = t ? t.length : 0;
                for (this.data = { hash: vr(null), set: new lr() }; e--; )
                  this.push(t[e]);
              }
              function Ve(t, e) {
                var i = t.data;
                return (
                  "string" == typeof e || vs(e) ? i.set.has(e) : i.hash[e]
                )
                  ? 0
                  : -1;
              }
              function Ue(t, e) {
                var i = -1,
                  n = t.length;
                for (e || (e = Ws(n)); ++i < n; ) e[i] = t[i];
                return e;
              }
              function Ne(t, e) {
                for (
                  var i = -1, n = t.length;
                  ++i < n && !1 !== e(t[i], i, t);

                );
                return t;
              }
              function He(t, e) {
                for (var i = -1, n = t.length; ++i < n; )
                  if (!e(t[i], i, t)) return !1;
                return !0;
              }
              function Ge(t, e) {
                for (var i = -1, n = t.length, s = -1, r = []; ++i < n; ) {
                  var o = t[i];
                  e(o, i, t) && (r[++s] = o);
                }
                return r;
              }
              function Ye(t, e) {
                for (var i = -1, n = t.length, s = Ws(n); ++i < n; )
                  s[i] = e(t[i], i, t);
                return s;
              }
              function Xe(t, e) {
                for (var i = -1, n = e.length, s = t.length; ++i < n; )
                  t[s + i] = e[i];
                return t;
              }
              function qe(t, e, i, n) {
                var s = -1,
                  r = t.length;
                for (n && r && (i = t[++s]); ++s < r; ) i = e(i, t[s], s, t);
                return i;
              }
              function Je(t, e) {
                for (var i = -1, n = t.length; ++i < n; )
                  if (e(t[i], i, t)) return !0;
                return !1;
              }
              function $e(t, e, i, n) {
                return t !== T && tr.call(n, i) ? t : e;
              }
              function Qe(t, e, i) {
                for (var n = -1, s = Ro(e), r = s.length; ++n < r; ) {
                  var o = s[n],
                    a = t[o],
                    h = i(a, e[o], o, t, e);
                  ((h === h ? h === a : a !== a) && (a !== T || o in t)) ||
                    (t[o] = h);
                }
                return t;
              }
              function ti(t, e) {
                return null == e ? t : ii(e, Ro(e), t);
              }
              function ei(t, e) {
                for (
                  var i = -1,
                    n = null == t,
                    s = !n && En(t),
                    r = s ? t.length : 0,
                    o = e.length,
                    a = Ws(o);
                  ++i < o;

                ) {
                  var h = e[i];
                  a[i] = s ? (Dn(h, r) ? t[h] : T) : n ? T : t[h];
                }
                return a;
              }
              function ii(t, e, i) {
                i || (i = {});
                for (var n = -1, s = e.length; ++n < s; ) {
                  var r = e[n];
                  i[r] = t[r];
                }
                return i;
              }
              function ni(t, e, i) {
                var n = typeof t;
                return "function" == n
                  ? e === T
                    ? t
                    : Ri(t, e, i)
                  : null == t
                  ? Ls
                  : "object" == n
                  ? _i(t)
                  : e === T
                  ? Rs(t)
                  : xi(t, e);
              }
              function si(t, e, i, n, s, r, o) {
                var a;
                if ((i && (a = s ? i(t, n, s) : i(t)), a !== T)) return a;
                if (!vs(t)) return t;
                if ((n = Mo(t))) {
                  if (((a = Sn(t)), !e)) return Ue(t, a);
                } else {
                  var h = ir.call(t),
                    c = h == q;
                  if (h != Z && h != N && (!c || s))
                    return Be[h] ? Pn(t, h, e) : s ? t : {};
                  if (((a = Cn(c ? {} : t)), !e)) return ti(a, t);
                }
                for (r || (r = []), o || (o = []), s = r.length; s--; )
                  if (r[s] == t) return o[s];
                return (
                  r.push(t),
                  o.push(a),
                  (n ? Ne : di)(t, function (n, s) {
                    a[s] = si(n, e, i, s, t, r, o);
                  }),
                  a
                );
              }
              function ri(t, e, i) {
                if ("function" != typeof t) throw new Ks(V);
                return ur(function () {
                  t.apply(T, i);
                }, e);
              }
              function oi(t, e) {
                var i = t ? t.length : 0,
                  n = [];
                if (!i) return n;
                var s = -1,
                  o = bn(),
                  a = o === r,
                  h = a && e.length >= z && vr && lr ? new We(e) : null,
                  c = e.length;
                h && ((o = Ve), (a = !1), (e = h));
                t: for (; ++s < i; )
                  if (((h = t[s]), a && h === h)) {
                    for (var l = c; l--; ) if (e[l] === h) continue t;
                    n.push(h);
                  } else 0 > o(e, h, 0) && n.push(h);
                return n;
              }
              function ai(t, e) {
                var i = !0;
                return (
                  jr(t, function (t, n, s) {
                    return (i = !!e(t, n, s));
                  }),
                  i
                );
              }
              function hi(t, e, i, n) {
                var s = n,
                  r = s;
                return (
                  jr(t, function (t, o, a) {
                    (o = +e(t, o, a)),
                      (i(o, s) || (o === n && o === r)) && ((s = o), (r = t));
                  }),
                  r
                );
              }
              function ci(t, e) {
                var i = [];
                return (
                  jr(t, function (t, n, s) {
                    e(t, n, s) && i.push(t);
                  }),
                  i
                );
              }
              function li(t, e, i, n) {
                var s;
                return (
                  i(t, function (t, i, r) {
                    return e(t, i, r) ? ((s = n ? i : t), !1) : void 0;
                  }),
                  s
                );
              }
              function ui(t, e, i, n) {
                n || (n = []);
                for (var s = -1, r = t.length; ++s < r; ) {
                  var o = t[s];
                  v(o) && En(o) && (i || Mo(o) || ps(o))
                    ? e
                      ? ui(o, e, i, n)
                      : Xe(n, o)
                    : i || (n[n.length] = o);
                }
                return n;
              }
              function pi(t, e) {
                Fr(t, e, Ps);
              }
              function di(t, e) {
                return Fr(t, e, Ro);
              }
              function fi(t, e) {
                return Br(t, e, Ro);
              }
              function gi(t, e) {
                for (var i = -1, n = e.length, s = -1, r = []; ++i < n; ) {
                  var o = e[i];
                  gs(t[o]) && (r[++s] = o);
                }
                return r;
              }
              function vi(t, e, i) {
                if (null != t) {
                  i !== T && i in Wn(t) && (e = [i]), (i = 0);
                  for (var n = e.length; null != t && n > i; ) t = t[e[i++]];
                  return i && i == n ? t : T;
                }
              }
              function mi(t, e, i, n, s, r) {
                if (t === e) t = !0;
                else if (null == t || null == e || (!vs(t) && !v(e)))
                  t = t !== t && e !== e;
                else
                  t: {
                    var o = mi,
                      a = Mo(t),
                      h = Mo(e),
                      c = H,
                      l = H;
                    a ||
                      ((c = ir.call(t)),
                      c == N ? (c = Z) : c != Z && (a = bs(t))),
                      h ||
                        ((l = ir.call(e)), l == N ? (l = Z) : l != Z && bs(e));
                    var u = c == Z,
                      h = l == Z,
                      l = c == l;
                    if (!l || a || u) {
                      if (
                        !n &&
                        ((c = u && tr.call(t, "__wrapped__")),
                        (h = h && tr.call(e, "__wrapped__")),
                        c || h)
                      ) {
                        t = o(c ? t.value() : t, h ? e.value() : e, i, n, s, r);
                        break t;
                      }
                      if (l) {
                        for (s || (s = []), r || (r = []), c = s.length; c--; )
                          if (s[c] == t) {
                            t = r[c] == e;
                            break t;
                          }
                        s.push(t),
                          r.push(e),
                          (t = (a ? mn : wn)(t, e, o, i, n, s, r)),
                          s.pop(),
                          r.pop();
                      } else t = !1;
                    } else t = yn(t, e, c);
                  }
                return t;
              }
              function yi(t, e, i) {
                var n = e.length,
                  s = n,
                  r = !i;
                if (null == t) return !s;
                for (t = Wn(t); n--; ) {
                  var o = e[n];
                  if (r && o[2] ? o[1] !== t[o[0]] : !(o[0] in t)) return !1;
                }
                for (; ++n < s; ) {
                  var o = e[n],
                    a = o[0],
                    h = t[a],
                    c = o[1];
                  if (r && o[2]) {
                    if (h === T && !(a in t)) return !1;
                  } else if (
                    ((o = i ? i(h, c, a) : T), o === T ? !mi(c, h, i, !0) : !o)
                  )
                    return !1;
                }
                return !0;
              }
              function wi(t, e) {
                var i = -1,
                  n = En(t) ? Ws(t.length) : [];
                return (
                  jr(t, function (t, s, r) {
                    n[++i] = e(t, s, r);
                  }),
                  n
                );
              }
              function _i(t) {
                var e = Tn(t);
                if (1 == e.length && e[0][2]) {
                  var i = e[0][0],
                    n = e[0][1];
                  return function (t) {
                    return null == t
                      ? !1
                      : t[i] === n && (n !== T || i in Wn(t));
                  };
                }
                return function (t) {
                  return yi(t, e);
                };
              }
              function xi(t, e) {
                var i = Mo(t),
                  n = An(t) && e === e && !vs(e),
                  s = t + "";
                return (
                  (t = Vn(t)),
                  function (r) {
                    if (null == r) return !1;
                    var o = s;
                    if (((r = Wn(r)), !((!i && n) || o in r))) {
                      if (
                        ((r = 1 == t.length ? r : vi(r, Mi(t, 0, -1))),
                        null == r)
                      )
                        return !1;
                      (o = Xn(t)), (r = Wn(r));
                    }
                    return r[o] === e ? e !== T || o in r : mi(e, r[o], T, !0);
                  }
                );
              }
              function bi(t, e, i, n, s) {
                if (!vs(t)) return t;
                var r = En(e) && (Mo(e) || bs(e)),
                  o = r ? T : Ro(e);
                return (
                  Ne(o || e, function (a, h) {
                    if ((o && ((h = a), (a = e[h])), v(a))) {
                      n || (n = []), s || (s = []);
                      t: {
                        for (
                          var c = h, l = n, u = s, p = l.length, d = e[c];
                          p--;

                        )
                          if (l[p] == d) {
                            t[c] = u[p];
                            break t;
                          }
                        var p = t[c],
                          f = i ? i(p, d, c, t, e) : T,
                          g = f === T;
                        g &&
                          ((f = d),
                          En(d) && (Mo(d) || bs(d))
                            ? (f = Mo(p) ? p : En(p) ? Ue(p) : [])
                            : ws(d) || ps(d)
                            ? (f = ps(p) ? Ss(p) : ws(p) ? p : {})
                            : (g = !1)),
                          l.push(d),
                          u.push(f),
                          g
                            ? (t[c] = bi(f, d, i, l, u))
                            : (f === f ? f !== p : p === p) && (t[c] = f);
                      }
                    } else (c = t[h]), (l = i ? i(c, a, h, t, e) : T), (u = l === T) && (l = a), (l === T && (!r || h in t)) || (!u && (l === l ? l === c : c !== c)) || (t[h] = l);
                  }),
                  t
                );
              }
              function Ti(t) {
                return function (e) {
                  return null == e ? T : e[t];
                };
              }
              function ki(t) {
                var e = t + "";
                return (
                  (t = Vn(t)),
                  function (i) {
                    return vi(i, t, e);
                  }
                );
              }
              function Si(t, e) {
                for (var i = t ? e.length : 0; i--; ) {
                  var n = e[i];
                  if (n != s && Dn(n)) {
                    var s = n;
                    pr.call(t, n, 1);
                  }
                }
              }
              function Ci(t, e) {
                return t + mr(Sr() * (e - t + 1));
              }
              function Pi(t, e, i, n, s) {
                return (
                  s(t, function (t, s, r) {
                    i = n ? ((n = !1), t) : e(i, t, s, r);
                  }),
                  i
                );
              }
              function Mi(t, e, i) {
                var n = -1,
                  s = t.length;
                for (
                  e = null == e ? 0 : +e || 0,
                    0 > e && (e = -e > s ? 0 : s + e),
                    i = i === T || i > s ? s : +i || 0,
                    0 > i && (i += s),
                    s = e > i ? 0 : (i - e) >>> 0,
                    e >>>= 0,
                    i = Ws(s);
                  ++n < s;

                )
                  i[n] = t[n + e];
                return i;
              }
              function Ei(t, e) {
                var i;
                return (
                  jr(t, function (t, n, s) {
                    return (i = e(t, n, s)), !i;
                  }),
                  !!i
                );
              }
              function Di(t, e) {
                var i = t.length;
                for (t.sort(e); i--; ) t[i] = t[i].c;
                return t;
              }
              function Ii(t, e, i) {
                var s = _n(),
                  r = -1;
                return (
                  (e = Ye(e, function (t) {
                    return s(t);
                  })),
                  (t = wi(t, function (t) {
                    return {
                      a: Ye(e, function (e) {
                        return e(t);
                      }),
                      b: ++r,
                      c: t,
                    };
                  })),
                  Di(t, function (t, e) {
                    var s;
                    t: {
                      for (
                        var r = -1,
                          o = t.a,
                          a = e.a,
                          h = o.length,
                          c = i.length;
                        ++r < h;

                      )
                        if ((s = n(o[r], a[r]))) {
                          if (r >= c) break t;
                          (r = i[r]), (s *= "asc" === r || !0 === r ? 1 : -1);
                          break t;
                        }
                      s = t.b - e.b;
                    }
                    return s;
                  })
                );
              }
              function Ai(t, e) {
                var i = 0;
                return (
                  jr(t, function (t, n, s) {
                    i += +e(t, n, s) || 0;
                  }),
                  i
                );
              }
              function Oi(t, e) {
                var i = -1,
                  n = bn(),
                  s = t.length,
                  o = n === r,
                  a = o && s >= z,
                  h = a && vr && lr ? new We(void 0) : null,
                  c = [];
                h ? ((n = Ve), (o = !1)) : ((a = !1), (h = e ? [] : c));
                t: for (; ++i < s; ) {
                  var l = t[i],
                    u = e ? e(l, i, t) : l;
                  if (o && l === l) {
                    for (var p = h.length; p--; ) if (h[p] === u) continue t;
                    e && h.push(u), c.push(l);
                  } else 0 > n(h, u, 0) && ((e || a) && h.push(u), c.push(l));
                }
                return c;
              }
              function ji(t, e) {
                for (var i = -1, n = e.length, s = Ws(n); ++i < n; )
                  s[i] = t[e[i]];
                return s;
              }
              function Li(t, e, i, n) {
                for (
                  var s = t.length, r = n ? s : -1;
                  (n ? r-- : ++r < s) && e(t[r], r, t);

                );
                return i
                  ? Mi(t, n ? 0 : r, n ? r + 1 : s)
                  : Mi(t, n ? r + 1 : 0, n ? s : r);
              }
              function Fi(t, e) {
                var i = t;
                i instanceof ze && (i = i.value());
                for (var n = -1, s = e.length; ++n < s; )
                  var r = e[n], i = r.func.apply(r.thisArg, Xe([i], r.args));
                return i;
              }
              function Bi(t, e, i) {
                var n = 0,
                  s = t ? t.length : n;
                if ("number" == typeof e && e === e && Er >= s) {
                  for (; s > n; ) {
                    var r = (n + s) >>> 1,
                      o = t[r];
                    (i ? e >= o : e > o) && null !== o ? (n = r + 1) : (s = r);
                  }
                  return s;
                }
                return zi(t, e, Ls, i);
              }
              function zi(t, e, i, n) {
                e = i(e);
                for (
                  var s = 0,
                    r = t ? t.length : 0,
                    o = e !== e,
                    a = null === e,
                    h = e === T;
                  r > s;

                ) {
                  var c = mr((s + r) / 2),
                    l = i(t[c]),
                    u = l !== T,
                    p = l === l;
                  (
                    o
                      ? p || n
                      : a
                      ? p && u && (n || null != l)
                      : h
                      ? p && (n || u)
                      : null == l
                      ? 0
                      : n
                      ? e >= l
                      : e > l
                  )
                    ? (s = c + 1)
                    : (r = c);
                }
                return br(r, Mr);
              }
              function Ri(t, e, i) {
                if ("function" != typeof t) return Ls;
                if (e === T) return t;
                switch (i) {
                  case 1:
                    return function (i) {
                      return t.call(e, i);
                    };
                  case 3:
                    return function (i, n, s) {
                      return t.call(e, i, n, s);
                    };
                  case 4:
                    return function (i, n, s, r) {
                      return t.call(e, i, n, s, r);
                    };
                  case 5:
                    return function (i, n, s, r, o) {
                      return t.call(e, i, n, s, r, o);
                    };
                }
                return function () {
                  return t.apply(e, arguments);
                };
              }
              function Wi(t) {
                var e = new rr(t.byteLength);
                return new dr(e).set(new dr(t)), e;
              }
              function Vi(t, e, i) {
                for (
                  var n = i.length,
                    s = -1,
                    r = xr(t.length - n, 0),
                    o = -1,
                    a = e.length,
                    h = Ws(a + r);
                  ++o < a;

                )
                  h[o] = e[o];
                for (; ++s < n; ) h[i[s]] = t[s];
                for (; r--; ) h[o++] = t[s++];
                return h;
              }
              function Ui(t, e, i) {
                for (
                  var n = -1,
                    s = i.length,
                    r = -1,
                    o = xr(t.length - s, 0),
                    a = -1,
                    h = e.length,
                    c = Ws(o + h);
                  ++r < o;

                )
                  c[r] = t[r];
                for (o = r; ++a < h; ) c[o + a] = e[a];
                for (; ++n < s; ) c[o + i[n]] = t[r++];
                return c;
              }
              function Ni(t, e) {
                return function (i, n, s) {
                  var r = e ? e() : {};
                  if (((n = _n(n, s, 3)), Mo(i))) {
                    s = -1;
                    for (var o = i.length; ++s < o; ) {
                      var a = i[s];
                      t(r, a, n(a, s, i), i);
                    }
                  } else
                    jr(i, function (e, i, s) {
                      t(r, e, n(e, i, s), s);
                    });
                  return r;
                };
              }
              function Hi(t) {
                return ls(function (e, i) {
                  var n = -1,
                    s = null == e ? 0 : i.length,
                    r = s > 2 ? i[s - 2] : T,
                    o = s > 2 ? i[2] : T,
                    a = s > 1 ? i[s - 1] : T;
                  for (
                    "function" == typeof r
                      ? ((r = Ri(r, a, 5)), (s -= 2))
                      : ((r = "function" == typeof a ? a : T),
                        (s -= r ? 1 : 0)),
                      o && In(i[0], i[1], o) && ((r = 3 > s ? T : r), (s = 1));
                    ++n < s;

                  )
                    (o = i[n]) && t(e, o, r);
                  return e;
                });
              }
              function Gi(t, e) {
                return function (i, n) {
                  var s = i ? Wr(i) : 0;
                  if (!jn(s)) return t(i, n);
                  for (
                    var r = e ? s : -1, o = Wn(i);
                    (e ? r-- : ++r < s) && !1 !== n(o[r], r, o);

                  );
                  return i;
                };
              }
              function Yi(t) {
                return function (e, i, n) {
                  var s = Wn(e);
                  n = n(e);
                  for (var r = n.length, o = t ? r : -1; t ? o-- : ++o < r; ) {
                    var a = n[o];
                    if (!1 === i(s[a], a, s)) break;
                  }
                  return e;
                };
              }
              function Xi(t, e) {
                function i() {
                  return (
                    this && this !== Ke && this instanceof i ? n : t
                  ).apply(e, arguments);
                }
                var n = Ki(t);
                return i;
              }
              function qi(t) {
                return function (e) {
                  var i = -1;
                  e = Os(Ds(e));
                  for (var n = e.length, s = ""; ++i < n; ) s = t(s, e[i], i);
                  return s;
                };
              }
              function Ki(t) {
                return function () {
                  var e = arguments;
                  switch (e.length) {
                    case 0:
                      return new t();
                    case 1:
                      return new t(e[0]);
                    case 2:
                      return new t(e[0], e[1]);
                    case 3:
                      return new t(e[0], e[1], e[2]);
                    case 4:
                      return new t(e[0], e[1], e[2], e[3]);
                    case 5:
                      return new t(e[0], e[1], e[2], e[3], e[4]);
                    case 6:
                      return new t(e[0], e[1], e[2], e[3], e[4], e[5]);
                    case 7:
                      return new t(e[0], e[1], e[2], e[3], e[4], e[5], e[6]);
                  }
                  var i = Or(t.prototype),
                    e = t.apply(i, e);
                  return vs(e) ? e : i;
                };
              }
              function Zi(t) {
                function e(i, n, s) {
                  return (
                    s && In(i, n, s) && (n = T),
                    (i = vn(i, t, T, T, T, T, T, n)),
                    (i.placeholder = e.placeholder),
                    i
                  );
                }
                return e;
              }
              function Ji(t, e) {
                return ls(function (i) {
                  var n = i[0];
                  return null == n ? n : (i.push(e), t.apply(T, i));
                });
              }
              function $i(t, e) {
                return function (i, n, s) {
                  if (
                    (s && In(i, n, s) && (n = T),
                    (n = _n(n, s, 3)),
                    1 == n.length)
                  ) {
                    s = i = Mo(i) ? i : Rn(i);
                    for (
                      var r = n, o = -1, a = s.length, h = e, c = h;
                      ++o < a;

                    ) {
                      var l = s[o],
                        u = +r(l);
                      t(u, h) && ((h = u), (c = l));
                    }
                    if (((s = c), !i.length || s !== e)) return s;
                  }
                  return hi(i, n, t, e);
                };
              }
              function Qi(t, e) {
                return function (i, n, r) {
                  return (
                    (n = _n(n, r, 3)),
                    Mo(i) ? ((n = s(i, n, e)), n > -1 ? i[n] : T) : li(i, n, t)
                  );
                };
              }
              function tn(t) {
                return function (e, i, n) {
                  return e && e.length ? ((i = _n(i, n, 3)), s(e, i, t)) : -1;
                };
              }
              function en(t) {
                return function (e, i, n) {
                  return (i = _n(i, n, 3)), li(e, i, t, !0);
                };
              }
              function nn(t) {
                return function () {
                  for (
                    var e,
                      i = arguments.length,
                      n = t ? i : -1,
                      s = 0,
                      r = Ws(i);
                    t ? n-- : ++n < i;

                  ) {
                    var o = (r[s++] = arguments[n]);
                    if ("function" != typeof o) throw new Ks(V);
                    !e &&
                      m.prototype.thru &&
                      "wrapper" == xn(o) &&
                      (e = new m([], !0));
                  }
                  for (n = e ? -1 : i; ++n < i; ) {
                    var o = r[n],
                      s = xn(o),
                      a = "wrapper" == s ? Rr(o) : T;
                    e =
                      a &&
                      On(a[0]) &&
                      a[1] == (A | M | D | O) &&
                      !a[4].length &&
                      1 == a[9]
                        ? e[xn(a[0])].apply(e, a[3])
                        : 1 == o.length && On(o)
                        ? e[s]()
                        : e.thru(o);
                  }
                  return function () {
                    var t = arguments,
                      n = t[0];
                    if (e && 1 == t.length && Mo(n) && n.length >= z)
                      return e.plant(n).value();
                    for (var s = 0, t = i ? r[s].apply(this, t) : n; ++s < i; )
                      t = r[s].call(this, t);
                    return t;
                  };
                };
              }
              function sn(t, e) {
                return function (i, n, s) {
                  return "function" == typeof n && s === T && Mo(i)
                    ? t(i, n)
                    : e(i, Ri(n, s, 3));
                };
              }
              function rn(t) {
                return function (e, i, n) {
                  return (
                    ("function" != typeof i || n !== T) && (i = Ri(i, n, 3)),
                    t(e, i, Ps)
                  );
                };
              }
              function on(t) {
                return function (e, i, n) {
                  return (
                    ("function" != typeof i || n !== T) && (i = Ri(i, n, 3)),
                    t(e, i)
                  );
                };
              }
              function an(t) {
                return function (e, i, n) {
                  var s = {};
                  return (
                    (i = _n(i, n, 3)),
                    di(e, function (e, n, r) {
                      (r = i(e, n, r)),
                        (n = t ? r : n),
                        (e = t ? e : r),
                        (s[n] = e);
                    }),
                    s
                  );
                };
              }
              function hn(t) {
                return function (e, i, n) {
                  return (e = a(e)), (t ? e : "") + pn(e, i, n) + (t ? "" : e);
                };
              }
              function cn(t) {
                var e = ls(function (i, n) {
                  var s = y(n, e.placeholder);
                  return vn(i, t, T, n, s);
                });
                return e;
              }
              function ln(t, e) {
                return function (i, n, s, r) {
                  var o = 3 > arguments.length;
                  return "function" == typeof n && r === T && Mo(i)
                    ? t(i, n, s, o)
                    : Pi(i, _n(n, r, 4), s, o, e);
                };
              }
              function un(t, e, i, n, s, r, o, a, h, c) {
                function l() {
                  for (var w = arguments.length, _ = w, x = Ws(w); _--; )
                    x[_] = arguments[_];
                  if (
                    (n && (x = Vi(x, n, s)), r && (x = Ui(x, r, o)), f || v)
                  ) {
                    var _ = l.placeholder,
                      b = y(x, _),
                      w = w - b.length;
                    if (c > w) {
                      var k = a ? Ue(a) : T,
                        w = xr(c - w, 0),
                        P = f ? b : T,
                        b = f ? T : b,
                        M = f ? x : T,
                        x = f ? T : x;
                      return (
                        (e |= f ? D : I),
                        (e &= ~(f ? I : D)),
                        g || (e &= ~(S | C)),
                        (x = [t, e, i, M, P, x, b, k, h, w]),
                        (k = un.apply(T, x)),
                        On(t) && Vr(k, x),
                        (k.placeholder = _),
                        k
                      );
                    }
                  }
                  if (((_ = p ? i : this), (k = d ? _[t] : t), a))
                    for (w = x.length, P = br(a.length, w), b = Ue(x); P--; )
                      (M = a[P]), (x[P] = Dn(M, w) ? b[M] : T);
                  return (
                    u && h < x.length && (x.length = h),
                    this &&
                      this !== Ke &&
                      this instanceof l &&
                      (k = m || Ki(t)),
                    k.apply(_, x)
                  );
                }
                var u = e & A,
                  p = e & S,
                  d = e & C,
                  f = e & M,
                  g = e & P,
                  v = e & E,
                  m = d ? T : Ki(t);
                return l;
              }
              function pn(t, e, i) {
                return (
                  (t = t.length),
                  (e = +e),
                  e > t && wr(e)
                    ? ((e -= t),
                      (i = null == i ? " " : i + ""),
                      Is(i, gr(e / i.length)).slice(0, e))
                    : ""
                );
              }
              function dn(t, e, i, n) {
                function s() {
                  for (
                    var e = -1,
                      a = arguments.length,
                      h = -1,
                      c = n.length,
                      l = Ws(c + a);
                    ++h < c;

                  )
                    l[h] = n[h];
                  for (; a--; ) l[h++] = arguments[++e];
                  return (
                    this && this !== Ke && this instanceof s ? o : t
                  ).apply(r ? i : this, l);
                }
                var r = e & S,
                  o = Ki(t);
                return s;
              }
              function fn(t) {
                var e = Hs[t];
                return function (t, i) {
                  return (i = i === T ? 0 : +i || 0)
                    ? ((i = hr(10, i)), e(t * i) / i)
                    : e(t);
                };
              }
              function gn(t) {
                return function (e, i, n, s) {
                  var r = _n(n);
                  return null == n && r === ni
                    ? Bi(e, i, t)
                    : zi(e, i, r(n, s, 1), t);
                };
              }
              function vn(t, e, i, n, s, r, o, a) {
                var h = e & C;
                if (!h && "function" != typeof t) throw new Ks(V);
                var c = n ? n.length : 0;
                if (
                  (c || ((e &= ~(D | I)), (n = s = T)),
                  (c -= s ? s.length : 0),
                  e & I)
                ) {
                  var l = n,
                    u = s;
                  n = s = T;
                }
                var p = h ? T : Rr(t);
                return (
                  (i = [t, e, i, n, s, l, u, r, o, a]),
                  p &&
                    ((n = i[1]),
                    (e = p[1]),
                    (a = n | e),
                    (s =
                      (e == A && n == M) ||
                      (e == A && n == O && i[7].length <= p[8]) ||
                      (e == (A | O) && n == M)),
                    (A > a || s) &&
                      (e & S && ((i[2] = p[2]), (a |= n & S ? 0 : P)),
                      (n = p[3]) &&
                        ((s = i[3]),
                        (i[3] = s ? Vi(s, n, p[4]) : Ue(n)),
                        (i[4] = s ? y(i[3], U) : Ue(p[4]))),
                      (n = p[5]) &&
                        ((s = i[5]),
                        (i[5] = s ? Ui(s, n, p[6]) : Ue(n)),
                        (i[6] = s ? y(i[5], U) : Ue(p[6]))),
                      (n = p[7]) && (i[7] = Ue(n)),
                      e & A && (i[8] = null == i[8] ? p[8] : br(i[8], p[8])),
                      null == i[9] && (i[9] = p[9]),
                      (i[0] = p[0]),
                      (i[1] = a)),
                    (e = i[1]),
                    (a = i[9])),
                  (i[9] = null == a ? (h ? 0 : t.length) : xr(a - c, 0) || 0),
                  (p ? zr : Vr)(
                    e == S
                      ? Xi(i[0], i[2])
                      : (e != D && e != (S | D)) || i[4].length
                      ? un.apply(T, i)
                      : dn.apply(T, i),
                    i
                  )
                );
              }
              function mn(t, e, i, n, s, r, o) {
                var a = -1,
                  h = t.length,
                  c = e.length;
                if (h != c && (!s || h >= c)) return !1;
                for (; ++a < h; ) {
                  var l = t[a],
                    c = e[a],
                    u = n ? n(s ? c : l, s ? l : c, a) : T;
                  if (u !== T) {
                    if (u) continue;
                    return !1;
                  }
                  if (s) {
                    if (
                      !Je(e, function (t) {
                        return l === t || i(l, t, n, s, r, o);
                      })
                    )
                      return !1;
                  } else if (l !== c && !i(l, c, n, s, r, o)) return !1;
                }
                return !0;
              }
              function yn(t, e, i) {
                switch (i) {
                  case G:
                  case Y:
                    return +t == +e;
                  case X:
                    return t.name == e.name && t.message == e.message;
                  case K:
                    return t != +t ? e != +e : t == +e;
                  case J:
                  case $:
                    return t == e + "";
                }
                return !1;
              }
              function wn(t, e, i, n, s, r, o) {
                var a = Ro(t),
                  h = a.length,
                  c = Ro(e).length;
                if (h != c && !s) return !1;
                for (c = h; c--; ) {
                  var l = a[c];
                  if (!(s ? l in e : tr.call(e, l))) return !1;
                }
                for (var u = s; ++c < h; ) {
                  var l = a[c],
                    p = t[l],
                    d = e[l],
                    f = n ? n(s ? d : p, s ? p : d, l) : T;
                  if (f === T ? !i(p, d, n, s, r, o) : !f) return !1;
                  u || (u = "constructor" == l);
                }
                return u ||
                  ((i = t.constructor),
                  (n = e.constructor),
                  !(i != n && "constructor" in t && "constructor" in e) ||
                    ("function" == typeof i &&
                      i instanceof i &&
                      "function" == typeof n &&
                      n instanceof n))
                  ? !0
                  : !1;
              }
              function _n(t, i, n) {
                var s = e.callback || js,
                  s = s === js ? ni : s;
                return n ? s(t, i, n) : s;
              }
              function xn(t) {
                for (
                  var e = t.name + "", i = Ar[e], n = i ? i.length : 0;
                  n--;

                ) {
                  var s = i[n],
                    r = s.func;
                  if (null == r || r == t) return s.name;
                }
                return e;
              }
              function bn(t, i, n) {
                var s = e.indexOf || Yn,
                  s = s === Yn ? r : s;
                return t ? s(t, i, n) : s;
              }
              function Tn(t) {
                t = Ms(t);
                for (var e = t.length; e--; ) {
                  var i = t[e][1];
                  t[e][2] = i === i && !vs(i);
                }
                return t;
              }
              function kn(t, e) {
                var i = null == t ? T : t[e];
                return ms(i) ? i : T;
              }
              function Sn(t) {
                var e = t.length,
                  i = new t.constructor(e);
                return (
                  e &&
                    "string" == typeof t[0] &&
                    tr.call(t, "index") &&
                    ((i.index = t.index), (i.input = t.input)),
                  i
                );
              }
              function Cn(t) {
                return (
                  (t = t.constructor),
                  ("function" == typeof t && t instanceof t) || (t = Ys),
                  new t()
                );
              }
              function Pn(t, e, i) {
                var n = t.constructor;
                switch (e) {
                  case Q:
                    return Wi(t);
                  case G:
                  case Y:
                    return new n(+t);
                  case te:
                  case ee:
                  case ie:
                  case ne:
                  case se:
                  case re:
                  case oe:
                  case ae:
                  case he:
                    return (
                      (e = t.buffer),
                      new n(i ? Wi(e) : e, t.byteOffset, t.length)
                    );
                  case K:
                  case $:
                    return new n(t);
                  case J:
                    var s = new n(t.source, Pe.exec(t));
                    s.lastIndex = t.lastIndex;
                }
                return s;
              }
              function Mn(t, e, i) {
                return (
                  null == t ||
                    An(e, t) ||
                    ((e = Vn(e)),
                    (t = 1 == e.length ? t : vi(t, Mi(e, 0, -1))),
                    (e = Xn(e))),
                  (e = null == t ? t : t[e]),
                  null == e ? T : e.apply(t, i)
                );
              }
              function En(t) {
                return null != t && jn(Wr(t));
              }
              function Dn(t, e) {
                return (
                  (t = "number" == typeof t || De.test(t) ? +t : -1),
                  (e = null == e ? Dr : e),
                  t > -1 && 0 == t % 1 && e > t
                );
              }
              function In(t, e, i) {
                if (!vs(i)) return !1;
                var n = typeof e;
                return (
                  "number" == n
                    ? En(i) && Dn(e, i.length)
                    : "string" == n && e in i
                )
                  ? ((e = i[e]), t === t ? t === e : e !== e)
                  : !1;
              }
              function An(t, e) {
                var i = typeof t;
                return ("string" == i && _e.test(t)) || "number" == i
                  ? !0
                  : Mo(t)
                  ? !1
                  : !we.test(t) || (null != e && t in Wn(e));
              }
              function On(t) {
                var i = xn(t),
                  n = e[i];
                return "function" == typeof n && i in ze.prototype
                  ? t === n
                    ? !0
                    : ((i = Rr(n)), !!i && t === i[0])
                  : !1;
              }
              function jn(t) {
                return "number" == typeof t && t > -1 && 0 == t % 1 && Dr >= t;
              }
              function Ln(t, e) {
                return t === T ? e : Eo(t, e, Ln);
              }
              function Fn(t, e) {
                t = Wn(t);
                for (var i = -1, n = e.length, s = {}; ++i < n; ) {
                  var r = e[i];
                  r in t && (s[r] = t[r]);
                }
                return s;
              }
              function Bn(t, e) {
                var i = {};
                return (
                  pi(t, function (t, n, s) {
                    e(t, n, s) && (i[n] = t);
                  }),
                  i
                );
              }
              function zn(t) {
                for (
                  var e = Ps(t),
                    i = e.length,
                    n = i && t.length,
                    s = !!n && jn(n) && (Mo(t) || ps(t)),
                    r = -1,
                    o = [];
                  ++r < i;

                ) {
                  var a = e[r];
                  ((s && Dn(a, n)) || tr.call(t, a)) && o.push(a);
                }
                return o;
              }
              function Rn(t) {
                return null == t ? [] : En(t) ? (vs(t) ? t : Ys(t)) : Es(t);
              }
              function Wn(t) {
                return vs(t) ? t : Ys(t);
              }
              function Vn(t) {
                if (Mo(t)) return t;
                var e = [];
                return (
                  a(t).replace(xe, function (t, i, n, s) {
                    e.push(n ? s.replace(Se, "$1") : i || t);
                  }),
                  e
                );
              }
              function Un(t) {
                return t instanceof ze
                  ? t.clone()
                  : new m(t.__wrapped__, t.__chain__, Ue(t.__actions__));
              }
              function Nn(t, e, i) {
                return t && t.length
                  ? ((i ? In(t, e, i) : null == e) && (e = 1),
                    Mi(t, 0 > e ? 0 : e))
                  : [];
              }
              function Hn(t, e, i) {
                var n = t ? t.length : 0;
                return n
                  ? ((i ? In(t, e, i) : null == e) && (e = 1),
                    (e = n - (+e || 0)),
                    Mi(t, 0, 0 > e ? 0 : e))
                  : [];
              }
              function Gn(t) {
                return t ? t[0] : T;
              }
              function Yn(t, e, i) {
                var n = t ? t.length : 0;
                if (!n) return -1;
                if ("number" == typeof i) i = 0 > i ? xr(n + i, 0) : i;
                else if (i)
                  return (
                    (i = Bi(t, e)),
                    n > i && (e === e ? e === t[i] : t[i] !== t[i]) ? i : -1
                  );
                return r(t, e, i || 0);
              }
              function Xn(t) {
                var e = t ? t.length : 0;
                return e ? t[e - 1] : T;
              }
              function qn(t) {
                return Nn(t, 1);
              }
              function Kn(t, e, i, n) {
                if (!t || !t.length) return [];
                null != e &&
                  "boolean" != typeof e &&
                  ((n = i), (i = In(t, e, n) ? T : e), (e = !1));
                var s = _n();
                if (
                  ((null != i || s !== ni) && (i = s(i, n, 3)), e && bn() === r)
                ) {
                  e = i;
                  var o;
                  (i = -1), (n = t.length);
                  for (var s = -1, a = []; ++i < n; ) {
                    var h = t[i],
                      c = e ? e(h, i, t) : h;
                    (i && o === c) || ((o = c), (a[++s] = h));
                  }
                  t = a;
                } else t = Oi(t, i);
                return t;
              }
              function Zn(t) {
                if (!t || !t.length) return [];
                var e = -1,
                  i = 0;
                t = Ge(t, function (t) {
                  return En(t) ? ((i = xr(t.length, i)), !0) : void 0;
                });
                for (var n = Ws(i); ++e < i; ) n[e] = Ye(t, Ti(e));
                return n;
              }
              function Jn(t, e, i) {
                return t && t.length
                  ? ((t = Zn(t)),
                    null == e
                      ? t
                      : ((e = Ri(e, i, 4)),
                        Ye(t, function (t) {
                          return qe(t, e, T, !0);
                        })))
                  : [];
              }
              function $n(t, e) {
                var i = -1,
                  n = t ? t.length : 0,
                  s = {};
                for (!n || e || Mo(t[0]) || (e = []); ++i < n; ) {
                  var r = t[i];
                  e ? (s[r] = e[i]) : r && (s[r[0]] = r[1]);
                }
                return s;
              }
              function Qn(t) {
                return (t = e(t)), (t.__chain__ = !0), t;
              }
              function ts(t, e, i) {
                return e.call(i, t);
              }
              function es(t, e, i) {
                var n = Mo(t) ? He : ai;
                return (
                  i && In(t, e, i) && (e = T),
                  ("function" != typeof e || i !== T) && (e = _n(e, i, 3)),
                  n(t, e)
                );
              }
              function is(t, e, i) {
                var n = Mo(t) ? Ge : ci;
                return (e = _n(e, i, 3)), n(t, e);
              }
              function ns(t, e, i, n) {
                var s = t ? Wr(t) : 0;
                return (
                  jn(s) || ((t = Es(t)), (s = t.length)),
                  (i =
                    "number" != typeof i || (n && In(e, i, n))
                      ? 0
                      : 0 > i
                      ? xr(s + i, 0)
                      : i || 0),
                  "string" == typeof t || (!Mo(t) && xs(t))
                    ? s >= i && -1 < t.indexOf(e, i)
                    : !!s && -1 < bn(t, e, i)
                );
              }
              function ss(t, e, i) {
                var n = Mo(t) ? Ye : wi;
                return (e = _n(e, i, 3)), n(t, e);
              }
              function rs(t, e, i) {
                if (i ? In(t, e, i) : null == e) {
                  t = Rn(t);
                  var n = t.length;
                  return n > 0 ? t[Ci(0, n - 1)] : T;
                }
                (i = -1), (t = ks(t));
                var n = t.length,
                  s = n - 1;
                for (e = br(0 > e ? 0 : +e || 0, n); ++i < e; ) {
                  var n = Ci(i, s),
                    r = t[n];
                  (t[n] = t[i]), (t[i] = r);
                }
                return (t.length = e), t;
              }
              function os(t, e, i) {
                var n = Mo(t) ? Je : Ei;
                return (
                  i && In(t, e, i) && (e = T),
                  ("function" != typeof e || i !== T) && (e = _n(e, i, 3)),
                  n(t, e)
                );
              }
              function as(t, e) {
                var i;
                if ("function" != typeof e) {
                  if ("function" != typeof t) throw new Ks(V);
                  var n = t;
                  (t = e), (e = n);
                }
                return function () {
                  return (
                    0 < --t && (i = e.apply(this, arguments)),
                    1 >= t && (e = T),
                    i
                  );
                };
              }
              function hs(t, e, i) {
                function n(e, i) {
                  i && or(i),
                    (h = p = d = T),
                    e &&
                      ((f = fo()), (c = t.apply(u, a)), p || h || (a = u = T));
                }
                function s() {
                  var t = e - (fo() - l);
                  0 >= t || t > e ? n(d, h) : (p = ur(s, t));
                }
                function r() {
                  n(v, p);
                }
                function o() {
                  if (
                    ((a = arguments),
                    (l = fo()),
                    (u = this),
                    (d = v && (p || !m)),
                    !1 === g)
                  )
                    var i = m && !p;
                  else {
                    h || m || (f = l);
                    var n = g - (l - f),
                      o = 0 >= n || n > g;
                    o
                      ? (h && (h = or(h)), (f = l), (c = t.apply(u, a)))
                      : h || (h = ur(r, n));
                  }
                  return (
                    o && p ? (p = or(p)) : p || e === g || (p = ur(s, e)),
                    i && ((o = !0), (c = t.apply(u, a))),
                    !o || p || h || (a = u = T),
                    c
                  );
                }
                var a,
                  h,
                  c,
                  l,
                  u,
                  p,
                  d,
                  f = 0,
                  g = !1,
                  v = !0;
                if ("function" != typeof t) throw new Ks(V);
                if (((e = 0 > e ? 0 : +e || 0), !0 === i))
                  var m = !0,
                    v = !1;
                else
                  vs(i) &&
                    ((m = !!i.leading),
                    (g = "maxWait" in i && xr(+i.maxWait || 0, e)),
                    (v = "trailing" in i ? !!i.trailing : v));
                return (
                  (o.cancel = function () {
                    p && or(p), h && or(h), (f = 0), (h = p = d = T);
                  }),
                  o
                );
              }
              function cs(t, e) {
                function i() {
                  var n = arguments,
                    s = e ? e.apply(this, n) : n[0],
                    r = i.cache;
                  return r.has(s)
                    ? r.get(s)
                    : ((n = t.apply(this, n)), (i.cache = r.set(s, n)), n);
                }
                if ("function" != typeof t || (e && "function" != typeof e))
                  throw new Ks(V);
                return (i.cache = new cs.Cache()), i;
              }
              function ls(t, e) {
                if ("function" != typeof t) throw new Ks(V);
                return (
                  (e = xr(e === T ? t.length - 1 : +e || 0, 0)),
                  function () {
                    for (
                      var i = arguments,
                        n = -1,
                        s = xr(i.length - e, 0),
                        r = Ws(s);
                      ++n < s;

                    )
                      r[n] = i[e + n];
                    switch (e) {
                      case 0:
                        return t.call(this, r);
                      case 1:
                        return t.call(this, i[0], r);
                      case 2:
                        return t.call(this, i[0], i[1], r);
                    }
                    for (s = Ws(e + 1), n = -1; ++n < e; ) s[n] = i[n];
                    return (s[e] = r), t.apply(this, s);
                  }
                );
              }
              function us(t, e) {
                return t > e;
              }
              function ps(t) {
                return (
                  v(t) && En(t) && tr.call(t, "callee") && !cr.call(t, "callee")
                );
              }
              function ds(t, e, i, n) {
                return (
                  (n = (i = "function" == typeof i ? Ri(i, n, 3) : T)
                    ? i(t, e)
                    : T),
                  n === T ? mi(t, e, i) : !!n
                );
              }
              function fs(t) {
                return v(t) && "string" == typeof t.message && ir.call(t) == X;
              }
              function gs(t) {
                return vs(t) && ir.call(t) == q;
              }
              function vs(t) {
                var e = typeof t;
                return !!t && ("object" == e || "function" == e);
              }
              function ms(t) {
                return null == t
                  ? !1
                  : gs(t)
                  ? sr.test(Qs.call(t))
                  : v(t) && Ee.test(t);
              }
              function ys(t) {
                return "number" == typeof t || (v(t) && ir.call(t) == K);
              }
              function ws(t) {
                var e;
                if (
                  !v(t) ||
                  ir.call(t) != Z ||
                  ps(t) ||
                  !(
                    tr.call(t, "constructor") ||
                    ((e = t.constructor),
                    "function" != typeof e || e instanceof e)
                  )
                )
                  return !1;
                var i;
                return (
                  pi(t, function (t, e) {
                    i = e;
                  }),
                  i === T || tr.call(t, i)
                );
              }
              function _s(t) {
                return vs(t) && ir.call(t) == J;
              }
              function xs(t) {
                return "string" == typeof t || (v(t) && ir.call(t) == $);
              }
              function bs(t) {
                return v(t) && jn(t.length) && !!Fe[ir.call(t)];
              }
              function Ts(t, e) {
                return e > t;
              }
              function ks(t) {
                var e = t ? Wr(t) : 0;
                return jn(e) ? (e ? Ue(t) : []) : Es(t);
              }
              function Ss(t) {
                return ii(t, Ps(t));
              }
              function Cs(t) {
                return gi(t, Ps(t));
              }
              function Ps(t) {
                if (null == t) return [];
                vs(t) || (t = Ys(t));
                for (
                  var e = t.length,
                    e = (e && jn(e) && (Mo(t) || ps(t)) && e) || 0,
                    i = t.constructor,
                    n = -1,
                    i = "function" == typeof i && i.prototype === t,
                    s = Ws(e),
                    r = e > 0;
                  ++n < e;

                )
                  s[n] = n + "";
                for (var o in t)
                  (r && Dn(o, e)) ||
                    ("constructor" == o && (i || !tr.call(t, o))) ||
                    s.push(o);
                return s;
              }
              function Ms(t) {
                t = Wn(t);
                for (
                  var e = -1, i = Ro(t), n = i.length, s = Ws(n);
                  ++e < n;

                ) {
                  var r = i[e];
                  s[e] = [r, t[r]];
                }
                return s;
              }
              function Es(t) {
                return ji(t, Ro(t));
              }
              function Ds(t) {
                return (t = a(t)) && t.replace(Ie, u).replace(ke, "");
              }
              function Is(t, e) {
                var i = "";
                if (((t = a(t)), (e = +e), 1 > e || !t || !wr(e))) return i;
                do e % 2 && (i += t), (e = mr(e / 2)), (t += t);
                while (e);
                return i;
              }
              function As(t, e, i) {
                var n = t;
                return (t = a(t))
                  ? (i ? In(n, e, i) : null == e)
                    ? t.slice(w(t), _(t) + 1)
                    : ((e += ""), t.slice(h(t, e), c(t, e) + 1))
                  : t;
              }
              function Os(t, e, i) {
                return (
                  i && In(t, e, i) && (e = T),
                  (t = a(t)),
                  t.match(e || je) || []
                );
              }
              function js(t, e, i) {
                return i && In(t, e, i) && (e = T), v(t) ? Fs(t) : ni(t, e);
              }
              function Ls(t) {
                return t;
              }
              function Fs(t) {
                return _i(si(t, !0));
              }
              function Bs(t, e, i) {
                if (null == i) {
                  var n = vs(e),
                    s = n ? Ro(e) : T;
                  ((s = s && s.length ? gi(e, s) : T) ? s.length : n) ||
                    ((s = !1), (i = e), (e = t), (t = this));
                }
                s || (s = gi(e, Ro(e)));
                var r = !0,
                  n = -1,
                  o = gs(t),
                  a = s.length;
                !1 === i ? (r = !1) : vs(i) && "chain" in i && (r = i.chain);
                for (; ++n < a; ) {
                  i = s[n];
                  var h = e[i];
                  (t[i] = h),
                    o &&
                      (t.prototype[i] = (function (e) {
                        return function () {
                          var i = this.__chain__;
                          if (r || i) {
                            var n = t(this.__wrapped__);
                            return (
                              (n.__actions__ = Ue(this.__actions__)).push({
                                func: e,
                                args: arguments,
                                thisArg: t,
                              }),
                              (n.__chain__ = i),
                              n
                            );
                          }
                          return e.apply(t, Xe([this.value()], arguments));
                        };
                      })(h));
                }
                return t;
              }
              function zs() {}
              function Rs(t) {
                return An(t) ? Ti(t) : ki(t);
              }
              t = t ? Ze.defaults(Ke.Object(), t, Ze.pick(Ke, Le)) : Ke;
              var Ws = t.Array,
                Vs = t.Date,
                Us = t.Error,
                Ns = t.Function,
                Hs = t.Math,
                Gs = t.Number,
                Ys = t.Object,
                Xs = t.RegExp,
                qs = t.String,
                Ks = t.TypeError,
                Zs = Ws.prototype,
                Js = Ys.prototype,
                $s = qs.prototype,
                Qs = Ns.prototype.toString,
                tr = Js.hasOwnProperty,
                er = 0,
                ir = Js.toString,
                nr = Ke._,
                sr = Xs(
                  "^" +
                    Qs.call(tr)
                      .replace(/[\\^$.*+?()[\]{}|]/g, "\\$&")
                      .replace(
                        /hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,
                        "$1.*?"
                      ) +
                    "$"
                ),
                rr = t.ArrayBuffer,
                or = t.clearTimeout,
                ar = t.parseFloat,
                hr = Hs.pow,
                cr = Js.propertyIsEnumerable,
                lr = kn(t, "Set"),
                ur = t.setTimeout,
                pr = Zs.splice,
                dr = t.Uint8Array,
                fr = kn(t, "WeakMap"),
                gr = Hs.ceil,
                vr = kn(Ys, "create"),
                mr = Hs.floor,
                yr = kn(Ws, "isArray"),
                wr = t.isFinite,
                _r = kn(Ys, "keys"),
                xr = Hs.max,
                br = Hs.min,
                Tr = kn(Vs, "now"),
                kr = t.parseInt,
                Sr = Hs.random,
                Cr = Gs.NEGATIVE_INFINITY,
                Pr = Gs.POSITIVE_INFINITY,
                Mr = 4294967294,
                Er = 2147483647,
                Dr = 9007199254740991,
                Ir = fr && new fr(),
                Ar = {};
              (e.support = {}),
                (e.templateSettings = {
                  escape: ve,
                  evaluate: me,
                  interpolate: ye,
                  variable: "",
                  imports: { _: e },
                });
              var Or = (function () {
                  function t() {}
                  return function (e) {
                    if (vs(e)) {
                      t.prototype = e;
                      var i = new t();
                      t.prototype = T;
                    }
                    return i || {};
                  };
                })(),
                jr = Gi(di),
                Lr = Gi(fi, !0),
                Fr = Yi(),
                Br = Yi(!0),
                zr = Ir
                  ? function (t, e) {
                      return Ir.set(t, e), t;
                    }
                  : Ls,
                Rr = Ir
                  ? function (t) {
                      return Ir.get(t);
                    }
                  : zs,
                Wr = Ti("length"),
                Vr = (function () {
                  var t = 0,
                    e = 0;
                  return function (i, n) {
                    var s = fo(),
                      r = B - (s - e);
                    if (((e = s), r > 0)) {
                      if (++t >= F) return i;
                    } else t = 0;
                    return zr(i, n);
                  };
                })(),
                Ur = ls(function (t, e) {
                  return v(t) && En(t) ? oi(t, ui(e, !1, !0)) : [];
                }),
                Nr = tn(),
                Hr = tn(!0),
                Gr = ls(function (t) {
                  for (
                    var e = t.length,
                      i = e,
                      n = Ws(l),
                      s = bn(),
                      o = s === r,
                      a = [];
                    i--;

                  ) {
                    var h = (t[i] = En((h = t[i])) ? h : []);
                    n[i] =
                      o && 120 <= h.length && vr && lr ? new We(i && h) : null;
                  }
                  var o = t[0],
                    c = -1,
                    l = o ? o.length : 0,
                    u = n[0];
                  t: for (; ++c < l; )
                    if (((h = o[c]), 0 > (u ? Ve(u, h) : s(a, h, 0)))) {
                      for (i = e; --i; ) {
                        var p = n[i];
                        if (0 > (p ? Ve(p, h) : s(t[i], h, 0))) continue t;
                      }
                      u && u.push(h), a.push(h);
                    }
                  return a;
                }),
                Yr = ls(function (t, e) {
                  e = ui(e);
                  var i = ei(t, e);
                  return Si(t, e.sort(n)), i;
                }),
                Xr = gn(),
                qr = gn(!0),
                Kr = ls(function (t) {
                  return Oi(ui(t, !1, !0));
                }),
                Zr = ls(function (t, e) {
                  return En(t) ? oi(t, e) : [];
                }),
                Jr = ls(Zn),
                $r = ls(function (t) {
                  var e = t.length,
                    i = e > 2 ? t[e - 2] : T,
                    n = e > 1 ? t[e - 1] : T;
                  return (
                    e > 2 && "function" == typeof i
                      ? (e -= 2)
                      : ((i = e > 1 && "function" == typeof n ? (--e, n) : T),
                        (n = T)),
                    (t.length = e),
                    Jn(t, i, n)
                  );
                }),
                Qr = ls(function (t) {
                  return (
                    (t = ui(t)),
                    this.thru(function (e) {
                      e = Mo(e) ? e : [Wn(e)];
                      for (
                        var i = t,
                          n = -1,
                          s = e.length,
                          r = -1,
                          o = i.length,
                          a = Ws(s + o);
                        ++n < s;

                      )
                        a[n] = e[n];
                      for (; ++r < o; ) a[n++] = i[r];
                      return a;
                    })
                  );
                }),
                to = ls(function (t, e) {
                  return ei(t, ui(e));
                }),
                eo = Ni(function (t, e, i) {
                  tr.call(t, i) ? ++t[i] : (t[i] = 1);
                }),
                io = Qi(jr),
                no = Qi(Lr, !0),
                so = sn(Ne, jr),
                ro = sn(function (t, e) {
                  for (var i = t.length; i-- && !1 !== e(t[i], i, t); );
                  return t;
                }, Lr),
                oo = Ni(function (t, e, i) {
                  tr.call(t, i) ? t[i].push(e) : (t[i] = [e]);
                }),
                ao = Ni(function (t, e, i) {
                  t[i] = e;
                }),
                ho = ls(function (t, e, i) {
                  var n = -1,
                    s = "function" == typeof e,
                    r = An(e),
                    o = En(t) ? Ws(t.length) : [];
                  return (
                    jr(t, function (t) {
                      var a = s ? e : r && null != t ? t[e] : T;
                      o[++n] = a ? a.apply(t, i) : Mn(t, e, i);
                    }),
                    o
                  );
                }),
                co = Ni(
                  function (t, e, i) {
                    t[i ? 0 : 1].push(e);
                  },
                  function () {
                    return [[], []];
                  }
                ),
                lo = ln(qe, jr),
                uo = ln(function (t, e, i, n) {
                  var s = t.length;
                  for (n && s && (i = t[--s]); s--; ) i = e(i, t[s], s, t);
                  return i;
                }, Lr),
                po = ls(function (t, e) {
                  if (null == t) return [];
                  var i = e[2];
                  return (
                    i && In(e[0], e[1], i) && (e.length = 1), Ii(t, ui(e), [])
                  );
                }),
                fo =
                  Tr ||
                  function () {
                    return new Vs().getTime();
                  },
                go = ls(function (t, e, i) {
                  var n = S;
                  if (i.length)
                    var s = y(i, go.placeholder),
                      n = n | D;
                  return vn(t, n, e, i, s);
                }),
                vo = ls(function (t, e) {
                  e = e.length ? ui(e) : Cs(t);
                  for (var i = -1, n = e.length; ++i < n; ) {
                    var s = e[i];
                    t[s] = vn(t[s], S, t);
                  }
                  return t;
                }),
                mo = ls(function (t, e, i) {
                  var n = S | C;
                  if (i.length)
                    var s = y(i, mo.placeholder),
                      n = n | D;
                  return vn(e, n, t, i, s);
                }),
                yo = Zi(M),
                wo = Zi(E),
                _o = ls(function (t, e) {
                  return ri(t, 1, e);
                }),
                xo = ls(function (t, e, i) {
                  return ri(t, e, i);
                }),
                bo = nn(),
                To = nn(!0),
                ko = ls(function (t, e) {
                  if (((e = ui(e)), "function" != typeof t || !He(e, o)))
                    throw new Ks(V);
                  var i = e.length;
                  return ls(function (n) {
                    for (var s = br(n.length, i); s--; ) n[s] = e[s](n[s]);
                    return t.apply(this, n);
                  });
                }),
                So = cn(D),
                Co = cn(I),
                Po = ls(function (t, e) {
                  return vn(t, O, T, T, T, ui(e));
                }),
                Mo =
                  yr ||
                  function (t) {
                    return v(t) && jn(t.length) && ir.call(t) == H;
                  },
                Eo = Hi(bi),
                Do = Hi(function (t, e, i) {
                  return i ? Qe(t, e, i) : ti(t, e);
                }),
                Io = Ji(Do, function (t, e) {
                  return t === T ? e : t;
                }),
                Ao = Ji(Eo, Ln),
                Oo = en(di),
                jo = en(fi),
                Lo = rn(Fr),
                Fo = rn(Br),
                Bo = on(di),
                zo = on(fi),
                Ro = _r
                  ? function (t) {
                      var e = null == t ? T : t.constructor;
                      return ("function" == typeof e && e.prototype === t) ||
                        ("function" != typeof t && En(t))
                        ? zn(t)
                        : vs(t)
                        ? _r(t)
                        : [];
                    }
                  : zn,
                Wo = an(!0),
                Vo = an(),
                Uo = ls(function (t, e) {
                  if (null == t) return {};
                  if ("function" != typeof e[0])
                    return (e = Ye(ui(e), qs)), Fn(t, oi(Ps(t), e));
                  var i = Ri(e[0], e[1], 3);
                  return Bn(t, function (t, e, n) {
                    return !i(t, e, n);
                  });
                }),
                No = ls(function (t, e) {
                  return null == t
                    ? {}
                    : "function" == typeof e[0]
                    ? Bn(t, Ri(e[0], e[1], 3))
                    : Fn(t, ui(e));
                }),
                Ho = qi(function (t, e, i) {
                  return (
                    (e = e.toLowerCase()),
                    t + (i ? e.charAt(0).toUpperCase() + e.slice(1) : e)
                  );
                }),
                Go = qi(function (t, e, i) {
                  return t + (i ? "-" : "") + e.toLowerCase();
                }),
                Yo = hn(),
                Xo = hn(!0),
                qo = qi(function (t, e, i) {
                  return t + (i ? "_" : "") + e.toLowerCase();
                }),
                Ko = qi(function (t, e, i) {
                  return (
                    t +
                    (i ? " " : "") +
                    (e.charAt(0).toUpperCase() + e.slice(1))
                  );
                }),
                Zo = ls(function (t, e) {
                  try {
                    return t.apply(T, e);
                  } catch (i) {
                    return fs(i) ? i : new Us(i);
                  }
                }),
                Jo = ls(function (t, e) {
                  return function (i) {
                    return Mn(i, t, e);
                  };
                }),
                $o = ls(function (t, e) {
                  return function (i) {
                    return Mn(t, i, e);
                  };
                }),
                Qo = fn("ceil"),
                ta = fn("floor"),
                ea = $i(us, Cr),
                ia = $i(Ts, Pr),
                na = fn("round");
              return (
                (e.prototype = i.prototype),
                (m.prototype = Or(i.prototype)),
                (m.prototype.constructor = m),
                (ze.prototype = Or(i.prototype)),
                (ze.prototype.constructor = ze),
                (Re.prototype["delete"] = function (t) {
                  return this.has(t) && delete this.__data__[t];
                }),
                (Re.prototype.get = function (t) {
                  return "__proto__" == t ? T : this.__data__[t];
                }),
                (Re.prototype.has = function (t) {
                  return "__proto__" != t && tr.call(this.__data__, t);
                }),
                (Re.prototype.set = function (t, e) {
                  return "__proto__" != t && (this.__data__[t] = e), this;
                }),
                (We.prototype.push = function (t) {
                  var e = this.data;
                  "string" == typeof t || vs(t)
                    ? e.set.add(t)
                    : (e.hash[t] = !0);
                }),
                (cs.Cache = Re),
                (e.after = function (t, e) {
                  if ("function" != typeof e) {
                    if ("function" != typeof t) throw new Ks(V);
                    var i = t;
                    (t = e), (e = i);
                  }
                  return (
                    (t = wr((t = +t)) ? t : 0),
                    function () {
                      return 1 > --t ? e.apply(this, arguments) : void 0;
                    }
                  );
                }),
                (e.ary = function (t, e, i) {
                  return (
                    i && In(t, e, i) && (e = T),
                    (e = t && null == e ? t.length : xr(+e || 0, 0)),
                    vn(t, A, T, T, T, T, e)
                  );
                }),
                (e.assign = Do),
                (e.at = to),
                (e.before = as),
                (e.bind = go),
                (e.bindAll = vo),
                (e.bindKey = mo),
                (e.callback = js),
                (e.chain = Qn),
                (e.chunk = function (t, e, i) {
                  (e = (i ? In(t, e, i) : null == e) ? 1 : xr(mr(e) || 1, 1)),
                    (i = 0);
                  for (
                    var n = t ? t.length : 0, s = -1, r = Ws(gr(n / e));
                    n > i;

                  )
                    r[++s] = Mi(t, i, (i += e));
                  return r;
                }),
                (e.compact = function (t) {
                  for (
                    var e = -1, i = t ? t.length : 0, n = -1, s = [];
                    ++e < i;

                  ) {
                    var r = t[e];
                    r && (s[++n] = r);
                  }
                  return s;
                }),
                (e.constant = function (t) {
                  return function () {
                    return t;
                  };
                }),
                (e.countBy = eo),
                (e.create = function (t, e, i) {
                  var n = Or(t);
                  return i && In(t, e, i) && (e = T), e ? ti(n, e) : n;
                }),
                (e.curry = yo),
                (e.curryRight = wo),
                (e.debounce = hs),
                (e.defaults = Io),
                (e.defaultsDeep = Ao),
                (e.defer = _o),
                (e.delay = xo),
                (e.difference = Ur),
                (e.drop = Nn),
                (e.dropRight = Hn),
                (e.dropRightWhile = function (t, e, i) {
                  return t && t.length ? Li(t, _n(e, i, 3), !0, !0) : [];
                }),
                (e.dropWhile = function (t, e, i) {
                  return t && t.length ? Li(t, _n(e, i, 3), !0) : [];
                }),
                (e.fill = function (t, e, i, n) {
                  var s = t ? t.length : 0;
                  if (!s) return [];
                  for (
                    i &&
                      "number" != typeof i &&
                      In(t, e, i) &&
                      ((i = 0), (n = s)),
                      s = t.length,
                      i = null == i ? 0 : +i || 0,
                      0 > i && (i = -i > s ? 0 : s + i),
                      n = n === T || n > s ? s : +n || 0,
                      0 > n && (n += s),
                      s = i > n ? 0 : n >>> 0,
                      i >>>= 0;
                    s > i;

                  )
                    t[i++] = e;
                  return t;
                }),
                (e.filter = is),
                (e.flatten = function (t, e, i) {
                  var n = t ? t.length : 0;
                  return i && In(t, e, i) && (e = !1), n ? ui(t, e) : [];
                }),
                (e.flattenDeep = function (t) {
                  return t && t.length ? ui(t, !0) : [];
                }),
                (e.flow = bo),
                (e.flowRight = To),
                (e.forEach = so),
                (e.forEachRight = ro),
                (e.forIn = Lo),
                (e.forInRight = Fo),
                (e.forOwn = Bo),
                (e.forOwnRight = zo),
                (e.functions = Cs),
                (e.groupBy = oo),
                (e.indexBy = ao),
                (e.initial = function (t) {
                  return Hn(t, 1);
                }),
                (e.intersection = Gr),
                (e.invert = function (t, e, i) {
                  i && In(t, e, i) && (e = T), (i = -1);
                  for (var n = Ro(t), s = n.length, r = {}; ++i < s; ) {
                    var o = n[i],
                      a = t[o];
                    e
                      ? tr.call(r, a)
                        ? r[a].push(o)
                        : (r[a] = [o])
                      : (r[a] = o);
                  }
                  return r;
                }),
                (e.invoke = ho),
                (e.keys = Ro),
                (e.keysIn = Ps),
                (e.map = ss),
                (e.mapKeys = Wo),
                (e.mapValues = Vo),
                (e.matches = Fs),
                (e.matchesProperty = function (t, e) {
                  return xi(t, si(e, !0));
                }),
                (e.memoize = cs),
                (e.merge = Eo),
                (e.method = Jo),
                (e.methodOf = $o),
                (e.mixin = Bs),
                (e.modArgs = ko),
                (e.negate = function (t) {
                  if ("function" != typeof t) throw new Ks(V);
                  return function () {
                    return !t.apply(this, arguments);
                  };
                }),
                (e.omit = Uo),
                (e.once = function (t) {
                  return as(2, t);
                }),
                (e.pairs = Ms),
                (e.partial = So),
                (e.partialRight = Co),
                (e.partition = co),
                (e.pick = No),
                (e.pluck = function (t, e) {
                  return ss(t, Rs(e));
                }),
                (e.property = Rs),
                (e.propertyOf = function (t) {
                  return function (e) {
                    return vi(t, Vn(e), e + "");
                  };
                }),
                (e.pull = function () {
                  var t = arguments,
                    e = t[0];
                  if (!e || !e.length) return e;
                  for (var i = 0, n = bn(), s = t.length; ++i < s; )
                    for (var r = 0, o = t[i]; -1 < (r = n(e, o, r)); )
                      pr.call(e, r, 1);
                  return e;
                }),
                (e.pullAt = Yr),
                (e.range = function (t, e, i) {
                  i && In(t, e, i) && (e = i = T),
                    (t = +t || 0),
                    (i = null == i ? 1 : +i || 0),
                    null == e ? ((e = t), (t = 0)) : (e = +e || 0);
                  var n = -1;
                  e = xr(gr((e - t) / (i || 1)), 0);
                  for (var s = Ws(e); ++n < e; ) (s[n] = t), (t += i);
                  return s;
                }),
                (e.rearg = Po),
                (e.reject = function (t, e, i) {
                  var n = Mo(t) ? Ge : ci;
                  return (
                    (e = _n(e, i, 3)),
                    n(t, function (t, i, n) {
                      return !e(t, i, n);
                    })
                  );
                }),
                (e.remove = function (t, e, i) {
                  var n = [];
                  if (!t || !t.length) return n;
                  var s = -1,
                    r = [],
                    o = t.length;
                  for (e = _n(e, i, 3); ++s < o; )
                    (i = t[s]), e(i, s, t) && (n.push(i), r.push(s));
                  return Si(t, r), n;
                }),
                (e.rest = qn),
                (e.restParam = ls),
                (e.set = function (t, e, i) {
                  if (null == t) return t;
                  var n = e + "";
                  e = null != t[n] || An(e, t) ? [n] : Vn(e);
                  for (
                    var n = -1, s = e.length, r = s - 1, o = t;
                    null != o && ++n < s;

                  ) {
                    var a = e[n];
                    vs(o) &&
                      (n == r
                        ? (o[a] = i)
                        : null == o[a] && (o[a] = Dn(e[n + 1]) ? [] : {})),
                      (o = o[a]);
                  }
                  return t;
                }),
                (e.shuffle = function (t) {
                  return rs(t, Pr);
                }),
                (e.slice = function (t, e, i) {
                  var n = t ? t.length : 0;
                  return n
                    ? (i &&
                        "number" != typeof i &&
                        In(t, e, i) &&
                        ((e = 0), (i = n)),
                      Mi(t, e, i))
                    : [];
                }),
                (e.sortBy = function (t, e, i) {
                  if (null == t) return [];
                  i && In(t, e, i) && (e = T);
                  var n = -1;
                  return (
                    (e = _n(e, i, 3)),
                    (t = wi(t, function (t, i, s) {
                      return { a: e(t, i, s), b: ++n, c: t };
                    })),
                    Di(t, l)
                  );
                }),
                (e.sortByAll = po),
                (e.sortByOrder = function (t, e, i, n) {
                  return null == t
                    ? []
                    : (n && In(e, i, n) && (i = T),
                      Mo(e) || (e = null == e ? [] : [e]),
                      Mo(i) || (i = null == i ? [] : [i]),
                      Ii(t, e, i));
                }),
                (e.spread = function (t) {
                  if ("function" != typeof t) throw new Ks(V);
                  return function (e) {
                    return t.apply(this, e);
                  };
                }),
                (e.take = function (t, e, i) {
                  return t && t.length
                    ? ((i ? In(t, e, i) : null == e) && (e = 1),
                      Mi(t, 0, 0 > e ? 0 : e))
                    : [];
                }),
                (e.takeRight = function (t, e, i) {
                  var n = t ? t.length : 0;
                  return n
                    ? ((i ? In(t, e, i) : null == e) && (e = 1),
                      (e = n - (+e || 0)),
                      Mi(t, 0 > e ? 0 : e))
                    : [];
                }),
                (e.takeRightWhile = function (t, e, i) {
                  return t && t.length ? Li(t, _n(e, i, 3), !1, !0) : [];
                }),
                (e.takeWhile = function (t, e, i) {
                  return t && t.length ? Li(t, _n(e, i, 3)) : [];
                }),
                (e.tap = function (t, e, i) {
                  return e.call(i, t), t;
                }),
                (e.throttle = function (t, e, i) {
                  var n = !0,
                    s = !0;
                  if ("function" != typeof t) throw new Ks(V);
                  return (
                    !1 === i
                      ? (n = !1)
                      : vs(i) &&
                        ((n = "leading" in i ? !!i.leading : n),
                        (s = "trailing" in i ? !!i.trailing : s)),
                    hs(t, e, { leading: n, maxWait: +e, trailing: s })
                  );
                }),
                (e.thru = ts),
                (e.times = function (t, e, i) {
                  if (((t = mr(t)), 1 > t || !wr(t))) return [];
                  var n = -1,
                    s = Ws(br(t, 4294967295));
                  for (e = Ri(e, i, 1); ++n < t; )
                    4294967295 > n ? (s[n] = e(n)) : e(n);
                  return s;
                }),
                (e.toArray = ks),
                (e.toPlainObject = Ss),
                (e.transform = function (t, e, i, n) {
                  var s = Mo(t) || bs(t);
                  return (
                    (e = _n(e, n, 4)),
                    null == i &&
                      (s || vs(t)
                        ? ((n = t.constructor),
                          (i = s
                            ? Mo(t)
                              ? new n()
                              : []
                            : Or(gs(n) ? n.prototype : T)))
                        : (i = {})),
                    (s ? Ne : di)(t, function (t, n, s) {
                      return e(i, t, n, s);
                    }),
                    i
                  );
                }),
                (e.union = Kr),
                (e.uniq = Kn),
                (e.unzip = Zn),
                (e.unzipWith = Jn),
                (e.values = Es),
                (e.valuesIn = function (t) {
                  return ji(t, Ps(t));
                }),
                (e.where = function (t, e) {
                  return is(t, _i(e));
                }),
                (e.without = Zr),
                (e.wrap = function (t, e) {
                  return (e = null == e ? Ls : e), vn(e, D, T, [t], []);
                }),
                (e.xor = function () {
                  for (var t = -1, e = arguments.length; ++t < e; ) {
                    var i = arguments[t];
                    if (En(i)) var n = n ? Xe(oi(n, i), oi(i, n)) : i;
                  }
                  return n ? Oi(n) : [];
                }),
                (e.zip = Jr),
                (e.zipObject = $n),
                (e.zipWith = $r),
                (e.backflow = To),
                (e.collect = ss),
                (e.compose = To),
                (e.each = so),
                (e.eachRight = ro),
                (e.extend = Do),
                (e.iteratee = js),
                (e.methods = Cs),
                (e.object = $n),
                (e.select = is),
                (e.tail = qn),
                (e.unique = Kn),
                Bs(e, e),
                (e.add = function (t, e) {
                  return (+t || 0) + (+e || 0);
                }),
                (e.attempt = Zo),
                (e.camelCase = Ho),
                (e.capitalize = function (t) {
                  return (t = a(t)) && t.charAt(0).toUpperCase() + t.slice(1);
                }),
                (e.ceil = Qo),
                (e.clone = function (t, e, i, n) {
                  return (
                    e && "boolean" != typeof e && In(t, e, i)
                      ? (e = !1)
                      : "function" == typeof e && ((n = i), (i = e), (e = !1)),
                    "function" == typeof i ? si(t, e, Ri(i, n, 3)) : si(t, e)
                  );
                }),
                (e.cloneDeep = function (t, e, i) {
                  return "function" == typeof e
                    ? si(t, !0, Ri(e, i, 3))
                    : si(t, !0);
                }),
                (e.deburr = Ds),
                (e.endsWith = function (t, e, i) {
                  (t = a(t)), (e += "");
                  var n = t.length;
                  return (
                    (i = i === T ? n : br(0 > i ? 0 : +i || 0, n)),
                    (i -= e.length),
                    i >= 0 && t.indexOf(e, i) == i
                  );
                }),
                (e.escape = function (t) {
                  return (t = a(t)) && ge.test(t) ? t.replace(de, p) : t;
                }),
                (e.escapeRegExp = function (t) {
                  return (t = a(t)) && Te.test(t)
                    ? t.replace(be, d)
                    : t || "(?:)";
                }),
                (e.every = es),
                (e.find = io),
                (e.findIndex = Nr),
                (e.findKey = Oo),
                (e.findLast = no),
                (e.findLastIndex = Hr),
                (e.findLastKey = jo),
                (e.findWhere = function (t, e) {
                  return io(t, _i(e));
                }),
                (e.first = Gn),
                (e.floor = ta),
                (e.get = function (t, e, i) {
                  return (
                    (t = null == t ? T : vi(t, Vn(e), e + "")), t === T ? i : t
                  );
                }),
                (e.gt = us),
                (e.gte = function (t, e) {
                  return t >= e;
                }),
                (e.has = function (t, e) {
                  if (null == t) return !1;
                  var i = tr.call(t, e);
                  if (!i && !An(e)) {
                    if (
                      ((e = Vn(e)),
                      (t = 1 == e.length ? t : vi(t, Mi(e, 0, -1))),
                      null == t)
                    )
                      return !1;
                    (e = Xn(e)), (i = tr.call(t, e));
                  }
                  return (
                    i || (jn(t.length) && Dn(e, t.length) && (Mo(t) || ps(t)))
                  );
                }),
                (e.identity = Ls),
                (e.includes = ns),
                (e.indexOf = Yn),
                (e.inRange = function (t, e, i) {
                  return (
                    (e = +e || 0),
                    i === T ? ((i = e), (e = 0)) : (i = +i || 0),
                    t >= br(e, i) && t < xr(e, i)
                  );
                }),
                (e.isArguments = ps),
                (e.isArray = Mo),
                (e.isBoolean = function (t) {
                  return !0 === t || !1 === t || (v(t) && ir.call(t) == G);
                }),
                (e.isDate = function (t) {
                  return v(t) && ir.call(t) == Y;
                }),
                (e.isElement = function (t) {
                  return !!t && 1 === t.nodeType && v(t) && !ws(t);
                }),
                (e.isEmpty = function (t) {
                  return null == t
                    ? !0
                    : En(t) &&
                      (Mo(t) || xs(t) || ps(t) || (v(t) && gs(t.splice)))
                    ? !t.length
                    : !Ro(t).length;
                }),
                (e.isEqual = ds),
                (e.isError = fs),
                (e.isFinite = function (t) {
                  return "number" == typeof t && wr(t);
                }),
                (e.isFunction = gs),
                (e.isMatch = function (t, e, i, n) {
                  return (
                    (i = "function" == typeof i ? Ri(i, n, 3) : T),
                    yi(t, Tn(e), i)
                  );
                }),
                (e.isNaN = function (t) {
                  return ys(t) && t != +t;
                }),
                (e.isNative = ms),
                (e.isNull = function (t) {
                  return null === t;
                }),
                (e.isNumber = ys),
                (e.isObject = vs),
                (e.isPlainObject = ws),
                (e.isRegExp = _s),
                (e.isString = xs),
                (e.isTypedArray = bs),
                (e.isUndefined = function (t) {
                  return t === T;
                }),
                (e.kebabCase = Go),
                (e.last = Xn),
                (e.lastIndexOf = function (t, e, i) {
                  var n = t ? t.length : 0;
                  if (!n) return -1;
                  var s = n;
                  if ("number" == typeof i)
                    s = (0 > i ? xr(n + i, 0) : br(i || 0, n - 1)) + 1;
                  else if (i)
                    return (
                      (s = Bi(t, e, !0) - 1),
                      (t = t[s]),
                      (e === e ? e === t : t !== t) ? s : -1
                    );
                  if (e !== e) return g(t, s, !0);
                  for (; s--; ) if (t[s] === e) return s;
                  return -1;
                }),
                (e.lt = Ts),
                (e.lte = function (t, e) {
                  return e >= t;
                }),
                (e.max = ea),
                (e.min = ia),
                (e.noConflict = function () {
                  return (Ke._ = nr), this;
                }),
                (e.noop = zs),
                (e.now = fo),
                (e.pad = function (t, e, i) {
                  (t = a(t)), (e = +e);
                  var n = t.length;
                  return e > n && wr(e)
                    ? ((n = (e - n) / 2),
                      (e = mr(n)),
                      (n = gr(n)),
                      (i = pn("", n, i)),
                      i.slice(0, e) + t + i)
                    : t;
                }),
                (e.padLeft = Yo),
                (e.padRight = Xo),
                (e.parseInt = function (t, e, i) {
                  return (
                    (i ? In(t, e, i) : null == e) ? (e = 0) : e && (e = +e),
                    (t = As(t)),
                    kr(t, e || (Me.test(t) ? 16 : 10))
                  );
                }),
                (e.random = function (t, e, i) {
                  i && In(t, e, i) && (e = i = T);
                  var n = null == t,
                    s = null == e;
                  return (
                    null == i &&
                      (s && "boolean" == typeof t
                        ? ((i = t), (t = 1))
                        : "boolean" == typeof e && ((i = e), (s = !0))),
                    n && s && ((e = 1), (s = !1)),
                    (t = +t || 0),
                    s ? ((e = t), (t = 0)) : (e = +e || 0),
                    i || t % 1 || e % 1
                      ? ((i = Sr()),
                        br(
                          t + i * (e - t + ar("1e-" + ((i + "").length - 1))),
                          e
                        ))
                      : Ci(t, e)
                  );
                }),
                (e.reduce = lo),
                (e.reduceRight = uo),
                (e.repeat = Is),
                (e.result = function (t, e, i) {
                  var n = null == t ? T : t[e];
                  return (
                    n === T &&
                      (null == t ||
                        An(e, t) ||
                        ((e = Vn(e)),
                        (t = 1 == e.length ? t : vi(t, Mi(e, 0, -1))),
                        (n = null == t ? T : t[Xn(e)])),
                      (n = n === T ? i : n)),
                    gs(n) ? n.call(t) : n
                  );
                }),
                (e.round = na),
                (e.runInContext = b),
                (e.size = function (t) {
                  var e = t ? Wr(t) : 0;
                  return jn(e) ? e : Ro(t).length;
                }),
                (e.snakeCase = qo),
                (e.some = os),
                (e.sortedIndex = Xr),
                (e.sortedLastIndex = qr),
                (e.startCase = Ko),
                (e.startsWith = function (t, e, i) {
                  return (
                    (t = a(t)),
                    (i = null == i ? 0 : br(0 > i ? 0 : +i || 0, t.length)),
                    t.lastIndexOf(e, i) == i
                  );
                }),
                (e.sum = function (t, e, i) {
                  if (
                    (i && In(t, e, i) && (e = T),
                    (e = _n(e, i, 3)),
                    1 == e.length)
                  ) {
                    (t = Mo(t) ? t : Rn(t)), (i = t.length);
                    for (var n = 0; i--; ) n += +e(t[i]) || 0;
                    t = n;
                  } else t = Ai(t, e);
                  return t;
                }),
                (e.template = function (t, i, n) {
                  var s = e.templateSettings;
                  n && In(t, i, n) && (i = n = T),
                    (t = a(t)),
                    (i = Qe(ti({}, n || i), s, $e)),
                    (n = Qe(ti({}, i.imports), s.imports, $e));
                  var r,
                    o,
                    h = Ro(n),
                    c = ji(n, h),
                    l = 0;
                  n = i.interpolate || Ae;
                  var u = "__p+='";
                  n = Xs(
                    (i.escape || Ae).source +
                      "|" +
                      n.source +
                      "|" +
                      (n === ye ? Ce : Ae).source +
                      "|" +
                      (i.evaluate || Ae).source +
                      "|$",
                    "g"
                  );
                  var p =
                    "sourceURL" in i
                      ? "//# sourceURL=" + i.sourceURL + "\n"
                      : "";
                  if (
                    (t.replace(n, function (e, i, n, s, a, h) {
                      return (
                        n || (n = s),
                        (u += t.slice(l, h).replace(Oe, f)),
                        i && ((r = !0), (u += "'+__e(" + i + ")+'")),
                        a && ((o = !0), (u += "';" + a + ";\n__p+='")),
                        n && (u += "'+((__t=(" + n + "))==null?'':__t)+'"),
                        (l = h + e.length),
                        e
                      );
                    }),
                    (u += "';"),
                    (i = i.variable) || (u = "with(obj){" + u + "}"),
                    (u = (o ? u.replace(ce, "") : u)
                      .replace(le, "$1")
                      .replace(ue, "$1;")),
                    (u =
                      "function(" +
                      (i || "obj") +
                      "){" +
                      (i ? "" : "obj||(obj={});") +
                      "var __t,__p=''" +
                      (r ? ",__e=_.escape" : "") +
                      (o
                        ? ",__j=Array.prototype.join;function print(){__p+=__j.call(arguments,'')}"
                        : ";") +
                      u +
                      "return __p}"),
                    (i = Zo(function () {
                      return Ns(h, p + "return " + u).apply(T, c);
                    })),
                    (i.source = u),
                    fs(i))
                  )
                    throw i;
                  return i;
                }),
                (e.trim = As),
                (e.trimLeft = function (t, e, i) {
                  var n = t;
                  return (t = a(t))
                    ? t.slice(
                        (i ? In(n, e, i) : null == e) ? w(t) : h(t, e + "")
                      )
                    : t;
                }),
                (e.trimRight = function (t, e, i) {
                  var n = t;
                  return (t = a(t))
                    ? (i ? In(n, e, i) : null == e)
                      ? t.slice(0, _(t) + 1)
                      : t.slice(0, c(t, e + "") + 1)
                    : t;
                }),
                (e.trunc = function (t, e, i) {
                  i && In(t, e, i) && (e = T);
                  var n = j;
                  if (((i = L), null != e))
                    if (vs(e)) {
                      var s = "separator" in e ? e.separator : s,
                        n = "length" in e ? +e.length || 0 : n;
                      i = "omission" in e ? a(e.omission) : i;
                    } else n = +e || 0;
                  if (((t = a(t)), n >= t.length)) return t;
                  if (((n -= i.length), 1 > n)) return i;
                  if (((e = t.slice(0, n)), null == s)) return e + i;
                  if (_s(s)) {
                    if (t.slice(n).search(s)) {
                      var r,
                        o = t.slice(0, n);
                      for (
                        s.global ||
                          (s = Xs(s.source, (Pe.exec(s) || "") + "g")),
                          s.lastIndex = 0;
                        (t = s.exec(o));

                      )
                        r = t.index;
                      e = e.slice(0, null == r ? n : r);
                    }
                  } else
                    t.indexOf(s, n) != n &&
                      ((s = e.lastIndexOf(s)), s > -1 && (e = e.slice(0, s)));
                  return e + i;
                }),
                (e.unescape = function (t) {
                  return (t = a(t)) && fe.test(t) ? t.replace(pe, x) : t;
                }),
                (e.uniqueId = function (t) {
                  var e = ++er;
                  return a(t) + e;
                }),
                (e.words = Os),
                (e.all = es),
                (e.any = os),
                (e.contains = ns),
                (e.eq = ds),
                (e.detect = io),
                (e.foldl = lo),
                (e.foldr = uo),
                (e.head = Gn),
                (e.include = ns),
                (e.inject = lo),
                Bs(
                  e,
                  (function () {
                    var t = {};
                    return (
                      di(e, function (i, n) {
                        e.prototype[n] || (t[n] = i);
                      }),
                      t
                    );
                  })(),
                  !1
                ),
                (e.sample = rs),
                (e.prototype.sample = function (t) {
                  return this.__chain__ || null != t
                    ? this.thru(function (e) {
                        return rs(e, t);
                      })
                    : rs(this.value());
                }),
                (e.VERSION = k),
                Ne(
                  "bind bindKey curry curryRight partial partialRight".split(
                    " "
                  ),
                  function (t) {
                    e[t].placeholder = e;
                  }
                ),
                Ne(["drop", "take"], function (t, e) {
                  (ze.prototype[t] = function (i) {
                    var n = this.__filtered__;
                    if (n && !e) return new ze(this);
                    i = null == i ? 1 : xr(mr(i) || 0, 0);
                    var s = this.clone();
                    return (
                      n
                        ? (s.__takeCount__ = br(s.__takeCount__, i))
                        : s.__views__.push({
                            size: i,
                            type: t + (0 > s.__dir__ ? "Right" : ""),
                          }),
                      s
                    );
                  }),
                    (ze.prototype[t + "Right"] = function (e) {
                      return this.reverse()[t](e).reverse();
                    });
                }),
                Ne(["filter", "map", "takeWhile"], function (t, e) {
                  var i = e + 1,
                    n = i != W;
                  ze.prototype[t] = function (t, e) {
                    var s = this.clone();
                    return (
                      s.__iteratees__.push({ iteratee: _n(t, e, 1), type: i }),
                      (s.__filtered__ = s.__filtered__ || n),
                      s
                    );
                  };
                }),
                Ne(["first", "last"], function (t, e) {
                  var i = "take" + (e ? "Right" : "");
                  ze.prototype[t] = function () {
                    return this[i](1).value()[0];
                  };
                }),
                Ne(["initial", "rest"], function (t, e) {
                  var i = "drop" + (e ? "" : "Right");
                  ze.prototype[t] = function () {
                    return this.__filtered__ ? new ze(this) : this[i](1);
                  };
                }),
                Ne(["pluck", "where"], function (t, e) {
                  var i = e ? "filter" : "map",
                    n = e ? _i : Rs;
                  ze.prototype[t] = function (t) {
                    return this[i](n(t));
                  };
                }),
                (ze.prototype.compact = function () {
                  return this.filter(Ls);
                }),
                (ze.prototype.reject = function (t, e) {
                  return (
                    (t = _n(t, e, 1)),
                    this.filter(function (e) {
                      return !t(e);
                    })
                  );
                }),
                (ze.prototype.slice = function (t, e) {
                  t = null == t ? 0 : +t || 0;
                  var i = this;
                  return i.__filtered__ && (t > 0 || 0 > e)
                    ? new ze(i)
                    : (0 > t ? (i = i.takeRight(-t)) : t && (i = i.drop(t)),
                      e !== T &&
                        ((e = +e || 0),
                        (i = 0 > e ? i.dropRight(-e) : i.take(e - t))),
                      i);
                }),
                (ze.prototype.takeRightWhile = function (t, e) {
                  return this.reverse().takeWhile(t, e).reverse();
                }),
                (ze.prototype.toArray = function () {
                  return this.take(Pr);
                }),
                di(ze.prototype, function (t, i) {
                  var n = /^(?:filter|map|reject)|While$/.test(i),
                    s = /^(?:first|last)$/.test(i),
                    r = e[s ? "take" + ("last" == i ? "Right" : "") : i];
                  r &&
                    (e.prototype[i] = function () {
                      function e(t) {
                        return s && o ? r(t, 1)[0] : r.apply(T, Xe([t], i));
                      }
                      var i = s ? [1] : arguments,
                        o = this.__chain__,
                        a = this.__wrapped__,
                        h = !!this.__actions__.length,
                        c = a instanceof ze,
                        l = i[0],
                        u = c || Mo(a);
                      return (
                        u &&
                          n &&
                          "function" == typeof l &&
                          1 != l.length &&
                          (c = u = !1),
                        (l = { func: ts, args: [e], thisArg: T }),
                        (h = c && !h),
                        s && !o
                          ? h
                            ? ((a = a.clone()),
                              a.__actions__.push(l),
                              t.call(a))
                            : r.call(T, this.value())[0]
                          : !s && u
                          ? ((a = h ? a : new ze(this)),
                            (a = t.apply(a, i)),
                            a.__actions__.push(l),
                            new m(a, o))
                          : this.thru(e)
                      );
                    });
                }),
                Ne(
                  "join pop push replace shift sort splice split unshift".split(
                    " "
                  ),
                  function (t) {
                    var i = (/^(?:replace|split)$/.test(t) ? $s : Zs)[t],
                      n = /^(?:push|sort|unshift)$/.test(t) ? "tap" : "thru",
                      s = /^(?:join|pop|replace|shift)$/.test(t);
                    e.prototype[t] = function () {
                      var t = arguments;
                      return s && !this.__chain__
                        ? i.apply(this.value(), t)
                        : this[n](function (e) {
                            return i.apply(e, t);
                          });
                    };
                  }
                ),
                di(ze.prototype, function (t, i) {
                  var n = e[i];
                  if (n) {
                    var s = n.name + "";
                    (Ar[s] || (Ar[s] = [])).push({ name: i, func: n });
                  }
                }),
                (Ar[un(T, C).name] = [{ name: "wrapper", func: T }]),
                (ze.prototype.clone = function () {
                  var t = new ze(this.__wrapped__);
                  return (
                    (t.__actions__ = Ue(this.__actions__)),
                    (t.__dir__ = this.__dir__),
                    (t.__filtered__ = this.__filtered__),
                    (t.__iteratees__ = Ue(this.__iteratees__)),
                    (t.__takeCount__ = this.__takeCount__),
                    (t.__views__ = Ue(this.__views__)),
                    t
                  );
                }),
                (ze.prototype.reverse = function () {
                  if (this.__filtered__) {
                    var t = new ze(this);
                    (t.__dir__ = -1), (t.__filtered__ = !0);
                  } else (t = this.clone()), (t.__dir__ *= -1);
                  return t;
                }),
                (ze.prototype.value = function () {
                  var t,
                    e = this.__wrapped__.value(),
                    i = this.__dir__,
                    n = Mo(e),
                    s = 0 > i,
                    r = n ? e.length : 0;
                  t = r;
                  for (
                    var o = this.__views__, a = 0, h = -1, c = o.length;
                    ++h < c;

                  ) {
                    var l = o[h],
                      u = l.size;
                    switch (l.type) {
                      case "drop":
                        a += u;
                        break;
                      case "dropRight":
                        t -= u;
                        break;
                      case "take":
                        t = br(t, a + u);
                        break;
                      case "takeRight":
                        a = xr(a, t - u);
                    }
                  }
                  if (
                    ((t = { start: a, end: t }),
                    (o = t.start),
                    (a = t.end),
                    (t = a - o),
                    (s = s ? a : o - 1),
                    (o = this.__iteratees__),
                    (a = o.length),
                    (h = 0),
                    (c = br(t, this.__takeCount__)),
                    !n || z > r || (r == t && c == t))
                  )
                    return Fi(e, this.__actions__);
                  n = [];
                  t: for (; t-- && c > h; ) {
                    for (s += i, r = -1, l = e[s]; ++r < a; ) {
                      var p = o[r],
                        u = p.type,
                        p = p.iteratee(l);
                      if (u == W) l = p;
                      else if (!p) {
                        if (u == R) continue t;
                        break t;
                      }
                    }
                    n[h++] = l;
                  }
                  return n;
                }),
                (e.prototype.chain = function () {
                  return Qn(this);
                }),
                (e.prototype.commit = function () {
                  return new m(this.value(), this.__chain__);
                }),
                (e.prototype.concat = Qr),
                (e.prototype.plant = function (t) {
                  for (var e, n = this; n instanceof i; ) {
                    var s = Un(n);
                    e ? (r.__wrapped__ = s) : (e = s);
                    var r = s,
                      n = n.__wrapped__;
                  }
                  return (r.__wrapped__ = t), e;
                }),
                (e.prototype.reverse = function () {
                  function t(t) {
                    return t.reverse();
                  }
                  var e = this.__wrapped__;
                  return e instanceof ze
                    ? (this.__actions__.length && (e = new ze(this)),
                      (e = e.reverse()),
                      e.__actions__.push({ func: ts, args: [t], thisArg: T }),
                      new m(e, this.__chain__))
                    : this.thru(t);
                }),
                (e.prototype.toString = function () {
                  return this.value() + "";
                }),
                (e.prototype.run =
                  e.prototype.toJSON =
                  e.prototype.valueOf =
                  e.prototype.value =
                    function () {
                      return Fi(this.__wrapped__, this.__actions__);
                    }),
                (e.prototype.collect = e.prototype.map),
                (e.prototype.head = e.prototype.first),
                (e.prototype.select = e.prototype.filter),
                (e.prototype.tail = e.prototype.rest),
                e
              );
            }
            var T,
              k = "3.10.1",
              S = 1,
              C = 2,
              P = 4,
              M = 8,
              E = 16,
              D = 32,
              I = 64,
              A = 128,
              O = 256,
              j = 30,
              L = "...",
              F = 150,
              B = 16,
              z = 200,
              R = 1,
              W = 2,
              V = "Expected a function",
              U = "__lodash_placeholder__",
              N = "[object Arguments]",
              H = "[object Array]",
              G = "[object Boolean]",
              Y = "[object Date]",
              X = "[object Error]",
              q = "[object Function]",
              K = "[object Number]",
              Z = "[object Object]",
              J = "[object RegExp]",
              $ = "[object String]",
              Q = "[object ArrayBuffer]",
              te = "[object Float32Array]",
              ee = "[object Float64Array]",
              ie = "[object Int8Array]",
              ne = "[object Int16Array]",
              se = "[object Int32Array]",
              re = "[object Uint8Array]",
              oe = "[object Uint8ClampedArray]",
              ae = "[object Uint16Array]",
              he = "[object Uint32Array]",
              ce = /\b__p\+='';/g,
              le = /\b(__p\+=)''\+/g,
              ue = /(__e\(.*?\)|\b__t\))\+'';/g,
              pe = /&(?:amp|lt|gt|quot|#39|#96);/g,
              de = /[&<>"'`]/g,
              fe = RegExp(pe.source),
              ge = RegExp(de.source),
              ve = /<%-([\s\S]+?)%>/g,
              me = /<%([\s\S]+?)%>/g,
              ye = /<%=([\s\S]+?)%>/g,
              we = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\n\\]|\\.)*?\1)\]/,
              _e = /^\w*$/,
              xe =
                /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\n\\]|\\.)*?)\2)\]/g,
              be =
                /^[:!,]|[\\^$.*+?()[\]{}|\/]|(^[0-9a-fA-Fnrtuvx])|([\n\r\u2028\u2029])/g,
              Te = RegExp(be.source),
              ke = /[\u0300-\u036f\ufe20-\ufe23]/g,
              Se = /\\(\\)?/g,
              Ce = /\$\{([^\\}]*(?:\\.[^\\}]*)*)\}/g,
              Pe = /\w*$/,
              Me = /^0[xX]/,
              Ee = /^\[object .+?Constructor\]$/,
              De = /^\d+$/,
              Ie = /[\xc0-\xd6\xd8-\xde\xdf-\xf6\xf8-\xff]/g,
              Ae = /($^)/,
              Oe = /['\n\r\u2028\u2029\\]/g,
              je = RegExp(
                "[A-Z\\xc0-\\xd6\\xd8-\\xde]+(?=[A-Z\\xc0-\\xd6\\xd8-\\xde][a-z\\xdf-\\xf6\\xf8-\\xff]+)|[A-Z\\xc0-\\xd6\\xd8-\\xde]?[a-z\\xdf-\\xf6\\xf8-\\xff]+|[A-Z\\xc0-\\xd6\\xd8-\\xde]+|[0-9]+",
                "g"
              ),
              Le =
                "Array ArrayBuffer Date Error Float32Array Float64Array Function Int8Array Int16Array Int32Array Math Number Object RegExp Set String _ clearTimeout isFinite parseFloat parseInt setTimeout TypeError Uint8Array Uint8ClampedArray Uint16Array Uint32Array WeakMap".split(
                  " "
                ),
              Fe = {};
            (Fe[te] =
              Fe[ee] =
              Fe[ie] =
              Fe[ne] =
              Fe[se] =
              Fe[re] =
              Fe[oe] =
              Fe[ae] =
              Fe[he] =
                !0),
              (Fe[N] =
                Fe[H] =
                Fe[Q] =
                Fe[G] =
                Fe[Y] =
                Fe[X] =
                Fe[q] =
                Fe["[object Map]"] =
                Fe[K] =
                Fe[Z] =
                Fe[J] =
                Fe["[object Set]"] =
                Fe[$] =
                Fe["[object WeakMap]"] =
                  !1);
            var Be = {};
            (Be[N] =
              Be[H] =
              Be[Q] =
              Be[G] =
              Be[Y] =
              Be[te] =
              Be[ee] =
              Be[ie] =
              Be[ne] =
              Be[se] =
              Be[K] =
              Be[Z] =
              Be[J] =
              Be[$] =
              Be[re] =
              Be[oe] =
              Be[ae] =
              Be[he] =
                !0),
              (Be[X] =
                Be[q] =
                Be["[object Map]"] =
                Be["[object Set]"] =
                Be["[object WeakMap]"] =
                  !1);
            var ze = {
                À: "A",
                Á: "A",
                Â: "A",
                Ã: "A",
                Ä: "A",
                Å: "A",
                à: "a",
                á: "a",
                â: "a",
                ã: "a",
                ä: "a",
                å: "a",
                Ç: "C",
                ç: "c",
                Ð: "D",
                ð: "d",
                È: "E",
                É: "E",
                Ê: "E",
                Ë: "E",
                è: "e",
                é: "e",
                ê: "e",
                ë: "e",
                Ì: "I",
                Í: "I",
                Î: "I",
                Ï: "I",
                ì: "i",
                í: "i",
                î: "i",
                ï: "i",
                Ñ: "N",
                ñ: "n",
                Ò: "O",
                Ó: "O",
                Ô: "O",
                Õ: "O",
                Ö: "O",
                Ø: "O",
                ò: "o",
                ó: "o",
                ô: "o",
                õ: "o",
                ö: "o",
                ø: "o",
                Ù: "U",
                Ú: "U",
                Û: "U",
                Ü: "U",
                ù: "u",
                ú: "u",
                û: "u",
                ü: "u",
                Ý: "Y",
                ý: "y",
                ÿ: "y",
                Æ: "Ae",
                æ: "ae",
                Þ: "Th",
                þ: "th",
                ß: "ss",
              },
              Re = {
                "&": "&amp;",
                "<": "&lt;",
                ">": "&gt;",
                '"': "&quot;",
                "'": "&#39;",
                "`": "&#96;",
              },
              We = {
                "&amp;": "&",
                "&lt;": "<",
                "&gt;": ">",
                "&quot;": '"',
                "&#39;": "'",
                "&#96;": "`",
              },
              Ve = { function: !0, object: !0 },
              Ue = {
                0: "x30",
                1: "x31",
                2: "x32",
                3: "x33",
                4: "x34",
                5: "x35",
                6: "x36",
                7: "x37",
                8: "x38",
                9: "x39",
                A: "x41",
                B: "x42",
                C: "x43",
                D: "x44",
                E: "x45",
                F: "x46",
                a: "x61",
                b: "x62",
                c: "x63",
                d: "x64",
                e: "x65",
                f: "x66",
                n: "x6e",
                r: "x72",
                t: "x74",
                u: "x75",
                v: "x76",
                x: "x78",
              },
              Ne = {
                "\\": "\\",
                "'": "'",
                "\n": "n",
                "\r": "r",
                "\u2028": "u2028",
                "\u2029": "u2029",
              },
              He = Ve[typeof i] && i && !i.nodeType && i,
              Ge = Ve[typeof e] && e && !e.nodeType && e,
              Ye = Ve[typeof self] && self && self.Object && self,
              Xe = Ve[typeof window] && window && window.Object && window,
              qe = Ge && Ge.exports === He && He,
              Ke =
                (He && Ge && "object" == typeof t && t && t.Object && t) ||
                (Xe !== (this && this.window) && Xe) ||
                Ye ||
                this,
              Ze = b();
            "function" == typeof define &&
            "object" == typeof define.amd &&
            define.amd
              ? ((Ke._ = Ze),
                define(function () {
                  return Ze;
                }))
              : He && Ge
              ? qe
                ? ((Ge.exports = Ze)._ = Ze)
                : (He._ = Ze)
              : (Ke._ = Ze);
          }).call(this);
        }).call(
          this,
          "undefined" != typeof global
            ? global
            : "undefined" != typeof self
            ? self
            : "undefined" != typeof window
            ? window
            : {}
        );
      },
      {},
    ],
    78: [
      function () {
        !(function () {
          if (
            ("undefined" == typeof window.performance &&
              (window.performance = {}),
            !window.performance.now)
          ) {
            var t = Date.now();
            performance.timing &&
              performance.timing.navigationStart &&
              (t = performance.timing.navigationStart),
              (window.performance.now = function () {
                return Date.now() - t;
              });
          }
        })();
      },
      {},
    ],
    79: [
      function (t, e, i) {
        !(function () {
          if (
            ("performance" in window == !1 && (window.performance = {}),
            (Date.now =
              Date.now ||
              function () {
                return new Date().getTime();
              }),
            "now" in window.performance == !1)
          ) {
            var t =
              window.performance.timing &&
              window.performance.timing.navigationStart
                ? window.performance.timing.navigationStart
                : Date.now();
            window.performance.now = function () {
              return Date.now() - t;
            };
          }
        })();
        var n =
          n ||
          (function () {
            var t = [];
            return {
              getAll: function () {
                return t;
              },
              removeAll: function () {
                t = [];
              },
              add: function (e) {
                t.push(e);
              },
              remove: function (e) {
                var i = t.indexOf(e);
                -1 !== i && t.splice(i, 1);
              },
              update: function (e) {
                if (0 === t.length) return !1;
                var i = 0;
                for (
                  e = void 0 !== e ? e : window.performance.now();
                  i < t.length;

                )
                  t[i].update(e) ? i++ : t.splice(i, 1);
                return !0;
              },
            };
          })();
        (n.Tween = function (t) {
          var e = t,
            i = {},
            s = {},
            r = {},
            o = 1e3,
            a = 0,
            h = !1,
            c = !1,
            l = !1,
            u = 0,
            p = null,
            d = n.Easing.Linear.None,
            f = n.Interpolation.Linear,
            g = [],
            v = null,
            m = !1,
            y = null,
            w = null,
            _ = null;
          for (var x in t) i[x] = parseFloat(t[x], 10);
          (this.to = function (t, e) {
            return void 0 !== e && (o = e), (s = t), this;
          }),
            (this.start = function (t) {
              n.add(this),
                (c = !0),
                (m = !1),
                (p = void 0 !== t ? t : window.performance.now()),
                (p += u);
              for (var o in s) {
                if (s[o] instanceof Array) {
                  if (0 === s[o].length) continue;
                  s[o] = [e[o]].concat(s[o]);
                }
                (i[o] = e[o]),
                  i[o] instanceof Array == !1 && (i[o] *= 1),
                  (r[o] = i[o] || 0);
              }
              return this;
            }),
            (this.stop = function () {
              return c
                ? (n.remove(this),
                  (c = !1),
                  null !== _ && _.call(e),
                  this.stopChainedTweens(),
                  this)
                : this;
            }),
            (this.stopChainedTweens = function () {
              for (var t = 0, e = g.length; e > t; t++) g[t].stop();
            }),
            (this.delay = function (t) {
              return (u = t), this;
            }),
            (this.repeat = function (t) {
              return (a = t), this;
            }),
            (this.yoyo = function (t) {
              return (h = t), this;
            }),
            (this.easing = function (t) {
              return (d = t), this;
            }),
            (this.interpolation = function (t) {
              return (f = t), this;
            }),
            (this.chain = function () {
              return (g = arguments), this;
            }),
            (this.onStart = function (t) {
              return (v = t), this;
            }),
            (this.onUpdate = function (t) {
              return (y = t), this;
            }),
            (this.onComplete = function (t) {
              return (w = t), this;
            }),
            (this.onStop = function (t) {
              return (_ = t), this;
            }),
            (this.update = function (t) {
              var n, c, _;
              if (p > t) return !0;
              m === !1 && (null !== v && v.call(e), (m = !0)),
                (c = (t - p) / o),
                (c = c > 1 ? 1 : c),
                (_ = d(c));
              for (n in s) {
                var x = i[n] || 0,
                  b = s[n];
                b instanceof Array
                  ? (e[n] = f(b, _))
                  : ("string" == typeof b && (b = x + parseFloat(b, 10)),
                    "number" == typeof b && (e[n] = x + (b - x) * _));
              }
              if ((null !== y && y.call(e, _), 1 === c)) {
                if (a > 0) {
                  isFinite(a) && a--;
                  for (n in r) {
                    if (
                      ("string" == typeof s[n] &&
                        (r[n] = r[n] + parseFloat(s[n], 10)),
                      h)
                    ) {
                      var T = r[n];
                      (r[n] = s[n]), (s[n] = T);
                    }
                    i[n] = r[n];
                  }
                  return h && (l = !l), (p = t + u), !0;
                }
                null !== w && w.call(e);
                for (var k = 0, S = g.length; S > k; k++) g[k].start(p + o);
                return !1;
              }
              return !0;
            });
        }),
          (n.Easing = {
            Linear: {
              None: function (t) {
                return t;
              },
            },
            Quadratic: {
              In: function (t) {
                return t * t;
              },
              Out: function (t) {
                return t * (2 - t);
              },
              InOut: function (t) {
                return (t *= 2) < 1 ? 0.5 * t * t : -0.5 * (--t * (t - 2) - 1);
              },
            },
            Cubic: {
              In: function (t) {
                return t * t * t;
              },
              Out: function (t) {
                return --t * t * t + 1;
              },
              InOut: function (t) {
                return (t *= 2) < 1
                  ? 0.5 * t * t * t
                  : 0.5 * ((t -= 2) * t * t + 2);
              },
            },
            Quartic: {
              In: function (t) {
                return t * t * t * t;
              },
              Out: function (t) {
                return 1 - --t * t * t * t;
              },
              InOut: function (t) {
                return (t *= 2) < 1
                  ? 0.5 * t * t * t * t
                  : -0.5 * ((t -= 2) * t * t * t - 2);
              },
            },
            Quintic: {
              In: function (t) {
                return t * t * t * t * t;
              },
              Out: function (t) {
                return --t * t * t * t * t + 1;
              },
              InOut: function (t) {
                return (t *= 2) < 1
                  ? 0.5 * t * t * t * t * t
                  : 0.5 * ((t -= 2) * t * t * t * t + 2);
              },
            },
            Sinusoidal: {
              In: function (t) {
                return 1 - Math.cos((t * Math.PI) / 2);
              },
              Out: function (t) {
                return Math.sin((t * Math.PI) / 2);
              },
              InOut: function (t) {
                return 0.5 * (1 - Math.cos(Math.PI * t));
              },
            },
            Exponential: {
              In: function (t) {
                return 0 === t ? 0 : Math.pow(1024, t - 1);
              },
              Out: function (t) {
                return 1 === t ? 1 : 1 - Math.pow(2, -10 * t);
              },
              InOut: function (t) {
                return 0 === t
                  ? 0
                  : 1 === t
                  ? 1
                  : (t *= 2) < 1
                  ? 0.5 * Math.pow(1024, t - 1)
                  : 0.5 * (-Math.pow(2, -10 * (t - 1)) + 2);
              },
            },
            Circular: {
              In: function (t) {
                return 1 - Math.sqrt(1 - t * t);
              },
              Out: function (t) {
                return Math.sqrt(1 - --t * t);
              },
              InOut: function (t) {
                return (t *= 2) < 1
                  ? -0.5 * (Math.sqrt(1 - t * t) - 1)
                  : 0.5 * (Math.sqrt(1 - (t -= 2) * t) + 1);
              },
            },
            Elastic: {
              In: function (t) {
                var e,
                  i = 0.1,
                  n = 0.4;
                return 0 === t
                  ? 0
                  : 1 === t
                  ? 1
                  : (!i || 1 > i
                      ? ((i = 1), (e = n / 4))
                      : (e = (n * Math.asin(1 / i)) / (2 * Math.PI)),
                    -(
                      i *
                      Math.pow(2, 10 * (t -= 1)) *
                      Math.sin((2 * (t - e) * Math.PI) / n)
                    ));
              },
              Out: function (t) {
                var e,
                  i = 0.1,
                  n = 0.4;
                return 0 === t
                  ? 0
                  : 1 === t
                  ? 1
                  : (!i || 1 > i
                      ? ((i = 1), (e = n / 4))
                      : (e = (n * Math.asin(1 / i)) / (2 * Math.PI)),
                    i *
                      Math.pow(2, -10 * t) *
                      Math.sin((2 * (t - e) * Math.PI) / n) +
                      1);
              },
              InOut: function (t) {
                var e,
                  i = 0.1,
                  n = 0.4;
                return 0 === t
                  ? 0
                  : 1 === t
                  ? 1
                  : (!i || 1 > i
                      ? ((i = 1), (e = n / 4))
                      : (e = (n * Math.asin(1 / i)) / (2 * Math.PI)),
                    (t *= 2) < 1
                      ? -0.5 *
                        i *
                        Math.pow(2, 10 * (t -= 1)) *
                        Math.sin((2 * (t - e) * Math.PI) / n)
                      : i *
                          Math.pow(2, -10 * (t -= 1)) *
                          Math.sin((2 * (t - e) * Math.PI) / n) *
                          0.5 +
                        1);
              },
            },
            Back: {
              In: function (t) {
                var e = 1.70158;
                return t * t * ((e + 1) * t - e);
              },
              Out: function (t) {
                var e = 1.70158;
                return --t * t * ((e + 1) * t + e) + 1;
              },
              InOut: function (t) {
                var e = 2.5949095;
                return (t *= 2) < 1
                  ? 0.5 * t * t * ((e + 1) * t - e)
                  : 0.5 * ((t -= 2) * t * ((e + 1) * t + e) + 2);
              },
            },
            Bounce: {
              In: function (t) {
                return 1 - n.Easing.Bounce.Out(1 - t);
              },
              Out: function (t) {
                return 1 / 2.75 > t
                  ? 7.5625 * t * t
                  : 2 / 2.75 > t
                  ? 7.5625 * (t -= 1.5 / 2.75) * t + 0.75
                  : 2.5 / 2.75 > t
                  ? 7.5625 * (t -= 2.25 / 2.75) * t + 0.9375
                  : 7.5625 * (t -= 2.625 / 2.75) * t + 0.984375;
              },
              InOut: function (t) {
                return 0.5 > t
                  ? 0.5 * n.Easing.Bounce.In(2 * t)
                  : 0.5 * n.Easing.Bounce.Out(2 * t - 1) + 0.5;
              },
            },
          }),
          (n.Interpolation = {
            Linear: function (t, e) {
              var i = t.length - 1,
                s = i * e,
                r = Math.floor(s),
                o = n.Interpolation.Utils.Linear;
              return 0 > e
                ? o(t[0], t[1], s)
                : e > 1
                ? o(t[i], t[i - 1], i - s)
                : o(t[r], t[r + 1 > i ? i : r + 1], s - r);
            },
            Bezier: function (t, e) {
              for (
                var i = 0,
                  s = t.length - 1,
                  r = Math.pow,
                  o = n.Interpolation.Utils.Bernstein,
                  a = 0;
                s >= a;
                a++
              )
                i += r(1 - e, s - a) * r(e, a) * t[a] * o(s, a);
              return i;
            },
            CatmullRom: function (t, e) {
              var i = t.length - 1,
                s = i * e,
                r = Math.floor(s),
                o = n.Interpolation.Utils.CatmullRom;
              return t[0] === t[i]
                ? (0 > e && (r = Math.floor((s = i * (1 + e)))),
                  o(
                    t[(r - 1 + i) % i],
                    t[r],
                    t[(r + 1) % i],
                    t[(r + 2) % i],
                    s - r
                  ))
                : 0 > e
                ? t[0] - (o(t[0], t[0], t[1], t[1], -s) - t[0])
                : e > 1
                ? t[i] - (o(t[i], t[i], t[i - 1], t[i - 1], s - i) - t[i])
                : o(
                    t[r ? r - 1 : 0],
                    t[r],
                    t[r + 1 > i ? i : r + 1],
                    t[r + 2 > i ? i : r + 2],
                    s - r
                  );
            },
            Utils: {
              Linear: function (t, e, i) {
                return (e - t) * i + t;
              },
              Bernstein: function (t, e) {
                var i = n.Interpolation.Utils.Factorial;
                return i(t) / i(e) / i(t - e);
              },
              Factorial: (function () {
                var t = [1];
                return function (e) {
                  var i = 1;
                  if (t[e]) return t[e];
                  for (var n = e; n > 1; n--) i *= n;
                  return (t[e] = i), i;
                };
              })(),
              CatmullRom: function (t, e, i, n, s) {
                var r = 0.5 * (i - t),
                  o = 0.5 * (n - e),
                  a = s * s,
                  h = s * a;
                return (
                  (2 * e - 2 * i + r + o) * h +
                  (-3 * e + 3 * i - 2 * r - o) * a +
                  r * s +
                  e
                );
              },
            },
          }),
          (function (t) {
            "function" == typeof define && define.amd
              ? define([], function () {
                  return n;
                })
              : "object" == typeof i
              ? (e.exports = n)
              : (t.TWEEN = n);
          })(this);
      },
      {},
    ],
  },
  {},
  [2]
);

function load() {
  // this is more hacky than i'd like it to be but it works
  let zv = GameManager.game.currentScene.camera.position.factor(0),
      vector = (x = 0, y = 0) => {return zv.factor(0).add({x, y})},
      hovered,
      selected,
      hoverList,
      selectList,
      // used for recreating parts of the selectList when playing
      // will be done in the sector the player's in and nearby sectors, and just left until movement starts again
      hoverPhysicsList = {},
      selectPhysicsList = {},
      selectOffset = vector(),
      // since this is used to track, not render, we can get away with only having one of these
      pointOffset = vector(),
      isHoverList = false,
      isSelectList = false,
      hoverPoint,
      selectPoint,
      connected,
      connectedPoint,
      isSelectedUpdated = true,
      // used to temporarily recreate the selected line while you're playing the track (so it feels nicer)
      isSelectIntangible = true,
      tempSelect;
  // for debugging
  let frameMinDist,
      frameBestLine;
  // render info
  let powerups = {
      // the colors for these are the last 2 arguments, and go normal color, nostalgia mode
      "bomb": [20, '#d12929', '#f00'],
      "boost": [Math.sqrt(1000), '#8ac932', '#ff0'],
      "checkpoint": [26, '#826cdc', '#00f'],
      "gravity": [Math.sqrt(1000), '#376eb7', '#0f0'],
      "slowmo": [26, '#733', '#733'],
      "goal": [26, '#fae335', '#ff0'],
      "teleport": [Math.sqrt(1000), '#dd45ec', '#f0f'],
      "antigravity": [Math.sqrt(1000), '#09faf3', '#0ff'],
      "blob": [30, '#a784c5', '#cdbade'],
      "balloon": [30, '#f02728', '#f57070'],
      "helicopter": [30, '#f2902e', '#f6b36f'],
      "truck": [30, '#94d44e', '#b9e38c'],
  },
      polyMod = GameManager.game?.mod;
  window.selected = selected;
  window.hovered = hovered;
  const HOVER_DIST = 10;
  // old line - used to work until mysterious unannounced chrome changes killed it
  //class P extends GameManager.game.currentScene.toolHandler.tools.straightline.__proto__.__proto__.constructor {
  class SelectTool {
      constructor(s) {
          // new line - since i can't seem to use super anymore, i can accomplish the same thing with a temporary variable
          let supa = Object.create(GameManager.game.currentScene.toolHandler.tools.straightline.__proto__.__proto__);
          for (let i in supa) {
              if (!this[i])
                  this.__proto__[i] = supa[i];
          }
          this.supa = supa;
          this.toolUpdate = supa.update;
          console.log(supa, this);
          supa.init.apply(this, [s]);
          this.toolHandler = s;
          this.p1 = undefined;
          this.p2 = undefined;
          this.dashOffset = 0;
          this.name = 'select';
          this.down = false;
          // make a copy
          this.oldMouse = this.mouse.touch.real.factor(1);
      }

      get selected() {
          return isSelectList ? selectList : selected ? [selected] : [];
      }

      get hovered() {
          return isHoverList ? hoverList : hovered ? [hovered] : [];
      }

      press() {
          this.down = true;
          if (hovered && hovered === tempSelect?.[0]) {
              hovered = selected;
              console.log('clicked on temp :P');
              if (selectPoint && selected) {
                  if (selectPoint.x == selected.p1.x && selectPoint.y == selected.p1.y) {
                      selectPoint = selected.p1;
                  } else if (selectPoint.x == selected.p2.x && selectPoint.y == selected.p2.y) {
                      selectPoint = selected.p2;
                  }
              }
          }
          if (selected && selected != hovered) {
              let a = [recreate(selected)];
              if (selectPoint && connected) {
                  connected.removeAllReferences();
                  a = [a[0], recreate(connected)];
                  connected = connected.newVersion;
              }
              if (selectOffset.x || selectOffset.y) {
                  let {x, y} = selectOffset;
                  this.scene.toolHandler.addActionToTimeline({
                      objects: a,
                      type: 'transform',
                      move: {x, y},
                      applied: true,
                  });
                  // idk man this is wack
                  if (selected.p1) {
                      selected.p1.inc(selectOffset);
                      selected.p2.inc(selectOffset);
                  }
                  selectOffset = vector();
              } else if (pointOffset.x || pointOffset.y) {
                  let pointName = (selectPoint.x == selected.p1.x && selectPoint.y == selected.p1.y) ? 'p1' : 'p2',
                      points = [pointName],
                      objects = [selected],
                      {x, y} = pointOffset;
                  if (connected) {
                      points.push(connectedPoint);
                      objects.push(connected);
                  }
                  this.scene.toolHandler.addActionToTimeline({
                      objects,
                      points,
                      type: 'transform',
                      move: {x, y},
                      applied: true,
                  });
                  pointOffset = vector();
              }
              connected = undefined;
              console.log('recreated', a);
          }
          if (isSelectList && (hovered || !pointrect(this.mouse.touch.real, this.p1, this.p2))) {
              for (let i of selectList) {
                  i.removeAllReferences();
              }
              let a = selectList.map(s => recreate(s));
              if (selectOffset.x || selectOffset.y) {
                  let {x, y} = selectOffset;
                  this.scene.toolHandler.addActionToTimeline({
                      objects: a,
                      type: 'transform',
                      move: {x, y},
                      applied: true,
                  });
              }
              console.log('recreated', a);
          }
          if (hovered) {
              // TO-DO: find a better place to put / store this
              let oldConnected = [connected, connectedPoint];
              if (hovered != selected)
                  selectOffset = vector();
              else {
                  tempSelect?.[0]?.removeAllReferences?.();
                  tempSelect = undefined;
                  isSelectIntangible = true;
                  if (selectPoint && connected) {
                      connected.removeAllReferences();
                      recreate(connected);
                      connected = undefined;
                  }
              }
              selected = hovered;
              isHoverList = false;
              window.selected = hovered;
              if (selected) {
                  console.log('selected', selected);
                  selected.removeAllReferences();
                  let minDist = HOVER_DIST / this.scene.camera.zoom,
                      minPoint = undefined;
                  if (selected.p1) {
                      for (let i of [selected.p1, selected.p2]) {
                          let dist = pointsdf(this.mouse.touch.real, i.add(selectOffset));
                          if (dist < minDist) {
                              minDist = dist;
                              minPoint = i;
                          }
                      }
                      if (minPoint) {
                          let size = this.scene.track.settings.drawSectorSize,
                              sectors = this.scene.track.sectors.drawSectors,
                              sectorPos = minPoint.factor(1 / size),
                              sector = sectors[Math.floor(sectorPos.x)]?.[Math.floor(sectorPos.y)],
                              lines = sector?.['highlight' in selected ? "physicsLines" : "sceneryLines"] || [];
                          if (connected && !connected.newVersion) {
                              connected.removeAllReferences();
                              recreate(connected);
                          }
                          connected = undefined;
                          for (let i of lines) {
                              if (!i.remove && i.p1.x == minPoint.x && i.p1.y == minPoint.y) {
                                  connected = i;
                                  connectedPoint = 'p1';
                                  break;
                              } else if (!i.remove && i.p2.x == minPoint.x && i.p2.y == minPoint.y) {
                                  connected = i;
                                  connectedPoint = 'p2';
                                  break;
                              }
                          }
                          if (connected) {
                              connected.removeAllReferences();
                              console.log('connected to', connected);
                          }
                      }
                  }
                  if (selectPoint != minPoint) {
                      if (selectPoint == undefined && (selectOffset.x || selectOffset.y)) {
                          let {x, y} = selectOffset;
                          this.scene.toolHandler.addActionToTimeline({
                              objects: [selected],
                              type: 'transform',
                              move: {x, y},
                              applied: true,
                          });
                          selected.p1.inc(selectOffset);
                          selected.p2.inc(selectOffset);
                          selectOffset = vector();
                      } else if (pointOffset.x || pointOffset.y) {
                          let pointName = (selectPoint.x == selected.p1.x && selectPoint.y == selected.p1.y) ? 'p1' : 'p2',
                              points = [pointName],
                              objects = [selected],
                              {x, y} = pointOffset;
                          if (oldConnected[0]) {
                              points.push(oldConnected[1]);
                              objects.push(oldConnected[0]);
                          }
                          this.scene.toolHandler.addActionToTimeline({
                              objects,
                              points,
                              type: 'transform',
                              move: {x, y},
                              applied: true,
                          });
                          pointOffset = vector();
                      }
                  }
                  selectPoint = minPoint;
              }
              isSelectList = false;
              selectList = selectPhysicsList = undefined;
          } else if (this.p1 && pointrect(this.mouse.touch.real, this.p1, this.p2)) {
              selected = undefined;
              console.log('in rect!');
          } else {
              isSelectedUpdated = false;
              isHoverList = true;
              hoverList = [];
              this.p1 = this.mouse.touch.real.factor(1);
              this.p2 = this.mouse.touch.real.factor(1);
          }
      }

      hold() {
          if (isHoverList) {
              this.p2 = this.mouse.touch.real.factor(1);
          }
      }

      update(force = false) {
          const mousePos = this.mouse.touch.real;
          shouldUpdate: if (force || !(mousePos.x == this.oldMouse.x && mousePos.y == this.oldMouse.y)) {
              if (isHoverList)
                  this.p2 = mousePos.factor(1);
              // this is my current best guess for if there exists something to move and we should move it
              if (this.scene.state.paused && this.down && this.selected.length && isSelectedUpdated) {
                  // remove the line if it's been temporarily recreated
                  if (!isSelectIntangible) {
                      isSelectIntangible = true;
                      tempSelect?.[0]?.removeAllReferences?.();
                      tempSelect = undefined;
                      if (connected) {
                          connected.removeAllReferences();
                      }
                  }
                  if (tempSelect && tempSelect.length) {
                      for (let i of tempSelect) {
                          i.removeAllReferences();
                      }
                      for (let x in selectPhysicsList) {
                          let row = selectPhysicsList[x];
                          for (let y in row) {
                              let cell = row[y];
                              if (cell.mark) {
                                  cell.mark = false;
                                  for (let line of cell) {
                                      line.temp = false;
                                  }
                              }
                          }
                      }
                      isSelectIntangible = true;
                      tempSelect = undefined;
                  }
                  let dMouse = mousePos.sub(this.oldMouse);
                  dMouse.x = Math.round(dMouse.x);
                  dMouse.y = Math.round(dMouse.y);
                  if (this.scene.toolHandler.options.grid) {
                      let gridSize = this.scene.toolHandler.options.gridSize;
                      dMouse.x = Math.round(dMouse.x / gridSize) * gridSize;
                      dMouse.y = Math.round(dMouse.y / gridSize) * gridSize;
                  }
                  // points get moved seperately (since it's only one point moving rather than a whole line or group of objects)
                  if (selectPoint) {
                      selectPoint.inc(dMouse);
                      selected.pp = selected.p2.sub(selected.p1);
                      selected.len = selected.pp.len();
                      if (connected) {
                          connected[connectedPoint].inc(dMouse);
                          connected.pp = connected.p2.sub(connected.p1);
                          connected.len = connected.pp.len();
                      }
                      pointOffset = dMouse.add(pointOffset);
                  } else {
                      // by switching to the selectOffset for everything, this is a lot simpler :)
                      selectOffset = dMouse.add(selectOffset);
                      if (isSelectList) {
                          this.p1.inc(dMouse);
                          this.p2.inc(dMouse);
                      }
                  }
                  break shouldUpdate;
              }

              if (isHoverList) {
                  this.multiHover();
              } else {
                  this.singleHover(mousePos);
              }
          }
          if (force) return;
          this.oldMouse = this.mouse.touch.real.factor(1);
          this.toolUpdate();
      }

      singleHover(mousePos) {
          let minDist = 1000,
              bestLine = undefined,
              adjustedDist = 2 * HOVER_DIST / this.scene.camera.zoom;
          // selected doesn't exist on the track, so we have to check it separately
          if (selected) {
              let dist = selected.p1 ?
                  linesdf(mousePos.sub(selectOffset), selected) :
              pointsdf(mousePos.sub(selectOffset), selected);
              if (dist < minDist) {
                  minDist = dist;
                  bestLine = selected;
              }
          }

          let sectorSize = this.scene.settings.drawSectorSize,
              sectorPos = mousePos.factor(1 / sectorSize);
          sectorPos.x = Math.floor(sectorPos.x);
          sectorPos.y = Math.floor(sectorPos.y);
          let currentSectorData = this.testSectorSingle(sectorPos);
          if (currentSectorData[0] < minDist) {
              [minDist, bestLine] = currentSectorData;
          }
          // this is all to figure out which sectors we even need to check
          // i.e. within range to have a line that can possibly be close enough
          // the position of the sector in track-space
          let sectorTrackPos = sectorPos.factor(sectorSize),
              // the position of the mouse within the sector
              posInSector = mousePos.sub(sectorTrackPos),
              // a zero vector (for checking the top left)
              zeroVector = posInSector.factor(0),
              // a vector of just the sector size (for checking the bottom right)
              maxPos = zeroVector.add({x: sectorSize, y: sectorSize}),
              sectorsToCheck = [],
              positions = [zeroVector, posInSector, maxPos];
          for (let i = -1; i < 2; i++) {
              let x = positions[i + 1].x;
              for (let j = -1; j < 2; j++) {
                  // we don't need to re-check the current sector
                  if (!i && !j)
                      continue;
                  let y = positions[j + 1].y;
                  if (pointsdf(mousePos, {x, y}) <= adjustedDist * 1.5) {
                      sectorsToCheck.push([i, j]);
                  }
              }
          }

          for (let i of sectorsToCheck) {
              let sectorData = this.testSectorSingle(sectorPos.add(i));
              if (sectorData[0] < minDist) {
                  [minDist, bestLine] = sectorData;
              }
          }
          [frameMinDist, frameBestLine] = [minDist, bestLine];
          if (minDist < adjustedDist) {
              hovered = bestLine;
          } else {
              hovered = undefined;
              return;
          }
          minDist = HOVER_DIST / this.scene.camera.zoom;
          let minPoint = undefined,
              isSelected = hovered == selected;
          if (hovered.p1) {
              for (let i of [hovered.p1, hovered.p2]) {
                  let dist = pointsdf(mousePos, i.add(isSelected ? selectOffset : vector()));
                  if (dist < minDist) {
                      minDist = dist;
                      minPoint = i;
                  }
              }
          }
          hoverPoint = minPoint;
      }

      multiHover() {
          // this logic is very simple: decide which sectors to add, then add everything necessary from them
          let sectorSize = this.scene.settings.drawSectorSize,
              minVec = {x: Math.min(this.p1.x, this.p2.x), y: Math.min(this.p1.y, this.p2.y)},
              maxVec = {x: Math.max(this.p1.x, this.p2.x), y: Math.max(this.p1.y, this.p2.y)},
              lines = [];
          hoverPhysicsList = {};
          for (let x = Math.floor(minVec.x / sectorSize); x <= Math.ceil(maxVec.x / sectorSize); x++) {
              let row = this.scene.track.sectors.drawSectors[x];
              if (!row) continue;
              hoverPhysicsList[x] = {};
              for (let y = Math.floor(minVec.y / sectorSize); y <= Math.ceil(maxVec.y / sectorSize); y++) {
                  hoverPhysicsList[x][y] = [];
                  lines.push(...this.testSectorMulti({x, y}, minVec, maxVec).filter(i => !lines.includes(i) && !i.remove));
              }
          }
          hoverList = lines;
      }

      release() {
          this.down = false;
          isSelectedUpdated = true;
          if (isHoverList) {
              selected = undefined;
              isSelectList = true;
              selectList = [...hoverList];
              selectPhysicsList = hoverPhysicsList;
              hoverList = [];
              isHoverList = false;
              selectOffset = vector();
              for (let i of selectList) {
                  i.removeAllReferences();
              }
              console.log('selected!', selectList);
          }
      }

      draw() {
          let ctx = this.game.canvas.getContext('2d');
          // debug (draw info about the best line
          /*//
          if (frameBestLine) {
              if (frameBestLine.rp1) {
              let rp1 = frameBestLine.p1.toScreen(this.scene),
                  rp2 = frameBestLine.p2.toScreen(this.scene),
                  rpp = frameBestLine.pp;
              ctx.strokeStyle = '#ff0000';
              ctx.beginPath();
              ctx.moveTo(rp1.x, rp1.y);
              ctx.moveTo(rp2.x, rp2.y);
              ctx.stroke();
              ctx.fillText(frameMinDist, rp1.x - rpp.x * Math.sign(rpp.x) / 2, rp1.y - rpp.y * Math.sign(rpp.y) / 2);
              } else {
                  let pos = scene.camera.position.factor(0).add(frameBestLine).toScreen(scene)
                  ctx.fillText(frameMinDist, pos.x + 10, pos.y + 10);
              }
          }
          //*/
          if (!isHoverList && !isSelectList) return;
          let rp1 = this.p1.toScreen(this.scene),
              rp2 = this.p2.toScreen(this.scene),
              w = rp2.x - rp1.x,
              h = rp2.y - rp1.y;
          ctx.save();
          if (ctx.setLineDash)
              ctx.setLineDash([6]);
          ctx.lineDashOffset = this.dashOffset++;
          ctx.beginPath();
          ctx.rect(rp1.x, rp1.y, w, h);
          ctx.fillStyle = "rgba(24, 132, 207, 0.3)";
          isHoverList && ctx.fill();
          ctx.strokeStyle = "rgba(24, 132, 207, 0.7)";
          ctx.lineWidth = 2;
          ctx.stroke();
          ctx.restore();
          this.dashOffset %= 23;
      }

      testSectorSingle(sectorPos) {
          let mousePos = this.mouse.touch.real,
              sector = this.scene.track.sectors.drawSectors?.[sectorPos.x]?.[sectorPos.y],
              minDist = 1000,
              bestLine = undefined;
          if (sector == undefined) {
              return [minDist, bestLine];
          }
          for (let i of sector.physicsLines) {
              if (i.remove)
                  continue;
              let dist = linesdf(mousePos, i);
              if (dist < minDist && i != tempSelect) {
                  minDist = dist;
                  bestLine = i;
              }
          }
          for (let i of sector.sceneryLines) {
              if (i.remove)
                  continue;
              let dist = linesdf(mousePos, i);
              if (dist < minDist) {
                  minDist = dist;
                  bestLine = i;
              }
          }
          for (let i of sector.powerups.all) {
              if (i.remove)
                  continue;
              let dist = pointsdf(mousePos, i);
              if (dist < minDist) {
                  minDist = dist;
                  bestLine = i;
              }
          }
          return [minDist, bestLine];
      }

      testSectorMulti(sectorPos, minVec, maxVec) {
          let sectorSize = this.scene.settings.drawSectorSize,
              sectorTrackPos = {x: sectorPos.x * sectorSize, y: sectorPos.y * sectorSize},
              sector = this.scene.track.sectors.drawSectors?.[sectorPos.x]?.[sectorPos.y];
          if (sector == undefined)
              return [];
          // see if we can just return the whole sector
          if (minVec.x <= sectorTrackPos.x &&
              minVec.y <= sectorTrackPos.y &&
              maxVec.x >= sectorTrackPos.x + sectorSize &&
              maxVec.y >= sectorTrackPos.y + sectorSize) {
              hoverPhysicsList[sectorPos.x][sectorPos.y] = sector.physicsLines.filter(i => !i.remove)
                  .concat(sector.powerups.all.filter(i => !i.remove));
              return hoverPhysicsList[sectorPos.x][sectorPos.y]
                  .concat(sector.sceneryLines.filter(i => !i.remove));
          }
          let toReturn = [];
          for (let i of sector.physicsLines) {
              if (i.remove)
                  continue;
              if (rectcollide(i.p1, i.p2, minVec, maxVec))
                  toReturn.push(i);
          }
          for (let i of sector.powerups.all) {
              if (i.remove)
                  continue;
              if (pointrect(i, minVec, maxVec))
                  toReturn.push(i);
          }
          hoverPhysicsList[sectorPos.x][sectorPos.y] = [...toReturn];
          for (let i of sector.sceneryLines) {
              if (i.remove)
                  continue;
              if (rectcollide(i.p1, i.p2, minVec, maxVec))
                  toReturn.push(i);
          }
          return toReturn;
      }
  }

  let game = GameManager.game,
      scene = game.currentScene,
      active = false;

  scene.toolHandler.registerTool(SelectTool);
  let selectTool = scene.toolHandler.tools.select;

  // fix undo / redo for moved objects
  // this is a little bit weird but it seems to work:
  /* - if anything in toRevert has been removed and not recreated, we assume it's been selected and cancel the action
   * (still debating how to actually undo the lines (i.e. whether to use the same lines or recreate them every time))
   */
  scene.toolHandler.revertAction = (old => () => {
      let oldPointer = scene.toolHandler.actionTimelinePointer;
      old.apply(scene.toolHandler);
      if (oldPointer == scene.toolHandler.actionTimelinePointer) return;
      let toRevert = scene.toolHandler.actionTimeline[scene.toolHandler.actionTimelinePointer];
      if (toRevert) toRevert.objects = toRevert.objects.map(i => {while (i.newVersion) i = i.newVersion; return i});
      if (toRevert && toRevert.type == 'transform' && toRevert.applied) {
          if (toRevert.objects.some(i => i.remove)) {
              scene.toolHandler.actionTimelinePointer = oldPointer;
              return;
          }
          //*//
          toRevert.objects = toRevert.objects.map(i => {
              if (i.remove) {
                  while (i.newVersion)
                      i = i.newVersion;
              }
              i.removeAllReferences();
              return recreate(i, {x: -toRevert.move.x, y: -toRevert.move.y});
          });
          //*/
          /*//
          toRevert.objects.forEach(i => {
              while (i.newVersion) i = i.newVersion;
              i.removeAllReferences();
          });
          scene.track.cleanTrack();
          toRevert.objects.forEach((i, j) => {
              if (i.p1) {
                  let {x, y} = toRevert.move,
                      backwards = {x: -x, y: -y};
                  if (toRevert.points?.[j]) {
                      i[toRevert.points[j]].inc(backwards);
                  } else {
                      i.p1.inc(backwards);
                      i.p2.inc(backwards);
                  }
              } else {
                  i.x -= toRevert.move.x;
                  i.y -= toRevert.move.y;
              }
          });
          scene.toolHandler.addObjects(toRevert.objects);
          //*/
          toRevert.applied = false;
      }
  })(scene.toolHandler.revertAction);

  scene.toolHandler.applyAction = (old => () => {
      let oldPointer = scene.toolHandler.actionTimelinePointer;
      old.apply(scene.toolHandler);
      if (oldPointer == scene.toolHandler.actionTimelinePointer) return;
      let toRevert = scene.toolHandler.actionTimeline[scene.toolHandler.actionTimelinePointer - 1];
      if (toRevert) toRevert.objects = toRevert.objects.map(i => {while (i.newVersion) i = i.newVersion; return i});
      if (toRevert && toRevert.type == 'transform' && !toRevert.applied) {
          if (toRevert.objects.some(i => i.remove)) {
              scene.toolHandler.actionTimelinePointer = oldPointer;
              return;
          }
          //*//
          toRevert.objects = toRevert.objects.map(i => {
              if (i.remove) {
                  while (i.newVersion)
                      i = i.newVersion;
              }
              i.removeAllReferences();
              return recreate(i, {x: toRevert.move.x, y: toRevert.move.y});
          });
          //*/
          /*//
          toRevert.objects.forEach(i => {
              while (i.newVersion) i = i.newVersion;
              i.removeAllReferences();
          });
          scene.track.cleanTrack();
          toRevert.objects.forEach((i, j) => {
              if (i.p1) {
                  if (toRevert.points?.[j]) {
                      i[toRevert.points[j]].inc(toRevert.move);
                  } else {
                      i.p1.inc(toRevert.move);
                      i.p2.inc(toRevert.move);
                  }
              } else {
                  i.x += toRevert.move.x;
                  i.y += toRevert.move.y;
              }
          });
          scene.toolHandler.addObjects(toRevert.objects);
          //*/
          toRevert.applied = true;
      }
  })(scene.toolHandler.applyAction);

  // also patch removeObjects and addObjects just for fun
  scene.toolHandler.removeObjects = (old => (t) => {
      for (let i in t)
          while (t[i].newVersion)
              t[i] = t[i].newVersion;
      //t = t.map(i => {while (i.newVersion) i = i.newVersion; return i;});
      old.apply(scene.toolHandler, [t]);
  })(scene.toolHandler.removeObjects);

  scene.toolHandler.addObjects = (old => (t) => {
      for (let i in t)
          while (t[i].newVersion)
              t[i] = t[i].newVersion;
      //t = t.map(i => {while (i.newVersion) i = i.newVersion; return i;});
      old.apply(scene.toolHandler, [t]);
  })(scene.toolHandler.addObjects);

  let bottomMenu = createElement('div', null, {
      classes: ['bottomToolOptions', 'bottomToolOptions_select'],
      data: {reactid: '.0.4.0.0'},
      children: [{
          tag: 'div',
          classes: ['bottomToolOptions-toolTitle'],
          data: {reactid: '.0.4.0.0.0'},
          children: [
              {
                  tag: 'span',
                  classes: ['editorgui_icons', 'editorgui_icons-icon_select'],
                  data: {reactid: '.0.4.0.0.0.0'},
              },
              {
                  tag: 'span',
                  classes: ['toolName'],
                  data: {reactid: '.0.4.0.0.0.1'},
                  children: [{
                      tag: 'span',
                      innerHTML: 'Select',
                      data: {reactid: '.0.4.0.0.0.1.0'},
                  }],
              }],
      }],
  }),
      button = createElement('div', null, {
          children: [{
              tag: 'span',
              classes: ['editorgui_icons', 'editorgui_icons-icon_select'],
          }],
          classes: ['sideButton', 'sideButton_selectTool'],
          onclick: () => {
              scene.toolHandler.setTool('select');
              let bottomToolTip = document.querySelector('.bottomMenu .clearfix');
              // need to delete the span that's supposed to be there to avoid react throwing a fit :(
              bottomToolTip.firstElementChild.remove();
              bottomToolTip.insertBefore(bottomMenu, bottomToolTip.firstElementChild);
          },
          oncreate: (e) => {
              doAMario('.leftMenu').then(i=>i.insertBefore(e, document.querySelector('.sideButton_cameraTool')));
          },
      });
  createElement('style', document.head, {
      innerHTML: `
  .editorgui_icons-icon_select {
  background-image: url(https://cdn.freeriderhd.com/free_rider_hd/assets/images/editor/gui/editorgui_icons_v5.png);
  width: 44px;
  height: 44px;
  background-size: 778px 124px;
  background-position: -322.5px 0px;
  }
  `});
  let moveSpeed = 0.3,
      moveAccumulator = 1;

  createjs.Ticker.addEventListener('tick', () => {
      if (!scene.state.paused && selected && isSelectIntangible && !tempSelect?.length) {
          tempSelect = [recreate(selected)];
          console.log('temporary', tempSelect);
          isSelectIntangible = false;
          if (connected) {
              connected.remove = 0;
              scene.track.addPhysicsLineToTrack(connected);
          }
      }
      if (!scene.state.paused && isSelectList) {
          tempSelect = tempSelect || [];
          let sectorSize = scene.settings.drawSectorSize,
              vehicle = scene.playerManager.firstPlayer._tempVehicle || scene.playerManager.firstPlayer._baseVehicle,
              pos = vehicle.masses[0].pos,
              sector = pos.factor(1 / sectorSize);
          sector.x = Math.floor(sector.x);
          sector.y = Math.floor(sector.y);
          for (let x = -1; x < 2; x++) {
              if (!selectPhysicsList[x]) continue;
              for (let y = -1; y < 2; y++) {
                  let cell = selectPhysicsList[x][y];
                  if (!cell || !cell.length || cell.mark) continue;
                  for (let i of cell) {
                      if (i.temp) continue;
                      let line = recreate(i);
                      tempSelect.push(line);
                      i.temp = true;
                  }
                  cell.mark = true;
              }
          }
      }
      // allow moving the currently selected object with movement keys when paused
      if (scene.state.paused && selectTool.selected.length && !tempSelect?.length) {
          let tdb = scene.playerManager.firstPlayer._gamepad.getDownButtons(),
              dir = vector();
          for (let button of tdb) {
              switch (button) {
                  case "up":
                      dir.y--;
                      break;
                  case "down":
                      dir.y++;
                      break;
                  case "right":
                      dir.x++;
                      break;
                  case "left":
                      dir.x--;
                      break;
                  case "46":
                      var objects = [...selectTool.selected];
                      if (connected)
                          objects.push(connected);
                      scene.toolHandler.addActionToTimeline({
                          objects,
                          type: 'remove',
                      });
                      selected = undefined;
                      selectPoint = undefined;
                      isSelectList = false;
                      selectOffset = vector();
                      break;
              }
          }
          if (selected) {
              let dirLen = Math.sqrt(dir.x ** 2 + dir.y ** 2);
              if (dirLen > 0) {
                  dir.x = dir.x * moveAccumulator / dirLen | 0;
                  dir.y = dir.y * moveAccumulator / dirLen | 0;
                  if (selectPoint) {
                      selectPoint.inc(dir);
                      if (connected) {
                          connected[connectedPoint].inc(dir);
                      }
                      pointOffset.inc(dir);
                  } else {
                      selectOffset.inc(dir);
                  }
                  moveSpeed *= 1.02;
                  moveAccumulator %= 1;
                  moveAccumulator += moveSpeed;
                  if (!isSelectIntangible) {
                      isSelectIntangible = true;
                      tempSelect?.[0]?.removeAllReferences?.();
                      tempSelect = undefined;
                      if (connected) {
                          connected.removeAllReferences();
                      }
                  }
              } else {
                  moveSpeed = 0.3;
                  moveAccumulator = 1;
              }
          }
      }
      let ctx = game.canvas.getContext('2d'),
          zoom = scene.camera.zoom;
      ctx.lineCap = "round";
      // render selected
      if (selectTool.selected.length) {
          // the actual line
          for (let selected of selectTool.selected) {
              if (selected.p1) {
                  let rp1 = selected.p1.add(selectOffset).toScreen(scene),
                      rp2 = selected.p2.add(selectOffset).toScreen(scene);
                  if (isSelectIntangible) {
                      ctx.lineWidth = Math.max(2 * zoom, 0.5);
                      ctx.strokeStyle = 'highlight' in selected ? '#000000' : '#AAAAAA';
                      ctx.beginPath();
                      ctx.moveTo(rp1.x, rp1.y);
                      ctx.lineTo(rp2.x, rp2.y);
                      ctx.stroke();
                  }
                  // the highlight on the line
                  ctx.lineWidth = Math.max(zoom, 1);
                  ctx.strokeStyle = selectPoint ? '#2200ff' : '#00ffff';
                  ctx.beginPath();
                  ctx.moveTo(rp1.x, rp1.y);
                  ctx.lineTo(rp2.x, rp2.y);
                  ctx.stroke();
              } else {
                  let data = powerups[selected.name];
                  if (!data) continue;
                  let camera = scene.camera,
                      pos = camera.position.factor(0).add(selected).add(selectOffset).toScreen(scene),
                      size = data[0] / zoom;
                  ctx.globalAlpha = 0.3;
                  ctx.fillStyle = data[1 + !!polyMod?.getVar("crPowerups")];
                  ctx.beginPath();
                  ctx.arc(pos.x, pos.y, Math.max(data[0] * zoom / 1.5, 1), 0, Math.PI * 2);
                  ctx.fill();
                  ctx.globalAlpha = 1;
              }
          }
          // handles
          if (!isSelectList && selected.p1) {
              let rp1 = selected.p1.add(selectOffset).toScreen(scene),
                  rp2 = selected.p2.add(selectOffset).toScreen(scene);
              for (let i of [rp1, rp2]) {
                  ctx.beginPath();
                  ctx.strokeStyle = '#2200ff';
                  ctx.fillStyle = '#00ffff';
                  ctx.rect(i.x - zoom * 2, i.y - zoom * 2, zoom * 4, zoom * 4);
                  ctx.fill();
                  ctx.stroke();
              }
              if (selectPoint) {
                  if (connected) {
                      let rp1 = connected.p1.add(selectOffset).toScreen(scene),
                          rp2 = connected.p2.add(selectOffset).toScreen(scene);
                      ctx.lineWidth = Math.max(2 * zoom, 0.5);
                      ctx.strokeStyle = 'highlight' in connected ? '#000000' : '#AAAAAA';
                      ctx.beginPath();
                      ctx.moveTo(rp1.x, rp1.y);
                      ctx.lineTo(rp2.x, rp2.y);
                      ctx.stroke();
                      // the highlight on the line
                      ctx.lineWidth = Math.max(zoom, 1);
                      ctx.strokeStyle = selectPoint ? '#2200ff' : '#00ffff';
                      ctx.beginPath();
                      ctx.moveTo(rp1.x, rp1.y);
                      ctx.lineTo(rp2.x, rp2.y);
                      ctx.stroke();
                      // the other handle
                      let rsp = connected[connectedPoint == 'p1' ? 'p2' : 'p1'].add(selectOffset).toScreen(scene);
                      ctx.beginPath();
                      ctx.strokeStyle = '#2200ff';
                      ctx.fillStyle = '#00ffff';
                      ctx.rect(rsp.x - zoom * 2, rsp.y - zoom * 2, zoom * 4, zoom * 4);
                      ctx.fill();
                      ctx.stroke();
                  }
                  let rsp = selectPoint.add(selectOffset).toScreen(scene);
                  ctx.beginPath();
                  ctx.strokeStyle = '#00ffff';
                  ctx.fillStyle = '#2200ff';
                  ctx.rect(rsp.x - zoom * 2, rsp.y - zoom * 2, zoom * 4, zoom * 4);
                  ctx.fill();
                  ctx.stroke();
              }
          }
      }
      // render hovered
      if (selectTool.hovered.length) {
          if (hoverPoint) {
              let isSelect = hovered == selected,
                  rsp = hoverPoint.add(isSelect ? selectOffset : vector()).toScreen(scene);
              ctx.beginPath();
              ctx.strokeStyle = '#00ddff';
              ctx.fillStyle = '#22ff00';
              ctx.rect(rsp.x - zoom * 3, rsp.y - zoom * 3, zoom * 6, zoom * 6);
              ctx.fill();
              ctx.stroke();
          } else {
              for (let hovered of selectTool.hovered) {
                  if (hovered.p1) {
                      ctx.lineWidth = Math.max(2 * zoom, 1);
                      ctx.strokeStyle = '#ffff00';
                      ctx.beginPath();
                      let isSelect = hovered == selected,
                          rp1 = hovered.p1.add(isSelect ? selectOffset : vector()).toScreen(scene),
                          rp2 = hovered.p2.add(isSelect ? selectOffset : vector()).toScreen(scene);
                      ctx.moveTo(rp1.x, rp1.y);
                      ctx.lineTo(rp2.x, rp2.y);
                      ctx.stroke();
                  } else {
                      let data = powerups[hovered.name];
                      if (!data) continue;
                      let isSelect = hovered == selected,
                          camera = scene.camera,
                          pos = camera.position.factor(0).add(hovered).add(isSelect ? selectOffset : vector()).toScreen(scene),
                          size = data[0] / zoom;
                      ctx.globalAlpha = 0.5;
                      ctx.fillStyle = data[1 + !!polyMod?.getVar("crPowerups")];
                      ctx.beginPath();
                      ctx.arc(pos.x, pos.y, Math.max(data[0] * zoom / 1.2, 1), 0, Math.PI * 2);
                      ctx.fill();
                      ctx.globalAlpha = 1;
                  }
              }
              if (!isHoverList && hovered.p1) {
                  let isSelect = hovered == selected,
                      rp1 = hovered.p1.add(isSelect ? selectOffset : vector()).toScreen(scene),
                      rp2 = hovered.p2.add(isSelect ? selectOffset : vector()).toScreen(scene);
                  //handles
                  for (let i of [rp1, rp2]) {
                      ctx.beginPath();
                      ctx.strokeStyle = '#22ff00';
                      ctx.fillStyle = '#00ddff';
                      ctx.rect(i.x - zoom * 3, i.y - zoom * 3, zoom * 6, zoom * 6);
                      ctx.fill();
                      ctx.stroke();
                  }
              }
          }
          // i tried to make it so the cursor would be a pointer, but it didn't really work out
          /*if (game.canvas.style.cursor != 'pointer')
              game.canvas.style.cursor = 'pointer';
      } else {
          game.canvas.style.cursor = 'auto';*/
      }
      let currentTool = scene.toolHandler.currentTool;
      if (active && currentTool != 'select') {
          active = false;
          button.classList.remove('active');
      } else if (!active && currentTool == 'select') {
          active = true;
          button.classList.add('active');
      }
  });

  function recreate(object, offset = selectOffset) {
      if (!object) return;
      if ('highlight' in object) {
          let re = scene.track.addPhysicsLine(object.p1.x + offset.x, object.p1.y + offset.y,
                                              object.p2.x + offset.x, object.p2.y + offset.y);
          object.newVersion = re;
          return re;
      } else if (object.p1) {
          let re = scene.track.addSceneryLine(object.p1.x + offset.x, object.p1.y + offset.y,
                                             object.p2.x + offset.x, object.p2.y + offset.y);
          object.newVersion = re;
          return re;
      } else {
          object.x += offset.x;
          object.y += offset.y;
          object.remove = 0;
          object.name == 'goal' && scene.track.addTarget(object);
          scene.track.addPowerup(object);
          return object
      }
  }
}

function linesdf(p, line) {
  // len has to be length squared for algorithm reasons
  let len = line.len * line.len,
      t = (((p.x - line.p1.x) * line.pp.x) + ((p.y - line.p1.y) * line.pp.y)) / len;
  t = Math.max(0, Math.min(1, t));
  return Math.hypot((p.x - (line.p1.x + (t * line.pp.x))), (p.y - (line.p1.y + (t * line.pp.y))));
}

function pointsdf(p, point) {
  return Math.hypot(p.x - point.x, p.y - point.y);
}

function linecollide(a1, b1, a2, b2) {
  let d = (((b2.y - a2.y) * (b1.x - a1.x)) - ((b2.x - a2.x) * (b1.y - a1.y))),
      uA = (((b2.x - a2.x) * (a1.y - a2.y)) - ((b2.y - a2.y) * (a1.x - a2.x))) / d,
      uB = (((b1.x - a1.x) * (a1.y - a2.y)) - ((b1.y - a1.y) * (a1.x - a2.x))) / d;
  return uA >= 0 && uA <= 1 && uB >= 0 && uB <= 1;
}

function rectcollide(l1, l2, ul, lr) {
  // we will always give the points as ul, lr
  /*let ul = {x: Math.min(r1.x, r2.x), y: Math.min(r1.y, r2.y)},
      lr = {x: Math.max(r1.x, r2.x), y: Math.max(r1.y, r2.y)};*/
  // if the line is completely within the rectangle
  if (l1.x >= ul.x && l2.x >= ul.x && l1.x <= lr.x && l2.x <= lr.x &&
      l1.y >= ul.y && l2.y >= ul.y && l1.y <= lr.y && l2.y <= lr.y)
      return true;

  // otherwise, check for collisions with the rectangle line segments
  if (linecollide(l1, l2, ul, {x: ul.x, y: lr.y}) ||
      linecollide(l1, l2, ul, {x: lr.x, y: ul.y}) ||
      linecollide(l1, l2, {x: ul.x, y: lr.y}, lr) ||
      linecollide(l1, l2, {x: lr.x, y: ul.y}, lr))
      return true;
  return false;
}

function pointrect(p, r1, r2) {
  let ul = {x: Math.min(r1.x, r2.x), y: Math.min(r1.y, r2.y)},
      lr = {x: Math.max(r1.x, r2.x), y: Math.max(r1.y, r2.y)};
  return p.x >= ul.x && p.x <= lr.x && p.y >= ul.y && p.y <= lr.y;
}

/**
* Easy one-stop function to create and set up an element or even trees of elements.
* @param {String} tag The type of element to create
* @param {HTMLElement} [parent] (optional) Parent element to add this one to
* @param {Object} [properties={}] Properties (e.g. innerHTML) to set on the element
* @param {Array<Object|HTMLElement>} [properties.children] Optional short-circuit to create nested element, but prevents returning them
* @param {String} properties.children[].tag Tag for the child
* @param {Object} properties.children[].* Properties for the child
* @param {Function} [properties.oncreate] Optional function to run once the element has been fully created
* @param {Array<String>} [properties.classes] Classes to add to the created object
* @returns {HTMLElement} The created element
*/
function createElement(tag, parent, properties = {}) {
  let element = document.createElement(tag),
      oncreate;
  if (parent) {
      parent.append(element);
  }
  for (let i in properties) {
      switch (i) {
          case 'children':
              for (let child of properties.children) {
                  if (child instanceof HTMLElement) {
                      element.append(child);
                  } else {
                      let properties = child,
                          tag = child.tag;
                      delete properties.tag;
                      createElement(tag, element, properties || {});
                  }
              }
              break;
              // delay running the oncreate function until all properties have been initialized
          case 'oncreate':
              oncreate = properties.oncreate;
              break;
          case 'classes':
              element.classList.add(...properties[i]);
              break;
          case 'data':
              for (let data in properties[i]) {
                  element.dataset[data] = properties[i][data];
              }
          default:
              element[i] = properties[i];
      }
  }
  if (oncreate) {
      oncreate(element);
  }
  return element;
}

function doAMario(selector) {
  return new Promise((resolve, reject) => {
      let interval = setInterval(() => {
          let found = document.querySelector(selector);
          if (found) {
              resolve(found);
              clearInterval(interval);
          }
      }, 250);
  });
}

function rInterval() {
  window.clearInterval(v);
}
var v = window.setInterval(function() {
  if (GameManager != undefined && GameManager.game != undefined) {
      rInterval();
      load();
  }
}, 250);