#includepath "~/Documents/;%USERPROFILE%Documents";
#include "basiljs/bundle/basil.js";

// Grid Settings  X 23 - Y 13
var gridX = [0, 49.606, 99.213, 148.819, 198.425, 248.031, 297.638, 347.244, 396.85, 446.457, 496.063, 545.669, 630.709, 680.315, 729.921, 779.528, 829.134, 878.74, 928.346, 977.953, 1027.559, 1077.165, 1126.772];
var gridY = [0, 73.228, 146.457, 219.685, 292.913, 366.142, 366.142, 439.37, 512.598, 585.827, 659.055, 732.283, 805.512];
var placementX = [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false];
var placementY = [false, false, false, false, false, false, false, false, false, false, false, false, false];
var commentBlockWidth = 4;
var gridWidth = 49.607;
var gridHeight = 73.229;
var gridGap = 14.173;
var maxYStart = 10;

// Font Settings
var font = "Oswald";

// Image Settings
var coverSize = 250;
var artworkSize = 450;




// Main function
function draw() {

  b.doc();

  // Load external data file in JSON-Format
  var magazinJson = b.loadString('magazinMF.json');
  magazinJson = b.JSON.decode(magazinJson)[0];


  // Titelseite

  // TODO: Build Titelseite here!
  b.addPage();
  


  // Kurator

  // TODO: build Kurator here!
 


  // Content

  var entries = magazinJson.entries;
  for (var i = 0; i < entries.length; i++) {

  	b.addPage();

  	placeCover(entries[i].coverUrl, i);
  	placeArtwork(entries[i].artworkUrl, i);

  	placeComments(entries[i].comments, 0);
  	placeSongtitle(entries[i].songtitle);
  	placeBandname(entries[i].bandname);
  	
  	placeDate(i+1);
  	
  	
  	b.addPage();
  }


  // Back

  // TODO: build back here!


}

function placeComments(comments, titleYStart) {

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

	// b.rotate(b.PI*1.5);

	// Random placement setup
	


	var startX = b.round(b.random(0, 5));
	var currentCommentBlockWidth = commentBlockWidth * gridWidth - gridGap;
	
	
	// Frame 1
	var randomHeight = b.round(b.random(2,7)) * gridHeight - gridGap;
	var currentYStart = b.round(b.random(titleYStart, maxYStart));
	var myFrame1 = b.text(totalComments, gridX[startX] - b.width, gridY[currentYStart], currentCommentBlockWidth, gridY[currentYStart] + randomHeight > b.height ? b.height - gridY[currentYStart] : randomHeight);
	
	// Frame 2
	var multiplier = 1;
	var currentXStart = startX + commentBlockWidth * multiplier;
	if (currentXStart > 7 && currentXStart < 12) {
		multiplier++;
		currentXStart = startX + commentBlockWidth * multiplier;
	}
	randomHeight = b.round(b.random(2,7)) * gridHeight - gridGap;
	currentYStart = b.round(b.random(titleYStart, maxYStart));
	var myFrame2 = b.text('', gridX[currentXStart] - b.width, gridY[currentYStart], currentCommentBlockWidth, gridY[currentYStart] + randomHeight > b.height ? b.height - gridY[currentYStart] : randomHeight);
	b.linkTextFrames(myFrame1, myFrame2);
	
	// Frame 3
	multiplier++;
	currentXStart = startX + commentBlockWidth * multiplier;
	if (currentXStart > 7 && currentXStart < 12) {
		multiplier++;
		currentXStart = startX + commentBlockWidth * multiplier;
	}
	randomHeight = b.round(b.random(2,7)) * gridHeight - gridGap;
	currentYStart = b.round(b.random(titleYStart, maxYStart));
	var myFrame3 = b.text('', gridX[currentXStart] - b.width, gridY[currentYStart], currentCommentBlockWidth, gridY[currentYStart] + randomHeight > b.height ? b.height - gridY[currentYStart] : randomHeight);
	b.linkTextFrames(myFrame2, myFrame3);

	// Frame 4
	multiplier++;
	currentXStart = startX + commentBlockWidth * multiplier;
	if (currentXStart > 7 && currentXStart < 12) {
		multiplier++;
		currentXStart = startX + commentBlockWidth * multiplier;
	}
	if (currentXStart < 20) {
		randomHeight = b.round(b.random(2,7)) * gridHeight - gridGap;
		currentYStart = b.round(b.random(titleYStart, maxYStart));
		var myFrame4 = b.text('', gridX[currentXStart] - b.width, gridY[currentYStart], currentCommentBlockWidth, gridY[currentYStart] + randomHeight > b.height ? b.height - gridY[currentYStart] : randomHeight);
		b.linkTextFrames(myFrame3, myFrame4);
	}
}

function decideCommentPlacement() {
	
}

function placeBandname(bandname) {

	// Text Styling
	b.textFont(font, "Bold");
	b.textSize(100);
	b.textLeading(Leading.AUTO);
	b.textTracking(0);
	b.textAlign(Justification.LEFT_ALIGN);

	// Text positioning
	var randomX = b.round(b.random(0, 8));
	var randomY = b.round(b.random(0, 5));

	// Frame
	var myFrame = b.text(bandname.toUpperCase(), gridX[randomX] - b.width, gridY[randomY], b.width * 2 - gridX[randomX], b.height);

	// Einzug auf der ersten Linie
	// b.typo(myFrame, 'firstLineIndent', 100);
}

function placeSongtitle(songtitle) {

	// Text Styling
	b.textFont(font, "Regular");
	b.textSize(40);
	b.textLeading(Leading.AUTO);
	b.textTracking(0);
	b.textAlign(Justification.LEFT_ALIGN);

	// Text positioning
	var randomX = b.round(b.random(0, 9));
	var randomY = b.round(b.random(0, 5));

	// Frame
	var myFrame = b.text(songtitle.toUpperCase(), gridX[randomX] - b.width, gridY[randomY], b.width * 2 - gridX[randomX], b.height);

	// Einzug auf der ersten Linie
	// b.typo(myFrame, 'firstLineIndent', 100);
}

function placeArtwork(artworkURL, id) {

	// Download image
	var imagePath = "artwork/artwork_" + id + ".jpg";
	// b.download(artworkURL, imagePath);

	// Place image
	var imageX = gridX[b.round(b.random(0, 16))] - b.width;
	var imageY = gridY[b.round(b.random(0, 6))];
	var image = b.image(imagePath, imageX, imageY, artworkSize, artworkSize);
	// b.opacity(image, 80);

}

function placeCover(coverURL, id) {

	// Download image
	var imagePath = "cover/cover_" + id + ".jpg";
	// b.download(coverURL, imagePath);

	// Place image
	var imageX = gridX[b.round(b.random(0, 17))] - b.width;
	var imageY = gridY[b.round(b.random(0, 8))];
	var image = b.image(imagePath, imageX, imageY, coverSize, coverSize);
	// b.opacity(image, 50);
}

function placeDate(dayInt) {

	// Text Styling
	b.textFont(font, "Regular");
	b.textSize(31);
	b.textLeading(40);
	b.textTracking(0);
	b.textAlign(Justification.RIGHT_ALIGN);

	var positionX = b.width - 81;
	var positionY = 9;

	var dateString = "0" + dayInt + "  " + "12" + "\n" + "16";
	var myFrame = b.text(dateString, positionX, positionY, b.width - positionX - 12, 100);
}

b.go();