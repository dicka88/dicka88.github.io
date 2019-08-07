$(document).ready(function(){
   $('.main').show("slide", {
      direction: "up"
   }, 2000);
   $('#btn-top').fadeOut('fast');

});

function toggle(){
  console.log("okey");
}

var prevScrollpos = window.pageYOffset;
window.onscroll = function() {
var currentScrollPos = window.pageYOffset;
  if (prevScrollpos > currentScrollPos) {
    $('#btn-top').fadeOut('slow');
  } else {
    $('#btn-top').fadeIn('slow');
    setTimeout(function () {
      $('#btn-top').fadeOut();
    }, 4000);
  }
  prevScrollpos = currentScrollPos;
}

function toggleSide(){
  $('#toggle').toggleClass('fa fa-arrow-left');
}
