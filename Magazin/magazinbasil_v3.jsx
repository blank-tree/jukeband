#includepath "~/Documents/;%USERPROFILE%Documents";
#include "basiljs/bundle/basil.js";

// Grid Settings  X 23 - Y 13
var gridX = [0, 49.606, 99.213, 148.819, 198.425, 248.031, 297.638, 347.244, 396.85, 446.457, 496.063, 545.669, 630.709, 680.315, 729.921, 779.528, 829.134, 878.74, 928.346, 977.953, 1027.559, 1077.165, 1126.772];
var gridY = [0, 73.228, 146.457, 219.685, 292.913, 366.142, 366.142, 439.37, 512.598, 585.827, 659.055, 732.283, 805.512];
var commentBlockWidth = 3; // Grid No
var gridWidth = 49.607; // pt
var gridHeight = 73.229; // pt
var gridGap = 14.173; // pt

// Image Sizes
var artworkSize = 7;
var coverSize = 2;

// Grid placement settings
var placement = [ [], [], [], [], [], [], [], [], [], [], [], [], [], [] ];
emptyPlacement();

// Font Settings
var font = "Oswald";

// Engine Settings
var eolCounterMax = 50;
var weeklyFiles = [];
var magazinJson = [];

// "fake it 'til you make it"-settings
var dayIterator = 0;
var dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
var dateDay = 1;

// Main function
function draw() {

  // General document setup
  b.doc();
  b.noStroke();

  // Load external data file in JSON-Format
  magazinJson[0] = b.loadString('magazin-MF-4.json');
  weeklyFiles[0] = b.JSON.decode(magazinJson[0])[0];
  magazinJson[1] = b.loadString('magazin-MF-4.json');
  weeklyFiles[1] = b.JSON.decode(magazinJson[1])[0];
  // magazinJson[2] = b.loadString('magazin-MF-5.json');
  // weeklyFiles[2] = b.JSON.decode(magazinJson[2])[0];
  // magazinJson[3] = b.loadString('magazin-FF2.json');
  // weeklyFiles[3] = b.JSON.decode(magazinJson[3])[0];

  // Titelseite

  // TODO: Titelpage here!

  b.addPage();

  b.forEach(weeklyFiles, function(item, i) {

  		// Kurator

		// TODO: Kurator here!

		// Music
		var entries = item.entries;

		for (var i = 0; i < entries.length; i++) {
		  	b.addPage();


		  	placeImage(entries[i].imgUrl, i, 'cover');
		  	placeImage(entries[i].imgUrl, i, 'artwork');
		  	placeComments(entries[i].comments);


		  	if (entries[i].bandname.length < 12) {
		  		randomTitlePlacement(entries[i], 67, 74, 152, 144);
			  	placeDate(i, dayNames[dayIterator], dateDay + ".01.2017", entries[i].country, entries[i].length);
		  	} else {
		  		placeDate(i, dayNames[dayIterator], dateDay + ".01.2017", entries[i].country, entries[i].length);
			  	randomTitlePlacement(entries[i], 30, 32, 67, 74);
		  	}
		  	dayIterator = dayIterator++ < 7 ? dayIterator++ : 0;
		  	dateDay++;

		  	emptyPlacement();


		  	b.addPage();
		}
	});



  // Rückseite

}

function randomTitlePlacement(entry, small, smallLeading, big, bigLeading) {
	var chooseRandomly = b.round(b.random(0,1));

	if (chooseRandomly == 0) {
		placeTitle(entry.bandname, big, bigLeading, "Bold", entry.songtitle, small, smallLeading, "Light");
	} else {
		placeTitle(entry.songtitle, big, bigLeading, "Light", entry.bandname, small, smallLeading, "Bold");
	}

}

