var settingslist = ["dot-size", "dot-number", "dot-range", "dot-timeout",
  "dot-color", "dot-colrange", "dot-colintens", "dot-speed", "dot-center", "dot-symetry", "dot-constant", "dot-seed"
];
var settings = [1, 150, 10, 70, 90, 15, 100, 1, false, false, false];
let presets = [
  ["Random"],
  ["Default", [1, 150, 10, 70, 90, 15, 100, 1, false, false, false]],
  ["Purple", [1, 9, 60, 2, 98, 0, 56, 20, false, false, false]],
  ["Star", [1, 38, 100, 8, 0, 0, 100, 5, true, false, true]],
  ["Constelations", [0, 70, 15, 32, 211, 345, 89, 1, false, false, false]],
  ["Weeb", [0, 83, 30, 50, 155, 313, 55, 5, true, true, false]],
  ["Plankton", [1, 83, 10, 49, 275, 116, 63, 1, false, false, false]],
  ["Sun", [0, 101, 75, 14, 41, 0, 53, 2, true, false, false]],
  ["firework", [2, 80, 0, 7, 313, 22, 62, 5, true, false, false]]
];

$(document).ready(function() {

  var content_for_table = [
    ["dot-size", 1, "", "range", [0, 5]],
    ["dot-number", 100, "", "range", [5, 250]],
    ["dot-range", 100, "touch range", "range", [0, 75]],
    ["dot-timeout", 30, "", "range", [1, 50]],
    ["dot-color", 100, "", "range", [0, 360]],
    ["dot-colrange", 100, "color diversity", "range", [0, 360]],
    ["dot-colintens", 100, "color intensivity", "range", [10, 100]], //zmienić na switch button
    ["dot-speed", 2, "speed", "range", [1, 20]],
    ["dot-center", "", "start center", "checkbox"],
    ["dot-symetry", "", "symetric", "checkbox"],
    ["dot-constant", "", "constant speed", "checkbox"],
    ["dot-seed", 0, "seed", "text"]
  ];
  //[id,value,label,other]

  var table_content = [];
  for (i = 0; i < content_for_table.length; i++) {
    let cft = content_for_table[i];
    let one_row = (cft[2] == "") ? [cft[0].replace("-", " ")] : [cft[2]];
    let temp = "";
    if (cft[3] == "checkbox") {
      temp = '<label class="switch"><input type="checkbox" id="' + cft[0] + '" ' + cft[1]
      temp += ' onchange="Trigger(1)" ><span class="checkbox_slider"></span></label>'
    } else if (cft[3] == "range") {
      temp = '<input type="' + cft[3] + '" id="' + cft[0] + '" value="' + cft[1] + '" class="range_slider" onchange="Trigger(1)" ';
      temp += 'min=' + cft[4][0] + ' max="' + cft[4][1] + '"/>';
    } else if (cft[3] == "text") {
      temp = '<input type="' + cft[3] + '" id="' + cft[0] + '" value="' + cft[1] + '"  onchange="Trigger(0)" />';
    }

    one_row.push(temp);
    table_content.push(one_row);
  }
  // "dot-number", "dot-range", "dot-timeout",
  //"dot-color", "dot-colrange", "dot-colintens", "dot-speed"];

  var table_body = '<table class="visual_settings big_font">';
  for (var i = 0; i < table_content.length; i++) {
    table_body += '<tr>';
    for (var j = 0; j < table_content[0].length; j++) {
      table_body += '<td>';
      table_body += table_content[i][j];
      table_body += '</td>';
    }
    table_body += '</tr>';
  }
  table_body += '</table>';
  $('#setting-table').html(table_body);

  var preset_html = '<div class="choose_button three-fourth">';
  for (i = 0; i < presets.length; i++) {
    preset_html += '<a class="presets" value="' + i + '">' + presets[i][0] + '</a>';
  }
  $('#preset-div').html(preset_html + "</div>");

  doer();
  //Trigger(1);

  $(window).on('resize', function() {
    W = window.innerWidth;
    H = window.innerHeight;
    c.width = W;
    c.height = H;
    restart();
  });

  //CZEMU TO NIE DZIAŁA?!
  $("input").change(function() {
    Trigger(1);
  });

  $(".presets").click(function() {
    let ind = $(this).attr("value");
    let temp = [];
    if (ind == 0) {
      temp = [GetRandom(2), GetRandom(100) + 10, GetRandom(50) , GetRandom(75), GetRandom(360), GetRandom(360), GetRandom(50) + 50, GetRandom(9) + 1, GetRandom("true"), GetRandom("true"), GetRandom("true")];
    } else {
      temp = presets[ind][1];
    }
    $("#dot-seed").attr("value", temp.join());
    Trigger(0);
    restart();
  });
});

