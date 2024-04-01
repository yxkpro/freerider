//gravity en double -> powerup ET physique :(

function vector(x, y)
{
    this.x = x;
    this.y = y;
}
vector.prototype.o = function ()
{
    return new vector((this.x - currentGame.A5.x) * currentGame.zoom + p.width / 2, (this.y - currentGame.A5.y) * currentGame.zoom + p.height / 2);
};
vector.prototype.Cr = function ()
{
    return new vector((this.x - p.width / 2) / currentGame.zoom + currentGame.A5.x, (this.y - p.height / 2) / currentGame.zoom + currentGame.A5.y);
};
vector.prototype.takeValueOf = function (U)
{
    this.x = U.x;
    this.y = U.y;
};
vector.prototype.Ai = function (U)
{
    this.x += U.x;
    this.y += U.y;
};
vector.prototype.add = function (U)
{
    return new vector(this.x + U.x, this.y + U.y);
};
vector.prototype.sub = function (U)
{
    return new vector(this.x - U.x, this.y - U.y);
};
vector.prototype.F = function (DF)
{
    return new vector(this.x * DF, this.y * DF);
};
vector.prototype.Bd = function (U)
{
    return this.x * U.x + this.y * U.y;
};
vector.prototype.Bc = function (Cw)
{
    return new vector(this.x / Cw, this.y / Cw);
};
vector.prototype.length = function ()
{
    return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
};
vector.prototype.Ae = function ()
{
    return Math.pow(this.x, 2) + Math.pow(this.y, 2);
};

function Ah(G, parent)
{
    this.G = new vector(G.x, G.y);
    this._ = new vector(G.x, G.y);
    this.g = new vector(0, 0);
    this.parent = parent;
    this.Al = 10;//10
    this.B6 = 0;
    this.Ad = true;
}
Ah.prototype.drive = function (O)
{
    this.G.Ai(O.F(-O.Bd(this.g) * this.B6));
    this.touchGround = true;
};
Ah.prototype.update = function ()
{
	
    this.g.Ai(this.parent.gravity);//this.parent.gravity
    if(zeroGrav)
    {
    	this.g = this.g.F(1);
    }
    else
    {
    	this.g = this.g.F(0.99);
    }
    this.G.Ai(this.g);//this.g
    this.touchGround = false;
    if(this.Ad)
    {
        currentGame.Ad(this);
    }
    this.g = this.G.sub(this._);
    this._.takeValueOf(this.G);
    
};

function Ba(G, parent)
{
    this.G = new vector(G.x, G.y);
    this._ = new vector(G.x, G.y);
    this.g = new vector(0, 0);
    this.parent = parent;
    this.Al = 10;//10
    this.B6 = 0;
    this.Ad = true;//true
    this.gravity = true;//true
    this.Bq = 0;
    this.AX = 0;
}
Ba.prototype.drive = function (O)
{
    this.G.Ai(O.F(this.AX * this.parent.O));
    if(this.brake)
    {
        this.G.Ai(O.F(-O.Bd(this.g) * 0.3));
    }
    this.Bq = O.Bd(this.g) / this.Al;
    this.touchGround = true;
};
Ba.prototype.update = function ()
{
    this.g.Ai(this.parent.gravity);
    if(zeroGrav)
    {
    	this.g = this.g.F(1);
    }
    else
    {
    	this.g = this.g.F(0.99);
    }
    this.G.Ai(this.g);
    this.touchGround = false;//false
    if(this.Ad)
    {
        currentGame.Ad(this);
    }
    this.g = this.G.sub(this._);
    this._.takeValueOf(this.G);
};

function particle(G, parent)
{
    this.G = new vector(G.x + 5 * (Math.random() - Math.random()), G.y + 5 * (Math.random() - Math.random()));
    this._ = new vector(this.G.x, this.G.y);
    this.g = new vector(11 * (Math.random() - Math.random()), 11 * (Math.random() - Math.random()));
    this.parent = parent;
    this.Al = 2 + Math.random() * 9;
    this.Ak = Math.random() * 6.2;
    this.Bq = Math.random() - Math.random();
    this.B6 = 0.05;
    this.Ad = true;
    this.DG = new Array(1, 0.7, 0.8, 0.9, 0.5, 1, 0.7, 1);
}
particle.prototype.draw = function ()
{
    var M = this.G.o();
    this.Ak += this.Bq;
    var AS = this.DG[0] * this.Al / 2;
    var L = M.x + AS * Math.cos(this.Ak);
    var N = M.y + AS * Math.sin(this.Ak);
    B.beginPath();
    B.fillStyle = "red";
    B.moveTo(L, N);
    for(var AA = 2; AA < 8; AA++)
    {
        AS = this.DG[AA - 1] * this.Al / 2;
        L = M.x + AS * Math.cos(this.Ak + 6.283 * AA / 8);
        N = M.y + AS * Math.sin(this.Ak + 6.283 * AA / 8);
        B.lineTo(L, N);
    }
    B.fill();
};
particle.prototype.drive = function (O)
{
    this.Bq = O.Bd(this.g) / this.Al;
    this.G.Ai(O.F(-O.Bd(this.g) * this.B6));
    this.Ak += this.Bq;
    var AA = O.length();
    if(AA > 0)
    {
        var AS = new vector(-O.y / AA, O.x / AA);
        this._.Ai(AS.F(AS.Bd(this.g) * 0.8));
    }
};
particle.prototype.update = function ()
{
    this.g.Ai(this.parent.gravity);
    if(zeroGrav)
    {
    	this.g = this.g.F(1);
    }
    else
    {
    	this.g = this.g.F(0.99);
    }
    this.G.Ai(this.g);
    this.touchGround = false;
    if(this.Ad)
    {
        currentGame.Ad(this);
    }
    this.g = this.G.sub(this._);
    this._.takeValueOf(this.G);
};

function Ac(A2, A4, parent)
{
    this.A2 = A2;
    this.A4 = A4;
    this.parent = parent;
    this.A1 = 40;
    this.AB = 40;
    this.BE = 0.5;
    this.BC = 0.7;
}
Ac.prototype.A3 = function (AH, AK)
{
    this.AB = this.AB + (this.A1 - AH - this.AB) / AK;
};
Ac.prototype.rotate = function (Bz)
{
    var AJ = this.A4.G.sub(this.A2.G);
    var DU = new vector(-AJ.y / this.AB, AJ.x / this.AB);
    this.A2.G.Ai(DU.F(Bz));
    this.A4.G.Ai(DU.F(-Bz));
};
Ac.prototype.update = function ()
{
    var AJ = this.A4.G.sub(this.A2.G);
    var length = AJ.length();
    if(length < 1)
    {
        return;
    }
    AJ = AJ.F(1 / length);
    var DD = AJ.F((length - this.AB) * this.BC);
    var B6 = this.A4.g.sub(this.A2.g).Bd(AJ) * this.BE;
    DD.Ai(AJ.F(B6));
    this.A4.g.Ai(DD.F(-1));//-1
    this.A2.g.Ai(DD);
};
Ac.prototype.orientation = function ()
{
    var CE = new vector;
    CE.takeValueOf(this.A2.G);
    this.A2.G.takeValueOf(this.A4.G);
    this.A4.G.takeValueOf(CE);
    CE.takeValueOf(this.A2._);
    this.A2._.takeValueOf(this.A4._);
    this.A4._.takeValueOf(CE);
    CE.takeValueOf(this.A2.g);
    this.A2.g.takeValueOf(this.A4.g);
    this.A4.g.takeValueOf(CE);
    var Da = this.A2.Ak;
    this.A2.Ak = this.A4.Ak;
    this.A4.Ak = Da;
};

function BMX()
{
    this.D = new Array;
    this.D.push(new Ah(new vector(Z[Z.length - 1][0], Z[Z.length - 1][1]), this));
    this.D[0]._ = new vector(Z[Z.length - 1][2], Z[Z.length - 1][3]);
    this.D[0].g = new vector(Z[Z.length - 1][4], Z[Z.length - 1][5]);
    this.D.push(new Ba(new vector(Z[Z.length - 1][6], Z[Z.length - 1][7]), this));
    this.D[1]._ = new vector(Z[Z.length - 1][8], Z[Z.length - 1][9]);
    this.D[1].g = new vector(Z[Z.length - 1][10], Z[Z.length - 1][11]);
    this.D[1].AX = Z[Z.length - 1][12];
    this.D.push(new Ba(new vector(Z[Z.length - 1][13], Z[Z.length - 1][14]), this));
    this.D[2]._ = new vector(Z[Z.length - 1][15], Z[Z.length - 1][16]);
    this.D[2].g = new vector(Z[Z.length - 1][17], Z[Z.length - 1][18]);
    this.D[2].AX = Z[Z.length - 1][19];
    this.h = this.D[0];
    this.h.Al = 14;//14
    this.h.drive = function ()
    {
        currentVehicle.die();
    };
    this.roueArriere = this.D[1];
    this.roueArriere.Al = 11.7;//11.7  //-----------------------------------Collision roue brakeRIERE
    this.roueAvant = this.D[2];
    this.roueAvant.Al =11.7;//11.7  //-----------------------------------Collision roue AVtakeValueOfT
    this.S = new Array;
    this.S.push(new Ac(this.D[0], this.D[1], this));
    this.S.push(new Ac(this.D[1], this.D[2], this));
    this.S.push(new Ac(this.D[2], this.D[0], this));
    this.AM = this.S[0];
    this.AM.A1 = 45;//45 ---------------------------------------------Penche avant
    this.AM.AB = Z[Z.length - 1][20];
    this.AM.BC = 0.35;//0.35
    this.AM.BE = 0.3;//0.3
    this.AQ = this.S[1];
    this.AQ.A1 = 42;//42
    this.AQ.AB = Z[Z.length - 1][21];
    this.AQ.BC = 0.35;//0.35
    this.AQ.BE = 0.3;//0.3
    this.AU = this.S[2];
    this.AU.A1 = 45;//45-----------------------------------------------Penche arriere
    this.AU.AB = Z[Z.length - 1][22];
    this.AU.BC = 0.35;//0.35
    this.AU.BE = 0.3;//0.3
    this.save = false;
    this.dead = false;
    this.legsangle = 0;//0 //------------------------------------------------LEGS takeValueOfGLE
    this.O = Z[Z.length - 1][23];
    this.gravity = new vector(Z[Z.length - 1][24], Z[Z.length - 1][25]);
    this.slowMotioned = Z[Z.length - 1][26];
    currentGame.numberOfTargetCollected = Z[Z.length - 1][27];
    for(var j = 0; j < currentGame.AD.length; j++)
    {
        currentGame.AD[j].BM = Z[Z.length - 1][28][j];
    }
    this.Bj = 0;
    this.Bm = 0;
    this.Br = 0;
    this.Bo = 0;
    this.z = Z[Z.length - 1][29];
    if(this.z)
    {
        this.Bj = Z[Z.length - 1][30];
        this.Bm = Z[Z.length - 1][31];
        this.Br = Z[Z.length - 1][32];
        this.Bo = Z[Z.length - 1][33];
        for(var BD = 0; BD < AZ.length; BD++)
        {
            for(var BJ in AZ[BD])
            {
                if(BJ >= this.z)
                {
                    delete AZ[BD][BJ];
                }
            }
        }
    }
    else
    {
        AZ = new Array(new Array, new Array, new Array, new Array, new Array);
    }
}
BMX.prototype.orientation = function ()
{
    Ct = orientation = false;
    this.O *= -1;
    this.AQ.orientation();
    var AM = this.S[0].AB;
    this.AM.AB = this.S[2].AB;
    this.AU.AB = AM;
};
BMX.prototype.complete = function ()
{
    this.save = false;
    if(currentGame.totalNumberOfTarget && currentGame.numberOfTargetCollected == currentGame.totalNumberOfTarget)
    {
        var currentGhostCode = "";
        for(var BJ = 0; BJ < AZ.length; BJ++) //NINJAAAA
        {
            for(var Ay in AZ[BJ])
            {
                if(Ay!="")
                {
                    currentGhostCode += Ay + " ";
                }


            }
            currentGhostCode += ",";
        }
        var e = document.getElementById("saveg");
		var strGhost = e.options[e.selectedIndex].value;
		if(strGhost=="saveAll" || (strGhost=="saveBest" && this.z < currentBestTime))
		{
			document.getElementById("ghostcode").value = currentGhostCode+this.z+" ,BMX";
			currentBestTime = this.z;
		}
        left = right = pedaling = brake = 0;
    }
    else
    {
        Z.push(new Array(this.D[0].G.x, this.D[0].G.y, this.D[0]._.x, this.D[0]._.y, this.D[0].g.x, this.D[0].g.y, this.D[1].G.x, this.D[1].G.y, this.D[1]._.x, this.D[1]._.y, this.D[1].g.x, this.D[1].g.y, this.D[1].AX, this.D[2].G.x, this.D[2].G.y, this.D[2]._.x, this.D[2]._.y, this.D[2].g.x, this.D[2].g.y, this.D[2].AX, this.S[0].AB, this.S[1].AB, this.S[2].AB, this.O, this.gravity.x, this.gravity.y, this.slowMotioned, currentGame.numberOfTargetCollected, new Array, this.z, this.Bj, this.Bm, this.Br, this.Bo));
        for(var j = 0; j < currentGame.AD.length; j++)
        {
            Z[Z.length - 1][28].push(currentGame.AD[j].BM);
        }
        if(W)
        {
            K.push(new Array(W.D[0].G.x, W.D[0].G.y, W.D[0]._.x, W.D[0]._.y, W.D[0].g.x, W.D[0].g.y, W.D[1].G.x, W.D[1].G.y, W.D[1]._.x, W.D[1]._.y, W.D[1].g.x, W.D[1].g.y, W.D[1].AX, W.D[2].G.x, W.D[2].G.y, W.D[2]._.x, W.D[2]._.y, W.D[2].g.x, W.D[2].g.y, W.D[2].AX, W.S[0].AB, W.S[1].AB, W.S[2].AB, W.O, W.gravity.x, W.gravity.y, W.slowMotioned, W.left, W.right, W.pedaling, W.brake));
        }
    }
};

BMX.prototype.BS = function ()
{
    if(orientation)
    {
        this.orientation();
    }
    this.roueArriere.AX += (pedaling - this.D[1].AX) / 10;// Acceleration par la roue arrière /10
    if(pedaling)
    {
        this.legsangle += this.roueArriere.Bq/3.5; //------Vitesse de rot des jambes, normalement /5
    }
    this.roueArriere.brake = this.roueAvant.brake = brake;
    var As = left - right;
    
    this.AM.A3(As * 5 * this.O, 5);//5
    this.AU.A3(-As * 5 * this.O, 5);//5

    this.AQ.rotate(As / 6); //6/
    if(!As && pedaling)
    {
        this.AM.A3(-7, 5);
        this.AU.A3(7, 5);
    }
};
BMX.prototype.draw = function ()
{
    var Q = this.roueArriere.G.o();
    var AI = this.roueAvant.G.o();
    B.beginPath();
    if(noDieMod)
	{
		B.strokeStyle = "DarkRed";
	   }
	else
	{
		B.strokeStyle = "black";
	}
	B.lineWidth = 3.5 * currentGame.zoom;//epaisseur roues
    B.arc(Q.x, Q.y, 10* currentGame.zoom, 0, 2 * Math.PI, true);
    B.moveTo(AI.x + 10 * currentGame.zoom, AI.y);
    B.arc(AI.x, AI.y, 10 * currentGame.zoom, 0, 2 * Math.PI, true);
    B.stroke();
    var length = AI.sub(Q);
    var AC = new vector((AI.y - Q.y) * this.O, (Q.x - AI.x) * this.O);
    var A$ = Q.add(length.F(0.3)).add(AC.F(0.25));
    var Ca = Q.add(length.F(0.84)).add(AC.F(0.42));
    var Cf = Q.add(length.F(0.84)).add(AC.F(0.37));
    var BG = Q.add(length.F(0.4)).add(AC.F(0.05));
    B.beginPath();
    B.lineWidth = 3 * currentGame.zoom;
    B.moveTo(Q.x, Q.y);
    B.lineTo(A$.x, A$.y);
    B.lineTo(Ca.x, Ca.y);
    B.moveTo(Cf.x, Cf.y);
    B.lineTo(BG.x, BG.y);
    B.lineTo(Q.x, Q.y);
    var CY = new vector(6 * Math.cos(this.legsangle) * currentGame.zoom, 6 * Math.sin(this.legsangle) * currentGame.zoom);
    var BV = BG.add(CY);
    var BW = BG.sub(CY);
    B.moveTo(BV.x, BV.y);
    B.lineTo(BW.x, BW.y);
    var CS = Q.add(length.F(0.17)).add(AC.F(0.38));
    var Cg = Q.add(length.F(0.3)).add(AC.F(0.45));
    B.moveTo(CS.x, CS.y);
    B.lineTo(Cg.x, Cg.y);
    var Ci = Q.add(length.F(0.25)).add(AC.F(0.4));
    B.moveTo(BG.x, BG.y);
    B.lineTo(Ci.x, Ci.y);
    var Cj = Q.add(length.F(1)).add(AC.F(0));
    var Cl = Q.add(length.F(0.97)).add(AC.F(0));
    var CO = Q.add(length.F(0.8)).add(AC.F(0.48));
    var CQ = Q.add(length.F(0.86)).add(AC.F(0.5));
    var Ck = Q.add(length.F(0.82)).add(AC.F(0.65));
    var BL = Q.add(length.F(0.78)).add(AC.F(0.67));
    B.moveTo(Cj.x, Cj.y);
    B.lineTo(Cl.x, Cl.y);
    B.lineTo(CO.x, CO.y);
    B.lineTo(CQ.x, CQ.y);
    B.lineTo(Ck.x, Ck.y);
    B.lineTo(BL.x, BL.y);
    B.stroke();
    if(this.dead)
    {
        return;
    }
    var h = this.h.G.o();
    AC = h.sub(Q.add(length.F(0.5)));
    var An = A$.add(length.F(-0.1)).add(AC.F(0.3));
    var Ar = BV.sub(An);
    var BA = new vector(Ar.y * this.O, -Ar.x * this.O);
    BA = BA.F(currentGame.zoom * currentGame.zoom);
    var Cn = An.add(Ar.F(0.5)).add(BA.F(200 / Ar.Ae()));
    Ar = BW.sub(An);
    BA = new vector(Ar.y * this.O, -Ar.x * this.O);
    BA = BA.F(currentGame.zoom * currentGame.zoom);
    var Co = An.add(Ar.F(0.5)).add(BA.F(200 / Ar.Ae()));
    B.beginPath();
    B.lineWidth = 6 * currentGame.zoom;
   	if(noDieMod)
	{
		B.strokeStyle = "rgba(139, 0, 0, 0.5)";
	}
	else
	{
		B.strokeStyle = "rgba(0, 0, 0, 0.5)";
	}
    B.moveTo(BW.x, BW.y);
    B.lineTo(Co.x, Co.y);
    B.lineTo(An.x, An.y);
    B.stroke();
    B.beginPath();
    if(noDieMod)
	{
		B.strokeStyle = "DarkRed";
	   }
	else
	{
		B.strokeStyle = "black";
	}
    B.moveTo(BV.x, BV.y);
    B.lineTo(Cn.x, Cn.y);
    B.lineTo(An.x, An.y);
    B.stroke();
    var BY = A$.add(length.F(0.05)).add(AC.F(0.9));
    B.beginPath();
    B.lineWidth = 8 * currentGame.zoom;
    B.moveTo(An.x, An.y);
    B.lineTo(BY.x, BY.y);
    B.stroke();
    var Bs = A$.add(length.F(0.15)).add(AC.F(1.05));
    var Ch = A$.add(length.F(0.4)).add(AC.F(1.1));
    var Cd = A$.add(length.F(0.05)).add(AC.F(1.05));
    B.beginPath();
    B.lineWidth = 2 * currentGame.zoom;
    B.moveTo(Bs.x + 5 * currentGame.zoom, Bs.y);
    B.arc(Bs.x, Bs.y, 5 * currentGame.zoom, 0, 2 * Math.PI, true);
    B.moveTo(Ch.x, Ch.y);
    B.lineTo(Cd.x, Cd.y);
    B.stroke();
    length = BY.sub(BL);
    AC = new vector(length.y * this.O, -length.x * this.O);
    AC = AC.F(currentGame.zoom * currentGame.zoom);
    var CV = BL.add(length.F(0.4)).add(AC.F(130 / length.Ae()));
    B.beginPath();
    B.lineWidth = 5 * currentGame.zoom;
    B.moveTo(BY.x, BY.y);
    B.lineTo(CV.x, CV.y);
    B.lineTo(BL.x, BL.y);
    B.stroke();
};
BMX.prototype.C1 = function ()
{
    var $ = new Object;
    var AQ = this.roueAvant.G.sub(this.roueArriere.G);
    var AA = this.h.G.sub(this.roueAvant.G.add(this.roueArriere.G).F(0.5));
    var AS = new vector(AQ.y * this.O, -AQ.x * this.O);
    $.h = this.roueArriere.G.add(AQ.F(0.35)).add(AA.F(1.2));
    $.BO = $.B0 = this.roueArriere.G.add(AQ.F(0.8)).add(AS.F(0.68));
    var N = $.h.sub($.BO);
    N = new vector(N.y * this.O, -N.x * this.O);
    $.Bx = $.Bu = $.h.add($.BO).F(0.5).add(N.F(130 / N.Ae()));
    $.Ab = this.roueArriere.G.add(AQ.F(0.2)).add(AS.F(0.5));
    var R = new vector(6 * Math.cos(this.legsangle), 6 * Math.sin(this.legsangle));
    $.BQ = this.roueArriere.G.add(AQ.F(0.4)).add(AS.F(0.05)).add(R);
    N = $.Ab.sub($.BQ);
    N = new vector(-N.y * this.O, N.x * this.O);
    $.Bw = $.Ab.add($.BQ).F(0.5).add(N.F(160 / N.Ae()));
    $.BN = this.roueArriere.G.add(AQ.F(0.4)).add(AS.F(0.05)).sub(R);
    N = $.Ab.sub($.BN);
    N = new vector(-N.y * this.O, N.x * this.O);
    $.Bv = $.Ab.add($.BN).F(0.5).add(N.F(160 / N.Ae()));
    return $;
};
BMX.prototype.die = function ()//--reset
{
    this.dead = !noDieMod;//false -> ne meurt pas
    this.h.drive = function () {};
    this.roueArriere.AX = 0;//0
    this.roueArriere.brake = false;
    this.roueAvant.brake = false;
    this.h.Ad = noDieMod;//------------false --> pas de collision avec le bonhomme
    if(!noDieMod)
	{
		currentVehicle = new Cadavre(this, this.C1());
	}
};
BMX.prototype.update = function ()
{
    if(this.save)  //For saving ghost
    {
        this.complete();
    }
    if(left != this.Bj)
    {
        AZ[0][this.z] = 1;
        this.Bj = left;
    }
    if(right != this.Bm)
    {
        AZ[1][this.z] = 1;
        this.Bm = right;
    }
    if(pedaling != this.Br)
    {
        AZ[2][this.z] = 1;
        this.Br = pedaling;
    }
    if(brake != this.Bo)
    {
        AZ[3][this.z] = 1;
        this.Bo = brake;
    }
    if(orientation)
    {
        AZ[4][this.z] = 1;
    }
    if(!this.dead)
    {
        this.BS();
    }
    for(var T = this.S.length - 1; T >= 0; T--)
    {
        this.S[T].update();
    }
    for(var u = this.D.length - 1; u >= 0; u--)
    {
        this.D[u].update();
    }
    
    if(this.roueArriere.touchGround && this.roueAvant.touchGround)
    {
        this.slowMotioned = false;
    }
    
    if(!this.slowMotioned && !this.dead)
    {
        this.BS();
        for(var T = this.S.length - 1; T >= 0; T--)
        {
            this.S[T].update();
        }
        for(var u = this.D.length - 1; u >= 0; u--)
        {
            this.D[u].update();
        }
    }
};

