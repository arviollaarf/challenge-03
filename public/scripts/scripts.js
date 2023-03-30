AOS.init();

var input = document.getElementById("passenger-value");
var inputValue = document.getElementById("passenger-value").value;

input.addEventListener("keypress", function () {
  inputValue = document.getElementById("passenger-value").value;
});