function placeImage(imageUrl, id, type) {
	
	// define imgGridHeight of the image
	var imgGridHeight = 0;
	var imgGridXMax = 0;
	var imgGridYMax = 0;
	var imgGridXMaxCorrection = 0;
	switch(type) {
		case "cover":
			imgGridHeight = coverSize; // Grid No
			imgGridXMax = 20;
			imgGridYMax = 11;
			imgGridXMaxCorrection = 2.361;
			break;
		case "artwork":
			imgGridHeight = artworkSize; // Grid No
			imgGridXMax = 12;
			imgGridYMax = 5;
			imgGridXMaxCorrection = 33.623;
			break;
		default:
			b.println("Invalid type passed to placeImage function");
	}

	// Calculate how many grid blocks the width of the image needs
	var imgGridWidth = b.ceil(imgGridHeight * gridHeight / gridWidth); // Grid No
	var imgSize = imgGridHeight * gridHeight; // pt

	// Decide X and Y Starting points in the upper left corner for the image
	var imgPos = [0, 0]; // Grid No
	do {
		imgPos = decidePositionAtOneBorder(0, 22 - imgGridWidth, 0, 12 - imgGridHeight, imgGridXMax, imgGridYMax);
	} while (checkPlacementColission(imgPos[0], imgPos[1], imgGridWidth, imgGridHeight));

	// Build image path
	var imgPath = type + "/" + imageUrl + ".jpg";
	// var imgPath = "cover/cover_" + id + ".jpg";

	// Place Image
	var imgPosXPt = imgPos[0] != imgGridXMax ? gridX[imgPos[0]] - b.width : gridX[imgPos[0]] - b.width + imgGridXMaxCorrection;
	var currentImg = b.image(imgPath, imgPosXPt, gridY[imgPos[1]], imgSize - gridGap, imgSize - gridGap);


	for (var imgIteratorY = imgPos[1]; imgIteratorY < imgGridHeight + imgPos[1] + 1; imgIteratorY++) {
		for (var imgIteratorX = imgPos[0]; imgIteratorX < imgGridWidth + imgPos[0]; imgIteratorX++) {
			placement[imgIteratorY][imgIteratorX] = true;
		}
	}

}

function decidePositionAtOneBorder(minX, maxX, minY, maxY, maxPlacementX, maxPlacementY) {
	// x 0 -12 plus 33.071pt
	// y 0 - 5
	var decided = [0, 0];
	var decideBorder = b.round(b.random(0, 3));

	switch(decideBorder) {
		case 0:
			decided[0] = 0;
			decided[1] = b.round(b.random(minY, maxY));
			break;
		case 1:
			decided[0] = b.round(b.random(minX, maxX));
			decided[1] = 0;
			break;
		case 2:
			decided[0] = maxPlacementX;
			decided[1] = b.round(b.random(minY, maxY));
			break;
		case 3:
			decided[0] = b.round(b.random(minX, maxX));
			decided[1] = maxPlacementY;
			break;
		default:
			b.println("Invalid use of decidePositionAtOneBorder function");
	}

	return decided;
}

function placeComments(comments) {

	// Text Styling
	b.textFont(font, "Light");
	b.textSize(10);
	b.textLeading(13);
	b.textTracking(10);
	b.textAlign(Justification.FULLY_JUSTIFIED);

	// Combine all comments
	var totalComments = '';
	b.forEach(comments, function(item, i) {
		totalComments = totalComments + item.name + "//" + "\n" + item.comment + "\n" + "\n";
	});

	// Frames Setup
	var startX = 0;
	var frames = [];
	var currentCommentBlockWidth = commentBlockWidth * gridWidth - gridGap;
	var eolCounter = 0;

	// Place Frame 1
	var frameHeight = 0;
	var currentY = 0;
	do {
		startX = b.round(b.random(0, 12));
		if (startX == 10 || startX == 11) {
			startX += commentBlockWidth;
		}
		frameHeight = b.round(b.random(2, 9));
		currentY = b.round(b.random(0, 12 - frameHeight));
	} while (checkPlacementColission(startX, currentY, commentBlockWidth, frameHeight));

	frameHeight = frameHeight * gridHeight - gridGap;

	frames[0] = b.text(totalComments, gridX[startX] - b.width, gridY[currentY], currentCommentBlockWidth, gridY[currentY] + frameHeight > b.height ? b.height - gridY[currentY] : frameHeight);


	// Place additional frames, as many as fit on the two pages
	var framesIterator = 1;

	do {
		startX += commentBlockWidth;
		if (startX == 10 || startX == 11) {
			startX += commentBlockWidth;
		}
		do {			
			frameHeight = b.round(b.random(2, 9));
			currentY = b.round(b.random(0, 12 - frameHeight));
			eolCounter++;
		} while (checkPlacementColission(startX, currentY, commentBlockWidth, frameHeight) && eolCounter < eolCounterMax);

		if (eolCounter < eolCounterMax) {
			frameHeight = frameHeight * gridHeight - gridGap;
			frames[framesIterator] = b.text(totalComments, gridX[startX] - b.width, gridY[currentY], currentCommentBlockWidth, gridY[currentY] + frameHeight > b.height ? b.height - gridY[currentY] : frameHeight);
			b.linkTextFrames(frames[framesIterator -1], frames[framesIterator]);
			framesIterator++;
			eolCounter = 0;
		} else {
			break;
		}
	} while (startX + commentBlockWidth * 2 < gridX.length);
}