function ghostBMX(currentGhostCode)
{
    this.D = new Array;
    this.D.push(new Ah(new vector(K[K.length - 1][0], K[K.length - 1][1]), this));
    this.D[0]._ = new vector(K[K.length - 1][2], K[K.length - 1][3]);
    this.D[0].g = new vector(K[K.length - 1][4], K[K.length - 1][5]);
    this.D.push(new Ba(new vector(K[K.length - 1][6], K[K.length - 1][7]), this));
    this.D[1]._ = new vector(K[K.length - 1][8], K[K.length - 1][9]);
    this.D[1].g = new vector(K[K.length - 1][10], K[K.length - 1][11]);
    this.D[1].AX = K[K.length - 1][12];
    this.D.push(new Ba(new vector(K[K.length - 1][13], K[K.length - 1][14]), this));
    this.D[2]._ = new vector(K[K.length - 1][15], K[K.length - 1][16]);
    this.D[2].g = new vector(K[K.length - 1][17], K[K.length - 1][18]);
    this.D[2].AX = K[K.length - 1][19];
    this.h = this.D[0];
    this.h.Al = 14;
    this.h.drive = function ()
    {
    	if(!noDieModForGhost)
    	{
    		W = false;
    	}
        
    };
    this.roueArriere = this.D[1];
    this.roueArriere.Al = 11.7;
    this.roueAvant = this.D[2];
    this.roueAvant.Al = 11.7;
    this.S = new Array;
    this.S.push(new Ac(this.D[0], this.D[1], this));
    this.S.push(new Ac(this.D[1], this.D[2], this));
    this.S.push(new Ac(this.D[2], this.D[0], this));
    this.AM = this.S[0];
    this.AM.A1 = 45;
    this.AM.AB = K[K.length - 1][20];
    this.AM.BC = 0.35;
    this.AM.BE = 0.3;
    this.AQ = this.S[1];
    this.AQ.A1 = 42;
    this.AQ.AB = K[K.length - 1][21];
    this.AQ.BC = 0.35;
    this.AQ.BE = 0.3;
    this.AU = this.S[2];
    this.AU.A1 = 45;
    this.AU.AB = K[K.length - 1][22];
    this.AU.BC = 0.35;
    this.AU.BE = 0.3;
    this.Cq = true;
    this.legsangle = 0;
    this.O = K[K.length - 1][23];
    this.gravity = new vector(K[K.length - 1][24], K[K.length - 1][25]);
    this.slowMotioned = K[K.length - 1][26];
    this.left = K[K.length - 1][27];
    this.right = K[K.length - 1][28];
    this.pedaling = K[K.length - 1][29];
    this.brake = K[K.length - 1][30];
    this.currentGhostCode = currentGhostCode;
    this.z = this.currentGhostCode[5];
}
ghostBMX.prototype.orientation = function ()
{
    this.O *= -1;
    this.AQ.orientation();
    var AM = this.S[0].AB;
    this.AM.AB = this.S[2].AB;
    this.AU.AB = AM;
};
ghostBMX.prototype.BS = function ()
{
    this.roueArriere.AX += (this.pedaling - this.D[1].AX) / 10;
    if(this.pedaling)
    {
        this.legsangle += this.roueArriere.Bq / 5;
    }
    this.roueArriere.brake = this.roueAvant.brake = this.brake;
    var As = this.left - this.right;
    this.AM.A3(As * 5 * this.O, 5);
    this.AU.A3(-As * 5 * this.O, 5);
    this.AQ.rotate(As / 6);
    if(!As && this.pedaling)
    {
        this.AM.A3(-7, 5);
        this.AU.A3(7, 5);
    }
};
ghostBMX.prototype.draw = function ()
{
    var Q = this.roueArriere.G.o();
    var AI = this.roueAvant.G.o();
    B.beginPath();
    if(noDieModForGhost)
	{
		B.strokeStyle = "rgba(139, 0, 0, 0.5)";
	}
	else
	{
		B.strokeStyle = "rgba(0, 0, 0, 0.5)";
	} 
    B.lineWidth = 3.5 * currentGame.zoom;
    B.arc(Q.x, Q.y, 10 * currentGame.zoom, 0, 2 * Math.PI, true);
    B.moveTo(AI.x + 10 * currentGame.zoom, AI.y);
    B.arc(AI.x, AI.y, 10 * currentGame.zoom, 0, 2 * Math.PI, true);
    B.stroke();
    var length = AI.sub(Q);
    var AC = new vector((AI.y - Q.y) * this.O, (Q.x - AI.x) * this.O);
    var A$ = Q.add(length.F(0.3)).add(AC.F(0.25));
    var Ca = Q.add(length.F(0.84)).add(AC.F(0.42));
    var Cf = Q.add(length.F(0.84)).add(AC.F(0.37));
    var BG = Q.add(length.F(0.4)).add(AC.F(0.05));
    B.beginPath();
    B.lineWidth = 3 * currentGame.zoom;
    B.moveTo(Q.x, Q.y);
    B.lineTo(A$.x, A$.y);
    B.lineTo(Ca.x, Ca.y);
    B.moveTo(Cf.x, Cf.y);
    B.lineTo(BG.x, BG.y);
    B.lineTo(Q.x, Q.y);
    var CY = new vector(6 * currentGame.zoom * Math.cos(this.legsangle), 6 * currentGame.zoom * Math.sin(this.legsangle));
    var BV = BG.add(CY);
    var BW = BG.sub(CY);
    B.moveTo(BV.x, BV.y);
    B.lineTo(BW.x, BW.y);
    var CS = Q.add(length.F(0.17)).add(AC.F(0.38));
    var Cg = Q.add(length.F(0.3)).add(AC.F(0.45));
    B.moveTo(CS.x, CS.y);
    B.lineTo(Cg.x, Cg.y);
    var Ci = Q.add(length.F(0.25)).add(AC.F(0.4));
    B.moveTo(BG.x, BG.y);
    B.lineTo(Ci.x, Ci.y);
    var Cj = Q.add(length.F(1)).add(AC.F(0));
    var Cl = Q.add(length.F(0.97)).add(AC.F(0));
    var CO = Q.add(length.F(0.8)).add(AC.F(0.48));
    var CQ = Q.add(length.F(0.86)).add(AC.F(0.5));
    var Ck = Q.add(length.F(0.82)).add(AC.F(0.65));
    var BL = Q.add(length.F(0.78)).add(AC.F(0.67));
    B.moveTo(Cj.x, Cj.y);
    B.lineTo(Cl.x, Cl.y);
    B.lineTo(CO.x, CO.y);
    B.lineTo(CQ.x, CQ.y);
    B.lineTo(Ck.x, Ck.y);
    B.lineTo(BL.x, BL.y);
    B.stroke();
    var h = this.h.G.o();
    AC = h.sub(Q.add(length.F(0.5)));
    var An = A$.add(length.F(-0.1)).add(AC.F(0.3));
    var Ar = BV.sub(An);
    var BA = new vector(Ar.y * this.O, -Ar.x * this.O);
    BA = BA.F(currentGame.zoom * currentGame.zoom);
    var Cn = An.add(Ar.F(0.5)).add(BA.F(200 / Ar.Ae()));
    Ar = BW.sub(An);
    BA = new vector(Ar.y * this.O, -Ar.x * this.O);
    BA = BA.F(currentGame.zoom * currentGame.zoom);
    var Co = An.add(Ar.F(0.5)).add(BA.F(200 / Ar.Ae()));
    B.beginPath();
    B.lineWidth = 6 * currentGame.zoom;
    if(noDieModForGhost)
	{
		B.strokeStyle = "rgba(139, 0, 0, 0.25)";
	}
	else
	{
		B.strokeStyle = "rgba(0, 0, 0, 0.25)";
	} 
    B.moveTo(BW.x, BW.y);
    B.lineTo(Co.x, Co.y);
    B.lineTo(An.x, An.y);
    B.stroke();
    B.beginPath();
    if(noDieModForGhost)
	{
		B.strokeStyle = "rgba(139, 0, 0, 0.5)";
	}
	else
	{
		B.strokeStyle = "rgba(0, 0, 0, 0.5)";
	} 
    B.lineWidth = 6 * currentGame.zoom;
    B.moveTo(BV.x, BV.y);
    B.lineTo(Cn.x, Cn.y);
    B.lineTo(An.x, An.y);
    B.stroke();
    var BY = A$.add(length.F(0.05)).add(AC.F(0.9));
    B.beginPath();
    B.lineWidth = 8 * currentGame.zoom;
    B.moveTo(An.x, An.y);
    B.lineTo(BY.x, BY.y);
    B.stroke();
    var Bs = A$.add(length.F(0.15)).add(AC.F(1.05));
    var Ch = A$.add(length.F(0.4)).add(AC.F(1.1));
    var Cd = A$.add(length.F(0.05)).add(AC.F(1.05));
    B.beginPath();
    B.lineWidth = 2 * currentGame.zoom;
    B.moveTo(Bs.x + 5 * currentGame.zoom, Bs.y);
    B.arc(Bs.x, Bs.y, 5 * currentGame.zoom, 0, 2 * Math.PI, true);
    B.moveTo(Ch.x, Ch.y);
    B.lineTo(Cd.x, Cd.y);
    B.stroke();
    length = BY.sub(BL);
    AC = new vector(length.y * this.O, -length.x * this.O);
    AC = AC.F(currentGame.zoom * currentGame.zoom);
    var CV = BL.add(length.F(0.4)).add(AC.F(130 / length.Ae()));
    B.beginPath();
    B.lineWidth = 5 * currentGame.zoom;
    B.moveTo(BY.x, BY.y);
    B.lineTo(CV.x, CV.y);
    B.lineTo(BL.x, BL.y);
    B.stroke();
    B.strokeStyle = "black";
};
ghostBMX.prototype.update = function ()
{
    if(currentVehicle.z > this.z)
    {
        this.update = function () {};
    }
    if(this.currentGhostCode[0][currentVehicle.z])
    {
        this.left = this.left ? 0 : 1;
    }
    if(this.currentGhostCode[1][currentVehicle.z])
    {
        this.right = this.right ? 0 : 1;
    }
    if(this.currentGhostCode[2][currentVehicle.z])
    {
        this.pedaling = this.pedaling ? 0 : 1;
    }
    if(this.currentGhostCode[3][currentVehicle.z])
    {
        this.brake = this.brake ? 0 : 1;
    }
    if(this.currentGhostCode[4][currentVehicle.z])
    {
        this.orientation();
    }
    this.BS();
    for(var T = this.S.length - 1; T >= 0; T--)
    {
        this.S[T].update();
    }
    for(var u = this.D.length - 1; u >= 0; u--)
    {
        this.D[u].update();
    }
    
    if(this.roueArriere.touchGround && this.roueAvant.touchGround)
    {
        this.slowMotioned = false;
    }
    
    if(!this.slowMotioned)
    {
        this.BS();
        for(var T = this.S.length - 1; T >= 0; T--)
        {
            this.S[T].update();
        }
        for(var u = this.D.length - 1; u >= 0; u--)
        {
            this.D[u].update();
        }
    }
};

function MTB()
{
    this.D = new Array;
    this.D.push(new Ah(new vector(b[b.length - 1][0], b[b.length - 1][1]), this));
    this.D[0]._ = new vector(b[b.length - 1][2], b[b.length - 1][3]);
    this.D[0].g = new vector(b[b.length - 1][4], b[b.length - 1][5]);
    this.D.push(new Ba(new vector(b[b.length - 1][6], b[b.length - 1][7]), this));
    this.D[1]._ = new vector(b[b.length - 1][8], b[b.length - 1][9]);
    this.D[1].g = new vector(b[b.length - 1][10], b[b.length - 1][11]);
    this.D[1].AX = b[b.length - 1][12];
    this.D.push(new Ba(new vector(b[b.length - 1][13], b[b.length - 1][14]), this));
    this.D[2]._ = new vector(b[b.length - 1][15], b[b.length - 1][16]);
    this.D[2].g = new vector(b[b.length - 1][17], b[b.length - 1][18]);
    this.D[2].AX = b[b.length - 1][19];
    this.h = this.D[0];
    this.h.Al = 14;
    this.h.drive = function ()
    {
        currentVehicle.die();
    };
    this.roueArriere = this.D[1];
    this.roueArriere.Al = 14;
    this.roueAvant = this.D[2];
    this.roueAvant.Al = 14;
    this.S = new Array;
    this.S.push(new Ac(this.D[0], this.D[1], this));
    this.S.push(new Ac(this.D[1], this.D[2], this));
    this.S.push(new Ac(this.D[2], this.D[0], this));
    this.AM = this.S[0];
    this.AM.A1 = 47;
    this.AM.AB = b[b.length - 1][20];
    this.AM.BC = 0.2;
    this.AM.BE = 0.3;
    this.AQ = this.S[1];
    this.AQ.A1 = 45;
    this.AQ.AB = b[b.length - 1][21];
    this.AQ.BC = 0.2;
    this.AQ.BE = 0.3;
    this.AU = this.S[2];
    this.AU.A1 = 45;
    this.AU.AB = b[b.length - 1][22];
    this.AU.BC = 0.2;
    this.AU.BE = 0.3;
    this.save = false;
    this.dead = false;
    this.legsangle = 0;
    this.O = b[b.length - 1][23];
    this.gravity = new vector(b[b.length - 1][24], b[b.length - 1][25]);
    this.slowMotioned = b[b.length - 1][26];
    currentGame.numberOfTargetCollected = b[b.length - 1][27];
    for(var j = 0; j < currentGame.AD.length; j++)
    {
        currentGame.AD[j].BM = b[b.length - 1][28][j];
    }
    this.Bj = 0;
    this.Bm = 0;
    this.Br = 0;
    this.Bo = 0;
    this.z = b[b.length - 1][29];
    if(this.z)
    {
        this.Bj = b[b.length - 1][30];
        this.Bm = b[b.length - 1][31];
        this.Br = b[b.length - 1][32];
        this.Bo = b[b.length - 1][33];
        for(var BD = 0; BD < AZ.length; BD++)
        {
            for(var BJ in AZ[BD])
            {
                if(BJ >= this.z)
                {
                    delete AZ[BD][BJ];
                }
            }
        }
    }
    else
    {
        AZ = new Array(new Array, new Array, new Array, new Array, new Array);
    }
}
MTB.prototype.orientation = function ()
{
    Ct = orientation = false;
    this.O *= -1;
    this.AQ.orientation();
    var AM = this.S[0].AB;
    this.AM.AB = this.S[2].AB;
    this.AU.AB = AM;
};

MTB.prototype.complete = function ()
{
    this.save = false;
    if(currentGame.totalNumberOfTarget && currentGame.numberOfTargetCollected == currentGame.totalNumberOfTarget)
    {

        var currentGhostCode = "";
        for(var BJ = 0; BJ < AZ.length; BJ++)
        {
            for(var Ay in AZ[BJ])
            {
                if(!isNaN(Ay))
                {
                    currentGhostCode += Ay + " ";
                }
            }
            currentGhostCode += ",";      
        }
        var e = document.getElementById("saveg");
		var strGhost = e.options[e.selectedIndex].value;
		if(strGhost=="saveAll" || (strGhost=="saveBest" && this.z < currentBestTime))
		{
			document.getElementById("ghostcode").value = currentGhostCode+this.z+" ,MTB";
			currentBestTime = this.z;
		}
        left = right = pedaling = brake = 0;
    }
    else
    {
        b.push(new Array(this.D[0].G.x, this.D[0].G.y, this.D[0]._.x, this.D[0]._.y, this.D[0].g.x, this.D[0].g.y, this.D[1].G.x, this.D[1].G.y, this.D[1]._.x, this.D[1]._.y, this.D[1].g.x, this.D[1].g.y, this.D[1].AX, this.D[2].G.x, this.D[2].G.y, this.D[2]._.x, this.D[2]._.y, this.D[2].g.x, this.D[2].g.y, this.D[2].AX, this.S[0].AB, this.S[1].AB, this.S[2].AB, this.O, this.gravity.x, this.gravity.y, this.slowMotioned, currentGame.numberOfTargetCollected, new Array, this.z, this.Bj, this.Bm, this.Br, this.Bo));
        for(var j = 0; j < currentGame.AD.length; j++)
        {
            b[b.length - 1][28].push(currentGame.AD[j].BM);
        }
        if(W)
        {
            K.push(new Array(W.D[0].G.x, W.D[0].G.y, W.D[0]._.x, W.D[0]._.y, W.D[0].g.x, W.D[0].g.y, W.D[1].G.x, W.D[1].G.y, W.D[1]._.x, W.D[1]._.y, W.D[1].g.x, W.D[1].g.y, W.D[1].AX, W.D[2].G.x, W.D[2].G.y, W.D[2]._.x, W.D[2]._.y, W.D[2].g.x, W.D[2].g.y, W.D[2].AX, W.S[0].AB, W.S[1].AB, W.S[2].AB, W.O, W.gravity.x, W.gravity.y, W.slowMotioned, W.left, W.right, W.pedaling, W.brake));
        }
    }
};

