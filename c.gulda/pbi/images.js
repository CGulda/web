var pbi_photos = [
  ["pbi_0.png","Messanger",   "This is first page that I made from my Messanger data. By one look you can see tendencee in my activity."],
  ["pbi_1.png","Messanger",   "This page take all messeges send by selected person. Bottom and last panel on the right show source of messages."],
  ["pbi_2.png","Messanger",   "This require at least some messeges to work with, so choosing options is sized down only to active users."],
  ["pbi_3.png","Messanger",   "Here is private conversation with my girlfrend. Quick look and you can tell who was trying harder at the beginning :). The drop on march 2017 is when we move in together."] ,
  ["pbi_4.png","Messanger",   "Same but with best friend."],
  ["pbi_5.png","Messanger",   "That one is not so clear, some general stats for group conversation. Main thing of that page is the button on the right."],
  ["pbi_6.png","Messanger",   "It changes displayed charts allowing you to dig into the data."],
  ["pbi_7.png","Linkedin",    "I have to say, they didn't give much to work with, so content isn't worth it. My goal was to make the report looks just like the LinkedIn page."],
  ["pbi_8.png","Finance",     "If you try to count all the money you spend, you will and up with something like this."],
  ["pbi_9.png","Finance",     "The idea of structure and details to save changed a bit over the time, but you can slice it by category, date, store and more."],
  ["pbi_10.png","Finance",    "This is basicly the same, but arrange diffrently."],
  ["pbi_11.png","Finance",    "Significant rise on thursday is sign of events i create in pub. And the end of it with lockdown on march 2020."]
];
var photo_act = 0;

    function zdjęcie(n) {
      photo_act+=n;
      if(photo_act>pbi_photos.length-1){
        photo_act=0;
      }else if (photo_act<0) {
        photo_act=pbi_photos.length-1;}
      $("#pbi_photo").attr("style","background-image: url('pbi/"+pbi_photos[photo_act][0]+"');");
      $(".photo-caption").html("<h2>"+pbi_photos[photo_act][1]+"</h2><p>"+pbi_photos[photo_act][2]+"</p>");
    }

    function ImageExist(url) {
      var img = new Image();
      img.src = url;
      return img.height != 0;
    }
