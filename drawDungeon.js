var giWidth = 30;
var giHeight = 30;
var giMinWidth = 5;
var giMaxWidth = 120;
var giMinHeight = 5;
var giMaxHeight = 90;
var giMinDisplayWidth = 64;
var giMaxDisplayWidth = 3000;
var giMinDisplayHeight = 64;
var giMaxDisplayHeight = 2000;
var gnCells = new Array( );
var gnStamps = new Array( );
var gnNotes = new Array( );
var gnLetters = new Array( );
var gi = 0;
var gButton = new Array( );
var sXY = new Array( );
var giX = 0;
var giY = 0;
var gDX = 0;
var gDY = 0;
var giD = 0;  // 1 north, 2 west, 3 south, 4 east
var gsD = "";
var grX = 0.0;
var grY = 0.0;
var gX = 0.0;
var gY = 0.0;
var giSize = 0;
var gDownX = 0;
var gDownY = 0;
var gDownD = 0;
var oPatternFill = 0;

function Cell( piX, piY ) {
	this.x = (( piX === undefined )?0:piX);
	this.y = (( piX === undefined )?0:piY);
	this.LeftWall = "NoWall";  // NoWall, Wall, Door, Secret
	this.TopWall = "NoWall";  // NoWall, Wall, Door, Secret
	this.Fill = "Empty";  // Empty, Fill, Water
	this.toString = function( ) {
		var s = "";
		s += this.x.toString( ) + "\t" + this.y.toString( ) + "\t" + this.LeftWall + "\t" + this.TopWall + "\t" + this.Fill;
		return s;
	};
};
function Stamp( piX, piY ) {
	this.x = (( piX === undefined )?0:piX);
	this.y = (( piX === undefined )?0:piY);
	this.D = 0;
	this.DS = "";
	this.Stamp = "";
	this.toString = function( ) {
		var s = "";
		s += this.x.toString( ) + "\t" + this.y.toString( ) + "\t" + this.D.toString( ) + "\t" + this.DS + "\t" + this.Stamp;
		return s;
	};
};
function Note( piX, piY ) {
	this.x = (( piX === undefined )?0:piX);
	this.y = (( piX === undefined )?0:piY);
	this.D = 0;
	this.DS = "";
	this.Note = "";
	this.toString = function( ) {
		var s = "";
		s += this.x.toString( ) + "\t" + this.y.toString( ) + "\t" + this.D.toString( ) + "\t" + this.DS + "\t" + this.Note;
		return s;
	};
};
function Letter( piX, piY ) {
	this.x = (( piX === undefined )?0:piX);
	this.y = (( piX === undefined )?0:piY);
	this.D = 0;
	this.DS = "";
	this.Letter = "";
	this.toString = function( ) {
		var s = "";
		s += this.x.toString( ) + "\t" + this.y.toString( ) + "\t" + this.D.toString( ) + "\t" + this.DS + "\t" + this.Letter;
		return s;
	};
};
function SaveValues( ) {
	var s = "";
	var x = 0;
	var y = 0;
	s += "::Cells\t" + giWidth.toString( ) + "\t" + giHeight.toString( ) + "\r\n";
  for ( x = 0; x < gnCells.length; x++ ) {
		for ( y = 0; y < gnCells[x].length; y++ ) {
			s += gnCells[x][y].toString( ) + "\r\n";
		};
	};
	s += "::Stamps\t" + gnStamps.length.toString( ) + "\r\n";
	for ( x = 0; x < gnStamps; x++ ) {
		s += gnStamps[x].toString( ) + "\r\n";
	};
	s += "::Notes\t" + gnNotes.length.toString( ) + "\r\n";
	for ( x = 0; x < gnNotes; x++ ) {
		s += gnNotes[x].toString( ) + "\r\n";
	};
	s += "::Letters\t" + gnLetters.length.toString( ) + "\r\n";
	for ( x = 0; x < gnLetters; x++ ) {
		s += gnLetters[x].toString( ) + "\r\n";
	};
	document.getElementById( "txtOutput" ).value = s;
};
function GetTypeValue( ) {
	var o = document.getElementById( "selType" );
	var s = o.options.item( o.selectedIndex ).value;
	return s;
};
function GetToolValue( ) {
	var o = document.getElementById( "selTool" );
	var s = o.options.item( o.selectedIndex ).value;
	return s;
};
function ResetWalls( piX, piY ) {
	var bChanged = false;
	
	if ( ( piX >= 0 ) && ( piX < giWidth ) && ( piY >= 0 ) && ( piY < giHeight ) ) {
		if ( gnCells[piX][piY].LeftWall != "NoWall" ) {
			gnCells[piX][piY].LeftWall = "NoWall";
			if ( !bChanged ) bChanged = true;
		};
		if ( gnCells[piX][piY].TopWall != "NoWall" ) {
			gnCells[piX][piY].TopWall = "NoWall";
			if ( !bChanged ) bChanged = true;
		};
		if ( piX < giWidth - 1 ) {
			if ( gnCells[piX + 1][piY].LeftWall != "NoWall" ) {
				gnCells[piX + 1][piY].LeftWall = "NoWall";
				if ( !bChanged ) bChanged = true;
			};
		};
		if ( piY < giHeight - 1 ) {
			if ( gnCells[piX][piY + 1].TopWall != "NoWall" ) {
				gnCells[piX][piY + 1].TopWall = "NoWall";
				if ( !bChanged ) bChanged = true;
			};
		};
	};
	return bChanged;
};
function SetWallValue( psTool, piX, piY, piD ) {
	var bChanged = false;
	
	if ( ( piX >= 0 ) && ( piX < giWidth ) && ( piY >= 0 ) && ( piY < giHeight ) ) {
		switch ( piD ) {
			case 0:
				if ( gnCells[piX][piY].TopWall != psTool ) {
					gnCells[piX][piY].TopWall = psTool;
					if ( !bChanged ) bChanged = true;
				};
				break;
			case 1:
				if ( gnCells[piX][piY].LeftWall != psTool ) {
					gnCells[piX][piY].LeftWall = psTool;
					if ( !bChanged ) bChanged = true;
				};
				break;
			case 2:
				if ( piY < giHeight - 1 ) {
					if ( gnCells[piX][piY + 1].TopWall != psTool ) {
						gnCells[piX][piY + 1].TopWall = psTool;
						if ( !bChanged ) bChanged = true;
					};
				};
				break;
			case 3:
				if ( piX < giWidth - 1 ) {
					if ( gnCells[piX + 1][piY].LeftWall != psTool ) {
						gnCells[piX + 1][piY].LeftWall = psTool;
						if ( !bChanged ) bChanged = true;
					};
				};
				break;
		};
	};
	return bChanged;
};
function SetCellValue( psTool, piX, piY, piD ) {
	var bChanged = false;
	
	if ( ( piX >= 0 ) && ( piX < giWidth ) && ( piY >= 0 ) && ( piY < giHeight ) ) {
		if ( gnCells[piX][piY].Fill != psTool ) {
			gnCells[piX][piY].Fill = psTool;
			if ( !bChanged ) bChanged = true;
		};
		ResetWalls( piX, piY );
	};
};

