var GameSettings = {
    "embedded": false,
    "basePlatformUrl": "http:\/\/www.kanohub.com\/~charlie\/kano\/apps\/tracks\/frhd",
    "basePlatformExternalUrl": "http:\/\/www.kanohub.com\/~charlie\/kano\/apps\/tracks\/frhd",
    "baseAssetUrl": true,
    "developerMode": false,
    "isChromeApp": true,
    "isStandalone": true,
    "fullscreenAvailable": true,
    "portal": "",
    "platform": "web",
    "drawFPS": 30,
    "defaultContainerID": "game-container",
    "width": 900,
    "height": 500,
    "fullscreen": false,
    "defaultTrack": "track.txt",
    "drawSectorSize": 1000,
    "physicsSectorSize": 100,
    "startVehicle": "BMX",
    "startTool": "straightline",
    "startPowerup": "goal",
    "defaultGravityX": 0,
    "defaultGravityY": 0.3,
    "cameraStartZoom": 0.5,
    "cameraZoomMin": 0.5,
    "cameraZoomMax": 0.5,
    "cameraSensitivity": 0.0,
    "cameraMovementVertical": false,
    "cameraMovementHorizontal": false,
    "lowQualityMode": false,
    "device": "desktop",
    "mobile": false,
    "controls": false,
    "startPaused": false,
    "waitForKeyPress": true,
    "waitAtCheckpoints": true,
    "trackCodeVersion": 1,
    "replayVersion": 1,
    "physicsLineColor": "#000",
    "sceneryLineColor": "#AAA",
    "foregroundLineColor": "AAA",
    "hatColor": "rgba(0,0,0,0)",
    "frameColor1": "black",
    "frameColor2": "black",
    "wheelColor": "black",
    "wheelSizerear": ["medium"],
    "wheelSizefront": ["medium"],
    "rideStyle": ["Pete"],
    "frameSize": ["medium"],
    "raceColors": ["rgba(57,185,117,1)", "rgba(0,152,189,1)", "rgba(151,95,162,1)", "rgba(253,85,91,1)", "rgba(245,126,64,1)", "rgba(247,212,62,1)", "rgba(170,221,114,1)", "rgba(72,217,207,1)", "rgba(0,124,212,1)", "rgba(226,108,216,1)"],
    "toolHandler": {
        "snap": false,
        "snapLocked": false,
        "cameraLocked": true,
        "grid": false,
        "gridSize": 10,
        "visibleGrid": false,
        "gridMinorLineColor": "#EEE",
        "gridMajorLineColor": "#CCC",
        "lineType": "physics",
        "cameraMoveSpeed": 0.02,
        "rightClickMove": false
    },
    "vehiclePowerup": {
        "selected": "helicopter",
        "time": 10,
        "step": 1,
        "minTime": 5,
        "maxTime": 60
    },
    "eraser": {
        "radius": 29,
        "maxRadius": 200,
        "minRadius": 2,
        "radiusSizeSensitivity": 5,
        "types": {
            "scenery": true,
            "physics": true,
            "foreground": true,
            "powerups": true
        }
    },
    "brush": {
        "breakLength": 0.2,
        "maxBreakLength": 3,
        "minBreakLength": 0.02,
        "breakLengthSensitivity": 0.1,
        "trailSpeed": 1,
        "maxTrailSpeed": 1,
        "minTrailSpeed": 0.01,
        "trailSpeedSensitivity": 0.005,
        "SegmentLength": 0.4,
        "maxSegmentLength": 1,
        "minSegmentLength": 0.1,
        "SegmentLengthSensitivity": 0.1
    },
    "playHotkeys": {
        "up": [38, 87],
        "down": [40, 83],
        "left": [37, 65],
        "right": [39, 68],
        "pause": 32,
        "enter": 13,
        "z": 90,
        "x": 88,
        "change_vehicle": 86,
        "backspace": 8
    },
    "editorHotkeys": {
        "up": 38,
        "down": 40,
        "left": 37,
        "right": 39,
        "z": 90,
        "y": 89,
        "x": 88,
        "lineType": 83,
        "eraser": 69,
        "straightline": 81,
        "brush": 65,
        "curve": 87,
        "grid": 71,
        "elle": 70,
        "circle": 67,
        "pause": 32,
        "change_vehicle": 86,
        "export": 187,
        "import": 189,
        "bikesettings": 191,
        "enter": 13,
        "backspace": 8
    },
    "keysToRecord": ["up", "down", "left", "right", "enter", "backspace", "z"],
    "user": {
        "d_name": "Guest",
        "u_id": false,
        "cosmetics": {
            "head": {
                "id": "1",
                "title": "Classic Hat",
                "type": "1",
                "name": "classic",
                "cost": "0",
                "owner": true,
                "options": {
                    "back": "white"
                },
                "classname": "forwardcap",
                "equiped": false,
                "img": "http:\/\/cdn.kanohub.com\/free_rider_hd\/assets\/inventory\/head\/img\/v1\/classic.png",
                "show": true,
                "script": "http:\/\/cdn.kanohub.com\/free_rider_hd\/assets\/inventory\/head\/scripts\/v1\/forwardcap.js",
                "limited": false
            }
        },
        "guest": true
    },
    "showHelpControls": false,
    "isCampaign": false,
    "track": false,
    "userTrackStats": false,
    "campaignData": false,
    "trackUploadCost": 0,
    "raceUids": false,
    "raceData": false,
    "soundsEnabled": false,
    "bestGhostEnabled": false,
    "requireTrackVerification": true
}