function placeTitle(text, fontsize, fontLeading, fontstyle, text2, fontsize2, fontLeading2, fontstyle2) {

	var biggestSpot = findTitlePlacement();

	for (var titelIteratorY = biggestSpot[1]; titelIteratorY < biggestSpot[3] + biggestSpot[1] + 1; titelIteratorY++) {
		for (var titleIteratorX = biggestSpot[0]; titleIteratorX < biggestSpot[2] + biggestSpot[0]; titleIteratorX++) {
			placement[titelIteratorY][titleIteratorX] = true;
		}
	}
	var secondBiggestSpot = findTitlePlacement();

	// Text 1
	b.textFont(font, fontstyle);
	b.textSize(fontsize);
	b.textLeading(fontLeading);
	b.textTracking(0);
	b.textAlign(Justification.LEFT_ALIGN);
	var titleFrame = b.text(text.toUpperCase(), gridX[biggestSpot[0]] - b.width, gridY[biggestSpot[1]], biggestSpot[2] * gridWidth, biggestSpot[3] * gridHeight);

	// Text 2
	b.textFont(font, fontstyle2);
	b.textSize(fontsize2);
	b.textLeading(fontLeading2);
	b.textTracking(0);
	b.textAlign(Justification.LEFT_ALIGN);
	var titleFrame2 = b.text(text2.toUpperCase(), gridX[secondBiggestSpot[0]] - b.width, gridY[secondBiggestSpot[1]], secondBiggestSpot[2] * gridWidth, secondBiggestSpot[3] * gridHeight);

}

function findTitlePlacement() {
	var biggestSpot = [0,0,0,0];
	for (var yIterator = 0; yIterator < gridY.length - 1; yIterator++) {
		for (var xIterator = 0; xIterator < gridX.length - 1; xIterator++) {
			var currentMeasurement = measureBigestSpot(xIterator, yIterator);
			if (currentMeasurement[2] * currentMeasurement[3] > biggestSpot[2] * biggestSpot[3]) {
				biggestSpot = currentMeasurement;
			}
		}
	}
	return biggestSpot;
}

function measureBigestSpot(pX, pY) {
	var pWidth = 0;
	var pHeight = 0;

	while(pY+pHeight < gridY.length - 1 && !placement[pY+pHeight][pX]) {
		var currentMeasurementWidth = scanLongestLine(pX, pY+pHeight);
		if (pWidth == 0 && currentMeasurementWidth > pWidth) {
			pWidth = currentMeasurementWidth;
			pHeight++;
		} else if (currentMeasurementWidth >= pWidth) {
			pHeight++;
		} else {
			pHeight--;
			break;
		}
	}
	return [pX, pY, pWidth, pHeight];
}

function scanLongestLine(pX, pY) {
	var currentWidth = 0;
	while (pX+currentWidth < gridX.length - 1 && !placement[pY][pX+currentWidth]) {
		currentWidth++;
	}
	return currentWidth;
}

function checkPlacementColission(pX, pY, pWidth, pHeight) {
	pHeight += 1;
	for (var yIterator = pY; yIterator < pY + pHeight; yIterator++) {
		for (var xIterator = pX; xIterator < pX + pWidth; xIterator++) {
			if (placement[yIterator][xIterator]) {
				return true;
			}
		}
	}
	return false;
}

function emptyPlacement() {
	for (var yIterator = 0; yIterator < gridY.length; yIterator++) {
		for (var xIterator = 0; xIterator < gridX.length; xIterator++) {
			placement[yIterator][xIterator] = false;
		}
	}
	// b.rotate(b.PI);
}

function placeDate(dayInt, dayString, dateString, countryString, durationString) {

	b.pushMatrix();

	// Rotation
	b.rotate(b.PI*1.5);

	// white background
	b.fill(0,0,0,0);
	b.rect(gridX[12] - b.width - gridGap, gridY[12] + gridHeight + 2, 2 + 5 * gridHeight + 5 * gridGap + 2.36, gridGap);


	// Text Styling
	b.fill(0,0,0,100);
	b.textFont(font, "Regular");
	b.textSize(10);
	b.textLeading(Leading.AUTO);
	b.textTracking(20);
	b.textAlign(Justification.LEFT_ALIGN);

	var dateFrames = [];

	
	dateFrames[0] = b.text(dayString.toUpperCase(), gridX[12] - b.width - gridGap, gridY[12] - gridGap, gridHeight, gridGap);
	dateFrames[1] = b.text(dateString, gridX[12] - b.width - gridGap, gridY[11] - gridGap, gridHeight, gridGap);
	dateFrames[2] = b.text(countryString, gridX[12] - b.width - gridGap, gridY[9] - gridGap, gridHeight, gridGap);
	dateFrames[3] = b.text(durationString, gridX[12] - b.width - gridGap, gridY[8] - gridGap, gridHeight, gridGap);

	/*
	for (var rotationIterator = 0; rotationIterator < dateFrames.length; rotationIterator++) {
		
		//  dateFrames[rotationIterator]
	}
	*/

	b.popMatrix();

}



b.go();

















