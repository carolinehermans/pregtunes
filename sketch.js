var sound, amplitude, cnv, level, images, maxFrame, timer, ctx, radius, loading;
var imgBottom, imgTop, difference, numSongs, songs, numSongsLoaded, amountLoaded;
var songPlayed, numImgsLoaded, numImgs;

function successImg(img) {
  numImgsLoaded = numImgsLoaded + 1
  if (numImgsLoaded == 65) {
    numSongsLoaded = numSongsLoaded + 1
  }
}

function success(thing) {
  numSongsLoaded = numSongsLoaded + 1
  amountLoaded = int(100 * numSongsLoaded / numSongs)
  document.getElementById("loading-animation").innerHTML = "Loading... " + str(amountLoaded) + "%"
}

function error(thing) {
}

// function loading(percent){
//   // amountLoaded = ((1.0 * numSongsLoaded / numSongs) + percent).toFixed(2)
//   // document.getElementById("p5_loading").innerHTML = "Loading... " + str(amountLoaded) + "%"
// }

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
  document.getElementById("loading-animation").className = "visible"
  document.getElementById("content").className = "invisible"
  numImgs = 65
  songPlayed = false
  maxFrame = 64
  numSongs = 14;
  numSongsLoaded = 0;
  numImgsLoaded = 0;
  prevSongNum = 4;
  imgBottom = 0;
  i = 0;
  loading = true
  amplitude = new p5.Amplitude();
  songs = []
  cnv = createCanvas(windowWidth, windowHeight - 150);
  while (i <= numSongs) {
    var snd = loadSound('assets/song' + i + ".mp3", success, error, loading)
    songs.push(snd)
    i++
  }

  i = 0;
 images = []
 while (i <= maxFrame) {
   var img = loadImage("assets/images-cropped-bw/" + i + ".jpg", successImg, error, loading)
   images.push(img)
   i++
 }

 firstSong = document.getElementById(str(prevSongNum))
 firstSong.className += " playing"

}

function draw() {
  background(0);
  fill(255);
  if (numSongsLoaded == numSongs && numImgsLoaded == numImgs) {
    loading = false;
    if (!songPlayed) {
      sound = songs[3]
      songs[3].play()
      songPlayed = true;
      document.getElementById("loading-animation").className = "invisible"
      document.getElementById("content").className = "visible"
    }
  }

  if (!loading) {
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
}
