!function(){"use strict";function e(e){this.drawAngle=0,this.colors=e,this.createVersion()}var r=GameInventoryManager.HeadClass,o={},i=0,T=0,v=e.prototype=new r;v.versionName="",v.dirty=!0,v.cache=function(e){var r=o[this.versionName];r.dirty=!1;var v=150*(e=Math.max(e,1))*.2,t=140*e*.2,u=r.canvas;u.width=v,u.height=t,i=u.width/2,T=u.height/2;var l=u.getContext("2d"),n=.2*e;l.scale(n,n),l.translate(0,0),l.strokeStyle="rgba(0,0,0,0)",l.lineCap="butt",l.lineJoin="miter",l.miterLimit=4,l.save(),l.save(),l.save(),l.fillStyle="#010101",l.beginPath(),l.moveTo(142.314,39.157),l.bezierCurveTo(142.184,38.657,141.768,38.311,141.19199999999998,38.232),l.lineTo(115.31899999999997,34.652),l.lineTo(115.08599999999997,34.635),l.bezierCurveTo(114.56499999999997,34.635,114.12999999999997,34.909,113.94199999999996,35.354),l.bezierCurveTo(113.86899999999997,35.525999999999996,113.67999999999996,36.134,114.27399999999996,36.735),l.lineTo(118.72399999999996,41.269),l.lineTo(104.78599999999996,44.832),l.bezierCurveTo(104.37199999999996,44.94,103.81599999999996,45.214,103.47399999999996,45.486000000000004),l.bezierCurveTo(103.21799999999996,45.688,101.00899999999996,47.515,101.53599999999996,49.58800000000001),l.bezierCurveTo(101.96199999999996,51.23800000000001,103.44499999999996,52.41400000000001,105.14499999999995,52.44400000000001),l.lineTo(105.49299999999995,52.45200000000001),l.lineTo(105.59799999999996,52.43200000000001),l.bezierCurveTo(105.88799999999996,52.37800000000001,106.36999999999996,52.27300000000001,106.67199999999995,52.19500000000001),l.lineTo(120.60499999999996,48.63100000000001),l.lineTo(118.87699999999997,54.74600000000001),l.bezierCurveTo(118.70899999999996,55.33700000000001,118.91699999999997,55.73100000000001,119.05099999999997,55.91300000000001),l.lineTo(119.44599999999997,56.36200000000001),l.lineTo(119.96899999999997,56.36200000000001),l.bezierCurveTo(120.25199999999997,56.36200000000001,120.53099999999996,56.26500000000001,120.79599999999996,56.06700000000001),l.lineTo(141.77399999999997,40.50500000000001),l.bezierCurveTo(142.242,40.162,142.441,39.657,142.314,39.157),l.closePath(),l.fill(),l.stroke(),l.restore(),l.save(),l.fillStyle="#ffffff",l.beginPath(),l.moveTo(81.484,47.204),l.bezierCurveTo(64.609,47.204,50.931999999999995,60.883,50.931999999999995,77.754),l.bezierCurveTo(50.931999999999995,94.62700000000001,64.609,108.305,81.484,108.305),l.bezierCurveTo(98.354,108.305,112.035,94.62700000000001,112.035,77.754),l.bezierCurveTo(112.035,60.883,98.354,47.204,81.484,47.204),l.closePath(),l.fill(),l.stroke(),l.restore(),l.save(),l.fillStyle="#010101",l.beginPath(),l.moveTo(81.484,47.204),l.bezierCurveTo(98.354,47.204,112.035,60.883,112.035,77.754),l.bezierCurveTo(112.035,94.62700000000001,98.354,108.305,81.484,108.305),l.bezierCurveTo(64.609,108.305,50.931999999999995,94.62700000000001,50.931999999999995,77.754),l.bezierCurveTo(50.933,60.883,64.609,47.204,81.484,47.204),l.moveTo(81.484,40.146),l.bezierCurveTo(60.74499999999999,40.146,43.873,57.016999999999996,43.873,77.753),l.bezierCurveTo(43.873,98.489,60.745,115.363,81.484,115.363),l.bezierCurveTo(102.21799999999999,115.363,119.09199999999998,98.489,119.09199999999998,77.753),l.bezierCurveTo(119.09199999999998,57.016999999999996,102.219,40.146,81.484,40.146),l.lineTo(81.484,40.146),l.closePath(),l.fill(),l.stroke(),l.restore(),l.save(),l.fillStyle="#e81c23",l.beginPath(),l.moveTo(51.087,83.24),l.bezierCurveTo(47.395,69.85499999999999,52.897000000000006,55.13499999999999,65.412,47.70399999999999),l.bezierCurveTo(80.41000000000001,38.797999999999995,99.78900000000002,43.73499999999999,108.69900000000001,58.73499999999999),l.bezierCurveTo(110.436,61.66499999999999,111.64200000000001,64.76499999999999,112.35000000000001,67.91999999999999),l.lineTo(51.087,83.24),l.closePath(),l.fill(),l.stroke(),l.restore(),l.save(),l.fillStyle="#010101",l.beginPath(),l.moveTo(81.509,43.271),l.bezierCurveTo(92.289,43.271,102.794,48.792,108.699,58.735),l.bezierCurveTo(110.43599999999999,61.665,111.642,64.765,112.35,67.92),l.lineTo(51.087,83.24),l.bezierCurveTo(47.395,69.85499999999999,52.897000000000006,55.13499999999999,65.412,47.70399999999999),l.bezierCurveTo(70.469,44.702,76.027,43.271,81.509,43.271),l.moveTo(81.512,36.959),l.lineTo(81.512,43.271),l.lineTo(81.512,36.959),l.lineTo(81.509,36.959),l.bezierCurveTo(74.728,36.959,68.046,38.800000000000004,62.19,42.277),l.bezierCurveTo(47.544,50.973,40.474999999999994,68.50800000000001,45.001999999999995,84.91900000000001),l.bezierCurveTo(45.772999999999996,87.71400000000001,48.309999999999995,89.558,51.083,89.558),l.bezierCurveTo(51.589999999999996,89.558,52.105,89.49600000000001,52.617999999999995,89.367),l.lineTo(113.883,74.046),l.bezierCurveTo(117.21,73.215,119.262,69.881,118.50999999999999,66.537),l.bezierCurveTo(117.63699999999999,62.65200000000001,116.16099999999999,58.943000000000005,114.12899999999999,55.51500000000001),l.bezierCurveTo(107.328,44.068,94.834,36.959,81.512,36.959),l.lineTo(81.512,36.959),l.closePath(),l.fill(),l.stroke(),l.restore(),l.save(),l.fillStyle="#010101",l.beginPath(),l.moveTo(65.508,58.496),l.bezierCurveTo(65.131,57.015,63.907,55.908,62.38099999999999,55.678000000000004),l.bezierCurveTo(62.29099999999999,55.665000000000006,62.20199999999999,55.661,62.111999999999995,55.659000000000006),l.lineTo(61.99399999999999,55.653000000000006),l.bezierCurveTo(61.907999999999994,55.645,61.82599999999999,55.639,61.64699999999999,55.64300000000001),l.lineTo(61.30899999999999,55.67100000000001),l.bezierCurveTo(61.09499999999999,55.712,60.67899999999999,55.80500000000001,60.38399999999999,55.87800000000001),l.lineTo(42.275,60.32),l.lineTo(40.208999999999996,60.843),l.bezierCurveTo(40.169999999999995,60.851000000000006,39.806999999999995,60.848000000000006,39.75899999999999,60.834),l.lineTo(27.020999999999994,56.997),l.bezierCurveTo(26.708999999999993,56.902,26.379999999999995,56.885,26.157999999999994,56.885),l.bezierCurveTo(25.976999999999993,56.885,25.704999999999995,56.899,25.442999999999994,56.964999999999996),l.lineTo(8.667,61.255),l.bezierCurveTo(8.109,61.4,7.734,61.79,7.66,62.299),l.bezierCurveTo(7.587,62.808,7.841,63.287,8.334,63.58),l.lineTo(19.338,70.103),l.lineTo(12.817,81.107),l.bezierCurveTo(12.554,81.554,12.534,82.036,12.759,82.434),l.bezierCurveTo(12.975,82.812,13.376000000000001,83.038,13.833,83.038),l.bezierCurveTo(13.959,83.038,14.093,83.021,14.224,82.98599999999999),l.lineTo(31.004,78.695),l.bezierCurveTo(31.471,78.574,32.035000000000004,78.252,32.372,77.91),l.lineTo(41.698,68.432),l.bezierCurveTo(41.765,68.36200000000001,41.984,68.238,42.077,68.21300000000001),l.lineTo(62.25,63.248000000000005),l.bezierCurveTo(62.673,63.142,63.231,62.86900000000001,63.574,62.596000000000004),l.bezierCurveTo(63.829,62.396,66.039,60.569,65.508,58.496),l.closePath(),l.fill(),l.stroke(),l.restore(),l.save(),l.fillStyle="#e81c23",l.beginPath(),l.moveTo(46.845,77.896),l.bezierCurveTo(47.034,81.471,47.771,84.91,48.985,88.125),l.bezierCurveTo(66.55799999999999,83.557,84.13499999999999,79.005,101.67699999999999,74.499),l.bezierCurveTo(105.743,73.399,109.814,72.40899999999999,113.994,71.30799999999999),l.bezierCurveTo(114.273,71.23599999999999,114.535,71.14599999999999,114.786,71.05099999999999),l.bezierCurveTo(114.304,67.77599999999998,113.351,64.64999999999999,112.003,61.734999999999985),l.lineTo(46.845,77.896),l.closePath(),l.fill(),l.stroke(),l.restore(),l.save(),l.fillStyle="#010101",l.beginPath(),l.moveTo(112.004,61.734),l.bezierCurveTo(113.35300000000001,64.649,114.305,67.775,114.787,71.05),l.bezierCurveTo(114.536,71.145,114.274,71.235,113.995,71.307),l.bezierCurveTo(109.81400000000001,72.409,105.744,73.399,101.678,74.498),l.bezierCurveTo(84.136,79.004,66.559,83.55600000000001,48.986,88.12400000000001),l.bezierCurveTo(47.772,84.90800000000002,47.035,81.47000000000001,46.846,77.89500000000001),l.lineTo(112.004,61.734),l.moveTo(112.007,55.423),l.bezierCurveTo(111.503,55.423,110.992,55.482,110.486,55.608000000000004),l.lineTo(45.32600000000001,71.767),l.bezierCurveTo(42.39000000000001,72.496,40.38300000000001,75.204,40.54200000000001,78.225),l.bezierCurveTo(40.76200000000001,82.40299999999999,41.61700000000001,86.482,43.080000000000005,90.35499999999999),l.bezierCurveTo(44.02700000000001,92.859,46.415000000000006,94.43799999999999,48.983000000000004,94.43799999999999),l.bezierCurveTo(49.508,94.43799999999999,50.044000000000004,94.374,50.572,94.234),l.bezierCurveTo(71.708,88.74499999999999,87.953,84.54299999999999,103.249,80.612),l.bezierCurveTo(103.27499999999999,80.607,103.30499999999999,80.59899999999999,103.329,80.594),l.bezierCurveTo(105.61,79.97399999999999,107.86099999999999,79.401,110.24199999999999,78.79499999999999),l.bezierCurveTo(112.01299999999999,78.341,113.79899999999999,77.88799999999999,115.60099999999998,77.41199999999999),l.bezierCurveTo(116.06799999999998,77.29299999999999,116.54399999999998,77.13799999999999,117.02899999999998,76.95299999999999),l.bezierCurveTo(119.79899999999998,75.89899999999999,121.46599999999998,73.06199999999998,121.03399999999998,70.13199999999999),l.bezierCurveTo(120.47199999999998,66.32,119.36199999999998,62.60499999999999,117.73399999999998,59.08699999999999),l.bezierCurveTo(116.685,56.812,114.421,55.423,112.007,55.423),l.lineTo(112.007,55.423),l.closePath(),l.fill(),l.stroke(),l.restore()},v.getVersions=function(){return o},v.getBaseWidth=function(){return 150},v.getBaseHeight=function(){return 140},v.getDrawOffsetX=function(){return 0},v.getDrawOffsetY=function(){return-2},v.getScale=function(){return.2},GameInventoryManager&&GameInventoryManager.register("lovestruck_beanie",e),"undefined"!=typeof exports&&("undefined"!=typeof module&&module.exports&&(exports=module.exports=e),exports.Lovestruck_Beanie=e)}();