MTB.prototype.BS = function ()
{
    if(orientation)
    {
        this.orientation();
    }
    this.roueArriere.AX += (pedaling - this.D[1].AX) / 10;
    if(pedaling)
    {
        this.legsangle += this.roueArriere.Bq / 5;
    }
    this.roueArriere.brake = this.roueAvant.brake = brake;
    var As = left - right;
    this.AM.A3(As * 5 * this.O, 5);
    this.AU.A3(-As * 5 * this.O, 5);
    this.AQ.rotate(As / 8);
    if(!As && pedaling)
    {
        this.AM.A3(-7, 5);
        this.AU.A3(7, 5);
    }
};
MTB.prototype.draw = function () 
{
    var M = this.roueArriere.G.o();
    var AA = this.roueAvant.G.o();
    var AS = this.h.G.o();
    var L = AA.sub(M);
    var N = new vector((AA.y - M.y) * this.O, (M.x - AA.x) * this.O);
    var R = AS.sub(M.add(L.F(0.5)));
    B.beginPath();
    if(noDieMod)
    {
        B.strokeStyle = "DarkRed";
    }
    else
    {
        B.strokeStyle = "black";
    }
    B.lineWidth = 3.5 * currentGame.zoom;
    B.arc(M.x, M.y, 12.5 * currentGame.zoom, 0, 2 * Math.PI, true);
    B.moveTo(AA.x + 12.5 * currentGame.zoom, AA.y);
    B.arc(AA.x, AA.y, 12.5 * currentGame.zoom, 0, 2 * Math.PI, true);
    B.stroke();
    B.beginPath();
    if(noDieMod)
    {
        B.fillStyle = "rgba(139, 0, 0, 0.5)";
    }
    else
    {
        B.fillStyle = "rgba(0, 0, 0, 0.5)";
    }
    B.moveTo(M.x + 5 * currentGame.zoom, M.y);
    B.arc(M.x, M.y, 5 * currentGame.zoom, 0, 2 * Math.PI, true);
    B.moveTo(AA.x + 4 * currentGame.zoom, AA.y);
    B.arc(AA.x, AA.y, 4 * currentGame.zoom, 0, 2 * Math.PI, true);
    B.fill();
    B.beginPath();
    B.lineWidth = 5 * currentGame.zoom;
    B.moveTo(M.x, M.y);
    B.lineTo(M.x + L.x * 0.4 + N.x * 0.05, M.y + L.y * 0.4 + N.y * 0.05);
    B.moveTo(M.x + L.x * 0.72 + R.x * 0.64, M.y + L.y * 0.72 + R.y * 0.64);
    B.lineTo(M.x + L.x * 0.46 + R.x * 0.4, M.y + L.y * 0.46 + R.y * 0.4);
    B.lineTo(M.x + L.x * 0.4 + N.x * 0.05, M.y + L.y * 0.4 + N.y * 0.05);
    B.stroke();
    B.beginPath();
    B.lineWidth = 2 * currentGame.zoom;
    B.moveTo(M.x + L.x * 0.72 + R.x * 0.64, M.y + L.y * 0.72 + R.y * 0.64);
    B.lineTo(M.x + L.x * 0.43 + N.x * 0.05, M.y + L.y * 0.43 + N.y * 0.05);
    B.moveTo(M.x + L.x * 0.45 + R.x * 0.3, M.y + L.y * 0.45 + R.y * 0.3);
    B.lineTo(M.x + L.x * 0.3 + R.x * 0.4, M.y + L.y * 0.3 + R.y * 0.4);
    B.lineTo(M.x + L.x * 0.25 + R.x * 0.6, M.y + L.y * 0.25 + R.y * 0.6);
    B.moveTo(M.x + L.x * 0.17 + R.x * 0.6, M.y + L.y * 0.17 + R.y * 0.6);
    B.lineTo(M.x + L.x * 0.3 + R.x * 0.6, M.y + L.y * 0.3 + R.y * 0.6);
    var Ap = new vector(6 * Math.cos(this.legsangle) * currentGame.zoom, 6 * Math.sin(this.legsangle) * currentGame.zoom);
    B.moveTo(M.x + L.x * 0.43 + N.x * 0.05 + Ap.x, M.y + L.y * 0.43 + N.y * 0.05 + Ap.y);
    B.lineTo(M.x + L.x * 0.43 + N.x * 0.05 - Ap.x, M.y + L.y * 0.43 + N.y * 0.05 - Ap.y);
    B.stroke();
    B.beginPath();
    B.lineWidth = currentGame.zoom;
    B.moveTo(M.x + L.x * 0.46 + R.x * 0.4, M.y + L.y * 0.46 + R.y * 0.4);
    B.lineTo(M.x + L.x * 0.28 + R.x * 0.5, M.y + L.y * 0.28 + R.y * 0.5);
    B.stroke();
    B.beginPath();
    B.lineWidth = 3 * currentGame.zoom;
    B.moveTo(AA.x, AA.y);
    B.lineTo(M.x + L.x * 0.71 + R.x * 0.73, M.y + L.y * 0.71 + R.y * 0.73);
    B.lineTo(M.x + L.x * 0.73 + R.x * 0.77, M.y + L.y * 0.73 + R.y * 0.77);
    B.lineTo(M.x + L.x * 0.7 + R.x * 0.8, M.y + L.y * 0.7 + R.y * 0.8);
    B.stroke();
    if(this.dead)
    {
        return;
    }
    N = AS.sub(M.add(L.F(0.5)));
    var Aw = M.add(L.F(0.3)).add(N.F(0.25));
    var B2 = M.add(L.F(0.4)).add(N.F(0.05));
    var Bp = B2.add(Ap);
    var A6 = B2.sub(Ap);
    var A7 = M.add(L.F(0.67)).add(N.F(0.8));
    var AY = Aw.add(L.F(-0.05)).add(N.F(0.42));
    var Aa = Bp.sub(AY);
    R = new vector(Aa.y * this.O, -Aa.x * this.O);
    R = R.F(currentGame.zoom * currentGame.zoom);
    var CZ = AY.add(Aa.F(0.5)).add(R.F(200 / Aa.Ae()));
    Aa = A6.sub(AY);
    R = new vector(Aa.y * this.O, -Aa.x * this.O);
    R = R.F(currentGame.zoom * currentGame.zoom);
    var CX = AY.add(Aa.F(0.5)).add(R.F(200 / Aa.Ae()));
    B.beginPath();
    B.lineWidth = 6 * currentGame.zoom;
    if(noDieMod)
    {
        B.strokeStyle = "rgba(139, 0, 0, 0.5)";
    }
    else
    {
        B.strokeStyle = "rgba(0, 0, 0, 0.5)";
    }
    B.moveTo(A6.x, A6.y);
    B.lineTo(CX.x, CX.y);
    B.lineTo(AY.x, AY.y);
    B.stroke();
    B.beginPath();
    if(noDieMod)
    {
        B.strokeStyle = "DarkRed";
    }
    else
    {
        B.strokeStyle = "black";
    }
    B.moveTo(Bp.x, Bp.y);
    B.lineTo(CZ.x, CZ.y);
    B.lineTo(AY.x, AY.y);
    B.stroke();
    var BX = Aw.add(L.F(0.1)).add(N.F(0.95));
    B.beginPath();
    B.lineWidth = 8 * currentGame.zoom;
    B.moveTo(AY.x, AY.y);
    B.lineTo(BX.x, BX.y);
    B.stroke();
    var Bl = Aw.add(L.F(0.2)).add(N.F(1.09));
    var CT = Aw.add(L.F(0.4)).add(N.F(1.15));
    var Ce = Aw.add(L.F(0.1)).add(N.F(1.05));
    B.beginPath();
    B.lineWidth = 2 * currentGame.zoom;
    B.moveTo(Bl.x + 5 * currentGame.zoom, Bl.y);
    B.arc(Bl.x, Bl.y, 5 * currentGame.zoom, 0, 2 * Math.PI, true);
    B.moveTo(CT.x, CT.y);
    B.lineTo(Ce.x, Ce.y);
    B.stroke();
    L = BX.sub(A7);
    N = new vector(L.y * this.O, -L.x * this.O);
    N = N.F(currentGame.zoom * currentGame.zoom);
    var CU = A7.add(L.F(0.3)).add(N.F(80 / L.Ae()));
    B.beginPath();
    B.lineWidth = 5 * currentGame.zoom;
    B.moveTo(BX.x, BX.y);
    B.lineTo(CU.x, CU.y);
    B.lineTo(A7.x, A7.y);
    B.stroke();
};
MTB.prototype.C1 = function ()
{
    var $ = new Object;
    var M = this.roueAvant.G.sub(this.roueArriere.G);
    var AA = this.h.G.sub(this.roueAvant.G.add(this.roueArriere.G).F(0.5));
    var AS = new vector(M.y * this.O, -M.x * this.O);
    $.h = this.roueArriere.G.add(M.F(0.35)).add(AA.F(1.2));
    $.BO = $.B0 = this.roueArriere.G.add(M.F(0.8)).add(AS.F(0.68));
    var N = $.h.sub($.BO);
    N = new vector(N.y * this.O, -N.x * this.O);
    $.Bx = $.Bu = $.h.add($.BO).F(0.5).add(N.F(130 / N.Ae()));
    $.Ab = this.roueArriere.G.add(M.F(0.2)).add(AS.F(0.5));
    var R = new vector(6 * Math.cos(this.legsangle), 6 * Math.sin(this.legsangle));
    $.BQ = this.roueArriere.G.add(M.F(0.4)).add(AS.F(0.05)).add(R);
    N = $.Ab.sub($.BQ);
    N = new vector(-N.y * this.O, N.x * this.O);
    $.Bw = $.Ab.add($.BQ).F(0.5).add(N.F(160 / N.Ae()));
    $.BN = this.roueArriere.G.add(M.F(0.4)).add(AS.F(0.05)).sub(R);
    N = $.Ab.sub($.BN);
    N = new vector(-N.y * this.O, N.x * this.O);
    $.Bv = $.Ab.add($.BN).F(0.5).add(N.F(160 / N.Ae()));
    return $;
};
MTB.prototype.die = function ()
{
    this.dead = !noDieMod;
    this.h.drive = function () {};
    this.roueArriere.AX = 0;
    this.roueArriere.brake = false;
    this.roueAvant.brake = false;
    this.h.Ad = noDieMod;
	if(!noDieMod)
	{
		currentVehicle = new Cadavre(this, this.C1());
	}
};
MTB.prototype.update = function ()
{
    if(this.save)
    {
        this.complete();
    }
    if(left != this.Bj)
    {
        AZ[0][this.z] = 1;
        this.Bj = left;
    }
    if(right != this.Bm)
    {
        AZ[1][this.z] = 1;
        this.Bm = right;
    }
    if(pedaling != this.Br)
    {
        AZ[2][this.z] = 1;
        this.Br = pedaling;
    }
    if(brake != this.Bo)
    {
        AZ[3][this.z] = 1;
        this.Bo = brake;
    }
    if(orientation)
    {
        AZ[4][this.z] = 1;
    }
    if(!this.dead)
    {
        this.BS();
    }
    for(var T = this.S.length - 1; T >= 0; T--)
    {
        this.S[T].update();
    }
    for(var u = this.D.length - 1; u >= 0; u--)
    {
        this.D[u].update();
    }
    
    if(this.roueArriere.touchGround && this.roueAvant.touchGround)
    {
        this.slowMotioned = false;
    }
    if(!this.slowMotioned && !this.dead)
    {
        this.BS();
        for(var T = this.S.length - 1; T >= 0; T--)
        {
            this.S[T].update();
        }
        for(var u = this.D.length - 1; u >= 0; u--)
        {
            this.D[u].update();
        }
    }
};

function ghostMTB(currentGhostCode)
{
    this.D = new Array;
    this.D.push(new Ah(new vector(K[K.length - 1][0], K[K.length - 1][1]), this));
    this.D[0]._ = new vector(K[K.length - 1][2], K[K.length - 1][3]);
    this.D[0].g = new vector(K[K.length - 1][4], K[K.length - 1][5]);
    this.D.push(new Ba(new vector(K[K.length - 1][6], K[K.length - 1][7]), this));
    this.D[1]._ = new vector(K[K.length - 1][8], K[K.length - 1][9]);
    this.D[1].g = new vector(K[K.length - 1][10], K[K.length - 1][11]);
    this.D[1].AX = K[K.length - 1][12];
    this.D.push(new Ba(new vector(K[K.length - 1][13], K[K.length - 1][14]), this));
    this.D[2]._ = new vector(K[K.length - 1][15], K[K.length - 1][16]);
    this.D[2].g = new vector(K[K.length - 1][17], K[K.length - 1][18]);
    this.D[2].AX = K[K.length - 1][19];
    this.h = this.D[0];
    this.h.Al = 14;
    this.h.drive = function ()
    {
    	if(!noDieModForGhost)
    	{
    		W = false;
    	}
    };
    this.roueArriere = this.D[1];
    this.roueArriere.Al = 14;
    this.roueAvant = this.D[2];
    this.roueAvant.Al = 14;
    this.S = new Array;
    this.S.push(new Ac(this.D[0], this.D[1], this));
    this.S.push(new Ac(this.D[1], this.D[2], this));
    this.S.push(new Ac(this.D[2], this.D[0], this));
    this.AM = this.S[0];
    this.AM.A1 = 47;
    this.AM.AB = K[K.length - 1][20];
    this.AM.BC = 0.2;
    this.AM.BE = 0.3;
    this.AQ = this.S[1];
    this.AQ.A1 = 45;
    this.AQ.AB = K[K.length - 1][21];
    this.AQ.BC = 0.2;
    this.AQ.BE = 0.3;
    this.AU = this.S[2];
    this.AU.A1 = 45;
    this.AU.AB = K[K.length - 1][22];
    this.AU.BC = 0.2;
    this.AU.BE = 0.3;
    this.Cq = true;
    this.legsangle = 0;
    this.O = K[K.length - 1][23];
    this.gravity = new vector(K[K.length - 1][24], K[K.length - 1][25]);
    this.slowMotioned = K[K.length - 1][26];
    this.left = K[K.length - 1][27];
    this.right = K[K.length - 1][28];
    this.pedaling = K[K.length - 1][29];
    this.brake = K[K.length - 1][30];
    this.currentGhostCode = currentGhostCode;
    this.z = this.currentGhostCode[5];
}
ghostMTB.prototype.orientation = function ()
{
    this.O *= -1;
    this.AQ.orientation();
    var AM = this.S[0].AB;
    this.AM.AB = this.S[2].AB;
    this.AU.AB = AM;
};
ghostMTB.prototype.BS = function ()
{
    this.roueArriere.AX += (this.pedaling - this.D[1].AX) / 10;
    if(this.pedaling)
    {
        this.legsangle += this.roueArriere.Bq / 5;
    }
    this.roueArriere.brake = this.roueAvant.brake = this.brake;
    var As = this.left - this.right;
    this.AM.A3(As * 5 * this.O, 5);
    this.AU.A3(-As * 5 * this.O, 5);
    this.AQ.rotate(As / 8);
    if(!As && this.pedaling)
    {
        this.AM.A3(-7, 5);
        this.AU.A3(7, 5);
    }
};
ghostMTB.prototype.draw = function ()
{
    var M = this.roueArriere.G.o();
    var AA = this.roueAvant.G.o();
    var AS = this.h.G.o();
    var L = AA.sub(M);
    var N = new vector((AA.y - M.y) * this.O, (M.x - AA.x) * this.O);
    var R = AS.sub(M.add(L.F(0.5)));
    B.beginPath();
    if(noDieModForGhost)
	{
		B.strokeStyle = "rgba(139, 0, 0, 0.5)";
	}
	else
	{
		B.strokeStyle = "rgba(0, 0, 0, 0.5)";
	} 
    B.lineWidth = 3.5 * currentGame.zoom;
    B.arc(M.x, M.y, 12.5 * currentGame.zoom, 0, 2 * Math.PI, true);
    B.moveTo(AA.x + 12.5 * currentGame.zoom, AA.y);
    B.arc(AA.x, AA.y, 12.5 * currentGame.zoom, 0, 2 * Math.PI, true);
    B.stroke();
    B.beginPath();
    if(noDieModForGhost)
	{
		B.fillStyle = "rgba(139, 0, 0, 0.25)";
	}
	else
	{
		B.fillStyle = "rgba(0, 0, 0, 0.25)";
	} 
    B.moveTo(M.x + 5 * currentGame.zoom, M.y);
    B.arc(M.x, M.y, 5 * currentGame.zoom, 0, 2 * Math.PI, true);
    B.moveTo(AA.x + 4 * currentGame.zoom, AA.y);
    B.arc(AA.x, AA.y, 4 * currentGame.zoom, 0, 2 * Math.PI, true);
    B.fill();
    B.beginPath();
    B.lineWidth = 5 * currentGame.zoom;
    B.moveTo(M.x, M.y);
    B.lineTo(M.x + L.x * 0.4 + N.x * 0.05, M.y + L.y * 0.4 + N.y * 0.05);
    B.moveTo(M.x + L.x * 0.72 + R.x * 0.64, M.y + L.y * 0.72 + R.y * 0.64);
    B.lineTo(M.x + L.x * 0.46 + R.x * 0.4, M.y + L.y * 0.46 + R.y * 0.4);
    B.lineTo(M.x + L.x * 0.4 + N.x * 0.05, M.y + L.y * 0.4 + N.y * 0.05);
    B.stroke();
    B.beginPath();
    B.lineWidth = 2 * currentGame.zoom;
    B.moveTo(M.x + L.x * 0.72 + R.x * 0.64, M.y + L.y * 0.72 + R.y * 0.64);
    B.lineTo(M.x + L.x * 0.43 + N.x * 0.05, M.y + L.y * 0.43 + N.y * 0.05);
    B.moveTo(M.x + L.x * 0.45 + R.x * 0.3, M.y + L.y * 0.45 + R.y * 0.3);
    B.lineTo(M.x + L.x * 0.3 + R.x * 0.4, M.y + L.y * 0.3 + R.y * 0.4);
    B.lineTo(M.x + L.x * 0.25 + R.x * 0.6, M.y + L.y * 0.25 + R.y * 0.6);
    B.moveTo(M.x + L.x * 0.17 + R.x * 0.6, M.y + L.y * 0.17 + R.y * 0.6);
    B.lineTo(M.x + L.x * 0.3 + R.x * 0.6, M.y + L.y * 0.3 + R.y * 0.6);
    var Ap = new vector(6 * Math.cos(this.legsangle) * currentGame.zoom, 6 * Math.sin(this.legsangle) * currentGame.zoom);
    B.moveTo(M.x + L.x * 0.43 + N.x * 0.05 + Ap.x, M.y + L.y * 0.43 + N.y * 0.05 + Ap.y);
    B.lineTo(M.x + L.x * 0.43 + N.x * 0.05 - Ap.x, M.y + L.y * 0.43 + N.y * 0.05 - Ap.y);
    B.stroke();
    B.beginPath();
    B.lineWidth = currentGame.zoom;
    B.moveTo(M.x + L.x * 0.46 + R.x * 0.4, M.y + L.y * 0.46 + R.y * 0.4);
    B.lineTo(M.x + L.x * 0.28 + R.x * 0.5, M.y + L.y * 0.28 + R.y * 0.5);
    B.stroke();
    B.beginPath();
    B.lineWidth = 3 * currentGame.zoom;
    B.moveTo(AA.x, AA.y);
    B.lineTo(M.x + L.x * 0.71 + R.x * 0.73, M.y + L.y * 0.71 + R.y * 0.73);
    B.lineTo(M.x + L.x * 0.73 + R.x * 0.77, M.y + L.y * 0.73 + R.y * 0.77);
    B.lineTo(M.x + L.x * 0.7 + R.x * 0.8, M.y + L.y * 0.7 + R.y * 0.8);
    B.stroke();
    N = AS.sub(M.add(L.F(0.5)));
    var Aw = M.add(L.F(0.3)).add(N.F(0.25));
    var B2 = M.add(L.F(0.4)).add(N.F(0.05));
    var Bp = B2.add(Ap);
    var A6 = B2.sub(Ap);
    var A7 = M.add(L.F(0.67)).add(N.F(0.8));
    var AY = Aw.add(L.F(-0.05)).add(N.F(0.42));
    var Aa = Bp.sub(AY);
    R = new vector(Aa.y * this.O, -Aa.x * this.O);
    R = R.F(currentGame.zoom * currentGame.zoom);
    var CZ = AY.add(Aa.F(0.5)).add(R.F(200 / Aa.Ae()));
    Aa = A6.sub(AY);
    R = new vector(Aa.y * this.O, -Aa.x * this.O);
    R = R.F(currentGame.zoom * currentGame.zoom);
    var CX = AY.add(Aa.F(0.5)).add(R.F(200 / Aa.Ae()));
    B.beginPath();
    B.lineWidth = 6 * currentGame.zoom;
    if(noDieModForGhost)
	{
		B.strokeStyle = "rgba(139, 0, 0, 0.25)";
	}
	else
	{
		B.strokeStyle = "rgba(0, 0, 0, 0.25)";
	} 
    B.moveTo(A6.x, A6.y);
    B.lineTo(CX.x, CX.y);
    B.lineTo(AY.x, AY.y);
    B.stroke();
    B.beginPath();
    if(noDieModForGhost)
	{
		B.strokeStyle = "rgba(139, 0, 0, 0.5)";
	}
	else
	{
		B.strokeStyle = "rgba(0, 0, 0, 0.5)";
	} 
    B.moveTo(Bp.x, Bp.y);
    B.lineTo(CZ.x, CZ.y);
    B.lineTo(AY.x, AY.y);
    B.stroke();
    var BX = Aw.add(L.F(0.1)).add(N.F(0.95));
    B.beginPath();
    B.lineWidth = 8 * currentGame.zoom;
    B.moveTo(AY.x, AY.y);
    B.lineTo(BX.x, BX.y);
    B.stroke();
    var Bl = Aw.add(L.F(0.2)).add(N.F(1.09));
    var CT = Aw.add(L.F(0.4)).add(N.F(1.15));
    var Ce = Aw.add(L.F(0.1)).add(N.F(1.05));
    B.beginPath();
    B.lineWidth = 2 * currentGame.zoom;
    B.moveTo(Bl.x + 5 * currentGame.zoom, Bl.y);
    B.arc(Bl.x, Bl.y, 5 * currentGame.zoom, 0, 2 * Math.PI, true);
    B.moveTo(CT.x, CT.y);
    B.lineTo(Ce.x, Ce.y);
    B.stroke();
    L = BX.sub(A7);
    N = new vector(L.y * this.O, -L.x * this.O);
    N = N.F(currentGame.zoom * currentGame.zoom);
    var CU = A7.add(L.F(0.3)).add(N.F(80 / L.Ae()));
    B.beginPath();
    B.lineWidth = 5 * currentGame.zoom;
    B.moveTo(BX.x, BX.y);
    B.lineTo(CU.x, CU.y);
    B.lineTo(A7.x, A7.y);
    B.stroke();
    B.strokeStyle = "black";
};
ghostMTB.prototype.update = function ()
{
    if(currentVehicle.z > this.z)
    {
        this.update = function () {};
    }
    if(this.currentGhostCode[0][currentVehicle.z])
    {
        this.left = this.left ? 0 : 1;
    }
    if(this.currentGhostCode[1][currentVehicle.z])
    {
        this.right = this.right ? 0 : 1;
    }
    if(this.currentGhostCode[2][currentVehicle.z])
    {
        this.pedaling = this.pedaling ? 0 : 1;
    }
    if(this.currentGhostCode[3][currentVehicle.z])
    {
        this.brake = this.brake ? 0 : 1;
    }
    if(this.currentGhostCode[4][currentVehicle.z])
    {
        this.orientation();
    }
    this.BS();
    for(var T = this.S.length - 1; T >= 0; T--)
    {
        this.S[T].update();
    }
    for(var u = this.D.length - 1; u >= 0; u--)
    {
        this.D[u].update();
    }
    if(this.roueArriere.touchGround && this.roueAvant.touchGround)
    {
        this.slowMotioned = false;
    }
    if(!this.slowMotioned)
    {
        this.BS();
        for(var T = this.S.length - 1; T >= 0; T--)
        {
            this.S[T].update();
        }
        for(var u = this.D.length - 1; u >= 0; u--)
        {
            this.D[u].update();
        }
    }
};

