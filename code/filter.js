var canvas = document.getElementById("theCanvas");
var ctx = canvas.getContext("2d");
var theImage = document.getElementById("theImage");

// theImage is simply a HTMLImage, e.g. obtained via document.getElementById on an img tag
theImage.onload = function() {

    var w = canvas.width = theImage.naturalWidth;
    var h = canvas.height = theImage.naturalHeight;

    ctx.drawImage(theImage, 0, 0);
    
    var data = ctx.getImageData(0, 0, w, h);
    var pixels = data.data;
    
    
    for (var p = 0; p < pixels.length; p+=4) {
        // get RGBA values
        var [r, g, b, a] = [pixels[p], pixels[p+1], pixels[p+2], pixels[p+3]];
    
        // change values
        r = 255 * Math.pow( r/255, 4 );
        g = 127.5 - 127.5 * Math.cos(Math.PI * g / 255);
        b = 255 * Math.pow( b/255, 0.25);
    
        // apply values
        pixels[p] = r;
        pixels[p+1] = g;
        pixels[p+2] = b;
        pixels[p+3] = a;
    }
    ctx.putImageData(data, 0, 0);

}
