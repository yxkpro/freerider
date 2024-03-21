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
    "drawSectorSize": 1000,
    "physicsSectorSize": 100,
    "startVehicle": "BMX",
    "startTool": "straightline",
    "startPowerup": "goal",
    "defaultGravityX": 0,
    "defaultGravityY": 0.3,
    "cameraStartZoom": 0.5,
    "cameraZoomMin": 0.1,
    "cameraZoomMax": 4,
    "cameraSensitivity": 0.2,
    "cameraMovementVertical": true,
    "cameraMovementHorizontal": true,
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
        "cameraLocked": false,
        "grid": false,
        "gridSize": 10,
        "visibleGrid": true,
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
    "bikes": {
        "wheelSize": ["Small", "Medium", "Large"],
        "frameType": ["BMX", "MTB", "Trial"],
        "rideStyle": ["Maxime", "Pete", "Char", "Stig"]
    },
    "playHotkeys": {
        "up": [38, 87],
        "down": [40, 83],
        "left": [37, 65],
        "right": [39, 68],
        "pause": 32,
        "enter": 13,
        "backspace": 8,
        "restart": 82,
        "z": 90,
        "x": 88,
        "change_camera": 9,
        "zoom_increase": 187,
        "zoom_decrease": 189,
        "zoom_100": 48,
        "change_vehicle": 86,
        "exit_fullscreen": 27,
        "settings": 220
    },
    "editorHotkeys": {
        "up": 38,
        "down": 40,
        "left": 37,
        "right": 39,
        "z": 90,
        "y": 89,
        "x": 88,
        "snap": 17,
        "lineType": 83,
        "eraser": 69,
        "straightline": 81,
        "brush": 65,
        "curve": 87,
        "grid": 71,
        "elle": 70,
        "camera": 67,
        "pause": 32,
        "change_vehicle": 86,
        "powerup": 80,
        "vehiclepowerup": 79,
        "opt1": 49,
        "opt2": 50,
        "opt3": 51,
        "opt4": 52,
        "opt5": 53,
        "opt6": 54,
        "enter": 13,
        "restart": 82,
        "backspace": 8,
        "shift": 16,
        "ctrl": 17,
        "alt": 18,
        "zoom_increase": 187,
        "zoom_decrease": 189,
        "zoom_100": 48,
        "bikesettings": 191,
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
