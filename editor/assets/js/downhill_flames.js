!function(){"use strict";function e(e){this.drawAngle=0,this.colors=e,this.createVersion()}var r=GameInventoryManager.HeadClass,o={},i=0,T=0,v=e.prototype=new r;v.versionName="",v.dirty=!0,v.cache=function(e){var r=o[this.versionName];r.dirty=!1;var v=115*(e=Math.max(e,1))*.21,u=100*e*.21,b=r.canvas;b.width=v,b.height=u,i=b.width/2,T=b.height/2;var C=b.getContext("2d"),z=.21*e,t=this.colors;C.scale(z,z),C.translate(0,0),C.strokeStyle="rgba(0,0,0,0)",C.lineCap="butt",C.lineJoin="miter",C.miterLimit=4,C.save(),C.save(),C.save(),C.save(),C.fillStyle="#ffffff",C.beginPath(),C.moveTo(61.625,76.247),C.bezierCurveTo(68.901,70.644,73.596,61.853,73.596,51.962),C.bezierCurveTo(73.596,35.039,59.878,21.323000000000004,42.95700000000001,21.323000000000004),C.bezierCurveTo(26.037000000000006,21.323000000000004,12.320000000000007,35.039,12.320000000000007,51.962),C.bezierCurveTo(12.320000000000007,54.150000000000006,12.554000000000007,56.286,12.990000000000007,58.347),C.lineTo(61.625,76.247),C.closePath(),C.fill(),C.stroke(),C.restore(),C.save(),C.fillStyle="#010101",C.beginPath(),C.moveTo(42.956,21.323),C.bezierCurveTo(59.877,21.323,73.595,35.039,73.595,51.962),C.bezierCurveTo(73.595,61.854,68.9,70.64500000000001,61.623999999999995,76.247),C.lineTo(12.988999999999997,58.347),C.bezierCurveTo(12.551999999999998,56.286,12.318999999999997,54.151,12.318999999999997,51.962),C.bezierCurveTo(12.319,35.039,26.036,21.323,42.956,21.323),C.moveTo(42.956,16.657),C.bezierCurveTo(23.490000000000002,16.657,7.6540000000000035,32.495,7.6540000000000035,51.962),C.bezierCurveTo(7.6540000000000035,54.42400000000001,7.913000000000004,56.899,8.425000000000004,59.31400000000001),C.lineTo(8.959000000000005,61.83500000000001),C.lineTo(11.377000000000006,62.72500000000001),C.lineTo(60.012,80.62700000000001),C.lineTo(62.429,81.51700000000001),C.lineTo(64.47,79.94600000000001),C.bezierCurveTo(73.234,73.19700000000002,78.25999999999999,62.99800000000001,78.25999999999999,51.96400000000001),C.bezierCurveTo(78.26,32.495,62.423,16.657,42.956,16.657),C.lineTo(42.956,16.657),C.closePath(),C.fill(),C.stroke(),C.restore(),C.restore(),C.restore(),C.restore(),C.save(),C.save(),C.save(),C.beginPath(),C.moveTo(91.711,70.661),C.bezierCurveTo(91.707,70.397,91.702,70.137,91.702,69.88),C.bezierCurveTo(91.702,67.44999999999999,90.021,64.99799999999999,86.267,64.99799999999999),C.bezierCurveTo(84.25699999999999,64.99799999999999,81.985,65.672,80.321,66.16499999999999),C.bezierCurveTo(79.947,66.276,79.435,66.42899999999999,79.234,66.472),C.bezierCurveTo(78.735,66.58,78.271,66.631,77.81599999999999,66.631),C.bezierCurveTo(75.93599999999999,66.631,74.24099999999999,65.69,71.87099999999998,64.256),C.lineTo(61.23299999999998,57.812),C.bezierCurveTo(59.11799999999998,56.531,58.255999999999986,55.14,58.59999999999998,53.564),C.bezierCurveTo(58.76199999999998,52.823,58.89499999999998,52.056,59.02799999999998,51.308),C.bezierCurveTo(59.430999999999976,49.035,59.84699999999998,46.683,60.949999999999974,45.327),C.bezierCurveTo(62.15899999999998,43.842,64.61599999999997,42.851,67.02599999999997,41.881),C.bezierCurveTo(67.75099999999996,41.589,68.50099999999996,41.287,69.20899999999997,40.971000000000004),C.bezierCurveTo(69.36099999999998,40.903000000000006,69.84199999999997,40.732000000000006,70.19699999999997,40.605000000000004),C.bezierCurveTo(71.54199999999997,40.126000000000005,73.38499999999998,39.468,74.96399999999997,38.557),C.bezierCurveTo(78.91999999999997,36.27,78.83699999999997,33.535000000000004,78.43799999999997,32.120000000000005),C.bezierCurveTo(75.95299999999997,22.537000000000006,69.56699999999998,14.437000000000005,61.775999999999975,10.982000000000003),C.bezierCurveTo(55.675,8.275,47.173,6.66,39.032,6.66),C.bezierCurveTo(36.312,6.66,33.741,6.8420000000000005,31.394,7.198),C.lineTo(30.767999999999997,7.2940000000000005),C.bezierCurveTo(25.318999999999996,8.107000000000001,13.977999999999998,9.806000000000001,6.998999999999999,18.608),C.bezierCurveTo(.2699999999999987,27.095,.7539999999999987,38.937,1.275999999999999,43.635000000000005),C.bezierCurveTo(1.6979999999999988,47.441,2.602999999999999,51.407000000000004,3.963999999999999,55.426),C.bezierCurveTo(4.256999999999999,56.29,4.614999999999999,57.075,4.927999999999999,57.766000000000005),C.bezierCurveTo(5.440999999999999,58.89900000000001,5.884999999999999,59.87500000000001,5.852999999999999,60.696000000000005),C.bezierCurveTo(5.6789999999999985,65.19500000000001,10.094999999999999,66.91900000000001,11.979,67.65400000000001),C.lineTo(73.582,92.29500000000002),C.bezierCurveTo(73.714,92.34700000000002,73.845,92.40700000000001,73.991,92.47400000000002),C.bezierCurveTo(74.292,92.61100000000002,74.665,92.78000000000002,75.098,92.92800000000001),C.bezierCurveTo(75.9,93.20100000000001,76.692,93.34000000000002,77.453,93.34000000000002),C.bezierCurveTo(80.449,93.34000000000002,82.20100000000001,91.29200000000002,83.399,89.89100000000002),C.lineTo(83.74,89.49500000000002),C.bezierCurveTo(83.80699999999999,89.41900000000003,84.005,89.23300000000002,84.178,89.07000000000002),C.bezierCurveTo(85.259,88.04700000000003,87.743,85.69100000000002,86.707,82.97700000000002),C.bezierCurveTo(86.88199999999999,82.56100000000002,87.17999999999999,81.99200000000002,87.353,81.65600000000002),C.bezierCurveTo(87.57199999999999,81.23400000000002,87.779,80.83700000000002,87.94,80.44600000000003),C.bezierCurveTo(88.349,79.45600000000003,88.349,79.45600000000003,88.98,78.91000000000003),C.bezierCurveTo(91.808,76.466,91.75,72.979,91.711,70.661),C.closePath(),C.fill(),C.stroke(),C.restore(),C.save(),C.save(),C.fillStyle=t.helmet,C.beginPath(),C.moveTo(75.277,32.973),C.bezierCurveTo(73.246,25.113999999999997,68.012,17.33,60.449,13.974999999999998),C.bezierCurveTo(52.391999999999996,10.403999999999998,40.461,9.130999999999997,31.886,10.436999999999998),C.bezierCurveTo(26.936,11.190999999999997,16.003,12.522999999999998,9.564999999999998,20.641999999999996),C.bezierCurveTo(4.7,26.778,3.701,35.806,4.53,43.274),C.bezierCurveTo(4.95,47.055,5.845000000000001,50.774,7.065,54.373000000000005),C.bezierCurveTo(7.812,56.577000000000005,9.215,58.48500000000001,9.125,60.82300000000001),C.bezierCurveTo(9.034,63.17700000000001,11.803,64.05300000000001,13.613,64.778),C.bezierCurveTo(19.907,67.295,26.203,69.81400000000001,32.497,72.33200000000001),C.bezierCurveTo(46.597,77.97300000000001,60.697,83.61300000000001,74.797,89.25),C.bezierCurveTo(75.252,89.433,75.692,89.67,76.152,89.826),C.bezierCurveTo(78.709,90.69699999999999,79.806,89.014,81.275,87.336),C.bezierCurveTo(81.97500000000001,86.539,84.21300000000001,84.89,83.512,83.908),C.bezierCurveTo(82.738,82.824,84.44200000000001,80.334,84.912,79.19500000000001),C.bezierCurveTo(85.55600000000001,77.637,85.70200000000001,77.41300000000001,86.83800000000001,76.432),C.bezierCurveTo(88.74000000000001,74.786,88.426,72.13,88.426,69.879),C.bezierCurveTo(88.426,66.608,81.72800000000001,69.283,79.925,69.673),C.bezierCurveTo(76.041,70.51,73.315,68.95700000000001,70.17399999999999,67.058),C.bezierCurveTo(66.62899999999999,64.909,63.081999999999994,62.75900000000001,59.53699999999999,60.614000000000004),C.bezierCurveTo(56.76699999999999,58.934000000000005,54.641999999999996,56.353,55.39999999999999,52.868),C.bezierCurveTo(56.07899999999999,49.749,56.31499999999999,45.836,58.41199999999999,43.259),C.bezierCurveTo(60.62799999999999,40.537,64.77799999999999,39.363,67.87199999999999,37.979),C.bezierCurveTo(69.357,37.315,76.041,35.556,75.277,32.973),C.closePath(),C.fill(),C.stroke(),C.restore(),C.save(),C.fillStyle=t.flames,C.beginPath(),C.moveTo(54.929,43.536),C.bezierCurveTo(52.389,40.864000000000004,50.602000000000004,36.205,48.126000000000005,33.101),C.bezierCurveTo(45.09700000000001,29.308,40.261,26.759999999999998,36.012,25.705),C.bezierCurveTo(35.982,25.72,35.944,25.732,35.908,25.747),C.bezierCurveTo(37.055,26.96,39.077,27.958,40.223,29.174),C.bezierCurveTo(42.464999999999996,31.523,44.409,34.069,46.326,37.007999999999996),C.bezierCurveTo(47.919,39.449999999999996,48.417,43.562,44.696,44.120999999999995),C.bezierCurveTo(38.815999999999995,44.99999999999999,38.117,34.482,35.141,29.472999999999995),C.bezierCurveTo(32.815,25.563999999999997,30.195999999999998,22.457999999999995,26.397999999999996,21.956999999999994),C.bezierCurveTo(33.867,25.065999999999995,33.13999999999999,39.279999999999994,36.41,46.434),C.bezierCurveTo(38.629,50.242,40.793,52.724999999999994,43.656,54.926),C.bezierCurveTo(46.419,57.052,49.864999999999995,57.831,53.472,58.261),C.bezierCurveTo(53.471000000000004,58.260000000000005,53.47,58.258,53.469,58.257000000000005),C.bezierCurveTo(53.331,58.08800000000001,53.203,57.914,53.081,57.736000000000004),C.bezierCurveTo(53.06,57.707,53.041000000000004,57.676,53.022000000000006,57.648),C.bezierCurveTo(52.919000000000004,57.49100000000001,52.82300000000001,57.333000000000006,52.733000000000004,57.17),C.bezierCurveTo(52.714000000000006,57.133,52.693000000000005,57.098,52.67400000000001,57.061),C.bezierCurveTo(52.580000000000005,56.886,52.495000000000005,56.705,52.419000000000004,56.519),C.bezierCurveTo(52.412000000000006,56.501999999999995,52.403000000000006,56.485,52.397000000000006,56.467),C.bezierCurveTo(52.31400000000001,56.26,52.24100000000001,56.045,52.181000000000004,55.827999999999996),C.bezierCurveTo(52.176,55.809999999999995,52.17400000000001,55.793,52.169000000000004,55.773999999999994),C.bezierCurveTo(52.11900000000001,55.58599999999999,52.078,55.391999999999996,52.047000000000004,55.19499999999999),C.bezierCurveTo(52.037000000000006,55.13199999999999,52.03,55.065999999999995,52.022000000000006,54.99999999999999),C.bezierCurveTo(52.00300000000001,54.84599999999999,51.989000000000004,54.68899999999999,51.983000000000004,54.53099999999999),C.bezierCurveTo(51.980000000000004,54.45399999999999,51.977000000000004,54.37599999999999,51.977000000000004,54.29899999999999),C.bezierCurveTo(51.975,54.138999999999996,51.983000000000004,53.97599999999999,51.995000000000005,53.81199999999999),C.bezierCurveTo(52.00000000000001,53.73799999999999,52.00300000000001,53.66599999999999,52.01200000000001,53.59199999999999),C.bezierCurveTo(52.03600000000001,53.35399999999999,52.07300000000001,53.11399999999999,52.126000000000005,52.86699999999999),C.bezierCurveTo(52.168000000000006,52.67399999999999,52.209,52.47699999999999,52.248000000000005,52.27899999999999),C.bezierCurveTo(52.25300000000001,52.252999999999986,52.257000000000005,52.22899999999999,52.26200000000001,52.203999999999986),C.bezierCurveTo(52.821,49.322,53.164,45.925,54.929,43.536),C.closePath(),C.moveTo(7.824,32.147),C.bezierCurveTo(9.126,33.369,11.173,34.335,12.023,37.338),C.bezierCurveTo(13.794,43.587,18.366,49.317,22.16,49.131),C.bezierCurveTo(24.783,49.001,26.884,49.063,28.560000000000002,49.278),C.bezierCurveTo(31.543000000000003,49.657,37.226,55.057,37.439,55.400999999999996),C.bezierCurveTo(32.053,48.026999999999994,32.778999999999996,37.44499999999999,22.374000000000002,35.661),C.bezierCurveTo(18.918000000000003,35.067,16.714000000000002,33.874,14.684000000000001,31.96),C.bezierCurveTo(14.183000000000002,31.489,14.004000000000001,31.658,14.396,32.226),C.bezierCurveTo(16.233,34.871,18.035,37.265,19.93,37.785),C.bezierCurveTo(21.742,38.278999999999996,25.736,39.059999999999995,26.7,41.404999999999994),C.bezierCurveTo(27.117,42.407,26.947,43.434999999999995,26.227,44.288),C.bezierCurveTo(25.538,45.102,24.605,45.492,23.524,45.416999999999994),C.bezierCurveTo(19.928,45.163,16.083000000000002,39.788,14.592,37.495),C.bezierCurveTo(12.751000000000001,34.653999999999996,10.292000000000002,32.879,8.079,31.779999999999998),C.bezierCurveTo(7.546,31.517,7.394,31.738,7.824,32.147),C.closePath(),C.moveTo(31.848,62.13),C.bezierCurveTo(33.04,65.771,36.577,67.772,40.846,69.336),C.bezierCurveTo(46.315,71.337,56.775,70.085,56.998999999999995,76.02799999999999),C.bezierCurveTo(57.047999999999995,77.39599999999999,56.529999999999994,78.29899999999999,55.724999999999994,78.84299999999999),C.lineTo(72.66999999999999,85.74),C.bezierCurveTo(71.48599999999999,81.14399999999999,70.88099999999999,76.104,67.41599999999998,73.006),C.bezierCurveTo(64.72399999999999,70.598,61.886999999999986,68.93,57.73699999999998,67.452),C.bezierCurveTo(50.108,65.557,36.281,68.896,31.848,62.13),C.closePath(),C.moveTo(64.597,37.979),C.bezierCurveTo(64.613,37.972,64.63499999999999,37.963,64.654,37.957),C.bezierCurveTo(61.065999999999995,34.384,53.55199999999999,31.181,49.257,31.491),C.bezierCurveTo(54.224,32.971,57.47,35.879,60.772999999999996,39.564),C.bezierCurveTo(60.778999999999996,39.562,60.785,39.559,60.791,39.557),C.bezierCurveTo(61.104,39.423,61.418,39.294000000000004,61.73,39.166000000000004),C.bezierCurveTo(61.769999999999996,39.149,61.809999999999995,39.133,61.849,39.118),C.bezierCurveTo(62.175,38.983000000000004,62.5,38.852000000000004,62.821,38.723),C.bezierCurveTo(63.065999999999995,38.624,63.306999999999995,38.527,63.544999999999995,38.427),C.bezierCurveTo(63.623,38.396,63.699999999999996,38.363,63.775999999999996,38.333),C.bezierCurveTo(64.055,38.216,64.331,38.099,64.597,37.979),C.closePath(),C.moveTo(70.365,71.92),C.bezierCurveTo(70.365,71.92,72.375,75.456,72.955,78.41),C.bezierCurveTo(72.947,78.431,73.068,79.161,73.286,80.21),C.bezierCurveTo(73.369,80.62599999999999,73.462,81.059,73.556,81.449),C.lineTo(73.556,81.45),C.bezierCurveTo(73.955,83.19200000000001,74.524,85.31,75.17399999999999,86.76),C.lineTo(80.03899999999999,88.741),C.bezierCurveTo(80.44999999999999,88.314,80.847,87.825,81.27499999999999,87.336),C.bezierCurveTo(81.975,86.539,84.213,84.89,83.51199999999999,83.908),C.bezierCurveTo(82.96299999999998,83.139,83.65799999999999,81.667,84.27899999999998,80.468),C.bezierCurveTo(84.28899999999999,80.446,84.29999999999998,80.427,84.31099999999998,80.406),C.bezierCurveTo(84.37499999999997,80.281,84.43699999999998,80.161,84.49699999999999,80.046),C.bezierCurveTo(84.52399999999999,79.99600000000001,84.54899999999999,79.94600000000001,84.57499999999999,79.897),C.bezierCurveTo(84.603,79.842,84.63099999999999,79.789,84.65799999999999,79.73700000000001),C.bezierCurveTo(84.689,79.67500000000001,84.71799999999999,79.617,84.74599999999998,79.55900000000001),C.bezierCurveTo(84.76399999999998,79.522,84.78299999999999,79.48600000000002,84.79899999999998,79.45200000000001),C.bezierCurveTo(84.84199999999998,79.36100000000002,84.88099999999997,79.27600000000001,84.91299999999998,79.19700000000002),C.bezierCurveTo(85.55699999999999,77.63900000000001,85.70299999999999,77.41500000000002,86.83899999999998,76.43400000000001),C.bezierCurveTo(88.74099999999999,74.78800000000001,88.42699999999998,72.132,88.42699999999998,69.88100000000001),C.bezierCurveTo(88.42699999999998,69.76700000000001,88.41699999999997,69.66100000000002,88.39999999999998,69.56400000000002),C.bezierCurveTo(88.39599999999997,69.53400000000002,88.38699999999997,69.50700000000002,88.37999999999998,69.47900000000003),C.bezierCurveTo(88.36499999999998,69.41400000000003,88.34799999999998,69.35100000000003,88.32599999999998,69.29400000000003),C.bezierCurveTo(88.31499999999998,69.26700000000002,88.30399999999997,69.24000000000002,88.28999999999998,69.21400000000003),C.bezierCurveTo(88.26499999999997,69.16100000000003,88.23499999999997,69.11200000000002,88.20399999999998,69.06700000000002),C.bezierCurveTo(88.18999999999998,69.04900000000002,88.17699999999998,69.02800000000002,88.16199999999998,69.01000000000002),C.bezierCurveTo(88.11699999999998,68.95600000000002,88.06799999999998,68.90900000000002,88.01399999999998,68.86700000000002),C.bezierCurveTo(88.00599999999999,68.86200000000002,88.00099999999998,68.85600000000002,87.99399999999999,68.84900000000002),C.bezierCurveTo(87.92699999999999,68.80100000000002,87.85499999999999,68.76000000000002,87.77499999999999,68.72700000000002),C.lineTo(87.77199999999999,68.72600000000001),C.bezierCurveTo(87.695,68.69400000000002,87.61099999999999,68.67000000000002,87.523,68.65000000000002),C.bezierCurveTo(87.50999999999999,68.64700000000002,87.496,68.64400000000002,87.48299999999999,68.64200000000002),C.bezierCurveTo(87.40199999999999,68.62700000000002,87.31899999999999,68.61700000000002,87.231,68.61000000000003),C.bezierCurveTo(87.21799999999999,68.60900000000002,87.205,68.60800000000003,87.19,68.60700000000003),C.bezierCurveTo(87.092,68.60300000000002,86.989,68.60200000000003,86.881,68.60700000000003),C.lineTo(86.88,68.60700000000003),C.bezierCurveTo(87.51599999999999,70.70500000000003,87.395,72.85700000000003,86.044,74.20100000000002),C.bezierCurveTo(83.865,74.70600000000002,83.334,72.04500000000002,82.338,70.18600000000002),C.bezierCurveTo(82.255,70.17600000000002,82.17399999999999,70.16900000000003,82.092,70.16400000000002),C.bezierCurveTo(80.884,72.22400000000002,81.122,76.21100000000001,83.084,78.95400000000001),C.bezierCurveTo(82.909,78.825,82.735,78.688,82.561,78.551),C.bezierCurveTo(81.57900000000001,77.70400000000001,79.46700000000001,75.458,78.46700000000001,71.133),C.bezierCurveTo(78.46700000000001,71.133,78.46700000000001,71.13199999999999,78.46700000000001,71.131),C.bezierCurveTo(78.28000000000002,71.132,78.09100000000001,71.124,77.89800000000001,71.114),C.bezierCurveTo(77.83200000000001,71.10900000000001,77.766,71.10900000000001,77.69900000000001,71.104),C.bezierCurveTo(77.51800000000001,71.091,77.33500000000001,71.071,77.14900000000002,71.048),C.bezierCurveTo(77.06900000000002,71.038,76.98900000000002,71.029,76.90800000000002,71.018),C.bezierCurveTo(76.72600000000001,70.994,76.54200000000002,70.964,76.35600000000001,70.93),C.bezierCurveTo(76.27300000000001,70.91300000000001,76.188,70.899,76.10100000000001,70.881),C.bezierCurveTo(75.91600000000001,70.845,75.72900000000001,70.805,75.54100000000001,70.761),C.bezierCurveTo(75.45700000000001,70.741,75.37200000000001,70.72,75.28800000000001,70.699),C.bezierCurveTo(75.09700000000001,70.652,74.906,70.603,74.71400000000001,70.55),C.bezierCurveTo(74.63700000000001,70.529,74.56000000000002,70.505,74.48500000000001,70.483),C.bezierCurveTo(74.28400000000002,70.423,74.08200000000001,70.366,73.88100000000001,70.3),C.bezierCurveTo(73.83700000000002,70.285,73.79200000000002,70.27,73.74800000000002,70.255),C.bezierCurveTo(73.06100000000002,70.029,72.37900000000002,69.773,71.71300000000002,69.496),C.bezierCurveTo(71.63900000000002,69.46499999999999,71.56500000000003,69.43499999999999,71.49200000000002,69.404),C.bezierCurveTo(71.32600000000002,69.334,71.16300000000003,69.25999999999999,71.00000000000001,69.19),C.bezierCurveTo(70.89400000000002,69.142,70.78700000000002,69.095,70.68300000000002,69.04899999999999),C.bezierCurveTo(70.53500000000003,68.97999999999999,70.39000000000001,68.91199999999999,70.24500000000002,68.84299999999999),C.bezierCurveTo(70.12900000000002,68.78899999999999,70.01300000000002,68.73499999999999,69.89900000000002,68.67999999999999),C.bezierCurveTo(69.76500000000001,68.616,69.63400000000001,68.55,69.50400000000002,68.48599999999999),C.bezierCurveTo(69.38000000000002,68.42399999999999,69.26000000000002,68.36399999999999,69.13900000000002,68.30199999999999),C.bezierCurveTo(69.02200000000002,68.24,68.90500000000003,68.181,68.79000000000002,68.11999999999999),C.bezierCurveTo(68.66300000000003,68.053,68.53800000000003,67.98599999999999,68.41400000000002,67.91999999999999),C.bezierCurveTo(68.31200000000001,67.86499999999998,68.21000000000002,67.81099999999999,68.11200000000001,67.75699999999999),C.bezierCurveTo(67.974,67.67999999999999,67.84100000000001,67.60499999999999,67.709,67.52999999999999),C.bezierCurveTo(67.63300000000001,67.48599999999999,67.554,67.44299999999998,67.48,67.39999999999999),C.bezierCurveTo(67.27600000000001,67.28299999999999,67.08200000000001,67.16699999999999,66.897,67.05699999999999),C.bezierCurveTo(66.084,66.564,65.271,66.07099999999998,64.458,65.57799999999999),C.bezierCurveTo(66.605,67.353,68.335,69.36899999999999,69.941,71.374),C.bezierCurveTo(70.089,71.557,70.228,71.739,70.365,71.92),C.closePath(),C.moveTo(18.895,52.609),C.bezierCurveTo(18.895,52.655,18.894,52.697,18.893,52.736000000000004),C.bezierCurveTo(26.677,53.11600000000001,31.456000000000003,56.667,35.673,60.260000000000005),C.bezierCurveTo(36.964,61.361000000000004,37.978,62.522000000000006,39.424,63.45100000000001),C.bezierCurveTo(41.967,65.38000000000001,42.719,62.31300000000001,41.54,60.379000000000005),C.bezierCurveTo(39.61,56.751000000000005,32.411,54.226000000000006,29.069,53.26200000000001),C.bezierCurveTo(27.487,52.99,23.104,52.111,18.895,52.609),C.closePath(),C.moveTo(40.337,54.465),C.bezierCurveTo(40.337,54.465,42.117000000000004,61.884,50.233000000000004,64.162),C.bezierCurveTo(55.225,65.563,55.73800000000001,63.17300000000001,59.934000000000005,66.56200000000001),C.bezierCurveTo(54.452,56.665,45.999,65.93,40.337,54.465),C.closePath(),C.fill(),C.stroke(),C.restore(),C.restore(),C.save(),C.fillStyle="rgba(0, 0, 0, 0)",C.beginPath(),C.moveTo(18.922,63.863),C.lineTo(14.93,48.467),C.bezierCurveTo(13.777,43.475,7.845,41.157,4.304,40.204),C.bezierCurveTo(4.042,33.44,5.351,25.958,9.565,20.642),C.bezierCurveTo(16.003,12.523,26.936999999999998,11.190999999999999,31.886000000000003,10.437),C.bezierCurveTo(40.461,9.131,52.392,10.404,60.449,13.975),C.bezierCurveTo(67.872,17.268,73.045,24.829,75.154,32.538),C.bezierCurveTo(73.923,34.898999999999994,65.916,37.39,64.597,37.977999999999994),C.bezierCurveTo(61.501999999999995,39.361999999999995,57.352,40.53699999999999,55.135999999999996,43.257999999999996),C.bezierCurveTo(53.038999999999994,45.834999999999994,52.803,49.748,52.12499999999999,52.867),C.bezierCurveTo(51.36699999999999,56.352,53.49199999999999,58.933,56.260999999999996,60.613),C.bezierCurveTo(59.806999999999995,62.759,63.352999999999994,64.908,66.899,67.057),C.bezierCurveTo(70.04,68.956,76.042,71.821,79.926,70.983),C.bezierCurveTo(81.73,70.59400000000001,88.427,66.607,88.427,69.879),C.bezierCurveTo(88.427,72.13000000000001,88.741,74.786,86.83900000000001,76.432),C.bezierCurveTo(85.70300000000002,77.412,85.55700000000002,77.637,84.91300000000001,79.19500000000001),C.bezierCurveTo(84.44300000000001,80.334,82.739,82.82400000000001,83.513,83.908),C.bezierCurveTo(84.214,84.889,81.976,86.539,81.27600000000001,87.336),C.bezierCurveTo(80.84800000000001,87.825,80.45100000000001,88.315,80.04,88.741),C.lineTo(18.922,63.863),C.closePath(),C.fill(),C.stroke(),C.restore(),C.save(),C.fillStyle=t.visor,C.beginPath(),C.moveTo(46.385,27.782),C.lineTo(53.443999999999996,17.61),C.bezierCurveTo(53.553,17.458,53.666,17.317,53.778999999999996,17.182),C.lineTo(54.742999999999995,17.182),C.bezierCurveTo(56.053999999999995,15.544999999999998,58.67399999999999,15.817999999999998,58.67399999999999,15.817999999999998),C.bezierCurveTo(60.42199999999999,15.817999999999998,61.895999999999994,14.942999999999998,61.895999999999994,14.942999999999998),C.bezierCurveTo(63.224999999999994,14.306999999999999,64.44,13.122999999999998,65.317,12.109999999999998),C.bezierCurveTo(79.118,14.518999999999998,97.791,14.078999999999997,97.791,14.078999999999997),C.bezierCurveTo(101.238,14.048999999999998,96.213,17.191999999999997,96.213,17.191999999999997),C.bezierCurveTo(91.023,20.306999999999995,75.65899999999999,23.110999999999997,75.65899999999999,23.110999999999997),C.bezierCurveTo(67.97699999999999,24.666999999999998,66.317,27.781999999999996,66.317,27.781999999999996),C.lineTo(62.78699999999999,31.933999999999997),C.bezierCurveTo(59.25699999999999,36.086999999999996,55.10499999999999,35.047,55.10499999999999,35.047),C.lineTo(47.83899999999999,33.802),C.bezierCurveTo(42.44,32.765,46.385,27.782,46.385,27.782),C.closePath(),C.fill(),C.stroke(),C.restore(),C.save(),C.beginPath(),C.arc(51.302,29.904,2.02,0,6.283185307179586,!0),C.closePath(),C.fill(),C.stroke(),C.restore(),C.save(),C.beginPath(),C.moveTo(65.263,13.435),C.bezierCurveTo(75.227,15.155000000000001,87.52300000000001,15.421000000000001,94.21100000000001,15.421000000000001),C.bezierCurveTo(95.13700000000001,15.421000000000001,95.90800000000002,15.417000000000002,96.49800000000002,15.410000000000002),C.bezierCurveTo(96.18600000000002,15.641000000000002,95.84800000000001,15.876000000000001,95.51600000000002,16.083000000000002),C.bezierCurveTo(90.61000000000001,19.027,75.57500000000002,21.794000000000004,75.42300000000002,21.822000000000003),C.bezierCurveTo(68.00800000000001,23.323000000000004,65.72600000000001,26.255000000000003,65.24700000000001,27.015),C.lineTo(61.78800000000001,31.086),C.bezierCurveTo(59.84400000000001,33.372,57.738000000000014,33.853,56.31300000000001,33.853),C.bezierCurveTo(55.76000000000001,33.853,55.41600000000001,33.775,55.412000000000006,33.773),C.lineTo(55.37500000000001,33.765),C.lineTo(55.32600000000001,33.757),C.lineTo(48.06000000000001,32.510999999999996),C.bezierCurveTo(47.41400000000001,32.385,46.57000000000001,32.117999999999995,46.36700000000001,31.571999999999996),C.bezierCurveTo(46.05400000000001,30.729999999999997,46.95500000000001,29.175999999999995,47.41300000000001,28.595999999999997),C.lineTo(47.439000000000014,28.563999999999997),C.lineTo(47.46200000000002,28.529999999999998),C.lineTo(54.52200000000002,18.355999999999998),C.bezierCurveTo(55.77700000000002,16.598,57.40000000000002,16.407999999999998,58.03800000000002,16.407999999999998),C.bezierCurveTo(58.15400000000002,16.407999999999998,58.23300000000002,16.413999999999998,58.25800000000002,16.416999999999998),C.lineTo(58.335000000000015,16.426),C.lineTo(58.42800000000002,16.427999999999997),C.bezierCurveTo(61.10700000000002,16.427999999999997,63.283000000000015,14.869999999999997,63.37500000000002,14.803999999999997),C.lineTo(65.263,13.435),C.moveTo(57.334,10.849),C.bezierCurveTo(56.246,10.849,55.381,11.025,55.131,11.524000000000001),C.bezierCurveTo(55.131,11.524000000000001,57.829,11.908000000000001,62.604,13.745000000000001),C.bezierCurveTo(62.604,13.745000000000001,60.708999999999996,15.120000000000001,58.426,15.120000000000001),C.bezierCurveTo(58.426,15.120000000000001,58.282000000000004,15.099,58.036,15.099),C.bezierCurveTo(57.176,15.099,55.058,15.35,53.443,17.611),C.lineTo(46.384,27.783),C.bezierCurveTo(46.384,27.783,42.439,32.765,47.837,33.804),C.lineTo(55.103,35.049),C.bezierCurveTo(55.103,35.049,55.565000000000005,35.164,56.311,35.164),C.bezierCurveTo(57.802,35.164,60.432,34.703,62.784,31.935000000000002),C.lineTo(66.314,27.783),C.bezierCurveTo(66.314,27.783,67.975,24.668,75.65599999999999,23.112000000000002),C.bezierCurveTo(75.65599999999999,23.112000000000002,91.02,20.308000000000003,96.21,17.193),C.bezierCurveTo(96.21,17.193,101.184,14.080000000000002,97.838,14.080000000000002),C.bezierCurveTo(97.821,14.080000000000002,97.80499999999999,14.080000000000002,97.78699999999999,14.080000000000002),C.bezierCurveTo(97.78699999999999,14.080000000000002,96.442,14.112000000000002,94.208,14.112000000000002),C.bezierCurveTo(87.77,14.112000000000002,73.941,13.848000000000003,63.613,11.798000000000002),C.bezierCurveTo(63.616,11.797,59.87,10.849,57.334,10.849),C.lineTo(57.334,10.849),C.closePath(),C.fill(),C.stroke(),C.restore()},v.getVersions=function(){return o},v.getBaseWidth=function(){return 115},v.getBaseHeight=function(){return 100},v.getDrawOffsetX=function(){return 2},v.getDrawOffsetY=function(){return 0},v.getScale=function(){return.21},GameInventoryManager&&GameInventoryManager.register("downhill_flames",e),"undefined"!=typeof exports&&("undefined"!=typeof module&&module.exports&&(exports=module.exports=e),exports.Downhill_Flames=e)}();