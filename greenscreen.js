var fgimage = null;
var bgimage = null;
var output = null;
var fgimage1 = null;

function load1(){
  var can = document.getElementById("can1");
  var file1 = document.getElementById("foreground");
  fgimage1 = new SimpleImage(file1);
  fgimage = fgimage1;
  fgimage1.drawTo(can);
  
}
function load2(){
  var can2 = document.getElementById("can2");
  var file2 = document.getElementById("background");
  var bgimage1 = new SimpleImage(file2);
  bgimage = bgimage1;
  bgimage1.drawTo(can2);
}

function greenscreen(){
  output = new SimpleImage(fgimage1.getWidth(), fgimage1.getHeight());
  var can = document.getElementById("can1");
  var ctx = can.getContext("2d");
  ctx.clearRect(0, 0, fgimage.getWidth(), fgimage.getHeight());
  var can2 = document.getElementById("can2");
  var ctx2 = can2.getContext("2d");
  ctx2.clearRect(0, 0, bgimage.getWidth(), bgimage.getHeight());
  if(fgimage == null || !fgimage.complete())
  {
    alert("Falta imagen delantera");
    return;
  }
  if(bgimage == null || !bgimage.complete())
  {
    alert("Falta imagen trasera");
    return;
  }else{
   for(var pixel of fgimage.values())
          {
       var greenv = pixel.getGreen();
       var redv = pixel.getRed();
       var bluev = pixel.getBlue();
      
        var x = pixel.getX();
        var y = pixel.getY();

      if( greenv > redv + bluev){
        var pixell = bgimage.getPixel(x, y);
        output.setPixel(x, y, pixell);
      }else{
             output.setPixel(x, y, pixel);
           }
          
          }}
	output.drawTo(can);
     }