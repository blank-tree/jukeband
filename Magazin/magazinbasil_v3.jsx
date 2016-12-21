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

// Main function
function draw() {

  // General document setup
  b.doc();
  b.noStroke();

  // Load external data file in JSON-Format
  var magazinJson = b.loadString('magazinMF.json');
  magazinJson = b.JSON.decode(magazinJson)[0];


  // Titelseite

  // TODO: Titelpage here!

  b.addPage();
  
  // Kurator

  // TODO: Kurator here!

  // Music

  var entries = magazinJson.entries;

  for (var i = 0; i < entries.length; i++) {
  	b.addPage();


  	placeImage(entries[i].coverUrl, i, 'cover');
  	placeImage(entries[i].artworkUrl, i, 'artwork');
  	placeComments(entries[i].comments);

  	emptyPlacement();


  	b.addPage();
  }

  // Rückseite

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
	// var imgPath = type + "/" + imageUrl + ".jpg";
	var imgPath = "cover/cover_" + id + ".jpg";

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
		frameHeight = b.round(b.random(2, 9));
		currentY = b.round(b.random(0, 12 - frameHeight));
	} while (checkPlacementColission(startX, currentY, commentBlockWidth, frameHeight));

	frameHeight = frameHeight * gridHeight - gridGap;

	frames[0] = b.text(totalComments, gridX[startX] - b.width, gridY[currentY], currentCommentBlockWidth, gridY[currentY] + frameHeight > b.height ? b.height - gridY[currentY] : frameHeight);


	// Place additional frames, as many as fit on the two pages
	var framesIterator = 1;

	do {
		startX += commentBlockWidth;
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
}



b.go();

















