$(document).ready(function(){
   $('.main').show("slide", {
      direction: "up"
   }, 2000);
   $('#btn-top').fadeOut('fast');

});


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
  $('#toggle').removeClass('fa fa-list');	
  $('#toggle').toggleClass('fa fa-arrow-left');
}

function changenav(id){
	$('#nav1').removeClass('active');
	$('#nav2').removeClass('active');
	$('#nav3').removeClass('active');
	$('#nav4').removeClass('active');
	$('#nav5').removeClass('active');
	$('#nav'+id).addClass('active');

}

function toggleback(){
// 	console.log("not work");
// 	$(".main-window").slideUp(700, () => {
// 	$(".second-window").slideDown("slow");
// });
}

function togglemain(){
// 	console.log("not work");
// 	$(".main-window").slideDown(700, () => {
// 	$(".second-window").slideUp("slow");
// });
}