function riderIGuess(Cx)
{
    this.dead = true;
    this.D = new Array;
    this.S = new Array;
    this.O = 1;
    var U = new vector(0, 0);
    this.D.push(new Ah(U, this));
    this.h = this.D[0];
    this.D.push(new Ah(U, this));
    this.Ab = this.D[1];
    this.S.push(new Ac(this.h, this.Ab, this));
    this.D.push(new Ah(U, this));
    this.Bx = this.D[2];
    this.D.push(new Ah(U, this));
    this.Bu = this.D[3];
    this.D.push(new Ah(U, this));
    this.BO = this.D[4];
    this.D.push(new Ah(U, this));
    this.B0 = this.D[5];
    this.S.push(new Ac(this.h, this.Bx, this));
    this.S.push(new Ac(this.Bx, this.BO, this));
    this.S.push(new Ac(this.h, this.Bu, this));
    this.S.push(new Ac(this.Bu, this.B0, this));
    this.D.push(new Ah(U, this));
    this.Bw = this.D[6];
    this.D.push(new Ah(U, this));
    this.Bv = this.D[7];
    this.D.push(new Ah(U, this));
    this.BQ = this.D[8];
    this.D.push(new Ah(U, this));
    this.BN = this.D[9];
    this.S.push(new Ac(this.Ab, this.Bw, this));
    this.S.push(new Ac(this.Bw, this.BQ, this));
    this.S.push(new Ac(this.Ab, this.Bv, this));
    this.S.push(new Ac(this.Bv, this.BN, this));
    for(var u = 0; u < this.D.length; u++)
    {
        this.D[u].Al = 3;
        this.D[u].B6 = 0.05;
    }
    this.h.Al = this.Ab.Al = 8;
    for(var T = 0; T < this.S.length; T++)
    {
        this.S[T].BC = 0.4;
        this.S[T].BE = 0.7;
    }
    for(var U in Cx)
    {
        this[U].G.takeValueOf(Cx[U]);
    }
}
riderIGuess.prototype.draw = function ()
{
    var h = this.h.G.o();
    var Bx = this.Bx.G.o();
    var BO = this.BO.G.o();
    var Bu = this.Bu.G.o();
    var B0 = this.B0.G.o();
    var Bw = this.Bw.G.o();
    var BQ = this.BQ.G.o();
    var Bv = this.Bv.G.o();
    var BN = this.BN.G.o();
    var Ab = this.Ab.G.o();
    B.beginPath();
    B.lineWidth = 5 * currentGame.zoom;
    B.strokeStyle = "rgba(0,0,0,0.5)";
    B.moveTo(h.x, h.y);
    B.lineTo(Bu.x, Bu.y);
    B.lineTo(B0.x, B0.y);
    B.moveTo(Ab.x, Ab.y);
    B.lineTo(Bv.x, Bv.y);
    B.lineTo(BN.x, BN.y);
    B.stroke();
    B.beginPath();
    B.strokeStyle = "black";//black
    B.moveTo(h.x, h.y);
    B.lineTo(Bx.x, Bx.y);
    B.lineTo(BO.x, BO.y);
    B.moveTo(Ab.x, Ab.y);
    B.lineTo(Bw.x, Bw.y);
    B.lineTo(BQ.x, BQ.y);
    B.stroke();
    B.beginPath();
    B.lineWidth = 8 * currentGame.zoom;
    B.moveTo(Ab.x, Ab.y);
    B.lineTo(h.x, h.y);
    B.stroke();
    h.Ai(h.sub(Ab).F(0.25));
    B.beginPath();
    B.lineWidth = 2 * currentGame.zoom;
    B.moveTo(h.x + 5 * currentGame.zoom, h.y);
    B.arc(h.x, h.y, 5 * currentGame.zoom, 0, 2 * Math.PI, true);
    B.stroke();
    var A6 = h.sub(Ab);
    var A7 = new vector(A6.y, -A6.x);
    var AY = new vector(0, 0);
    var Aa = new vector(0, 0);
    if(this.O == 1)
    {
        AY = h.add(A7.F(0.15)).add(A6.F(-0.05));
        Aa = h.add(A7.F(-0.35)).add(A6.F(0.15));
    }
    else
    {
        AY = h.add(A7.F(-0.15)).add(A6.F(0.15));
        Aa = h.add(A7.F(0.35)).add(A6.F(-0.05));
    }
    AY = h.add(A7.F(0.15 * this.O)).add(A6.F(-0.05));
    Aa = h.add(A7.F(-0.35 * this.O)).add(A6.F(0.15));
    B.beginPath();
    B.moveTo(AY.x, AY.y);
    B.lineTo(Aa.x, Aa.y);
    B.stroke();
};
riderIGuess.prototype.update = function ()
{
    for(var T = this.S.length - 1; T >= 0; T--)
    {
        this.S[T].update();
    }
    for(var u = this.D.length - 1; u >= 0; u--)
    {
        this.D[u].update();
    }
};
riderIGuess.prototype.DY = function (C6, C3)
{
    C6 = C6.F(0.7);
    C3 = C3.F(0.7);
    for(var T = 0; T < this.S.length; T++)
    {
        this.S[T].A1 = this.S[T].AB = this.S[T].A4.G.sub(this.S[T].A2.G).length();
        if(this.S[T].AB > 20)
        {
            this.S[T].A1 = this.S[T].AB = 20;
        }
    }
    for(var T = 1; T < 5; T++)
    {
        this.S[T].A1 = 13;
        this.S[T].AB = 13;
    }
    var L = new Array(this.h, this.Bx, this.Bu, this.BO, this.B0);
    var N = new Array(this.Ab, this.Bw, this.Bv, this.BQ, this.BN);
    for(var Az = 0; Az < L.length; Az++)
    {
        L[Az]._ = L[Az].G.sub(C6);
    }
    for(var Az = 0; Az < N.length; Az++)
    {
        N[Az]._ = N[Az].G.sub(C3);
    }
    for(var u = this.D.length - 1; u >= 0; u--)
    {
        this.D[u].g.takeValueOf(this.D[u].G.sub(this.D[u]._));
        this.D[u].g.x += Math.random() - Math.random();
        this.D[u].g.y += Math.random() - Math.random();
    }
};

function Cadavre(B7, Cx)
{
    this.dead = true;
    this.B$ = new riderIGuess(Cx);
    this.B$.DY(B7.h.g, B7.roueArriere.g);
    this.B$.O = B7.O;
    this.B$.gravity = B7.gravity;
    this.gravity = B7.gravity;
    this.z = B7.z;
    this.h = this.B$.h;
    this.DL = B7;
}
Cadavre.prototype.draw = function ()
{
    this.DL.draw();
    this.B$.draw();
};
Cadavre.prototype.update = function ()
{
    this.DL.update();
    this.B$.update();
};

function explosion(G, gravity, z)
{
    this.dead = true;
    this.Ay = 30 + 20 * Math.random();
    this.Df = 0;
    this.D = new Array;
    this.D.push(new particle(G, this));
    this.D.push(new particle(G, this));
    this.D.push(new particle(G, this));
    this.D.push(new particle(G, this));
    this.D.push(new particle(G, this));
    this.G = new vector(G.x, G.y);
    this.gravity = gravity;
    this.z = z;
    this.h = new Ah(G, this);
    this.h.g.x = 20;
    this.dead = true;
}
explosion.prototype.draw = function ()
{
    if(this.Ay > 0)
    {
        this.Ay -= 10;
        var M = this.G.o();
        var AS = Math.random() * 6.2;
        var L = this.Ay / 2;
        var N = M.x + L * Math.cos(AS);
        var R = M.y + L * Math.sin(AS);
        B.beginPath();
        B.fillStyle = "yellow";
        B.moveTo(N, R);
        for(AA = 1; AA < 16; AA++)
        {
            L = (this.Ay + 30 * Math.random()) / 2;
            N = M.x + L * Math.cos(AS + 6.283 * AA / 16);
            R = M.y + L * Math.sin(AS + 6.283 * AA / 16);
            B.lineTo(N, R);
        }
        B.fill();
    }
    for(var u = 0; u < this.D.length; u++)
    {
        this.D[u].draw();
    }
};
explosion.prototype.update = function ()
{
    for(var u = this.D.length - 1; u >= 0; u--)
    {
        this.D[u].update();
    }
};

function target(x, y)
{
    this.G = new vector(x, y);
    this.BM = false;
}
target.prototype.draw = function ()
{
    B.beginPath();
    B.fillStyle = this.BM ? "#FFFFAA" : "#FFFF00";
    B.lineWidth = 2 * currentGame.zoom;
    B.moveTo(this.G.o().x + 7 * currentGame.zoom, this.G.o().y);
    B.arc(this.G.o().x, this.G.o().y, 7 * currentGame.zoom, 0, 2 * Math.PI, true);
    B.fill();
    B.stroke();
};
target.prototype.Ad = function (AV)
{
    if(!this.BM && AV.G.sub(this.G).Ae() < 500 && !AV.parent.Cq)
    {
        this.BM = true;
        currentGame.numberOfTargetCollected++;
        if(currentGame.totalNumberOfTarget && currentGame.numberOfTargetCollected == currentGame.totalNumberOfTarget)
        {
            AV.parent.save = true;
        }
    }
};
target.prototype.erase = function (U)
{
    if(U.sub(this.G).length() < BH + 7 && (eraserType == 3 || eraserType == 0))
    {
        currentGame.totalNumberOfTarget--;
        var Ag = this;
	    currentGame.appendHistoric(function()
		{
			currentGame.totalNumberOfTarget++;
			if(Ag.BM)
			{
				Ag.BM = false;
			}
			var x = Math.floor(Ag.G.x / currentGame.q);
		    var y = Math.floor(Ag.G.y / currentGame.q);
		    if(currentGame.I[x] == undefined)
		    {
		        currentGame.I[x] = new Array;
		    }
		    if(currentGame.I[x][y] == undefined)
		    {
		        currentGame.I[x][y] = new BP(x, y);
		    }
		    currentGame.I[x][y].AD.push(Ag);
		}, function()
		{
		    Ag.removeIT()
		})
		this.remove = true;
        currentGame.remove(this.G);
    }
};
target.prototype.removeIT = function ()
{
	currentGame.totalNumberOfTarget--;
	if(this.BM)
	{
		this.BM = false;
		currentGame.numberOfTargetCollected--;
	}
    this.remove = true;
    currentGame.remove(this.G);
};
target.prototype.saveCode = function ()
{
    return "T " + this.G.x.toString(32) + " " + this.G.y.toString(32);
};

function checkpoint(x, y)
{
    this.G = new vector(x, y);
    this.BM = false;
}
checkpoint.prototype.draw = function ()
{
    B.beginPath();
    B.fillStyle = this.BM ? "#AAAAFF" : "#0000FF";
    B.moveTo(this.G.o().x + 7 * currentGame.zoom, this.G.o().y);
    B.arc(this.G.o().x, this.G.o().y, 7 * currentGame.zoom, 0, 2 * Math.PI, true);
    B.fill();
    B.stroke();
};
checkpoint.prototype.Ad = function (AV)
{
    if(!this.BM && AV.G.sub(this.G).Ae() < 500 && !AV.parent.Cq)
    {
        this.BM = true;
        AV.parent.save = true;
        gravityCheckpoints.push(zeroGrav);
    }
};
checkpoint.prototype.erase = function (U)
{
    if(U.sub(this.G).length() < BH + 7 && (eraserType == 3 || eraserType == 0))
    {
    	var Ag = this;
	    currentGame.appendHistoric(function()
		{
			if(Ag.BM)
			{
				Ag.BM = false;
			}
			var x = Math.floor(Ag.G.x / currentGame.q);
		    var y = Math.floor(Ag.G.y / currentGame.q);
		    if(currentGame.I[x] == undefined)
		    {
		        currentGame.I[x] = new Array;
		    }
		    if(currentGame.I[x][y] == undefined)
		    {
		        currentGame.I[x][y] = new BP(x, y);
		    }
		    currentGame.I[x][y].AD.push(Ag);
		}, function()
		{
		    Ag.removeIT()
		})
        this.remove = true;
        currentGame.remove(this.G);
    }
};
checkpoint.prototype.removeIT = function ()
{
	this.BM = false;
    this.remove = true;
    currentGame.remove(this.G);
};
checkpoint.prototype.saveCode = function ()
{
    return "C " + this.G.x.toString(32) + " " + this.G.y.toString(32);
};

function teleporter(x1, y1, x2, y2)
{
	this.G = new vector(x1, y1);
    this.G1 = new vector(x1, y1);
    this.G2 = new vector(x2, y2);
    this.AH = this.G1; //for compatibility at mouseup
    this.AK = this.G2; //for compatibility at mouseup
    this.trans1 = this.G2.sub(this.G1);
    this.trans2 = this.G1.sub(this.G2);
    this.length = this.trans1.length();
    this.BM = false;
    this.BM4ghosts = false;
}
teleporter.prototype.draw = function ()
{
    B.beginPath();
    B.fillStyle = this.BM ? "#FFAAFF" : "#FF00FF";
    B.moveTo(this.G1.o().x + 7 * currentGame.zoom, this.G1.o().y);
    B.arc(this.G1.o().x, this.G1.o().y, 7 * currentGame.zoom, 0, 2 * Math.PI, true);
    B.fill();
    B.stroke()
    
    B.beginPath();
    B.fillStyle = this.BM ? "#FFAAFF" : "#FF00FF";
    B.moveTo(this.G2.o().x + 7 * currentGame.zoom, this.G2.o().y);
    B.arc(this.G2.o().x, this.G2.o().y, 7 * currentGame.zoom, 0, 2 * Math.PI, true);
    B.fill();
    B.stroke();
};
teleporter.prototype.Ad = function (AV)
{
    if(!this.BM && AV.G.sub(this.G1).Ae() < 500 && !AV.parent.Cq)
    {
        this.BM = true;
        for(var u = 0; u < AV.parent.D.length; u++)
        {
            AV.parent.D[u].G.Ai(this.trans1);
            AV.parent.D[u]._.Ai(this.trans1);
        }
    }
    if(!this.BM && AV.G.sub(this.G2).Ae() < 500 && !AV.parent.Cq)
    {
        this.BM = true;
        for(var u = 0; u < AV.parent.D.length; u++)
        {
        	AV.parent.D[u].G.Ai(this.trans2);
            AV.parent.D[u]._.Ai(this.trans2);
        }
    }
    if(!this.BM4ghosts && AV.G.sub(this.G1).Ae() < 500 && AV.parent.Cq)
    {
        this.BM4ghosts = true;
        for(var u = 0; u < AV.parent.D.length; u++)
        {
            AV.parent.D[u].G.Ai(this.trans1);
            AV.parent.D[u]._.Ai(this.trans1);
        }
    }
    if(!this.BM4ghosts && AV.G.sub(this.G2).Ae() < 500 && AV.parent.Cq)
    {
        this.BM4ghosts = true;
        for(var u = 0; u < AV.parent.D.length; u++)
        {
        	AV.parent.D[u].G.Ai(this.trans2);
            AV.parent.D[u]._.Ai(this.trans2);
        }
    }   
};
teleporter.prototype.erase = function (U)
{
    if((U.sub(this.G1).length() < BH + 7 || U.sub(this.G2).length() < BH + 7) && (eraserType == 3 || eraserType == 0))
    {
    	var P = this;
    	currentGame.appendHistoric(function()
		{
			if(P.BM)
			{
				P.BM = false;
			}
			if(P.BM4ghosts)
			{
				P.BM4ghosts = false;
			}
			var x = Math.floor(P.G1.x / currentGame.q);
		   	var y = Math.floor(P.G1.y / currentGame.q);
		   	if(currentGame.I[x] == undefined)
		    {
		        currentGame.I[x] = new Array;
		    }
		    if(currentGame.I[x][y] == undefined)
		    {
		        currentGame.I[x][y] = new BP(x, y);
		    }
		    currentGame.I[x][y].AD.push(P);
		    var x = Math.floor(P.G2.x / currentGame.q);
		   	var y = Math.floor(P.G2.y / currentGame.q);
		   	if(currentGame.I[x] == undefined)
		    {
		        currentGame.I[x] = new Array;
		    }
		    if(currentGame.I[x][y] == undefined)
		    {
		        currentGame.I[x][y] = new BP(x, y);
		    }
		    currentGame.I[x][y].AD.push(P);
		    currentGame.AD.push(P);
		}, function()
		{
		    P.removeIT()
		})
        this.remove = true;
        currentGame.remove(this.G1);
        currentGame.remove(this.G2);
    }
};
teleporter.prototype.removeIT = function ()
{
	this.BM = false;
	this.BM4ghosts = false;
    this.remove = true;
    currentGame.remove(this.G1);
    currentGame.remove(this.G2);
};
teleporter.prototype.saveCode = function ()
{
    return "W " + this.G1.x.toString(32) + " " + this.G1.y.toString(32) + " " + this.G2.x.toString(32) + " " + this.G2.y.toString(32);
};

