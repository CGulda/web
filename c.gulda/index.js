var testimonial_content = [
  ["He found solutions to difficult problems, which others even didn’t want to touch. </br>He is a real troubleshooter.", "images/MGrodzicki.jfif", "Michal Grodzicki, Project Manager"],
  ["It's a pity he isn't there. If he were here, he would know what it is.", "images/MSkwierawski.jpg", "Mariusz Skwierawski, PromoDruk"]
];

var pbi_content = [
  ["Messenger", '<i class="fab fa-facebook-messenger"></i> Messenger', "All your writing habbits.", "Last month statistics", "Conversation with best friend", "Selected friend writing statistics"],
  //["Facebook", '<i class="fab fa-facebook-square"></i> Facebook', "Your social activity.", "Group activity", "Add interactions", "Events you want but never came"],
  ["Linkedin", '<i class="fab fa-linkedin"></i> Linkedin', "Design.", "One page", "Made for design, not data", "Matching orginal"],
  ["Home_budget", '<i class="fas fa-wallet"></i> Home budget', "Did I really spend that much?", "Per category", "Per month", "Separately for me and my girlfriend"],
  //["Netflix", '<i class="fab fa-neos"></i> Netflix', "What you and your friends watch?", "Most popular in your family", "Screen time per user", "General statistics"],
  //["Fetlife", '<i class="fas fa-mask"></i> Fetlife', "Public database that i found.", "Popular kinks", "Users over the globe", "Social trends"]
];

var pbi_photos = [
  ["pbi_0.png", "Messenger", "This is first page that I made from my Messanger data. By one look you can see tendencee in my activity."],
  ["pbi_1.png", "Messenger", "This page take all messeges send by selected person. Bottom and last panel on the right show source of messages."],
  ["pbi_2.png", "Messenger", "This require at least some messeges to work with, so choosing options is sized down only to active users."],
  ["pbi_3.png", "Messenger", "Here is private conversation with my girlfrend. Quick look and you can tell who was trying harder at the beginning :). The drop on march 2017 is when we move in together."],
  ["pbi_4.png", "Messenger", "Same but with best friend."],
  ["pbi_5.png", "Messenger", "That one is not so clear, some general stats for group conversation. Main thing of that page is the button on the right."],
  ["pbi_6.png", "Messenger", "It changes displayed charts allowing you to dig into the data."],
  ["pbi_7.png", "Linkedin", "I have to say, they didn't give much to work with, so content isn't worth it. My goal was to make the report looks just like the LinkedIn page."],
  ["pbi_8.png", "Home_budget", "If you try to count all the money you spend, you will and up with something like this."],
  ["pbi_9.png", "Home_budget", "The idea of structure and details to save changed a bit over the time, but you can slice it by category, date, store and more."],
  ["pbi_10.png", "Home_budget", "This is basicly the same, but arrange diffrently."],
  ["pbi_11.png", "Home_budget", "Significant rise on thursday is sign of events i create in pub. And the end of it with lockdown on march 2020."]
];


$(document).ready(function() {
  // Testimonial
  var temp = "";
  for (i = 0; i < testimonial_content.length; i++) {
    var first = (i == 0) ? 'active' : '';
    temp += '<div class="carousel-item ' + first + ' container-fluid"><h2 class="testimonial-text">' + testimonial_content[i][0] + '</h2> <img class="testimonial-image" src="' + testimonial_content[i][1] + '"><em>' +
      testimonial_content[i][2] + '</em></div>';
  }
  $('#testimonial_content').html(temp);

  // PBI Content
  temp = "";
  for (i = 0; i < pbi_content.length; i++) {
    temp += '<div class="card-column col-lg-4 col-md-6 "> <div class = "card" ><div class = "card-header" ><h3> ' + pbi_content[i][1] + ' </h3></div> <div class = "card-body" ><h2 class = "card-text" > ' + pbi_content[i][2] + ' </h2>';
    for (j = 3; j < 6; j++) {
      temp += '<p>' + pbi_content[i][j] + '</p>';
    }
    //temp += '</div></div></div>';
    temp += '<button id="' + pbi_content[i][0] + '" class = "pbi-btn btn btn-lg btn-block btn-outline-dark" type = "button"  data-toggle="modal" data-target="#staticBackdrop"> Check it out </button></div></div></div>';
  }
  $('#pbi_content').html(temp);


  $(".pbi-btn").click(function() {
    $("#staticBackdropLabel").html(this.id);
    Get_carusel_content(this.id);
  });
});

function Get_carusel_content(test) {
  temp = "";
  var first = "active";
  for (i = 0; i < pbi_photos.length; i++) {
    if (pbi_photos[i][1] == test) {
      temp += '<div class="carousel-item ' + first + '"><image src="pbi/' + pbi_photos[i][0] + '" class="img-fluid" alt="Responsive image"><div class="over_photo"><h3>'+pbi_photos[i][2]+'</h3></div></image></div>';
      var first = "";
    }
  }
  $('#pbi_carusel').html(temp);
}