function Trigger(status) {
  settings = [];
  if (status == 0) { //READ SEED
    settings = $("#dot-seed").val().trim().split(",");
    for (i = 0; i < 8; i++)
      $("#" + settingslist[i]).val(settings[i]);
    for (i = 8; i < 11; i++) {
      if (settings[i] == "true") {
        $("#" + settingslist[i]).prop("checked", true);
      } else {
        $("#" + settingslist[i]).prop("checked", false);
      }
    }
  }

  if ($("#dot-symetry").prop("checked")) { //FIXED CENTER
    $("#dot-center").prop("checked", true);
    $("#dot-constant").prop("checked", false);
  }

  if (status == 1) { //INPUT SEED
    let temp = "";
    for (i = 0; i < 8; i++) {
      value = $("#" + settingslist[i]).val();
      temp += value + ",";
    }
    for (i = 8; i < 11; i++)
      temp += $("#" + settingslist[i]).prop("checked") + ',';
    temp = temp.slice(0, -1);
    $("#dot-seed").attr("value", temp);
    settings = temp.split(",");
    restart();
  }

}



W = window.innerWidth;
H = window.innerHeight;
var c = document.createElement('canvas'),
  ctx = c.getContext('2d');
document.body.insertBefore(c, document.body.firstChild);
c.width = W;
c.height = H;

var point = function(x, y) {
  this.x = x;
  this.y = y;

  let color = settings[4];
  let colrange = parseInt(Math.random() * settings[5]);
  let temp = color + colrange;
  this.c = 'hsl(' + temp + ',100%,' + settings[6] + '%)';
  temp = settings[7];

  if (settings[9] == "true") {
    this.vx = temp * (Math.random() * 2 - 1);
    this.vy = -this.vx;
  } else if (settings[10] == "true") {
    this.vx = temp * Math.round(Math.random() * 2 - 1);
    this.vy = temp * Math.round(Math.random() * 2 - 1);
  } else {
    this.vx = temp * (Math.random() * 2 - 1);
    this.vy = temp * (Math.random() * 2 - 1);
  }


  this.s = function(a) {
    return Math.sqrt((this.x - a.x) * (this.x - a.x) + (this.y - a.y) * (this.y - a.y));
  };

  this.move = function() {
    if ((this.x + this.vx) < 0 || (this.x + this.vx) > W)
      this.vx *= -1;
    if ((this.y + this.vy) < 0 || (this.y + this.vy) > H)
      this.vy *= -1;
    this.x += this.vx;
    this.y += this.vy;
  };
};

var mesh = function() {
  l = settings[0]; //grubość obiektu
  n = settings[1] * 2; //ilość obiektów
  d = (settings[2]/256)* Math.sqrt(Math.pow(window.innerWidth,2) + Math.pow(window.innerHeight,2)); //zasięg obiektu
  t = settings[3] / 100; //czas życia obiektu
  this.l = l;
  this.n = n;
  this.d = d;
  this.t = t;

  this.F = [];
  if (settings[8] == "true") {
    for (var i = 0; i < n; i++)
      this.F.push(new point(W / 2, H / 2));
  } else {
    for (var i = 0; i < n; i++)
      this.F.push(new point(W * Math.random(), H * Math.random()));
  }

  this.move = function() {
    for (var i = 0; i < this.n; i++)
      this.F[i].move();
  };

  this.draw = function() {

    ctx.fillStyle = 'rgba(0,0,0,' + this.t + ')';
    ctx.fillRect(0, 0, W, H);
    ctx.lineWidth = this.l;
    for (var i = 0; i < this.n; i++) {
      ctx.beginPath();
      ctx.strokeStyle = this.F[i].c;
      ctx.moveTo(this.F[i].x, this.F[i].y);
      ctx.arc(this.F[i].x, this.F[i].y, l / 3, 0, 2 * Math.PI);
      for (var j = 0; j < this.n; j++)
        if (i !== j) {
          if (this.F[i].s(this.F[j]) < this.d) {
            ctx.moveTo(this.F[i].x, this.F[i].y);
            ctx.lineTo(this.F[j].x, this.F[j].y);
          }
        }
      ctx.stroke();
    }
  };
};

var M = new mesh();

function doer() {
  M.move();
  M.draw();
  ttt = requestAnimationFrame(doer);
}

function restart() {
  M.delete;
  cancelAnimationFrame(ttt);
  M = new mesh();
  doer();
}