function boost(x, y, Ak)
{
    this.Ak = Ak;
    var Bz = this.Ak * Math.PI / 180;
    this.G = new vector(x, y);
    this.O = new vector(-Math.sin(Bz), Math.cos(Bz));
}
boost.prototype.draw = function ()
{
    B.beginPath();
    B.fillStyle = "yellow";
    B.save();
    B.translate(this.G.o().x, this.G.o().y);
    B.rotate(this.Ak * Math.PI / 180);
    B.moveTo(-7 * currentGame.zoom, -10 * currentGame.zoom);
    B.lineTo(0, 10 * currentGame.zoom);
    B.lineTo(7 * currentGame.zoom, -10 * currentGame.zoom);
    B.lineTo(-7 * currentGame.zoom, -10 * currentGame.zoom);
    B.fill();
    B.stroke();
    B.restore();
};
boost.prototype.Ad = function (AV)
{
    if(AV.G.sub(this.G).Ae() < 1000)
    {
        for(var u = 0; u < AV.parent.D.length; u++)
        {
            AV.parent.D[u].G.Ai(this.O);
        }
    }
};
boost.prototype.erase = function (U)
{
    if(U.sub(this.G).length() < BH + 7 && (eraserType == 3 || eraserType == 0))
    {
    	var Ag = this;
	    currentGame.appendHistoric(function()
		{
			var x = Math.floor(Ag.G.x / currentGame.q);
		    var y = Math.floor(Ag.G.y / currentGame.q);
		    if(currentGame.I[x] == undefined)
		    {
		        currentGame.I[x] = new Array;
		    }
		    if(currentGame.I[x][y] == undefined)
		    {
		        currentGame.I[x][y] = new BP(x, y);
		    }
		    currentGame.I[x][y].AD.push(Ag);
		}, function()
		{
		    Ag.removeIT()
		})
        this.remove = true;
        currentGame.remove(this.G);
    }
};
boost.prototype.removeIT = function ()
{
    this.remove = true;
    currentGame.remove(this.G);
};
boost.prototype.saveCode = function ()
{
    return "B " + this.G.x.toString(32) + " " + this.G.y.toString(32) + " " + (this.Ak - 180).toString(32);
};

function gravity(x, y, Ak)
{
    this.Ak = Ak;
    var Bz = this.Ak * Math.PI / 180;
    this.G = new vector(x, y);
    this.O = new vector(-0.3 * Math.sin(Bz), 0.3 * Math.cos(Bz));
}
gravity.prototype.draw = function ()
{
    B.beginPath();
    B.fillStyle = "#00FF00";
    B.save();
    B.translate(this.G.o().x, this.G.o().y);
    B.rotate(this.Ak * Math.PI / 180);
    B.moveTo(-7 * currentGame.zoom, -10 * currentGame.zoom);
    B.lineTo(0, 10 * currentGame.zoom);
    B.lineTo(7 * currentGame.zoom, -10 * currentGame.zoom);
    B.lineTo(-7 * currentGame.zoom, -10 * currentGame.zoom);
    B.fill();
    B.stroke();
    B.restore();
};
gravity.prototype.Ad = function (AV)
{
    if(AV.G.sub(this.G).Ae() < 1000)
    {
        AV.parent.gravity.takeValueOf(this.O);
        zeroGrav = false;
    }
};
gravity.prototype.erase = function (U)
{
    if(U.sub(this.G).length() < BH + 7 && (eraserType == 3 || eraserType == 0))
    {
    	var Ag = this;
	    currentGame.appendHistoric(function()
		{
			var x = Math.floor(Ag.G.x / currentGame.q);
		    var y = Math.floor(Ag.G.y / currentGame.q);
		    if(currentGame.I[x] == undefined)
		    {
		        currentGame.I[x] = new Array;
		    }
		    if(currentGame.I[x][y] == undefined)
		    {
		        currentGame.I[x][y] = new BP(x, y);
		    }
		    currentGame.I[x][y].AD.push(Ag);
		}, function()
		{
		    Ag.removeIT()
		})
        this.remove = true;
        currentGame.remove(this.G);
    }
};
gravity.prototype.removeIT = function ()
{
    this.remove = true;
    currentGame.remove(this.G);
};
gravity.prototype.saveCode = function ()
{
    return "G " + this.G.x.toString(32) + " " + this.G.y.toString(32) + " " + (this.Ak - 180).toString(32);
};

function clock(x, y)
{
    this.G = new vector(x, y);
}
clock.prototype.draw = function ()
{

	B.beginPath();
	B.fillStyle = "#FFFFFF";
	B.moveTo(this.G.o().x + 7 * currentGame.zoom, this.G.o().y);
	B.arc(this.G.o().x, this.G.o().y, 7 * currentGame.zoom, 0, 2 * Math.PI, true);
	B.fill();
	B.stroke();
	
};
clock.prototype.Ad = function (AV)
{
	
    if(AV.G.sub(this.G).Ae() < 500)//500
    {
        AV.parent.slowMotioned = true; //true
    }

};
clock.prototype.erase = function (U)
{	
    if(U.sub(this.G).length() < BH + 7 && (eraserType == 3 || eraserType == 0))
    {
    	var Ag = this;
	    currentGame.appendHistoric(function()
		{
			var x = Math.floor(Ag.G.x / currentGame.q);
		    var y = Math.floor(Ag.G.y / currentGame.q);
		    if(currentGame.I[x] == undefined)
		    {
		        currentGame.I[x] = new Array;
		    }
		    if(currentGame.I[x][y] == undefined)
		    {
		        currentGame.I[x][y] = new BP(x, y);
		    }
		    currentGame.I[x][y].AD.push(Ag);
		}, function()
		{
		    Ag.removeIT()
		})
        this.remove = true;
        currentGame.remove(this.G);
    }  
};
clock.prototype.removeIT = function ()
{	
        this.remove = true;
        currentGame.remove(this.G); 
};
clock.prototype.saveCode = function ()
{
    return "S " + this.G.x.toString(32) + " " + this.G.y.toString(32);
};

function antigravity(x, y)
{
    this.G = new vector(x, y);
}
antigravity.prototype.draw = function ()
{

	B.beginPath();
	B.fillStyle = "#00FF00";
	B.moveTo(this.G.o().x + 7 * currentGame.zoom, this.G.o().y);
	B.arc(this.G.o().x, this.G.o().y, 7 * currentGame.zoom, 0, 2 * Math.PI, true);
	B.fill();
	B.stroke();
	
};
antigravity.prototype.Ad = function (AV)
{
    if(AV.G.sub(this.G).Ae() < 500)//500
    {
    	AV.parent.gravity = new vector(0,0);
    	zeroGrav = true;
    }
};
antigravity.prototype.erase = function (U)
{
    if(U.sub(this.G).length() < BH + 7 && (eraserType == 3 || eraserType == 0))
    {
    	var Ag = this;
	    currentGame.appendHistoric(function()
		{
			var x = Math.floor(Ag.G.x / currentGame.q);
		    var y = Math.floor(Ag.G.y / currentGame.q);
		    if(currentGame.I[x] == undefined)
		    {
		        currentGame.I[x] = new Array;
		    }
		    if(currentGame.I[x][y] == undefined)
		    {
		        currentGame.I[x][y] = new BP(x, y);
		    }
		    currentGame.I[x][y].AD.push(Ag);
		}, function()
		{
		    Ag.removeIT()
		})
        this.remove = true;
        currentGame.remove(this.G);
    }
};
antigravity.prototype.removeIT = function ()
{
    this.remove = true;
    currentGame.remove(this.G);
};
antigravity.prototype.saveCode = function ()
{
    return "A " + this.G.x.toString(32) + " " + this.G.y.toString(32);
};

function bomb(x, y)
{
    this.G = new vector(x, y);
}
bomb.prototype.draw = function ()
{
    B.beginPath();
    B.fillStyle = "red";
    B.moveTo(this.G.o().x + 7 * currentGame.zoom, this.G.o().y);
    B.arc(this.G.o().x, this.G.o().y, 7 * currentGame.zoom, 0, 2 * Math.PI, true);
    B.fill();
    B.stroke();
};
bomb.prototype.Ad = function (AV)
{
    if(AV.G.sub(this.G).Ae() < 500 && !AV.parent.Cq)
    {
        currentVehicle = new explosion(this.G, currentVehicle.gravity, currentVehicle.z);
    }
};
bomb.prototype.erase = function (U)
{
    if(U.sub(this.G).length() < BH + 7 && (eraserType == 3 || eraserType == 0))
    {
    	var Ag = this;
	    currentGame.appendHistoric(function()
		{
			var x = Math.floor(Ag.G.x / currentGame.q);
		    var y = Math.floor(Ag.G.y / currentGame.q);
		    if(currentGame.I[x] == undefined)
		    {
		        currentGame.I[x] = new Array;
		    }
		    if(currentGame.I[x][y] == undefined)
		    {
		        currentGame.I[x][y] = new BP(x, y);
		    }
		    currentGame.I[x][y].AD.push(Ag);
		}, function()
		{
		    Ag.removeIT()
		})
        this.remove = true;
        currentGame.remove(this.G);
    }
};
bomb.prototype.removeIT = function ()
{
    this.remove = true;
    currentGame.remove(this.G);
};
bomb.prototype.saveCode = function ()
{
    return "O " + this.G.x.toString(32) + " " + this.G.y.toString(32);
};

function line(C_, C9, C8, C$)
{
    this.AH = new vector(Math.round(C_), Math.round(C9));
    this.AK = new vector(Math.round(C8), Math.round(C$));
    this.BK = this.AK.sub(this.AH);
    this.length = this.BK.length();
    this.remove = false;
}
line.prototype.draw = function (Au, CI, CP)
{
    Au.beginPath();
    Au.moveTo(this.AH.x * currentGame.zoom - CI, this.AH.y * currentGame.zoom - CP);
    Au.lineTo(this.AK.x * currentGame.zoom - CI, this.AK.y * currentGame.zoom - CP);
    Au.stroke();
};
line.prototype.Ad = function (Ah)
{
    if(this.DN)
    {
        return;
    }
    this.DN = true;
    var AA = Ah.G;
    var AS = Ah.g;
    var L = Ah.Al;
    var N = new vector(0, 0);
    var R = 0;
    var Ap = AA.sub(this.AH);
    var Aw = Ap.Bd(this.BK) / this.length / this.length;
    if(Aw >= 0 && Aw <= 1)
    {
        var B2 = (Ap.x * this.BK.y - Ap.y * this.BK.x) * ((Ap.x - AS.x) * this.BK.y - (Ap.y - AS.y) * this.BK.x) < 0 ? -1 : 1;
        N = Ap.sub(this.BK.F(Aw));
        R = N.length();
        if(R < L || B2 < 0)
        {
            AA.Ai(N.F((L * B2 - R) / R));
            Ah.drive(new vector(-N.y / R, N.x / R));
            return;
        }
    }
    if(Aw * this.length < -L || Aw * this.length > this.length + L)
    {
        return;
    }
    var Bp = Aw > 0 ? this.AK : this.AH;
    N = AA.sub(Bp);
    R = N.length();
    if(R < L)
    {
        AA.Ai(N.F((L - R) / R));
        Ah.drive(new vector(-N.y / R, N.x / R));
        return;
    }
};
line.prototype.erase = function (U)
{
	if(eraserType == 1 || eraserType == 0)
	{
		var C4 = U.sub(this.AH);
	    var B8 = C4.Bd(this.BK.Bc(this.length));
	    var Bi = new vector(0, 0);
	    if(B8 <= 0)
	    {
	        Bi.takeValueOf(this.AH);
	    }
	    else if(B8 >= this.length)
	    {
	        Bi.takeValueOf(this.AK);
	    }
	    else
	    {
	        Bi.takeValueOf(this.AH.add(this.BK.Bc(this.length).F(B8)));
	    }
	    var DA = U.sub(Bi);
	    if(DA.length() <= BH)
	    {
	    	var P = this;
		    currentGame.appendHistoric(function()
			{
				P.remove = false;
				var I = CG(new vector(P.AH.x, P.AH.y), new vector(P.AK.x, P.AK.y), currentGame.q);
	            for(var T = 0; T < I.length; T++)
	            {
	                var x = Math.floor(I[T].x / currentGame.q);
	                var y = Math.floor(I[T].y / currentGame.q);
	                if(currentGame.I[x] == undefined)
	                {
	                    currentGame.I[x] = new Array;
	                }
	                if(currentGame.I[x][y] == undefined)
	                {
	                    currentGame.I[x][y] = new BP;
	                }

	                currentGame.I[x][y].AG.push(P);
	                    
	                delete currentGame.Ax[x + "_" + y];
	            }
			}, function()
			{
			    P.removeIT()
			})
	        this.remove = true;
	        currentGame.remove(this.AH, this.AK);
	    }
	}
};
line.prototype.removeIT = function ()
{
	this.remove = true;
	currentGame.remove(this.AH, this.AK);
};
line.prototype.CR = function ()
{
    this.B9 = true;
    var end = " " + this.AK.x.toString(32) + " " + this.AK.y.toString(32);
    var next = currentGame.I[Math.floor(this.AK.x / currentGame.q)][Math.floor(this.AK.y / currentGame.q)].search(this.AK, "line");
    if(next != undefined)
    {
        end += next.CR();
    }
    return end;
};

function scenery(C_, C9, C8, C$)
{
    this.AH = new vector(Math.round(C_), Math.round(C9));
    this.AK = new vector(Math.round(C8), Math.round(C$));
    this.BK = this.AK.sub(this.AH);
    this.length = this.BK.length();
    this.remove = false;
}
scenery.prototype.draw = function (Au, CI, CP)
{
    Au.beginPath();
    Au.moveTo(this.AH.x * currentGame.zoom - CI, this.AH.y * currentGame.zoom - CP);
    Au.lineTo(this.AK.x * currentGame.zoom - CI, this.AK.y * currentGame.zoom - CP);
    Au.stroke();
};
scenery.prototype.erase = function (U)
{
	if(eraserType == 2 || eraserType == 0)
	{
	    var C4 = U.sub(this.AH);
	    var B8 = C4.Bd(this.BK.Bc(this.length));
	    var Bi = new vector(0, 0);
	    if(B8 <= 0)
	    {
	        Bi.takeValueOf(this.AH);
	    }
	    else if(B8 >= this.length)
	    {
	        Bi.takeValueOf(this.AK);
	    }
	    else
	    {
	        Bi.takeValueOf(this.AH.add(this.BK.Bc(this.length).F(B8)));
	    }
	    var DA = U.sub(Bi);
	    if(DA.length() <= BH)
	    {
	    	var P = this;
	    	currentGame.appendHistoric(function()
			{
				P.remove = false;
				var I = CG(new vector(P.AH.x, P.AH.y), new vector(P.AK.x, P.AK.y), currentGame.q);
	            for(var T = 0; T < I.length; T++)
	            {
	                var x = Math.floor(I[T].x / currentGame.q);
	                var y = Math.floor(I[T].y / currentGame.q);
	                if(currentGame.I[x] == undefined)
	                {
	                    currentGame.I[x] = new Array;
	                }
	                if(currentGame.I[x][y] == undefined)
	                {
	                    currentGame.I[x][y] = new BP;
	                }

	                currentGame.I[x][y].AL.push(P);
	                    
	                delete currentGame.Ax[x + "_" + y];
	            }
			}, function()
			{
			    P.removeIT()
			})
	        this.remove = true;
	        currentGame.remove(this.AH, this.AK);
	    }
	}
};
scenery.prototype.removeIT = function ()
{
	this.remove = true;
	currentGame.remove(this.AH, this.AK);
};
scenery.prototype.CR = function ()
{
    this.B9 = true;
    var end = " " + this.AK.x.toString(32) + " " + this.AK.y.toString(32);
    var next = currentGame.I[Math.floor(this.AK.x / currentGame.q)][Math.floor(this.AK.y / currentGame.q)].search(this.AK, "sline");
    if(next != undefined)
    {
        end += next.CR();
    }
    return end;
};

function BP()
{
    this.AG = new Array;
    this.AL = new Array;
    this.AD = new Array;
}
BP.prototype.Ad = function (AV)
{
    for(var P = this.AG.length - 1; P >= 0; P--)
    {
        this.AG[P].Ad(AV);
    }
    if(!AV.parent.dead)
    {
        for(var j = this.AD.length - 1; j >= 0; j--)
        {
            this.AD[j].Ad(AV);
        }
    }
};
BP.prototype.Cy = function ()
{
    for(var P = 0; P < this.AG.length; P++)
    {
        this.AG[P].DN = false;
    }
};
BP.prototype.remove = function ()
{
    for(var P = 0; P < this.AG.length; P++)
    {
        if(this.AG[P].remove)
        {
            this.AG.splice(P, 1);
            P--;
        }
    }
    for(var v = 0; v < this.AL.length; v++)
    {
        if(this.AL[v].remove)
        {
            this.AL.splice(v, 1);
            v--;
        }
    }
    for(var j = 0; j < this.AD.length; j++)
    {
        if(this.AD[j].remove != undefined)
        {
            this.AD.splice(j, 1);
            j--;
        }
    }
};
BP.prototype.search = function (U, type)
{
    if(type == "sline")
    {
        for(var v = 0; v < this.AL.length; v++)
        {
            if(this.AL[v].AH.x == U.x && this.AL[v].AH.y == U.y && this.AL[v].B9 == undefined)
            {
                return this.AL[v];
            }
        }
    }
    else
    {
        for(var P = 0; P < this.AG.length; P++)
        {
            if(this.AG[P].AH.x == U.x && this.AG[P].AH.y == U.y && this.AG[P].B9 == undefined)
            {
                return this.AG[P];
            }
        }
    }
};

function CG(Av, BZ, q)
{
    var I = new Array;
    var A_ = new vector(Av.x, Av.y);
    var DM = (BZ.y - Av.y) / (BZ.x - Av.x);
    var O = new vector(Av.x < BZ.x ? 1 : -1, Av.y < BZ.y ? 1 : -1);
    var DP = 0;
    I.push(Av);
    while(DP < 5000)
    {
        if(Math.floor(A_.x / q) == Math.floor(BZ.x / q) && Math.floor(A_.y / q) == Math.floor(BZ.y / q))
        {
            break;
        }
        var B4 = new vector;
        if(O.x < 0)
        {
            B4.x = Math.round(Math.ceil((A_.x + 1) / q + O.x) * q) - 1;
        }
        else
        {
            B4.x = Math.round(Math.floor(A_.x / q + O.x) * q);
        }
        B4.y = Math.round(Av.y + (B4.x - Av.x) * DM);
        var B1 = new vector;
        if(O.y < 0)
        {
            B1.y = Math.round(Math.ceil((A_.y + 1) / q + O.y) * q) - 1;
        }
        else
        {
            B1.y = Math.round(Math.floor(A_.y / q + O.y) * q);
        }
        B1.x = Math.round(Av.x + (B1.y - Av.y) / DM);
        if(Math.pow(B4.x - Av.x, 2) + Math.pow(B4.y - Av.y, 2) < Math.pow(B1.x - Av.x, 2) + Math.pow(B1.y - Av.y, 2))
        {
            A_ = B4;
            I.push(B4);
        }
        else
        {
            A_ = B1;
            I.push(B1);
        }
        DP++;
    }
    return I;
}