function UpdateCellValue( psTool, piX, piY, piD ) {
	var bChanged = false;
	if ( ( piX >= 0 ) && ( piX < giWidth ) && ( piY >= 0 ) && ( piY < giHeight ) ) {
		switch ( psTool ) {
			case "Fill":
			case "Empty":
			case "Water":
				SetCellValue( psTool, piX, piY, piD );
				break;
			case "NoWall":
			case "Wall":
			case "Door":
			case "Secret":
				SetWallValue( psTool, piX, piY, piD );
				break;
		};
	};
	return bChanged;
};
function UpdateBlockValue( psTool, piX, piY, piD, piDownX, piDownY, piDownD ) {
	var x = 0;
	var y = 0;
	var x0 = ((piDownX > piX)?piX:piDownX);
	var y0 = ((piDownY > piY)?piY:piDownY);
	var x1 = ((piDownX <= piX)?piX:piDownX);
	var y1 = ((piDownY <= piY)?piY:piDownY);
	switch ( psTool ) {
		case "Fill":
		case "Empty":
		case "Water":
			for ( y = y0; y <= y1; y++ ) {
				for ( x = x0; x <= x1; x++ ) {
					UpdateCellValue( psTool, x, y, piDownD );
					ClearStamp( x, y );
					ClearNote( x, y );
					ClearLetter( x, y );
				};
			};
			break;
		case "NoWall":
		case "Wall":
		case "Door":
		case "Secret":
			switch ( piDownD ) {
				case 0:
				case 2:
					for ( x = x0; x <= x1; x++ ) {
						UpdateCellValue( psTool, x, piDownY, piDownD );
					};
					break;
				case 1:
				case 3:
					for ( y = y0; y <= y1; y++ ) {
						UpdateCellValue( psTool, piDownX, y, piDownD );
					};
					break;
			};
			SetWallValue( psTool, piX, piY, piD );
			break;
	};
};
function ClearStamp( piX, piY ) {
	var i = 0;
	for ( i = 0; i < gnStamps.length; i++ ) {
		if ( ( gnStamps[i].x == piX ) && ( gnStamps[i].y == piY ) ) gnStamps.splice(i, 1);
	};
};
function AddStamp( piX, piY, piD, sStamp ) {
	ClearStamp( piX, piY );
	ClearNote( piX, piY );
	ClearLetter( piX, piY );
	var o = new Stamp( );
	o.x = piX;
	o.y = piY;
	o.D = piD;
	o.Stamp = sStamp;
	gnStamps[gnStamps.length] = o;
};
function ClearNote( piX, piY ) {
	var i = 0;
	for ( i = 0; i < gnNotes.length; i++ ) {
		if ( ( gnNotes[i].x == piX ) && ( gnNotes[i].y == piY ) ) gnNotes.splice(i, 1);
	};
};
function AddNote( piX, piY, piD, sNote ) {
	ClearStamp( piX, piY );
	ClearNote( piX, piY );
	ClearLetter( piX, piY );
	var o = new Note( );
	o.x = piX;
	o.y = piY;
	o.D = piD;
	o.Note = sNote;
	gnNotes[gnNotes.length] = o;
};
function ClearLetter( piX, piY ) {
	var i = 0;
	for ( i = 0; i < gnLetters.length; i++ ) {
		if ( ( gnLetters[i].x == piX ) && ( gnLetters[i].y == piY ) ) gnLetters.splice(i, 1);
	};
};
function AddLetter( piX, piY, piD, sLetter ) {
	ClearStamp( piX, piY );
	ClearNote( piX, piY );
	ClearLetter( piX, piY );
	var o = new Letter( );
	o.x = piX;
	o.y = piY;
	o.D = piD;
	o.Letter = sLetter;
	gnLetters[gnLetters.length] = o;
};
function ResetCells( iWidth, iHeight ) {
	giWidth = iWidth;
	giHeight = iHeight;
	var x = 0;
	var y = 0;
	gnCells = new Array( );
	for (x = 0; x < giWidth; x++ ) {
		gnCells[x] = new Array();
		for ( y = 0; y < giHeight; y++ ) {
			gnCells[x][y] = new Cell( x, y );
		};
	};
	gnStamps = new Array( );
	gnNotes = new Array( );
	gnLetters = new Array( );
};
function UpdateMousePosition( event ) {
	var oRect = document.getElementById( "img").getBoundingClientRect( );
	var x = event.clientX - oRect.left;
	var y = event.clientY - oRect.top;
	var s = "";
	var rX = ( x % gDX ) / gDX;
	var rY = ( y % gDY ) / gDY;
	var sWall = "";
	
	gX = x;
	gY = y;
	giX = Math.floor( x / gDX );
	giY = Math.floor( y / gDY );
	if (rX + rY > 1.0 ) {
		if ( rY > rX ) {
			giD = 2;
			gsD = "south";
		} else {
			giD = 3;
			gsD = "east";
		};
	} else {
		if ( rY > rX ) {
			giD = 1;
			gsD = "west";
		} else {
			giD = 0;
			gsD = "north";
		};
	};
	s += "(" + gX.toString() + ", " + gY.toString( ) + "),";
	s += "(" + giX.toString() + ", " + giY.toString() + ")-" + gsD;
	if ( ( giX >= 0 ) && ( giX < giWidth ) && ( giY >= 0 ) && ( giY < giHeight ) ) {
		s += gnCells[giX][giY].Fill + " - ";
		switch ( giD ) {
			case 0:
				s += gnCells[giX][giY].TopWall;
				break;
			case 1:
				s += gnCells[giX][giY].LeftWall;
				break;
			case 2:
				if ( giY < giHeight - 1 ) {
					s += gnCells[giX][giY + 1].TopWall;
				};
				break;
			case 3:
				if ( giX < giWidth - 1 ) {
					s += gnCells[giX + 1][giY].LeftWall;
				};
				break;
		};
	};
	document.getElementById( "txtStatus" ).value = s;
	return s;
};
function FillPatterns( ) {
	var oC = document.getElementById( "cnvFill2");
	var oD = oC.getContext( "2d" );
	oD.fillStyle="#ffffff";
	oD.clearRect( -0.5, -0.5, 9, 9 );
	oD.fillRect( -0.5, -0.5, 9, 9 );
	oD.strokeStyle = "#808080";
	oD.lineWidth = 1;
	oD.moveTo( 0.5, 0.5 );
	oD.lineTo( 8.5, 0.5 );
	oD.stroke( );
	oD.moveTo( 0.5, 4.5 );
	oD.lineTo( 8.5, 4.5 );
	oD.stroke( );
	oD.moveTo( 0.5, 0.5);
	oD.lineTo( 0.5, 4.5 );
	oD.stroke( );
	oD.moveTo( 4.5, 4.5 );
	oD.lineTo( 4.5, 8.5 );
	oD.stroke( );
	var oURL = document.getElementById( "cnvFill2" ).toDataURL();
	document.getElementById( "imgFill2" ).src = oURL;
	
	oC = document.getElementById( "cnvWater2");
	oD = oC.getContext( "2d" );
	oD.fillStyle="#ffffff";
	oD.clearRect( -0.5, -0.5, 9, 9 );
	oD.fillRect( -0.5, -0.5, 9, 9 );
	oD.strokeStyle = "#808080";
	oD.lineWidth = 1;
	oD.moveTo( 0.5, 0.5 );
	oD.lineTo( 8.5, 8.5 );
	oD.stroke( );
	oD.moveTo( 8.5, 0.5 );
	oD.lineTo( 0.5, 8.5 );
	oD.stroke( );
	oURL = document.getElementById( "cnvWater2" ).toDataURL();
	document.getElementById( "imgWater2" ).src = oURL;
	
};
function RedrawCanvas( ) {
	var o = document.getElementById( "cnv" );
	var oI = document.getElementById( "img" );
	
	var i = 0;
	var j = 0;

	//	Resize
	var w = 0;
	var h = 0;
	if ( document.getElementById( "chkFullScreen" ).checked ) {
		w = Math.ceil( window.innerWidth );
		h = Math.ceil( window.innerHeight * 0.8 );
	} else {
		w = (isNaN(Number( document.getElementById( "txtDisplayWidth" ).value ) )?400:Number( document.getElementById( "txtDisplayWidth" ).value ) );
		h = (isNaN(Number( document.getElementById( "txtDisplayHeight" ).value ) )?300:Number( document.getElementById( "txtDisplayHeight").value ) );
	};
	o.width = w;
	oI.width = w;
	o.height = h;
	oI.height = h;
	
	// Draw grid lines
	var x = 0;
	var y = 0;
	gDX = Math.floor( ( w - 1) / giWidth );
	gDY = Math.floor( ( h - 1) / giHeight );
	if (gDY < gDX) gDX = gDY;
	if (gDX < gDY) gDY = gDX;
	W2 = Math.floor( gDX / 2.0 );
	W4 = Math.floor( gDX / 4.0 );
	W8 = Math.floor( gDX / 8.0 );
	W16 = Math.floor( gDX / 16.0 );
	W32 = Math.floor( gDX / 32.0 );
	W3x4 = W4 * 3.0;
	
	var d = o.getContext("2d");
	// Translate to avoid antialias
	d.translate(0.5, 0.5);
	d.clearRect( -1, -1, w + 2, h + 2 );
	
	//fill gridlines
	d.lineWidth = "1";
	d.strokeStyle = "#808080";
	for ( x = 0; x <= giWidth; x++ ) {
		d.beginPath( );
		d.lineWidth = "1";
		d.strokeStyle = "#808080";
		d.moveTo( x * gDX, 0);
		d.lineTo( x * gDX, giHeight * gDY );
		d.stroke( );
		d.closePath( );
	};
	for ( y = 0; y <= giHeight; y++ ) {
		d.beginPath( );
		d.lineWidth = "1";
		d.strokeStyle = "#808080";
		d.moveTo( 0, y * gDY);
		d.lineTo( giWidth * gDX, y * gDY );
		d.stroke( );
	};

	// Fill Blocks
	var oFillImg = new Image( );
	oFillImg.src = document.getElementById( "cnvFill2" ).toDataURL();
	var oFill = d.createPattern( oFillImg, "repeat" );
	var oWaterImg = new Image( );
	oWaterImg.src = document.getElementById( "cnvWater2" ).toDataURL();
	var oWater = d.createPattern( oWaterImg, "repeat" );
	for ( x = 0; x < giWidth; x++ ) {
		for ( y = 0; y < giHeight; y++ ) {
			switch ( gnCells[x][y].Fill ) {
				case "Fill":
					d.fillStyle = oFill;
					d.fillRect( x * gDX, y * gDY, gDX, gDY );
					break;
				case "Water":
					d.fillStyle = oWater;
					d.fillRect( x * gDX, y * gDY, gDX, gDY );
					break;
			};
		};
	};
	
	// Draw walls
	d.lineWidth = "3";
	d.strokeStyle = "#000000";
	for ( x = 0; x < giWidth; x++ ) {
		for ( y = 0; y < giHeight; y++ ) {
			var b = false;
			if ( ( x > 0 ) && (  gnCells[x][y].LeftWall == "NoWall" ) ) {
				if  ( ( ( gnCells[x - 1][y].Fill == "Fill" ) && ( gnCells[x][y].Fill == "Empty" ) ) || ( ( gnCells[x][y].Fill == "Fill" ) && ( gnCells[x - 1][y].Fill == "Empty" ) ) ) b = true;
			};
			if ( b || (  gnCells[x][y].LeftWall != "NoWall" ) ) {
				d.beginPath( );
				d.moveTo( x * gDX, y * gDY );
				d.lineTo( x * gDX, ( y + 1 ) * gDY );
				d.stroke( );
			};
			switch ( gnCells[x][y].LeftWall ) {
				case "Door":
					d.strokeRect(x * gDX - W8, y * gDY + W8, W4, W3x4 )
					break;
				case "Secret":
					d.beginPath( );
					d.moveTo( x * gDX - W4, y * gDY + W8 );
					d.lineTo( x * gDX + W4, y * gDY + W4 );
					d.lineTo( x * gDX - W4, ( y + 1 ) * gDY - W4 );
					d.lineTo( x * gDX + W4, ( y + 1 ) * gDY - W8 );
					d.stroke( );
					break;
			};
			b = false;
			if ( ( y > 0 ) && (  gnCells[x][y].TopWall == "NoWall" ) ) {
				if  ( ( ( gnCells[x][y - 1].Fill == "Fill" ) && ( gnCells[x][y].Fill == "Empty" ) ) || ( ( gnCells[x][y].Fill == "Fill" ) && ( gnCells[x][y - 1].Fill == "Empty" ) ) ) b = true;
			};
			if ( b || (  gnCells[x][y].TopWall != "NoWall" ) ) {
				d.beginPath( );
				d.moveTo( x * gDX, y * gDY );
				d.lineTo( ( x + 1 ) * gDX, y * gDY );
				d.stroke( );
			};
			switch ( gnCells[x][y].TopWall ) {
				case "Door":
					d.strokeRect(x * gDX + W8, y * gDY - W8, W3x4, W4 );
					break;
				case "Secret":
					d.beginPath( );
					d.moveTo( x * gDX + W8, y * gDY - W4 );
					d.lineTo( x * gDX + W4, y * gDY + W4 );
					d.lineTo( ( x + 1 ) * gDX - W4, y * gDY - W4 );
					d.lineTo( ( x + 1 ) * gDX - W8, y * gDY + W4 );
					d.stroke( );
					break;
					
			};
		};
	};
	for ( i = 0; i < gnStamps.length; i++ ) {
		d.setTransform( 1, 0, 0, 1, 0, 0 );
		d.translate( Math.floor( ( gnStamps[i].x + 0.5 ) * gDX ) + 0.5, Math.floor( ( gnStamps[i].y + 0.5 ) * gDY ) + 0.5 );
		d.rotate( gnStamps[i].D * -Math.PI / 2.0 );
		switch ( gnStamps[i].Stamp ) {
			case "Column":
				d.fillStyle = oFill;
				d.beginPath( );
				d.arc(0, 0, gDX / 2.0, 0, 2.0 * Math.PI );
				d.fill( );
				d.lineWidth = "3";
				d.stroke( );
				break;
			case "Bed":
				d.fillStyle = "#c0c0c0";
				d.fillRect( -0.4 * gDX, -0.4 * gDX, 0.8 * gDX, 1.4 * gDX );
				d.lineWidth = 1;
				d.strokeRect( -0.4 * gDX, -0.4 * gDX, 0.8 * gDX, 1.4 * gDX );
				d.fillStyle = "#ffffff";
				d.fillRect( -0.3 * gDX, -0.3 * gDX, 0.6 * gDX, 0.4 * gDX );
				d.lineWidth = 1;
				d.strokeRect( -0.3 * gDX, -0.3 * gDX, 0.6 * gDX, 0.4 * gDX );
				break;
			case "Chest":
				d.fillStyle = "#c0c0c0";
				d.fillRect( -0.4 * gDX, -0.4 * gDX, 0.8 * gDX, 0.4 * gDX );
				d.lineWidth = 1;
				d.strokeRect( -0.4 * gDX, -0.4 * gDX, 0.8 * gDX, 0.4 * gDX );
				d.beginPath( );
				d.moveTo( -0.4 * gDX, -0.4 * gDX );
				d.lineTo( -0.2 * gDX, -0.2 * gDX );
				d.lineTo( 0.2 * gDX, -0.2 * gDX );
				d.lineTo( 0.4 * gDX, -0.4 * gDX );
				d.stroke( );
				d.moveTo( -0.4 * gDX, 0.0 * gDX );
				d.lineTo( -0.2 * gDX, -0.2 * gDX );
				d.stroke( );
				d.moveTo( 0.4 * gDX, 0.0 * gDX );
				d.lineTo( 0.2 * gDX, -0.2 * gDX );
				d.stroke( );
				break;
			case "Altar":
				d.fillStyle = "#c0c0c0";
				d.fillRect( -0.6 * gDX, -0.4 * gDX, 1.2 * gDX, 0.6 * gDX );
				d.lineWidth = 1;
				d.strokeRect( -0.6 * gDX, -0.4 * gDX, 1.2 * gDX, 0.6 * gDX );
				d.fillStyle = "#ffffff";
				d.lineWidth = "1";
				d.beginPath( );
				d.arc( -0.4 * gDX, -0.2 * gDX, 0.1 * gDX, 0, 2.0 * Math.PI );
				d.fill( );
				d.lineWidth = "1";
				d.stroke( );
				d.beginPath( );
				d.arc( 0.4 * gDX, -0.2 * gDX, 0.1 * gDX, 0, 2.0 * Math.PI );
				d.fill( );
				d.lineWidth = "1";
				d.stroke( );
				break;
			case "Stairs":
				d.strokeStyle = "#000000";
				d.lineWidth = "1";
				d.beginPath( );
				for ( j = 0; j < 4; j++ ) {
					d.moveTo( -0.5 * gDX, (-0.3 + j * 0.2 ) * gDX);
					d.lineTo( 0.5 * gDX, (-0.3 + j * 0.2 ) * gDX);
				};
				d.stroke( );
				break;
			case "Pentacle":
				d.strokeStyle = "#000000";
				d.lineWidth = "1";
				d.beginPath( );
				d.arc(0, 0, gDX / 2.0, 0, Math.PI * 2.0 );
				for ( j = 0; j < 5; j++ ) {
					d.moveTo( Math.sin( j / 5.0 * Math.PI * 2) * gDX / 2.0, -Math.cos( j / 5.0 * Math.PI * 2) * gDX / 2.0 );
					d.lineTo( Math.sin( (j + 2) / 5.0 * Math.PI * 2) * gDX / 2.0, -Math.cos( (j + 2) / 5.0 * Math.PI * 2) * gDX / 2.0 );
				};
				d.stroke( );
				break;
			case "Septacle":
				var r = Math.floor( gDX / 2.0 );
				d.strokeStyle = "#000000";
				d.lineWidth = "1";
				d.beginPath( );
				d.arc(0, 0, r, 0, Math.PI * 2.0 );
				for ( j = 0; j < 7; j++ ) {
					d.moveTo( Math.sin( j / 7.0 * Math.PI * 2) * r, -Math.cos( j / 7.0 * Math.PI * 2) * r );
					d.lineTo( Math.sin( (j + 3) / 7.0 * Math.PI * 2) * r, -Math.cos( (j + 3) / 7.0 * Math.PI * 2) * r );
				};
				d.stroke( );
				break;
			case "Coffin":
				d.fillStyle = "#c0c0c0";
				d.strokeStyle = "#000000";
				d.lineWidth = "1";
				d.moveTo( -gDX * 0.2, -gDX * 0.3 );
				d.lineTo( gDX * 0.2, -gDX * 0.3 );
				d.lineTo( gDX * 0.4, 0 );
				d.lineTo( gDX * 0.2, gDX * 1.2 );
				d.lineTo( -gDX * 0.2, gDX * 1.2 );
				d.lineTo ( -gDX * 0.4, 0 );
				d.lineTo( -gDX * 0.2, -gDX * 0.3 );
				d.fill( );
				d.stroke( );
				break;
			case "Fireplace, small":
			  d.fillStyle = oFill;
				d.fillRect( -0.5 * gDX, -0.5 * gDX, gDX, 0.5 * gDX );
				d.fillStyle = "#c0c0c0";
				d.fillRect( -0.3 * gDX, -0.3 * gDX, 0.6 * gDX, 0.3 * gDX );
				d.strokeStyle = "#000000";
				d.lineWidth = "1";
				d.strokeRect( -0.5 * gDX, -0.5 * gDX, gDX, 0.5 * gDX );
				d.strokeRect( -0.3 * gDX, -0.3 * gDX, 0.6 * gDX, 0.3 * gDX );
				break;
			case "Fireplace, medium":
			  d.fillStyle = oFill;
				d.fillRect( -0.5 * gDX, -0.5 * gDX, 2.0 * gDX, 1.0 * gDX );
				d.fillStyle = "#c0c0c0";
				d.fillRect( -0.2 * gDX, -0.2 * gDX, 1.4 * gDX, 0.7 * gDX );
				d.strokeStyle = "#000000";
				d.lineWidth = "1";
				d.strokeRect( -0.5 * gDX, -0.5 * gDX, 2.0 * gDX, 1.0 * gDX );
				d.strokeRect( -0.2 * gDX, -0.2 * gDX, 1.4 * gDX, 0.7 * gDX );
				break;
			case "Fireplace, large":
			  d.fillStyle = oFill;
				d.fillRect( -1.5 * gDX, -0.5 * gDX, 3.0 * gDX, 1.5 * gDX );
				d.fillStyle = "#c0c0c0";
				d.fillRect( -1.1 * gDX, -0.1 * gDX, 2.2 * gDX, 1.1 * gDX );
				d.strokeStyle = "#000000";
				d.lineWidth = "1";
				d.strokeRect( -1.5 * gDX, -0.5 * gDX, 3.0 * gDX, 1.5 * gDX );
				d.strokeRect( -1.1 * gDX, -0.1 * gDX, 2.2 * gDX, 1.1 * gDX );
				break;
			case "Bench":
				d.fillStyle = "#c0c0c0";
				d.strokeStyle = "#000000";
				d.fillRect( -0.5 * gDX, -0.2 * gDX, 1.0 * gDX, 0.4 * gDX );
				d.strokeRect( -0.5 * gDX, -0.2 * gDX, 1.0 * gDX, 0.4 * gDX );
				break;
			case "Table, rectangle":
				d.fillStyle = "#c0c0c0";
				d.strokeStyle = "#000000";
				d.fillRect( -0.5 * gDX, -0.5 * gDX, 1.0 * gDX, 1.0 * gDX );
				d.strokeRect( -0.5 * gDX, -0.5 * gDX, 1.0 * gDX, 1.0 * gDX );
				break;
			case "Table, round":
				d.fillStyle = "#c0c0c0";
				d.strokeStyle = "#000000";
				d.beginPath( );
				d.moveTo( 0.5 * gDX, 0.0 );
				d.arc( 0.0, 0.0, 0.5 * gDX, 0.0, 2.0 * Math.PI );
				d.fill(  );
				d.stroke( );
				break;
			case "Chair":
				d.fillStyle = "#c0c0c0";
				d.strokeStyle = "#000000";
				d.beginPath( );
				d.moveTo( 0.2 * gDX, 0.0 );
				d.arc( 0.0, 0.0, 0.2 * gDX, 0.0, 2.0 * Math.PI );
				d.fill(  );
				d.stroke( );
				break;
				
		};
		
	};
	d.textAlign = "center";
	d.textBaseline = "middle";
	d.font = Math.floor( gDX * 0.8 ).toString( ) + "px Arial";
	d.lineWidth = 1;
	d.fillStyle = "#000000";
	d.lineStyle = "#000000";
	for ( i = 0; i < gnLetters.length; i++ ) {
		d.setTransform( 1, 0, 0, 1, 0, 0 );
		d.translate( Math.floor( ( gnLetters[i].x + 0.5 ) * gDX ) + 0.5, Math.floor( ( gnLetters[i].y + 0.5 ) * gDY ) + 0.5 );
		d.beginPath( );
		d.arc( 0.0, 0.0, Math.floor( gDX * 0.5 ), 0, 2.0 * Math.PI );
		d.stroke( );
		d.fillText( gnLetters[i].Letter, 0, 0 );
	};
	d.textAlign = "center";
	d.textBaseline = "middle";
	d.font = Math.ceil( gDX * 0.8 ).toString( ) + "px Arial";
	d.lineWidth = 1;
	d.fillStyle = "#000000";
	d.lineStyle = "#000000";
	for ( i = 0; i < gnNotes.length; i++ ) {
		d.setTransform( 1, 0, 0, 1, 0, 0 );
		d.translate( Math.floor( ( gnNotes[i].x + 0.5 ) * gDX ) + 0.5, Math.floor( ( gnNotes[i].y + 0.5 ) * gDY ) + 0.5 );
		d.rotate( gnNotes[i].D * -Math.PI / 2.0 );
		d.fillText( gnNotes[i].Note, 0, 0 );
	};

	var oURL = document.getElementById( "cnv" ).toDataURL();
	document.getElementById( "img" ).src = oURL;
};
function bodyLoad( ) {
	ResetCells(30, 20);
	FillPatterns( );
	RedrawCanvas( );
	SaveValues( );
	document.getElementById( "selTool" ).addEventListener( "change", ChangeTool );
	document.getElementById( "selTool" ).addEventListener( "update", ChangeTool );
};
function mouseDown( event ) {
	UpdateMousePosition( event );
	gDownX = giX;
	gDownY = giY;
	gDownD = giD;
	gButton[event.button] = true;
	if ( event.button == 0 ) {
		if ( GetTypeValue() == "Freehand line" ) {
			UpdateCellValue( GetToolValue( ), giX, giY, giD );
			RedrawCanvas();
			SaveValues( );
		};
	};
};
function mouseMove( event ) {
	UpdateMousePosition( event );
	if ( event.button == 0 ) {
		if ( GetTypeValue() == "Freehand line" ) {
			if ( gButton[0] ) {
				UpdateCellValue( GetToolValue( ), giX, giY, giD );
				RedrawCanvas();
				SaveValues( );
			};
		};
	};
};
function mouseUp( event ) {
	UpdateMousePosition( event );
	gButton[event.button] = false;
	if ( event.button == 0 ) {
			
		if ( GetTypeValue() == "Fill" ) {
			UpdateBlockValue( GetToolValue( ), giX, giY, giD, gDownX, gDownY, gDownD );
			RedrawCanvas();
			SaveValues( );
		};
		if ( GetTypeValue() == "Straight line" ) {
			if ( Math.abs( giX - gDownX ) > Math.abs( giY - gDownY ) ) {
				UpdateBlockValue( GetToolValue( ), giX, giY, giD, gDownX, giY, gDownD );
			} else {
				UpdateBlockValue( GetToolValue( ), giX, giY, giD, giX, gDownY, gDownD );				
			};
			RedrawCanvas();
			SaveValues( );
		};
		switch ( GetToolValue() ) {
			case "Stamp":
				AddStamp( giX, giY, giD, document.getElementById( "selStamp" ).value );
				break;
			case "NoStamp":
				ClearStamp( giX, giY );
				break;
			case "Note":
				AddNote( giX, giY, giD, document.getElementById( "txtNote" ).value );
				break;
			case "NoNote":
				ClearNote( giX, giY );
				break;
			case "Letter":
				AddLetter( giX, giY, giD, document.getElementById( "txtLetter" ).value );
				break;
			case "NoLetter":
				ClearLetter( giX, giY );
				break;
		};
		RedrawCanvas();
		SaveValues( );
	};
};
function toolChange( ) {
	RedrawCanvas();
	SaveValues( );
};
function toolInput( ) {
	RedrawCanvas();
	SaveValues( );
};
function typeInput( ) {
	RedrawCanvas();
	SaveValues( );
};
function typeChange( ) {
	RedrawCanvas();
	SaveValues( );
};
function ChangeTool( ) {
	var o = document.getElementById( "selTool" );
	var s = o.options.item( o.selectedIndex ).value;
	
	if ( s == "Stamp" ) {
		document.getElementById( "spnStamp" ).style.display = "inline";
	} else {
		document.getElementById( "spnStamp" ).style.display = "none";
	};
	if ( s == "Note" ) {
		document.getElementById( "spnNote" ).style.display = "inline";
	} else {
		document.getElementById( "spnNote" ).style.display = "none";
	};
	if ( s == "Letter" ) {
		document.getElementById( "spnLetter" ).style.display = "inline";
	} else {
		document.getElementById( "spnLetter" ).style.display = "none";
	};
};
function txtWidthChange( ) {
	var o = document.getElementById( "txtWidth");
	var s = o.value;
	var i = Number( s );
	if ( isNaN ( i ) ) i = giWidth;
	i = Math.floor( i );
	if ( i < giMinWidth ) i = giMinWidth;
	if ( i > giMaxWidth ) i = giMaxWidth;
	o.value = i.toString();
};
function txtHeightChange( ) {
	var o = document.getElementById( "txtHeight");
	var s = o.value;
	var i = Number( s );
	if ( isNaN ( i ) ) i = giHeight;
	i = Math.floor( i );
	if ( i < giMinHeight ) i = giMinHeight;
	if ( i > giMaxHeight ) i = giMaxHeight;
	o.value = i.toString();
};
function btnResizeClick( ) {
	txtWidthChange( );
	txtHeightChange( );
	var w = Number( document.getElementById( "txtWidth" ).value );
	var h = Number( document.getElementById( "txtHeight" ).value );
	if ( !isNaN( w ) && !isNaN( h ) ) {
		ResetCells(w, h);
		RedrawCanvas();
		SaveValues( );
	};
};
function txtLetterChange( ) {
	var o = document.getElementById( "txtLetter");
	var s = o.value;
	if ( s.length > 2 ) s = s.substr(0,2);
	if ( o.value != s ) o.value = s;
};
function txtDisplayWidthChange( ) {
	var o = document.getElementById( "txtDisplayWidth" );
	var s = o.value;
	var i = Number( s );
	if ( isNaN ( i ) ) i = 400;
	i = Math.floor( i );
	if ( i < giMinDisplayWidth ) i = giMinDisplayWidth;
	if ( i > giMaxDisplayWidth ) i = giMaxDisplayWidth;
	o.value = i.toString();
	RedrawCanvas();
	SaveValues( );
};
function txtDisplayHeightChange( ) {
	var o = document.getElementById( "txtDisplayHeight" );
	var s = o.value;
	var i = Number( s );
	if ( isNaN ( i ) ) i = 300;
	i = Math.floor( i );
	if ( i < giMinDisplayHeight ) i = giMinDisplayHeight;
	if ( i > giMaxDisplayHeight ) i = giMaxDisplayHeight;
	o.value = i.toString();
	RedrawCanvas();
	SaveValues( );
};
function chkFullScreenInput( ) {
	RedrawCanvas();
	SaveValues( );
};
