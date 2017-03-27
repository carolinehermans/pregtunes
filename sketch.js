/* Global Variables */

/* audio */
var sound, amplitude;

/* graphics */
var cnv, radius;

/* images */
var images, imgNum, numImgsLoaded;

/* songs */
var songs, numSongsLoaded, songPlayed, prevSongNum;

var numImgs = 64;
var numImgsToLoad = 65;
var numSongs = 7;
var numSongsToLoad = 9;

var firstSongToPlay = 6;

/* loading callbacks */

function successImg(img) {
  numImgsLoaded = numImgsLoaded + 1
  if (numImgsLoaded == numImgsToLoad) {
    numSongsLoaded = numSongsLoaded + 1
  }
}

function successSong(song) {
  numSongsLoaded = numSongsLoaded + 1
  amountLoaded = int(100 * numSongsLoaded / numSongsToLoad)
  document.getElementById("loading-animation").innerHTML = "Loading... " + str(amountLoaded) + "%"
}

function handleLoadingComplete() {
  loading = false;

  /* init audio */
  prevSongNum = firstSongToPlay;
  firstSong = document.getElementById(str(firstSongToPlay))
  firstSong.className += " playing"

  if (!songPlayed) {
    sound = songs[firstSongToPlay]
    sound.play()
    songPlayed = true;
    document.getElementById("loading-animation").className = "invisible"
    document.getElementById("content").className = "visible"
  }
}

function changeSong(songNum) {
  /* stop previous song, start new song */
  sound.stop()
  sound = songs[int(songNum)]
  sound.play()

  /* update classes of elements */
  var id = songNum
  var elem = document.getElementById(id)
  var prevElem = document.getElementById(str(prevSongNum))
  elem.className += " playing"
  prevElem.className = "song"
  prevSongNum = songNum
}


function setup() {
  /* hide content, display loading indicator */
  document.getElementById("loading-animation").className = "visible"
  document.getElementById("content").className = "invisible"

  /* initializations */
  loading = true
  songPlayed = false
  numSongsLoaded = 0;
  numImgsLoaded = 0;

  imgNum = 0;
  radius = 0;

  amplitude = new p5.Amplitude();
  cnv = createCanvas(windowWidth, windowHeight - 150);

  /* load songs */
  i = 0;
  songs = [];
  while (i <= numSongs) {
    var snd = loadSound('assets/song' + i + ".mp3", successSong)
    songs.push(snd)
    i++
  }

  /* load images */
  i = 0;
  images = []
  while (i <= numImgs) {
   var img = loadImage("assets/images-cropped-bw/" + i + ".jpg", successImg)
   images.push(img)
   i++
  }

}

function draw() {
  /* black background */
  background(0);
  fill(255);

  if (loading) {
    if (numSongsLoaded == numSongsToLoad && numImgsLoaded == numImgsToLoad) {
      handleLoadingComplete();
    } else {
      return;
    }
  }

  var level = amplitude.getLevel();

  var imgNumFrac = map(level, 0, 1, numImgs, 0);
  /* if different enough, use a new frame */
  if (abs(imgNumFrac - imgNum) > 2) {
    imgNum = int(imgNumFrac)
    radius = 10 + level * 260
  }

  img = images[imgNum]

  /* draw everything */
  var imageWidth = 2 * windowWidth / 5;
  var imageHeight = 2 * windowWidth / 5;
  image(img, windowWidth * .1, 30, imageWidth, imageHeight)
  radius = 10 + level * imageWidth * 3 / 5

  fill(248, 126, 177, 160);
  noStroke();
  bellyX = windowWidth * .1 + imageWidth / 2 - imageWidth * 3 / 100 ;
  bellyY = 20 + imageWidth / 2 + imageWidth * 3 / 26;
  ellipse(bellyX , bellyY, radius, radius);

}