function memoryStuff()
{
    this.Sa = [];
    this.Ra = 0
}

memoryStuff.prototype.push = function(a)
{
    this.Sa.length = Math.min(this.Sa.length, this.Ra + 1);
    this.Ra = this.Sa.push(a) - 1;
    return this
};
memoryStuff.prototype.undo = function()
{
    if (0 <= this.Ra)
    {
        var a = this.Sa[this.Ra--].undo;
        "function" === typeof a && a(this)
    }
    return this
};
memoryStuff.prototype.retro = function()
{
    if (this.Ra < this.Sa.length - 1)
    {
        var a = this.Sa[++this.Ra].retro;
        "function" === typeof a && a(this)
    }
    return this
};
function Game(ID)
{
    this.I = new Array;
    this.q = 100;//100
    this.Ax = new Array;
    this.zoom = 0.6;//0.6
    this.ID = ID;
    B.fillText("Loading track... Please wait.", 36, 16);
    this.A5 = new vector(0, 0);

    this.historic = new memoryStuff;

    rightToolbar.style.display = "block";
    V = "line";
    if(this.ID == undefined)
    {
        var Cv = "-18 1i 18 1i##";
        V = "line";
    }
    else if(this.ID.length > 7)
    {
        var Cv = this.ID;
        this.ID = undefined;
    }

    var currentGame = Cv.split("#");
    var AG = currentGame[0].split(",");
    for(var Az = 0; Az < AG.length; Az++)
    {
        var AJ = AG[Az].split(" ");
        if(AJ.length > 3)
        {
            for(var U = 0; U < AJ.length - 2; U += 2)
            {
                var P = new line(parseInt(AJ[U], 32), parseInt(AJ[U + 1], 32), parseInt(AJ[U + 2], 32), parseInt(AJ[U + 3], 32));
                if(P.length >= 2 && P.length < 100000)
                {
                    var I = CG(new vector(P.AH.x, P.AH.y), new vector(P.AK.x, P.AK.y), this.q);
                    for(var T = 0; T < I.length; T++)
                    {
                        var x = Math.floor(I[T].x / this.q);
                        var y = Math.floor(I[T].y / this.q);
                        if(this.I[x] == undefined)
                        {
                            this.I[x] = new Array;
                        }
                        if(this.I[x][y] == undefined)
                        {
                            this.I[x][y] = new BP(x, y);
                        }
                        this.I[x][y].AG.push(P);
                    }
                }
            }
        }
    }
    var AL = currentGame[1].split(",");
    for(var Az = 0; Az < AL.length; Az++)
    {
        var AJ = AL[Az].split(" ");
        if(AJ.length > 3)
        {
            for(var U = 0; U < AJ.length - 2; U += 2)
            {
                var v = new scenery(parseInt(AJ[U], 32), parseInt(AJ[U + 1], 32), parseInt(AJ[U + 2], 32), parseInt(AJ[U + 3], 32));
                if(v.length >= 2 && v.length < 100000)
                {
                    var I = CG(new vector(v.AH.x, v.AH.y), new vector(v.AK.x, v.AK.y), this.q);
                    for(var T = 0; T < I.length; T++)
                    {
                        var x = Math.floor(I[T].x / this.q);
                        var y = Math.floor(I[T].y / this.q);
                        if(this.I[x] == undefined)
                        {
                            this.I[x] = new Array;
                        }
                        if(this.I[x][y] == undefined)
                        {
                            this.I[x][y] = new BP;
                        }
                        this.I[x][y].AL.push(v);
                    }
                }
            }
        }
    }
    this.totalNumberOfTarget = 0;
    this.numberOfTargetCollected = 0;
    this.AD = new Array;
    var AD = currentGame[2].split(",");
    for(var j = 0; j < AD.length; j++)
    {
        var AJ = AD[j].split(" ");
        if(AJ.length > 2)
        {
            switch(AJ[0])
            {
            case "T":
                var Ag = new target(parseInt(AJ[1], 32), parseInt(AJ[2], 32));
                this.totalNumberOfTarget++;
                this.AD.push(Ag);
                break;
            case "C":
                var Ag = new checkpoint(parseInt(AJ[1], 32), parseInt(AJ[2], 32));
                this.AD.push(Ag);
                break;
            case "B":
                var Ag = new boost(parseInt(AJ[1], 32), parseInt(AJ[2], 32), parseInt(AJ[3], 32) + 180);
                break;
            case "G":
                var Ag = new gravity(parseInt(AJ[1], 32), parseInt(AJ[2], 32), parseInt(AJ[3], 32) + 180);
                break;
            case "O":
                var Ag = new bomb(parseInt(AJ[1], 32), parseInt(AJ[2], 32));
                break;
            case "S":
                var Ag = new clock(parseInt(AJ[1], 32), parseInt(AJ[2], 32));
                break;
            case "A":
                var Ag = new antigravity(parseInt(AJ[1], 32), parseInt(AJ[2], 32));
                break;
            case "W":
                var Ag = new teleporter(parseInt(AJ[1], 32), parseInt(AJ[2], 32), parseInt(AJ[3], 32), parseInt(AJ[4], 32));
                var x = Math.floor(Ag.G2.x / this.q);
	            var y = Math.floor(Ag.G2.y / this.q);
	            if(this.I[x] == undefined)
	            {
	                this.I[x] = new Array;
	            }
	            if(this.I[x][y] == undefined)
	            {
	                this.I[x][y] = new BP(x, y);
	            }
	            this.I[x][y].AD.push(Ag);
	            this.AD.push(Ag);
                break;
            default:
                ;
            }
            var x = Math.floor(Ag.G.x / this.q);
            var y = Math.floor(Ag.G.y / this.q);
            if(this.I[x] == undefined)
            {
                this.I[x] = new Array;
            }
            if(this.I[x][y] == undefined)
            {
                this.I[x][y] = new BP(x, y);
            }
            this.I[x][y].AD.push(Ag);
        }
    }
    if(currentGame[3] == "MTB" || currentGame[3] == "BMX")
    {
        whichBike = currentGame[3];
        this.z = currentGame[4] != "" ? currentGame[4] : false;
    }
    else
    {
        this.z = currentGame[3] != "" ? currentGame[3] : false;
    }
}
Game.prototype.appendHistoric = function(a, b)
{
    this.historic.push(
    {
        "undo": a,
        "retro": b
    });
    return this
};
Game.prototype.undo = function()
{
    this.historic.undo();
    return this
};
Game.prototype.retro = function()
{
    this.historic.retro();
    return this
};

Game.prototype.restart = function ()
{
	if(gravityCheckpoints.length > 1)
	{
		gravityCheckpoints.pop();
	}
    if(Z.length > 1)
    {
        Z.pop();
    }
    if(b.length > 1)
    {
        b.pop();
    }
    if(W && K.length > 1)
    {
        K.pop();
    }
};
Game.prototype.fromLastCP = function ()
{
    this.DV();
    pause = false;
    zeroGrav = gravityCheckpoints[gravityCheckpoints.length - 1];
    currentVehicle = whichBike == "BMX" ? new BMX : new MTB;
    focus = currentVehicle.h;
    if(W)
    {
        W = this.currentGhostCode[6] == "BMX" ? new ghostBMX(this.currentGhostCode) : new ghostMTB(this.currentGhostCode);
        if(K.length == 1 && !pedaling)
        {
            focus = W.h;
        }
    }
    /*
    if(!raceMod)
    {
        this.A5 = new vector(currentVehicle.h.G.x, currentVehicle.h.G.y);
    }*/
};
Game.prototype.resetPosition = function ()
{
    Z = new Array(new Array(0, -1, 0, -1, 0, 0, -21, 38, -21, 38, 0, 0, 0, 21, 38, 21, 38, 0, 0, 0, 45, 42, 45, 1, 0, 0.3, false, 0, new Array, 0));
    b = new Array(new Array(2, -3, 2, -3, 0, 0, -23, 35, -23, 35, 0, 0, 0, 23, 35, 23, 35, 0, 0, 0, 47, 45, 45, 1, 0, 0.3, false, 0, new Array, 0));
    if(W)
    {
        K = this.currentGhostCode[6] == "BMX" ? new Array(new Array(0, -1, 0, -1, 0, 0, -21, 38, -21, 38, 0, 0, 0, 21, 38, 21, 38, 0, 0, 0, 45, 42, 45, 1, 0, 0.3, false, 0, 0, 0, 0)) : new Array(new Array(2, -3, 2, -3, 0, 0, -23, 35, -23, 35, 0, 0, 0, 23, 35, 23, 35, 0, 0, 0, 47, 45, 45, 1, 0, 0.3, false, 0, 0, 0, 0));
    }
    this.fromLastCP();
};
Game.prototype.DV = function ()
{
    for(var x in this.I)
    {
        for(var y in this.I[x])
        {
            for(var j = 0; j < this.I[x][y].AD.length; j++)
            {
                if(this.I[x][y].AD[j].BM != undefined)
                {
                    this.I[x][y].AD[j].BM = false;
                }
                if(this.I[x][y].AD[j].BM4ghosts != undefined)
                {
                    this.I[x][y].AD[j].BM4ghosts = false;
                }
            }
        }
    }
};
Game.prototype.Ad = function (AV)
{
    var x = Math.floor(AV.G.x / this.q - 0.5);
    var y = Math.floor(AV.G.y / this.q - 0.5);
    if(this.I[x] != undefined)
    {
        if(this.I[x][y] != undefined)
        {
            this.I[x][y].Cy();
        }
        if(this.I[x][y + 1] != undefined)
        {
            this.I[x][y + 1].Cy();
        }
    }
    if(this.I[x + 1] != undefined)
    {
        if(this.I[x + 1][y] != undefined)
        {
            this.I[x + 1][y].Cy();
        }
        if(this.I[x + 1][y + 1] != undefined)
        {
            this.I[x + 1][y + 1].Cy();
        }
    }
    if(this.I[x] != undefined && this.I[x][y] != undefined)
    {
        this.I[x][y].Ad(AV);
    }
    if(this.I[x + 1] != undefined)
    {
        if(this.I[x + 1][y] != undefined)
        {
            this.I[x + 1][y].Ad(AV);
        }
        if(this.I[x + 1][y + 1] != undefined)
        {
            this.I[x + 1][y + 1].Ad(AV);
        }
    }
    if(this.I[x] != undefined && this.I[x][y + 1] != undefined)
    {
        this.I[x][y + 1].Ad(AV);
    }
};
Game.prototype.draw = function ()
{
    if(focus )//&& !raceMod)
    {
        this.A5.Ai(focus.G.sub(this.A5).Bc(5));//Bc(5)
    }
    B.clearRect(0, 0, p.width, p.height);
    if(nightMod)
    {
    	B.fillStyle = "white";
    	B.fillRect(0, 0, p.width, p.height);
    }

    //DRAW GRID
    if(gridScale != 1)
    {
    	B.lineCap = "round";
        B.lineWidth = Math.max(this.zoom * 2/3, 0.1);
    	B.strokeStyle = "#CCCCCC";
    	B.beginPath();
    	var temp = 0;
    	for(var x = -Math.round(p.width / (2*gridScale))*gridScale; x <= p.width/2; x+=(gridScale / this.q))
	    {
	    	temp = Math.floor((p.width / 2) - (this.A5.x + x * this.q) * this.zoom);
	    	if(temp >= 0 && temp <= p.width)
	    	{
	    		B.moveTo(temp, 0);
	        	B.lineTo(temp, p.height);
	    	}
	    }
	    for(var y = -Math.round(p.height / (2*gridScale))*gridScale; y <= p.height/2; y+=(gridScale / this.q))
	    {
	    	temp = Math.floor((p.height / 2) - (this.A5.y + y* this.q) * this.zoom);
	    	if(temp >= 0 && temp <= p.height)
	    	{
		        B.moveTo(0, temp);
		        B.lineTo(p.width, temp);
	    	}

	    }
	    B.stroke();
	    B.closePath();
    }

    B.lineWidth = Math.max(2 * this.zoom, 0.5);
    if((V == "line" || V == "scenery line" || V == "brush" || V == "scenery brush" || V == "teleporter") && lineLinkedWithPrevious)
    {
        if(w.o().x < 50)
        {
            currentGame.A5.x -= 10 / this.zoom;
            w.x -= 10 / this.zoom;
        }
        else if(w.o().x > p.width - 50)
        {
            currentGame.A5.x += 10 / this.zoom;
            w.x += 10 / this.zoom;
        }
        if(w.o().y < 50)
        {
            currentGame.A5.y -= 10 / this.zoom;
            w.y -= 10 / this.zoom;
        }
        else if(w.o().y > p.height - 50)
        {
            currentGame.A5.y += 10 / this.zoom;
            w.y += 10 / this.zoom;
        }
        B.beginPath();
        B.strokeStyle = "red";
        B.moveTo(AF.o().x, AF.o().y);
        B.lineTo(w.o().x, w.o().y);
        B.stroke();
        B.closePath();
        if(V=="teleporter")
        {
        	B.beginPath();
		    B.fillStyle = "#FF00FF";
            B.strokeStyle = "black";
		    B.arc(AF.o().x, AF.o().y, 7 * currentGame.zoom, 0, 2 * Math.PI, true);
		    B.fill();
		    B.stroke();
		    B.closePath();
        }
    }
    var A_ = (new vector(0, 0)).Cr();
    var CH = (new vector(p.width, p.height)).Cr();
    A_.x = Math.floor(A_.x / this.q);
    A_.y = Math.floor(A_.y / this.q);
    CH.x = Math.floor(CH.x / this.q);
    CH.y = Math.floor(CH.y / this.q);
    var DI = new Array;

    for(var x = A_.x; x <= CH.x; x++)
    {
        for(var y = A_.y; y <= CH.y; y++)
        {
            if(this.I[x] != undefined && this.I[x][y] != undefined)
            {
                if(this.I[x][y].AG.length > 0 || this.I[x][y].AL.length > 0)
                {
                    DI[x + "_" + y] = 1;
                    if(this.Ax[x + "_" + y] == undefined)
                    {
                        this.Ax[x + "_" + y] = document.createElement("canvas");
                        this.Ax[x + "_" + y].width = 1.01 * this.q * this.zoom;
                        this.Ax[x + "_" + y].height = 1.01 * this.q * this.zoom;
                        var Au = this.Ax[x + "_" + y].getContext("2d");
                        Au.lineCap = "round";
                        Au.lineWidth = Math.max(2 * this.zoom, 0.5);
                        Au.strokeStyle = "#AAAAAA";
                        if(sceneryStyle==1)
	                    {
	                    	Au.strokeStyle = "rgba(0, 0, 0, 0.5)";
	                    	
	                    }
	                    else if(sceneryStyle==2)
	                    {
	                    	Au.strokeStyle = "black";
	                    }
                        for(var v = 0; v < this.I[x][y].AL.length; v++)
                        {
                            this.I[x][y].AL[v].draw(this.Ax[x + "_" + y].getContext("2d"), (x-0.01) * this.q * this.zoom, (y-0.01) * this.q * this.zoom);
                        }
                        Au.strokeStyle = "black";
                        if(lineShaded)
                        {
                            Au.shadowOffsetX = 2;
                            Au.shadowOffsetY = 2;
                            Au.shadowBlur = Math.max(2, 10 * this.zoom);
                            Au.shadowColor = "black";
                        }
                        for(var P = 0; P < this.I[x][y].AG.length; P++)
                        {
                            this.I[x][y].AG[P].draw(this.Ax[x + "_" + y].getContext("2d"), (x-0.01) * this.q * this.zoom , (y-0.01) * this.q * this.zoom);
                        }
                    }
                    B.drawImage(this.Ax[x + "_" + y], Math.floor(p.width / 2 - this.A5.x * this.zoom + (x-0.01) * this.q * this.zoom), Math.floor(p.height / 2 - this.A5.y * this.zoom + (y-0.01) * this.q * this.zoom));    
                }
                B.strokeStyle = "black";
                for(var j = 0; j < this.I[x][y].AD.length; j++)
                {
                    this.I[x][y].AD[j].draw();
                }
            }
        }
    }
    for(var Ay in this.Ax)
    {
        if(DI[[Ay]] == undefined)
        {
            delete this.Ax[Ay];
        }
    }
    if(p.width == 250)
    {
        return;
    }
    if(V != "camera" && !focus)
    {
        switch(V)
        {
        case "line":
        case "scenery line":
        case "brush":
        case "scenery brush":
            B.beginPath();
            B.lineWidth = 1;
            B.strokeStyle = "black";
            var x = Math.round(w.o().x);
            var y = Math.round(w.o().y);
            B.moveTo(x - 10, y);
            B.lineTo(x + 10, y);
            B.moveTo(x, y + 10);
            B.lineTo(x, y - 10);
            B.stroke();
            break;
        case "eraser":
            B.beginPath();
            if(eraserType==1)
            {
            	B.fillStyle = "#FFCE91";
            }
            else if(eraserType==2)
            {
            	B.fillStyle = "lightblue";
            }
            else if(eraserType==3)
            {
            	B.fillStyle = "lightgreen";
            }
            else
            {
            	B.fillStyle = "lightpink";
            }
            B.arc(w.o().x, w.o().y, (BH - 1) * this.zoom, 0, 2 * Math.PI, true);
            B.fill();
            break;
        case "goal":
        case "checkpoint":
        case "bomb":
        case "anti-gravity":
        case "clock":
        case "teleporter":
            B.beginPath();
            if(V == "goal")
            {
            	B.fillStyle = "yellow";
            }
        	else if(V == "checkpoint")
        	{
        		B.fillStyle = "blue";
        	}
        	else if(V == "bomb")
        	{
        		B.fillStyle = "red";
        	}
        	else if(V == "anti-gravity")
        	{
        		B.fillStyle = "#00FF00";
        	}
        	else if(V == "teleporter")
        	{
        		B.fillStyle = "#FF00FF";
        	}
        	else
        	{
        		B.fillStyle = "white";
        	}
        	
            B.arc(w.o().x, w.o().y, 7 * this.zoom, 0, 2 * Math.PI, true);
            B.fill();
            B.stroke();
            break;
        case "boost":
        case "gravity":
            B.beginPath();
            B.fillStyle = V == "boost" ? "yellow" : "#00FF00";
            B.save();
            if(!lineLinkedWithPrevious)
            {
                B.translate(w.o().x, w.o().y);
            }
            else
            {
                B.translate(AF.o().x, AF.o().y);
                B.rotate(Math.atan2(-(w.x - AF.x), w.y - AF.y));
            }
            B.moveTo(-7 * currentGame.zoom, -10 * currentGame.zoom);
            B.lineTo(0, 10 * currentGame.zoom);
            B.lineTo(7 * currentGame.zoom, -10 * currentGame.zoom);
            B.lineTo(-7 * currentGame.zoom, -10 * currentGame.zoom);
            B.fill();
            B.stroke();
            B.restore();
            break;
        default:
            ;
        }
    }

    B.beginPath();
    B.fillStyle = "yellow";
    B.lineWidth = 1;
    B.arc(40, 12, 4, 0, 2 * Math.PI, true);//radius 3.5
    B.fill();
    B.stroke();
    B.beginPath();
    B.lineWidth = 10;
    B.strokeStyle = "white";
    B.fillStyle = "black";
    
    if(currentVehicle.dead)
    {
        var text = Z.length > 1 || b.length > 1 ? "Press ENTER to restart or BACKSPACE to cancel checkpoint" : "Press ENTER to restart";
    }
    else if(raceMod)
    {
        var CN = Math.floor(currentVehicle.z / 60000);
        var CK = Math.floor(currentVehicle.z % 60000 / 1000);
        var Dd = Math.floor((currentVehicle.z - CN * 60000 - CK * 1000) / 100);
        if(CN < 10)
        {
            CN = "0" + CN;
        }
        if(CK < 10)
        {
            CK = "0" + CK;
        }
        var text = CN + ":" + CK + "." + Dd;
    }
    else
    {

        var text = "";
        if(pause)
        {
        	text = "Game paused"
        }
        else
        {
        	text = "FREE RIDER 2 - GHOSTDOG";
        }
        if(this.ID == undefined)
        {
            if(gridScale != 1 && (V == "line" || V == "scenery line" || V == "brush" || V == "scenery brush"))
            {
                text += " - Grid ";
                text += "( size " + gridSizeWhenActivated + " )";
            }
            if(V != "eraser")
            {
            	text += " - " + V;
            }
            else
            {
            	if(eraserType == 0)
            	{
            		text += " - general eraser";
            	}
            	else if(eraserType == 1)
            	{
            		text += " - line eraser";
            	}
            	else if(eraserType == 2)
            	{
            		text += " - scenery eraser";
            	}
            	else if(eraserType == 3)
            	{
            		text += " - powerup eraser";
            	}

            }
            if(V == "brush" || V == "scenery brush")
            {
                text += " ( size " + CF + " )";
            }
            else if(V=="Grid")
            {
            	text += " ( size " + gridSizeWhenActivated + " )";
            }
        }
        if((label && label[0] && !label[1]))
        {
            text = "FREE RIDER 2 - GHOSTDOG";
        }
    }
    
    if(label && !label[0] && !label[1])
    {
        text += " - " + (pause ? "Unpause" : "Pause") + " ( SPACE )";
    }
    B.strokeText(" " + this.numberOfTargetCollected + " / " + this.totalNumberOfTarget + "  -  " + text, 50, 16);
    B.fillText(" " + this.numberOfTargetCollected + " / " + this.totalNumberOfTarget + "  -  " + text, 50, 16);
    if(label)
    {
        if(!label[0])
        {
            B.strokeText(label[2], 36, 15 + label[1] * 25);
            B.fillText(label[2], 36, 15 + label[1] * 25);
        }
        else
        {
            B.textAlign = "right";
            if(document.documentElement.offsetHeight <= window.innerHeight)
            {
                B.strokeText(label[2], p.width - 36, 15 + label[1] * 25);
                B.fillText(label[2], p.width - 36, 15 + label[1] * 25);
            }
            else
            {
                B.strokeText(label[2], p.width - 51, 15 + label[1] * 25);
                B.fillText(label[2], p.width - 51, 15 + label[1] * 25);
            }
            B.textAlign = "left";
        }
    }
};
Game.prototype.erase = function (U)
{
    var x = Math.floor(U.x / this.q - 0.5);
    var y = Math.floor(U.y / this.q - 0.5);
    if(this.I[x] != undefined)
    {
        if(this.I[x][y] != undefined)
        {
            for(var P = 0; P < this.I[x][y].AG.length; P++)
            {
                this.I[x][y].AG[P].erase(U);
            }
            for(var v = 0; v < this.I[x][y].AL.length; v++)
            {
                this.I[x][y].AL[v].erase(U);
            }
            for(var j = 0; j < this.I[x][y].AD.length; j++)
            {
                this.I[x][y].AD[j].erase(U);
            }
        }
        if(this.I[x][y + 1] != undefined)
        {
            for(var P = 0; P < this.I[x][y + 1].AG.length; P++)
            {
                this.I[x][y + 1].AG[P].erase(U);
            }
            for(var v = 0; v < this.I[x][y + 1].AL.length; v++)
            {
                this.I[x][y + 1].AL[v].erase(U);
            }
            for(var j = 0; j < this.I[x][y + 1].AD.length; j++)
            {
                this.I[x][y + 1].AD[j].erase(U);
            }
        }
    }
    if(this.I[x + 1] != undefined)
    {
        if(this.I[x + 1][y] != undefined)
        {
            for(var P = 0; P < this.I[x + 1][y].AG.length; P++)
            {
                this.I[x + 1][y].AG[P].erase(U);
            }
            for(var v = 0; v < this.I[x + 1][y].AL.length; v++)
            {
                this.I[x + 1][y].AL[v].erase(U);
            }
            for(var j = 0; j < this.I[x + 1][y].AD.length; j++)
            {
                this.I[x + 1][y].AD[j].erase(U);
            }
        }
        if(this.I[x + 1][y + 1] != undefined)
        {
            for(var P = 0; P < this.I[x + 1][y + 1].AG.length; P++)
            {
                this.I[x + 1][y + 1].AG[P].erase(U);
            }
            for(var v = 0; v < this.I[x + 1][y + 1].AL.length; v++)
            {
                this.I[x + 1][y + 1].AL[v].erase(U);
            }
            for(var j = 0; j < this.I[x + 1][y + 1].AD.length; j++)
            {
                this.I[x + 1][y + 1].AD[j].erase(U);
            }
        }
    }
    for(var j = 0; j < this.AD.length; j++)
    {
        if(this.AD[j].remove != undefined)
        {
            this.AD.splice(j, 1);
            j--;
        }
    }
};
Game.prototype.remove = function (Av, BZ)
{
    if(BZ == undefined)
    {
        BZ = Av;
    }
    var I = CG(Av, BZ, this.q);
    for(var T = 0; T < I.length; T++)
    {
        var x = Math.floor(I[T].x / this.q);
        var y = Math.floor(I[T].y / this.q);
        this.I[x][y].remove();
        delete this.Ax[x + "_" + y];
    }
};
Game.prototype.shortenLastLine = function ()
{
    if(V == "scenery line" || V == "scenery brush")
    {
        var x = Math.floor(Bg.x / this.q);
        var y = Math.floor(Bg.y / this.q);
        var v = this.I[x][y].AL[this.I[x][y].AL.length - 1];
        if(v != undefined && v.AK.x == Math.round(Bg.x) && v.AK.y == Math.round(Bg.y))
        {
            v.remove = true;
            Bg.takeValueOf(v.AH);
            this.remove(v.AH, v.AK);
        }
        else
        {
            alert("No more scenery line to erase!");
        }
    }
    else
    {
        var x = Math.floor(Bf.x / this.q);
        var y = Math.floor(Bf.y / this.q);
        var P = this.I[x][y].AG[this.I[x][y].AG.length - 1];
        if(P != undefined && P.AK.x == Math.round(Bf.x) && P.AK.y == Math.round(Bf.y))
        {
            P.remove = true;
            Bf.takeValueOf(P.AH);
            this.remove(P.AH, P.AK);
        }
        else
        {
            alert("No more line to erase!");
        }
    }
};
Game.prototype.saveCode = function ()
{
    var AG = "";
    var AL = "";
    var AD = "";
    var WarpAlreadySaved = [];
    for(var x in this.I)
    {
        for(var y in this.I[x])
        {
            for(var P = 0; P < this.I[x][y].AG.length; P++)
            {
                if(this.I[x][y].AG[P].B9 == undefined)
                {
                    AG += this.I[x][y].AG[P].AH.x.toString(32) + " " + this.I[x][y].AG[P].AH.y.toString(32) + this.I[x][y].AG[P].CR() + ",";
                }
            }
            for(var v = 0; v < this.I[x][y].AL.length; v++)
            {
                if(this.I[x][y].AL[v].B9 == undefined)
                {
                    AL += this.I[x][y].AL[v].AH.x.toString(32) + " " + this.I[x][y].AL[v].AH.y.toString(32) + this.I[x][y].AL[v].CR() + ",";
                }
            }
            for(var j = 0; j < this.I[x][y].AD.length; j++)
            {
            	var c = this.I[x][y].AD[j].saveCode();
            	if(this.I[x][y].AD[j].G2 && !(WarpAlreadySaved.indexOf(c) > -1))
            	{
            		WarpAlreadySaved.push(c)
            		AD += this.I[x][y].AD[j].saveCode() + ",";
            	}
            	else if(!this.I[x][y].AD[j].G2)
            	{
            		AD += this.I[x][y].AD[j].saveCode() + ",";
            	}
            }
        }
    }
    for(var x in this.I)
    {
        for(var y in this.I[x])
        {
            for(var P = 0; P < this.I[x][y].AG.length; P++)
            {
                this.I[x][y].AG[P].B9 = undefined;
            }
            for(var v = 0; v < this.I[x][y].AL.length; v++)
            {
                this.I[x][y].AL[v].B9 = undefined;
            }
        }
    }
    return AG.substr(0, AG.length - 1) + "#" + AL.substr(0, AL.length - 1) + "#" + AD.substr(0, AD.length - 1) + "#" + whichBike;
};
/*if(location.href.substr(0, 22) != "http://canvasrider.com")
{
    location.href = "http://canvasrider.com";
}
if(!document.createElement("canvas").getContext)
{
    location.href = "http://canvasrider.com/error";
}*/


