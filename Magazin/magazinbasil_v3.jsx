#includepath "~/Documents/;%USERPROFILE%Documents";
#include "basiljs/bundle/basil.js";

// Grid Settings  X 23 - Y 13
var gridX = [0, 49.606, 99.213, 148.819, 198.425, 248.031, 297.638, 347.244, 396.85, 446.457, 496.063, 545.669, 630.709, 680.315, 729.921, 779.528, 829.134, 878.74, 928.346, 977.953, 1027.559, 1077.165, 1126.772];
var gridY = [0, 73.228, 146.457, 219.685, 292.913, 366.142, 366.142, 439.37, 512.598, 585.827, 659.055, 732.283, 805.512];
var commentBlockWidth = 4; // Grid No
var gridWidth = 49.607; // pt
var gridHeight = 73.229; // pt
var gridGap = 14.173; // pt

// Image Sizes
var artworkSize = 7;
var coverSize = 2;

// Grid placement settings
var placement = [ [], [], [], [], [], [], [], [], [], [], [], [], [] ];
emptyPlacement();

// Font Settings
var font = "Oswald";

// Main function
function draw() {

  b.doc();

  b.addPage();

  // Load external data file in JSON-Format
  var magazinJson = b.loadString('magazinMF.json');
  magazinJson = b.JSON.decode(magazinJson)[0];

  var entries = magazinJson.entries;

  for (var i = 0; i < entries.length; i++) {
  	b.addPage();


  	placeImage(entries[i].coverUrl, i, 'cover');
  	placeImage(entries[i].artworkUrl, i, 'artwork');

  	emptyPlacement();


  	b.addPage();
  }
}

function placeImage(imageUrl, id, type) {
	
	// define imgGridHeight of the image
	var imgGridHeight = 0;
	switch(type) {
		case "cover":
			imgGridHeight = coverSize; // Grid No
			break;
		case "artwork":
			imgGridHeight = artworkSize; // Grid No
			break;
		default:
			imgGridHeight = 0;
			b.println("Invalid type passed to placeImage function");
			return;
	}

	// Calculate how many grid blocks the width of the image needs
	var imgGridWidth = b.ceil(imgGridHeight * gridHeight / gridWidth); // Grid No
	var imgSize = imgGridHeight * gridHeight; // pt

	// Decide X and Y Starting points in the upper left corner for the image
	var imgX = 0;
	var imgY = 0;
	do {
		imgX = b.round(b.random(0, 22 - imgGridWidth)); // Grid No
		imgY = b.round(b.random(0, 12 - imgGridHeight)); // Grid No
	} while (checkPlacementColission(imgX, imgY, imgGridWidth, imgGridHeight));

	// Build image path
	// var imgPath = type + "/" + imageUrl + ".jpg";
	var imgPath = "cover/cover_" + id + ".jpg";

	// Place Image
	var currentImg = b.image(imgPath, gridX[imgX] - b.width, gridY[imgY], imgSize - gridGap, imgSize - gridGap);


	for (var imgIteratorY = imgY; imgIteratorY < imgGridHeight + imgY; imgIteratorY++) {
		for (var imgIteratorX = imgX; imgIteratorX < imgGridWidth + imgX; imgIteratorX++) {
			placement[imgIteratorY][imgIteratorX] = true;
		}
	}

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
			// if (!placement[yIterator].isArray()) {
			// 	placement[yIterator] = [];
			// }
			placement[yIterator][xIterator] = false;
		}
	}
}



b.go();

















