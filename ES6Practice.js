console.log("Hello ES6");

// Let Keyword
var x = 10;

if (x > 5) {
  // var x = 5;             // output = 5
  let x = 5; // output = 10
  console.log("inside function: " + x);
}
console.log("outside function: " + x);

/*

- let variables is only visible inside the func.
- var variables is visible to the whole func.

*/

var items = [0, 1, 2, 3];

for (var i = 0; i < items.length; i++) {
  console.log(items[i]);
}

console.log(i);
/* 
output = 4, because x is incrementing each time around in the for loop
and the final result is I. when it gets until here it will return 4
*/

for (let l = 0; l < items.length; l++) {
  console.log(items[l]);
}