//-------------------------------------------------------------------------INIT Variables

var p = document.getElementById("canvas_rider");
p.style.border = "1px solid black";
var B = p.getContext("2d");
B.lineCap = "round";
B.lineJoin = "round";
B.font = "9px eiven";
var leftToolbar = document.getElementById("toolbar1");
leftToolbar.style.top = p.offsetTop + "px";
leftToolbar.style.left = p.offsetLeft + "px";
leftToolbar.style.display = "block";
var rightToolbar = document.getElementById("toolbar2");
rightToolbar.style.top = p.offsetTop + "px";
rightToolbar.style.left = p.offsetLeft + p.width - 22 + "px";
var currentGame;
var pause = false;
var whichBike = "BMX";
var De = "BMX";
var Z = new Array(new Array(0, -1, 0, -1, 0, 0, -21, 38, -21, 38, 0, 0, 0, 21, 38, 21, 38, 0, 0, 0, 45, 42, 45, 1, 0, 0.3, false, 0, new Array, 0));
var b = new Array(new Array(2, -3, 2, -3, 0, 0, -23, 35, -23, 35, 0, 0, 0, 23, 35, 23, 35, 0, 0, 0, 47, 45, 45, 1, 0, 0.3, false, 0, new Array, 0));
var K;
var AZ = new Array(new Array, new Array, new Array, new Array, new Array);
var left = 0;
var right = 0;
var pedaling = 0;
var brake = 0;
var orientation = 0;
var Ct = true;//true
var focus;
var lineLinkedWithPrevious = false;//false ->line link to previous
var AF = new vector(40, 50);
var w = new vector(0, 0);
var W = false;//false
var BH = 15;
var shift = false;
var CF = 20;
var V = "camera";
var previousTool = "camera";
var C0 = false;
var label = false;

var gridScale = 1;
var gridSizeWhenActivated = 10;

lineShaded = false;

var noDieMod = false;
var noDieModForGhost = false;
var raceMod = false;
var zeroGrav = false;
var gravityCheckpoints = [false];
var sceneryStyle = 0; //default 0, transparent 1, black 2
var nightMod = false;

var menuText = new Array(new Array("", "Restart ( ENTER )", "Cancel checkpoint ( BACKSPACE )", "", "Switch bike ( CTRL+B - Arrows to control, Z to turn )", "", "Enable line shading", "Change scenery style", "Switch to night mode","Enable fullscreen ( F )","","Switch to race mode","Enable no-die mode","Enable no-die mode for ghost"),
	new Array("Brush ( A - Hold to snap, hold & scroll to adjust size )", "Scenery brush ( S - Hold to snap, hold & scroll to adjust size )", "Lines ( Q - Hold to snap )", "Scenery lines ( W - Hold to snap )",
		"Coming Soon", "Coming Soon", "Eraser ( [ E - General eraser, CTRL+E - Line/Scenery/Powerup eraser ] - Hold & scroll to adjust size )", "Camera ( R / Hold right click - Scroll to zoom )", "Enable grid snapping ( G - Hold & scroll to adjust size )", "",
		"Goal", "Boost", "Checkpoint", "Gravity modifier", "Anti-gravity", "Bomb", "Teleporter", "Clock", "", "Undo ( M )", "Redo ( N )"));
var Bf = new vector(40, 50);
var Bg = new vector(-40, 50);

var currentBestTime = 9999999999999999999;
var eraserType = 1;

function canvas_ride(DZ, Db)
{
    currentGame = new Game(DZ, Db);
    currentVehicle = whichBike == "BMX" ? new BMX : new MTB;
    focus = currentVehicle.h;
    setInterval(update, 40);//40
}

function update()
{
    if(!pause)
    {
        currentVehicle.update();
        if(W)
        {
            W.update();
        }
    }
    currentGame.draw();
    currentVehicle.draw();
    if(W)
    {
        W.draw();
    }
    if(!pause)
    {
        currentVehicle.z += 40;
    }
}

function watchGhost(code)
{
    var DW = code; //NINJA
    var CJ = DW.split(",");
    currentGame.currentGhostCode = new Array(new Array, new Array, new Array, new Array, new Array, CJ[5], CJ[6]);
    for(var BD = 0; BD < CJ.length - 2; BD++)
    {
        var DT = CJ[BD].split(" ");
        for(var Ay = 0; Ay < DT.length - 1; Ay++)
        {
            currentGame.currentGhostCode[BD][DT[Ay]] = 1;
        }
    }
    W = CJ[5];
    currentBestTime = CJ[5];
    currentGame.resetPosition();
}


function switchBike()
{
	zeroGrav = false;
    whichBike = whichBike == "BMX" ? "MTB" : "BMX";
    currentGame.resetPosition();
}

