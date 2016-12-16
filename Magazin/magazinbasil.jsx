#includepath "~/Documents/;%USERPROFILE%Documents";
#include "basiljs/bundle/basil.js";

// Constants
var gridX = [0, 49.606, 99.213, 148.819, 198.425, 248.031, 297.638, 347.244, 396.85, 446.457, 496.063, 545.669, 630.709, 680.315, 729.921, 779.528, 829.134, 878.74, 928.346, 977.953, 1027.559, 1077.165, 1126.772];
var gridY = [0, 73.228, 146.457, 219.685, 292.913, 366.142, 366.142, 439.37, 512.598, 585.827, 659.055, 732.283, 805.512];
var font = "News Gothic";
var commentBlockWidth = 4;
var gridWidth = 49.607;
var gridHeight = 73.229;
var gridGap = 14.173;
var maxYStart = 10;

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

  	placeComments(entries[i].comments, 0);
  	placeSongtitle(entries[i].songtitle);
  	// placeBandname(entries[i].bandname);
  	// placeComments(entries[i].comments, false, 0);
  	
  	// placeArtwork(entries[i].artworkUrl);
  	// placeCover(entries[i].coverUrl);
  	
  	b.addPage();
  }


  // Back

  // TODO: build back here!


}

function placeComments(comments, titleYStart) {

	// Basic Styling
	b.textFont(font, "Regular");
	b.textSize(11);
	b.textAlign(Justification.FULLY_JUSTIFIED);

	// Test Content
	// var totalComments = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. ';

	// var totalComments = comments[0].comment + "n" + comments[1].comment + "n";

	var totalComments = '';

	// for (var key in comments) {
	// 	totalComments = totalComments.concat(key.comment + "n" + "n");
	// }

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

function placeBandname(bandname) {
	b.textFont(font, "Bold");
	b.textSize(100);
	b.textAlign(Justification.LEFT_ALIGN);

	// Texteingabe
	var randomX = b.round(b.random(0, 7));
	var randomY = b.round(b.random(0,5));
	var myFrame = b.text(bandname.toUpperCase(), gridX[randomX] - b.width, gridY[randomY], b.width * 2 - gridX[randomX], b.height);

	// Einzug auf der ersten Linie
	// b.typo(myFrame, 'firstLineIndent', 100);
}

function placeSongtitle(songtitle) {
	b.textFont(font, "Bold");
	b.textSize(100);
	b.textAlign(Justification.LEFT_ALIGN);

	// Texteingabe
	var randomX = b.round(b.random(0, 7));
	var randomY = b.round(b.random(0,5));
	var myFrame = b.text(songtitle.toUpperCase(), gridX[randomX] - b.width, gridY[randomY], b.width * 2 - gridX[randomX], b.height);

	// Einzug auf der ersten Linie
	// b.typo(myFrame, 'firstLineIndent', 100);
}

function placeArtwork(artworkURL) {

}

function placeCover(coverURL) {

}

function placeDate() {

}

b.go();