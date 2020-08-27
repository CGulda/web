$(document).ready(function() {

  $(".nav-icon").click(function() {
    $(".nav-icon, .nav").toggleClass("open");
  });


  $(window).scroll(function() {
    if ($(this).scrollTop() > 200) {
      $('.go-top').fadeIn(200);
    } else {
      $('.go-top').fadeOut(200);
    }
  });

  // Animate the scroll to top
  $('.go-top').click(function(event) {
    event.preventDefault();

    $('html, body').animate({
      scrollTop: 0
    }, 300);
  })

  $(window).resize(function() {
    if (window.innerHeight > window.innerWidth) {
      //$(".photo").toggleClass("rotate")
    }
  });

});

function GetRandom(number) {
  if ($.isNumeric(number)) {
    return Math.floor(Math.random() * number);
  } else if (number == "true") {
    let temp = (GetRandom(10) > 5) ? "true" : "false";
    return temp;
  }
}
