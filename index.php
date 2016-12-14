<!doctype html>
<html class="no-js" lang="en">
<head>
	<meta charset="utf-8">
	<meta http-equiv="x-ua-compatible" content="ie=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>juke.band</title>
	<link rel="stylesheet" href="css/app.css">
</head>
<body>
<?php
define( 'WORKING_PATH', getcwd() );
?>

<h1 id="date-display"><?php echo date( 'd. F Y' ) ?></h1>


<div id="cover" style="background: url('/img/output-00000007-demo.png') center center / cover no-repeat fixed;"></div>


<div id="description">

	<div class="row">
		<div id="bandcamp" class="small-12 medium-6
		text-center small-centered columns">
			<iframe style="border: 0; width: 100%; height: 120px;"
			        src="https://bandcamp.com/EmbeddedPlayer/album=239970309/size=large/bgcol=ffffff/linkcol=0687f5/tracklist=false/artwork=small/transparent=true/"
			        seamless><a href="http://psyka.bandcamp.com/album/alpha-nord-live-at-psyka-festival-vol-3">ALPHA
					NORD - Live at PsyKA Festival Vol. 3 by PsyKA</a></iframe>
		</div>
	</div>

	<div id="desctwo" class="row">
		<div class="small-12 medium-6 columns">
			<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
				dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
				ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
				fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
				deserunt mollit anim id est laborum.</p>
		</div>
		<div class="small-12 medium-6 columns">
			<a href="#description" class="button hollow expanded">Send Postcard</a>
			<a href="#description" class="button hollow expanded">Monthly Print Magazine Subscription</a>
			<a href="#description" class="button hollow expanded">About</a>
			<a href="#description" class="button hollow expanded">History</a>
		</div>
	</div>

</div>

<div id="comments">
	<div class="row">
		<div class="small-12 medium-6 medium-centered columns">
			<blockquote>
				Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
				dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
				ex ea commodo consequat.
				<cite>Isaac Asimov</cite>
			</blockquote>
		</div>
	</div>
	<div class="row">
		<div class="small-12 medium-6 medium-centered columns">
			<blockquote>
				Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
				dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
				ex ea commodo consequat.
				<cite>Isaac Asimov</cite>
			</blockquote>
		</div>
	</div>
	<div class="row">
		<div class="small-12 medium-6 medium-centered columns">
			<blockquote>
				Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
				dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
				ex ea commodo consequat.
				<cite>Isaac Asimov</cite>
			</blockquote>
		</div>
	</div>
	<div class="row">
		<div class="small-12 medium-6 medium-centered columns">
			<blockquote>
				Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
				dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
				ex ea commodo consequat.
				<cite>Isaac Asimov</cite>
			</blockquote>
		</div>
	</div>
	<div class="row">
		<div class="small-12 medium-6 medium-centered columns">
			<blockquote>
				Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
				dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
				ex ea commodo consequat.
				<cite>Isaac Asimov</cite>
			</blockquote>
		</div>
	</div>
	<div class="row">
		<div class="small-12 medium-6 medium-centered columns">
			<blockquote>
				Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
				dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
				ex ea commodo consequat.
				<cite>Isaac Asimov</cite>
			</blockquote>
		</div>
	</div>
</div>

<footer>
	<div class="row">
		<div class="small-12 text-center small-centered columns">
			<p>&copy; <?= date('Y'); ?> juke.band</p>
		</div>
	</div>
</footer>


<div class="row">
	<div class="small-12 medium-6 columns">

		<?php

		if ( false ) :

			for ( $imgIterator = 0; $imgIterator < 10; $imgIterator ++ ) {

				$testpath       = '/img/0000000' . $imgIterator . '-demo.jpg';
				$testOutputPath = '/img/output-0000000' . $imgIterator . '-demo.png';

				// lets do some shit here!!!!

				$image = new Imagick( WORKING_PATH . $testpath );
				$image->setImageFormat( "png32" );
				$image->blurimage( mt_rand( 1, 20 ), mt_rand( 5, 10 ) );

				$arraySize = 10;

				$imageArray = array( $arraySize );

				for ( $i = 0; $i < $arraySize; $i ++ ) {
					$imageArray[ $i ] = new Imagick( WORKING_PATH . $testpath );
					$imageArray[ $i ]->setImageFormat( "png32" );
					for ( $j = 0; $j < $i + 1; $j ++ ) {
						$imageArray[ $i ]->scaleImage( 700 * ( ( 100 - $i * 5 ) / 100 ), 0 );

					}
//			$imageArray[$i]->blurimage($i, 2);
					$imageArray[ $i ]->rotateImage( "none", $i * 3 );
					$image->compositeImage( $imageArray[ $i ], Imagick::COMPOSITE_DEFAULT, 0, 0 );
				}

				$image->writeImage( WORKING_PATH . $testOutputPath );

				?>

				<img src="<?= $testOutputPath; ?>" alt="">

				<?php
			}
		endif;
		?>

	</div>
</div>


<script src="bower_components/jquery/dist/jquery.js"></script>
<script src="bower_components/what-input/what-input.js"></script>
<script src="bower_components/foundation-sites/dist/foundation.js"></script>
<script src="js/app.js"></script>
</body>
</html>