function fullscreen()
{
    if(p.width != 250)
    {
        if(p.width == 1050)
        {
            p.width = window.innerWidth;
            p.height = window.innerHeight;
            p.style.position = "fixed";
            p.style.top = 0;
            p.style.left = 0;
            p.style.border = "none";
            if(document.documentElement.offsetHeight <= window.innerHeight)
            {
                rightToolbar.style.left = p.width - 24 + "px";
            }
            else
            {
                rightToolbar.style.left = p.width - 39 + "px";
            }
            label[2] = menuText[0][9] = "Disable fullscreen ( ESC or F )";
            window.scrollTo(0, 0);
            p.style.zIndex = 3;
            leftToolbar.style.zIndex = rightToolbar.style.zIndex = 4;
        }
        else
        {
            p.width = 1050;
            p.height = 530;
            p.style.position = "static";
            p.style.border = "1px solid black";
            rightToolbar.style.left = p.offsetLeft + p.width - 22 + "px";
            label[2] = menuText[0][9] = "Enable fullscreen ( F )";
            p.style.zIndex = 2;
            leftToolbar.style.zIndex = rightToolbar.style.zIndex = 2;
        }
        B.lineCap = "round";
        B.lineJoin = "round";
        B.font = "9px eiven";
        leftToolbar.style.top = rightToolbar.style.top = p.offsetTop + "px";
        leftToolbar.style.left = p.offsetLeft + "px";
    }
    if(nightMod)
    {
    	B.filter = "invert(100%)";
    }
    else
    {
    	B.filter = "none";
    }
}
document.onkeydown = function (AE)
{
    switch(AE.keyCode)
    {
    case 8:
        if(p.width != 250)
        {
            AE.preventDefault();
        }
        currentGame.restart();
        currentGame.fromLastCP();
        break;
    case 13:
        AE.preventDefault();
        currentGame.fromLastCP();
        break;
    case 37:
        AE.preventDefault();
        focus = currentVehicle.h;
        left = 1;
        break;
    case 39:
        AE.preventDefault();
        focus = currentVehicle.h;
        right = 1;
        break;
    case 38:
        AE.preventDefault();
        focus = currentVehicle.h;
        pedaling = 1;
        break;
    case 40:
        AE.preventDefault();
        focus = currentVehicle.h;
        brake = 1;
        break;
    case 66: //B
    	if (AE.ctrlKey) //crtl-B
    	{
        	switchBike();
        }
        break;
    case 109:
        if(currentGame.zoom > 0.2)
        {
            currentGame.zoom = Math.round(currentGame.zoom * 10 - 2) / 10;
            currentGame.Ax = new Array;
        }
        break;
    case 107:
        if(currentGame.zoom < 4)
        {
            currentGame.zoom = Math.round(currentGame.zoom * 10 + 2) / 10;
            currentGame.Ax = new Array;
        }
        break;
    case 90: //Z
        orientation = 1;
        break;
    case 77: //M
    	//currentGame.shortenLastLine();
        currentGame.undo();
        break;
    case 78://N
        currentGame.retro();
        break;
    case 32:
        if(p.width != 250)
        {
            AE.preventDefault();
        }
        pause = !pause;
        break;
    default:
        ;
    }
    if(currentGame.ID == undefined)
    {
        switch(AE.keyCode)
        {
        case 65:
            if(V != "brush")
            {
                V = "brush";
                document.body.style.cursor = "none";
                shift = true;
            }
            else if(!lineLinkedWithPrevious)
            {
                lineLinkedWithPrevious = true;
                AF.takeValueOf(Bf);
                shift = true;
            }
            break;
        case 83:
            if(V != "scenery brush")
            {
                V = "scenery brush";
                document.body.style.cursor = "none";
                shift = true;
            }
            else if(!lineLinkedWithPrevious)
            {
                lineLinkedWithPrevious = true;
                AF.takeValueOf(Bg);
                shift = true;
            }
            break;
        case 81:
            if(V != "line")
            {
                V = "line";
                document.body.style.cursor = "none";
            }
            else if(!lineLinkedWithPrevious)
            {
                lineLinkedWithPrevious = true;
                AF.takeValueOf(Bf);
                shift = true;
            }
            break;
        case 87:
            if(V != "scenery line")
            {
                V = "scenery line";
                document.body.style.cursor = "none";
            }
            else if(!lineLinkedWithPrevious)
            {
                lineLinkedWithPrevious = true;
                AF.takeValueOf(Bg);
                shift = true;
            }
            break;
        case 69://E
        	AE.preventDefault();
        	if(V != "eraser" && !AE.ctrlKey)
        	{
        		V = "eraser";
	            document.body.style.cursor = "none";
	            shift = true;
        		eraserType = 0;
        	}
        	else if(V != "eraser" && AE.ctrlKey)
        	{
        		V = "eraser";
	            document.body.style.cursor = "none";
	            shift = true;
        		eraserType = 1;
        	}
        	else if(!shift && AE.ctrlKey) //crtl-E
        	{
        		if(eraserType < 3)
        		{
        			eraserType++;
        		}
        		else
        		{
        			eraserType = 1;
        		}
        		shift = true;
        	}
        	else if(!shift && !AE.ctrlKey)
        	{
        		eraserType = 0;
        		shift = true;
        	}
            
            break;
        case 82://R
            if(V != "camera")
            {
                V = "camera";
            }
            document.body.style.cursor = "move";
            break;
        case 71://G
        	if(V != "Grid")
        	{
        		previousTool = V;
        		C0 = true;
        		V = "Grid"
        		if(gridScale == 1)
		        {
		            gridScale = gridSizeWhenActivated;
		            menuText[1][8] = "Disable grid snapping ( G - Hold & scroll to adjust size )";
		        }
		        else
		        {
		            gridScale = 1;
		            menuText[1][8] = "Enable grid snapping ( G - Hold & scroll to adjust size )";
		        }
		        shift = true;
        	}
        	else
        	{
        		menuText[1][8] = "Disable grid snapping ( G - Hold & scroll to adjust size )";
        		gridScale = gridSizeWhenActivated;
        	}
	        break;

        default:
            ;
        }
    }
};
document.onkeypress = function (AE)
{
    switch(AE.keyCode)
    {
    case 13:
    case 37:
    case 39:
    case 38:
    case 40:
        AE.preventDefault();
        break;
    case 8:
    case 32:
        if(p.width != 250)
        {
            AE.preventDefault();
        }
        break;
    default:
        ;
    }
};
document.onkeyup = function (AE)
{
    switch(AE.keyCode)
    {
    case 70:
    case 27: //F
        fullscreen();
        break;
    
    case 37:
        left = 0;
        break;
    case 39:
        right = 0;
        break;
    case 38:
        pedaling = 0;
        break;
    case 40:
        brake = 0;
        break;
    case 90:
        Ct = true;
        break;
    /*
    case 71://G
        if(gridScale == 1)
        {
            gridScale = 5;
            menuText[1][8] = "Disable grid snapping ( G )";
        }
        else
        {
            gridScale = 1;
            menuText[1][8] = "Enable grid snapping ( G )";
        }
        break;
    */
    case 71:
    case 82:
        if(C0)
        {
            V = previousTool;
            if(V != "camera")
            {
            	document.body.style.cursor = "none";
            }
            else
            {
            	document.body.style.cursor = "move";
            }
            
            C0 = false;
        }
        if(shift)
        {
        	shift = false;
            lineLinkedWithPrevious = false;
        }
        break;
    case 49:
    case 50:
    case 51:
    case 52:
    case 53:
        if(currentGame.ID != undefined)
        {
            watchGhost(AE.keyCode - 48);
        }
        break;
    case 81:
    case 87:
    case 69:
    case 83:
    case 65:

        if(shift)
        {
            shift = false;
            lineLinkedWithPrevious = false;
        }
        break;
    default:
        ;
    }
};
leftToolbar.onmousemove = function (AE)
{
    var G = Math.floor((AE.clientY - leftToolbar.offsetTop + window.pageYOffset) / 25);
    label = new Array(0, G, menuText[0][G]);
};
rightToolbar.onmousemove = function (AE)
{
    var G = Math.floor((AE.clientY - rightToolbar.offsetTop + window.pageYOffset) / 25);
    label = new Array(1, G, menuText[1][G]);
    if(G == 14)
    {
        if(V == "sline" || V == "sbrush")
        {
            label[2] = "Shorten last set of scenery lines ( M )";
        }
    }
};
leftToolbar.onmousedown = function (AE)
{
    focus = false;
    switch(Math.floor((AE.clientY - leftToolbar.offsetTop + window.pageYOffset) / 25) + 1)
    {
    case 1:
        pause = !pause;
        break;
    case 3:
        currentGame.restart();
    case 2:
        currentGame.fromLastCP();
        break;
	
    case 5:
        switchBike();
        break;
    case 7:
        if(!lineShaded)
        {
            lineShaded = true;
            label[2] = menuText[0][6] = "Disable line shading";
        }
        else
        {
            lineShaded = false;
            label[2] = menuText[0][6] = "Enable line shading";
        }
        currentGame.Ax = new Array;
        break;
    case 8:
    	if(sceneryStyle<3)
    	{
    		sceneryStyle+=1;
    	}
    	else
    	{
    		sceneryStyle = 1;
    	}
    	currentGame.Ax = new Array;
    	break;
    case 9:
        if(!nightMod)
        {
            nightMod = true;
            label[2] = menuText[0][8] = "Switch to day mode";
            B.filter = "invert(100%)";
            document.getElementById("toolbar1").style.filter="invert(100%)";
			document.getElementById("toolbar2").style.filter="invert(100%)";
        }
        else
        {
            nightMod = false;
            label[2] = menuText[0][8] = "Switch to night mode";
            B.filter = "none";
            document.getElementById("toolbar1").style.filter="none";
			document.getElementById("toolbar2").style.filter="none";
        }


        currentGame.Ax = new Array;
        break;
    case 10:
        fullscreen();
        break;
    case 12:
        raceMod = !raceMod;
        if(raceMod)
        {
            V = "";
            rightToolbar.style.display = "none";
            label[2] = menuText[0][11] = "Switch to edit mode";
            AE.preventDefault();
            focus = currentVehicle.h;
        }
        else
        {
            V = "line";
            rightToolbar.style.display = "block";
            label[2] = menuText[0][11] = "Switch to race mode";

        }
        break;
    case 13:
        if(!noDieMod)
		{
			noDieMod = true;
			label[2] = menuText[0][12] = "Disable no-die mode";
		}
		else
		{
			noDieMod = false;
			label[2] = menuText[0][12] = "Enable no-die mode";
		}
		currentGame.resetPosition();
        break;
    case 14:
    	if(!noDieModForGhost)
		{
			noDieModForGhost = true;
			label[2] = menuText[0][13] = "Disable no-die mode for ghost";
		}
		else
		{
			noDieModForGhost = false;
			label[2] = menuText[0][13] = "Enable no-die mode for ghost";
		}
		currentGame.resetPosition();
        break;
        
    default:
        ;
    }
};
rightToolbar.onmousedown = function (AE)
{
    if(currentGame.ID != undefined) return false;
    focus = false;
    switch(Math.floor((AE.clientY - leftToolbar.offsetTop + window.pageYOffset) / 25) + 1)
    {
    case 1:
        V = "brush";
        break;
    case 2:
        V = "scenery brush";
        break;
    case 3:
        V = "line";
        break;
    case 4:
        V = "scenery line";
        break;
    case 5:

        break;
    case 6:

        break;
    case 7:
        V = "eraser";
        eraserType = 0;
        break;
    case 8:
        V = "camera";
        break;
    case 9:
        if(gridScale == 1)
        {
            gridScale = gridSizeWhenActivated;
            label[2] = menuText[1][8] = "Disable grid snapping ( G - Hold & scroll to adjust size )";
        }
        else
        {
            gridScale = 1;
            label[2] = menuText[1][8] = "Enable grid snapping ( G - Hold & scroll to adjust size )";
        }
        break;
    case 11:
        V = "goal";
        break;
    case 12:
        V = "boost";
        break;
    case 13:
        V = "checkpoint";
        break;
    case 14:
        V = "gravity";
        break;
    case 15:
        V = "anti-gravity";
        break;
    case 16:
    	V = "bomb";
    	break;
    case 17:
    	V = "teleporter";
    	break;
    case 18:
    	V = "clock";
    	break;
    case 20:
        currentGame.undo();
        break;
    case 21:
        currentGame.retro();
        break;
    default:
        ;
    }
};
p.onmouseover = function ()
{
    label = false;
    if(V == "camera")
    {
        document.body.style.cursor = "move";
    }
    else
    {
        document.body.style.cursor = "none";
    }
};
p.onmousedown = function (AE)
{
	if(AE.button === left)
	{
	    lineLinkedWithPrevious = true;
	    focus = false;
	    if(!shift)
	    {
	        AF.takeValueOf(w);
	    }
	    switch(V)
	    {
	    case "boost":
	    case "gravity":
	        document.body.style.cursor = "crosshair";
	        break;
	    case "eraser":
	        currentGame.erase(w);
	        break;
	    case "goal":
	        var Ag = new target(AF.x, AF.y);
	        currentGame.totalNumberOfTarget++;
	        currentGame.AD.push(Ag);
	        break;
	    case "checkpoint":
	        var Ag = new checkpoint(AF.x, AF.y);
	        currentGame.AD.push(Ag);
	        break;
	    case "bomb":
	        var Ag = new bomb(AF.x, AF.y);
	        break;
	    case "clock":
	    	var Ag = new clock(AF.x, AF.y);
	    	break;
	    case "anti-gravity":
	    	var Ag = new antigravity(AF.x, AF.y);
	    	break;
	    case "brush":
	    case "scenery brush":
	        if(shift)
	        {
	            if(V == "brush")
	            {
	                var P = new line(AF.x, AF.y, w.x, w.y);
	            }
	            else
	            {
	                var P = new scenery(AF.x, AF.y, w.x, w.y);
	            }
	            if(P.length >= 2 && P.length < 100000)
	            {
	                var I = CG(new vector(P.AH.x, P.AH.y), new vector(P.AK.x, P.AK.y), currentGame.q);
	                for(var T = 0; T < I.length; T++)
	                {
	                    var x = Math.floor(I[T].x / currentGame.q);
	                    var y = Math.floor(I[T].y / currentGame.q);
	                    if(currentGame.I[x] == undefined)
	                    {
	                        currentGame.I[x] = new Array;
	                    }
	                    if(currentGame.I[x][y] == undefined)
	                    {
	                        currentGame.I[x][y] = new BP;
	                    }
	                    if(V == "brush")
	                    {
	                        currentGame.I[x][y].AG.push(P);
	                    }
	                    else
	                    {
	                        currentGame.I[x][y].AL.push(P);
	                    }	                    
	                    delete currentGame.Ax[x + "_" + y];
	                }
	                var q = currentGame.q;
	                var v = V;
	                currentGame.appendHistoric(function()
			        {
			            P.removeIT()
			        }, function()
			        {
			        	P.remove = false;
		                for(var T = 0; T < I.length; T++)
		                {
		                    var x = Math.floor(I[T].x / q);
		                    var y = Math.floor(I[T].y / q);
		                    if(v == "brush")
		                    {
		                        currentGame.I[x][y].AG.push(P);
		                    }
		                    else
		                    {
		                        currentGame.I[x][y].AL.push(P);
		                    }	                    
		                    delete currentGame.Ax[x + "_" + y];
		                }
			        })
	                if(V == "brush")
	                {
	                    Bf.takeValueOf(w);
	                }
	                else
	                {
	                    Bg.takeValueOf(w);
	                }
	                AF.takeValueOf(w);
	            }
	        }
	        shift = false;
	        lineLinkedWithPrevious = true;
	        break;
	    default:
	        ;
	    }
	    if(Ag != undefined)
	    {
	        var x = Math.floor(Ag.G.x / currentGame.q);
	        var y = Math.floor(Ag.G.y / currentGame.q);
	        if(currentGame.I[x] == undefined)
	        {
	            currentGame.I[x] = new Array;
	        }
	        if(currentGame.I[x][y] == undefined)
	        {
	            currentGame.I[x][y] = new BP(x, y);
	        }
	        currentGame.I[x][y].AD.push(Ag);
	        currentGame.appendHistoric(function()
			{
			    Ag.removeIT()
			}, function()
			{
				Ag instanceof target && ++currentGame.totalNumberOfTarget;
			    currentGame.I[x][y].AD.push(Ag)
			})
	    }
	}
	else
	{
        previousTool = V;
        V = "camera";
        document.body.style.cursor = "move";
        C0 = true;
        lineLinkedWithPrevious = true;
	    focus = false;
	    if(!shift)
	    {
	        AF.takeValueOf(w);
	    }
        shift = false;
	}
};
document.onmousemove = function (AE)
{
    if(V != "camera")
    {
        focus = false;
    }
    w = (new vector(AE.clientX - p.offsetLeft, AE.clientY - p.offsetTop + window.pageYOffset)).Cr();
    if(V != "eraser")
    {
        w.x = Math.round(w.x / gridScale) * gridScale;
        w.y = Math.round(w.y / gridScale) * gridScale;
    }
    if(lineLinkedWithPrevious)
    {
        if(V == "camera")
        {
            currentGame.A5.Ai(AF.sub(w));
            w.takeValueOf(AF);
        }
        else if(V == "eraser")
        {
            currentGame.erase(w);
        }
        else if((V == "brush" || V == "scenery brush") && AF.sub(w).length() >= CF && !shift)
        {
            if(V == "brush")
            {
                var P = new line(AF.x, AF.y, w.x, w.y);
            }
            else
            {
                var P = new scenery(AF.x, AF.y, w.x, w.y);
            }
            var I = CG(new vector(P.AH.x, P.AH.y), new vector(P.AK.x, P.AK.y), currentGame.q);
            for(var T = 0; T < I.length; T++)
            {
                var x = Math.floor(I[T].x / currentGame.q);
                var y = Math.floor(I[T].y / currentGame.q);
                if(currentGame.I[x] == undefined)
                {
                    currentGame.I[x] = new Array;
                }
                if(currentGame.I[x][y] == undefined)
                {
                    currentGame.I[x][y] = new BP;
                }
                if(V == "brush")
                {
                    currentGame.I[x][y].AG.push(P);
                }
                else
                {
                    currentGame.I[x][y].AL.push(P);
                }
                delete currentGame.Ax[x + "_" + y];
            }
            var q = currentGame.q;
	        var v = V;	        
            currentGame.appendHistoric(function()
			{
			    P.removeIT()
			}, function()
			{
				P.remove = false;
		        for(var T = 0; T < I.length; T++)
		        {
		            var x = Math.floor(I[T].x / q);
		            var y = Math.floor(I[T].y / q);
		            if(v == "brush")
		            {
		                currentGame.I[x][y].AG.push(P);
		            }
		            else
		            {
		                currentGame.I[x][y].AL.push(P);
		            }	                    
		            delete currentGame.Ax[x + "_" + y];
		        }
			})
            if(V == "brush")
            {
                Bf.takeValueOf(w);
            }
            else
            {
                Bg.takeValueOf(w);
            }
            AF.takeValueOf(w);
        }
    }
};
p.onmouseup = function (AE)
{
	if(AE.button === left)
	{
	    if(lineLinkedWithPrevious)
	    {
	        if(V == "line" || V == "scenery line" || V == "brush" || V == "scenery brush" || V == "teleporter")
	        {
	            if(V == "line" || V == "brush")
	            {
	                var P = new line(AF.x, AF.y, w.x, w.y);
	            }
	            else if(V == "teleporter")
	            {
	            	var P = new teleporter(AF.x, AF.y, w.x, w.y);
	            }
	            else
	            {
	                var P = new scenery(AF.x, AF.y, w.x, w.y);
	            }
	            
	            if(P.length >= 2 && P.length < 100000 && V != "teleporter")
	            {
	                var I = CG(new vector(P.AH.x, P.AH.y), new vector(P.AK.x, P.AK.y), currentGame.q);
	                for(var T = 0; T < I.length; T++)
	                {
	                    var x = Math.floor(I[T].x / currentGame.q);
	                    var y = Math.floor(I[T].y / currentGame.q);
	                    if(currentGame.I[x] == undefined)
	                    {
	                        currentGame.I[x] = new Array;
	                    }
	                    if(currentGame.I[x][y] == undefined)
	                    {
	                        currentGame.I[x][y] = new BP;
	                    }
	                    if(V == "line" || V == "brush")
	                    {
	                        currentGame.I[x][y].AG.push(P);
	                    }
	                    else
	                    {
	                        currentGame.I[x][y].AL.push(P);
	                    }
	                    delete currentGame.Ax[x + "_" + y];
	                }
	                var q = currentGame.q;
	                var v = V;
	                currentGame.appendHistoric(function()
			        {
			            P.removeIT()
			        }, function()
			        {
			        	P.remove = false;
		                for(var T = 0; T < I.length; T++)
		                {
		                    var x = Math.floor(I[T].x / currentGame.q);
		                    var y = Math.floor(I[T].y / currentGame.q);
	                    	if(v == "line" || v == "brush")
	                    	{
	                    	    currentGame.I[x][y].AG.push(P);
	                    	}
	                    	else
	                    	{
	                    	    currentGame.I[x][y].AL.push(P);
	                    	}
	                    	delete currentGame.Ax[x + "_" + y];
		                }
			        })
	                if(V == "line" || V == "brush")
	                {
	                    Bf.takeValueOf(w);
	                }
	                else
	                {
	                    Bg.takeValueOf(w);
	                }
	                AF.takeValueOf(w);
	            }
	            else if(P.length >= 2 && P.length < 100000)
	            {
	            	var x = Math.floor(P.G1.x / currentGame.q);
	            	var y = Math.floor(P.G1.y / currentGame.q);

	            	if(currentGame.I[x] == undefined)
		            {
		                currentGame.I[x] = new Array;
		            }
		            if(currentGame.I[x][y] == undefined)
		            {
		                currentGame.I[x][y] = new BP(x, y);
		            }
		            currentGame.I[x][y].AD.push(P);

		            var x = Math.floor(P.G2.x / currentGame.q);
	            	var y = Math.floor(P.G2.y / currentGame.q);

	            	if(currentGame.I[x] == undefined)
		            {
		                currentGame.I[x] = new Array;
		            }
		            if(currentGame.I[x][y] == undefined)
		            {
		                currentGame.I[x][y] = new BP(x, y);
		            }
		            currentGame.I[x][y].AD.push(P);
		            currentGame.AD.push(P);

		            currentGame.appendHistoric(function()
					{
					    P.removeIT()
					}, function()
					{
						var x = Math.floor(P.G1.x / currentGame.q);
		            	var y = Math.floor(P.G1.y / currentGame.q);

		            	if(currentGame.I[x] == undefined)
			            {
			                currentGame.I[x] = new Array;
			            }
			            if(currentGame.I[x][y] == undefined)
			            {
			                currentGame.I[x][y] = new BP(x, y);
			            }
			            currentGame.I[x][y].AD.push(P);

			            var x = Math.floor(P.G2.x / currentGame.q);
		            	var y = Math.floor(P.G2.y / currentGame.q);

		            	if(currentGame.I[x] == undefined)
			            {
			                currentGame.I[x] = new Array;
			            }
			            if(currentGame.I[x][y] == undefined)
			            {
			                currentGame.I[x][y] = new BP(x, y);
			            }
			            currentGame.I[x][y].AD.push(P);
			            currentGame.AD.push(P);
					})
	            }
	        }
	        else if(V == "boost" || V == "gravity")
	        {
	            document.body.style.cursor = "none";
	            var Ag = V == "boost" ? new boost(AF.x, AF.y, Math.round(Math.atan2(-(w.x - AF.x), w.y - AF.y) * 180 / Math.PI)) : new gravity(AF.x, AF.y, Math.round(Math.atan2(-(w.x - AF.x), w.y - AF.y) * 180 / Math.PI));
	            var x = Math.floor(Ag.G.x / currentGame.q);
	            var y = Math.floor(Ag.G.y / currentGame.q);
	            if(currentGame.I[x] == undefined)
	            {
	                currentGame.I[x] = new Array;
	            }
	            if(currentGame.I[x][y] == undefined)
	            {
	                currentGame.I[x][y] = new BP(x, y);
	            }
	            currentGame.I[x][y].AD.push(Ag);
	            currentGame.appendHistoric(function()
				{
				    Ag.removeIT()
				}, function()
				{
				    currentGame.I[x][y].AD.push(Ag)
				})
	        }
	    }
	}
	else
	{
		if(C0)
        {
            V = previousTool;
            if(previousTool != "camera")
            {
            	document.body.style.cursor = "none";
            }
            C0 = false;
        }
	}
};
document.onmouseup = function ()
{
    if(!shift)
    {
        lineLinkedWithPrevious = false;
    }
};
p.onmouseout = function ()
{
    document.body.style.cursor = "default";
};
document.getElementById("new").onclick = function ()
{
    if(confirm("Do you really want to start a new track?"))
    {
        currentGame = new Game;
        //document.getElementById("charcount").innerHTML = "Trackcode";
        document.getElementById("trackcode").value = null;
        currentGame.resetPosition();
    }
};
document.getElementById("load").onclick = function ()
{
    if(document.getElementById("trackcode").value.length > 10)
    {
        currentGame = new Game(document.getElementById("trackcode").value);
        //document.getElementById("charcount").innerHTML = "Trackcode";
        document.getElementById("trackcode").value = null;
        currentGame.resetPosition();
    }
    else
    {
        alert("No trackcode to load!");
    }
};
document.getElementById("loadg").onclick = function ()
{
    watchGhost(document.getElementById("ghostcode").value); //NINJA
};
document.getElementById("save").onclick = function ()
{
    if(currentGame.ID == undefined)
    {
        document.getElementById("trackcode").value = currentGame.saveCode();
        document.getElementById("trackcode").select();
        //document.getElementById("charcount").innerHTML = "Trackcode - " + Math.round(document.getElementById("trackcode").value.length / 1000) + "k - CTRL + C to copy";
    }
};

function mouseScroll(AE)
{
    AE.preventDefault();
    if(shift)
    {
        if(V == "eraser")
        {
            if((AE.detail > 0 || AE.wheelDelta < 0) && BH > 5)
            {
                BH -= 5;
            }
            else if((AE.detail < 0 || AE.wheelDelta > 0) && BH < 40)
            {
                BH += 5;
            }
        }
        else if(V == "brush" || V == "scenery brush")
        {
            if((AE.detail > 0 || AE.wheelDelta < 0) && CF > 4)
            {
                CF -= 8;
            }
            else if((AE.detail < 0 || AE.wheelDelta > 0) && CF < 200)
            {
                CF += 8;
            }
        }
        else if(V == "Grid")
        {
        	if((AE.detail > 0 || AE.wheelDelta < 0) && gridSizeWhenActivated > 3)
        	{
        		gridSizeWhenActivated -= 1;
        	}
        	else if((AE.detail < 0 || AE.wheelDelta > 0) && gridSizeWhenActivated < 20)
        	{
        		gridSizeWhenActivated += 1;
        	}
        }
    }
    else
    {
        if((AE.detail > 0 || AE.wheelDelta < 0) && currentGame.zoom > 0.2)
        {
            currentGame.zoom = Math.round(currentGame.zoom * 10 - 2) / 10;
        }
        else if((AE.detail < 0 || AE.wheelDelta > 0) && currentGame.zoom < 4)
        {
            currentGame.zoom = Math.round(currentGame.zoom * 10 + 2) / 10;
        }
        currentGame.Ax = new Array;
    }
    var Cw = (new vector(AE.clientX - p.offsetLeft, AE.clientY - p.offsetTop + window.pageYOffset)).Cr();
    if(!focus)
    {
        currentGame.A5.Ai(w.sub(Cw));
    }
}
p.addEventListener("DOMMouseScroll", mouseScroll, false);
p.addEventListener("mousewheel", mouseScroll, false);
p.addEventListener('contextmenu', event => event.preventDefault());

p.onselectstart = function (evt)
{
    evt.preventDefault();
}