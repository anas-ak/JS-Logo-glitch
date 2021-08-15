var
  canvas, ctx,
  logoWhite, logoBlue, logoRed,
  xPosition, yPosition,
  imageObjShadow, imageObjWithShadow,
  imageDataShadows, imageDataWithShadow
  ;

canvas = document.getElementById('myCanvas');
ctx = canvas.getContext('2d');
logoWhite = new Image();
logoBlue = new Image();
logoRed = new Image();
logoWhite.crossOrigin = "Anonymous";
logoBlue.crossOrigin = "Anonymous";
logoRed.crossOrigin = "Anonymous";
logoWhite.src = 'https://raynorgaming.com/wp-content/uploads/2019/07/NBA-2K-logo-Small.png'

/*'https://image.ibb.co/iuB5i0/logo-white.png';
logoBlue.src = 'https://image.ibb.co/hVGubL/logo-blue.png';
logoRed.src = 'https://image.ibb.co/kw6ubL/logo-red.png';
*/

imageObjShadow = new Image();
imageObjWithShadow = new Image();

xPosition = (canvas.width / 2) - 67; // 67 = logo size / 2
yPosition = 0;

canvas.addEventListener('click', glitch, false);
window.addEventListener('load', windowLoaded, false);

function windowLoaded() {
  drawDefaultImage();
  loop();
}

function glitch() {
  getShadowsImg();
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  imageObjShadow.onload = function () {

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(logoWhite, xPosition, yPosition);
    var arr = lineShadowsHeight();
    var sy = 0;
    for (var i = 0; i < arr.length; i++) {
      ctx.drawImage(this, 0, sy, canvas.width, arr[i], getRandomInt(-2 * offset(), 2 * offset()), sy, canvas.width, arr[i]);
      sy = sy + arr[i];
    }
    drawDefaultImage();

    imageDataWithShadow = canvas.toDataURL("image/png", 1.0);

    imageObjWithShadow.onload = function () {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(this, 0, 0, canvas.width, canvas.height / 3 + 5, 1, 0, canvas.width, canvas.height / 3 + 5);
      ctx.drawImage(this, 0, canvas.height / 3 + 5, canvas.width, canvas.height / 3 - 5, 0, canvas.height / 3 + 5, canvas.width, canvas.height / 3 - 5);
      ctx.drawImage(this, 0, (canvas.height / 3) * 2, canvas.width, canvas.height / 3, 0, (canvas.height / 3) * 2, canvas.width, canvas.height / 3);
    }
    imageObjWithShadow.src = imageDataWithShadow;
  }
  imageObjShadow.src = imageDataShadows;


  setTimeout(function () {
    imageObjWithShadow.onload = function () {
      ctx.clearRect(0, (canvas.height / 3) * 2, canvas.width, canvas.height / 3);
      var arr = lineShadowsHeight();
      //console.log(arr);
      var sy = 0;
      for (var i = 0; i < arr.length; i++) {
        ctx.drawImage(this, 0, sy, canvas.width, arr[i], getRandomInt(-2 * offset(), 2 * offset()), sy, canvas.width, arr[i]);
        sy = sy + arr[i];
      }
    }
    imageObjWithShadow.src = imageDataWithShadow;
  }, 80);

  setTimeout(function () {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawDefaultImage();
  }, getRandomInt(80, 500));
}

function drawDefaultImage() {
  ctx.drawImage(logoWhite, xPosition, yPosition);
}

function getShadowsImg() {
  ctx.save();
  ctx.globalCompositeOperation = "destination-over";  //  ???
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(logoBlue, xPosition - getRandomInt(2, 10), yPosition);
  ctx.drawImage(logoRed, xPosition + getRandomInt(2, 10), yPosition);
  imageDataShadows = canvas.toDataURL("image/png", 1.0);
  ctx.restore();
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

var glitchLinesAmount = function () {
  return Math.floor((Math.random() * 4) + 4);
};

var offset = function () {
  return Math.floor((Math.random() * 30));
}

var lineShadowsHeight = function () {
  var h = canvas.height;
  var count = glitchLinesAmount();
  var arr = [];
  var s = 0;
  // console.log("-------------------------");

  for (var i = 0; i < count; i++) {
    arr[i] = Math.floor(Math.random() * (h / (count - 1) - 1) + 5); // use "+2" on a normal image
    h = h - arr[i];
    s = s + arr[i];
    arr[count] = canvas.height - s;
    // console.log("arr[i]: " + arr[i]);
    // console.log("h: " + h);
    // console.log("s: " + s);
    // console.log("arr[count]: " + arr[count]);
  }
  return arr;
}

function loop() {
  window.setTimeout(function () {
    glitch();
    loop();
  }, Math.random() * 1000)
}