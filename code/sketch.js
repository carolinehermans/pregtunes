var sound, amplitude, cnv, level, images, maxFrame, timer, ctx, radius;
var imgBottom, imgTop, difference, numSongs, songs;

function preload(){
  maxFrame = 64
  numSongs = 12;
  prevSongNum = 4;
  i = 0;
  songs = []
  while (i <= numSongs) {
    var snd = loadSound('assets/song' + i + ".mp3")
    songs.push(snd)
    i++
  }

  sound = loadSound('assets/song4.mp3');

  i = 0;
  images = []
  while (i <= maxFrame) {
    var img = loadImage("assets/images-cropped-bw/" + i + ".jpg")
    images.push(img)
    i++
  }

  firstSong = document.getElementById(str(prevSongNum))
  firstSong.className += " playing"
}

function changeSong(songNum) {
  sound.stop()
  sound = songs[int(songNum)]
  sound.play()
  var id = songNum
  var elem = document.getElementById(id)
  var prevElem = document.getElementById(str(prevSongNum))
  elem.className += " playing"
  prevElem.className = "song"

  prevSongNum = songNum
}

function setup() {
  imgBottom = 1;
  imgTop = 2;
  difference = 0
  timer = 0;
  cnv = createCanvas(windowWidth,windowHeight - 100);
  amplitude = new p5.Amplitude();
  // start / stop the sound when canvas is clicked
  sound.play()

}

function draw() {
  background(0);
  fill(255);

  var level = amplitude.getLevel();
  var imgFrac = map(level, 0, 0.7, maxFrame, 0);
  if (abs(imgFrac - imgBottom) > 4) {
    imgBottom = int(imgFrac)
    imgTop = imgBottom + 1
    difference = imgFrac - imgBottom
    radius = 10 + level * 260
  }
  img = images[imgBottom]

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
