(function() {
  document.getElementById("content").innerHTML = "GruntApp";

  console.log("Hello Grunt 1");

}).call(this);

(function() {
  console.log("Hello Grunt 2");

}).call(this);

(function() {
  var string;

  string = "Hello Grunt 3";

  console.log(string);

}).call(this);
