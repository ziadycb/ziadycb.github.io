

var zoom =100;
var x=0;
var lens_temp;
var disabler =0;
var lens_temp2,box_temp;
var img,img_temp;
var my_jquery_function;
document.cookie = "username=John Smith;";


// $(document).ready(function() {
//   setTimeout(function() {
        
//         $('.loader').removeClass('loader');
//         $('.loader-inner').removeClass('loader-inner');
//         $('.loader-line').removeClass('loader-line');
//       }, 3500);
// });

function removeElement(elementId) {
  // Removes an element from the document
  var element = document.getElementById(elementId);
  element.parentNode.removeChild(element);
}


function imageZoom(imgID, resultID ,mapID) {
  

if (disabler==0){
  box_temp= document.getElementById("myresult");
    console.log(x);
  var lens, result, cx, cy,map;
  img = document.getElementById(imgID);
  result = document.getElementById(resultID);
  map=mapID;

  /*create lens:*/
  lens = document.createElement("DIV");
  lens.setAttribute("class", "img-zoom-lens center");
  lens.setAttribute("id", "img-zoom-lens");

  if(x>0){
  lens.style.left = lens_temp.style.left;
  lens.style.top = lens_temp.style.top;
  lens.style.width=zoom + "px";
  lens.style.height=zoom + "px";
  }
  x++;
  lens_temp=lens;
  /*insert lens:*/
  img.parentElement.insertBefore(lens, img);

  /*calculate the ratio between result DIV and lens:*/
  cx = result.offsetWidth / lens.offsetWidth;
  cy = result.offsetHeight / lens.offsetHeight;

  /*set background properties for the result DIV:*/
  result.style.backgroundImage = "url('" + img.src + "')";
  result.style.backgroundSize = img.width * cx + "px " + img.height * cy + "px";

  
  /*execute a function when someone moves the cursor over the image, or the lens:*/
   lens.addEventListener("mousemove", moveLens);
   img.addEventListener("mousemove", moveLens);

  /*to update the positions when we zoom in without moving*/
  lens.addEventListener("mouseover", moveLens);
  img.addEventListener("mouseover", moveLens);


  /*and also for touch screens:*/
  lens.addEventListener("touchmove", moveLens);
  img.addEventListener("touchmove", moveLens);

  function moveLens(e) {
    var pos, x, y;

    /*prevent any other actions that may occur when moving over the image:*/
    e.preventDefault();

    /*get the cursor's x and y positions:*/
    pos = getCursorPos(e);

    /*calculate the position of the lens:*/
    x = pos.x - lens.offsetWidth / 2;
    y = pos.y - lens.offsetHeight / 2;

    /*prevent the lens from being positioned outside the image:*/
    if (x > img.width - lens.offsetWidth) {
      x = img.width - lens.offsetWidth;
    }
    if (x < 0) {
      x = 0;
    }
    if (y > img.height - lens.offsetHeight) {
      y = img.height - lens.offsetHeight;
    }
    if (y < 0) {
      y = 0;
    }

    /*set the position of the lens:*/
    lens.style.left = x + "px";
    lens.style.top = y + "px";

    
    /*display what the lens "sees":*/
    result.style.backgroundPosition = "-" + x * cx + "px -" + y * cy + "px";
  }
  function getCursorPos(e) {
    var a,
      x = 0,
      y = 0;
    e = e || window.event;

    /*get the x and y positions of the image:*/
    a = img.getBoundingClientRect();

    /*calculate the cursor's x and y coordinates, relative to the image:*/
    x = e.pageX - a.left;
    y = e.pageY - a.top;

    /*consider any page scrolling:*/
    x = x - window.pageXOffset;
    y = y - window.pageYOffset;
    return { x: x, y: y };

    
  }
}
}

function launch (ID, _ID2,_class,mapID){

  
 document.getElementById(_class).addEventListener("wheel", (event) => {
  if(disabler==0){
    const DIVIDE_AMOUNT = 4;
    console.log(event.deltaY);

    
      zoom += event.deltaY / DIVIDE_AMOUNT;
      if(zoom < 25)zoom=25;
      if(zoom > 175)zoom=175;

    console.log(zoom);

  
    removeElement("img-zoom-lens");
    imageZoom(ID, _ID2,mapID);

    lens_temp.style.width=zoom + "px";
    lens_temp.style.height=zoom + "px";

  }
  });

}

function myFunction() {
    // button.parentElement.insertBefore(map, button);
    img.setAttribute("usemap","#workmap");
    removeElement("img-zoom-lens");
    document.getElementById("myresult").style.display = "none";
    disabler=1;
    console.log(disabler);
  
  }

  function myFunction2() {
    if(disabler==1){
      img.setAttribute("usemap","NO");
      disabler=0;
      document.getElementById("myresult").style.display = "block";
      imageZoom("myimage", "myresult");
      lens_temp.style.width=zoom + "px";
      lens_temp.style.height=zoom + "px";
      
    }
    
  }
  

  $(document).ready(function() {
    $("#btnSubmit").click(function(e){
      var btnEle = $(e.target);
    
      var state = btnEle.text();
      
      if (state == "Explore Site") {
        myFunction();
        btnEle.html("Explore image");
      }
      else {
        
        
        myFunction2();
        btnEle.html("Explore Site");
      }
    }); 
});

var isMobile = false; //initiate as false

  // device detection
  //simple example : /ipad/i.test(navigator.userAgent) test if it's an ipad.
  
  if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) 
  || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4))) isMobile = true;

  // if(/ipad/i.test(navigator.userAgent))

  /*The userAgent property returns the value of the user-agent header sent by the browser to the server.

  The value returned, contains information about the name, version and platform of the browser.>*/

  console.log('Mobile device:'+isMobile);
  
  if(isMobile){
    window.location.href = "/Mobile/mobile.html";
  }